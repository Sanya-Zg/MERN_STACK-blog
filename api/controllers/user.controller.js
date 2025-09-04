import { errorHandler } from '../utils/errors.js';
import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';

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
    const usernameRegex = /^[\p{L}\p{N}_-]+$/u;
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
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return next(errorHandler(404, 'User not found'));
    }

    const { password, ...rest } = updatedUser._doc;
    return res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.userId !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this user'));
  }

  try {
    await User.findByIdAndDelete(req.params.userId);
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res
      .clearCookie('access_token')
      .status(200)
      .json({ message: 'User has been signed out' });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to see all users'));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });
    const totalUsers = await User.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo},
    });
    res.status(200).json({ users: usersWithoutPassword, totalUsers, lastMonthUsers });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
}
