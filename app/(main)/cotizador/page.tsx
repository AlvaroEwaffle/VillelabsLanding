import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/productos/seo';
import { fraunces } from '@/lib/productos/fuente';
import CotizadorApp from '@/components/productos/cotizador/CotizadorApp';

/*
 * /cotizador — «Cotiza tu agente» (12-nov-2026; en producción desde las 21:55, indexable desde las 22:10).
 * Hipótesis de Álvaro: la gente no quiere aprender, quiere que se lo hagan (/curso: 7 de 94 bajan del primer
 * pantallazo; /esqueleto, que arma algo, retiene ~5 veces más). Vende el servicio de agentes (lib/precios.ts).
 * Eventos dataLayer: cotizador_inicio, cotizador_trabajo, cotizador_paso, cotizador_resultado, cotizador_click_agendar,
 * cotizador_lead. Slack: «🧭 cotizador · …» en el hilo de la visita.
 */
// 12-nov-2026 22:10 (Álvaro: «No lo ocultes a Google, que se indexe todo»): sin noindex, en el sitemap y enlazado desde /agentes.
const TITULO = 'Cotiza tu agente de IA para tu negocio | Villelab';
const DESCRIPCION =
  'Elige qué le pasarías a un agente de IA: licitaciones, prospección, marketing, atención por WhatsApp, correo y agenda, administración u operación. Ve qué haría cada día y tu cotización al tiro.';
export const metadata: Metadata = {
  title: { absolute: TITULO },
  description: DESCRIPCION,
  alternates: { canonical: `${SITE_URL}/cotizador` },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Villelab',
    title: '¿Qué trabajo le pasarías a un agente de IA?',
    description: DESCRIPCION,
    url: `${SITE_URL}/cotizador`,
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'Villelab · Agentes de IA para el trabajo de tu equipo' }],
  },
  twitter: { card: 'summary_large_image', title: TITULO, description: DESCRIPCION, images: [`${SITE_URL}/og-image.jpg`] },
};

export default function CotizadorPage() {
  return (
    <div className={fraunces.variable}>
      <CotizadorApp />
    </div>
  );
}
