'use client';

import { useId, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { registrarLead } from '@/lib/productos/leads';
import { correoValido } from '@/lib/productos/esqueleto/parcial';
import { medirCorreo, visitaLista } from './medicion';

// Segundo camino de /lista (19-nov-2026, Álvaro 18:31): para quien no quiere entrar al grupo, nombre + correo y le aviso
// por correo cuando abra las inscripciones. Secundario: un enlace plegado bajo el botón 1 (A y B) y antes del cierre (B).
//
// Registro: el mismo de /esqueleto y /curso (lib/productos/leads.ts → Fidelidapp POST /api/landing/register, cuenta
// «Alvaro Villena»), con producto «lista-taller» → etiquetas villelab-productos, producto:lista-taller, origen:lista-taller,
// src:<src>, version:<a|b> y los UTM de la visita. Sin teléfono. Con ?src=qa / ?qa / webdriver no registra ni avisa:
// muestra el éxito simulado.
// Ojo: el registro público responde 400 si el correo ya está en la cuenta (p. ej. alguien que ya hizo el esqueleto) y 403
// fuera de villelab.com. registrarLead deja el lead en la cola local y lo avisa a Slack igual; por eso, si hay conexión,
// se muestra el éxito, y solo sin conexión se pide reintentar.

export default function PorCorreo({ lugar, className = '' }: { lugar: 1 | 2; className?: string }) {
  const id = useId();
  const [abierto, setAbierto] = useState(false);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [error, setError] = useState('');
  const [estado, setEstado] = useState<'editando' | 'enviando' | 'listo'>('editando');
  const medido = useRef(false);

  const alternar = () => {
    if (!abierto && !medido.current) {
      medido.current = true;
      medirCorreo('abierto', lugar);
    }
    setAbierto((a) => !a);
  };

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (estado === 'enviando') return;
    if (!nombre.trim()) return setError('Escribe tu nombre.');
    if (!correoValido(correo)) return setError('Revisa tu correo: parece que le falta algo.');
    setError('');
    setEstado('enviando');
    const { src, prueba, v } = visitaLista();
    let ok = true;
    if (!prueba) {
      ok = await registrarLead({
        nombre: nombre.trim(),
        correo: correo.trim(),
        producto: 'lista-taller',
        detalles: { origen: 'lista-taller', src, version: v },
      });
    }
    const sinConexion = typeof navigator !== 'undefined' && navigator.onLine === false;
    if (!ok && sinConexion) {
      setEstado('editando');
      return setError('No se pudo enviar: parece que no tienes conexión. Revisa tu internet y vuelve a intentarlo.');
    }
    setEstado('listo');
    medirCorreo('enviado', lugar);
  };

  const claseInput =
    'block min-h-[48px] w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 text-base text-white placeholder:text-slate-500 focus:border-[#5fb2dd] focus:outline-none focus:ring-2 focus:ring-[#5fb2dd]/40';

  return (
    <div className={`text-left ${className}`}>
      <button
        type="button"
        aria-expanded={abierto}
        aria-controls={`${id}-panel`}
        onClick={alternar}
        className="mx-auto flex min-h-[44px] items-center justify-center gap-1.5 px-2 text-sm font-medium text-[#5fb2dd] underline decoration-[#5fb2dd]/40 underline-offset-4 transition hover:text-white"
      >
        Prefiero que me avises por correo
        <ChevronDown className={`h-4 w-4 transition-transform ${abierto ? 'rotate-180' : ''}`} aria-hidden />
      </button>
      <div id={`${id}-panel`} hidden={!abierto} className="mt-2 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        {estado === 'listo' ? (
          <p role="status" className="text-base text-white">
            Listo. Te escribo al correo cuando abra las inscripciones.
          </p>
        ) : (
          <form noValidate onSubmit={enviar} className="space-y-3">
            <div>
              <label htmlFor={`${id}-nombre`} className="block pb-1 text-sm font-medium text-white">
                Tu nombre
              </label>
              <input
                id={`${id}-nombre`}
                autoComplete="given-name"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className={claseInput}
              />
            </div>
            <div>
              <label htmlFor={`${id}-correo`} className="block pb-1 text-sm font-medium text-white">
                Tu correo
              </label>
              <input
                id={`${id}-correo`}
                type="email"
                inputMode="email"
                autoComplete="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                aria-invalid={Boolean(error) || undefined}
                aria-describedby={error ? `${id}-error` : undefined}
                className={claseInput}
              />
            </div>
            {error && (
              <p id={`${id}-error`} role="alert" className="text-sm text-[#ff8fbd]">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={estado === 'enviando'}
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full border border-white/25 px-6 text-base font-semibold text-white transition hover:border-[#5fb2dd] disabled:opacity-60"
            >
              {estado === 'enviando' ? 'Enviando…' : 'Avísame por correo'}
            </button>
            {/* Revisor 19-nov: para qué se usa el correo y cómo darse de baja, junto al botón. */}
            <p className="text-xs leading-relaxed text-slate-400">
              Solo uso tu correo para escribirte sobre este taller: la apertura y los recordatorios. Cada correo trae cómo darte de baja.{' '}
              <a href="/privacidad" className="text-[#5fb2dd] underline underline-offset-2 hover:text-white">
                Privacidad
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
