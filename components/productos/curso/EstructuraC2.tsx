'use client';

/*
 * EXP-08 · C2 «estructura» (11-nov-2026, pedido de Álvaro por WhatsApp): justo bajo el hero, en este orden,
 * por qué este curso y no otro → quién lo arma → módulo 0 gratis → en qué se basa. Solo se ve con data-exp08="C".
 * Sin testimonios inventados: la prueba es lo verificable (el autor lo usa en sus negocios, terminas con tu planilla,
 * módulo 0 gratis antes de pagar, garantía).
 */

import Link from 'next/link';
import { Check, Eye } from 'lucide-react';
import { PRECIO_CURSO } from '@/lib/productos/curso/curso';
import QuienLoArma from '@/components/productos/estructura/QuienLoArma';
import EnQueSeBasa from './EnQueSeBasa';

const POR_QUE = [
  { t: 'Lo usa quien lo enseña', d: 'Es el mismo orden con que Álvaro lleva Villelab, Ewaffle y Fidelidapp: qué se anota, dónde y qué se revisa cada lunes.' },
  { t: 'Terminas con tu sistema, no con apuntes', d: 'Cada módulo le suma una hoja a tu planilla. Al final tienes tu tablero funcionando con tus datos.' },
  { t: 'Lo ves antes de pagar', d: 'El módulo 0 completo es gratis: mapa, diagnóstico y planilla base.' },
  { t: `${PRECIO_CURSO.garantiaDias} días de garantía`, d: 'Si no te sirve, te devolvemos la plata. Sin programar y con herramientas que ya tienes.' },
];

export default function EstructuraC2() {
  return (
    <div className="exp08-C">
      <section aria-label="Por qué este curso" className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <h2 className="font-serif text-2xl text-white sm:text-3xl">¿Por qué este curso y no otro?</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {POR_QUE.map((x) => (
            <li key={x.t} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#5fb2dd]" aria-hidden />
              <span>
                <span className="block text-base font-medium text-white">{x.t}</span>
                <span className="mt-1 block text-sm text-slate-300">{x.d}</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <QuienLoArma texto="Ingeniero industrial (U. de Chile), 8 años liderando equipos de producto en LATAM Airlines, PepsiCo vía Toptal y startups. Hoy dirige Villelab y dos negocios propios." />
          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[#5fb2dd]/40 bg-[#2175a1]/10 p-5">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5fb2dd]">Gratis antes de comprar</p>
              <p className="mt-1 font-serif text-xl text-white">Mira el módulo 0 completo</p>
              <p className="mt-2 text-sm text-slate-300">El mapa de tu negocio, el diagnóstico y tu planilla base. Deja tu correo y entras al tiro.</p>
            </div>
            <Link
              href="#parte-gratis-hero"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm text-slate-200 transition hover:border-[#5fb2dd]/60 hover:text-white"
            >
              <Eye className="h-4 w-4" aria-hidden /> Ver el módulo 0 gratis
            </Link>
          </div>
        </div>
      </section>
      <EnQueSeBasa id="en-que-se-basa-c2" />
    </div>
  );
}
