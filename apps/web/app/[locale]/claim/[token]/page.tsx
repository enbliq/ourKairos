import { notFound } from 'next/navigation';
import { getMessages, isLocale, type Locale } from '@/lib/i18n';
import { GiftClaimShell } from '@/components/GiftClaimShell';

type ClaimPageProps = {
  params: Promise<{ locale: string; token: string }>;
};

export default async function ClaimPage({ params }: ClaimPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const messages = await getMessages(locale as Locale);

  return <GiftClaimShell messages={messages} />;
}
