import Room from '@src/models/room.model'

describe('Room Model', () => {
  it('should have room_type, hourly_rate, weekday_percent and weekend_percent attributes', () => {
    let expectedKeys = [
      'room_type',
      'hourly_rate',
      'weekday_percent',
      'weekend_percent',
    ]
    let keys = Object.keys(Room.schema.paths)
    let roomAttributes = [keys[0], keys[1], keys[2], keys[3]]
    expect(roomAttributes).toStrictEqual(expectedKeys)
  })

  it('should be able to create a new room', async () => {
    try {
      const newRoom = new Room({
        room_type: 'regular',
        hourly_rate: 120000,
        weekday_percent: 3,
        weekend_percent: 5,
      })
      const createdRoom = await newRoom.save()
      expect(createdRoom.room_type).toEqual(newRoom.room_type)
      expect(createdRoom.hourly_rate).toEqual(newRoom.hourly_rate)
      expect(createdRoom.weekday_percent).toEqual(newRoom.weekday_percent)
      expect(createdRoom.weekend_percent).toEqual(newRoom.weekend_percent)
    } catch (error) {
      throw new Error(error)
    }
  })

  it('should throw an error on save if the room_type field is empty', async () => {
    try {
      await new Room({
        room_type: '',
        hourly_rate: 120000,
        weekday_percent: 3,
        weekend_percent: 5,
      }).save()
    } catch (error) {
      expect(error.errors.room_type.kind).toEqual('required')
    }
  })

  it('should throw an error on save if the hourly_rate field is empty', async () => {
    try {
      await new Room({
        room_type: 'classic',
        hourly_rate: 0,
        weekday_percent: 5,
        weekend_percent: 9,
      }).save()
    } catch (error) {
      expect(error.errors.hourly_rate.kind).toEqual('required')
    }
  })

  it('should throw an error on save if the weekday_percent field is empty', async () => {
    try {
      await new Room({
        room_type: 'classic',
        hourly_rate: 40000,
        weekday_percent: 0,
        weekend_percent: 9,
      }).save()
    } catch (error) {
      expect(error.errors.weekday_percent.kind).toEqual('required')
    }
  })

  it('should throw an error on save if the weekend_percent field is empty', async () => {
    try {
      await new Room({
        room_type: 'classic',
        hourly_rate: 40000,
        weekday_percent: 7,
        weekend_percent: 0,
      }).save()
    } catch (error) {
      expect(error.errors.weekend_percent.kind).toEqual('required')
    }
  })
})
