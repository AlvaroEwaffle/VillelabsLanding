'use client';

import { useEffect, useState } from 'react';
import { mp4 } from '@/lib/productos/media';

/*
 * VSL de /agentes (7-nov-2026, aprobado por Álvaro por WhatsApp).
 * Prueba A/B por día, misma hora en días distintos: días impares (hora de Santiago) se muestra el video,
 * días pares no. `?vsl=1` fuerza el video (QA). Cada visita empuja `vsl_variante` al dataLayer y el play empuja `vsl_play`,
 * para cruzarlo con booking_click y reserva_confirmada en GA4.
 */
function varianteDeHoy(): 'video' | 'sin_video' {
  const dia = Number(new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Santiago', day: 'numeric' }).format(new Date()));
  if (new URLSearchParams(window.location.search).get('vsl') === '1') return 'video';
  return dia % 2 === 1 ? 'video' : 'sin_video';
}

function push(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event, ...params });
}

export default function VslAgentes() {
  const [variante, setVariante] = useState<'video' | 'sin_video' | null>(null);

  useEffect(() => {
    const v = varianteDeHoy();
    setVariante(v);
    push('vsl_variante', { vsl_variante: v });
  }, []);

  if (variante !== 'video') return null;
  return (
    <div className="mt-8 w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
      <video
        className="block aspect-video w-full"
        src={mp4('vsl-agentes')}
        poster="/videos/vsl-agentes-poster.jpg"
        controls
        playsInline
        preload="none"
        onPlay={() => push('vsl_play', { vsl_variante: 'video' })}
        onEnded={() => push('vsl_completo', { vsl_variante: 'video' })}
      />
    </div>
  );
}
