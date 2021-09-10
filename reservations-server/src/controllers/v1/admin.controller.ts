import { Request, Response } from 'express'
import { FilterQuery } from 'mongoose'
import {
  BadRequestError,
  NotFoundError,
} from '@devdezyn/hospitality-app-common'
import Reservation, {
  IReservationDocument,
} from '../../models/reservation.model'
// import Room from '@src/models/room.model'
import { addHoursToDate } from '../../utils/date.utils'

export const calcOverstayByReservation = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { reservationId } = req.query

  // Check if reservation id query param is undefined
  if (!reservationId) {
    throw new BadRequestError('Reservation id is required')
  }

  // Check if reservation exists
  const existingReservation = await Reservation.findById(reservationId)
  if (!existingReservation) {
    throw new NotFoundError()
  }

  const {
    customer,
    room_type,
    expected_checkout_time,
    weekday_percent,
    weekend_percent,
  } = existingReservation

  // Check if room exists
  // const existingRoom = await Room.findOne({
  //   room_type,
  // })
  // if (!existingRoom) {
  //   throw new NotFoundError()
  // }

  // Extract week daily rates from room
  // const { weekday_percent, weekend_percent } = existingRoom

  const now = new Date()
  const expectedCheckout = new Date(expected_checkout_time)

  // Initialize overdue fee
  let overdueFee = 0

  if (now.getTime() <= expectedCheckout.getTime()) {
    return res.json({
      status: true,
      data: {
        customer,
        overdue_fee: overdueFee,
        extra_hours: 0,
        expected_checkout_time,
        hours_left: (expectedCheckout.getTime() - now.getTime()) / 3600000,
      },
      message: 'Reservation is still active',
    })
  } else {
    // Calculate number of overdue hours since expected checkout
    const overdueHours = Math.ceil(
      (now.getTime() - expectedCheckout.getTime()) / 3600000
    )

    // Initialize current overstayed date to equal expected checkout date
    let currentOverstayedDate = expectedCheckout

    // Initialize weekends where 0 is Sunday and 6 is Saturday
    // 0 = Sun | 1 = Mon |  2 = Tues | 3 = Wed | 4 = Thur | 5 = Fri | 6 = Sat
    const weekends = [0, 6]

    // Calculate fee per hour overstayed
    for (let hr = overdueHours; hr > 0; hr--) {
      // initialize current hour fee
      let currentHourFee = 0

      // add hour to current overstayed date
      currentOverstayedDate = addHoursToDate(currentOverstayedDate, 1)

      // check the day of the week
      const dayOfWeek = currentOverstayedDate.getDay()

      // make calculations based on the day of the week
      if (weekends.includes(dayOfWeek)) {
        currentHourFee =
          existingReservation.hourly_rate * (weekend_percent / 100)
      } else {
        currentHourFee =
          existingReservation.hourly_rate * (weekday_percent / 100)
      }

      // add to grand total
      overdueFee += currentHourFee
    }

    return res.json({
      status: true,
      data: {
        customer,
        extra_hours: overdueHours,
        overdue_fee: overdueFee,
      },
      message: 'Reservation over-stay fee retrieved successfully',
    })
  }
}

export const calcOverstayByCustomer = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { customerId } = req.query

  // Check if customer id query param is undefined
  if (!customerId) {
    throw new BadRequestError('Customer id is required')
  }

  const parsed_customer_id = parseInt(customerId as string)

  // Check if customer id query param is not a number
  if (isNaN(parsed_customer_id)) {
    throw new BadRequestError('Customer id must be a number')
  }

  const filter: FilterQuery<IReservationDocument> = {
    customer_id: parsed_customer_id,
  }
  // Check if reservation exists
  const customerReservations = await Reservation.find(filter)

  let total_overdue_hours = 0
  let total_overdue_fee = 0
  const customerReservationDetails: any = []

  for (const reservation of customerReservations) {
    const {
      room_type,
      weekday_percent,
      weekend_percent,
      expected_checkout_time,
      _id,
    } = reservation

    // Check if room exists
    // const existingRoom = await Room.findOne({
    //   room_type,
    // })
    // if (!existingRoom) {
    //   continue
    // }

    // const { weekday_percent, weekend_percent } = existingRoom

    const now = new Date()
    const expectedCheckout = new Date(expected_checkout_time)
    let overdueHours = 0
    let overdueFee = 0

    if (now.getTime() <= expectedCheckout.getTime()) {
      customerReservationDetails.push({
        reservation_id: _id,
        overdueHours,
        overdueFee,
      })
      continue
    } else {
      overdueHours = Math.ceil(
        (now.getTime() - expectedCheckout.getTime()) / 3600000
      )

      let currentOverstayedDate = expectedCheckout

      const weekends = [0, 6]

      // for each hour
      for (let hr = overdueHours; hr > 0; hr--) {
        // initialize current hour fee
        let currentHourFee = 0

        // add hour to current overstayed date
        currentOverstayedDate = addHoursToDate(currentOverstayedDate, 1)

        // check the day of the week
        const dayOfWeek = currentOverstayedDate.getDay()

        // make calculations based on the day of the week
        if (weekends.includes(dayOfWeek)) {
          currentHourFee = reservation.hourly_rate * (weekend_percent / 100)
        } else {
          currentHourFee = reservation.hourly_rate * (weekday_percent / 100)
        }

        // add to grand total
        overdueFee += currentHourFee
      }

      total_overdue_hours += overdueHours
      total_overdue_fee += overdueFee

      customerReservationDetails.push({
        reservation_id: _id,
        overdueHours,
        overdueFee,
      })
    }
  }

  res.json({
    status: true,
    data: {
      customer_id: parsed_customer_id,
      total_overdue_hours,
      total_overdue_fee,
      summary: customerReservationDetails,
    },
    message: 'Customer over-stay fee retrieved successfully',
  })
}
