'use client';

/*
 * Descarga de la planilla del sistema (curso v1.1, 8-nov-2026): tu primer CRM y ERP en un .xlsx que se abre en
 * Google Sheets o Excel. Se arma en el navegador (lib/productos/curso/plantilla.ts) con la ficha del módulo 0 y,
 * si la persona hizo la Guía 1 en este navegador, con su lista de posibles clientes en la hoja Clientes.
 */

import { useState } from 'react';
import { Download, FileSpreadsheet } from 'lucide-react';
import { CLAVES_STORAGE } from '@/lib/productos/curso/curso';
import { useMontado, usePersistido } from '@/lib/productos/curso/persistencia';
import { descargarPlantillaSistema, leerClientesGuia, type FichaNegocio } from '@/lib/productos/curso/plantilla';

export type FichaGuardada = Omit<FichaNegocio, 'negocio'>;
export const FICHA_VACIA: FichaGuardada = { queVendes: '', aQuien: '', productos: [] };

export function useFicha() {
  return usePersistido(CLAVES_STORAGE.ficha, FICHA_VACIA);
}

/**
 * 13-nov-2026 (Álvaro: «mejor damos la planilla desde un inicio y que la vaya trabajando»): la planilla vacía se descarga
 * como paso principal SOLO en el módulo 0. `continuar` = módulos 1–6: en vez del botón grande, una línea chica con un
 * enlace que sí descarga (para no dejar a nadie sin archivo). El ejemplo de Grano Norte se mantiene donde se practica con él.
 */
export function DescargaPlantilla({ titulo = 'La planilla de tu sistema', texto, className = 'mt-6', continuar = false }: { titulo?: string; texto?: string; className?: string; continuar?: boolean }) {
  const montado = useMontado();
  const [negocio] = usePersistido(CLAVES_STORAGE.negocio, '');
  const [ficha] = useFicha();
  const [cargando, setCargando] = useState<'mia' | 'ejemplo' | null>(null);
  const [error, setError] = useState(false);
  const deGuia = montado ? leerClientesGuia().length : 0;

  const bajar = async (tipo: 'mia' | 'ejemplo') => {
    setCargando(tipo);
    setError(false);
    try {
      await descargarPlantillaSistema(
        tipo === 'ejemplo' ? { ejemplo: true } : { ficha: { ...ficha, negocio }, clientesGuia: leerClientesGuia() },
      );
    } catch {
      setError(true);
    } finally {
      setCargando(null);
    }
  };

  return (
    <div className={`rounded-2xl border border-[#2175a1]/40 bg-[#2175a1]/[0.08] p-5 sm:p-6 ${className}`}>
      <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#5fb2dd]">
        <FileSpreadsheet className="h-4 w-4" aria-hidden /> Excel · Google Sheets
      </p>
      <p className="mt-2 font-serif text-xl text-white">{titulo}</p>
      <p className="mt-2 text-sm text-slate-300">
        {texto ??
          'Una sola planilla con las hojas Clientes, Origen, Productos, Pedidos, Atención, Cobranza, Caja y Tablero, ya conectadas y con las fórmulas listas. Tú llenas filas; los totales se calculan solos.'}
      </p>
      {deGuia > 0 && !continuar ? (
        <p className="mt-2 text-sm text-slate-300">
          Encontramos {deGuia} {deGuia === 1 ? 'posible cliente' : 'posibles clientes'} de tu Guía 1 en este navegador: {deGuia === 1 ? 'entra' : 'entran'} solos a tu hoja Clientes.
        </p>
      ) : null}
      {continuar ? <SigueLinea onBajar={() => bajar('mia')} cargando={cargando === 'mia'} className="mt-3" /> : null}
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        {continuar ? null : (
        <button
          type="button"
          onClick={() => bajar('mia')}
          disabled={cargando !== null}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#2175a1] px-5 text-sm font-semibold text-white transition hover:bg-[#2a86b6] disabled:opacity-60"
        >
          <Download className="h-4 w-4" aria-hidden /> {cargando === 'mia' ? 'Armando…' : 'Descargar mi planilla (.xlsx)'}
        </button>
        )}
        <button
          type="button"
          onClick={() => bajar('ejemplo')}
          disabled={cargando !== null}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-sm text-slate-200 transition hover:border-[#5fb2dd]/60 hover:text-white disabled:opacity-60"
        >
          <Download className="h-4 w-4" aria-hidden /> {cargando === 'ejemplo' ? 'Armando…' : 'Ver el ejemplo de Grano Norte'}
        </button>
      </div>
      <p className="mt-3 text-xs text-slate-400">
        Para Google Sheets: sube el archivo a Google Drive y ábrelo con Google Sheets. Las fórmulas y las listas se mantienen.
      </p>
      {error ? <p className="mt-2 text-sm text-rose-300">No se pudo armar el archivo. Prueba de nuevo o desde otro navegador.</p> : null}
    </div>
  );
}

function SigueLinea({ onBajar, cargando, className = '' }: { onBajar: () => void; cargando: boolean; className?: string }) {
  return (
    <p className={`text-sm text-slate-300 ${className}`}>
      Sigue con la planilla del módulo 0. ¿No la tienes o la perdiste?{' '}
      <button type="button" onClick={onBajar} disabled={cargando} className="min-h-[44px] text-[#5fb2dd] underline underline-offset-2 hover:text-white disabled:opacity-60">
        {cargando ? 'Armando…' : 'Descárgala aquí'}
      </button>
    </p>
  );
}

/** Módulos 1–6: solo la línea «sigue con tu planilla», sin caja ni botón de ejemplo. Descarga la misma planilla del módulo 0. */
export function SigueConTuPlanilla({ className = 'mt-4' }: { className?: string }) {
  const [negocio] = usePersistido(CLAVES_STORAGE.negocio, '');
  const [ficha] = useFicha();
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(false);
  const bajar = async () => {
    setCargando(true);
    setError(false);
    try {
      await descargarPlantillaSistema({ ficha: { ...ficha, negocio }, clientesGuia: leerClientesGuia() });
    } catch {
      setError(true);
    } finally {
      setCargando(false);
    }
  };
  return (
    <div className={className}>
      <SigueLinea onBajar={bajar} cargando={cargando} />
      {error ? <p className="mt-1 text-sm text-rose-300">No se pudo armar el archivo. Prueba de nuevo o desde otro navegador.</p> : null}
    </div>
  );
}
