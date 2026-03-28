import { notFound } from 'next/navigation';
import { getMessages, isLocale, type Locale } from '@/lib/i18n';

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocalizedHomePage({ params }: HomePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const messages = await getMessages(locale as Locale);

  return (
    <section className="space-y-3">
      <h1 className="text-4xl font-bold text-slate-900">{messages.home.title}</h1>
      <p className="text-lg text-slate-600">{messages.home.subtitle}</p>
    </section>
  );
}
