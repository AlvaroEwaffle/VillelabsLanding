'use client';

/*
 * 11-nov-2026 (Álvaro por WhatsApp: «para ver el módulo 0 que dejen el mail»): el bloque deja de mandar al esqueleto
 * y pasa a ser la puerta del MÓDULO 0. Mismos campos; el lead se registra como producto «curso-modulo0» (Slack:
 * «Nuevo registro en curso-modulo0») y entra a /curso/modulo-0. Quien ya lo dejó ve directo el botón al módulo.
 *
 * Historia: «¿Aún no? Parte gratis con el esqueleto de tu primer agente» (9-nov-2026, RAG #1 conversión del sitio).
 * El tráfico frío de Meta cae en /curso y se iba sin dejar nada (75 sesiones/día, 0 leads). Este bloque pide nombre +
 * correo (+ WhatsApp opcional) antes del pago, registra el lead en Fidelidapp como «curso-lead» (lib/productos/leads.ts,
 * con los UTM de la visita) y lleva al esqueleto. El lead queda guardado también como lead del esqueleto, así el
 * esqueleto no lo vuelve a pedir al final.
 * Medición: dataLayer `curso_lead` (cta_location = hero | antes_compra) + Lead del pixel (lo emite registrarLead).
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Eye } from 'lucide-react';
import { LINKS } from '@/lib/productos/links';
import { registrarLead } from '@/lib/productos/leads';
import { guardarLead, type Lead } from '@/lib/productos/esqueleto/estado';

/** Lead que ya pasó la puerta del módulo 0 (no se vuelve a pedir). */
export const CLAVE_LEAD_M0 = 'vl_curso_m0_lead';
function cargarLeadM0(): Lead | null {
  try {
    const s = localStorage.getItem(CLAVE_LEAD_M0);
    return s ? (JSON.parse(s) as Lead) : null;
  } catch {
    return null;
  }
}
function guardarLeadM0(l: Lead) {
  try {
    localStorage.setItem(CLAVE_LEAD_M0, JSON.stringify(l));
  } catch {
    /* sin almacenamiento: se pide de nuevo la próxima vez */
  }
}

const correoValido = (c: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c.trim());

const claseInput =
  'w-full min-h-[48px] rounded-xl border border-white/15 bg-[#0f172a]/60 px-4 text-base text-white placeholder:text-slate-500 focus:border-[#5fb2dd] focus:outline-none focus:ring-2 focus:ring-[#5fb2dd]/30';

function pushCursoLead(ubicacion: string) {
  try {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event: 'curso_lead', cta_location: ubicacion, producto: 'curso-modulo0' });
  } catch {
    /* sin analítica no se rompe nada */
  }
}

export default function CursoLead({ ubicacion, className = '' }: { ubicacion: string; className?: string }) {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [previo, setPrevio] = useState<Lead | null>(null);

  /* eslint-disable react-hooks/set-state-in-effect -- lectura única de localStorage al montar */
  useEffect(() => {
    setPrevio(cargarLeadM0());
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const id = (campo: string) => `curso-lead-${ubicacion}-${campo}`;

  return (
    // data-sin-barra: la barra fija de compra de /curso (EXP-08) se esconde mientras este bloque está a la vista.
    <div id={`parte-gratis-${ubicacion}`} data-sin-barra className={`scroll-mt-28 rounded-2xl border border-[#5fb2dd]/35 bg-[#2175a1]/[0.12] p-4 sm:p-5 ${className}`}>
      <p className="flex items-center gap-2 font-serif text-lg leading-snug text-white sm:text-xl">
        <Eye className="h-5 w-5 shrink-0 text-[#5fb2dd]" aria-hidden />
        {/* EXP-13 · B: en el hero, con el botón principal ya gratis, «¿Aún no?» no tiene sentido. */}
        {ubicacion === 'hero' ? (
          <>
            <span className="exp13-A">¿Aún no? Mira gratis el módulo 0</span>
            <span className="exp13-B">Deja tu correo y mira el módulo 0</span>
          </>
        ) : (
          <span>¿Aún no? Mira gratis el módulo 0</span>
        )}
      </p>
      <p className="mt-1.5 text-sm text-slate-300">
        El mapa de tu negocio, el diagnóstico y tu planilla base, completos. Deja tu correo y entras al tiro, sin tarjeta.
      </p>

      {previo ? (
        <Link
          href={LINKS.cursoModulo0}
          className="mt-4 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#2175a1] px-6 text-sm font-semibold text-white transition hover:bg-[#2a8ac0]"
        >
          Ver el módulo 0, {previo.nombre} <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      ) : (
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            if (!nombre.trim()) return setError('Escribe tu nombre.');
            if (!correoValido(correo)) return setError('Revisa tu correo: parece que le falta algo.');
            setError('');
            setEnviando(true);
            const lead: Lead = { nombre: nombre.trim(), correo: correo.trim(), whatsapp: whatsapp.trim(), fecha: new Date().toISOString() };
            guardarLeadM0(lead);
            guardarLead(lead); // el esqueleto tampoco se lo vuelve a pedir
            pushCursoLead(ubicacion);
            void registrarLead({ nombre: lead.nombre, correo: lead.correo, whatsapp: lead.whatsapp, producto: 'curso-modulo0', detalles: { origen: `curso-${ubicacion}` } });
            router.push(LINKS.cursoModulo0);
          }}
          className="mt-4 grid gap-3 sm:grid-cols-2"
        >
          <div>
            <label htmlFor={id('nombre')} className="sr-only">
              Tu nombre
            </label>
            <input id={id('nombre')} autoComplete="given-name" placeholder="Tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className={claseInput} />
          </div>
          <div>
            <label htmlFor={id('correo')} className="sr-only">
              Tu correo
            </label>
            <input
              id={id('correo')}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="Tu correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className={claseInput}
            />
          </div>
          <div>
            <label htmlFor={id('wa')} className="sr-only">
              WhatsApp (opcional)
            </label>
            <input
              id={id('wa')}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="WhatsApp (opcional)"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className={claseInput}
            />
          </div>
          <button
            type="submit"
            disabled={enviando}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#2175a1] px-6 text-sm font-semibold text-white transition hover:bg-[#2a8ac0] disabled:opacity-60"
          >
            Ver el módulo 0 gratis <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
          {error ? (
            <p role="alert" className="text-sm text-orange-300 sm:col-span-2">
              {error}
            </p>
          ) : null}
          <p className="text-xs text-slate-500 sm:col-span-2">Usamos tu correo para mandarte contenido útil para tu negocio. Te puedes dar de baja cuando quieras.</p>
        </form>
      )}
    </div>
  );
}
