import type { Metadata } from 'next';
import Modulo4Content from '@/components/productos/curso/Modulo4Content';
import { fraunces } from '@/lib/productos/fuente';
import { SITE_URL } from '@/lib/productos/seo';

// Página de alumno (contenido pagado): no se indexa, pero lleva su canonical y su OG propios
// para que al compartir el link no herede la tarjeta ni la URL de la portada del sitio.
export const metadata: Metadata = {
  title: 'Módulo 4 · Responder a tiempo y que vuelvan a comprar',
  description: 'Módulo 4 del curso «Construye con IA tu sistema de gestión CRM y ERP para tu negocio, sin programar»: los 3 tipos de mensaje, respuestas listas en WhatsApp Business, la hoja Atención con cada caso hasta cerrarlo, cuándo pasa a una persona y la postventa.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/curso/modulo-4` },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Villelab',
    title: 'Módulo 4 · Responder a tiempo y que vuelvan a comprar',
    description: 'Módulo 4 del curso «Construye con IA tu sistema de gestión CRM y ERP para tu negocio, sin programar»: los 3 tipos de mensaje, respuestas listas en WhatsApp Business, la hoja Atención con cada caso hasta cerrarlo, cuándo pasa a una persona y la postventa.',
    url: `${SITE_URL}/curso/modulo-4`,
    images: [{ url: `${SITE_URL}/og/curso.jpg`, width: 1200, height: 630, alt: 'Construye con IA tu CRM y ERP · módulo 4' }],
  },
};

export default function Modulo4Page() {
  return (
    <div className={fraunces.variable}>
      <Modulo4Content />
    </div>
  );
}
