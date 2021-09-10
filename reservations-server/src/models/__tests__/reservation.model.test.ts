import Reservation from '@src/models/reservation.model'

describe('Reservation Model', () => {
  it('should have status, expected_checkin_time, expected_checkout_time, customer_id and room_type attributes', () => {
    let expectedKeys = [
      'status',
      'hourly_rate',
      'expected_checkin_time',
      'expected_checkout_time',
      'customer_id',
      'room_type',
    ]
    let keys = Object.keys(Reservation.schema.paths)
    let reservationAttributes = [
      keys[0],
      keys[1],
      keys[2],
      keys[3],
      keys[4],
      keys[5],
    ]
    expect(reservationAttributes).toStrictEqual(expectedKeys)
  })

  it('should be able to create a new reservation', async () => {
    try {
      const newReservation = new Reservation({
        room_type: 'deluxe',
        customer_id: '12323',
        hourly_rate: 230000,
        expected_checkin_time: '2020-12-12 12:00',
        expected_checkout_time: '2021-01-01 11:00',
      })
      const createdReservation = await newReservation.save()
      expect(createdReservation.room_type).toEqual(newReservation.room_type)
      expect(createdReservation.hourly_rate).toEqual(newReservation.hourly_rate)
      expect(createdReservation.expected_checkin_time).toEqual(
        newReservation.expected_checkin_time
      )
      expect(createdReservation.expected_checkout_time).toEqual(
        newReservation.expected_checkout_time
      )
    } catch (error) {
      throw new Error(error)
    }
  })

  it('should throw an error on save if the room_type field is empty', async () => {
    try {
      await new Reservation({
        room_type: '',
        customer_id: '12323',
        hourly_rate: 230000,
        expected_checkin_time: '2020-12-12 12:00',
        expected_checkout_time: '2021-01-01 11:00',
      }).save()
    } catch (error) {
      expect(error.errors.room_type.kind).toEqual('required')
    }
  })

  it('should throw an error on save if the customer_id field is empty', async () => {
    try {
      await new Reservation({
        room_type: 'regular',
        customer_id: '',
        hourly_rate: 230000,
        expected_checkin_time: '2020-12-12 12:00',
        expected_checkout_time: '2021-01-01 11:00',
      }).save()
    } catch (error) {
      expect(error.errors.customer_id.kind).toEqual('required')
    }
  })

  it('should throw an error on save if the hourly_rate field is empty', async () => {
    try {
      await new Reservation({
        room_type: 'regular',
        customer_id: '12345',
        hourly_rate: 0,
        expected_checkin_time: '2020-12-12 12:00',
        expected_checkout_time: '2021-01-01 11:00',
      }).save()
    } catch (error) {
      expect(error.errors.hourly_rate.kind).toEqual('required')
    }
  })

  it('should throw an error on save if the expected_checkin_time field is empty', async () => {
    try {
      await new Reservation({
        room_type: 'regular',
        customer_id: '12345',
        hourly_rate: 2000,
        expected_checkin_time: '',
        expected_checkout_time: '2021-01-01 11:00',
      }).save()
    } catch (error) {
      expect(error.errors.expected_checkin_time.kind).toEqual('required')
    }
  })

  it('should throw an error on save if the expected_checkout_time field is empty', async () => {
    try {
      await new Reservation({
        room_type: 'regular',
        customer_id: '12345',
        hourly_rate: 0,
        expected_checkin_time: '2020-12-12 12:00',
        expected_checkout_time: '',
      }).save()
    } catch (error) {
      expect(error.errors.expected_checkout_time.kind).toEqual('required')
    }
  })
})
