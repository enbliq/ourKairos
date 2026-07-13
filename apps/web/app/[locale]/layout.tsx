import { notFound } from 'next/navigation';
import { Nav } from '@/components/Nav';
import { getMessages, isLocale, type Locale } from '@/lib/i18n';

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const messages = await getMessages(locale as Locale);

  return (
    <div className="min-h-screen bg-slate-50">
      <Nav locale={locale} messages={messages} />
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
