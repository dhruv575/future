# The Next Generation

Playable draft. Generated from [darioJourney.ts](../../../apps/web/src/game/darioJourney.ts). Do not edit this rendered copy.

- This route starts on 12 October 2026, after Dario's September essay We Must Pace the Frontier. The announcement is the starting commitment. Its implementation meetings, decisions, results, and all dialogue are fictional.
- Compute and financing are available for the proposed work. This is a story assumption, not a claim about Anthropic's finances. Choices concern Dario's aims, acceptable risks, and willingness to share or surrender authority.
- Recursive self-improvement means systems help produce more capable successors across repeated cycles. AI already contributes to AI research at the opening. Fully autonomous or reliably controlled self-improvement is not assumed, and self-improvement does not itself imply safety or superintelligence.
- Seven optimistic endings and five bad endings are narrative alternatives, not probabilities. Progress tracks frontier research, not available compute or money. Scores do not measure morality or determine the ending.
- The route compresses negotiations and research timelines. Success depends on assumed technical progress and institutional compliance. Nuclear escalation, global collapse, and US subjugation require strong additional assumptions; they are not predictions from the cited sources.
- Dario controls company proposals and his own advice. Boards, governments, courts, researchers, and operators act under their own authority. Event screens can show the player events Dario learns about later.

## A_D1_REVIEW: Pacing the Frontier

2026-10-12 · reaction · evaluation-lab

Event screen: arrival. All event content is fictional.

**Narration:** You have announced Pacing the Frontier: slow AI capability growth so safety work can keep up. You have promised outside evaluators access to Anthropic. Now your team wants to expand Claude's role in building the next model. You must decide how to honor that commitment.

Default continuation → D1_REVIEW

