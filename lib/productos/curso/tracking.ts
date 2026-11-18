import { EXP21 } from './exp21';

// Eventos del curso al dataLayer (GTM los reenvía a GA4). Mismo patrón que lib/ga4.ts.
// 13-nov-2026: el nombre se mantiene (lo importan otros archivos), pero lee la ronda vigente de /curso: EXP-21 desde el 18-nov.
export const etiquetaVarianteExp13 = () => { const v = EXP21.variante(); return v ? EXP21.etiqueta(v) : undefined; };

export function trackCursoClickCompra(ubicacion: string) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: 'curso_click_compra', cta_location: ubicacion, producto: 'curso_punta_a_punta', variante: etiquetaVarianteExp13() });
}
