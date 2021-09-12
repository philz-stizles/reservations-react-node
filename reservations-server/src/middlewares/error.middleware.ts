import { Request, Response, NextFunction } from 'express';
import HttpException from '@src/errors/http.exception';

const errorHandler = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> | void => {
  const status = error.statusCode || 500;

  return res.status(status).send(error);
};

export default errorHandler;
