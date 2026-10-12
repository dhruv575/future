# The Next Generation

Playable draft of Dario's journey. The player chooses Dario's moral commitments and then faces their consequences. There are twelve endings, with seven optimistic and five bad. The dialogue and causal paths remain open to revision.

The source is [darioJourney.ts](../../../apps/web/src/game/darioJourney.ts). [script.md](script.md) is the full readable script. [BRANCH-MAP.md](BRANCH-MAP.md) lists every complete path. Regenerate them from the repository root with:

```sh
node docs/narrative/dario-the-next-generation/render.mjs
```

## Opening and evidence

The opening is 12 October 2026, after Dario's September announcement, [We Must Pace the Frontier](https://darioamodei.com/post/we-must-pace-the-frontier). The player starts with a public commitment: give embedded outside evaluators access while pacing capability growth so safety work can keep up. The first fictional decision concerns how Dario implements that commitment at Anthropic. Giving reviewers binding stop authority goes beyond the access and reporting commitment in the essay. Starting the trial under internal review explicitly defers the announced outside scrutiny.

Anthropic's October 8 Cyber Mission announcement and October 9 incident report remain background research. The opening does not require the player to recognize an unexplained incident report. It does not move the September essay's publication date into October. This opening revision retains v3 saves through explicit aliases for the changed titles and choice label.

The [research archive](../../../wiki/characters/dario-amodei/README.md) and [profile](../../../wiki/characters/people/ai-e017.md) distinguish evidence from inference. The game carries primary-source links and limits in its Research notes panel. The sources motivate dilemmas; none predicts a particular terminal state or supplies a probability for it. All meetings, dialogue, findings after the opening, laws, votes, wars, treatments, and news screens are fiction. Named supporting people draw on the [Anthropic cast guide](../../../wiki/characters/anthropic-cast/README.md); their lines are invented.

## Decisions and continuity

Each run has five choices:

1. Trust Anthropic's judgment or give outside reviewers authority to stop it.
2. Pursue RSI, focus on benefits from existing models, or ask to close Anthropic.
3. Choose whom to trust with power and what responsibility to retain.
4. Decide whether to bind yourself to other people's decisions.
5. Respond when your hopes or fears conflict with those commitments.

Every meeting starts with a short arrival screen. It gives the place, date, elapsed time, and reason for meeting. Every choice has a consequence screen. Endings have three to six dated event screens before the final scene. The game uses documents, news, transmissions, and environmental scenes. It does not jump directly to 2035.

State variables record agreements and authority. Scores summarize control evidence, trust, research progress, and tension. They are not probabilities or moral grades and never select an ending. Progress is not a compute budget. Review failure has specific causes: shared approval tools, incomplete records, access expansion, or a missing independent channel. A low score alone never starts a war or makes a model escape.

## Moral choices, not a funding crisis

Assume enough compute and financing for the proposed work. This is a user-directed scenario assumption, not a factual claim about Anthropic's balance sheet. Do not invent a cash shortage, compute renewal, or exclusive funding offer to force a branch. A partnership is a choice about mission and authority. Use the research for Dario's stated hopes and concerns; it does not establish his private decisions.

Dario raises shutdown himself. Daniela asks whether leaving would make people safer when the other labs continue. She explains obligations to staff and customers without presenting shutdown as a budget option. Dario can also pause frontier training and work with existing models. The player chooses which position he takes.

The medical and utility projects can both continue. Dario chooses where to lead. In the medical branch, the later choice concerns who can approve a return to frontier training. An independent committee can block him if he gave it that authority. Medical studies and patient access do not lose support when he seeks a return to model research. The `restartAuthority` state records this choice.

After closure, Dario chooses whether to stay involved in independent oversight. In the government branch, he chooses whether national defense justifies giving the state authority over new uses. He receives no extra compute for relaxing those limits. Supporting characters present disagreements and consequences; they do not choose his moral position for him.

This revision uses save version v3 because several choices now have different meanings. Earlier v1 and v2 saves remain stored and are not reinterpreted as new choices. The current route starts from the opening. Sam and Trump saves are unchanged.

Validation: `pnpm check` passed. All 72 paths still reach the twelve endings. Tests verify that no choice requires a minimum research-progress score, the new restart-authority state controls the medical branch, and old saves are retained. Browser review checked Dario introducing closure, the three company choices, and the medical route where an independent committee blocks his later restart request. That route reached the medical ending. The game was returned to its opening. See [moral-choice.jpg](moral-choice.jpg).

Boards approve major company decisions. Dario can propose and advise. A complete shutdown ends the company, not his ability to fund independent research or work as an adviser. The four requested shutdown outcomes retain that closure. International transfers require fictional legal authorization and a custodian. Dario cannot waive a treaty, command another company, or order a strike.

## What the endings assume

- Safe RSI requires independent reproduction, separated authority, enforceable stops, continued security work, and assumed technical success. Passing a finite set of tests is not proof of universal safety.
- Medical benefit requires successful trials, regulatory authorization, manufacturing, and funded access. A model result alone does not deliver treatment.
- Public or shared ownership is separate from technical control. The good institutional endings show an adverse decision, inspection, or court remedy being obeyed.
- The US–China good ending requires difficult reciprocal access, implementation, and later compliance. An unenforced pledge is insufficient.
- The conquest ending is an extreme scenario. It assumes a long, sustained Chinese capability advantage, failed US rebuilding, allied fragmentation, conventional defeat, restraint from nuclear first use, and a coerced settlement followed by loss of US sovereignty. The sources establish none of this chain as probable. Anthropic's closure alone does not cause it.
- The two containment endings assume unauthorized systems can persist and disrupt essential infrastructure despite human countermeasures. The script shows global collapse; it does not claim verified human extinction or provide technical methods for causing the disaster.
- The nuclear ending assumes repeated human escalation decisions, failed mediation, perceived threats to command systems, first use, and retaliation. A company leader supplies advice; state leaders issue orders. The same late advice can be rejected when an earlier independent channel preserved contrary evidence.
- The domestic authoritarian ending has functioning model control but failed public control. AI is used by people to suppress opposition. It does not need to become an independent actor.

