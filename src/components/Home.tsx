'use client';

import ConnectionCard from '@/components/ConnectionCard';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Connection, CATEGORIES } from '@/types';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { defaultLocale } from '@/i18n';
import enMessages from '@/messages/en.json';
import uaMessages from '@/messages/ua.json';
import connectionsData from '@/data/connections.json';

type SortDirection = 'asc' | 'desc';
type SortField = 'name' | 'lastInteraction' | 'connectionStrength';
type SortOption = 'name' | 'lastInteraction' | 'connectionStrength';

const sampleConnections: Connection[] = connectionsData.connections;

const formatCategoryKey = (category: string): string => {
  // Special case for "Food & Dining"
  if (category === 'Food & Dining') return 'foodAndDining';

  // For all other cases, convert to camelCase
  const words = category
    .split(/[\s&]+/) // Split on spaces and &
    .filter(word => word.length > 0); // Remove empty strings
    
  return words
    .map((word, index) => {
      // Convert each word to proper case
      const normalized = word.toLowerCase();
      // First word should be all lowercase
      if (index === 0) return normalized;
      // Other words should be capitalized
      return normalized.charAt(0).toUpperCase() + normalized.slice(1);
    })
    .join('');
};

const TRANSLATIONS = {
  en: enMessages,
  ua: uaMessages
};

