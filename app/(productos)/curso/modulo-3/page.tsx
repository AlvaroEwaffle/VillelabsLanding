import type { Metadata } from 'next';
import Modulo3Content from '@/components/productos/curso/Modulo3Content';
import { fraunces } from '@/lib/productos/fuente';
import { SITE_URL } from '@/lib/productos/seo';

// Página de alumno (contenido pagado): no se indexa, pero lleva su canonical y su OG propios
// para que al compartir el link no herede la tarjeta ni la URL de la portada del sitio.
export const metadata: Metadata = {
  title: 'Módulo 3 · Entregar lo vendido sin perder tareas',
  description: 'Módulo 3 del curso «Tu negocio de punta a punta»: tus procesos escritos en pasos, de la reunión a las tareas, el checklist de entrega, el tablero de estado y el resumen del día.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/curso/modulo-3` },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Villelab',
    title: 'Módulo 3 · Entregar lo vendido sin perder tareas',
    description: 'Módulo 3 del curso «Tu negocio de punta a punta»: tus procesos escritos en pasos, de la reunión a las tareas, el checklist de entrega, el tablero de estado y el resumen del día.',
    url: `${SITE_URL}/curso/modulo-3`,
    images: [{ url: `${SITE_URL}/og/curso.jpg`, width: 1200, height: 630, alt: 'Tu negocio de punta a punta · módulo 3' }],
  },
};

export default function Modulo3Page() {
  return (
    <div className={fraunces.variable}>
      <Modulo3Content />
    </div>
  );
}
