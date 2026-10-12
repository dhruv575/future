"""Combine local research records and build navigable Markdown indexes."""
import json
import re
from collections import Counter, defaultdict
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
TABLES=('sources','entities','claims','relationships','predictions','scenarios')
def read(path):
    return json.loads(path.read_text(encoding='utf-8-sig'))
def write(name,text):
    (ROOT/name).write_text(text.rstrip()+'\n',encoding='utf-8')
def esc(value):
    if value is None: return 'Unknown'
    if isinstance(value,(dict,list)): value=json.dumps(value,ensure_ascii=False)
    return str(value).replace('|','\\|').replace('\n',' ')
data={}
for name in TABLES:
    records=[]
    for path in sorted((ROOT/'data'/'parts').glob(f'*/{name}.json')):
        rows=read(path)
        if not isinstance(rows,list): raise ValueError(f'{path}: expected an array')
        records.extend(rows)
    records.sort(key=lambda r:r['id'])
    ids=[r['id'] for r in records]
    if len(ids)!=len(set(ids)): raise ValueError(f'Duplicate {name} IDs')
    data[name]=records
    (ROOT/'data'/f'{name}.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
sources={x['id']:x for x in data['sources']}
entities={x['id']:x for x in data['entities']}
def slinks(ids):
    return ', '.join(f"[{sid}]({sources[sid]['url']})" if sid in sources else sid for sid in ids)
def elink(eid):
    e=entities.get(eid)
    return f"[{esc(e['name'])}]({dossier_link(e)})" if e else esc(eid)
def dossier_link(row):
    path=row['dossier_path']
    if '#' in path: return path
    text=(ROOT/path).read_text(encoding='utf-8-sig') if (ROOT/path).exists() else ''
    for line in text.splitlines():
        if re.match(r'^#{1,6} ',line) and row['id'] in line:
            heading=re.sub(r'^#+\s+','',line).lower()
            slug=re.sub(r'[^\w\- ]','',heading).replace(' ','-')
            return path+'#'+slug
    return path
def clinks(ids):
    return ', '.join(f'[{i}](CLAIMS.md#{i.lower()})' for i in ids)

lines=['# Sources','','Core research: 2026-10-10. Character extension: 2026-10-11. Use each record\'s evidence and access dates.','',
'A source can appear under more than one stream ID. This does not add independent evidence.','',
'Access labels are defined in the [method](METHOD.md).','','[Wiki home](README.md).','']
for s in data['sources']:
    lines += [f"## {s['id']}",'',f"[{s['title']}]({s['url']})",'',f"- Publisher or author: {esc(s['publisher'])}.",f"- Published: {s.get('published_date') or 'Unknown'}. Accessed: {s['accessed_date']}.",f"- Type: `{s['source_type']}`. Access: `{s['access']}`."]
    if s.get('locator'): lines.append(f"- Locator: {esc(s['locator'])}.")
    lines += [f"- Limit: {esc(s.get('notes',''))}",'']
write('SOURCES.md','\n'.join(lines))

lines=['# Entity index','','Use each profile’s evidence date. Future roles require an explicit scenario assignment.','',
'Incentives and suggested choices are analysis unless a cited claim states them.','',
'Confirmed duplicate identities are listed in the [alias map](data/entity_aliases.json).','',
'[Wiki home](README.md).','']
for kind in ['government','organization','person','capability','infrastructure']:
    rows=[e for e in data['entities'] if e['kind']==kind]
    lines += [f'## {kind.title()} ({len(rows)})','','| ID | Profile | Dated role or function | Evidence date |','| --- | --- | --- | --- |']
    lines += [f"| {e['id']} | {elink(e['id'])} | {esc(e['summary'])} | {esc(e.get('as_of'))} |" for e in rows]
    lines.append('')
write('ENTITIES.md','\n'.join(lines))

positions=[]
lines=['# Public statements and positions','','These are dated paraphrases. They are not direct quotations.','',
'A statement establishes a public position. It does not prove private intent or successful implementation.','']
for e in data['entities']:
    for n,p in enumerate(e.get('public_positions',[]),1):
        record=dict(id=f"{e['id']}-POS{n:02d}",entity_id=e['id'],**p)
        positions.append(record)
        lines += [f"## {record['id']}",'',f"{elink(e['id'])}. Date: {esc(p.get('date'))}.",'',p['text'],'',f"Evidence: {slinks(p['source_ids'])}",'',f"Limit: {esc(p.get('limits',''))}",'']
lines += ['[Wiki home](README.md).']
write('STATEMENTS.md','\n'.join(lines))
(ROOT/'data'/'statements.json').write_text(json.dumps(positions,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

lines=['# Claim record','','Confidence applies to the narrow claim. It is not an event probability.','',
'`reported_claim` preserves a source’s assertion, estimate, or self-report.','',
'[Wiki home](README.md).','']
for c in data['claims']:
    lines += [f"## {c['id']}",'',c['text'],'',f"Type: `{c['claim_type']}`. Confidence: `{c['confidence']}`. Evidence date: {esc(c.get('as_of'))}.",'',f"Evidence: {slinks(c['source_ids']) or 'Original analysis; no external source attached.'}"]
    if c.get('notes'): lines += ['',f"Limit: {esc(c['notes'])}"]
    lines.append('')
write('CLAIMS.md','\n'.join(lines))

lines=['# Relationships','','A directed link does not imply full control. Check its evidence and date.','',
'Duplicate identities are grouped in the [alias map](data/entity_aliases.json).','',
'| ID | Subject | Link | Object | Evidence | Status |','| --- | --- | --- | --- | --- | --- |']
for r in data['relationships']:
    evidence=slinks(r.get('source_ids',[]))
    if r.get('claim_ids'): evidence += ' '+clinks(r['claim_ids'])
    lines.append(f"| {r['id']} | {elink(r['subject'])} | {esc(r['predicate'])} | {elink(r['object'])} | {evidence} | {esc(r['status'])} |")
lines += ['','[Wiki home](README.md).']
write('RELATIONSHIPS.md','\n'.join(lines))

lines=['# Forecasts and conditional results','','This record includes forecasts, warnings, and study scenarios.','',
'A blank probability is unknown. It is not zero. Study outcomes and survey shares are not war probabilities.','',
'Read the [comparison guide](research/strategy/forecast-comparison.md).','']
for p in data['predictions']:
    prob=p.get('probability')
    lines += [f"## {p['id']}",'',p['statement'],'',f"- Type: `{p['type']}`.",f"- Issued: {esc(p.get('issued_date'))}. Horizon: {esc(p.get('horizon'))}.",f"- Source probability: {str(prob) if prob is not None else 'Not supplied'}.",f"- Conditions: {esc(p.get('conditions'))}",f"- Limit: {esc(p.get('caveats'))}",f"- Evidence: {slinks(p['source_ids'])}",'']
lines += ['[Wiki home](README.md).']
write('PREDICTIONS.md','\n'.join(lines))

lines=['# Scenario index','','All entries are proposed scenarios. None is a claim that the full event chain has occurred.','',
'The [state model](model/README.md) gives candidate conditions and transitions.','',
'| ID | Scenario | Trigger | Status |','| --- | --- | --- | --- |']
for x in data['scenarios']:
    lines.append(f"| {x['id']} | [{esc(x['title'])}]({dossier_link(x)}) | {esc(x['trigger'])} | {esc(x['status'])} |")
lines += ['','[Wiki home](README.md).']
write('SCENARIOS.md','\n'.join(lines))

dups=defaultdict(list)
for s in data['sources']: dups[s['url'].rstrip('/')].append(s['id'])
duplicate_urls=[dict(url=u,source_ids=ids) for u,ids in dups.items() if len(ids)>1]
(ROOT/'data'/'duplicate_sources.json').write_text(json.dumps(duplicate_urls,indent=2)+'\n',encoding='utf-8')
summary={name:len(rows) for name,rows in data.items()}
summary.update(entity_kinds=dict(Counter(x['kind'] for x in data['entities'])),source_access=dict(Counter(x['access'] for x in data['sources'])),unique_source_urls=len(dups),duplicate_source_url_groups=len(duplicate_urls))
(ROOT/'data'/'coverage.json').write_text(json.dumps(summary,indent=2)+'\n',encoding='utf-8')
print(json.dumps(summary,indent=2))
