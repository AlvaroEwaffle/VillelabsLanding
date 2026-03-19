/**
 * SEOHead - Schema markup (Organization, Service, WebSite)
 * JSON-LD in body; crawlers index this correctly.
 */

'use client';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelab.com';

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
      'We build digital systems that convert visitors into clients. Landing pages, strategic websites, and custom platforms for businesses ready to grow.',
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
      availableLanguage: ['English', 'Spanish'],
    },
    sameAs: ['https://www.linkedin.com/in/alvarovillena'],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/#service-revenue-systems`,
    name: 'Revenue Systems - Web Design & Development',
    description:
      'Landing pages, strategic websites, custom platforms, and AI-powered tools designed to generate measurable revenue for your business.',
    provider: { '@id': `${SITE_URL}/#organization` },
    serviceType: 'Web Design & Development',
    areaServed: { '@type': 'Place', name: 'Global' },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Villelabs - Revenue Systems, Not Just Websites',
    url: SITE_URL,
    description:
      'We build digital systems that convert visitors into clients.',
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
      'Web design agency specializing in revenue-generating digital systems. Landing pages, strategic websites, custom platforms, and AI-powered tools.',
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
