import { Schema, model, models } from "mongoose";

export interface RecipientDocument {
  capsuleId: string;
  deliveryChannel: "link" | "email";
  email?: string;
  name?: string;
  accessToken: string;
  deliveredAt?: Date;
  viewedAt?: Date;
}

const recipientSchema = new Schema<RecipientDocument>(
  {
    capsuleId: { type: String, required: true, index: true },
    deliveryChannel: {
      type: String,
      enum: ["link", "email"],
      required: true
    },
    email: { type: String },
    name: { type: String },
    accessToken: { type: String, required: true, unique: true, index: true },
    deliveredAt: { type: Date },
    viewedAt: { type: Date }
  },
  { timestamps: true }
);

recipientSchema.index({ capsuleId: 1, deliveryChannel: 1 });

export const RecipientModel =
  models.Recipient ?? model<RecipientDocument>("Recipient", recipientSchema);
