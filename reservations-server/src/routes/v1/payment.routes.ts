import { Router } from 'express';
import {
  create,
  read,
  update,
  remove,
  list,
  getCategorySubs,
} from '@src/controllers/category.controllers';
import { authenticate } from '@src/middlewares/auth.middlewares';
import validateRequest, {
  categoryValidator,
} from '@src/middlewares/validation/express.validator';

const router = Router();

router
  .route('/')
  .post(authenticate, categoryValidator, validateRequest, create)
  .get(list);

router
  .route('/:slug')
  .get(read)
  .put(authenticate, update)
  .delete(authenticate, remove);

router.get('/:_id/subs', getCategorySubs);

export default router;
