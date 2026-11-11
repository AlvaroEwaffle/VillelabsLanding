import type { Metadata } from 'next';
import { AUTOR, faqPage, JsonLd, ORGANIZACION, SITE_URL, videoObject } from '@/lib/productos/seo';
import { CURSO, FAQ } from '@/lib/productos/curso/curso';
import { VERSION_CURSO } from '@/lib/productos/curso/versiones';
import CursoContent from '@/components/productos/curso/CursoContent';
import { fraunces } from '@/lib/productos/fuente';
import { SCRIPT_EXP08 } from '@/lib/productos/curso/exp08';


const TITULO_OG = 'El sistema de tu negocio · tu primer CRM y ERP en Google Sheets';
const DESCRIPCION_OG = 'Curso en preventa: en 6 semanas armas tu CRM y tu ERP en una planilla, con clientes, pedidos, cobranza, caja y un tablero. El módulo 0 lo recibes hoy.';

export const metadata: Metadata = {
  title: { absolute: 'Curso: construye tu primer CRM y ERP en Google Sheets' },
  description:
    'Curso online para pymes: en 6 semanas armas el sistema de tu negocio en Google Sheets. Clientes y ventas (CRM), origen, pedidos, atención, cobranza, caja y un tablero, sin pagar software.',
  alternates: { canonical: `${SITE_URL}/curso` },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Villelab',
    title: TITULO_OG,
    description: DESCRIPCION_OG,
    url: `${SITE_URL}/curso`,
    images: [{ url: `${SITE_URL}/og/curso.jpg`, width: 1200, height: 630, alt: TITULO_OG }],
  },
  twitter: { card: 'summary_large_image', title: TITULO_OG, description: DESCRIPCION_OG, images: [`${SITE_URL}/og/curso.jpg`] },
};

const JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: CURSO.nombreCompleto,
    alternateName: 'Construye tu primer CRM y ERP en Google Sheets',
    description: `${CURSO.promesa} ${CURSO.noEsSoftware}`,
    url: `${SITE_URL}/curso`,
    inLanguage: 'es',
    provider: ORGANIZACION,
    author: AUTOR,
    version: VERSION_CURSO.version,
    dateModified: VERSION_CURSO.fecha,
    teaches: ['CRM en Google Sheets', 'ERP para pymes en una planilla', 'Seguimiento de clientes y propuestas', 'Control de pedidos', 'Cobranza y flujo de caja', 'Tablero de indicadores'],
    hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', courseWorkload: 'PT18H' },
  },
  faqPage(FAQ.map((f) => ({ q: f.p, a: f.r }))),
  videoObject({
    id: 'v08-curso-venta',
    nombre: 'Tu primer CRM y ERP, en 6 semanas',
    descripcion: 'Álvaro Villena presenta el curso en preventa: en 6 semanas armas tu primer CRM y ERP en Google Sheets, una hoja por semana con las fórmulas listas, hasta un tablero con lo que vendiste, lo que te deben y cuánta caja tienes.',
    segundos: 49,
    pagina: '/curso',
  }),
];

export default function CursoPage() {
  return (
    <div className={fraunces.variable}>
      {/* EXP-08: elige la variante del hero antes de pintarlo (constante propia del repo, sin datos de usuarios). */}
      <script dangerouslySetInnerHTML={{ __html: SCRIPT_EXP08 }} />
      <JsonLd data={JSON_LD} />
      <CursoContent />
    </div>
  );
}
