import type { CapsuleComposerState } from "./state";

export const validateComposerState = (state: CapsuleComposerState) => {
  const issues: string[] = [];

  if (state.title.trim().length < 3) {
    issues.push("Title must be at least 3 characters long.");
  }

  if (!state.unlockDate) {
    issues.push("Unlock date is required.");
  }

  if (state.recipientEmail && !state.recipientEmail.includes("@")) {
    issues.push("Recipient email must be valid.");
  }

  return issues;
};
