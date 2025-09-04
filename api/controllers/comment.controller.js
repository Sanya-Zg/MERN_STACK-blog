import Comment from '../models/comment.model.js';
import { errorHandler } from '../utils/errors.js';

export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;

    if (!content || !content.trim()) {
      return next(errorHandler(400, 'Comment cannot be empty'));
    }

    if (userId !== req.user.userId) {
      return next(
        errorHandler(
          403,
          'You are not allowed to create this comment (not authorized)'
        )
      );
    }

    const newComment = new Comment({
      content,
      postId,
      userId,
    });

    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};

export const getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
