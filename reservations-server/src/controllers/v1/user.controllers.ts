/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';
import User from '@src/models/user.model';
import {
  filterRequestBody,
  createAndSendTokenWithCookie,
} from '../../utils/api.utils';
import AppError from '../../errors/app.error';
import { generateToken } from '../../utils/auth.utils';
import { IAuthRequest } from '@src/interfaces/AuthRequest';
import Address from '@src/models/address.model';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { firstName, lastName, username, email, password, confirmPassword } =
    req.body;

  try {
    const newUser = await User.create({
      firstName,
      lastName,
      username,
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
  const updatedUser = await User.update(filteredBody, {
    where: { id: req.user.id },
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
  await User.update({ isActive: false }, { where: { id: req.user.id } });

  res.status(204).json({ status: true, data: null });
};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  // Check if user exists - Find the user by id
  const existingUser = await User.findOne({ where: { id: req.user.id } });
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

export const getCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const existingUser = await User.findOne({
      where: { email: req.user.email },
    });
    if (!existingUser) throw new Error('User does not exist');

    res.json(existingUser);
  } catch (error: any | null) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const saveUserAddress = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const existingUser = await User.findOne({
      where: { email: req.user.email },
    });
    if (!existingUser) throw new Error('User does not exist');

    // const addresses = await existingUser.getAddresses();
    // addresses.findByPk(req.params.addressId);
    await Address.update(req.body, {
      where: { userId: req.user.id, id: req.params.addressId },
    });

    res.json(existingUser);
  } catch (error: any | null) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

// export const getAllOrders = async (
//   _req: Request,
//   res: Response
// ): Promise<void> => {
//   const allOrders: OrderDocument[] = await Order.find({})
//     .sort('-createdAt')
//     .populate('products.product')
//     .exec();

//   res.json(allOrders);
// };

export const updateReservationStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.json({ msg: 'updated' });
};

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log('getAllUsers');
  try {
    const users = await User.findAll({
      attributes: [
        'firstName',
        'lastName',
        'email',
        'createdAt',
        'avatar',
        'primaryAddress',
      ],
      include: 'addresses',
    });

    res.json({ status: true, data: users });
  } catch (error: any | null) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  res.json({ msg: 'updated' });
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.json({ msg: 'updated' });
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.json({ msg: 'updated' });
};

// MIDDLEWARES
export const getMe = async (req: Request, next: NextFunction): Promise<any> => {
  req.params.id = req.user.id;
  next();
};
