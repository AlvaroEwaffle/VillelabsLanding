/**
 * SEOHead - datos estructurados globales (JSON-LD) de todas las páginas del sitio principal.
 *
 * 13-nov-2026 (auditoría AI SEO, arreglo 2): fuera «Agencia de diseño web», «Sistemas de ingresos» y el
 * LocalBusiness con horario y coordenadas (el negocio anterior). Queda una sola versión de qué es Villelab,
 * la misma frase de la portada, y la Person de Álvaro con sus perfiles reales para que un asistente una el
 * sitio con sus redes. Solo hechos que ya están a la vista en el sitio (portada, /agentes, /sobre-mi,
 * /contact y el pie). Sin precios: viven en cada página (y en /llms.txt).
 */
import { MARCA_PERSONAL, PERFILES_ALVARO } from '@/lib/perfiles';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelab.com';

/** Descripción de la portada (app/layout.tsx · metadata.description). Si cambia allá, cambia acá. */
const DESCRIPCION =
  'Instalamos y operamos agentes de IA que hacen el trabajo repetitivo de tu equipo: correo, propuestas, seguimientos y reportes. Con frenos: lo que compromete plata, alcance o fechas pasa por una persona.';

export default function SEOHead() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Villelab',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/icono.png`,
      width: 512,
      height: 512,
    },
    description: DESCRIPCION,
    founder: { '@id': `${SITE_URL}/#alvaro` },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Santiago',
      addressCountry: 'CL',
    },
    areaServed: 'Latinoamérica',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'alvaro.villena@gmail.com',
      availableLanguage: ['Spanish', 'English'],
    },
  };

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#alvaro`,
    name: 'Álvaro Villena',
    alternateName: MARCA_PERSONAL.nombre,
    description: `${MARCA_PERSONAL.nombre}: ${MARCA_PERSONAL.promesa}.`,
    url: `${SITE_URL}/sobre-mi`,
    image: `${SITE_URL}/fotos/alvaro-ciudad.jpg`,
    jobTitle: 'Director de Villelab',
    worksFor: { '@id': `${SITE_URL}/#organization` },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universidad de Chile' },
    sameAs: [
      PERFILES_ALVARO.instagram,
      PERFILES_ALVARO.youtube,
      PERFILES_ALVARO.tiktok,
      PERFILES_ALVARO.linkedin,
      PERFILES_ALVARO.sitio,
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/#service-agentes`,
    name: 'Agentes como servicio',
    description:
      'Un agente de IA que conoce el negocio, sus herramientas y sus límites. Lo implementamos y lo mantenemos funcionando cada mes.',
    url: `${SITE_URL}/agentes`,
    provider: { '@id': `${SITE_URL}/#organization` },
    serviceType: 'Agentes de IA para equipos',
    areaServed: 'Latinoamérica',
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Villelab',
    alternateName: `Villelab · ${MARCA_PERSONAL.nombre}`,
    url: SITE_URL,
    inLanguage: 'es-CL',
    description: DESCRIPCION,
    publisher: { '@id': `${SITE_URL}/#organization` },
  };

  return (
    <>
      {[organizationSchema, personSchema, serviceSchema, websiteSchema].map((schema) => (
        <script
          key={schema['@id']}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
