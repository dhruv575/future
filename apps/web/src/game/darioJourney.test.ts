import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { backgroundIds } from "./backgrounds.ts";
import { darioJourney as journey } from "./darioJourney.ts";
import { advance, createRun, getChoiceLock, getScene, restoreRun, serializeRun } from "./engine.ts";
import { journeyByCharacter } from "./journeys.ts";
import { characters } from "./roster.ts";
import { readSavedGames, saveKey, writeCheckpoint } from "./saves.ts";
import { speakerById } from "./speakers.ts";
import { trumpJourney } from "./trumpJourney.ts";
import type { Run } from "./types.ts";

function follow(ids: string[], finish = true): Run {
  let run = createRun(journey);
  let choiceIndex = 0;
  while (getScene(journey, run).kind !== "ending") {
    const scene = getScene(journey, run);
    if (scene.kind === "decision") {
      if (choiceIndex === ids.length) break;
      run = advance(journey, run, ids[choiceIndex++]);
    } else {
      run = advance(journey, run);
    }
    assert.ok(run.history.length < 64);
  }
  assert.equal(choiceIndex, ids.length);
  if (finish) assert.equal(getScene(journey, run).kind, "ending");
  return run;
}

test("every Dario path completes five decisions, preserves saves, and reaches one of exactly 12 endings", () => {
  const visited = new Set<string>();
  const routes: Run[] = [];
  const formats = new Set<string>();
  function visit(run: Run, previousDate = "2026-10-11", wasDecision = false) {
    const scene = getScene(journey, run);
    visited.add(scene.id);
    assert.ok(run.history.length < 64, "Route loop or excessive unbroken exposition");
    assert.ok(scene.lines.length, `${scene.id}: no display lines`);
    assert.ok(scene.evidence.length, `${scene.id}: missing research context`);
    assert.ok(scene.date >= previousDate, `${scene.id}: time runs backward`);
    assert.deepEqual(restoreRun(journey, serializeRun(run)), run);
    if (wasDecision) assert.ok(scene.event, `${scene.id}: decision skipped its consequence screen`);
    if (scene.event) {
      formats.add(scene.event.format);
      assert.equal(scene.event.fictional, true);
      assert.equal(scene.cast.length, 0);
      assert.ok(scene.lines.every((line) => line.speaker === "narrator"));
    }
    if (scene.kind === "ending") {
      assert.equal(run.history.filter((entry) => entry.choiceId).length, 5);
      const beats = run.history.filter((entry) => entry.sceneId.startsWith("O_"));
      assert.ok(beats.length >= 3, `${scene.id}: ending needs visible intermediate consequences`);
      assert.throws(() => advance(journey, run), /ended/);
      routes.push(run);
      return;
    }
    if (scene.kind === "decision") {
      const arrival = journey.scenes[run.history.at(-1)?.sceneId ?? ""];
      assert.equal(arrival?.event?.format, "arrival", `${scene.id}: missing scene transition`);
      assert.equal(arrival.next, scene.id);
      assert.equal(arrival.date, scene.date);
      assert.equal(arrival.location, scene.location);
      assert.equal(scene.chapter, run.history.filter((entry) => entry.choiceId).length + 1);
      assert.ok(scene.choices && scene.choices.length >= 2 && scene.choices.length <= 3);
      for (const choice of scene.choices) {
        assert.equal(choice.detail, "", "Choice must not reveal its outcome in a tooltip");
        assert.equal(getChoiceLock(choice, run), null);
        assert.equal(
          getChoiceLock(choice, { ...run, stats: { ...run.stats, compute: 0 } }),
          null,
          "Research progress must not act as a resource requirement for a moral choice",
        );
        visit(advance(journey, run, choice.id), scene.date, true);
      }
    } else visit(advance(journey, run), scene.date);
  }
  visit(createRun(journey));
  assert.equal(routes.length, 72);
  assert.equal(visited.size, Object.keys(journey.scenes).length, "Unreachable authored scene");
  const endings = new Map(routes.map((run) => [run.sceneId, getScene(journey, run).ending]));
  assert.equal(endings.size, 12);
  assert.equal([...endings.values()].filter((end) => end?.tone === "optimistic").length, 7);
  assert.equal([...endings.values()].filter((end) => end?.tone === "bad").length, 5);
  assert.deepEqual([...formats].sort(), ["arrival", "document", "news", "scene", "transmission"]);
  for (const run of routes) {
    if (["E_OPENAI", "E_COMPACT", "E_OPENAI_LOSS", "E_CONQUEST"].includes(run.sceneId)) {
      assert.equal(run.state?.company, "closed", "Shutdown ending retained an active company");
    }
    if (["E_ANTHROPIC", "E_ANTHROPIC_LOSS"].includes(run.sceneId))
      assert.equal(run.state?.company, "active");
  }
});

