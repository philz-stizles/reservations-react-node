import { Request, Response } from 'express'
import {
  BadRequestError,
  NotFoundError,
} from '@devdezyn/hospitality-app-common'
import Room from '@src/models/room.model'
import { RoomCreatedProducer } from '@src/events/producers/room-created-producer'
import { kafkaWrapper } from '@src/kafka-wrapper'

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { room_type, hourly_rate, weekday_percent, weekend_percent } =
      req.body
    const createdRoom = await new Room({
      room_type,
      hourly_rate,
      weekday_percent,
      weekend_percent,
    }).save()

    await new RoomCreatedProducer(kafkaWrapper.client).produce({
      id: createdRoom._id,
      version: weekday_percent,
      title: room_type,
      price: hourly_rate,
      userId: room_type,
    })

    res.status(201).json({
      status: true,
      data: createdRoom,
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
    const rooms = await Room.find({})

    res.json({
      status: true,
      data: rooms,
      message: 'Retrieved successfully',
    })
  } catch (err) {
    console.log(err)
  }
}

export const read = async (req: Request, res: Response): Promise<void> => {
  try {
    const existingRoom = await Room.findById(req.params.id)
    if (!existingRoom) {
      throw new NotFoundError()
    }

    res.json({
      status: true,
      data: existingRoom,
      message: 'Retrieved successfully',
    })
  } catch (err) {
    console.log(err)
  }
}

export const update = async (req: Request, res: Response): Promise<void> => {
  const updated = await Room.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.json({
    status: true,
    data: updated,
    message: 'Updated successfully',
  })
}

export const remove = async (req: Request, res: Response): Promise<void> => {
  const removed = await Room.findByIdAndRemove(req.params.id)

  res.json({
    status: true,
    data: removed,
    message: 'Deleted successfully',
  })
}
