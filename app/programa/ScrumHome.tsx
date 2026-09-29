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
  bloqueada,
  hecha,
  leer,
  nombreDe,
  serie,
  sprintVigente,
  type Rag,
} from '@/lib/programa/derivar';
import type { Overlay, Snapshot } from '@/lib/programa/tipos';
import { Grafico } from './Grafico';
import { Historias } from './Historias';
import { Marco } from './Marco';
import { Producto } from './Producto';
import { Raid } from './Raid';

const SNAPSHOT = snapshotPrtech as unknown as Snapshot;
const SEMILLA = semillaPrtech as unknown as Pick<Overlay, 'raid' | 'nota_general'>;
const SLUG = 'prtech';

/**
 * El home de PR Tech, fusionado con el Scrum Board (28-sep-2026, a pedido de
 * Álvaro). Antes eran dos páginas con tres cosas repetidas — la nota del día,
 * el resumen por persona, el estado del producto — con el riesgo de que una
 * se desactualizara sin que nadie lo notara. Ahora hay una fuente por dato.
 *
 * Lo único que sobrevive del Repositorio viejo es "Necesita a alguien"
 * (arriba, es lo que abre la daily) y "Los artefactos" (abajo, es la salida
 * hacia el resto de los documentos). El resto — KPI row y "Quién tiene qué"
 * de la home vieja — se descartó por duplicado: Avance y los 7 criterios ya
 * dicen lo mismo con más detalle.
 *
 * `/scrum` ya no es una ruta — public/_redirects la manda acá con un 301.
 * Antes servía este mismo componente por partida doble (dos URLs, un
 * contenido); un redirect real es la versión consolidada de eso, y de paso
 * el link ya compartido en Slack sigue resolviendo a algo.
 */
export default function ScrumHome({ llave }: { llave: string }) {
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

  // Lo que necesita a alguien. Un board que solo muestra progreso no sirve
  // para correr una daily: lo que se decide son los bloqueos. Va primero —
  // es lo que se mira antes que cualquier gráfico.
  const atencion = useMemo(() => {
    const items: Array<{ clave: string; que: string; detalle: string; estado: Rag; href?: string }> = [];

    for (const h of deFase.filter((x) => bloqueada(x, overlay))) {
      items.push({
        clave: `b-${h.numero}`,
        que: `#${h.numero} bloqueada`,
        detalle: overlay.historias[String(h.numero)]?.bloqueo || h.titulo,
        estado: 'r',
        href: h.url,
      });
    }
    for (const pr of SNAPSHOT.prs.filter((p) => !p.borrador)) {
      const dias = Math.floor((Date.now() - Date.parse(pr.tocada)) / 86_400_000);
      items.push({
        clave: `pr-${pr.numero}`,
        que: `PR #${pr.numero} ${pr.aprobado ? 'aprobado, sin mergear' : 'esperando revisión'}`,
        detalle: `${pr.titulo} · ${nombreDe(pr.autor ?? '—', cfg)} · ${dias} d sin tocar`,
        estado: pr.aprobado ? 'a' : dias > 3 ? 'r' : 'a',
        href: pr.url,
      });
    }
    for (const r of overlay.raid.filter(
      (x) => x.impacto === 'alto' && x.estado !== 'cerrado' && (x.tipo === 'R' || x.tipo === 'I'),
    )) {
      items.push({ clave: r.id, que: `${r.id} · ${r.titulo}`, detalle: r.accion || r.detalle, estado: 'r' });
    }
    for (const d of overlay.raid.filter(
      (x) => x.tipo === 'D' && !['cerrado', 'en revisión'].includes(x.estado),
    )) {
      items.push({ clave: d.id, que: `${d.id} · ${d.titulo}`, detalle: d.detalle, estado: 'a' });
    }
    return items.sort((a, b) => (a.estado === 'r' ? -1 : 1) - (b.estado === 'r' ? -1 : 1));
  }, [deFase, overlay, cfg]);

  const c = COLOR_RAG[lectura.estado];
  const base = `/programa/${llave}`;

  return (
    <Marco llave={llave} activo={null}>
      <div className="space-y-10">
        {/* ── Necesita a alguien ──────────────────────────────────────── */}
        <section>
          <h2 className="mb-1 font-serif text-2xl text-white">
            Necesita a alguien <span className="text-white/40">· {atencion.length}</span>
          </h2>
          <p className="mb-2.5 text-xs text-white/40">
            Bloqueos, PRs esperando y lo abierto de impacto alto. Esto es lo que se mira antes que
            cualquier gráfico de abajo.
          </p>
          <ul className="space-y-1.5">
            {atencion.map((a) => {
              const cc = COLOR_RAG[a.estado];
              const Tag = (a.href ? 'a' : 'div') as 'a';
              return (
                <li key={a.clave}>
                  <Tag
                    href={a.href}
                    target={a.href ? '_blank' : undefined}
                    rel={a.href ? 'noreferrer' : undefined}
                    className={`block rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 ${a.href ? 'transition-colors hover:border-white/25' : ''}`}
                    style={{ borderLeft: `3px solid ${cc}` }}
                  >
                    <p className="text-sm text-white/90">{a.que}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-white/45">{a.detalle}</p>
                  </Tag>
                </li>
              );
            })}
            {atencion.length === 0 && (
              <li className="rounded-xl border border-dashed border-white/15 px-3 py-6 text-center text-sm text-white/40">
                Nada esperando a nadie.
              </li>
            )}
          </ul>
        </section>

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
          <h2 className="mb-1 font-serif text-2xl text-white">
            Por qué ese color <span style={{ color: c }}>· {NOMBRE_RAG[lectura.estado]}</span>
          </h2>
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

        {/* ── El producto ─────────────────────────────────────────────── */}
        <Producto />

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
        <Raid entradas={overlay.raid} cargando={cargando} guardar={guardarRaid} borrar={borrarRaid} />

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
      </div>
    </Marco>
  );
}
