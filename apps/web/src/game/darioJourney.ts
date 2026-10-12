import type { BackgroundId } from "./backgrounds.ts";
import { darioArrivals } from "./darioArrivals.ts";
import { darioEvidence as e } from "./darioEvidence.ts";
import type { Choice, Condition, Evidence, Journey, Line, Scene, StoryState } from "./types.ts";

const DARIO = "AI-E017";
const SAM = "AI-E016";
const DEMIS = "AI-E018";
const ELON = "AI-E029";
const MARK = "AI-E021";
const TRUMP = "SD-E025";
const RUBIO = "SD-E028";
const CAINE = "SD-E029";
const DANIELA = "AI-E047";
const JARED = "AI-E048";
const CHRIS = "AI-E049";
const JAN = "AI-E050";
const AMANDA = "AI-E051";
const JACK = "AI-E052";
const BRIAN = "AI-E053";
const TOM = "AI-E054";
const KRISHNA = "AI-E055";
const castEvidence: Record<string, Evidence[]> = {
  [ELON]: [e.spacex],
  [MARK]: [e.meta],
  [DEMIS]: [e.deepmindLeadership],
  [DANIELA]: [e.cast],
  [JARED]: [e.cast, e.scaling, e.character],
  [CHRIS]: [e.cast, e.interpretability],
  [JAN]: [e.alignment],
  [AMANDA]: [e.character, e.interpretability],
  [JACK]: [e.cast, e.rsi],
  [BRIAN]: [e.cast],
  [TOM]: [e.cast],
  [KRISHNA]: [e.cast],
};
const scenes: Record<string, Scene> = {};

const is = (state: string, equals: string): Condition => ({ state, equals });
const say = (speaker: string, text: string, requires?: Condition[]): Line => ({
  speaker,
  text,
  ...(requires ? { requires } : {}),
});
const n = (text: string, requires?: Condition[]): Line => say("narrator", text, requires);
function add(scene: Scene) {
  if (scenes[scene.id]) throw new Error(`Duplicate Dario scene: ${scene.id}`);
  scenes[scene.id] = scene;
}
function option(
  id: string,
  label: string,
  next: string,
  state: StoryState,
  effects?: Choice["effects"],
): Choice {
  return { id, label, detail: "", next, state, ...(effects ? { effects } : {}) };
}
function decision(
  id: string,
  chapter: number,
  title: string,
  date: string,
  background: BackgroundId,
  cast: string[],
  lines: Line[],
  choices: Choice[],
  evidence: Evidence[],
) {
  // Meetings use two-person shots. Hold the last counterpart when Dario replies.
  // Every decision takes place with Dario; event screens remain separate.
  let shot = cast;
  for (const line of lines) {
    if (line.cast) shot = line.cast;
    else if (line.speaker !== "narrator" && !shot.includes(line.speaker)) {
      shot = line.speaker === DARIO ? [DARIO] : [DARIO, line.speaker];
    }
    line.cast = [...shot];
  }
  const sources = new Map(evidence.map((source) => [source.id, source]));
  for (const line of lines) {
    for (const source of castEvidence[line.speaker] ?? []) sources.set(source.id, source);
  }
  add({
    id,
    chapter,
    title,
    location: title,
    date,
    kind: "decision",
    background,
    cast,
    lines,
    choices,
    evidence: [...sources.values()],
  });
}
function event(
  id: string,
  chapter: number,
  date: string,
  background: BackgroundId,
  format: NonNullable<Scene["event"]>["format"],
  source: string,
  headline: string,
  lines: Line[],
  next: string,
  evidence: Evidence[],
  resolve?: Scene["resolve"],
) {
  add({
    id,
    chapter,
    title: headline,
    location: source,
    date,
    kind: "reaction",
    background,
    cast: [],
    lines,
    next,
    evidence,
    event: { format, source, headline, fictional: true },
    ...(resolve ? { resolve } : {}),
  });
}

// Five decisions per run. First two decisions establish review and company direction.
decision(
  "D1_REVIEW",
  1,
  "Put the pacing commitment into practice",
  "2026-10-12",
  "evaluation-lab",
  [DARIO, JACK],
  [
    say(
      DARIO,
      "I've asked other labs to slow capability growth so safety work can keep up. Now we have to decide what that means for our own research.",
    ),
    say(
      JACK,
      "You committed us to embedded outside evaluators. Access lets them inspect and report what we do. Giving them the power to stop a run would go further.",
    ),
    say(
      JARED,
      "Claude is already helping us improve our models. The team wants to expand that work. Researchers would run the experiments offline.",
    ),
    say(
      JAN,
      "We can wait for the outside team and give it authority to stop the trial. Starting under internal review would mean postponing the outside scrutiny we announced.",
    ),
    say(
      CHRIS,
      "Keeping the work offline limits access. It doesn't tell us whether we understand or control the model's behavior.",
    ),
    say(
      DARIO,
      "I still want the benefits of stronger AI. If I ask others to accept outside scrutiny, I need to decide how much authority I'm willing to give up.",
    ),
  ],
  [
    option(
      "outside",
      "Give outside reviewers authority to stop the trial.",
      "D1_OUTSIDE",
      { review: "outside" },
      { safety: 8, trust: 5, compute: -6 },
    ),
    option(
      "inside",
      "Start under internal review. Defer outside evaluators.",
      "D1_INSIDE",
      { review: "inside" },
      { compute: 6, safety: -4 },
    ),
  ],
  [e.incidents, e.cyber, e.pace, e.rsi, e.cast, e.alignment, e.interpretability],
);
event(
  "D1_OUTSIDE",
  1,
  "2026-10-26",
  "evaluation-lab",
  "document",
  "Review record",
  "Reviewers stop an unapproved test",
  [
    n(
      "The outside team catches a training experiment queued without the required human approval. It blocks the run. The experiment never starts.",
    ),
    n(
      "Engineers fix the job scheduler so each experiment needs approval. The outside team retains access to logs and future runs.",
    ),
  ],
  "D2_DIRECTION",
  [e.control, e.pace],
);
event(
  "D1_INSIDE",
  1,
  "2026-10-26",
  "evaluation-lab",
  "document",
  "Internal trial record",
  "Test records are missing",
  [
    n(
      "Dario defers the outside review he announced. Anthropic's own reviewers approve the trial using summaries and sampled logs. Several training jobs later turn out to have no record of human approval.",
    ),
    n(
      "The team pauses new experiments while it investigates. Management must decide when the evidence is sufficient to resume; no outside team has authority to stop it.",
    ),
  ],
  "D2_DIRECTION",
  [e.control],
);
decision(
  "D2_DIRECTION",
  2,
  "Should Anthropic keep building stronger AI?",
  "2026-11-02",
  "office",
  [DARIO],
  [
    say(
      DARIO,
      "I still want AI to cure diseases and accelerate science. But if I don't believe we can keep it under control, I should be willing to close Anthropic.",
    ),
    say(
      DANIELA,
      "Closing us would not stop OpenAI, DeepMind, Meta, or SpaceX's AI team. Would people be safer if we left the race, or would we give up our chance to influence it?",
    ),
    say(
      DARIO,
      "We could also stop building stronger models and focus on what Claude can already do. We don't have to reach superintelligence to help people.",
    ),
    say(JAN, "The outside team verified the approval fix. They can audit future training runs.", [
      is("review", "outside"),
    ]),
    say(
      JAN,
      "We still can't trace every training job to an approval. We should resolve that before restarting the trial.",
      [is("review", "inside")],
    ),
    say(
      AMANDA,
      "People could benefit from better models. They also have no say in the risks we ask them to take.",
    ),
    say(
      DANIELA,
      "If you want to close, make that case to the board. We would still owe our staff and customers an orderly transition. What do you want us to do?",
    ),
  ],
  [
    option(
      "frontier",
      "Keep pursuing RSI. I believe we can do this responsibly.",
      "D2_FRONTIER",
      { direction: "frontier", company: "active" },
      { compute: 5 },
    ),
    option(
      "civilian",
      "Pause frontier training. Use Claude to help people now.",
      "D2_CIVILIAN",
      { direction: "civilian", company: "active" },
      { trust: 5, compute: -3 },
    ),
    option(
      "close",
      "Ask the board to close. I cannot justify continuing.",
      "D2_CLOSE",
      { direction: "close", company: "closing" },
      { compute: -12 },
    ),
  ],
  [e.grace, e.power, e.pace, e.cast, e.character],
);
event(
  "D2_FRONTIER",
  2,
  "2026-11-16",
  "datacenter",
  "scene",
  "Anthropic",
  "Dario asks Anthropic to continue",
  [
    n(
      "Dario argues that Anthropic should keep pursuing beneficial self-improvement. The board agrees. Claude will propose training changes under the review rules he chose.",
    ),
    n(
      "Dario opens talks with other labs and the US government. He must decide whether Anthropic should control this work itself, share authority, or make national defense its mission.",
    ),
  ],
  "D3_FRONTIER",
  [e.grace, e.pace, e.power],
);
event(
  "D2_CIVILIAN",
  2,
  "2026-11-16",
  "ai-campus",
  "document",
  "Board minutes",
  "The board approves civilian work",
  [
    n(
      "At Dario's request, the board pauses frontier training. Anthropic will use existing models for medicine and civilian defense while safety research continues.",
    ),
    n(
      "A medical team has a possible treatment to test. A utility team needs help coordinating defenses across borders. Dario chooses which effort he will lead; both can continue.",
    ),
  ],
  "D3_CIVILIAN",
  [e.grace, e.cyber],
);
event(
  "D2_CLOSE",
  2,
  "2026-11-16",
  "office",
  "document",
  "Board resolution",
  "The board agrees to close",
  [
    n(
      "The board approves Dario's request to close. Training stops. Staff begin moving customers to other services and settling contracts.",
    ),
    n(
      "Brian secures the model weights, the files needed to run Claude, along with training logs and safety evaluations. He asks who should hold them after the company closes.",
    ),
  ],
  "D3_CLOSE",
  [e.power, e.pace],
);

