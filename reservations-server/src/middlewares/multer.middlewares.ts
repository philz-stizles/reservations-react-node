/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import path from 'path';
import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import sharp from 'sharp';
// import AppError from '../utils/appError';

// const upload = multer() // Without any options, multer will store file in memory and provide it with req.file
// const upload = multer({ dest: path.join(__dirname, '..', '/uploads/images') }) //

// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, '..', 'uploads', 'images', 'users')) // Ensure that directories exist.
//         // Any time you change or create a directory, restart the server to pickup modifications
//     },
//     filename: (req, file, cb) => {
//         const ext = file.mimetype.split('/')[1]
//         const userId = req.user.id
//         const timestamp = Date.now()

//         cb(null, `user-${userId}-${timestamp}.${ext}`)
//     }
// })

const multerStorage = multer.memoryStorage();
const multerFilter = (req: Request, file: any, cb: any) => {
  if (file.mimetype.includes('csv')) {
    cb(null, true);
  } else {
    cb('Please upload only csv file.', false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const processUpload = multer({ dest: './uploads' });

export const processUploadDoc = processUpload.single('doc');

export const uploadUserPhoto = upload.single('doc');

export const uploadTourPhotos = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 },
]);

export const resizeUserPhoto = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  if (!req.file) {
    return next();
  }

  const userId = req.user.id;
  const timestamp = Date.now();
  req.file.filename = `user-${userId}-${timestamp}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`uploads/img/users/${req.file.filename}`); // https://sharp.pixelplumbing.com

  return next();
};

export const csvUploadHandler = () => {
  const csvUploadStorage = multer.memoryStorage();

  const csvFilter = (req: Request, file: any, cb: any) => {
    if (file.mimetype.includes('csv')) {
      cb(null, true);
    } else {
      cb('Please upload only csv file.', false);
    }
  };

  const uploadCSV = multer({
    storage: csvUploadStorage,
    fileFilter: csvFilter,
  });

  return uploadCSV.single('doc');
};

// export const resizeTourPhotos = async (req, res, next) => {
//   console.log('req.files');
//   console.log(req.files);
//   if (!req.files.imageCover || !req.files.images) {
//     return next();
//   }

//   // Image cover
//   const tourId = req.params.id;
//   const timestamp = Date.now();
//   req.body.imageCover = `tour-${tourId}-${timestamp}-cover.jpeg`;

//   await sharp(req.files.imageCover[0].buffer)
//     .resize(2000, 1333)
//     .toFormat('jpeg')
//     .jpeg({ quality: 90 })
//     .toFile(`public/img/tours/${req.body.imageCover}`); // https://sharp.pixelplumbing.com

//   // Files
//   req.body.images = [];
//   await Promise.all(
//     req.files.images.map(async (file, i) => {
//       const tourId = req.params.id;
//       const timestamp = Date.now();
//       const filename = `tour-${tourId}-${timestamp}-${i + 1}.jpeg`;

//       await sharp(file.buffer)
//         .resize(2000, 1333)
//         .toFormat('jpeg')
//         .jpeg({ quality: 90 })
//         .toFile(`public/img/tours/${filename}`); // https://sharp.pixelplumbing.com

//       req.body.images.push(filename);
//     })
//   );

//   console.log(req.body.images);

//   next();
// };
