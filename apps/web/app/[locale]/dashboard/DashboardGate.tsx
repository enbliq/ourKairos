'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { authClient, type SessionUser } from '@/lib/auth-client';
import type { Messages } from '@/lib/i18n';

interface DashboardGateProps {
  locale: string;
  messages: Messages;
}

export function DashboardGate({ locale, messages }: DashboardGateProps) {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    authClient.me().then((result) => {
      if (!active) return;
      if (!result.data) {
        router.replace(`/${locale}/login`);
        return;
      }
      setUser(result.data);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [locale, router]);

  if (loading || !user) {
    return <LoadingSpinner />;
  }

  return (
    <section className="space-y-3">
      <h1 className="text-2xl font-semibold text-slate-900">{messages.dashboard.title}</h1>
      <p className="text-slate-600">
        {messages.dashboard.welcome.replace('{name}', user.name)}
      </p>
    </section>
  );
}
