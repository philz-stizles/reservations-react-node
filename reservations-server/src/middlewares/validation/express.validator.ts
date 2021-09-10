import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import AppError from '@src/errors/app.error';

export const categoryValidator = [
  body('name').not().isEmpty().withMessage('Name is required'),
];

const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError('Invalid input', 400);
  }

  next();
};

export default validateRequest;
