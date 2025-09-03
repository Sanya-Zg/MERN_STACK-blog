import { Router } from 'express';
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from '../controllers/post.controller.js';
import { verifyToken } from '../utils/verityUser.js';

const router = Router();

router.post('/create', verifyToken, createPost);
router.get('/getposts', getPosts);
router.delete('/deletepost/:postId/:userId', verifyToken, deletePost);
router.put('/updatepost/:postId/:userId', verifyToken, updatePost);

export default router;
