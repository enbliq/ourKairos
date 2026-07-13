import type { NextFunction, Request, Response } from 'express';
import { UserModel } from '../db/models';
import type { AuthUser } from './auth.types';
import { SESSION_COOKIE } from './cookie';
import { verifySessionToken } from './jwt';

declare module 'express-serve-static-core' {
  interface Request {
    user?: AuthUser;
  }
}

const toAuthUser = (doc: { _id: unknown; email: string; name: string }): AuthUser => ({
  id: String(doc._id),
  email: doc.email,
  name: doc.name,
});

export const attachSession = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  const token = (req.cookies as Record<string, string> | undefined)?.[SESSION_COOKIE];
  if (!token) {
    next();
    return;
  }

  try {
    const payload = verifySessionToken(token);
    const doc = await UserModel.findById(payload.sub).lean();
    if (doc) {
      req.user = toAuthUser(doc);
    }
  } catch {
    // invalid or expired token: treat as unauthenticated
  }

  next();
};

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }
  next();
};
