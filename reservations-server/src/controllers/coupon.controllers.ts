import { Request, Response } from 'express';
import Coupon from '@src/models/coupon.model';

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, expiry, discount } = req.body;
    const newCoupon = await new Coupon({ name, expiry, discount }).save();
    res.status(201).json({
      status: true,
      data: newCoupon,
      message: 'Created successfully',
    });
  } catch (err: any) {
    console.log('CREATE COUPON ERR', err.message);
    res.status(400).send('Create category failed');
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    await Coupon.findByIdAndDelete(req.params.couponId).exec();
    res.status(201).json({
      status: true,
      message: 'Deleted successfully',
    });
  } catch (err: any) {
    console.log(err.message);
  }
};

export const list = async (req: Request, res: Response): Promise<void> => {
  const coupons = await Coupon.find({}).sort({ createdAt: -1 }).exec();
  try {
    res.json({
      status: true,
      data: coupons,
      message: 'Retrieved successfully',
    });
  } catch (err: any) {
    console.log(err.message);
  }
};
