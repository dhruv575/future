import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import expected from "../../../../docs/narrative/trump-the-national-asset/verification.json" with {
  type: "json",
};
import { darioJourney } from "./darioJourney.ts";
import { advance, createRun, getScene, restoreRun, serializeRun } from "./engine.ts";
import { journeyByCharacter } from "./journeys.ts";
import { characters } from "./roster.ts";
import { readSavedGames, saveKey, writeCheckpoint } from "./saves.ts";
import { speakerById } from "./speakers.ts";
import { trumpJourney } from "./trumpJourney.ts";
import type { Run } from "./types.ts";

function choosePath(choices: string[]): Run {
  let run = createRun(trumpJourney);
  for (const id of choices) {
    assert.equal(getScene(trumpJourney, run).kind, "decision");
    run = advance(trumpJourney, run, id);
    assert.equal(getScene(trumpJourney, run).kind, "reaction");
    run = advance(trumpJourney, run);
  }
  return run;
}

test("the playable Trump route matches all 48 manuscript paths and every terminal ownership state", () => {
  const routes: Run[] = [];
  const visited = new Set<string>();
  function visit(run: Run) {
    assert.ok(run.history.length <= 10, "A route loops or adds extra decisions.");
    const scene = getScene(trumpJourney, run);
    visited.add(scene.id);
    assert.ok(scene.lines.length > 0);
    assert.ok(scene.evidence.length > 0);
    for (const value of Object.values(run.stats)) assert.ok(value >= 0 && value <= 100);
    assert.deepEqual(restoreRun(trumpJourney, serializeRun(run)), run);
    for (const line of scene.lines) {
      const cast = line.cast ?? scene.cast;
      assert.ok(cast.length <= 2, "A dialogue shot contains too many portraits.");
      for (const id of cast) {
        const speaker = speakerById[id];
        assert.ok(speaker?.sprite, "A portrait has no known sprite.");
        assert.ok(existsSync(new URL(`../../public${speaker.sprite}`, import.meta.url)));
      }
      if (line.speaker !== "narrator") {
        const speaker = speakerById[line.speaker];
        assert.ok(speaker?.affiliationIds.length, "A speaking role has no affiliation.");
        if (speaker.sprite) assert.ok(cast.includes(line.speaker));
      }
    }
    if (scene.kind === "ending") {
      routes.push(run);
      return;
    }
    if (scene.kind === "decision") {
      assert.equal(scene.chapter, run.history.filter((item) => item.choiceId).length + 1);
      assert.ok(scene.choices && scene.choices.length >= 2);
      for (const choice of scene.choices) {
        assert.equal(choice.detail, "", "A tooltip reveals consequences before the choice.");
        const next = advance(trumpJourney, run, choice.id);
        assert.equal(getScene(trumpJourney, next).kind, "reaction");
        visit(next);
      }
    } else {
      visit(advance(trumpJourney, run));
    }
  }
  visit(createRun(trumpJourney));
  assert.equal(routes.length, 48);
  assert.equal(new Set(routes.map((run) => run.sceneId)).size, 9);
  assert.equal(visited.size, 76);
  assert.equal(visited.size, Object.keys(trumpJourney.scenes).length);
  const reference = new Map(expected.routes.map((route) => [route.choices.join("/"), route]));
  for (const run of routes) {
    const choices = run.history
      .filter((entry) => entry.choiceId)
      .map((entry) => `${entry.sceneId}.${entry.choiceId}`);
    assert.equal(choices.length, 5);
    const target = reference.get(choices.join("/"));
    assert.ok(target);
    assert.equal(run.sceneId, target.ending);
    assert.deepEqual(run.state, target.state);
    const text = getScene(trumpJourney, run).lines.map((item) => item.text);
    for (const passage of [...target.ownership_text, ...target.additional_text]) {
      assert.ok(
        text.includes(passage),
        "The ending lost an inherited ownership or settlement passage.",
      );
    }
    assert.throws(() => advance(trumpJourney, run), /ended/);
  }
});

