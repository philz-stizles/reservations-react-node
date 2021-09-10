import { MongoClient, ObjectID } from 'mongodb'

const connectToDatabaseAsync = async () => {
  const client = await MongoClient.connect(process.env.DB_URL, {
    useUnifiedTopology: true
  })

  client.on('serverClosed', () => console.log('Client is closed'))

  return client
}

export const insertDocument = async (client, collection, document) => {
  const db = client.db()
  return await db.collection(collection).insertOne(document)
}

export const getAllDocuments = async (client, collection, filter, sort) => {
  const db = client.db()
  return await db.collection(collection).find(filter).sort(sort).toArray()
}

export const getOneDocument = async (client, collection, filter) => {
  const db = client.db()
  return await db.collection(collection).findOne(filter)
}

export const updateOneDocument = async (client, collection, filter, document) => {
  filter._id = ObjectID(filter._id)
  const db = client.db()
  return await db.collection(collection).updateOne(filter, document)
}

export const deleteOneDocument = async (client, collection, filter) => {
  filter._id = ObjectID(filter._id)
  const db = client.db()
  return await db.collection(collection).deleteOne(filter)
}

export default connectToDatabaseAsync
