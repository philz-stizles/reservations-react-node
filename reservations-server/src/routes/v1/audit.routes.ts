import { Router } from 'express';
import { authenticate, authorize } from '@src/middlewares/auth.middlewares';
import {
  getFilteredAuditTrail,
  getAuditById,
} from '@src/controllers/audit.controllers';

const router = Router();

// Authenticate all routes after this middleware
router.use(authenticate);
router.use(authorize('admin'));

router.get('/filtered', getFilteredAuditTrail);

router.get('/:id', getAuditById);

export default router;
