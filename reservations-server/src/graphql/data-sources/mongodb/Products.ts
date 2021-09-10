/* eslint-disable new-cap */
import { MongoDataSource } from 'apollo-datasource-mongodb';
import { ApolloError } from 'apollo-server-express';
import { IContext } from '@src/graphql/context';
import Product, { IProductDocument } from '@src/models/product.model';
import {
  IProductCreate,
  IProductUpdate,
} from '@src/graphql/resolvers/product.resolvers';

export class Products extends MongoDataSource<IProductDocument, IContext> {
  async getById(id: string): Promise<IProductDocument | null | undefined> {
    return await this.model.findById(id);
  }

  async list(): Promise<IProductDocument[]> {
    return await this.model.find({});
  }

  async create(newProduct: IProductCreate): Promise<IProductDocument> {
    // console.log(newProduct);
    const createdProduct = await new this.model(newProduct).save();
    return createdProduct;
  }

  async update(updatedProduct: IProductUpdate): Promise<IProductDocument> {
    const {
      _id,
      title,
      description,
      price,
      category,
      subs,
      quantity,
      shipping,
      color,
      brand,
    } = updatedProduct;
    const modifiedProduct = await this.model.findByIdAndUpdate(
      _id,
      {
        title,
        description,
        price,
        category,
        subs,
        quantity,
        shipping,
        color,
        brand,
      },
      { new: true }
    );
    if (!modifiedProduct) {
      throw new ApolloError('Product does not exist', '404', {});
    }
    return modifiedProduct;
  }

  async archive(id: string): Promise<IProductDocument> {
    const modifiedProduct = await this.model.findByIdAndUpdate(
      id,
      {
        isActive: false,
      },
      { new: true }
    );
    if (!modifiedProduct) {
      throw new ApolloError('Product does not exist', '404', {});
    }
    return modifiedProduct;
  }
}

export default new Products(Product);
