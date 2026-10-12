export interface HealthResponse {
  status: "ok";
  service: "war-games-api";
}

export async function getHealth(signal?: AbortSignal): Promise<HealthResponse> {
  const response = await fetch("/api/health", { signal });
  if (!response.ok) throw new Error(`API request failed (${response.status}).`);

  const body: unknown = await response.json();
  if (
    typeof body !== "object" ||
    body === null ||
    !("status" in body) ||
    body.status !== "ok" ||
    !("service" in body) ||
    body.service !== "war-games-api"
  ) {
    throw new Error("The API returned an invalid health response.");
  }
  return { status: body.status, service: body.service };
}
