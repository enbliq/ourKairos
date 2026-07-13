'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ErrorBanner } from '@/components/ErrorBanner';
import { authClient } from '@/lib/auth-client';
import type { Messages } from '@/lib/i18n';

interface LoginFormProps {
  locale: string;
  messages: Messages;
}

export function LoginForm({ locale, messages }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const result = await authClient.login(email, password);

    setSubmitting(false);
    if (!result.data) {
      setError(messages.errors.invalidCredentials);
      return;
    }

    router.push(`/${locale}/dashboard`);
    router.refresh();
  };

  return (
    <section className="max-w-md rounded-lg border border-slate-200 bg-white p-6">
      <h1 className="text-2xl font-semibold text-slate-900">{messages.login.title}</h1>

      {error && (
        <div className="mt-4">
          <ErrorBanner message={error} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            {messages.login.email}
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700">
            {messages.login.password}
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {messages.login.action}
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-600">
        {messages.login.noAccount}{' '}
        <Link href={`/${locale}/register`} className="font-medium text-slate-900 underline">
          {messages.login.registerLink}
        </Link>
      </p>
    </section>
  );
}
