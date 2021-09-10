import create from './create';
import list from './list';
import read from './read';
import update from './update';

export default {
  '/products': {
    ...create,
    ...list,
  },
  '/products/{slug}': {
    ...read,
  },
  '/products/{id}': {
    ...update,
  },
};
