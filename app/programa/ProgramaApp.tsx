'use client';

import { useEffect, useMemo, useRef } from 'react';
import snapshotPrtech from '@/lib/programa/data/prtech.json';
import semillaPrtech from '@/lib/programa/data/prtech.semilla.json';
import { CONFIGS } from '@/lib/programa/config';
import { useOverlay } from '@/lib/programa/useOverlay';
import {
  COLOR_RAG,
  NOMBRE_RAG,
  antiguedad,
  hecha,
  leer,
  nombreDe,
  serie,
  sprintVigente,
} from '@/lib/programa/derivar';
import type { Overlay, Snapshot } from '@/lib/programa/tipos';
import { Grafico } from './Grafico';
import { Historias } from './Historias';
import { Raid } from './Raid';

const SNAPSHOT = snapshotPrtech as unknown as Snapshot;
const SEMILLA = semillaPrtech as unknown as Pick<Overlay, 'raid' | 'nota_general'>;
const SLUG = 'prtech';

export default function ProgramaApp() {
  const cfg = CONFIGS[SLUG];
  const {
    overlay,
    cargando,
    respaldo,
    guardando,
    fijarHistoria,
    fijarNotaGeneral,
    guardarRaid,
    borrarRaid,
    sembrar,
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

  const c = COLOR_RAG[lectura.estado];

  return (
    <main className="min-h-dvh bg-main text-white">
      <div className="mx-auto max-w-5xl space-y-10 px-4 py-8 sm:px-6 sm:py-12">
        {/* ── Cabecera ────────────────────────────────────────────────── */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-xs uppercase tracking-[0.2em] text-white/35">Villelabs · Programa</span>
            <h1 className="font-serif text-3xl text-white sm:text-4xl">{SNAPSHOT.nombre}</h1>
            <a
              href={`https://github.com/${SNAPSHOT.repo}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-white/35 underline-offset-2 hover:text-white/60 hover:underline"
            >
              {SNAPSHOT.repo} ↗
            </a>
          </div>

          <div
            className="rounded-2xl border p-5"
            style={{ borderColor: `${c}55`, background: `${c}14` }}
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="inline-block h-3 w-3 rounded-full" style={{ background: c }} />
              <h2 className="font-serif text-2xl" style={{ color: c }}>
                {lectura.titulo}
              </h2>
              <span className="text-sm text-white/50">
                {cfg.fase_foco} · {lectura.hechas} de {lectura.total} historias · {lectura.pct}%
              </span>
            </div>
            <p className="mt-1.5 text-sm text-white/60">
              <strong className="font-medium text-white/80">{sprint.nombre}</strong> · {sprint.meta}{' '}
              <span className="text-white/40">
                ({sprint.desde.slice(5)} → {sprint.hasta.slice(5)}, {lectura.transcurrido}% corrido)
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/35">
            <span>Datos de GitHub: {antiguedad(SNAPSHOT.generado)}</span>
            <span>·</span>
            <span>
              {respaldo === 'firestore' ? 'Notas y estados sincronizados' : 'Notas guardadas solo en este navegador'}
              {guardando && ' · guardando…'}
            </span>
            <span>·</span>
            <code className="rounded bg-white/5 px-1.5 py-0.5 text-white/45">npm run programa:sync</code>
            <span className="text-white/25">para refrescar GitHub</span>
          </div>
        </header>

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

        {/* ── Por qué ese color ───────────────────────────────────────── */}
        <section>
          <h2 className="mb-1 font-serif text-2xl text-white">Por qué ese color</h2>
          <p className="mb-3 text-xs text-white/40">
            Los siete criterios con su umbral. Un RAG cuyo criterio no se puede auditar es decoración.
            El color del programa es el peor de estos, nunca el promedio.
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {lectura.criterios.map((k) => {
              const cc = COLOR_RAG[k.estado];
              return (
                <div
                  key={k.clave}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
                  style={{ borderLeft: `3px solid ${cc}` }}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-sm font-medium text-white/85">{k.titulo}</h3>
                    <span className="shrink-0 text-[10px] uppercase tracking-wide" style={{ color: cc }}>
                      {NOMBRE_RAG[k.estado]}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-white/65">{k.valor}</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/35">{k.regla}</p>
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

        {/* ── Historias ───────────────────────────────────────────────── */}
        <Historias historias={SNAPSHOT.historias} overlay={overlay} cfg={cfg} fijar={fijarHistoria} />

        {/* ── RAID ────────────────────────────────────────────────────── */}
        <Raid entradas={overlay.raid} guardar={guardarRaid} borrar={borrarRaid} />

        <footer className="border-t border-white/10 pt-5 text-xs leading-relaxed text-white/30">
          Herramienta interna de Villelabs. Lo que viene de GitHub es de solo lectura y se refresca
          con <code className="text-white/45">npm run programa:sync</code>; los estados, las notas y
          el RAID se escriben acá y viven aparte, así un sync nunca pisa una nota.
        </footer>
      </div>
    </main>
  );
}
