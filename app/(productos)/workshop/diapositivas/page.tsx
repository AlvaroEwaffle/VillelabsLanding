import type { Metadata } from 'next';
import { fraunces } from '@/lib/productos/fuente';
import { SITE_URL } from '@/lib/productos/seo';
import Diapositivas from '@/components/productos/workshop/Diapositivas';

// Uso interno (se proyectan en el workshop): no se indexa, con canonical y descripción propios.
export const metadata: Metadata = {
  title: 'Diapositivas · Workshop 1',
  description: 'Diapositivas del workshop «Que ningún cliente se te quede sin respuesta»: cómo el esqueleto de tu asistente responde por WhatsApp las preguntas de siempre.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/workshop/diapositivas` },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Villelab',
    title: 'Diapositivas · Workshop 1 · Que ningún cliente se te quede sin respuesta',
    description: 'Las 15 diapositivas del workshop gratis de Villelab sobre atención al cliente por WhatsApp.',
    url: `${SITE_URL}/workshop/diapositivas`,
    images: [{ url: `${SITE_URL}/og/workshop.jpg`, width: 1200, height: 630, alt: 'Que ningún cliente se te quede sin respuesta · workshop gratis' }],
  },
};

export default function DiapositivasWorkshopPage() {
  return (
    <div className={fraunces.variable}>
      <Diapositivas />
    </div>
  );
}
