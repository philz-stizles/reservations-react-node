import request from 'supertest'
import app from '@src/app'
import Room from '@src/models/room.model'

describe('Room routes', () => {
  describe('GET api/v1/rooms', () => {
    it('should retrieve a list of all available rooms', async () => {
      await new Room({
        room_type: 'classy',
        hourly_rate: 150000,
        weekday_percent: 7,
        weekend_percent: 10,
      }).save()

      await new Room({
        room_type: 'regular',
        hourly_rate: 110000,
        weekday_percent: 3,
        weekend_percent: 5,
      }).save()

      const response = await request(app)
        .get(`/api/v1/rooms`)
        .send()
        .expect(200)

      const { status, data } = response.body

      expect(status).toEqual(true)
      expect(data.length).toEqual(2)
    })
  })
})
