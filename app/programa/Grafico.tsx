'use client';

import type { Punto } from '@/lib/programa/derivar';

const W = 520;
const H = 190;
const M = { arriba: 14, derecha: 12, abajo: 26, izq: 30 };

interface Linea {
  clave: keyof Punto;
  color: string;
  etiqueta: string;
  guion?: boolean;
  relleno?: boolean;
}

function escalas(puntos: Punto[], lineas: Linea[]) {
  const maximo = Math.max(
    1,
    ...puntos.flatMap((p) => lineas.map((l) => Number(p[l.clave]) || 0)),
  );
  const techo = Math.ceil(maximo / 5) * 5 || 5;
  const x = (i: number) =>
    M.izq + (i * (W - M.izq - M.derecha)) / Math.max(1, puntos.length - 1);
  const y = (v: number) => M.arriba + (1 - v / techo) * (H - M.arriba - M.abajo);
  return { x, y, techo };
}

/**
 * Burndown y burnup dibujados a mano en SVG.
 *
 * Sin librería a propósito: son dos polilíneas sobre una grilla, y una
 * dependencia de gráficos costaría más peso que todo el resto de la página.
 */
export function Grafico({
  titulo,
  pie,
  puntos,
  lineas,
  hoy,
}: {
  titulo: string;
  pie: string;
  puntos: Punto[];
  lineas: Linea[];
  hoy?: number;
}) {
  if (puntos.length === 0) return null;
  const { x, y, techo } = escalas(puntos, lineas);
  const marcas = [0, techo / 2, techo];

  return (
    <figure className="m-0 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <figcaption className="mb-2 font-serif text-base text-white">{titulo}</figcaption>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`${titulo}. ${pie}`}
        className="h-auto w-full"
      >
        {marcas.map((m) => (
          <g key={m}>
            <line
              x1={M.izq}
              x2={W - M.derecha}
              y1={y(m)}
              y2={y(m)}
              stroke="currentColor"
              strokeOpacity={0.12}
            />
            <text x={M.izq - 6} y={y(m) + 4} textAnchor="end" fontSize="10" fill="currentColor" fillOpacity={0.5}>
              {Math.round(m)}
            </text>
          </g>
        ))}

        {hoy !== undefined && hoy >= 0 && hoy < puntos.length && (
          <line
            x1={x(hoy)}
            x2={x(hoy)}
            y1={M.arriba}
            y2={H - M.abajo}
            stroke="#2175a1"
            strokeWidth={1}
            strokeDasharray="3 3"
          />
        )}

        {lineas.map((l) => {
          const d = puntos.map((p, i) => `${x(i)},${y(Number(p[l.clave]) || 0)}`).join(' ');
          return (
            <g key={String(l.clave)}>
              {l.relleno && (
                <polygon
                  points={`${M.izq},${y(0)} ${d} ${x(puntos.length - 1)},${y(0)}`}
                  fill={l.color}
                  fillOpacity={0.12}
                />
              )}
              <polyline
                points={d}
                fill="none"
                stroke={l.color}
                strokeWidth={l.guion ? 1.5 : 2.5}
                strokeDasharray={l.guion ? '5 4' : undefined}
                strokeLinejoin="round"
              />
            </g>
          );
        })}

        <text x={M.izq} y={H - 8} fontSize="10" fill="currentColor" fillOpacity={0.5}>
          {puntos[0].fecha.slice(5)}
        </text>
        <text
          x={W - M.derecha}
          y={H - 8}
          textAnchor="end"
          fontSize="10"
          fill="currentColor"
          fillOpacity={0.5}
        >
          {puntos[puntos.length - 1].fecha.slice(5)}
        </text>
      </svg>

      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
        {lineas.map((l) => (
          <span key={String(l.clave)} className="flex items-center gap-1.5 text-xs text-white/60">
            <span
              className="inline-block h-0.5 w-4"
              style={{ background: l.color, opacity: l.guion ? 0.6 : 1 }}
            />
            {l.etiqueta}
          </span>
        ))}
      </div>
      <p className="mt-2 text-xs leading-relaxed text-white/45">{pie}</p>
    </figure>
  );
}
