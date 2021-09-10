/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILoginResponse, ISignupResponse } from '../interfaces';

export const authMutations = {
  signup: async (
    _parent: any,
    args: any,
    context: any
  ): Promise<ISignupResponse> => {
    const { fullname, username, email, password } = args.credentials;
    const createdUser = await context.dataSources.users.create({
      fullname,
      username,
      email,
      password,
    });
    console.log(createdUser);
    return {
      code: '201',
      message: 'Signup successful',
      success: true,
      data: createdUser,
    };
  },
  login: async (
    _parent: any,
    args: any,
    context: any
  ): Promise<ILoginResponse> => {
    const loggedInUser = await context.dataSources.users.login(
      args.credentials
    );
    return {
      code: '200',
      message: 'Login successful',
      success: true,
      data: loggedInUser,
    };
  },
};

export const authQueries = {};
