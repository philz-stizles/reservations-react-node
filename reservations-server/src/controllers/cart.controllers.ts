import { Request, Response } from 'express';
import User from '@src/models/user.model.old';
import Product from '@src/models/product.model';
import Cart, { ICartProduct } from '@src/models/cart.model';
import Coupon from '@src/models/coupon.model';

export const addUserCart = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { cart: newCart } = req.body;
  const { email } = req.user;

  const existingUser = await User.findOne({ email }).exec();
  if (!existingUser) {
    return res
      .status(401)
      .json({ status: false, message: 'Unauthorized access' });
  }

  // If cart for current logged-in user instance exists, remove and replace with new cart
  const existingCart = await Cart.findOne({
    orderedBy: existingUser._id,
  }).exec();
  if (existingCart) {
    existingCart.remove();
    console.log('removed old cart');
  }

  // Process products
  const products = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < newCart.length; i++) {
    const { _id, count, color } = newCart[i];
    // get current products price
    // eslint-disable-next-line no-await-in-loop
    const existingProduct = await Product.findById(_id).select('price').exec();
    if (!existingProduct) {
      return res.status(400).json({
        status: false,
        message:
          'A product in your shopping cart no longer exists. Please remove and try again',
      });
    }
    const cartProduct: ICartProduct = {
      product: _id,
      count,
      color,
      price: existingProduct.price,
    };

    // Add to products
    products.push(cartProduct);
  }

  // Process cart total
  let totalAmount = 0;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < products.length; i++) {
    totalAmount += products[i].price * products[i].count;
  }

  const savedCart = await new Cart({
    products,
    totalAmount,
    orderedBy: existingUser._id,
  }).save();

  console.log('new cart ----> ', savedCart);
  return res.json({ ok: true });
};

export const getUserCart = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  const existingUser = await User.findOne({ email: req.user.email }).exec();
  if (!existingUser) {
    return res
      .status(401)
      .json({ status: false, message: 'Unauthorized access' });
  }

  // Get any cart ordered by retrieved user
  const existingCart = await Cart.findOne({ orderedBy: existingUser._id })
    .populate('products.product', '_id title count price totalAfterDiscount')
    .exec();
  if (!existingCart) {
    return res.status(404).json({ status: false, message: 'No cart found' });
  }

  const { products, totalAmount, totalAfterDiscount } = existingCart;
  return res.json({ products, totalAmount, totalAfterDiscount });
};

export const emptyUserCart = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const existingUser = await User.findOne({ email: req.user.email }).exec();
  if (!existingUser) {
    return res
      .status(401)
      .json({ status: false, message: 'Unauthorized access' });
  }

  // Delete any cart ordered by retrieved user
  const cart = await Cart.findOneAndRemove({
    orderedBy: existingUser._id,
  }).exec();
  return res.json(cart);
};

export const applyCouponToUserCart = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { coupon } = req.body;

  // Validate coupon
  const validCoupon = await Coupon.findOne({ name: coupon }).exec();
  if (!validCoupon) {
    return res.json({ err: 'Invalid coupon' });
  }

  // Get user to retrieve user._id from DB, firebase auth middlware may not have your db _id
  const existingUser = await User.findOne({ email: req.user.email }).exec();
  if (!existingUser) {
    return res
      .status(401)
      .json({ status: false, message: 'Unauthorized access' });
  }

  const existingCart = await Cart.findOne({ orderedBy: existingUser._id })
    .populate('products.product', '_id title price')
    .exec();
  if (!existingCart) {
    return res.status(404).json({ status: false, message: 'No cart found' });
  }

  const { totalAmount } = existingCart;

  console.log('totalAmount', totalAmount, 'discount%', validCoupon.discount);

  // calculate the total after discount
  const totalAfterDiscount = +(
    totalAmount -
    (totalAmount * validCoupon.discount) / 100
  ).toFixed(2); // 99.99

  Cart.findOneAndUpdate(
    { orderedBy: existingUser._id },
    { totalAfterDiscount },
    { new: true }
  );

  return res.json(totalAfterDiscount);
};
