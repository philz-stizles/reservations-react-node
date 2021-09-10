// External libraries
import express from 'express';
// Auth middlewares
import { authenticate, authorize } from '@src/middlewares/auth.middlewares';
// Auth controllers
import { create, remove, list } from '@src/controllers/coupon.controllers';

const router = express.Router();

router.route('/').post(authenticate, create).get(list);

router.delete('/:couponId', authenticate, authorize('admin'), remove);

export default router;
