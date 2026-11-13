// /guia/acceso: canjea el código de la Guía 1 por la cookie de acceso.
//   GET  /guia/acceso            → formulario
//   GET  /guia/acceso?c=CODIGO   → link de un clic desde Hotmart
//   POST /guia/acceso (codigo)   → envío del formulario
import { COOKIE, PROTEGIDO, canjear, tieneAcceso } from '../_lib/guia1';

type Env = { SLACK_BOT_TOKEN?: string; SLACK_CANAL_PRODUCTOS?: string };
type Ctx = { request: Request; env: Env; waitUntil: (p: Promise<unknown>) => void };

// Aviso a #revenue-villelab cuando alguien entra con un código de regalo (para pedirle el testimonio).
function avisarRegalo(ctx: Ctx, id: string) {
  if (!ctx.env.SLACK_BOT_TOKEN) return;
  const canal = ctx.env.SLACK_CANAL_PRODUCTOS || 'C0AMNEGL8BX';
  ctx.waitUntil(fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: { authorization: `Bearer ${ctx.env.SLACK_BOT_TOKEN}`, 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ channel: canal, text: `🎁 Guía 1 regalada: entró el código *${id}*. En 2-3 días toca pedirle feedback y testimonio.` }),
  }).catch(() => null));
}

const UN_ANO = 60 * 60 * 24 * 365;

function destinoSeguro(d: string | null): string {
  return d && PROTEGIDO.test(d) && !d.includes('//') ? d : '/guia/prospeccion';
}

function entrar(cookie: string, destino: string): Response {
  return new Response(null, {
    status: 303,
    headers: {
      location: destino,
      'set-cookie': `${COOKIE}=${cookie}; Path=/guia; Max-Age=${UN_ANO}; Secure; HttpOnly; SameSite=Lax`,
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
<meta name="robots" content="noindex, nofollow"><title>Acceso a tu Guía 1 | Villelab</title>
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
.pie{margin-top:18px;font-size:14px;color:#94a3b8}.pie a{color:#5fb2dd}
</style></head><body><main class="card">
<p class="eyebrow">Villelab · Guía 1</p>
<h1>Entra a tu guía</h1>
<p>Escribe tu código: el que te llegó por mensaje o el de la clase «Empieza aquí» en Hotmart. Solo te lo pide una vez en este navegador.</p>
${error ? '<div class="error">Ese código no corresponde o ya venció. Revísalo y vuelve a intentarlo.</div>' : ''}
<form method="post" action="/guia/acceso">
<input type="hidden" name="d" value="${escapar(destino)}">
<label for="codigo">Código de acceso</label>
<input id="codigo" name="codigo" autocomplete="off" autocapitalize="characters" spellcheck="false" required placeholder="Pega aquí tu código">
<button type="submit">Entrar a la guía</button>
</form>
<p class="pie">¿Aún no la tienes? <a href="/guia">Mira qué incluye la Guía 1</a>.<br>¿Problemas para entrar? Escríbeme por Instagram a @alvarovillena.ia.</p>
</main></body></html>`;
  return new Response(html, {
    status: error ? 401 : 200,
    headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'private, no-store', 'x-robots-tag': 'noindex, nofollow' },
  });
}

export const onRequestGet = async (ctx: Ctx): Promise<Response> => {
  const { request } = ctx;
  const url = new URL(request.url);
  const destino = destinoSeguro(url.searchParams.get('d'));
  const codigo = url.searchParams.get('c');
  if (codigo) {
    const r = await canjear(codigo);
    if (r?.regalo) avisarRegalo(ctx, r.regalo);
    return r ? entrar(r.cookie, destino) : pagina(destino, true);
  }
  if (await tieneAcceso(request)) return Response.redirect(new URL(destino, url).toString(), 303);
  return pagina(destino);
};

export const onRequestPost = async (ctx: Ctx): Promise<Response> => {
  const { request } = ctx;
  const form = await request.formData().catch(() => null);
  const destino = destinoSeguro(form?.get('d')?.toString() ?? null);
  const r = await canjear(form?.get('codigo')?.toString() ?? '');
  if (r?.regalo) avisarRegalo(ctx, r.regalo);
  return r ? entrar(r.cookie, destino) : pagina(destino, true);
};
