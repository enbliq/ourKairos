export interface CapsuleRecord {
  id: string;
  ownerId: string;
  title: string;
  message?: string;
  unlockDate: string;
  status: 'draft' | 'sealed' | 'unlocked';
}

export interface CapsuleRepository {
  findById(id: string): Promise<CapsuleRecord | null>;
  create(input: Omit<CapsuleRecord, 'id' | 'status'>): Promise<CapsuleRecord>;
}

/**
 * Duplicate a capsule into a new draft.
 *
 * Copies title, message, and unlockDate. Excludes id, status,
 * recipient tokens, and delivery history so the clone starts clean.
 */
export const duplicateCapsule = async (
  id: string,
  repository: CapsuleRepository,
): Promise<CapsuleRecord> => {
  const source = await repository.findById(id);
  if (!source) {
    throw new Error('Capsule not found');
  }

  return repository.create({
    ownerId: source.ownerId,
    title: `${source.title} (copy)`,
    message: source.message,
    unlockDate: source.unlockDate,
  });
};
