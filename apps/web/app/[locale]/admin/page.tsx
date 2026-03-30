import { notFound } from 'next/navigation';
import { getMessages, isLocale, type Locale } from '@/lib/i18n';
import { AdminDashboard } from '@/components/AdminDashboard';

type AdminPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminPage({ params }: AdminPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const messages = await getMessages(locale as Locale);

  return <AdminDashboard messages={messages} />;
}
