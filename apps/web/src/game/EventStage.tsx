import type { RefObject } from "react";
import { assetUrl } from "../assetUrl.ts";
import { eventArtwork, eventSurface, formatEventDate } from "./eventPresentation.ts";
import { speakerById } from "./speakers.ts";
import type { Line, Scene } from "./types.ts";
import "./events.css";

export function EventStage({
  scene,
  line,
  lineIndex,
  nextScene,
  buttonRef,
  onContinue,
}: {
  scene: Scene;
  line: Line | undefined;
  lineIndex: number;
  nextScene?: Scene;
  buttonRef: RefObject<HTMLButtonElement | null>;
  onContinue: () => void;
}) {
  const event = scene.event;
  if (!event) return null;
  const surface = eventSurface(scene);
  const artwork = surface === "arrival" || surface === "cinematic" ? null : eventArtwork[surface];
  const cast = surface === "arrival" ? (nextScene?.lines[0]?.cast ?? nextScene?.cast ?? []) : [];
  const source = event.source.startsWith("Scenario")
    ? surface === "broadcast"
      ? "World news"
      : "Briefing for Dario"
    : event.source || (surface === "dispatch" ? "Situation update" : "");

  return (
    <button
      type="button"
      className={`event-stage surface-${surface}`}
      ref={buttonRef}
      onClick={onContinue}
      aria-label="Continue event"
      aria-describedby="event-passage"
    >
      {artwork && <img className="event-set" src={assetUrl(artwork)} alt="" draggable={false} />}
      {cast.length > 0 && (
        <span className={`scene-cast arrival-cast cast-${cast.length}`} aria-hidden="true">
          {cast.map((id, index) => {
            const actor = speakerById[id];
            return actor?.sprite ? (
              <span className={`scene-actor ${index > 0 ? "is-right" : ""}`} key={id}>
                <img src={assetUrl(actor.sprite)} alt="" draggable={false} />
              </span>
            ) : null;
          })}
        </span>
      )}
      <span className="event-reading-surface">
        <span className="event-dateline">
          <span>{source}</span>
          <span>{formatEventDate(scene.date)}</span>
        </span>
        {surface === "broadcast" && (
          <span className="broadcast-image">
            <img
              src={assetUrl(`/scenes/${line?.background ?? scene.background}.png`)}
              alt=""
              draggable={false}
            />
          </span>
        )}
        <span className="event-headline">{event.headline}</span>
        <span className="event-passage" id="event-passage" aria-live="polite" aria-atomic="true">
          {line?.text}
        </span>
        <span className="event-next" aria-hidden="true">
          {scene.lines.length > 1 && (
            <span>
              {lineIndex + 1} / {scene.lines.length}
            </span>
          )}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <path d="m9 5 7 7-7 7" />
          </svg>
        </span>
      </span>
    </button>
  );
}
