// import { ICategoryDocument } from '@src/models/category.model';
// import { Query } from 'mongoose';

export default {
  categories(_category: any, _args: any, context: any): any {
    return context.dataSources.categories.getCategories();
  },
};
