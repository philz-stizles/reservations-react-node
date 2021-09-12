import express from 'express';
import {
  getCurrentUser,
  saveUserAddress,
  updateReservationStatus,
  updateMe,
  deleteMe,
  getAllUsers,
  updateUser,
  deleteUser,
  getUser,
  createUser,
} from '@src/controllers/v1/user.controllers';
import { authenticate, authorize } from '@src/middlewares/auth.middlewares';
import { changePassword } from '@src/controllers/v1/auth.controllers';
import {
  resizeUserPhoto,
  uploadUserPhoto,
} from '@src/middlewares/multer.middlewares';

const router = express.Router();

router.get('/current-user', authenticate, getCurrentUser);
router.get('/current-admin', authenticate, authorize('admin'), getCurrentUser);

// Authenticate all routes after this middleware
router.use(authenticate);

// Manage profile
router
  .route('/me')
  // .get(getMe)
  .patch(uploadUserPhoto, resizeUserPhoto, updateMe)
  .delete(deleteMe);
router.patch('/me/changePassword', changePassword);

// Save address
router.post('/me/address', saveUserAddress);

// Authorize only admin for all routes after this middleware
// router.use(authorize('admin'));

router.route('/').post(createUser).get(getAllUsers);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
