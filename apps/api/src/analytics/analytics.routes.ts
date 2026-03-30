import { Router, type Request, type Response } from 'express';
import { track } from '../analytics/analytics';

/**
 * Issue #381 – Analytics ingestion endpoint for the web client.
 * POST /analytics/track  { event, userId?, capsuleId?, meta? }
 *
 * No sensitive content is accepted or stored.
 */
export const analyticsRouter = Router();

const ALLOWED_EVENTS = new Set([
  'auth.sign_in',
  'auth.sign_out',
  'capsule.draft_created',
  'capsule.sealed',
  'capsule.archived',
  'capsule.unarchived',
  'capsule.deleted',
  'recipient.opened',
  'recipient.unlocked',
  'delivery.sent',
  'delivery.failed',
  'delivery.resent',
  'gift.funded',
]);

analyticsRouter.post('/track', (req: Request, res: Response) => {
  const { event, userId, capsuleId, meta } = req.body ?? {};

  if (typeof event !== 'string' || !ALLOWED_EVENTS.has(event)) {
    res.status(400).json({ error: 'Unknown or missing event name.' });
    return;
  }

  track({ event: event as Parameters<typeof track>[0]['event'], userId, capsuleId, meta });
  res.status(204).end();
});
