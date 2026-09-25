'use client';

import { useMemo } from 'react';
import { COLOR_RAG } from '@/lib/programa/derivar';
import { MESES, SPRINTS, filas, pos } from '@/lib/programa/gantt';
import type { Overlay } from '@/lib/programa/tipos';

const HOY = pos(Date.now());

export function Gantt({ overlay }: { overlay: Overlay }) {
  const fs = useMemo(() => filas(overlay), [overlay]);
  const grupos = useMemo(() => {
    const m = new Map<string, typeof fs>();
    for (const f of fs) m.set(f.grupo, [...(m.get(f.grupo) ?? []), f]);
    return [...m.entries()];
  }, [fs]);

  const sinPlanificar = fs.filter((f) => f.historias > 0 && !f.vivo).length;

  return (
    <section>
      <h2 className="mb-1 font-serif text-2xl text-white">Feature map</h2>
      <p className="mb-3 text-xs leading-relaxed text-white/40">
        Dos barras por fila. La de arriba, punteada, es el plan que se dibujó a mano el 14-sep. La
        de abajo sale de los sprints que hoy tienen asignadas las historias de esa épica, y se
        rellena con lo que ya está hecho. Verlas juntas es el punto: la pregunta no es dónde
        estamos, es cuánto nos corrimos.
      </p>

      <div className="overflow-x-auto">
        <div className="min-w-[680px]">
          {/* ── Cabecera: meses y sprints ─────────────────────────────── */}
          <div className="flex items-stretch border-b border-white/10 pb-1">
            <div className="w-48 shrink-0" />
            <div className="relative h-11 flex-1">
              {MESES.map((m) => (
                <div
                  key={m.nombre}
                  className="absolute top-0 border-l border-white/10 pl-1.5 text-[10px] uppercase tracking-wide text-white/40"
                  style={{ left: `${m.desde}%`, width: `${m.hasta - m.desde}%` }}
                >
                  {m.nombre}
                </div>
              ))}
              {SPRINTS.map((s) => (
                <div
                  key={s.nombre}
                  className="absolute bottom-0 truncate rounded-sm bg-white/[0.07] px-1 text-[9px] text-white/35"
                  style={{ left: `${s.desde}%`, width: `${s.hasta - s.desde}%` }}
                  title={s.nombre}
                >
                  {s.nombre.replace('Sprint ', 'S')}
                </div>
              ))}
              <div
                className="absolute top-0 bottom-0 w-px"
                style={{ left: `${HOY}%`, background: '#2175a1' }}
              >
                <span className="absolute -top-0.5 left-1 whitespace-nowrap text-[10px] text-[#7ec1e8]">
                  hoy
                </span>
              </div>
            </div>
          </div>

          {/* ── Filas ─────────────────────────────────────────────────── */}
          {grupos.map(([grupo, filasDelGrupo]) => (
            <div key={grupo}>
              <div className="border-b border-white/5 bg-white/[0.02] px-2 py-1.5 text-[10px] uppercase tracking-wide text-[#7ec1e8]">
                {grupo}
              </div>
              {filasDelGrupo.map((f) => {
                const c = COLOR_RAG[f.estado];
                return (
                  <div key={f.codigo} className="flex items-center border-b border-white/5">
                    <div className="w-48 shrink-0 py-2 pr-2">
                      <div className="flex flex-wrap items-baseline gap-x-1.5">
                        <span className="font-mono text-[10px] text-white/30">{f.codigo}</span>
                        <span className="text-xs text-white/85">{f.nombre}</span>
                        {f.nuevo && (
                          <span className="rounded bg-[#2175a1]/25 px-1 text-[9px] text-[#7ec1e8]">
                            nuevo
                          </span>
                        )}
                        {f.tag && (
                          <span className="rounded bg-white/10 px-1 text-[9px] text-white/50">
                            {f.tag}
                          </span>
                        )}
                      </div>
                      {f.historias > 0 && (
                        <div className="text-[10px] text-white/30">
                          {f.historias} historia{f.historias === 1 ? '' : 's'}
                          {f.conSprint === 0 && ' · sin sprint'}
                        </div>
                      )}
                    </div>

                    <div className="relative h-11 flex-1">
                      {MESES.map((m) => (
                        <div
                          key={m.nombre}
                          className="absolute top-0 bottom-0 border-l border-white/[0.06]"
                          style={{ left: `${m.desde}%` }}
                        />
                      ))}
                      <div
                        className="absolute top-0 bottom-0 w-px bg-[#2175a1]/50"
                        style={{ left: `${HOY}%` }}
                      />

                      {/* Plan del 14-sep */}
                      <div
                        className="absolute top-1.5 h-2.5 rounded border border-dashed"
                        style={{
                          left: `${pos(f.plan.desde)}%`,
                          width: `${Math.max(1, pos(f.plan.hasta) - pos(f.plan.desde))}%`,
                          borderColor: 'rgba(255,255,255,.28)',
                        }}
                        title="Plan del 14-sep"
                      />

                      {/* Lo que dicen hoy los sprints */}
                      {f.vivo ? (
                        <div
                          className="absolute top-5 h-3.5 overflow-hidden rounded"
                          style={{
                            left: `${pos(f.vivo.desde)}%`,
                            width: `${Math.max(1.5, pos(f.vivo.hasta) - pos(f.vivo.desde))}%`,
                            background: `${c}33`,
                            border: `1px solid ${c}`,
                          }}
                          title={`${f.sprints.join(' · ')} — ${f.vivo.pct}% hecho`}
                        >
                          <div className="h-full" style={{ width: `${f.vivo.pct}%`, background: c }} />
                        </div>
                      ) : (
                        <span
                          className="absolute top-5 text-[10px] text-white/25"
                          style={{ left: `${pos(f.plan.desde)}%` }}
                        >
                          {f.historias === 0 ? 'sin historias' : 'sin programar'}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/45">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-5 rounded border border-dashed border-white/30" />
          plan del 14-sep
        </span>
        {(['v', 'a', 'r'] as const).map((k) => (
          <span key={k} className="flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-5 rounded"
              style={{ background: `${COLOR_RAG[k]}33`, border: `1px solid ${COLOR_RAG[k]}` }}
            />
            {k === 'v' ? 'completa' : k === 'a' ? 'en curso' : 'atrasada'}
          </span>
        ))}
      </div>

      {sinPlanificar > 0 && (
        <p className="mt-2 rounded-xl border border-dashed border-white/15 px-3 py-2.5 text-xs leading-relaxed text-white/45">
          <strong className="font-medium text-white/70">
            {sinPlanificar} épicas tienen historias pero ninguna con sprint asignado.
          </strong>{' '}
          Por eso no tienen barra viva: no es que estén atrasadas, es que nadie las programó
          todavía. Asignarles un sprint en el board les dibuja la barra sola.
        </p>
      )}
    </section>
  );
}
