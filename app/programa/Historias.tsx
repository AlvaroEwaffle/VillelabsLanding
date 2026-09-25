'use client';

import { useMemo, useState } from 'react';
import { COLOR_RAG, divergente, epicaDe, estadoEfectivo, nombreDe } from '@/lib/programa/derivar';
import { ESTADOS_PM, type ConfigPrograma, type EstadoPM, type Historia, type Overlay, type OverlayHistoria } from '@/lib/programa/tipos';

const TONO: Record<EstadoPM, string> = {
  'Sin tocar': 'rgba(255,255,255,.28)',
  'En análisis': '#6b7fa3',
  'Lista para tomar': '#2175a1',
  'En curso': COLOR_RAG.a,
  Bloqueada: COLOR_RAG.r,
  'En revisión': '#8e6fc4',
  Hecha: COLOR_RAG.v,
};

const TODOS = '· todos ·';

export function Historias({
  historias,
  overlay,
  cfg,
  fijar,
}: {
  historias: Historia[];
  overlay: Overlay;
  cfg: ConfigPrograma;
  fijar: (numero: number, parche: Partial<OverlayHistoria>) => void;
}) {
  const [fase, setFase] = useState(cfg.fase_foco);
  const [quien, setQuien] = useState(TODOS);
  const [estado, setEstado] = useState<string>(TODOS);
  const [abierta, setAbierta] = useState<number | null>(null);

  const fases = useMemo(
    () => [TODOS, ...Array.from(new Set(historias.map((h) => h.fase ?? 'Sin fase')))],
    [historias],
  );

  const visibles = useMemo(
    () =>
      historias.filter((h) => {
        if (fase !== TODOS && (h.fase ?? 'Sin fase') !== fase) return false;
        if (quien !== TODOS) {
          if (quien === 'Sin dueño' ? h.asignados.length > 0 : !h.asignados.includes(quien)) return false;
        }
        if (estado !== TODOS && estadoEfectivo(h, overlay) !== estado) return false;
        return true;
      }),
    [historias, fase, quien, estado, overlay],
  );

  return (
    <section>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <h2 className="mr-auto font-serif text-2xl text-white">
          Historias <span className="text-white/40">· {visibles.length}</span>
        </h2>
        <Selector valor={fase} fijar={setFase} opciones={fases} />
        <Selector
          valor={quien}
          fijar={setQuien}
          opciones={[TODOS, ...Object.keys(cfg.equipo), 'Sin dueño']}
          mostrar={(v) => (cfg.equipo[v] ? cfg.equipo[v] : v)}
        />
        <Selector valor={estado} fijar={setEstado} opciones={[TODOS, ...ESTADOS_PM]} />
      </div>

      <ul className="space-y-1.5">
        {visibles.map((h) => {
          const est = estadoEfectivo(h, overlay);
          const ov = overlay.historias[String(h.numero)] ?? {};
          const desplegada = abierta === h.numero;
          const epica = epicaDe(h);
          return (
            <li
              key={h.numero}
              className="rounded-xl border border-white/10 bg-white/[0.03] transition-colors hover:border-white/20"
              style={{ borderLeft: `3px solid ${TONO[est]}` }}
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 px-3 py-2.5">
                <button
                  type="button"
                  onClick={() => setAbierta(desplegada ? null : h.numero)}
                  className="flex min-w-0 flex-1 items-center gap-2.5 text-left"
                  aria-expanded={desplegada}
                >
                  <span className="shrink-0 font-mono text-xs text-white/35">#{h.numero}</span>
                  <span className={`truncate text-sm ${est === 'Hecha' ? 'text-white/45' : 'text-white/90'}`}>
                    {h.titulo}
                  </span>
                  {ov.nota && <span className="shrink-0 text-xs text-[#2175a1]" title="tiene nota">✎</span>}
                  {divergente(h, overlay) && (
                    <span
                      className="shrink-0 rounded bg-amber-400/15 px-1.5 py-0.5 text-[10px] text-amber-300"
                      title={`El board dice «${h.estado_board}»`}
                    >
                      ≠ board
                    </span>
                  )}
                </button>

                <div className="flex shrink-0 items-center gap-2">
                  {h.asignados.length === 0 ? (
                    <span className="text-xs text-white/25">sin dueño</span>
                  ) : (
                    h.asignados.map((a) => (
                      <span key={a} className="text-xs text-white/55">
                        {nombreDe(a, cfg)}
                      </span>
                    ))
                  )}
                  <select
                    value={est}
                    onChange={(e) => fijar(h.numero, { estado: e.target.value as EstadoPM })}
                    disabled={h.estado_github === 'CLOSED'}
                    aria-label={`Estado de la historia ${h.numero}`}
                    className="rounded-lg border border-white/15 bg-main px-2 py-1 text-xs text-white/90 outline-none focus-visible:ring-2 focus-visible:ring-[#2175a1] disabled:opacity-40"
                    style={{ color: TONO[est] }}
                  >
                    {ESTADOS_PM.map((s) => (
                      <option key={s} value={s} className="bg-main text-white">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {desplegada && (
                <div className="space-y-3 border-t border-white/10 px-3 py-3">
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/45">
                    <span>{h.fase ?? 'sin fase'}</span>
                    {h.sprint && <span>{h.sprint}</span>}
                    {epica && <span>épica: {epica}</span>}
                    {h.prioridad && <span>{h.prioridad}</span>}
                    {h.estado_board && <span>board: {h.estado_board}</span>}
                    <a
                      href={h.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#2175a1] underline-offset-2 hover:underline"
                    >
                      ver en GitHub ↗
                      {h.comentarios > 0 && ` · ${h.comentarios} comentario${h.comentarios > 1 ? 's' : ''}`}
                    </a>
                  </div>

                  {est === 'Bloqueada' && (
                    <input
                      value={ov.bloqueo ?? ''}
                      onChange={(e) => fijar(h.numero, { bloqueo: e.target.value })}
                      placeholder="¿Qué la tiene bloqueada? Una línea."
                      className="w-full rounded-lg border px-3 py-2 text-sm text-white outline-none placeholder:text-white/30 focus-visible:ring-2 focus-visible:ring-[#2175a1]"
                      style={{ borderColor: COLOR_RAG.r, background: 'rgba(192,57,43,.08)' }}
                    />
                  )}

                  <textarea
                    value={ov.nota ?? ''}
                    onChange={(e) => fijar(h.numero, { nota: e.target.value })}
                    rows={3}
                    placeholder="Nota de PM: lo que hay que saber de esta historia y no está en GitHub."
                    className="w-full resize-y rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2 text-sm leading-relaxed text-white outline-none placeholder:text-white/30 focus-visible:ring-2 focus-visible:ring-[#2175a1]"
                  />
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {visibles.length === 0 && (
        <p className="rounded-xl border border-dashed border-white/15 px-4 py-6 text-center text-sm text-white/40">
          Ninguna historia calza con ese filtro.
        </p>
      )}
    </section>
  );
}

function Selector({
  valor,
  fijar,
  opciones,
  mostrar,
}: {
  valor: string;
  fijar: (v: string) => void;
  opciones: readonly string[];
  mostrar?: (v: string) => string;
}) {
  return (
    <select
      value={valor}
      onChange={(e) => fijar(e.target.value)}
      className="rounded-lg border border-white/15 bg-white/[0.04] px-2.5 py-1.5 text-xs text-white/80 outline-none focus-visible:ring-2 focus-visible:ring-[#2175a1]"
    >
      {opciones.map((o) => (
        <option key={o} value={o} className="bg-main text-white">
          {mostrar ? mostrar(o) : o}
        </option>
      ))}
    </select>
  );
}
