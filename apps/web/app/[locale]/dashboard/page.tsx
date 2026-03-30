import { notFound } from 'next/navigation';
import { getMessages, isLocale, type Locale } from '@/lib/i18n';
import CapsuleList from './CapsuleList';

type DashboardPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const messages = await getMessages(locale as Locale);

  // TODO: replace with real session userId
  const userId = 'demo-user';

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-slate-900">{messages.dashboard.title}</h1>
      <CapsuleList
        initialCapsules={[]}
        userId={userId}
        messages={messages.dashboard}
      />
    </div>
  );
}
