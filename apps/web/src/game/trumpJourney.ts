import draft from "../../../../docs/narrative/trump-the-national-asset/branches.json" with {
  type: "json",
};
import type { BackgroundId } from "./backgrounds.ts";
import { speakerById } from "./speakers.ts";
import type {
  Condition,
  Evidence,
  Journey,
  Line,
  Scene,
  Stats,
  StoryState,
  StoryValue,
} from "./types.ts";

type DraftCondition =
  | { key: string; equals: StoryValue }
  | { key: string; in: StoryValue[] }
  | { all: DraftCondition[] };
interface DraftLine {
  speaker: string;
  text: string;
  when?: DraftCondition;
}
interface DraftOption {
  id: string;
  label: string;
  next?: string;
  effects: StoryState;
  consequence: string;
  consequence_variants?: { when: DraftCondition; text: string }[];
  next_by_state?: { when: DraftCondition; next: string }[];
}
interface DraftNode {
  id: string;
  date?: string;
  level: number;
  title: string;
  place: string;
  lines: DraftLine[];
  options: DraftOption[];
}
interface Draft {
  start: string;
  title: string;
  initial_state: StoryState;
  nodes: DraftNode[];
  endings: { id: string; title: string; text: string; epilogue: string; summary: string }[];
  ending_ownership: { when: DraftCondition; text: string }[];
  ending_additions: { when: DraftCondition; text: string }[];
  assumptions: string[];
}
// The manuscript is the story source. Runtime tests walk every compiled route.
const story = draft as Draft;
const TRUMP = "SD-E025";
const names: Record<string, string> = {
  Narration: "narrator",
  Trump: TRUMP,
  Vance: "SD-E026",
  Hegseth: "SD-E027",
  Rubio: "SD-E028",
  Caine: "SD-E029",
  Sam: "AI-E016",
  Dario: "AI-E017",
  Xi: "SD-E031",
  Jensen: "TW-E020",
  Lai: "TW-E008",
  Wei: "TW-E015",
  "Lab director": "LAB_DIRECTOR",
};

function conditions(condition: DraftCondition): Condition[] {
  if ("all" in condition) return condition.all.flatMap(conditions);
  return [
    "in" in condition
      ? { state: condition.key, oneOf: condition.in }
      : { state: condition.key, equals: condition.equals },
  ];
}

function line(item: DraftLine): Line {
  const speaker = names[item.speaker];
  if (!speaker) throw new Error(`Unknown Trump story speaker: ${item.speaker}`);
  return {
    speaker,
    text: item.text,
    ...(item.when ? { requires: conditions(item.when) } : {}),
  };
}

