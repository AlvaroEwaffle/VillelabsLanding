'use client';

// Video de producto (8-nov-2026): mp4 + póster (cuadro del propio video, nunca una foto de la cara) + subtítulos VTT.
// Los archivos viven en public/videos/<id>.{mp4,jpg,vtt}. Los 16:9 traen la pista activa por defecto;
// los verticales (reels) ya traen los subtítulos quemados, así que la pista queda disponible pero apagada.
// La primera reproducción de cada video se avisa al Slack de Villelabs (lib/productos/eventos.ts).

import { registrarEvento } from '@/lib/productos/eventos';

export type VideoId =
  | 'v01-reel-esqueleto'
  | 'v02-esqueleto-bienvenida'
  | 'v03-guia-parte0'
  | 'v04-guia-primer-mensaje'
  | 'v05-guia-cierre'
  | 'v06-reel-workshop'
  | 'v07-workshop-grabacion-intro'
  | 'v08-curso-venta'
  | 'v09-m0-l1'
  | 'v10-m0-l2'
  | 'v11-m0-l3'
  | 'v12-m0-l4'
  | 'v13-m0-cierre'
  | 'v14-anuncio-esqueleto'
  | 'v15-anuncio-guia'
  | 'v16-anuncio-workshop'
  | 'v17-anuncio-curso';

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
  return (
    <video
      controls
      playsInline
      preload="metadata"
      poster={`/videos/${id}.jpg`}
      aria-label={titulo}
      onPlay={(e) => {
        const v = e.currentTarget;
        if (v.dataset.avisado) return;
        v.dataset.avisado = '1';
        registrarEvento('video', { detalle: titulo });
      }}
      className={`block w-full bg-[#0f172a] ${vertical ? 'aspect-[9/16]' : 'aspect-video'} ${className}`}
    >
      <source src={`/videos/${id}.mp4`} type="video/mp4" />
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