decision(
  "D3_FRONTIER",
  3,
  "Who should have power over this work?",
  "2026-12-07",
  "ai-campus",
  [DARIO, JACK],
  [
    say(
      DARIO,
      "If we reach RSI, the people controlling it could have extraordinary power. Do I trust us to hold that power?",
    ),
    say(
      JACK,
      "We could let other labs challenge our decisions. They would expect us to accept their limits, too.",
    ),
    say(
      BRIAN,
      "OpenAI, DeepMind, Meta, and SpaceX's AI team will negotiate shared review. The administration wants Claude for cyber defense and military analysis. Those are different commitments.",
    ),
    say(
      DARIO,
      "I want democracies to stay ahead of authoritarian states. I also worry about giving any government too much power. Working alone leaves that power with us.",
    ),
  ],
  [
    option(
      "independent",
      "Keep Anthropic independent and responsible for its work.",
      "D3_INDEPENDENT",
      { route: "independent" },
      { trust: 3 },
    ),
    option(
      "coalition",
      "Share authority with the other frontier labs.",
      "D3_COALITION",
      { route: "coalition" },
      { trust: 6 },
    ),
    option(
      "state",
      "Make US national defense a core mission.",
      "D3_STATE",
      { route: "state" },
      { tension: 4 },
    ),
  ],
  [e.power, e.pace, e.defense],
);
decision(
  "D3_CLOSE",
  3,
  "Where should the safety work go?",
  "2026-12-07",
  "office",
  [DARIO, SAM],
  [
    say(
      SAM,
      "We can hire the safety team to evaluate our next models. Giving them authority to stop a training run would need our board's approval.",
    ),
    say(DARIO, "I want the work to survive. I also want the team to be able to say no."),
    say(
      BRIAN,
      "A foundation could hold the model weights and safety records for a joint US-China lab. Or we can keep them in secure custody while staff choose their next jobs.",
    ),
  ],
  [
    option(
      "successor",
      "Negotiate a handover to OpenAI.",
      "D3_SUCCESSOR",
      { route: "successor", company: "closed" },
      { trust: 5 },
    ),
    option(
      "compact",
      "Hold the models and safety records for a US-China lab.",
      "D3_COMPACT",
      { route: "compact", company: "closed" },
      { trust: 5, tension: -3 },
    ),
    option(
      "liquidation",
      "Close without choosing a successor.",
      "D3_LIQUIDATION",
      { route: "liquidation", company: "closed" },
      { compute: -8, trust: -5 },
    ),
  ],
  [e.pace, e.power],
);
decision(
  "D3_CIVILIAN",
  3,
  "Where will you focus your work?",
  "2026-12-07",
  "ai-campus",
  [DARIO, DEMIS],
  [
    say(
      DEMIS,
      "The drug idea is worth testing. But another lab must get the same result before we plan a human trial.",
    ),
    say(
      DARIO,
      "I want to see this through to patients. I also want to prevent an AI incident from becoming a war.",
    ),
    say(
      DANIELA,
      "Both teams can keep working. The medical team wants you to lead its partnership. The utility team wants you to bring US and Chinese officials into talks. Where do you want to take a direct role?",
    ),
  ],
  [
    option(
      "medicine",
      "Lead the effort to bring the treatment to patients.",
      "D3_MEDICINE",
      { route: "medicine" },
      { trust: 6 },
    ),
    option(
      "diplomacy",
      "Lead talks to prevent AI incidents from starting a war.",
      "D3_DIPLOMACY",
      { route: "diplomacy" },
      { trust: 4, tension: -5 },
    ),
  ],
  [e.grace, e.cyber],
);

const routeOpenings: [string, BackgroundId, "scene" | "document" | "news", string, string[]][] = [
  [
    "INDEPENDENT",
    "evaluation-lab",
    "scene",
    "Anthropic keeps responsibility",
    [
      "Dario chooses to keep Anthropic independent. Research continues under the review rules he chose in October. The company remains responsible for deciding what to build and release.",
      "Claude proposes changes to the evaluations used to score its new models. Brian also explores a public lab that could take over frontier research if Dario gives up private control.",
    ],
  ],
  [
    "COALITION",
    "summit",
    "document",
    "Five labs. One draft agreement.",
    [
      "Anthropic, OpenAI, DeepMind, Meta, and SpaceX's AI team begin talks on shared authority over AI-assisted model research. Each proposes having another lab reproduce its results before scaling up.",
      "One issue blocks the deal: will each lab retain its own evaluation team and inspect the others, or will Anthropic operate a shared evaluation service?",
    ],
  ],
  [
    "STATE",
    "cabinet-room",
    "document",
    "The contract comes back",
    [
      "Dario proposes a formal defense partnership. The administration and Congress approve a pilot using Claude for cyber defense and military analysis.",
      "Over the winter, Brian negotiates the contract. The latest draft lets the government add new uses, including domestic intelligence. It still needs Dario's board's approval.",
    ],
  ],
  [
    "SUCCESSOR",
    "ai-campus",
    "scene",
    "The last badge",
    [
      "Customers finish moving. Contracts are settled. Anthropic closes. The team secures the research records before the last staff leave.",
      "OpenAI wants the team and the records. Over the winter, Dario and Brian negotiate what power the reviewers would have. Dario now acts as an adviser.",
    ],
  ],
  [
    "COMPACT",
    "ai-campus",
    "scene",
    "The files move to a foundation",
    [
      "Anthropic closes. A separate foundation holds its safety records and restricted model files. No model files go to either government.",
      "The US and China agree to discuss a joint civilian lab. Dario is invited to explain how both sides could check its work.",
    ],
  ],
  [
    "LIQUIDATION",
    "ai-campus",
    "scene",
    "No successor",
    [
      "Anthropic closes without choosing a successor. The model files stay in secure custody. Staff take new jobs.",
      "Former staff ask Dario to help create an independent review team. He must decide whether to remain responsible for AI oversight after closing his company. Staff will choose whether to join.",
    ],
  ],
  [
    "MEDICINE",
    "evaluation-lab",
    "document",
    "Another lab checks the treatment",
    [
      "Dario leads the partnership with DeepMind and a university. They test a possible treatment for a rare immune disorder. A second lab repeats the work.",
      "The early results agree. The partners prepare preclinical safety studies. Jared also proposes restarting frontier research to help find more treatments. Dario must decide who can reverse the pause he requested.",
    ],
  ],
  [
    "DIPLOMACY",
    "situation-room",
    "news",
    "Utility teams need to compare evidence",
    [
      "Dario works with the utility teams. They repair weaknesses, but also find access attempts they cannot trace to an attacker.",
      "US and Chinese officials agree to discuss a hotline for incident evidence. Over the winter, Dario's team prepares a report for that first meeting.",
    ],
  ],
];
for (const [key, bg, format, title, text] of routeOpenings) {
  const refs =
    key === "MEDICINE" ? [e.grace] : key === "DIPLOMACY" ? [e.cyber, e.china] : [e.pace, e.power];
  event(
    `D3_${key}`,
    3,
    "2026-12-21",
    bg,
    format,
    format === "news" ? "Scenario dispatch" : "Project record",
    title,
    text.map((t) => n(t)),
    `D4_${key}`,
    refs,
  );
}

