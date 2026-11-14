import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/productos/seo';
import { fraunces } from '@/lib/productos/fuente';
import CotizadorApp from '@/components/productos/cotizador/CotizadorApp';
import { NOTA_IVA, PRECIOS_AGENTES, uf } from '@/lib/precios';

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
      {/* 13-nov-2026 (auditoría AI SEO): los mismos precios de referencia que muestra el resultado del cotizador (lib/precios.ts),
          en texto en el HTML para quien lee la página sin JavaScript (buscadores y asistentes de IA). Bajo la herramienta,
          sin cambiar ninguna cifra ni el flujo. */}
      <section aria-labelledby="cot-precios" className="bg-[#0f172a] text-slate-300">
        <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
          <h2 id="cot-precios" className="text-sm font-semibold text-slate-200">Precios de referencia de Agentes como servicio</h2>
          <ul className="mt-3 space-y-1 text-sm">
            <li>Reunión de 30 min: gratis.</li>
            <li>Implementación (una vez): desde {uf(PRECIOS_AGENTES.implementacionUF)}.</li>
            <li>
              Mantenimiento mensual: {uf(PRECIOS_AGENTES.mantenimientoUF)}/mes con tu licencia de Claude, o{' '}
              {uf(PRECIOS_AGENTES.mantenimientoConLicenciaUF)}/mes con una licencia de Claude incluida (la ponemos nosotros).
            </li>
          </ul>
          <p className="mt-3 text-sm">Son valores de referencia; el precio final lo cerramos en la reunión.</p>
          <p className="mt-1 text-xs text-slate-400">{NOTA_IVA.es}</p>
        </div>
      </section>
    </div>
  );
}
