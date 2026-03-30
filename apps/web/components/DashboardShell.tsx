'use client';

import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorBanner } from './ErrorBanner';
import type { Messages } from '@/lib/i18n';

interface DashboardShellProps {
  messages: Messages;
}

export function DashboardShell({ messages }: DashboardShellProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');

  const checkApi = useCallback(async () => {
    setStatus('loading');
    const { error } = await apiClient.get('/health');
    setStatus(error ? 'error' : 'ok');
  }, []);

  useEffect(() => {
    void checkApi();
  }, [checkApi]);

  if (status === 'loading' || status === 'idle') {
    return <LoadingSpinner />;
  }

  if (status === 'error') {
    return (
      <ErrorBanner
        message={messages.errors.generic}
        onRetry={checkApi}
        retryLabel={messages.errors.retry}
      />
    );
  }

  return <h1 className="text-3xl font-semibold text-slate-900">{messages.dashboard.title}</h1>;
}
