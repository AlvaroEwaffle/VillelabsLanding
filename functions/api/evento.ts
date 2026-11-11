// Notificaciones a Slack (workspace Villelabs) de lo que hace la gente en villelab.com (8-nov-2026, pedido de Álvaro:
// «que me lleguen notificaciones vía Slack de Villelabs cada vez que alguien entra y hace alguna cosa»).
//
// Cloudflare Pages Function: el sitio es export estático, así que el token de Slack NUNCA va al navegador; vive como
// secreto del proyecto `villelabs` (SLACK_BOT_TOKEN) y solo esta función lo usa.
//   - Cada visita abre UN mensaje en el canal; todo lo que esa persona hace después va en el hilo (thread_ts).
//   - Solo acepta POST desde villelab.com (o previews *.villelabs.pages.dev), tipos en lista blanca y textos cortos.
//
// Variables (Cloudflare Pages → villelabs → Settings → Variables and Secrets):
//   SLACK_BOT_TOKEN       secreto, bot «vilo» del workspace Villelabs (scopes chat:write + channels:join).
//   SLACK_CANAL_PRODUCTOS opcional, id del canal; por defecto #revenue-villelab (C0AMNEGL8BX).

interface Env {
  SLACK_BOT_TOKEN?: string;
  SLACK_CANAL_PRODUCTOS?: string;
}

// Tipo mínimo del contexto de Pages Functions (sin depender de @cloudflare/workers-types, así Next también lo tipa).
type Ctx = { request: Request; env: Env };

type Tipo = 'visita' | 'pagina' | 'clic' | 'video' | 'lead' | 'scroll' | 'tiempo';
const TIPOS: Tipo[] = ['visita', 'pagina', 'clic', 'video', 'lead', 'scroll', 'tiempo'];
// Scroll y tiempo solo tienen sentido dentro del hilo de una visita ya abierta (10-nov-2026).
const SOLO_HILO: Tipo[] = ['scroll', 'tiempo'];
const HITOS = [25, 50, 75, 100];
const CANAL_POR_DEFECTO = 'C0AMNEGL8BX';

const ORIGEN_OK = /^https:\/\/((www\.)?villelab\.com|[a-z0-9-]+\.villelabs\.pages\.dev)$/;

// Límite por visita dentro del mismo isolate (best effort; el cliente además corta en 40 eventos).
const conteo = new Map<string, number>();

const limpio = (v: unknown, max = 120): string =>
  String(v ?? '')
    .replace(/[<>&]/g, '')
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/@(channel|here|everyone)/gi, '$1')
    .trim()
    .slice(0, max);

function json(cuerpo: unknown, estado = 200, origen = ''): Response {
  return new Response(JSON.stringify(cuerpo), {
    status: estado,
    headers: {
      'content-type': 'application/json',
      ...(origen ? { 'access-control-allow-origin': origen, vary: 'Origin' } : {}),
    },
  });
}

function dispositivo(ua: string): string {
  if (/bot|crawl|spider|slurp|preview|lighthouse|headless/i.test(ua)) return 'bot';
  if (/iphone|android.+mobile|mobile/i.test(ua)) return 'celular';
  if (/ipad|tablet|android/i.test(ua)) return 'tablet';
  return 'computador';
}

function fuente(ref: string, utm: string): string {
  if (utm) return utm;
  if (!ref) return 'directo';
  try {
    const h = new URL(ref).hostname.replace(/^www\./, '');
    if (/google\./.test(h)) return 'Google';
    if (/instagram|l\.instagram/.test(h)) return 'Instagram';
    if (/facebook|fb\.|m\.facebook/.test(h)) return 'Facebook';
    if (/linkedin|lnkd/.test(h)) return 'LinkedIn';
    if (/youtube|youtu\.be/.test(h)) return 'YouTube';
    if (/whatsapp|wa\.me/.test(h)) return 'WhatsApp';
    if (/villelab\.com$/.test(h)) return 'el mismo sitio';
    return h;
  } catch {
    return 'directo';
  }
}

