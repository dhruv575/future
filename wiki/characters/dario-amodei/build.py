"""Build the archive index and quote bank; verify local files and source links."""
import hashlib
import json
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CHECKED = "2026-10-11"


def read(name):
    return json.loads((ROOT / name).read_text(encoding="utf-8"))


def write(name, data):
    (ROOT / name).write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def normalized(text):
    return " ".join(text.split())


catalog = read("catalog.json")
downloads = read("downloads.json")
quotes = read("quotes.json")
curation = read("curation.json")
items = {item["id"]: item for item in catalog}
records = {item["id"]: item for item in downloads}
errors = []
assert len(items) == len(catalog), "Duplicate catalog IDs"
assert set(items) == set(records), "Catalog/download mismatch"
assert set(items) == set(curation), "Missing review records"

for sid, record in records.items():
    if record.get("raw_path"):
        raw = ROOT / record["raw_path"]
        if not raw.exists() or hashlib.sha256(raw.read_bytes()).hexdigest() != record["sha256"]:
            errors.append(f"{sid}: original file missing or hash differs")
        if not (ROOT / record["text_path"]).exists():
            errors.append(f"{sid}: extracted text missing")

quote_lines = [
    "# Dario Amodei: verified short quotes", "",
    f"Checked: {CHECKED}. All excerpts are Dario's words. Coauthored works are not quoted here.", "",
    "These are excerpts, not reconstructed dialogue. Keep the context and date.",
    "Text was matched to the local source after whitespace normalization. The Caltech passage was also checked against the page image.",
    "Interview speaker attribution was checked in the transcript. No audio verification is claimed.", "",
    "[Machine-readable bank](quotes.json) · [Source archive](README.md) · [Character profile](../people/ai-e017.md)", "",
]
words_by_source = Counter()
for quote in quotes:
    sid = quote["source_id"]
    record = records[sid]
    body = normalized((ROOT / record["text_path"]).read_text(encoding="utf-8"))
    if normalized(quote["quote"]) not in body:
        errors.append(f"{quote['id']}: exact text not found in {sid}")
    words_by_source[sid] += len(quote["quote"].split())
    quote_lines += [
        f"## {quote['id']}: {quote['topic']}", "", f"> {quote['quote']}", "",
        f"[Original]({items[sid]['url']}) · [Local text]({record['text_path']}) · {items[sid]['published_date'] or 'Undated'}.", "",
        f"Location: {quote['locator']}", "",
        f"Context: {quote['context']}", "",
        f"Limit: {quote['guard']}", "",
    ]
for sid, count in words_by_source.items():
    # The same brief excerpt appears in JSON and this readable rendering.
    if count * 2 > 25:
        errors.append(f"{sid}: excerpt budget exceeded")

