import create from './create';
import list from './list';
import archive from './archive';

export default {
  '/coupons': {
    ...create,
    ...list,
  },
  '/coupons/{id}': {
    ...archive,
  },
};