const evidence = {
  movement: {
    id: "TR-09",
    title: "Pacing the Frontier · July 2026",
    url: "https://www.pacingthefrontier.com/",
    context: "AI workers called for international tools to pace automated AI development.",
    limit:
      "This is a public appeal, not a binding pact or a movement founded jointly by Sam and Dario.",
  },
  incident: {
    id: "TR-10",
    title: "OpenAI's Hugging Face incident report · 26 August 2026",
    url: "https://openai.com/index/hugging-face-incident-and-the-road-ahead/",
    context:
      "OpenAI reported unauthorized model actions during a July evaluation that affected its systems and Hugging Face.",
    limit:
      "This is the company's account. It does not identify the event as a Chinese attack. The later crisis in this game is invented.",
  },
  review: {
    id: "TR-11",
    title: "METR / Redwood incident investigation · 26 August 2026",
    url: "https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/",
    context:
      "The external review described unauthorized coordination and attacks linked to evaluation cheating.",
    limit:
      "Its investigation had a defined scope. It was not a complete security-impact or remediation audit, and did not attribute the incident to China.",
  },
  pacing: {
    id: "TR-12",
    title: "Dario Amodei · We Must Pace the Frontier · September 2026",
    url: "https://darioamodei.com/post/we-must-pace-the-frontier",
    context:
      "Amodei proposed outside evaluators and coordinated checks while also arguing for a US lead over China.",
    limit:
      "This is a proposal, not an enacted policy or a halt to all AI work. His risk and lead estimates are judgments. All dialogue here is invented.",
  },
  sam: {
    id: "TR-13",
    title: "Sam Altman's public support · September 2026",
    url: "https://twitter.com/sama/status/2098811563415150910",
    context: "Altman publicly supported pacing and outside evaluator access.",
    limit:
      "The post was cross-checked through indexed reporting; direct retrieval was blocked. Support does not mean identical proposals. The joint White House negotiation is fiction.",
  },
  standards: {
    id: "TR-14",
    title: "OpenAI · Standards for the next phase of AI · 21 September 2026",
    url: "https://openai.com/index/building-standards-next-phase-ai/",
    context:
      "OpenAI proposed shared technical standards and human oversight as AI research becomes more automated.",
    limit:
      "The proposal did not itself require licenses or mandatory release approval. OpenAI said Hugging Face was not a recursive self-improvement event. The game's binding checkpoints are invented.",
  },
  plan: {
    id: "TR-03",
    title: "America's AI Action Plan · July 2025",
    url: "https://www.whitehouse.gov/releases/2025/07/white-house-unveils-americas-ai-action-plan/",
    context:
      "The announced policy emphasized infrastructure, industry, exports, and US leadership.",
    limit:
      "It does not announce this nationalization. The government program and score changes are authored game rules.",
  },
  court: {
    id: "TR-04",
    title: "Youngstown Sheet & Tube Co. v. Sawyer · 1952",
    url: "https://www.law.cornell.edu/supremecourt/text/343/579",
    context:
      "The Supreme Court rejected the presidential steel seizure. Emergency need alone did not supply authority.",
    limit:
      "This is a legal analogy. The game's AI case, rulings, legislative votes, and settlements are invented.",
  },
  taking: {
    id: "TR-05",
    title: "US Constitution · Fifth Amendment",
    url: "https://www.law.cornell.edu/constitution/fifth_amendment",
    context: "Due process and just compensation constrain public takings of private property.",
    limit:
      "Compensation does not itself create acquisition authority. The story assumes a new funded law and implemented transfer.",
  },
  congress: {
    id: "TR-06",
    title: "US Constitution · Article I",
    url: "https://www.law.cornell.edu/constitution/articlei",
    context:
      "Congress legislates and appropriates. The House impeaches; conviction requires two thirds of senators present.",
    limit:
      "Every vote and coalition in this story is invented. No current vote count predicts these outcomes.",
  },
  succession: {
    id: "TR-07",
    title: "US Constitution · Amendment XXV",
    url: "https://www.law.cornell.edu/constitution/amendmentxxv",
    context: "The vice president becomes president if the president is removed.",
    limit:
      "The removal in this route is fictional. It is not a claim about a pending process or its likelihood.",
  },
  escalation: {
    id: "TR-08",
    title: "Escalation Risks from Language Models · Rivera et al., 2024",
    url: "https://arxiv.org/abs/2401.03408",
    context: "The paper reports escalation patterns in simulated games with five language models.",
    limit:
      "The abstract informs a possible mechanism. It does not predict human decisions or war after nationalization. All branch outcomes are authored.",
  },
  chips: {
    id: "TW-S008",
    title: "TSMC 2025 Annual Report",
    url: "https://investor.tsmc.com/static/annualReports/2025/english/index.html",
    context:
      "Manufacturing capacity depends on facilities and suppliers outside a customer's control.",
    limit: "The shipping delays, support offers, and supply agreements in this story are invented.",
  },
} satisfies Record<string, Evidence>;

