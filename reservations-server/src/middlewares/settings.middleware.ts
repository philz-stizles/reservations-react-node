import { Request, Response, NextFunction } from 'express';

export const setCreat = (req: Request, res: Response, next: NextFunction) => {
  next();
};
