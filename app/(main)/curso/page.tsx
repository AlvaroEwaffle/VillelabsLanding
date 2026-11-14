import type { Metadata } from 'next';
import { AUTOR, faqPage, JsonLd, ORGANIZACION, SITE_URL, videoObject } from '@/lib/productos/seo';
import { CURSO, FAQ, MONEDA_PRECIO, PRECIO_FUNDADOR } from '@/lib/productos/curso/curso';
import { VERSION_CURSO } from '@/lib/productos/curso/versiones';
import CursoContent from '@/components/productos/curso/CursoContent';
import { fraunces } from '@/lib/productos/fuente';
import { EXP16 } from '@/lib/productos/curso/exp16';
import { SCRIPT_ANCLA } from '@/lib/productos/ancla';
import { PACK } from '@/lib/productos/curso/llevas';

const PACK_DESCRIPCION = `${PACK.titulo}. ${PACK.bonos.map((b) => `${b.clave}: ${b.titulo}. ${b.texto}`).join(' ')}`;


// 12-nov-2026 23:10 · el título social repite el H1 (el LinkedIn de las 18:30 lo comparte a diario); el nombre largo del curso
// (CURSO.nombreCompleto) queda en el h2 bajo el hero y en el JSON-LD.
// 13-nov-2026 · módulo 7: el título y la imagen siguen siendo los del H1 de control (EXP-15 mide el H1; el revisor objetó
// «automatizar tu negocio» a secas). Solo la descripción suma el proyecto final con el agente, con lo que hizo en la prueba.
// 14-nov-2026 · cambio de base «oferta en clave agente» (lib/productos/curso/hero.ts): title, OG y Twitter repiten el H1 nuevo; la
// imagen pasa a og/curso-agente.jpg (ya publicada: «Tu CRM y ERP en una planilla, y un agente de IA que trabaja con ella»).
// El nombre del producto (CURSO.nombreCompleto, igual que en Hotmart) no cambia: sigue en el h2 y en el JSON-LD.
const TITULO_OG = 'Tu primer agente de IA trabajando para ti, sin programar';
const DESCRIPCION_OG =
  'El módulo 0 es gratis. Sin programar y con menos de 2 horas de lecciones: le armas a tu agente su memoria (tu planilla) y sus frenos, y te prepara borradores de pedidos y cobranza. Tú apruebas y tú envías.';

export const metadata: Metadata = {
  title: { absolute: TITULO_OG },
  description:
    'Curso online para pymes: construyes tu primer agente de IA, sin programar y con menos de 2 horas de lecciones. Le armas su memoria, el sistema de tu negocio en Google Sheets (clientes y ventas o CRM, pedidos, cobranza, caja y un tablero, tu ERP), y sus límites con tus reglas de freno. Después te prepara la fila de los pedidos que te llegan por WhatsApp y te avisa a quién cobrar, con el mensaje listo; tú apruebas y tú envías.',
  alternates: { canonical: `${SITE_URL}/curso` },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Villelab',
    title: TITULO_OG,
    description: DESCRIPCION_OG,
    url: `${SITE_URL}/curso`,
    images: [{ url: `${SITE_URL}/og/curso-agente.jpg`, width: 1200, height: 630, alt: 'Tu CRM y ERP en una planilla, y un agente de IA que trabaja con ella' }],
  },
  twitter: { card: 'summary_large_image', title: TITULO_OG, description: DESCRIPCION_OG, images: [`${SITE_URL}/og/curso-agente.jpg`] },
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
    teaches: ['Armar un CRM y un ERP con prompts para ChatGPT o Claude', 'CRM en Google Sheets', 'ERP para pymes en una planilla', 'Seguimiento de clientes y propuestas', 'Control de pedidos', 'Cobranza y flujo de caja', 'Tablero de indicadores', 'Configurar un asistente de IA con tu planilla como memoria'],
    hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online' },
    // 13-nov-2026 (AI SEO): la oferta con el mismo precio y moneda que la tarjeta de precio («$29.990 CLP»). Sin precio tachado ni fechas.
    ...(PRECIO_FUNDADOR === null
      ? {}
      : {
          offers: {
            '@type': 'Offer',
            category: 'Paid',
            // Pack (13-nov-2026): mismo producto y precio, con dos bonos (el valor de la Guía, tal cual se vende sola).
            description: PACK_DESCRIPCION,
            price: PRECIO_FUNDADOR,
            priceCurrency: MONEDA_PRECIO,
            availability: 'https://schema.org/InStock',
            url: `${SITE_URL}/curso`,
          },
        }),
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
      {/* EXP-16 (14-nov-2026, cierre de EXP-15, que queda fija en B sin script): la lección 1 sobre el formulario del aterrizaje.
          Elige la variante antes de pintar (constante propia del repo, sin datos de usuarios). */}
      <script dangerouslySetInnerHTML={{ __html: EXP16.script }} />
      {/* 13-nov-2026: ancla resistente a fbclid (#parte-gratis-hero?fbclid=…): limpia la URL antes del píxel (lib/productos/ancla.ts). */}
      <script dangerouslySetInnerHTML={{ __html: SCRIPT_ANCLA }} />
      <JsonLd data={JSON_LD} />
      <CursoContent />
    </div>
  );
}