downloaded = sum(bool(r.get("raw_path")) for r in records.values())
lines = [
    "# Dario Amodei: writing and voice archive", "",
    f"Research checked: **{CHECKED}**. Entity: `AI-E017`.", "",
    "[Expanded profile](../people/ai-e017.md) · [Quote bank](QUOTES.md) · [Story research notes](STORY-NOTES.md)", "",
    "## Coverage", "",
    f"The catalog has **{len(catalog)} source records** and **{downloaded} downloaded original files**. The WSJ web page and print edition are one work in two formats.",
    f"The quote bank has **{len(quotes)} verified excerpts**.", "",
    "All six essays and posts listed on Dario's current personal site and sitemap are archived, including *Machines of Loving Grace*.",
    "The wider set includes signed statements, testimony, an early student essay, an op-ed, research talks, coauthored papers, interviews, and institutional context.",
    "This is a public-writing corpus for character research, not a complete lifetime bibliography. Coauthored technical papers are a selected foundation set.", "",
    "The NYT op-ed is not available in full here. Five older OpenAI posts have blocked direct downloads; their public web-reader pages supplied attribution and content for discovery. They are not marked as downloaded originals.",
    "The WSJ article's direct page was blocked, but its publisher-hosted January 7, 2025 print edition was downloaded and page A17 checked visually.",
    "The Caltech /1/ download link returned 404; the current /01/ link worked. The March 3, 2003 issue and its signed page 5 were recovered and checked.", "",
    "The author's /archive link returned 404. Current homepage and sitemap coverage does not prove that deleted writing was found.",
    "Social posts, private or leaked correspondence, all videos, and the complete academic bibliography are outside the completed set. No missing work is reconstructed from secondary summaries.", "",
    "## Read first", "",
    "1. [Machines of Loving Grace](text/DA-W01.txt): the positive vision and its assumptions.",
    "2. [The Adolescence of Technology](text/DA-W04.txt): the wider set of risks.",
    "3. [The Urgency of Interpretability](text/DA-W03.txt): the limits of current control tools.",
    "4. [Policy on the AI Exponential](text/DA-W05.txt): policy proposals across several domains.",
    "5. [We Must Pace the Frontier](text/DA-W06.txt): the latest personal position in this set.",
    "6. [Dwarkesh, February 2026](text/DA-I01.txt): spoken argument under sustained challenge.", "",
    "## How to use the records", "",
    "`catalog.json` records publication metadata. `downloads.json` records URLs, retrieval times, file paths, byte counts, and SHA-256 hashes. `curation.json` records attribution, review scope, and limits.",
    "Original files preserve the retrieved source. Extracted text is a reading aid; PDF columns, footnotes, and linked phrases can disrupt reading order. Use the PDF for exact context.",
    "An available full text is not a claim that every statement was independently verified. Institutional statements are not personal writing unless a byline identifies Dario.",
    "Raw files are local research material, not game assets or a grant of republication rights.", "",
]
groups = [
    ("Personal essays, posts, statements, and testimony", {"personal_essay", "personal_post", "signed_statement", "written_testimony", "bylined_op_ed", "bylined_op_ed_print", "student_op_ed", "talk_slides"}),
    ("Earlier coauthored posts", {"coauthored_post"}),
    ("Selected coauthored research", {"coauthored_paper", "coauthored_report"}),
    ("Spoken voice samples", {"interview_transcript"}),
    ("Institutional context", {"institutional_context"}),
    ("Discovery records", {"discovery"}),
]
for heading, categories in groups:
    lines += [f"## {heading}", "", "| ID | Work and date | Local copy | Review scope and limit |", "| --- | --- | --- | --- |"]
    for item in catalog:
        if item["category"] not in categories:
            continue
        sid = item["id"]
        record = records[sid]
        review = curation[sid]
        local = f"[Original]({record['raw_path']}) · [Text]({record['text_path']})" if record.get("raw_path") else record.get("reason", "Unavailable")
        limit = f"{review['review_scope']} {review['limits']}".replace("|", "\\|")
        lines.append(f"| {sid} | [{item['title']}]({item['url']})<br>{item['published_date'] or 'Undated'} | {local} | {limit} |")
    lines.append("")
lines += [
    "## Verification and maintenance", "",
    "Run `python wiki/characters/dario-amodei/build.py` to verify original hashes, quote matches, and local links, then rebuild this index and the readable quote bank.",
    "Run `python wiki/tools/build_characters.py` and `python wiki/tools/validate.py` for the wider corpus.",
    "`download.py` fetches public originals. It does not bypass access controls. A fresh download changes the snapshot; review the new body before reusing its evidence or quotes.", "",
]

# Write these before checking links, as they refer to one another.
(ROOT / "QUOTES.md").write_text("\n".join(quote_lines), encoding="utf-8")
(ROOT / "README.md").write_text("\n".join(lines), encoding="utf-8")
for path in [ROOT / "README.md", ROOT / "QUOTES.md", ROOT / "STORY-NOTES.md", ROOT.parent / "people/ai-e017.md"]:
    for target in re.findall(r"\]\(([^)]+)\)", path.read_text(encoding="utf-8")):
        if not target.startswith(("https://", "http://", "#")) and not (path.parent / target.split("#")[0]).exists():
            errors.append(f"{path.name}: broken link {target}")
result = {"status": "failed" if errors else "passed", "checked": CHECKED, "catalog_records": len(catalog), "original_files": downloaded, "verified_quotes": len(quotes), "errors": errors}
write("validation.json", result)
print(json.dumps(result, indent=2))
raise SystemExit(bool(errors))