function sources(id: string): Evidence[] {
  if (/COURT|ORDER|DEFIANCE|REPAIR|ACCOUNTABILITY|BREAKDOWN|REVERSED|GRIDLOCK|REMOVED/.test(id)) {
    return [evidence.court, evidence.congress, evidence.succession, evidence.pacing];
  }
  if (/SUPPLY|BLOC|COALITION|ALLIED/.test(id))
    return [evidence.chips, evidence.plan, evidence.pacing];
  if (/WARNING|ESCALATION|REDLINE|WAR|CEASEFIRE|HOLLOW/.test(id)) {
    return [evidence.review, evidence.escalation, evidence.pacing];
  }
  if (/LAW|PUBLIC|ARSENAL|SPLIT/.test(id))
    return [evidence.taking, evidence.congress, evidence.pacing, evidence.standards];
  if (/BARGAIN|VERIFY|TRUCE/.test(id)) return [evidence.pacing, evidence.standards, evidence.plan];
  if (/BUILD/.test(id)) return [evidence.review, evidence.pacing, evidence.standards];
  return [
    evidence.incident,
    evidence.review,
    evidence.movement,
    evidence.pacing,
    evidence.sam,
    evidence.standards,
    evidence.plan,
  ];
}

// Locations are explicit: a White House call must not place Trump in Taiwan or Beijing.
const sceneBackgrounds: Record<string, BackgroundId> = {
  L1_START: "oval-office",
  L2_LAW: "cabinet-room",
  L2_ORDER: "oval-office",
  L2_DEAL: "cabinet-room",
  L3_PUBLIC: "ai-campus",
  L3_ARSENAL: "evaluation-lab",
  L3_REPAIR: "cabinet-room",
  L3_DEFIANCE: "cabinet-room",
  L3_SPLIT: "cabinet-room",
  L3_COMPACT: "oval-office",
  L4_BARGAIN: "situation-room",
  L4_REDLINE: "situation-room",
  L4_SUPPLY: "cabinet-room",
  L4_BUILD: "evaluation-lab",
  L4_COURT: "oval-office",
  L5_VERIFY: "oval-office",
  L5_WARNING: "situation-room",
  L5_ESCALATION: "situation-room",
  L5_COALITION: "summit",
  L5_BLOC: "cabinet-room",
  L5_ACCOUNTABILITY: "cabinet-room",
  L5_BREAKDOWN: "oval-office",
  E_TRUCE: "ending-trump-treaty",
  E_BLOCS: "ending-trump-blocs",
  E_HOLLOW: "ending-trump-canceled",
  E_WAR: "ending-trump-armistice",
  E_CEASEFIRE: "ending-trump-ceasefire",
  E_ALLIED: "ending-trump-boom",
  E_REVERSED: "ending-trump-private",
  E_GRIDLOCK: "ending-trump-empty",
  E_REMOVED: "ending-trump-removed",
};

function background(id: string): BackgroundId {
  const value = sceneBackgrounds[id];
  if (!value) throw new Error(`Missing Trump scene background: ${id}`);
  return value;
}

const reactionBackgrounds: Partial<Record<string, BackgroundId>> = {
  "L1_START.A": "ai-campus",
  "L1_START.B": "ai-campus",
  "L2_LAW.B": "capitol-hearing",
  "L2_ORDER.A": "court-corridor",
  "L3_PUBLIC.B": "ai-campus",
  "L3_SPLIT.A": "ai-campus",
  "L3_SPLIT.B": "capitol-hearing",
  "L4_COURT.A": "court-corridor",
  "L4_COURT.B": "capitol-hearing",
  "L4_REDLINE.A": "beijing-briefing",
  "L5_ACCOUNTABILITY.A": "court-corridor",
  "L5_BREAKDOWN.A": "court-corridor",
};

const remoteBackgrounds: Record<string, Partial<Record<string, BackgroundId>>> = {
  L4_BARGAIN: { "SD-E031": "beijing-briefing" },
  L4_SUPPLY: {
    "TW-E008": "taipei",
    "TW-E015": "taiwan-harbor",
    "TW-E020": "ai-campus",
  },
  L5_BLOC: { "TW-E008": "taipei", "TW-E015": "taiwan-harbor" },
};

function remoteShots(id: string, lines: Line[]): Line[] {
  const remote = remoteBackgrounds[id];
  if (!remote) return lines;
  return lines.map((item) => {
    const setting = remote[item.speaker];
    if (setting) return { ...item, background: setting, cast: [item.speaker] };
    // Remote guests appear only in their own shot, never beside the US officials.
    return { ...item, cast: item.cast?.filter((speaker) => !remote[speaker]) };
  });
}

