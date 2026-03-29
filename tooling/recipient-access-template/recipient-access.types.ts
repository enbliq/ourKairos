export interface RecipientAccessRecord {
  capsuleId: string;
  token: string;
  recipientName?: string;
  recipientEmail?: string;
}

export interface PublicCapsulePayload {
  id: string;
  title: string;
  unlockDate: string;
  status: "locked" | "unlocked";
  message?: string;
}
