import express from 'express';
import {
  signupSchema,
  loginSchema,
} from '@src/validation/yup/schemas/user.schema';
import {
  signup,
  signupWithEmailVerification,
  activateAccount,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
  logoutCookie,
} from '@src/controllers/v1/auth.controllers';
import validationRequest from '@src/validation/yup/middlewares/yup.validation.middleware';

const router = express.Router();

router.post('/signup', validationRequest(signupSchema), signup);

router.post(
  '/signup-with-email-verification',
  validationRequest(signupSchema),
  signupWithEmailVerification
);
router.post('/activate-account', activateAccount);
router.post('/create-business', validationRequest(signupSchema), signup);
router.post('/login', validationRequest(loginSchema), login);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);
router.patch('/change-password', changePassword);
router.get('/logout', logoutCookie);

export default router;
