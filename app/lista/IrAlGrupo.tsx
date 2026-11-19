'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';
import { ArrowRight } from 'lucide-react';
import { eventosActivos, experimento, registrarEvento, sid } from '@/lib/productos/eventos';
import { TALLER, srcLista } from '@/lib/productos/taller';

// Botón al grupo del taller + medición de /lista (ver app/lista/page.tsx).
//
// 19-nov-2026 (audit «nadie llegó al grupo», ~/.claude/marca-alvaro/embudo/2026-11-19-audit-grupo.md): ~20 personas
// cargaron /lista en dos días, casi todas desde un anuncio dentro de Instagram, y 0 entraron al grupo. Se saca la
// redirección automática (7 s): el botón es el único camino, con un toque real de la persona, y el toque se mide aparte.
//
//   - Carga  → Slack «🧭 lista · src=<src>» (tipo «paso») + GA4 lista_click { src }. Igual que antes: es lo que los
//     conteos del analista llaman «cargas de /lista».
//   - Toque  → Slack «🧭 lista · botón · src=<src>» + GA4 lista_boton { src }. Sale con sendBeacon (o fetch keepalive)
//     en el mismo toque y sin preventDefault: la navegación no espera a nada.
//   - Pruebas: ?src=qa…, ?qa=1 o navigator.webdriver no avisan ni cuentan (ni Slack ni GA4).
//   - En el navegador interno de Instagram/Facebook se muestra una línea de ayuda para abrir en el navegador.
//
// GA4 va directo a G-8KYM943L8X: el contenedor de GTM (v2) solo reenvía una lista fija de eventos del dataLayer, así que
// no se usa un evento de dataLayer.

const MEDICION_GA4 = 'G-8KYM943L8X';
// Misma clave que usa lib/productos/eventos.ts para el hilo de Slack de la visita.
const CLAVE_HILO = 'vl_hilo';

type VentanaGtag = typeof window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  google_tag_manager?: Record<string, unknown>;
};

function leerSrc(): string {
  try {
    return srcLista(new URLSearchParams(window.location.search).get('src'));
  } catch {
    return 'directo';
  }
}

function esPrueba(): boolean {
  try {
    if ((navigator as Navigator & { webdriver?: boolean }).webdriver) return true;
    const q = new URLSearchParams(window.location.search);
    return /^qa/i.test(q.get('src') ?? '') || q.has('qa');
  } catch {
    return false;
  }
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

/** Aviso a Slack que sobrevive a la navegación: sendBeacon y, si no está, fetch keepalive. No pasa por la cola de eventos. */
function avisarAlSalir(detalle: string) {
  if (!eventosActivos()) return;
  let hilo: string | undefined;
  try {
    hilo = sessionStorage.getItem(CLAVE_HILO) ?? undefined;
  } catch {
    /* sin almacenamiento: va como mensaje propio */
  }
  const cuerpo = JSON.stringify({ tipo: 'paso', sid: sid(), hilo, ruta: location.pathname, ...experimento(), detalle });
  try {
    if (navigator.sendBeacon?.('/api/evento', new Blob([cuerpo], { type: 'text/plain' }))) return;
  } catch {
    /* cae al fetch */
  }
  try {
    void fetch('/api/evento', {
      method: 'POST',
      headers: { 'content-type': 'text/plain' },
      body: cuerpo,
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* se pierde este aviso y listo */
  }
}

// Navegador interno de Instagram o Facebook. En el HTML estático (servidor) es false; en el cliente se lee del UA.
const sinSuscripcion = () => () => {};
function esAppMeta(): boolean {
  try {
    return /Instagram|FBAN|FBAV/.test(navigator.userAgent);
  } catch {
    return false;
  }
}

export default function IrAlGrupo() {
  const enAppMeta = useSyncExternalStore(sinSuscripcion, esAppMeta, () => false);
  const visita = useRef<{ src: string; prueba: boolean }>({ src: 'directo', prueba: true });

  useEffect(() => {
    const src = leerSrc();
    const prueba = esPrueba();
    visita.current = { src, prueba };

    if (prueba) return;

    try {
      registrarEvento('paso', { detalle: `lista · src=${src}` });
    } catch {
      /* sin Slack la página sigue */
    }

    let sondeo: ReturnType<typeof setInterval> | null = null;
    try {
      const w = conGtag();
      const enviar = () => w.gtag!('event', 'lista_click', { src, send_to: MEDICION_GA4 });
      if (w.google_tag_manager?.[MEDICION_GA4]) enviar();
      else
        sondeo = setInterval(() => {
          if (w.google_tag_manager?.[MEDICION_GA4]) {
            if (sondeo) clearInterval(sondeo);
            sondeo = null;
            enviar();
          }
        }, 100);
    } catch {
      /* sin GA4 la página sigue */
    }
    return () => {
      if (sondeo) clearInterval(sondeo);
    };
  }, []);

  // Sin preventDefault: el <a> navega solo; esto solo dispara los avisos en el mismo toque.
  // Antes de hidratar (`prueba: true` de arranque) no se manda nada: no sabemos aún si es una prueba.
  const alTocar = () => {
    const { src, prueba } = visita.current;
    if (prueba) return;
    avisarAlSalir(`lista · botón · src=${src}`);
    try {
      conGtag().gtag!('event', 'lista_boton', { src, send_to: MEDICION_GA4, transport_type: 'beacon' });
    } catch {
      /* sin GA4 igual navega */
    }
  };

  return (
    <>
      <a
        href={TALLER.grupo}
        onClick={alTocar}
        className="mt-4 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#FF3D8B] px-6 text-base font-semibold text-white transition hover:bg-[#ff5c9f]"
      >
        Abrir el grupo <ArrowRight className="h-4 w-4" aria-hidden />
      </a>
      {enAppMeta && (
        <p className="mt-3 text-sm text-slate-200">
          ¿No se abre WhatsApp? Toca los tres puntos de arriba a la derecha y elige abrir en el navegador.
        </p>
      )}
      <p className="mt-2 text-sm text-slate-400">Puedes salirte del grupo cuando quieras.</p>
    </>
  );
}
