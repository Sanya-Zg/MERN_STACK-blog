import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: [3, 'Minimum 3 symbols'],
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minLength: [6, 'Minimum 6 symbols']
    },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