test("later decisions establish the situation and transitions show the consequence", () => {
  for (const scene of Object.values(trumpJourney.scenes)) {
    if (scene.kind === "decision" && scene.id !== trumpJourney.start) {
      assert.equal(scene.lines[1]?.speaker, "narrator", `${scene.id} needs an arrival explanation`);
    }
    if (scene.kind === "reaction") {
      assert.ok(scene.event, `${scene.id} needs a visible consequence record`);
      assert.ok(scene.lines.every((line) => line.speaker === "narrator"));
    }
    if (scene.kind === "ending") {
      assert.doesNotMatch(scene.date, /2035/);
      assert.ok(scene.ending?.summary);
      assert.ok(scene.lines.every((line) => !/2035/.test(line.text)));
    }
  }
});

test("converged warnings retain capability and expose different findings", () => {
  const strong = choosePath(["A", "A", "A", "B"]);
  const weakened = choosePath(["A", "A", "B", "B"]);
  assert.equal(strong.sceneId, "L5_WARNING");
  assert.equal(weakened.sceneId, "L5_WARNING");
  assert.equal(strong.state?.pacing_policy, "independent_gates");
  assert.equal(weakened.state?.pacing_policy, "classified_gates");
  const warningText = (run: Run) =>
    getScene(trumpJourney, run)
      .lines.map((line) => line.text)
      .join(" ");
  assert.doesNotMatch(warningText(strong), /approved to help draft plans/);
  assert.match(warningText(weakened), /approved to help draft plans/);
  const pilot = choosePath(["A", "B", "B", "B"]);
  assert.equal(pilot.state?.pacing_policy, "pilot_review");
  assert.match(warningText(pilot), /government lab's prototype/);
  assert.doesNotMatch(warningText(pilot), /approved to help draft plans/);
  const checkedStrong = advance(trumpJourney, strong, "A");
  const checkedWeak = advance(trumpJourney, weakened, "A");
  assert.match(
    getScene(trumpJourney, checkedStrong)
      .lines.map((l) => l.text)
      .join(" "),
    /limited intrusion/,
  );
  assert.match(
    getScene(trumpJourney, checkedWeak)
      .lines.map((l) => l.text)
      .join(" "),
    /unsupported attack warning/,
  );
  assert.equal(advance(trumpJourney, checkedStrong).sceneId, "E_BLOCS");
  assert.equal(advance(trumpJourney, checkedWeak).sceneId, "E_HOLLOW");
});

test("shared endings retain public ownership or private agreements, and reject forged control", () => {
  const publicTruce = choosePath(["A", "A", "A", "A", "A"]);
  const privateTruce = choosePath(["C", "B", "A", "A", "A"]);
  assert.equal(publicTruce.sceneId, "E_TRUCE");
  assert.equal(privateTruce.sceneId, "E_TRUCE");
  assert.equal(publicTruce.state?.openai_control, "public");
  assert.equal(privateTruce.state?.openai_control, "private");
  assert.match(
    getScene(trumpJourney, publicTruce)
      .lines.map((l) => l.text)
      .join(" "),
    /remain publicly owned/,
  );
  assert.match(
    getScene(trumpJourney, privateTruce)
      .lines.map((l) => l.text)
      .join(" "),
    /remain private/,
  );
  const forged = structuredClone(privateTruce);
  if (!forged.state) throw new Error("Missing story state");
  forged.state.openai_control = "public";
  assert.equal(restoreRun(trumpJourney, serializeRun(forged)), null);
  assert.equal(restoreRun(darioJourney, serializeRun(publicTruce)), null);
  const initial = createRun(trumpJourney);
  const before = serializeRun(initial);
  const moved = advance(trumpJourney, initial, "B");
  if (!moved.state) throw new Error("Missing story state");
  moved.state.legal = "statutory";
  assert.equal(serializeRun(initial), before);
  assert.equal(trumpJourney.initialState?.legal, "unchanged");
});

test("the ten-card roster exposes exactly the two implemented journeys", () => {
  assert.equal(characters.length, 10);
  assert.deepEqual(
    characters.slice(0, 2).map((character) => character.id),
    ["SD-E025", "AI-E017"],
  );
  assert.equal(characters.find((character) => character.id === "AI-E016")?.available, false);
  assert.equal(journeyByCharacter["AI-E016"], undefined);
  const playable = characters.filter((character) => character.available);
  assert.deepEqual(playable.map((character) => character.id).sort(), ["AI-E017", "SD-E025"]);
  for (const character of playable)
    assert.equal(journeyByCharacter[character.id]?.characterId, character.id);
});

function storage() {
  const data = new Map<string, string>();
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => {
      data.set(key, value);
    },
  };
}

