import { MongoDataSource } from 'apollo-datasource-mongodb';
import { Types } from 'mongoose';
import { ICartDocument } from '@src/models/cart.model';
import { IContext } from '@src/graphql/context';

export default class Carts extends MongoDataSource<ICartDocument, IContext> {
  getCart(id: Types.ObjectId): Promise<ICartDocument | null | undefined> {
    return this.findOneById(id);
  }
}
