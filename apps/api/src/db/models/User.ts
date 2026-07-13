import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    email: { type: String, required: true, lowercase: true, trim: true },
    name: { type: String, required: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true },
);

UserSchema.index({ email: 1 }, { unique: true });

export const UserModel =
  mongoose.models['User'] ?? mongoose.model('User', UserSchema, 'users');