test("each character keeps a separate save and dialogue position through switches and restart", () => {
  const store = storage();
  const dario = { run: createRun(darioJourney), lineIndex: 0 };
  const trump = { run: choosePath(["C", "A"]), lineIndex: 3 };
  writeCheckpoint(store, darioJourney, dario);
  writeCheckpoint(store, trumpJourney, trump);
  let saved = readSavedGames(store);
  assert.equal(saved.lastJourneyId, trumpJourney.id);
  assert.deepEqual(saved.checkpoints[darioJourney.id], dario);
  assert.deepEqual(saved.checkpoints[trumpJourney.id], trump);
  writeCheckpoint(store, trumpJourney, { run: createRun(trumpJourney), lineIndex: 0 });
  saved = readSavedGames(store);
  assert.deepEqual(saved.checkpoints[darioJourney.id], dario);
  assert.equal(saved.checkpoints[trumpJourney.id]?.run.history.length, 0);
  assert.notEqual(saveKey(darioJourney), saveKey(trumpJourney));
});

test("legacy and damaged saves are handled per character without blocking a valid journey", () => {
  const store = storage();
  const dario = createRun(darioJourney);
  store.setItem(saveKey(darioJourney), serializeRun(dario));
  store.setItem(saveKey(trumpJourney), "{");
  assert.deepEqual(readSavedGames(store).checkpoints[darioJourney.id]?.run, dario);
  assert.equal(readSavedGames(store).checkpoints[trumpJourney.id], undefined);
  const trump = createRun(trumpJourney);
  store.setItem(
    saveKey(trumpJourney),
    JSON.stringify({ run: serializeRun(trump), lineIndex: 1000 }),
  );
  assert.equal(readSavedGames(store).checkpoints[trumpJourney.id]?.lineIndex, 0);
  store.setItem(saveKey(trumpJourney), JSON.stringify({ run: serializeRun(dario), lineIndex: 0 }));
  assert.equal(readSavedGames(store).checkpoints[trumpJourney.id], undefined);
});

test("the coherent story revision does not load or overwrite the previous Trump story", () => {
  const store = storage();
  const dario = { run: createRun(darioJourney), lineIndex: 0 };
  writeCheckpoint(store, darioJourney, dario);
  const previousId = "donald-trump-national-asset-v2";
  const previousKey = `war-games.${previousId}`;
  const oldRun = { ...createRun(trumpJourney), journeyId: previousId };
  const previous = JSON.stringify({ run: JSON.stringify(oldRun), lineIndex: 0 });
  store.setItem(previousKey, previous);
  store.setItem("war-games.last-journey", previousId);
  let saved = readSavedGames(store);
  assert.deepEqual(saved.checkpoints[darioJourney.id], dario);
  assert.equal(saved.lastJourneyId, darioJourney.id);
  assert.equal(saved.checkpoints[trumpJourney.id], undefined);
  assert.equal(restoreRun(trumpJourney, JSON.stringify(oldRun)), null);
  const revised = { run: choosePath(["C", "B", "A"]), lineIndex: 1 };
  writeCheckpoint(store, trumpJourney, revised);
  saved = readSavedGames(store);
  assert.deepEqual(saved.checkpoints[trumpJourney.id], revised);
  assert.deepEqual(saved.checkpoints[darioJourney.id], dario);
  assert.equal(store.getItem(previousKey), previous);
});
