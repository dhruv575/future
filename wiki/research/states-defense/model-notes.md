# Proposed state and decision fields

This page is design analysis. It proposes a model for 2026-2035. It supplies no calibrated transition probability.

## State fields

| Field | Meaning | Why separate it |
|---|---|---|
| `political_relationship` | Cooperation, competition, coercion or armed conflict | Rivalry need not mean war |
| `incident_cause` | Accident, misuse, unauthorized action, state order or unknown | Technical cause can differ from public blame |
| `attribution_confidence` | Strength of available evidence | Confidence can rise or fall |
| `public_attribution` | What an actor says happened | Public claims can differ from internal belief |
| `authorization_status` | Who approved the relevant act | Product origin does not prove state intent |
| `human_control` | The relevant human decision and its scope | Approval can coexist with flawed advice |
| `alliance_consultation` | Requested, underway, complete or refused | A treaty is not an automatic war button |
| `access_consent` | A partner's permission for proposed use | Partners retain agency |
| `capability_status` | Research, announced, contracted, tested or delivered | Announcements can fail to become fielded systems |
| `warning_confidence` | Confidence in crisis information | An alert is not proof of hostile intent |
| `communication_status` | Available, used, delayed or absent | Channels can enable an exit |
| `economic_interruption` | Extent and duration of disruption | A temporary interruption differs from permanent loss |
| `domestic_authority` | Office holder, legal mandate and institutional constraints | Elections and succession alter choices |

The distinctions draw on public command rules, treaty processes, procurement announcements and escalation research. They are proposed implementation choices. [CRS command structure](https://www.congress.gov/crs-product/IF10542), [Japan-US treaty](https://www.mofa.go.jp/na/st/page1we_000093.html), [DIU Replicator announcement](https://www.diu.mil/latest/defense-innovation-unit-announces-software-vendors-to-support-replicator), [Acton on entanglement](https://carnegieendowment.org/europe/posts/2019/01/why-is-nuclear-entanglement-so-dangerous).

## Decision sequence

1. An event changes what actors can observe.
2. Each actor forms a belief from its own evidence.
3. An institution decides whether a person can take the proposed action.
4. Partners decide on support or access.
5. The action changes material conditions and other actors' beliefs.
6. New evidence can reverse attribution or permit restraint.

This sequence permits mistakes, delays and correction. It does not require a path from every incident to war.

## Required decision gates

For Taiwan political change, require separate events for an election, a policy proposal, approval, corporate implementation and supply interruption. The scenario should not convert a party's victory into PRC control or a US chip cutoff. This follows the institutional distinction between Taiwan self-government and external policy choices. [CRS Taiwan background](https://www.congress.gov/crs-product/IF10275).

For a model-related cyber incident, require separate technical attribution and authorization evidence. The Volt Typhoon accusation and PRC denial provide an example of disputed public attribution. They do not prove the hypothetical model incident. [CISA](https://content.govdelivery.com/accounts/USDHSCISA/bulletins/39171e0), [PRC response](https://www.fmprc.gov.cn/eng/wjb/zzjg_663340/jks_665232/jkxw_665234/202504/t20250414_11594102.html).

For nuclear escalation, retain human decisions. Model advice quality, uncertainty, authority and communication before any terminal outcome. The public human-control commitment does not remove upstream information risk. [2024 bilateral commitment](https://english.www.gov.cn/news/202411/17/content_WS67394d2ac6d0868f4e8ed13c.html), [SIPRI AI study](https://www.sipri.org/sites/default/files/2026-02/2602_ai_integration.pdf).

## Probability limits

Use `null` for an unsupported probability. A designer can later add explicit game weights. Store them apart from research probabilities. A count of wins in a designed wargame is not a frequency estimate for the real world. Scenarios can illustrate mechanisms without estimating their likelihood. [CSIS invasion study](https://csis-website-prod.s3.amazonaws.com/s3fs-public/publication/230109_Cancian_FirstBattle_NextWar.pdf).
