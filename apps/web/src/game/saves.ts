import { getScene, restoreRun, serializeRun } from "./engine.ts";
import { journeys } from "./journeys.ts";
import type { Journey, Run } from "./types.ts";

export interface Checkpoint {
  run: Run;
  lineIndex: number;
}
export type Checkpoints = Record<string, Checkpoint>;
const LAST_JOURNEY_KEY = "war-games.last-journey";

export function saveKey(journey: Journey): string {
  return `war-games.${journey.id}`;
}

export function readSavedGames(storage: Pick<Storage, "getItem">): {
  checkpoints: Checkpoints;
  lastJourneyId: string;
} {
  const checkpoints: Checkpoints = {};
  for (const journey of journeys) {
    try {
      const raw = storage.getItem(saveKey(journey));
      if (!raw || raw.length > 210_000) continue;
      const saved = JSON.parse(raw);
      const run = restoreRun(journey, typeof saved?.run === "string" ? saved.run : raw);
      if (!run) continue;
      const index: unknown = saved?.lineIndex;
      const lineIndex =
        typeof index === "number" &&
        Number.isInteger(index) &&
        index >= 0 &&
        index < getScene(journey, run).lines.length
          ? index
          : 0;
      checkpoints[journey.id] = { run, lineIndex };
    } catch {
      // A bad or unavailable save must not prevent playing another character.
    }
  }
  let lastJourneyId = Object.keys(checkpoints)[0] ?? "";
  try {
    const last = storage.getItem(LAST_JOURNEY_KEY);
    if (last && Object.hasOwn(checkpoints, last)) lastJourneyId = last;
  } catch {
    /* Storage can be disabled by the browser. */
  }
  return { checkpoints, lastJourneyId };
}

export function writeCheckpoint(
  storage: Pick<Storage, "setItem">,
  journey: Journey,
  checkpoint: Checkpoint,
): void {
  storage.setItem(
    saveKey(journey),
    JSON.stringify({
      run: serializeRun(checkpoint.run),
      lineIndex: checkpoint.lineIndex,
    }),
  );
  storage.setItem(LAST_JOURNEY_KEY, journey.id);
}
