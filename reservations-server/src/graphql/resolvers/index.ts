// import { IResolvers } from '@graphql-tools/utils';
import {
  GraphQLUpload,
  graphqlUploadExpress, // A Koa implementation is also exported.
} from 'graphql-upload';
import { finished } from 'stream/promises';
import {
  authMutations,
  authQueries,
} from '@src/graphql/resolvers/auth.resolvers';
import { categoryQueries } from '@src/graphql/resolvers/category';
import { subCategoryQueries } from '@src/graphql/resolvers/sub-category';
import {
  productQueries,
  productMutations,
} from '@src/graphql/resolvers/product.resolvers';
import {
  couponMutations,
  couponQueries,
  couponSubscriptions,
} from '@src/graphql/resolvers/coupon.resolvers';

const resolvers = {
  // This maps the `Upload` scalar to the implementation provided
  // by the `graphql-upload` package.
  Upload: GraphQLUpload,
  Query: {
    ...authQueries,
    ...categoryQueries,
    ...subCategoryQueries,
    ...productQueries,
    ...couponQueries,
  },
  Mutation: {
    ...authMutations,
    ...couponMutations,
    ...productMutations,
  },
  Subscription: {
    ...couponSubscriptions,
  },
};

export default resolvers;
