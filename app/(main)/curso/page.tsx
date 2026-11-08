import type { Metadata } from 'next';
import { AUTOR, faqPage, JsonLd, ORGANIZACION, SITE_URL, videoObject } from '@/lib/productos/seo';
import { CURSO, FAQ } from '@/lib/productos/curso/curso';
import CursoContent from '@/components/productos/curso/CursoContent';
import { fraunces } from '@/lib/productos/fuente';


export const metadata: Metadata = {
  title: { absolute: 'Curso: ordena las 5 áreas de tu negocio en 6 semanas' },
  description:
    'Curso online para pymes: ordena en 6 semanas marketing, ventas, operación, atención al cliente y finanzas, con plantillas y un caso real.',
  alternates: { canonical: `${SITE_URL}/curso` },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Villelab',
    title: 'Tu negocio de punta a punta · curso en preventa',
    description: '7 módulos y 33 lecciones cortas para ordenar las 5 áreas de tu negocio. El módulo 0 lo recibes hoy.',
    url: `${SITE_URL}/curso`,
    images: [{ url: `${SITE_URL}/og/curso.jpg`, width: 1200, height: 630, alt: 'Tu negocio de punta a punta · curso en preventa' }],
  },
  twitter: { card: 'summary_large_image', title: 'Tu negocio de punta a punta · curso en preventa', description: '7 módulos y 33 lecciones cortas para ordenar las 5 áreas de tu negocio. El módulo 0 lo recibes hoy.', images: [`${SITE_URL}/og/curso.jpg`] },
};

const JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: CURSO.nombre,
    description: CURSO.promesa,
    url: `${SITE_URL}/curso`,
    inLanguage: 'es',
    provider: ORGANIZACION,
    author: AUTOR,
    hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', courseWorkload: 'PT18H' },
  },
  faqPage(FAQ.map((f) => ({ q: f.p, a: f.r }))),
  videoObject({
    id: 'v08-curso-venta',
    nombre: 'Tu negocio, ordenado en 6 semanas',
    descripcion: 'Las 5 áreas de un negocio que se pasan la pelota (marketing, ventas, operación, atención y finanzas) y cómo el curso «Tu negocio de punta a punta» las ordena en 6 semanas.',
    segundos: 49,
    pagina: '/curso',
  }),
];

export default function CursoPage() {
  return (
    <div className={fraunces.variable}>
      <JsonLd data={JSON_LD} />
      <CursoContent />
    </div>
  );
}
