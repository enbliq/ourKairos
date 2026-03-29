import type { Locale } from "./config";

export const dictionaries = {
  en: () => import("./messages/en.json"),
  es: () => import("./messages/es.json")
};

export const loadMessages = async (locale: Locale) => {
  const loader = dictionaries[locale] ?? dictionaries.en;
  return (await loader()).default;
};
