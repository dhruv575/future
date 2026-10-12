import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const api = join(root, "apps", "api");
const suffix = process.platform === "win32" ? ".exe" : "";
const localGo = join(root, ".tools", "go", "bin", `go${suffix}`);
const go = existsSync(localGo) ? localGo : "go";
const gofmt = existsSync(localGo) ? join(dirname(localGo), `gofmt${suffix}`) : "gofmt";
const binary = join(api, "dist", `api${suffix}`);

if (existsSync(join(root, ".env"))) process.loadEnvFile(join(root, ".env"));
if (existsSync(localGo)) process.env.GOROOT = join(root, ".tools", "go");

function run(command, args, capture = false) {
  const result = spawnSync(command, args, {
    cwd: api,
    stdio: capture ? ["ignore", "pipe", "inherit"] : "inherit",
    encoding: "utf8",
  });
  if (result.error) {
    console.error(`Cannot run ${command}: ${result.error.message}`);
    console.error("Install Go, or run pnpm setup:go:windows on Windows x64.");
    process.exit(1);
  }
  if (result.status !== 0) process.exit(result.status ?? 1);
  return result.stdout?.trim() ?? "";
}

function goFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return entry.name === "dist" ? [] : goFiles(path);
    return entry.name.endsWith(".go") ? [path] : [];
  });
}

function build() {
  mkdirSync(dirname(binary), { recursive: true });
  run(go, ["build", "-trimpath", "-o", binary, "./cmd/api"]);
}

switch (process.argv[2]) {
  case "build":
    build();
    break;
  case "test":
    run(go, ["test", "./..."]);
    break;
  case "lint": {
    const unformatted = run(gofmt, ["-l", ...goFiles(api)], true);
    if (unformatted) {
      console.error(`Run pnpm format to format these Go files:\n${unformatted}`);
      process.exit(1);
    }
    run(go, ["vet", "./..."]);
    break;
  }
  case "format":
    run(gofmt, ["-w", ...goFiles(api)]);
    break;
  case "dev":
  case "start": {
    if (process.argv[2] === "dev") build();
    const child = spawn(binary, [], { cwd: api, stdio: "inherit" });
    child.on("error", (error) => {
      console.error(`Cannot start the API: ${error.message}. Run pnpm build first.`);
      process.exitCode = 1;
    });
    process.on("SIGINT", () => child.kill("SIGINT"));
    process.on("SIGTERM", () => child.kill("SIGTERM"));
    child.on("exit", (code, signal) => {
      process.exitCode = code ?? (signal === "SIGINT" || signal === "SIGTERM" ? 0 : 1);
    });
    break;
  }
  default:
    console.error("Usage: node scripts/go.mjs build|dev|start|test|lint|format");
    process.exitCode = 1;
}
