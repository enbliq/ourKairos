import type { RecipientPageView } from "./types";

export const presentRecipientPage = (view: RecipientPageView) => {
  switch (view.state) {
    case "locked":
      return {
        headline: "This capsule is still locked",
        body: view.unlockDate
      };
    case "unlocked":
      return {
        headline: "Your capsule is ready",
        body: view.message
      };
    default:
      return {
        headline: "Capsule not found",
        body: undefined
      };
  }
};
