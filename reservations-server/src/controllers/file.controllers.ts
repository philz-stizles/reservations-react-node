import path from 'path';
import { FilterQuery } from 'mongoose';
import { Request, Response } from 'express';
import { v4 as uuidV4 } from 'uuid';
import formidable, { Fields, Files, File } from 'formidable';
import SubCategory from '@src/models/sub-category.model';
import Product, { IProductDocument } from '@src/models/product.model';
import Data from '@src/models/data.model';
// Services
import * as cloudinaryService from '@src/services/cloudinary/cloudinary.services';
import * as AWS from '@src/services/aws/s3.services';
import { parseCSVFile } from '@src/services/file/csv-parse.services';

export const uploadWithFormCloudinary = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    if (req.files) {
      console.log(req.files);
    }
    // Check if a file was uploaded
    if (req.file) {
      console.log(req.file.path);
      const result = await cloudinaryService.uploadFile(req.file.path);

      return res.json({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    return res.json({
      message: 'No file was uploaded',
    });
  } catch (err: any) {
    console.log('File upload with Form ERR ----->', err.message);
    return res.status(400).send('Create Sub category failed');
  }
};

export const uploadWithFormAWS = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    if (req.file) {
      console.log(req.file);
    }
    // Check if a file was uploaded
    if (req.file) {
      const { buffer, mimetype } = req.file;
      return AWS.uploadDocBase64(
        `/files/${uuidV4()}`,
        buffer,
        mimetype,
        (err, data) => {
          if (err) {
            return res
              .status(400)
              .json({ status: false, message: 'Upload to s3 failed' });
          }

          return res.json({
            status: true,
            data,
            message: 'File uploaded successfully',
          });
        }
      );
    }

    return res.json({
      message: 'No file was uploaded',
    });
  } catch (err: any) {
    console.log('File upload with Form ERR ----->', err.message);
    return res.status(400).send('File upload with Form');
  }
};

export const uploadWithMulterProcess = async (
  req: Request,
  res: Response
): Promise<any> => {
  async function onNewRecord(record: any) {
    console.log(record);
    await Data.create(record);
  }

  function onError(error: any) {
    console.log(error);
  }

  function done(linesRead: any) {
    res.json({ data: linesRead });
  }

  console.log('process upload');
  console.log('req.file', req.file);

  try {
    // Check if a file was uploaded
    if (req.file) {
      // const { buffer, mimetype, originalname } = req.file;
      const { path: filePath } = req.file as any;
      console.log('file path', filePath);

      const columns = true;
      return parseCSVFile(filePath, columns, onNewRecord, onError, done);
    }

    return res.json({
      message: 'No file was uploaded',
    });
  } catch (err: any) {
    console.log('File upload with Form ERR ----->', err.message);
    return res.status(400).send('File upload with Form');
  }
};

export const uploadWithMulterAWS = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    if (req.file) {
      console.log(req.file);
    }
    // Check if a file was uploaded
    if (req.file) {
      const { buffer, mimetype, originalname } = req.file;
      return AWS.uploadDocBase64(
        `/files/${uuidV4()}${path.extname(originalname as string)}`,
        buffer,
        mimetype,
        (err, data) => {
          if (err) {
            return res
              .status(400)
              .json({ status: false, message: 'Upload to s3 failed' });
          }

          return res.json({
            status: true,
            data,
            message: 'File uploaded to AWS successfully using Multer',
          });
        }
      );
    }

    return res.json({
      message: 'No file was uploaded',
    });
  } catch (err: any) {
    console.log('File upload with Form ERR ----->', err.message);
    return res.status(400).send('File upload with Form');
  }
};

export const uploadWithFormidable = (req: Request, res: Response) => {
  try {
    const form = new formidable.IncomingForm();
    return form.parse(
      req,
      (formidableErr, fields: Fields, files: Files): any => {
        if (formidableErr) {
          return res
            .status(400)
            .json({ status: false, message: 'Image could not be uploaded' });
        }

        console.log(files.doc);
        const { doc } = files;
        const { path: filePath, type, size, name } = doc as File;

        if (size > 2000000) {
          return res
            .status(400)
            .json({ status: false, message: 'Image should be less then 2MB' });
        }

        return AWS.uploadDoc(
          `/files/${uuidV4()}${path.extname(name as string)}`,
          filePath,
          type as string,
          (err, data) => {
            if (err) {
              return res
                .status(400)
                .json({ status: false, message: 'Upload to s3 failed' });
            }

            return res.json({
              status: true,
              data,
              message: 'File uploaded successfully',
            });
          }
        );
      }
    );
  } catch (error: any) {
    console.log('File upload with Form ERR ----->', error.message);
    return res.status(400).send('Create Sub category failed');
  }
};

export const uploadWithBody = async (
  req: Request,
  res: Response
): Promise<void> => {
  const subCategory = await SubCategory.findOne({
    slug: req.params.slug,
  }).exec();
  const products = await Product.find({
    subs: subCategory,
  } as FilterQuery<IProductDocument>)
    .populate('category')
    .exec();

  res.json({ subCategory, products });
};
