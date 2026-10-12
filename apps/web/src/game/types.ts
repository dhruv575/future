import type { BackgroundId } from "./backgrounds.ts";

export type StatKey = "safety" | "trust" | "compute" | "tension";
export type Stats = Record<StatKey, number>;
export type StoryValue = string | boolean;
export type StoryState = Record<string, StoryValue>;

export interface Speaker {
  id: string;
  name: string;
  affiliationIds: string[];
  sprite?: string;
}

export interface Character {
  id: string;
  name: string;
  role: string;
  affiliation: string;
  affiliationIds: string[];
  sprite: string;
  accent: string;
  summary: string;
  currentState: string[];
  goals: string[];
  available: boolean;
}

export interface Evidence {
  id: string;
  title: string;
  url: string;
  context: string;
  limit: string;
}

export type Condition =
  | { flag: string; value: boolean }
  | { state: string; equals: StoryValue }
  | { state: string; oneOf: StoryValue[] }
  | { stat: StatKey; min?: number; max?: number };

export interface Line {
  speaker: string;
  text: string;
  requires?: Condition[];
  /** Optional shot composition for this dialogue beat. */
  cast?: string[];
  /** A remote speaker or reaction can cut to another setting. */
  background?: BackgroundId;
}

export interface Choice {
  id: string;
  label: string;
  detail: string;
  next: string;
  effects?: Partial<Stats>;
  flags?: Record<string, boolean>;
  state?: StoryState;
  requires?: { flag: string; value: boolean; reason: string }[];
}

export interface Scene {
  id: string;
  chapter: number;
  title: string;
  location: string;
  date: string;
  kind: "story" | "decision" | "reaction" | "ending";
  background: BackgroundId;
  cast: string[];
  lines: Line[];
  choices?: Choice[];
  next?: string;
  /** First matching rule wins when the player continues. next is the fallback. */
  resolve?: { requires: Condition[]; next: string }[];
  /** An authored event screen. It is not a historical news report. */
  event?: {
    format: "arrival" | "document" | "news" | "scene" | "transmission";
    source: string;
    headline: string;
    fictional: true;
  };
  ending?: { label: string; summary: string; tone?: "optimistic" | "bad" };
  evidence: Evidence[];
}

export interface Journey {
  id: string;
  characterId: string;
  title: string;
  start: string;
  initialStats: Stats;
  initialState?: StoryState;
  statNames?: Record<StatKey, string>;
  assumptions?: string[];
  /** Exact prior wording accepted during save replay, keyed by scene or scene.choice. */
  previousLabels?: Record<string, string[]>;
  scenes: Record<string, Scene>;
}

export interface Run {
  version: 1;
  journeyId: string;
  sceneId: string;
  stats: Stats;
  flags: Record<string, boolean>;
  state?: StoryState;
  history: {
    sceneId: string;
    choiceId?: string;
    label: string;
    effects?: Partial<Stats>;
  }[];
}
