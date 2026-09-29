'use client';

import { useEffect, useMemo, useRef } from 'react';
import snapshotPrtech from '@/lib/programa/data/prtech.json';
import semillaPrtech from '@/lib/programa/data/prtech.semilla.json';
import { ARTEFACTOS, FRESCURA } from '@/lib/programa/artefactos';
import { CONFIGS } from '@/lib/programa/config';
import { useOverlay } from '@/lib/programa/useOverlay';
import {
  COLOR_RAG,
  NOMBRE_RAG,
  estadoEfectivo,
  hecha,
  leer,
  nombreDe,
  serie,
  sprintVigente,
} from '@/lib/programa/derivar';
import { ESTADOS_PM, NOMBRE_RAID, type Overlay, type Snapshot } from '@/lib/programa/tipos';
import { Grafico } from './Grafico';
import { Historias, TONO } from './Historias';
import { Marco } from './Marco';
import { Producto } from './Producto';
import { Raid, semaforo } from './Raid';

const SNAPSHOT = snapshotPrtech as unknown as Snapshot;
const SEMILLA = semillaPrtech as unknown as Pick<Overlay, 'raid' | 'nota_general'>;
const SLUG = 'prtech';

const ORDEN_RAG = { r: 0, a: 1, v: 2 } as const;
const ORDEN_IMPACTO = { alto: 0, medio: 1, bajo: 2 } as const;

/**
 * El home de PR Tech, fusionado con el Scrum Board (28-sep-2026) y rediseñado
 * como dashboard visual (28-sep-2026, a pedido de Álvaro).
 *
 * Orden pedido: métricas → burndown/burnup → top 3 RAID → issues per state
 * del sprint → tabla completa del RAID al final. "Por qué ese color" y
 * "Necesita a alguien" se retiraron como secciones propias: sus datos ya
 * viven en las métricas de arriba y en el top 3 RAID, y dos vistas del mismo
 * número invitan a que una se desactualice sin que nadie lo note.
 *
 * `/scrum` ya no es una ruta — public/_redirects la manda acá con un 301.
 */
