'use client';

import { useMemo } from 'react';
import snapshot from '@/lib/programa/data/prtech.json';
import { CONFIGS } from '@/lib/programa/config';
import { useOverlay } from '@/lib/programa/useOverlay';
import { COLOR_RAG, epicaDe, estadoEfectivo, hecha, nombreDe, rag } from '@/lib/programa/derivar';
import type { Historia, Overlay, Snapshot } from '@/lib/programa/tipos';
import { Marco } from './Marco';

const SNAP = snapshot as unknown as Snapshot;
const SLUG = 'prtech';

/** El orden de las fases no está en GitHub: los milestones vienen alfabéticos. */
const ORDEN = ['Fase 1', 'Fase 2', 'Fase 3', 'Etapa 2', 'Operación'];
function peso(fase: string): number {
  const i = ORDEN.findIndex((p) => fase.startsWith(p));
  return i < 0 ? 99 : i;
}

function avance(hs: Historia[], o: Overlay) {
  const listas = hs.filter((h) => hecha(h, o)).length;
  return { listas, total: hs.length, pct: hs.length ? Math.round((listas / hs.length) * 100) : 0 };
}

export default function RoadmapApp({ llave }: { llave: string }) {
  const cfg = CONFIGS[SLUG];
  const { overlay } = useOverlay(SLUG);

  // Las fases son los milestones y las épicas son etiquetas. Las dos salen del
  // snapshot, así que este mapa no se desactualiza: una historia que cambia de
  // milestone se mueve de fase acá sin que nadie edite nada.
  const fases = useMemo(() => {
    const m = new Map<string, Historia[]>();
    for (const h of SNAP.historias) {
      const f = h.fase ?? 'Sin fase';
      m.set(f, [...(m.get(f) ?? []), h]);
    }
    return [...m.entries()].sort((a, b) => peso(a[0]) - peso(b[0]) || a[0].localeCompare(b[0]));
  }, []);

  const epicas = useMemo(() => {
    const m = new Map<string, Historia[]>();
    for (const h of SNAP.historias) {
      const e = epicaDe(h);
      if (!e) continue;
      m.set(e, [...(m.get(e) ?? []), h]);
    }
    return [...m.entries()].sort((a, b) => {
      const A = avance(a[1], overlay), B = avance(b[1], overlay);
      // Primero las que están a medio hacer: son las que se pueden terminar.
      return B.pct - A.pct || b[1].length - a[1].length;
    });
  }, [overlay]);

  const sinEpica = SNAP.historias.filter((h) => !epicaDe(h));

  return (
    <Marco llave={llave} activo="roadmap">
      <div className="space-y-10">
        <header>
          <h1 className="font-serif text-3xl text-white">Roadmap y épicas</h1>
          <p className="mt-2 text-xs leading-relaxed text-white/40">
            Las fases son los milestones de GitHub y las épicas son etiquetas, no issues — una
            épica no se cierra, se vacía. Los dos mapas salen del snapshot, así que una historia
            que cambia de milestone se mueve de fase acá sin que nadie edite nada.
          </p>
        </header>

        {/* ── Las fases ───────────────────────────────────────────────── */}
        <section>
          <h2 className="mb-3 font-serif text-2xl text-white">Por fase</h2>
          <div className="space-y-2">
            {fases.map(([fase, hs]) => {
              const a = avance(hs, overlay);
              const foco = fase === cfg.fase_foco;
              const c = COLOR_RAG[rag(a.pct, 90, 40)];
              return (
                <div
                  key={fase}
                  className="rounded-xl border bg-white/[0.03] p-3"
                  style={{ borderColor: foco ? `${COLOR_RAG.a}66` : 'rgba(255,255,255,.1)' }}
                >
                  <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                    <h3 className="font-serif text-lg text-white">{fase}</h3>
                    {foco && (
                      <span
                        className="rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wide"
                        style={{ background: `${COLOR_RAG.a}22`, color: COLOR_RAG.a }}
                      >
                        en foco
                      </span>
                    )}
                    <span className="ml-auto text-xs tabular-nums text-white/45">
                      {a.listas} de {a.total} · {a.pct}%
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full" style={{ width: `${a.pct}%`, background: c }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Las épicas ──────────────────────────────────────────────── */}
        <section>
          <h2 className="mb-1 font-serif text-2xl text-white">Por épica</h2>
          <p className="mb-3 text-xs text-white/40">
            Ordenadas por cuánto les falta: arriba las que están a medio hacer, que son las que se
            pueden terminar.
          </p>
          <div className="space-y-2">
            {epicas.map(([epica, hs]) => {
              const a = avance(hs, overlay);
              const c = COLOR_RAG[rag(a.pct, 90, 40)];
              const abiertas = hs.filter((h) => !hecha(h, overlay));
              return (
                <details
                  key={epica}
                  className="rounded-xl border border-white/10 bg-white/[0.03]"
                  style={{ borderLeft: `3px solid ${c}` }}
                >
                  <summary className="cursor-pointer list-none px-3 py-2.5">
                    <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                      <span className="text-sm font-medium text-white/90">{epica}</span>
                      <span className="text-xs tabular-nums text-white/40">
                        {a.listas}/{a.total}
                      </span>
                      <span className="ml-auto text-xs" style={{ color: c }}>
                        {a.pct}%
                      </span>
                    </div>
                  </summary>
                  <ul className="space-y-1 border-t border-white/10 px-3 py-2">
                    {hs.map((h) => (
                      <li key={h.numero} className="flex flex-wrap items-baseline gap-x-2 text-xs">
                        <a
                          href={h.url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-white/30 hover:text-[#7ec1e8]"
                        >
                          #{h.numero}
                        </a>
                        <span className={hecha(h, overlay) ? 'text-white/35 line-through' : 'text-white/75'}>
                          {h.titulo}
                        </span>
                        <span className="ml-auto shrink-0 text-white/30">{h.fase ?? '—'}</span>
                        {h.asignados[0] && (
                          <span className="shrink-0 text-white/40">{nombreDe(h.asignados[0], cfg)}</span>
                        )}
                        <span className="shrink-0 text-white/25">{estadoEfectivo(h, overlay)}</span>
                      </li>
                    ))}
                  </ul>
                  {abiertas.length === 0 && (
                    <p className="border-t border-white/10 px-3 py-2 text-xs" style={{ color: COLOR_RAG.v }}>
                      Épica vacía: no queda nada abierto.
                    </p>
                  )}
                </details>
              );
            })}
          </div>

          {sinEpica.length > 0 && (
            <p className="mt-2 rounded-xl border border-dashed border-white/15 px-3 py-2.5 text-xs text-white/40">
              {sinEpica.length} historias sin etiqueta de épica: {sinEpica.map((h) => `#${h.numero}`).join(' · ')}
            </p>
          )}
        </section>
      </div>
    </Marco>
  );
}
