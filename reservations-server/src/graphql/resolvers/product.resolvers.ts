/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import { finished } from 'stream/promises';
import { PubSub } from 'graphql-subscriptions';
import { IProductDocument } from '@src/models/product.model';
import { AuthenticationError } from 'apollo-server-express';
import { IResponse, IUpload } from '../interfaces';
import * as cloudinary from '@src/services/cloudinary/cloudinary.services';

const pubsub = new PubSub();

export interface IProductResponse extends IResponse {
  data: IProductDocument;
}

export interface IProductCreate {
  title: string;
  description: string;
  price: number;
  category: string;
  subs: string[];
  quantity: number;
  images: IUpload[];
  shipping: boolean;
  color: string[];
  brand: string;
}

export interface IProductUpdate {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  subs: string[];
  quantity: number;
  images: IUpload[];
  shipping: boolean;
  color: string[];
  brand: string;
}

export const productMutations = {
  createProduct: async (
    _parent: any,
    args: any,
    context: any
  ): Promise<IProductResponse> => {
    const { isAuthenticated, dataSources } = context;
    if (!isAuthenticated) {
      throw new AuthenticationError('Please register to complete this process');
    }

    const { images } = args.data;

    console.log('images', images);

    if (images) {
      const { createReadStream, filename, mimetype, encoding } = await images;

      console.log('resolver', filename);

      // Invoking the `createReadStream` will return a Readable Stream.
      // See https://nodejs.org/api/stream.html#stream_readable_streams
      const stream = createReadStream();

      // This is purely for demonstration purposes and will overwrite the
      // local-file-output.txt in the current working directory on EACH upload.
      const out = fs.createWriteStream('local-file-output.txt');
      stream.pipe(out);
      await finished(out);
    }

    const createdProduct = await dataSources.products.create(args.data);

    pubsub.publish('PRODUCT_CREATED', { createdProduct });

    return {
      statusCode: 201,
      message: 'Created successful',
      status: true,
      data: createdProduct,
    };
  },
  updateProduct: async (
    _parent: any,
    args: any,
    context: any
  ): Promise<IProductResponse> => {
    const updatedProduct = await context.dataSources.products.update(args.data);
    return {
      statusCode: 200,
      message: 'Updated successful',
      status: true,
      data: updatedProduct,
    };
  },
  archiveProduct: async (
    _parent: any,
    args: any,
    context: any
  ): Promise<IProductResponse> => {
    const archivedProduct = await context.dataSources.products.archive(args.id);
    return {
      statusCode: 200,
      message: 'Archived successful',
      status: true,
      data: archivedProduct,
    };
  },
  uploadProductFile: async (
    _parent: any,
    args: any,
    context: any
  ): Promise<IResponse> => {
    if (!context.isAuthenticated) {
      throw new AuthenticationError('Please register to complete this process');
    }

    const { upload } = args;

    console.log(upload);

    if (upload) {
      const { createReadStream, filename, mimetype, encoding } = await upload;

      // Store file in the cloud
      cloudinary.uploadStream(createReadStream);
    }

    return {
      statusCode: 201,
      message: 'Uploaded successfully',
      status: true,
    };
  },
  removeProductFile: async (
    _parent: any,
    args: any,
    context: any
  ): Promise<IResponse> => {
    if (!context.isAuthenticated) {
      throw new AuthenticationError('Please register to complete this process');
    }
    // Remove file from the cloud

    return {
      statusCode: 200,
      message: 'Removed successfully',
      status: true,
    };
  },
};

export const productQueries = {
  async products(
    _parent: any,
    _args: any,
    context: any
  ): Promise<IProductDocument[]> {
    return await context.dataSources.products.list();
  },
};

export const productSubscriptions = {
  createdProduct: {
    subscribe: () => pubsub.asyncIterator(['PRODUCT_CREATED']),
  },
};
