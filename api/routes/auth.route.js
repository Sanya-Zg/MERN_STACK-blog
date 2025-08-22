import { Router } from 'express';
import { google, signin, signup, verifyEmail } from '../controllers/auth.controller.js';

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google)
router.post('/verify-email', verifyEmail);

export default router;