async function slack(env: Env, metodo: string, cuerpo: Record<string, unknown>) {
  const r = await fetch(`https://slack.com/api/${metodo}`, {
    method: 'POST',
    headers: { authorization: `Bearer ${env.SLACK_BOT_TOKEN}`, 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify(cuerpo),
  });
  return (await r.json()) as { ok: boolean; ts?: string; error?: string };
}

async function publicar(env: Env, canal: string, texto: string, hilo?: string, alCanal = false) {
  const cuerpo: Record<string, unknown> = { channel: canal, text: texto, unfurl_links: false, unfurl_media: false };
  if (hilo) cuerpo.thread_ts = hilo;
  if (hilo && alCanal) cuerpo.reply_broadcast = true;
  let r = await slack(env, 'chat.postMessage', cuerpo);
  if (!r.ok && r.error === 'not_in_channel') {
    await slack(env, 'conversations.join', { channel: canal });
    r = await slack(env, 'chat.postMessage', cuerpo);
  }
  return r;
}

export const onRequestOptions = async ({ request }: Ctx): Promise<Response> => {
  const origen = request.headers.get('origin') ?? '';
  if (!ORIGEN_OK.test(origen)) return new Response(null, { status: 403 });
  return new Response(null, {
    status: 204,
    headers: {
      'access-control-allow-origin': origen,
      'access-control-allow-methods': 'POST',
      'access-control-allow-headers': 'content-type',
      vary: 'Origin',
    },
  });
};

export const onRequestPost = async ({ request, env }: Ctx): Promise<Response> => {
  const origen = request.headers.get('origin') ?? '';
  if (!ORIGEN_OK.test(origen)) return json({ ok: false }, 403);
  if (!env.SLACK_BOT_TOKEN) return json({ ok: false, error: 'sin_token' }, 503, origen);

  let d: Record<string, unknown>;
  try {
    d = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false }, 400, origen);
  }

  const tipo = limpio(d.tipo, 20) as Tipo;
  const sid = limpio(d.sid, 40);
  if (!TIPOS.includes(tipo) || !/^[a-z0-9-]{8,40}$/i.test(sid)) return json({ ok: false }, 400, origen);

  const ua = request.headers.get('user-agent') ?? '';
  const disp = dispositivo(ua);
  if (disp === 'bot') return json({ ok: true, omitido: 'bot' }, 200, origen);
  // Meta revisa cada link nuevo (bio, anuncios) con navegadores reales desde su red (AS32934): llegaban como
  // «visitas desde Facebook» de Springfield, Prineville, Forest City… No son personas.
  const asn = (request as unknown as { cf?: { asn?: number } }).cf?.asn;
  if (asn === 32934 || asn === 63293) return json({ ok: true, omitido: 'meta' }, 200, origen);

  const n = (conteo.get(sid) ?? 0) + 1;
  conteo.set(sid, n);
  if (conteo.size > 5000) conteo.clear();
  if (n > 100) return json({ ok: false, error: 'limite' }, 429, origen);

  const ruta = limpio(d.ruta, 80) || '/';
  const hilo = /^\d{10}\.\d{6}$/.test(String(d.hilo ?? '')) ? String(d.hilo) : undefined;
  const cf = (request as unknown as { cf?: { city?: string; country?: string } }).cf ?? {};
  const lugar = [cf.city, cf.country].filter(Boolean).join(', ') || 'lugar desconocido';
  const canal = env.SLACK_CANAL_PRODUCTOS || CANAL_POR_DEFECTO;
  if (SOLO_HILO.includes(tipo) && !hilo) return json({ ok: false, error: 'sin_hilo' }, 400, origen);
  const pct = Number(d.pct);
  const pctOk = HITOS.includes(pct) ? pct : 0;

  let texto = '';
  switch (tipo) {
    case 'visita':
      texto = `👀 *Nueva visita* a \`${ruta}\` · desde ${fuente(limpio(d.ref, 200), limpio(d.utm, 60))} · ${disp} · ${lugar}`;
      break;
    case 'pagina':
      texto = `→ pasó a \`${ruta}\``;
      break;
    case 'clic':
      texto = `🖱️ clic en «${limpio(d.detalle, 60)}» (\`${ruta}\`)`;
      break;
    case 'video':
      texto = `▶️ reprodujo el video «${limpio(d.detalle, 80)}»`;
      break;
    case 'scroll':
      if (!pctOk) return json({ ok: false }, 400, origen);
      texto = `↓ scroll ${pctOk} % (\`${ruta}\`)`;
      break;
    case 'tiempo': {
      const seg = Math.round(Number(d.seg));
      if (!Number.isFinite(seg) || seg < 1 || seg > 6 * 3600) return json({ ok: false }, 400, origen);
      const t = seg < 60 ? `${seg} s` : `${Math.floor(seg / 60)} min ${seg % 60} s`;
      texto = `⏱ ${t} en \`${ruta}\`${pctOk ? ` · llegó al ${pctOk} %` : ' · sin scroll'}`;
      break;
    }
    case 'lead': {
      const det = (d.datos && typeof d.datos === 'object' ? d.datos : {}) as Record<string, unknown>;
      const partes = Object.entries(det)
        .slice(0, 6)
        .map(([k, v]) => `${limpio(k, 20)}: ${limpio(v, 60)}`)
        .filter((s) => !s.endsWith(': '));
      texto = `🎯 *Nuevo registro* en ${limpio(d.detalle, 30)} · ${limpio(d.nombre, 60)} · ${limpio(d.correo, 80)}${partes.length ? ` · ${partes.join(' · ')}` : ''}`;
      break;
    }
  }

  // EXP-08 (10-nov-2026): la variante del hero de /curso, si viene, encabeza el mensaje → «[EXP-08 B] …».
  const variante = limpio(d.variante, 1);
  if (/^[ABC]$/.test(variante)) texto = `[EXP-08 ${variante}] ${texto}`;

  // Un registro va en el hilo de su visita y además se muestra en el canal (reply_broadcast), para que no se pierda.
  const r = await publicar(env, canal, texto, hilo, tipo === 'lead');
  return json({ ok: r.ok, hilo: hilo ?? r.ts }, r.ok ? 200 : 502, origen);
};
