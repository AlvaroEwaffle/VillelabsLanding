// Medición de /lista con EXP-24 (19-nov-2026). Mismo canal de siempre: Slack vía /api/evento (tipo «paso», 🧭) + GA4 directo
// a G-8KYM943L8X. Todo lleva la versión y viaja con la etiqueta «[EXP-24 A|B]» en Slack.
//
//   - Carga  → «lista · v=A · src=X»                 + GA4 lista_click  { src, v }
//   - Toque  → «lista · v=B · botón 2 · src=X»       + GA4 lista_boton  { src, v, boton }   (sendBeacon, sin esperar)
//              (la barra fija inferior de B es «botón fijo»)
//   - Scroll → «lista · v=B · scroll 50 % · src=X»   + GA4 lista_scroll { src, v, pct }     (solo B, 25/50/75 una vez)
//   - FAQ    → «lista · v=B · faq 2 «¿…?» · src=X»  + GA4 lista_faq    { src, v, pregunta } (cada pregunta, la 1.ª vez)
//   - Correo → «lista · v=A · correo abierto|enviado · src=X» + GA4 lista_correo_abierto|enviado { src, v, lugar }
//              (el registro mismo además sale como «🎯 Nuevo registro en lista-taller» por lib/productos/leads.ts)
// Pruebas: ?src=qa…, ?qa o navigator.webdriver no mandan nada (ni Slack ni GA4). En localhost eventos.ts no manda a Slack.
// Lector: ~/.claude/embudo-villelab/lista-boton.mjs (lee el formato viejo «lista · src=» y el nuevo, por versión y botón).

import { eventosActivos, registrarEvento, sid } from '@/lib/productos/eventos';
import { srcLista } from '@/lib/productos/taller';
import { asignarVersion, type VersionLista } from './sorteo';

const MEDICION_GA4 = 'G-8KYM943L8X';
// Misma clave que usa lib/productos/eventos.ts para el hilo de Slack de la visita.
const CLAVE_HILO = 'vl_hilo';

type VentanaGtag = typeof window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  google_tag_manager?: Record<string, unknown>;
};

export interface VisitaLista {
  src: string;
  prueba: boolean;
  v: VersionLista;
}

let visita: VisitaLista | null = null;

/** src, si es prueba y versión de esta carga. Solo en el cliente, después de montar. */
export function visitaLista(): VisitaLista {
  if (visita) return visita;
  let src = 'directo';
  let prueba = false;
  try {
    const q = new URLSearchParams(window.location.search);
    src = srcLista(q.get('src'));
    prueba = Boolean((navigator as Navigator & { webdriver?: boolean }).webdriver) || /^qa/i.test(q.get('src') ?? '') || q.has('qa');
  } catch {
    /* src directo, no prueba */
  }
  visita = { src, prueba, v: asignarVersion() };
  return visita;
}

function conGtag(): VentanaGtag {
  const w = window as VentanaGtag;
  w.dataLayer = w.dataLayer ?? [];
  w.gtag =
    w.gtag ??
    function gtag() {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer!.push(arguments);
    };
  return w;
}

/** GA4 apenas el contenedor tenga la medición cargada (máx. 15 s esperando); nunca lanza. */
function ga4(evento: string, params: Record<string, unknown>) {
  try {
    const w = conGtag();
    const enviar = () => w.gtag!('event', evento, { ...params, send_to: MEDICION_GA4 });
    if (w.google_tag_manager?.[MEDICION_GA4]) return enviar();
    let n = 0;
    const sondeo = setInterval(() => {
      n += 1;
      if (w.google_tag_manager?.[MEDICION_GA4]) {
        clearInterval(sondeo);
        enviar();
      } else if (n > 150) clearInterval(sondeo);
    }, 100);
  } catch {
    /* sin GA4 la página sigue */
  }
}

function slack(detalle: string, v: VersionLista) {
  try {
    registrarEvento('paso', { detalle, exp: '24', variante: v });
  } catch {
    /* sin Slack la página sigue */
  }
}

let cargaMedida = false;

export function medirCarga() {
  const { src, prueba, v } = visitaLista();
  if (prueba || cargaMedida) return;
  cargaMedida = true;
  slack(`lista · v=${v} · src=${src}`, v);
  ga4('lista_click', { src, v });
}

export function medirScroll(pct: 25 | 50 | 75) {
  const { src, prueba, v } = visitaLista();
  if (prueba) return;
  slack(`lista · v=${v} · scroll ${pct} % · src=${src}`, v);
  ga4('lista_scroll', { src, v, pct });
}

export function medirPregunta(n: number, pregunta: string) {
  const { src, prueba, v } = visitaLista();
  if (prueba) return;
  slack(`lista · v=${v} · faq ${n} «${pregunta}» · src=${src}`, v);
  ga4('lista_faq', { src, v, pregunta: n });
}

/** Segundo camino (19-nov-2026, Álvaro): abrió el bloque «avísame por correo» o lo envió. Nunca lleva el correo. */
export function medirCorreo(paso: 'abierto' | 'enviado', lugar: 1 | 2) {
  const { src, prueba, v } = visitaLista();
  if (prueba) return;
  slack(`lista · v=${v} · correo ${paso} · src=${src}`, v);
  ga4(paso === 'abierto' ? 'lista_correo_abierto' : 'lista_correo_enviado', { src, v, lugar });
}

/**
 * Toque de un botón al grupo. Sale en el mismo toque con sendBeacon (o fetch keepalive) y sin preventDefault: la
 * navegación al grupo no espera a nada. No pasa por la cola de eventos (que espera la respuesta de la carga).
 */
export function medirToque(boton: 1 | 2 | 3 | 'fijo') {
  const { src, prueba, v } = visitaLista();
  if (prueba) return;
  const detalle = `lista · v=${v} · botón ${boton} · src=${src}`;
  if (eventosActivos()) {
    let hilo: string | undefined;
    try {
      hilo = sessionStorage.getItem(CLAVE_HILO) ?? undefined;
    } catch {
      /* sin almacenamiento: va como mensaje propio */
    }
    const cuerpo = JSON.stringify({ tipo: 'paso', sid: sid(), hilo, ruta: location.pathname, exp: '24', variante: v, detalle });
    let enviado = false;
    try {
      enviado = Boolean(navigator.sendBeacon?.('/api/evento', new Blob([cuerpo], { type: 'text/plain' })));
    } catch {
      /* cae al fetch */
    }
    if (!enviado) {
      try {
        void fetch('/api/evento', { method: 'POST', headers: { 'content-type': 'text/plain' }, body: cuerpo, keepalive: true }).catch(
          () => {},
        );
      } catch {
        /* se pierde este aviso y listo */
      }
    }
  }
  try {
    conGtag().gtag!('event', 'lista_boton', { src, v, boton, send_to: MEDICION_GA4, transport_type: 'beacon' });
  } catch {
    /* sin GA4 igual navega */
  }
}
