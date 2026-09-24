'use client';

import { useMemo } from 'react';
import prtechSnapshot from '@/lib/programa/data/prtech.json';
import fidelidappSnapshot from '@/lib/programa/data/fidelidapp.json';
import { ARTEFACTOS, FRESCURA } from '@/lib/programa/artefactos';
import { CONFIGS } from '@/lib/programa/config';
import { useOverlay } from '@/lib/programa/useOverlay';
import {
  COLOR_RAG,
  bloqueada,
  estadoEfectivo,
  hecha,
  leer,
  nombreDe,
  rag,
  sprintVigente,
  type Rag,
} from '@/lib/programa/derivar';
import { producto } from '@/lib/programa/metricas';
import type { Snapshot } from '@/lib/programa/tipos';
import { Marco } from './Marco';

// Un snapshot por programa — ver la nota en Marco.tsx sobre por qué es un
// mapa estático y no un import dinámico.
const SNAPSHOTS: Record<string, Snapshot> = {
  prtech: prtechSnapshot as unknown as Snapshot,
  fidelidapp: fidelidappSnapshot as unknown as Snapshot,
};

/**
 * `producto()` (Corpus, Medios activos, Se llena el plan) y "Los artefactos"
 * salen de `prtech.metricas.json` y de una lista de documentos escrita a
 * mano para PR Tech — no existen para otro programa. Se ocultan en vez de
 * mostrarse con números de otro proyecto disfrazados de Fidelidapp.
 */

function Kpi({
  titulo,
  valor,
  pie,
  estado,
  href,
}: {
  titulo: string;
  valor: string;
  pie: string;
  estado: Rag;
  href?: string;
}) {
  const c = COLOR_RAG[estado];
  const Tag = (href ? 'a' : 'div') as 'a';
  return (
    <Tag
      href={href}
      className={`rounded-xl border border-white/10 bg-white/[0.03] p-3 ${href ? 'transition-colors hover:border-white/25' : ''}`}
      style={{ borderLeft: `3px solid ${c}` }}
    >
      <p className="text-[11px] leading-tight text-white/45">{titulo}</p>
      <p className="mt-0.5 font-serif text-2xl tabular-nums" style={{ color: c }}>
        {valor}
      </p>
      <p className="text-[11px] leading-tight text-white/35">{pie}</p>
    </Tag>
  );
}

