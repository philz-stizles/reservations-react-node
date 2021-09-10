// External libraries.
import express from 'express';
// Middlewares.
import { authenticate } from '@src/middlewares/auth.middlewares';
// Controllers.
import {
  list,
  listByCustomer,
  listByVendor,
} from '@src/controllers/transaction.controllers';

const router = express.Router();

router.route('/').get(authenticate, list);

router.route('/me').get(authenticate, listByCustomer);
router.route('/:vendorId').get(authenticate, listByVendor);

export default router;
