/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PubSub } from 'graphql-subscriptions';
import { ICouponDocument } from '@src/models/coupon.model';
import { AuthenticationError } from 'apollo-server-express';
import { ICouponResponse } from '../interfaces';

const pubsub = new PubSub();

export const couponMutations = {
  createCoupon: async (
    _parent: any,
    args: any,
    context: any
  ): Promise<ICouponResponse> => {
    const { isAuthenticated, dataSources } = context;
    if (!isAuthenticated) {
      throw new AuthenticationError('Please register to complete this process');
    }
    const createdCoupon = await dataSources.coupons.create(args.data);

    pubsub.publish('COUPON_CREATED', { createdCoupon });

    return {
      statusCode: 201,
      message: 'Created successful',
      status: true,
      data: createdCoupon,
    };
  },
  updateCoupon: async (
    _parent: any,
    args: any,
    context: any
  ): Promise<ICouponResponse> => {
    const updatedCoupon = await context.dataSources.coupons.update(args.data);
    return {
      statusCode: 200,
      message: 'Updated successful',
      status: true,
      data: updatedCoupon,
    };
  },
  archiveCoupon: async (
    _parent: any,
    args: any,
    context: any
  ): Promise<ICouponResponse> => {
    const loggedInUser = await context.dataSources.coupons.archive(args.id);
    return {
      statusCode: 200,
      message: 'Archived successful',
      status: true,
      data: loggedInUser,
    };
  },
};

export const couponQueries = {
  async coupons(
    _parent: any,
    _args: any,
    context: any
  ): Promise<ICouponDocument[]> {
    return await context.dataSources.coupons.list();
  },
};

export const couponSubscriptions = {
  createdCoupon: {
    subscribe: () => pubsub.asyncIterator(['COUPON_CREATED']),
  },
};
