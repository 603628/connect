'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import connectionsData from '@/data/connections.json';
import { defaultLocale } from '@/i18n';
import enMessages from '@/messages/en.json';
import uaMessages from '@/messages/ua.json';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const TRANSLATIONS = {
  en: enMessages,
  ua: uaMessages
};

export default function ServicePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [isClient, setIsClient] = useState(false);
  const [currentLocale, setCurrentLocale] = useState(defaultLocale);

  useEffect(() => {
    setIsClient(true);
    const storedLocale = localStorage.getItem('locale') || defaultLocale;
    setCurrentLocale(storedLocale);
  }, []);

  // Find the connection based on the slug
  const connection = connectionsData.connections.find(
    conn => conn.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug
  );

  const t = (key: string): string => {
    try {
      const messages = TRANSLATIONS[currentLocale as keyof typeof TRANSLATIONS] || TRANSLATIONS[defaultLocale];
      
      const keys = key.split('.');
      let value: any = messages;
      for (const k of keys) {
        value = value?.[k];
      }
      return value || key;
    } catch {
      return key;
    }
  };

  const goBack = () => {
    router.push('/');
  };

  if (!connection) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={goBack}
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <span className="mr-2">←</span>
              {t('app.navigation.back')}
            </button>
            <LanguageSwitcher />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {isClient ? t('app.service.notFound') : 'Loading...'}
          </h1>
        </div>
      </div>
    );
  }

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <button className="flex items-center text-blue-600">
              <span className="mr-2">←</span>
              {t('app.navigation.back')}
            </button>
            <LanguageSwitcher />
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{connection.name}</h1>
              <p className="text-lg text-gray-600 mb-4">{connection.role}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={goBack}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <span className="mr-2">←</span>
            {t('app.navigation.back')}
          </button>
          <LanguageSwitcher />
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          {/* Basic Info */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{connection.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{connection.role}</p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>{t(`app.categories.list.${connection.categoryId}`)}</span>
              <span>•</span>
              <span>{t(`app.categories.subcategories.${connection.categoryId}.${connection.subcategoryId}`)}</span>
            </div>
          </div>

          {/* Coming Soon Message */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-2">
              {t('app.service.comingSoon')}
            </h2>
            <p className="text-blue-700">
              {t('app.service.comingSoonMessage')}
            </p>
          </div>

          {/* Placeholder Sections */}
          <div className="space-y-8 opacity-50">
            {/* Reviews Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('app.service.reviews.title')}</h2>
              <div className="bg-gray-100 rounded-lg p-6">
                <p className="text-gray-600">{t('app.service.comingSoon')}</p>
              </div>
            </section>

            {/* Add Review Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('app.service.addReview.title')}</h2>
              <div className="bg-gray-100 rounded-lg p-6">
                <p className="text-gray-600">{t('app.service.comingSoon')}</p>
              </div>
            </section>

            {/* Photo Gallery */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('app.service.gallery.title')}</h2>
              <div className="bg-gray-100 rounded-lg p-6">
                <p className="text-gray-600">{t('app.service.comingSoon')}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 