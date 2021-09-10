import fs, { PathLike } from 'fs';
import AWS, { S3, AWSError } from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const uploadDoc = (
  name: string,
  file: PathLike,
  type: string,
  // eslint-disable-next-line no-unused-vars
  cb: (error: Error, data: S3.ManagedUpload.SendData) => void
): void => {
  const params: S3.PutObjectRequest = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: `${process.env.AWS_BUCKET_ROOT_DIR}${name}`,
    Body: fs.readFileSync(file),
    ACL: 'public-read',
    ContentType: type,
  };

  s3.upload(params, function (error: Error, data: S3.ManagedUpload.SendData) {
    if (error) {
      console.log('S3 DOCUMENT COULD NOT BE UPLOADED', error);
    } else {
      console.log('S3 DOCUMENT UPLOADED SUCCESSFULLY', data);
    }
    cb(error, data);
  });
};

export const uploadDocBase64 = (
  name: string,
  base64Data: S3.Body,
  contentType: string,
  // eslint-disable-next-line no-unused-vars
  cb: (error: Error, data: S3.ManagedUpload.SendData) => void
): void => {
  const params: S3.PutObjectRequest = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: `${process.env.AWS_BUCKET_ROOT_DIR}${name}`,
    Body: base64Data,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: contentType,
  };

  s3.upload(params, function (error: Error, data: S3.ManagedUpload.SendData) {
    if (error) {
      console.log('S3 DOCUMENT COULD NOT BE UPLOADED', error);
    } else {
      console.log('S3 DOCUMENT UPLOADED SUCCESSFULLY', data);
    }
    cb(error, data);
  });
};

export const removeDoc = (
  key: string,
  // eslint-disable-next-line no-unused-vars
  cb: (err: AWSError, data: S3.DeleteObjectOutput) => void
): void => {
  const params: S3.DeleteObjectRequest = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: key,
  };

  s3.deleteObject(
    params,
    function (error: AWSError, data: S3.DeleteObjectOutput) {
      if (error) {
        console.log('S3 DOCUMENT COULD NOT BE DELETED', error);
      } else {
        console.log('S3 DOCUMENT DELETED SUCCESSFULLY', data);
      }

      if (cb) {
        cb(error, data);
      }
    }
  );
};
