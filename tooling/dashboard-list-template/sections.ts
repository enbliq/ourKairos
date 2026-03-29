import { groupCapsulesByStatus } from "./grouping";
import type { DashboardCapsuleCard } from "./types";

export const buildDashboardSections = (capsules: DashboardCapsuleCard[]) => {
  const grouped = groupCapsulesByStatus(capsules);

  return [
    { key: "draft", title: "Drafts", items: grouped.draft },
    { key: "sealed", title: "Scheduled", items: grouped.sealed },
    { key: "unlocked", title: "Unlocked", items: grouped.unlocked }
  ];
};
