import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './db/connect';
import { authRateLimiter, publicTokenRateLimiter } from './middleware/rateLimiter';
import { analyticsRouter } from './analytics/analytics.routes';
import { capsulesRouter } from './capsules/capsule.routes';
import { flags } from './flags';

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'api',
    timestamp: new Date().toISOString(),
  });
});

// Expose active feature flags (read-only, no user context required for boolean flags)
app.get('/flags', (_req, res) => {
  const systemUser = { id: '__system__' };
  res.json({
    'gift-flow': flags.isEnabled('gift-flow', systemUser),
    'reminders': flags.isEnabled('reminders', systemUser),
    'email-delivery': flags.isEnabled('email-delivery', systemUser),
  });
});

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
