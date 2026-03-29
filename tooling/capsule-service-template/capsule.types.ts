export type CapsuleStatus = "draft" | "sealed" | "unlocked";

export interface CapsuleRecord {
  id: string;
  ownerId: string;
  title: string;
  message?: string;
  unlockDate: string;
  status: CapsuleStatus;
}

export interface CapsuleRepository {
  create(input: Omit<CapsuleRecord, "id" | "status">): Promise<CapsuleRecord>;
  update(id: string, input: Partial<CapsuleRecord>): Promise<CapsuleRecord>;
  findById(id: string): Promise<CapsuleRecord | null>;
  listByOwner(ownerId: string): Promise<CapsuleRecord[]>;
}
