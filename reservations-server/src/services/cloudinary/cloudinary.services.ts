import { v2 as cloudinary } from 'cloudinary';
import { finished } from 'stream/promises';

// config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  // secure: true
});

// req.files.file.path
export const uploadFile = async (file: string): Promise<void | any> => {
  try {
    return await cloudinary.uploader.upload(file, {
      public_id: `${Date.now()}`,
      resource_type: 'auto', // jpeg, png
    });
  } catch (error: any) {
    console.log(error.message);
    return { error };
  }
};

export const uploadStream = async (
  createReadStream: any
): Promise<void | any> => {
  const stream = cloudinary.uploader.upload_stream(
    {
      resource_type: 'auto', // jpeg, png
      folder: 'buyemall',
    },
    function (error, result) {
      console.log(error, result);
    }
  );

  createReadStream().pipe(stream);
  await finished(stream);
};

// eslint-disable-next-line no-unused-vars
export const removeFile = (
  imageId: string,
  cb: (err?: any, callResult?: any) => any
): void => {
  cloudinary.uploader.destroy(imageId, (err, result) => {
    if (err) return cb(err, null);
    return cb(null, result);
  });
};
