# AI Futures

Play at [futures.droov.info](https://futures.droov.info/).

A research-based, fictional game. Donald Trump and Dario Amodei are playable. Eight other character cards are locked.

The game is a standalone React app. Story state and saves stay in the browser. Images load from `assets.droov.info`. No API, database, or runtime secrets are required.

## Development

Use Node.js 24 and pnpm 10.33.0. Exact versions are in `.node-version` and `package.json`.

```sh
pnpm install
pnpm --filter @war-games/web dev
```

Open <http://127.0.0.1:5173>. Click a character, then start their journey. Click dialogue or press Space to continue. Number keys select decisions. Escape opens the menu.

Each character has a separate browser save. Saves do not transfer between devices or site domains. Restart replaces only the current character's save.

## Cloudflare Pages

The `ai-futures` Cloudflare Pages project builds this app from the `main` branch of [dhruv575/future](https://github.com/dhruv575/future).

```sh
pnpm build:pages
pnpm preview:pages
```

The preview command builds and serves the output through Wrangler locally. No Go installation is needed for these commands. The output is `apps/web/dist/`.

Push reviewed changes to `main` to deploy. Do not use direct uploads.

Pages settings: repository root, build command `pnpm build:pages`, output directory `apps/web/dist`. Build environment: `NODE_VERSION=24.19.0` and `PNPM_VERSION=10.33.0`. No runtime secrets are required.

The build includes `_headers` and `_redirects` from `apps/web/pages/`. The old `/sprites` address redirects to the game. Pages serves other unmatched navigation paths through its default single-page-app fallback. No Worker or R2 binding is required: the browser reads public image URLs directly.

References: [Pages build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/), [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/), [Pages routing](https://developers.cloudflare.com/pages/configuration/serving-pages/).

## Checks and assets

| Command | Action |
| --- | --- |
| `pnpm --filter @war-games/web test` | Check story branches and save integrity. |
| `pnpm build:pages` | Type-check and build the standalone game. |
| `pnpm assets:download` | Download and verify art for local tests. |
| `pnpm assets:upload` | Upload source art to R2. |
| `pnpm check` | Check the entire workspace, including Go. |

Run `pnpm assets:download` before running tests in a new checkout. Local art remains in `apps/web/public/` for editing and tests. It is not copied into the deployment. See [asset hosting](docs/asset-hosting.md) for uploads and cache versions.

## Workspace

- `apps/web/`: React, TypeScript, Vite, and Tailwind frontend.
- `apps/api/`: Optional Go API scaffold. The game does not use it.
- `packages/`: Shared TypeScript settings and an API client for future work.
- `wiki/`: Research, character profiles, and scenario assumptions.
- `docs/narrative/`: Story scripts and branch maps.
- `assets/`: Art prompts and generation records.

Turborepo manages workspace tasks. `pnpm dev` starts both the frontend and optional Go API. Go tasks need Go 1.27.2; Windows users can run `pnpm setup:go:windows` to install the local toolchain.

Start with the [research wiki](wiki/README.md) or [game design](docs/game-design.md). Dialogue and future events are fiction. Research notes in the game explain sources and their limits.

## Public repository

The repository excludes credentials, local tools, browser captures, raw source downloads, generation records, and image binaries. Research summaries and source links remain tracked. Art is fetched from R2 with SHA-256 checks using `assets/runtime-manifest.json`.