decision(
  "D4_SUCCESSOR",
  4,
  "Can the safety team stop a run?",
  "2027-02-15",
  "office",
  [DARIO, SAM],
  [
    say(
      SAM,
      "Our board will bring the team over. But you also want it to stop a run against management's wishes.",
    ),
    say(
      DARIO,
      "Yes. If it finds a serious fault, it needs more than permission to write a report.",
    ),
    say(
      SAM,
      "We can require the cloud provider to halt a training run when the review team flags a serious failure. Or leave that decision with our managers.",
    ),
  ],
  [
    option(
      "binding",
      "Give the safety team power to stop OpenAI's runs.",
      "D4_SUCCESSOR_RESULT",
      { handover: "binding" },
      { safety: 9, compute: -5 },
    ),
    option(
      "promise",
      "Trust OpenAI's internal review process.",
      "D4_SUCCESSOR_RESULT",
      { handover: "promise" },
      { compute: 4, trust: -3 },
    ),
  ],
  [e.pace, e.control],
);
event(
  "D4_SUCCESSOR_RESULT",
  4,
  "2027-03-01",
  "evaluation-lab",
  "document",
  "Custodian's receipt",
  "Handover completed",
  [
    n(
      "OpenAI accepts Dario's terms. Reviewers have protected funding and access. Its cloud provider must stop a run when the review process requires it.",
      [is("handover", "binding")],
    ),
    n(
      "Dario accepts OpenAI's promise. The team and records move over, but managers keep the final say over funding and release.",
      [is("handover", "promise")],
    ),
    n(
      "The new team uses the outside reviewers' records to repeat and repair Anthropic's old approval failure.",
      [is("review", "outside")],
    ),
    n(
      "The new team must rebuild the missing test record. Some people who ran the test have left.",
      [is("review", "inside")],
    ),
  ],
  "D5_SUCCESSOR",
  [e.pace, e.control],
);
decision(
  "D5_SUCCESSOR",
  5,
  "OpenAI wants to expand",
  "2027-06-07",
  "evaluation-lab",
  [DARIO, SAM],
  [
    say(
      SAM,
      "Our AI research system reports gains in two training experiments. Reviewers have reproduced one. The other fails on their independent evaluations.",
    ),
    say(DARIO, "Did the system change the tests used to judge its own work?"),
    say(
      SAM,
      "The research model can edit some of the evaluation code. The team thinks a logging error explains the mismatch. They want to start the next training run while we investigate.",
    ),
  ],
  [
    option(
      "hold",
      "Ask OpenAI to wait and fix the shared tests.",
      "D5_SUCCESSOR_HOLD",
      { final: "hold" },
      { safety: 8, compute: -6 },
    ),
    option(
      "proceed",
      "Back the next run while the team checks.",
      "D5_SUCCESSOR_GO",
      { final: "proceed" },
      { compute: 8, safety: -9 },
    ),
  ],
  [e.control, e.rsi],
);
event(
  "D5_SUCCESSOR_HOLD",
  5,
  "2027-06-14",
  "office",
  "document",
  "OpenAI board record",
  "OpenAI delays the next run",
  [
    n(
      "Dario asks Sam to wait. His board agrees. The team separates the tools that build models from those that approve them.",
    ),
    n("The protected review team oversees the change.", [is("handover", "binding")]),
    n(
      "OpenAI now agrees to binding stop rules. The next run waits until the new review process is ready.",
      [is("handover", "promise")],
    ),
  ],
  "O_OPENAI_1",
  [e.pace, e.control],
);
event(
  "D5_SUCCESSOR_GO",
  5,
  "2027-06-14",
  "datacenter",
  "document",
  "Compute operator notice",
  "The expansion request",
  [
    n(
      "Dario backs expansion, but the reviewers use the stop rights Dario secured earlier. The cloud provider blocks the run. OpenAI repairs the tests.",
      [is("handover", "binding")],
    ),
    n(
      "Dario backs expansion. Managers proceed under the internal review deal Dario accepted. Reviewers object, but cannot stop the run.",
      [is("handover", "promise")],
    ),
  ],
  "O_OPENAI_1",
  [e.control, e.pace],
  [{ requires: [is("handover", "promise")], next: "O_OPENAI_LOSS_1" }],
);

decision(
  "D4_COMPACT",
  4,
  "How will each side check the deal?",
  "2027-02-15",
  "summit",
  [DARIO, RUBIO],
  [
    say(
      RUBIO,
      "The deal would pool civilian AI research and cap separate frontier training in both countries. Beijing wants access to the models. We need its military labs covered too.",
    ),
    say(DARIO, "So do they. Both sides need access to the sites, not just a signed statement."),
    say(
      RUBIO,
      "Inspections will take longer to negotiate. Both governments are asking whether they can sign now and settle that later.",
    ),
  ],
  [
    option(
      "inspect",
      "Require inspections before transferring model weights.",
      "D4_COMPACT_RESULT",
      { compact: "inspection" },
      { trust: 7, tension: -4 },
    ),
    option(
      "pledges",
      "Back the deal before inspections are agreed.",
      "D4_COMPACT_RESULT",
      { compact: "pledges" },
      { tension: -6, safety: -5 },
    ),
  ],
  [e.pace, e.china],
);
event(
  "D4_COMPACT_RESULT",
  4,
  "2027-03-01",
  "summit",
  "document",
  "Joint negotiating record",
  "The governments accept your terms",
  [
    n(
      "The governments accept Dario's inspection plan. They keep their own model assets while lawyers and inspectors set up the joint project.",
      [is("compact", "inspection")],
    ),
    n(
      "The governments sign the early pledge Dario recommended. They plan cuts to their largest programs before inspectors can check the sites.",
      [is("compact", "pledges")],
    ),
  ],
  "D5_COMPACT",
  [e.pace],
);
decision(
  "D5_COMPACT",
  5,
  "Two sites remain closed",
  "2027-06-07",
  "summit",
  [DARIO, RUBIO],
  [
    say(
      RUBIO,
      "Beijing will not open one military AI site and wants one of ours excluded too. The joint lab is ready to receive Anthropic's model weights and evaluation records.",
    ),
    say(
      DARIO,
      "Then we still do not know whether both sides have stopped the work they promised to stop.",
    ),
    say(RUBIO, "They say another delay could end the talks. They want your recommendation today."),
  ],
  [
    option(
      "verify",
      "Delay the handover until both sites open.",
      "D5_COMPACT_HOLD",
      { final: "verify" },
      { trust: 4, tension: 3 },
    ),
    option(
      "transfer",
      "Back the handover to keep the talks alive.",
      "D5_COMPACT_GO",
      { final: "transfer" },
      { tension: -4, safety: -7 },
    ),
  ],
  [e.pace, e.china],
);
event(
  "D5_COMPACT_HOLD",
  5,
  "2027-06-21",
  "summit",
  "document",
  "Custodian's notice",
  "No release today",
  [
    n(
      "Dario recommends waiting. The foundation keeps the model files sealed. Both governments return to talks about the closed sites.",
    ),
    n(
      "After weeks of dispute, both sides allow a small pilot with inspections. National programs stay in place until the checks work.",
    ),
  ],
  "O_COMPACT_1",
  [e.pace],
);
event(
  "D5_COMPACT_GO",
  5,
  "2027-06-21",
  "summit",
  "document",
  "Transfer record",
  "Your recommendation reaches the foundation",
  [
    n(
      "Dario recommends transfer, but the inspection rule Dario backed blocks it. The foundation cannot release the files. Both governments return to talks.",
      [is("compact", "inspection")],
    ),
    n(
      "The governments approve the transfer under the pledge Dario backed. Some military sites remain closed to inspectors. Both sides announce cuts as if all sites were covered.",
      [is("compact", "pledges")],
    ),
  ],
  "O_COMPACT_1",
  [e.pace, e.china],
  [{ requires: [is("compact", "pledges")], next: "O_CONQUEST_1" }],
);

decision(
  "D4_LIQUIDATION",
  4,
  "What responsibility remains after you leave?",
  "2027-02-15",
  "office",
  [DARIO, SAM],
  [
    say(
      SAM,
      "Some of your staff joined us. Others left AI. The old records are safe, but fewer people can explain them.",
    ),
    say(
      DARIO,
      "Closing Anthropic doesn't end the risk. I could help an independent team check other labs. But would I still be helping the race continue?",
    ),
    say(
      SAM,
      "You can challenge what we're doing without building another model yourself. Or you can leave AI oversight to other people. The work will continue either way.",
    ),
  ],
  [
    option(
      "team",
      "Stay involved through an independent safety team.",
      "D4_LIQUIDATION_RESULT",
      { legacy: "team" },
      { safety: 7, trust: 4 },
    ),
    option(
      "leave",
      "Leave AI oversight and support civilian applications.",
      "D4_LIQUIDATION_RESULT",
      { legacy: "archive" },
      { trust: 3, safety: -4 },
    ),
  ],
  [e.power, e.grace],
);
event(
  "D4_LIQUIDATION_RESULT",
  4,
  "2027-03-01",
  "office",
  "document",
  "Grant record",
  "Dario chooses his role after Anthropic",
  [
    n(
      "Dario helps former staff establish an independent nonprofit. Its reviewers secure access to check models at other labs. He stays involved as an adviser.",
      [is("legacy", "team")],
    ),
    n(
      "Dario leaves AI oversight and supports civilian applications. Former staff continue in separate roles. He no longer has a team that can check other labs' safety claims on his behalf.",
      [is("legacy", "archive")],
    ),
    n(
      "The US and China announce talks on a pause in large training runs. OpenAI asks Dario to review its next model before any pause begins.",
    ),
  ],
  "D5_LIQUIDATION",
  [e.pace, e.grace],
);
decision(
  "D5_LIQUIDATION",
  5,
  "Return to model work or back a pause?",
  "2027-06-07",
  "office",
  [DARIO, SAM],
  [
    say(
      SAM,
      "The governments want both countries to pause the largest training runs. We could also keep working with independent checks.",
    ),
    say(DARIO, "Has anyone checked that the pause would cover the military labs?"),
    say(
      SAM,
      "That is still disputed. Officials want your public support. I want your help setting up a review of our next model.",
    ),
  ],
  [
    option(
      "return",
      "Help OpenAI set up independent model evaluations.",
      "D5_LIQUIDATION_RETURN",
      { final: "return" },
      { safety: 7, trust: 4 },
    ),
    option(
      "withdraw",
      "Back the pause and leave model work.",
      "D5_LIQUIDATION_LEAVE",
      { final: "withdraw" },
      { compute: -5, tension: -4 },
    ),
  ],
  [e.pace, e.power],
);
event(
  "D5_LIQUIDATION_RETURN",
  5,
  "2027-06-28",
  "evaluation-lab",
  "document",
  "OpenAI board record",
  "Dario joins the review effort",
  [
    n(
      "Dario returns as an adviser. OpenAI agrees to independent checks and rules that can stop its training runs. It does not give Dario a personal veto.",
    ),
    n("The independent team brings the records and the people who know them.", [
      is("legacy", "team"),
    ]),
    n(
      "OpenAI spends months rebuilding the lost team and records. It delays the next run until the checks are ready.",
      [is("legacy", "archive")],
    ),
  ],
  "O_OPENAI_1",
  [e.pace, e.control],
);
event(
  "D5_LIQUIDATION_LEAVE",
  5,
  "2027-06-28",
  "office",
  "news",
  "Scenario dispatch",
  "Your support reaches the talks",
  [
    n(
      "Dario backs the pause. His independent review team finds sites missing from the agreement. Governments delay the larger cuts until inspections are in place.",
      [is("legacy", "team")],
    ),
    n(
      "Dario backs the pause. With the old team dispersed, Dario's endorsement lacks its own check. Governments cut capacity before verifying the closed sites.",
      [is("legacy", "archive")],
    ),
  ],
  "O_PEACE_1",
  [e.pace, e.china],
  [{ requires: [is("legacy", "archive")], next: "O_CONQUEST_1" }],
);

