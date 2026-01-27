'use client';

import { useState, useEffect } from 'react';
import enTranslations from '@/locales/en.json';
import zhTWTranslations from '@/locales/zh-TW.json';

type TranslationKey = string;

const translations: { [key: string]: any } = {
  en: enTranslations,
  'zh-TW': zhTWTranslations,
};

export function useTranslation() {
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    // Load language preference from localStorage
    const savedLang = localStorage.getItem('language') || 'en';
    setLocale(savedLang);

    // Listen for language changes
    const handleLanguageChange = (event: any) => {
      setLocale(event.detail.language);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const t = (key: TranslationKey): string => {
    const keys = key.split('.');
    let value: any = translations[locale] || translations.en;

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        // Fallback to English if translation missing
        value = translations.en;
        for (const fallbackKey of keys) {
          value = value?.[fallbackKey];
          if (value === undefined) return key;
        }
      }
    }

    return value || key;
  };

  return { t, locale };
}
