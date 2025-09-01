import { Router } from "express";
import { createPost, getPosts } from "../controllers/post.controller.js";
import { verifyToken } from "../utils/verityUser.js";

const router = Router();

router.post('/create', verifyToken, createPost);
router.get('/getposts', getPosts);


export default router;