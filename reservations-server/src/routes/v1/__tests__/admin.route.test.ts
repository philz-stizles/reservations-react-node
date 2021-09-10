import request from 'supertest'
import app from '../../src/app'
import Reservation from '../../src/models/reservation.model'
import Room from '../../src/models/room.model'

const addDays = (noOfDays: number) => {
  const tmpDate = new Date()
  tmpDate.setDate(tmpDate.getDate() + noOfDays)
  return tmpDate
}

const removeDays = (noOfDays: number) => {
  const tmpDate = new Date()
  tmpDate.setDate(tmpDate.getDate() - noOfDays)
  return tmpDate
}

describe('Admin routes', () => {
  describe('Calculate overstay by reservation', () => {
    it('has a route handler listening to /api/v1/admin/calcOverstayByReservation for get requests', async () => {
      const response = await request(app).get(
        '/api/v1/admin/calcOverstayByReservation'
      )
      expect(response.status).not.toEqual(404)
    })

    it('returns an error if no reservation id is provided', async () => {
      const response = await request(app).get(
        '/api/v1/admin/calcOverstayByReservation'
      )
      expect(response.status).toEqual(400)
    })

    it('returns an error if an empty reservation id is provided', async () => {
      const response = await request(app).get(
        '/api/v1/admin/calcOverstayByReservation?reservationId='
      )
      expect(response.status).toEqual(400)
    })

    it('returns an error if the provided reservation id does not exist', async () => {
      const response = await request(app).get(
        '/api/v1/admin/calcOverstayByReservation?reservationId=6112eddade95c0002303ffc9'
      )
      expect(response.status).toEqual(404)
    })

    it('returns an error if the provided room type does not exist', async () => {
      const createdReservation = await new Reservation({
        room_type: 'deluxe',
        customer_id: '12323',
        hourly_rate: 230000,
        expected_checkin_time: '2020-12-12 12:00',
        expected_checkout_time: '2021-01-01 11:00',
      }).save()

      const response = await request(app).get(
        `/api/v1/admin/calcOverstayByReservation?reservationId=${createdReservation._id}`
      )
      expect(response.status).toEqual(404)
    })

    it('does not return an error if the provided reservation id and room type exist', async () => {
      await new Room({
        room_type: 'deluxe',
        hourly_rate: 150000,
        weekday_percent: 7,
        weekend_percent: 10,
      }).save()

      const createdReservation = await new Reservation({
        room_type: 'deluxe',
        customer_id: '12323',
        hourly_rate: 230000,
        expected_checkin_time: '2020-12-12 12:00',
        expected_checkout_time: '2021-01-01 11:00',
      }).save()

      const response = await request(app).get(
        `/api/v1/admin/calcOverstayByReservation?reservationId=${createdReservation._id}`
      )
      expect(response.status).not.toEqual(404)
    })

    it('should have 0 overstay fee and 0 extra hours if expected checkout is not exceeded', async () => {
      await new Room({
        room_type: 'deluxe',
        hourly_rate: 150000,
        weekday_percent: 7,
        weekend_percent: 10,
      }).save()

      const createdReservation = await new Reservation({
        room_type: 'deluxe',
        customer_id: '12323',
        hourly_rate: 230000,
        expected_checkin_time: '2020-12-12 12:00',
        expected_checkout_time: addDays(1).toISOString(),
      }).save()

      const response = await request(app).get(
        `/api/v1/admin/calcOverstayByReservation?reservationId=${createdReservation._id}`
      )
      const { status, data } = response.body
      expect(response.status).toEqual(200)
      expect(status).toEqual(true)
      expect(data.overdue_fee).toEqual(0)
      expect(data.extra_hours).toEqual(0)
    })

    it('should have valid overstay fee and extra hours if expected checkout is exceeded', async () => {
      await new Room({
        room_type: 'deluxe',
        hourly_rate: 150000,
        weekday_percent: 7,
        weekend_percent: 10,
      }).save()

      const createdReservation = await new Reservation({
        room_type: 'deluxe',
        customer_id: '12323',
        hourly_rate: 230000,
        expected_checkin_time: '2020-12-12 12:00',
        expected_checkout_time: removeDays(1).toISOString(),
      }).save()

      const response = await request(app).get(
        `/api/v1/admin/calcOverstayByReservation?reservationId=${createdReservation._id}`
      )
      const { status, data } = response.body
      expect(response.status).toEqual(200)
      expect(status).toEqual(true)
      expect(data.overdue_fee).toBeGreaterThan(0)
      expect(data.extra_hours).toBeGreaterThan(0)
    })
  })

  describe('Calculate overstay by customer', () => {
    it('has a route handler listening to /api/v1/admin/calcOverstayByCustomer for get requests', async () => {
      const response = await request(app).get(
        '/api/v1/admin/calcOverstayByCustomer'
      )
      expect(response.status).not.toEqual(404)
    })

    it('returns an error if no customer id is provided', async () => {
      const response = await request(app).get(
        '/api/v1/admin/calcOverstayByCustomer'
      )
      expect(response.status).toEqual(400)
    })

    it('returns an error if an empty customer id is provided', async () => {
      const response = await request(app).get(
        '/api/v1/admin/calcOverstayByCustomer?customerId='
      )
      expect(response.status).toEqual(400)
    })

    it('returns an error if the customer id is not a number', async () => {
      const response = await request(app).get(
        '/api/v1/admin/calcOverstayByCustomer?customerId=xyz'
      )
      expect(response.status).toEqual(400)
    })

    it('does not return an error if the customer id is correct', async () => {
      await new Room({
        room_type: 'deluxe',
        hourly_rate: 150000,
        weekday_percent: 7,
        weekend_percent: 10,
      }).save()

      const createdReservation = await new Reservation({
        room_type: 'deluxe',
        customer_id: '12323',
        hourly_rate: 150000,
        expected_checkin_time: '2020-12-12 12:00',
        expected_checkout_time: removeDays(1).toISOString(),
      }).save()
      const response = await request(app).get(
        '/api/v1/admin/calcOverstayByCustomer?customerId=12323'
      )
      expect(response.status).not.toEqual(400)
    })
  })
})
