// Chat en vivo del chibi (12-nov-2026, pedido de Álvaro: «un ícono tipo chatbot con el nuevo avatar… que a unos
// segundos diga hola, ¿tienes dudas?… y tú respondes en vivo»).
//
// Slack ES el almacenamiento: no hay KV ni base de datos.
//   - Cada chat abre UN mensaje raíz en #revenue-villelab («💬 chat en /curso …») con metadata villelab_chat
//     { k } — k es una clave al azar que genera el navegador; sin ella nadie puede leer las respuestas del hilo.
//   - Cada mensaje del visitante va al hilo con metadata villelab_chat_visita.
//   - Las respuestas son: mensajes con metadata villelab_chat_resp (los escribe ~/.claude/embudo-villelab/chat-responder.mjs
//     con el token local), o cualquier mensaje de una persona en el hilo (Álvaro respondiendo desde Slack).
//   - GET /api/chat?t=<ts raíz>&k=<clave>&desde=<ts> devuelve las respuestas nuevas; el widget lo consulta cada 5 s
//     mientras espera respuesta.
//
// Variables: las mismas de /api/evento (SLACK_BOT_TOKEN secreto, SLACK_CANAL_PRODUCTOS opcional). El bot necesita
// channels:history para el GET (el bot «vilo» lo tiene).

interface Env {
  SLACK_BOT_TOKEN?: string;
  SLACK_CANAL_PRODUCTOS?: string;
}
type Ctx = { request: Request; env: Env };

const CANAL_POR_DEFECTO = 'C0AMNEGL8BX';
const ORIGEN_OK = /^https:\/\/((www\.)?villelab\.com|[a-z0-9-]+\.villelabs\.pages\.dev)$/;
const TS_OK = /^\d{10}\.\d{6}$/;
const K_OK = /^[a-z0-9]{16,40}$/i;
const SID_OK = /^[a-z0-9-]{8,40}$/i;
const META_RAIZ = 'villelab_chat';
const META_VISITA = 'villelab_chat_visita';
const META_RESP = 'villelab_chat_resp';

type Tipo = 'mensaje' | 'whatsapp' | 'precargada';
const TIPOS: Tipo[] = ['mensaje', 'whatsapp', 'precargada'];

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
      'cache-control': 'no-store',
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

