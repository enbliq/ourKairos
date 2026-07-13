import type { Response } from 'express';

export const SESSION_COOKIE = 'session';

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export const setSessionCookie = (res: Response, token: string): void => {
  res.cookie(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SEVEN_DAYS_MS,
  });
};

export const clearSessionCookie = (res: Response): void => {
  res.clearCookie(SESSION_COOKIE);
};
