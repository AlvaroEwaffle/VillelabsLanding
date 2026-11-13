import type { Metadata } from 'next';
import Modulo3Content from '@/components/productos/curso/Modulo3Content';
import { fraunces } from '@/lib/productos/fuente';
import { SITE_URL } from '@/lib/productos/seo';

// Página de alumno (contenido pagado): no se indexa, pero lleva su canonical y su OG propios
// para que al compartir el link no herede la tarjeta ni la URL de la portada del sitio.
export const metadata: Metadata = {
  title: 'Módulo 3 · Cada pedido, en una fila',
  description: 'Módulo 3 del curso «Construye con IA tu sistema de gestión CRM y ERP para tu negocio, sin programar»: tus procesos escritos en pasos, la hoja Pedidos con cada pedido en una fila, el checklist de entrega, el estado de cada pedido y el resumen del día en 5 minutos.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/curso/modulo-3` },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Villelab',
    title: 'Módulo 3 · Cada pedido, en una fila',
    description: 'Módulo 3 del curso «Construye con IA tu sistema de gestión CRM y ERP para tu negocio, sin programar»: tus procesos escritos en pasos, la hoja Pedidos con cada pedido en una fila, el checklist de entrega, el estado de cada pedido y el resumen del día en 5 minutos.',
    url: `${SITE_URL}/curso/modulo-3`,
    images: [{ url: `${SITE_URL}/og/curso.jpg`, width: 1200, height: 630, alt: 'Construye con IA tu CRM y ERP · módulo 3' }],
  },
};

export default function Modulo3Page() {
  return (
    <div className={fraunces.variable}>
      <Modulo3Content />
    </div>
  );
}
