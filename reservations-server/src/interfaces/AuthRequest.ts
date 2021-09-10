import { Request } from 'express';
import { IUserDocument } from '@src/models/user.model.old';

export interface IAuthRequest extends Request {
  user: IUserDocument;
}
