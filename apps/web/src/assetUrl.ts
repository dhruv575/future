/** Public R2 folder shared by the game and its art archive. */
export const assetBaseUrl = "https://assets.droov.info/us-china-war-games/v1";

export function assetUrl(path: string): string {
  return `${assetBaseUrl}/${path.replace(/^\/+/, "")}?v=2`;
}
