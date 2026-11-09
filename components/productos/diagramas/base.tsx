'use client';

/*
 * Piezas base de los diagramas de los productos digitales (regla de marca del 8-nov-2026: los diagramas se duplican).
 * - HTML + Tailwind para que el texto refluya a 360 px; SVG solo para conectores y figuras simples.
 * - Cada diagrama es un <figure role="img"> con aria-label que dice lo mismo que el dibujo.
 * - Entran con framer-motion al aparecer en pantalla, una vez; con prefers-reduced-motion se muestran quietos.
 * - Paleta: #0f172a, #131c31, #24314d, #2175a1, #5fb2dd. Nada de amarillo; rojo/verde solo semántico.
 */

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

export const PIEZA: Variants = {
  oculto: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

const CONTENEDOR: Variants = {
  oculto: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

/** Marco de un diagrama: figura accesible, etiqueta arriba y entrada escalonada de sus piezas. */
export function Diagrama({
  titulo,
  aria,
  etiqueta = 'Diagrama',
  children,
  className = '',
  pie,
}: {
  titulo: string;
  aria: string;
  etiqueta?: string;
  children: ReactNode;
  className?: string;
  pie?: ReactNode;
}) {
  const quieto = useReducedMotion();
  return (
    <motion.figure
      role="img"
      aria-label={aria}
      initial={quieto ? 'visible' : 'oculto'}
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={CONTENEDOR}
      className={`rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-4 sm:p-6 ${className}`}
    >
      <div aria-hidden="true">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[#5fb2dd]">
          {etiqueta} · <span className="text-slate-400">{titulo}</span>
        </p>
        {children}
        {pie ? <p className="mt-4 text-sm text-slate-300">{pie}</p> : null}
      </div>
    </motion.figure>
  );
}

export type Tono = 'acento' | 'claro' | 'neutro' | 'alerta' | 'ok';

const TONOS: Record<Tono, string> = {
  acento: 'border-[#5fb2dd]/60 bg-[#2175a1]/25 text-white',
  claro: 'border-[#5fb2dd] bg-[#5fb2dd] text-[#0f172a]',
  neutro: 'border-white/10 bg-white/[0.04] text-white',
  alerta: 'border-rose-400/40 bg-rose-500/[0.08] text-white',
  ok: 'border-emerald-400/40 bg-emerald-500/[0.08] text-white',
};

/** Caja de un diagrama. */
export function Nodo({
  titulo,
  texto,
  tono = 'neutro',
  className = '',
  numero,
}: {
  titulo: ReactNode;
  texto?: ReactNode;
  tono?: Tono;
  className?: string;
  numero?: ReactNode;
}) {
  return (
    <motion.div variants={PIEZA} className={`rounded-xl border p-3 ${TONOS[tono]} ${className}`}>
      {numero !== undefined ? (
        <span className={`font-mono text-[11px] ${tono === 'claro' ? 'text-[#0f172a]/70' : 'text-[#5fb2dd]'}`}>{numero}</span>
      ) : null}
      <p className={`text-sm font-semibold leading-snug ${tono === 'claro' ? 'text-[#0f172a]' : 'text-white'}`}>{titulo}</p>
      {texto ? <p className={`mt-1 text-[13px] leading-snug ${tono === 'claro' ? 'text-[#0f172a]/80' : 'text-slate-300'}`}>{texto}</p> : null}
    </motion.div>
  );
}

/** Flecha: hacia abajo en celular, hacia la derecha desde `sm` (o siempre hacia abajo con `vertical`). */
export function Flecha({ vertical = false, etiqueta, className = '' }: { vertical?: boolean; etiqueta?: string; className?: string }) {
  return (
    <motion.div variants={PIEZA} className={`flex shrink-0 items-center justify-center gap-1 text-[#5fb2dd] ${className}`}>
      <svg viewBox="0 0 24 24" className={`h-5 w-5 ${vertical ? 'rotate-90' : 'rotate-90 sm:rotate-0'}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12h15M13 6l6 6-6 6" />
      </svg>
      {etiqueta ? <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">{etiqueta}</span> : null}
    </motion.div>
  );
}

/** Flujo lineal: columna en celular, fila desde `sm`. */
export function Flujo({ pasos }: { pasos: { titulo: ReactNode; texto?: ReactNode; tono?: Tono }[] }) {
  return (
    <div className="flex flex-col items-stretch gap-1.5 sm:flex-row sm:items-center">
      {pasos.map((p, i) => (
        <div key={i} className="contents">
          <Nodo titulo={p.titulo} texto={p.texto} tono={p.tono} className="sm:flex-1" />
          {i < pasos.length - 1 ? <Flecha /> : null}
        </div>
      ))}
    </div>
  );
}

/** Dos columnas «antes / después» (o «sin / con»). Apiladas en celular. */
export function Comparacion({
  izq,
  der,
}: {
  izq: { titulo: string; children: ReactNode; tono?: 'alerta' | 'neutro' };
  der: { titulo: string; children: ReactNode };
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <motion.div variants={PIEZA} className={`rounded-xl border p-4 ${izq.tono === 'neutro' ? 'border-white/10 bg-white/[0.03]' : 'border-rose-400/35 bg-rose-500/[0.06]'}`}>
        <p className={`font-mono text-[11px] uppercase tracking-wider ${izq.tono === 'neutro' ? 'text-slate-400' : 'text-rose-300'}`}>{izq.titulo}</p>
        <div className="mt-3">{izq.children}</div>
      </motion.div>
      <motion.div variants={PIEZA} className="rounded-xl border border-[#5fb2dd]/50 bg-[#2175a1]/15 p-4">
        <p className="font-mono text-[11px] uppercase tracking-wider text-[#5fb2dd]">{der.titulo}</p>
        <div className="mt-3">{der.children}</div>
      </motion.div>
    </div>
  );
}

/** Burbuja de chat para los diagramas. */
export function Globo({ de, children }: { de: 'cliente' | 'agente' | 'persona'; children: ReactNode }) {
  const cliente = de === 'cliente';
  return (
    <motion.div variants={PIEZA} className={`flex ${cliente ? 'justify-end' : 'justify-start'}`}>
      <p
        className={`max-w-[88%] rounded-2xl px-3 py-2 text-[13px] leading-snug ${
          cliente ? 'rounded-br-sm bg-[#1f4d6b] text-white' : de === 'persona' ? 'rounded-bl-sm bg-[#5fb2dd] text-[#0f172a]' : 'rounded-bl-sm bg-[#24314d] text-slate-100'
        }`}
      >
        {children}
      </p>
    </motion.div>
  );
}

/** Ciclo en SVG: n nodos en círculo con flechas entre ellos y un centro. Etiquetas cortas (≤ 2 líneas de ~12 letras). */
export function Ciclo({ nodos, centro, className = '' }: { nodos: string[][]; centro: string[]; className?: string }) {
  const cx = 160;
  const cy = 150;
  const r = 104;
  const n = nodos.length;
  const paso = 360 / n;
  const pt = (gr: number, rr = r) => ({ x: cx + rr * Math.cos((gr * Math.PI) / 180), y: cy + rr * Math.sin((gr * Math.PI) / 180) });
  return (
    <motion.svg variants={PIEZA} viewBox="0 0 320 300" className={`mx-auto h-auto w-full max-w-[360px] ${className}`}>
      <defs>
        <marker id="ciclo-punta" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#5fb2dd" />
        </marker>
      </defs>
      {nodos.map((_, i) => {
        const a = pt(-90 + i * paso + paso * 0.3);
        const b = pt(-90 + (i + 1) * paso - paso * 0.3);
        return <path key={i} d={`M ${a.x} ${a.y} A ${r} ${r} 0 0 1 ${b.x} ${b.y}`} fill="none" stroke="#5fb2dd" strokeOpacity="0.6" strokeWidth="2" markerEnd="url(#ciclo-punta)" />;
      })}
      <circle cx={cx} cy={cy} r="46" fill="#2175a1" fillOpacity="0.2" stroke="#5fb2dd" strokeDasharray="4 4" />
      {centro.map((l, i) => (
        <text key={l} x={cx} y={cy + (i - (centro.length - 1) / 2) * 16 + 5} textAnchor="middle" fill="#f1f5f9" fontSize="14">
          {l}
        </text>
      ))}
      {nodos.map((lineas, i) => {
        const p = pt(-90 + i * paso);
        return (
          <g key={lineas.join(' ')}>
            <circle cx={p.x} cy={p.y} r="43" fill="#131c31" stroke="#24314d" strokeWidth="2" />
            <text x={p.x} y={p.y - 27} textAnchor="middle" fill="#5fb2dd" fontSize="11" fontFamily="ui-monospace, monospace">
              {i + 1}
            </text>
            {lineas.map((l, j) => (
              <text key={l} x={p.x} y={p.y + (j - (lineas.length - 1) / 2) * 15 + 6} textAnchor="middle" fill="#f1f5f9" fontSize="13">
                {l}
              </text>
            ))}
          </g>
        );
      })}
    </motion.svg>
  );
}
