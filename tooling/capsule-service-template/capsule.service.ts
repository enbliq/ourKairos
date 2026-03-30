import { assertDraft, canUnlock } from "./capsule.transitions";
import type { CapsuleRecord, CapsuleRepository } from "./capsule.types";

export const createCapsuleService = (repository: CapsuleRepository) => ({
  createDraft(input: Omit<CapsuleRecord, "id" | "status">) {
    return repository.create(input);
  },
  async updateDraft(id: string, input: Partial<CapsuleRecord>) {
    const capsule = await repository.findById(id);
    if (!capsule) {
      throw new Error("Capsule not found");
    }

    assertDraft(capsule);
    return repository.update(id, input);
  },
  async seal(id: string) {
    const capsule = await repository.findById(id);
    if (!capsule) {
      throw new Error("Capsule not found");
    }

    assertDraft(capsule);
    return repository.update(id, { status: "sealed" });
  },
  async unlock(id: string) {
    const capsule = await repository.findById(id);
    if (!capsule) {
      throw new Error("Capsule not found");
    }

    if (!canUnlock(capsule)) {
      throw new Error("Capsule cannot be unlocked yet");
    }

    return repository.update(id, { status: "unlocked" });
  },
  listByOwner(ownerId: string) {
    return repository.listByOwner(ownerId);
  },
  async duplicate(id: string): Promise<CapsuleRecord> {
    const source = await repository.findById(id);
    if (!source) {
      throw new Error("Capsule not found");
    }

    return repository.create({
      ownerId: source.ownerId,
      title: `${source.title} (copy)`,
      message: source.message,
      unlockDate: source.unlockDate,
    });
  },
});
