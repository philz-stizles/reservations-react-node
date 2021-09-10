import { JwtPayload } from 'jsonwebtoken';

export interface IJWTokenPayload extends JwtPayload {
  id: string;
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export interface IJWTVerify {
  valid: boolean;
  expired: boolean;
  decoded: string | IJWTokenPayload | null;
}
