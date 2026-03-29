export interface UnlockableCapsule {
  id: string;
  title: string;
  message?: string;
  unlockDate: string;
  status: "draft" | "sealed" | "unlocked";
}

export interface PublicCapsuleView {
  id: string;
  title: string;
  unlockDate: string;
  state: "locked" | "unlocked";
  message?: string;
  countdownSeconds?: number;
}
