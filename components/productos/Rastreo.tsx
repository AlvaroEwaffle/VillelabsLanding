'use client';

// Rastreo de visitas y clics → Slack de Villelabs (8-nov-2026). Va en el layout principal: cubre todo villelab.com.
// La primera página de la visita abre el mensaje (con la fuente: Google, Instagram, utm…); después, cada cambio de
// página y cada clic en un botón o enlace queda en el hilo. /reels es interna y no se rastrea.

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { eventosActivos, registrarEvento } from '@/lib/productos/eventos';

const IGNORAR = /^\/reels(\/|$)/;

export default function Rastreo() {
  const ruta = usePathname();
  const primera = useRef(true);

  useEffect(() => {
    if (!eventosActivos() || IGNORAR.test(ruta ?? '')) return;
    if (primera.current) {
      primera.current = false;
      const q = new URLSearchParams(location.search);
      const utm = [q.get('utm_source'), q.get('utm_campaign')].filter(Boolean).join(' / ');
      registrarEvento('visita', { ref: document.referrer, utm: utm || (q.get('gclid') ? 'Google Ads' : '') });
    } else {
      registrarEvento('pagina');
    }
  }, [ruta]);

  useEffect(() => {
    if (!eventosActivos()) return;
    const alClic = (e: MouseEvent) => {
      if (IGNORAR.test(location.pathname)) return;
      const el = (e.target as HTMLElement | null)?.closest('a, button') as HTMLElement | null;
      if (!el) return;
      const texto = (el.getAttribute('aria-label') || el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60);
      if (!texto) return;
      registrarEvento('clic', { detalle: texto });
    };
    document.addEventListener('click', alClic, { capture: true, passive: true });
    return () => document.removeEventListener('click', alClic, { capture: true });
  }, []);

  return null;
}
