/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-namespace */
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '@src/models/user.model.old';

let mongo: MongoMemoryServer;

declare global {
  namespace NodeJS {
    interface Global {
      signinWithCookie(): string[];
      signinWithToken(): Promise<string>;
    }
  }
}

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    // eslint-disable-next-line no-await-in-loop
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongo.stop();
});

global.signinWithCookie = () => {
  // Generate user id
  const id = new mongoose.Types.ObjectId().toHexString();

  // Build a JWT payload. { id, email }
  const payload = {
    id,
    email: 'test@test.com',
  };

  // Create the JWT.
  const token = jwt.sign(payload, process.env.JWT_AUTH_SECRET as string);

  // Build session Object.
  const session = { jwt: token };

  // Turn the session into JSON.
  const sessionJSON = JSON.stringify(session);

  // Encode JSON in base64.
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return a string that is the cookie with the encoded data.
  return [`express:sess=${base64}`];
};

global.signinWithToken = async () => {
  // Generate user id
  const user = await User.create({
    fullname: 'Test Fullname',
    email: 'test@test.com',
    password: 'test password',
    confirmPassword: 'test password',
  });

  // Build a JWT payload. { id }
  const payload = {
    id: user._id,
  };

  // Create the JWT.
  const token = jwt.sign(payload, process.env.JWT_AUTH_SECRET as string);

  // return a string that is the cookie with the encoded data.
  return token;
};
