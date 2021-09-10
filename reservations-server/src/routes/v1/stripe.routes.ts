import express from 'express';
import { createPaymentIntent } from '@src/controllers/stripe.controllers';
import { authenticate } from '@src/middlewares/auth.middlewares';

const router = express.Router();

router.post('/stripe/payment-intent', authenticate, createPaymentIntent);

export default router;