export default function Home() {
  // All state declarations first
  const [messages, setMessages] = useState<any>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedCategoryId') || 'all';
    }
    return 'all';
  });
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedSubcategoryId') || 'all';
    }
    return 'all';
  });
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('searchQuery') || '';
    }
    return '';
  });
  const [sortBy, setSortBy] = useState<SortOption>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('sortBy') as SortOption) || 'name';
    }
    return 'name';
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('selectedCategories');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Add effect to persist selections
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('selectedCategoryId', selectedCategoryId);
      localStorage.setItem('selectedSubcategoryId', selectedSubcategoryId);
      localStorage.setItem('searchQuery', searchQuery);
      localStorage.setItem('sortBy', sortBy);
    }
  }, [selectedCategoryId, selectedSubcategoryId, searchQuery, sortBy, mounted]);

  // Save selected categories to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
    } catch (error) {
      console.error('Error saving selected categories:', error);
    }
  }, [selectedCategories]);

  // Memoized functions and computed values
  const t = useCallback((key: string, params?: Record<string, any>): string => {
    if (!messages) {
      console.log('No messages loaded');
      return key;
    }

    const keys = key.split('.');
    let value: any = messages;
    for (const k of keys) {
      value = value?.[k];
    }
    if (!value) {
      console.log(`No translation found for key: ${key}`);
      return key;
    }

    if (typeof value === 'string') {
      if (!params) return value;
      
      // Handle plural forms
      if (key === 'app.search.results.found') {
        const count = params.count || 0;
        const locale = localStorage.getItem('locale') || defaultLocale;
        
        if (locale === 'ua') {
          if (count === 0) return "Зв'язків не знайдено";
          if (count === 1) return "Знайдено 1 зв'язок";
          if ([2,3,4].includes(count % 10) && count % 100 > 20) return `Знайдено ${count} зв'язки`;
          return `Знайдено ${count} зв'язків`;
        } else {
          if (count === 0) return "No connections found";
          if (count === 1) return "Found 1 connection";
          return `Found ${count} connections`;
        }
      }

      // Handle regular parameter replacement
      return Object.entries(params).reduce((acc, [key, paramValue]) => {
        const translatedValue = typeof paramValue === 'string' ? paramValue : t(paramValue);
        return acc.replace(`{${key}}`, translatedValue);
      }, value);
    }
    
    return key;
  }, [messages]);

  const filteredAndSortedConnections = useMemo(() => {
    if (!messages) return [];
    
    return sampleConnections
      .filter(connection => {
        if (!searchQuery) return true;
        const searchLower = searchQuery.toLowerCase();
        
        // Get translated category and subcategory names
        const categoryName = t(`app.categories.list.${connection.categoryId}`).toLowerCase();
        const subcategoryName = t(`app.categories.subcategories.${connection.categoryId}.${connection.subcategoryId}`).toLowerCase();
        
        return (
          connection.name.toLowerCase().includes(searchLower) ||
          connection.role.toLowerCase().includes(searchLower) ||
          connection.expertise.toLowerCase().includes(searchLower) ||
          categoryName.includes(searchLower) ||
          subcategoryName.includes(searchLower)
        );
      })
      .filter(connection => {
        if (selectedCategoryId === 'all') return true;
        if (selectedSubcategoryId === 'all') return connection.categoryId === selectedCategoryId;
        return connection.categoryId === selectedCategoryId && connection.subcategoryId === selectedSubcategoryId;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'connectionStrength':
            return b.connectionStrength - a.connectionStrength;
          case 'lastInteraction':
            return new Date(b.lastInteractionAt).getTime() - new Date(a.lastInteractionAt).getTime();
          default:
            return 0;
        }
      });
  }, [searchQuery, selectedCategoryId, selectedSubcategoryId, sortBy, messages, t]);

  const sortOptions = useMemo(() => [
    { value: 'name' as const, label: t('app.sort.options.name') },
    { value: 'lastInteraction' as const, label: t('app.sort.options.lastInteraction') },
    { value: 'connectionStrength' as const, label: t('app.sort.options.connectionStrength') },
  ], [t]);

  // Sort categories alphabetically by their translated names
  const sortedCategories = useMemo(() => {
    return CATEGORIES.slice().sort((a, b) => {
      const aName = t(`app.categories.list.${a.id}`);
      const bName = t(`app.categories.list.${b.id}`);
      return aName.localeCompare(bName);
    });
  }, [t]);

  // Effects
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    try {
      const locale = localStorage.getItem('locale') || defaultLocale;
      console.log('Current locale:', locale);
      console.log('Available translations:', TRANSLATIONS);
      const selectedMessages = TRANSLATIONS[locale as keyof typeof TRANSLATIONS] || TRANSLATIONS[defaultLocale];
      console.log('Selected messages:', selectedMessages);
      setMessages(selectedMessages);
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      setMessages(TRANSLATIONS[defaultLocale]);
    } finally {
      setIsLoading(false);
    }
  }, [mounted]);

  // Early return for non-mounted state
  if (!mounted) {
    return null;
  }

  // Loading state
  if (isLoading || !messages) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Main render
  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Sidebar */}
      <div 
        className={`fixed left-0 top-0 h-screen bg-white shadow-lg z-20 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="w-64 h-full p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-900">{t('app.categories.title')}</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ←
            </button>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={() => {
                setSelectedCategoryId('all');
                setSelectedSubcategoryId('all');
              }}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                selectedCategoryId === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {t('app.categories.allServices')}
            </button>
            {sortedCategories.map((category) => (
              <div key={category.id} className="space-y-1">
                <button
                  onClick={() => {
                    setSelectedCategoryId(category.id);
                    setSelectedSubcategoryId('all');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg ${
                    selectedCategoryId === category.id
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {t(`app.categories.list.${category.id}`)}
                </button>
                {selectedCategoryId === category.id && (
                  <div className="ml-4 space-y-1">
                    <button
                      onClick={() => setSelectedSubcategoryId('all')}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-sm ${
                        selectedSubcategoryId === 'all'
                          ? 'bg-green-500 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {t('app.categories.all', { category: t(`app.categories.list.${category.id}`) })}
                    </button>
                    {category.subcategories.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => setSelectedSubcategoryId(sub.id)}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-sm ${
                          selectedSubcategoryId === sub.id
                            ? 'bg-green-500 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {t(`app.categories.subcategories.${category.id}.${sub.id}`)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Toggle sidebar button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className={`fixed left-4 top-4 z-30 bg-white p-2 rounded-lg shadow-lg border border-gray-200 text-gray-500 hover:text-gray-700 transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        →
      </button>

      {/* Main content */}
      <div className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? 'pl-64' : 'pl-0'}`}>
        <header className="text-center py-8 bg-white border-b">
          <div className="absolute right-4 top-4">
            <LanguageSwitcher />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('app.title')}</h1>
          <p className="text-lg text-gray-600">{t('app.subtitle')}</p>
        </header>

        <div className="max-w-7xl mx-auto px-4">
          {/* Search bar */}
          <div className="py-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('app.search.placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 px-4 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-xl"
                    aria-label={t('app.search.clear')}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Results count and Sort */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-gray-600">
              {t('app.search.results.found', { count: filteredAndSortedConnections.length })}
            </div>
            <div className="flex items-center gap-2">
              <label className="text-gray-600">{t('app.sort.label')}:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-1.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-8">
            {filteredAndSortedConnections.map((connection) => (
              <ConnectionCard
                key={connection.name}
                {...connection}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 