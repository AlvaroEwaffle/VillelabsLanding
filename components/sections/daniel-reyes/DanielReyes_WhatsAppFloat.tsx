'use client';

import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '56920115198';
const WHATSAPP_MSG = 'Hola, me gustaría agendar una consulta.';

export default function DanielReyes_WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed z-[9999] right-4 sm:right-6 bottom-[calc(env(safe-area-inset-bottom)+1.5rem)] inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg transition-all hover:bg-[#1fb855] hover:scale-105 touch-manipulation"
    >
      <MessageCircle className="w-5 h-5 shrink-0" />
      <span className="text-sm font-medium tracking-wide hidden sm:inline">WhatsApp</span>
    </a>
  );
}