async function slack(env: Env, metodo: string, cuerpo: Record<string, unknown>) {
  const r = await fetch(`https://slack.com/api/${metodo}`, {
    method: 'POST',
    headers: { authorization: `Bearer ${env.SLACK_BOT_TOKEN}`, 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify(cuerpo),
  });
  return (await r.json()) as { ok: boolean; ts?: string; error?: string };
}

async function publicar(env: Env, canal: string, cuerpo: Record<string, unknown>) {
  const c = { channel: canal, unfurl_links: false, unfurl_media: false, ...cuerpo };
  let r = await slack(env, 'chat.postMessage', c);
  if (!r.ok && r.error === 'not_in_channel') {
    await slack(env, 'conversations.join', { channel: canal });
    r = await slack(env, 'chat.postMessage', c);
  }
  return r;
}

type MsgSlack = {
  ts: string;
  text?: string;
  user?: string;
  bot_id?: string;
  subtype?: string;
  metadata?: { event_type?: string; event_payload?: Record<string, unknown> };
};

async function hilo(env: Env, canal: string, t: string): Promise<MsgSlack[] | null> {
  const u = new URL('https://slack.com/api/conversations.replies');
  u.searchParams.set('channel', canal);
  u.searchParams.set('ts', t);
  u.searchParams.set('limit', '200');
  u.searchParams.set('include_all_metadata', 'true');
  const r = await fetch(u, { headers: { authorization: `Bearer ${env.SLACK_BOT_TOKEN}` } });
  const j = (await r.json()) as { ok: boolean; messages?: MsgSlack[] };
  return j.ok ? (j.messages ?? []) : null;
}

/** El hilo existe, es un chat y la clave coincide. */
function claveOk(msgs: MsgSlack[], k: string): boolean {
  const raiz = msgs[0];
  return raiz?.metadata?.event_type === META_RAIZ && raiz.metadata.event_payload?.k === k;
}

/** Texto de Slack → texto plano para el visitante. */
function aPlano(t: string): string {
  return t
    .replace(/<(https?:\/\/[^|>]+)\|([^>]+)>/g, '$2 ($1)')
    .replace(/<(https?:\/\/[^>]+)>/g, '$1')
    .replace(/<@[A-Z0-9]+>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .trim();
}

export const onRequestOptions = async ({ request }: Ctx): Promise<Response> => {
  const origen = request.headers.get('origin') ?? '';
  if (!ORIGEN_OK.test(origen)) return new Response(null, { status: 403 });
  return new Response(null, {
    status: 204,
    headers: {
      'access-control-allow-origin': origen,
      'access-control-allow-methods': 'GET, POST',
      'access-control-allow-headers': 'content-type',
      vary: 'Origin',
    },
  });
};

export const onRequestGet = async ({ request, env }: Ctx): Promise<Response> => {
  if (!env.SLACK_BOT_TOKEN) return json({ ok: false, error: 'sin_token' }, 503);
  const u = new URL(request.url);
  const t = u.searchParams.get('t') ?? '';
  const k = u.searchParams.get('k') ?? '';
  const desde = u.searchParams.get('desde') ?? '';
  if (!TS_OK.test(t) || !K_OK.test(k) || (desde && !TS_OK.test(desde))) return json({ ok: false }, 400);
  const canal = env.SLACK_CANAL_PRODUCTOS || CANAL_POR_DEFECTO;
  const msgs = await hilo(env, canal, t);
  if (!msgs) return json({ ok: false, error: 'slack' }, 502);
  if (!claveOk(msgs, k)) return json({ ok: false }, 404);
  const respuestas = msgs
    .slice(1)
    .filter((m) => m.metadata?.event_type === META_RESP || (!m.bot_id && m.user && !m.subtype))
    .filter((m) => !desde || Number(m.ts) > Number(desde))
    .map((m) => ({ ts: m.ts, texto: aPlano(String(m.metadata?.event_payload?.texto ?? m.text ?? '')).slice(0, 1500) }))
    .filter((m) => m.texto);
  return json({ ok: true, respuestas });
};

export const onRequestPost = async ({ request, env }: Ctx): Promise<Response> => {
  const origen = request.headers.get('origin') ?? '';
  if (!ORIGEN_OK.test(origen)) return json({ ok: false }, 403);
  if (!env.SLACK_BOT_TOKEN) return json({ ok: false, error: 'sin_token' }, 503, origen);

  let d: Record<string, unknown>;
  try {
    d = JSON.parse(await request.text()) as Record<string, unknown>;
  } catch {
    return json({ ok: false }, 400, origen);
  }

  const tipo = limpio(d.tipo, 20) as Tipo;
  const sid = limpio(d.sid, 40);
  const k = limpio(d.k, 40);
  if (!TIPOS.includes(tipo) || !SID_OK.test(sid) || !K_OK.test(k)) return json({ ok: false }, 400, origen);

  const ua = request.headers.get('user-agent') ?? '';
  const disp = dispositivo(ua);
  if (disp === 'bot') return json({ ok: false, omitido: 'bot' }, 200, origen);
  const asn = (request as unknown as { cf?: { asn?: number } }).cf?.asn;
  if (asn === 32934 || asn === 63293) return json({ ok: false, omitido: 'meta' }, 200, origen);

  const n = (conteo.get(sid) ?? 0) + 1;
  conteo.set(sid, n);
  if (conteo.size > 5000) conteo.clear();
  if (n > 40) return json({ ok: false, error: 'limite' }, 429, origen);

  const texto = limpio(d.texto, tipo === 'whatsapp' ? 30 : 600);
  if (!texto) return json({ ok: false }, 400, origen);
  if (tipo === 'whatsapp' && !/^\+?[\d\s-]{8,20}$/.test(texto)) return json({ ok: false, error: 'numero' }, 400, origen);

  const canal = env.SLACK_CANAL_PRODUCTOS || CANAL_POR_DEFECTO;
  const ruta = limpio(d.ruta, 80) || '/';
  const variante = limpio(d.variante, 2);
  const exp = /^\d{2}$/.test(limpio(d.exp, 2)) ? limpio(d.exp, 2) : '';
  const etiqueta = exp && /^(A|B|C2?)$/.test(variante) ? `[EXP-${exp} ${variante}] ` : '';
  const utm = limpio(d.utm, 60);
  const cf = (request as unknown as { cf?: { city?: string; country?: string } }).cf ?? {};
  const lugar = [cf.city, cf.country].filter(Boolean).join(', ') || 'lugar desconocido';

  let t = TS_OK.test(String(d.t ?? '')) ? String(d.t) : '';
  if (t) {
    const msgs = await hilo(env, canal, t);
    if (!msgs || !claveOk(msgs, k)) t = '';
  }
  if (!t) {
    const raiz = await publicar(env, canal, {
      text: `${etiqueta}💬 *chat* en \`${ruta}\` · ${disp} · ${lugar}${utm ? ` · ${utm}` : ''} — responde en el hilo`,
      metadata: { event_type: META_RAIZ, event_payload: { k, sid, ruta } },
    });
    if (!raiz.ok || !raiz.ts) return json({ ok: false, error: 'slack' }, 502, origen);
    t = raiz.ts;
  }

  const linea =
    tipo === 'whatsapp'
      ? `📱 dejó su WhatsApp para seguir por ahí: ${texto}`
      : tipo === 'precargada'
        ? `❔ (pregunta lista) ${texto}`
        : `🗣 ${texto}`;
  const r = await publicar(env, canal, {
    text: linea,
    thread_ts: t,
    reply_broadcast: tipo === 'whatsapp',
    metadata: { event_type: META_VISITA, event_payload: { tipo, sid } },
  });
  if (!r.ok) return json({ ok: false, error: 'slack' }, 502, origen);
  return json({ ok: true, t, ts: r.ts }, 200, origen);
};
