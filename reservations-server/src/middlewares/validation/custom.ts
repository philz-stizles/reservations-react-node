import { NextFunction, Request, Response } from 'express';
import AppError from '../../errors/app.error';

export const signupValidator = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const { email, name, password, confirmPassword } = req.body;
  if (!email || !name || !password || !confirmPassword)
    return next(new AppError('Please fill all the required fields', 400));

  return next();
};

export const loginValidator = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError('Please provide an email and a password', 400));

  return next();
};
