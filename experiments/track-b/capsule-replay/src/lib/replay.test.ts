import { describe, expect, it } from "vitest";
import type { CapsuleEvent } from "../types";
import { buildCapsuleStates, getReplayBounds, sortEvents } from "./replay";

const fixtureEvents: CapsuleEvent[] = [
  {
    id: "e-3",
    capsuleId: "cap-1",
    ownerId: "user-1",
    title: "A",
    type: "UNLOCKED",
    occurredAt: "2026-01-02T00:00:00.000Z",
  },
  {
    id: "e-1",
    capsuleId: "cap-1",
    ownerId: "user-1",
    title: "A",
    type: "DRAFT_CREATED",
    occurredAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "e-2",
    capsuleId: "cap-1",
    ownerId: "user-1",
    title: "A",
    type: "SEALED",
    occurredAt: "2026-01-01T12:00:00.000Z",
  },
];

describe("replay engine", () => {
  it("sorts events deterministically", () => {
    const sorted = sortEvents(fixtureEvents);
    expect(sorted.map((event) => event.id)).toEqual(["e-1", "e-2", "e-3"]);
  });

  it("returns stable replay bounds", () => {
    const bounds = getReplayBounds(fixtureEvents);
    expect(bounds.startMs).toBe(new Date("2026-01-01T00:00:00.000Z").getTime());
    expect(bounds.endMs).toBe(new Date("2026-01-02T00:00:00.000Z").getTime());
  });

  it("builds capsule state at a replay timestamp", () => {
    const stateAtSeal = buildCapsuleStates(
      fixtureEvents,
      new Date("2026-01-01T12:00:00.000Z").getTime(),
    );

    expect(stateAtSeal).toHaveLength(1);
    expect(stateAtSeal[0]?.status).toBe("SEALED");
    expect(stateAtSeal[0]?.eventCount).toBe(2);
  });
});
