#!/usr/bin/env node
/**
 * Lista los correos a medias del sitio (EXP-09 /esqueleto, 10-nov-2026): gente que escribió un correo válido en el
 * formulario y no lo envió. Viven en la metadata (event_type villelab_parcial) de los mensajes «✍️ dejó correo sin
 * enviar» del canal de Slack de visitas (functions/api/evento.ts). En el canal el correo se ve enmascarado; este
 * script lo muestra completo para hacer seguimiento.
 *
 * Uso: SLACK_BOT_TOKEN=… node scripts/parciales.mjs [--dias 7] [--canal C0AMNEGL8BX] [--json] [--todos]
 *   --todos incluye los que después completaron el registro (estado «completo»).
 * El token se lee del entorno; nunca se imprime.
 */

const arg = (n, d) => {
  const i = process.argv.indexOf(`--${n}`);
  return i > -1 ? process.argv[i + 1] : d;
};
const DIAS = Number(arg('dias', '7'));
const CANAL = arg('canal', process.env.SLACK_CANAL_PRODUCTOS || 'C0AMNEGL8BX');
const TOKEN = process.env.SLACK_BOT_TOKEN;
if (!TOKEN) {
  console.error('Falta SLACK_BOT_TOKEN en el entorno.');
  process.exit(1);
}

async function historia(cursor) {
  const q = new URLSearchParams({
    channel: CANAL,
    oldest: String(Date.now() / 1000 - DIAS * 86400),
    limit: '200',
    include_all_metadata: 'true',
  });
  if (cursor) q.set('cursor', cursor);
  const r = await fetch(`https://slack.com/api/conversations.history?${q}`, { headers: { authorization: `Bearer ${TOKEN}` } });
  const d = await r.json();
  if (!d.ok) throw new Error(`Slack: ${d.error}`);
  return d;
}

const filas = [];
let cursor;
do {
  const d = await historia(cursor);
  for (const m of d.messages ?? []) {
    if (m.metadata?.event_type !== 'villelab_parcial') continue;
    const p = m.metadata.event_payload ?? {};
    if (p.estado !== 'parcial' && !process.argv.includes('--todos')) continue;
    filas.push({ ts: m.ts, ...p });
  }
  cursor = d.response_metadata?.next_cursor;
} while (cursor);

if (process.argv.includes('--json')) console.log(JSON.stringify(filas, null, 2));
else if (!filas.length) console.log(`Sin correos a medias en los últimos ${DIAS} días.`);
else
  for (const f of filas)
    console.log(
      [f.fecha?.slice(0, 16), f.estado, f.correo, f.nombre, f.whatsapp, `paso ${f.paso ?? '?'}`, f.ruta, f.variante ? `EXP-${f.exp} ${f.variante}` : '', f.utm_source, f.utm_campaign]
        .filter(Boolean)
        .join(' · '),
    );
