"""Check corpus integrity and replay the proposed model's example traces."""
import json
import re
import sys
from collections import Counter
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT=Path(__file__).resolve().parents[1]
CUTOFF='2026-10-11'
errors=[]
warnings=[]
def check(condition,message):
    if not condition: errors.append(message)
def read(path):
    try: return json.loads(path.read_text(encoding='utf-8-sig'))
    except (OSError,ValueError) as e:
        errors.append(f'{path.relative_to(ROOT)}: {e}')
        return []
tables={name:read(ROOT/'data'/f'{name}.json') for name in ('sources','entities','claims','relationships','predictions','scenarios')}
required={
'sources':['id','title','url','publisher','published_date','accessed_date','source_type','access','notes'],
'entities':['id','name','kind','summary','as_of','source_ids','dossier_path'],
'claims':['id','text','claim_type','source_ids','as_of','confidence','notes'],
'relationships':['id','subject','predicate','object','source_ids','claim_ids','status'],
'predictions':['id','statement','source_ids','issued_date','horizon','probability','conditions','caveats','type'],
'scenarios':['id','title','status','trigger','actors','source_ids','claim_ids','branches','caveats','dossier_path']}
lookup={}
all_ids=[]
for table,rows in tables.items():
    check(isinstance(rows,list),f'{table}: array required')
    lookup[table]={}
    for row in rows:
        check(isinstance(row,dict),f'{table}: object required')
        for key in required[table]: check(key in row,f"{row.get('id',table)}: missing {key}")
        rid=row.get('id','')
        check(bool(rid),f'{table}: empty ID')
        check(rid not in lookup[table],f'{table}: duplicate {rid}')
        lookup[table][rid]=row
        all_ids.append(rid)
check(len(all_ids)==len(set(all_ids)),'IDs overlap across record types')

def refs(row,key,table):
    vals=row.get(key,[])
    check(isinstance(vals,list),f"{row.get('id')}: {key} must be an array")
    for value in vals: check(value in lookup[table],f"{row.get('id')}: unknown {key} {value}")
def dossier(row):
    path=unquote(row.get('dossier_path','').split('#')[0])
    target=(ROOT/path).resolve()
    check(target.is_relative_to(ROOT),f"{row['id']}: dossier outside wiki")
    check(target.is_file(),f"{row['id']}: missing dossier {path}")

for table,rows in tables.items():
    for row in rows:
        if table!='sources': refs(row,'source_ids','sources')
        if 'claim_ids' in row: refs(row,'claim_ids','claims')
        if 'dossier_path' in row: dossier(row)
        if table in ('entities','predictions'):
            check(bool(row.get('source_ids')),f"{row['id']}: requires evidence")
        if table=='claims':
            check(row.get('claim_type') in ('fact','reported_claim','forecast','analysis','hypothesis'),f"{row['id']}: invalid claim type")
            check(row.get('confidence') in ('high','medium','low','not_assessed'),f"{row['id']}: invalid confidence")
            if row.get('claim_type') in ('fact','reported_claim','forecast'):
                check(bool(row.get('source_ids')),f"{row['id']}: sourced claim needs a source")
        if table=='entities':
            check(row.get('kind') in ('government','organization','person','capability','infrastructure'),f"{row['id']}: invalid entity kind")
            for pos in row.get('public_positions',[]): refs(dict(id=row['id'],**pos),'source_ids','sources')
        if table=='relationships':
            check(row.get('subject') in lookup['entities'],f"{row['id']}: unknown subject")
            check(row.get('object') in lookup['entities'],f"{row['id']}: unknown object")
        if table=='scenarios':
            refs(row,'actors','entities')
            check(bool(row.get('branches')),f"{row['id']}: no branches")
        if table=='predictions':
            p=row.get('probability')
            check(p is None or (isinstance(p,(int,float)) and not isinstance(p,bool) and 0<=p<=1),f"{row['id']}: invalid probability")
            if p is not None: check(bool(row.get('conditions')) and bool(row.get('horizon')),f"{row['id']}: quantified forecast needs context")
        if table=='sources':
            check(urlparse(row.get('url','')).scheme in ('http','https'),f"{row['id']}: invalid source URL")
            check(row.get('access') in ('full_text','partial','abstract','search_excerpt'),f"{row['id']}: invalid access type")
            date=row.get('published_date')
            if date:
                match=re.fullmatch(r'\d{4}(?:-\d{2})?(?:-\d{2})?',date)
                check(bool(match),f"{row['id']}: invalid date precision {date}")
                if match: check(date<=CUTOFF,f"{row['id']}: source after cutoff {date}")
            check(row.get('accessed_date') in ('2026-10-10', CUTOFF),f"{row['id']}: unexpected access date")

