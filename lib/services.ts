export interface ServiceMeta {
  slug: string;
  track: 'marketing' | 'development';
  index: number;
}

export const services: ServiceMeta[] = [
  { slug: 'landing-pages', track: 'marketing', index: 0 },
  { slug: 'sitios-web-estrategicos', track: 'marketing', index: 1 },
  { slug: 'embudos-de-venta', track: 'marketing', index: 2 },
  { slug: 'automatizacion', track: 'development', index: 0 },
  { slug: 'plataformas-a-medida', track: 'development', index: 1 },
  { slug: 'chatbots-ia', track: 'development', index: 2 },
];

export function getService(slug: string): ServiceMeta | undefined {
  return services.find((s) => s.slug === slug);
}
