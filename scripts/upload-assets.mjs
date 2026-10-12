import { spawn } from "node:child_process";
import { readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const publicRoot = new URL("apps/web/public/", root);
const cli = fileURLToPath(new URL("node_modules/wrangler/bin/wrangler.js", root));
const bucket = "dhruv-project-assets";
const prefix = "us-china-war-games/v1";
const files = (await readdir(publicRoot, { recursive: true, withFileTypes: true }))
  .filter((entry) => entry.isFile())
  .map((entry) => `${entry.parentPath}/${entry.name}`);
let completed = 0;

async function upload(file) {
  const relative = file.slice(fileURLToPath(publicRoot).replaceAll("\\", "/").length);
  const args = [
    cli,
    "r2",
    "object",
    "put",
    `${bucket}/${prefix}/${relative}`,
    "--remote",
    "--file",
    file,
    "--content-type",
    file.endsWith(".png") ? "image/png" : "application/json",
    "--cache-control",
    "public, max-age=3600",
    "--force",
  ];
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await new Promise((resolve, reject) => {
        const child = spawn(process.execPath, args, {
          cwd: fileURLToPath(root),
          windowsHide: true,
        });
        let output = "";
        child.stdout.on("data", (data) => {
          output += data;
        });
        child.stderr.on("data", (data) => {
          output += data;
        });
        child.on("error", reject);
        child.on("close", (code) => (code === 0 ? resolve() : reject(new Error(output))));
      });
      completed++;
      if (completed % 10 === 0 || completed === files.length)
        console.log(`Uploaded ${completed}/${files.length}`);
      return;
    } catch (error) {
      if (attempt === 3) throw error;
    }
  }
}

let next = 0;
await Promise.all(
  Array.from({ length: 6 }, async () => {
    while (next < files.length) {
      const file = files[next++].replaceAll("\\", "/");
      await upload(file);
    }
  }),
);
console.log(`Assets available at https://assets.droov.info/${prefix}/`);
