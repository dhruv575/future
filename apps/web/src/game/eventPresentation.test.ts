import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { darioJourney } from "./darioJourney.ts";
import { eventArtwork, eventSurface, formatEventDate } from "./eventPresentation.ts";

test("events support exact dates and authored periods without a render failure", () => {
  assert.equal(formatEventDate("2026-10-12"), "12 October 2026");
  for (const date of ["October 2026", "Winter 2026–27", "2028", "2026-99-99"]) {
    assert.equal(formatEventDate(date), date);
  }
});

test("intermediate scenes use the appropriate physical surface and all artwork exists", () => {
  const expected = {
    A_D1_REVIEW: "arrival",
    D1_OUTSIDE: "terminal",
    D2_FRONTIER: "paper",
    D2_CLOSE: "paper",
    D5_STATE_STRIKE: "dispatch",
    O_PEACE_4: "broadcast",
    O_NUCLEAR_5: "cinematic",
  };
  for (const [id, surface] of Object.entries(expected)) {
    const scene = darioJourney.scenes[id];
    assert.ok(scene, id);
    assert.equal(eventSurface(scene), surface);
  }
  for (const src of Object.values(eventArtwork)) {
    assert.ok(existsSync(new URL(`../../public${src}`, import.meta.url)));
  }
});
