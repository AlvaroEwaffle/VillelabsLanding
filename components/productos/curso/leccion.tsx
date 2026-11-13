'use client';

/*
 * Piezas compartidas de los módulos 1–7 del curso «El sistema de tu negocio: tu primer CRM y ERP en Google Sheets»
 * (v1.0 «Tu negocio de punta a punta», 8-nov-2026; v1.1 con el enfoque CRM/ERP, mismo día).
 * Mismo formato que el módulo 0 (Modulo0Content.tsx, que no se tocó): una lección por pantalla, la página
 * en el hash (#leccion-2, #cierre) y en localStorage, checklist «Antes de seguir», video pendiente con su
 * guion, plantillas descargables y una página de cierre con la prueba real, el semáforo del área antes y
 * después y el entregable del módulo.
 * Todo el avance vive en localStorage con claves `villelab_curso_m{N}_*`.
 */

import Link from 'next/link';
import { useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, Check, ChevronDown, ClipboardCopy, Download, Plus, RotateCcw, ShieldCheck, Trash2 } from 'lucide-react';
import {
  AREAS,
  CLAVES_STORAGE,
  MODULOS,
  OPCIONES_DIAGNOSTICO,
  PREGUNTAS,
  semaforoDe,
  type AreaId,
  type Respuesta,
  type Semaforo,
} from '@/lib/productos/curso/curso';
import { GUIONES, type Guion } from '@/lib/productos/curso/guiones';
import { useMontado, usePersistido } from '@/lib/productos/curso/persistencia';
import type { ImagenApoyo } from '@/lib/productos/apoyo';
import { Foto, Kicker, PuntoSemaforo, VideoProximamente } from './piezas';
import { VideoMarco } from '@/components/productos/VideoProducto';
import { VIDEOS_CURSO } from '@/lib/productos/curso/videos';
import { DescargaPlantilla } from './Plantilla';
import { AVISO_PROMPTS, PROMPTS_CURSO, PROMPTS_POR_LECCION } from '@/lib/productos/curso/prompts';
import { HUECOS_POR_MODULO } from '@/lib/productos/curso/datos-negocio';
import { BloquePrompt } from './DatosNegocio';

// ─── Tipos y constantes ───────────────────────────────────────────────────

export type ItemCheck = { id: string; texto: string };

export type LeccionDef = {
  id: string;
  bajada: string;
  checklist: ItemCheck[];
  /** Portada del video pendiente (foto de Álvaro o de apoyo). */
  portada: ImagenApoyo;
  posicion?: string;
  contenido: ReactNode;
};

export const rutaModulo = (n: number) => `/curso/modulo-${n}`;
export const claveModulo = (n: number, nombre: string) => `villelab_curso_m${n}_${nombre}`;

export const TEXTOS_VACIOS: Record<string, string> = {};
export const CHECKS_VACIOS: Record<string, boolean> = {};
export const FILAS_VACIAS: Fila[] = [];
const PAGINA_INICIAL = -1;
const RESPUESTAS_VACIAS: Record<string, Respuesta> = {};

export const ETIQUETA_SEMAFORO: Record<Semaforo, string> = { rojo: 'Rojo', amarillo: 'Naranja', verde: 'Verde' };

// ─── Descargas ────────────────────────────────────────────────────────────

/** Descarga un archivo de texto (con BOM para que Excel y el Bloc de notas lean bien los tildes). */
export function descargarArchivo(nombre: string, contenido: string, tipo = 'text/plain') {
  const blob = new Blob(['﻿' + contenido], { type: `${tipo};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = nombre;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Texto plano con encabezado y pie del curso. */
export function armarTxt(titulo: string, cuerpo: string[], negocio?: string): string {
  const fecha = new Date().toLocaleDateString('es-CL');
  return [
    `${titulo.toUpperCase()}${negocio?.trim() ? ` · ${negocio.trim()}` : ''}`,
    `Fecha: ${fecha}`,
    '',
    ...cuerpo,
    '',
    'Curso «El sistema de tu negocio» · Villelab',
  ].join('\r\n');
}

/** CSV con punto y coma (lo abren Google Sheets y el Excel en español sin pasos extra). */
export function armarCsv(encabezados: string[], filas: (string | number)[][]): string {
  const celda = (v: string | number) => {
    const s = String(v ?? '');
    return /[;"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [encabezados, ...filas].map((f) => f.map(celda).join(';')).join('\r\n');
}

/** Archivo de calendario (.ics) con eventos de día completo: se abre con Google Calendar, Outlook o el calendario del celular. */
export function armarIcs(eventos: { fecha: Date; titulo: string; detalle?: string }[]): string {
  const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
  const ymd = (d: Date) => `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const sello = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const lineas = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Villelab//Curso El sistema de tu negocio//ES', 'CALSCALE:GREGORIAN'];
  eventos.forEach((e, i) => {
    const fin = new Date(e.fecha);
    fin.setDate(fin.getDate() + 1);
    lineas.push(
      'BEGIN:VEVENT',
      `UID:${ymd(e.fecha)}-${i}-${Math.random().toString(36).slice(2, 8)}@villelab.com`,
      `DTSTAMP:${sello}`,
      `DTSTART;VALUE=DATE:${ymd(e.fecha)}`,
      `DTEND;VALUE=DATE:${ymd(fin)}`,
      `SUMMARY:${esc(e.titulo)}`,
      ...(e.detalle ? [`DESCRIPTION:${esc(e.detalle)}`] : []),
      'END:VEVENT',
    );
  });
  lineas.push('END:VCALENDAR');
  return lineas.join('\r\n');
}

export function sumarDias(base: string, dias: number): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(base)) return null;
  const [y, m, d] = base.split('-').map(Number);
  const f = new Date(y, m - 1, d);
  f.setDate(f.getDate() + dias);
  return f;
}

