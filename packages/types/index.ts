export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  provider: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum CapsuleStatus {
  DRAFT = "DRAFT",
  SEALED = "SEALED",
  UNLOCKED = "UNLOCKED",
}

export interface Capsule {
  id: string;
  ownerId: string;
  title: string;
  message: string | null;
  unlockDate: Date | null;
  status: CapsuleStatus;
  createdAt: Date;
  updatedAt: Date;
}
