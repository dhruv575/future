# States, defense and public authority

Research cutoff: 2026-10-10. Scenario horizon: 2035.

This module separates institutions, people, capabilities and suppliers. It records evidence and its limits. It does not assign a probability to war.

| Read | Purpose |
|---|---|
| [Governments and institutions](actors.md) | Authority, constraints and public policy |
| [Public people](people.md) | Dated roles, statements and evidence limits |
| [Nuclear forces and control](nuclear.md) | Comparable estimates, doctrine and human control |
| [Other defense capabilities](capabilities.md) | AI, autonomy, cyber, space and conventional forces |
| [Defense firms](contractors.md) | Suppliers and corporate decision limits |
| [Escalation and restraint](scenarios.md) | Five hypothetical paths, each with an exit |
| [Model notes](model-notes.md) | Proposed state variables and decision rules |
| [Claims](claims.md) | Sourced facts, attributed claims and analysis |
| [Predictions](predictions.md) | Conditional results and warnings |
| [Source register](sources.md) | Links, dates, access limits and source type |
| [Structured data](../../data/parts/states-defense/) | Six JSON arrays for integration |

The module has 65 sources, 75 entities, 31 claims, 40 relations, five prediction records and five scenarios. It includes 29 people. These are selected relevant actors. The list is not exhaustive.

## Main findings

Human control of a nuclear-use decision does not remove AI risk. AI can affect warning, advice and human interpretation before that decision. Public US policy requires positive human action. PRC policy states that nuclear command remains centralized. The sources do not establish that an LLM can authorize nuclear use. [CRS, January 2026](https://www.congress.gov/crs-product/IF11697), [PRC white paper, November 2025](https://www.fmprc.gov.cn/eng/zy/wjzc/202511/t20251127_11761656.html), [SIPRI, February 2026](https://www.sipri.org/sites/default/files/2026-02/2602_ai_integration.pdf).

An alliance is a decision framework. Treaty scope, national processes and consultation matter. A Taiwan crisis is not an automatic US-Japan-Philippines war. The Taiwan Relations Act does not require US intervention. [Japan-US treaty](https://www.mofa.go.jp/na/st/page1we_000093.html), [US-Philippines guidelines](https://media.defense.gov/2023/May/03/2003214451/-1/-1/0/BILATERAL-DEFENSE-GUIDELINES-FACT-SHEET.PDF), [CRS Taiwan background, August 2025](https://www.congress.gov/crs-product/IF10275).

Game results depend on assumptions. The CSIS invasion and blockade studies support conditional branches. Their iteration counts are not real-world war probabilities. RAND's AI perspective has a 2040 horizon. This corpus uses its proposed mechanism, without changing the forecast date to 2035. [CSIS invasion study, 2023](https://csis-website-prod.s3.amazonaws.com/s3fs-public/publication/230109_Cancian_FirstBattle_NextWar.pdf), [CSIS blockade discussion, 2025](https://www.csis.org/analysis/lights-out-wargaming-blockade-taiwan), [RAND, 2018](https://www.rand.org/pubs/perspectives/PE296.html).

## Evidence rules

- An official statement proves that an institution made a statement. It does not prove that all conduct matches the statement.
- A company page can establish a product claim. It does not establish combat effectiveness.
- An old biography does not prove current tenure. An undated live page is an access-date snapshot.
- A search excerpt is limited evidence. Its access status is explicit in the source register.
- A hypothesis can use real mechanisms. Its complete causal chain remains hypothetical.
- Incentives marked as design analysis are proposed game behavior. They are not private motives.

## Known limits

The PRC command system is opaque. Some US and PRC government pages blocked direct access. Several firm pages returned only navigation. Their records retain `search_excerpt` status. The current full CMC roster and AVIC leadership were not established. Brian Schimpf's role is bounded to the opened evidence from January 2025. Do not fill these gaps with older names.

The module omits operational targeting, attack procedures and system vulnerabilities. It uses high-level capability classes. Fiscal, industrial and political limits remain separate from a weapon's existence.

The prose uses short sentences and simple terms. It does not claim certified ASD-STE100 compliance.

`build_corpus.py` generates the six data arrays and the actors, people, claims, predictions, scenarios and source pages. The other pages contain reviewed synthesis. Recheck dated roles before a new game baseline.
