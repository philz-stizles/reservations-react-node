import { Request, Response } from 'express';
import NotFoundError from '@src/errors/not-found';
import Room from '@src/models/room.model';

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roomType, hourlyRate, weekdayPercent, weekendPercent, isActive } =
      req.body;
    const createdRoom = await Room.build({
      roomType,
      hourlyRate,
      weekdayPercent,
      weekendPercent,
      createdBy: req.user.id,
      isArchived: isActive,
    }).save();

    res.status(201).json({
      status: true,
      data: createdRoom,
      message: 'Created successfully',
    });
  } catch (error: any | unknown) {
    console.error(error.message);
    throw error;
  }
};

export const list = async (req: Request, res: Response): Promise<void> => {
  try {
    const rooms = await Room.findAll({ where: { isArchived: false } });

    res.json({
      status: true,
      data: rooms,
      message: 'Retrieved successfully',
    });
  } catch (err) {
    console.log(err);
  }
};

export const read = async (req: Request, res: Response): Promise<void> => {
  try {
    const existingRoom = await Room.findByPk(req.params.id);
    if (!existingRoom) {
      throw new NotFoundError('Room was not found');
    }

    res.json({
      status: true,
      data: existingRoom,
      message: 'Retrieved successfully',
    });
  } catch (err: any | unknown) {
    console.log(err.message);
    throw err;
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await Room.update(req.body, {
      where: { id: req.params.id },
    });

    res.json({
      status: true,
      data: updated,
      message: 'Updated successfully',
    });
  } catch (error: any | unknown) {
    console.log(error.message);
    res.json({
      status: false,
      message: 'Cannot update room at this time, please try again later',
    });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  const removed = await Room.update(
    { isArchived: true },
    { where: { id: req.params.id } }
  );

  res.json({
    status: true,
    data: removed,
    message: 'Deleted successfully',
  });
};
