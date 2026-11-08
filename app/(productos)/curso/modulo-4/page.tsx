import type { Metadata } from 'next';
import Modulo4Content from '@/components/productos/curso/Modulo4Content';
import { fraunces } from '@/lib/productos/fuente';
import { SITE_URL } from '@/lib/productos/seo';

// Página de alumno (contenido pagado): no se indexa, pero lleva su canonical y su OG propios
// para que al compartir el link no herede la tarjeta ni la URL de la portada del sitio.
export const metadata: Metadata = {
  title: 'Módulo 4 · Responder a tiempo, con tus reglas',
  description: 'Módulo 4 del curso «Tu negocio de punta a punta»: los 3 tipos de mensaje, tu asistente desde el esqueleto, ponerlo en WhatsApp, cuándo pasa a una persona y cómo se cierra un reclamo.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/curso/modulo-4` },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Villelab',
    title: 'Módulo 4 · Responder a tiempo, con tus reglas',
    description: 'Módulo 4 del curso «Tu negocio de punta a punta»: los 3 tipos de mensaje, tu asistente desde el esqueleto, ponerlo en WhatsApp, cuándo pasa a una persona y cómo se cierra un reclamo.',
    url: `${SITE_URL}/curso/modulo-4`,
    images: [{ url: `${SITE_URL}/og/curso.jpg`, width: 1200, height: 630, alt: 'Tu negocio de punta a punta · módulo 4' }],
  },
};

export default function Modulo4Page() {
  return (
    <div className={fraunces.variable}>
      <Modulo4Content />
    </div>
  );
}
