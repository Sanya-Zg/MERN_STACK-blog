import Post from '../models/post.model.js';
import { errorHandler } from '../utils/errors.js';

export const createPost = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to create a post'));
    }

    if (!req.body.title?.trim() || !req.body.content?.trim()) {
      return next(errorHandler(400, 'Please provide all required fields'));
    }

    const slug = req.body.title
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^\p{L}0-9-]/gu, '');

    const newPost = new Post({
      ...req.body,
      slug,
      userId: req.user.userId,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    if (error.code === 11000) {
      return next(
        errorHandler(400, 'Title already exists. Please choose another.')
      );
    }
    next(error);
  }
};
