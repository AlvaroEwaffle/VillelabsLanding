'use client';

import { useMemo } from 'react';
import { CONFIGS, slugDe } from '@/lib/programa/config';
import { datosDe, type Fase1 } from '@/lib/programa/registro';
import { useOverlay } from '@/lib/programa/useOverlay';
import { COLOR_RAG, estadoEfectivo, hecha, nombreDe } from '@/lib/programa/derivar';
import type { Snapshot } from '@/lib/programa/tipos';
import { Marco } from './Marco';

type HistoriaDoc = Fase1['historias'][number];

const MARCO: Record<string, { color: string; texto: string }> = {
  existe: { color: COLOR_RAG.v, texto: 'ya existe' },
  'esta semana': { color: COLOR_RAG.a, texto: 'esta semana' },
  falta: { color: COLOR_RAG.r, texto: 'falta' },
};

export default function Fase1App({ llave }: { llave: string }) {
  const SLUG = slugDe(llave);
  const { snapshot: SNAP, fase1: DOC } = datosDe(SLUG);
  const cfg = CONFIGS[SLUG];
  const { overlay } = useOverlay(SLUG);

  // El criterio de aceptación viene del kick-off; el estado, de GitHub. Esa
  // junta es el artefacto: un documento que no envejece porque la mitad que
  // envejece no está guardada en él.
  const porEpica = useMemo(() => {
    const mapa = new Map<string, Array<HistoriaDoc & { vive: Snapshot['historias'][0] | undefined }>>();
    for (const h of DOC.historias) {
      const vive = SNAP.historias.find((x) => x.numero === h.numero);
      const lista = mapa.get(h.epica) ?? [];
      lista.push({ ...h, vive });
      mapa.set(h.epica, lista);
    }
    return [...mapa.entries()];
  }, [DOC, SNAP]);

  const conEstado = DOC.historias
    .map((h) => SNAP.historias.find((x) => x.numero === h.numero))
    .filter(Boolean) as Snapshot['historias'];
  const hechas = conEstado.filter((h) => hecha(h, overlay)).length;
  const pct = conEstado.length ? Math.round((hechas / conEstado.length) * 100) : 0;

  return (
    <Marco llave={llave} activo="fase-1">
      <div className="space-y-10">
        <header>
          <h1 className="font-serif text-3xl text-white">{cfg.fase_foco}</h1>
          <p className="mt-1 text-sm text-white/60">
            {DOC.historias.length} historias con su criterio de aceptación ·{' '}
            <strong className="font-medium" style={{ color: pct >= 50 ? COLOR_RAG.a : COLOR_RAG.r }}>
              {hechas} hechas · {pct}%
            </strong>
          </p>
          <p className="mt-2 text-xs leading-relaxed text-white/40">
            Los criterios vienen del documento de alcance del {DOC._fecha} y no cambian solos: se
            escribieron una vez. El estado de cada historia sale de GitHub en cada sync. Esa junta es el punto —
            el documento no envejece porque la mitad que envejece no está guardada en él.
          </p>
        </header>

        {/* ── Historias por épica ─────────────────────────────────────── */}
        <section className="space-y-5">
          {porEpica.map(([epica, hs]) => {
            const listas = hs.filter((h) => h.vive && hecha(h.vive, overlay)).length;
            return (
              <div key={epica}>
                <div className="mb-2 flex flex-wrap items-baseline gap-x-2">
                  <h2 className="font-serif text-xl text-white">{epica}</h2>
                  <span className="text-xs text-white/35">
                    {listas} de {hs.length}
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {hs.map((h) => {
                    const est = h.vive ? estadoEfectivo(h.vive, overlay) : null;
                    const lista = h.vive ? hecha(h.vive, overlay) : false;
                    const c = lista
                      ? COLOR_RAG.v
                      : est === 'Bloqueada'
                        ? COLOR_RAG.r
                        : est === 'Sin tocar' || !est
                          ? 'rgba(255,255,255,.2)'
                          : COLOR_RAG.a;
                    return (
                      <li
                        key={h.numero}
                        className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5"
                        style={{ borderLeft: `3px solid ${c}` }}
                      >
                        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                          <a
                            href={h.vive?.url ?? `https://github.com/${SNAP.repo}/issues/${h.numero}`}
                            target="_blank"
                            rel="noreferrer"
                            className="font-mono text-xs text-white/35 hover:text-[#7ec1e8]"
                          >
                            #{h.numero}
                          </a>
                          <span className={`text-sm ${lista ? 'text-white/45' : 'text-white/90'}`}>
                            {h.titulo}
                          </span>
                          <span className="ml-auto shrink-0 text-xs" style={{ color: c }}>
                            {est ?? 'fuera del board'}
                          </span>
                          {h.vive?.asignados.length ? (
                            <span className="shrink-0 text-xs text-white/40">
                              {h.vive.asignados.map((a) => nombreDe(a, cfg)).join(', ')}
                            </span>
                          ) : (
                            !lista && <span className="shrink-0 text-xs text-white/20">sin dueño</span>
                          )}
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-white/45">
                          <span className="text-white/25">Está hecha cuando: </span>
                          {h.criterio}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </section>

        {/* ── Storyboard ──────────────────────────────────────────────── */}
        {DOC.storyboard.length > 0 && (
        <section>
          <h2 className="mb-1 font-serif text-2xl text-white">El recorrido, pantalla por pantalla</h2>
          <p className="mb-3 text-xs leading-relaxed text-white/40">
            Lo que el cliente ve, en orden. El marco de cada cuadro dice si esa pantalla ya existe,
            si se construye esta semana, o si no hay nada todavía.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {DOC.storyboard.map((p) => {
              const m = MARCO[p.marco] ?? MARCO.falta;
              return (
                <figure key={p.paso} className="m-0">
                  <div
                    className="overflow-hidden rounded-xl border-2"
                    style={{ borderColor: m.color }}
                    dangerouslySetInnerHTML={{ __html: p.svg }}
                  />
                  <figcaption className="mt-1.5">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <span className="text-[10px] uppercase tracking-wide text-white/30">
                        {p.paso}
                      </span>
                      <h3 className="text-sm font-medium text-white/90">{p.titulo}</h3>
                      <span className="ml-auto text-[10px]" style={{ color: m.color }}>
                        {m.texto}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs leading-relaxed text-white/45">{p.nota}</p>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>
        )}
      </div>
    </Marco>
  );
}
