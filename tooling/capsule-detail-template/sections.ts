import type { CapsuleDetailView } from "./types";

export const buildDetailSections = (capsule: CapsuleDetailView) => [
  {
    title: "Message",
    content: capsule.message || "No message added."
  },
  {
    title: "Unlock schedule",
    content: capsule.unlockDate
  },
  {
    title: "Recipient",
    content: capsule.recipientSummary || "Share link only"
  }
];
