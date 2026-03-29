import type { CapsuleRecord } from "./capsule.types";

export const assertDraft = (capsule: CapsuleRecord) => {
  if (capsule.status !== "draft") {
    throw new Error("Only draft capsules can be modified");
  }
};

export const canUnlock = (capsule: CapsuleRecord, now = new Date()) =>
  capsule.status === "sealed" && new Date(capsule.unlockDate).getTime() <= now.getTime();
