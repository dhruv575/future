import assert from "node:assert/strict";
import test from "node:test";
import { advance, createRun, restoreRun, serializeRun } from "./engine.ts";
import { trumpJourney } from "./trumpJourney.ts";

test("engine rejects illegal choices and forged saves without changing the run", () => {
  const run = createRun(trumpJourney);
  const before = serializeRun(run);
  assert.throws(() => advance(trumpJourney, run, "missing"));
  assert.throws(() => advance(trumpJourney, run));
  const moved = advance(trumpJourney, run, "A");
  assert.equal(serializeRun(run), before);
  assert.deepEqual(restoreRun(trumpJourney, serializeRun(moved)), moved);
  for (const raw of ["{", "null", "[]", "{}", "x".repeat(200_001)]) {
    assert.equal(restoreRun(trumpJourney, raw), null);
  }
  for (const changes of [
    { sceneId: "E_WAR" },
    { journeyId: "removed-route" },
    { stats: { ...moved.stats, safety: 101 } },
    { flags: { invented: true } },
    { history: [] },
  ]) {
    assert.equal(restoreRun(trumpJourney, JSON.stringify({ ...moved, ...changes })), null);
  }
});
