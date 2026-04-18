'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
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
  language: 'es',
  setLanguage: () => {},
  t: es,
});

function detectLanguage(): Language {
  if (typeof window !== 'undefined') {
    try {
      const urlLang = new URLSearchParams(window.location.search).get('lang');
      if (urlLang === 'en' || urlLang === 'es') {
        localStorage.setItem(STORAGE_KEY, urlLang);
        return urlLang;
      }

      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'es') return stored;
    } catch {
      // localStorage unavailable
    }
  }

  return 'es';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es');
  const didDetectLanguage = useRef(false);

  useEffect(() => {
    if (didDetectLanguage.current) return;

    didDetectLanguage.current = true;
    const detectedLanguage = detectLanguage();
    if (detectedLanguage !== language) {
      window.setTimeout(() => setLanguageState(detectedLanguage), 0);
    }
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // localStorage unavailable
    }
    document.documentElement.lang = lang;
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

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
