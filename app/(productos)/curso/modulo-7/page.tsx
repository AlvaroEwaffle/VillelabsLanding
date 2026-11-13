import type { Metadata } from 'next';
import Modulo7Content from '@/components/productos/curso/Modulo7Content';
import { fraunces } from '@/lib/productos/fuente';
import { SITE_URL } from '@/lib/productos/seo';

// Página de alumno (contenido pagado, detrás del código de /curso/acceso): no se indexa, pero lleva su canonical y su OG
// propios para que al compartir el link no herede la tarjeta ni la URL de la portada del sitio.
const DESCRIPCION =
  'Módulo 7 del curso «Construye con IA tu sistema de gestión CRM y ERP para tu negocio, sin programar»: armas tu primer agente en un proyecto de Claude, con tus reglas de freno y tu planilla como memoria, y lo pones a pasar pedidos de WhatsApp a tu hoja Pedidos y a armar la cobranza del lunes. Tú revisas y tú envías.';

export const metadata: Metadata = {
  title: 'Módulo 7 · Tu primer agente, trabajando con tu planilla',
  description: DESCRIPCION,
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/curso/modulo-7` },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Villelab',
    title: 'Módulo 7 · Tu primer agente, trabajando con tu planilla',
    description: DESCRIPCION,
    url: `${SITE_URL}/curso/modulo-7`,
    images: [{ url: `${SITE_URL}/og/curso.jpg`, width: 1200, height: 630, alt: 'Construye con IA tu CRM y ERP · módulo 7' }],
  },
};

export default function Modulo7Page() {
  return (
    <div className={fraunces.variable}>
      <Modulo7Content />
    </div>
  );
}
