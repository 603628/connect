'use client';

import { LOCATIONS } from '@/types';
import React, { useCallback, useState, useEffect } from 'react';
import { defaultLocale } from '@/i18n';
import enMessages from '@/messages/en.json';
import uaMessages from '@/messages/ua.json';

const TRANSLATIONS = {
  en: enMessages,
  ua: uaMessages
};

export default function LocationSelector() {
  const [selectedLocation, setSelectedLocation] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedLocation') || LOCATIONS[0].id;
    }
    return LOCATIONS[0].id;
  });

  const t = useCallback((key: string): string => {
    try {
      const locale = localStorage.getItem('locale') || defaultLocale;
      const messages = TRANSLATIONS[locale as keyof typeof TRANSLATIONS] || TRANSLATIONS[defaultLocale];
      
      const keys = key.split('.');
      let value: any = messages;
      for (const k of keys) {
        value = value?.[k];
      }

      return value || key;
    } catch (error) {
      console.error('Error in translation:', error);
      return key;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedLocation', selectedLocation);
  }, [selectedLocation]);

  return (
    <div className="flex items-center h-12">
      <select
        id="location-select"
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
        className="h-full text-base bg-gray-50 border border-gray-300 rounded-lg px-4 appearance-none cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[200px]"
      >
        {LOCATIONS.map(location => (
          <option key={location.id} value={location.id}>
            {t(`app.location.list.${location.id}`)}
          </option>
        ))}
      </select>
    </div>
  );
} 