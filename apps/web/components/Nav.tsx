'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { authClient, type SessionUser } from '@/lib/auth-client';
import type { Messages } from '@/lib/i18n';

interface NavProps {
  locale: string;
  messages: Messages;
}

export function Nav({ locale, messages }: NavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<SessionUser | null | undefined>(undefined);

  useEffect(() => {
    let active = true;
    authClient.me().then((result) => {
      if (active) setUser(result.data);
    });
    return () => {
      active = false;
    };
  }, [pathname]);

  const handleLogout = async () => {
    await authClient.logout();
    setUser(null);
    router.push(`/${locale}`);
    router.refresh();
  };

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href={`/${locale}`} className="font-semibold text-slate-900">
          {messages.home.title}
        </Link>
        <div className="flex items-center gap-5 text-sm text-slate-700">
          <Link href={`/${locale}`}>{messages.navbar.home}</Link>
          {user ? (
            <>
              <Link href={`/${locale}/dashboard`}>{messages.navbar.dashboard}</Link>
              <button type="button" onClick={handleLogout} className="text-slate-700">
                {messages.navbar.logout}
              </button>
            </>
          ) : (
            <>
              <Link href={`/${locale}/login`}>{messages.navbar.login}</Link>
              <Link href={`/${locale}/register`}>{messages.navbar.register}</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