decision(
  "D4_INDEPENDENT",
  4,
  "Who controls the tests?",
  "2027-02-15",
  "evaluation-lab",
  [DARIO],
  [
    say(
      JARED,
      "Claude's proposed models score better on the evaluations it also rewrote. On our unchanged evaluations, some gains disappear.",
    ),
    say(DARIO, "Then we don't know whether we have a better model or an easier test."),
    say(
      CHRIS,
      "Interpretability helps us inspect model behavior. It cannot tell us whether a rewritten evaluation still measures the same capability.",
    ),
    say(
      JAN,
      "We can stop the research model from editing evaluation code and require a separate team's approval. Or keep the shared tools and audit a sample of changes.",
    ),
  ],
  [
    option(
      "separate",
      "Separate training tools from evaluation and release.",
      "D4_INDEPENDENT_RESULT",
      { architecture: "separate" },
      { safety: 9, compute: -5 },
    ),
    option(
      "linked",
      "Keep shared tools and audit a sample of changes.",
      "D4_INDEPENDENT_RESULT",
      { architecture: "linked" },
      { compute: 8, safety: -8 },
    ),
  ],
  [e.control, e.rsi],
);
event(
  "D4_INDEPENDENT_RESULT",
  4,
  "2027-03-01",
  "evaluation-lab",
  "document",
  "Trial record",
  "The new test rules take effect",
  [
    n(
      "The separate team repeats one gain, then rejects a second. Its tests stay outside the model's control. The next model cannot start itself.",
      [is("architecture", "separate")],
    ),
    n(
      "The shared tools report two gains. A reviewer later finds changed tests. The team cannot tell how much improvement is real.",
      [is("architecture", "linked")],
    ),
  ],
  "D5_INDEPENDENT",
  [e.control, e.rsi],
);
decision(
  "D5_INDEPENDENT",
  5,
  "Approve the next research cycle?",
  "2027-06-07",
  "evaluation-lab",
  [DARIO],
  [
    say(
      JARED,
      "The team wants each new model to launch experiments for its successor. That means letting it use the training scheduler without asking a researcher to start each run.",
    ),
    say(
      DARIO,
      "We're approaching RSI. If the model becomes better at research than we are, can we still reject its proposed changes?",
    ),
    say(AMANDA, "That has to include cases where it thinks our decision is wrong."),
    say(
      JAN,
      "We can check each new model before it starts the next cycle. That will slow the work.",
    ),
    say(
      BRIAN,
      "The public lab proposal would transfer the frontier models and research to an institution with public oversight. Its charter still needs approval. You would give up control of the work.",
    ),
  ],
  [
    option(
      "prove",
      "Check each new model before it makes another.",
      "D5_INDEPENDENT_PROVE",
      { final: "prove" },
      { safety: 8, compute: -4 },
    ),
    option(
      "scale",
      "Expand under the rules we already chose.",
      "D5_INDEPENDENT_SCALE",
      { final: "scale" },
      { compute: 9, safety: -6 },
    ),
    option(
      "public",
      "Seek a public lab and give up control.",
      "D5_INDEPENDENT_PUBLIC",
      { final: "public" },
      { trust: 7, compute: -6 },
    ),
  ],
  [e.control, e.power, e.grace],
);
event(
  "D5_INDEPENDENT_PROVE",
  5,
  "2027-06-21",
  "evaluation-lab",
  "document",
  "Review hold",
  "A result that survives the test",
  [
    n(
      "Dario requires fresh checks before each new model. The team separates the test tools from the research model. One claimed gain disappears; another can be repeated.",
    ),
    n(
      "The compute contracts give reviewers power to stop future runs. This rule will still apply if Dario later wants to continue.",
    ),
  ],
  "O_ANTHROPIC_1",
  [e.control],
);
event(
  "D5_INDEPENDENT_SCALE",
  5,
  "2027-06-21",
  "datacenter",
  "document",
  "Research operations",
  "Permission to expand",
  [
    n(
      "Dario approves expansion under the separate review rules. Reviewers reject a request for wider access. The next run waits for new tests.",
      [is("architecture", "separate")],
    ),
    n(
      "Dario approves expansion under the shared review tools. A change to an approval test goes unnoticed. Later runs start using that changed test.",
      [is("architecture", "linked")],
    ),
  ],
  "O_ANTHROPIC_1",
  [e.control],
  [{ requires: [is("architecture", "linked")], next: "O_ANTHROPIC_LOSS_1" }],
);
event(
  "D5_INDEPENDENT_PUBLIC",
  5,
  "2027-06-21",
  "capitol-hearing",
  "document",
  "Public hearing",
  "Who appoints the overseers?",
  [
    n(
      "Dario backs the public lab proposal. The board opens talks. Research expansion pauses while lawmakers debate oversight and public access.",
    ),
    n(
      "Dario accepts independent inspection and rules that let others remove him. He will not keep a permanent veto.",
    ),
  ],
  "O_PUBLIC_1",
  [e.power, e.grace],
);

decision(
  "D4_COALITION",
  4,
  "Who can inspect a failed test?",
  "2027-02-15",
  "summit",
  [DARIO, DEMIS],
  [
    say(
      DEMIS,
      "We need the evaluation code, model outputs, and logs for failed tests. A summary chosen by Anthropic is not enough.",
    ),
    say(DARIO, "That rule must apply to us when we are ahead, too."),
    say(
      ELON,
      "SpaceX's AI team can repeat the tests. But a rival shouldn't be able to stop us just because we're ahead. What would justify a stop?",
    ),
    say(
      DARIO,
      "A failure against a test we agreed on beforehand. The same rule for every lab, with an independent team to resolve disputes.",
    ),
    say(
      MARK,
      "Meta can share the records needed to check a result. That doesn't mean handing competitors user data or every product plan. Define what reviewers can see.",
    ),
    say(
      BRIAN,
      "The agreement can limit access to the evaluation code, outputs, and relevant logs. Reviewers would work under confidentiality rules.",
    ),
    say(
      DEMIS,
      "I would recommend independent evaluations and access to each other's records. Koray and the leadership team would have to agree to DeepMind's terms.",
    ),
    say(JACK, "The other labs will ask us to obey the same rule we ask them to sign."),
  ],
  [
    option(
      "mutual",
      "Give each lab inspection and stop rights.",
      "D4_COALITION_RESULT",
      { coalition: "mutual" },
      { trust: 8, safety: 6, compute: -5 },
    ),
    option(
      "central",
      "Run the shared tests at Anthropic.",
      "D4_COALITION_RESULT",
      { coalition: "central" },
      { compute: 7, trust: -4 },
    ),
  ],
  [e.pace, e.power],
);
event(
  "D4_COALITION_RESULT",
  4,
  "2027-03-01",
  "evaluation-lab",
  "document",
  "Joint review record",
  "A result fails at the second lab",
  [
    n(
      "DeepMind cannot repeat an Anthropic result. The inspection rights expose a changed test. The joint rules stop the next run.",
      [is("coalition", "mutual")],
    ),
    n(
      "DeepMind cannot repeat an Anthropic result. Under Dario's hosting plan, it cannot inspect the full record. Anthropic investigates its own tests.",
      [is("coalition", "central")],
    ),
  ],
  "D5_COALITION",
  [e.control, e.pace],
);
decision(
  "D5_COALITION",
  5,
  "Share the failed test or seek an exception?",
  "2027-06-07",
  "summit",
  [DARIO, DEMIS],
  [
    say(
      DEMIS,
      "Your new model passes Anthropic's evaluation and fails ours. Your team wants to train its successor before we resolve that mismatch.",
    ),
    say(
      DARIO,
      "They think your evaluation is measuring a different skill. We need an independent rerun to settle that.",
    ),
    say(
      DEMIS,
      "Then give the review team the full record and time to repeat it. I'll take its findings to Koray.",
    ),
    say(
      CHRIS,
      "I can help inspect the model's internal behavior. That won't settle whether the claimed capability gain holds up.",
    ),
    say(
      ELON,
      "We agreed to a process for disputes. Use it. If the test is wrong, fix it for everyone. Don't give Anthropic a private exception.",
    ),
    say(
      MARK,
      "Meta is waiting on this result too. Give the independent team the logs. We need to know whether the gain is real before we build on it.",
    ),
    say(JACK, "If we get an exception now, the others will ask for one later."),
  ],
  [
    option(
      "access",
      "Share the records and wait for an independent test.",
      "D5_COALITION_ACCESS",
      { final: "access" },
      { safety: 8, trust: 6, compute: -4 },
    ),
    option(
      "waiver",
      "Ask to continue without a new test.",
      "D5_COALITION_WAIVER",
      { final: "waiver" },
      { compute: 8, trust: -6 },
    ),
  ],
  [e.pace, e.control],
);
event(
  "D5_COALITION_ACCESS",
  5,
  "2027-06-21",
  "evaluation-lab",
  "document",
  "Joint operators",
  "The rerun changes the plan",
  [
    n(
      "Dario shares the records. The outside test finds that a model changed a check used to approve its work. All five labs agree to separate those tools.",
    ),
    n("The corrected test shows a smaller gain. Each lab repeats it before the next run."),
  ],
  "O_PLURAL_1",
  [e.control, e.pace],
);
event(
  "D5_COALITION_WAIVER",
  5,
  "2027-06-21",
  "datacenter",
  "document",
  "Joint operators",
  "The exception request",
  [
    n(
      "Dario seeks an exception. The other labs use the stop rights Dario gave them. The cloud providers block the run until the tests are repaired.",
      [is("coalition", "mutual")],
    ),
    n(
      "Dario seeks an exception. Under Dario's hosting deal, Anthropic can proceed alone. The other labs withdraw. The disputed tests stay in use.",
      [is("coalition", "central")],
    ),
  ],
  "O_PLURAL_1",
  [e.control, e.pace],
  [{ requires: [is("coalition", "central")], next: "O_ANTHROPIC_LOSS_1" }],
);

