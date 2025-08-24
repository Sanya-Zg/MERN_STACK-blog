import { errorHandler } from '../utils/errors.js';
import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';

export const test = (req, res) => {
  res.json({ message: 'Test page' });
};

export const updateUser = async (req, res, next) => {
  // Checking if id from token payload === id from params
  if (req.user.userId !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this user'));
  }

  // Checking if password have more than 6 characters
  if (req.body.password) {
    const password = req.body.password;

    if (password.length < 6) {
      return next(
        errorHandler(400, "Password couldn't have less 6 characters")
      );
    }
    // Hashing password
    req.body.password = await bcryptjs.hash(password, 10);
  }

  // Check if the username length is within the range
  if (req.body.username) {
    const userName = req.body.username;

    if (userName.length < 3 || userName.length > 20) {
      return next(
        errorHandler(400, 'Username must be between 3 and 20 characters')
      );
    }

    // Regex: only lowercase letters, numbers, _ and -
    const usernameRegex = /^[a-z0-9_-]+$/;
     if (!usernameRegex.test(userName)) {
       return next(
         errorHandler(
           400,
           'Username can only contain lowercase letters, numbers, "_" and "-"'
         )
       );
     }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    return res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