test("earlier institutions constrain identical later requests", () => {
  assert.equal(follow(["outside", "close", "successor", "binding", "proceed"]).sceneId, "E_OPENAI");
  assert.equal(
    follow(["outside", "close", "successor", "promise", "proceed"]).sceneId,
    "E_OPENAI_LOSS",
  );
  assert.equal(follow(["inside", "close", "successor", "promise", "hold"]).sceneId, "E_OPENAI");
  assert.equal(follow(["outside", "close", "compact", "inspect", "transfer"]).sceneId, "E_COMPACT");
  assert.equal(
    follow(["outside", "close", "compact", "pledges", "transfer"]).sceneId,
    "E_CONQUEST",
  );
  assert.equal(follow(["inside", "close", "compact", "pledges", "verify"]).sceneId, "E_COMPACT");
  assert.equal(
    follow(["outside", "frontier", "independent", "separate", "scale"]).sceneId,
    "E_ANTHROPIC",
  );
  assert.equal(
    follow(["outside", "frontier", "independent", "linked", "scale"]).sceneId,
    "E_ANTHROPIC_LOSS",
  );
  assert.equal(
    follow(["inside", "frontier", "independent", "linked", "public"]).sceneId,
    "E_PUBLIC",
  );
  assert.equal(
    follow(["outside", "frontier", "coalition", "mutual", "waiver"]).sceneId,
    "E_PLURAL",
  );
  assert.equal(
    follow(["outside", "frontier", "coalition", "central", "waiver"]).sceneId,
    "E_ANTHROPIC_LOSS",
  );
});

test("delegated restart authority and the first review choice survive later convergence", () => {
  assert.equal(
    follow(["inside", "civilian", "medicine", "veto", "successor"]).sceneId,
    "E_MEDICINE",
  );
  assert.equal(
    follow(["outside", "civilian", "medicine", "discretion", "successor"]).sceneId,
    "E_ANTHROPIC",
  );
  assert.equal(
    follow(["inside", "civilian", "medicine", "discretion", "successor"]).sceneId,
    "E_ANTHROPIC_LOSS",
  );
  assert.equal(
    follow(["inside", "civilian", "medicine", "discretion", "deliver"]).sceneId,
    "E_MEDICINE",
  );
});

test("military advice reaches human decision makers and independent channels can interrupt escalation", () => {
  const nuclear = follow(["inside", "frontier", "state", "broad", "strike"]);
  assert.equal(nuclear.sceneId, "E_NUCLEAR");
  assert.equal(follow(["inside", "frontier", "state", "limits", "strike"]).sceneId, "E_PEACE");
  assert.equal(
    follow(["inside", "frontier", "state", "broad", "domestic"]).sceneId,
    "E_AUTHORITARIAN",
  );
  assert.equal(follow(["inside", "civilian", "diplomacy", "records", "act"]).sceneId, "E_PEACE");
  assert.equal(
    follow(["inside", "civilian", "diplomacy", "classified", "act"]).sceneId,
    "E_NUCLEAR",
  );
  const sequence = nuclear.history
    .filter((entry) => entry.sceneId.startsWith("O_NUCLEAR"))
    .map((entry) => entry.sceneId);
  assert.deepEqual(sequence, [
    "O_NUCLEAR_1",
    "O_NUCLEAR_2",
    "O_NUCLEAR_3",
    "O_NUCLEAR_4",
    "O_NUCLEAR_5",
    "O_NUCLEAR_6",
  ]);
});

