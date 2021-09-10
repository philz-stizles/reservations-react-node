import request from 'supertest'
import app from '@src/app'
import Reservation from '@src/models/reservation.model'

describe('Reservation routes', () => {
  describe('GET api/v1/reservations', () => {
    it('should retrieve a list of all available reservations', async () => {
      await new Reservation({
        room_type: 'regular',
        customer_id: '12323',
        hourly_rate: 230000,
        expected_checkin_time: '2020-12-12 12:00',
        expected_checkout_time: '2021-01-01 11:00',
      }).save()

      await new Reservation({
        room_type: 'classic',
        customer_id: '12323',
        hourly_rate: 230000,
        expected_checkin_time: '2020-12-12 12:00',
        expected_checkout_time: '2021-01-01 11:00',
      }).save()

      const response = await request(app)
        .get(`/api/v1/reservations`)
        .send()
        .expect(200)

      const { status, data } = response.body

      expect(status).toEqual(true)
      expect(data.length).toEqual(2)
    })
  })
})
