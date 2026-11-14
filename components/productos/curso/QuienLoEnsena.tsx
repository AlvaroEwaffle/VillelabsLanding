'use client';
// Bloque narrativo «Quién lo enseña» (13-nov-2026): reemplaza a «Quién lo enseña» + «En qué se basa». Tercera sección de
// /curso, común a A y B de EXP-15. Tres tiempos que se arman al bajar: (1) para qué hice este curso (foto real al lado),
// (2) lo que aprendí operando mis negocios (4 prácticas + logos propios), (3) lo que te vas a llevar (ancla a la sección 2
// y botón del módulo 0). Textos y fuentes en lib/productos/curso/quien.ts. Animación: Armado (.a-pieza) + Contador.
import Link from 'next/link';
import { ArrowRight, BookOpenCheck, CalendarCheck, Database, ShieldCheck, type LucideIcon } from 'lucide-react';
import { FOTOS } from '@/lib/productos/fotos';
import { BIO, CLIENTES, DATOS, EMPRESAS, MOSTRAR_CLIENTES, PARA_QUE, PRACTICAS } from '@/lib/productos/curso/quien';
import { Armado, orden } from './animados';
import Contador from './Contador';
import { Foto, Kicker } from './piezas';

const ICONOS: LucideIcon[] = [Database, ShieldCheck, CalendarCheck, BookOpenCheck];

function Tiempo({ n, titulo }: { n: number; titulo: string }) {
  return (
    <p className="a-pieza flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-[#5fb2dd]" style={orden(0)}>
      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#5fb2dd]/50 text-[11px]">{n}</span>
      {titulo}
    </p>
  );
}

export default function QuienLoEnsena() {
  return (
    <section id="quien-lo-ensena" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6">
      <Kicker>Quién lo enseña</Kicker>
      <h2 className="mt-3 max-w-3xl font-serif text-3xl text-white sm:text-4xl">Te cuento para qué hice este curso.</h2>

      {/* 1 · Para qué hice este curso */}
      <Armado className="mt-10 grid items-center gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12">
        <div className="a-pieza mx-auto w-full max-w-[420px]" style={orden(1)}>
          <figure className="relative aspect-square overflow-hidden rounded-3xl border border-white/10">
            <Foto foto={FOTOS.sonrisa} posicion="center 35%" />
          </figure>
          <div className="-mt-10 ml-auto mr-4 w-32 sm:w-36">
            <figure className="relative aspect-square overflow-hidden rounded-2xl border-4 border-[#0f172a]">
              <Foto foto={FOTOS.trabajando} posicion="center 30%" />
            </figure>
          </div>
        </div>
        <div>
          <Tiempo n={1} titulo="Para qué hice este curso" />
          {/* BORRADOR — texto de Álvaro pendiente (lib/productos/curso/quien.ts · PARA_QUE). */}
          <p className="a-pieza mt-4 font-serif text-2xl leading-snug text-white sm:text-3xl" style={orden(2)}>
            {PARA_QUE}
          </p>
          <p className="a-pieza mt-4 text-slate-300" style={orden(3)}>
            {BIO}
          </p>
          <dl className="mt-6 grid grid-cols-3 gap-3">
            {DATOS.map((d, i) => (
              <div key={d.texto} className="a-pieza rounded-2xl border border-white/10 bg-white/[0.03] p-3 sm:p-4" style={orden(4 + i)}>
                <dt className="font-serif text-2xl text-white sm:text-3xl">
                  {d.valor === null ? d.etiqueta : <Contador valor={d.valor} prefijo={'prefijo' in d ? d.prefijo : ''} sufijo={d.sufijo} />}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-slate-400 sm:text-sm">{d.texto}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Armado>

      {/* 2 · Lo que aprendí operando mis negocios */}
      <Armado className="mt-16">
        <Tiempo n={2} titulo="Lo que aprendí operando mis negocios" />
        <p className="a-pieza mt-4 max-w-2xl text-slate-300" style={orden(1)}>
          Esto no sale de un libro: es como opero mis propios negocios. El curso lleva esas mismas reglas a tu negocio, en una planilla.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRACTICAS.map((p, i) => {
            const Icono = ICONOS[i];
            return (
              <li key={p.titulo} className="a-pieza group rounded-2xl border border-[#5fb2dd]/25 bg-gradient-to-b from-[#2175a1]/15 to-transparent p-5 transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none" style={orden(2 + i)}>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5fb2dd]/15 ring-1 ring-[#5fb2dd]/30 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 motion-reduce:transition-none">
                  <Icono className="h-5 w-5 text-[#5fb2dd]" aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-semibold text-white">{p.titulo}</h3>
                <p className="mt-2 text-sm text-slate-300">{p.texto}</p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">{p.modulo}</p>
              </li>
            );
          })}
        </ul>
        <div className="a-pieza mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5" style={orden(6)}>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">Mis negocios</p>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {EMPRESAS.map((e) => (
              <li key={e.nombre} className="flex items-center gap-3">
                <span className="flex h-12 w-[132px] shrink-0 items-center justify-start">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={e.logo} alt={e.nombre} width={e.ancho} height={e.alto} loading="lazy" decoding="async" className="h-auto max-h-10 w-auto" />
                  {e.nombre === 'Villelab' ? <span className="ml-2 font-serif text-lg text-white">Villelab</span> : null}
                </span>
                <span className="text-sm text-slate-400">{e.que}</span>
              </li>
            ))}
          </ul>
        </div>
        {MOSTRAR_CLIENTES && CLIENTES.length > 0 ? (
          // Franja lista para encender cuando Álvaro confirme (logos en gris monocromo).
          <div className="mt-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">Empresas con las que he trabajado</p>
            <ul className="mt-4 flex flex-wrap items-center gap-6 opacity-70 grayscale">
              {CLIENTES.map((c) => (
                <li key={c.nombre} className="flex h-10 min-w-[96px] items-center justify-center rounded-lg bg-white/[0.04] px-3 text-sm text-slate-400">
                  {c.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.logo} alt={c.nombre} loading="lazy" className="max-h-7 w-auto" />
                  ) : (
                    c.nombre
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Armado>

      {/* 3 · Lo que te vas a llevar */}
      <Armado className="mt-16 rounded-3xl border border-[#5fb2dd]/30 bg-gradient-to-br from-[#2175a1]/20 via-[#111a2e] to-[#0f172a] p-6 sm:p-8">
        <Tiempo n={3} titulo="Lo que te vas a llevar" />
        <p className="a-pieza mt-4 max-w-2xl font-serif text-2xl leading-snug text-white" style={orden(1)}>
          Tu negocio en una planilla, con las mismas reglas con que ordeno los míos: tus clientes, tus pedidos, tu cobranza y tu caja, con un tablero que se calcula solo.
        </p>
        <div className="a-pieza mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center" style={orden(2)}>
          <Link
            href="#parte-gratis-hero"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#FF3D8B] px-6 text-sm font-semibold text-white shadow-rosa transition hover:bg-[#ff5c9f]"
          >
            Mira gratis el módulo 0 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
          <Link href="#que-te-llevas" className="inline-flex min-h-[48px] items-center justify-center px-2 text-sm text-[#5fb2dd] underline underline-offset-2 hover:text-white">
            Ver todo lo que incluye
          </Link>
        </div>
      </Armado>
    </section>
  );
}
