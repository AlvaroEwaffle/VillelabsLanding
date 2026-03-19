'use client';

import { MessageCircle } from 'lucide-react';
import { useTranslation, getWhatsAppUrl } from '@/lib/i18n';

export default function WhatsAppFloatButton() {
  const { t, language } = useTranslation();

  return (
    <a
      href={getWhatsAppUrl(language)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.ariaLabel}
      className="fixed z-[9999] right-4 sm:right-6 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-3 text-green-400 backdrop-blur-md shadow-[0_18px_60px_rgba(0,0,0,0.3)] transition-colors duration-300 hover:border-green-500/40 hover:bg-green-500/20 hover:text-green-300 touch-manipulation sm:bottom-[calc(env(safe-area-inset-bottom)+1.5rem)] bottom-[calc(env(safe-area-inset-bottom)+1.5rem)]"
    >
      <MessageCircle className="w-5 h-5 shrink-0" />
      <span className="text-sm font-light tracking-wide hidden sm:inline">{t.whatsapp.chatWithUs}</span>
    </a>
  );
}
