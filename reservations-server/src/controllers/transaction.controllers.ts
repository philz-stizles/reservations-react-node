import { Request, Response } from 'express';
import Transaction from '@src/models/transaction.model';

export const list = async (req: Request, res: Response): Promise<void> => {
  const transactions = await Transaction.find({})
    .sort({ createdAt: -1 })
    .lean();

  res.json({
    status: true,
    data: transactions,
    message: 'Retrieved successfully',
  });
};

export const listByCustomer = async (
  req: Request,
  res: Response
): Promise<void> => {
  const transactions = await Transaction.find({ createdBy: req.user.id })
    .sort({ createdAt: -1 })
    .lean();

  res.json({
    status: true,
    data: transactions,
    message: 'Retrieved successfully',
  });
};

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
