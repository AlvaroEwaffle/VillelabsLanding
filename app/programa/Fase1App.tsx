'use client';

import { useMemo } from 'react';
import snapshot from '@/lib/programa/data/prtech.json';
import fase1 from '@/lib/programa/data/prtech.fase1.json';
import { CONFIGS } from '@/lib/programa/config';
import { useOverlay } from '@/lib/programa/useOverlay';
import { COLOR_RAG, epicaDe, estadoEfectivo, hecha, nombreDe, sprintVigente } from '@/lib/programa/derivar';
import type { Historia, Overlay, Snapshot } from '@/lib/programa/tipos';
import { Marco } from './Marco';

const SNAP = snapshot as unknown as Snapshot;
const SLUG = 'prtech';

interface HistoriaDoc { numero: number; epica: string; titulo: string; criterio: string }
interface Paso { paso: string; titulo: string; nota: string; marco: string; svg: string; historias: number[] }
interface Hueco { titulo: string; historias: number[]; detalle: string }
const DOC = fase1 as unknown as {
  _fuente: string; _fecha: string;
  historias: HistoriaDoc[]; storyboard: Paso[];
  estado: { fecha: string; lectura: string; huecos: Hueco[]; cierre: { sprint: string; historias: number[]; nota: string } };
};

const MARCO: Record<string, { color: string; texto: string }> = {
  existe: { color: COLOR_RAG.v, texto: 'ya existe' },
  'esta semana': { color: COLOR_RAG.a, texto: 'en el sprint' },
  falta: { color: COLOR_RAG.r, texto: 'falta' },
};

/** Nombre legible de una épica a partir de su etiqueta, aprendido del kick-off. */
function nombreEpica(slug: string | null, aprendidas: Map<string, string>): string {
  if (!slug) return 'Seguridad y deuda técnica';
  return aprendidas.get(slug) ?? slug.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
}

function colorDe(h: Historia | undefined, overlay: Overlay): string {
  if (!h) return 'rgba(255,255,255,.2)';
  if (hecha(h, overlay)) return COLOR_RAG.v;
  const est = estadoEfectivo(h, overlay);
  if (est === 'Bloqueada') return COLOR_RAG.r;
  if (est === 'Sin tocar') return 'rgba(255,255,255,.2)';
  return COLOR_RAG.a;
}

function Fila({ h, doc, overlay, sprint }: { h: Historia | undefined; doc?: HistoriaDoc; overlay: Overlay; sprint: string; numero?: number }) {
  const cfg = CONFIGS[SLUG];
  const numero = h?.numero ?? doc?.numero ?? 0;
  const est = h ? estadoEfectivo(h, overlay) : null;
  const lista = h ? hecha(h, overlay) : false;
  const c = colorDe(h, overlay);
  const enSprint = h?.sprint === sprint && !lista;
  return (
    <li className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5" style={{ borderLeft: `3px solid ${c}` }}>
      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <a href={h?.url ?? `https://github.com/${SNAP.repo}/issues/${numero}`} target="_blank" rel="noreferrer" className="font-mono text-xs text-white/35 hover:text-[#7ec1e8]">
          #{numero}
        </a>
        <span className={`text-sm ${lista ? 'text-white/45' : 'text-white/90'}`}>{doc?.titulo ?? h?.titulo}</span>
        {enSprint && (
          <span className="rounded border border-amber-400/30 bg-amber-400/[0.08] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-200/85">
            {sprint}
          </span>
        )}
        <span className="ml-auto shrink-0 text-xs" style={{ color: c }}>{est ?? 'fuera del board'}</span>
        {h?.asignados.length ? (
          <span className="shrink-0 text-xs text-white/40">{h.asignados.map((a) => nombreDe(a, cfg)).join(', ')}</span>
        ) : (
          !lista && <span className="shrink-0 text-xs text-white/20">sin dueño</span>
        )}
      </div>
      {doc ? (
        <p className="mt-1 text-xs leading-relaxed text-white/45">
          <span className="text-white/25">Está hecha cuando: </span>
          {doc.criterio}
        </p>
      ) : (
        h && (
          <p className="mt-1 text-xs leading-relaxed text-white/35">
            Entró después del kick-off, el {h.creada.slice(0, 10)}. Sin criterio acordado: se cierra cuando la issue se cierra.
          </p>
        )
      )}
    </li>
  );
}

