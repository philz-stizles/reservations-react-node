import sharedSchemas from './schemas/shared.schemas';
import authSchemas from './schemas/auth.schemas';
import categorySchemas from './schemas/category.schemas';
import subCategorySchemas from './schemas/sub-category.schemas';
import couponSchemas from './schemas/coupon.schemas';
import productSchemas from './schemas/product.schemas';

export default {
  schemas: {
    ...sharedSchemas,
    ...authSchemas,
    ...categorySchemas,
    ...subCategorySchemas,
    ...couponSchemas,
    ...productSchemas,
  },
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
  responses: {
    UnauthorizedError: {
      description: 'Access token is missing or invalid',
    },
  },
};
