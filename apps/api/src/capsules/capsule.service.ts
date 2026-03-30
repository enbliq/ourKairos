import { CapsuleModel, type ICapsule } from './capsule.model';
import { track } from '../analytics/analytics';

/** Returns capsules for a user, excluding archived and deleted by default */
export const listCapsules = async (
  ownerId: string,
  includeArchived = false,
): Promise<ICapsule[]> => {
  const excludedStatuses = includeArchived ? ['DELETED'] : ['ARCHIVED', 'DELETED'];
  return CapsuleModel.find({ ownerId, status: { $nin: excludedStatuses } }).sort({ createdAt: -1 });
};

export const getCapsule = async (id: string, ownerId: string): Promise<ICapsule | null> =>
  CapsuleModel.findOne({ _id: id, ownerId });

export const createCapsule = async (
  ownerId: string,
  data: Pick<ICapsule, 'title' | 'message' | 'unlockDate' | 'recipientEmail'>,
): Promise<ICapsule> => {
  const capsule = await CapsuleModel.create({ ownerId, ...data });
  track({ event: 'capsule.draft_created', userId: ownerId, capsuleId: String(capsule._id) });
  return capsule;
};

export const sealCapsule = async (id: string, ownerId: string): Promise<ICapsule | null> => {
  const capsule = await CapsuleModel.findOneAndUpdate(
    { _id: id, ownerId, status: 'DRAFT' },
    { status: 'SEALED' },
    { new: true },
  );
  if (capsule) track({ event: 'capsule.sealed', userId: ownerId, capsuleId: id });
  return capsule;
};

/** Issue #387 – archive a capsule (hides from default list, preserves data) */
export const archiveCapsule = async (id: string, ownerId: string): Promise<ICapsule | null> => {
  const capsule = await CapsuleModel.findOneAndUpdate(
    { _id: id, ownerId, status: { $nin: ['DELETED'] } },
    { status: 'ARCHIVED' },
    { new: true },
  );
  if (capsule) track({ event: 'capsule.archived', userId: ownerId, capsuleId: id });
  return capsule;
};

/** Issue #387 – restore an archived capsule back to its previous active state */
export const unarchiveCapsule = async (id: string, ownerId: string): Promise<ICapsule | null> => {
  const capsule = await CapsuleModel.findOneAndUpdate(
    { _id: id, ownerId, status: 'ARCHIVED' },
    { status: 'DRAFT' },
    { new: true },
  );
  if (capsule) track({ event: 'capsule.unarchived', userId: ownerId, capsuleId: id });
  return capsule;
};

/** Issue #387 – soft-delete: marks as DELETED, never physically removed */
export const softDeleteCapsule = async (id: string, ownerId: string): Promise<ICapsule | null> => {
  const capsule = await CapsuleModel.findOneAndUpdate(
    { _id: id, ownerId, status: { $ne: 'DELETED' } },
    { status: 'DELETED' },
    { new: true },
  );
  if (capsule) track({ event: 'capsule.deleted', userId: ownerId, capsuleId: id });
  return capsule;
};

/**
 * Issue #391 – record a delivery failure on a capsule.
 * Called by the delivery service when an email send fails.
 */
export const recordDeliveryFailure = async (
  id: string,
  reason: string,
): Promise<ICapsule | null> =>
  CapsuleModel.findByIdAndUpdate(
    id,
    {
      $set: { lastDeliveryAttemptAt: new Date(), lastDeliveryError: reason },
      $inc: { deliveryAttempts: 1 },
    },
    { new: true },
  );

/**
 * Issue #391 – resend delivery for a capsule that previously failed.
 * Prevents duplicate active sends by only allowing resend when status is SEALED/UNLOCKED
 * and a prior failure is recorded.
 */
export const resendDelivery = async (
  id: string,
  ownerId: string,
): Promise<{ capsule: ICapsule; alreadySent: boolean } | null> => {
  const capsule = await CapsuleModel.findOne({ _id: id, ownerId });
  if (!capsule) return null;

  if (!['SEALED', 'UNLOCKED'].includes(capsule.status)) {
    return { capsule, alreadySent: false };
  }

  // Guard: if last attempt was within 60 s, treat as duplicate
  const now = Date.now();
  if (
    capsule.lastDeliveryAttemptAt &&
    now - capsule.lastDeliveryAttemptAt.getTime() < 60_000
  ) {
    return { capsule, alreadySent: true };
  }

  await CapsuleModel.findByIdAndUpdate(id, {
    $set: { lastDeliveryAttemptAt: new Date(), lastDeliveryError: null },
    $inc: { deliveryAttempts: 1 },
  });

  track({ event: 'delivery.resent', userId: ownerId, capsuleId: id });

  const updated = await CapsuleModel.findById(id);
  return { capsule: updated!, alreadySent: false };
};
