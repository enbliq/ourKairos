import Link from 'next/link';
import { notFound } from 'next/navigation';
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
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href={`/${locale}`} className="font-semibold text-slate-900">
            {messages.home.title}
          </Link>
          <div className="flex items-center gap-5 text-sm text-slate-700">
            <Link href={`/${locale}`}>{messages.navbar.home}</Link>
            <Link href={`/${locale}/dashboard`}>{messages.navbar.dashboard}</Link>
            <Link href={`/${locale}/login`}>{messages.navbar.login}</Link>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