export const fechaCorta = (d: Date) => d.toLocaleDateString('es-CL', { weekday: 'short', day: 'numeric', month: 'short' });

export const numero = (s: string | undefined) => {
  const n = Number(String(s ?? '').replace(/\./g, '').replace(',', '.').replace(/[^\d.-]/g, ''));
  return Number.isFinite(n) ? n : 0;
};

export const pesos = (n: number) => `$${Math.round(n).toLocaleString('es-CL')}`;

export function BotonDescarga({
  etiqueta,
  onClick,
  disabled = false,
  principal = false,
  className = '',
}: {
  etiqueta: string;
  onClick: () => void;
  disabled?: boolean;
  principal?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto ${
        principal ? 'bg-[#FF3D8B] text-white hover:bg-[#ff5c9f]' : 'border border-[#2175a1] bg-[#2175a1]/20 text-white hover:bg-[#2175a1]/35'
      } ${className}`}
    >
      <Download className="h-4 w-4 shrink-0" aria-hidden /> {etiqueta}
    </button>
  );
}

// ─── Bloques de contenido ─────────────────────────────────────────────────

export function Explica({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mt-8 space-y-3 text-slate-300 [&_strong]:font-semibold [&_strong]:text-white ${className}`}>{children}</div>;
}

export function Subtitulo({ children }: { children: ReactNode }) {
  return <h3 className="mt-10 font-serif text-2xl leading-snug text-white">{children}</h3>;
}

export function Instruccion({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-sm text-slate-400">{children}</p>;
}

export function FotoBanda({ foto, posicion = 'center', className = 'mt-6', aspecto = 'aspect-[16/7]' }: { foto: ImagenApoyo; posicion?: string; className?: string; aspecto?: string }) {
  return (
    <figure className={`relative ${aspecto} overflow-hidden rounded-2xl border border-white/10 ${className}`}>
      <Foto foto={foto} posicion={posicion} />
    </figure>
  );
}

/** Caja de «freno»: lo que decide siempre una persona en esta lección. */
export function Freno({ children, className = 'mt-6' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex gap-3 rounded-2xl border border-[#5fb2dd]/40 bg-[#2175a1]/10 p-4 ${className}`}>
      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#5fb2dd]" aria-hidden />
      <div className="text-sm text-slate-200">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5fb2dd]">Freno · lo decide una persona</p>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
}

/** Lista con viñetas de check. */
export function ListaCheck({ items, className = 'mt-4' }: { items: ReactNode[]; className?: string }) {
  return (
    <ul className={`space-y-2 text-slate-300 ${className}`}>
      {items.map((x, i) => (
        <li key={i} className="flex gap-3">
          <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#5fb2dd]" aria-hidden /> <span className="min-w-0">{x}</span>
        </li>
      ))}
    </ul>
  );
}

/** Texto para copiar (un prompt para ChatGPT/Claude o un mensaje). */
export function BloqueCopiar({ titulo, texto, nota, className = 'mt-6' }: { titulo: string; texto: string; nota?: ReactNode; className?: string }) {
  const [copiado, setCopiado] = useState(false);
  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      /* sin portapapeles: el texto igual se puede seleccionar a mano */
    }
  };
  return (
    <div className={`overflow-hidden rounded-2xl border border-white/10 bg-[#131c31] ${className}`}>
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
        <p className="min-w-0 font-mono text-[11px] uppercase tracking-[0.18em] text-[#5fb2dd]">{titulo}</p>
        <button type="button" onClick={copiar} className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-full border border-white/15 px-3 text-xs text-slate-200 hover:border-white/30">
          {copiado ? <Check className="h-3.5 w-3.5" aria-hidden /> : <ClipboardCopy className="h-3.5 w-3.5" aria-hidden />}
          {copiado ? 'Copiado' : 'Copiar'}
        </button>
      </div>
      <pre className="max-h-80 overflow-auto whitespace-pre-wrap break-words px-4 py-3 font-sans text-[14px] leading-relaxed text-slate-200">{texto}</pre>
      {nota ? <p className="border-t border-white/10 px-4 py-2.5 text-xs text-slate-400">{nota}</p> : null}
    </div>
  );
}

/**
 * «Prompt para tu IA» (12-nov-2026): los prompts del curso dentro de cada lección, con botón copiar.
 * `leccion` = «m1-l1» (módulo 1, lección 1); los textos viven en lib/productos/curso/prompts.ts.
 * 13-nov-2026: el módulo 7 trae su propio aviso (AVISO_PROMPTS.m7: probado en Claude, no «la versión gratis sirve») y cada
 * prompt puede decir dónde va (PromptCurso.nota).
 */