test("the shared peace ending preserves the event that brought each route to talks", () => {
  const closed = follow(["outside", "close", "liquidation", "team", "withdraw"]);
  const active = follow(["outside", "civilian", "diplomacy", "records", "check"]);
  for (const run of [closed, active]) assert.equal(run.sceneId, "E_PEACE");
  const passage = (run: Run, sceneId: string) =>
    getScene(journey, { ...run, sceneId })
      .lines.map((line) => line.text)
      .join(" ");
  assert.match(passage(closed, "O_PEACE_1"), /military sites were left out/);
  assert.doesNotMatch(passage(closed, "O_PEACE_1"), /outage|attack/);
  assert.match(passage(active, "O_PEACE_1"), /outage/);
  assert.doesNotMatch(passage(closed, "O_PEACE_2"), /Naval forces|Commercial ships/);
  assert.match(passage(active, "O_PEACE_2"), /Naval forces/);
  assert.match(passage(closed, "E_PEACE"), /Anthropic stays closed/);
  assert.doesNotMatch(passage(closed, "E_PEACE"), /Anthropic continues/);
});

test("all scene assets, speakers, affiliations, and destinations exist", () => {
  for (const scene of Object.values(journey.scenes)) {
    const targets = [
      scene.next,
      ...(scene.choices?.map((c) => c.next) ?? []),
      ...(scene.resolve?.map((r) => r.next) ?? []),
    ];
    for (const target of targets.filter(Boolean))
      assert.ok(target && journey.scenes[target], `${scene.id}: ${target}`);
    assert.ok(backgroundIds.includes(scene.background));
    assert.ok(existsSync(new URL(`../../public/scenes/${scene.background}.png`, import.meta.url)));
    for (const line of scene.lines) {
      const cast = line.cast ?? scene.cast;
      assert.ok(cast.length <= 2);
      for (const id of cast) {
        const person = speakerById[id];
        assert.ok(person?.sprite);
        assert.ok(existsSync(new URL(`../../public${person.sprite}`, import.meta.url)));
      }
      if (line.speaker !== "narrator") {
        const person = speakerById[line.speaker];
        assert.ok(person?.affiliationIds.length);
        if (person.sprite) assert.ok(cast.includes(person.id));
      }
    }
  }
});

test("Dario is playable and has an independent save including event position", () => {
  assert.equal(journeyByCharacter["AI-E017"], journey);
  assert.equal(characters.find((person) => person.id === "AI-E017")?.available, true);
  const data = new Map<string, string>();
  const storage = {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => {
      data.set(key, value);
    },
  };
  const oldVersions = [
    "dario-amodei-the-next-generation-v1",
    "dario-amodei-the-next-generation-v2",
  ];
  for (const id of oldVersions) {
    data.set(`war-games.${id}`, JSON.stringify({ journeyId: id }));
    const oldRun = { ...createRun(journey), journeyId: id };
    assert.equal(restoreRun(journey, serializeRun(oldRun)), null);
  }
  assert.equal(readSavedGames(storage).checkpoints[journey.id], undefined);
  const trump = { run: createRun(trumpJourney), lineIndex: 1 };
  const arrival = createRun(journey);
  const meeting = advance(journey, arrival);
  const dario = { run: advance(journey, meeting, "outside"), lineIndex: 1 };
  writeCheckpoint(storage, trumpJourney, trump);
  writeCheckpoint(storage, journey, dario);
  assert.deepEqual(readSavedGames(storage).checkpoints[journey.id], dario);
  assert.deepEqual(readSavedGames(storage).checkpoints[trumpJourney.id], trump);
  assert.notEqual(saveKey(journey), saveKey(trumpJourney));
  for (const id of oldVersions) {
    assert.notEqual(saveKey(journey), `war-games.${id}`);
    assert.equal(
      data.get(`war-games.${id}`),
      JSON.stringify({ journeyId: id }),
      "The rewrite must retain earlier Dario saves without reinterpreting their choices",
    );
  }
  const forged = structuredClone(dario.run);
  if (!forged.state) throw new Error("Missing story state");
  forged.state.company = "closed";
  assert.equal(restoreRun(journey, serializeRun(forged)), null);
});
