import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/productos/seo';
import { fraunces } from '@/lib/productos/fuente';
import CotizadorApp from '@/components/productos/cotizador/CotizadorApp';

/*
 * /cotizador — «Cotiza tu agente» (BORRADOR 12-nov-2026, solo preview en cotizador.villelabs.pages.dev).
 * Hipótesis de Álvaro: la gente no quiere aprender, quiere que se lo hagan (/curso: 7 de 94 bajan del primer
 * pantallazo; /esqueleto, que arma algo, retiene ~5 veces más). Vende el servicio de agentes (lib/precios.ts).
 * Eventos dataLayer: cotizador_inicio, cotizador_trabajo, cotizador_paso, cotizador_resultado, cotizador_click_agendar,
 * cotizador_lead. Slack: «🧭 cotizador · …» en el hilo de la visita.
 */
export const metadata: Metadata = {
  title: { absolute: 'Cotiza tu agente · Villelab' },
  description:
    'Elige qué trabajo le pasarías a un agente y ve al tiro qué haría cada día y cuánto cuesta: reunión de 30 minutos gratis, implementación desde 12 UF.',
  // BORRADOR: noindex mientras sea preview. Al publicar en producción, borrar esta línea.
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/cotizador` },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Villelab',
    title: '¿Qué trabajo le pasarías a un agente?',
    description: 'Elige el trabajo, responde tres preguntas y ve tu cotización en pantalla, sin dejar tu correo.',
    url: `${SITE_URL}/cotizador`,
  },
};

export default function CotizadorPage() {
  return (
    <div className={fraunces.variable}>
      <CotizadorApp />
    </div>
  );
}