export default function Fase1App({ llave }: { llave: string }) {
  const cfg = CONFIGS[SLUG];
  const { overlay } = useOverlay(SLUG);
  const sprint = sprintVigente(cfg).nombre;
  const porNumero = useMemo(() => new Map(SNAP.historias.map((h) => [h.numero, h])), []);
  const docPorNumero = useMemo(() => new Map(DOC.historias.map((d) => [d.numero, d])), []);

  // La fase es el milestone de GitHub: todo lo que tiene esa etiqueta cuenta,
  // esté o no en el documento del kick-off. Lo del kick-off trae criterio;
  // lo que entró después, no — y se dice.
  const enFase = useMemo(
    () => SNAP.historias.filter((h) => h.fase === cfg.fase_foco).sort((a, b) => a.numero - b.numero),
    [cfg.fase_foco],
  );
  const kickoff = enFase.filter((h) => docPorNumero.has(h.numero));
  const despues = enFase.filter((h) => !docPorNumero.has(h.numero));
  const hechas = enFase.filter((h) => hecha(h, overlay)).length;
  const pct = enFase.length ? Math.round((hechas / enFase.length) * 100) : 0;
  const enSprint = enFase.filter((h) => h.sprint === sprint && !hecha(h, overlay)).length;
  const sinSprint = enFase.filter((h) => !hecha(h, overlay) && h.sprint !== sprint).length;

  const porEpica = useMemo(() => {
    const aprendidas = new Map<string, string>();
    for (const d of DOC.historias) {
      const h = porNumero.get(d.numero);
      const slug = h ? epicaDe(h) : null;
      if (slug && !aprendidas.has(slug)) aprendidas.set(slug, d.epica);
    }
    const mapa = new Map<string, Historia[]>();
    for (const h of enFase) {
      const nombre = docPorNumero.get(h.numero)?.epica ?? nombreEpica(epicaDe(h), aprendidas);
      mapa.set(nombre, [...(mapa.get(nombre) ?? []), h]);
    }
    // Las del kick-off primero, en su orden; lo nuevo al final.
    const orden = [...new Set(DOC.historias.map((d) => d.epica))];
    return [...mapa.entries()].sort((a, b) => {
      const ia = orden.indexOf(a[0]); const ib = orden.indexOf(b[0]);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });
  }, [enFase, porNumero, docPorNumero]);

  const marcoDe = (p: Paso) => {
    const hs = p.historias.map((n) => porNumero.get(n)).filter(Boolean) as Historia[];
    if (!hs.length) return p.marco;
    if (hs.every((h) => hecha(h, overlay))) return 'existe';
    if (hs.some((h) => h.sprint === sprint && !hecha(h, overlay))) return 'esta semana';
    return 'falta';
  };

  const otrasFases = useMemo(() => {
    const mapa = new Map<string, Historia[]>();
    for (const h of SNAP.historias) {
      if (h.fase === cfg.fase_foco || h.estado_github === 'CLOSED') continue;
      const k = h.fase ?? 'Sin fase';
      mapa.set(k, [...(mapa.get(k) ?? []), h]);
    }
    return [...mapa.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [cfg.fase_foco]);

  return (
    <Marco llave={llave} activo="fase-1">
      <div className="space-y-10">
        <header>
          <h1 className="font-serif text-3xl text-white">{cfg.fase_foco}</h1>
          <p className="mt-1 text-sm text-white/60">
            {enFase.length} historias en la fase · {kickoff.length} del kick-off y {despues.length} que entraron después ·{' '}
            <strong className="font-medium" style={{ color: pct >= 50 ? COLOR_RAG.a : COLOR_RAG.r }}>
              {hechas} hechas · {pct}%
            </strong>
            {' '}· {enSprint} en {sprint} · {sinSprint} abiertas sin sprint
          </p>
          <p className="mt-2 text-xs leading-relaxed text-white/40">
            Los criterios vienen del kick-off del {DOC._fecha} y no cambian solos. La lista, el estado y el marco
            de cada pantalla salen del milestone de GitHub en cada sync: si una historia no está acá, no está en la fase.
          </p>
        </header>

        {/* ── Dónde está la fase ───────────────────────────────────────── */}
        <section className="rounded-r-lg border-l-[3px] border-[#2175a1] bg-white/[0.028] px-5 py-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/30">Dónde está la fase · {DOC.estado.fecha}</p>
          <p className="mt-2 text-[14px] leading-relaxed text-white/75">{DOC.estado.lectura}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {DOC.estado.huecos.map((g) => {
              const hs = g.historias.map((n) => porNumero.get(n)).filter(Boolean) as Historia[];
              const listas = hs.filter((h) => hecha(h, overlay)).length;
              return (
                <div key={g.titulo} className="rounded-lg border border-white/10 bg-white/[0.03] p-3.5" style={{ borderTop: `3px solid ${listas === hs.length && hs.length ? COLOR_RAG.v : COLOR_RAG.r}` }}>
                  <p className="font-serif text-[17px] text-white">{g.titulo}</p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-white/45">{g.detalle}</p>
                  <p className="mt-2 text-[12px] text-white/50">
                    {hs.map((h) => (
                      <a key={h.numero} href={h.url} target="_blank" rel="noreferrer" className="mr-2 font-mono hover:text-[#7ec1e8]" style={{ color: colorDe(h, overlay) }}>
                        #{h.numero}
                      </a>
                    ))}
                    <span className="text-white/30">{listas} de {hs.length} hechas</span>
                  </p>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-white/55">
            <span className="text-white/30">Cierre propuesto en {DOC.estado.cierre.sprint}: </span>
            {DOC.estado.cierre.historias.map((n) => {
              const h = porNumero.get(n);
              return (
                <a key={n} href={h?.url} target="_blank" rel="noreferrer" className="mr-1.5 font-mono hover:text-[#7ec1e8]" style={{ color: colorDe(h, overlay) }}>
                  #{n}
                </a>
              );
            })}
            <span className="text-white/45">· {DOC.estado.cierre.nota}</span>
          </p>
        </section>

        {/* ── Storyboard ──────────────────────────────────────────────── */}
        <section>
          <h2 className="mb-1 font-serif text-2xl text-white">El recorrido, pantalla por pantalla</h2>
          <p className="mb-3 text-xs leading-relaxed text-white/40">
            Lo que el cliente ve, en orden. El marco sale de las historias de cada pantalla: verde si están
            todas hechas, ámbar si alguna está en {sprint}, rojo si lo que falta no está en ningún sprint.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {DOC.storyboard.map((p) => {
              const marco = marcoDe(p);
              const m = MARCO[marco] ?? MARCO.falta;
              const hs = p.historias.map((n) => porNumero.get(n)).filter(Boolean) as Historia[];
              const abiertas = hs.filter((h) => !hecha(h, overlay));
              return (
                <figure key={p.paso} className="m-0">
                  <div className="overflow-hidden rounded-xl border-2" style={{ borderColor: m.color }} dangerouslySetInnerHTML={{ __html: p.svg }} />
                  <figcaption className="mt-1.5">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <span className="text-[10px] uppercase tracking-wide text-white/30">{p.paso}</span>
                      <h3 className="text-sm font-medium text-white/90">{p.titulo}</h3>
                      <span className="ml-auto text-[10px]" style={{ color: m.color }}>{m.texto}</span>
                    </div>
                    <p className="mt-0.5 text-xs leading-relaxed text-white/45">{p.nota}</p>
                    {hs.length > 0 && (
                      <p className="mt-1 text-[11px] text-white/35">
                        {hs.length - abiertas.length} de {hs.length} hechas
                        {abiertas.length > 0 && (
                          <>
                            {' · faltan '}
                            {abiertas.map((h) => (
                              <a key={h.numero} href={h.url} target="_blank" rel="noreferrer" className="mr-1 font-mono hover:text-[#7ec1e8]" style={{ color: colorDe(h, overlay) }}>
                                #{h.numero}
                              </a>
                            ))}
                          </>
                        )}
                      </p>
                    )}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>

        {/* ── Historias por épica ─────────────────────────────────────── */}
        <section className="space-y-5">
          <div>
            <h2 className="font-serif text-2xl text-white">Todas las historias de la fase</h2>
            <p className="mt-1 text-xs leading-relaxed text-white/40">
              Por épica. Las del kick-off traen su criterio de aceptación; las que entraron después dicen cuándo entraron.
            </p>
          </div>
          {porEpica.map(([epica, hs]) => {
            const listas = hs.filter((h) => hecha(h, overlay)).length;
            return (
              <div key={epica}>
                <div className="mb-2 flex flex-wrap items-baseline gap-x-2">
                  <h3 className="font-serif text-xl text-white">{epica}</h3>
                  <span className="text-xs text-white/35">{listas} de {hs.length}</span>
                </div>
                <ul className="space-y-1.5">
                  {hs.map((h) => (
                    <Fila key={h.numero} h={h} doc={docPorNumero.get(h.numero)} overlay={overlay} sprint={sprint} />
                  ))}
                </ul>
              </div>
            );
          })}
        </section>

        {/* ── Lo que viene después ────────────────────────────────────── */}
        <section className="space-y-5">
          <div>
            <h2 className="font-serif text-2xl text-white">Lo que queda fuera de la fase</h2>
            <p className="mt-1 text-xs leading-relaxed text-white/40">
              Abiertas en el repo con otro milestone. Están acá para que el panorama sea completo, no para tomarlas ahora.
            </p>
          </div>
          {otrasFases.map(([fase, hs]) => (
            <div key={fase}>
              <div className="mb-2 flex flex-wrap items-baseline gap-x-2">
                <h3 className="font-serif text-lg text-white/80">{fase}</h3>
                <span className="text-xs text-white/35">{hs.length} abiertas</span>
              </div>
              <ul className="space-y-1.5">
                {hs.map((h) => (
                  <Fila key={h.numero} h={h} overlay={overlay} sprint={sprint} />
                ))}
              </ul>
            </div>
          ))}
        </section>
      </div>
    </Marco>
  );
}
