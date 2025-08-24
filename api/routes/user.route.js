import { Router } from 'express';
import { test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verityUser.js';

const router = Router();

router.get('/test', test);
router.put('/update/:userId', verifyToken, updateUser);

export default router;
