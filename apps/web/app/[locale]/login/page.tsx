import { notFound } from 'next/navigation';
import { getMessages, isLocale, type Locale } from '@/lib/i18n';

type LoginPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const messages = await getMessages(locale as Locale);

  return (
    <section className="max-w-md rounded-lg border border-slate-200 bg-white p-6">
      <h1 className="text-2xl font-semibold text-slate-900">{messages.login.title}</h1>
      <button
        type="button"
        className="mt-6 w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white"
      >
        {messages.login.action}
      </button>
    </section>
  );
}
