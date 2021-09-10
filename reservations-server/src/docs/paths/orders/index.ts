import create from './create';
import list from './list';
import read from './read';
import update from './update';

export default {
  '/categories': {
    ...create,
    ...list,
  },
  '/categories/{slug}': {
    ...read,
    ...update,
  },
};
