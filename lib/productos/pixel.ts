// Píxel de Meta de villelab.com (8-nov-2026, conjunto de datos «Villelab web» de la cuenta publicitaria
// 1145492826043577). Lo carga components/productos/PixelMeta.tsx en el layout raíz.
// Eventos: PageView en cada página, Lead al registrarse en un producto, InitiateCheckout al ir a pagar a Hotmart.
// 13-nov-2026: las pruebas no ensucian a Meta. Con utm_source=qa (en la URL o guardado en la sesión) o en un navegador
// automatizado (navigator.webdriver), Lead e InitiateCheckout NO salen al píxel. El registro en Fidelidapp sigue igual
// (leads.ts). El aviso a Slack sale con utm_source=qa en villelab.com, pero nunca con navegador automatizado (eventos.ts).

import { leerUtm } from './utm';

export const PIXEL_ID = '28940136808962406';

type Fbq = (accion: 'track' | 'trackCustom', evento: string, datos?: Record<string, unknown>) => void;

/** Eventos de conversión que una prueba no debe mandar a Meta (le enseñarían a optimizar hacia nosotros mismos). */
const CONVERSIONES = new Set(['Lead', 'InitiateCheckout', 'Purchase', 'CompleteRegistration']);

/** ¿Es una visita de prueba? utm_source=qa (URL o sesión) o navegador automatizado. Nunca lanza. */
export function esVisitaDePrueba(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    if ((navigator as Navigator & { webdriver?: boolean }).webdriver) return true;
    if ((new URLSearchParams(window.location.search).get('utm_source') ?? '').trim().toLowerCase() === 'qa') return true;
    return (leerUtm().utm_source ?? '').trim().toLowerCase() === 'qa';
  } catch {
    return false;
  }
}

/** Manda un evento al píxel. Nunca lanza: si el píxel no cargó (bloqueador, localhost), no pasa nada. */
export function eventoPixel(evento: string, datos?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  if (CONVERSIONES.has(evento) && esVisitaDePrueba()) return;
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  if (typeof fbq !== 'function') return;
  try {
    fbq('track', evento, datos);
  } catch {
    /* sin píxel */
  }
}
