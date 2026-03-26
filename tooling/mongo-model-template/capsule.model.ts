import { Schema, model, models } from "mongoose";

export interface CapsuleDocument {
  ownerId: string;
  title: string;
  message?: string;
  unlockDate: Date;
  status: "draft" | "sealed" | "unlocked";
  recipientId?: string;
  giftId?: string;
}

const capsuleSchema = new Schema<CapsuleDocument>(
  {
    ownerId: { type: String, required: true, index: true },
    title: { type: String, required: true, trim: true },
    message: { type: String },
    unlockDate: { type: Date, required: true, index: true },
    status: {
      type: String,
      enum: ["draft", "sealed", "unlocked"],
      default: "draft",
      index: true
    },
    recipientId: { type: String, index: true },
    giftId: { type: String, index: true }
  },
  { timestamps: true }
);

capsuleSchema.index({ ownerId: 1, status: 1, unlockDate: 1 });

export const CapsuleModel =
  models.Capsule ?? model<CapsuleDocument>("Capsule", capsuleSchema);
