'use client';

import { Calendar, MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '56920115198';
const WHATSAPP_MSG = 'Hola, me gustaría agendar una consulta.';

export default function DanielReyes_StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] bg-white/[0.97] backdrop-blur-xl border-t border-slate-100 p-3 md:hidden">
      <div className="flex gap-2.5 max-w-[480px] mx-auto">
        <a
          href="#contacto"
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-teal-600 text-white rounded-[9px] text-sm font-semibold transition-colors hover:bg-teal-700"
        >
          <Calendar className="w-4 h-4" />
          Agendar consulta
        </a>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] text-white rounded-[9px] text-sm font-semibold transition-colors hover:bg-[#1fb855]"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
