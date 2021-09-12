import {
  create,
  list,
  read,
  cancel,
  calcOverstayByCustomer,
  calcOverstayByReservation,
  listMyReservations,
  cancelMyReservation,
  updateReservationStatus,
} from '@src/controllers/v1/reservation.controller';
import { authenticate } from '@src/middlewares/auth.middlewares';
import { Router } from 'express';

const router = Router();

router.route('/').post(authenticate, create).get(authenticate, list);

// Admin routes
router.put(
  '/admin/reservation-status',
  authenticate,
  // authorize('admin'),
  updateReservationStatus
);

router.get('/calcOverstayByReservation', calcOverstayByReservation);
router.get('/calcOverstayByCustomer', calcOverstayByCustomer);

router.route('/:id').get(authenticate, read).patch(authenticate, cancel);

router.route('/me').get(authenticate, listMyReservations);
router.route('/me/:id').patch(authenticate, cancelMyReservation);

export default router;
