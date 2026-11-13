'use client';

// Rastreo de visitas y clics → Slack de Villelabs (8-nov-2026). Va en el layout principal: cubre todo villelab.com.
// La primera página de la visita abre el mensaje (con la fuente: Google, Instagram, utm…); después, cada cambio de
// página y cada clic en un botón o enlace queda en el hilo. /reels es interna y no se rastrea.

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { eventosActivos, registrarEvento, registrarLectura } from '@/lib/productos/eventos';
import { capturarUtm } from '@/lib/productos/utm';

const IGNORAR = /^\/reels(\/|$)/;
const HITOS = [25, 50, 75, 100];

// GA4 vía GTM-M7MHWVJ8: los eventos quedan en el dataLayer y GTM decide qué hacer con ellos.
function alDataLayer(evento: Record<string, unknown>) {
  try {
    const w = window as typeof window & { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer ?? [];
    w.dataLayer.push(evento);
  } catch {
    /* nunca rompe la página */
  }
}

export default function Rastreo() {
  const ruta = usePathname();
  const primera = useRef(true);

  // UTM de entrada → sessionStorage (viajan en los leads y en los links de Hotmart). Corre siempre, también en localhost.
  useEffect(() => {
    capturarUtm();
  }, [ruta]);

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
      if (!el || el.closest('[data-sin-rastreo]')) return; // el chat del chibi manda sus propios eventos
      const texto = (el.getAttribute('aria-label') || el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60);
      if (!texto) return;
      registrarEvento('clic', { detalle: texto });
    };
    document.addEventListener('click', alClic, { capture: true, passive: true });
    return () => document.removeEventListener('click', alClic, { capture: true });
  }, []);

  // Scroll (hitos 25/50/75/100 %, una vez cada uno por página vista) y tiempo visible en la página (10-nov-2026).
  // El tiempo solo cuenta mientras la pestaña está visible; sale al ocultarla/cerrarla (sendBeacon) o al cambiar de
  // página dentro del sitio.
  useEffect(() => {
    const pagina = ruta ?? '/';
    if (IGNORAR.test(pagina)) return;
    const vistos = new Set<number>();
    let maximo = 0;
    let acumulado = 0;
    let enviado = 0;
    let visibleDesde: number | null = document.visibilityState === 'visible' ? performance.now() : null;
    let ultimo = 0;
    let pendiente: ReturnType<typeof setTimeout> | null = null;

    const medir = () => {
      pendiente = null;
      ultimo = Date.now();
      const doc = document.documentElement;
      const alto = Math.max(doc.scrollHeight, document.body?.scrollHeight ?? 0);
      if (alto <= 0) return;
      const pct = Math.min(100, ((window.scrollY + window.innerHeight) / alto) * 100);
      for (const h of HITOS) {
        if (pct + 1 >= h && !vistos.has(h)) {
          vistos.add(h);
          maximo = h;
          alDataLayer({ event: 'scroll_depth', percent: h, page_path: pagina });
          registrarLectura('scroll', { ruta: pagina, pct: h });
        }
      }
    };
    const alScroll = () => {
      if (pendiente) return;
      const espera = Math.max(0, 300 - (Date.now() - ultimo));
      pendiente = setTimeout(medir, espera);
    };

    const enviarTiempo = (alSalir: boolean) => {
      if (visibleDesde !== null) {
        acumulado += performance.now() - visibleDesde;
        visibleDesde = alSalir ? null : performance.now();
      }
      const seg = Math.round(acumulado / 1000);
      if (seg < 1 || seg - enviado < 2) return;
      enviado = seg;
      alDataLayer({ event: 'tiempo_pagina', seconds: seg, percent: maximo, page_path: pagina });
      registrarLectura('tiempo', { ruta: pagina, seg, pct: maximo || undefined }, alSalir);
    };
    const alVisibilidad = () => {
      if (document.visibilityState === 'hidden') enviarTiempo(true);
      else if (visibleDesde === null) visibleDesde = performance.now();
    };
    const alSalirPagina = () => enviarTiempo(true);

    window.addEventListener('scroll', alScroll, { passive: true });
    document.addEventListener('visibilitychange', alVisibilidad);
    window.addEventListener('pagehide', alSalirPagina);
    return () => {
      window.removeEventListener('scroll', alScroll);
      document.removeEventListener('visibilitychange', alVisibilidad);
      window.removeEventListener('pagehide', alSalirPagina);
      if (pendiente) clearTimeout(pendiente);
      // Cambio de página dentro del sitio: cierra el tiempo de la anterior (la pestaña sigue viva, va por fetch).
      enviarTiempo(false);
      visibleDesde = null;
    };
  }, [ruta]);

  return null;
}
