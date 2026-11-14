import { PlayCircle } from 'lucide-react';
import type { Semaforo } from '@/lib/productos/curso/curso';

type FotoDato = { src: string; alt: string };

export function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#5fb2dd]">{children}</p>;
}

/** Foto de apoyo (lib/productos/fotos.ts). Llena su contenedor (que debe ser relative) con object-cover. */
export function Foto({ foto, posicion = 'center', prioridad = false, className = '' }: { foto: FotoDato; posicion?: string; prioridad?: boolean; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={foto.src}
      alt={foto.alt}
      loading={prioridad ? 'eager' : 'lazy'}
      decoding="async"
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      style={{ objectPosition: posicion }}
    />
  );
}

export function VideoProximamente({ titulo, foto, posicion = 'center 25%' }: { titulo: string; foto?: FotoDato; posicion?: string }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#2175a1]/25 via-slate-900 to-slate-950">
      {foto ? (
        <>
          <div className="absolute inset-0">
            <Foto foto={foto} posicion={posicion} />
          </div>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/55 to-[#0f172a]/10" />
        </>
      ) : null}
      <div className="absolute inset-x-0 bottom-0 flex items-end gap-3 p-4 sm:p-6">
        <PlayCircle className="h-10 w-10 shrink-0 text-[#5fb2dd] sm:h-12 sm:w-12" aria-hidden />
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#5fb2dd] sm:text-[11px]">Video próximamente</p>
          <p className="font-serif text-base leading-snug text-white sm:text-xl">{titulo}</p>
        </div>
      </div>
    </div>
  );
}

export const COLOR_SEMAFORO: Record<Semaforo, string> = {
  rojo: 'bg-rose-500',
  amarillo: 'bg-orange-400', // naranja, no amarillo (guía de marca; igual que el esqueleto)
  verde: 'bg-emerald-500',
};

export function PuntoSemaforo({ semaforo, className = '' }: { semaforo: Semaforo; className?: string }) {
  return <span aria-hidden className={`semaforo-punto inline-block h-3 w-3 shrink-0 rounded-full ${COLOR_SEMAFORO[semaforo]} ${className}`} />;
}

// DiagramaCiclo y TableroMock se movieron a ./animados.tsx (13-nov-2026: animados, componentes de cliente).
