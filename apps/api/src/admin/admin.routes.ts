import { Router } from 'express';
import mongoose from 'mongoose';
import { requireAdminKey } from './admin.middleware';

const router = Router();

router.use(requireAdminKey);

router.get('/metrics', async (_req, res) => {
  const db = mongoose.connection;
  const users = db.collection('users');
  const capsules = db.collection('capsules');

  const [userCount, capsuleCount, statusAgg, recentCapsules] = await Promise.all([
    users.countDocuments(),
    capsules.countDocuments(),
    capsules
      .aggregate<{ _id: string; count: number }>([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ])
      .toArray(),
    capsules
      .find({}, { projection: { _id: 0, id: 1, title: 1, status: 1, createdAt: 1 } })
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray(),
  ]);

  const capsulesByStatus = Object.fromEntries(statusAgg.map((s) => [s._id, s.count]));

  res.json({ userCount, capsuleCount, capsulesByStatus, recentCapsules });
});

export { router as adminRouter };
