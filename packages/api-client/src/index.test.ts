import assert from "node:assert/strict";
import { test } from "node:test";
import { getHealth } from "./index.ts";

test("health request preserves the route and cancellation signal", async (t) => {
  const controller = new AbortController();
  const request = t.mock.method(globalThis, "fetch", async () =>
    Response.json({ status: "ok", service: "war-games-api" }),
  );
  assert.deepEqual(await getHealth(controller.signal), { status: "ok", service: "war-games-api" });
  assert.deepEqual(request.mock.calls[0]?.arguments, [
    "/api/health",
    { signal: controller.signal },
  ]);
});

test("HTTP errors do not appear as a healthy API", async (t) => {
  t.mock.method(globalThis, "fetch", async () => new Response("Unavailable", { status: 503 }));
  await assert.rejects(getHealth(), /503/);
});

test("unexpected payloads do not appear as a healthy API", async (t) => {
  for (const payload of [null, {}, { status: "down" }, { status: "ok", service: "other" }]) {
    const request = t.mock.method(globalThis, "fetch", async () => Response.json(payload));
    await assert.rejects(getHealth(), /invalid health response/);
    request.mock.restore();
  }
});

test("transport failure remains visible", async (t) => {
  t.mock.method(globalThis, "fetch", async () => {
    throw new TypeError("Connection failed");
  });
  await assert.rejects(getHealth(), /Connection failed/);
});
