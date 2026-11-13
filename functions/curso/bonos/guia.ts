// /curso/bonos/guia: el comprador del curso abre la Guía «Tus próximos 20 clientes» (bono del pack, 13-nov-2026).
// Vive bajo /curso para recibir la cookie del curso (Path=/curso). El middleware ya exige esa cookie (PROTEGIDO_CURSO);
// aquí se vuelve a validar, se deja la cookie de la Guía (derivada, ver functions/_lib/pack.ts) y se entra a la guía.
import { COOKIE } from '../../_lib/guia1';
import { cookieCursoValida } from '../../_lib/curso';
import { cookieGuiaDesdeCurso } from '../../_lib/pack';

type Ctx = { request: Request };

const UN_ANO = 60 * 60 * 24 * 365;

export const onRequestGet = async ({ request }: Ctx): Promise<Response> => {
  const url = new URL(request.url);
  const cookieCurso = await cookieCursoValida(request);
  if (!cookieCurso) {
    const d = new URL('/curso/acceso', url);
    d.searchParams.set('d', '/curso/bonos');
    return new Response(null, { status: 302, headers: { location: d.toString(), 'cache-control': 'private, no-store' } });
  }
  const cookieGuia = await cookieGuiaDesdeCurso(cookieCurso);
  return new Response(null, {
    status: 303,
    headers: {
      location: '/guia/prospeccion',
      'set-cookie': `${COOKIE}=${cookieGuia}; Path=/guia; Max-Age=${UN_ANO}; Secure; HttpOnly; SameSite=Lax`,
      'cache-control': 'private, no-store',
      'x-robots-tag': 'noindex, nofollow',
    },
  });
};
