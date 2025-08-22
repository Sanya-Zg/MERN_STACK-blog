import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: [3, 'User name can not be less than 3 characters'],
      unique: true,
      trim: true,
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
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fprofile%2520icon%2F&psig=AOvVaw3LQD5OqcZB_o56MF4W6OZA&ust=1755957504367000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKje58zJno8DFQAAAAAdAAAAABAE',
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
