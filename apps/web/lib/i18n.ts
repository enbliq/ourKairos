export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export type Messages = {
  navbar: {
    home: string;
    dashboard: string;
    login: string;
    register: string;
    logout: string;
  };
  login: {
    title: string;
    email: string;
    password: string;
    action: string;
    noAccount: string;
    registerLink: string;
  };
  register: {
    title: string;
    name: string;
    email: string;
    password: string;
    action: string;
    hasAccount: string;
    loginLink: string;
  };
  dashboard: {
    title: string;
    welcome: string;
  };
  home: {
    title: string;
    subtitle: string;
  };
  errors: {
    generic: string;
    retry: string;
    loading: string;
    invalidCredentials: string;
    emailInUse: string;
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
