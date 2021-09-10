import mongoose from 'mongoose'

const connectToDbAsync = async () => {
  if (mongoose.connection.readyState >= 1) {
    // Already connected
    return
  }

  mongoose.connection.on('connected', () => console.log('Client is connected'))

  mongoose.connection.on('error', (err) => console.log(err.message))

  mongoose.connection.on('closed', () => console.log('Client is closed'))

  return await mongoose.connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
}

export default connectToDbAsync
