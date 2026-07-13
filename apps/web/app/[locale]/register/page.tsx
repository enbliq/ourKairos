import { notFound } from 'next/navigation';
import { getMessages, isLocale, type Locale } from '@/lib/i18n';
import { RegisterForm } from './RegisterForm';

type RegisterPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function RegisterPage({ params }: RegisterPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const messages = await getMessages(locale as Locale);

  return <RegisterForm locale={locale} messages={messages} />;
}
