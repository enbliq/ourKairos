export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export type Messages = {
  navbar: {
    home: string;
    dashboard: string;
    login: string;
  };
  login: {
    title: string;
    action: string;
  };
  dashboard: {
    title: string;
  };
  home: {
    title: string;
    subtitle: string;
  };
};

export const isLocale = (value: string): value is Locale =>
  locales.includes(value as Locale);

export const getLocaleFromHeader = (header: string | null): Locale => {
  if (!header) return defaultLocale;

  const first = header
    .split(',')
    .map((part) => part.split(';')[0]?.trim().toLowerCase())
    .find(Boolean);

  if (!first) return defaultLocale;

  const candidate = first.split('-')[0] ?? '';
  return isLocale(candidate) ? candidate : defaultLocale;
};

const dictionaries: Record<Locale, () => Promise<Messages>> = {
  en: async () => (await import('@/messages/en.json')).default as Messages,
  es: async () => (await import('@/messages/es.json')).default as Messages,
};

export const getMessages = async (locale: Locale): Promise<Messages> =>
  dictionaries[locale]();
