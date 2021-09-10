import express from 'express';
import {
  create,
  list,
  update,
  read,
  remove,
} from '@src/controllers/v1/room.controller';
import { authenticate } from '@src/middlewares/auth.middlewares';

const router = express.Router();

router.route('/').post(authenticate, create).get(list);

router
  .route('/:id')
  .get(read)
  .put(authenticate, update)
  .delete(authenticate, remove);

export default router;
