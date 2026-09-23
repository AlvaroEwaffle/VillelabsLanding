'use client';

import snapshot from '@/lib/programa/data/prtech.json';
import { ARTEFACTOS, FRESCURA } from '@/lib/programa/artefactos';
import { CONFIGS } from '@/lib/programa/config';
import { useOverlay } from '@/lib/programa/useOverlay';
import { COLOR_RAG, leer, sprintVigente } from '@/lib/programa/derivar';
import { producto } from '@/lib/programa/metricas';
import type { Snapshot } from '@/lib/programa/tipos';
import { Marco } from './Marco';

const SNAP = snapshot as unknown as Snapshot;
const SLUG = 'prtech';

export default function Repositorio({ llave }: { llave: string }) {
  const cfg = CONFIGS[SLUG];
  const { overlay } = useOverlay(SLUG);
  const lectura = leer(SNAP, overlay, cfg);
  const sprint = sprintVigente(cfg);
  const prod = producto();
  const c = COLOR_RAG[lectura.estado];
  const base = `/programa/${llave}`;

  return (
    <Marco llave={llave} activo={null}>
      {/* El titular: el estado del programa, antes que el índice. Quien entra
          quiere saber si hay que preocuparse, no qué documentos existen. */}
      <section
        className="mb-4 rounded-2xl border p-5"
        style={{ borderColor: `${c}55`, background: `${c}14` }}
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="inline-block h-3 w-3 rounded-full" style={{ background: c }} />
          <h1 className="font-serif text-2xl sm:text-3xl" style={{ color: c }}>
            {lectura.titulo}
          </h1>
          <a href={`${base}/scrum`} className="text-sm text-white/50 underline-offset-2 hover:underline">
            {cfg.fase_foco} · {lectura.hechas} de {lectura.total} · {lectura.pct}% →
          </a>
        </div>
        <p className="mt-1.5 text-sm text-white/60">
          <strong className="font-medium text-white/80">{sprint.nombre}</strong> · {sprint.meta}
        </p>
        {overlay.nota_general && (
          <p className="mt-2 whitespace-pre-wrap border-l-2 border-white/20 pl-3 text-sm leading-relaxed text-white/75">
            {overlay.nota_general}
          </p>
        )}
      </section>

      {prod.saturacion && prod.saturacion.diasDesdeHoy < 30 && (
        <a
          href={`${base}/scrum`}
          className="mb-6 block rounded-xl border px-4 py-3 text-sm transition-colors hover:brightness-110"
          style={{ borderColor: `${COLOR_RAG.r}55`, background: `${COLOR_RAG.r}14` }}
        >
          <strong style={{ color: COLOR_RAG.r }}>
            El corpus llena el plan en {prod.saturacion.diasDesdeHoy} días
          </strong>
          <span className="text-white/60">
            {' '}· {prod.saturacion.mbPorDia.toFixed(1)} MB/día sobre un M0. Ver los números →
          </span>
        </a>
      )}

      <h2 className="mb-1 font-serif text-2xl text-white">Los artefactos</h2>
      <p className="mb-3 text-xs leading-relaxed text-white/40">
        Cuatro documentos que se leen en momentos distintos. La etiqueta dice de dónde sale cada
        uno — no es decoración: cambia cuánto hay que desconfiar de lo que se lee.
      </p>

      <div className="grid gap-2 sm:grid-cols-2">
        {ARTEFACTOS.map((a) => (
          <a
            key={a.slug}
            href={`${base}/${a.slug}`}
            className="group rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-[#2175a1]/60 hover:bg-white/[0.06]"
          >
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-serif text-lg text-white group-hover:text-[#7ec1e8]">
                {a.titulo}
              </h3>
              <span
                className="shrink-0 cursor-help rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-white/35"
                title={FRESCURA[a.frescura].detalle}
              >
                {FRESCURA[a.frescura].etiqueta}
              </span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-white/60">{a.bajada}</p>
            <p className="mt-2 text-xs italic leading-relaxed text-white/35">«{a.pregunta}»</p>
            <p className="mt-1.5 text-[11px] text-white/25">{a.fuente}</p>
          </a>
        ))}
      </div>
    </Marco>
  );
}
