import { type ReactNode, useEffect, useId, useRef, useState } from "react";
import { assetUrl } from "../assetUrl.ts";
import catalog from "../data/sprites.json";
import { EventStage } from "./EventStage.tsx";
import { advance, createRun, getChoiceLock, getScene } from "./engine.ts";
import { journeyByCharacter, journeyById } from "./journeys.ts";
import { characterById, characters } from "./roster.ts";
import { readSavedGames, writeCheckpoint } from "./saves.ts";
import { speakerById } from "./speakers.ts";
import { trumpJourney } from "./trumpJourney.ts";
import type { Character, Evidence } from "./types.ts";
import "./game.css";

type Run = ReturnType<typeof createRun>;
type Panel = "menu" | "guide" | "evidence" | "restart" | null;
const spriteById = Object.fromEntries(catalog.items.map((item) => [item.id, item]));

function readCheckpoints(): ReturnType<typeof readSavedGames> {
  try {
    return readSavedGames(localStorage);
  } catch {
    return { checkpoints: {}, lastJourneyId: "" };
  }
}

function Icon({ name }: { name: "menu" | "close" | "lock" | "next" }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === "menu" && <path d="M5 7h14M5 12h14M5 17h14" />}
      {name === "close" && <path d="m6 6 12 12M6 18 18 6" />}
      {name === "lock" && (
        <>
          <rect x="6" y="10" width="12" height="10" rx="2" />
          <path d="M9 10V7a3 3 0 0 1 6 0v3" />
        </>
      )}
      {name === "next" && <path d="m9 5 7 7-7 7" />}
    </svg>
  );
}

