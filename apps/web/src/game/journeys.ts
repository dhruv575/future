import { darioJourney } from "./darioJourney.ts";
import { trumpJourney } from "./trumpJourney.ts";
import type { Journey } from "./types.ts";

export const journeys: Journey[] = [trumpJourney, darioJourney];
export const journeyById: Record<string, Journey> = Object.fromEntries(
  journeys.map((journey) => [journey.id, journey]),
);
export const journeyByCharacter: Record<string, Journey> = Object.fromEntries(
  journeys.map((journey) => [journey.characterId, journey]),
);
