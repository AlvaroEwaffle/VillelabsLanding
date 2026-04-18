/**
 * SEOHead - Schema markup (Organization, Service, WebSite)
 * JSON-LD in body; crawlers index this correctly.
 */

'use client';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';

export default function SEOHead() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Villelabs',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/icono.png`,
      width: 512,
      height: 512,
    },
    description:
      'Construimos sistemas digitales que convierten visitantes en clientes: paginas de conversion, sitios web estrategicos y plataformas a medida para empresas listas para crecer.',
    founder: { '@type': 'Person', name: 'Alvaro Villena' },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Santiago',
      addressRegion: 'Region Metropolitana',
      addressCountry: 'CL',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'alvaro.villena@gmail.com',
      availableLanguage: ['Spanish', 'English'],
    },
    sameAs: ['https://www.linkedin.com/in/alvarovillena'],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/#service-revenue-systems`,
    name: 'Sistemas de ingresos - Diseno web y desarrollo',
    description:
      'Paginas de conversion, sitios web estrategicos, plataformas a medida y herramientas con IA disenadas para generar ingresos medibles.',
    provider: { '@id': `${SITE_URL}/#organization` },
    serviceType: 'Diseno web y desarrollo',
    areaServed: { '@type': 'Place', name: 'Global' },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Villelabs - Sistemas de ingresos, no solo sitios web',
    url: SITE_URL,
    description:
      'Construimos sistemas digitales que convierten visitantes en clientes.',
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'ReadAction',
      target: { '@type': 'EntryPoint', url: SITE_URL },
    },
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: 'Villelabs',
    url: SITE_URL,
    logo: `${SITE_URL}/icono.png`,
    description:
      'Agencia de diseno web especializada en sistemas digitales que generan ingresos: paginas de conversion, sitios web estrategicos, plataformas a medida y herramientas con IA.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Santiago',
      addressRegion: 'Region Metropolitana',
      addressCountry: 'CL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -33.4489,
      longitude: -70.6693,
    },
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    sameAs: ['https://www.linkedin.com/in/alvarovillena'],
    founder: { '@type': 'Person', name: 'Alvaro Villena' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  );
}
