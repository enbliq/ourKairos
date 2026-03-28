import { notFound } from 'next/navigation';
import { getMessages, isLocale, type Locale } from '@/lib/i18n';

type DashboardPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const messages = await getMessages(locale as Locale);

  return <h1 className="text-3xl font-semibold text-slate-900">{messages.dashboard.title}</h1>;
}
