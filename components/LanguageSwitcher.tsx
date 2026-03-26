'use client';

import { useTranslation } from '@/lib/i18n';
import type { Language } from '@/lib/i18n';

const options: { value: Language; label: string }[] = [
  { value: 'en', label: 'EN' },
  { value: 'es', label: 'ES' },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] p-0.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => setLanguage(opt.value)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
            language === opt.value
              ? 'bg-accent text-white'
              : 'text-white/50 hover:text-white/80'
          }`}
          aria-label={`Switch to ${opt.label}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
