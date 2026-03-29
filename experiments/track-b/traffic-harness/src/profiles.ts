import type { PayloadProfile, TrafficPayload } from "./types.js";

type Randomizer = () => number;
const ANCHOR_TS = Date.UTC(2030, 0, 1, 0, 0, 0, 0);

const mulberry32 = (seed: number): Randomizer => {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const pick = <T>(items: readonly T[], rand: Randomizer): T =>
  items[Math.floor(rand() * items.length)] as T;

const titleWords = [
  "Future",
  "Reflection",
  "Milestone",
  "Journey",
  "Kairos",
  "Signal",
  "Memory",
  "Focus",
] as const;

const messageFragments = [
  "Capture the moment before it fades.",
  "This is a checkpoint for future review.",
  "Review this after the next iteration.",
  "A memo for future execution planning.",
  "Keep this sealed until launch prep.",
] as const;

const buildCreatePayload = (
  requestId: number,
  rand: Randomizer,
): TrafficPayload => {
  const daysAhead = 2 + Math.floor(rand() * 365);
  const unlockDate = new Date(ANCHOR_TS + daysAhead * 24 * 60 * 60 * 1000);

  return {
    title: `${pick(titleWords, rand)} ${pick(titleWords, rand)} #${requestId}`,
    message: `${pick(messageFragments, rand)} [req=${requestId}]`,
    unlockDate: unlockDate.toISOString(),
  };
};

const buildUpdatePayload = (
  requestId: number,
  rand: Randomizer,
): TrafficPayload => {
  const payload: TrafficPayload = {};

  if (rand() > 0.35) {
    payload.title = `${pick(titleWords, rand)} Update #${requestId}`;
  }
  if (rand() > 0.25) {
    payload.message = `${pick(messageFragments, rand)} [update=${requestId}]`;
  }
  if (rand() > 0.55) {
    const daysAhead = 2 + Math.floor(rand() * 180);
    payload.unlockDate = new Date(
      ANCHOR_TS + daysAhead * 24 * 60 * 60 * 1000,
    ).toISOString();
  }

  if (Object.keys(payload).length === 0) {
    payload.message = `No-op update fallback [update=${requestId}]`;
  }

  return payload;
};

export const createPayloadFactory = (
  profile: PayloadProfile,
  seed: number,
): ((requestId: number) => TrafficPayload) => {
  const random = mulberry32(seed);

  return (requestId: number): TrafficPayload => {
    if (profile === "update-capsule") {
      return buildUpdatePayload(requestId, random);
    }
    return buildCreatePayload(requestId, random);
  };
};
