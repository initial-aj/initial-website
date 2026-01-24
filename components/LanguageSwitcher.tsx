'use client';

import { useState, useEffect, useRef } from 'react';
import { Globe, Check } from 'lucide-react';

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh-TW', name: '繁體中文', flag: '🇹🇼' }
  ];

  useEffect(() => {
    // Load language from localStorage
    const saved = localStorage.getItem('language') || 'en';
    setCurrentLang(saved);

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode);
    localStorage.setItem('language', langCode);
    setIsOpen(false);

    // Set cookie for server-side access
    document.cookie = `NEXT_LOCALE=${langCode};path=/;max-age=31536000`;

    // Reload the page to apply new language
    window.location.reload();
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-600 hover:text-slate-900 transition-colors relative"
        aria-label="Change language"
      >
        <Globe className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-[100]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full px-4 py-2 text-left hover:bg-slate-100 transition-colors flex items-center justify-between ${
                currentLang === lang.code ? 'bg-blue-50 text-blue-600' : 'text-slate-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-xl">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
              </span>
              {currentLang === lang.code && (
                <Check className="w-4 h-4 text-blue-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
