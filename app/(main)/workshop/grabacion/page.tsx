import type { Metadata } from 'next';
import { AUTOR, JsonLd, ORGANIZACION, SITE_URL, videoObject } from '@/lib/productos/seo';
import { fraunces } from '@/lib/productos/fuente';
import Grabacion from '@/components/productos/workshop/Grabacion';


export const metadata: Metadata = {
  title: { absolute: 'Grabación gratis: responde WhatsApp sin perder clientes' },
  description:
    'Mira gratis la grabación del workshop: cómo responder por WhatsApp las preguntas de siempre sin inventar nada, con el esqueleto de tu agente y un caso real.',
  alternates: { canonical: `${SITE_URL}/workshop/grabacion` },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Villelab',
    title: 'Grabación del workshop: que ningún cliente se te quede sin respuesta',
    description: '45 minutos, gratis y a tu ritmo, con el caso de una tostaduría de café de Valparaíso.',
    url: `${SITE_URL}/workshop/grabacion`,
    images: [{ url: `${SITE_URL}/og/grabacion.jpg`, width: 1200, height: 630, alt: 'Grabación del workshop: que ningún cliente se te quede sin respuesta' }],
  },
  twitter: { card: 'summary_large_image', title: 'Grabación del workshop: que ningún cliente se te quede sin respuesta', description: '45 minutos, gratis y a tu ritmo, con el caso de una tostaduría de café de Valparaíso.', images: [`${SITE_URL}/og/grabacion.jpg`] },
};

// TODO: cuando esté la grabación publicada, sumar su VideoObject (embedUrl de YouTube + duración real de 45 min).
const JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Grabación del workshop: que ningún cliente se te quede sin respuesta',
    url: `${SITE_URL}/workshop/grabacion`,
    inLanguage: 'es',
    isAccessibleForFree: true,
    author: AUTOR,
    publisher: ORGANIZACION,
  },
  videoObject({
    id: 'v07-workshop-grabacion-intro',
    nombre: 'Antes de que veas la grabación',
    descripcion: 'Qué vas a ver en la grabación del workshop y qué conviene tener a mano: el esqueleto de tu agente de atención al cliente.',
    segundos: 18,
    pagina: '/workshop/grabacion',
  }),
  videoObject({
    id: 'v08b-curso-venta',
    nombre: 'Construye con IA tu sistema CRM y ERP',
    descripcion: 'Álvaro Villena presenta el curso: armas con IA tu CRM y ERP en Google Sheets, una hoja a la vez con las fórmulas listas, hasta un tablero con lo que vendiste, lo que te deben y cuánta caja tienes. No es un software: es una planilla bien armada y rutinas cortas.',
    segundos: 40,
    pagina: '/workshop/grabacion',
    subida: '2026-11-12',
  }),
];

export default function GrabacionWorkshopPage() {
  return (
    <div className={fraunces.variable}>
      <JsonLd data={JSON_LD} />
      <Grabacion />
    </div>
  );
}
