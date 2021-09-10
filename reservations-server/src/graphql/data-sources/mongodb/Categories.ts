/* eslint-disable @typescript-eslint/no-explicit-any */
import { MongoDataSource } from 'apollo-datasource-mongodb';
import { Query, Types } from 'mongoose';
import { ICategoryDocument } from '@src/models/category.model';
import { IContext } from '@src/graphql/context';

export default class Categories extends MongoDataSource<
  ICategoryDocument,
  IContext
> {
  getCategory(
    id: Types.ObjectId
  ): Promise<ICategoryDocument | null | undefined> {
    return this.findOneById(id);
  }

  getCategories(): Query<ICategoryDocument[], ICategoryDocument, any> {
    return this.model.find();
  }
}
