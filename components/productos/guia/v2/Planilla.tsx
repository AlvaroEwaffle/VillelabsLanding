'use client';

import { useState } from 'react';
import { PLATAFORMAS } from '@/lib/productos/guia/contenido-v2';
import { ESTADOS, aTSV, descargarCSV, descargarXLSX } from '@/lib/productos/guia/planilla';
import { filaConDatos, filaVacia, puntaje, useProgreso, type Fila } from '@/lib/productos/guia/progreso-v2';
import { btnPrimario, btnSecundario } from './ui';

export type ModoPlanilla = 'base' | 'puntaje' | 'seguimiento' | 'completa';

type Campo = {
  k: keyof Fila;
  label: string;
  tipo: 'text' | 'email' | 'tel' | 'estado' | 'score' | 'date' | 'fuente' | 'proximo';
  ancho: string;
};

const C: Record<string, Campo> = {
  nombre: { k: 'nombre', label: 'Nombre', tipo: 'text', ancho: 'min-w-[140px]' },
  empresa: { k: 'empresa', label: 'Empresa', tipo: 'text', ancho: 'min-w-[150px]' },
  email: { k: 'email', label: 'Email', tipo: 'email', ancho: 'min-w-[170px]' },
  whatsapp: { k: 'whatsapp', label: 'WhatsApp', tipo: 'tel', ancho: 'min-w-[130px]' },
  fuente: { k: 'fuente', label: 'Fuente', tipo: 'fuente', ancho: 'min-w-[150px]' },
  senal: { k: 'senal', label: 'Señal', tipo: 'text', ancho: 'min-w-[180px]' },
  encaje: { k: 'encaje', label: 'Encaje', tipo: 'score', ancho: '' },
  senalPts: { k: 'senalPts', label: 'Señal (pts)', tipo: 'score', ancho: '' },
  acceso: { k: 'acceso', label: 'Acceso', tipo: 'score', ancho: '' },
  estado: { k: 'estado', label: 'Estado', tipo: 'estado', ancho: 'min-w-[140px]' },
  proximo: { k: 'proximo', label: 'Próximo paso', tipo: 'proximo', ancho: 'min-w-[170px]' },
  fecha: { k: 'fecha', label: 'Fecha exacta', tipo: 'date', ancho: 'min-w-[150px]' },
};

const CAMPOS: Record<ModoPlanilla, Campo[]> = {
  base: [C.nombre, C.empresa, C.email, C.whatsapp, C.fuente, C.senal],
  puntaje: [C.encaje, C.senalPts, C.acceso],
  seguimiento: [C.estado, C.proximo, C.fecha],
  completa: [C.nombre, C.empresa, C.email, C.whatsapp, C.fuente, C.senal, C.encaje, C.senalPts, C.acceso, C.estado, C.proximo, C.fecha],
};

const PROXIMOS = ['Primer mensaje', 'Seguimiento día 2', 'Seguimiento día 7', 'Seguimiento día 14', 'Llamar', 'Enviar propuesta', 'Escribir en un mes'];
const inputCls =
  'h-11 w-full rounded-lg border border-white/15 bg-[#0b1222] px-3 text-base text-white placeholder:text-slate-600 focus:border-[#5fb2dd] focus:outline-none md:h-10 md:text-sm';

function Score({ valor, onCambio, label }: { valor: string; onCambio: (v: string) => void; label: string }) {
  return (
    <div className="flex gap-1" role="group" aria-label={label}>
      {['1', '2', '3'].map((n) => (
        <button
          key={n}
          type="button"
          aria-pressed={valor === n}
          onClick={() => onCambio(valor === n ? '' : n)}
          className={`h-11 w-11 rounded-lg border text-sm font-semibold transition md:h-10 md:w-10 ${
            valor === n ? 'border-[#5fb2dd] bg-[#2175a1] text-white' : 'border-white/15 text-slate-300 hover:border-white/30'
          }`}
        >
          {n}
        </button>
      ))}
    </div>
  );
}

