import type { DashboardCapsuleCard, DashboardCapsuleStatus } from "./types";

export const groupCapsulesByStatus = (capsules: DashboardCapsuleCard[]) =>
  capsules.reduce<Record<DashboardCapsuleStatus, DashboardCapsuleCard[]>>(
    (groups, capsule) => {
      groups[capsule.status].push(capsule);
      return groups;
    },
    {
      draft: [],
      sealed: [],
      unlocked: []
    }
  );