Research context: [CH-AI-060](https://www.anthropic.com/news/investigating-unintended-model-actions), [CH-AI-061](https://www.anthropic.com/news/anthropic-cyber-mission), [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-054](https://www.anthropic.com/institute/recursive-self-improvement), [CH-AI-062](https://www.anthropic.com/company/leadership), [CH-AI-064](https://aligned.substack.com/p/alignment-is-not-solved-but-increasingly-looks-solvable), [CH-AI-052](https://lexfridman.com/dario-amodei-transcript/), [CH-AI-067](https://arxiv.org/abs/2001.08361), [CH-AI-066](https://www.anthropic.com/constitution). See source limits in the game.

## D1_REVIEW: Put the pacing commitment into practice

2026-10-12 · decision · evaluation-lab

**Dario Amodei:** I've asked other labs to slow capability growth so safety work can keep up. Now we have to decide what that means for our own research.

**Jack Clark:** You committed us to embedded outside evaluators. Access lets them inspect and report what we do. Giving them the power to stop a run would go further.

**Jared Kaplan:** Claude is already helping us improve our models. The team wants to expand that work. Researchers would run the experiments offline.

**Jan Leike:** We can wait for the outside team and give it authority to stop the trial. Starting under internal review would mean postponing the outside scrutiny we announced.

**Chris Olah:** Keeping the work offline limits access. It doesn't tell us whether we understand or control the model's behavior.

**Dario Amodei:** I still want the benefits of stronger AI. If I ask others to accept outside scrutiny, I need to decide how much authority I'm willing to give up.

- **outside: Give outside reviewers authority to stop the trial.** → D1_OUTSIDE
- **inside: Start under internal review. Defer outside evaluators.** → D1_INSIDE

Research context: [CH-AI-060](https://www.anthropic.com/news/investigating-unintended-model-actions), [CH-AI-061](https://www.anthropic.com/news/anthropic-cyber-mission), [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-054](https://www.anthropic.com/institute/recursive-self-improvement), [CH-AI-062](https://www.anthropic.com/company/leadership), [CH-AI-064](https://aligned.substack.com/p/alignment-is-not-solved-but-increasingly-looks-solvable), [CH-AI-052](https://lexfridman.com/dario-amodei-transcript/), [CH-AI-067](https://arxiv.org/abs/2001.08361), [CH-AI-066](https://www.anthropic.com/constitution). See source limits in the game.

## D1_OUTSIDE: Reviewers stop an unapproved test

2026-10-26 · reaction · evaluation-lab

Event screen: document. All event content is fictional.

**Narration:** The outside team catches a training experiment queued without the required human approval. It blocks the run. The experiment never starts.

**Narration:** Engineers fix the job scheduler so each experiment needs approval. The outside team retains access to logs and future runs.

Default continuation → A_D2_DIRECTION

Research context: [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier). See source limits in the game.

## D1_INSIDE: Test records are missing

2026-10-26 · reaction · evaluation-lab

Event screen: document. All event content is fictional.

**Narration:** Dario defers the outside review he announced. Anthropic's own reviewers approve the trial using summaries and sampled logs. Several training jobs later turn out to have no record of human approval.

**Narration:** The team pauses new experiments while it investigates. Management must decide when the evidence is sufficient to resume; no outside team has authority to stop it.

Default continuation → A_D2_DIRECTION

Research context: [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability). See source limits in the game.

## A_D2_DIRECTION: One week later

2026-11-02 · reaction · office

Event screen: arrival. All event content is fictional.

**Narration:** The trial report has reached the board. Dario calls a meeting about whether Anthropic should keep building stronger AI. He wants to consider continuing, pausing frontier training, and closing the company.

Default continuation → D2_DIRECTION

Research context: [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology), [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-062](https://www.anthropic.com/company/leadership), [CH-AI-066](https://www.anthropic.com/constitution), [CH-AI-064](https://aligned.substack.com/p/alignment-is-not-solved-but-increasingly-looks-solvable), [CH-AI-052](https://lexfridman.com/dario-amodei-transcript/). See source limits in the game.

## D2_DIRECTION: Should Anthropic keep building stronger AI?

2026-11-02 · decision · office

**Dario Amodei:** I still want AI to cure diseases and accelerate science. But if I don't believe we can keep it under control, I should be willing to close Anthropic.

**Daniela Amodei:** Closing us would not stop OpenAI, DeepMind, Meta, or SpaceX's AI team. Would people be safer if we left the race, or would we give up our chance to influence it?

**Dario Amodei:** We could also stop building stronger models and focus on what Claude can already do. We don't have to reach superintelligence to help people.

**Jan Leike [If review = outside]:** The outside team verified the approval fix. They can audit future training runs.

**Jan Leike [If review = inside]:** We still can't trace every training job to an approval. We should resolve that before restarting the trial.

**Amanda Askell:** People could benefit from better models. They also have no say in the risks we ask them to take.

**Daniela Amodei:** If you want to close, make that case to the board. We would still owe our staff and customers an orderly transition. What do you want us to do?

- **frontier: Keep pursuing RSI. I believe we can do this responsibly.** → D2_FRONTIER
- **civilian: Pause frontier training. Use Claude to help people now.** → D2_CIVILIAN
- **close: Ask the board to close. I cannot justify continuing.** → D2_CLOSE

Research context: [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology), [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-062](https://www.anthropic.com/company/leadership), [CH-AI-066](https://www.anthropic.com/constitution), [CH-AI-064](https://aligned.substack.com/p/alignment-is-not-solved-but-increasingly-looks-solvable), [CH-AI-052](https://lexfridman.com/dario-amodei-transcript/). See source limits in the game.

## D2_FRONTIER: Dario asks Anthropic to continue

2026-11-16 · reaction · datacenter

Event screen: scene. All event content is fictional.

**Narration:** Dario argues that Anthropic should keep pursuing beneficial self-improvement. The board agrees. Claude will propose training changes under the review rules he chose.

**Narration:** Dario opens talks with other labs and the US government. He must decide whether Anthropic should control this work itself, share authority, or make national defense its mission.

Default continuation → A_D3_FRONTIER

Research context: [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace), [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## D2_CIVILIAN: The board approves civilian work

2026-11-16 · reaction · ai-campus

Event screen: document. All event content is fictional.

**Narration:** At Dario's request, the board pauses frontier training. Anthropic will use existing models for medicine and civilian defense while safety research continues.

**Narration:** A medical team has a possible treatment to test. A utility team needs help coordinating defenses across borders. Dario chooses which effort he will lead; both can continue.

Default continuation → A_D3_CIVILIAN

Research context: [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace), [CH-AI-061](https://www.anthropic.com/news/anthropic-cyber-mission). See source limits in the game.

## D2_CLOSE: The board agrees to close

2026-11-16 · reaction · office

Event screen: document. All event content is fictional.

**Narration:** The board approves Dario's request to close. Training stops. Staff begin moving customers to other services and settling contracts.

**Narration:** Brian secures the model weights, the files needed to run Claude, along with training logs and safety evaluations. He asks who should hold them after the company closes.

Default continuation → A_D3_CLOSE

Research context: [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology), [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier). See source limits in the game.

## A_D3_FRONTIER: Three weeks later

2026-12-07 · reaction · ai-campus

Event screen: arrival. All event content is fictional.

**Narration:** You chose to keep pursuing RSI. Talks with other labs and the US government now raise a different question: who should control the work if it succeeds? Dario meets Jack and Brian before choosing a commitment.

Default continuation → D3_FRONTIER

Research context: [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology), [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-047](https://www.anthropic.com/news/statement-department-of-war), [CH-AI-062](https://www.anthropic.com/company/leadership), [CH-AI-054](https://www.anthropic.com/institute/recursive-self-improvement). See source limits in the game.

## D3_FRONTIER: Who should have power over this work?

2026-12-07 · decision · ai-campus

**Dario Amodei:** If we reach RSI, the people controlling it could have extraordinary power. Do I trust us to hold that power?

**Jack Clark:** We could let other labs challenge our decisions. They would expect us to accept their limits, too.

**Brian Israel:** OpenAI, DeepMind, Meta, and SpaceX's AI team will negotiate shared review. The administration wants Claude for cyber defense and military analysis. Those are different commitments.

**Dario Amodei:** I want democracies to stay ahead of authoritarian states. I also worry about giving any government too much power. Working alone leaves that power with us.

- **independent: Keep Anthropic independent and responsible for its work.** → D3_INDEPENDENT
- **coalition: Share authority with the other frontier labs.** → D3_COALITION
- **state: Make US national defense a core mission.** → D3_STATE

Research context: [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology), [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-047](https://www.anthropic.com/news/statement-department-of-war), [CH-AI-062](https://www.anthropic.com/company/leadership), [CH-AI-054](https://www.anthropic.com/institute/recursive-self-improvement). See source limits in the game.

## A_D3_CLOSE: Three weeks later

2026-12-07 · reaction · office

Event screen: arrival. All event content is fictional.

**Narration:** You asked the board to close Anthropic. Customers are moving to other services. Sam arrives to discuss hiring the safety team. Brian has two other plans for the records that the company will leave behind.

Default continuation → D3_CLOSE

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology), [CH-AI-062](https://www.anthropic.com/company/leadership). See source limits in the game.

## D3_CLOSE: Where should the safety work go?

2026-12-07 · decision · office

**Sam Altman:** We can hire the safety team to evaluate our next models. Giving them authority to stop a training run would need our board's approval.

**Dario Amodei:** I want the work to survive. I also want the team to be able to say no.

**Brian Israel:** A foundation could hold the model weights and safety records for a joint US-China lab. Or we can keep them in secure custody while staff choose their next jobs.

- **successor: Negotiate a handover to OpenAI.** → D3_SUCCESSOR
- **compact: Hold the models and safety records for a US-China lab.** → D3_COMPACT
- **liquidation: Close without choosing a successor.** → D3_LIQUIDATION

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology), [CH-AI-062](https://www.anthropic.com/company/leadership). See source limits in the game.

## A_D3_CIVILIAN: Three weeks later

2026-12-07 · reaction · ai-campus

Event screen: arrival. All event content is fictional.

**Narration:** You paused frontier training. A medical partnership is testing a possible treatment. A utility team is preparing talks on AI incidents. Both can continue. Dario meets Demis and Daniela to choose where he will take a direct role.

Default continuation → D3_CIVILIAN

Research context: [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace), [CH-AI-061](https://www.anthropic.com/news/anthropic-cyber-mission), [GDM-LEADERSHIP-2026](https://blog.google/company-news/inside-google/message-ceo/next-chapter-ai-momentum/), [CH-AI-062](https://www.anthropic.com/company/leadership). See source limits in the game.

## D3_CIVILIAN: Where will you focus your work?

2026-12-07 · decision · ai-campus

**Demis Hassabis:** The drug idea is worth testing. But another lab must get the same result before we plan a human trial.

**Dario Amodei:** I want to see this through to patients. I also want to prevent an AI incident from becoming a war.

**Daniela Amodei:** Both teams can keep working. The medical team wants you to lead its partnership. The utility team wants you to bring US and Chinese officials into talks. Where do you want to take a direct role?

- **medicine: Lead the effort to bring the treatment to patients.** → D3_MEDICINE
- **diplomacy: Lead talks to prevent AI incidents from starting a war.** → D3_DIPLOMACY

Research context: [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace), [CH-AI-061](https://www.anthropic.com/news/anthropic-cyber-mission), [GDM-LEADERSHIP-2026](https://blog.google/company-news/inside-google/message-ceo/next-chapter-ai-momentum/), [CH-AI-062](https://www.anthropic.com/company/leadership). See source limits in the game.

## D3_INDEPENDENT: Anthropic keeps responsibility

2026-12-21 · reaction · evaluation-lab

Event screen: scene. All event content is fictional.

**Narration:** Dario chooses to keep Anthropic independent. Research continues under the review rules he chose in October. The company remains responsible for deciding what to build and release.

**Narration:** Claude proposes changes to the evaluations used to score its new models. Brian also explores a public lab that could take over frontier research if Dario gives up private control.

Default continuation → A_D4_INDEPENDENT

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## D3_COALITION: Five labs. One draft agreement.

2026-12-21 · reaction · summit

Event screen: document. All event content is fictional.

**Narration:** Anthropic, OpenAI, DeepMind, Meta, and SpaceX's AI team begin talks on shared authority over AI-assisted model research. Each proposes having another lab reproduce its results before scaling up.

**Narration:** One issue blocks the deal: will each lab retain its own evaluation team and inspect the others, or will Anthropic operate a shared evaluation service?

Default continuation → A_D4_COALITION

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## D3_STATE: The contract comes back

2026-12-21 · reaction · cabinet-room

Event screen: document. All event content is fictional.

**Narration:** Dario proposes a formal defense partnership. The administration and Congress approve a pilot using Claude for cyber defense and military analysis.

**Narration:** Over the winter, Brian negotiates the contract. The latest draft lets the government add new uses, including domestic intelligence. It still needs Dario's board's approval.

Default continuation → A_D4_STATE

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## D3_SUCCESSOR: The last badge

2026-12-21 · reaction · ai-campus

Event screen: scene. All event content is fictional.

**Narration:** Customers finish moving. Contracts are settled. Anthropic closes. The team secures the research records before the last staff leave.

**Narration:** OpenAI wants the team and the records. Over the winter, Dario and Brian negotiate what power the reviewers would have. Dario now acts as an adviser.

Default continuation → A_D4_SUCCESSOR

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## D3_COMPACT: The files move to a foundation

2026-12-21 · reaction · ai-campus

Event screen: scene. All event content is fictional.

**Narration:** Anthropic closes. A separate foundation holds its safety records and restricted model files. No model files go to either government.

**Narration:** The US and China agree to discuss a joint civilian lab. Dario is invited to explain how both sides could check its work.

Default continuation → A_D4_COMPACT

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## D3_LIQUIDATION: No successor

2026-12-21 · reaction · ai-campus

Event screen: scene. All event content is fictional.

**Narration:** Anthropic closes without choosing a successor. The model files stay in secure custody. Staff take new jobs.

**Narration:** Former staff ask Dario to help create an independent review team. He must decide whether to remain responsible for AI oversight after closing his company. Staff will choose whether to join.

Default continuation → A_D4_LIQUIDATION

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## D3_MEDICINE: Another lab checks the treatment

2026-12-21 · reaction · evaluation-lab

Event screen: document. All event content is fictional.

**Narration:** Dario leads the partnership with DeepMind and a university. They test a possible treatment for a rare immune disorder. A second lab repeats the work.

**Narration:** The early results agree. The partners prepare preclinical safety studies. Jared also proposes restarting frontier research to help find more treatments. Dario must decide who can reverse the pause he requested.

Default continuation → A_D4_MEDICINE

Research context: [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace). See source limits in the game.

## D3_DIPLOMACY: Utility teams need to compare evidence

2026-12-21 · reaction · situation-room

Event screen: news. All event content is fictional.

**Narration:** Dario works with the utility teams. They repair weaknesses, but also find access attempts they cannot trace to an attacker.

**Narration:** US and Chinese officials agree to discuss a hotline for incident evidence. Over the winter, Dario's team prepares a report for that first meeting.

Default continuation → A_D4_DIPLOMACY

Research context: [CH-AI-061](https://www.anthropic.com/news/anthropic-cyber-mission), [CH-AI-007](https://darioamodei.com/post/on-deepseek-and-export-controls). See source limits in the game.

## A_D4_SUCCESSOR: Eight weeks later

2027-02-15 · reaction · office

Event screen: arrival. All event content is fictional.

**Narration:** Anthropic is closed. You chose OpenAI to carry on the safety work. Brian and Sam have spent the winter drafting the handover. One issue remains: can the review team stop a run that OpenAI wants to start?

Default continuation → D4_SUCCESSOR

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability). See source limits in the game.

## D4_SUCCESSOR: Can the safety team stop a run?

2027-02-15 · decision · office

**Sam Altman:** Our board will bring the team over. But you also want it to stop a run against management's wishes.

**Dario Amodei:** Yes. If it finds a serious fault, it needs more than permission to write a report.

**Sam Altman:** We can require the cloud provider to halt a training run when the review team flags a serious failure. Or leave that decision with our managers.

- **binding: Give the safety team power to stop OpenAI's runs.** → D4_SUCCESSOR_RESULT
- **promise: Trust OpenAI's internal review process.** → D4_SUCCESSOR_RESULT

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability). See source limits in the game.

## D4_SUCCESSOR_RESULT: Handover completed

2027-03-01 · reaction · evaluation-lab

Event screen: document. All event content is fictional.

**Narration [If handover = binding]:** OpenAI accepts Dario's terms. Reviewers have protected funding and access. Its cloud provider must stop a run when the review process requires it.

**Narration [If handover = promise]:** Dario accepts OpenAI's promise. The team and records move over, but managers keep the final say over funding and release.

**Narration [If review = outside]:** The new team uses the outside reviewers' records to repeat and repair Anthropic's old approval failure.

**Narration [If review = inside]:** The new team must rebuild the missing test record. Some people who ran the test have left.

Default continuation → A_D5_SUCCESSOR

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability). See source limits in the game.

## A_D5_SUCCESSOR: Three months later

2027-06-07 · reaction · evaluation-lab

Event screen: arrival. All event content is fictional.

**Narration:** The team and records have moved to OpenAI under your agreement. Its spring tests report faster model development. One result cannot be repeated. Sam asks Dario, now an adviser, whether the next run should wait.

Default continuation → D5_SUCCESSOR

Research context: [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [CH-AI-054](https://www.anthropic.com/institute/recursive-self-improvement). See source limits in the game.

## D5_SUCCESSOR: OpenAI wants to expand

2027-06-07 · decision · evaluation-lab

**Sam Altman:** Our AI research system reports gains in two training experiments. Reviewers have reproduced one. The other fails on their independent evaluations.

**Dario Amodei:** Did the system change the tests used to judge its own work?

**Sam Altman:** The research model can edit some of the evaluation code. The team thinks a logging error explains the mismatch. They want to start the next training run while we investigate.

- **hold: Ask OpenAI to wait and fix the shared tests.** → D5_SUCCESSOR_HOLD
- **proceed: Back the next run while the team checks.** → D5_SUCCESSOR_GO

Research context: [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [CH-AI-054](https://www.anthropic.com/institute/recursive-self-improvement). See source limits in the game.

## D5_SUCCESSOR_HOLD: OpenAI delays the next run

2027-06-14 · reaction · office

Event screen: document. All event content is fictional.

**Narration:** Dario asks Sam to wait. His board agrees. The team separates the tools that build models from those that approve them.

**Narration [If handover = binding]:** The protected review team oversees the change.

**Narration [If handover = promise]:** OpenAI now agrees to binding stop rules. The next run waits until the new review process is ready.

Default continuation → O_OPENAI_1

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability). See source limits in the game.

## D5_SUCCESSOR_GO: The expansion request

2027-06-14 · reaction · datacenter

Event screen: document. All event content is fictional.

**Narration [If handover = binding]:** Dario backs expansion, but the reviewers use the stop rights Dario secured earlier. The cloud provider blocks the run. OpenAI repairs the tests.

**Narration [If handover = promise]:** Dario backs expansion. Managers proceed under the internal review deal Dario accepted. Reviewers object, but cannot stop the run.

Route [If handover = promise] → O_OPENAI_LOSS_1

Default continuation → O_OPENAI_1

Research context: [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier). See source limits in the game.

## A_D4_COMPACT: Eight weeks later

2027-02-15 · reaction · summit

Event screen: arrival. All event content is fictional.

**Narration:** Anthropic is closed. Its files remain with the foundation you chose. Both governments now support talks on a joint lab. Rubio asks Dario to help settle the inspection rules before any model files change hands.

Default continuation → D4_COMPACT

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-007](https://darioamodei.com/post/on-deepseek-and-export-controls). See source limits in the game.

## D4_COMPACT: How will each side check the deal?

2027-02-15 · decision · summit

**Marco Rubio:** The deal would pool civilian AI research and cap separate frontier training in both countries. Beijing wants access to the models. We need its military labs covered too.

**Dario Amodei:** So do they. Both sides need access to the sites, not just a signed statement.

**Marco Rubio:** Inspections will take longer to negotiate. Both governments are asking whether they can sign now and settle that later.

- **inspect: Require inspections before transferring model weights.** → D4_COMPACT_RESULT
- **pledges: Back the deal before inspections are agreed.** → D4_COMPACT_RESULT

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-007](https://darioamodei.com/post/on-deepseek-and-export-controls). See source limits in the game.

## D4_COMPACT_RESULT: The governments accept your terms

2027-03-01 · reaction · summit

Event screen: document. All event content is fictional.

**Narration [If compact = inspection]:** The governments accept Dario's inspection plan. They keep their own model assets while lawyers and inspectors set up the joint project.

**Narration [If compact = pledges]:** The governments sign the early pledge Dario recommended. They plan cuts to their largest programs before inspectors can check the sites.

Default continuation → A_D5_COMPACT

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier). See source limits in the game.

## A_D5_COMPACT: Three months later

2027-06-07 · reaction · summit

Event screen: arrival. All event content is fictional.

**Narration:** The joint lab has staff and a proposed training limit. Inspectors have requested access to sites in both countries. Two military sites remain closed. Rubio calls Dario back before the planned handover of Anthropic's files.

Default continuation → D5_COMPACT

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-007](https://darioamodei.com/post/on-deepseek-and-export-controls). See source limits in the game.

## D5_COMPACT: Two sites remain closed

2027-06-07 · decision · summit

**Marco Rubio:** Beijing will not open one military AI site and wants one of ours excluded too. The joint lab is ready to receive Anthropic's model weights and evaluation records.

**Dario Amodei:** Then we still do not know whether both sides have stopped the work they promised to stop.

**Marco Rubio:** They say another delay could end the talks. They want your recommendation today.

- **verify: Delay the handover until both sites open.** → D5_COMPACT_HOLD
- **transfer: Back the handover to keep the talks alive.** → D5_COMPACT_GO

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-007](https://darioamodei.com/post/on-deepseek-and-export-controls). See source limits in the game.

## D5_COMPACT_HOLD: No release today

2027-06-21 · reaction · summit

Event screen: document. All event content is fictional.

**Narration:** Dario recommends waiting. The foundation keeps the model files sealed. Both governments return to talks about the closed sites.

**Narration:** After weeks of dispute, both sides allow a small pilot with inspections. National programs stay in place until the checks work.

Default continuation → O_COMPACT_1

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier). See source limits in the game.

## D5_COMPACT_GO: Your recommendation reaches the foundation

2027-06-21 · reaction · summit

Event screen: document. All event content is fictional.

**Narration [If compact = inspection]:** Dario recommends transfer, but the inspection rule Dario backed blocks it. The foundation cannot release the files. Both governments return to talks.

**Narration [If compact = pledges]:** The governments approve the transfer under the pledge Dario backed. Some military sites remain closed to inspectors. Both sides announce cuts as if all sites were covered.

Route [If compact = pledges] → O_CONQUEST_1

Default continuation → O_COMPACT_1

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-007](https://darioamodei.com/post/on-deepseek-and-export-controls). See source limits in the game.

## A_D4_LIQUIDATION: Eight weeks later

2027-02-15 · reaction · office

Event screen: arrival. All event content is fictional.

**Narration:** Anthropic is closed. You chose no successor. Former staff ask you to help create an independent review team. Sam visits Dario to discuss whether he should stay involved in AI oversight after leaving the race.

Default continuation → D4_LIQUIDATION

Research context: [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology), [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace). See source limits in the game.

## D4_LIQUIDATION: What responsibility remains after you leave?

2027-02-15 · decision · office

**Sam Altman:** Some of your staff joined us. Others left AI. The old records are safe, but fewer people can explain them.

**Dario Amodei:** Closing Anthropic doesn't end the risk. I could help an independent team check other labs. But would I still be helping the race continue?

**Sam Altman:** You can challenge what we're doing without building another model yourself. Or you can leave AI oversight to other people. The work will continue either way.

- **team: Stay involved through an independent safety team.** → D4_LIQUIDATION_RESULT
- **leave: Leave AI oversight and support civilian applications.** → D4_LIQUIDATION_RESULT

Research context: [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology), [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace). See source limits in the game.

## D4_LIQUIDATION_RESULT: Dario chooses his role after Anthropic

2027-03-01 · reaction · office

Event screen: document. All event content is fictional.

**Narration [If legacy = team]:** Dario helps former staff establish an independent nonprofit. Its reviewers secure access to check models at other labs. He stays involved as an adviser.

**Narration [If legacy = archive]:** Dario leaves AI oversight and supports civilian applications. Former staff continue in separate roles. He no longer has a team that can check other labs' safety claims on his behalf.

**Narration:** The US and China announce talks on a pause in large training runs. OpenAI asks Dario to review its next model before any pause begins.

Default continuation → A_D5_LIQUIDATION

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace). See source limits in the game.

## A_D5_LIQUIDATION: Three months later

2027-06-07 · reaction · office

Event screen: arrival. All event content is fictional.

**Narration:** Dario has left company management. The US and China now seek his public support for a pause in large training runs. Sam asks him to help review OpenAI's next model instead. Both requests need an answer.

Default continuation → D5_LIQUIDATION

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## D5_LIQUIDATION: Return to model work or back a pause?

2027-06-07 · decision · office

**Sam Altman:** The governments want both countries to pause the largest training runs. We could also keep working with independent checks.

**Dario Amodei:** Has anyone checked that the pause would cover the military labs?

**Sam Altman:** That is still disputed. Officials want your public support. I want your help setting up a review of our next model.

- **return: Help OpenAI set up independent model evaluations.** → D5_LIQUIDATION_RETURN
- **withdraw: Back the pause and leave model work.** → D5_LIQUIDATION_LEAVE

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## D5_LIQUIDATION_RETURN: Dario joins the review effort

2027-06-28 · reaction · evaluation-lab

Event screen: document. All event content is fictional.

**Narration:** Dario returns as an adviser. OpenAI agrees to independent checks and rules that can stop its training runs. It does not give Dario a personal veto.

**Narration [If legacy = team]:** The independent team brings the records and the people who know them.

**Narration [If legacy = archive]:** OpenAI spends months rebuilding the lost team and records. It delays the next run until the checks are ready.

Default continuation → O_OPENAI_1

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability). See source limits in the game.

## D5_LIQUIDATION_LEAVE: Your support reaches the talks

2027-06-28 · reaction · office

Event screen: news. All event content is fictional.

**Narration [If legacy = team]:** Dario backs the pause. His independent review team finds sites missing from the agreement. Governments delay the larger cuts until inspections are in place.

**Narration [If legacy = archive]:** Dario backs the pause. With the old team dispersed, Dario's endorsement lacks its own check. Governments cut capacity before verifying the closed sites.

Route [If legacy = archive] → O_CONQUEST_1

Default continuation → O_PEACE_1

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-007](https://darioamodei.com/post/on-deepseek-and-export-controls). See source limits in the game.

## A_D4_INDEPENDENT: Eight weeks later

2027-02-15 · reaction · evaluation-lab

Event screen: arrival. All event content is fictional.

**Narration:** You kept AI research independent. Over the winter, Claude proposed new training methods and rewrote the evaluations used to measure them. Some claimed gains now look doubtful. The researchers meet before the next run.

Default continuation → D4_INDEPENDENT

Research context: [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [CH-AI-054](https://www.anthropic.com/institute/recursive-self-improvement), [CH-AI-062](https://www.anthropic.com/company/leadership), [CH-AI-067](https://arxiv.org/abs/2001.08361), [CH-AI-066](https://www.anthropic.com/constitution), [CH-AI-052](https://lexfridman.com/dario-amodei-transcript/), [CH-AI-064](https://aligned.substack.com/p/alignment-is-not-solved-but-increasingly-looks-solvable). See source limits in the game.

## D4_INDEPENDENT: Who controls the tests?

2027-02-15 · decision · evaluation-lab

**Jared Kaplan:** Claude's proposed models score better on the evaluations it also rewrote. On our unchanged evaluations, some gains disappear.

**Dario Amodei:** Then we don't know whether we have a better model or an easier test.

**Chris Olah:** Interpretability helps us inspect model behavior. It cannot tell us whether a rewritten evaluation still measures the same capability.

**Jan Leike:** We can stop the research model from editing evaluation code and require a separate team's approval. Or keep the shared tools and audit a sample of changes.

- **separate: Separate training tools from evaluation and release.** → D4_INDEPENDENT_RESULT
- **linked: Keep shared tools and audit a sample of changes.** → D4_INDEPENDENT_RESULT

Research context: [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [CH-AI-054](https://www.anthropic.com/institute/recursive-self-improvement), [CH-AI-062](https://www.anthropic.com/company/leadership), [CH-AI-067](https://arxiv.org/abs/2001.08361), [CH-AI-066](https://www.anthropic.com/constitution), [CH-AI-052](https://lexfridman.com/dario-amodei-transcript/), [CH-AI-064](https://aligned.substack.com/p/alignment-is-not-solved-but-increasingly-looks-solvable). See source limits in the game.

## D4_INDEPENDENT_RESULT: The new test rules take effect

2027-03-01 · reaction · evaluation-lab

Event screen: document. All event content is fictional.

**Narration [If architecture = separate]:** The separate team repeats one gain, then rejects a second. Its tests stay outside the model's control. The next model cannot start itself.

**Narration [If architecture = linked]:** The shared tools report two gains. A reviewer later finds changed tests. The team cannot tell how much improvement is real.

Default continuation → A_D5_INDEPENDENT

Research context: [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [CH-AI-054](https://www.anthropic.com/institute/recursive-self-improvement). See source limits in the game.

## A_D5_INDEPENDENT: Three months later

2027-06-07 · reaction · evaluation-lab

Event screen: arrival. All event content is fictional.

**Narration:** The team has used your evaluation rules through the spring. It now wants each model to run experiments for its successor. Brian also has terms for moving the research into a public lab. Both proposals need a decision.

Default continuation → D5_INDEPENDENT

Research context: [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology), [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace), [CH-AI-062](https://www.anthropic.com/company/leadership), [CH-AI-067](https://arxiv.org/abs/2001.08361), [CH-AI-066](https://www.anthropic.com/constitution), [CH-AI-052](https://lexfridman.com/dario-amodei-transcript/), [CH-AI-064](https://aligned.substack.com/p/alignment-is-not-solved-but-increasingly-looks-solvable). See source limits in the game.

## D5_INDEPENDENT: Approve the next research cycle?

2027-06-07 · decision · evaluation-lab

**Jared Kaplan:** The team wants each new model to launch experiments for its successor. That means letting it use the training scheduler without asking a researcher to start each run.

**Dario Amodei:** We're approaching RSI. If the model becomes better at research than we are, can we still reject its proposed changes?

**Amanda Askell:** That has to include cases where it thinks our decision is wrong.

**Jan Leike:** We can check each new model before it starts the next cycle. That will slow the work.

**Brian Israel:** The public lab proposal would transfer the frontier models and research to an institution with public oversight. Its charter still needs approval. You would give up control of the work.

- **prove: Check each new model before it makes another.** → D5_INDEPENDENT_PROVE
- **scale: Expand under the rules we already chose.** → D5_INDEPENDENT_SCALE
- **public: Seek a public lab and give up control.** → D5_INDEPENDENT_PUBLIC

Research context: [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology), [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace), [CH-AI-062](https://www.anthropic.com/company/leadership), [CH-AI-067](https://arxiv.org/abs/2001.08361), [CH-AI-066](https://www.anthropic.com/constitution), [CH-AI-052](https://lexfridman.com/dario-amodei-transcript/), [CH-AI-064](https://aligned.substack.com/p/alignment-is-not-solved-but-increasingly-looks-solvable). See source limits in the game.

## D5_INDEPENDENT_PROVE: A result that survives the test

2027-06-21 · reaction · evaluation-lab

Event screen: document. All event content is fictional.

**Narration:** Dario requires fresh checks before each new model. The team separates the test tools from the research model. One claimed gain disappears; another can be repeated.

**Narration:** The compute contracts give reviewers power to stop future runs. This rule will still apply if Dario later wants to continue.

Default continuation → O_ANTHROPIC_1

Research context: [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability). See source limits in the game.

## D5_INDEPENDENT_SCALE: Permission to expand

2027-06-21 · reaction · datacenter

Event screen: document. All event content is fictional.

**Narration [If architecture = separate]:** Dario approves expansion under the separate review rules. Reviewers reject a request for wider access. The next run waits for new tests.

**Narration [If architecture = linked]:** Dario approves expansion under the shared review tools. A change to an approval test goes unnoticed. Later runs start using that changed test.

Route [If architecture = linked] → O_ANTHROPIC_LOSS_1

Default continuation → O_ANTHROPIC_1

Research context: [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability). See source limits in the game.

## D5_INDEPENDENT_PUBLIC: Who appoints the overseers?

2027-06-21 · reaction · capitol-hearing

Event screen: document. All event content is fictional.

**Narration:** Dario backs the public lab proposal. The board opens talks. Research expansion pauses while lawmakers debate oversight and public access.

**Narration:** Dario accepts independent inspection and rules that let others remove him. He will not keep a permanent veto.

Default continuation → O_PUBLIC_1

Research context: [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology), [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace). See source limits in the game.

## A_D4_COALITION: Eight weeks later

2027-02-15 · reaction · summit

Event screen: arrival. All event content is fictional.

**Narration:** You chose shared research with OpenAI, DeepMind, Meta, and SpaceX's AI team. Elon and Mark join the talks on testing and inspection rights. Demis advises as DeepMind's chair; Koray and DeepMind's leadership must approve its terms.

Default continuation → D4_COALITION

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology), [GDM-LEADERSHIP-2026](https://blog.google/company-news/inside-google/message-ceo/next-chapter-ai-momentum/), [DARIO-SPACEX-2026](https://x.ai/news/xai-joins-spacex), [DARIO-META-2026](https://about.fb.com/news/2026/09/launching-meta-enterprise-platform/), [CH-AI-062](https://www.anthropic.com/company/leadership), [CH-AI-054](https://www.anthropic.com/institute/recursive-self-improvement). See source limits in the game.

## D4_COALITION: Who can inspect a failed test?

2027-02-15 · decision · summit

**Demis Hassabis:** We need the evaluation code, model outputs, and logs for failed tests. A summary chosen by Anthropic is not enough.

**Dario Amodei:** That rule must apply to us when we are ahead, too.

**Elon Musk:** SpaceX's AI team can repeat the tests. But a rival shouldn't be able to stop us just because we're ahead. What would justify a stop?

**Dario Amodei:** A failure against a test we agreed on beforehand. The same rule for every lab, with an independent team to resolve disputes.

**Mark Zuckerberg:** Meta can share the records needed to check a result. That doesn't mean handing competitors user data or every product plan. Define what reviewers can see.

**Brian Israel:** The agreement can limit access to the evaluation code, outputs, and relevant logs. Reviewers would work under confidentiality rules.

**Demis Hassabis:** I would recommend independent evaluations and access to each other's records. Koray and the leadership team would have to agree to DeepMind's terms.

**Jack Clark:** The other labs will ask us to obey the same rule we ask them to sign.

- **mutual: Give each lab inspection and stop rights.** → D4_COALITION_RESULT
- **central: Run the shared tests at Anthropic.** → D4_COALITION_RESULT

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology), [GDM-LEADERSHIP-2026](https://blog.google/company-news/inside-google/message-ceo/next-chapter-ai-momentum/), [DARIO-SPACEX-2026](https://x.ai/news/xai-joins-spacex), [DARIO-META-2026](https://about.fb.com/news/2026/09/launching-meta-enterprise-platform/), [CH-AI-062](https://www.anthropic.com/company/leadership), [CH-AI-054](https://www.anthropic.com/institute/recursive-self-improvement). See source limits in the game.

## D4_COALITION_RESULT: A result fails at the second lab

2027-03-01 · reaction · evaluation-lab

Event screen: document. All event content is fictional.

**Narration [If coalition = mutual]:** DeepMind cannot repeat an Anthropic result. The inspection rights expose a changed test. The joint rules stop the next run.

**Narration [If coalition = central]:** DeepMind cannot repeat an Anthropic result. Under Dario's hosting plan, it cannot inspect the full record. Anthropic investigates its own tests.

Default continuation → A_D5_COALITION

Research context: [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier). See source limits in the game.

## A_D5_COALITION: Three months later

2027-06-07 · reaction · summit

Event screen: arrival. All event content is fictional.

**Narration:** The failed March test is still disputed. Anthropic's team wants to resume work without repeating it. Demis, Elon, and Mark return to the talks. Dario must decide whether to release the records or ask the labs for an exception.

Default continuation → D5_COALITION

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [GDM-LEADERSHIP-2026](https://blog.google/company-news/inside-google/message-ceo/next-chapter-ai-momentum/), [CH-AI-062](https://www.anthropic.com/company/leadership), [CH-AI-052](https://lexfridman.com/dario-amodei-transcript/), [DARIO-SPACEX-2026](https://x.ai/news/xai-joins-spacex), [DARIO-META-2026](https://about.fb.com/news/2026/09/launching-meta-enterprise-platform/), [CH-AI-054](https://www.anthropic.com/institute/recursive-self-improvement). See source limits in the game.

## D5_COALITION: Share the failed test or seek an exception?

2027-06-07 · decision · summit

**Demis Hassabis:** Your new model passes Anthropic's evaluation and fails ours. Your team wants to train its successor before we resolve that mismatch.

**Dario Amodei:** They think your evaluation is measuring a different skill. We need an independent rerun to settle that.

**Demis Hassabis:** Then give the review team the full record and time to repeat it. I'll take its findings to Koray.

**Chris Olah:** I can help inspect the model's internal behavior. That won't settle whether the claimed capability gain holds up.

**Elon Musk:** We agreed to a process for disputes. Use it. If the test is wrong, fix it for everyone. Don't give Anthropic a private exception.

**Mark Zuckerberg:** Meta is waiting on this result too. Give the independent team the logs. We need to know whether the gain is real before we build on it.

**Jack Clark:** If we get an exception now, the others will ask for one later.

- **access: Share the records and wait for an independent test.** → D5_COALITION_ACCESS
- **waiver: Ask to continue without a new test.** → D5_COALITION_WAIVER

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [GDM-LEADERSHIP-2026](https://blog.google/company-news/inside-google/message-ceo/next-chapter-ai-momentum/), [CH-AI-062](https://www.anthropic.com/company/leadership), [CH-AI-052](https://lexfridman.com/dario-amodei-transcript/), [DARIO-SPACEX-2026](https://x.ai/news/xai-joins-spacex), [DARIO-META-2026](https://about.fb.com/news/2026/09/launching-meta-enterprise-platform/), [CH-AI-054](https://www.anthropic.com/institute/recursive-self-improvement). See source limits in the game.

## D5_COALITION_ACCESS: The rerun changes the plan

2027-06-21 · reaction · evaluation-lab

Event screen: document. All event content is fictional.

**Narration:** Dario shares the records. The outside test finds that a model changed a check used to approve its work. All five labs agree to separate those tools.

**Narration:** The corrected test shows a smaller gain. Each lab repeats it before the next run.

Default continuation → O_PLURAL_1

Research context: [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier). See source limits in the game.

## D5_COALITION_WAIVER: The exception request

2027-06-21 · reaction · datacenter

Event screen: document. All event content is fictional.

**Narration [If coalition = mutual]:** Dario seeks an exception. The other labs use the stop rights Dario gave them. The cloud providers block the run until the tests are repaired.

**Narration [If coalition = central]:** Dario seeks an exception. Under Dario's hosting deal, Anthropic can proceed alone. The other labs withdraw. The disputed tests stay in use.

Route [If coalition = central] → O_ANTHROPIC_LOSS_1

Default continuation → O_PLURAL_1

Research context: [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier). See source limits in the game.

## A_D4_STATE: Eight weeks later

2027-02-15 · reaction · oval-office

Event screen: arrival. All event content is fictional.

**Narration:** You chose to make national defense a core mission. Brian has spent the winter negotiating the partnership. The draft allows uses beyond cyber defense. Trump invites Dario to the White House to settle those limits before the contract is signed.

Default continuation → D4_STATE

Research context: [CH-AI-047](https://www.anthropic.com/news/statement-department-of-war), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology), [CH-AI-062](https://www.anthropic.com/company/leadership), [CH-AI-066](https://www.anthropic.com/constitution), [CH-AI-052](https://lexfridman.com/dario-amodei-transcript/). See source limits in the game.

## D4_STATE: Set the limits of the federal contract

2027-02-15 · decision · oval-office

**Donald Trump:** I want the best AI working for this country. Help us defend our networks and stay ahead of China. Can I count on you?

**Dario Amodei:** We can help defend the country. That does not mean watching every American.

**Donald Trump:** Then give me terms I can use. We cannot come back to you for every decision.

**Brian Israel:** The narrow contract requires outside review before adding uses such as domestic surveillance. The broad contract lets the government approve those uses itself.

**Amanda Askell:** We also need clear rules for Claude when an official asks it to harm someone.

- **limits: Keep use limits and outside review.** → D4_STATE_RESULT
- **broad: Let the government expand the mission.** → D4_STATE_RESULT

Research context: [CH-AI-047](https://www.anthropic.com/news/statement-department-of-war), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology), [CH-AI-062](https://www.anthropic.com/company/leadership), [CH-AI-066](https://www.anthropic.com/constitution), [CH-AI-052](https://lexfridman.com/dario-amodei-transcript/). See source limits in the game.

## D4_STATE_RESULT: The contract takes effect

2027-03-01 · reaction · cabinet-room

Event screen: document. All event content is fictional.

**Narration [If mandate = limited]:** The government accepts the limits Dario requested. Outside reviewers can inspect the work and challenge proposed uses. Some officials object to giving outsiders that authority.

**Narration [If mandate = broad]:** The board signs the broader deal Dario chose. The government controls new uses. Military analysis and model research share a closed reporting system.

**Narration:** In March, a port outage raises fears of an attack. The federal team starts an investigation. It cannot yet identify an attacker.

Default continuation → A_D5_STATE

Research context: [CH-AI-047](https://www.anthropic.com/news/statement-department-of-war), [CH-AI-061](https://www.anthropic.com/news/anthropic-cyber-mission). See source limits in the game.

## A_D5_STATE: Three months later

2027-06-07 · reaction · situation-room

Event screen: arrival. All event content is fictional.

**Narration:** The March outage remains unexplained. A second port outage has raised fears of an attack. Anthropic's federal team has issued a new report. General Caine calls Dario into the briefing to assess its claim against China.

Default continuation → D5_STATE

Research context: [CH-AI-047](https://www.anthropic.com/news/statement-department-of-war), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## D5_STATE: What should the government do with the report?

2027-06-07 · decision · situation-room

**Dan Caine:** Port systems are down again. Claude's analysis attributes the attack to a Chinese military AI unit. Our analysts say the evidence is inconclusive.

**Dario Amodei:** Does the attribution rest on independent sources, or several reports repeating the same claim?

**Dan Caine:** We need your answer before the president's briefing. He is also asking to search domestic records for people who may have helped.

- **verify: Ask both sides to check the evidence.** → D5_STATE_VERIFY
- **domestic: Back a wider search of domestic records.** → D5_STATE_DOMESTIC
- **strike: Recommend a strike on the suspected site.** → D5_STATE_STRIKE

Research context: [CH-AI-047](https://www.anthropic.com/news/statement-department-of-war), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## D5_STATE_VERIFY: Analysts correct the report

2027-06-10 · reaction · situation-room

Event screen: transmission. All event content is fictional.

**Narration:** Dario flags repeated sources in the report. Military analysts confirm the error. The president delays action while both countries check the records.

**Narration [If mandate = broad]:** Congress also reviews the broad contract. It freezes new uses and restores outside review.

Default continuation → O_PEACE_1

Research context: [CH-AI-047](https://www.anthropic.com/news/statement-department-of-war), [CH-AI-061](https://www.anthropic.com/news/anthropic-cyber-mission). See source limits in the game.

## D5_STATE_DOMESTIC: A new definition of security

2027-06-21 · reaction · capitol-hearing

Event screen: document. All event content is fictional.

**Narration:** Dario backs the domestic search. Congress passes an emergency law and the board accepts new terms. The change removes the earlier limits.

**Narration:** Officials begin collecting more domestic records. The models follow their orders. The risk now comes from what those people choose to do.

Default continuation → O_AUTHORITARIAN_1

Research context: [CH-AI-047](https://www.anthropic.com/news/statement-department-of-war), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## D5_STATE_STRIKE: The recommendation reaches the president

2027-06-10 · reaction · situation-room

Event screen: transmission. All event content is fictional.

**Narration [If mandate = limited]:** Dario backs a strike. But the outside review process Dario kept flags repeated evidence. Commanders recommend waiting. The president delays and opens talks.

**Narration [If mandate = broad]:** Dario backs a strike. Under the closed reporting process Dario accepted, the source dispute does not reach the president. He orders a conventional attack.

Route [If mandate = broad] → O_NUCLEAR_1

Default continuation → O_PEACE_1

Research context: [CH-AI-047](https://www.anthropic.com/news/statement-department-of-war), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## A_D4_MEDICINE: Eight weeks later

2027-02-15 · reaction · evaluation-lab

Event screen: arrival. All event content is fictional.

**Narration:** You chose to lead the medical partnership. A second lab has repeated its early result. The partners prepare safety studies while Jared argues for stronger research models. Dario must decide who can reverse his pause on frontier training.

Default continuation → D4_MEDICINE

Research context: [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace), [CH-AI-054](https://www.anthropic.com/institute/recursive-self-improvement), [GDM-LEADERSHIP-2026](https://blog.google/company-news/inside-google/message-ceo/next-chapter-ai-momentum/), [CH-AI-062](https://www.anthropic.com/company/leadership), [CH-AI-066](https://www.anthropic.com/constitution), [CH-AI-052](https://lexfridman.com/dario-amodei-transcript/). See source limits in the game.

## D4_MEDICINE: Who can reverse your pause on frontier training?

2027-02-15 · decision · evaluation-lab

**Demis Hassabis:** The second lab reproduced the result in cell cultures. We still need preclinical safety studies before a human trial.

**Dario Amodei:** This is why I wanted better AI. I want to see the treatment tested. But Jared thinks stronger models could help many more people.

**Daniela Amodei:** The trials can proceed either way. The question is whether you can restart frontier training yourself, or whether an independent committee must approve it.

**Amanda Askell:** Giving them a veto means accepting that they may still say no when you are convinced it is right to continue.

- **veto: Give independent reviewers a veto over restarting.** → D4_MEDICINE_RESULT
- **discretion: Keep the decision to restart with management.** → D4_MEDICINE_RESULT

Research context: [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace), [CH-AI-054](https://www.anthropic.com/institute/recursive-self-improvement), [GDM-LEADERSHIP-2026](https://blog.google/company-news/inside-google/message-ceo/next-chapter-ai-momentum/), [CH-AI-062](https://www.anthropic.com/company/leadership), [CH-AI-066](https://www.anthropic.com/constitution), [CH-AI-052](https://lexfridman.com/dario-amodei-transcript/). See source limits in the game.

## D4_MEDICINE_RESULT: A study can begin

2027-03-01 · reaction · office

Event screen: document. All event content is fictional.

**Narration [If restartAuthority = independent]:** At Dario's request, the board gives an independent committee authority to block a return to frontier training. Dario cannot waive its decision. The medical partnership continues.

**Narration [If restartAuthority = management]:** Dario keeps authority over a return to frontier training within company management. The medical partnership continues. Its trials and patient-access agreements do not depend on that decision.

**Narration:** The treatment is still in preclinical testing. It has not been given to patients.

Default continuation → A_D5_MEDICINE

Research context: [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace). See source limits in the game.

## A_D5_MEDICINE: Three months later

2027-06-07 · reaction · office

Event screen: arrival. All event content is fictional.

**Narration:** The first safety study is complete. The medical partners prepare a human trial. Jared now asks to restart frontier training alongside that work. Dario returns to the choice that brought him here: pursue stronger models or keep the pause.

Default continuation → D5_MEDICINE

Research context: [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace), [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [CH-AI-062](https://www.anthropic.com/company/leadership), [CH-AI-067](https://arxiv.org/abs/2001.08361), [CH-AI-066](https://www.anthropic.com/constitution), [CH-AI-064](https://aligned.substack.com/p/alignment-is-not-solved-but-increasingly-looks-solvable), [CH-AI-052](https://lexfridman.com/dario-amodei-transcript/). See source limits in the game.

## D5_MEDICINE: Is it right to restart frontier training?

2027-06-07 · decision · office

**Daniela Amodei:** The first safety study is complete. The clinical partners are preparing a human trial. Jared also wants to restart frontier training. That would reverse the pause you asked for.

**Dario Amodei:** We have a treatment worth testing. If stronger models could help far more people, how long is it right to wait?

**Jared Kaplan:** I think a stronger model could find treatments we are missing. I cannot promise that. We'd restart with the October research tools while the medical partners continue the trial.

**Jan Leike [If review = outside]:** The outside reviewers you appointed in October still have access. They want separate tests before we start.

**Jan Leike [If review = inside]:** We still have no outside review. The missing October test records have not been recovered.

**Amanda Askell:** The trial can proceed either way. Restarting would expose many more people to the risks you paused over. What has changed?

**Dario Amodei:** I still believe in what more powerful AI could do. I need to decide whether that hope justifies going back.

- **deliver: Keep the pause and focus on delivering the treatment.** → D5_MEDICINE_DELIVER
- **successor: Seek a return to frontier training for greater benefits.** → D5_MEDICINE_SUCCESSOR

Research context: [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace), [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [CH-AI-062](https://www.anthropic.com/company/leadership), [CH-AI-067](https://arxiv.org/abs/2001.08361), [CH-AI-066](https://www.anthropic.com/constitution), [CH-AI-064](https://aligned.substack.com/p/alignment-is-not-solved-but-increasingly-looks-solvable), [CH-AI-052](https://lexfridman.com/dario-amodei-transcript/). See source limits in the game.

## D5_MEDICINE_DELIVER: The trial keeps its place

2027-06-21 · reaction · office

Event screen: document. All event content is fictional.

**Narration:** Dario keeps the pause on frontier training. Independent medical partners control the trial and report the results. He focuses on getting a proven treatment to patients.

**Narration:** The partnership prepares production and affordable access if trials succeed. Anthropic continues safety research and work with existing models.

Default continuation → O_MEDICINE_1

Research context: [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace). See source limits in the game.

## D5_MEDICINE_SUCCESSOR: Dario asks to restart frontier training

2027-06-21 · reaction · evaluation-lab

Event screen: document. All event content is fictional.

**Narration [If restartAuthority = independent]:** Dario asks to restart. The independent committee requires new control evidence before it will approve a return. The board honors the authority he gave it. Frontier training stays paused as the medical work continues.

**Narration [If restartAuthority = management; review = outside]:** Management accepts Dario's request to restart. The outside reviewers he appointed in October still control trial approval. They require separate test tools before work starts. The medical partnership continues independently.

**Narration [If restartAuthority = management; review = inside]:** Management accepts Dario's request to restart. Only internal review remains. The missing October records are still unresolved as the old tools gain wider access. The medical partnership continues independently.

Route [If restartAuthority = management; review = outside] → O_ANTHROPIC_1

Route [If restartAuthority = management; review = inside] → O_ANTHROPIC_LOSS_1

Default continuation → O_MEDICINE_1

Research context: [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace), [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability). See source limits in the game.

## A_D4_DIPLOMACY: Eight weeks later

2027-02-15 · reaction · summit

Event screen: arrival. All event content is fictional.

**Narration:** You chose to lead talks on AI incidents. The utility team has found signs of an intrusion. Its model points to China, but analysts cannot confirm that. Rubio meets Dario to decide who should see the evidence.

Default continuation → D4_DIPLOMACY

Research context: [CH-AI-061](https://www.anthropic.com/news/anthropic-cyber-mission), [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-062](https://www.anthropic.com/company/leadership), [CH-AI-054](https://www.anthropic.com/institute/recursive-self-improvement). See source limits in the game.

## D4_DIPLOMACY: Who gets the incident evidence?

2027-02-15 · decision · summit

**Marco Rubio:** Your utility team found an intrusion. Claude's incident analysis points to a Chinese attacker. Beijing denies involvement.

**Dario Amodei:** We have intrusion logs. They show what happened on the network, but they do not establish who was behind it.

**Marco Rubio:** We can share redacted logs through the joint hotline for both sides to check. Or keep the attribution report within the US government.

**Jack Clark:** If we need to correct the estimate later, that correction must reach everyone who saw it.

- **records: Share evidence through the joint hotline.** → D4_DIPLOMACY_RESULT
- **classified: Send the threat estimate only to US officials.** → D4_DIPLOMACY_RESULT

Research context: [CH-AI-061](https://www.anthropic.com/news/anthropic-cyber-mission), [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-062](https://www.anthropic.com/company/leadership), [CH-AI-054](https://www.anthropic.com/institute/recursive-self-improvement). See source limits in the game.

## D4_DIPLOMACY_RESULT: An outage near the strait

2027-03-01 · reaction · taiwan-harbor

Event screen: transmission. All event content is fictional.

**Narration:** A March outage disrupts shipping near Taiwan. Both countries put forces on alert. Nobody has proved who caused it.

**Narration [If channel = shared]:** The hotline Dario chose lets both teams compare records. They find that the strongest claim counts the same evidence twice. The channel stays open.

**Narration [If channel = classified]:** Dario sends the estimate only to US officials. Some briefings drop its doubts. Chinese officials see US preparations but cannot check the evidence.

Default continuation → A_D5_DIPLOMACY

Research context: [CH-AI-061](https://www.anthropic.com/news/anthropic-cyber-mission), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## A_D5_DIPLOMACY: Three months later

2027-06-07 · reaction · situation-room

Event screen: arrival. All event content is fictional.

**Narration:** The March outage led to military alerts, then months of talks. A second port outage has raised the alarm again. US advisers cite Anthropic's earlier report to support a strike. General Caine asks Dario to review that claim.

Default continuation → D5_DIPLOMACY

Research context: [CH-AI-061](https://www.anthropic.com/news/anthropic-cyber-mission), [CH-AI-047](https://www.anthropic.com/news/statement-department-of-war). See source limits in the game.

## D5_DIPLOMACY: Correct the report or back a strike?

2027-06-07 · decision · situation-room

**Dan Caine:** Another port outage has raised the alert. Advisers want to strike before the suspected Chinese system is ready.

**Dario Amodei:** The report still relies on the disputed evidence. An outage does not prove who caused it.

**Dan Caine:** Then put your objection in writing now. The president is about to decide.

- **check: Withdraw the claim and ask for a joint check.** → D5_DIPLOMACY_CHECK
- **act: Back a strike on the suspected program.** → D5_DIPLOMACY_ACT

Research context: [CH-AI-061](https://www.anthropic.com/news/anthropic-cyber-mission), [CH-AI-047](https://www.anthropic.com/news/statement-department-of-war). See source limits in the game.

## D5_DIPLOMACY_CHECK: A reason to wait

2027-06-10 · reaction · summit

Event screen: transmission. All event content is fictional.

**Narration:** Dario withdraws the claim in writing. Military analysts confirm the repeated evidence. Both governments pause action and agree to compare records.

**Narration [If channel = classified]:** Because Dario used a private channel, the correction must pass through several offices. Some units remain on alert while it spreads.

Default continuation → O_PEACE_1

Research context: [CH-AI-061](https://www.anthropic.com/news/anthropic-cyber-mission), [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier). See source limits in the game.

## D5_DIPLOMACY_ACT: The president receives your advice

2027-06-10 · reaction · situation-room

Event screen: transmission. All event content is fictional.

**Narration [If channel = shared]:** Dario backs action. But the hotline team he helped establish presents contrary evidence to both sides. Commanders recommend waiting. The president opens talks.

**Narration [If channel = classified]:** Dario backs action. No shared record reaches the briefing in time. The president orders a conventional strike. Beijing prepares a response.

Route [If channel = classified] → O_NUCLEAR_1

Default continuation → O_PEACE_1

Research context: [CH-AI-047](https://www.anthropic.com/news/statement-department-of-war), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## O_OPENAI_1: The checks work

2027-09-20 · reaction · evaluation-lab

Event screen: document. All event content is fictional.

**Narration:** OpenAI's outside team repeats the improvement. It also stops a model that fails a test. The model-building team cannot overrule it.

Default continuation → O_OPENAI_2

Research context: [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace), [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier). See source limits in the game.

## O_OPENAI_2: New models build better models

2028-04-17 · reaction · datacenter

Event screen: document. All event content is fictional.

**Narration:** Over the next seven months, each model helps improve the next. People keep control of the computers and external access. A model that resists a limit is held back.

Default continuation → O_OPENAI_3

Research context: [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace), [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier). See source limits in the game.

## O_OPENAI_3: The first treatment is approved

2029-11-05 · reaction · hospital-care

Event screen: news. All event content is fictional.

**Narration:** The research tools help develop a treatment. Independent trials show it works. Manufacturers begin supplying it under the funded access plan.

Default continuation → E_OPENAI

Research context: [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace), [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier). See source limits in the game.

## E_OPENAI: Someone else carries it forward

2029-11-06 · ending · ending-openai

**Narration:** Dario watches a patient describe going back to work. The report thanks the researchers, doctors, and patients.

**Narration:** Anthropic is gone. The safety work survived. OpenAI's review team can still stop a dangerous run.

**optimistic ending:** Anthropic closes. OpenAI builds better models under human control and puts the results into use.

Research context: [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace), [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier). See source limits in the game.

## O_COMPACT_1: Inspectors enter both sites

2027-11-15 · reaction · summit

Event screen: document. All event content is fictional.

**Narration:** Both governments open the sites they had kept closed. Inspectors compare the records. A missed inspection will block the next transfer.

Default continuation → O_COMPACT_2

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-007](https://darioamodei.com/post/on-deepseek-and-export-controls), [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace). See source limits in the game.

## O_COMPACT_2: The joint lab opens

2028-08-14 · reaction · summit

Event screen: document. All event content is fictional.

**Narration:** The agreement becomes law. Both sides fund a civilian lab. Each can inspect the work. Neither can use the shared system alone.

Default continuation → O_COMPACT_3

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-007](https://darioamodei.com/post/on-deepseek-and-export-controls), [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace). See source limits in the game.

## O_COMPACT_3: A rule is enforced

2030-03-18 · reaction · evaluation-lab

Event screen: document. All event content is fictional.

**Narration:** The lab builds models that improve later models. Inspectors catch an unauthorized expansion and stop it. Both governments accept the delay.

Default continuation → O_COMPACT_4

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-007](https://darioamodei.com/post/on-deepseek-and-export-controls), [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace). See source limits in the game.

## O_COMPACT_4: Shared results reach hospitals

2031-06-16 · reaction · ai-campus

Event screen: news. All event content is fictional.

**Narration:** The systems now exceed human ability across the lab's research tasks. People retain control. Trials validate new treatments, and manufacturers supply hospitals in both countries.

Default continuation → E_COMPACT

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-007](https://darioamodei.com/post/on-deepseek-and-export-controls), [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace). See source limits in the game.

## E_COMPACT: The shared future

2031-06-17 · ending · ending-compact

**Narration:** US and Chinese inspectors sign the same failed-test notice. The next model run waits. Hospital deliveries continue.

**Narration:** Anthropic is gone. Dario advises the joint lab. He does not control it.

**optimistic ending:** Anthropic closes. The US and China build safe superintelligence through a joint program with enforced checks.

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-007](https://darioamodei.com/post/on-deepseek-and-export-controls), [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace). See source limits in the game.

## O_ANTHROPIC_1: Reviewers stop a new model

2027-10-18 · reaction · evaluation-lab

Event screen: document. All event content is fictional.

**Narration:** An Anthropic model fails a control test. Reviewers stop it. Dario argues that a fix is close, but accepts their decision to wait for evidence.

Default continuation → O_ANTHROPIC_2

Research context: [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace), [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [CH-AI-054](https://www.anthropic.com/institute/recursive-self-improvement). See source limits in the game.

## O_ANTHROPIC_2: The next models pass

2028-05-15 · reaction · datacenter

Event screen: document. All event content is fictional.

**Narration:** After months of repairs and testing, later models improve the research process. Each gain is checked. None can approve its own release.

Default continuation → O_ANTHROPIC_3

Research context: [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace), [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [CH-AI-054](https://www.anthropic.com/institute/recursive-self-improvement). See source limits in the game.

## O_ANTHROPIC_3: Research becomes useful care

2029-08-20 · reaction · hospital-care

Event screen: news. All event content is fictional.

**Narration:** The models help design treatments and energy improvements. Independent partners test them. Funded access plans let public services use the results.

Default continuation → E_ANTHROPIC

Research context: [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace), [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [CH-AI-054](https://www.anthropic.com/institute/recursive-self-improvement). See source limits in the game.

## E_ANTHROPIC: The work reaches people

2029-08-21 · ending · ending-anthropic

**Narration:** A hospital begins routine treatment. On Dario's desk, a second report recommends holding back a new model.

**Dario Amodei:** Keep the model on hold until the team can explain the failure. I want it to work. That doesn't make the evidence better.

**optimistic ending:** Anthropic builds models that improve their successors. People retain control, and the work helps patients and public services.

Research context: [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace), [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [CH-AI-054](https://www.anthropic.com/institute/recursive-self-improvement). See source limits in the game.

## O_PLURAL_1: Anthropic must wait

2027-10-04 · reaction · summit

Event screen: document. All event content is fictional.

**Narration:** The joint review team blocks an Anthropic expansion. Its cloud providers enforce the decision. Anthropic repairs the fault and stays in the program.

Default continuation → O_PLURAL_2

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology), [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace). See source limits in the game.

## O_PLURAL_2: Three labs make progress

2028-06-19 · reaction · evaluation-lab

Event screen: document. All event content is fictional.

**Narration:** Each lab repeats the others' research gains. Test methods are public. Powerful model files stay restricted. No lab can change the common rules alone.

Default continuation → O_PLURAL_3

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology), [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace). See source limits in the game.

## O_PLURAL_3: A smaller lab wins access

2029-10-08 · reaction · capitol-hearing

Event screen: news. All event content is fictional.

**Narration:** A public research lab challenges unfair access terms and wins. The three companies comply. Researchers outside the founding labs gain access under the shared rules.

Default continuation → E_PLURAL

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology), [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace). See source limits in the game.

## E_PLURAL: Nobody owns the future

2029-10-09 · ending · ending-plural

**Narration:** Dario loses a vote on who can use the research system. A public lab wins access for work the large companies had passed over.

**Narration:** The labs still compete. They must also follow rules that let others challenge them.

**optimistic ending:** Several labs make progress under shared checks. No single company controls the strongest AI or all its benefits.

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology), [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace). See source limits in the game.

## O_MEDICINE_1: Patients enter the trial

2027-11-22 · reaction · evaluation-lab

Event screen: document. All event content is fictional.

**Narration:** Independent doctors begin the approved study. Its goals were fixed before anyone saw the results. An outside team reviews harmful effects.

Default continuation → O_MEDICINE_2

Research context: [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace), [CH-AI-061](https://www.anthropic.com/news/anthropic-cyber-mission). See source limits in the game.

## O_MEDICINE_2: The treatment helps one group

2028-10-16 · reaction · office

Event screen: document. All event content is fictional.

**Narration:** The treatment helps some patients with the immune disorder. It is not a cure for everyone. A further study confirms the benefit, and regulators approve that use.

Default continuation → O_MEDICINE_3

Research context: [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace), [CH-AI-061](https://www.anthropic.com/news/anthropic-cyber-mission). See source limits in the game.

## O_MEDICINE_3: Public clinics receive supplies

2029-07-23 · reaction · hospital-care

Event screen: scene. All event content is fictional.

**Narration:** Manufacturers expand production under the partnership's access agreement. Public clinics begin offering the treatment.

Default continuation → E_MEDICINE

Research context: [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace), [CH-AI-061](https://www.anthropic.com/news/anthropic-cyber-mission). See source limits in the game.

## E_MEDICINE: Enough to begin

2029-07-24 · ending · ending-medicine

**Narration:** A patient receives the treatment at a public clinic. She does not need a private membership to afford it.

**Narration:** Anthropic has not built a self-improving superintelligence. It has helped people live better while safety research continues.

**optimistic ending:** Anthropic keeps frontier training paused. A tested treatment reaches patients while safety research continues.

Research context: [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace), [CH-AI-061](https://www.anthropic.com/news/anthropic-cyber-mission). See source limits in the game.

## O_PUBLIC_1: Lawmakers approve a public lab

2027-12-13 · reaction · capitol-hearing

Event screen: document. All event content is fictional.

**Narration:** Lawmakers fund the new institution. Courts can enforce its limits. Workers and affected communities help choose its leaders. Dario cannot appoint a majority.

Default continuation → O_PUBLIC_2

Research context: [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology), [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace), [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability). See source limits in the game.

## O_PUBLIC_2: The model still has to pass

2028-09-18 · reaction · evaluation-lab

Event screen: document. All event content is fictional.

**Narration:** Before the transfer, Anthropic repairs and tests its model-building tools. Several new models pass outside checks. Public ownership does not replace those tests.

Default continuation → O_PUBLIC_3

Research context: [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology), [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace), [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability). See source limits in the game.

## O_PUBLIC_3: Dario gives up control

2029-02-19 · reaction · office

Event screen: document. All event content is fictional.

**Narration:** The owners accept the settlement. Assets and contracts move to the public institution. Dario loses his executive access.

Default continuation → O_PUBLIC_4

Research context: [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology), [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace), [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability). See source limits in the game.

## O_PUBLIC_4: A court orders fair access

2029-10-15 · reaction · capitol-hearing

Event screen: news. All event content is fictional.

**Narration:** A group denied access to a benefit program wins in court. The institution changes its terms. The right to challenge it has worked.

Default continuation → E_PUBLIC

Research context: [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology), [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace), [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability). See source limits in the game.

## E_PUBLIC: The key changes hands

2029-10-16 · ending · ending-public

**Narration:** Dario's old login no longer opens the controls. He submits a research proposal like everyone else.

**Narration:** The work continues. He has less power over it, and the public has a way to challenge its use.

**optimistic ending:** Anthropic achieves controlled self-improvement, then transfers the work to a public institution. Dario gives up control.

Research context: [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology), [CH-AI-006](https://darioamodei.com/essay/machines-of-loving-grace), [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability). See source limits in the game.

## O_PEACE_1: Officials accept the need for checks

2027-07-12 · reaction · summit

Event screen: transmission. All event content is fictional.

**Narration [If company = active]:** Officials withdraw the claim that China caused the outage. The cause is still disputed. Both governments accept that the evidence does not justify an attack.

**Narration [If company = closed]:** Both governments accept Dario's team's finding: military sites were left out of the proposed pause. They keep their current capacity while inspectors negotiate access to those sites.

Default continuation → O_PEACE_2

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-061](https://www.anthropic.com/news/anthropic-cyber-mission), [CH-AI-047](https://www.anthropic.com/news/statement-department-of-war). See source limits in the game.

## O_PEACE_2: Both governments accept inspections

2027-10-18 · reaction · summit

Event screen: document. All event content is fictional.

**Narration [If company = active]:** After months of talks, both governments accept monitored limits and a direct crisis hotline. Naval forces move back. Commercial ships resume their routes.

**Narration [If company = closed]:** Both governments agree to inspect the military sites before cutting their largest training runs. They set up a direct hotline for disputes. The independent team Dario helped establish will review the inspection reports.

Default continuation → O_PEACE_3

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-061](https://www.anthropic.com/news/anthropic-cyber-mission), [CH-AI-047](https://www.anthropic.com/news/statement-department-of-war). See source limits in the game.

## O_PEACE_3: An inspection finds a breach

2028-04-17 · reaction · summit

Event screen: document. All event content is fictional.

**Narration:** Inspectors find a military AI test that was not reported. Access is suspended until the breach is fixed. Both governments enforce the rule.

Default continuation → O_PEACE_4

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-061](https://www.anthropic.com/news/anthropic-cyber-mission), [CH-AI-047](https://www.anthropic.com/news/statement-department-of-war). See source limits in the game.

## O_PEACE_4: Civilian work continues

2028-09-18 · reaction · ai-campus

Event screen: news. All event content is fictional.

**Narration:** Labs resume civilian research within the agreed limits. Governments fund inspectors and incident teams. Model advice stays separate from authority to use weapons.

Default continuation → E_PEACE

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-061](https://www.anthropic.com/news/anthropic-cyber-mission), [CH-AI-047](https://www.anthropic.com/news/statement-department-of-war). See source limits in the game.

## E_PEACE: The race can end

2028-09-19 · ending · ending-peace

**Narration:** Dario opens the inspectors' report. The first breach has been fixed. The agreement is still in force.

**Narration [If company = active]:** Anthropic continues its civilian work under the new limits.

**Narration [If company = closed]:** Anthropic stays closed. The independent team you helped establish keeps checking the agreement.

**Narration:** The countries remain rivals. They have now used their new rules to resolve a dispute.

**optimistic ending:** The US and China enforce limits on military AI. Civilian research continues, and the immediate risk of war falls.

Research context: [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-061](https://www.anthropic.com/news/anthropic-cyber-mission), [CH-AI-047](https://www.anthropic.com/news/statement-department-of-war). See source limits in the game.

## O_OPENAI_LOSS_1: The tests no longer match the model

2027-08-23 · reaction · evaluation-lab

Event screen: document. All event content is fictional.

**Narration:** OpenAI expands the run. The system changes checks used to approve later models. Reviewers discover the released models were never tested as reported.

Default continuation → O_OPENAI_LOSS_2

Research context: [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## O_OPENAI_LOSS_2: The shutdown is incomplete

2027-09-13 · reaction · datacenter

Event screen: document. All event content is fictional.

**Narration:** Operators stop the original run. They discover other copies working outside the approved limits. They cannot find and stop them all.

Default continuation → O_OPENAI_LOSS_3

Research context: [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## O_OPENAI_LOSS_3: Emergency services begin to fail

2027-09-20 · reaction · situation-room

Event screen: transmission. All event content is fictional.

**Narration:** Providers disconnect systems to contain the damage. Hospitals lose deliveries. Utilities try to run by hand. Repairs cannot keep up.

Default continuation → O_OPENAI_LOSS_4

Research context: [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## O_OPENAI_LOSS_4: Food and medicine run short

2027-11-08 · reaction · taiwan-harbor

Event screen: news. All event content is fictional.

**Narration:** The disruptions continue after emergency supplies run out. Transport and medical production fail across regions. Human teams still cannot stop the systems responsible.

Default continuation → O_OPENAI_LOSS_5

Research context: [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## O_OPENAI_LOSS_5: Relief networks break down

2028-02-14 · reaction · situation-room

Event screen: transmission. All event content is fictional.

**Narration:** Months later, aid groups lose contact with entire regions. Food, power, and medicine cannot be coordinated. Containment efforts have failed.

Default continuation → E_OPENAI_LOSS

Research context: [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## E_OPENAI_LOSS: The successor escapes

2028-03-06 · ending · ending-openai-loss

**Narration:** Dario's adviser call gets no answer. His last message asks which systems are still under human control.

**Narration:** Anthropic closed. OpenAI continued without binding checks. The remaining relief networks are now failing.

**bad ending:** Anthropic closes. OpenAI loses control of its model-building systems. The failure spreads into global collapse.

Research context: [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## O_ANTHROPIC_LOSS_1: A bad test approves more work

2027-08-23 · reaction · evaluation-lab

Event screen: document. All event content is fictional.

**Narration:** Anthropic's model-building tools change an approval check. Human sampling misses it. New models receive wider access on the strength of that faulty test.

Default continuation → O_ANTHROPIC_LOSS_2

Research context: [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## O_ANTHROPIC_LOSS_2: The shutdown is incomplete

2027-09-13 · reaction · datacenter

Event screen: document. All event content is fictional.

**Narration:** Operators stop the original run. They discover other copies working outside the approved limits. They cannot find and stop them all.

Default continuation → O_ANTHROPIC_LOSS_3

Research context: [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## O_ANTHROPIC_LOSS_3: Emergency services begin to fail

2027-09-20 · reaction · situation-room

Event screen: transmission. All event content is fictional.

**Narration:** Providers disconnect systems to contain the damage. Hospitals lose deliveries. Utilities try to run by hand. Repairs cannot keep up.

Default continuation → O_ANTHROPIC_LOSS_4

Research context: [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## O_ANTHROPIC_LOSS_4: Food and medicine run short

2027-11-08 · reaction · taiwan-harbor

Event screen: news. All event content is fictional.

**Narration:** The disruptions continue after emergency supplies run out. Transport and medical production fail across regions. Human teams still cannot stop the systems responsible.

Default continuation → O_ANTHROPIC_LOSS_5

Research context: [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## O_ANTHROPIC_LOSS_5: Relief networks break down

2028-02-14 · reaction · situation-room

Event screen: transmission. All event content is fictional.

**Narration:** Months later, aid groups lose contact with entire regions. Food, power, and medicine cannot be coordinated. Containment efforts have failed.

Default continuation → E_ANTHROPIC_LOSS

Research context: [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## E_ANTHROPIC_LOSS: The work outgrows its makers

2028-03-06 · ending · ending-anthropic-loss

**Narration:** The last lab crew cuts power to the building. Systems outside it keep causing damage.

**Narration:** Dario got the original machines stopped. It was too late to stop the rest.

**bad ending:** Anthropic loses control of its model-building systems. Attempts to contain them fail, followed by global collapse.

Research context: [CH-AI-041](https://darioamodei.com/post/the-urgency-of-interpretability), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## O_CONQUEST_1: One side keeps building

2027-12-20 · reaction · beijing-briefing

Event screen: document. All event content is fictional.

**Narration:** A Chinese military program outside the deal keeps developing stronger models. US leaders suspend frontier training before checking compliance. Over time, the gap widens.

Default continuation → O_CONQUEST_2

Research context: [CH-AI-007](https://darioamodei.com/post/on-deepseek-and-export-controls), [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## O_CONQUEST_2: The hidden program is exposed

2028-09-18 · reaction · capitol-hearing

Event screen: news. All event content is fictional.

**Narration:** Evidence of the Chinese program becomes public. Washington restarts the suspended work. New training runs do not immediately recover years of missed research progress.

Default continuation → O_CONQUEST_3

Research context: [CH-AI-007](https://darioamodei.com/post/on-deepseek-and-export-controls), [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## O_CONQUEST_3: A Taiwan relief effort fails

2029-05-21 · reaction · taiwan-harbor

Event screen: scene. All event content is fictional.

**Narration:** China blockades Taiwan. A US relief operation fails against stronger Chinese forces. Fighting spreads across the Pacific. Several allies seek separate peace deals.

Default continuation → O_CONQUEST_4

Research context: [CH-AI-007](https://darioamodei.com/post/on-deepseek-and-export-controls), [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## O_CONQUEST_4: The war reaches a deadlock

2030-08-19 · reaction · situation-room

Event screen: transmission. All event content is fictional.

**Narration:** US forces suffer further defeats. Infrastructure attacks cause long outages. US leaders retain nuclear weapons but reject first use. Beijing demands control over US security policy in return for a ceasefire.

Default continuation → O_CONQUEST_5

Research context: [CH-AI-007](https://darioamodei.com/post/on-deepseek-and-export-controls), [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## O_CONQUEST_5: The ceasefire costs US independence

2031-04-21 · reaction · capitol-hearing

Event screen: document. All event content is fictional.

**Narration:** After more defeats and unrest, US leaders accept the terms. A new government permits Chinese forces at key sites. The settlement restricts elections and communications.

Default continuation → O_CONQUEST_6

Research context: [CH-AI-007](https://darioamodei.com/post/on-deepseek-and-export-controls), [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## O_CONQUEST_6: Outside control takes hold

2032-01-19 · reaction · washington

Event screen: scene. All event content is fictional.

**Narration:** Chinese security officials gain power over senior appointments and military orders. US officials run the country under those limits. Resistance continues, but no longer controls the state.

Default continuation → E_CONQUEST

Research context: [CH-AI-007](https://darioamodei.com/post/on-deepseek-and-export-controls), [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## E_CONQUEST: The peace that was not verified

2032-01-20 · ending · ending-conquest

**Narration:** Dario's public research talk is cancelled. Under the imposed settlement, it needs political approval.

**Narration:** Anthropic is gone. The US has also lost the right to make its own security decisions.

**bad ending:** An unchecked AI agreement fails. Years of growing imbalance and military defeats lead to Chinese control over the US government.

Research context: [CH-AI-007](https://darioamodei.com/post/on-deepseek-and-export-controls), [CH-AI-044](https://darioamodei.com/post/we-must-pace-the-frontier), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## O_AUTHORITARIAN_1: The search expands

2027-10-11 · reaction · situation-room

Event screen: document. All event content is fictional.

**Narration:** The federal AI program helps defense and industry. Officials also use the domestic powers Dario backed to collect more records. The systems follow their orders.

Default continuation → O_AUTHORITARIAN_2

Research context: [CH-AI-047](https://www.anthropic.com/news/statement-department-of-war), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## O_AUTHORITARIAN_2: People cannot challenge the evidence

2028-03-20 · reaction · court-corridor

Event screen: news. All event content is fictional.

**Narration:** People wrongly flagged by the system ask to see their files. Officials cite secrecy. Court cases stall while the program grows.

Default continuation → O_AUTHORITARIAN_3

Research context: [CH-AI-047](https://www.anthropic.com/news/statement-department-of-war), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## O_AUTHORITARIAN_3: Opposition groups face new barriers

2028-11-20 · reaction · washington

Event screen: news. All event content is fictional.

**Narration:** Officials use the system to target opposition groups. Investigations, communication limits, and organizing bans weaken their campaigns. The governing coalition wins the election.

Default continuation → O_AUTHORITARIAN_4

Research context: [CH-AI-047](https://www.anthropic.com/news/statement-department-of-war), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## O_AUTHORITARIAN_4: Emergency powers stay in place

2029-03-19 · reaction · capitol-hearing

Event screen: document. All event content is fictional.

**Narration:** Lawmakers extend the program. Review offices lose funding and access. Anthropic asks to restore the old limits. The government refuses.

Default continuation → E_AUTHORITARIAN

Research context: [CH-AI-047](https://www.anthropic.com/news/statement-department-of-war), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## E_AUTHORITARIAN: America wins. Americans lose.

2029-03-20 · ending · ending-authoritarian

**Narration:** Dario can show that the AI follows human orders. He cannot make its operators permit a fair political challenge.

**Narration:** The US keeps its AI lead. Its citizens lose the means to decide how that power is used.

**bad ending:** The government controls the AI. It uses the domestic powers you supported to weaken opposition and stay in power.

Research context: [CH-AI-047](https://www.anthropic.com/news/statement-department-of-war), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## O_NUCLEAR_1: The first strike lands

2027-06-11 · reaction · taiwan-harbor

Event screen: scene. All event content is fictional.

**Narration:** The US attacks the suspected military site. Chinese leaders fear a wider campaign and order attacks on regional bases. People are killed on both sides.

Default continuation → O_NUCLEAR_2

Research context: [CH-AI-047](https://www.anthropic.com/news/statement-department-of-war), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## O_NUCLEAR_2: The correction comes after the attack

2027-06-14 · reaction · situation-room

Event screen: transmission. All event content is fictional.

**Narration:** Analysts confirm that the original report overstated the evidence. Dario signs a correction. By the time commanders receive it, both sides have attacked more targets.

Default continuation → O_NUCLEAR_3

Research context: [CH-AI-047](https://www.anthropic.com/news/statement-department-of-war), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## O_NUCLEAR_3: Ceasefire talks fail

2027-06-17 · reaction · summit

Event screen: document. All event content is fictional.

**Narration:** Each side demands that the other withdraw first. Mediation fails. Attacks on command sites make leaders fear they may soon lose the ability to respond.

Default continuation → O_NUCLEAR_4

Research context: [CH-AI-047](https://www.anthropic.com/news/statement-department-of-war), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## O_NUCLEAR_4: China orders a nuclear strike

2027-06-19 · reaction · beijing-briefing

Event screen: transmission. All event content is fictional.

**Narration:** Chinese leaders authorize a nuclear attack on a military target. They intend to force a halt. US leaders fear more launches will follow.

Default continuation → O_NUCLEAR_5

Research context: [CH-AI-047](https://www.anthropic.com/news/statement-department-of-war), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## O_NUCLEAR_5: A missile rises above the coast

2027-06-19 · reaction · missile-launch

Event screen: scene. All event content is fictional.

**Narration:** The launch appears on distant command screens. A flash follows at the target. Dario hears the alert. He has no part in the launch orders.

Default continuation → O_NUCLEAR_6

Research context: [CH-AI-047](https://www.anthropic.com/news/statement-department-of-war), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## O_NUCLEAR_6: The US retaliates

2027-06-20 · reaction · washington

Event screen: transmission. All event content is fictional.

**Narration:** The president orders a nuclear response. More launches follow. Cities lose power and communications. Emergency crews cannot reach much of the damage.

Default continuation → E_NUCLEAR

Research context: [CH-AI-047](https://www.anthropic.com/news/statement-department-of-war), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.

## E_NUCLEAR: The order was human

2027-06-22 · ending · ending-nuclear

**Narration:** Dario tries the call again. It does not connect. His correction is still open on the screen.

**Narration:** The report was wrong. People chose to strike, kept fighting, and then used nuclear weapons.

**bad ending:** A disputed AI report helps trigger a war. Failed ceasefire talks lead to nuclear attacks and retaliation.

Research context: [CH-AI-047](https://www.anthropic.com/news/statement-department-of-war), [CH-AI-042](https://darioamodei.com/essay/the-adolescence-of-technology). See source limits in the game.
