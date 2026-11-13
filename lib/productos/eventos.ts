// Eventos del sitio → Slack de Villelabs (8-nov-2026). Ver functions/api/evento.ts.
//
// Una visita = un mensaje en Slack; lo que la persona hace después (páginas, clics, videos, registros) va en su hilo.
// Solo corre en villelab.com y sus previews: en localhost no se envía nada (como GTM).
// Nunca lanza ni bloquea la página: si falla, se pierde ese evento y listo.

import { EXP13 } from './curso/exp13';
import { EXP14 } from './esqueleto/exp14';
import { EXP12 } from './guia/exp12';

// «paso»: avance dentro de una herramienta (12-nov-2026, /cotizador: eligió trabajo, llegó al resultado, tocó agendar).
type Tipo = 'visita' | 'pagina' | 'clic' | 'video' | 'lead' | 'scroll' | 'tiempo' | 'chat' | 'paso';

/**
 * Experimento de hero vigente → «[EXP-08 B]» / «[EXP-09 C]» en Slack. Manda el de la página actual; si la visita
 * pasó antes por la página de otro experimento (navegación interna), sigue llevando esa variante.
 */
export function experimento(): { exp?: string; variante?: string } {
  if (typeof window === 'undefined') return {};
  // 12-nov-2026 17:00: EXP-13 /curso · EXP-14 /esqueleto (dos variantes, 2-4 días) · EXP-12 /guia (versión única en curso).
  // Primero el de la página actual.
  const todos = [EXP13, EXP14, EXP12];
  const p = location.pathname;
  const actual = /^\/esqueleto(\/|$)/.test(p) ? EXP14 : /^\/guia(\/|$)/.test(p) ? EXP12 : EXP13;
  const propio = [actual, ...todos.filter((e) => e !== actual)];
  for (const e of propio) {
    const v = e.variante();
    if (v) return { exp: e.id, variante: e.etiqueta(v) };
  }
  return {};
}

// Correo a medias (EXP-09, 10-nov-2026): el ts del mensaje «✍️ dejó correo sin enviar» de esta visita, para
// actualizarlo en vez de repetirlo y para marcarlo como completado cuando llega el registro real.
const CLAVE_PARCIAL = 'vl_parcial_ts';

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

function borrar(k: string) {
  try {
    sessionStorage.removeItem(k);
  } catch {
    /* sin almacenamiento */
  }
}

export function sid(): string {
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
      // EXP-08/09: la variante del hero viaja en cada evento → «[EXP-08 B]» / «[EXP-09 C]» en Slack.
      // Un registro lleva el ts del correo a medias de la visita (si hubo), para marcarlo como completado.
      const parcial = tipo === 'lead' ? (leer(CLAVE_PARCIAL) ?? undefined) : undefined;
      const r = await fetch('/api/evento', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ tipo: t, sid: sid(), hilo, ruta: location.pathname, ...experimento(), parcial, ...extra }),
        keepalive: true,
      });
      if (parcial) borrar(CLAVE_PARCIAL);
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
    const cuerpo = JSON.stringify({ tipo, sid: sid(), hilo, ...experimento(), ...datos });
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
        body: JSON.stringify({ tipo, sid: sid(), hilo, ...experimento(), ...datos }),
        keepalive: true,
      });
    })
    .catch(() => {});
}

export interface DatosParcial {
  nombre: string;
  correo: string;
  whatsapp: string;
  /** Paso al que llegó (en /esqueleto: 1-4 los pasos, 5 los datos de contacto). */
  paso: number;
  producto: string;
  utm: Record<string, string | undefined>;
}

/**
 * Correo a medias: la persona escribió un correo válido en el formulario y todavía no lo envía. Va al hilo de su
 * visita como «✍️ dejó correo sin enviar (paso n)», con el correo enmascarado; los datos completos quedan en la
 * metadata del mensaje de Slack (functions/api/evento.ts). Cada envío posterior de la misma visita actualiza ese
 * mensaje. `alSalir` usa sendBeacon (cierre o cambio de pestaña): no hay respuesta, así que no guarda el ts.
 */
export function registrarParcial(datos: DatosParcial, alSalir = false): void {
  if (!eventosActivos()) return;
  const cuerpo = () =>
    JSON.stringify({
      tipo: 'parcial',
      sid: sid(),
      hilo: leer(CLAVE_HILO) ?? undefined,
      ts: leer(CLAVE_PARCIAL) ?? undefined,
      ruta: location.pathname,
      ...experimento(),
      ...datos,
    });
  if (alSalir) {
    try {
      if (navigator.sendBeacon?.('/api/evento', new Blob([cuerpo()], { type: 'text/plain' }))) return;
    } catch {
      /* cae al fetch */
    }
    fetch('/api/evento', { method: 'POST', body: cuerpo(), keepalive: true }).catch(() => {});
    return;
  }
  cadena = cadena
    .then(async () => {
      const r = await fetch('/api/evento', { method: 'POST', headers: { 'content-type': 'application/json' }, body: cuerpo(), keepalive: true });
      if (!r.ok) return;
      const d = (await r.json()) as { hilo?: string; ts?: string };
      if (d.ts) escribir(CLAVE_PARCIAL, d.ts);
      if (!leer(CLAVE_HILO) && d.hilo) escribir(CLAVE_HILO, d.hilo);
    })
    .catch(() => {});
}
