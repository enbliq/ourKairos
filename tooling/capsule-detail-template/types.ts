export type DetailCapsuleStatus = "draft" | "sealed" | "unlocked";

export interface CapsuleDetailView {
  id: string;
  title: string;
  message?: string;
  unlockDate: string;
  status: DetailCapsuleStatus;
  recipientSummary?: string;
  shareLink?: string;
}