function Entrada({ campo, fila, onCambio }: { campo: Campo; fila: Fila; onCambio: (v: string) => void }) {
  const v = fila[campo.k] as string;
  const aria = `${campo.label} de ${fila.nombre || 'la fila'}`;
  switch (campo.tipo) {
    case 'score':
      return <Score valor={v} onCambio={onCambio} label={aria} />;
    case 'estado':
      return (
        <select aria-label={aria} value={v} onChange={(e) => onCambio(e.target.value)} className={inputCls}>
          {ESTADOS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      );
    case 'date':
      return <input aria-label={aria} type="date" value={v} onChange={(e) => onCambio(e.target.value)} className={`${inputCls} [color-scheme:dark]`} />;
    case 'fuente':
      return <input aria-label={aria} list="vl-fuentes" value={v} onChange={(e) => onCambio(e.target.value)} className={inputCls} placeholder="Google Maps…" />;
    case 'proximo':
      return <input aria-label={aria} list="vl-proximos" value={v} onChange={(e) => onCambio(e.target.value)} className={inputCls} placeholder="Seguimiento día 2…" />;
    default:
      return (
        <input
          aria-label={aria}
          type={campo.tipo}
          inputMode={campo.tipo === 'tel' ? 'tel' : campo.tipo === 'email' ? 'email' : undefined}
          value={v}
          onChange={(e) => onCambio(e.target.value)}
          className={inputCls}
        />
      );
  }
}

export function Planilla({ modo, titulo }: { modo: ModoPlanilla; titulo?: string }) {
  const [p, actualizar] = useProgreso();
  const filas = p.prospectos;
  const campos = CAMPOS[modo];
  const soloLectura = modo === 'puntaje' || modo === 'seguimiento';
  const conDatos = filas.filter(filaConDatos).length;
  const visibles = soloLectura ? filas.filter(filaConDatos) : filas;

  const cambiar = (id: string, k: keyof Fila, v: string) =>
    actualizar((x) => ({ ...x, prospectos: x.prospectos.map((f) => (f.id === id ? { ...f, [k]: v } : f)) }));
  const agregar = (n: number) =>
    actualizar((x) => ({ ...x, prospectos: [...x.prospectos, ...Array.from({ length: n }, filaVacia)] }));
  const quitar = (id: string) => actualizar((x) => ({ ...x, prospectos: x.prospectos.filter((f) => f.id !== id) }));

  return (
    <div className="mt-4">
      <datalist id="vl-fuentes">
        {PLATAFORMAS.map((pl) => (
          <option key={pl.nombre} value={pl.nombre} />
        ))}
      </datalist>
      <datalist id="vl-proximos">
        {PROXIMOS.map((x) => (
          <option key={x} value={x} />
        ))}
      </datalist>

      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-slate-300">
          {titulo ?? 'Tu planilla'} · <strong className="text-white">{conDatos}</strong> de 20 posibles clientes · se guarda sola
        </p>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10 sm:w-40">
          <div className="h-full rounded-full bg-[#5fb2dd] transition-[width]" style={{ width: `${Math.min(100, (conDatos / 20) * 100)}%` }} />
        </div>
      </div>

      {visibles.length === 0 && (
        <p className="rounded-xl border border-dashed border-white/15 p-4 text-sm text-slate-400">
          {soloLectura ? 'Todavía no tienes posibles clientes. Agrégalos en la parte 2.' : 'Agrega tu primera fila para empezar.'}
        </p>
      )}

      {/* Escritorio: tabla */}
      {visibles.length > 0 && (
        <div className="hidden overflow-x-auto rounded-xl border border-white/10 md:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#2175a1]/25 text-xs uppercase tracking-wider text-slate-300">
              <tr>
                <th className="px-2 py-2">#</th>
                {soloLectura && <th className="px-2 py-2">Posible cliente</th>}
                {campos.map((c) => (
                  <th key={c.k} className="px-2 py-2">
                    {c.label}
                  </th>
                ))}
                {(modo === 'puntaje' || modo === 'completa') && <th className="px-2 py-2">Total</th>}
                {!soloLectura && <th className="px-2 py-2" />}
              </tr>
            </thead>
            <tbody>
              {visibles.map((f, i) => (
                <tr key={f.id} className="border-t border-white/5 align-middle">
                  <td className="px-2 py-1.5 text-slate-500">{i + 1}</td>
                  {soloLectura && (
                    <td className="min-w-[160px] px-2 py-1.5 text-white">
                      {f.nombre || '—'}
                      <span className="block text-xs text-slate-400">{f.empresa}</span>
                    </td>
                  )}
                  {campos.map((c) => (
                    <td key={c.k} className={`px-1.5 py-1.5 ${c.ancho}`}>
                      <Entrada campo={c} fila={f} onCambio={(v) => cambiar(f.id, c.k, v)} />
                    </td>
                  ))}
                  {(modo === 'puntaje' || modo === 'completa') && (
                    <td className="px-2 py-1.5 font-serif text-lg text-[#5fb2dd]">{puntaje(f) || '—'}</td>
                  )}
                  {!soloLectura && (
                    <td className="px-1 py-1.5">
                      <button type="button" aria-label={`Quitar fila ${i + 1}`} onClick={() => quitar(f.id)} className="h-10 w-10 rounded-lg text-slate-500 hover:text-white">
                        ×
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Móvil: tarjetas */}
      <div className="space-y-3 md:hidden">
        {visibles.map((f, i) => (
          <div key={f.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="min-w-0 truncate font-semibold text-white">
                <span className="mr-2 text-slate-500">{i + 1}</span>
                {f.nombre || f.empresa || 'Fila nueva'}
                {soloLectura && f.empresa && f.nombre && <span className="font-normal text-slate-400"> · {f.empresa}</span>}
              </p>
              {(modo === 'puntaje' || modo === 'completa') && (
                <span className="shrink-0 rounded-full bg-[#2175a1]/30 px-2.5 py-0.5 font-serif text-[#5fb2dd]">{puntaje(f) || '—'}/9</span>
              )}
              {!soloLectura && (
                <button type="button" aria-label={`Quitar fila ${i + 1}`} onClick={() => quitar(f.id)} className="h-11 w-11 shrink-0 rounded-lg text-xl text-slate-500">
                  ×
                </button>
              )}
            </div>
            <div className="grid gap-2">
              {campos.map((c) => (
                <label key={c.k} className="block">
                  <span className="mb-1 block text-xs text-slate-400">{c.label}</span>
                  <Entrada campo={c} fila={f} onCambio={(v) => cambiar(f.id, c.k, v)} />
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {!soloLectura && (
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" className={btnPrimario} onClick={() => agregar(1)}>
            + fila
          </button>
          <button type="button" className={btnSecundario} onClick={() => agregar(5)}>
            + 5 filas
          </button>
        </div>
      )}
    </div>
  );
}

export function ExportarPlanilla() {
  const [p] = useProgreso();
  const [aviso, setAviso] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const excel = async () => {
    setCargando(true);
    try {
      await descargarXLSX(p.prospectos, p.prueba);
      setAviso('Listo: guarda «mi-sistema-de-ventas.xlsx» en tu carpeta «Mi sistema de ventas».');
    } catch {
      setAviso('No se pudo generar el Excel. Prueba con el CSV.');
    } finally {
      setCargando(false);
    }
  };

  const sheets = () => {
    const tsv = aTSV(p.prospectos);
    navigator.clipboard?.writeText(tsv).catch(() => undefined);
    window.open('https://sheets.new', '_blank', 'noopener');
    setAviso('Copiamos tu planilla. En la hoja nueva de Google Sheets, haz clic en la celda A1 y pega con Ctrl+V (Cmd+V en Mac).');
  };

  return (
    <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="font-semibold text-white">Llévate tu primer CRM</p>
      <p className="text-sm text-slate-400">Funciona en Excel o en Google Sheets. El Excel trae 4 hojas: Posibles clientes, Prueba 5 días, Calendario y Dashboard.</p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <button type="button" className={btnPrimario} onClick={excel} disabled={cargando}>
          {cargando ? 'Generando…' : 'Descargar Excel (.xlsx)'}
        </button>
        <button type="button" className={btnSecundario} onClick={sheets}>
          Abrir en Google Sheets
        </button>
        <button type="button" className={btnSecundario} onClick={() => descargarCSV(p.prospectos)}>
          Descargar CSV
        </button>
      </div>
      {aviso && (
        <p role="status" className="mt-3 rounded-lg bg-[#2175a1]/20 p-3 text-sm text-slate-100">
          {aviso}
        </p>
      )}
    </div>
  );
}
