import {
  DocumentDefinition,
  UpdateQuery,
  FilterQuery,
  QueryOptions,
  LeanDocument,
} from 'mongoose';
import BadRequestError from '@src/errors/bad-request';
import NotFoundError from '@src/errors/not-found';
import Category, { ICategoryDocument } from '@src/models/category.model';

exports.create = async (
  modelObject: DocumentDefinition<ICategoryDocument>
): Promise<ICategoryDocument> => {
  const existingCategory = await Category.findOne({ name: modelObject.name });
  if (existingCategory) {
    throw new BadRequestError('Category already exists');
  }

  const newCategory = await Category.create(modelObject);

  return newCategory;
};

exports.findBySlug = async (
  query: FilterQuery<ICategoryDocument>
): Promise<LeanDocument<ICategoryDocument> | null> => {
  const targetCategory = await Category.findOne(query);
  if (!targetCategory) {
    throw new NotFoundError('Category does not exist');
  }
  return targetCategory;
};

exports.list = async (
  query: FilterQuery<ICategoryDocument>,
  options: QueryOptions = { lean: true }
) => {
  // If you're executing a query and sending the results without modification to, say, an Express response,
  // you should use lean.In general, if you do not modify the query results and do not use custom getters,
  // you should use lean(). If you modify the query results or rely on features like getters or transforms,
  // you should not use lean().
  return Category.find(query, {}, options);
};

exports.update = async (
  query: FilterQuery<ICategoryDocument>,
  update: UpdateQuery<ICategoryDocument>,
  options: QueryOptions = { new: true }
) => {
  const targetCategory = await Category.findOneAndUpdate(
    query,
    update,
    options
  );
  if (!targetCategory) {
    throw new NotFoundError('Category does not exist');
  }
  return targetCategory;
};

exports.delete = async (query: FilterQuery<ICategoryDocument>) => {
  const targetCategory = await Category.deleteOne(query);
  if (!targetCategory) {
    throw new NotFoundError('Category does not exist');
  }
  return targetCategory;
};
