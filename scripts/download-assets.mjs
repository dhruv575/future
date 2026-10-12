import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const manifest = JSON.parse(
  await readFile(new URL("../assets/runtime-manifest.json", import.meta.url)),
);
const root = fileURLToPath(new URL("../apps/web/public/", import.meta.url));
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
let next = 0;
let downloaded = 0;
await Promise.all(
  Array.from({ length: 6 }, async () => {
    while (next < manifest.assets.length) {
      const asset = manifest.assets[next++];
      const target = resolve(root, asset.path);
      if (!target.startsWith(root.endsWith(sep) ? root : `${root}${sep}`)) {
        throw new Error(`Invalid asset path: ${asset.path}`);
      }
      const existing = await readFile(target).catch(() => null);
      if (existing && hash(existing) === asset.sha256) continue;
      const response = await fetch(`${manifest.baseUrl}/${asset.path}?v=2`);
      if (!response.ok)
        throw new Error(`Asset download failed: ${asset.path} (${response.status})`);
      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length !== asset.bytes || hash(bytes) !== asset.sha256) {
        throw new Error(`Asset checksum mismatch: ${asset.path}`);
      }
      await mkdir(dirname(target), { recursive: true });
      await writeFile(target, bytes);
      downloaded++;
    }
  }),
);
console.log(`Verified ${manifest.assets.length} assets; downloaded ${downloaded}.`);
