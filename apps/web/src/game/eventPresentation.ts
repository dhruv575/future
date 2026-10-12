import type { Scene } from "./types.ts";

export function formatEventDate(date: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
  const parsed = new Date(`${date}T12:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}

export type EventSurface =
  | "arrival"
  | "paper"
  | "terminal"
  | "broadcast"
  | "dispatch"
  | "cinematic";

export const eventArtwork = {
  paper: "/scenes/report-desk.png",
  terminal: "/scenes/briefing-screen.png",
  broadcast: "/scenes/briefing-screen.png",
  dispatch: "/scenes/briefing-screen.png",
};

/** Lab findings belong on a workstation; signed terms belong on a desk. */
export function eventSurface(scene: Scene): EventSurface {
  if (scene.id === "D2_FRONTIER") return "paper";
  switch (scene.event?.format) {
    case "arrival":
      return "arrival";
    case "news":
      return "broadcast";
    case "transmission":
      return "dispatch";
    case "document":
      return ["evaluation-lab", "datacenter"].includes(scene.background) ? "terminal" : "paper";
    default:
      return "cinematic";
  }
}
