'use client';

/*
 * «Los datos de tu negocio» (13-nov-2026): tarjeta con los datos del alumno + bloques de prompt que salen rellenados.
 * Datos y reglas en lib/productos/curso/datos-negocio.ts. Se guardan SOLO en este navegador (localStorage, con respaldo en
 * memoria si falla; sin desajuste de hidratación porque el servidor siempre ve los datos vacíos). Nada de esto va a un
 * servidor ni a analítica: no poner los valores en dataLayer, fetch ni en el texto de un botón o enlace.
 */

import { Fragment, useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react';
import { Check, ClipboardCopy, Lock, Plus, Trash2 } from 'lucide-react';
import { CLAVES_STORAGE, REGLAS_FRENO, type ReglaFreno } from '@/lib/productos/curso/curso';
import {
  CAMPOS_NEGOCIO,
  CLAVE_DATOS_NEGOCIO,
  DATOS_VACIOS,
  aTexto,
  caberPorLineas,
  camposFaltantes,
  corchetesEnDatos,
  limpiarAlEscribir,
  rellenar,
  sanearDatos,
  valorFinal,
  type CampoNegocio,
  type CampoNegocioId,
  type DatosNegocio,
} from '@/lib/productos/curso/datos-negocio';
import { useMontado, usePersistido } from '@/lib/productos/curso/persistencia';

export const ID_TARJETA_DATOS = 'tus-datos';

export function useDatosNegocio() {
  const [guardado, setGuardado, borrar] = usePersistido<DatosNegocio>(CLAVE_DATOS_NEGOCIO, DATOS_VACIOS);
  const datos = useMemo(() => sanearDatos(guardado), [guardado]);
  return [datos, setGuardado, borrar] as const;
}

// Lo que el alumno ya anotó en el módulo 0 (mismas claves que Modulo0Content), para no pedírselo dos veces.
type EstadoReglasM0 = { elegidas: string[]; textos: Record<string, string>; propias: ReglaFreno[] };
const REGLAS_M0_VACIAS: EstadoReglasM0 = { elegidas: [], textos: {}, propias: [] };

function useDelModulo0() {
  const [negocio] = usePersistido(CLAVES_STORAGE.negocio, '');
  const [estado] = usePersistido(CLAVES_STORAGE.reglas, REGLAS_M0_VACIAS);
  const reglas = useMemo(() => {
    const elegidas = Array.isArray(estado?.elegidas) ? estado.elegidas : [];
    const propias = Array.isArray(estado?.propias) ? estado.propias : [];
    return [...REGLAS_FRENO, ...propias]
      .filter((r) => r && elegidas.includes(r.id))
      .map((r) => (typeof estado.textos?.[r.id] === 'string' ? estado.textos[r.id] : r.texto).trim() || r.texto);
  }, [estado]);
  return { negocio: typeof negocio === 'string' ? negocio.trim() : '', reglas };
}

const claseCampo =
  'mt-1.5 w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-[15px] text-slate-100 placeholder:text-slate-500 focus:border-[#5fb2dd] focus:outline-none';

/** Lleva al alumno a la tarjeta y enfoca el primer dato que falta. Devuelve false si la tarjeta no está en esta página. */
function irATarjeta(campo?: CampoNegocioId): boolean {
  const tarjeta = document.getElementById(ID_TARJETA_DATOS);
  if (!tarjeta) return false;
  tarjeta.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const el = (campo && tarjeta.querySelector<HTMLElement>(`[data-campo="${campo}"]`)) || tarjeta.querySelector<HTMLElement>('[data-campo]');
  el?.focus({ preventScroll: true });
  return true;
}

function CampoDato({ campo, valor, onCambio }: { campo: CampoNegocio; valor: string; onCambio: (v: string) => void }) {
  const id = useId();
  if (campo.opciones) {
    // Radios y no <button>: el rastreo de clics (Rastreo.tsx) y el píxel de Meta leen el texto de los botones, y aquí el
    // texto ES el dato del alumno («Tuteo» / «Trato de usted»).
    return (
      <fieldset className="block text-sm text-slate-300">
        <legend className="font-medium text-slate-200">{campo.etiqueta}</legend>
        <div className="mt-1.5 flex flex-wrap gap-2">
          {campo.opciones.map((op, i) => {
            const elegida = valor === op;
            return (
              <label
                key={op}
                className={`inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border px-4 text-sm transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#5fb2dd]/50 ${
                  elegida ? 'border-[#5fb2dd] bg-[#5fb2dd]/15 text-white' : 'border-white/15 text-slate-300 hover:border-white/30'
                }`}
              >
                <input
                  type="radio"
                  name={id}
                  value={op}
                  checked={elegida}
                  data-campo={i === 0 ? campo.id : undefined}
                  onChange={() => onCambio(op)}
                  className="h-4 w-4 accent-[#5fb2dd]"
                />
                {op}
              </label>
            );
          })}
        </div>
      </fieldset>
    );
  }
  return (
    <label htmlFor={id} className="block text-sm text-slate-300">
      <span className="font-medium text-slate-200">{campo.etiqueta}</span>
      {campo.ayuda ? <span className="mt-0.5 block text-xs text-slate-400">{campo.ayuda}</span> : null}
      {campo.lineas || campo.max > 60 ? (
        <textarea
          id={id}
          data-campo={campo.id}
          rows={campo.lineas ? 4 : campo.max > 150 ? 3 : 2}
          // Los datos de una línea van en un cuadro de 2 o 3 filas para que el ejemplo se lea entero a 360 px; Enter no corta.
          onKeyDown={campo.lineas ? undefined : (e) => e.key === 'Enter' && e.preventDefault()}
          maxLength={campo.max}
          value={valor}
          placeholder={campo.placeholder}
          autoComplete="off"
          onChange={(e) => onCambio(e.target.value)}
          className={`${claseCampo} resize-y`}
        />
      ) : (
        <input
          id={id}
          data-campo={campo.id}
          type="text"
          inputMode={campo.numero ? 'numeric' : undefined}
          maxLength={campo.max}
          value={valor}
          placeholder={campo.placeholder}
          autoComplete="off"
          onChange={(e) => onCambio(e.target.value)}
          className={`${claseCampo} min-h-[48px]`}
        />
      )}
    </label>
  );
}

/**
 * La tarjeta. `principal` = la del inicio del módulo (lleva el id para los enlaces «Completar»); las que se abren dentro de
 * un bloque de prompt van sin id para no repetirlo.
 */
export function TarjetaDatosNegocio({ principal = true, className = 'mt-6' }: { principal?: boolean; className?: string }) {
  const montado = useMontado();
  const [datos, setDatos, borrar] = useDatosNegocio();
  const m0 = useDelModulo0();
  const [confirmar, setConfirmar] = useState(false);
  const [reglasFuera, setReglasFuera] = useState(0);
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (temporizador.current) clearTimeout(temporizador.current);
  }, []);

  const visibles = montado ? datos : DATOS_VACIOS;
  const llenos = CAMPOS_NEGOCIO.filter((c) => valorFinal(c, visibles[c.id])).length;
  const cambiar = (c: CampoNegocio, v: string) => setDatos((p) => ({ ...sanearDatos(p), [c.id]: limpiarAlEscribir(c, v) }));
  const campoPorId = (id: CampoNegocioId) => CAMPOS_NEGOCIO.find((c) => c.id === id)!;

  const pedirBorrar = () => {
    if (temporizador.current) clearTimeout(temporizador.current);
    if (!confirmar) {
      setConfirmar(true);
      temporizador.current = setTimeout(() => setConfirmar(false), 4000);
      return;
    }
    setConfirmar(false);
    setReglasFuera(0);
    borrar();
  };

  const traerNegocio = montado && m0.negocio && !valorFinal(campoPorId('negocio'), visibles.negocio);
  const traerReglas = montado && m0.reglas.length > 0 && !valorFinal(campoPorId('reglas'), visibles.reglas);

  return (
    <section
      id={principal ? ID_TARJETA_DATOS : undefined}
      aria-label="Los datos de tu negocio"
      data-sin-rastreo
      className={`scroll-mt-24 rounded-2xl border border-[#5fb2dd]/30 bg-[#5fb2dd]/[0.05] p-4 sm:p-5 ${className}`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5fb2dd]">Los datos de tu negocio</p>
        <p className="font-mono text-xs text-slate-400" aria-live="polite">
          {llenos} de {CAMPOS_NEGOCIO.length}
        </p>
      </div>
      <p className="mt-2 text-sm text-slate-200">
        Anótalos una vez y los prompts de este módulo te salen ya rellenados. Todos son opcionales: lo que dejes en blanco queda marcado{' '}
        <mark className="rounded bg-amber-300/20 px-1 text-amber-100 ring-1 ring-amber-300/40">[así]</mark> para que lo cambies tú.
      </p>
      {traerNegocio || traerReglas ? (
        <div className="mt-3 flex flex-col items-start gap-1">
          {traerNegocio ? (
            <button
              type="button"
              onClick={() => cambiar(campoPorId('negocio'), m0.negocio)}
              className="inline-flex min-h-[44px] items-center gap-2 text-left text-sm text-[#5fb2dd] hover:text-white"
            >
              <Plus className="h-4 w-4 shrink-0" aria-hidden /> Usar el nombre que anotaste en el módulo 0
            </button>
          ) : null}
          {traerReglas ? (
            <button
              type="button"
              onClick={() => {
                const { valor, fuera } = caberPorLineas(campoPorId('reglas'), m0.reglas);
                cambiar(campoPorId('reglas'), valor);
                setReglasFuera(fuera);
              }}
              className="inline-flex min-h-[44px] items-center gap-2 text-left text-sm text-[#5fb2dd] hover:text-white"
            >
              <Plus className="h-4 w-4 shrink-0" aria-hidden /> Traer las reglas de freno que elegiste en el módulo 0
            </button>
          ) : null}
        </div>
      ) : null}
      <div className="mt-4 space-y-4">
        {CAMPOS_NEGOCIO.map((c) => (
          <CampoDato key={c.id} campo={c} valor={visibles[c.id] ?? ''} onCambio={(v) => cambiar(c, v)} />
        ))}
      </div>
      {reglasFuera > 0 ? (
        <p className="mt-2 text-xs text-amber-100" role="status">
          {reglasFuera === 1 ? 'No cupo 1 regla del módulo 0' : `No cupieron ${reglasFuera} reglas del módulo 0`}: elige las más importantes y cambia las que quieras.
        </p>
      ) : null}
      <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-2 text-xs text-slate-400">
          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
          <span>Se guarda solo en este navegador: no lo guardamos en ningún servidor.</span>
        </p>
        {llenos > 0 ? (
          <button
            type="button"
            onClick={pedirBorrar}
            className={`inline-flex min-h-[44px] shrink-0 items-center justify-center gap-1.5 self-start rounded-full border px-4 text-sm transition sm:self-auto ${
              confirmar ? 'border-rose-300/60 bg-rose-300/10 text-rose-100' : 'border-white/15 text-slate-300 hover:border-white/30'
            }`}
          >
            <Trash2 className="h-4 w-4" aria-hidden />
            {confirmar ? 'Toca de nuevo para borrar' : 'Borrar mis datos'}
          </button>
        ) : null}
      </div>
    </section>
  );
}

