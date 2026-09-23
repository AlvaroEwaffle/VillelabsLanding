'use client';

import { useState } from 'react';
import { COLOR_RAG, type Rag } from '@/lib/programa/derivar';
import { NOMBRE_RAID, TIPOS_RAID, type EntradaRaid, type TipoRaid } from '@/lib/programa/tipos';

const ESTADOS = ['abierto', 'mitigando', 'en revisión', 'cerrado'];
const IMPACTOS: EntradaRaid['impacto'][] = ['alto', 'medio', 'bajo'];

/** El color de una entrada sale de su impacto y de si sigue abierta. */
function semaforo(r: EntradaRaid): Rag {
  if (r.estado === 'cerrado') return 'v';
  if (r.impacto === 'alto') return r.estado === 'mitigando' || r.estado === 'en revisión' ? 'a' : 'r';
  if (r.impacto === 'medio') return 'a';
  return 'v';
}

function vacia(): EntradaRaid {
  return {
    id: `x-${Date.now().toString(36)}`,
    tipo: 'R',
    titulo: '',
    detalle: '',
    impacto: 'medio',
    dueno: '',
    accion: '',
    estado: 'abierto',
    creada: new Date().toISOString(),
  };
}

export function Raid({
  entradas,
  guardar,
  borrar,
}: {
  entradas: EntradaRaid[];
  guardar: (e: EntradaRaid) => void;
  borrar: (id: string) => void;
}) {
  const [editando, setEditando] = useState<EntradaRaid | null>(null);
  const [verCerrados, setVerCerrados] = useState(false);

  const orden = { R: 0, I: 1, D: 2, A: 3 };
  const lista = entradas
    .filter((r) => verCerrados || r.estado !== 'cerrado')
    .sort((a, b) => orden[a.tipo] - orden[b.tipo] || a.id.localeCompare(b.id));

  return (
    <section>
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <h2 className="mr-auto font-serif text-2xl text-white">
          RAID <span className="text-white/40">· {lista.length}</span>
        </h2>
        <label className="flex items-center gap-1.5 text-xs text-white/50">
          <input
            type="checkbox"
            checked={verCerrados}
            onChange={(e) => setVerCerrados(e.target.checked)}
            className="accent-[#2175a1]"
          />
          ver cerrados
        </label>
        <button
          type="button"
          onClick={() => setEditando(vacia())}
          className="rounded-lg border border-[#2175a1]/50 bg-[#2175a1]/15 px-3 py-1.5 text-xs text-[#7ec1e8] transition-colors hover:bg-[#2175a1]/25"
        >
          + agregar
        </button>
      </div>

      <p className="mb-3 text-xs text-white/40">
        Riesgos, supuestos, problemas y dependencias. Es lo único del tablero que no sale de GitHub,
        porque nada de esto es una historia: es lo que explica por qué las historias van como van.
      </p>

      <div className="space-y-1.5">
        {lista.map((r) => {
          const c = COLOR_RAG[semaforo(r)];
          return (
            <article
              key={r.id}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
              style={{ borderLeft: `3px solid ${c}` }}
            >
              <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                <span
                  className="rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                  style={{ background: `${c}22`, color: c }}
                >
                  {NOMBRE_RAID[r.tipo]}
                </span>
                <h3 className="mr-auto text-sm font-medium text-white/90">{r.titulo || '(sin título)'}</h3>
                <span className="text-xs text-white/45">{r.dueno}</span>
                <span className="text-xs text-white/35">
                  {r.estado} · impacto {r.impacto}
                </span>
                <button
                  type="button"
                  onClick={() => setEditando(r)}
                  className="text-xs text-[#2175a1] underline-offset-2 hover:underline"
                >
                  editar
                </button>
              </div>
              {r.detalle && <p className="mt-1.5 text-sm leading-relaxed text-white/55">{r.detalle}</p>}
              {r.accion && (
                <p className="mt-1.5 text-sm leading-relaxed text-white/75">
                  <span className="text-white/40">→ </span>
                  {r.accion}
                </p>
              )}
            </article>
          );
        })}

        {lista.length === 0 && (
          <p className="rounded-xl border border-dashed border-white/15 px-4 py-6 text-center text-sm text-white/40">
            Nada registrado todavía.
          </p>
        )}
      </div>

      {editando && (
        <Editor
          entrada={editando}
          cerrar={() => setEditando(null)}
          guardar={(e) => {
            guardar(e);
            setEditando(null);
          }}
          borrar={() => {
            borrar(editando.id);
            setEditando(null);
          }}
        />
      )}
    </section>
  );
}

function Editor({
  entrada,
  guardar,
  borrar,
  cerrar,
}: {
  entrada: EntradaRaid;
  guardar: (e: EntradaRaid) => void;
  borrar: () => void;
  cerrar: () => void;
}) {
  const [b, setB] = useState(entrada);
  const campo =
    'w-full rounded-lg border border-white/15 bg-white/[0.05] px-3 py-2 text-sm text-white outline-none placeholder:text-white/30 focus-visible:ring-2 focus-visible:ring-[#2175a1]';

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
      onClick={cerrar}
    >
      <div
        className="my-8 w-full max-w-lg space-y-3 rounded-2xl border border-white/15 bg-main p-5 shadow-premium"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-serif text-xl text-white">Entrada del RAID</h3>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <select value={b.tipo} onChange={(e) => setB({ ...b, tipo: e.target.value as TipoRaid })} className={campo}>
            {TIPOS_RAID.map((t) => (
              <option key={t} value={t} className="bg-main">
                {NOMBRE_RAID[t]}
              </option>
            ))}
          </select>
          <select
            value={b.impacto}
            onChange={(e) => setB({ ...b, impacto: e.target.value as EntradaRaid['impacto'] })}
            className={campo}
          >
            {IMPACTOS.map((i) => (
              <option key={i} value={i} className="bg-main">
                impacto {i}
              </option>
            ))}
          </select>
          <select value={b.estado} onChange={(e) => setB({ ...b, estado: e.target.value })} className={campo}>
            {ESTADOS.map((s) => (
              <option key={s} value={s} className="bg-main">
                {s}
              </option>
            ))}
          </select>
          <input value={b.dueno} onChange={(e) => setB({ ...b, dueno: e.target.value })} placeholder="dueño" className={campo} />
        </div>

        <input
          value={b.titulo}
          onChange={(e) => setB({ ...b, titulo: e.target.value })}
          placeholder="El titular, en una línea"
          className={campo}
          autoFocus
        />
        <textarea
          value={b.detalle}
          onChange={(e) => setB({ ...b, detalle: e.target.value })}
          rows={3}
          placeholder="Qué pasa y por qué importa"
          className={`${campo} resize-y leading-relaxed`}
        />
        <textarea
          value={b.accion}
          onChange={(e) => setB({ ...b, accion: e.target.value })}
          rows={2}
          placeholder="Qué vamos a hacer al respecto"
          className={`${campo} resize-y leading-relaxed`}
        />

        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => guardar(b)}
            disabled={!b.titulo.trim()}
            className="rounded-lg bg-[#2175a1] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-30"
          >
            Guardar
          </button>
          <button type="button" onClick={cerrar} className="rounded-lg px-3 py-2 text-sm text-white/60 hover:text-white">
            Cancelar
          </button>
          <button
            type="button"
            onClick={borrar}
            className="ml-auto rounded-lg px-3 py-2 text-sm text-red-400/70 hover:text-red-400"
          >
            Borrar
          </button>
        </div>
      </div>
    </div>
  );
}
