import { ICouponDocument } from '@src/models/coupon.model';
import { IUserDocument } from '@src/models/user.model.old';

export interface MutationResponse {
  code: string;
  success: boolean;
  message: string;
}

export interface IUserToken {
  token: string;
}

export interface ISignupCredentials {
  fullname: string;
  username: string;
  email: string;
  password: string;
}

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IResponse {
  statusCode: number;
  status: boolean;
  message: string;
}

export interface ISignupResponse {
  code: string;
  success: boolean;
  message: string;
  data: IUserDocument;
}

export interface ILoggedInUser {
  _id: string;
  fullname: string;
  email: string;
  token: string;
}

export interface ILoginResponse {
  code: string;
  success: boolean;
  message: string;
  data: ILoggedInUser;
}

export interface ICouponCreate {
  name: string;
  expiry: Date;
  discount: number;
}

export interface ICouponUpdate {
  _id: string;
  expiry: Date;
  discount: number;
}

export interface ICouponResponse extends IResponse {
  data: ICouponDocument;
}

export interface IUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: any;
}

export interface IFile {
  filename: string;
  mimetype: string;
  encoding: string;
}