function Modal({
  title,
  children,
  onClose,
  className = "",
  hideTitle = false,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  className?: string;
  hideTitle?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  useEffect(() => {
    const opener = document.activeElement;
    const dialog = ref.current;
    dialog?.showModal();
    return () => {
      dialog?.close();
      if (opener instanceof HTMLElement && opener.isConnected && opener !== document.body) {
        opener.focus({ preventScroll: true });
      } else {
        document
          .querySelector<HTMLButtonElement>(
            ".dialogue-box:not(:disabled), .event-stage, .game-menu-toggle",
          )
          ?.focus({ preventScroll: true });
      }
    };
  }, []);
  return (
    <dialog ref={ref} className={`game-modal ${className}`} aria-labelledby={id} onCancel={onClose}>
      <header className={`modal-heading ${hideTitle ? "modal-heading-compact" : ""}`}>
        <h2 id={id} className={hideTitle ? "sr-only" : undefined}>
          {title}
        </h2>
        <button type="button" className="icon-button" onClick={onClose} aria-label="Close dialog">
          <Icon name="close" />
        </button>
      </header>
      {children}
    </dialog>
  );
}

function Profile({
  character,
  hasSave,
  onClose,
  onPlay,
}: {
  character: Character;
  hasSave: boolean;
  onClose: () => void;
  onPlay: () => void;
}) {
  return (
    <Modal title={character.name} onClose={onClose} className="profile-modal" hideTitle>
      <div className="profile-layout">
        <div className="profile-portrait">
          <img src={assetUrl(character.sprite)} alt={character.name} />
        </div>
        <div className="profile-copy">
          <div className="affiliation">
            {character.affiliationIds.map((id) => (
              <span className="affiliation-logo" data-entity={id} key={id}>
                <img
                  src={spriteById[id]?.src ? assetUrl(spriteById[id].src) : undefined}
                  alt={spriteById[id]?.name ?? character.affiliation}
                />
              </span>
            ))}
            <span>{character.affiliation}</span>
          </div>
          <section>
            <h3>Starting state</h3>
            <ul>
              {character.currentState.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section>
            <h3>Goals</h3>
            <ul>
              {character.goals.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
        <footer className="profile-footer">
          <button
            type="button"
            className="primary-button"
            disabled={!character.available}
            onClick={onPlay}
          >
            {character.available
              ? `${hasSave ? "Continue" : "Play"} as ${character.name}`
              : "Coming soon"}
          </button>
          <p className="fine-print">A fictional scenario. Dialogue is invented.</p>
        </footer>
      </div>
    </Modal>
  );
}

function AffiliationMarks({ ids }: { ids: string[] }) {
  return (
    <span className="name-affiliations">
      {ids.map((id) => {
        const entity = spriteById[id];
        return entity ? (
          <span
            className={`name-logo ${entity.width > entity.height * 2 ? "is-wordmark" : ""}`}
            data-entity={id}
            key={id}
            title={entity.name}
          >
            <img src={assetUrl(entity.src)} alt={entity.name} draggable={false} />
          </span>
        ) : null;
      })}
    </span>
  );
}

function EvidenceList({ evidence }: { evidence: Evidence[] }) {
  return (
    <div className="panel-content evidence-list">
      <p>Sources inform the setting. Events, dialogue, and scores are game design.</p>
      {evidence.length ? (
        evidence.map((item) => (
          <article key={item.id}>
            <h3>
              <a href={item.url} target="_blank" rel="noreferrer">
                {item.title} ↗
              </a>
            </h3>
            <p>{item.context}</p>
            <p className="fine-print">{item.limit}</p>
          </article>
        ))
      ) : (
        <p>This scene adds no research claim.</p>
      )}
    </div>
  );
}

export function GameApp() {
  const [initial] = useState(readCheckpoints);
  const [saves, setSaves] = useState(initial.checkpoints);
  const [run, setRun] = useState<Run | null>(
    initial.checkpoints[initial.lastJourneyId]?.run ?? null,
  );
  const [playing, setPlaying] = useState(false);
  const [selected, setSelected] = useState<Character | null>(null);
  const [panel, setPanel] = useState<Panel>(null);
  const [lineIndex, setLineIndex] = useState(
    initial.checkpoints[initial.lastJourneyId]?.lineIndex ?? 0,
  );
  const [saveFailed, setSaveFailed] = useState(false);
  const [error, setError] = useState("");
  const dialogueRef = useRef<HTMLButtonElement>(null);
  const choicesRef = useRef<HTMLElement>(null);
  const portraitRequests = useRef(new Set<string>());
  const journey = (run ? journeyById[run.journeyId] : undefined) ?? trumpJourney;
  const playerName = characterById[journey.characterId]?.name ?? journey.title;
  const selectedJourney = selected ? journeyByCharacter[selected.id] : undefined;
  const currentRun = run?.journeyId === journey.id ? run : null;
  const scene = currentRun ? getScene(journey, currentRun) : null;
  const sceneId = scene?.id;
  const line = scene?.lines[lineIndex];
  const stageCast = line?.cast ?? scene?.cast ?? [];
  const lastLine = !scene || lineIndex >= scene.lines.length - 1;
  const choosing = Boolean(playing && lastLine && scene?.choices?.length);
  const ended = Boolean(playing && lastLine && scene?.kind === "ending");
  const speaker =
    line && line.speaker !== "narrator"
      ? (speakerById[line.speaker]?.name ?? spriteById[line.speaker]?.name ?? line.speaker)
      : null;
  const speakerCharacter = line ? speakerById[line.speaker] : undefined;

  useEffect(() => {
    if (!playing || !scene) return;
    // Group conversations cut between portraits. Load this scene's cast up front.
    const cast = new Set([...scene.cast, ...scene.lines.flatMap((beat) => beat.cast ?? [])]);
    for (const id of cast) {
      const src = speakerById[id]?.sprite;
      if (!src || portraitRequests.current.has(src)) continue;
      portraitRequests.current.add(src);
      const portrait = new Image();
      portrait.src = src;
      portrait.onerror = () => portraitRequests.current.delete(src);
    }
  }, [playing, scene]);

  useEffect(() => {
    // A story revision can replace a route during development. Do not write an old
    // run into another character's checkpoint while the module reloads.
    if (run && run.journeyId !== journey.id) {
      setRun(null);
      setPlaying(false);
      setLineIndex(0);
      return;
    }
    if (!run) return;
    setSaves((previous) => ({ ...previous, [run.journeyId]: { run, lineIndex } }));
    try {
      writeCheckpoint(localStorage, journey, { run, lineIndex });
      setSaveFailed(false);
    } catch {
      setSaveFailed(true);
    }
  }, [run, lineIndex, journey]);

  useEffect(() => {
    if (!playing || !sceneId) return;
    if (choosing || ended)
      choicesRef.current
        ?.querySelector<HTMLButtonElement>("button:not(:disabled)")
        ?.focus({ preventScroll: true });
    else dialogueRef.current?.focus({ preventScroll: true });
  }, [playing, sceneId, choosing, ended]);

  function start(characterId?: string) {
    const target = characterId ? journeyByCharacter[characterId] : journey;
    if (!target) return;
    const saved = saves[target.id];
    setRun(saved?.run ?? createRun(target));
    setLineIndex(saved?.lineIndex ?? 0);
    setSelected(null);
    setPanel(null);
    setPlaying(true);
    setError("");
  }

  function move(choiceId?: string) {
    if (!run || !scene) return;
    if (!lastLine && !choiceId) {
      setLineIndex((index) => index + 1);
      return;
    }
    if (!choiceId && (choosing || ended)) return;
    try {
      setRun(advance(journey, run, choiceId));
      setLineIndex(0);
      setError("");
    } catch {
      setError("That choice is not available.");
    }
  }

  function restart() {
    setRun(createRun(journey));
    setLineIndex(0);
    setPanel(null);
    setPlaying(true);
    setError("");
  }

  function showRoster() {
    setPanel(null);
    setPlaying(false);
  }

  useEffect(() => {
    if (selected || panel) return;
    function onKey(event: KeyboardEvent) {
      if (event.repeat || event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.key === "Escape") {
        event.preventDefault();
        setPanel("menu");
        return;
      }
      if (!playing || !scene) return;
      const target = event.target as HTMLElement;
      if (target.closest("input, textarea, select, dialog")) return;
      const choice = scene.choices?.[Number(event.key) - 1];
      if (choosing && choice && run && !getChoiceLock(choice, run)) {
        event.preventDefault();
        move(choice.id);
        return;
      }
      if (target.closest("button, a")) return;
      if ((event.key === " " || event.key === "Enter") && !choosing && !ended) {
        event.preventDefault();
        move();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <main
      className={`war-game ${playing ? "is-playing" : "is-selecting"} ${playing && scene?.background.startsWith("ending-") ? "has-ending-art" : ""}`}
    >
      <img
        className="world-background"
        src={assetUrl(
          `/scenes/${playing && scene ? (line?.background ?? scene.background) : "office"}.png`,
        )}
        alt=""
      />
      <button
        type="button"
        className="game-menu-toggle icon-button"
        onClick={() => setPanel("menu")}
        aria-label="Open menu"
      >
        <Icon name="menu" />
      </button>

      {!playing ? (
        <section className="character-select" aria-labelledby="choose-title">
          <h1 id="choose-title">Choose your character</h1>
          <div className="character-grid">
            {characters.map((character) => (
              <button
                type="button"
                key={character.id}
                className={`character-card ${character.available ? "is-playable" : ""}`}
                onClick={() => setSelected(character)}
                aria-label={`View ${character.name}'s profile`}
              >
                <img src={assetUrl(character.sprite)} alt="" draggable={false} />
                {!character.available && (
                  <span className="character-lock" aria-hidden="true">
                    <Icon name="lock" />
                  </span>
                )}
                <span className="character-name">
                  <span>{character.name}</span>
                  <AffiliationMarks ids={character.affiliationIds} />
                </span>
              </button>
            ))}
          </div>
        </section>
      ) : scene && run ? (
        <section
          className={`journey ${choosing ? "is-choosing" : ""} ${scene.event ? `has-event event-${scene.event.format}` : ""}`}
          aria-label={`${playerName}'s journey`}
        >
          <h1 className="sr-only">{scene.title}</h1>
          {scene.event ? (
            <EventStage
              scene={scene}
              line={line}
              lineIndex={lineIndex}
              nextScene={scene.next ? journey.scenes[scene.next] : undefined}
              buttonRef={dialogueRef}
              onContinue={() => move()}
            />
          ) : (
            <>
              <div className={`scene-cast cast-${stageCast.length}`}>
                {stageCast.map((id, index) => {
                  const actor = speakerById[id];
                  if (!actor) return null;
                  if (!actor.sprite) return null;
                  const speaking = line?.speaker === id || line?.speaker === actor.name;
                  const onRight = index > (stageCast.length - 1) / 2;
                  return (
                    <div
                      className={`scene-actor ${onRight ? "is-right" : ""} ${speaking ? "is-speaking" : ""} ${speaker && !speaking ? "is-listening" : ""}`}
                      key={id}
                    >
                      <img src={assetUrl(actor.sprite)} alt={actor.name} draggable={false} />
                    </div>
                  );
                })}
              </div>
              <div className="conversation">
                {choosing && (
                  <section className="choice-stack" ref={choicesRef} aria-label="Choose a response">
                    {scene.choices?.map((choice) => {
                      const lock = getChoiceLock(choice, run);
                      return (
                        <button
                          type="button"
                          className="decision-choice"
                          key={choice.id}
                          disabled={Boolean(lock)}
                          title={lock ?? choice.detail}
                          onClick={() => move(choice.id)}
                        >
                          <span>{choice.label}</span>
                          {lock && (
                            <>
                              <Icon name="lock" />
                              <small>{lock}</small>
                            </>
                          )}
                        </button>
                      );
                    })}
                  </section>
                )}
                {ended && (
                  <section className="ending-card" aria-label="Journey complete" ref={choicesRef}>
                    <h2>{scene.ending?.label}</h2>
                    <p>{scene.ending?.summary}</p>
                    <div>
                      <button
                        type="button"
                        className="primary-button"
                        onClick={() => setPanel("restart")}
                      >
                        Play again
                      </button>
                      <button type="button" className="secondary-button" onClick={showRoster}>
                        Characters
                      </button>
                    </div>
                  </section>
                )}
                <button
                  type="button"
                  className={`dialogue-box ${speaker ? "" : "narration"}`}
                  ref={dialogueRef}
                  onClick={() => move()}
                  disabled={choosing || ended}
                  aria-label={choosing || ended ? "Scene dialogue" : "Continue dialogue"}
                  aria-describedby="dialogue-line"
                >
                  {speaker && (
                    <span className="speaker-name">
                      <span>{speaker}</span>
                      <AffiliationMarks ids={speakerCharacter?.affiliationIds ?? []} />
                    </span>
                  )}
                  <span
                    className="dialogue-text"
                    id="dialogue-line"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {line?.text ?? scene.ending?.summary}
                  </span>
                  {!choosing && !ended && (
                    <span className="dialogue-next">
                      <Icon name="next" />
                    </span>
                  )}
                </button>
              </div>
            </>
          )}
        </section>
      ) : null}

      {(error || saveFailed) && (
        <p className="game-notice" role="alert">
          {error || "Progress could not be saved. Keep this tab open."}
        </p>
      )}
      {selected && (
        <Profile
          character={selected}
          hasSave={Boolean(selectedJourney && saves[selectedJourney.id])}
          onClose={() => setSelected(null)}
          onPlay={() => start(selected.id)}
        />
      )}
      {panel === "menu" && (
        <Modal title="Menu" className="pause-menu" onClose={() => setPanel(null)}>
          <nav className="menu-options" aria-label="Game menu">
            {(playing || run) && (
              <button type="button" onClick={playing ? () => setPanel(null) : () => start()}>
                {playing ? "Resume" : `Continue ${playerName}'s journey`}
              </button>
            )}
            {playing && (
              <button type="button" onClick={showRoster}>
                Characters
              </button>
            )}
            {playing && (
              <button type="button" onClick={() => setPanel("evidence")}>
                Research notes
              </button>
            )}
            <button type="button" onClick={() => setPanel("guide")}>
              How to play
            </button>
            {run && (
              <button type="button" onClick={() => setPanel("restart")}>
                Restart
              </button>
            )}
          </nav>
        </Modal>
      )}
      {panel === "guide" && (
        <Modal title="How to play" onClose={() => setPanel(null)}>
          <div className="panel-content guide-content">
            <p>
              Click the dialogue box, or press Space, to continue. Select a response when choices
              appear. Number keys also select choices.
            </p>
            <p>
              Your choices change the story and can open or close later options. Progress saves in
              this browser.
            </p>
            <p>Press Escape to open the menu. Research notes are there.</p>
            <hr />
            <p>
              This is a fictional scenario. Dialogue is invented. Research informs the setting;
              scores and endings are game rules, not forecasts.
            </p>
            <p>
              Donald Trump and Dario Amodei are playable. Eight more journeys are in development.
            </p>
            {run && journey.assumptions?.map((assumption) => <p key={assumption}>{assumption}</p>)}
          </div>
        </Modal>
      )}
      {panel === "evidence" && scene && (
        <Modal title="Research notes" onClose={() => setPanel(null)}>
          <EvidenceList evidence={scene.evidence} />
        </Modal>
      )}
      {panel === "restart" && (
        <Modal title="Start again?" onClose={() => setPanel(null)}>
          <div className="panel-content">
            <p>This replaces {playerName}'s saved journey.</p>
            <div className="modal-actions">
              <button type="button" className="secondary-button" onClick={() => setPanel(null)}>
                Cancel
              </button>
              <button type="button" className="primary-button" onClick={restart}>
                Start again
              </button>
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
}
