/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';
import User from '../models/user.model.old';
import {
  filterRequestBody,
  createAndSendTokenWithCookie,
} from '../utils/api.utils';
import AppError from '../errors/app.error';
import { generateToken } from '../utils/auth.utils';
import * as factory from '../factories/handler.factory';
import { IAuthRequest } from '@src/interfaces/AuthRequest';
import Order, { OrderDocument } from '../models/order.model';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    const newUser = await User.create({
      name,
      email,
      password,
      confirmPassword,
    });

    const token = generateToken(newUser);

    return res.status(201).json({
      status: true,
      data: {
        user: _.omit(newUser, 'password'), // newUser.toJSON()
        token,
      },
      message: 'created successfully',
    });
  } catch (error: any) {
    return next(error);
  }
};

export const createOrUpdate = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, avatar, email } = req.user;
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { name, avatar },
      { new: true }
    );

    if (user) {
      console.log('USER UPDATED', user);
      res.json(user);
    } else {
      const newUser = await new User({
        email,
        name: email.split('@')[0],
        avatar,
      }).save();
      console.log('USER CREATED', newUser);
      res.json(newUser);
    }
  } catch (error: any) {
    console.log(error.message);
  }
};

export const updateMe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  // Check that password is not being updated here
  if (req.body.password || req.body.confirmPassword) {
    return next(new AppError('You cannot update passwords', 400));
  }

  const filteredBody = filterRequestBody(req.body, 'name', 'email');

  // Check if a file was uploaded
  if (req.file) {
    filteredBody.photo = req.file.filename;
  }

  // We use User.findByIdAndUpdate() now since we are not updating password and thus do not require validations
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  return res.json({
    status: true,
    data: updatedUser,
    message: 'Updated successfully',
  });
};

export const deleteMe = async (
  req: IAuthRequest,
  res: Response
): Promise<void | Response> => {
  await User.findByIdAndUpdate(req.user._id, { isActive: false });

  res.status(204).json({ status: true, data: null });
};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  // Check if user exists - Find the user by id
  const existingUser = await User.findById(req.user.id).select('+password');
  if (!existingUser) return next(new AppError('user invalid', 400));

  // Verify current password
  if (!(await existingUser.comparePassword(req.body.currentPassword))) {
    return next(new AppError('Your current password is wrong', 401));
  }

  // set new password
  existingUser.password = req.body.password;
  existingUser.confirmPassword = req.body.confirmPassword;
  await existingUser.save();
  // User.findByIdAndUpdate will not work as intended if used here

  // Generate token and respond to API request
  return createAndSendTokenWithCookie(
    existingUser,
    200,
    req,
    res,
    'Password changed successfully'
  );
};

// USING HANDLER FACTORY
export const getAllUsers = factory.getAll(User);
export const getUser = factory.getOne(User);
export const updateUser = factory.updateOne(User);
export const deleteUser = factory.deleteOne(User);

export const getCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  User.findOne({ email: req.user.email }).exec((error, existingUser) => {
    console.log(error, existingUser);
    if (error || !existingUser) throw new Error(error?.message);

    res.json(existingUser);
  });
};

export const saveUserAddress = async (
  req: Request,
  res: Response
): Promise<void> => {
  await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.address }
  ).exec();

  res.json({ ok: true });
};

export const addToWishlist = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { productId } = req.body;

  await User.findOneAndUpdate(
    { email: req.user.email },
    { $addToSet: { wishlist: productId } } // This will manage duplicate
  ).exec();

  res.json({ ok: true });
};

export const wishlist = async (req: Request, res: Response): Promise<void> => {
  const userWishList = await User.findOne({ email: req.user.email })
    .select('wishlist')
    .populate('wishlist')
    .exec();

  res.json(userWishList);
};

export const removeFromWishlist = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  const { productId } = req.params;
  await User.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { wishlist: productId } }
  ).exec();

  res.json({ ok: true });
};

export const getAllOrders = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const allOrders: OrderDocument[] = await Order.find({})
    .sort('-createdAt')
    .populate('products.product')
    .exec();

  res.json(allOrders);
};

export const updateOrderStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { orderId, orderStatus } = req.body;

  const updated: OrderDocument | null = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus },
    { new: true }
  ).exec();

  res.json(updated);
};

// MIDDLEWARES
export const getMe = async (req: Request, next: NextFunction): Promise<any> => {
  req.params.id = req.user.id;
  next();
};
