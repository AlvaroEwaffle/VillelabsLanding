import type { Metadata } from 'next';
import Modulo6Content from '@/components/productos/curso/Modulo6Content';
import { fraunces } from '@/lib/productos/fuente';
import { SITE_URL } from '@/lib/productos/seo';

// Página de alumno (contenido pagado): no se indexa, pero lleva su canonical y su OG propios
// para que al compartir el link no herede la tarjeta ni la URL de la portada del sitio.
export const metadata: Metadata = {
  title: 'Módulo 6 · Arma tu sistema propio',
  description: 'Módulo 6 del curso «Tu negocio de punta a punta»: tu base de información, conexiones con permisos mínimos, rutinas automáticas, la revisión de los viernes y el proyecto final: el tablero de tu negocio.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/curso/modulo-6` },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Villelab',
    title: 'Módulo 6 · Arma tu sistema propio',
    description: 'Módulo 6 del curso «Tu negocio de punta a punta»: tu base de información, conexiones con permisos mínimos, rutinas automáticas, la revisión de los viernes y el proyecto final: el tablero de tu negocio.',
    url: `${SITE_URL}/curso/modulo-6`,
    images: [{ url: `${SITE_URL}/og/curso.jpg`, width: 1200, height: 630, alt: 'Tu negocio de punta a punta · módulo 6' }],
  },
};

export default function Modulo6Page() {
  return (
    <div className={fraunces.variable}>
      <Modulo6Content />
    </div>
  );
}
