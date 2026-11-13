// /curso/acceso: canjea el código del curso por la cookie de acceso a los módulos 1 a 6 (12-nov-2026).
//   GET  /curso/acceso                       → formulario
//   GET  /curso/acceso?c=CODIGO&d=/curso/…   → link de un clic desde Hotmart
//   POST /curso/acceso (codigo, d)           → envío del formulario
// Mismo patrón que functions/guia/acceso.ts.
import { COOKIE_CURSO, canjearCurso, destinoCurso, tieneAccesoCurso } from '../_lib/curso';

type Ctx = { request: Request };

const UN_ANO = 60 * 60 * 24 * 365;
const COMPRA = 'https://pay.hotmart.com/V108401329W?src=curso_acceso';

function entrar(cookie: string, destino: string): Response {
  return new Response(null, {
    status: 303,
    headers: {
      location: destino,
      'set-cookie': `${COOKIE_CURSO}=${cookie}; Path=/curso; Max-Age=${UN_ANO}; Secure; HttpOnly; SameSite=Lax`,
      'cache-control': 'private, no-store',
    },
  });
}

function escapar(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

function pagina(destino: string, error = false): Response {
  const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow"><title>Entra a tu curso | Villelab</title>
<style>
*{box-sizing:border-box}body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;
background:#0f172a;color:#e2e8f0;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;padding:24px 16px}
.card{width:100%;max-width:420px;background:#111c33;border:1px solid #1e2b47;border-radius:16px;padding:28px 22px}
.eyebrow{color:#5fb2dd;font-size:12px;letter-spacing:.12em;text-transform:uppercase;margin:0 0 8px}
h1{font-size:24px;line-height:1.2;margin:0 0 10px;color:#fff}p{font-size:15px;line-height:1.5;color:#cbd5e1;margin:0 0 18px}
label{display:block;font-size:13px;color:#94a3b8;margin-bottom:6px}
input{width:100%;font-size:17px;padding:13px 14px;border-radius:10px;border:1px solid #2175a1;background:#0b1325;color:#fff;
letter-spacing:.06em;text-transform:uppercase}input:focus{outline:2px solid #5fb2dd;outline-offset:1px}
button{width:100%;margin-top:14px;font-size:16px;font-weight:600;padding:14px;border:0;border-radius:10px;background:#FF3D8B;
color:#fff;cursor:pointer;box-shadow:0 8px 28px rgba(255,61,139,.35)}button:hover{background:#ff5c9f}
.error{background:#3b1d2e;border:1px solid #7a2a52;color:#fecdd3;font-size:14px;padding:10px 12px;border-radius:10px;margin-bottom:14px}
.pie{margin-top:18px;font-size:14px;color:#94a3b8}.pie a{color:#5fb2dd;display:inline-block;padding:4px 0}
</style></head><body><main class="card">
<p class="eyebrow">Villelab · Curso</p>
<h1>Entra a tu curso</h1>
<p>Escribe el código que está en la clase «Empieza aquí» de tu área de miembros en Hotmart. Lo pides una sola vez en este navegador y quedas con los módulos 1 a 6 abiertos.</p>
${error ? '<div class="error">Ese código no corresponde. Revísalo en Hotmart y vuelve a intentarlo.</div>' : ''}
<form method="post" action="/curso/acceso">
<input type="hidden" name="d" value="${escapar(destino)}">
<label for="codigo">Código de acceso</label>
<input id="codigo" name="codigo" autocomplete="off" autocapitalize="characters" spellcheck="false" required placeholder="CURSO-XXXX-XXXX-XXXX-XXXX">
<button type="submit">Entrar al curso</button>
</form>
<p class="pie">¿Aún no lo tienes? <a href="${COMPRA}" target="_blank" rel="noopener noreferrer">Comprar el curso</a> · <a href="/curso/modulo-0">Ver el módulo 0</a><br>¿Problemas para entrar? Escríbeme por Instagram a @alvarovillena.ia.</p>
</main></body></html>`;
  return new Response(html, {
    status: error ? 401 : 200,
    headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'private, no-store', 'x-robots-tag': 'noindex, nofollow' },
  });
}

export const onRequestGet = async ({ request }: Ctx): Promise<Response> => {
  const url = new URL(request.url);
  const destino = destinoCurso(url.searchParams.get('d'));
  const codigo = url.searchParams.get('c');
  if (codigo) {
    const cookie = await canjearCurso(codigo);
    return cookie ? entrar(cookie, destino) : pagina(destino, true);
  }
  if (await tieneAccesoCurso(request)) return Response.redirect(new URL(destino, url).toString(), 303);
  return pagina(destino);
};

export const onRequestPost = async ({ request }: Ctx): Promise<Response> => {
  const form = await request.formData().catch(() => null);
  const destino = destinoCurso(form?.get('d')?.toString() ?? null);
  const cookie = await canjearCurso(form?.get('codigo')?.toString() ?? '');
  return cookie ? entrar(cookie, destino) : pagina(destino, true);
};
