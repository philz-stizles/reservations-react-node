// import { ICategoryDocument } from '@src/models/category.model';
// import { Query } from 'mongoose';

export default {
  categories(_category: any, _args: any, context: any): any {
    const { isAuthenticated } = context;
    console.log('isAuthenticated', isAuthenticated);
    return context.dataSources.categories.getCategories();
  },
};
