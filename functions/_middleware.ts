// Middleware global de Pages Functions. `public/_routes.json` limita qué rutas pasan por aquí
// (/api/*, /guia/prospeccion*, /guia/acceso, /curso/modulo-1…6 y /curso/acceso), así que el resto del sitio sigue
// sirviéndose estático. Dos candados con el mismo patrón: la Guía 1 (guia1.ts) y los módulos 1–6 del curso (curso.ts).
import { PROTEGIDO, tieneAcceso } from './_lib/guia1';
import { PROTEGIDO_CURSO, destinoCurso, tieneAccesoCurso } from './_lib/curso';

type Ctx = { request: Request; next: () => Promise<Response> };

async function dejarPasar(next: () => Promise<Response>): Promise<Response> {
  const respuesta = await next();
  const copia = new Response(respuesta.body, respuesta);
  copia.headers.set('cache-control', 'private, no-store');
  copia.headers.set('x-robots-tag', 'noindex, nofollow');
  return copia;
}

function aAcceso(url: URL, acceso: string, destino: string): Response {
  const d = new URL(acceso, url);
  d.searchParams.set('d', destino);
  return new Response(null, {
    status: 302,
    headers: { location: d.toString(), 'cache-control': 'private, no-store' },
  });
}

export const onRequest = async ({ request, next }: Ctx): Promise<Response> => {
  const url = new URL(request.url);

  if (PROTEGIDO.test(url.pathname)) {
    return (await tieneAcceso(request)) ? dejarPasar(next) : aAcceso(url, '/guia/acceso', url.pathname);
  }

  if (PROTEGIDO_CURSO.test(url.pathname)) {
    return (await tieneAccesoCurso(request)) ? dejarPasar(next) : aAcceso(url, '/curso/acceso', destinoCurso(url.pathname));
  }

  return next();
};