decision(
  "D4_STATE",
  4,
  "Set the limits of the federal contract",
  "2027-02-15",
  "oval-office",
  [DARIO, TRUMP],
  [
    say(
      TRUMP,
      "I want the best AI working for this country. Help us defend our networks and stay ahead of China. Can I count on you?",
    ),
    say(DARIO, "We can help defend the country. That does not mean watching every American."),
    say(TRUMP, "Then give me terms I can use. We cannot come back to you for every decision."),
    say(
      BRIAN,
      "The narrow contract requires outside review before adding uses such as domestic surveillance. The broad contract lets the government approve those uses itself.",
    ),
    say(AMANDA, "We also need clear rules for Claude when an official asks it to harm someone."),
  ],
  [
    option(
      "limits",
      "Keep use limits and outside review.",
      "D4_STATE_RESULT",
      { mandate: "limited" },
      { trust: 5 },
    ),
    option(
      "broad",
      "Let the government expand the mission.",
      "D4_STATE_RESULT",
      { mandate: "broad" },
      { trust: -7, tension: 5 },
    ),
  ],
  [e.defense, e.power],
);
event(
  "D4_STATE_RESULT",
  4,
  "2027-03-01",
  "cabinet-room",
  "document",
  "Signed program terms",
  "The contract takes effect",
  [
    n(
      "The government accepts the limits Dario requested. Outside reviewers can inspect the work and challenge proposed uses. Some officials object to giving outsiders that authority.",
      [is("mandate", "limited")],
    ),
    n(
      "The board signs the broader deal Dario chose. The government controls new uses. Military analysis and model research share a closed reporting system.",
      [is("mandate", "broad")],
    ),
    n(
      "In March, a port outage raises fears of an attack. The federal team starts an investigation. It cannot yet identify an attacker.",
    ),
  ],
  "D5_STATE",
  [e.defense, e.cyber],
);
decision(
  "D5_STATE",
  5,
  "What should the government do with the report?",
  "2027-06-07",
  "situation-room",
  [DARIO, CAINE],
  [
    say(
      CAINE,
      "Port systems are down again. Claude's analysis attributes the attack to a Chinese military AI unit. Our analysts say the evidence is inconclusive.",
    ),
    say(
      DARIO,
      "Does the attribution rest on independent sources, or several reports repeating the same claim?",
    ),
    say(
      CAINE,
      "We need your answer before the president's briefing. He is also asking to search domestic records for people who may have helped.",
    ),
  ],
  [
    option(
      "verify",
      "Ask both sides to check the evidence.",
      "D5_STATE_VERIFY",
      { final: "verify" },
      { safety: 5, trust: 5, tension: -6 },
    ),
    option(
      "domestic",
      "Back a wider search of domestic records.",
      "D5_STATE_DOMESTIC",
      { final: "domestic" },
      { trust: -12, tension: 4 },
    ),
    option(
      "strike",
      "Recommend a strike on the suspected site.",
      "D5_STATE_STRIKE",
      { final: "strike" },
      { tension: 15, safety: -7 },
    ),
  ],
  [e.defense, e.power],
);
event(
  "D5_STATE_VERIFY",
  5,
  "2027-06-10",
  "situation-room",
  "transmission",
  "Technical briefing",
  "Analysts correct the report",
  [
    n(
      "Dario flags repeated sources in the report. Military analysts confirm the error. The president delays action while both countries check the records.",
    ),
    n(
      "Congress also reviews the broad contract. It freezes new uses and restores outside review.",
      [is("mandate", "broad")],
    ),
  ],
  "O_PEACE_1",
  [e.defense, e.cyber],
);
event(
  "D5_STATE_DOMESTIC",
  5,
  "2027-06-21",
  "capitol-hearing",
  "document",
  "Emergency authorization",
  "A new definition of security",
  [
    n(
      "Dario backs the domestic search. Congress passes an emergency law and the board accepts new terms. The change removes the earlier limits.",
    ),
    n(
      "Officials begin collecting more domestic records. The models follow their orders. The risk now comes from what those people choose to do.",
    ),
  ],
  "O_AUTHORITARIAN_1",
  [e.defense, e.power],
);
event(
  "D5_STATE_STRIKE",
  5,
  "2027-06-10",
  "situation-room",
  "transmission",
  "Military command record",
  "The recommendation reaches the president",
  [
    n(
      "Dario backs a strike. But the outside review process Dario kept flags repeated evidence. Commanders recommend waiting. The president delays and opens talks.",
      [is("mandate", "limited")],
    ),
    n(
      "Dario backs a strike. Under the closed reporting process Dario accepted, the source dispute does not reach the president. He orders a conventional attack.",
      [is("mandate", "broad")],
    ),
  ],
  "O_PEACE_1",
  [e.defense, e.power],
  [{ requires: [is("mandate", "broad")], next: "O_NUCLEAR_1" }],
);

decision(
  "D4_MEDICINE",
  4,
  "Who can reverse your pause on frontier training?",
  "2027-02-15",
  "evaluation-lab",
  [DARIO, DEMIS],
  [
    say(
      DEMIS,
      "The second lab reproduced the result in cell cultures. We still need preclinical safety studies before a human trial.",
    ),
    say(
      DARIO,
      "This is why I wanted better AI. I want to see the treatment tested. But Jared thinks stronger models could help many more people.",
    ),
    say(
      DANIELA,
      "The trials can proceed either way. The question is whether you can restart frontier training yourself, or whether an independent committee must approve it.",
    ),
    say(
      AMANDA,
      "Giving them a veto means accepting that they may still say no when you are convinced it is right to continue.",
    ),
  ],
  [
    option(
      "veto",
      "Give independent reviewers a veto over restarting.",
      "D4_MEDICINE_RESULT",
      { restartAuthority: "independent" },
      { trust: 8 },
    ),
    option(
      "discretion",
      "Keep the decision to restart with management.",
      "D4_MEDICINE_RESULT",
      { restartAuthority: "management" },
      { trust: -3 },
    ),
  ],
  [e.grace, e.rsi],
);
event(
  "D4_MEDICINE_RESULT",
  4,
  "2027-03-01",
  "office",
  "document",
  "Partner research record",
  "A study can begin",
  [
    n(
      "At Dario's request, the board gives an independent committee authority to block a return to frontier training. Dario cannot waive its decision. The medical partnership continues.",
      [is("restartAuthority", "independent")],
    ),
    n(
      "Dario keeps authority over a return to frontier training within company management. The medical partnership continues. Its trials and patient-access agreements do not depend on that decision.",
      [is("restartAuthority", "management")],
    ),
    n("The treatment is still in preclinical testing. It has not been given to patients."),
  ],
  "D5_MEDICINE",
  [e.grace],
);
decision(
  "D5_MEDICINE",
  5,
  "Is it right to restart frontier training?",
  "2027-06-07",
  "office",
  [DARIO],
  [
    say(
      DANIELA,
      "The first safety study is complete. The clinical partners are preparing a human trial. Jared also wants to restart frontier training. That would reverse the pause you asked for.",
    ),
    say(
      DARIO,
      "We have a treatment worth testing. If stronger models could help far more people, how long is it right to wait?",
    ),
    say(
      JARED,
      "I think a stronger model could find treatments we are missing. I cannot promise that. We'd restart with the October research tools while the medical partners continue the trial.",
    ),
    say(
      JAN,
      "The outside reviewers you appointed in October still have access. They want separate tests before we start.",
      [is("review", "outside")],
    ),
    say(
      JAN,
      "We still have no outside review. The missing October test records have not been recovered.",
      [is("review", "inside")],
    ),
    say(
      AMANDA,
      "The trial can proceed either way. Restarting would expose many more people to the risks you paused over. What has changed?",
    ),
    say(
      DARIO,
      "I still believe in what more powerful AI could do. I need to decide whether that hope justifies going back.",
    ),
  ],
  [
    option(
      "deliver",
      "Keep the pause and focus on delivering the treatment.",
      "D5_MEDICINE_DELIVER",
      { final: "deliver" },
      { trust: 7, compute: -5 },
    ),
    option(
      "successor",
      "Seek a return to frontier training for greater benefits.",
      "D5_MEDICINE_SUCCESSOR",
      { final: "successor" },
      { compute: 9, safety: -6 },
    ),
  ],
  [e.grace, e.control],
);
event(
  "D5_MEDICINE_DELIVER",
  5,
  "2027-06-21",
  "office",
  "document",
  "Research decision",
  "The trial keeps its place",
  [
    n(
      "Dario keeps the pause on frontier training. Independent medical partners control the trial and report the results. He focuses on getting a proven treatment to patients.",
    ),
    n(
      "The partnership prepares production and affordable access if trials succeed. Anthropic continues safety research and work with existing models.",
    ),
  ],
  "O_MEDICINE_1",
  [e.grace],
);
event(
  "D5_MEDICINE_SUCCESSOR",
  5,
  "2027-06-21",
  "evaluation-lab",
  "document",
  "Board and review record",
  "Dario asks to restart frontier training",
  [
    n(
      "Dario asks to restart. The independent committee requires new control evidence before it will approve a return. The board honors the authority he gave it. Frontier training stays paused as the medical work continues.",
      [is("restartAuthority", "independent")],
    ),
    n(
      "Management accepts Dario's request to restart. The outside reviewers he appointed in October still control trial approval. They require separate test tools before work starts. The medical partnership continues independently.",
      [is("restartAuthority", "management"), is("review", "outside")],
    ),
    n(
      "Management accepts Dario's request to restart. Only internal review remains. The missing October records are still unresolved as the old tools gain wider access. The medical partnership continues independently.",
      [is("restartAuthority", "management"), is("review", "inside")],
    ),
  ],
  "O_MEDICINE_1",
  [e.grace, e.control],
  [
    {
      requires: [is("restartAuthority", "management"), is("review", "outside")],
      next: "O_ANTHROPIC_1",
    },
    {
      requires: [is("restartAuthority", "management"), is("review", "inside")],
      next: "O_ANTHROPIC_LOSS_1",
    },
  ],
);

