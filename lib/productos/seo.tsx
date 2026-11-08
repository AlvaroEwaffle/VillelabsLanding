// Datos estructurados (JSON-LD) y metadatos comunes de las páginas públicas de productos.
// Se renderizan en cada page.tsx; el sitio es export estático, así que el JSON queda en el HTML.

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelab.com';

export const ORGANIZACION = {
  '@type': 'Organization',
  name: 'Villelab',
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
} as const;

export const AUTOR = {
  '@type': 'Person',
  name: 'Álvaro Villena',
  url: `${SITE_URL}/sobre-mi`,
} as const;

/** Canal de YouTube donde se transmiten los workshops en vivo. */
export const YOUTUBE_CANAL = 'https://www.youtube.com/@alvarovillenai';

export function faqPage(preguntas: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: preguntas.map((p) => ({
      '@type': 'Question',
      name: p.q,
      acceptedAnswer: { '@type': 'Answer', text: p.a },
    })),
  };
}

/** Duración en segundos → ISO 8601 (PT1M30S), como la pide schema.org. */
export function duracionIso(segundos: number) {
  const s = Math.max(0, Math.round(segundos));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `PT${m > 0 ? `${m}M` : ''}${r}S`;
}

/**
 * VideoObject para los videos montados en public/videos/{id}.mp4 (con su poster {id}.jpg).
 * Google exige name, thumbnailUrl y uploadDate; description, duration y contentUrl son recomendados.
 * La duración se mide del archivo (ffprobe) y se pasa en segundos.
 */
export function videoObject(v: { id: string; nombre: string; descripcion: string; segundos: number; pagina: string; subida?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: v.nombre,
    description: v.descripcion,
    thumbnailUrl: [`${SITE_URL}/videos/${v.id}.jpg`],
    uploadDate: v.subida ?? '2026-11-08',
    duration: duracionIso(v.segundos),
    contentUrl: `${SITE_URL}/videos/${v.id}.mp4`,
    url: `${SITE_URL}${v.pagina}`,
    inLanguage: 'es',
    isFamilyFriendly: true,
    author: AUTOR,
    publisher: ORGANIZACION,
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  // El contenido sale de constantes propias del repo, no de entrada de usuarios.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
