import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './db/connect';
import { authRateLimiter, publicTokenRateLimiter } from './middleware/rateLimiter';
import { analyticsRouter } from './analytics/analytics.routes';
import { capsulesRouter } from './capsules/capsule.routes';

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

// Issue #379 – rate-limited auth routes placeholder
app.use('/auth', authRateLimiter);

// Issue #379 – rate-limited public recipient token lookup placeholder
app.use('/recipient', publicTokenRateLimiter);

// Issue #381 – analytics ingestion
app.use('/analytics', analyticsRouter);

// Issues #387 + #391 – capsule CRUD, archival, resend
app.use('/capsules', capsulesRouter);

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
