'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorBanner } from './ErrorBanner';
import type { Messages } from '@/lib/i18n';

interface PublicCapsuleView {
  id: string;
  title: string;
  unlockDate: string;
  state: 'locked' | 'unlocked';
  message?: string;
}

interface GiftClaimShellProps {
  messages: Messages;
}

export function GiftClaimShell({ messages }: GiftClaimShellProps) {
  const { token } = useParams<{ token: string }>();
  const [capsule, setCapsule] = useState<PublicCapsuleView | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [acknowledged, setAcknowledged] = useState(false);

  const fetchClaim = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await apiClient.get<PublicCapsuleView>(
      `/capsules/claim/${token}`,
    );
    if (err || !data) {
      setError(err ?? messages.errors.generic);
    } else {
      setCapsule(data);
    }
    setLoading(false);
  }, [token, messages.errors.generic]);

  useEffect(() => {
    void fetchClaim();
  }, [fetchClaim]);

  const handleAcknowledge = async () => {
    const { error: err } = await apiClient.post(`/capsules/claim/${token}/acknowledge`);
    if (!err) setAcknowledged(true);
  };

  if (loading) return <LoadingSpinner />;
  if (error) {
    return (
      <ErrorBanner
        message={error}
        onRetry={fetchClaim}
        retryLabel={messages.errors.retry}
      />
    );
  }
  if (!capsule) return null;

  return (
    <section className="max-w-lg space-y-4 rounded-lg border border-slate-200 bg-white p-6">
      <h1 className="text-2xl font-semibold text-slate-900">{messages.claim.title}</h1>

      {capsule.state === 'locked' ? (
        <p className="text-slate-600">{messages.claim.locked}</p>
      ) : (
        <>
          <p className="font-medium text-slate-800">{messages.claim.unlocked}</p>
          <h2 className="text-xl text-slate-900">{capsule.title}</h2>
          {capsule.message && (
            <p className="text-slate-700">{capsule.message}</p>
          )}
          {acknowledged ? (
            <p className="text-sm font-medium text-green-600">{messages.claim.acknowledged}</p>
          ) : (
            <button
              type="button"
              onClick={handleAcknowledge}
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
            >
              {messages.claim.acknowledge}
            </button>
          )}
        </>
      )}
    </section>
  );
}
