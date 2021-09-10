import express from 'express';
import {
  createOrUpdate,
  getCurrentUser,
  saveUserAddress,
  addToWishlist,
  removeFromWishlist,
  wishlist,
  getAllOrders,
  updateOrderStatus,
  updateMe,
  deleteMe,
  getAllUsers,
  updateUser,
  deleteUser,
  getUser,
  createUser,
} from '@src/controllers/customer.controllers';
import { authenticate, authorize } from '@src/middlewares/auth.middlewares';
import { changePassword } from '@src/controllers/auth.controllers';
import {
  resizeUserPhoto,
  uploadUserPhoto,
} from '@src/middlewares/multer.middlewares';

const router = express.Router();

router.post('/create-or-update', authenticate, createOrUpdate);

router.get('/current-user', authenticate, getCurrentUser);
router.get('/current-admin', authenticate, authorize('admin'), getCurrentUser);

// Admin routes
router.get('/admin/orders', authenticate, authorize('admin'), getAllOrders);
router.put(
  '/admin/order-status',
  authenticate,
  authorize('admin'),
  updateOrderStatus
);

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

// Manage wish-list
router.route('/me/wishlist').post(addToWishlist).get(wishlist);
router.route('/me/wishlist/:productId').put(removeFromWishlist);

// Manage business
// router.route('/me/business').post(createBusiness).get(wishlist);

// Authorize only admin for all routes after this middleware
router.use(authorize('admin'));

router.route('/').post(createUser).get(getAllUsers);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
