import { Router } from "express";
import { createPost } from "../controllers/post.controller.js";
import { verifyToken } from "../utils/verityUser.js";

const router = Router();

router.post('/create', verifyToken, createPost);

export default router;