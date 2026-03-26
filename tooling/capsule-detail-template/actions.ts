import type { CapsuleDetailView } from "./types";

export const resolveDetailActions = (capsule: CapsuleDetailView) => {
  if (capsule.status === "draft") {
    return ["edit", "seal"] as const;
  }

  if (capsule.status === "sealed") {
    return ["copy-link"] as const;
  }

  return ["view-history"] as const;
};
