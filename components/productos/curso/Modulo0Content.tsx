'use client';

/*
 * /curso/modulo-0 — Módulo 0 «El mapa» del curso «El sistema de tu negocio: tu primer CRM y ERP en Google Sheets».
 * Módulo de muestra (gratis con el correo) y primer módulo de quien compra. 4 lecciones + portada del sistema imprimible.
 * v1.1 (8-nov-2026): la lección 3 pasa del esqueleto del asistente a la planilla base con la ficha del negocio.
 * Todo el avance (diagnóstico, reglas, ficha, checklist, nombre del negocio) vive en localStorage.
 */

import Link from 'next/link';
import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Download, Plus, Printer, RotateCcw, Trash2 } from 'lucide-react';
import { LINKS } from '@/lib/productos/links';
import {
  AREAS,
  CASO,
  CLAVES_STORAGE,
  IA_OPCIONAL,
  LECCIONES_M0,
  MODULOS,
  QUE_ES,
  OPCIONES_DIAGNOSTICO,
  PREGUNTAS,
  REGLAS_FRENO,
  TEXTO_SEMAFORO,
  calcularResultado,
  textoPrecio,
  type AreaId,
  type LeccionM0,
  type ReglaFreno,
  type Respuesta,
} from '@/lib/productos/curso/curso';
import { useMontado, usePersistido } from '@/lib/productos/curso/persistencia';
import { FOTOS } from '@/lib/productos/fotos';
import { APOYO, type ImagenApoyo } from '@/lib/productos/apoyo';
import { DiagramaPlanillaSistema, DiagramaQuienDecide, DiagramaSemaforo } from '@/components/productos/diagramas/curso';
import { trackCursoClickCompra } from '@/lib/productos/curso/tracking';
import SiguientePaso from '@/components/productos/SiguientePaso';
import { Foto, Kicker, PuntoSemaforo, VideoProximamente } from './piezas';
import { VideoMarco, type VideoId } from '@/components/productos/VideoProducto';
import { Pantallita } from '@/components/productos/Pantallita';
import { VERSION_CURSO, fechaLarga } from '@/lib/productos/curso/versiones';
import { DescargaPlantilla, useFicha } from './Plantilla';
import { PromptsIA } from './leccion';
import { hotmartConUtm } from '@/lib/productos/utm';
import type { ProductoFicha } from '@/lib/productos/curso/plantilla';

// Foto de apoyo por lección (portada del video mientras se graba). Rotan looks; sin polera blanca.
const FOTO_LECCION: Record<string, { foto: keyof typeof FOTOS; posicion?: string }> = {
  mapa: { foto: 'trabajando', posicion: 'center 35%' },
  diagnostico: { foto: 'pizarra', posicion: 'center 30%' },
  planilla: { foto: 'escritorio', posicion: 'center 30%' },
  reglas: { foto: 'podcasterCerca', posicion: 'center 30%' },
};

// Imagen de apoyo por área en el mapa (regla 20/80, 8-nov-2026): lo que se ordena en cada una.
const FOTO_AREA: Record<AreaId | 'centro', ImagenApoyo> = {
  ventas: APOYO.cafeteria,
  marketing: APOYO.contenidoTripode,
  operacion: APOYO.cajasDespacho,
  atencion: APOYO.celularMensajes,
  finanzas: APOYO.finanzas,
  centro: APOYO.tableroLaptop,
};

type EstadoReglas = { elegidas: string[]; textos: Record<string, string>; propias: ReglaFreno[] };

const RESPUESTAS_INICIALES: Record<string, Respuesta> = {};
const REGLAS_INICIALES: EstadoReglas = { elegidas: [], textos: {}, propias: [] };
const CHECKLIST_INICIAL: Record<string, boolean> = {};
const NEGOCIO_INICIAL = '';

const TOTAL_CHECKS = LECCIONES_M0.reduce((s, l) => s + l.checklist.length, 0);

// ─── Una lección por pantalla ─────────────────────────────────────────────
// Páginas 0–3 = lecciones 1–4; página 4 = portada del tablero + siguiente paso.
// La página actual vive en el hash (#leccion-2, #portada: se puede compartir) y en localStorage.
// Los elementos no usan esos ids, así que cambiar el hash no salta a un ancla.
const PAGINA_PORTADA = LECCIONES_M0.length;
const CLAVE_PAGINA = 'villelab_curso_m0_pagina';
const PAGINA_INICIAL = -1;

const hashDe = (pagina: number) => (pagina >= PAGINA_PORTADA ? '#portada' : `#leccion-${pagina + 1}`);

function paginaDesdeHash(hash: string): number | null {
  if (hash === '#portada') return PAGINA_PORTADA;
  const m = /^#leccion-(\d)$/.exec(hash);
  if (!m) return null;
  const n = Number(m[1]) - 1;
  return n >= 0 && n < PAGINA_PORTADA ? n : null;
}

function suscribirHash(cb: () => void) {
  window.addEventListener('hashchange', cb);
  return () => window.removeEventListener('hashchange', cb);
}

function useHash() {
  return useSyncExternalStore(suscribirHash, () => window.location.hash, () => '');
}

function NavLeccion({ pagina, ir }: { pagina: number; ir: (p: number) => void }) {
  const siguiente = pagina + 1 < PAGINA_PORTADA ? `Siguiente lección: ${LECCIONES_M0[pagina + 1].titulo}` : 'Ver la portada de tu tablero';
  return (
    <div className="mt-10 flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
      {pagina > 0 ? (
        <button type="button" onClick={() => ir(pagina - 1)} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-sm text-slate-300 hover:border-white/30">
          <ArrowLeft className="h-4 w-4" aria-hidden /> Anterior
        </button>
      ) : (
        <span className="hidden sm:block" />
      )}
      {pagina < PAGINA_PORTADA ? (
        <button type="button" onClick={() => ir(pagina + 1)} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#FF3D8B] px-6 text-center text-sm font-semibold text-white hover:bg-[#ff5c9f]">
          {siguiente} <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
        </button>
      ) : null}
    </div>
  );
}

// ─── Piezas ────────────────────────────────────────────────────────────────

