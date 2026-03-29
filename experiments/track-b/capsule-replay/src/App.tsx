import { useEffect, useMemo, useState } from "react";
import replayEvents from "./data/events.json";
import {
  buildCapsuleStates,
  filterCapsuleStates,
  filterMarkerEvents,
  getOwnerOptions,
  getReplayBounds,
  sortEvents,
} from "./lib/replay";
import type { CapsuleEvent, CapsuleStatus, ReplaySpeed } from "./types";

const SPEED_OPTIONS: ReplaySpeed[] = [1, 2, 4];
const STATUS_OPTIONS: Array<"ALL" | CapsuleStatus> = [
  "ALL",
  "DRAFT",
  "SEALED",
  "UNLOCKED",
];
const TICK_INTERVAL_MS = 120;
const STEP_PER_TICK_MS = 30 * 60 * 1000;

const formatDateTime = (timeMs: number): string =>
  new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(timeMs));

export function App() {
  const events = useMemo(
    () => sortEvents(replayEvents as CapsuleEvent[]),
    [],
  );
  const bounds = useMemo(() => getReplayBounds(events), [events]);
  const ownerOptions = useMemo(() => getOwnerOptions(events), [events]);

  const [currentMs, setCurrentMs] = useState(bounds.startMs);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<ReplaySpeed>(1);
  const [ownerId, setOwnerId] = useState<"ALL" | string>("ALL");
  const [status, setStatus] = useState<"ALL" | CapsuleStatus>("ALL");

  useEffect(() => {
    setCurrentMs(bounds.startMs);
    setIsPlaying(false);
  }, [bounds.startMs, bounds.endMs]);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = window.setInterval(() => {
      setCurrentMs((previousMs) => {
        const nextMs = Math.min(
          previousMs + STEP_PER_TICK_MS * speed,
          bounds.endMs,
        );

        if (nextMs >= bounds.endMs) {
          setIsPlaying(false);
        }
        return nextMs;
      });
    }, TICK_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [isPlaying, speed, bounds.endMs]);

  const allStates = useMemo(
    () => buildCapsuleStates(events, currentMs),
    [events, currentMs],
  );

  const filteredStates = useMemo(
    () => filterCapsuleStates(allStates, { ownerId, status }),
    [allStates, ownerId, status],
  );

  const visibleCapsuleIds = useMemo(
    () => new Set(filteredStates.map((state) => state.capsuleId)),
    [filteredStates],
  );

  const ownerFilteredEvents = useMemo(
    () => filterMarkerEvents(events, ownerId),
    [events, ownerId],
  );

  const timelineEvents = useMemo(
    () =>
      ownerFilteredEvents.filter(
        (event) => status === "ALL" || visibleCapsuleIds.has(event.capsuleId),
      ),
    [ownerFilteredEvents, status, visibleCapsuleIds],
  );

  const transitions = useMemo(
    () =>
      timelineEvents
        .filter((event) => new Date(event.occurredAt).getTime() <= currentMs)
        .slice(-8)
        .reverse(),
    [timelineEvents, currentMs],
  );

  const rangeMs = Math.max(1, bounds.endMs - bounds.startMs);

  const jumpToStart = () => {
    setCurrentMs(bounds.startMs);
    setIsPlaying(false);
  };

  return (
    <div className="page">
      <header className="hero">
        <h1>Capsule Event Replay Visualizer</h1>
        <p>
          Local JSON replay only. No API calls. Deterministic event ordering
          and playback.
        </p>
      </header>

      <section className="panel controls">
        <div className="control-group">
          <button type="button" onClick={() => setIsPlaying(true)}>
            Play
          </button>
          <button type="button" onClick={() => setIsPlaying(false)}>
            Pause
          </button>
          <button type="button" onClick={jumpToStart}>
            Reset
          </button>
        </div>

        <div className="control-group">
          {SPEED_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              className={speed === option ? "active" : ""}
              onClick={() => setSpeed(option)}
            >
              x{option}
            </button>
          ))}
        </div>

        <div className="control-group selects">
          <label>
            Owner
            <select
              value={ownerId}
              onChange={(event) => setOwnerId(event.target.value)}
            >
              <option value="ALL">All owners</option>
              {ownerOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label>
            Status
            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as "ALL" | CapsuleStatus)
              }
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="time-readout">
          <span>Current: {formatDateTime(currentMs)}</span>
          <span>Start: {formatDateTime(bounds.startMs)}</span>
          <span>End: {formatDateTime(bounds.endMs)}</span>
        </div>

        <input
          className="scrubber"
          type="range"
          min={bounds.startMs}
          max={bounds.endMs}
          step={15 * 60 * 1000}
          value={currentMs}
          onChange={(event) => {
            setCurrentMs(Number(event.target.value));
            setIsPlaying(false);
          }}
        />
      </section>

      <section className="panel timeline-panel">
        <div className="timeline-track" role="presentation">
          {timelineEvents.map((event) => {
            const eventMs = new Date(event.occurredAt).getTime();
            const leftPct = ((eventMs - bounds.startMs) / rangeMs) * 100;
            const isPast = eventMs <= currentMs;
            const isNow =
              Math.abs(eventMs - currentMs) < STEP_PER_TICK_MS * speed;

            return (
              <button
                key={event.id}
                type="button"
                className={`marker ${isPast ? "past" : "future"} ${
                  isNow ? "now" : ""
                }`}
                style={{ left: `${leftPct}%` }}
                title={`${event.title} • ${event.type} • ${formatDateTime(
                  eventMs,
                )}`}
                onClick={() => {
                  setCurrentMs(eventMs);
                  setIsPlaying(false);
                }}
              />
            );
          })}
        </div>
      </section>

      <section className="grid">
        <article className="panel">
          <h2>Capsule States ({filteredStates.length})</h2>
          {filteredStates.length === 0 ? (
            <p className="empty">No capsules match current filters.</p>
          ) : (
            <ul className="capsule-list">
              {filteredStates.map((state) => (
                <li key={state.capsuleId}>
                  <div>
                    <strong>{state.title}</strong>
                    <small>
                      {state.ownerId} • {state.eventCount} events
                    </small>
                  </div>
                  <div className={`status ${state.status.toLowerCase()}`}>
                    {state.status}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </article>

        <article className="panel">
          <h2>Recent Transitions</h2>
          {transitions.length === 0 ? (
            <p className="empty">No transitions occurred yet at this replay point.</p>
          ) : (
            <ul className="transition-list">
              {transitions.map((event) => (
                <li key={event.id}>
                  <strong>{event.type}</strong> {event.title}
                  <span>{formatDateTime(new Date(event.occurredAt).getTime())}</span>
                </li>
              ))}
            </ul>
          )}
        </article>
      </section>
    </div>
  );
}
