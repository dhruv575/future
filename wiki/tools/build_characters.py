"""Build character indexes and check research coverage. Uses only the standard library."""
import json
import re
import sys
from collections import Counter
from datetime import date
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parents[1]
CHAR = ROOT / "characters"
DATA = CHAR / "data"
CHECKED = "2026-10-11"
errors = []


def check(condition, message):
    if not condition:
        errors.append(message)


def read(path):
    try:
        return json.loads(path.read_text(encoding="utf-8-sig"))
    except (OSError, ValueError) as error:
        errors.append(f"{path.relative_to(ROOT)}: {error}")
        return []


def write_json(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def valid_date(value, label, allow_null=False):
    if value is None and allow_null:
        return
    if not isinstance(value, str) or not re.fullmatch(r"\d{4}(?:-\d{2})?(?:-\d{2})?", value):
        errors.append(f"{label}: invalid date {value!r}")
        return
    try:
        date.fromisoformat(value + {4: "-01-01", 7: "-01", 10: ""}[len(value)])
    except ValueError:
        errors.append(f"{label}: invalid calendar date {value!r}")
    check(value <= CHECKED, f"{label}: date after research check")


entities = {row["id"]: row for row in read(ROOT / "data/entities.json")}
persons = {key: value for key, value in entities.items() if value["kind"] == "person"}
canonical = {key: key for key in persons}
for group in read(ROOT / "data/entity_aliases.json"):
    if group["canonical_id"] in persons:
        for alias in group["alias_ids"]:
            check(alias in persons, f"Alias is not a person: {alias}")
            canonical[alias] = group["canonical_id"]

profiles = []
sources = []
for path in sorted(DATA.glob("*-profiles.json")):
    profiles.extend(read(path))
for path in sorted(DATA.glob("*-sources.json")):
    sources.extend(read(path))
profiles.sort(key=lambda row: row["entity_id"])
sources.sort(key=lambda row: row["id"])
profile_map = {row["entity_id"]: row for row in profiles}
source_map = {row["id"]: row for row in sources}
check(len(profile_map) == len(profiles), "Duplicate profile ID")
check(len(source_map) == len(sources), "Duplicate source ID")
check(set(profile_map) == set(canonical.values()),
      f"Person coverage differs: missing={sorted(set(canonical.values()) - set(profile_map))}, extra={sorted(set(profile_map) - set(canonical.values()))}")

source_fields = {"id", "title", "url", "publisher", "published_date", "accessed_date",
                 "source_type", "access", "locator", "notes"}
for source in sources:
    sid = source["id"]
    check(source_fields <= source.keys(), f"{sid}: missing source fields")
    check(bool(re.fullmatch(r"CH-(?:AI|SD|TW|RD)-\d{3}", sid)), f"{sid}: invalid source ID")
    parsed = urlparse(source.get("url", ""))
    check(parsed.scheme in ("http", "https") and bool(parsed.netloc), f"{sid}: invalid URL")
    check(source.get("access") in ("full_text", "partial", "search_excerpt"), f"{sid}: invalid access")
    valid_date(source.get("published_date"), f"{sid} publication", allow_null=True)
    valid_date(source.get("accessed_date"), f"{sid} access")
    check(source.get("accessed_date") == CHECKED, f"{sid}: unexpected research date")

profile_fields = {"entity_id", "name", "alias_ids", "brief_path", "source_ids",
                  "role_status", "voice_confidence", "evidence_through", "gaps"}
used_sources = set()
brief_paths = set()
for profile in profiles:
    eid = profile["entity_id"]
    check(profile_fields <= profile.keys(), f"{eid}: missing profile fields")
    expected_aliases = {key for key, value in canonical.items() if value == eid and key != eid}
    check(set(profile.get("alias_ids", [])) == expected_aliases, f"{eid}: alias mismatch")
    check(profile.get("voice_confidence") in ("high", "medium", "low"), f"{eid}: invalid voice confidence")
    check(profile.get("role_status") in ("dated_evidence", "unresolved"), f"{eid}: invalid role status")
    valid_date(profile.get("evidence_through"), f"{eid} evidence", allow_null=True)
    check(isinstance(profile.get("gaps"), list) and bool(profile["gaps"]), f"{eid}: gaps required")
    ids = profile.get("source_ids", [])
    check(isinstance(ids, list) and bool(ids), f"{eid}: source list required")
    check(len(ids) == len(set(ids)), f"{eid}: duplicate source reference")
    check(set(ids) <= set(source_map), f"{eid}: unknown sources {sorted(set(ids) - set(source_map))}")
    used_sources.update(ids)
    path = (ROOT / profile.get("brief_path", "")).resolve()
    check(path.parent == (CHAR / "people").resolve(), f"{eid}: brief outside people folder")
    check(path.exists() and path.is_file(), f"{eid}: brief missing")
    check(path not in brief_paths, f"{eid}: brief reused for another canonical person")
    brief_paths.add(path)
    if path.exists() and path.is_file():
        body = path.read_text(encoding="utf-8-sig")
        check(eid in body, f"{eid}: ID missing from brief")
        check("## Evidence" in body and "## Writer inference" in body, f"{eid}: evidence/inference separation missing")
        citations = set(re.findall(r"CH-(?:AI|SD|TW|RD)-\d{3}", body))
        check(citations == set(ids), f"{eid}: brief and ledger source references differ: {sorted(citations ^ set(ids))}")
check(used_sources == set(source_map), f"Unreferenced sources: {sorted(set(source_map) - used_sources)}")
check(brief_paths == {p.resolve() for p in (CHAR / "people").glob("*.md")}, "Unindexed brief files")

roster_path = ROOT.parent / "apps/web/src/game/roster.ts"
roster_ids = re.findall(r'\bid:\s*"([A-Z]{2}-E\d+)"', roster_path.read_text(encoding="utf-8"))
for eid in roster_ids:
    check(canonical.get(eid) in profile_map, f"Game roster person lacks brief: {eid}")

if errors:
    write_json(DATA / "validation.json", {"status": "failed", "checked": CHECKED, "errors": errors})
    print(json.dumps({"status": "failed", "errors": errors}, indent=2))
    sys.exit(1)

write_json(DATA / "profiles.json", profiles)
write_json(DATA / "sources.json", sources)

def cell(value):
    return str(value).replace("|", "\\|").replace("\n", " ")


index = [
    "# Full character index", "", f"Research checked: {CHECKED}.",
    f"{len(profiles)} people cover {len(persons)} original person IDs.", "",
    "Voice confidence is specific to the reviewed public material. Read each brief's gaps.",
    "An evidence date is not a guarantee of complete coverage or future tenure.", "",
]
group_names = {
    "AI": "AI companies",
    "SD": "States and defense",
    "ST": "Researchers and strategy",
    "TW": "Taiwan and semiconductor companies",
}
for prefix, title in group_names.items():
    rows = [p for p in profiles if p["entity_id"].startswith(prefix + "-")]
    index += [f"## {title} ({len(rows)})", "",
              "| Person | Entity ID | Voice | Evidence through |",
              "| --- | --- | --- | --- |"]
    for p in rows:
        relative = Path(p["brief_path"]).relative_to("characters").as_posix()
        index.append(f"| [{cell(p['name'])}]({relative}) | {p['entity_id']} | {p['voice_confidence']} | {p['evidence_through'] or 'Undated'} |")
    index.append("")
index += ["## Duplicate IDs", "", "| Canonical ID | Other ID |", "| --- | --- |"]
for p in profiles:
    for alias in p["alias_ids"]:
        index.append(f"| {p['entity_id']} | {alias} |")
index += ["", "[Character research](README.md).", ""]
(CHAR / "INDEX.md").write_text("\n".join(index), encoding="utf-8")

source_lines = ["# Character sources", "", f"Research checked: {CHECKED}.", "",
                "Read source limits before using a statement. Repeated URLs are not independent evidence.",
                "Publication dates can be partial or unknown.", ""]
for source in sources:
    source_lines += [
        f"## {source['id']}", "",
        f"[{source['title']}]({source['url']})", "",
        f"- Publisher: {source['publisher']}.",
        f"- Published: {source['published_date'] or 'Unknown'}. Accessed: {source['accessed_date']}.",
        f"- Type: {source['source_type']}. Access: {source['access']}.",
        f"- Location: {source['locator']}",
        f"- Limits: {source['notes']}", "",
    ]
source_lines += ["[Character research](README.md).", ""]
(CHAR / "SOURCES.md").write_text("\n".join(source_lines), encoding="utf-8")

voice = Counter(p["voice_confidence"] for p in profiles)
access = Counter(s["access"] for s in sources)
status = "failed" if errors else "passed"
link_count = 0
summary = {
    "status": status, "checked": CHECKED, "people": len(profiles),
    "covered_person_ids": len(persons), "alias_ids": len(persons) - len(profiles),
    "roster_people": len(roster_ids), "source_records": len(sources),
    "unique_source_urls": len({s["url"] for s in sources}),
    "voice_confidence": dict(sorted(voice.items())),
    "source_access": dict(sorted(access.items())),
    "local_links_checked": link_count, "errors": errors,
}
write_json(DATA / "validation.json", summary)
coverage = [
    "# Character coverage", "", f"Research checked: {CHECKED}. Validation: **{status}**.", "",
    "| Item | Count |", "| --- | ---: |",
    f"| Distinct people | {len(profiles)} |",
    f"| Covered person IDs | {len(persons)} |",
    f"| Alias IDs | {len(persons) - len(profiles)} |",
    f"| People on the selection screen | {len(roster_ids)} |",
    f"| Source records | {len(sources)} |",
    f"| Unique source URLs | {summary['unique_source_urls']} |",
    f"| Local links checked | {link_count} |", "",
    "## Voice evidence", "", "| Confidence | People |", "| --- | ---: |",
]
coverage += [f"| {key} | {voice[key]} |" for key in ("high", "medium", "low")]
coverage += ["", "Confidence concerns writing from public material. Private behavior is not verified.",
             "A high label can apply to a formal speech register. Check the brief before using it for a private scene.",
             "", "## Source access", "", "| Access | Records |", "| --- | ---: |"]
coverage += [f"| {key} | {value} |" for key, value in sorted(access.items())]
coverage += ["", "Repeated source URLs do not count as independent evidence.",
             "Full access does not establish that a speaker's claim is true.",
             "", "## Gaps by person", "",
             "These are research limits, not missing profile files. All person IDs are covered.", "",
             "| Person | Gaps to check before writing |", "| --- | --- |"]
for p in profiles:
    relative = Path(p["brief_path"]).relative_to("characters").as_posix()
    coverage.append(f"| [{cell(p['name'])}]({relative}) | {cell(' '.join(p['gaps']))} |")
coverage += ["", "## Validation limits", "",
             "Checks cover JSON fields, IDs, aliases, source references, dates, brief files, text encoding, local link targets, and roster coverage.",
             "They do not verify every external claim, source availability, Markdown anchors, or dialogue quality.",
             "Future roles and actions remain scenario choices.",
             "", "[Character research](README.md) · [Machine-readable result](data/validation.json).", ""]
(CHAR / "COVERAGE.md").write_text("\n".join(coverage), encoding="utf-8")
# Validate after all generated link targets exist, including the first build.
for path in CHAR.rglob("*.md"):
    body = path.read_text(encoding="utf-8-sig")
    for target in re.findall(r"(?<!!)\[[^\]]*\]\(([^\n]+?)\)", body):
        target = target.strip().strip("<>")
        if target.startswith(("http:", "https:", "mailto:", "#")):
            continue
        target = unquote(target.split("#")[0])
        if not target:
            continue
        dest = (path.parent / target).resolve()
        check(dest.exists(), f"{path.relative_to(ROOT)}: broken local link {target}")
        link_count += 1
for path in CHAR.rglob("*"):
    if path.is_file() and path.suffix in (".md", ".json"):
        check("\ufffd" not in path.read_text(encoding="utf-8-sig"), f"{path.relative_to(ROOT)}: invalid text encoding")
final_status = "failed" if errors else "passed"
summary.update(status=final_status, local_links_checked=link_count, errors=errors)
write_json(DATA / "validation.json", summary)
coverage_text = "\n".join(coverage).replace(f"Validation: **{status}**", f"Validation: **{final_status}**")
coverage_text = coverage_text.replace("| Local links checked | 0 |", f"| Local links checked | {link_count} |")
(CHAR / "COVERAGE.md").write_text(coverage_text, encoding="utf-8")
print(json.dumps(summary, indent=2))
sys.exit(1 if errors else 0)
