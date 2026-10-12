import type { Choice, Condition, Journey, Run, Scene, StatKey, Stats } from "./types.ts";

export type { Run } from "./types.ts";

const STAT_KEYS: StatKey[] = ["safety", "trust", "compute", "tension"];
const MAX_HISTORY = 256;
const MAX_SAVE_BYTES = 200_000;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function validStats(value: unknown): value is Stats {
  return (
    isObject(value) &&
    Object.keys(value).length === STAT_KEYS.length &&
    STAT_KEYS.every(
      (key) =>
        typeof value[key] === "number" &&
        Number.isFinite(value[key]) &&
        value[key] >= 0 &&
        value[key] <= 100,
    )
  );
}

function matches(condition: Condition, run: Run): boolean {
  if ("flag" in condition) return (run.flags[condition.flag] === true) === condition.value;
  if ("state" in condition) {
    const value = run.state?.[condition.state];
    return "equals" in condition
      ? value === condition.equals
      : value !== undefined && condition.oneOf.includes(value);
  }
  const value = run.stats[condition.stat];
  return (
    (condition.min === undefined || value >= condition.min) &&
    (condition.max === undefined || value <= condition.max)
  );
}

function rawScene(journey: Journey, id: string): Scene {
  if (!Object.hasOwn(journey.scenes, id)) throw new Error("Unknown scene.");
  const scene = journey.scenes[id];
  if (!scene || scene.id !== id) throw new Error("Invalid scene.");
  return scene;
}

export function createRun(journey: Journey): Run {
  if (!validStats(journey.initialStats)) throw new Error("Initial stats must be from 0 to 100.");
  rawScene(journey, journey.start);
  return {
    version: 1,
    journeyId: journey.id,
    sceneId: journey.start,
    stats: { ...journey.initialStats },
    flags: {},
    ...(journey.initialState ? { state: { ...journey.initialState } } : {}),
    history: [],
  };
}

export function getChoiceLock(choice: Choice, run: Run): string | null {
  return choice.requires?.find((rule) => !matches(rule, run))?.reason ?? null;
}

/** Returns a new display scene. Conditional text never changes the stored journey. */
export function getScene(journey: Journey, run: Run): Scene {
  if (run.journeyId !== journey.id || !validStats(run.stats)) throw new Error("Invalid run.");
  const scene = rawScene(journey, run.sceneId);
  return {
    ...scene,
    lines: scene.lines
      .filter((line) => line.requires?.every((rule) => matches(rule, run)) ?? true)
      .map((line) => ({ ...line })),
  };
}

/** Internal deterministic transition. Save validation replays this function. */
function step(journey: Journey, run: Run, choiceId?: string): Run {
  if (run.history.length >= MAX_HISTORY) throw new Error("Run is too long.");
  const scene = rawScene(journey, run.sceneId);
  if (scene.kind === "ending") throw new Error("This route has ended.");
  let choice: Choice | undefined;
  let next: string | undefined;
  if (scene.kind === "decision") {
    if (choiceId === undefined) throw new Error("Choose an option.");
    choice = scene.choices?.find((item) => item.id === choiceId);
    if (!choice) throw new Error("Unknown choice for this scene.");
    const lock = getChoiceLock(choice, run);
    if (lock !== null) throw new Error(lock);
    next = choice.next;
  } else {
    if (choiceId !== undefined) throw new Error("This scene does not accept a choice.");
    next =
      scene.resolve?.find((route) => route.requires.every((rule) => matches(rule, run)))?.next ??
      scene.next;
  }
  if (!next) throw new Error("Scene has no next step.");
  rawScene(journey, next);
  const stats = { ...run.stats };
  for (const key of STAT_KEYS) {
    const change = choice?.effects?.[key] ?? 0;
    if (!Number.isFinite(change)) throw new Error("Invalid stat effect.");
    stats[key] = Math.min(100, Math.max(0, stats[key] + change));
  }
  const entry: Run["history"][number] = { sceneId: scene.id, label: choice?.label ?? scene.title };
  if (choice) entry.choiceId = choice.id;
  if (choice?.effects) entry.effects = { ...choice.effects };
  return {
    version: 1,
    journeyId: journey.id,
    sceneId: next,
    stats,
    flags: { ...run.flags, ...choice?.flags },
    ...(run.state || choice?.state ? { state: { ...run.state, ...choice?.state } } : {}),
    history: [
      ...run.history.map((item) => ({
        ...item,
        ...(item.effects ? { effects: { ...item.effects } } : {}),
      })),
      entry,
    ],
  };
}

function sameData(left: unknown, right: unknown): boolean {
  if (Object.is(left, right)) return true;
  if (Array.isArray(left) && Array.isArray(right)) {
    return (
      left.length === right.length && left.every((value, index) => sameData(value, right[index]))
    );
  }
  if (!isObject(left) || !isObject(right)) return false;
  const keys = Object.keys(left);
  return (
    keys.length === Object.keys(right).length &&
    keys.every((key) => Object.hasOwn(right, key) && sameData(left[key], right[key]))
  );
}

/** Never trusts stored scores, flags, labels, effects, or a stored destination. */
function replay(journey: Journey, value: unknown): Run | null {
  if (
    !isObject(value) ||
    value.version !== 1 ||
    value.journeyId !== journey.id ||
    typeof value.sceneId !== "string" ||
    !validStats(value.stats) ||
    !isObject(value.flags) ||
    !Object.values(value.flags).every((flag) => typeof flag === "boolean") ||
    !Array.isArray(value.history) ||
    value.history.length > MAX_HISTORY
  )
    return null;
  try {
    let run = createRun(journey);
    for (const entry of value.history) {
      if (
        !isObject(entry) ||
        entry.sceneId !== run.sceneId ||
        (entry.choiceId !== undefined && typeof entry.choiceId !== "string")
      )
        return null;
      run = step(journey, run, entry.choiceId as string | undefined);
      const current = run.history.at(-1);
      const labelKey = entry.choiceId
        ? `${entry.sceneId}.${entry.choiceId}`
        : String(entry.sceneId);
      const priorLabel =
        typeof entry.label === "string" &&
        journey.previousLabels?.[labelKey]?.includes(entry.label);
      if (!sameData(current, priorLabel ? { ...entry, label: current?.label } : entry)) return null;
    }
    // Every history entry was checked above. Retain current wording when an
    // explicitly listed copy edit is the only difference in an older save.
    return sameData(run, { ...value, history: run.history }) ? run : null;
  } catch {
    return null;
  }
}

export function advance(journey: Journey, run: Run, choiceId?: string): Run {
  const checked = replay(journey, run);
  if (!checked) throw new Error("Run state does not match its history.");
  return step(journey, checked, choiceId);
}

export function serializeRun(run: Run): string {
  return JSON.stringify(run);
}

export function restoreRun(journey: Journey, raw: string): Run | null {
  if (typeof raw !== "string" || raw.length > MAX_SAVE_BYTES) return null;
  try {
    return replay(journey, JSON.parse(raw) as unknown);
  } catch {
    return null;
  }
}