export function PromptsIA({ leccion, className = 'mt-8' }: { leccion: string; className?: string }) {
  const ids = PROMPTS_POR_LECCION[leccion] ?? [];
  if (!ids.length) return null;
  const aviso = AVISO_PROMPTS[leccion.split('-')[0]];
  // 13-nov-2026: si el módulo tiene mapa de huecos (hoy solo el 7), los prompts salen rellenados con «Los datos de tu negocio».
  const huecos = HUECOS_POR_MODULO[leccion.split('-')[0]];
  return (
    <section aria-label="Prompt para tu IA" className={className}>
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5fb2dd]">Prompt para tu IA</p>
      <p className="mt-2 text-sm text-slate-300">
        {aviso ?? 'Cópialo en ChatGPT o Claude (la versión gratis sirve) y cambia lo que está entre [corchetes] por los datos de tu negocio. Lo que te devuelva es un borrador: léelo y corrígelo antes de usarlo.'}
      </p>
      {ids.map((id) => {
        const pr = PROMPTS_CURSO[id];
        if (pr && huecos) {
          return (
            <BloquePrompt
              key={id}
              titulo={`Prompt ${pr.id} · ${pr.titulo}`}
              texto={pr.texto}
              huecos={huecos}
              className="mt-3"
              nota={pr.nota ?? 'No pegues datos sensibles (RUT, claves, cuentas bancarias). Si no te sirve, escribe «hazlo más corto» o «hazlo más simple».'}
            />
          );
        }
        return pr ? (
          <BloqueCopiar
            key={id}
            titulo={`Prompt ${pr.id} · ${pr.titulo}`}
            texto={pr.texto}
            className="mt-3"
            nota={pr.nota ?? 'No pegues datos sensibles (RUT, claves, cuentas bancarias). Si no te sirve, escribe «hazlo más corto» o «hazlo más simple».'}
          />
        ) : null;
      })}
    </section>
  );
}

// ─── Campos de texto persistidos ──────────────────────────────────────────

export type Campo = { id: string; etiqueta: string; placeholder?: string; ayuda?: string; filas?: number };

export function useTextos(clave: string) {
  return usePersistido(clave, TEXTOS_VACIOS);
}

const claseCampo =
  'mt-1.5 w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-[15px] text-slate-100 placeholder:text-slate-500 focus:border-[#5fb2dd] focus:outline-none';

export function Campos({
  clave,
  campos,
  ejemplo,
  className = 'mt-5',
}: {
  clave: string;
  campos: Campo[];
  /** Si se pasa, aparece el botón para partir desde el ejemplo de Grano Norte. */
  ejemplo?: Record<string, string>;
  className?: string;
}) {
  const [valores, setValores] = useTextos(clave);
  const vacios = campos.every((c) => !valores[c.id]?.trim());
  return (
    <div className={`space-y-4 ${className}`}>
      {ejemplo && vacios ? (
        <button type="button" onClick={() => setValores((p) => ({ ...ejemplo, ...p }))} className="inline-flex min-h-[44px] items-center gap-2 text-sm text-[#5fb2dd] hover:text-white">
          <Plus className="h-4 w-4" aria-hidden /> Partir desde el ejemplo de Grano Norte
        </button>
      ) : null}
      {campos.map((c) => (
        <label key={c.id} className="block text-sm text-slate-300">
          <span className="font-medium text-slate-200">{c.etiqueta}</span>
          {c.ayuda ? <span className="mt-0.5 block text-xs text-slate-400">{c.ayuda}</span> : null}
          {c.filas && c.filas > 1 ? (
            <textarea
              rows={c.filas}
              value={valores[c.id] ?? ''}
              placeholder={c.placeholder}
              onChange={(e) => setValores((p) => ({ ...p, [c.id]: e.target.value }))}
              className={`${claseCampo} resize-y`}
            />
          ) : (
            <input value={valores[c.id] ?? ''} placeholder={c.placeholder} onChange={(e) => setValores((p) => ({ ...p, [c.id]: e.target.value }))} className={`${claseCampo} min-h-[48px]`} />
          )}
        </label>
      ))}
    </div>
  );
}

// ─── Tabla editable (filas como tarjetas en celular) ──────────────────────

export type Fila = Record<string, string> & { _id: string };
export type Columna = { id: string; etiqueta: string; tipo?: 'texto' | 'numero' | 'fecha'; placeholder?: string; ancho?: 'completo' };

export function useFilas(clave: string) {
  return usePersistido(clave, FILAS_VACIAS);
}

let contadorFilas = 0;
export const nuevoId = () => `f${Date.now().toString(36)}${(contadorFilas += 1)}`;

