import basicInfo from './basicInfo';
import servers from './servers';
import components from './components';
import tags from './tags';
import auth from './paths/auth';
import subCategories from './paths/sub-categories';
import categories from './paths/categories';
import coupons from './paths/coupons';
import products from './paths/products';

export default {
  ...basicInfo,
  servers,
  components,
  tags,
  paths: {
    ...auth,
    ...subCategories,
    ...categories,
    ...coupons,
    ...products,
  },
  // security: [{ bearerAuth: [] }], this applies
};
