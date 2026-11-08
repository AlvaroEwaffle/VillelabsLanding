import { ArrowRight, PlayCircle } from 'lucide-react';
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

/** Diagrama propio: las 5 áreas en ciclo, con el esqueleto y las reglas al centro. */
export function DiagramaCiclo({ areas }: { areas: { nombre: string; modulo: number }[] }) {
  const cx = 180;
  const cy = 180;
  const r = 128;
  const puntos = areas.map((a, i) => {
    const ang = ((-90 + i * 72) * Math.PI) / 180;
    return { ...a, x: cx + r * Math.cos(ang), y: cy + r * Math.sin(ang) };
  });
  const arco = (i: number) => {
    const a = ((-90 + i * 72 + 17) * Math.PI) / 180;
    const b = ((-90 + (i + 1) * 72 - 17) * Math.PI) / 180;
    return `M ${cx + r * Math.cos(a)} ${cy + r * Math.sin(a)} A ${r} ${r} 0 0 1 ${cx + r * Math.cos(b)} ${cy + r * Math.sin(b)}`;
  };
  return (
    <svg viewBox="0 0 360 360" role="img" aria-label="Las 5 áreas en ciclo: marketing, ventas, operación, atención al cliente y finanzas, con el esqueleto y las reglas de freno al centro" className="h-auto w-full">
      <defs>
        <marker id="curso-flecha" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#5fb2dd" />
        </marker>
      </defs>
      {puntos.map((_, i) => (
        <path key={`a${i}`} d={arco(i)} fill="none" stroke="#5fb2dd" strokeOpacity="0.55" strokeWidth="2" markerEnd="url(#curso-flecha)" />
      ))}
      <circle cx={cx} cy={cy} r="58" fill="#2175a1" fillOpacity="0.18" stroke="#5fb2dd" strokeDasharray="4 4" />
      <text x={cx} y={cy - 6} textAnchor="middle" fill="#f1f5f9" fontSize="13">Esqueleto</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fill="#cbd5e1" fontSize="11">+ reglas de freno</text>
      {puntos.map((p) => (
        <g key={p.nombre}>
          <circle cx={p.x} cy={p.y} r="34" fill="#131c31" stroke="#24314d" strokeWidth="2" />
          <text x={p.x} y={p.y - 4} textAnchor="middle" fill="#5fb2dd" fontSize="10" fontFamily="ui-monospace, monospace">
            M{p.modulo}
          </text>
          <text x={p.x} y={p.y + 11} textAnchor="middle" fill="#f1f5f9" fontSize="11">
            {p.nombre.replace(' al cliente', '')}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Ilustración propia del proyecto final: el tablero con el semáforo antes y después. */
export function TableroMock() {
  const filas: { area: string; antes: Semaforo; despues: Semaforo; rutina: string }[] = [
    { area: 'Marketing', antes: 'amarillo', despues: 'verde', rutina: '5 piezas · lunes' },
    { area: 'Ventas', antes: 'rojo', despues: 'verde', rutina: '20 min · diario' },
    { area: 'Operación', antes: 'amarillo', despues: 'verde', rutina: 'Resumen · 9:00' },
    { area: 'Atención', antes: 'rojo', despues: 'amarillo', rutina: 'Derivar < 2 h' },
    { area: 'Finanzas', antes: 'rojo', despues: 'verde', rutina: '5 números · lunes' },
  ];
  return (
    <div aria-hidden className="rounded-2xl border border-[#24314d] bg-[#131c31] p-4 shadow-premium sm:p-5">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <p className="font-serif text-lg text-white">El tablero de tu negocio</p>
        <p className="font-mono text-[10px] uppercase tracking-wider text-[#5fb2dd]">Semana 6</p>
      </div>
      <ul className="mt-3 space-y-2.5">
        {filas.map((f) => (
          <li key={f.area} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 text-sm">
            <span className="text-slate-200">{f.area}</span>
            <span className="flex items-center gap-1.5">
              <PuntoSemaforo semaforo={f.antes} />
              <ArrowRight className="h-3 w-3 text-slate-500" />
              <PuntoSemaforo semaforo={f.despues} />
            </span>
            <span className="hidden w-32 text-right font-mono text-[11px] text-slate-400 sm:block">{f.rutina}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 border-t border-white/10 pt-3 text-xs text-slate-400">Revisión de los viernes · 15 min</p>
    </div>
  );
}
