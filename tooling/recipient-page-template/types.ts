export type RecipientPageState = "locked" | "unlocked" | "not-found";

export interface RecipientPageView {
  title: string;
  unlockDate?: string;
  message?: string;
  state: RecipientPageState;
}
