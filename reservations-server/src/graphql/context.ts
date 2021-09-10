import { ExpressContext } from 'apollo-server-express';
import { IUserDocument } from '@src/models/user.model.old';
import { IJWTokenPayload } from '@src/interfaces/JsonWebToken';
import { verifyToken } from '@src/utils/auth.utils';
import console from 'console';
import UserStore from '@src/graphql/data-sources/mongodb/Users';

export interface IContext {
  user: IUserDocument | null;
  isAuthenticated: boolean;
}

const context = async ({
  req,
  connection,
}: ExpressContext): Promise<IContext> => {
  // Note: This example uses the `req` argument to access headers,
  // but the arguments received by `context` vary by integration.
  // This means they vary for Express, Koa, Lambda, etc.
  //
  // To find out the correct arguments for a specific integration,
  // see https://www.apollographql.com/docs/apollo-server/api/apollo-server/#middleware-specific-context-fields

  // Check if Authorization header exists

  try {
    const authHeader = req.headers.authorization || '';
    // const authHeader = req.get('Authorization');
    if (!authHeader) {
      // throw new AuthenticationError('you must be logged in');
      console.log('isAuthenticated', false);
      return { isAuthenticated: false, user: null };
    }

    // get the user token from the headers
    const token = authHeader.split(' ')[1];

    // Verify token
    const decodedToken: IJWTokenPayload | undefined = await verifyToken(token);

    if (!decodedToken) {
      // throw new AuthenticationError('you must be logged in');
      console.log('isAuthenticated', false);
      return { isAuthenticated: false, user: null };
    }

    // try to retrieve a user with the token
    const user = await UserStore.getUser(decodedToken._id);

    if (!user) {
      // throw new AuthenticationError('Please register to complete this process');
      return { isAuthenticated: false, user: null };
    }

    // we could also check user roles/permissions here

    // optionally block the user

    // add auth properties(e.g isAuthenticated, user etc) to the context
    console.log('isAuthenticated', true);
    return { isAuthenticated: true, user };
  } catch (error: any | unknown) {
    console.log(error.message);
    // throw new AuthenticationError(error.message);
    console.log('isAuthenticated', false);
    return { isAuthenticated: false, user: null };
  }
};

export default context;
