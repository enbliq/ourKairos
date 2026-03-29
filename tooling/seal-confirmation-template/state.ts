export interface SealConfirmationState {
  open: boolean;
  confirmed: boolean;
}

export const createSealConfirmationState = (): SealConfirmationState => ({
  open: false,
  confirmed: false
});
