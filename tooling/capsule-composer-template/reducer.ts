import type { CapsuleComposerState } from "./state";

export type ComposerAction =
  | { type: "title"; value: string }
  | { type: "message"; value: string }
  | { type: "unlockDate"; value: string }
  | { type: "recipientEmail"; value: string };

export const reduceComposerState = (
  state: CapsuleComposerState,
  action: ComposerAction
): CapsuleComposerState => ({
  ...state,
  [action.type]: action.value
});