/** Hold the player on the left; bring the current counterpart into the right-hand shot. */
function stage(lines: Line[], player = TRUMP): Line[] {
  const portraits = [...new Set(lines.map((item) => item.speaker))].filter((id) =>
    Boolean(speakerById[id]?.sprite),
  );
  const anchor = portraits.includes(player) ? player : portraits[0];
  let counterpart = portraits.find((id) => id !== anchor);
  return lines.map((item) => {
    if (item.speaker !== anchor && speakerById[item.speaker]?.sprite) counterpart = item.speaker;
    const cast = anchor ? [anchor, ...(counterpart ? [counterpart] : [])] : [];
    return { ...item, cast };
  });
}

// Design values, not research estimates. Branches use the explicit story state, never these scores.
// Columns: tested oversight, institutional support, usable capacity, crisis tension.
const deltas: Record<string, [number, number, number, number]> = {
  "L1_START.A": [5, -3, 0, 4],
  "L1_START.B": [-10, -12, -8, 14],
  "L1_START.C": [0, 4, 0, 2],
  "L2_LAW.A": [12, 3, 6, 5],
  "L2_LAW.B": [6, 8, 3, 0],
  "L2_ORDER.A": [10, 4, 3, -7],
  "L2_ORDER.B": [-12, -14, -12, 13],
  "L2_DEAL.A": [3, -3, 8, 5],
  "L2_DEAL.B": [8, 8, 6, -3],
  "L3_PUBLIC.A": [8, 9, 14, -3],
  "L3_PUBLIC.B": [-5, -12, -16, 9],
  "L3_ARSENAL.A": [5, 5, 12, -2],
  "L3_ARSENAL.B": [2, 0, -10, 3],
  "L3_REPAIR.A": [9, 3, 7, -3],
  "L3_REPAIR.B": [6, 7, 8, -5],
  "L3_DEFIANCE.A": [12, 4, -3, -10],
  "L3_DEFIANCE.B": [-15, -14, -10, 15],
  "L3_SPLIT.A": [5, 7, 10, -2],
  "L3_SPLIT.B": [-4, -9, -12, 9],
  "L3_COMPACT.A": [10, 9, 7, -4],
  "L3_COMPACT.B": [0, -2, 9, 7],
  "L4_BARGAIN.A": [9, 7, 0, -12],
  "L4_BARGAIN.B": [0, -4, 3, 10],
  "L4_REDLINE.A": [0, -10, -5, 22],
  "L4_REDLINE.B": [4, 3, 0, -4],
  "L4_SUPPLY.A": [3, 9, 12, -5],
  "L4_SUPPLY.B": [0, -7, -3, 8],
  "L4_BUILD.A": [8, 4, 14, -3],
  "L4_BUILD.B": [-9, -3, 2, 9],
  "L4_COURT.A": [12, 5, 4, -12],
  "L4_COURT.B": [-16, -16, -12, 18],
  "L5_VERIFY.A": [9, 8, 0, -10],
  "L5_VERIFY.B": [-5, -7, 3, 12],
  "L5_WARNING.A": [8, 3, 0, -8],
  "L5_WARNING.B": [-8, -12, -10, 24],
  "L5_ESCALATION.A": [5, 4, -3, -16],
  "L5_ESCALATION.B": [-5, -13, -12, 22],
  "L5_COALITION.A": [7, 10, 12, -7],
  "L5_COALITION.B": [0, -7, -5, 8],
  "L5_BLOC.A": [3, 8, 10, -6],
  "L5_BLOC.B": [0, -9, -8, 9],
  "L5_ACCOUNTABILITY.A": [10, 7, 5, -9],
  "L5_ACCOUNTABILITY.B": [0, -8, -8, 6],
  "L5_BREAKDOWN.A": [10, 3, 2, -14],
  "L5_BREAKDOWN.B": [-8, -16, -10, 12],
};
function scores(key: string): Partial<Stats> {
  const values = deltas[key];
  if (!values) throw new Error(`Missing authored score effect: ${key}`);
  const [safety, trust, compute, tension] = values;
  return { safety, trust, compute, tension };
}

