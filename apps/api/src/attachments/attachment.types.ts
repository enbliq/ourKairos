/**
 * Attachment lifecycle states.
 *
 * pending  – uploaded but not yet linked to a capsule
 * attached – linked to a draft or sealed capsule (must not be deleted)
 * orphaned – replaced or abandoned; safe to reclaim
 */
export type AttachmentState = 'pending' | 'attached' | 'orphaned';

export interface AttachmentRecord {
  id: string;
  capsuleId: string | null;
  storagePath: string;
  state: AttachmentState;
  createdAt: Date;
}

export interface AttachmentRepository {
  findByState(state: AttachmentState): Promise<AttachmentRecord[]>;
  markOrphaned(id: string): Promise<void>;
  delete(id: string): Promise<void>;
}

export interface StorageBackend {
  remove(path: string): Promise<void>;
}
