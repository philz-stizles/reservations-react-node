import express from 'express';
import {
  create,
  list,
  read,
  update,
  remove,
} from '@src/controllers/v1/role.controllers';
import { authenticate } from '@src/middlewares/auth.middlewares';

const router = express.Router();

router.use(authenticate);

router.route('/').post(authenticate, create).get(list);

// Apply coupon
router
  .route('/:id')
  .get(read)
  .put(update) // get cart
  .delete(remove); // empty cart;

export default router;
