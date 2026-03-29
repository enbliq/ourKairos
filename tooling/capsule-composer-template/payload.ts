import type { CapsuleComposerState } from "./state";

export const buildComposerPayload = (state: CapsuleComposerState) => ({
  title: state.title.trim(),
  message: state.message.trim() || undefined,
  unlockDate: state.unlockDate,
  recipient: state.recipientEmail
    ? {
        email: state.recipientEmail.trim(),
        deliveryChannel: "email"
      }
    : {
        deliveryChannel: "link"
      }
});
