import { Request, Response } from 'express';
import MakerChecker from '@src/models/maker-checker.model';

export const listByVendor = async (
  req: Request,
  res: Response
): Promise<void> => {
  const transactions = await Transaction.find({ vendor: req.params.vendorId })
    .sort({ createdAt: -1 })
    .lean();

  res.json({
    status: true,
    data: transactions,
    message: 'Retrieved successfully',
  });
};

export const listBy = async (req: Request, res: Response): Promise<void> => {
  const transactions = await Transaction.find({ vendor: req.params.vendorId })
    .sort({ createdAt: -1 })
    .lean();

  res.json({
    status: true,
    data: transactions,
    message: 'Retrieved successfully',
  });
};
