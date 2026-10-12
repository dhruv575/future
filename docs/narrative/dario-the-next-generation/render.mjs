import { writeFileSync } from "node:fs";
import { darioJourney as journey } from "../../../apps/web/src/game/darioJourney.ts";
import { advance, createRun, getScene } from "../../../apps/web/src/game/engine.ts";
import { speakerById } from "../../../apps/web/src/game/speakers.ts";

const root = new URL("./", import.meta.url);
const routes = [];
function visit(run) {
  if (run.history.length > 64) throw new Error("Route loop");
  const scene = getScene(journey, run);
  if (scene.kind === "ending") {
    routes.push({
      choices: run.history.filter((h) => h.choiceId).map((h) => `${h.sceneId}.${h.choiceId}`),
      ending: run.sceneId,
      state: run.state,
      scenes: [...run.history.map((h) => h.sceneId), run.sceneId],
    });
  } else if (scene.choices) {
    for (const choice of scene.choices) visit(advance(journey, run, choice.id));
  } else visit(advance(journey, run));
}
visit(createRun(journey));
const endings = Object.values(journey.scenes).filter((scene) => scene.ending);
const formatCondition = (condition) => {
  if ("state" in condition)
    return `${condition.state} = ${"equals" in condition ? condition.equals : condition.oneOf.join(" or ")}`;
  return JSON.stringify(condition);
};
const when = (conditions) =>
  conditions?.length ? ` [If ${conditions.map(formatCondition).join("; ")}]` : "";
const speakers = {
  ...Object.fromEntries(Object.values(speakerById).map((speaker) => [speaker.id, speaker.name])),
  narrator: "Narration",
};
let script = `# ${journey.title}\n\nPlayable draft. Generated from [darioJourney.ts](../../../apps/web/src/game/darioJourney.ts). Do not edit this rendered copy.\n\n`;
script += `${journey.assumptions.map((text) => `- ${text}`).join("\n")}\n\n`;
const scriptScenes = Object.values(journey.scenes)
  .filter((scene) => scene.event?.format !== "arrival")
  .flatMap((scene) =>
    scene.kind === "decision" ? [journey.scenes[`A_${scene.id}`], scene] : [scene],
  );
for (const scene of scriptScenes) {
  script += `## ${scene.id}: ${scene.title}\n\n${scene.date} · ${scene.kind} · ${scene.background}\n\n`;
  if (scene.event)
    script += `Event screen: ${scene.event.format}. All event content is fictional.\n\n`;
  for (const line of scene.lines)
    script += `**${speakers[line.speaker] ?? line.speaker}${when(line.requires)}:** ${line.text}\n\n`;
  for (const choice of scene.choices ?? [])
    script += `- **${choice.id}: ${choice.label}** → ${choice.next}\n`;
  if (scene.choices) script += "\n";
  for (const rule of scene.resolve ?? [])
    script += `Route${when(rule.requires)} → ${rule.next}\n\n`;
  if (scene.next) script += `Default continuation → ${scene.next}\n\n`;
  if (scene.ending) script += `**${scene.ending.tone} ending:** ${scene.ending.summary}\n\n`;
  script += `Research context: ${scene.evidence.map((item) => `[${item.id}](${item.url})`).join(", ")}. See source limits in the game.\n\n`;
}
writeFileSync(new URL("script.md", root), script);
let map = `# Dario branch map\n\nFive choices per run. ${routes.length} complete paths. ${Object.keys(journey.scenes).length} scenes. Twelve endings: seven optimistic and five bad. These counts are design, not odds.\n\n`;
map += "| Ending | Tone | Result |\n|---|---|---|\n";
for (const scene of endings)
  map += `| ${scene.id} | ${scene.ending.tone} | ${scene.ending.label} |\n`;
map +=
  "\n## Complete paths\n\nThe same final request can produce a different response when an earlier choice gave another actor enforceable authority.\n\n| Choices, in order | Ending |\n|---|---|\n";
for (const route of routes) map += `| ${route.choices.join(" → ")} | ${route.ending} |\n`;
writeFileSync(new URL("BRANCH-MAP.md", root), map);
writeFileSync(
  new URL("verification.json", root),
  `${JSON.stringify(
    {
      scenes: Object.keys(journey.scenes).length,
      paths: routes.length,
      endings: endings.length,
      optimistic: endings.filter((s) => s.ending.tone === "optimistic").length,
      bad: endings.filter((s) => s.ending.tone === "bad").length,
      routes,
    },
    null,
    2,
  )}\n`,
);
console.log(
  JSON.stringify({
    scenes: Object.keys(journey.scenes).length,
    paths: routes.length,
    endings: endings.length,
  }),
);
