'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { defaultLocale } from '@/i18n';

const LANGUAGES = [
  {
    code: 'en',
    name: 'English',
    flag: '/flags/ca.svg'  // Canadian flag
  },
  {
    code: 'ua',
    name: 'Українська',
    flag: '/flags/ua.svg'  // Ukrainian flag
  }
];

export default function LanguageSwitcher() {
  const [currentLocale, setCurrentLocale] = useState(defaultLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedLocale = typeof window !== 'undefined'
        ? localStorage.getItem('locale') || defaultLocale
        : defaultLocale;
      setCurrentLocale(savedLocale);
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
    setMounted(true);
  }, []);

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) return null;

  const handleLanguageChange = (newLocale: string) => {
    try {
      localStorage.setItem('locale', newLocale);
      window.location.reload();
    } catch (error) {
      console.error('Error setting locale:', error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
            currentLocale === lang.code
              ? 'bg-blue-50 text-blue-600'
              : 'hover:bg-gray-100'
          }`}
          aria-label={`Switch to ${lang.name}`}
        >
          <Image
            src={lang.flag}
            alt={`${lang.name} flag`}
            width={20}
            height={15}
            className="rounded-sm"
          />
          <span className="text-sm font-medium">{lang.name}</span>
        </button>
      ))}
    </div>
  );
} 