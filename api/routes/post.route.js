import { Router } from 'express';
import {
  createPost,
  deletePost,
  getPosts,
} from '../controllers/post.controller.js';
import { verifyToken } from '../utils/verityUser.js';

const router = Router();

router.post('/create', verifyToken, createPost);
router.get('/getposts', getPosts);
router.delete('/deletepost/:postId/:userId', verifyToken, deletePost);

export default router;
