'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorBanner } from './ErrorBanner';
import type { Messages } from '@/lib/i18n';

interface AdminMetrics {
  userCount: number;
  capsuleCount: number;
  capsulesByStatus: Record<string, number>;
  recentCapsules: { id: string; title: string; status: string; createdAt: string }[];
}

interface AdminDashboardProps {
  messages: Messages;
}

export function AdminDashboard({ messages }: AdminDashboardProps) {
  const params = useParams<{ locale: string }>();
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const adminKey =
    typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_ADMIN_KEY ?? '' : '';

  const fetchMetrics = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await apiClient.get<AdminMetrics>('/admin/metrics', {
      'x-admin-key': adminKey,
    });
    if (err || !data) {
      setError(err ?? messages.errors.generic);
    } else {
      setMetrics(data);
    }
    setLoading(false);
  }, [adminKey, messages.errors.generic]);

  useEffect(() => {
    void fetchMetrics();
  }, [fetchMetrics]);

  if (loading) return <LoadingSpinner />;
  if (error) {
    return (
      <ErrorBanner
        message={error}
        onRetry={fetchMetrics}
        retryLabel={messages.errors.retry}
      />
    );
  }
  if (!metrics) return null;

  const statCards = [
    { label: messages.admin.users, value: metrics.userCount },
    { label: messages.admin.capsules, value: metrics.capsuleCount },
    { label: 'Drafts', value: metrics.capsulesByStatus['DRAFT'] ?? 0 },
    { label: 'Sealed', value: metrics.capsulesByStatus['SEALED'] ?? 0 },
    { label: 'Unlocked', value: metrics.capsulesByStatus['UNLOCKED'] ?? 0 },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold text-slate-900">{messages.admin.title}</h1>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="rounded-lg border border-slate-200 bg-white p-4 text-center"
          >
            <p className="text-2xl font-bold text-slate-900">{card.value}</p>
            <p className="mt-1 text-xs text-slate-500">{card.label}</p>
          </div>
        ))}
      </div>

      <section>
        <h2 className="mb-3 text-lg font-medium text-slate-800">{messages.admin.recent}</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500">
              <th className="pb-2 font-medium">Title</th>
              <th className="pb-2 font-medium">Status</th>
              <th className="pb-2 font-medium">Created</th>
            </tr>
          </thead>
          <tbody>
            {metrics.recentCapsules.map((c) => (
              <tr key={c.id} className="border-b border-slate-100">
                <td className="py-2 text-slate-800">{c.title}</td>
                <td className="py-2 text-slate-600">{c.status}</td>
                <td className="py-2 text-slate-500">
                  {new Date(c.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
