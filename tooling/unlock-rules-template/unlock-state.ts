import type { UnlockableCapsule } from "./unlock.types";

export const isUnlocked = (capsule: UnlockableCapsule, now = new Date()) =>
  capsule.status === "unlocked" ||
  (capsule.status === "sealed" && new Date(capsule.unlockDate).getTime() <= now.getTime());

export const getCountdownSeconds = (capsule: UnlockableCapsule, now = new Date()) =>
  Math.max(0, Math.floor((new Date(capsule.unlockDate).getTime() - now.getTime()) / 1000));
