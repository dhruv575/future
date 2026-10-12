"""Read-only image checks and gallery catalog. Never edits generated pixels."""
import json
from collections import Counter
from pathlib import Path
from PIL import Image

ROOT=Path(__file__).resolve().parents[1]
ART=ROOT/'assets/sprites'
PUBLIC=ROOT/'apps/web/public'
plan=json.loads((ART/'plan.json').read_text(encoding='utf-8'))
entity_ids={e['id'] for e in json.loads((ROOT/'wiki/data/entities.json').read_text(encoding='utf-8'))}
covered=[eid for item in plan for eid in [item['id'],*item['aliases']]]
if len(covered)!=len(set(covered)) or set(covered)!=entity_ids:
    raise ValueError('Sprite IDs and aliases must cover each research entity exactly once.')
rows=[]
seen=set()
for item in plan:
    if item['id'] in seen:
        raise ValueError(f"Duplicate sprite ID: {item['id']}")
    seen.add(item['id'])
    row={k:v for k,v in item.items() if k not in ('prompt','identity_reference')}
    path=PUBLIC/item['src'].lstrip('/')
    if path.is_file():
        with Image.open(path) as im:
            im.verify()
        with Image.open(path) as im:
            if im.format != 'PNG' or 'A' not in im.getbands():
                raise ValueError(f"Expected PNG with alpha: {path}")
            alpha=im.getchannel('A')
            bounds=alpha.getbbox()
            minimum,maximum=alpha.getextrema()
            if bounds is None or maximum < 128:
                raise ValueError(f"Missing visible content: {path}")
            histogram=alpha.histogram()
            visible_pixels=sum(histogram[128:])
            if visible_pixels < im.width*im.height*0.005:
                raise ValueError(f"Too little visible content: {path}")
            row.update(status='ready',width=im.width,height=im.height,format=im.format,has_transparency=minimum==0,content_bounds=bounds,visible_fraction=round(visible_pixels/(im.width*im.height),4),bytes=path.stat().st_size)
        if item['kind']=='person' and item['id']!='AI-E017':
            record=ART/'generation'/f"{item['id'].lower()}.json"
            generation=json.loads(record.read_text(encoding='utf-8-sig')) if record.is_file() else {}
            if generation.get('style_revision')!=item.get('style_revision'):
                row['status']='revision_pending'
    rows.append(row)
catalog=dict(version=1,style='Formal arcade pixel art',counts=dict(Counter(r['kind'] for r in rows)),ready=sum(r['status']=='ready' for r in rows),total=len(rows),items=rows)
(PUBLIC/'sprites/manifest.json').write_text(json.dumps(catalog,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
data=ROOT/'apps/web/src/data'
data.mkdir(exist_ok=True)
(data/'sprites.json').write_text(json.dumps(catalog,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
(ART/'coverage.json').write_text(json.dumps(dict(ready=catalog['ready'],total=len(rows),missing=[r['id'] for r in rows if r['status']!='ready'],no_transparency=[r['id'] for r in rows if r['status']=='ready' and not r['has_transparency']]),indent=2)+'\n',encoding='utf-8')
print(f"Sprites: {catalog['ready']}/{catalog['total']} ready.")
