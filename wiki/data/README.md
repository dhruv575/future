# Data guide

Use UTF-8 JSON arrays for research records.
An ID is stable even when a name or office changes.
Do not use an entity name as a database key.

| File | Contents | Required core fields |
| --- | --- | --- |
| `sources.json` | Source records | `id`, `title`, `url`, `publisher`, `published_date`, `accessed_date`, `source_type`, `access`, `notes` |
| `entities.json` | People, organizations, states, capabilities, and infrastructure | `id`, `name`, `kind`, `summary`, `as_of`, `source_ids`, `dossier_path` |
| `claims.json` | Individual evidence claims | `id`, `text`, `claim_type`, `source_ids`, `as_of`, `confidence`, `notes` |
| `relationships.json` | Directed links between entities | `id`, `subject`, `predicate`, `object`, `source_ids`, `claim_ids`, `status` |
| `predictions.json` | Forecasts, conditional results, warnings, and source scenarios | `id`, `statement`, `source_ids`, `issued_date`, `horizon`, `probability`, `conditions`, `caveats`, `type` |
| `scenarios.json` | Proposed branches | `id`, `title`, `status`, `trigger`, `actors`, `source_ids`, `claim_ids`, `branches`, `caveats`, `dossier_path` |

The `parts/` folders are the editable source records.
The combined files are generated views.
Extra fields can preserve useful source detail.
Dates can use `YYYY`, `YYYY-MM`, or `YYYY-MM-DD` when precision differs.
Use JSON `null` for an unknown date or probability.

`probability` is a number from 0 to 1 only when the cited source gives that probability.
A scenario or warning can have no probability.
The probability must retain its event definition and horizon.
The game transition files use separate probabilities. They default to `null`.

`dossier_path` is relative to the `wiki` folder.
Source URLs link to external evidence.
Claim and entity IDs link records inside the corpus.
Entity incentives and game choices remain analysis unless a cited claim states them.

## Relationship rules

Examples include `leads`, `supplies`, `regulates`, `advises`, and `estimates`.
The `subject` and `object` must be known entity IDs.
A relationship does not imply full control.
For example, investment does not imply command authority.

Some streams record the same entity under different IDs.
The [alias map](entity_aliases.json) groups confirmed duplicate identities.
Keep distinct agencies, offices, firms, and model families separate.

## Model files

The [model folder](../model/README.md) contains proposed state variables and transitions.
These files contain design assumptions.
Research sources can support a mechanism without proving an exact transition rule.
The validator checks syntax and reference integrity.
It cannot validate a political forecast.
