import { Router } from 'express';
import { UserModel } from '../db/models';
import type { AuthUser } from './auth.types';
import { clearSessionCookie, setSessionCookie } from './cookie';
import { signSessionToken } from './jwt';
import { hashPassword, verifyPassword } from './password';
import { requireAuth } from './session.middleware';

export const authRouter = Router();

const toAuthUser = (doc: { _id: unknown; email: string; name: string }): AuthUser => ({
  id: String(doc._id),
  email: doc.email,
  name: doc.name,
});

authRouter.post('/register', async (req, res) => {
  const { name, email, password } = req.body as {
    name?: string;
    email?: string;
    password?: string;
  };

  if (!name || !email || !password || password.length < 8) {
    res.status(400).json({ error: 'name, email, and a password of at least 8 characters are required' });
    return;
  }

  const existing = await UserModel.findOne({ email: email.toLowerCase() }).lean();
  if (existing) {
    res.status(409).json({ error: 'An account with this email already exists' });
    return;
  }

  const passwordHash = await hashPassword(password);
  const user = await UserModel.create({ name, email: email.toLowerCase(), passwordHash });

  const token = signSessionToken(String(user._id));
  setSessionCookie(res, token);
  res.status(201).json(toAuthUser(user));
});

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    res.status(400).json({ error: 'email and password are required' });
    return;
  }

  const user = await UserModel.findOne({ email: email.toLowerCase() });
  if (!user) {
    res.status(401).json({ error: 'Invalid email or password' });
    return;
  }

  const valid = await verifyPassword(password, user.get('passwordHash') as string);
  if (!valid) {
    res.status(401).json({ error: 'Invalid email or password' });
    return;
  }

  const token = signSessionToken(String(user._id));
  setSessionCookie(res, token);
  res.json(toAuthUser(user));
});

authRouter.post('/logout', (_req, res) => {
  clearSessionCookie(res);
  res.json({ ok: true });
});

authRouter.get('/me', requireAuth, (req, res) => {
  res.json(req.user);
});
