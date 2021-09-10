import Reservation from '@src/models/reservation.model'

export const seedReservations = async () => {
  try {
    const reservations = [
      {
        room_type: 'deluxe',
        customer_id: '12323',
        hourly_rate: 230000,
        expected_checkin_time: '2020-12-12 12:00',
        expected_checkout_time: '2021-01-01 11:00',
      },
      {
        room_type: 'regular',
        customer_id: '12324',
        hourly_rate: 150000,
        expected_checkin_time: '2020-12-12 12:00',
        expected_checkout_time: '2021-01-01 11:00',
      },
      {
        room_type: 'palatial',
        customer_id: '12100',
        hourly_rate: 560000,
        expected_checkin_time: '2020-12-12 12:00',
        expected_checkout_time: '2021-01-01 11:00',
      },
      {
        room_type: 'regular',
        customer_id: '12323',
        hourly_rate: 200000,
        expected_checkin_time: '2020-12-25 12:00',
        expected_checkout_time: '2021-01-04 11:00',
      },
    ]
    const count = await Reservation.countDocuments()
    if (count <= 0) {
      for (const reservation of reservations) {
        const newReservation = new Reservation(reservation)
        await newReservation.save()
      }

      console.log('Reservations seeded successfully!!')
    } else {
      console.log('Reservations in database!!')
    }
  } catch (error) {
    console.log('Reservations seeding failed', error.message)
  }
}
