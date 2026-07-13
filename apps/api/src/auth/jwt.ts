import jwt from 'jsonwebtoken';
import type { SessionTokenPayload } from './auth.types';

const SESSION_TTL = '7d';

const getSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }
  return secret;
};

export const signSessionToken = (userId: string): string =>
  jwt.sign({ sub: userId } satisfies SessionTokenPayload, getSecret(), {
    expiresIn: SESSION_TTL,
  });

export const verifySessionToken = (token: string): SessionTokenPayload =>
  jwt.verify(token, getSecret()) as SessionTokenPayload;
