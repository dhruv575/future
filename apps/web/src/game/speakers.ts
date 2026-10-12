import { anthropicSpeakers } from "./anthropicCast.ts";
import { characterById } from "./roster.ts";
import type { Speaker } from "./types.ts";

// Supporting roles do not add selectable cards to the ten-person roster.
export const speakerById: Record<string, Speaker> = {
  ...characterById,
  "AI-E018": {
    id: "AI-E018",
    name: "Demis Hassabis",
    affiliationIds: ["AI-E003"],
    sprite: "/sprites/people/ai-e018.png",
  },
  "AI-E021": {
    id: "AI-E021",
    name: "Mark Zuckerberg",
    affiliationIds: ["AI-E004"],
    sprite: "/sprites/people/ai-e021.png",
  },
  ...Object.fromEntries(anthropicSpeakers.map((speaker) => [speaker.id, speaker])),
  "SD-E026": {
    id: "SD-E026",
    name: "JD Vance",
    affiliationIds: ["SD-E001"],
    sprite: "/sprites/people/sd-e026.png",
  },
  "SD-E027": {
    id: "SD-E027",
    name: "Pete Hegseth",
    affiliationIds: ["SD-E001"],
    sprite: "/sprites/people/sd-e027.png",
  },
  "SD-E028": {
    id: "SD-E028",
    name: "Marco Rubio",
    affiliationIds: ["SD-E001"],
    sprite: "/sprites/people/sd-e028.png",
  },
  "SD-E029": {
    id: "SD-E029",
    name: "Dan Caine",
    affiliationIds: ["SD-E001"],
    sprite: "/sprites/people/sd-e029.png",
  },
  LAB_DIRECTOR: { id: "LAB_DIRECTOR", name: "Lab director", affiliationIds: ["SD-E001"] },
};
