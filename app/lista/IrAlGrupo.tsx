'use client';

import { useEffect } from 'react';
import { registrarEvento } from '@/lib/productos/eventos';
import { TALLER, srcLista } from '@/lib/productos/taller';

// Mide el clic a la lista y redirige al grupo del taller (ver app/lista/page.tsx).
//   - Slack: «🧭 lista · src=<src>» (tipo «paso» de /api/evento). Si la visita venía navegando el sitio cae en su hilo; si
//     llega de afuera (IG, correo) queda como mensaje propio. real.mjs los cuenta por src. No se manda «Nueva visita»:
//     /lista no es una visita de M1 (Rastreo la ignora).
//   - GA4: gtag('event', 'lista_click', { src }) directo a G-8KYM943L8X, apenas carga la etiqueta de Google de GTM. El
//     contenedor (v2) solo reenvía una lista fija de eventos del dataLayer, así que no se usa un evento de dataLayer.
// Nada de esto frena la redirección: a los 2 s se va igual (y antes, si GA4 confirma).

const MEDICION_GA4 = 'G-8KYM943L8X';
const ESPERA_MAX_MS = 2000;

type VentanaGtag = typeof window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  google_tag_manager?: Record<string, unknown>;
};

export default function IrAlGrupo() {
  useEffect(() => {
    let listo = false;
    const ir = () => {
      if (listo) return;
      listo = true;
      try {
        window.location.replace(TALLER.grupo);
      } catch {
        window.location.href = TALLER.grupo;
      }
    };

    let src = 'directo';
    try {
      src = srcLista(new URLSearchParams(window.location.search).get('src'));
    } catch {
      /* sigue como directo */
    }

    try {
      registrarEvento('paso', { detalle: `lista · src=${src}` });
    } catch {
      /* sin Slack igual redirige */
    }

    const w = window as VentanaGtag;
    let sondeo: ReturnType<typeof setInterval> | null = null;
    try {
      w.dataLayer = w.dataLayer ?? [];
      w.gtag =
        w.gtag ??
        function gtag() {
          // eslint-disable-next-line prefer-rest-params
          w.dataLayer!.push(arguments);
        };
      // Espera a que la etiqueta de Google (cargada por GTM, solo en villelab.com) registre la medición, y recién ahí manda
      // el evento con callback: así el hit sale antes de dejar la página.
      const enviar = () => {
        w.gtag!('event', 'lista_click', { src, send_to: MEDICION_GA4, event_callback: ir, event_timeout: 1500 });
      };
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
      /* sin GA4 igual redirige */
    }

    const tope = setTimeout(ir, ESPERA_MAX_MS);
    return () => {
      clearTimeout(tope);
      if (sondeo) clearInterval(sondeo);
    };
  }, []);

  return null;
}
