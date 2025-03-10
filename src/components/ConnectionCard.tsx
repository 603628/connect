'use client';

import { ConnectionCardProps, CATEGORIES } from '@/types';
import React from 'react';
import { useCallback } from 'react';
import { defaultLocale } from '@/i18n';
import enMessages from '@/messages/en.json';
import uaMessages from '@/messages/ua.json';
import Image from 'next/image';

const TRANSLATIONS = {
  en: enMessages,
  ua: uaMessages
};

const formatRelativeTime = (timestamp: string, locale: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30.44); // More accurate month calculation
  const diffInYears = Math.floor(diffInDays / 365.25); // More accurate year calculation

  if (locale === 'ua') {
    if (diffInSeconds < 60) return 'щойно';
    if (diffInMinutes < 60) {
      if ([2,3,4].includes(diffInMinutes)) return `${diffInMinutes} хвилини тому`;
      if (diffInMinutes === 1) return 'хвилину тому';
      return `${diffInMinutes} хвилин тому`;
    }
    if (diffInHours < 24) {
      if ([2,3,4].includes(diffInHours)) return `${diffInHours} години тому`;
      if (diffInHours === 1) return 'годину тому';
      return `${diffInHours} годин тому`;
    }
    if (diffInDays < 7) {
      if ([2,3,4].includes(diffInDays)) return `${diffInDays} дні тому`;
      if (diffInDays === 1) return 'день тому';
      return `${diffInDays} днів тому`;
    }
    if (diffInWeeks < 4) {
      if ([2,3,4].includes(diffInWeeks)) return `${diffInWeeks} тижні тому`;
      if (diffInWeeks === 1) return 'тиждень тому';
      return `${diffInWeeks} тижнів тому`;
    }

    // For 1 year or more, use years
    if (diffInYears >= 1) {
      if ([2,3,4].includes(diffInYears)) return `${diffInYears} роки тому`;
      if (diffInYears === 1) return 'рік тому';
      return `${diffInYears} років тому`;
    }

    // For less than a year, use months
    const months = diffInMonths;
    if ([2,3,4].includes(months)) return `${months} місяці тому`;
    if (months === 1) return 'місяць тому';
    return `${months} місяців тому`;
  } else {
    if (diffInSeconds < 60) return 'just now';
    if (diffInMinutes < 60) return diffInMinutes === 1 ? '1 minute ago' : `${diffInMinutes} minutes ago`;
    if (diffInHours < 24) return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`;
    if (diffInDays < 7) return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
    if (diffInWeeks < 4) return diffInWeeks === 1 ? '1 week ago' : `${diffInWeeks} weeks ago`;
    
    // For 1 year or more, use years
    if (diffInYears >= 1) {
      return diffInYears === 1 ? '1 year ago' : `${diffInYears} years ago`;
    }

    // For less than a year, use months
    return diffInMonths === 1 ? '1 month ago' : `${diffInMonths} months ago`;
  }
};

export default function ConnectionCard({
  name,
  role,
  imageUrl,
  connectionStrength,
  lastInteractionAt,
  categoryId,
  subcategoryId,
  expertise,
}: ConnectionCardProps) {
  const t = useCallback((key: string, params?: Record<string, any>): string => {
    try {
      const locale = localStorage.getItem('locale') || defaultLocale;
      const messages = TRANSLATIONS[locale as keyof typeof TRANSLATIONS] || TRANSLATIONS[defaultLocale];
      
      const keys = key.split('.');
      let value: any = messages;
      for (const k of keys) {
        value = value?.[k];
      }

      if (!value) return key;
      
      if (params) {
        return Object.entries(params).reduce((acc, [key, paramValue]) => {
          return acc.replace(`{${key}}`, paramValue.toString());
        }, value);
      }
      
      return value;
    } catch (error) {
      console.error('Error in translation:', error);
      return key;
    }
  }, []);

  const locale = typeof window !== 'undefined' ? localStorage.getItem('locale') || defaultLocale : defaultLocale;

  const getReliabilityColor = (score: number) => {
    if (score >= 7) return 'bg-green-500';
    if (score >= 4) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getReliabilityLabel = (score: number) => {
    if (score >= 7) return t('app.connection.reliability.high');
    if (score >= 4) return t('app.connection.reliability.medium');
    return t('app.connection.reliability.low');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-4">
        <div className="relative w-16 h-16">
          <Image
            src={imageUrl}
            alt={`${name}'s profile`}
            className="rounded-full object-cover"
            fill
            sizes="64px"
            priority={false}
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900">{name}</h3>
          <p className="text-gray-600 text-sm">{role}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
              {t(`app.categories.list.${categoryId}`)}
            </span>
            <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
              {t(`app.categories.subcategories.${categoryId}.${subcategoryId}`)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">
              {t('app.connection.reliability.label')}
            </span>
            <span className="text-sm text-gray-600">
              {t('app.connection.reliability.outOf', { score: connectionStrength })}
            </span>
          </div>
          <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`absolute left-0 top-0 h-full rounded-full transition-all ${getReliabilityColor(connectionStrength)}`}
              style={{ width: `${connectionStrength * 10}%` }}
            />
          </div>
          <p className="text-sm mt-1 text-gray-600">{getReliabilityLabel(connectionStrength)}</p>
        </div>

        <p className="text-sm text-gray-600 mb-2">
          {expertise}
        </p>
        <p className="text-sm text-gray-500">
          {locale === 'ua' ? 'Остання взаємодія: ' : 'Last interaction: '}
          {formatRelativeTime(lastInteractionAt, locale)}
        </p>
      </div>
    </div>
  );
} 