import type { AttachmentRepository, StorageBackend } from './attachment.types';

/**
 * Idempotent cleanup job for orphaned/abandoned attachment files.
 *
 * Safe to run repeatedly – it only removes records whose state is
 * explicitly 'orphaned'. Attachments linked to sealed or unlocked
 * capsules (state = 'attached') are never touched.
 *
 * Returns the number of files reclaimed.
 */
export const runAttachmentCleanup = async (
  repository: AttachmentRepository,
  storage: StorageBackend,
): Promise<number> => {
  const orphans = await repository.findByState('orphaned');
  let reclaimed = 0;

  for (const attachment of orphans) {
    await storage.remove(attachment.storagePath);
    await repository.delete(attachment.id);
    reclaimed++;
  }

  return reclaimed;
};

/**
 * Mark a pending attachment as orphaned when it is replaced or the
 * draft is abandoned without sealing.
 */
export const markAttachmentOrphaned = (
  repository: AttachmentRepository,
  attachmentId: string,
): Promise<void> => repository.markOrphaned(attachmentId);
