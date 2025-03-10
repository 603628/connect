import {notFound} from 'next/navigation';

export const defaultLocale = 'en';
export const locales = ['en', 'ua'] as const;
export type Locale = typeof locales[number];

export function getMessages(locale: string) {
  try {
    return require(`./messages/${locale}.json`);
  } catch (error) {
    notFound();
  }
} 