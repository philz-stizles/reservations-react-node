// /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// import {
//   DocumentDefinition,
//   FilterQuery,
//   UpdateQuery,
//   QueryOptions,
// } from 'mongoose';
// import Category, { ICategoryDocument } from '@src/models/category.model';

// export function createCategory(input: DocumentDefinition<ICategoryDocument>) {
//   return Category.create(input);
// }

// export function findCategory(
//   query: FilterQuery<ICategoryDocument>,
//   options: QueryOptions = { lean: true }
// ) {
//   return Category.findOne(query, {}, options);
// }

// export function findAndUpdate(
//   query: FilterQuery<ICategoryDocument>,
//   update: UpdateQuery<ICategoryDocument>,
//   options: QueryOptions
// ) {
//   return Category.findOneAndUpdate(query, update, options);
// }

// export function deleteCategory(query: FilterQuery<ICategoryDocument>) {
//   return Category.deleteOne(query);
// }
