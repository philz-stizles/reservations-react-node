/* eslint-disable new-cap */
import { MongoDataSource } from 'apollo-datasource-mongodb';
import { ApolloError } from 'apollo-server-express';
import { Types } from 'mongoose';
import { IContext } from '@src/graphql/context';
import User, { IUserDocument } from '@src/models/user.model.old';
import {
  ILoggedInUser,
  ILoginCredentials,
  ISignupCredentials,
} from '@src/graphql/interfaces';
import { generateToken } from '@src/utils/auth.utils';

export class Users extends MongoDataSource<IUserDocument, IContext> {
  async getUser(id: string): Promise<IUserDocument | null | undefined> {
    return await this.model.findById(id);
  }

  async create(newUser: ISignupCredentials): Promise<IUserDocument> {
    const createdUser = await new this.model(newUser).save();
    return createdUser;
  }

  async findByEmail(email: string): Promise<IUserDocument | null> {
    const existingUser = await this.model.findOne({ email });
    return existingUser;
  }

  async login(credentials: ILoginCredentials): Promise<ILoggedInUser | null> {
    // Verify user email
    const existingUser = await this.model
      .findOne({ email: credentials.email })
      .select('+password');
    if (!existingUser) {
      throw new ApolloError('Email or password invalid', '400', {});
    }

    // Verify user password
    const isValid = await existingUser.comparePassword(credentials.password);
    if (!isValid) {
      throw new ApolloError('Email or password invalid', '400', {});
    }

    // Generate tokens
    const { _id, fullname, email, roles } = existingUser;
    const token = generateToken({ _id, email, roles });

    return {
      _id,
      fullname,
      email,
      token,
    };
  }
  // async getPrivateUserData(userId): Promise<any> {
  //   const isAuthorized = this.context.currentUserId === userId;
  //   if (isAuthorized) {
  //     const user = await this.findOneById(userId);
  //     return user && user.privateData;
  //   }
  // }
}

export default new Users(User);
