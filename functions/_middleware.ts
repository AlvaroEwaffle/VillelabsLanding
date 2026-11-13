// Middleware global de Pages Functions. `public/_routes.json` limita qué rutas pasan por aquí
// (/api/*, /guia/prospeccion* y /guia/acceso), así que el resto del sitio sigue sirviéndose estático.
import { PROTEGIDO, tieneAcceso } from './_lib/guia1';

type Ctx = { request: Request; next: () => Promise<Response> };

export const onRequest = async ({ request, next }: Ctx): Promise<Response> => {
  const url = new URL(request.url);
  if (!PROTEGIDO.test(url.pathname)) return next();

  if (await tieneAcceso(request)) {
    const respuesta = await next();
    const copia = new Response(respuesta.body, respuesta);
    copia.headers.set('cache-control', 'private, no-store');
    copia.headers.set('x-robots-tag', 'noindex, nofollow');
    return copia;
  }

  const destino = new URL('/guia/acceso', url);
  destino.searchParams.set('d', url.pathname);
  return new Response(null, {
    status: 302,
    headers: { location: destino.toString(), 'cache-control': 'private, no-store' },
  });
};
