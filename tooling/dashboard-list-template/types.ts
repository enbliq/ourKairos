export type DashboardCapsuleStatus = "draft" | "sealed" | "unlocked";

export interface DashboardCapsuleCard {
  id: string;
  title: string;
  unlockDate: string;
  status: DashboardCapsuleStatus;
}