export default function Repositorio({ llave, slug = 'prtech' }: { llave: string; slug?: string }) {
  const esPrtech = slug === 'prtech';
  const SNAP = SNAPSHOTS[slug];
  const cfg = CONFIGS[slug];
  const { overlay, fijarNotaGeneral, cargando } = useOverlay(slug);
  const lectura = leer(SNAP, overlay, cfg);
  const sprint = sprintVigente(cfg);
  const prod = esPrtech ? producto() : null;
  const c = COLOR_RAG[lectura.estado];
  const base = esPrtech ? `/programa/${llave}` : `/programa/${llave}/${slug}`;

  const foco = useMemo(
    () => SNAP.historias.filter((h) => h.fase === cfg.fase_foco),
    [SNAP, cfg.fase_foco],
  );

  // Lo que necesita a alguien. Un board que solo muestra progreso no sirve
  // para correr una daily: lo que se decide son los bloqueos.
  const atencion = useMemo(() => {
    const items: Array<{ clave: string; que: string; detalle: string; estado: Rag; href?: string }> = [];

    for (const h of foco.filter((x) => bloqueada(x, overlay))) {
      items.push({
        clave: `b-${h.numero}`,
        que: `#${h.numero} bloqueada`,
        detalle: overlay.historias[String(h.numero)]?.bloqueo || h.titulo,
        estado: 'r',
        href: h.url,
      });
    }
    for (const pr of SNAP.prs.filter((p) => !p.borrador)) {
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
  }, [SNAP, foco, overlay, cfg]);

  const personas = useMemo(
    () =>
      Object.entries(cfg.equipo)
        .map(([login, nombre]) => {
          const suyas = SNAP.historias.filter((h) => h.asignados.includes(login));
          const abiertas = suyas.filter((h) => !hecha(h, overlay));
          const enCurso = abiertas.filter((h) => estadoEfectivo(h, overlay) === 'En curso');
          const prs = SNAP.prs.filter((p) => p.autor === login);
          return { login, nombre, abiertas, enCurso: enCurso.length, prs: prs.length };
        })
        .sort((a, b) => b.abiertas.length - a.abiertas.length),
    [SNAP, cfg.equipo, overlay],
  );

  return (
    <Marco llave={llave} slug={slug} activo={null}>
      <div className="space-y-6">
        {/* ── La fila de arriba ───────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          <Kpi
            titulo="Fase 1"
            valor={`${lectura.pct}%`}
            pie={`${lectura.hechas} de ${lectura.total} historias`}
            estado={rag(lectura.pct - lectura.transcurrido, -10, -25)}
            href={esPrtech ? `${base}/fase-1` : undefined}
          />
          <Kpi
            titulo={sprint.nombre}
            valor={`${lectura.transcurrido}%`}
            pie="del sprint corrido"
            estado="a"
            href={esPrtech ? `${base}/scrum` : undefined}
          />
          <Kpi
            titulo="Esperando revisión"
            valor={String(SNAP.prs.length)}
            pie={SNAP.prs.length === 1 ? 'pull request' : 'pull requests'}
            estado={rag(SNAP.prs.length, 1, 3, true)}
            href={esPrtech ? `${base}/scrum` : undefined}
          />
          {/* Corpus / Medios activos / Se llena el plan: números de PR Tech
              (prtech.metricas.json). Fidelidapp no tiene su equivalente todavía —
              se ocultan en vez de mostrar el dato de otro programa. */}
          {esPrtech && prod && (
            <>
              <Kpi
                titulo="Corpus"
                valor={prod.grupos[0].numeros.find((n) => n.clave === 'unicos')?.valor ?? '—'}
                pie="artículos únicos"
                estado="v"
                href={`${base}/scrum`}
              />
              <Kpi
                titulo="Medios activos"
                valor={prod.grupos[0].numeros.find((n) => n.clave === 'medios')?.valor ?? '—'}
                pie="fuentes que traen"
                estado={prod.grupos[0].numeros.find((n) => n.clave === 'medios')?.estado ?? 'a'}
                href={`${base}/scrum`}
              />
              <Kpi
                titulo="Se llena el plan"
                valor={prod.saturacion ? `${prod.saturacion.diasDesdeHoy} d` : '—'}
                pie={
                  prod.saturacion ? `${prod.saturacion.mbPorDia.toFixed(1)} MB/día` : 'sin medición'
                }
                estado={prod.saturacion ? rag(prod.saturacion.diasDesdeHoy, 30, 14) : 'a'}
                href={`${base}/scrum`}
              />
            </>
          )}
        </div>

        {/* ── El semáforo y la lectura ────────────────────────────────── */}
        <section
          className="rounded-2xl border p-5"
          style={{ borderColor: `${c}55`, background: `${c}14` }}
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="inline-block h-3 w-3 rounded-full" style={{ background: c }} />
            <h1 className="font-serif text-2xl sm:text-3xl" style={{ color: c }}>
              {lectura.titulo}
            </h1>
            {esPrtech && (
              <a
                href={`${base}/scrum`}
                className="ml-auto text-xs text-white/40 underline-offset-2 hover:underline"
              >
                por qué ese color →
              </a>
            )}
          </div>
          <p className="mt-1.5 text-sm text-white/60">
            <strong className="font-medium text-white/80">{sprint.nombre}</strong> · {sprint.meta}
          </p>
          <textarea
            value={overlay.nota_general}
            onChange={(e) => fijarNotaGeneral(e.target.value)}
            rows={3}
            disabled={cargando}
            placeholder="La lectura del programa hoy: ¿dónde está parado, y qué decisión necesita?"
            className="mt-3 w-full resize-y rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm leading-relaxed text-white outline-none placeholder:text-white/30 focus-visible:ring-2 focus-visible:ring-[#2175a1] disabled:opacity-50"
          />
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          {/* ── Lo que necesita a alguien ─────────────────────────────── */}
          <section>
            <h2 className="mb-1 font-serif text-2xl text-white">
              Necesita a alguien <span className="text-white/40">· {atencion.length}</span>
            </h2>
            <p className="mb-2.5 text-xs text-white/40">
              Bloqueos, PRs esperando y lo abierto de impacto alto. Un board que solo muestra
              progreso no sirve para correr una daily: lo que se decide son los bloqueos.
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

          <div className="space-y-6">
            {/* ── Quién tiene qué ─────────────────────────────────────── */}
            <section>
              <h2 className="mb-2.5 font-serif text-2xl text-white">Quién tiene qué</h2>
              <ul className="space-y-1.5">
                {personas.map((p) => (
                  <li
                    key={p.login}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-serif text-lg text-white">{p.nombre}</h3>
                      <span className="text-xs tabular-nums text-white/40">
                        {p.abiertas.length} abierta{p.abiertas.length === 1 ? '' : 's'}
                      </span>
                    </div>
                    <p className="text-[11px] text-white/35">
                      {p.enCurso > 0 ? `${p.enCurso} en curso` : 'nada marcado en curso'}
                      {p.prs > 0 && ` · ${p.prs} PR abierto${p.prs === 1 ? '' : 's'}`}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            {/* ── Los artefactos ──────────────────────────────────────── */}
            {/* Roadmap/charter/pipeline/scrum son documentos de PR Tech escritos
                a mano. Fidelidapp no tiene sus equivalentes todavía. */}
            {esPrtech && (
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
                        <p className="mt-0.5 text-xs italic leading-relaxed text-white/40">
                          «{a.pregunta}»
                        </p>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    </Marco>
  );
}
