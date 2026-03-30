import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './db/connect';
import { adminRouter } from './admin/admin.routes';
import { claimRouter } from './claim/claim.routes';
// Import models so Mongoose registers indexes on startup
import './db/models';

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
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

app.use('/admin', adminRouter);
app.use('/capsules', claimRouter);

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
