import { Request, Response, NextFunction } from 'express';
import HttpException from '../common/http.exception';

const errorHandler = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const status = error.statusCode || error.status || 500;

  res.status(status).send(error);
};

export default errorHandler;
