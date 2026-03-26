export interface CapsuleComposerState {
  title: string;
  message: string;
  unlockDate: string;
  recipientEmail: string;
}

export const createInitialComposerState = (): CapsuleComposerState => ({
  title: "",
  message: "",
  unlockDate: "",
  recipientEmail: ""
});