export function TablaEditable({
  clave,
  columnas,
  ejemplo,
  etiquetaFila = 'Fila',
  textoAgregar = 'Agregar fila',
  maxFilas = 30,
  className = 'mt-5',
}: {
  clave: string;
  columnas: Columna[];
  ejemplo?: Record<string, string>[];
  etiquetaFila?: string;
  textoAgregar?: string;
  maxFilas?: number;
  className?: string;
}) {
  const [filas, setFilas] = useFilas(clave);
  const agregar = () => setFilas((p) => (p.length >= maxFilas ? p : [...p, { _id: nuevoId() } as Fila]));
  const editar = (id: string, col: string, v: string) => setFilas((p) => p.map((f) => (f._id === id ? { ...f, [col]: v } : f)));
  const quitar = (id: string) => setFilas((p) => p.filter((f) => f._id !== id));
  return (
    <div className={className}>
      {ejemplo && filas.length === 0 ? (
        <button
          type="button"
          onClick={() => setFilas(ejemplo.map((e) => ({ ...e, _id: nuevoId() }) as Fila))}
          className="mb-3 inline-flex min-h-[44px] items-center gap-2 text-sm text-[#5fb2dd] hover:text-white"
        >
          <Plus className="h-4 w-4" aria-hidden /> Partir desde el ejemplo de Grano Norte
        </button>
      ) : null}
      <ol className="space-y-3">
        {filas.map((f, i) => (
          <li key={f._id} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                {etiquetaFila} {i + 1}
              </span>
              <button type="button" onClick={() => quitar(f._id)} aria-label={`Quitar ${etiquetaFila.toLowerCase()} ${i + 1}`} className="-m-2 flex h-10 w-10 items-center justify-center text-slate-500 hover:text-slate-200">
                <Trash2 className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {columnas.map((c) => (
                <label key={c.id} className={`block min-w-0 text-xs text-slate-400 ${c.ancho === 'completo' || c.tipo === undefined || c.tipo === 'texto' ? 'col-span-2' : ''}`}>
                  {c.etiqueta}
                  <input
                    type={c.tipo === 'fecha' ? 'date' : 'text'}
                    inputMode={c.tipo === 'numero' ? 'numeric' : undefined}
                    value={f[c.id] ?? ''}
                    placeholder={c.placeholder}
                    onChange={(e) => editar(f._id, c.id, e.target.value)}
                    className="mt-1 min-h-[44px] w-full min-w-0 rounded-lg border border-white/10 bg-[#0f172a] px-3 text-[15px] text-slate-100 placeholder:text-slate-600 focus:border-[#5fb2dd] focus:outline-none"
                  />
                </label>
              ))}
            </div>
          </li>
        ))}
      </ol>
      {filas.length < maxFilas ? (
        <button type="button" onClick={agregar} className="mt-3 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-sm text-slate-200 hover:border-white/30">
          <Plus className="h-4 w-4" aria-hidden /> {textoAgregar}
        </button>
      ) : null}
    </div>
  );
}

// ─── Clasificador (ejercicio de ordenar en categorías) ───────────────────

export type ItemClasificar = { id: string; texto: string; correcta: string; porque: string };

export function Clasificador({
  clave,
  categorias,
  items,
  className = 'mt-5',
}: {
  clave: string;
  categorias: { id: string; etiqueta: string }[];
  items: ItemClasificar[];
  className?: string;
}) {
  const [resp, setResp, borrar] = useTextos(clave);
  const respondidas = items.filter((i) => resp[i.id]).length;
  const bien = items.filter((i) => resp[i.id] === i.correcta).length;
  const cols = categorias.length === 2 ? 'grid-cols-2' : 'grid-cols-3';
  return (
    <div className={className}>
      <ol className="space-y-3">
        {items.map((it, n) => {
          const r = resp[it.id];
          const ok = r === it.correcta;
          return (
            <li key={it.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <p className="text-slate-100">
                <span className="mr-2 font-mono text-xs text-slate-500">{n + 1}.</span>
                {it.texto}
              </p>
              <div className={`mt-3 grid ${cols} gap-2`} role="radiogroup" aria-label={it.texto}>
                {categorias.map((c) => {
                  const activa = r === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      role="radio"
                      aria-checked={activa}
                      onClick={() => setResp((p) => ({ ...p, [it.id]: c.id }))}
                      className={`min-h-[44px] rounded-lg border px-1.5 py-1.5 text-[13px] leading-tight transition ${
                        activa ? (ok ? 'border-emerald-400/70 bg-emerald-500/15 text-white' : 'border-rose-400/70 bg-rose-500/15 text-white') : 'border-white/15 text-slate-300 hover:border-white/30'
                      }`}
                    >
                      {c.etiqueta}
                    </button>
                  );
                })}
              </div>
              {r ? (
                <p className={`mt-2 text-sm ${ok ? 'text-emerald-300' : 'text-rose-300'}`} aria-live="polite">
                  {ok ? '✓ Bien. ' : `✗ Va en «${categorias.find((c) => c.id === it.correcta)?.etiqueta}». `}
                  <span className="text-slate-300">{it.porque}</span>
                </p>
              ) : null}
            </li>
          );
        })}
      </ol>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 p-3 text-sm text-slate-300">
        <span>
          {respondidas < items.length ? `Llevas ${respondidas} de ${items.length}.` : `Resultado: ${bien} de ${items.length} bien.`}
        </span>
        {respondidas > 0 ? (
          <button type="button" onClick={borrar} className="inline-flex min-h-[40px] items-center gap-1.5 text-slate-400 hover:text-white">
            <RotateCcw className="h-4 w-4" aria-hidden /> Repetir
          </button>
        ) : null}
      </div>
    </div>
  );
}

