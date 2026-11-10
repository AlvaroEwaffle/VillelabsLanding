// Atribución por canal (9-nov-2026, RAG #1 «conversión del sitio»).
//
// Los UTM con que llega la visita (utm_source / utm_medium / utm_campaign) se guardan en sessionStorage al entrar
// (Rastreo los captura en cualquier página) y después viajan:
//   1) en los `detalles` de cada lead (lib/productos/leads.ts → etiquetas «utm-source:meta» en Fidelidapp), y
//   2) en los links de compra de Hotmart como `src` (canal) y `sck` (canal_medio_campaña), que Hotmart guarda en
//      cada venta y muestra en sus reportes, para saber qué canal vendió.
// Sin UTM pero con gclid/fbclid se anota el canal igual (google-ads / meta). Nunca lanza: si no hay sessionStorage,
// se usa solo lo que trae la URL actual.

const CLAVE = 'villelab_utm';

export interface Utm {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

const limpiar = (s: string | null | undefined) => (s ?? '').trim().slice(0, 80);

function deLaUrl(): Utm {
  if (typeof window === 'undefined') return {};
  const q = new URLSearchParams(window.location.search);
  const utm: Utm = {};
  const source = limpiar(q.get('utm_source')) || (q.get('gclid') ? 'google-ads' : q.get('fbclid') ? 'meta' : '');
  if (source) utm.utm_source = source;
  const medium = limpiar(q.get('utm_medium'));
  if (medium) utm.utm_medium = medium;
  const campaign = limpiar(q.get('utm_campaign'));
  if (campaign) utm.utm_campaign = campaign;
  return utm;
}

/** Guarda los UTM de la URL actual (si trae alguno). Una URL nueva con UTM reemplaza a la anterior. */
export function capturarUtm(): void {
  const utm = deLaUrl();
  if (!utm.utm_source && !utm.utm_campaign) return;
  try {
    window.sessionStorage.setItem(CLAVE, JSON.stringify(utm));
  } catch {
    // Sin almacenamiento: leerUtm() cae a la URL actual.
  }
}

/** Los UTM de la visita: los guardados en la sesión o, si no hay, los de la URL actual. */
export function leerUtm(): Utm {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.sessionStorage.getItem(CLAVE);
    if (raw) return JSON.parse(raw) as Utm;
  } catch {
    // sigue con la URL
  }
  return deLaUrl();
}

const codigo = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 30);

/**
 * Agrega `src` y `sck` de Hotmart a un link de checkout. `src` = canal (o «directo»); `sck` = canal_medio_campaña_botón.
 * Si el link no es de Hotmart lo devuelve igual.
 */
export function hotmartConUtm(href: string, ubicacion?: string): string {
  if (!/^https:\/\/pay\.hotmart\.com\//.test(href)) return href;
  const utm = leerUtm();
  try {
    const url = new URL(href);
    const src = codigo(utm.utm_source ?? '') || 'directo';
    const sck = [src, utm.utm_medium, utm.utm_campaign, ubicacion].map((x) => codigo(x ?? '')).filter(Boolean).join('_');
    url.searchParams.set('src', src);
    if (sck) url.searchParams.set('sck', sck.slice(0, 100));
    return url.toString();
  } catch {
    return href;
  }
}
