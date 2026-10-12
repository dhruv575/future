# Game asset hosting

Runtime assets use Cloudflare R2.

- Bucket: `dhruv-project-assets`
- Custom domain: `assets.droov.info`
- Folder: `us-china-war-games/v1/`
- URL helper: `apps/web/src/assetUrl.ts`
- Source files: `apps/web/public/scenes/` and `apps/web/public/sprites/`

The game loads images from the custom domain. Vite copies only Pages controls from `apps/web/pages/` into production builds. Keep the local files for editing and asset checks.

Run `pnpm assets:upload` after changing source art. This uses the current Wrangler login, uploads six files at a time, and retries failed uploads. It uploads the contents of `apps/web/public/` and preserves folder paths. It does not delete remote objects. Uploads replace matching object keys. Responses have a one-hour public cache lifetime.

URLs include a release query (`?v=2`) to separate them from requests made during initial uploads. For a new asset release with immediate cache separation, change the folder in both the upload script and URL helper, then upload before publishing the app.

The bucket contains public game art only. Do not put private research, credentials, or user data in the public source folder.
