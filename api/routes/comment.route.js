import { Router } from "express";
import { createComment, getPostComments, likeComment } from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verityUser.js";

const router = Router();

router.post('/create', verifyToken, createComment);
router.get('/getPostComments/:postId', getPostComments);
router.put('/likeComment/:commentId', verifyToken, likeComment)

export default router;