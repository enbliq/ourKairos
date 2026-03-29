import { getCountdownSeconds, isUnlocked } from "./unlock-state";
import type { PublicCapsuleView, UnlockableCapsule } from "./unlock.types";

export const toPublicCapsuleView = (
  capsule: UnlockableCapsule,
  now = new Date()
): PublicCapsuleView => {
  if (isUnlocked(capsule, now)) {
    return {
      id: capsule.id,
      title: capsule.title,
      unlockDate: capsule.unlockDate,
      state: "unlocked",
      message: capsule.message
    };
  }

  return {
    id: capsule.id,
    title: capsule.title,
    unlockDate: capsule.unlockDate,
    state: "locked",
    countdownSeconds: getCountdownSeconds(capsule, now)
  };
};
