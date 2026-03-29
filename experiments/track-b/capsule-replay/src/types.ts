export type CapsuleEventType = "DRAFT_CREATED" | "SEALED" | "UNLOCKED";
export type CapsuleStatus = "DRAFT" | "SEALED" | "UNLOCKED";
export type ReplaySpeed = 1 | 2 | 4;

export type CapsuleEvent = {
  id: string;
  capsuleId: string;
  ownerId: string;
  title: string;
  type: CapsuleEventType;
  occurredAt: string;
};

export type ReplayBounds = {
  startMs: number;
  endMs: number;
};

export type CapsuleState = {
  capsuleId: string;
  ownerId: string;
  title: string;
  status: CapsuleStatus;
  lastEventAt: string;
  eventCount: number;
};

export type ReplayFilters = {
  ownerId: "ALL" | string;
  status: "ALL" | CapsuleStatus;
};
