import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    id: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    avatarUrl: { type: String, default: null },
    provider: { type: String, required: true },
  },
  { timestamps: true },
);

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ provider: 1 });

export const UserModel =
  mongoose.models['User'] ?? mongoose.model('User', UserSchema, 'users');
