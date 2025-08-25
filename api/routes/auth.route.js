import { Router } from 'express';
import { forgotPassword, google, resetPassword, signin, signup, verifyEmail, verifyOTP } from '../controllers/auth.controller.js';

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google);
router.post('/verify-email', verifyEmail);
router.put('/forgot-password', forgotPassword);
router.put('/verify-otp', verifyOTP);
router.put('/reset-password', resetPassword);

export default router;