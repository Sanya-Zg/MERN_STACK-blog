import { Router } from 'express';
import {
  createComment,
  deleteComment,
  editComment,
  getPostComments,
  likeComment,
} from '../controllers/comment.controller.js';
import { verifyToken } from '../utils/verityUser.js';

const router = Router();

router.post('/create', verifyToken, createComment);
router.get('/getPostComments/:postId', getPostComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);
router.put('/editComment/:commentId', verifyToken, editComment);
router.delete('/deleteComment/:commentId', verifyToken, deleteComment);

export default router;
