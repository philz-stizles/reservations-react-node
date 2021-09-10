import { IConfig } from '@src/interfaces/IConfig';

const config = (): IConfig => {
  let dbUri: string | undefined = process.env.MONGODB_DEV_URI;

  if (process.env.NODE_ENV === 'production') {
    dbUri = process.env.MONGODB_CLOUD_URI;
  } else if (process.env.NODE_ENV === 'test') {
    dbUri = process.env.MONGODB_TEST_URI;
  } else {
    dbUri = process.env.MONGODB_DEV_URI;
  }

  return { dbUri: dbUri as string };
};

export default config;
