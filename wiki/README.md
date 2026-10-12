# AI and US–China conflict, through 2035

This wiki is a research base for a choice-based game.
Players can control a person or an organization.
The research covers conflict, restraint, and recovery.

Research cutoff: **10 October 2026**.
The [Anthropic supporting cast](characters/anthropic-cast/README.md) extends entity and source records through **11 October 2026**. Each record retains its own evidence date.
Future events in scenarios are assumptions.
Source dates can be older than the cutoff.
This is a broad corpus. It is not a complete list of all relevant actors.

## Start here

1. Read the [research method](METHOD.md).
2. Read the [main findings](SYNTHESIS.md).
3. Use the [entity index](ENTITIES.md) to find people, governments, firms, and capabilities.
4. Use the [scenario index](SCENARIOS.md) to find possible flashpoints.
5. Check the [forecast record](PREDICTIONS.md) before assigning any probabilities.
6. Read the [state model](model/README.md) to prepare the game.
7. Use the [character research](characters/README.md) before writing roles, goals, or dialogue. This extension was checked on 11 October 2026.

## Research areas

| Area | Main contents |
| --- | --- |
| [Taiwan and chips](research/taiwan-chips/README.md) | Elections, parties, TSMC, suppliers, trade controls, and access to chips |
| [States and defense](research/states-defense/README.md) | Governments, public leaders, alliances, military capabilities, and nuclear risk |
| [AI ecosystem](research/ai-ecosystem/README.md) | Labs, public leaders, models, agents, misuse, and control failures |
| [Strategy and evidence](research/strategy/README.md) | Conflict mechanisms, research papers, forecasts, and paths to restraint |

## Data and maintenance

- [Sources](SOURCES.md): dates, links, access limits, and source types.
- [Claims](CLAIMS.md): individual claims with evidence labels.
- [Relationships](RELATIONSHIPS.md): links between entities.
- [Public positions](STATEMENTS.md): dated statements from people in the corpus.
- [Data guide](data/README.md): stable IDs and record formats.
- [Glossary](GLOSSARY.md): terms used in this wiki.
- [Open questions](GAPS.md): gaps that can change the model.
- [Coverage report](COVERAGE.md): record counts and validation results.

The JSON files in `data/parts/` contain the research records.
The combined JSON files in `data/` support later game development.
The Markdown indexes are generated from those records.
Edit the part records first. Then rebuild the indexes.

From the project folder, run:

```powershell
python wiki/tools/build_indexes.py
python wiki/tools/validate.py
```

The prose uses short sentences and defined terms, in the requested STE style.
It has not had a full ASD-STE100 dictionary audit.

## Main limits

Source confidence is not the chance of an event.
A war game result is conditional on the game rules.
A company statement is evidence of its claim, not independent proof.
A plan is not an installed capability.
A person can use only the powers of their role.
Refresh time-sensitive roles and rules before a game starts.
