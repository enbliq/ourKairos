import rateLimit from 'express-rate-limit';

/** Shared options: standard headers, no legacy headers */
const base = { standardHeaders: true, legacyHeaders: false } as const;

/** Auth endpoints: 10 requests / 15 min per IP */
export const authRateLimiter = rateLimit({
  ...base,
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many auth requests, please try again later.' },
});

/** Public token / recipient lookup: 30 requests / 1 min per IP */
export const publicTokenRateLimiter = rateLimit({
  ...base,
  windowMs: 60 * 1000,
  max: 30,
  message: { error: 'Too many requests, please slow down.' },
});
