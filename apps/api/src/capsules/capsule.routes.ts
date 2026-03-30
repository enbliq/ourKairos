import { Router, type Request, type Response } from 'express';
import {
  listCapsules,
  getCapsule,
  createCapsule,
  sealCapsule,
  archiveCapsule,
  unarchiveCapsule,
  softDeleteCapsule,
  resendDelivery,
} from './capsule.service';

export const capsulesRouter = Router();

const uid = (req: Request) => (req.headers['x-user-id'] as string) ?? 'anonymous';
const pid = (req: Request) => String(req.params['id']);

/** GET /capsules?archived=true */
capsulesRouter.get('/', async (req: Request, res: Response) => {
  const capsules = await listCapsules(uid(req), req.query['archived'] === 'true');
  res.json(capsules);
});

/** GET /capsules/:id */
capsulesRouter.get('/:id', async (req: Request, res: Response) => {
  const capsule = await getCapsule(pid(req), uid(req));
  if (!capsule) { res.status(404).json({ error: 'Not found' }); return; }
  res.json(capsule);
});

/** POST /capsules */
capsulesRouter.post('/', async (req: Request, res: Response) => {
  const { title, message, unlockDate, recipientEmail } = req.body ?? {};
  if (!title) { res.status(400).json({ error: 'title is required' }); return; }
  const capsule = await createCapsule(uid(req), { title, message, unlockDate, recipientEmail });
  res.status(201).json(capsule);
});

/** PATCH /capsules/:id/seal */
capsulesRouter.patch('/:id/seal', async (req: Request, res: Response) => {
  const capsule = await sealCapsule(pid(req), uid(req));
  if (!capsule) { res.status(404).json({ error: 'Not found or already sealed' }); return; }
  res.json(capsule);
});

/** PATCH /capsules/:id/archive  – Issue #387 */
capsulesRouter.patch('/:id/archive', async (req: Request, res: Response) => {
  const capsule = await archiveCapsule(pid(req), uid(req));
  if (!capsule) { res.status(404).json({ error: 'Not found' }); return; }
  res.json(capsule);
});

/** PATCH /capsules/:id/unarchive  – Issue #387 */
capsulesRouter.patch('/:id/unarchive', async (req: Request, res: Response) => {
  const capsule = await unarchiveCapsule(pid(req), uid(req));
  if (!capsule) { res.status(404).json({ error: 'Not found or not archived' }); return; }
  res.json(capsule);
});

/** DELETE /capsules/:id  – Issue #387 soft-delete */
capsulesRouter.delete('/:id', async (req: Request, res: Response) => {
  const capsule = await softDeleteCapsule(pid(req), uid(req));
  if (!capsule) { res.status(404).json({ error: 'Not found' }); return; }
  res.status(204).end();
});

/** POST /capsules/:id/resend  – Issue #391 */
capsulesRouter.post('/:id/resend', async (req: Request, res: Response) => {
  const result = await resendDelivery(pid(req), uid(req));
  if (!result) { res.status(404).json({ error: 'Not found' }); return; }
  if (result.alreadySent) {
    res.status(429).json({ error: 'A resend was already triggered recently. Please wait before retrying.' });
    return;
  }
  res.json({ message: 'Resend queued', capsule: result.capsule });
});