const claseHueco = 'rounded bg-amber-300/20 px-0.5 text-amber-100 ring-1 ring-amber-300/40';

/** Un dato que trae sus propios [corchetes] (p. ej. una regla del módulo 0 sin completar) los muestra marcados igual. */
function ConCorchetes({ texto }: { texto: string }) {
  const partes = texto.split(/(\[[^\]\n]{1,200}\])/g);
  if (partes.length === 1) return <>{texto}</>;
  return (
    <>
      {partes.map((p, i) =>
        i % 2 ? (
          <mark key={i} className={claseHueco}>
            {p}
          </mark>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}

/**
 * Bloque de prompt que sale rellenado con los datos del negocio (mismo aspecto que BloqueCopiar).
 * «Copiar» entrega la versión rellenada; los huecos que faltan se copian tal cual, con sus corchetes.
 */
export function BloquePrompt({
  titulo,
  texto,
  huecos,
  nota,
  className = 'mt-6',
}: {
  titulo: string;
  texto: string;
  huecos: Record<string, CampoNegocioId>;
  nota?: ReactNode;
  className?: string;
}) {
  const montado = useMontado();
  const [datosGuardados] = useDatosNegocio();
  const datos = montado ? datosGuardados : DATOS_VACIOS;
  const trozos = useMemo(() => rellenar(texto, datos, huecos), [texto, datos, huecos]);
  const faltan = useMemo(() => camposFaltantes(texto, datos, huecos), [texto, datos, huecos]);
  const usaDatos = useMemo(() => camposFaltantes(texto, DATOS_VACIOS, huecos).length > 0, [texto, huecos]);
  const sueltos = useMemo(() => corchetesEnDatos(trozos), [trozos]);
  const [copiado, setCopiado] = useState(false);
  const [abierta, setAbierta] = useState(false);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(aTexto(trozos));
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      /* sin portapapeles: el texto igual se puede seleccionar a mano */
    }
  };
  const completar = () => {
    if (abierta) setAbierta(false);
    else if (!irATarjeta(faltan[0] ?? 'reglas')) setAbierta(true);
  };
  const botonCompletar = (
    <button
      type="button"
      onClick={completar}
      aria-expanded={abierta ? true : undefined}
      className="inline-flex min-h-[44px] items-center text-[#5fb2dd] underline-offset-2 hover:text-white hover:underline"
    >
      {abierta ? 'Cerrar' : 'Completar'}
    </button>
  );

  return (
    <div className={`overflow-hidden rounded-2xl border border-white/10 bg-[#131c31] ${className}`}>
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
        <p className="min-w-0 font-mono text-[11px] uppercase tracking-[0.18em] text-[#5fb2dd]">{titulo}</p>
        <button type="button" onClick={copiar} className="inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-full border border-white/15 px-3 text-xs text-slate-200 hover:border-white/30">
          {copiado ? <Check className="h-3.5 w-3.5" aria-hidden /> : <ClipboardCopy className="h-3.5 w-3.5" aria-hidden />}
          {copiado ? 'Copiado' : 'Copiar'}
        </button>
      </div>
      {usaDatos ? (
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-white/10 bg-white/[0.02] px-4 py-2 text-xs">
          {faltan.length ? (
            <span className="text-amber-100">{faltan.length === 1 ? 'Te falta 1 dato de tu negocio' : `Te faltan ${faltan.length} datos de tu negocio`}</span>
          ) : sueltos ? (
            <span className="text-amber-100">{sueltos === 1 ? 'Te queda 1 parte entre [corchetes] en tus datos' : `Te quedan ${sueltos} partes entre [corchetes] en tus datos`}</span>
          ) : (
            <span className="inline-flex min-h-[44px] items-center gap-1.5 text-emerald-200">
              <Check className="h-3.5 w-3.5" aria-hidden /> Listo con los datos de tu negocio
            </span>
          )}
          {faltan.length || sueltos || abierta ? botonCompletar : null}
        </div>
      ) : null}
      {abierta ? <TarjetaDatosNegocio principal={false} className="m-3" /> : null}
      <pre className="max-h-80 overflow-auto whitespace-pre-wrap break-words px-4 py-3 font-sans text-[14px] leading-relaxed text-slate-200">
        {trozos.map((t, i) =>
          t.tipo === 'texto' ? (
            <Fragment key={i}>{t.v}</Fragment>
          ) : t.tipo === 'dato' ? (
            <span key={i} className="rounded bg-[#5fb2dd]/10 text-[#cfeaf7]">
              <ConCorchetes texto={t.v} />
            </span>
          ) : (
            <mark key={i} className={claseHueco}>
              {t.v}
            </mark>
          ),
        )}
      </pre>
      {nota ? <p className="border-t border-white/10 px-4 py-2.5 text-xs text-slate-400">{nota}</p> : null}
    </div>
  );
}
