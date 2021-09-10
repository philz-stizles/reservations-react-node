import {
  DocumentDefinition,
  UpdateQuery,
  FilterQuery,
  QueryOptions,
  LeanDocument,
} from 'mongoose';
import BadRequestError from '@src/errors/bad-request';
import NotFoundError from '@src/errors/not-found';
import Coupon, { ICouponDocument } from '@src/models/coupon.model';

exports.create = async (modelObject: DocumentDefinition<ICouponDocument>) => {
  const existingCoupon = await Coupon.findOne({ name: modelObject.name });
  if (existingCoupon) {
    throw new BadRequestError('Coupon already exists');
  }

  const newCoupon = await Coupon.create(modelObject);

  return newCoupon;
};

exports.findBySlug = async (
  query: FilterQuery<ICouponDocument>
): Promise<LeanDocument<ICouponDocument> | null> => {
  const targetCoupon = await Coupon.findOne(query);
  if (!targetCoupon) {
    throw new NotFoundError('Coupon does not exist');
  }
  return targetCoupon;
};

exports.list = async (
  query: FilterQuery<ICouponDocument>,
  options: QueryOptions = { lean: true }
) => {
  // If you're executing a query and sending the results without modification to, say, an Express response,
  // you should use lean.In general, if you do not modify the query results and do not use custom getters,
  // you should use lean(). If you modify the query results or rely on features like getters or transforms,
  // you should not use lean().
  return Coupon.find(query, {}, options);
};

exports.update = async (
  query: FilterQuery<ICouponDocument>,
  update: UpdateQuery<ICouponDocument>,
  options: QueryOptions = { new: true }
) => {
  const targetCoupon = await Coupon.findOneAndUpdate(query, update, options);
  if (!targetCoupon) {
    throw new NotFoundError('Coupon does not exist');
  }
  return targetCoupon;
};

exports.delete = async (query: FilterQuery<ICouponDocument>) => {
  const targetCoupon = await Coupon.deleteOne(query);
  if (!targetCoupon) {
    throw new NotFoundError('Coupon does not exist');
  }
  return targetCoupon;
};
