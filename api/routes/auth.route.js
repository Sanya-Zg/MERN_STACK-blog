import { Router } from 'express';
import { signup, verifyEmail } from '../controllers/auth.controller.js';

const router = Router();

router.post('/signup', signup);
router.post('/verify-email', verifyEmail);

export default router;