// import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { IJWTokenPayload } from '@src/interfaces/JsonWebToken';

export const generateToken = (payload: string | any | Buffer): string =>
  jwt.sign(payload, process.env.JWT_AUTH_SECRET as string, {
    expiresIn: process.env.JWT_AUTH_EXPIRES_IN,
  });

export const verifyToken = (
  token: string
): Promise<IJWTokenPayload | undefined> => {
  // eslint-disable-next-line no-return-await
  // await promisify(jwt.verify)(token, process.env.JWT_AUTH_SECRET);
  return new Promise<any>((resolve, reject) => {
    jwt.verify(token, `${process.env.JWT_AUTH_SECRET}`, (err, decoded) => {
      console.log(decoded);
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};
