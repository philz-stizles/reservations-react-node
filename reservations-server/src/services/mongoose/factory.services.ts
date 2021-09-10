import {
  Model as MongooseModel,
  Document,
  DocumentDefinition,
  UpdateQuery,
  FilterQuery,
  QueryOptions,
  LeanDocument,
} from 'mongoose';
import BadRequestError from '@src/errors/bad-request';
import NotFoundError from '@src/errors/not-found';

exports.create = async (
  modelObject: DocumentDefinition<Document>,
  Model: MongooseModel<any>
) => {
  const existingEntity = await Model.findOne({ name: modelObject.name });
  if (existingEntity) {
    throw new BadRequestError('Entity already exists');
  }

  const newEntity = await Model.create(modelObject);

  return newEntity;
};

exports.findBySlug = async (query, Model) => {
  // If you're executing a query and sending the results without modification to, say, an Express response,
  // you should use lean.In general, if you do not modify the query results and do not use custom getters,
  // you should use lean(). If you modify the query results or rely on features like getters or transforms,
  // you should not use lean().
  const targetEntity = await Model.findOne(query);
  if (!targetEntity) {
    throw new NotFoundError('Entity does not exist');
  }
  return targetEntity;
};

exports.find = async (query, options = { lean: true }, Model) => {
  // If you're executing a query and sending the results without modification to, say, an Express response,
  // you should use lean.In general, if you do not modify the query results and do not use custom getters,
  // you should use lean(). If you modify the query results or rely on features like getters or transforms,
  // you should not use lean().
  return Model.find(query, {}, options);
};

exports.update = async (query, update, options = { new: true }, Model) => {
  const targetCategory = await Model.findOneAndUpdate(query, update, options);
  if (!targetCategory) {
    throw new NotFoundError('Entity does not exist');
  }
  return targetCategory;
};

exports.delete = async (query, Model) => {
  const targetEntity = await Model.deleteOne(query);
  if (!targetEntity) {
    throw new NotFoundError('Entity does not exist');
  }
  return targetEntity;
};
