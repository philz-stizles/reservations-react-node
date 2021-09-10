// External libraries
import express from 'express';
// Auth middlewares
// import { authenticate, authorize } from '@src/middlewares/auth.middlewares';
// File upload middlewares
import {
  processUploadDoc,
  csvUploadHandler,
} from '@src/middlewares/multer.middlewares';
// File upload controllers
import {
  uploadWithBody,
  uploadWithFormCloudinary,
  uploadWithMulterAWS,
  uploadWithFormidable,
  uploadWithMulterProcess,
} from '@src/controllers/file.controllers';

const router = express.Router();

// router.use(authenticate, authorize('admin'));

router.post('/upload-with-body', uploadWithBody);

router.post(
  '/upload-with-form-cloudinary',
  csvUploadHandler,
  uploadWithFormCloudinary
);
router.post('/upload-with-multer-aws', csvUploadHandler, uploadWithMulterAWS);
router.post('/upload-with-formidable-aws', uploadWithFormidable);
router.post(
  '/upload-with-multer-process',
  processUploadDoc,
  uploadWithMulterProcess
);

export default router;
