# Character data

This collection extends the original [entity data](../../data/README.md).
It preserves those entity IDs.
It adds character briefs and a separate source namespace.

## Editable files

Each research group has a `*-profiles.json` file and a `*-sources.json` file.
Edit these files and the linked briefs.
Then run:

```powershell
python wiki/tools/build_characters.py
python wiki/tools/validate.py
```

The build checks IDs, coverage, aliases, source references, dates, brief files, and local links.
It does not verify a source's truth or infer missing evidence.

## Generated files

- [profiles.json](profiles.json): combined profile records.
- [sources.json](sources.json): combined source records.
- [validation.json](validation.json): structural check results.
- [Full index](../INDEX.md), [source index](../SOURCES.md), and [coverage](../COVERAGE.md).

Do not edit generated files.

## Profile fields

| Field | Meaning |
| --- | --- |
| `entity_id` | Canonical person ID from the original wiki. |
| `name` | Display name. Original records can use a different spelling. |
| `alias_ids` | Other original IDs for the same person. |
| `brief_path` | Path from the `wiki` folder. |
| `source_ids` | Sources used by this brief. |
| `role_status` | `dated_evidence` or `unresolved`. Dated evidence can describe a historical role. |
| `voice_confidence` | `high`, `medium`, or `low`; see the brief for its scope. |
| `evidence_through` | Latest dated material or explicit role observation used. Partial dates are retained. This is not a promise of complete coverage through that date. |
| `gaps` | Limits that a writer must review before use. |

All briefs were checked on 11 October 2026.
Undated live sources remain undated in the source ledger.
Their access date must not become a publication date.

## Source fields

Each source has an ID, title, URL, publisher, publication date, access date, type, access status, locator, and notes.
A date can use year, month, or day precision. Unknown publication dates are `null`.

`full_text` means the relevant body was available for review.
It does not mean every page, table, or linked item was audited.
`partial` means only specified sections or an excerpt were reviewed.
`search_excerpt` means the body could not be read; use only the limited indexed text described in the notes.

Source IDs start with `CH-AI`, `CH-SD`, `CH-TW`, or `CH-RD`.
The prefixes identify research groups, not source quality.
The same URL can have more than one record. Those records are not independent evidence.
Sharing a source also does not establish a personal relationship.

Narrative guidance stays in the briefs.
It is not a factual claim table and must not be imported as known private motives or fixed game rules.

[Character research](../README.md).