## Validation

The runtime tests enumerate all 72 paths. They check exactly five decisions, all twelve reachable endings, seven optimistic and five bad, advancing dates, valid assets and speakers, consequence screens after decisions, and save replay. Paired paths check that inherited institutions change later outcomes. Existing Sam and Trump routes retain their own saves.

This is a deterministic playable draft. It does not contain calibrated forecasts, hidden random outcomes, or a claim that seven optimistic endings imply a seven-in-twelve chance of success.

`pnpm check` passed for the full monorepo. Browser checks completed the medical and nuclear routes, checked save resumption, and verified portrait mirroring. Event cards, choices, and ending controls were reviewed at 1600×855, 390×844, and 844×390. No app console errors were observed; the browser extension emitted unrelated telemetry errors. The temporary viewport override was reset. The new hospital and missile images loaded in their intended scenes.
# Anthropic cast update

Nine supporting people replace the generic Anthropic research and legal roles. See the [cast guide](../../../wiki/characters/anthropic-cast/README.md) for public roles, evidence limits, and writer guidance.

Dario and Jack open with the public pacing commitment. Jared, Jan, and Chris discuss its implications for the next trial. Dario later raises the company's future, and Daniela challenges his reasoning. Amanda raises questions about behavior and human interests. Brian explains authority and binding terms. Tom and Krishna remain in the researched cast; the opening does not need a compute or financial barrier.

All lines remain fiction. The game assumes continued involvement where needed. Two-person shots keep Dario at the left and cut to the person speaking at the right. Dario's reply retains that counterpart. The five decisions, 72 routes, and twelve endings are unchanged.

## Continuity revision

The second draft rewrites all 122 existing scenes and adds 21 arrivals, for 143 scenes. Dialogue uses shorter sentences and concrete terms. Each branch follows one problem: testing, a handover, an inspection deal, a federal contract, a medical project, or an incident report.

Later proposals now have an earlier setup. The public lab first appears in December. The medical route follows one possible treatment through tests, funding, and trials. The June security crisis follows a second outage after months of talks. The medical route recalls the October review rules before asking to return to model research.

The shared peace ending uses separate text for the shutdown and active-company paths. The shutdown path concerns sites left out of an agreement. It no longer invents an outage or a naval crisis.

This draft uses a new save key. Old Dario checkpoints remain stored, but the revised route starts from its new opening. Sam and Trump saves are unchanged.

Validation covers all 72 paths, the arrival before every decision, and both versions of the shared peace ending. Browser review completed the medical path from the opening through patient access. The new arrival screen was checked at the normal desktop size. The game was then returned to Dario's opening.

## Language and scene surfaces

Write for a reader who follows technology but does not work inside an AI lab. Use normal terms such as compute, training run, evaluation, model weights, and RSI. Establish a term through the work being proposed. Explain an unfamiliar concept once, when it affects a decision. Avoid generic labels such as "the program" until the work, owner, and purpose are clear.

The frontier branch concerns using Claude to propose training changes for the next Claude. Staying independent keeps the mission within Anthropic. A lab partnership shares authority. A federal partnership makes national defense a core mission. These choices do not depend on a financing need.

Keep training experiments separate from evaluations in the prose. Experiments change the model; evaluations measure capability or control. A claimed gain can disappear because the evaluation became easier. Review authority determines who can stop a training run or release. Avoid using "test" for all of these actions in the same conversation.

Intermediate events use physical scene surfaces. Lab findings appear on a workstation. Board decisions and agreements appear on paper on a desk. News uses a monitor with footage. Dispatches use a briefing display. Arrival scenes retain the room and incoming characters. Environmental events keep the full scene with a short caption. Reports use third-person wording appropriate to the document or broadcast.

The earlier language-only revision preserved v2 saves through explicit label aliases. The current moral-choice revision uses v3 because the meaning of some choices changed. Choices, effects, flags, and state still require a valid replay.

The full monorepo check passed after this revision. Tests cover all 72 paths and restore saved runs with the previous labels. Browser review checked the desk, workstation, news, and dispatch displays, then completed the federal route to the peace ending. Desktop and phone layouts were checked; the landscape news display keeps long text scrollable within the monitor. The viewport was reset, and the game was returned to Dario's opening. See [report-scene.jpg](report-scene.jpg), [news-scene.jpg](news-scene.jpg), and [arrival.jpg](arrival.jpg).


## Ending art

The frontier coalition now includes Meta and SpaceX's AI team alongside Anthropic, OpenAI, and DeepMind. Mark Zuckerberg and Elon Musk speak in both review negotiations. Their participation, terms, and dialogue are fictional. Role and company evidence is attached to their scenes. The previous coalition choice label remains accepted for existing saves. Demis remains a supporting speaker; Elon replaces his locked selection card.

All twelve terminal scenes now have distinct dramatic pixel-art backgrounds. The story, choices, save key, and intermediate scenes are unchanged. The final screen hides large character sprites and places the summary and controls directly over the art. See [asset and prompt index](../../../assets/scenes/endings.md).

All twelve images were visually reviewed. The medical route was played through in the browser, and its final screen was checked at desktop and phone sizes. See [ending preview](ending-preview.jpg). The full monorepo check passed, including all 72 Dario paths and all 12 endings.
