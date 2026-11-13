import type { Metadata } from 'next';
import { AUTOR, JsonLd, ORGANIZACION, SITE_URL, videoObject } from '@/lib/productos/seo';
import EsqueletoApp from '@/components/productos/esqueleto/EsqueletoApp';
import { fraunces } from '@/lib/productos/fuente';
import { EXP14 } from '@/lib/productos/esqueleto/exp14';


/*
 * /esqueleto — «El esqueleto de tu asistente de WhatsApp», imán gratis de la Entrada A (contenido → esqueleto → Guía 1).
 * Ex /ficha (rehecho el 7-nov-2026 con el feedback de Álvaro). Base: VPM/Villelabs/productos-digitales/contenido-primeros-productos.html.
 * Eventos dataLayer: esqueleto_inicio, esqueleto_paso, esqueleto_completo, esqueleto_click_guia, exp14_variante.
 * EXP-14 (12-nov-2026, 17:00): dos variantes A/B, correo en la primera pantalla (lib/productos/esqueleto/exp14.ts) y correo a medias (lib/productos/esqueleto/parcial.ts).
 */
export const metadata: Metadata = {
  title: { absolute: 'Esqueleto de tu asistente de WhatsApp, gratis' },
  description:
    'Arma gratis en 15 minutos la base de tu asistente de WhatsApp: qué vendes, las preguntas de siempre, qué nunca promete y cuándo te avisa.',
  alternates: { canonical: `${SITE_URL}/esqueleto` },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Villelab',
    title: 'Te regalo el esqueleto de tu asistente de WhatsApp',
    description: '4 pasos, 15 minutos y gratis: la base para que tu WhatsApp responda las preguntas de siempre sin inventar nada.',
    url: `${SITE_URL}/esqueleto`,
    images: [{ url: `${SITE_URL}/og/esqueleto.jpg`, width: 1200, height: 630, alt: 'Te regalo el esqueleto de tu asistente de WhatsApp' }],
  },
  twitter: { card: 'summary_large_image', title: 'Te regalo el esqueleto de tu asistente de WhatsApp', description: '4 pasos, 15 minutos y gratis: la base para que tu WhatsApp responda las preguntas de siempre sin inventar nada.', images: [`${SITE_URL}/og/esqueleto.jpg`] },
};

const JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'El esqueleto de tu asistente de WhatsApp',
    url: `${SITE_URL}/esqueleto`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    inLanguage: 'es',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'CLP' },
    description: 'Plantilla guiada en 4 pasos para dejar escrito qué responde tu asistente de WhatsApp, qué nunca promete y cuándo deriva a una persona.',
    author: AUTOR,
    publisher: ORGANIZACION,
  },
  videoObject({
    id: 'v02-esqueleto-bienvenida',
    nombre: 'Lo que vas a armar en los próximos 15 minutos',
    descripcion: 'Álvaro Villena muestra los 4 pasos del esqueleto de tu asistente de WhatsApp y cómo queda listo para copiar, con el caso de la tostaduría Grano Norte.',
    segundos: 38,
    pagina: '/esqueleto',
  }),
];

export default function EsqueletoPage() {
  return (
    <div className={fraunces.variable}>
      {/* EXP-09: elige la variante del hero antes de pintarlo (constante propia del repo, sin datos de usuarios). */}
      <script dangerouslySetInnerHTML={{ __html: EXP14.script }} />
      <JsonLd data={JSON_LD} />
      <EsqueletoApp />
    </div>
  );
}