# Check that generated tables match the editable records.
for table,rows in tables.items():
    part=[]
    for path in sorted((ROOT/'data'/'parts').glob(f'*/{table}.json')): part.extend(read(path))
    part.sort(key=lambda x:x['id'])
    check(part==rows,f'{table}: combined data is stale; run build_indexes.py')

# Check local Markdown targets. External links are checked during research, not here.
link_count=0
for path in ROOT.rglob('*.md'):
    body=path.read_text(encoding='utf-8-sig')
    for target in re.findall(r'(?<!!)\[[^\]]*\]\(([^\n]+?)\)',body):
        target=target.strip().strip('<>')
        if target.startswith(('http:','https:','mailto:','#')): continue
        target=unquote(target.split('#')[0])
        if not target: continue
        dest=(path.parent/target).resolve()
        check(dest.exists(),f'{path.relative_to(ROOT)}: broken local link {target}')
        link_count+=1
for path in ROOT.rglob('*'):
    if path.suffix in ('.md','.json','.py') and path.is_file():
        body=path.read_text(encoding='utf-8-sig')
        check('\ufffd' not in body,f'{path.relative_to(ROOT)}: replacement character U+FFFD')

alias_path=ROOT/'data'/'entity_aliases.json'
if alias_path.exists():
    for group in read(alias_path):
        for eid in [group['canonical_id']]+group['alias_ids']:
            check(eid in lookup['entities'],f'Alias map: unknown {eid}')

variables=read(ROOT/'model'/'variables.json')
varmap={v['id']:v for v in variables}
transitions=read(ROOT/'model'/'transitions.json')
transmap={t['id']:t for t in transitions}
roles=read(ROOT/'model'/'roles.json')
role_ids={r['id'] for r in roles}
check(len(varmap)==len(variables),'Duplicate state variable IDs')
check(len(transmap)==len(transitions),'Duplicate transition IDs')
outcome_ids=[]
for role in roles:
    refs(role,'entity_ids','entities')
for variable in variables:
    check(variable['initial'] in variable['values'],f"{variable['id']}: invalid initial value")
for trans in transitions:
    for role in trans['actor_roles']: check(role in role_ids,f"{trans['id']}: missing role {role}")
    refs(trans,'source_ids','sources'); refs(trans,'claim_ids','claims')
    check(bool(trans['source_ids'] or trans['claim_ids']),f"{trans['id']}: missing research context")
    for key,allowed in trans['guards'].items():
        check(key in varmap,f"{trans['id']}: unknown guard {key}")
        if key in varmap:
            for value in allowed: check(value in varmap[key]['values'],f"{trans['id']}: invalid guard value {value}")
    for outcome in trans['outcomes']:
        outcome_ids.append(outcome['id'])
        check(outcome['probability'] is None,f"{outcome['id']}: unexpected probability in uncalibrated model")
        for key,value in outcome['effects'].items():
            check(key in varmap,f"{outcome['id']}: unknown effect {key}")
            if key in varmap: check(value in varmap[key]['values'],f"{outcome['id']}: invalid effect value {value}")
check(len(outcome_ids)==len(set(outcome_ids)),'Duplicate model outcome IDs')

# Check causal boundaries found during review. These checks cover states that
# the three narrative examples do not all visit.
invariant_count=0
def invariant(condition,message):
    global invariant_count
    invariant_count+=1
    check(condition,'Model invariant: '+message)

levels=['competition','diplomatic_crisis','coercion','limited_armed_conflict','major_war','nuclear_use']
for trans in transitions:
    if trans['id']=='M-T030': continue
    for outcome in trans['outcomes']:
        after=outcome['effects'].get('conflict_level')
        if after not in levels: continue
        for before in trans['guards'].get('conflict_level',levels):
            if before in levels:
                invariant(levels.index(after)>=levels.index(before),f"{outcome['id']} can reduce an existing conflict without a settlement")

def apply_case(tid,oid,state):
    trans=transmap.get(tid)
    if trans is None:
        invariant(False,f'missing transition {tid}')
        return state.copy()
    invariant(all(state.get(k) in allowed for k,allowed in trans['guards'].items()),f'{tid} cannot accept a required review case')
    outcome=next((o for o in trans['outcomes'] if o['id']==oid),None)
    invariant(outcome is not None,f'missing outcome {oid}')
    return dict(state,**outcome['effects']) if outcome else state.copy()

