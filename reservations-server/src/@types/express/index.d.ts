import { IUserDocument } from '@src/models/user.model.old';

declare global {
  namespace Express {
    interface Request {
      user: IUserDocument;
      file: any;
    }
  }
}

declare global {
  namespace NodeJS {
    interface Global {
      __basedir: string;
    }
  }
}
