import express from 'express';
import {
  create,
  list,
  read,
  update,
  remove,
  setProductRating,
  listRelatedProducts,
  getProductsTotal,
  listAll,
  uploadFile,
  removeFile,
  searchFilters,
  createWithCsv,
  listWithCsv,
} from '@src/controllers/product.controllers';
import { authenticate, authorize } from '@src/middlewares/auth.middlewares';

const router = express.Router();

router.route('/').post(authenticate, authorize('admin'), create).get(listAll);
router
  .route('/csv')
  .post(authenticate, authorize('admin'), createWithCsv)
  .get(listWithCsv);

router.post('/filtered', list);

router.get('/total', getProductsTotal);

router.post('/upload', authenticate, authorize('admin'), uploadFile);
router.post('/remove-file', authenticate, authorize('admin'), removeFile);

router
  .route('/:slug')
  .get(read)
  .put(authenticate, authorize('admin'), update)
  .delete(authenticate, authorize('admin'), remove);

router.put('/:productId/set-rating', authenticate, setProductRating);

router.get('/:productId/related', listRelatedProducts);

router.post('/search/filters', searchFilters);

export default router;
