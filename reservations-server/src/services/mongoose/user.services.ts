import { DocumentDefinition, FilterQuery, LeanDocument } from 'mongoose';
import { omit } from 'lodash';
import User, { IUserDocument } from '@src/models/mongoose/user.model';

export const createUser = async (
  modelObject: DocumentDefinition<IUserDocument>
): Promise<IUserDocument> => {
  try {
    return await User.create(modelObject);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const findUser = async (
  query: FilterQuery<IUserDocument>
): Promise<LeanDocument<IUserDocument> | null> => {
  // If you're executing a query and sending the results without modification to, say, an Express response,
  // you should use lean.In general, if you do not modify the query results and do not use custom getters,
  // you should use lean(). If you modify the query results or rely on features like getters or transforms,
  // you should not use lean().
  return User.findOne(query).lean();
};

export const validatePassword = async ({
  email,
  password,
}: {
  email: IUserDocument['email'];
  password: string;
}): Promise<false | Pick<LeanDocument<IUserDocument>, 'name'>> => {
  const user = await User.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return false;
  }

  return omit(user.toJSON(), 'password');
};
