'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { useTranslation, getWhatsAppUrl } from '@/lib/i18n';

// Mensaje prellenado por página de producto (análisis UX «Rodrigo», 8-nov-2026): el genérico «si un agente tiene
// sentido para mi equipo» no tenía nada que ver con lo que la persona estaba mirando.
const MENSAJE_POR_PAGINA: Record<string, string> = {
  '/esqueleto': 'Hola Álvaro, estoy armando el esqueleto de mi asistente y tengo una duda',
  '/guia': 'Hola Álvaro, tengo una pregunta sobre la Guía de clientes',
  '/curso': 'Hola Álvaro, quiero saber más del curso El sistema de tu negocio',
};

function urlWhatsApp(pathname: string | null, porDefecto: string): string {
  const ruta = (pathname || '').replace(/\/+$/, '') || '/';
  const mensaje = MENSAJE_POR_PAGINA[ruta];
  return mensaje ? `https://wa.me/56920115198?text=${encodeURIComponent(mensaje)}` : porDefecto;
}

export default function WhatsAppFloatButton() {
  const pathname = usePathname();
  const { t, language } = useTranslation();
  // En móvil el botón flotante tapaba el botón de WhatsApp del hero: aparece recién al bajar.
  const [pastHero, setPastHero] = useState(false);
  // EXP-08 (10-nov-2026): en /curso, en celular, sube sobre la barra fija de compra.
  const enCurso = (pathname || '').replace(/\/+$/, '') === '/curso';

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 480);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href={urlWhatsApp(pathname, getWhatsAppUrl(language))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.ariaLabel}
      className={`fixed z-[9999] right-4 sm:right-6 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-3 text-green-400 backdrop-blur-md shadow-[0_18px_60px_rgba(0,0,0,0.3)] transition-all duration-300 hover:border-green-500/40 hover:bg-green-500/20 hover:text-green-300 touch-manipulation ${
        enCurso ? 'bottom-[calc(env(safe-area-inset-bottom)+5.5rem)] md:bottom-[calc(env(safe-area-inset-bottom)+1.5rem)]' : 'bottom-[calc(env(safe-area-inset-bottom)+1.5rem)]'
      } ${
        pastHero ? 'opacity-100' : 'pointer-events-none opacity-0 sm:pointer-events-auto sm:opacity-100'
      }`}
    >
      <MessageCircle className="w-5 h-5 shrink-0" />
      <span className="text-sm font-light tracking-wide hidden sm:inline">{t.whatsapp.chatWithUs}</span>
    </a>
  );
}
