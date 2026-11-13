import { EXP15 } from './exp15';

// Eventos del curso al dataLayer (GTM los reenvía a GA4). Mismo patrón que lib/ga4.ts.
// 13-nov-2026: el nombre se mantiene (lo importan otros archivos), pero ahora lee la ronda vigente de /curso, EXP-15.
export const etiquetaVarianteExp13 = () => { const v = EXP15.variante(); return v ? EXP15.etiqueta(v) : undefined; };

export function trackCursoClickCompra(ubicacion: string) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: 'curso_click_compra', cta_location: ubicacion, producto: 'curso_punta_a_punta', variante: etiquetaVarianteExp13() });
}
