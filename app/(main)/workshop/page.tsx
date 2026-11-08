import type { Metadata } from 'next';
import { faqPage, JsonLd, SITE_URL } from '@/lib/productos/seo';
import { PREGUNTAS_FRECUENTES } from '@/lib/productos/workshop/contenido';
import { fraunces } from '@/lib/productos/fuente';
import WorkshopLanding from '@/components/productos/workshop/WorkshopLanding';


export const metadata: Metadata = {
  title: { absolute: 'Workshop gratis por YouTube: WhatsApp sin perder clientes' },
  description:
    'Workshop gratis de 45 min en vivo por YouTube: responde por WhatsApp las preguntas de siempre sin inventar nada ni perder clientes. Te llevas tu esqueleto de regalo.',
  alternates: { canonical: `${SITE_URL}/workshop` },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Villelab',
    title: 'Que ningún cliente se te quede sin respuesta · workshop gratis',
    description: '45 minutos en vivo por YouTube con Álvaro Villena. Te llevas de regalo el esqueleto de tu agente de atención.',
    url: `${SITE_URL}/workshop`,
    images: [{ url: `${SITE_URL}/og/workshop.jpg`, width: 1200, height: 630, alt: 'Que ningún cliente se te quede sin respuesta · workshop gratis' }],
  },
  twitter: { card: 'summary_large_image', title: 'Que ningún cliente se te quede sin respuesta · workshop gratis', description: '45 minutos en vivo por YouTube con Álvaro Villena. Te llevas de regalo el esqueleto de tu agente de atención.', images: [`${SITE_URL}/og/workshop.jpg`] },
};

// TODO: cuando haya fecha del workshop, sumar un Event (eventAttendanceMode Online, location VirtualLocation = YOUTUBE_CANAL).
const JSON_LD = [faqPage(PREGUNTAS_FRECUENTES)];

export default function WorkshopPage() {
  return (
    <div className={fraunces.variable}>
      <JsonLd data={JSON_LD} />
      <WorkshopLanding />
    </div>
  );
}
