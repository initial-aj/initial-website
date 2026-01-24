import { useEffect, useState } from 'react';

type Messages = {
  [key: string]: any;
};

let cachedMessages: { [locale: string]: Messages } = {};

export async function getMessages(locale: string): Promise<Messages> {
  if (cachedMessages[locale]) {
    return cachedMessages[locale];
  }

  try {
    const messages = await import(`../messages/${locale}.json`);
    cachedMessages[locale] = messages.default;
    return messages.default;
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    // Fallback to English
    const messages = await import(`../messages/en.json`);
    return messages.default;
  }
}

export function useTranslations() {
  const [messages, setMessages] = useState<Messages>({});
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    // Get language from localStorage
    const savedLang = localStorage.getItem('language') || 'en';
    setLocale(savedLang);

    // Load messages
    getMessages(savedLang).then(setMessages);
  }, []);

  const t = (key: string, fallback?: string): string => {
    const keys = key.split('.');
    let value: any = messages;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return fallback || key;
      }
    }

    return typeof value === 'string' ? value : fallback || key;
  };

  return { t, locale, messages };
}

// Helper function to get nested value from object
function getNestedValue(obj: any, path: string): string | undefined {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}
