import {
  DocumentDefinition,
  UpdateQuery,
  FilterQuery,
  QueryOptions,
  LeanDocument,
} from 'mongoose';
import BadRequestError from '@src/errors/bad-request';
import NotFoundError from '@src/errors/not-found';
import Product, { IProductDocument } from '@src/models/mongoose/product.model';

exports.create = async (modelObject: DocumentDefinition<IProductDocument>) => {
  const existingProduct = await Product.findOne({ title: modelObject.title });
  if (existingProduct) {
    throw new BadRequestError('Product already exists');
  }

  const newProduct = await Product.create(modelObject);

  return newProduct;
};

exports.findBySlug = async (
  query: FilterQuery<IProductDocument>
): Promise<LeanDocument<IProductDocument> | null> => {
  const targetProduct = await Product.findOne(query);
  if (!targetProduct) {
    throw new NotFoundError('Product does not exist');
  }
  return targetProduct;
};

exports.list = async (
  query: FilterQuery<IProductDocument>,
  options: QueryOptions = { lean: true }
) => {
  // If you're executing a query and sending the results without modification to, say, an Express response,
  // you should use lean.In general, if you do not modify the query results and do not use custom getters,
  // you should use lean(). If you modify the query results or rely on features like getters or transforms,
  // you should not use lean().
  return Product.find(query, {}, options);
};

exports.update = async (
  query: FilterQuery<IProductDocument>,
  update: UpdateQuery<IProductDocument>,
  options: QueryOptions = { new: true }
) => {
  const targetProduct = await Product.findOneAndUpdate(query, update, options);
  if (!targetProduct) {
    throw new NotFoundError('Product does not exist');
  }
  return targetProduct;
};

exports.delete = async (query: FilterQuery<IProductDocument>) => {
  const targetProduct = await Product.deleteOne(query);
  if (!targetProduct) {
    throw new NotFoundError('Product does not exist');
  }
  return targetProduct;
};