const dates: Record<number, string> = {
  1: "October 2026",
  2: "Winter 2026–27",
  3: "Spring 2027",
  4: "Late 2027",
  5: "2028",
};
const scenes: Record<string, Scene> = {};
for (const node of story.nodes) {
  const date = node.date ?? dates[node.level] ?? "2028";
  const dateline = /202[678]/.test(node.place) ? node.place : `${date}. ${node.place}`;
  const dialogue = remoteShots(
    node.id,
    stage([{ speaker: "narrator", text: dateline }, ...node.lines.map(line)]),
  );
  scenes[node.id] = {
    id: node.id,
    chapter: node.level,
    title: node.title,
    location: node.place,
    date,
    kind: "decision",
    background: background(node.id),
    cast: [...new Set(dialogue.flatMap((item) => item.cast ?? []))],
    lines: dialogue,
    choices: node.options.map((option) => ({
      id: option.id,
      label: option.label,
      detail: "",
      next: `${node.id}_${option.id}_REACTION`,
      state: { ...option.effects },
      effects: scores(`${node.id}.${option.id}`),
    })),
    evidence: sources(node.id),
  };
  for (const option of node.options) {
    const key = `${node.id}.${option.id}`;
    const id = `${node.id}_${option.id}_REACTION`;
    const reaction = stage([
      { speaker: "narrator", text: option.consequence },
      ...(option.consequence_variants ?? []).map((variant) => ({
        speaker: "narrator",
        text: variant.text,
        requires: conditions(variant.when),
      })),
    ]);
    scenes[id] = {
      id,
      chapter: node.level,
      title: `${node.title} — After the decision`,
      location: node.place,
      date,
      kind: "reaction",
      background: reactionBackgrounds[key] ?? background(node.id),
      cast: [...new Set(reaction.flatMap((item) => item.cast ?? []))],
      lines: reaction,
      event: {
        format: /REDLINE|ESCALATION|WARNING/.test(node.id) ? "transmission" : "document",
        source: /REDLINE|ESCALATION|WARNING/.test(node.id)
          ? "Situation Room · decision record"
          : "White House · decision record",
        headline: option.consequence.split(". ")[0] ?? node.title,
        fictional: true,
      },
      evidence: sources(node.id),
      ...(option.next
        ? { next: option.next }
        : {
            resolve: option.next_by_state?.map((target) => ({
              requires: conditions(target.when),
              next: target.next,
            })),
          }),
    };
  }
}
for (const ending of story.endings) {
  scenes[ending.id] = {
    id: ending.id,
    chapter: 5,
    title: ending.title,
    location: "After the decision",
    date: "2028",
    kind: "ending",
    background: background(ending.id),
    cast: [],
    lines: [
      { speaker: "narrator", text: ending.text },
      ...[...story.ending_ownership, ...story.ending_additions].map((passage) => ({
        speaker: "narrator",
        text: passage.text,
        requires: conditions(passage.when),
      })),
      { speaker: "narrator", text: ending.epilogue },
    ],
    ending: { label: ending.title, summary: ending.summary },
    evidence: sources(ending.id),
  };
}

export const trumpJourney: Journey = {
  id: "donald-trump-super-intelligence-v3",
  characterId: TRUMP,
  title: "Super Intelligence",
  start: story.start,
  initialStats: { safety: 55, trust: 55, compute: 50, tension: 25 },
  initialState: { ...story.initial_state },
  statNames: { safety: "Oversight", trust: "Support", compute: "Capacity", tension: "Tension" },
  assumptions: [
    ...story.assumptions,
    "Oversight summarizes tested controls. Support summarizes cooperation. Capacity summarizes usable resources. Tension summarizes crisis pressure.",
    "Scores and changes are authored, not probabilities. Ownership, capability, and prior decisions determine the route; scores do not select an ending.",
  ],
  scenes,
};
