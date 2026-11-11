// Eventos del sitio → Slack de Villelabs (8-nov-2026). Ver functions/api/evento.ts.
//
// Una visita = un mensaje en Slack; lo que la persona hace después (páginas, clics, videos, registros) va en su hilo.
// Solo corre en villelab.com y sus previews: en localhost no se envía nada (como GTM).
// Nunca lanza ni bloquea la página: si falla, se pierde ese evento y listo.

import { varianteExp08 } from './curso/exp08';

type Tipo = 'visita' | 'pagina' | 'clic' | 'video' | 'lead' | 'scroll' | 'tiempo';

const CLAVE_SID = 'vl_sid';
const CLAVE_HILO = 'vl_hilo';
const CLAVE_N = 'vl_eventos';
const MAX_EVENTOS = 40;
// Scroll y tiempo llevan su propio cupo, para no comerse el de clics/páginas/registros.
const CLAVE_N_LECTURA = 'vl_eventos_lectura';
const MAX_LECTURA = 50;

let cadena: Promise<unknown> = Promise.resolve();

export function eventosActivos(): boolean {
  if (typeof window === 'undefined') return false;
  if ((navigator as Navigator & { webdriver?: boolean }).webdriver) return false;
  return /(^|\.)villelab\.com$|\.villelabs\.pages\.dev$/.test(location.hostname);
}

function leer(k: string): string | null {
  try {
    return sessionStorage.getItem(k);
  } catch {
    return null;
  }
}
function escribir(k: string, v: string) {
  try {
    sessionStorage.setItem(k, v);
  } catch {
    /* sin almacenamiento */
  }
}

function sid(): string {
  let s = leer(CLAVE_SID);
  if (!s) {
    s = (crypto.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`).slice(0, 36);
    escribir(CLAVE_SID, s);
  }
  return s;
}

/** Registra un evento. Los eventos de una visita salen en orden para que todos caigan en el mismo hilo. */
export function registrarEvento(tipo: Tipo, extra: Record<string, unknown> = {}): void {
  if (!eventosActivos()) return;
  const n = Number(leer(CLAVE_N) ?? '0');
  if (n >= MAX_EVENTOS) return;
  escribir(CLAVE_N, String(n + 1));

  cadena = cadena
    .then(async () => {
      const hilo = leer(CLAVE_HILO) ?? undefined;
      // Sin hilo todavía, el primer evento de la visita abre el mensaje.
      const t: Tipo = !hilo && tipo === 'pagina' ? 'visita' : tipo;
      const r = await fetch('/api/evento', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        // EXP-08: la variante del hero de /curso viaja en cada evento → «[EXP-08 B]» en Slack.
        body: JSON.stringify({ tipo: t, sid: sid(), hilo, ruta: location.pathname, variante: varianteExp08(), ...extra }),
        keepalive: true,
      });
      if (!r.ok) return;
      const d = (await r.json()) as { hilo?: string };
      if (!hilo && d.hilo) escribir(CLAVE_HILO, d.hilo);
    })
    .catch(() => {});
}

function cupoLectura(): boolean {
  const n = Number(leer(CLAVE_N_LECTURA) ?? '0');
  if (n >= MAX_LECTURA) return false;
  escribir(CLAVE_N_LECTURA, String(n + 1));
  return true;
}

/**
 * Scroll y tiempo en página (10-nov-2026). Solo van en el hilo de una visita ya abierta: si el mensaje raíz no
 * existe todavía, se descartan. `alSalir` usa sendBeacon, que sobrevive al cierre o cambio de pestaña.
 */
export function registrarLectura(
  tipo: 'scroll' | 'tiempo',
  datos: { ruta: string; pct?: number; seg?: number },
  alSalir = false,
): void {
  if (!eventosActivos()) return;
  if (alSalir) {
    const hilo = leer(CLAVE_HILO);
    if (!hilo || !cupoLectura()) return;
    const cuerpo = JSON.stringify({ tipo, sid: sid(), hilo, variante: varianteExp08(), ...datos });
    try {
      if (navigator.sendBeacon?.('/api/evento', new Blob([cuerpo], { type: 'text/plain' }))) return;
    } catch {
      /* cae al fetch */
    }
    fetch('/api/evento', { method: 'POST', body: cuerpo, keepalive: true }).catch(() => {});
    return;
  }
  cadena = cadena
    .then(async () => {
      const hilo = leer(CLAVE_HILO);
      if (!hilo || !cupoLectura()) return;
      await fetch('/api/evento', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ tipo, sid: sid(), hilo, variante: varianteExp08(), ...datos }),
        keepalive: true,
      });
    })
    .catch(() => {});
}
