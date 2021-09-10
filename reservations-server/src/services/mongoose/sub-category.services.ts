import {
  DocumentDefinition,
  UpdateQuery,
  FilterQuery,
  QueryOptions,
  LeanDocument,
} from 'mongoose';
import BadRequestError from '@src/errors/bad-request';
import NotFoundError from '@src/errors/not-found';
import SubCategory, {
  ISubCategoryDocument,
} from '@src/models/mongoose/subCategory.model';

exports.create = async (
  modelObject: DocumentDefinition<ISubCategoryDocument>
): Promise<ISubCategoryDocument> => {
  const existingSubCategory = await SubCategory.findOne({
    name: modelObject.name,
  });
  if (existingSubCategory) {
    throw new BadRequestError('Sub Category already exists');
  }

  const newSubCategory = await SubCategory.create(modelObject);

  return newSubCategory;
};

exports.findBySlug = async (
  query: FilterQuery<ISubCategoryDocument>
): Promise<LeanDocument<ISubCategoryDocument> | null> => {
  const targetSubCategory = await SubCategory.findOne(query);
  if (!targetSubCategory) {
    throw new NotFoundError('Sub Category does not exist');
  }
  return targetSubCategory;
};

exports.list = async (
  query: FilterQuery<ISubCategoryDocument>,
  options: QueryOptions = { lean: true }
) => {
  // If you're executing a query and sending the results without modification to, say, an Express response,
  // you should use lean.In general, if you do not modify the query results and do not use custom getters,
  // you should use lean(). If you modify the query results or rely on features like getters or transforms,
  // you should not use lean().
  return SubCategory.find(query, {}, options);
};

exports.update = async (
  query: FilterQuery<ISubCategoryDocument>,
  update: UpdateQuery<ISubCategoryDocument>,
  options: QueryOptions = { new: true }
) => {
  const targetSubCategory = await SubCategory.findOneAndUpdate(
    query,
    update,
    options
  );
  if (!targetSubCategory) {
    throw new NotFoundError('Sub Category does not exist');
  }
  return targetSubCategory;
};

exports.delete = async (query: FilterQuery<ISubCategoryDocument>) => {
  const targetSubCategory = await SubCategory.deleteOne(query);
  if (!targetSubCategory) {
    throw new NotFoundError('Sub Category does not exist');
  }
  return targetSubCategory;
};
