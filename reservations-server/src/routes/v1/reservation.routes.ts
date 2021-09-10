import {
  calcOverstayByCustomer,
  calcOverstayByReservation,
} from '@src/controllers/admin.controller';
import {
  cancel,
  create,
  list,
  read,
} from '@src/controllers/reservation.controller';
import { authenticate } from '@src/middlewares/auth.middlewares';
import { Router } from 'express';

const router = Router();

router.route('/').post(authenticate, create).get(authenticate, list);

router.get('/calcOverstayByReservation', calcOverstayByReservation);
router.get('/calcOverstayByCustomer', calcOverstayByCustomer);

router.route('/:id').get(authenticate, read).patch(authenticate, cancel);

export default router;
