import multer from 'multer';

const csvFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.includes('csv')) {
    cb(null, true);
  } else {
    cb('Please upload only csv file.', false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // eslint-disable-next-line no-underscore-dangle
    cb(null, `${global.__basedir}/resources/static/assets/uploads/`);
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-buyemall-${file.originalname}`);
  },
});

export default multer({ storage, fileFilter: csvFilter });