export default function ScrumHome({ llave }: { llave: string }) {
  const cfg = CONFIGS[SLUG];
  const {
    overlay, cargando, respaldo, guardando,
    fijarHistoria, fijarNotaGeneral, guardarRaid, borrarRaid, sembrar,
  } = useOverlay(SLUG);

  // El RAID arranca con lo que ya estaba levantado a mano, una sola vez. Un
  // tablero que empieza vacío se llena tarde o no se llena.
  const sembrado = useRef(false);
  useEffect(() => {
    if (cargando || sembrado.current) return;
    sembrado.current = true;
    sembrar(SEMILLA);
  }, [cargando, sembrar]);

  const lectura = useMemo(() => leer(SNAPSHOT, overlay, cfg), [overlay, cfg]);
  const sprint = useMemo(() => sprintVigente(cfg), [cfg]);

  const deFase = useMemo(
    () => SNAPSHOT.historias.filter((h) => h.fase === cfg.fase_foco),
    [cfg.fase_foco],
  );
  const puntos = useMemo(() => serie(deFase, overlay, sprint), [deFase, overlay, sprint]);
  const hoyIdx = puntos.findIndex((p) => p.fecha === new Date().toISOString().slice(0, 10));

  const porPersona = useMemo(() => {
    const filas = Object.entries(cfg.equipo).map(([login, nombre]) => {
      const suyas = SNAPSHOT.historias.filter((h) => h.asignados.includes(login));
      const abiertas = suyas.filter((h) => !hecha(h, overlay));
      return { login, nombre, total: suyas.length, abiertas: abiertas.length };
    });
    return filas.sort((a, b) => b.abiertas - a.abiertas);
  }, [cfg.equipo, overlay]);

  // Top 3 del RAID: primero por semáforo (rojo antes que ámbar), después por
  // impacto declarado. Lo cerrado no compite por un lugar acá.
  const raidTop3 = useMemo(() => {
    return [...overlay.raid]
      .filter((r) => r.estado !== 'cerrado')
      .sort(
        (a, b) =>
          ORDEN_RAG[semaforo(a)] - ORDEN_RAG[semaforo(b)] ||
          ORDEN_IMPACTO[a.impacto] - ORDEN_IMPACTO[b.impacto] ||
          b.creada.localeCompare(a.creada),
      )
      .slice(0, 3);
  }, [overlay.raid]);

  // Las historias del sprint vigente, agrupadas por su estado efectivo — el
  // mismo cálculo que usa cada fila de Historias, no uno nuevo.
  const porEstadoSprint = useMemo(() => {
    const deSprint = SNAPSHOT.historias.filter((h) => h.sprint === sprint.nombre);
    return ESTADOS_PM.map((estado) => ({
      estado,
      total: deSprint.filter((h) => estadoEfectivo(h, overlay) === estado).length,
    }));
  }, [sprint, overlay]);
  const totalSprint = porEstadoSprint.reduce((s, f) => s + f.total, 0);

  const c = COLOR_RAG[lectura.estado];
  const base = `/programa/${llave}`;

  return (
    <Marco llave={llave} activo={null}>
      <div className="space-y-10">
        {/* ── Métricas ────────────────────────────────────────────────── */}
        <section>
          <div className="mb-1 flex items-baseline gap-2">
            <h2 className="font-serif text-2xl text-white">Métricas</h2>
            <span className="text-sm" style={{ color: c }}>
              · {NOMBRE_RAG[lectura.estado]}
            </span>
          </div>
          <p className="mb-3 text-xs text-white/40">
            Los siete criterios que arman el semáforo, con su umbral. Un RAG cuyo criterio no se
            puede auditar es decoración; el color del programa es el peor de estos, nunca el
            promedio.
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {lectura.criterios.map((k) => {
              const cc = COLOR_RAG[k.estado];
              return (
                <div
                  key={k.clave}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5"
                  style={{ borderTop: `3px solid ${cc}` }}
                >
                  <p className="text-xs text-white/45">{k.titulo}</p>
                  <p className="mt-1 text-base font-medium leading-snug text-white">{k.valor}</p>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-white/30">{k.regla}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Avance ──────────────────────────────────────────────────── */}
        <section>
          <h2 className="mb-3 font-serif text-2xl text-white">Avance</h2>
          <div className="grid gap-3 lg:grid-cols-2">
            <Grafico
              titulo="Burndown"
              pie="Lo que queda por cerrar contra la bajada ideal del sprint. Reconstruido desde las fechas de creación y cierre de cada issue: GitHub no guarda historia de sprint."
              puntos={puntos}
              hoy={hoyIdx}
              lineas={[
                { clave: 'ideal', color: 'rgba(255,255,255,.45)', etiqueta: 'ideal', guion: true },
                { clave: 'pendientes', color: '#2175a1', etiqueta: 'pendientes', relleno: true },
              ]}
            />
            <Grafico
              titulo="Burnup"
              pie="Separa las dos causas de un atraso. Si la línea de abajo sube lento, el equipo va lento; si la de arriba sube, el alcance creció — y eso no se arregla trabajando más."
              puntos={puntos}
              hoy={hoyIdx}
              lineas={[
                { clave: 'alcance', color: '#c9860a', etiqueta: 'alcance' },
                { clave: 'hechas', color: '#1f8b4c', etiqueta: 'hechas', relleno: true },
              ]}
            />
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {porPersona.map((p) => (
              <div key={p.login} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <h3 className="font-serif text-lg text-white">{p.nombre}</h3>
                <p className="text-sm text-white/55">
                  {p.abiertas} abierta{p.abiertas === 1 ? '' : 's'}
                  <span className="text-white/30"> · {p.total} en total</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Top 3 RAID ──────────────────────────────────────────────── */}
        <section>
          <h2 className="mb-1 font-serif text-2xl text-white">Top 3 RAID</h2>
          <p className="mb-3 text-xs text-white/40">
            Lo más urgente del RAID abierto: primero por semáforo, después por impacto. La tabla
            completa está al final de la página.
          </p>
          <div className="grid gap-2 sm:grid-cols-3">
            {raidTop3.map((r) => {
              const cc = COLOR_RAG[semaforo(r)];
              return (
                <article
                  key={r.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5"
                  style={{ borderLeft: `3px solid ${cc}` }}
                >
                  <span
                    className="rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                    style={{ background: `${cc}22`, color: cc }}
                  >
                    {NOMBRE_RAID[r.tipo]}
                  </span>
                  <h3 className="mt-1.5 text-sm font-medium text-white/90">
                    {r.titulo || '(sin título)'}
                  </h3>
                  <p className="mt-1 text-xs text-white/45">
                    {r.dueno || 'sin dueño'} · {r.estado} · impacto {r.impacto}
                  </p>
                  {r.accion && (
                    <p className="mt-1.5 text-xs leading-relaxed text-white/70">
                      <span className="text-white/40">→ </span>
                      {r.accion}
                    </p>
                  )}
                </article>
              );
            })}
            {raidTop3.length === 0 && (
              <p className="rounded-xl border border-dashed border-white/15 px-4 py-6 text-center text-sm text-white/40 sm:col-span-3">
                Nada abierto en el RAID.
              </p>
            )}
          </div>
        </section>

        {/* ── Issues per state ────────────────────────────────────────── */}
        <section>
          <h2 className="mb-1 font-serif text-2xl text-white">
            Issues per state <span className="text-white/40">· {sprint.nombre}</span>
          </h2>
          <p className="mb-3 text-xs text-white/40">
            Las historias del sprint vigente, agrupadas por su estado efectivo — el mismo que
            manda en el filtro de Historias, más abajo.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[360px] text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-white/35">
                  <th className="py-2 pl-3 pr-2 font-normal">Estado</th>
                  <th className="py-2 pr-3 text-right font-normal">Historias</th>
                </tr>
              </thead>
              <tbody>
                {porEstadoSprint.map((f) => (
                  <tr key={f.estado} className="border-t border-white/10">
                    <td className="py-2.5 pl-3 pr-2 text-white/80" style={{ borderLeft: `3px solid ${TONO[f.estado]}` }}>
                      {f.estado}
                    </td>
                    <td className="py-2.5 pr-3 text-right font-mono tabular-nums text-white/90">
                      {f.total}
                    </td>
                  </tr>
                ))}
                <tr className="border-t border-white/15 bg-white/[0.03]">
                  <td className="py-2.5 pl-3 pr-2 font-medium text-white">Total</td>
                  <td className="py-2.5 pr-3 text-right font-mono tabular-nums font-medium text-white">
                    {totalSprint}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Historias ───────────────────────────────────────────────── */}
        <Historias historias={SNAPSHOT.historias} overlay={overlay} cfg={cfg} fijar={fijarHistoria} />

        {/* ── PRs ─────────────────────────────────────────────────────── */}
        {SNAPSHOT.prs.length > 0 && (
          <section>
            <h2 className="mb-3 font-serif text-2xl text-white">
              Esperando revisión <span className="text-white/40">· {SNAPSHOT.prs.length}</span>
            </h2>
            <ul className="space-y-1.5">
              {SNAPSHOT.prs.map((pr) => {
                const dias = Math.floor((Date.now() - Date.parse(pr.tocada)) / 86_400_000);
                const cc = pr.aprobado ? COLOR_RAG.v : dias > 3 ? COLOR_RAG.r : COLOR_RAG.a;
                return (
                  <li
                    key={pr.numero}
                    className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5"
                    style={{ borderLeft: `3px solid ${cc}` }}
                  >
                    <span className="font-mono text-xs text-white/35">#{pr.numero}</span>
                    <a
                      href={pr.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mr-auto min-w-0 flex-1 truncate text-sm text-white/90 underline-offset-2 hover:underline"
                    >
                      {pr.titulo}
                    </a>
                    <span className="text-xs text-white/45">{nombreDe(pr.autor ?? '—', cfg)}</span>
                    <span className="text-xs" style={{ color: cc }}>
                      {pr.borrador ? 'borrador' : pr.aprobado ? 'aprobado' : `${dias} d sin tocar`}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {/* ── El producto ─────────────────────────────────────────────── */}
        <Producto />

        {/* ── La lectura ──────────────────────────────────────────────── */}
        <section>
          <h2 className="mb-2 font-serif text-2xl text-white">La lectura</h2>
          <p className="mb-2 text-xs text-white/40">
            Lo que dirías en la daily. Se guarda solo; es lo único de esta página que no se calcula.
          </p>
          <textarea
            value={overlay.nota_general}
            onChange={(e) => fijarNotaGeneral(e.target.value)}
            rows={4}
            disabled={cargando}
            placeholder="¿Dónde está parado el programa hoy, y qué decisión necesita?"
            className="w-full resize-y rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3 text-sm leading-relaxed text-white outline-none placeholder:text-white/30 focus-visible:ring-2 focus-visible:ring-[#2175a1] disabled:opacity-50"
          />
        </section>

        {/* ── Los artefactos ──────────────────────────────────────────── */}
        <section>
          <h2 className="mb-1 font-serif text-2xl text-white">Los artefactos</h2>
          <p className="mb-2.5 text-xs leading-relaxed text-white/40">
            La etiqueta dice de dónde sale cada uno. No es decoración: cambia cuánto hay que
            desconfiar de lo que se lee.
          </p>
          <ul className="space-y-1.5">
            {ARTEFACTOS.map((a) => (
              <li key={a.slug}>
                <a
                  href={`${base}/${a.slug}`}
                  className="group block rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 transition-colors hover:border-[#2175a1]/60"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-serif text-base text-white group-hover:text-[#7ec1e8]">
                      {a.titulo}
                    </h3>
                    <span
                      className="shrink-0 cursor-help text-[10px] uppercase tracking-wide text-white/30"
                      title={FRESCURA[a.frescura].detalle}
                    >
                      {FRESCURA[a.frescura].etiqueta}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs italic leading-relaxed text-white/40">«{a.pregunta}»</p>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* ── RAID completo ───────────────────────────────────────────── */}
        <Raid entradas={overlay.raid} cargando={cargando} guardar={guardarRaid} borrar={borrarRaid} />
      </div>
    </Marco>
  );
}
