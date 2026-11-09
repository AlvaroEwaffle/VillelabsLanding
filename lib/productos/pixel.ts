// Píxel de Meta de villelab.com (8-nov-2026, conjunto de datos «Villelab web» de la cuenta publicitaria
// 1145492826043577). Lo carga components/productos/PixelMeta.tsx en el layout raíz.
// Eventos: PageView en cada página, Lead al registrarse en un producto, InitiateCheckout al ir a pagar a Hotmart.

export const PIXEL_ID = '28940136808962406';

type Fbq = (accion: 'track' | 'trackCustom', evento: string, datos?: Record<string, unknown>) => void;

/** Manda un evento al píxel. Nunca lanza: si el píxel no cargó (bloqueador, localhost), no pasa nada. */
export function eventoPixel(evento: string, datos?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  if (typeof fbq !== 'function') return;
  try {
    fbq('track', evento, datos);
  } catch {
    /* sin píxel */
  }
}
