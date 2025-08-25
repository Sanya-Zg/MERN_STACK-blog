import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: [3, 'username can not be less than 3 characters'],
      maxLength: [20, 'username can not be more than 20 characters'],
      unique: true,
      trim: true,
      match: [
        /^[a-z0-9_-]+$/,
        'Username can only contain letters(lowerCase), numbers, "_" and "-"',
      ],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [6, 'Password can not be less than 6 characters'],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png',
    },
    forgot_password_otp: {
      type: String,
      default: null,
    },
    forgot_password_expiry: {
      type: Date,
      default: '',
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
