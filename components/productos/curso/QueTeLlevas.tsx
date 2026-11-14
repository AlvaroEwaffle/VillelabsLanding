'use client';
// «Qué te llevas / Qué vas a aprender» · segunda sección de /curso (13-nov-2026). Común a A y B de EXP-15.
// Datos en lib/productos/curso/llevas.ts. Animación: useAparecer (lib/productos/aparecer.ts): visible sin JS, solo
// opacity/transform, respeta prefers-reduced-motion. Al verla (25 % en pantalla) manda un «paso» al hilo de la visita en
// Slack, una vez, sin datos personales: «🧭 vio Qué te llevas».
import Link from 'next/link';
import { useCallback, useRef } from 'react';
import { ArrowRight, BookOpen, Bot, ClipboardList, FileSpreadsheet, Handshake, LayoutDashboard, Map as MapIcon, Megaphone, MessageCircle, Sparkles, Wallet, type LucideIcon } from 'lucide-react';
import { APRENDES, LLEVAS, TIEMPO } from '@/lib/productos/curso/llevas';
import { MODULOS } from '@/lib/productos/curso/curso';
import { useAparecer } from '@/lib/productos/aparecer';
import { registrarEvento } from '@/lib/productos/eventos';
import { Kicker } from './piezas';

const ICONO_LLEVAS: LucideIcon[] = [FileSpreadsheet, Sparkles, BookOpen, LayoutDashboard];
const ICONO_MODULO: Record<number, LucideIcon> = { 0: MapIcon, 1: Handshake, 2: Megaphone, 3: ClipboardList, 4: MessageCircle, 5: Wallet, 6: LayoutDashboard, 7: Bot };

export default function QueTeLlevas() {
  const ref = useRef<HTMLElement>(null);
  const alVer = useCallback(() => registrarEvento('paso', { detalle: 'vio «Qué te llevas / Qué vas a aprender»' }), []);
  useAparecer(ref, alVer);

  return (
    <section id="que-te-llevas" ref={ref} aria-label="Qué te llevas y qué vas a aprender" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-14 sm:px-6">
      {/* Qué te llevas */}
      <div data-aparece>
        <Kicker>Qué te llevas</Kicker>
        <h2 className="mt-3 max-w-3xl font-serif text-3xl text-white sm:text-4xl">Lo que te llevas para ordenar tu negocio en una planilla.</h2>
      </div>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {LLEVAS.map((x, i) => {
          const Icono = ICONO_LLEVAS[i];
          return (
            <li
              key={x.clave}
              data-aparece
              className="group relative overflow-hidden rounded-2xl border border-[#5fb2dd]/30 bg-gradient-to-br from-[#2175a1]/20 via-[#111a2e] to-[#0f172a] p-5 sm:p-6"
            >
              <span aria-hidden className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#5fb2dd]/10 transition-transform duration-500 group-hover:scale-125" />
              <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-[#5fb2dd]/15 ring-1 ring-[#5fb2dd]/30">
                <Icono className="h-5 w-5 text-[#5fb2dd]" aria-hidden />
              </span>
              <p className="relative mt-4 font-serif text-3xl leading-none text-white">{x.clave}</p>
              <h3 className="relative mt-2 text-base font-semibold text-slate-100">{x.titulo}</h3>
              <p className="relative mt-2 text-sm text-slate-300">{x.texto}</p>
            </li>
          );
        })}
      </ul>
      {/* CRM y ERP explicados una sola vez por página: en la B de EXP-15 ya lo dicen los chips del hero. */}
      <p data-aparece className="exp15-A mt-4 text-sm text-slate-400">
        En simple: <span className="font-mono text-[#9fd3ee]">CRM</span> = tus clientes y lo que les vendes ·{' '}
        <span className="font-mono text-[#9fd3ee]">ERP</span> = pedidos, cobranza y caja. En el curso los dos viven en tu planilla.
      </p>

      {/* Qué vas a aprender: manda el tiempo, no la cantidad de módulos. */}
      <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
        <div data-aparece className="lg:sticky lg:top-28 lg:self-start">
          <Kicker>Qué vas a aprender</Kicker>
          <p className="mt-3 font-serif text-4xl leading-tight text-white sm:text-5xl">{TIEMPO.grande}</p>
          <p className="mt-2 max-w-md text-slate-300">{TIEMPO.detalle}</p>
          <p className="mt-4 max-w-md text-sm text-slate-400">{TIEMPO.apoyo}</p>
          <p className="mt-2 text-xs text-slate-500">
            {MODULOS.length} módulos · {MODULOS.reduce((n, m) => n + m.lecciones.length, 0)} lecciones
          </p>
        </div>
        <ol className="space-y-3">
          {APRENDES.map((a) => {
            const Icono = ICONO_MODULO[a.modulo];
            return (
              <li key={a.modulo} data-aparece className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#5fb2dd]/30 bg-[#2175a1]/15">
                  <Icono className="h-5 w-5 text-[#5fb2dd]" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5fb2dd]">
                    Módulo {a.modulo}
                    {a.modulo === 0 ? <span className="ml-2 rounded-full bg-[#FF3D8B]/15 px-2 py-0.5 text-[10px] text-[#ff8fbd]">gratis</span> : null}
                    {a.modulo === 7 ? <span className="ml-2 rounded-full bg-[#5fb2dd]/15 px-2 py-0.5 text-[10px] text-[#9fd3ee]">proyecto final</span> : null}
                  </p>
                  <p className="mt-1 text-slate-100">{a.texto}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div data-aparece className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Link
          href="#parte-gratis-hero"
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#FF3D8B] px-6 text-sm font-semibold text-white shadow-rosa transition hover:bg-[#ff5c9f]"
        >
          Mira gratis el módulo 0 <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
        <Link href="#modulos" className="inline-flex min-h-[48px] items-center justify-center px-2 text-sm text-[#5fb2dd] underline underline-offset-2 hover:text-white">
          Ver el programa completo
        </Link>
      </div>
    </section>
  );
}