function Checklist({ leccion, checks, onToggle }: { leccion: LeccionM0; checks: Record<string, boolean>; onToggle: (id: string) => void }) {
  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">Antes de seguir</p>
      <ul className="mt-3 space-y-1">
        {leccion.checklist.map((c) => {
          const hecho = !!checks[c.id];
          return (
            <li key={c.id}>
              <button
                type="button"
                role="checkbox"
                aria-checked={hecho}
                onClick={() => onToggle(c.id)}
                className="flex min-h-[44px] w-full items-center gap-3 rounded-lg px-1 text-left text-slate-200 hover:bg-white/[0.03]"
              >
                <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${hecho ? 'border-[#2175a1] bg-[#2175a1]' : 'border-white/30'}`}>
                  {hecho ? <Check className="h-3.5 w-3.5 text-white" aria-hidden /> : null}
                </span>
                <span className={hecho ? 'text-slate-400 line-through decoration-slate-600' : ''}>{c.texto}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function CabeceraLeccion({ leccion }: { leccion: LeccionM0 }) {
  return (
    <>
      <Kicker>Lección {leccion.numero} de 4</Kicker>
      <h2 className="mt-3 font-serif text-3xl leading-tight text-white sm:text-4xl">{leccion.titulo}</h2>
      <p className="mt-3 max-w-2xl text-slate-300">{leccion.bajada}</p>
      <div className="mt-6">
        {VIDEO_LECCION[leccion.id] ? (
          <>
            <VideoMarco id={VIDEO_LECCION[leccion.id]!.id} titulo={leccion.titulo} duracion={VIDEO_LECCION[leccion.id]!.duracion} />
            {VIDEO_LECCION[leccion.id]!.nota ? <NotaVideo>{VIDEO_LECCION[leccion.id]!.nota}</NotaVideo> : null}
          </>
        ) : (
          <VideoProximamente
            titulo={leccion.titulo}
            foto={FOTOS[FOTO_LECCION[leccion.id]?.foto ?? 'explicando']}
            posicion={FOTO_LECCION[leccion.id]?.posicion}
          />
        )}
      </div>
    </>
  );
}

// Videos de las lecciones (8-nov-2026). Si una lección no tiene video, queda el marcador «Video próximamente».
// v09, v11, v12 y v13 se regrabaron con el enfoque v1.1 (CRM y ERP en Google Sheets) el 8-nov-2026; la nota queda
// disponible por si un video vuelve a quedar desalineado con el producto.
const VIDEO_LECCION: Partial<Record<string, { id: VideoId; duracion: string; nota?: string }>> = {
  mapa: { id: 'v09-m0-l1', duracion: '57 s' },
  diagnostico: { id: 'v10-m0-l2', duracion: '27 s' },
  planilla: { id: 'v11-m0-l3', duracion: '33 s' },
  reglas: { id: 'v12-m0-l4', duracion: '35 s' },
};

function NotaVideo({ children }: { children: React.ReactNode }) {
  return <p className="mt-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs leading-relaxed text-slate-400">{children}</p>;
}

// ─── Lección 1 · Mapa interactivo ─────────────────────────────────────────

const POSICION_MAPA: Record<AreaId, string> = {
  ventas: 'col-start-1 row-start-1',
  marketing: 'col-start-2 row-start-1',
  operacion: 'col-start-3 row-start-1',
  atencion: 'col-start-3 row-start-2',
  finanzas: 'col-start-1 row-start-2',
};

function MapaAreas() {
  const [sel, setSel] = useState<AreaId | 'centro'>('ventas');
  const area = AREAS.find((a) => a.id === sel);

  return (
    <div className="mt-8">
      <div className="space-y-3 text-slate-300">
        <p>
          Si el precio está en tu cabeza, cada cotización te espera. Si el despacho se coordina de memoria, cada pedido te espera. Si nadie sabe qué reclamo puede resolver solo, todos llegan a tu celular.
        </p>
        <p>
          El problema no es tu equipo ni la falta de tiempo: es que <strong className="font-semibold text-white">nada está anotado en un solo lugar</strong>. Tus clientes viven en el WhatsApp, los pedidos en tu memoria y lo que te deben en un cuaderno. Ordenar es juntar todo eso en una planilla, con reglas claras de quién anota qué.
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5fb2dd]">CRM</p>
          <p className="mt-1 text-slate-100">Es {QUE_ES.crm}</p>
          <p className="mt-1 text-sm text-slate-400">En tu planilla: la hoja Clientes (módulo 1).</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5fb2dd]">ERP</p>
          <p className="mt-1 text-slate-100">Es {QUE_ES.erp}</p>
          <p className="mt-1 text-sm text-slate-400">En tu planilla: todas las hojas juntas, con el tablero (módulo 6).</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-slate-400">No vas a instalar un software: es una planilla de Google Sheets bien armada, más rutinas cortas. Cada módulo le agrega una hoja.</p>

      <p className="mt-8 text-sm text-slate-400">Toca cada pieza para ver qué se ordena ahí, qué hoja le toca y qué pasa si no.</p>
      <div className="mt-3 grid grid-cols-3 grid-rows-2 gap-2 sm:gap-3">
        {AREAS.map((a) => {
          const activa = sel === a.id;
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => setSel(a.id)}
              aria-pressed={activa}
              className={`${POSICION_MAPA[a.id]} flex min-h-[84px] flex-col items-start justify-between rounded-xl border p-2.5 text-left transition sm:min-h-[104px] sm:p-4 ${
                activa ? 'border-[#5fb2dd] bg-[#2175a1]/25 shadow-accent' : 'border-white/10 bg-white/[0.03] hover:border-white/25'
              }`}
            >
              <span className="font-mono text-[10px] text-[#5fb2dd] sm:text-xs">Mód. {a.modulo} · {a.hoja === 'Cobranza y Caja' ? 'Cobranza' : a.hoja}</span>
              <span className="text-[13px] font-medium leading-tight text-white sm:text-base">{a.nombre}</span>
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setSel('centro')}
          aria-pressed={sel === 'centro'}
          className={`col-start-2 row-start-2 flex min-h-[84px] flex-col items-center justify-center rounded-full border border-dashed p-2 text-center transition sm:min-h-[104px] ${
            sel === 'centro' ? 'border-[#5fb2dd] bg-[#5fb2dd]/15' : 'border-white/20 hover:border-white/40'
          }`}
        >
          <span className="text-[12px] leading-tight text-slate-200 sm:text-sm">Tablero + reglas de freno</span>
        </button>
      </div>
      <p className="mt-3 text-center font-mono text-[11px] text-slate-500">
        clientes → origen → pedidos → atención → cobranza y caja → tablero
      </p>

      <div className="mt-5 rounded-2xl border border-[#2175a1]/40 bg-[#2175a1]/[0.07] p-5 sm:p-6" aria-live="polite">
        <figure className="relative -mx-5 -mt-5 mb-5 aspect-[16/7] overflow-hidden rounded-t-2xl sm:-mx-6 sm:-mt-6">
          <Foto key={sel} foto={FOTO_AREA[sel]} posicion={sel === 'centro' ? 'center 35%' : 'center'} />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/60 to-transparent" />
        </figure>
        {area ? (
          <>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5fb2dd]">Módulo {area.modulo} · hoja {area.hoja}</p>
            <h3 className="mt-1 font-serif text-2xl text-white">{area.nombre}</h3>
            <p className="text-sm text-slate-400">{area.corto}</p>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-wider text-[#5fb2dd]">Qué se ordena aquí</dt>
                <dd className="mt-1 text-slate-200">{area.seOrdena}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-slate-400">Si no se ordena</dt>
                <dd className="mt-1 text-slate-300">{area.siNo}</dd>
              </div>
              <div>
                <dt className="sr-only">En {CASO.nombre}</dt>
                <dd>
                  <Pantallita titulo={`En ${CASO.nombre}`}>{area.enGranoNorte}</Pantallita>
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-slate-400">Cómo se conecta</dt>
                <dd className="mt-1 text-slate-300">{area.pasaA}</dd>
              </div>
            </dl>
          </>
        ) : (
          <>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5fb2dd]">Al centro · módulo 6, y lecciones 3 y 4 de hoy</p>
            <h3 className="mt-1 font-serif text-2xl text-white">El tablero y las reglas de freno</h3>
            <p className="mt-3 text-slate-300">
              Las cinco hojas parten de lo mismo: qué vendes, a quién y a qué precio (la ficha del negocio, lección 3), y qué decide siempre una persona (las reglas de freno, lección 4). En el módulo 6, el tablero las lee todas y te muestra tus números del lunes sin que tengas que preguntarle a nadie.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Lección 2 · Diagnóstico ──────────────────────────────────────────────

function Diagnostico({
  respuestas,
  onResponder,
  onReiniciar,
}: {
  respuestas: Record<string, Respuesta>;
  onResponder: (id: string, v: Respuesta) => void;
  onReiniciar: () => void;
}) {
  const respondidas = PREGUNTAS.filter((p) => respuestas[p.id] !== undefined).length;
  const completo = respondidas === PREGUNTAS.length;
  const resultado = useMemo(() => calcularResultado(respuestas), [respuestas]);

  return (
    <div className="mt-8">
      <div className="sticky top-[58px] z-10 -mx-4 border-b border-white/5 bg-[#0f172a]/95 px-4 py-2 backdrop-blur sm:mx-0 sm:rounded-full sm:border sm:px-4">
        <div className="flex items-center justify-between gap-3 text-xs text-slate-400">
          <span>
            {respondidas} de {PREGUNTAS.length} respondidas
          </span>
          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
            <span className="block h-full rounded-full bg-[#5fb2dd] transition-all" style={{ width: `${(respondidas / PREGUNTAS.length) * 100}%` }} />
          </span>
        </div>
      </div>

      <div className="mt-6 space-y-8">
        {AREAS.map((area) => (
          <fieldset key={area.id}>
            <legend className="font-serif text-xl text-white">{area.nombre}</legend>
            <ol className="mt-3 space-y-3">
              {PREGUNTAS.filter((p) => p.area === area.id).map((p) => {
                const numero = PREGUNTAS.indexOf(p) + 1;
                return (
                  <li key={p.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <p className="text-slate-100">
                      <span className="mr-2 font-mono text-xs text-slate-500">{numero}.</span>
                      {p.texto}
                    </p>
                    <div className="mt-3 grid grid-cols-3 gap-2" role="radiogroup" aria-label={p.texto}>
                      {OPCIONES_DIAGNOSTICO.map((o) => {
                        const activa = respuestas[p.id] === o.valor;
                        return (
                          <button
                            key={o.valor}
                            type="button"
                            role="radio"
                            aria-checked={activa}
                            onClick={() => onResponder(p.id, o.valor)}
                            className={`min-h-[44px] rounded-lg border text-sm transition ${
                              activa ? 'border-[#5fb2dd] bg-[#2175a1] text-white' : 'border-white/15 text-slate-300 hover:border-white/30'
                            }`}
                          >
                            {o.texto}
                          </button>
                        );
                      })}
                    </div>
                  </li>
                );
              })}
            </ol>
          </fieldset>
        ))}
      </div>

      <DiagramaSemaforo className="mt-8" />

      <div className="mt-8 rounded-2xl border border-[#2175a1]/40 bg-[#2175a1]/[0.07] p-5 sm:p-6" aria-live="polite">
        {completo ? (
          <>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5fb2dd]">Tu semáforo</p>
            <ul className="mt-4 space-y-3">
              {resultado.porArea.map((r) => (
                <li key={r.area.id} className="flex items-start gap-3">
                  <PuntoSemaforo semaforo={r.semaforo} className="mt-1.5" />
                  <div className="min-w-0 flex-1">
                    <p className="flex flex-wrap items-baseline justify-between gap-x-3 text-white">
                      <span>{r.area.nombre}</span>
                      <span className="font-mono text-xs text-slate-400">
                        {TEXTO_SEMAFORO[r.semaforo].etiqueta} · {r.puntaje}/6
                      </span>
                    </p>
                    <p className="text-sm text-slate-400">{TEXTO_SEMAFORO[r.semaforo].texto}</p>
                  </div>
                </li>
              ))}
            </ul>
            <h3 className="mt-6 font-serif text-xl text-white">Orden sugerido para hacer el curso</h3>
            <ol className="mt-3 space-y-2">
              {resultado.orden.map((r, i) => (
                <li key={r.area.id} className="flex items-center gap-3 text-slate-200">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 font-mono text-xs">{i + 1}</span>
                  <span>
                    Módulo {r.area.modulo} · {r.area.nombre}
                  </span>
                  <PuntoSemaforo semaforo={r.semaforo} />
                </li>
              ))}
              <li className="flex items-center gap-3 text-slate-400">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/5 font-mono text-xs">6</span>
                <span>Módulo 6 · El tablero, para juntarlo todo</span>
              </li>
            </ol>
            <p className="mt-4 text-sm text-slate-400">
              Cada módulo suma una hoja a la misma planilla. Haz todos, pero cuando llegues a tu pieza más roja, dale más tiempo y haz su prueba real primero.
            </p>
            <button type="button" onClick={onReiniciar} className="mt-5 inline-flex min-h-[44px] items-center gap-2 text-sm text-slate-400 hover:text-white">
              <RotateCcw className="h-4 w-4" aria-hidden /> Volver a responder
            </button>
          </>
        ) : (
          <p className="text-slate-300">
            Responde las {PREGUNTAS.length} preguntas y aquí aparece tu semáforo por pieza y el orden sugerido. Te faltan {PREGUNTAS.length - respondidas}.
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Lección 3 · Planilla base y ficha del negocio ───────────────────────

const MAX_PRODUCTOS = 8;
const claseCampo =
  'mt-1.5 min-h-[48px] w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-[15px] text-slate-100 placeholder:text-slate-500 focus:border-[#5fb2dd] focus:outline-none';

function PlanillaLeccion({ negocio, setNegocio }: { negocio: string; setNegocio: (v: string) => void }) {
  const montado = useMontado();
  const [fichaGuardada, setFicha] = useFicha();
  const ficha = montado ? fichaGuardada : { queVendes: '', aQuien: '', productos: [] as ProductoFicha[] };
  const productos = ficha.productos.length ? ficha.productos : [{ nombre: '', precio: '' }];
  const setProducto = (i: number, campo: keyof ProductoFicha, v: string) =>
    setFicha((p) => {
      const lista = p.productos.length ? [...p.productos] : [{ nombre: '', precio: '' }];
      lista[i] = { ...lista[i], [campo]: v };
      return { ...p, productos: lista };
    });
  return (
    <div className="mt-8">
      <div className="space-y-4 text-slate-300">
        <p>
          Todo lo que viene en el curso vive en una sola planilla. La hoja Clientes usa tus productos para las propuestas, Pedidos usa tus precios para calcular el total, y el tablero suma todo. Si eso vive solo en tu cabeza, cada hoja vuelve a depender de ti.
        </p>
        <p>
          Hoy dejas lista la base: el nombre del negocio, qué vendes, a quién, y tu lista de precios. Con eso descargas tu planilla, ya con tu nombre y tus productos, y la abres en Google Sheets.
        </p>
      </div>
      <DiagramaPlanillaSistema className="mt-6" />

      <Subtitulo3>1 · La ficha de tu negocio</Subtitulo3>
      <div className="mt-3 grid gap-3">
        <label className="block text-sm text-slate-300">
          Nombre del negocio
          <input value={negocio} onChange={(e) => setNegocio(e.target.value)} placeholder="Ej.: Grano Norte" className={claseCampo} />
        </label>
        <label className="block text-sm text-slate-300">
          Qué vendes
          <input
            value={ficha.queVendes}
            onChange={(e) => setFicha((p) => ({ ...p, queVendes: e.target.value }))}
            placeholder="Ej.: café en grano y molido, tostado en Valparaíso"
            className={claseCampo}
          />
        </label>
        <label className="block text-sm text-slate-300">
          A quién le vendes
          <input
            value={ficha.aQuien}
            onChange={(e) => setFicha((p) => ({ ...p, aQuien: e.target.value }))}
            placeholder="Ej.: cafeterías y oficinas de la región"
            className={claseCampo}
          />
        </label>
      </div>

      <Subtitulo3>2 · Tu lista de precios</Subtitulo3>
      <p className="mt-2 text-sm text-slate-400">Tus productos o servicios principales con su precio de lista. El costo y el margen los ves en el módulo 5.</p>
      <ul className="mt-3 space-y-2">
        {productos.map((pr, i) => (
          <li key={i} className="grid grid-cols-[1fr_7.5rem_auto] items-end gap-2">
            <label className="block min-w-0 text-xs text-slate-400">
              <span className={i === 0 ? '' : 'sr-only'}>Producto o servicio</span>
              <input value={pr.nombre} onChange={(e) => setProducto(i, 'nombre', e.target.value)} placeholder={i === 0 ? 'Ej.: Café en grano 1 kg' : 'Otro producto'} className={claseCampo} />
            </label>
            <label className="block text-xs text-slate-400">
              <span className={i === 0 ? '' : 'sr-only'}>Precio</span>
              <input value={pr.precio} inputMode="numeric" onChange={(e) => setProducto(i, 'precio', e.target.value)} placeholder="16000" className={claseCampo} />
            </label>
            <button
              type="button"
              aria-label="Quitar producto"
              onClick={() => setFicha((p) => ({ ...p, productos: p.productos.filter((_, j) => j !== i) }))}
              className="flex h-12 w-10 items-center justify-center text-slate-500 hover:text-slate-200"
            >
              <Trash2 className="h-4 w-4" aria-hidden />
            </button>
          </li>
        ))}
      </ul>
      {productos.length < MAX_PRODUCTOS ? (
        <button
          type="button"
          onClick={() => setFicha((p) => ({ ...p, productos: [...(p.productos.length ? p.productos : [{ nombre: '', precio: '' }]), { nombre: '', precio: '' }] }))}
          className="mt-3 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/15 px-4 text-sm text-slate-200 hover:border-white/30"
        >
          <Plus className="h-4 w-4" aria-hidden /> Agregar producto
        </button>
      ) : null}

      <Subtitulo3>3 · Descarga tu planilla</Subtitulo3>
      <DescargaPlantilla
        className="mt-3"
        titulo="Tu planilla base"
        texto="Sale con tu ficha en la hoja Inicio y tus productos en la hoja Productos. Trae todas las hojas del curso ya conectadas: las vas a ir llenando módulo a módulo. Si quieres ver cómo queda llena, baja el ejemplo de Grano Norte."
      />
      <div className="mt-4 rounded-2xl border border-white/10 p-4 text-sm text-slate-300">
        <p className="font-medium text-white">Con ayuda de la IA</p>
        <p className="mt-1">{IA_OPCIONAL}</p>
        <p className="mt-2">
          Si además quieres que un asistente responda tu WhatsApp, el{' '}
          <a href={LINKS.esqueleto} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#5fb2dd] underline-offset-2 hover:underline">
            esqueleto gratis <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </a>{' '}
          usa esta misma información. No lo necesitas para el curso.
        </p>
      </div>
    </div>
  );
}

function Subtitulo3({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-8 font-serif text-xl text-white">{children}</h3>;
}

// ─── Lección 4 · Reglas de freno ──────────────────────────────────────────

function reglasElegidas(estado: EstadoReglas): ReglaFreno[] {
  const todas = [...REGLAS_FRENO, ...estado.propias];
  return todas
    .filter((r) => estado.elegidas.includes(r.id))
    .map((r) => ({ ...r, texto: (estado.textos[r.id] ?? r.texto).trim() || r.texto }));
}

function descargarReglas(estado: EstadoReglas, negocio: string) {
  const elegidas = reglasElegidas(estado);
  const categorias = Array.from(new Set(elegidas.map((r) => r.categoria)));
  const fecha = new Date().toLocaleDateString('es-CL');
  let n = 0;
  const lineas = [
    `REGLAS DE FRENO · ${negocio.trim() || 'Mi negocio'}`,
    'Lo que decide siempre una persona.',
    `Fecha: ${fecha}`,
    '',
    ...categorias.flatMap((c) => [
      c.toUpperCase(),
      ...elegidas.filter((r) => r.categoria === c).map((r) => `${(n += 1)}. ${r.texto}`),
      '',
    ]),
    'Curso «El sistema de tu negocio» · Villelab',
  ];
  const blob = new Blob(['﻿' + lineas.join('\r\n')], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'reglas-de-freno.txt';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function ReglasFreno({
  estado,
  setEstado,
  negocio,
}: {
  estado: EstadoReglas;
  setEstado: (fn: (prev: EstadoReglas) => EstadoReglas) => void;
  negocio: string;
}) {
  const [nueva, setNueva] = useState('');
  const todas = [...REGLAS_FRENO, ...estado.propias];
  const categorias = Array.from(new Set(todas.map((r) => r.categoria)));
  const cuantas = estado.elegidas.length;

  const alternar = (id: string) =>
    setEstado((p) => ({ ...p, elegidas: p.elegidas.includes(id) ? p.elegidas.filter((x) => x !== id) : [...p.elegidas, id] }));
  const editar = (id: string, texto: string) => setEstado((p) => ({ ...p, textos: { ...p.textos, [id]: texto } }));
  const agregar = () => {
    const texto = nueva.trim();
    if (!texto) return;
    const id = `p${Date.now()}`;
    setEstado((p) => ({ ...p, propias: [...p.propias, { id, categoria: 'Mis reglas', texto }], elegidas: [...p.elegidas, id] }));
    setNueva('');
  };
  const quitarPropia = (id: string) =>
    setEstado((p) => ({ ...p, propias: p.propias.filter((r) => r.id !== id), elegidas: p.elegidas.filter((x) => x !== id) }));

  return (
    <div className="mt-8">
      <p className="text-slate-300">
        Una regla de freno es algo que <strong className="font-semibold text-white">nunca</strong> decide un mensaje automático ni una persona nueva del equipo sin consultar. Escribirlas te libera: todo lo que no está en la lista, tu equipo lo puede resolver solo. En {CASO.nombre}, Camila partió con 4: precios fuera de la lista, fechas de entrega, lo que no sabe y los reclamos.
      </p>
      <DiagramaQuienDecide className="mt-6" />
      <figure className="relative mt-6 aspect-[16/7] overflow-hidden rounded-2xl border border-white/10">
        <Foto foto={APOYO.listaCheck} posicion="center 45%" />
      </figure>
      <p className="mt-6 text-sm text-slate-400">Marca las que aplican a tu negocio. Al marcarla puedes editarla: cambia lo que está entre [corchetes].</p>

      <div className="mt-6 space-y-6">
        {categorias.map((c) => (
          <div key={c}>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5fb2dd]">{c}</p>
            <ul className="mt-2 space-y-2">
              {todas
                .filter((r) => r.categoria === c)
                .map((r) => {
                  const elegida = estado.elegidas.includes(r.id);
                  const propia = r.id.startsWith('p');
                  return (
                    <li key={r.id} className={`rounded-xl border p-3 transition ${elegida ? 'border-[#2175a1]/70 bg-[#2175a1]/10' : 'border-white/10 bg-white/[0.02]'}`}>
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          role="checkbox"
                          aria-checked={elegida}
                          aria-label={`Elegir regla: ${r.texto}`}
                          onClick={() => alternar(r.id)}
                          className="-m-2 flex h-11 w-11 shrink-0 items-center justify-center"
                        >
                          <span className={`flex h-5 w-5 items-center justify-center rounded border ${elegida ? 'border-[#2175a1] bg-[#2175a1]' : 'border-white/30'}`}>
                            {elegida ? <Check className="h-3.5 w-3.5 text-white" aria-hidden /> : null}
                          </span>
                        </button>
                        {elegida ? (
                          <textarea
                            value={estado.textos[r.id] ?? r.texto}
                            onChange={(e) => editar(r.id, e.target.value)}
                            rows={2}
                            aria-label="Editar regla"
                            className="min-h-[44px] w-full resize-y rounded-lg border border-white/10 bg-[#0f172a] px-3 py-2 text-[15px] text-slate-100 focus:border-[#5fb2dd] focus:outline-none"
                          />
                        ) : (
                          <button type="button" onClick={() => alternar(r.id)} className="min-h-[28px] flex-1 pt-0.5 text-left text-slate-300">
                            {r.texto}
                          </button>
                        )}
                        {propia ? (
                          <button type="button" onClick={() => quitarPropia(r.id)} aria-label="Quitar regla" className="-m-2 flex h-11 w-11 shrink-0 items-center justify-center text-slate-500 hover:text-slate-200">
                            <Trash2 className="h-4 w-4" aria-hidden />
                          </button>
                        ) : null}
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <input
          value={nueva}
          onChange={(e) => setNueva(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') agregar();
          }}
          placeholder="Escribe una regla propia"
          className="min-h-[48px] flex-1 rounded-full border border-white/15 bg-white/[0.03] px-5 text-[15px] text-slate-100 placeholder:text-slate-500 focus:border-[#5fb2dd] focus:outline-none"
        />
        <button type="button" onClick={agregar} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-sm text-slate-200 hover:border-white/30">
          <Plus className="h-4 w-4" aria-hidden /> Agregar
        </button>
      </div>

      <div className="mt-6 flex flex-col items-start gap-3 rounded-2xl border border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-300">
          {cuantas === 0 ? 'Todavía no eliges reglas.' : `${cuantas} ${cuantas === 1 ? 'regla elegida' : 'reglas elegidas'}.`}
          {cuantas > 0 && cuantas < 5 ? ' Te sugerimos al menos 5.' : ''}
        </p>
        <button
          type="button"
          disabled={cuantas === 0}
          onClick={() => descargarReglas(estado, negocio)}
          className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#FF3D8B] px-6 text-sm font-semibold text-white hover:bg-[#ff5c9f] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
        >
          <Download className="h-4 w-4" aria-hidden /> Descargar mis reglas (.txt)
        </button>
      </div>
    </div>
  );
}

// ─── Portada del tablero ──────────────────────────────────────────────────

function Portada({
  respuestas,
  reglas,
  checks,
  negocio,
  setNegocio,
  irA,
}: {
  respuestas: Record<string, Respuesta>;
  reglas: EstadoReglas;
  checks: Record<string, boolean>;
  negocio: string;
  setNegocio: (v: string) => void;
  irA: (pagina: number) => void;
}) {
  const montado = useMontado();
  const completo = PREGUNTAS.every((p) => respuestas[p.id] !== undefined);
  const resultado = calcularResultado(respuestas);
  const elegidas = reglasElegidas(reglas);
  const planillaLista = !!checks.l3a;
  const [fichaGuardada] = useFicha();
  const productos = montado ? fichaGuardada.productos.filter((p) => p.nombre.trim()) : [];

  return (
    <section className="m0-portada mx-auto max-w-3xl px-4 pb-6 pt-12 sm:px-6">
      <div className="m0-no-print">
        <Kicker>Entregable del módulo 0</Kicker>
        <h2 className="mt-3 font-serif text-3xl text-white sm:text-4xl">La portada de tu sistema</h2>
        <p className="mt-3 text-slate-300">
          Junta tu semáforo, tu planilla base y tus reglas de freno en una hoja. Imprímela o guárdala como PDF junto a tu planilla: es la primera página de tu proyecto final, tu ERP en Google Sheets con su tablero.
        </p>
        <figure className="relative mt-6 aspect-[16/7] overflow-hidden rounded-2xl border border-white/10">
          <Foto foto={APOYO.escritorioClaro} posicion="center" />
        </figure>
        <label className="mt-6 block text-sm text-slate-400">
          Nombre de tu negocio
          <input
            value={negocio}
            onChange={(e) => setNegocio(e.target.value)}
            placeholder="Ej.: Grano Norte"
            className="mt-2 min-h-[48px] w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 text-[15px] text-slate-100 placeholder:text-slate-600 focus:border-[#5fb2dd] focus:outline-none"
          />
        </label>
      </div>

      <div className="m0-hoja mt-6 rounded-2xl border border-white/15 bg-white/[0.03] p-5 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">El sistema de tu negocio · Portada</p>
            <p className="mt-1 font-serif text-2xl text-white sm:text-3xl">{(montado && negocio.trim()) || 'Mi negocio'}</p>
          </div>
          <p className="font-mono text-xs text-slate-400">{montado ? new Date().toLocaleDateString('es-CL') : ''}</p>
        </div>

        <h3 className="mt-6 text-xs uppercase tracking-wider text-slate-400">1 · Mapa y semáforo</h3>
        {montado && completo ? (
          <ul className="mt-3 space-y-2 text-sm">
            {resultado.porArea.map((r) => (
              <li key={r.area.id} className="flex items-center justify-between gap-3 border-t border-white/5 pt-2 first:border-t-0 first:pt-0">
                <span className="min-w-0 text-slate-100">
                  {r.area.nombre} <span className="text-slate-500">· hoja {r.area.hoja}</span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-2 text-slate-300">
                  <PuntoSemaforo semaforo={r.semaforo} /> {r.puntaje}/6
                  <span className="sr-only">hoy;</span>
                  <span className="ml-2 text-[11px] uppercase tracking-wider text-slate-500">al terminar</span>
                  <span aria-hidden className="inline-block h-3 w-3 rounded-full border border-slate-500" />
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-slate-400">
            Pendiente: <button type="button" onClick={() => irA(1)} className="text-[#5fb2dd] underline-offset-2 hover:underline">responde el diagnóstico</button> (lección 2).
          </p>
        )}

        {montado && completo ? (
          <>
            <h3 className="mt-6 text-xs uppercase tracking-wider text-slate-400">2 · Orden sugerido</h3>
            <p className="mt-2 text-sm text-slate-200">
              {resultado.orden.map((r) => r.area.nombre).join(' → ')} → El tablero
            </p>
          </>
        ) : null}

        <h3 className="mt-6 text-xs uppercase tracking-wider text-slate-400">{montado && completo ? '3' : '2'} · Tu planilla base</h3>
        <p className="mt-2 text-sm text-slate-200">
          {montado && planillaLista
            ? `Descargada y abierta${productos.length ? `, con ${productos.length} ${productos.length === 1 ? 'producto' : 'productos'} en tu lista de precios` : ''}. Cada módulo le suma una hoja.`
            : 'Pendiente: descargar tu planilla y llenar la ficha del negocio (lección 3).'}
        </p>

        <h3 className="mt-6 text-xs uppercase tracking-wider text-slate-400">{montado && completo ? '4' : '3'} · Reglas de freno: lo que decide siempre una persona</h3>
        {montado && elegidas.length > 0 ? (
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-200">
            {elegidas.map((r) => (
              <li key={r.id}>{r.texto}</li>
            ))}
          </ol>
        ) : (
          <p className="mt-2 text-sm text-slate-400">
            Pendiente: <button type="button" onClick={() => irA(3)} className="text-[#5fb2dd] underline-offset-2 hover:underline">elige tus reglas</button> (lección 4).
          </p>
        )}

        <p className="mt-8 border-t border-white/10 pt-3 font-mono text-[10px] text-slate-500">Curso «El sistema de tu negocio» · Módulo 0 · Villelab</p>
      </div>

      <div className="m0-no-print mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#FF3D8B] px-6 text-sm font-semibold text-white hover:bg-[#ff5c9f]"
        >
          <Printer className="h-4 w-4" aria-hidden /> Imprimir o guardar en PDF
        </button>
        <Link href={LINKS.curso} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm text-slate-200 hover:border-white/30">
          Ver los módulos que vienen
        </Link>
      </div>
    </section>
  );
}

// ─── Página ───────────────────────────────────────────────────────────────

const ESTILOS_IMPRESION = `
@media print {
  @page { margin: 14mm; }
  html, body { background: #fff !important; }
  .m0-no-print { display: none !important; }
  .m0-portada { padding: 0 !important; max-width: none !important; }
  .m0-hoja { border: none !important; padding: 0 !important; margin: 0 !important; }
  .m0-portada, .m0-portada *:not(.semaforo-punto) { color: #0f172a !important; background-color: transparent !important; border-color: #cbd5e1 !important; box-shadow: none !important; }
  .m0-portada a { text-decoration: none !important; }
  .semaforo-punto { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}
`;

export default function Modulo0Content() {
  const montado = useMontado();
  const [respuestas, setRespuestas, borrarRespuestas] = usePersistido(CLAVES_STORAGE.diagnostico, RESPUESTAS_INICIALES);
  const [reglas, setReglas] = usePersistido(CLAVES_STORAGE.reglas, REGLAS_INICIALES);
  const [checks, setChecks] = usePersistido(CLAVES_STORAGE.checklist, CHECKLIST_INICIAL);
  const [negocio, setNegocio] = usePersistido(CLAVES_STORAGE.negocio, NEGOCIO_INICIAL);
  const [paginaGuardada, setPaginaGuardada] = usePersistido(CLAVE_PAGINA, PAGINA_INICIAL);
  const hash = useHash();

  // El hash manda (enlace compartido); si no hay, la última página vista; si no, la lección 1.
  const desdeHash = paginaDesdeHash(hash);
  const pagina = desdeHash ?? (paginaGuardada >= 0 && paginaGuardada <= PAGINA_PORTADA ? paginaGuardada : 0);

  // Si se llegó por hash, recordarlo; al cambiar de página, volver arriba.
  useEffect(() => {
    if (desdeHash !== null && desdeHash !== paginaGuardada) setPaginaGuardada(desdeHash);
  }, [desdeHash, paginaGuardada, setPaginaGuardada]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pagina]);

  const ir = (p: number) => {
    setPaginaGuardada(p);
    if (window.location.hash !== hashDe(p)) {
      window.history.pushState(null, '', hashDe(p));
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    }
  };

  const hechos = montado ? LECCIONES_M0.flatMap((l) => l.checklist).filter((c) => checks[c.id]).length : 0;
  const toggle = (id: string) => setChecks((p) => ({ ...p, [id]: !p[id] }));
  const leccionHecha = (l: LeccionM0) => montado && l.checklist.every((c) => checks[c.id]);
  const checksVisibles = montado ? checks : CHECKLIST_INICIAL;
  const leccion = pagina < PAGINA_PORTADA ? LECCIONES_M0[pagina] : null;

  return (
    <main className="w-full overflow-x-clip">
      <style>{ESTILOS_IMPRESION}</style>

      {/* Barra superior: cambia la lección visible */}
      <div className="m0-no-print sticky top-0 z-20 border-b border-white/10 bg-[#0f172a]/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3 sm:px-6">
          <Link href={LINKS.curso} className="-ml-2 inline-flex min-h-[32px] items-center gap-1 rounded-full px-2 text-sm text-slate-400 hover:text-white">
            <ArrowLeft className="h-4 w-4" aria-hidden /> <span className="hidden sm:inline">El curso</span>
          </Link>
          <nav aria-label="Lecciones" className="flex flex-1 items-center justify-center gap-1.5">
            {LECCIONES_M0.map((l, i) => {
              const actual = pagina === i;
              const hecha = leccionHecha(l);
              return (
                <a
                  key={l.id}
                  href={hashDe(i)}
                  onClick={(e) => {
                    e.preventDefault();
                    ir(i);
                  }}
                  aria-current={actual ? 'page' : undefined}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border font-mono text-xs transition ${
                    actual
                      ? 'border-[#5fb2dd] bg-[#5fb2dd]/20 text-white ring-2 ring-[#5fb2dd]/30'
                      : hecha
                        ? 'border-[#2175a1] bg-[#2175a1] text-white'
                        : 'border-white/15 text-slate-300 hover:border-white/40'
                  }`}
                  aria-label={`Lección ${l.numero}: ${l.titulo}`}
                >
                  {hecha && !actual ? <Check className="h-3.5 w-3.5" aria-hidden /> : l.numero}
                </a>
              );
            })}
            <a
              href="#portada"
              onClick={(e) => {
                e.preventDefault();
                ir(PAGINA_PORTADA);
              }}
              aria-current={pagina === PAGINA_PORTADA ? 'page' : undefined}
              className={`ml-1 inline-flex h-8 items-center rounded-full border px-3 text-xs transition ${
                pagina === PAGINA_PORTADA ? 'border-[#5fb2dd] bg-[#5fb2dd]/20 text-white' : 'border-white/15 text-slate-300 hover:border-white/40'
              }`}
            >
              Portada
            </a>
          </nav>
          <span className="font-mono text-xs text-slate-400" aria-label="Avance del módulo">
            {hechos}/{TOTAL_CHECKS}
          </span>
        </div>
        <div className="h-0.5 bg-white/5">
          <div className="h-full bg-[#5fb2dd] transition-all" style={{ width: `${(hechos / TOTAL_CHECKS) * 100}%` }} />
        </div>
      </div>

      {/* Presentación del módulo: solo en la lección 1 */}
      {pagina === 0 ? (
        <header className="m0-no-print mx-auto grid max-w-3xl items-center gap-6 px-4 pb-2 pt-10 sm:grid-cols-[1fr_200px] sm:px-6 sm:pt-14">
          <figure className="relative order-first aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 sm:order-last sm:aspect-[4/5]">
            <Foto foto={APOYO.tostaduriaPlanta} posicion="center" prioridad />
          </figure>
          <div>
            <Kicker>Módulo 0 · {MODULOS[0].area} · {MODULOS[0].duracion}</Kicker>
            <h1 className="mt-4 font-serif text-4xl leading-tight text-white sm:text-5xl">{MODULOS[0].titulo}</h1>
            <p className="mt-4 text-slate-300">
              Antes de ordenar nada, miramos el negocio completo. Al terminar este módulo tienes tu mapa con semáforo, tu planilla base con la ficha del negocio y tus reglas de freno: la portada del sistema que vas a armar durante el curso.
            </p>
            <p className="mt-3 text-sm text-slate-500">Tu avance se guarda en este navegador.</p>
            <p className="mt-1 text-xs text-slate-500">
              Curso versión {VERSION_CURSO.version} · actualizado el {fechaLarga(VERSION_CURSO.fecha)}
            </p>
          </div>
        </header>
      ) : null}

      {leccion ? (
        <div className="m0-no-print mx-auto max-w-3xl px-4 sm:px-6">
          <section key={leccion.id} className={pagina === 0 ? 'pb-16 pt-8' : 'pb-16 pt-10 sm:pt-14'}>
            <CabeceraLeccion leccion={leccion} />
            {leccion.id === 'mapa' ? <MapaAreas /> : null}
            {leccion.id === 'diagnostico' ? (
              <Diagnostico
                respuestas={montado ? respuestas : RESPUESTAS_INICIALES}
                onResponder={(id, v) => setRespuestas((p) => ({ ...p, [id]: v }))}
                onReiniciar={() => {
                  borrarRespuestas();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            ) : null}
            {leccion.id === 'planilla' ? <PlanillaLeccion negocio={montado ? negocio : NEGOCIO_INICIAL} setNegocio={setNegocio} /> : null}
            {leccion.id === 'reglas' ? <ReglasFreno estado={montado ? reglas : REGLAS_INICIALES} setEstado={setReglas} negocio={negocio} /> : null}
            <PromptsIA leccion={`m0-l${leccion.numero}`} />
            <Checklist leccion={leccion} checks={checksVisibles} onToggle={toggle} />
            <NavLeccion pagina={pagina} ir={ir} />
          </section>
        </div>
      ) : (
        <>
          <Portada respuestas={respuestas} reglas={reglas} checks={checks} negocio={negocio} setNegocio={setNegocio} irA={ir} />

          {/* Dos caminos al terminar: el curso (pago) o seguir aprendiendo gratis. */}
          <div
            className="m0-no-print mx-auto max-w-3xl px-4 pb-24 sm:px-6"
            onClickCapture={(e) => {
              // SiguientePaso no admite cta_location; el clic a la compra se mide aquí como curso_click_compra.
              // El botón «Comprar el curso» del pie (data-compra) se mide solo, con su propia ubicación.
              const a = (e.target as HTMLElement).closest('a');
              if (a && !a.hasAttribute('data-compra') && a.getAttribute('href') === LINKS.cursoCompra) trackCursoClickCompra('modulo0');
            }}
          >
            {/* Video 13 · cierre del módulo 0, sobre el siguiente paso (8-nov-2026) */}
            <VideoMarco id="v13-m0-cierre" titulo="Lo que viene" duracion="18 s" />
            <div className="mb-10" />
            <SiguientePaso
              logro="Ya tienes el mapa, tu planilla base y la portada de tu sistema"
              pago={{
                titulo: 'El curso completo: los 7 módulos están listos',
                descripcion: `Entras hoy a los 6 módulos que siguen y avanzas a tu ritmo, cada uno con su hoja y sus prompts: clientes y ventas (tu CRM), marketing y origen, pedidos, atención, cobranza y caja, y el tablero. ${textoPrecio()}.`,
                href: LINKS.cursoCompra,
                cta: 'Quiero el curso',
              }}
              gratis={[
                {
                  titulo: 'Mira la grabación del último workshop',
                  descripcion: '45 minutos para que ningún cliente se te quede sin respuesta.',
                  href: LINKS.workshopGrabacion,
                  cta: 'Ver la grabación',
                },
                {
                  titulo: 'Arma el esqueleto de tu asistente',
                  descripcion: 'En 4 pasos dejas lista la estructura que responde a tus clientes como tú.',
                  href: LINKS.esqueleto,
                  cta: 'Armar mi esqueleto',
                },
              ]}
            />
            <div className="mt-10 flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <button type="button" onClick={() => ir(PAGINA_PORTADA - 1)} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-sm text-slate-300 hover:border-white/30">
                <ArrowLeft className="h-4 w-4" aria-hidden /> Volver a la lección 4
              </button>
              {/* 12-nov-2026: antes «Ya tengo el curso: ir al módulo 1» abría el curso pagado sin pedir nada. Ahora compra en
                  Hotmart (con UTM); los módulos 1–6 piden el código del comprador en /curso/acceso. */}
              <a
                href={LINKS.cursoCompra}
                data-compra="modulo0_cierre"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.currentTarget.href = hotmartConUtm(LINKS.cursoCompra, 'modulo0_cierre');
                  trackCursoClickCompra('modulo0_cierre');
                }}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#FF3D8B] px-6 text-sm font-semibold text-white shadow-rosa transition hover:bg-[#ff5c9f]"
              >
                Comprar el curso <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
            <p className="mt-4 text-sm text-slate-400 sm:text-right">
              ¿Ya lo compraste?{' '}
              <a href="/curso/acceso?d=/curso/modulo-1" className="inline-block py-2 text-[#5fb2dd] underline underline-offset-2 hover:text-white">
                Entra con tu código
              </a>
            </p>
          </div>
        </>
      )}
    </main>
  );
}
