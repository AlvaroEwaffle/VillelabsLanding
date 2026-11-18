'use client';

import { useSyncExternalStore } from 'react';
import { ArrowRight } from 'lucide-react';
import { EXP14 } from '@/lib/productos/esqueleto/exp14';
import { leerUtm } from '@/lib/productos/utm';
import { TALLER, srcLista } from '@/lib/productos/taller';

// Franja del taller en vivo (18-nov-2026, propuesta del embudo-analista): salida a /lista para quien prefiere armarlo en
// vivo y no solo. Sin precio. Cambio común a A y B de EXP-19, detrás de TALLER.franjaEsqueleto (lib/productos/taller.ts).
// src = esq-<utm_content> o, sin anuncio, esq-<variante>; en el resultado, esq-fin-<…>, para separar las dos posiciones.

const sinSuscripcion = () => () => {};
function conParametroQa(): boolean {
  try {
    return new URLSearchParams(window.location.search).get('taller') === '1';
  } catch {
    return false;
  }
}

/** ¿Se muestra la franja? El flag manda; con el flag apagado, `?taller=1` la muestra solo a esa visita (QA). */
export function useFranjaTaller(): boolean {
  return useSyncExternalStore(
    sinSuscripcion,
    () => TALLER.franjaEsqueleto || conParametroQa(),
    () => TALLER.franjaEsqueleto,
  );
}

/** src del clic, calculado al tocar (la variante y el anuncio ya están en la página). */
function srcAlTocar(prefijo: string): string {
  try {
    const origen = leerUtm().utm_content || EXP14.variante() || '';
    return srcLista(origen ? `${prefijo}-${origen}` : prefijo);
  } catch {
    return prefijo;
  }
}

export default function FranjaTaller({ lugar, className = '' }: { lugar: 'portada' | 'fin'; className?: string }) {
  const visible = useFranjaTaller();
  const prefijo = lugar === 'fin' ? 'esq-fin' : 'esq';

  if (!visible) return null;
  return (
    <aside aria-label="Taller en vivo" className={`rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 ${className}`}>
      <p className="text-base text-slate-200">¿Prefieres armarlo en vivo? Taller el miércoles 2 de diciembre, 17:00 de Chile</p>
      <a
        href={`/lista?src=${prefijo}`}
        onClick={(e) => {
          e.currentTarget.href = `/lista?src=${srcAlTocar(prefijo)}`;
        }}
        className="mt-3 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/20 px-5 text-base font-medium text-[#5fb2dd] transition hover:border-[#5fb2dd] hover:text-white"
      >
        Únete al grupo <ArrowRight className="h-4 w-4" aria-hidden />
      </a>
    </aside>
  );
}
