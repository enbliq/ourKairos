import mongoose, { Schema, type Document } from 'mongoose';

export type CapsuleStatus = 'DRAFT' | 'SEALED' | 'UNLOCKED' | 'ARCHIVED' | 'DELETED';

export interface ICapsule extends Document {
  ownerId: string;
  title: string;
  message: string | null;
  unlockDate: Date | null;
  status: CapsuleStatus;
  recipientEmail: string | null;
  /** ISO timestamp of last delivery attempt */
  lastDeliveryAttemptAt: Date | null;
  /** Reason for last delivery failure */
  lastDeliveryError: string | null;
  /** Number of delivery attempts made */
  deliveryAttempts: number;
  createdAt: Date;
  updatedAt: Date;
}

const CapsuleSchema = new Schema<ICapsule>(
  {
    ownerId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    message: { type: String, default: null },
    unlockDate: { type: Date, default: null },
    status: {
      type: String,
      enum: ['DRAFT', 'SEALED', 'UNLOCKED', 'ARCHIVED', 'DELETED'],
      default: 'DRAFT',
    },
    recipientEmail: { type: String, default: null },
    lastDeliveryAttemptAt: { type: Date, default: null },
    lastDeliveryError: { type: String, default: null },
    deliveryAttempts: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const CapsuleModel =
  mongoose.models.Capsule ?? mongoose.model<ICapsule>('Capsule', CapsuleSchema);