for scope in ['incident','trade']:
    state=dict(settlement='provisional',settlement_scope=scope,crisis_channel='responsive',conflict_level='major_war')
    after=apply_case('M-T024','M-T024-O1',state)
    invariant(after['conflict_level']=='major_war',f'{scope} settlement ends an unrelated war')
    end=transmap.get('M-T030',{})
    invariant(not all(after.get(k) in vals for k,vals in end.get('guards',{}).items()),f'{scope} settlement enables conflict-wide resolution')

state=dict(settlement='verified',settlement_scope='conflict_wide',conflict_level='major_war')
after=apply_case('M-T030','M-T030-O1',state)
invariant(after['conflict_level']=='competition','verified conflict-wide settlement cannot end the modeled war')

for service in ['normal','degraded','recovering']:
    after=apply_case('M-T014','M-T014-O1',dict(incident_status='confirmed',services=service))
    invariant(after['services']==service,'lab containment changes civilian service status without an assessment')

for authorization in ['absent','unresolved','established']:
    state=dict(technical_logs='preserved',incident_status='contained',state_authorization=authorization,attribution='state_directed')
    after=apply_case('M-T012','M-T012-O1',state)
    invariant(after['state_authorization']==authorization and after['attribution']=='state_directed','private operator finding overwrites evidence about state direction')
    invariant(after['incident_status']=='contained','evidence review resets containment')

after=apply_case('M-T011','M-T011-O1',dict(incident_status='contained'))
invariant(after['technical_logs']=='preserved','evidence cannot be preserved after containment')
after=apply_case('M-T013','M-T013-O1',dict(incident_status='confirmed',attribution='unresolved',conflict_level='major_war'))
invariant(after['attribution']=='unresolved' and after['conflict_level']=='major_war','public blame changes attribution or ends a war')

traces=read(ROOT/'model'/'example-traces.json')
for trace in traces:
    state={k:v['initial'] for k,v in varmap.items()}
    for key,value in trace['initial'].items():
        check(key in varmap and value in varmap[key]['values'],f"{trace['id']}: invalid starting value {key}={value}")
    state.update(trace['initial'])
    for tid,oid in trace['steps']:
        check(tid in transmap,f"{trace['id']}: missing transition {tid}")
        if tid not in transmap: continue
        t=transmap[tid]
        for key,allowed in t['guards'].items(): check(state.get(key) in allowed,f"{trace['id']}: guard fails at {tid}, {key}={state.get(key)}")
        outcome=next((o for o in t['outcomes'] if o['id']==oid),None)
        check(outcome is not None,f"{trace['id']}: missing outcome {oid}")
        if outcome: state.update(outcome['effects'])
    for key,value in trace['expected'].items(): check(state.get(key)==value,f"{trace['id']}: expected {key}={value}, got {state.get(key)}")

summary=dict(status='passed' if not errors else 'failed',cutoff=CUTOFF,records={k:len(v) for k,v in tables.items()},markdown_files=len(list(ROOT.rglob('*.md'))),local_links_checked=link_count,model_variables=len(variables),model_transitions=len(transitions),example_traces_checked=len(traces),model_invariant_checks=invariant_count,errors=errors,warnings=warnings)
(ROOT/'data'/'validation.json').write_text(json.dumps(summary,indent=2)+'\n',encoding='utf-8')
counts='\n'.join(f'| {key} | {value} |' for key,value in summary['records'].items())
access=Counter(s.get('access') for s in tables['sources'])
accessrows='\n'.join(f'| {key} | {value} |' for key,value in sorted(access.items()))
coverage=read(ROOT/'data'/'coverage.json')
unique=coverage.get('unique_source_urls','unknown') if isinstance(coverage,dict) else 'unknown'
text=f'''# Coverage and validation

Research cutoff: {CUTOFF}.

| Record type | Count |
| --- | ---: |
{counts}

There are {unique} unique source URLs. Repeated URLs do not count as independent evidence.

| Source access | Count |
| --- | ---: |
{accessrows}

Validation status: **{summary['status']}**.

- {summary['markdown_files']} Markdown files were checked.
- {link_count} local links were checked.
- {len(variables)} model variables and {len(transitions)} transitions were checked.
- {len(traces)} fictional example traces were replayed.
- {invariant_count} checks tested causal boundaries in the proposed rules.
- JSON fields, IDs, references, source dates, dossier files, and text encoding were checked.

These are structural checks. They do not verify every external claim or predict real events.
External source access limits remain in the [source index](SOURCES.md).
See [open questions](GAPS.md) for incomplete areas.

The combined data has fewer unique identities than entity records because some streams profile the same actor.
The [alias map](data/entity_aliases.json) identifies confirmed duplicates.

[Wiki home](README.md).
'''
(ROOT/'COVERAGE.md').write_text(text,encoding='utf-8')
print(json.dumps(summary,indent=2))
sys.exit(1 if errors else 0)
