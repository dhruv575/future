"""Build the supporting-cast research records from the reviewed cast ledger."""
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
WIKI = HERE.parents[1]
DATA = WIKI / "characters/data"
PART = WIKI / "data/parts/anthropic-cast"
PART.mkdir(exist_ok=True)

def read(path):
    return json.loads(path.read_text(encoding="utf-8"))

def write(path, rows):
    path.write_text(json.dumps(rows, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

cast = read(HERE / "cast.json")
sources = {}
for path in DATA.glob("*-sources.json"):
    sources.update({s["id"]: s for s in read(path)})
source_ids = sorted({sid for person in cast for sid in person["source_ids"]})
source_map = {sid: f"AC-S{i:03}" for i, sid in enumerate(source_ids, 1)}
write(PART / "sources.json", [{**sources[sid], "id": source_map[sid]} for sid in source_ids])
entities, profiles, relationships = [], [], []
for i, person in enumerate(cast, 1):
    eid = person["id"]
    brief = f"characters/people/{eid.lower()}.md"
    refs = person["source_ids"]
    entities.append(dict(id=eid, name=person["n"], kind="person", summary=person["role"],
                         as_of="2026-10-11", source_ids=[source_map[s] for s in refs],
                         dossier_path=brief, roles=[person["role"]],
                         constraints=["Future authority and dialogue are scenario assumptions."]))
    profiles.append(dict(entity_id=eid, name=person["n"], alias_ids=[], brief_path=brief,
                         source_ids=refs, role_status="dated_evidence", voice_confidence=person["voice"],
                         evidence_through="2026-10-11", gaps=[person["gap"]]))
    relationships.append(dict(id=f"AC-R{i:03}", subject=eid, predicate="works at", object="AI-E002",
                              source_ids=[source_map[refs[0]]], claim_ids=[], status="sourced"))
    citations = " ".join(f"[{sid}]({sources[sid]['url']})" for sid in refs)
    body = [f"# {person['n']}", "", f"Entity: `{eid}`. Checked: 2026-10-11.",
            f"Voice confidence: **{person['voice']}**. Live role pages are undated; the check date is not an appointment date.",
            "", "## Evidence", "", person["role"], "", person["evidence"], "", citations,
            "", "## Writer inference", "", person["inference"], "",
            "Scene assignments: " + ", ".join(f"`{s}`" for s in person["scenes"]) + ".",
            "", "All game dialogue is invented. It is not a quote, endorsement, or account of a private meeting.",
            "", "## Gaps and refresh needs", "", person["gap"], "", "## Sources", ""]
    for sid in refs:
        s = sources[sid]
        body.append(f"- [{sid}: {s['title']}]({s['url']}). Published: {s['published_date'] or 'Undated'}. Accessed: {s['accessed_date']}. {s['locator']}. {s['notes']}")
    body += ["", "[Cast guide](../anthropic-cast/README.md) · [Character index](../README.md)", ""]
    (WIKI / brief).write_text("\n".join(body), encoding="utf-8")
write(PART / "entities.json", entities)
write(PART / "relationships.json", relationships)
write(DATA / "anthropic-cast-profiles.json", profiles)
print(f"Built {len(cast)} supporting people, {len(source_ids)} source mappings, and {len(relationships)} affiliations.")
