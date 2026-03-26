import { Schema, model, models } from "mongoose";

export interface CapsuleGiftDocument {
  capsuleId: string;
  network: "stellar-testnet" | "stellar-mainnet";
  assetCode: string;
  amount: string;
  status: "pending" | "funded" | "released";
  transactionHash?: string;
}

const capsuleGiftSchema = new Schema<CapsuleGiftDocument>(
  {
    capsuleId: { type: String, required: true, index: true },
    network: {
      type: String,
      enum: ["stellar-testnet", "stellar-mainnet"],
      required: true
    },
    assetCode: { type: String, required: true },
    amount: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "funded", "released"],
      default: "pending",
      index: true
    },
    transactionHash: { type: String, index: true }
  },
  { timestamps: true }
);

capsuleGiftSchema.index({ capsuleId: 1, status: 1 });

export const CapsuleGiftModel =
  models.CapsuleGift ?? model<CapsuleGiftDocument>("CapsuleGift", capsuleGiftSchema);
