'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { createElement } from 'react';
import type { Language, TranslationDictionary } from './types';
import { en } from './translations/en';
import { es } from './translations/es';

const STORAGE_KEY = 'villelabs_lang';

const translations: Record<Language, TranslationDictionary> = { en, es };

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: 'en',
  setLanguage: () => {},
  t: en,
});

function detectLanguage(): Language {
  // 1. Check localStorage
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'es') return stored;
    } catch {
      // localStorage unavailable
    }

    // 2. Check browser language
    const browserLang = navigator.language?.toLowerCase() ?? '';
    if (browserLang.startsWith('es')) return 'es';
  }

  // 3. Default to English
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLanguageState(detectLanguage());
    setMounted(true);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // localStorage unavailable
    }
    document.documentElement.lang = lang;
  }, []);

  // Set initial lang attribute
  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = language;
    }
  }, [language, mounted]);

  const value: LanguageContextValue = {
    language,
    setLanguage,
    t: translations[language],
  };

  return createElement(LanguageContext.Provider, { value }, children);
}

export function useTranslation() {
  return useContext(LanguageContext);
}

export function getWhatsAppUrl(language: Language): string {
  const message =
    language === 'es'
      ? 'Hola, me gustaría saber más sobre sus servicios. Los encontré en villelabs.cl'
      : "Hi, I'd like to know more about your services. I found you at villelabs.cl";
  return `https://wa.me/56920115198?text=${encodeURIComponent(message)}`;
}

export type { Language, TranslationDictionary };