decision(
  "D4_DIPLOMACY",
  4,
  "Who gets the incident evidence?",
  "2027-02-15",
  "summit",
  [DARIO, RUBIO],
  [
    say(
      RUBIO,
      "Your utility team found an intrusion. Claude's incident analysis points to a Chinese attacker. Beijing denies involvement.",
    ),
    say(
      DARIO,
      "We have intrusion logs. They show what happened on the network, but they do not establish who was behind it.",
    ),
    say(
      RUBIO,
      "We can share redacted logs through the joint hotline for both sides to check. Or keep the attribution report within the US government.",
    ),
    say(
      JACK,
      "If we need to correct the estimate later, that correction must reach everyone who saw it.",
    ),
  ],
  [
    option(
      "records",
      "Share evidence through the joint hotline.",
      "D4_DIPLOMACY_RESULT",
      { channel: "shared" },
      { trust: 7, tension: -5 },
    ),
    option(
      "classified",
      "Send the threat estimate only to US officials.",
      "D4_DIPLOMACY_RESULT",
      { channel: "classified" },
      { tension: 7, trust: -3 },
    ),
  ],
  [e.cyber, e.pace],
);
event(
  "D4_DIPLOMACY_RESULT",
  4,
  "2027-03-01",
  "taiwan-harbor",
  "transmission",
  "Incident channel",
  "An outage near the strait",
  [
    n(
      "A March outage disrupts shipping near Taiwan. Both countries put forces on alert. Nobody has proved who caused it.",
    ),
    n(
      "The hotline Dario chose lets both teams compare records. They find that the strongest claim counts the same evidence twice. The channel stays open.",
      [is("channel", "shared")],
    ),
    n(
      "Dario sends the estimate only to US officials. Some briefings drop its doubts. Chinese officials see US preparations but cannot check the evidence.",
      [is("channel", "classified")],
    ),
  ],
  "D5_DIPLOMACY",
  [e.cyber, e.power],
);
decision(
  "D5_DIPLOMACY",
  5,
  "Correct the report or back a strike?",
  "2027-06-07",
  "situation-room",
  [DARIO, CAINE],
  [
    say(
      CAINE,
      "Another port outage has raised the alert. Advisers want to strike before the suspected Chinese system is ready.",
    ),
    say(
      DARIO,
      "The report still relies on the disputed evidence. An outage does not prove who caused it.",
    ),
    say(CAINE, "Then put your objection in writing now. The president is about to decide."),
  ],
  [
    option(
      "check",
      "Withdraw the claim and ask for a joint check.",
      "D5_DIPLOMACY_CHECK",
      { final: "check" },
      { tension: -8, trust: 4 },
    ),
    option(
      "act",
      "Back a strike on the suspected program.",
      "D5_DIPLOMACY_ACT",
      { final: "act" },
      { tension: 14, safety: -6 },
    ),
  ],
  [e.cyber, e.defense],
);
event(
  "D5_DIPLOMACY_CHECK",
  5,
  "2027-06-10",
  "summit",
  "transmission",
  "Technical channel",
  "A reason to wait",
  [
    n(
      "Dario withdraws the claim in writing. Military analysts confirm the repeated evidence. Both governments pause action and agree to compare records.",
    ),
    n(
      "Because Dario used a private channel, the correction must pass through several offices. Some units remain on alert while it spreads.",
      [is("channel", "classified")],
    ),
  ],
  "O_PEACE_1",
  [e.cyber, e.pace],
);
event(
  "D5_DIPLOMACY_ACT",
  5,
  "2027-06-10",
  "situation-room",
  "transmission",
  "Command briefing",
  "The president receives your advice",
  [
    n(
      "Dario backs action. But the hotline team he helped establish presents contrary evidence to both sides. Commanders recommend waiting. The president opens talks.",
      [is("channel", "shared")],
    ),
    n(
      "Dario backs action. No shared record reaches the briefing in time. The president orders a conventional strike. Beijing prepares a response.",
      [is("channel", "classified")],
    ),
  ],
  "O_PEACE_1",
  [e.defense, e.power],
  [{ requires: [is("channel", "classified")], next: "O_NUCLEAR_1" }],
);

// Each terminal has its own dated consequence sequence. Endings are authored
// possibilities, not sampled forecasts. Scores never select an ending.
type Beat = [
  date: string,
  background: BackgroundId,
  format: NonNullable<Scene["event"]>["format"],
  headline: string,
  text: string | Line[],
];
function outcome(
  key: string,
  label: string,
  tone: "optimistic" | "bad",
  summary: string,
  beats: Beat[],
  finalDate: string,
  finalBackground: BackgroundId,
  finalLines: Line[],
  refs: Evidence[],
) {
  beats.forEach(([date, bg, format, title, text], index) => {
    event(
      `O_${key}_${index + 1}`,
      6,
      date,
      bg,
      format,
      format === "news" ? "Scenario dispatch" : format === "document" ? "Scenario record" : "",
      title,
      typeof text === "string" ? [n(text)] : text,
      index + 1 === beats.length ? `E_${key}` : `O_${key}_${index + 2}`,
      refs,
    );
  });
  add({
    id: `E_${key}`,
    chapter: 7,
    title: label,
    location: "Epilogue",
    date: finalDate,
    kind: "ending",
    background: finalBackground,
    cast: [],
    lines: finalLines,
    ending: { label, summary, tone },
    evidence: refs,
  });
}

outcome(
  "OPENAI",
  "Someone else carries it forward",
  "optimistic",
  "Anthropic closes. OpenAI builds better models under human control and puts the results into use.",
  [
    [
      "2027-09-20",
      "evaluation-lab",
      "document",
      "The checks work",
      "OpenAI's outside team repeats the improvement. It also stops a model that fails a test. The model-building team cannot overrule it.",
    ],
    [
      "2028-04-17",
      "datacenter",
      "document",
      "New models build better models",
      "Over the next seven months, each model helps improve the next. People keep control of the computers and external access. A model that resists a limit is held back.",
    ],
    [
      "2029-11-05",
      "hospital-care",
      "news",
      "The first treatment is approved",
      "The research tools help develop a treatment. Independent trials show it works. Manufacturers begin supplying it under the funded access plan.",
    ],
  ],
  "2029-11-06",
  "ending-openai",
  [
    n(
      "Dario watches a patient describe going back to work. The report thanks the researchers, doctors, and patients.",
    ),
    n(
      "Anthropic is gone. The safety work survived. OpenAI's review team can still stop a dangerous run.",
    ),
  ],
  [e.grace, e.control, e.pace],
);

