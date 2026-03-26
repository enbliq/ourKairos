import { Schema, model, models } from "mongoose";

export interface UserDocument {
  email: string;
  name: string;
  avatarUrl?: string;
  preferredLocale?: string;
}

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, trim: true, lowercase: true },
    name: { type: String, required: true, trim: true },
    avatarUrl: { type: String },
    preferredLocale: { type: String, default: "en" }
  },
  { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });

export const UserModel = models.User ?? model<UserDocument>("User", userSchema);
