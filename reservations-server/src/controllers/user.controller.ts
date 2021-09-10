import { Request, Response } from 'express'
import {
  BadRequestError,
  NotFoundError,
} from '@devdezyn/hospitality-app-common'
import User from '@src/models/user.model'

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { User_type, hourly_rate, weekday_percent, weekend_percent } =
      req.body
    const createdUser = await new User({
      User_type,
      hourly_rate,
      weekday_percent,
      weekend_percent,
    }).save()

    res.status(201).json({
      status: true,
      data: createdUser,
      message: 'Created successfully',
    })
  } catch (error) {
    console.error(error.message)
    if (error.code === 11000) {
      throw new BadRequestError(`Duplicate ${Object.keys(error.keyValue)[0]}`)
    } else {
      throw error
    }
  }
}

export const list = async (req: Request, res: Response): Promise<void> => {
  try {
    const Users = await User.find({})

    res.json({
      status: true,
      data: Users,
      message: 'Retrieved successfully',
    })
  } catch (err) {
    console.log(err)
  }
}

export const read = async (req: Request, res: Response): Promise<void> => {
  try {
    const existingUser = await User.findById(req.params.id)
    if (!existingUser) {
      throw new NotFoundError()
    }

    res.json({
      status: true,
      data: existingUser,
      message: 'Retrieved successfully',
    })
  } catch (err) {
    console.log(err)
  }
}

export const update = async (req: Request, res: Response): Promise<void> => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.json({
    status: true,
    data: updated,
    message: 'Updated successfully',
  })
}

export const remove = async (req: Request, res: Response): Promise<void> => {
  const removed = await User.findByIdAndRemove(req.params.id)

  res.json({
    status: true,
    data: removed,
    message: 'Deleted successfully',
  })
}

export const listPublicProfiles = async (
  req: Request,
  res: Response
): Promise<void> => {}

export const listPrivateProfiles = async (
  req: Request,
  res: Response
): Promise<void> => {
  const users = await User.find({})

  res.json({
    status: true,
    data: users,
    message: 'Retrieved successfully',
  })
}
