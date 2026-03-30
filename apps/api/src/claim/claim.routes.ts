import { Router } from 'express';

interface TokenRecord {
  capsuleId: string;
  claimed: boolean;
}

// In-memory token store (replace with DB persistence in a future iteration)
const tokenStore = new Map<string, TokenRecord>([
  // Demo token for local testing
  [
    'demo-token-unlocked',
    { capsuleId: 'demo-capsule-1', claimed: false },
  ],
  [
    'demo-token-locked',
    { capsuleId: 'demo-capsule-2', claimed: false },
  ],
]);

const demoCapsules: Record<string, { id: string; title: string; unlockDate: string; status: string; message?: string }> = {
  'demo-capsule-1': {
    id: 'demo-capsule-1',
    title: 'A message from the past',
    unlockDate: new Date(Date.now() - 86400_000).toISOString(),
    status: 'UNLOCKED',
    message: 'Congratulations — you opened this capsule at just the right moment.',
  },
  'demo-capsule-2': {
    id: 'demo-capsule-2',
    title: 'Future surprise',
    unlockDate: new Date(Date.now() + 30 * 86400_000).toISOString(),
    status: 'SEALED',
  },
};

const router = Router();

router.get('/claim/:token', (req, res) => {
  const record = tokenStore.get(req.params.token);
  if (!record) {
    res.status(404).json({ error: 'Token not found' });
    return;
  }

  const capsule = demoCapsules[record.capsuleId];
  if (!capsule) {
    res.status(404).json({ error: 'Capsule not found' });
    return;
  }

  const isUnlocked = capsule.status === 'UNLOCKED';

  res.json({
    id: capsule.id,
    title: capsule.title,
    unlockDate: capsule.unlockDate,
    state: isUnlocked ? 'unlocked' : 'locked',
    ...(isUnlocked ? { message: capsule.message } : {}),
  });
});

router.post('/claim/:token/acknowledge', (req, res) => {
  const record = tokenStore.get(req.params.token);
  if (!record) {
    res.status(404).json({ error: 'Token not found' });
    return;
  }
  record.claimed = true;
  res.json({ acknowledged: true });
});

export { router as claimRouter };
