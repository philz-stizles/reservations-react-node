// import { IReservationDocument } from '../models/reservation.model'
// // import { IRoomDocument } from '../models/room.model'
// import { addHoursToDate } from './date.utils'

// export const calculateHourlyFee = (
//   currentOverstayedDate: Date,
//   existingReservation: IReservationDocument,
//   // existingRoom: IRoomDocument
// ): number => {
//   const { weekday_percent, weekend_percent } = existingRoom

//   const weekends = [0, 6]

//   // initialize current hour fee
//   let currentHourFee = 0

//   // add hour to current overstayed date
//   currentOverstayedDate = addHoursToDate(currentOverstayedDate, 1)

//   // check the day of the week
//   const dayOfWeek = currentOverstayedDate.getDay()

//   // make calculations based on the day of the week
//   if (weekends.includes(dayOfWeek)) {
//     currentHourFee = existingReservation.hourly_rate * (weekend_percent / 100)
//   } else {
//     currentHourFee = existingReservation.hourly_rate * (weekday_percent / 100)
//   }

//   return currentHourFee
// }
