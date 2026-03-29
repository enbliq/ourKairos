import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './db/connect';

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

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
