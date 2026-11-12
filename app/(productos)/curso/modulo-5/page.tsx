import type { Metadata } from 'next';
import Modulo5Content from '@/components/productos/curso/Modulo5Content';
import { fraunces } from '@/lib/productos/fuente';
import { SITE_URL } from '@/lib/productos/seo';

// Página de alumno (contenido pagado): no se indexa, pero lleva su canonical y su OG propios
// para que al compartir el link no herede la tarjeta ni la URL de la portada del sitio.
export const metadata: Metadata = {
  title: 'Módulo 5 · Cobrar a tiempo y saber cuánta plata tienes',
  description: 'Módulo 5 del curso «Construye con IA tu sistema de gestión CRM y ERP»: la hoja Cobranza con recordatorios, la hoja Caja con el saldo al día, tu caja de las próximas 4 semanas y el margen de tus productos.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/curso/modulo-5` },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Villelab',
    title: 'Módulo 5 · Cobrar a tiempo y saber cuánta plata tienes',
    description: 'Módulo 5 del curso «Construye con IA tu sistema de gestión CRM y ERP»: la hoja Cobranza con recordatorios, la hoja Caja con el saldo al día, tu caja de las próximas 4 semanas y el margen de tus productos.',
    url: `${SITE_URL}/curso/modulo-5`,
    images: [{ url: `${SITE_URL}/og/curso.jpg`, width: 1200, height: 630, alt: 'El sistema de tu negocio · módulo 5' }],
  },
};

export default function Modulo5Page() {
  return (
    <div className={fraunces.variable}>
      <Modulo5Content />
    </div>
  );
}
