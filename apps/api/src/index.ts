import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { authRouter } from './auth/auth.routes';
import { attachSession } from './auth/session.middleware';
import { connectDB } from './db/connect';

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(attachSession);

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'api',
    timestamp: new Date().toISOString(),
  });
});

app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
