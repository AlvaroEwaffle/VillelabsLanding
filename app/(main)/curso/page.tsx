import type { Metadata } from 'next';
import { AUTOR, faqPage, JsonLd, ORGANIZACION, SITE_URL, videoObject } from '@/lib/productos/seo';
import { CURSO, FAQ } from '@/lib/productos/curso/curso';
import { VERSION_CURSO } from '@/lib/productos/curso/versiones';
import CursoContent from '@/components/productos/curso/CursoContent';
import { fraunces } from '@/lib/productos/fuente';
import { EXP13 } from '@/lib/productos/curso/exp13';


const TITULO_OG = 'Construye con IA tu sistema de gestión CRM y ERP para tu negocio, sin programar';
const DESCRIPCION_OG = 'Curso online con los 7 módulos listos: armas tu CRM y tu ERP en una planilla con prompts para ChatGPT o Claude. Cerca de 1 h 30 de lecciones y unas 6 horas de práctica, a tu ritmo.';

export const metadata: Metadata = {
  title: { absolute: 'Construye con IA tu CRM y ERP, sin programar' },
  description:
    'Curso online para pymes: construyes con IA el sistema de tu negocio en Google Sheets, sin programar, con prompts listos para ChatGPT o Claude. Clientes y ventas (CRM), origen, pedidos, atención, cobranza, caja y un tablero, sin pagar software.',
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
    alternateName: 'Construye con IA tu CRM y ERP, sin programar',
    description: `${CURSO.promesa} ${CURSO.noEsSoftware}`,
    url: `${SITE_URL}/curso`,
    inLanguage: 'es',
    provider: ORGANIZACION,
    author: AUTOR,
    version: VERSION_CURSO.version,
    dateModified: VERSION_CURSO.fecha,
    teaches: ['Armar un CRM y un ERP con prompts para ChatGPT o Claude', 'CRM en Google Sheets', 'ERP para pymes en una planilla', 'Seguimiento de clientes y propuestas', 'Control de pedidos', 'Cobranza y flujo de caja', 'Tablero de indicadores'],
    hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online' },
  },
  faqPage(FAQ.map((f) => ({ q: f.p, a: f.r }))),
  videoObject({
    id: 'v08b-curso-venta',
    nombre: 'Construye con IA tu sistema CRM y ERP',
    descripcion: 'Álvaro Villena presenta el curso: armas con IA tu CRM y ERP en Google Sheets, una hoja a la vez con las fórmulas listas, hasta un tablero con lo que vendiste, lo que te deben y cuánta caja tienes. No es un software: es una planilla bien armada y rutinas cortas.',
    segundos: 40,
    pagina: '/curso',
    subida: '2026-11-12',
  }),
];

export default function CursoPage() {
  return (
    <div className={fraunces.variable}>
      {/* EXP-13: elige la variante del hero antes de pintarlo (constante propia del repo, sin datos de usuarios). */}
      <script dangerouslySetInnerHTML={{ __html: EXP13.script }} />
      <JsonLd data={JSON_LD} />
      <CursoContent />
    </div>
  );
}
