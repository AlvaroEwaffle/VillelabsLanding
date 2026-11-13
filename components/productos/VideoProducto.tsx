'use client';

// Video de producto (8-nov-2026): mp4 + póster (cuadro del propio video, nunca una foto de la cara) + subtítulos VTT.
// .jpg y .vtt en public/videos/<id>; el .mp4 en GCS (lib/productos/media.ts). Los 16:9 traen la pista activa por defecto;
// los verticales (reels) ya traen los subtítulos quemados, así que la pista queda disponible pero apagada.
// La primera reproducción de cada video se avisa al Slack de Villelabs (lib/productos/eventos.ts), y desde el 12-nov-2026
// también cuánto se vio: 25, 50 y 100 %, una vez por video y por visita (sessionStorage).

import { registrarEvento } from '@/lib/productos/eventos';
import { mp4 } from '@/lib/productos/media';

export type VideoId =
  | 'v01-reel-esqueleto'
  | 'v02-esqueleto-bienvenida'
  | 'v03-guia-parte0'
  | 'v04-guia-primer-mensaje'
  | 'v05-guia-cierre'
  | 'v06-reel-workshop'
  | 'v07-workshop-grabacion-intro'
  | 'v08-curso-venta'
  // 12-nov-2026: v08 cortado en 40 s (sin «Está en preventa a precio fundador» ni la tarjeta «CURSO EN PREVENTA»)
  | 'v08b-curso-venta'
  | 'v09-m0-l1'
  | 'v10-m0-l2'
  | 'v11-m0-l3'
  | 'v12-m0-l4'
  | 'v13-m0-cierre'
  | 'v14-anuncio-esqueleto'
  | 'v15-anuncio-guia'
  | 'v16-anuncio-workshop'
  | 'v17-anuncio-curso'
  // Lecciones de los módulos 1 a 6 del curso v1.1 (lote 2, 8-nov-2026)
  | 'm1-l1'
  | 'm1-l2'
  | 'm1-l3'
  | 'm1-l4'
  | 'm1-l5'
  | 'm2-l1'
  | 'm2-l2'
  | 'm2-l3'
  | 'm2-l4'
  | 'm2-l5'
  | 'm3-l1'
  | 'm3-l2'
  | 'm3-l3'
  | 'm3-l4'
  | 'm3-l5'
  | 'm4-l1'
  | 'm4-l2'
  | 'm4-l3'
  | 'm4-l4'
  | 'm4-l5'
  | 'm5-l1'
  | 'm5-l2'
  | 'm5-l3'
  | 'm5-l4'
  | 'm6-l1'
  | 'm6-l2'
  | 'm6-l3'
  | 'm6-l4'
  | 'm6-l5'
  | 'm6-final'
  // Módulo 7 «Tu primer agente, trabajando con tu planilla» (lote 3, 13-nov-2026)
  | 'm7-l1'
  | 'm7-l2'
  | 'm7-l3'
  | 'm7-l4'
  | 'm7-l5';

const HITOS_VIDEO = [25, 50, 100] as const;

/** «vio el 50 % del video …»: una vez por video, hito y visita. Nunca rompe la página. */
function avisarHitos(v: HTMLVideoElement, id: string, titulo: string) {
  const d = v.duration;
  if (!Number.isFinite(d) || d <= 0) return;
  // El 100 % se marca al terminar o a medio segundo del final (algunos navegadores no llegan exacto).
  const pct = v.ended || v.currentTime >= d - 0.5 ? 100 : (v.currentTime / d) * 100;
  for (const h of HITOS_VIDEO) {
    if (pct < h) continue;
    const clave = `vl_video_${id}_${h}`;
    try {
      if (sessionStorage.getItem(clave)) continue;
      sessionStorage.setItem(clave, '1');
    } catch {
      if (v.dataset[`h${h}`]) continue;
      v.dataset[`h${h}`] = '1';
    }
    registrarEvento('video', { detalle: titulo, pct: h });
  }
}

export default function VideoProducto({
  id,
  titulo,
  vertical = false,
  className = '',
}: {
  id: VideoId;
  titulo: string;
  vertical?: boolean;
  className?: string;
}) {
  // 13-nov-2026 (velocidad en celular): el mp4 no se baja hasta que la persona toca play. Con preload="metadata" el navegador
  // bajaba 160 KB del mp4 en paralelo con el primer pantallazo y, ya cargada la página, seguía hasta 2–4 MB (medido con
  // Lighthouse, throttling aplicado): datos móviles gastados en un video que la mayoría no reproduce. El póster se ve igual.
  return (
    <video
      controls
      playsInline
      preload="none"
      // Póster en WebP (1280 px, ~4× más liviano que el .jpg de 1920 px; el .jpg queda para OG y JSON-LD).
      poster={`/videos/${id}.webp`}
      aria-label={titulo}
      onPlay={(e) => {
        const v = e.currentTarget;
        if (v.dataset.avisado) return;
        v.dataset.avisado = '1';
        registrarEvento('video', { detalle: titulo });
      }}
      onTimeUpdate={(e) => avisarHitos(e.currentTarget, id, titulo)}
      onEnded={(e) => avisarHitos(e.currentTarget, id, titulo)}
      className={`block w-full bg-[#0f172a] ${vertical ? 'aspect-[9/16]' : 'aspect-video'} ${className}`}
    >
      <source src={mp4(id)} type="video/mp4" />
      <track kind="captions" src={`/videos/${id}.vtt`} srcLang="es" label="Español" default={!vertical} />
      Tu navegador no puede reproducir este video.
    </video>
  );
}

/** Video 16:9 con el marco de las páginas de producto y, opcionalmente, el guion desplegable. */
export function VideoMarco({ id, titulo, duracion, className = '' }: { id: VideoId; titulo: string; duracion?: string; className?: string }) {
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
        <VideoProducto id={id} titulo={titulo} />
      </div>
      <figcaption className="mt-2 flex flex-wrap items-baseline justify-between gap-x-3 text-sm text-slate-400">
        <span className="font-medium text-slate-200">{titulo}</span>
        {duracion ? <span>{duracion}</span> : null}
      </figcaption>
    </figure>
  );
}
