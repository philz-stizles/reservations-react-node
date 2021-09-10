import { Request, Response } from 'express';
// Models
import User from '@src/models/user.model.old';
import Product from '@src/models/product.model';
import Cart from '@src/models/cart.model';
import Order from '@src/models/order.model';

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { paymentIntent } = req.body.stripeResponse;

  const existingUser = await User.findOne({ email: req.user.email }).exec();
  if (!existingUser) {
    return res
      .status(401)
      .json({ status: false, message: 'Unauthorized access' });
  }

  const existingCart = await Cart.findOne({
    orderedBy: existingUser._id,
  }).exec();
  if (!existingCart) {
    return res.status(404).json({ status: false, message: 'No cart found' });
  }

  const { products } = existingCart;

  const newOrder = await new Order({
    products,
    paymentIntent,
    orderedBy: existingUser._id,
  }).save();

  // decrement quantity, increment sold
  const bulkOption = products.map(item => {
    return {
      updateOne: {
        filter: { _id: item.product._id }, // IMPORTANT item.product
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  const updated = await Product.bulkWrite(bulkOption, {});
  console.log('PRODUCT QUANTITY-- AND SOLD++', updated);

  console.log('NEW ORDER SAVED', newOrder);
  return res.status(201).json({ ok: true });
};

export const listByUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const existingUser = await User.findOne({ email: req.user.email }).exec();
  if (!existingUser) {
    return res
      .status(401)
      .json({ status: false, message: 'Unauthorized access' });
  }

  const orders = await Order.find({ orderedBy: existingUser._id })
    .populate('products.product')
    .exec();

  return res.json(orders);
};
