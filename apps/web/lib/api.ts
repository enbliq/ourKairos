const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export interface Capsule {
  _id: string;
  ownerId: string;
  title: string;
  message: string | null;
  unlockDate: string | null;
  status: 'DRAFT' | 'SEALED' | 'UNLOCKED' | 'ARCHIVED' | 'DELETED';
  recipientEmail: string | null;
  lastDeliveryAttemptAt: string | null;
  lastDeliveryError: string | null;
  deliveryAttempts: number;
  createdAt: string;
  updatedAt: string;
}

const headers = (userId: string) => ({
  'Content-Type': 'application/json',
  'x-user-id': userId,
});

export const fetchCapsules = async (userId: string, includeArchived = false): Promise<Capsule[]> => {
  const res = await fetch(
    `${API_BASE}/capsules${includeArchived ? '?archived=true' : ''}`,
    { headers: headers(userId) },
  );
  if (!res.ok) throw new Error('Failed to fetch capsules');
  return res.json() as Promise<Capsule[]>;
};

export const archiveCapsule = async (id: string, userId: string): Promise<Capsule> => {
  const res = await fetch(`${API_BASE}/capsules/${id}/archive`, {
    method: 'PATCH',
    headers: headers(userId),
  });
  if (!res.ok) throw new Error('Archive failed');
  return res.json() as Promise<Capsule>;
};

export const unarchiveCapsule = async (id: string, userId: string): Promise<Capsule> => {
  const res = await fetch(`${API_BASE}/capsules/${id}/unarchive`, {
    method: 'PATCH',
    headers: headers(userId),
  });
  if (!res.ok) throw new Error('Unarchive failed');
  return res.json() as Promise<Capsule>;
};

export const deleteCapsule = async (id: string, userId: string): Promise<void> => {
  await fetch(`${API_BASE}/capsules/${id}`, {
    method: 'DELETE',
    headers: headers(userId),
  });
};

/** Issue #391 – trigger a manual resend for a failed delivery */
export const resendCapsuleDelivery = async (
  id: string,
  userId: string,
): Promise<{ alreadySent: boolean }> => {
  const res = await fetch(`${API_BASE}/capsules/${id}/resend`, {
    method: 'POST',
    headers: headers(userId),
  });
  if (res.status === 429) return { alreadySent: true };
  if (!res.ok) throw new Error('Resend failed');
  return { alreadySent: false };
};

/** Issue #381 – fire-and-forget analytics event from the browser */
export const trackEvent = (
  event: string,
  payload?: { userId?: string; capsuleId?: string; meta?: Record<string, string | number | boolean> },
): void => {
  void fetch(`${API_BASE}/analytics/track`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, ...payload }),
  }).catch(() => undefined);
};
