import type {
  CapsuleEvent,
  CapsuleEventType,
  CapsuleState,
  CapsuleStatus,
  ReplayBounds,
  ReplayFilters,
} from "../types";

const toMs = (value: string): number => new Date(value).getTime();

const eventTypePriority: Record<CapsuleEventType, number> = {
  DRAFT_CREATED: 0,
  SEALED: 1,
  UNLOCKED: 2,
};

export const sortEvents = (events: CapsuleEvent[]): CapsuleEvent[] =>
  [...events].sort((left, right) => {
    const leftMs = toMs(left.occurredAt);
    const rightMs = toMs(right.occurredAt);

    if (leftMs !== rightMs) return leftMs - rightMs;

    const leftPriority = eventTypePriority[left.type];
    const rightPriority = eventTypePriority[right.type];
    if (leftPriority !== rightPriority) return leftPriority - rightPriority;

    return left.id.localeCompare(right.id);
  });

export const getReplayBounds = (events: CapsuleEvent[]): ReplayBounds => {
  const sorted = sortEvents(events);
  if (sorted.length === 0) {
    const now = Date.now();
    return { startMs: now, endMs: now };
  }

  return {
    startMs: toMs(sorted[0].occurredAt),
    endMs: toMs(sorted[sorted.length - 1].occurredAt),
  };
};

export const mapEventTypeToStatus = (eventType: CapsuleEventType): CapsuleStatus => {
  if (eventType === "DRAFT_CREATED") return "DRAFT";
  if (eventType === "SEALED") return "SEALED";
  return "UNLOCKED";
};

export const buildCapsuleStates = (
  events: CapsuleEvent[],
  atMs: number,
): CapsuleState[] => {
  const stateByCapsule = new Map<string, CapsuleState>();

  for (const event of sortEvents(events)) {
    if (toMs(event.occurredAt) > atMs) break;

    const prior = stateByCapsule.get(event.capsuleId);
    stateByCapsule.set(event.capsuleId, {
      capsuleId: event.capsuleId,
      ownerId: event.ownerId,
      title: event.title,
      status: mapEventTypeToStatus(event.type),
      lastEventAt: event.occurredAt,
      eventCount: (prior?.eventCount ?? 0) + 1,
    });
  }

  return [...stateByCapsule.values()].sort((left, right) =>
    left.title.localeCompare(right.title),
  );
};

export const getOwnerOptions = (events: CapsuleEvent[]): string[] => {
  const ownerSet = new Set(events.map((event) => event.ownerId));
  return [...ownerSet].sort();
};

export const filterCapsuleStates = (
  states: CapsuleState[],
  filters: ReplayFilters,
): CapsuleState[] =>
  states.filter((state) => {
    const ownerMatch =
      filters.ownerId === "ALL" || state.ownerId === filters.ownerId;
    const statusMatch =
      filters.status === "ALL" || state.status === filters.status;

    return ownerMatch && statusMatch;
  });

export const filterMarkerEvents = (
  events: CapsuleEvent[],
  ownerId: ReplayFilters["ownerId"],
): CapsuleEvent[] =>
  sortEvents(events).filter(
    (event) => ownerId === "ALL" || event.ownerId === ownerId,
  );
