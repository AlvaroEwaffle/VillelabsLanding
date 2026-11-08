// Eventos del curso al dataLayer (GTM los reenvía a GA4). Mismo patrón que lib/ga4.ts.
export function trackCursoClickCompra(ubicacion: string) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: 'curso_click_compra', cta_location: ubicacion, producto: 'curso_punta_a_punta' });
}
