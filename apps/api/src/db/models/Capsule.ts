import mongoose, { Schema } from 'mongoose';

const CapsuleSchema = new Schema(
  {
    id: { type: String, required: true },
    ownerId: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, default: null },
    unlockDate: { type: Date, default: null },
    status: {
      type: String,
      enum: ['DRAFT', 'SEALED', 'UNLOCKED'],
      required: true,
    },
  },
  { timestamps: true },
);

// Dashboard owner list: fetch all capsules for a user sorted by newest
CapsuleSchema.index({ ownerId: 1, createdAt: -1 });
// Unlock worker scan: find SEALED capsules whose unlockDate has passed
CapsuleSchema.index({ status: 1, unlockDate: 1 });
// Status-only filter (admin metrics, counts)
CapsuleSchema.index({ status: 1 });

export const CapsuleModel =
  mongoose.models['Capsule'] ?? mongoose.model('Capsule', CapsuleSchema, 'capsules');