// ─── Elegir de una lista (con opción de editar) ───────────────────────────

export function Elegibles({ clave, opciones, className = 'mt-5' }: { clave: string; opciones: ItemCheck[]; className?: string }) {
  const [marcas, setMarcas] = usePersistido(clave, CHECKS_VACIOS);
  return (
    <ul className={`space-y-2 ${className}`}>
      {opciones.map((o) => {
        const hecho = !!marcas[o.id];
        return (
          <li key={o.id}>
            <button
              type="button"
              role="checkbox"
              aria-checked={hecho}
              onClick={() => setMarcas((p) => ({ ...p, [o.id]: !p[o.id] }))}
              className={`flex min-h-[48px] w-full items-start gap-3 rounded-xl border p-3 text-left transition ${hecho ? 'border-[#2175a1]/70 bg-[#2175a1]/10 text-white' : 'border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/25'}`}
            >
              <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${hecho ? 'border-[#2175a1] bg-[#2175a1]' : 'border-white/30'}`}>
                {hecho ? <Check className="h-3.5 w-3.5 text-white" aria-hidden /> : null}
              </span>
              <span>{o.texto}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export function useMarcas(clave: string) {
  return usePersistido(clave, CHECKS_VACIOS);
}

// ─── Video pendiente con su guion ─────────────────────────────────────────

/** Video de la lección (si ya está grabado, VIDEOS_CURSO[clave]) o el marcador «Video próximamente», con el guion desplegable. */
export function VideoPendiente({ titulo, guion, portada, posicion, clave }: { titulo: string; guion?: Guion; portada: ImagenApoyo; posicion?: string; clave?: string }) {
  const video = clave ? VIDEOS_CURSO[clave] : undefined;
  return (
    <div>
      {video ? <VideoMarco id={video.id} titulo={titulo} duracion={video.duracion} /> : <VideoProximamente titulo={titulo} foto={portada} posicion={posicion ?? 'center 30%'} />}
      {guion ? (
        <details className="group mt-3 rounded-xl border border-white/10 bg-white/[0.02]">
          <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-3 px-4 text-sm text-slate-300 hover:text-white">
            <span>{video ? 'Leer lo que digo en el video' : `Mientras se graba, lee lo que cuenta el video · ${guion.duracion}`}</span>
            <ChevronDown className="h-4 w-4 shrink-0 transition group-open:rotate-180" aria-hidden />
          </summary>
          <ol className="space-y-3 border-t border-white/10 px-4 py-4">
            {guion.escenas.map((e, i) => (
              <li key={i} className="text-sm">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                  {e.quien === 'alvaro' ? 'Álvaro en cámara' : 'En pantalla'} · {e.visual}
                </p>
                <p className="mt-1 text-slate-200">{e.voz}</p>
              </li>
            ))}
          </ol>
        </details>
      ) : null}
    </div>
  );
}

// ─── Checklist «Antes de seguir» ─────────────────────────────────────────

export function Checklist({ items, checks, onToggle, titulo = 'Antes de seguir' }: { items: ItemCheck[]; checks: Record<string, boolean>; onToggle: (id: string) => void; titulo?: string }) {
  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">{titulo}</p>
      <ul className="mt-3 space-y-1">
        {items.map((c) => {
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

// ─── Navegación entre módulos ─────────────────────────────────────────────

export function NavModulos({ actual, className = '' }: { actual: number; className?: string }) {
  return (
    <nav aria-label="Módulos del curso" className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Módulos</span>
      {MODULOS.map((m) => (
        <Link
          key={m.numero}
          href={rutaModulo(m.numero)}
          aria-current={m.numero === actual ? 'page' : undefined}
          aria-label={`Módulo ${m.numero}: ${m.titulo}`}
          className={`flex h-8 w-8 items-center justify-center rounded-full border font-mono text-xs transition ${
            m.numero === actual ? 'border-[#5fb2dd] bg-[#5fb2dd]/20 text-white' : 'border-white/15 text-slate-300 hover:border-white/40'
          }`}
        >
          {m.numero}
        </Link>
      ))}
    </nav>
  );
}

/** Pie con los enlaces al módulo anterior y al siguiente. */
export function PieModulos({ actual }: { actual: number }) {
  const anterior = MODULOS.find((m) => m.numero === actual - 1);
  const siguiente = MODULOS.find((m) => m.numero === actual + 1);
  return (
    <div className="mt-10 flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
      {anterior ? (
        <Link href={rutaModulo(anterior.numero)} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-center text-sm text-slate-300 hover:border-white/30">
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden /> Módulo {anterior.numero} · {anterior.area}
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}
      {siguiente ? (
        <Link href={rutaModulo(siguiente.numero)} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#FF3D8B] px-6 text-center text-sm font-semibold text-white hover:bg-[#ff5c9f]">
          Ir al módulo {siguiente.numero} · {siguiente.area} <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
        </Link>
      ) : null}
    </div>
  );
}

// ─── Semáforo del área: antes (diagnóstico del módulo 0) y después ───────

export function useNegocio() {
  const [negocio] = usePersistido(CLAVES_STORAGE.negocio, '');
  return negocio;
}

export function SemaforoArea({ area, clave }: { area: AreaId; clave: string }) {
  const montado = useMontado();
  const [antes] = usePersistido(CLAVES_STORAGE.diagnostico, RESPUESTAS_VACIAS);
  const [despues, setDespues, borrar] = usePersistido(clave, RESPUESTAS_VACIAS);
  const preguntas = PREGUNTAS.filter((p) => p.area === area);
  const nombre = AREAS.find((a) => a.id === area)?.nombre ?? '';
  const puntaje = (r: Record<string, Respuesta>) => preguntas.reduce((s, p) => s + (r[p.id] ?? 0), 0);
  const antesCompleto = montado && preguntas.every((p) => antes[p.id] !== undefined);
  const despuesCompleto = montado && preguntas.every((p) => despues[p.id] !== undefined);
  return (
    <div className="mt-4">
      <ol className="space-y-3">
        {preguntas.map((p) => (
          <li key={p.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <p className="text-slate-100">{p.texto}</p>
            <div className="mt-3 grid grid-cols-3 gap-2" role="radiogroup" aria-label={p.texto}>
              {OPCIONES_DIAGNOSTICO.map((o) => {
                const activa = montado && despues[p.id] === o.valor;
                return (
                  <button
                    key={o.valor}
                    type="button"
                    role="radio"
                    aria-checked={activa}
                    onClick={() => setDespues((prev) => ({ ...prev, [p.id]: o.valor }))}
                    className={`min-h-[44px] rounded-lg border text-sm transition ${activa ? 'border-[#5fb2dd] bg-[#2175a1] text-white' : 'border-white/15 text-slate-300 hover:border-white/30'}`}
                  >
                    {o.texto}
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-4 grid grid-cols-2 gap-3" aria-live="polite">
        <div className="rounded-xl border border-white/10 p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">Antes · módulo 0</p>
          {antesCompleto ? (
            <p className="mt-2 flex items-center gap-2 text-white">
              <PuntoSemaforo semaforo={semaforoDe(puntaje(antes))} /> {ETIQUETA_SEMAFORO[semaforoDe(puntaje(antes))]} · {puntaje(antes)}/6
            </p>
          ) : (
            <p className="mt-2 text-sm text-slate-400">
              Sin dato. <Link href={`${rutaModulo(0)}#leccion-2`} className="text-[#5fb2dd] hover:underline">Responde el diagnóstico</Link>.
            </p>
          )}
        </div>
        <div className="rounded-xl border border-[#5fb2dd]/40 bg-[#2175a1]/10 p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5fb2dd]">Después · hoy</p>
          {despuesCompleto ? (
            <p className="mt-2 flex items-center gap-2 text-white">
              <PuntoSemaforo semaforo={semaforoDe(puntaje(despues))} /> {ETIQUETA_SEMAFORO[semaforoDe(puntaje(despues))]} · {puntaje(despues)}/6
            </p>
          ) : (
            <p className="mt-2 text-sm text-slate-400">Responde las 3 preguntas de {nombre.toLowerCase()}.</p>
          )}
        </div>
      </div>
      {montado && Object.keys(despues).length > 0 ? (
        <button type="button" onClick={borrar} className="mt-3 inline-flex min-h-[40px] items-center gap-1.5 text-sm text-slate-400 hover:text-white">
          <RotateCcw className="h-4 w-4" aria-hidden /> Volver a responder
        </button>
      ) : null}
    </div>
  );
}

/** Lee el semáforo «después» de un área (para el tablero final). */
export function semaforoGuardado(area: AreaId, r: Record<string, Respuesta>): Semaforo | null {
  const preguntas = PREGUNTAS.filter((p) => p.area === area);
  if (!preguntas.every((p) => r[p.id] !== undefined)) return null;
  return semaforoDe(preguntas.reduce((s, p) => s + (r[p.id] ?? 0), 0));
}

// ─── Página de cierre de un módulo ────────────────────────────────────────

export function CierreModulo({
  numero,
  area,
  pruebaReal,
  resumen,
  descargar,
  extra,
  hoja,
}: {
  numero: number;
  area: AreaId;
  /** Hoja (o hojas) de la planilla del sistema que se trabajan en el módulo. */
  hoja?: string;
  pruebaReal: ItemCheck[];
  /** Lo que la persona armó en el módulo, para revisar antes de descargar. */
  resumen: ReactNode;
  descargar: () => void;
  extra?: ReactNode;
}) {
  const modulo = MODULOS.find((m) => m.numero === numero)!;
  const [prueba, setPrueba] = useMarcas(claveModulo(numero, 'prueba'));
  const montado = useMontado();
  return (
    <section className="mx-auto max-w-3xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14">
      <Kicker>Cierre del módulo {numero}</Kicker>
      <h2 className="mt-3 font-serif text-3xl leading-tight text-white sm:text-4xl">Tu semana de prueba y tu entregable</h2>
      <p className="mt-3 text-slate-300">
        Lo que armaste en las lecciones se prueba ahora con tu negocio, durante la semana. Al terminar, vuelve, mide esta pieza otra vez y descarga el entregable: se suma a la planilla de tu sistema.
      </p>

      <Subtitulo>1 · La prueba real</Subtitulo>
      <p className="mt-2 text-slate-300">{modulo.pruebaReal}</p>
      <Checklist items={pruebaReal} checks={montado ? prueba : CHECKS_VACIOS} onToggle={(id) => setPrueba((p) => ({ ...p, [id]: !p[id] }))} titulo="Durante la semana" />
      {extra}

      <Subtitulo>2 · Tu semáforo de {AREAS.find((a) => a.id === area)?.nombre.toLowerCase()}, antes y después</Subtitulo>
      <p className="mt-2 text-slate-300">Las mismas 3 preguntas del diagnóstico. Respóndelas pensando en cómo funciona hoy, después de la prueba.</p>
      <SemaforoArea area={area} clave={claveModulo(numero, 'despues')} />

      <Subtitulo>3 · Tu entregable: {modulo.entregable.replace(/\.$/, '').toLowerCase()}</Subtitulo>
      <div className="mt-4 rounded-2xl border border-white/15 bg-white/[0.03] p-5 sm:p-6">{resumen}</div>
      <div className="mt-4">
        <BotonDescarga principal etiqueta="Descargar mi entregable (.txt)" onClick={descargar} />
      </div>
      {hoja ? (
        <>
          <Subtitulo>4 · Tu planilla: {hoja}</Subtitulo>
          <p className="mt-2 text-slate-300">
            Lo de esta semana vive en tu planilla del sistema, la misma que abriste en el módulo 0. Si todavía no la tienes, o te falta una hoja, descárgala aquí y copia la hoja que necesitas.
          </p>
          <DescargaPlantilla className="mt-4" titulo="La planilla de tu sistema" />
        </>
      ) : null}
      <PieModulos actual={numero} />
    </section>
  );
}

/** Fila del resumen: etiqueta + valor (o «pendiente» con la lección donde se hace). */
export function FilaResumen({ etiqueta, valor, leccion }: { etiqueta: string; valor?: ReactNode; leccion: number }) {
  const vacio = valor === undefined || valor === null || valor === '' || (Array.isArray(valor) && valor.length === 0);
  return (
    <div className="border-t border-white/10 py-3 first:border-t-0 first:pt-0 last:pb-0">
      <p className="text-xs uppercase tracking-wider text-slate-400">{etiqueta}</p>
      {vacio ? (
        <p className="mt-1 text-sm text-slate-500">
          Pendiente: <a href={`#leccion-${leccion}`} className="text-[#5fb2dd] underline-offset-2 hover:underline">lección {leccion}</a>.
        </p>
      ) : (
        <div className="mt-1 whitespace-pre-line break-words text-sm text-slate-100">{valor}</div>
      )}
    </div>
  );
}

// ─── La página del módulo: barra, lecciones y cierre ──────────────────────

function suscribirHash(cb: () => void) {
  window.addEventListener('hashchange', cb);
  return () => window.removeEventListener('hashchange', cb);
}

function useHash() {
  return useSyncExternalStore(suscribirHash, () => window.location.hash, () => '');
}

export function ModuloCurso({
  numero,
  intro,
  portada,
  portadaPosicion = 'center',
  lecciones,
  cierre,
  etiquetaCierre = 'Cierre',
  textoIrCierre = 'Ir al cierre del módulo',
}: {
  numero: number;
  intro: string;
  portada: ImagenApoyo;
  portadaPosicion?: string;
  lecciones: LeccionDef[];
  cierre: ReactNode;
  etiquetaCierre?: string;
  textoIrCierre?: string;
}) {
  const modulo = MODULOS.find((m) => m.numero === numero)!;
  const montado = useMontado();
  const [checks, setChecks] = usePersistido(claveModulo(numero, 'checklist'), CHECKS_VACIOS);
  const [paginaGuardada, setPaginaGuardada] = usePersistido(claveModulo(numero, 'pagina'), PAGINA_INICIAL);
  const hash = useHash();

  const PAGINA_CIERRE = lecciones.length;
  const hashDe = (p: number) => (p >= PAGINA_CIERRE ? '#cierre' : `#leccion-${p + 1}`);
  const desdeHash = useMemo(() => {
    if (hash === '#cierre') return lecciones.length;
    const m = /^#leccion-(\d)$/.exec(hash);
    if (!m) return null;
    const n = Number(m[1]) - 1;
    return n >= 0 && n < lecciones.length ? n : null;
  }, [hash, lecciones.length]);
  const pagina = desdeHash ?? (paginaGuardada >= 0 && paginaGuardada <= PAGINA_CIERRE ? paginaGuardada : 0);

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

  const todos = lecciones.flatMap((l) => l.checklist);
  const hechos = montado ? todos.filter((c) => checks[c.id]).length : 0;
  const toggle = (id: string) => setChecks((p) => ({ ...p, [id]: !p[id] }));
  const leccionHecha = (l: LeccionDef) => montado && l.checklist.every((c) => checks[c.id]);
  const checksVisibles = montado ? checks : CHECKS_VACIOS;
  const leccion = pagina < PAGINA_CIERRE ? lecciones[pagina] : null;
  const titulo = (i: number) => modulo.lecciones[i]?.titulo ?? '';

  return (
    <main className="w-full overflow-x-clip">
      <div className="mod-no-print sticky top-0 z-20 border-b border-white/10 bg-[#0f172a]/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-2 px-4 py-3 sm:gap-3 sm:px-6">
          <Link
            href={rutaModulo(numero - 1)}
            aria-label={`Volver al módulo ${numero - 1}`}
            className="-ml-2 inline-flex min-h-[32px] shrink-0 items-center gap-1 rounded-full px-2 text-sm text-slate-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> <span className="font-mono text-xs">M{numero - 1}</span>
          </Link>
          <nav aria-label="Lecciones" className="flex min-w-0 flex-1 items-center justify-center gap-1 sm:gap-1.5">
            {lecciones.map((l, i) => {
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
                  aria-label={`Lección ${i + 1}: ${titulo(i)}`}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-xs transition ${
                    actual ? 'border-[#5fb2dd] bg-[#5fb2dd]/20 text-white ring-2 ring-[#5fb2dd]/30' : hecha ? 'border-[#2175a1] bg-[#2175a1] text-white' : 'border-white/15 text-slate-300 hover:border-white/40'
                  }`}
                >
                  {hecha && !actual ? <Check className="h-3.5 w-3.5" aria-hidden /> : i + 1}
                </a>
              );
            })}
            <a
              href="#cierre"
              onClick={(e) => {
                e.preventDefault();
                ir(PAGINA_CIERRE);
              }}
              aria-current={pagina === PAGINA_CIERRE ? 'page' : undefined}
              className={`ml-0.5 inline-flex h-8 shrink-0 items-center rounded-full border px-2.5 text-xs transition sm:ml-1 sm:px-3 ${
                pagina === PAGINA_CIERRE ? 'border-[#5fb2dd] bg-[#5fb2dd]/20 text-white' : 'border-white/15 text-slate-300 hover:border-white/40'
              }`}
            >
              {etiquetaCierre}
            </a>
          </nav>
          <span className="shrink-0 font-mono text-xs text-slate-400" aria-label="Avance del módulo">
            {hechos}/{todos.length}
          </span>
        </div>
        <div className="h-0.5 bg-white/5">
          <div className="h-full bg-[#5fb2dd] transition-all" style={{ width: `${(hechos / Math.max(1, todos.length)) * 100}%` }} />
        </div>
      </div>

      {pagina === 0 ? (
        <header className="mod-no-print mx-auto max-w-3xl px-4 pb-2 pt-10 sm:px-6 sm:pt-14">
          <div className="grid items-center gap-6 sm:grid-cols-[1fr_200px]">
            <figure className="relative order-first aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 sm:order-last sm:aspect-[4/5]">
              <Foto foto={portada} posicion={portadaPosicion} prioridad />
            </figure>
            <div>
              <Kicker>
                Módulo {numero} · {modulo.area} · {modulo.duracion}
              </Kicker>
              <h1 className="mt-4 font-serif text-4xl leading-tight text-white sm:text-5xl">{modulo.titulo}</h1>
              <p className="mt-4 text-slate-300">{intro}</p>
              <p className="mt-3 text-sm text-slate-500">Tu avance se guarda en este navegador.</p>
            </div>
          </div>
          <NavModulos actual={numero} className="mt-6" />
        </header>
      ) : null}

      {leccion ? (
        <div className="mod-no-print mx-auto max-w-3xl px-4 sm:px-6">
          <section key={leccion.id} className={pagina === 0 ? 'pb-16 pt-8' : 'pb-16 pt-10 sm:pt-14'}>
            <Kicker>
              Lección {pagina + 1} de {lecciones.length}
            </Kicker>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-white sm:text-4xl">{titulo(pagina)}</h2>
            <p className="mt-3 max-w-2xl text-slate-300">{leccion.bajada}</p>
            <div className="mt-6">
              <VideoPendiente titulo={titulo(pagina)} guion={GUIONES[`m${numero}-l${pagina + 1}`]} portada={leccion.portada} posicion={leccion.posicion} clave={`m${numero}-l${pagina + 1}`} />
            </div>
            {leccion.contenido}
            <PromptsIA leccion={`m${numero}-l${pagina + 1}`} />
            <Checklist items={leccion.checklist} checks={checksVisibles} onToggle={toggle} />
            <div className="mt-10 flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              {pagina > 0 ? (
                <button type="button" onClick={() => ir(pagina - 1)} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-sm text-slate-300 hover:border-white/30">
                  <ArrowLeft className="h-4 w-4" aria-hidden /> Anterior
                </button>
              ) : (
                <span className="hidden sm:block" />
              )}
              <button type="button" onClick={() => ir(pagina + 1)} className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#FF3D8B] px-6 text-center text-sm font-semibold text-white hover:bg-[#ff5c9f]">
                {pagina + 1 < PAGINA_CIERRE ? `Siguiente lección: ${titulo(pagina + 1)}` : textoIrCierre}
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </button>
            </div>
          </section>
        </div>
      ) : (
        cierre
      )}
    </main>
  );
}