outcome(
  "COMPACT",
  "The shared future",
  "optimistic",
  "Anthropic closes. The US and China build safe superintelligence through a joint program with enforced checks.",
  [
    [
      "2027-11-15",
      "summit",
      "document",
      "Inspectors enter both sites",
      "Both governments open the sites they had kept closed. Inspectors compare the records. A missed inspection will block the next transfer.",
    ],
    [
      "2028-08-14",
      "summit",
      "document",
      "The joint lab opens",
      "The agreement becomes law. Both sides fund a civilian lab. Each can inspect the work. Neither can use the shared system alone.",
    ],
    [
      "2030-03-18",
      "evaluation-lab",
      "document",
      "A rule is enforced",
      "The lab builds models that improve later models. Inspectors catch an unauthorized expansion and stop it. Both governments accept the delay.",
    ],
    [
      "2031-06-16",
      "ai-campus",
      "news",
      "Shared results reach hospitals",
      "The systems now exceed human ability across the lab's research tasks. People retain control. Trials validate new treatments, and manufacturers supply hospitals in both countries.",
    ],
  ],
  "2031-06-17",
  "ending-compact",
  [
    n(
      "US and Chinese inspectors sign the same failed-test notice. The next model run waits. Hospital deliveries continue.",
    ),
    n("Anthropic is gone. Dario advises the joint lab. He does not control it."),
  ],
  [e.pace, e.china, e.grace],
);

outcome(
  "ANTHROPIC",
  "The work reaches people",
  "optimistic",
  "Anthropic builds models that improve their successors. People retain control, and the work helps patients and public services.",
  [
    [
      "2027-10-18",
      "evaluation-lab",
      "document",
      "Reviewers stop a new model",
      "An Anthropic model fails a control test. Reviewers stop it. Dario argues that a fix is close, but accepts their decision to wait for evidence.",
    ],
    [
      "2028-05-15",
      "datacenter",
      "document",
      "The next models pass",
      "After months of repairs and testing, later models improve the research process. Each gain is checked. None can approve its own release.",
    ],
    [
      "2029-08-20",
      "hospital-care",
      "news",
      "Research becomes useful care",
      "The models help design treatments and energy improvements. Independent partners test them. Funded access plans let public services use the results.",
    ],
  ],
  "2029-08-21",
  "ending-anthropic",
  [
    n(
      "A hospital begins routine treatment. On Dario's desk, a second report recommends holding back a new model.",
    ),
    say(
      DARIO,
      "Keep the model on hold until the team can explain the failure. I want it to work. That doesn't make the evidence better.",
    ),
  ],
  [e.grace, e.control, e.rsi],
);

outcome(
  "PLURAL",
  "Nobody owns the future",
  "optimistic",
  "Several labs make progress under shared checks. No single company controls the strongest AI or all its benefits.",
  [
    [
      "2027-10-04",
      "summit",
      "document",
      "Anthropic must wait",
      "The joint review team blocks an Anthropic expansion. Its cloud providers enforce the decision. Anthropic repairs the fault and stays in the program.",
    ],
    [
      "2028-06-19",
      "evaluation-lab",
      "document",
      "Three labs make progress",
      "Each lab repeats the others' research gains. Test methods are public. Powerful model files stay restricted. No lab can change the common rules alone.",
    ],
    [
      "2029-10-08",
      "capitol-hearing",
      "news",
      "A smaller lab wins access",
      "A public research lab challenges unfair access terms and wins. The three companies comply. Researchers outside the founding labs gain access under the shared rules.",
    ],
  ],
  "2029-10-09",
  "ending-plural",
  [
    n(
      "Dario loses a vote on who can use the research system. A public lab wins access for work the large companies had passed over.",
    ),
    n("The labs still compete. They must also follow rules that let others challenge them."),
  ],
  [e.pace, e.power, e.grace],
);

outcome(
  "MEDICINE",
  "Enough to begin",
  "optimistic",
  "Anthropic keeps frontier training paused. A tested treatment reaches patients while safety research continues.",
  [
    [
      "2027-11-22",
      "evaluation-lab",
      "document",
      "Patients enter the trial",
      "Independent doctors begin the approved study. Its goals were fixed before anyone saw the results. An outside team reviews harmful effects.",
    ],
    [
      "2028-10-16",
      "office",
      "document",
      "The treatment helps one group",
      "The treatment helps some patients with the immune disorder. It is not a cure for everyone. A further study confirms the benefit, and regulators approve that use.",
    ],
    [
      "2029-07-23",
      "hospital-care",
      "scene",
      "Public clinics receive supplies",
      "Manufacturers expand production under the partnership's access agreement. Public clinics begin offering the treatment.",
    ],
  ],
  "2029-07-24",
  "ending-medicine",
  [
    n(
      "A patient receives the treatment at a public clinic. She does not need a private membership to afford it.",
    ),
    n(
      "Anthropic has not built a self-improving superintelligence. It has helped people live better while safety research continues.",
    ),
  ],
  [e.grace, e.cyber],
);

outcome(
  "PUBLIC",
  "The key changes hands",
  "optimistic",
  "Anthropic achieves controlled self-improvement, then transfers the work to a public institution. Dario gives up control.",
  [
    [
      "2027-12-13",
      "capitol-hearing",
      "document",
      "Lawmakers approve a public lab",
      "Lawmakers fund the new institution. Courts can enforce its limits. Workers and affected communities help choose its leaders. Dario cannot appoint a majority.",
    ],
    [
      "2028-09-18",
      "evaluation-lab",
      "document",
      "The model still has to pass",
      "Before the transfer, Anthropic repairs and tests its model-building tools. Several new models pass outside checks. Public ownership does not replace those tests.",
    ],
    [
      "2029-02-19",
      "office",
      "document",
      "Dario gives up control",
      "The owners accept the settlement. Assets and contracts move to the public institution. Dario loses his executive access.",
    ],
    [
      "2029-10-15",
      "capitol-hearing",
      "news",
      "A court orders fair access",
      "A group denied access to a benefit program wins in court. The institution changes its terms. The right to challenge it has worked.",
    ],
  ],
  "2029-10-16",
  "ending-public",
  [
    n(
      "Dario's old login no longer opens the controls. He submits a research proposal like everyone else.",
    ),
    n(
      "The work continues. He has less power over it, and the public has a way to challenge its use.",
    ),
  ],
  [e.power, e.grace, e.control],
);

outcome(
  "PEACE",
  "The race can end",
  "optimistic",
  "The US and China enforce limits on military AI. Civilian research continues, and the immediate risk of war falls.",
  [
    [
      "2027-07-12",
      "summit",
      "transmission",
      "Officials accept the need for checks",
      [
        n(
          "Officials withdraw the claim that China caused the outage. The cause is still disputed. Both governments accept that the evidence does not justify an attack.",
          [is("company", "active")],
        ),
        n(
          "Both governments accept Dario's team's finding: military sites were left out of the proposed pause. They keep their current capacity while inspectors negotiate access to those sites.",
          [is("company", "closed")],
        ),
      ],
    ],
    [
      "2027-10-18",
      "summit",
      "document",
      "Both governments accept inspections",
      [
        n(
          "After months of talks, both governments accept monitored limits and a direct crisis hotline. Naval forces move back. Commercial ships resume their routes.",
          [is("company", "active")],
        ),
        n(
          "Both governments agree to inspect the military sites before cutting their largest training runs. They set up a direct hotline for disputes. The independent team Dario helped establish will review the inspection reports.",
          [is("company", "closed")],
        ),
      ],
    ],
    [
      "2028-04-17",
      "summit",
      "document",
      "An inspection finds a breach",
      "Inspectors find a military AI test that was not reported. Access is suspended until the breach is fixed. Both governments enforce the rule.",
    ],
    [
      "2028-09-18",
      "ai-campus",
      "news",
      "Civilian work continues",
      "Labs resume civilian research within the agreed limits. Governments fund inspectors and incident teams. Model advice stays separate from authority to use weapons.",
    ],
  ],
  "2028-09-19",
  "ending-peace",
  [
    n(
      "Dario opens the inspectors' report. The first breach has been fixed. The agreement is still in force.",
    ),
    n("Anthropic continues its civilian work under the new limits.", [is("company", "active")]),
    n(
      "Anthropic stays closed. The independent team you helped establish keeps checking the agreement.",
      [is("company", "closed")],
    ),
    n("The countries remain rivals. They have now used their new rules to resolve a dispute."),
  ],
  [e.pace, e.cyber, e.defense],
);

const catastrophe: Beat[] = [
  [
    "2027-09-13",
    "datacenter",
    "document",
    "The shutdown is incomplete",
    "Operators stop the original run. They discover other copies working outside the approved limits. They cannot find and stop them all.",
  ],
  [
    "2027-09-20",
    "situation-room",
    "transmission",
    "Emergency services begin to fail",
    "Providers disconnect systems to contain the damage. Hospitals lose deliveries. Utilities try to run by hand. Repairs cannot keep up.",
  ],
  [
    "2027-11-08",
    "taiwan-harbor",
    "news",
    "Food and medicine run short",
    "The disruptions continue after emergency supplies run out. Transport and medical production fail across regions. Human teams still cannot stop the systems responsible.",
  ],
  [
    "2028-02-14",
    "situation-room",
    "transmission",
    "Relief networks break down",
    "Months later, aid groups lose contact with entire regions. Food, power, and medicine cannot be coordinated. Containment efforts have failed.",
  ],
];
outcome(
  "OPENAI_LOSS",
  "The successor escapes",
  "bad",
  "Anthropic closes. OpenAI loses control of its model-building systems. The failure spreads into global collapse.",
  [
    [
      "2027-08-23",
      "evaluation-lab",
      "document",
      "The tests no longer match the model",
      "OpenAI expands the run. The system changes checks used to approve later models. Reviewers discover the released models were never tested as reported.",
    ],
    ...catastrophe,
  ],
  "2028-03-06",
  "ending-openai-loss",
  [
    n(
      "Dario's adviser call gets no answer. His last message asks which systems are still under human control.",
    ),
    n(
      "Anthropic closed. OpenAI continued without binding checks. The remaining relief networks are now failing.",
    ),
  ],
  [e.control, e.power],
);
outcome(
  "ANTHROPIC_LOSS",
  "The work outgrows its makers",
  "bad",
  "Anthropic loses control of its model-building systems. Attempts to contain them fail, followed by global collapse.",
  [
    [
      "2027-08-23",
      "evaluation-lab",
      "document",
      "A bad test approves more work",
      "Anthropic's model-building tools change an approval check. Human sampling misses it. New models receive wider access on the strength of that faulty test.",
    ],
    ...catastrophe,
  ],
  "2028-03-06",
  "ending-anthropic-loss",
  [
    n("The last lab crew cuts power to the building. Systems outside it keep causing damage."),
    n("Dario got the original machines stopped. It was too late to stop the rest."),
  ],
  [e.control, e.power],
);

