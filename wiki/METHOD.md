# Research method

## Scope

Study how AI can cause, worsen, prevent, or alter US–China conflict through 2035.
Include Taiwan and other states when their decisions affect a path.
Include commercial, political, technical, and military constraints.
Record high-level capabilities. Do not infer a deployed weapon from a research result.

The corpus uses four research streams.
Each stream has its own ID prefix.
The combined records preserve those IDs.

| Prefix | Stream |
| --- | --- |
| `TW` | Taiwan and chips |
| `SD` | States and defense |
| `AI` | AI ecosystem |
| `ST` | Strategy and evidence |
| `MX` | Cross-domain model links |

## Evidence labels

| Label | Meaning | Game use |
| --- | --- | --- |
| `fact` | A source supports a dated observation or formal provision. | Can inform a dated starting state. |
| `reported_claim` | A source states an allegation, estimate, position, or self-report. | Store the speaker and the claim separately. |
| `forecast` | A source makes a claim about a future event. | Keep its horizon and conditions. |
| `analysis` | This corpus draws an inference from evidence. | Treat it as an editable model assumption. |
| `hypothesis` | A possible event or causal path is proposed. | Use it for a scenario branch. |

These labels describe evidence status. They do not certify truth.
For example, a military inventory can be a well-supported estimate and still be uncertain.

`high`, `medium`, and `low` describe confidence in the narrow recorded claim.
They do not express a numerical probability.
`not_assessed` means that no confidence judgment was made.

## Source selection

Prefer official records for formal powers and public statements.
Prefer original papers for methods and experimental results.
Use independent research to test official and company claims.
Use reputable reporting for events that lack public primary records.
Use blogs when the author has direct knowledge or clear subject expertise.

Record the source's date and the date of access.
Keep a known month or year when the exact day is unknown.
Do not invent an exact date.
Do not use a site's copyright year as its publication date.

`full_text` means the relevant body text was accessible.
It does not mean every reference in that source was checked.
`partial` can mean an executive summary or limited page text.
`abstract` means only the paper abstract was reviewed.
`search_excerpt` means the body was unavailable.
An access limit must remain visible in the source record.

Do not count repeated reporting of one event as independent confirmation.
Do not treat a translated commentary as an official Chinese policy.
Do not treat a US assessment of Chinese intent as direct proof of that intent.

## Forecast rules

Keep the forecast's original issue date.
Keep its exact outcome definition, when supplied.
Keep its assumptions, horizon, and unit of analysis.
Use `null` when the source does not give a probability.
Do not turn a survey share into an event probability.
Do not turn a war game win rate into a war forecast.
Do not turn an AI timeline forecast into a conflict forecast.

Compare different model configurations when a result comes from simulated agents.
Such results can change with prompts, rules, and model versions.
See [the study comparison](research/strategy/llm-wargames.md).

## Causal rules

Separate these five questions:

1. What happened?
2. What does each actor believe happened?
3. Who could act?
4. Who chose to act?
5. What changed after the action?

Record at least one branch that weakens or stops each escalation path.
Record evidence that would contradict the proposed mechanism.
Keep civilian harm, legitimacy, and economic loss in the outcome record.
Do not reduce success to military victory.

## People and control

Record public roles and public statements.
Do not invent private motives, medical traits, or personality scores.
An incentive is an analytical hypothesis unless a source states it.
Entity-level source lists support profile context.
Use claim records for assertions that need a precise evidence link.

A person and their office are separate concepts.
Future office holders are unknown unless a scenario explicitly assigns them.
Removal, elections, succession, boards, courts, and allies can limit player control.

## Writing rules

Use one main point per sentence.
Use active voice when the actor is known.
Use the same term for the same thing.
Define technical terms in the glossary.
Use short sentences. Aim for 20 words or fewer.
Use tables for comparisons.
Retain official names and source titles when they are long.
Do not remove a needed qualification to shorten a claim.

## Update process

Add a source before adding a new factual claim.
Record a correction as a new dated claim.
Preserve the earlier record when it shows a change over time.
Update linked profiles and scenario assumptions.
Run the index builder and validator.
Review source fit by hand. A link check cannot verify truth.
