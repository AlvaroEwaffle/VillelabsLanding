'use client';

import { useId, useState } from 'react';
import { Check, Eye } from 'lucide-react';
import { Pantallita } from '@/components/productos/Pantallita';

export const claseInput =
  'w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-base text-white placeholder:text-slate-500 focus:border-[#5fb2dd] focus:outline-none focus:ring-2 focus:ring-[#5fb2dd]/30';

export const botonPrimario =
  'inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#FF3D8B] px-6 text-base font-semibold text-white shadow-rosa transition hover:bg-[#ff5c9f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D8B]/60 disabled:cursor-not-allowed disabled:opacity-50';

export const botonSecundario =
  'inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/20 px-6 text-base text-slate-100 transition hover:border-[#5fb2dd] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5fb2dd]';

export function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#5fb2dd]">{children}</p>;
}

/** Botón «Ver ejemplo» que despliega la respuesta de Grano Norte. */
export function VerEjemplo({ ejemplo, id }: { ejemplo: React.ReactNode; id: string }) {
  const [abierto, setAbierto] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setAbierto(!abierto)}
        aria-expanded={abierto}
        aria-controls={id}
        className="inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-full px-3 text-sm text-[#5fb2dd] hover:bg-white/5"
      >
        <Eye className="h-4 w-4" /> {abierto ? 'Ocultar' : 'Ver ejemplo'}
      </button>
      {abierto ? (
        <div id={id} className="order-last w-full text-sm">
          <Pantallita titulo="Ejemplo · Grano Norte">{ejemplo}</Pantallita>
        </div>
      ) : null}
    </>
  );
}

interface CampoProps {
  etiqueta: string;
  ayuda?: string;
  ejemplo?: React.ReactNode;
  valor: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multilinea?: boolean;
  filas?: number;
  tipo?: string;
}

export function Campo({ etiqueta, ayuda, ejemplo, valor, onChange, placeholder, multilinea, filas = 3, tipo = 'text' }: CampoProps) {
  const id = useId();
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-x-3">
        <label htmlFor={id} className="py-2 text-base font-medium text-white">
          {etiqueta}
        </label>
        {ejemplo ? <VerEjemplo ejemplo={ejemplo} id={`${id}-ej`} /> : null}
      </div>
      {ayuda ? <p className="mb-2 text-sm text-slate-400">{ayuda}</p> : null}
      {multilinea ? (
        <textarea id={id} rows={filas} value={valor} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={claseInput} />
      ) : (
        <input id={id} type={tipo} value={valor} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={claseInput} />
      )}
    </div>
  );
}

/** Opción seleccionable (casilla o chip) con área táctil de 44 px. */
export function Opcion({
  activa,
  onClick,
  children,
  rol = 'checkbox',
}: {
  activa: boolean;
  onClick: () => void;
  children: React.ReactNode;
  rol?: 'checkbox' | 'radio';
}) {
  return (
    <button
      type="button"
      role={rol}
      aria-checked={activa}
      onClick={onClick}
      className={`inline-flex min-h-[44px] items-center gap-2 rounded-xl border px-4 py-2 text-left text-sm transition ${
        activa ? 'border-[#5fb2dd] bg-[#2175a1]/25 text-white' : 'border-white/15 bg-white/[0.03] text-slate-300 hover:border-white/30'
      }`}
    >
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
          activa ? 'border-[#5fb2dd] bg-[#2175a1]' : 'border-white/30'
        } ${rol === 'radio' ? 'rounded-full' : ''}`}
      >
        {activa ? <Check className="h-3.5 w-3.5 text-white" /> : null}
      </span>
      {children}
    </button>
  );
}

export function Grupo({ titulo, ejemplo, children }: { titulo: string; ejemplo?: React.ReactNode; children: React.ReactNode }) {
  const id = useId();
  return (
    <div role="group" aria-labelledby={`${id}-t`}>
      <div className="flex flex-wrap items-center justify-between gap-x-3">
        <p id={`${id}-t`} className="py-2 text-base font-medium text-white">
          {titulo}
        </p>
        {ejemplo ? <VerEjemplo ejemplo={ejemplo} id={`${id}-ej`} /> : null}
      </div>
      <div className="mt-1 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}