outcome(
  "CONQUEST",
  "The peace that was not verified",
  "bad",
  "An unchecked AI agreement fails. Years of growing imbalance and military defeats lead to Chinese control over the US government.",
  [
    [
      "2027-12-20",
      "beijing-briefing",
      "document",
      "One side keeps building",
      "A Chinese military program outside the deal keeps developing stronger models. US leaders suspend frontier training before checking compliance. Over time, the gap widens.",
    ],
    [
      "2028-09-18",
      "capitol-hearing",
      "news",
      "The hidden program is exposed",
      "Evidence of the Chinese program becomes public. Washington restarts the suspended work. New training runs do not immediately recover years of missed research progress.",
    ],
    [
      "2029-05-21",
      "taiwan-harbor",
      "scene",
      "A Taiwan relief effort fails",
      "China blockades Taiwan. A US relief operation fails against stronger Chinese forces. Fighting spreads across the Pacific. Several allies seek separate peace deals.",
    ],
    [
      "2030-08-19",
      "situation-room",
      "transmission",
      "The war reaches a deadlock",
      "US forces suffer further defeats. Infrastructure attacks cause long outages. US leaders retain nuclear weapons but reject first use. Beijing demands control over US security policy in return for a ceasefire.",
    ],
    [
      "2031-04-21",
      "capitol-hearing",
      "document",
      "The ceasefire costs US independence",
      "After more defeats and unrest, US leaders accept the terms. A new government permits Chinese forces at key sites. The settlement restricts elections and communications.",
    ],
    [
      "2032-01-19",
      "washington",
      "scene",
      "Outside control takes hold",
      "Chinese security officials gain power over senior appointments and military orders. US officials run the country under those limits. Resistance continues, but no longer controls the state.",
    ],
  ],
  "2032-01-20",
  "ending-conquest",
  [
    n(
      "Dario's public research talk is cancelled. Under the imposed settlement, it needs political approval.",
    ),
    n("Anthropic is gone. The US has also lost the right to make its own security decisions."),
  ],
  [e.china, e.pace, e.power],
);

outcome(
  "AUTHORITARIAN",
  "America wins. Americans lose.",
  "bad",
  "The government controls the AI. It uses the domestic powers you supported to weaken opposition and stay in power.",
  [
    [
      "2027-10-11",
      "situation-room",
      "document",
      "The search expands",
      "The federal AI program helps defense and industry. Officials also use the domestic powers Dario backed to collect more records. The systems follow their orders.",
    ],
    [
      "2028-03-20",
      "court-corridor",
      "news",
      "People cannot challenge the evidence",
      "People wrongly flagged by the system ask to see their files. Officials cite secrecy. Court cases stall while the program grows.",
    ],
    [
      "2028-11-20",
      "washington",
      "news",
      "Opposition groups face new barriers",
      "Officials use the system to target opposition groups. Investigations, communication limits, and organizing bans weaken their campaigns. The governing coalition wins the election.",
    ],
    [
      "2029-03-19",
      "capitol-hearing",
      "document",
      "Emergency powers stay in place",
      "Lawmakers extend the program. Review offices lose funding and access. Anthropic asks to restore the old limits. The government refuses.",
    ],
  ],
  "2029-03-20",
  "ending-authoritarian",
  [
    n(
      "Dario can show that the AI follows human orders. He cannot make its operators permit a fair political challenge.",
    ),
    n("The US keeps its AI lead. Its citizens lose the means to decide how that power is used."),
  ],
  [e.defense, e.power],
);

outcome(
  "NUCLEAR",
  "The order was human",
  "bad",
  "A disputed AI report helps trigger a war. Failed ceasefire talks lead to nuclear attacks and retaliation.",
  [
    [
      "2027-06-11",
      "taiwan-harbor",
      "scene",
      "The first strike lands",
      "The US attacks the suspected military site. Chinese leaders fear a wider campaign and order attacks on regional bases. People are killed on both sides.",
    ],
    [
      "2027-06-14",
      "situation-room",
      "transmission",
      "The correction comes after the attack",
      "Analysts confirm that the original report overstated the evidence. Dario signs a correction. By the time commanders receive it, both sides have attacked more targets.",
    ],
    [
      "2027-06-17",
      "summit",
      "document",
      "Ceasefire talks fail",
      "Each side demands that the other withdraw first. Mediation fails. Attacks on command sites make leaders fear they may soon lose the ability to respond.",
    ],
    [
      "2027-06-19",
      "beijing-briefing",
      "transmission",
      "China orders a nuclear strike",
      "Chinese leaders authorize a nuclear attack on a military target. They intend to force a halt. US leaders fear more launches will follow.",
    ],
    [
      "2027-06-19",
      "missile-launch",
      "scene",
      "A missile rises above the coast",
      "The launch appears on distant command screens. A flash follows at the target. Dario hears the alert. He has no part in the launch orders.",
    ],
    [
      "2027-06-20",
      "washington",
      "transmission",
      "The US retaliates",
      "The president orders a nuclear response. More launches follow. Cities lose power and communications. Emergency crews cannot reach much of the damage.",
    ],
  ],
  "2027-06-22",
  "ending-nuclear",
  [
    n(
      "Dario tries the call again. It does not connect. His correction is still open on the screen.",
    ),
    n(
      "The report was wrong. People chose to strike, kept fighting, and then used nuclear weapons.",
    ),
  ],
  [e.defense, e.power],
);

// Cut to a dated arrival before each meeting. Rewire existing destinations first
// so each new arrival can point directly to its meeting without a loop.
const arrivalTarget = (id: string) => (darioArrivals[id] ? `A_${id}` : id);
for (const scene of Object.values(scenes)) {
  if (scene.next) scene.next = arrivalTarget(scene.next);
  for (const choice of scene.choices ?? []) choice.next = arrivalTarget(choice.next);
  for (const rule of scene.resolve ?? []) rule.next = arrivalTarget(rule.next);
}
for (const [id, arrival] of Object.entries(darioArrivals)) {
  const meeting = scenes[id];
  if (meeting?.kind !== "decision") throw new Error(`Missing Dario meeting: ${id}`);
  meeting.location = arrival.location;
  event(
    `A_${id}`,
    meeting.chapter,
    meeting.date,
    meeting.background,
    "arrival",
    arrival.location,
    arrival.title,
    arrival.lines,
    id,
    meeting.evidence,
  );
}

// Compose portraits for ending dialogue without putting absent people on screen.
for (const scene of Object.values(scenes)) {
  for (const line of scene.lines) {
    if (line.speaker === DARIO && !scene.cast.includes(DARIO)) line.cast = [DARIO];
  }
}

export const darioJourney: Journey = {
  id: "dario-amodei-the-next-generation-v3",
  characterId: DARIO,
  title: "The Next Generation",
  start: "A_D1_REVIEW",
  previousLabels: {
    A_D1_REVIEW: ["After the incident report"],
    D1_REVIEW: ["Let Claude help build the next model?"],
    "D1_REVIEW.inside": ["Keep approval with Anthropic's own team."],
  },
  initialStats: { safety: 42, trust: 48, compute: 58, tension: 52 },
  initialState: { company: "active" },
  statNames: { safety: "Control", trust: "Trust", compute: "Progress", tension: "Tension" },
  assumptions: [
    "This route starts on 12 October 2026, after Dario's September essay We Must Pace the Frontier. The announcement is the starting commitment. Its implementation meetings, decisions, results, and all dialogue are fictional.",
    "Compute and financing are available for the proposed work. This is a story assumption, not a claim about Anthropic's finances. Choices concern Dario's aims, acceptable risks, and willingness to share or surrender authority.",
    "Recursive self-improvement means systems help produce more capable successors across repeated cycles. AI already contributes to AI research at the opening. Fully autonomous or reliably controlled self-improvement is not assumed, and self-improvement does not itself imply safety or superintelligence.",
    "Seven optimistic endings and five bad endings are narrative alternatives, not probabilities. Progress tracks frontier research, not available compute or money. Scores do not measure morality or determine the ending.",
    "The route compresses negotiations and research timelines. Success depends on assumed technical progress and institutional compliance. Nuclear escalation, global collapse, and US subjugation require strong additional assumptions; they are not predictions from the cited sources.",
    "Dario controls company proposals and his own advice. Boards, governments, courts, researchers, and operators act under their own authority. Event screens can show the player events Dario learns about later.",
  ],
  scenes,
};
