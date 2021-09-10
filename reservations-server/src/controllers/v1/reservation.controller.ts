import { Request, Response } from 'express';
import Reservation from '../../models/reservation.model';
import { NotFoundError } from '@devdezyn/hospitality-app-common';

export const create = async (req: Request, res: Response): Promise<void> => {
  const { expected_checkin_time, expected_checkout_time, room_id } = req.body;

  // Check if room exists
  // const existingRoom = await Room.findById(room_id)
  // if (!existingRoom) {
  //   throw new NotFoundError()
  // }

  const createdReservation = await Reservation.build({
    customer: req.currentUser?.id,
    expected_checkin_time,
    expected_checkout_time,
    // room_type: existingRoom.room_type,
    // hourly_rate: existingRoom.hourly_rate,
  }).save();

  res.status(201).json({
    status: true,
    data: createdReservation,
    message: 'Created successfully',
  });
};

export const list = async (req: Request, res: Response): Promise<void> => {
  const reservations = await Reservation.find({
    customer: req.currentUser?.id,
  });

  res.json({
    status: true,
    data: reservations,
    message: 'Retrieved successfully',
  });
};

export const read = async (req: Request, res: Response): Promise<void> => {
  const existingReservation = await Reservation.findOne({
    _id: req.params.id,
    customer: req.currentUser?.id,
  });
  if (!existingReservation) {
    throw new NotFoundError();
  }

  res.json({
    status: true,
    data: existingReservation,
    message: 'Retrieved successfully',
  });
};

export const cancel = async (req: Request, res: Response): Promise<void> => {};
