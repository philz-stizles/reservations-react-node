import create from './create';
import list from './list';

export default {
  '/subCategories': {
    ...create,
    ...list,
  },
  '/subCategories/{slug}': {},
};
