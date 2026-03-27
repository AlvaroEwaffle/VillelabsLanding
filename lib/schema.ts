/**
 * JSON-LD structured data generators for SEO.
 *
 * These generate schema.org markup for Google rich results.
 * Use the <Script> component with strategy="beforeInteractive" or
 * dangerouslySetInnerHTML in <head> to inject these.
 */

export interface LocalBusinessSchema {
  name: string;
  description: string;
  url: string;
  telephone?: string;
  email?: string;
  address: {
    streetAddress?: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
    postalCode?: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  image?: string;
  priceRange?: string;
  openingHours?: string[];
  sameAs?: string[];
}

export function generateLocalBusinessJsonLd(
  business: LocalBusinessSchema
): string {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    description: business.description,
    url: business.url,
    address: {
      '@type': 'PostalAddress',
      addressLocality: business.address.addressLocality,
      addressRegion: business.address.addressRegion,
      addressCountry: business.address.addressCountry,
      ...(business.address.streetAddress && {
        streetAddress: business.address.streetAddress,
      }),
      ...(business.address.postalCode && {
        postalCode: business.address.postalCode,
      }),
    },
  };

  if (business.telephone) schema.telephone = business.telephone;
  if (business.email) schema.email = business.email;
  if (business.image) schema.image = business.image;
  if (business.priceRange) schema.priceRange = business.priceRange;
  if (business.openingHours) schema.openingHours = business.openingHours;
  if (business.sameAs) schema.sameAs = business.sameAs;

  if (business.geo) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    };
  }

  return JSON.stringify(schema);
}

export interface ServiceSchema {
  name: string;
  description: string;
  url: string;
  provider: {
    name: string;
    url: string;
  };
  areaServed?: string;
  serviceType?: string;
}

export function generateServiceJsonLd(service: ServiceSchema): string {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      '@type': 'Organization',
      name: service.provider.name,
      url: service.provider.url,
    },
  };

  if (service.areaServed) schema.areaServed = service.areaServed;
  if (service.serviceType) schema.serviceType = service.serviceType;

  return JSON.stringify(schema);
}

export interface WebSiteSchema {
  name: string;
  url: string;
  description: string;
}

export function generateWebSiteJsonLd(site: WebSiteSchema): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
    description: site.description,
  });
}

export interface PersonSchema {
  name: string;
  url: string;
  jobTitle: string;
  description?: string;
  image?: string;
  sameAs?: string[];
  worksFor?: {
    name: string;
    url: string;
  };
}

export function generatePersonJsonLd(person: PersonSchema): string {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    url: person.url,
    jobTitle: person.jobTitle,
  };

  if (person.description) schema.description = person.description;
  if (person.image) schema.image = person.image;
  if (person.sameAs) schema.sameAs = person.sameAs;
  if (person.worksFor) {
    schema.worksFor = {
      '@type': 'Organization',
      name: person.worksFor.name,
      url: person.worksFor.url,
    };
  }

  return JSON.stringify(schema);
}

/**
 * BreadcrumbList schema for navigation breadcrumbs.
 */
export function generateBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>
): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  });
}
