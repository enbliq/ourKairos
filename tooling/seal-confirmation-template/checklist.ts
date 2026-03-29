export interface SealReviewInput {
  title?: string;
  unlockDate?: string;
  recipientConfigured: boolean;
}

export const buildSealChecklist = (input: SealReviewInput) => [
  {
    key: "title",
    complete: Boolean(input.title && input.title.trim().length >= 3),
    label: "Title is set"
  },
  {
    key: "unlockDate",
    complete: Boolean(input.unlockDate),
    label: "Unlock date is scheduled"
  },
  {
    key: "recipient",
    complete: input.recipientConfigured,
    label: "Recipient or share-link flow is configured"
  }
];
