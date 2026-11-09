'use client';

import Image from 'next/image';
import { useState } from 'react';
import { MotionConfig, motion, type Variants } from 'framer-motion';
import { ArrowRight, CalendarDays, Check, ChevronDown, Clock, Gift, Radio } from 'lucide-react';
import SiguientePaso from '@/components/productos/SiguientePaso';
import { LINKS } from '@/lib/productos/links';
import { FOTOS } from '@/lib/productos/fotos';
import { APOYO } from '@/lib/productos/apoyo';
import { DiagramaMinutos, DiagramaTresTipos } from '@/components/productos/diagramas/workshop';
import { fechaWorkshopTexto, WORKSHOP_TITULO } from '@/lib/productos/workshop/config';
import {
  AGENDA,
  GRATIS_ESQUELETO,
  GRATIS_GRABACION,
  LO_QUE_TE_LLEVAS,
  PASO_CURSO,
  PREGUNTAS_FRECUENTES,
  PROMESA,
} from '@/lib/productos/workshop/contenido';
import FormularioInscripcion from './FormularioInscripcion';

/*
 * /workshop — inscripción al Workshop 1 (Entrada B del embudo de productos digitales).
 * Textos: VPM/Villelabs/productos-digitales/contenido-primeros-productos.html.
 * Fecha: lib/productos/workshop/config.ts. Evento GA4: workshop_registro.
 * Animaciones: framer-motion, cortas y una sola vez (once); MotionConfig reducedMotion="user" respeta prefers-reduced-motion.
 */

// Hero: entrada escalonada al cargar.
const HERO: Variants = { oculto: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };
const SUBE: Variants = {
  oculto: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

/** Aparece al entrar en pantalla (una vez). `i` escalona elementos hermanos. */
function Aparece({ children, i = 0, className = '' }: { children: React.ReactNode; i?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#5fb2dd]">{children}</p>;
}

type Foto = { src: string; alt: string };

/** Foto de apoyo de Álvaro (lib/productos/fotos.ts), recortada al marco que se le dé. */
function Foto({
  foto,
  className = '',
  pos = 'center',
  sizes = '(min-width: 1024px) 40vw, 100vw',
}: {
  foto: Foto;
  className?: string;
  pos?: string;
  sizes?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900 ${className}`}>
      <Image src={foto.src} alt={foto.alt} fill sizes={sizes} className="object-cover" style={{ objectPosition: pos }} />
    </div>
  );
}

function Pregunta({ q, a }: { q: string; a: string }) {
  const [abierta, setAbierta] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={() => setAbierta(!abierta)}
        className="flex min-h-[56px] w-full items-center justify-between gap-4 py-4 text-left text-base text-white sm:text-lg"
        aria-expanded={abierta}
      >
        {q}
        <ChevronDown className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${abierta ? 'rotate-180' : ''}`} />
      </button>
      {abierta ? <p className="pb-5 pr-8 text-slate-300">{a}</p> : null}
    </div>
  );
}

export default function WorkshopLanding() {
  const fecha = fechaWorkshopTexto();
  return (
    <MotionConfig reducedMotion="user">
      <main className="relative w-full overflow-x-hidden bg-[#0f172a] text-slate-200" aria-label="Workshop gratis">
        {/* Promesa + inscripción */}
        <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-32 sm:px-6 md:pt-40 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <motion.div variants={HERO} initial="oculto" animate="visible">
            <motion.div variants={SUBE}>
              <Kicker>Workshop gratis · en vivo por YouTube</Kicker>
            </motion.div>
            <motion.h1 variants={SUBE} className="mt-5 font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-[3.3rem]">
              {WORKSHOP_TITULO}
            </motion.h1>
            <motion.p variants={SUBE} className="mt-6 max-w-2xl text-base text-slate-300 sm:text-lg">
              {PROMESA}
            </motion.p>
            <motion.ul variants={SUBE} className="mt-6 flex flex-wrap gap-2 text-sm">
              <li className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-slate-200">
                <Clock className="h-4 w-4 text-[#5fb2dd]" aria-hidden /> 45 min
              </li>
              <li className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-slate-200">
                <Gift className="h-4 w-4 text-[#5fb2dd]" aria-hidden /> Gratis
              </li>
              <li className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-slate-200">
                <Radio className="h-4 w-4 text-[#5fb2dd]" aria-hidden /> En vivo por YouTube
              </li>
            </motion.ul>
            <motion.p variants={SUBE} className="mt-4 flex items-start gap-2 text-slate-300">
              <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-[#5fb2dd]" aria-hidden />
              <span>
                <span className="text-white">Fecha:</span> {fecha}
              </span>
            </motion.p>

            <motion.figure variants={SUBE} className="relative mt-8">
              <Foto foto={FOTOS.podcasterCerca} className="aspect-[16/9] w-full" pos="50% 35%" />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-[#0f172a]/85 px-3 py-1.5 text-xs text-slate-200 backdrop-blur">
                En vivo por YouTube con Álvaro Villena
              </figcaption>
            </motion.figure>

            <h2 className="mt-10 text-sm uppercase tracking-wider text-slate-400">Lo que te llevas</h2>
            <ul className="mt-4 space-y-3">
              {LO_QUE_TE_LLEVAS.map((x, i) => (
                <motion.li
                  key={x}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start gap-3 text-slate-200"
                >
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#5fb2dd]" aria-hidden /> {x}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            id="inscripcion"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="scroll-mt-28 lg:pt-6"
          >
            <FormularioInscripcion />
          </motion.div>
        </section>

        {/* El esqueleto: se arma antes y se trabaja en vivo */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <Aparece className="grid gap-6 rounded-3xl border border-[#5fb2dd]/50 bg-gradient-to-br from-[#2175a1]/25 to-[#131c31] p-6 shadow-[0_10px_40px_rgba(33,117,161,0.2)] sm:p-10 md:grid-cols-[minmax(0,320px)_1fr] md:items-center">
            <Foto foto={APOYO.escribir} className="aspect-[16/10] w-full" pos="50% 50%" sizes="(min-width: 768px) 320px, 100vw" />
            <div>
              <Kicker>Antes del workshop · gratis · 15 min</Kicker>
              <h2 className="mt-3 font-serif text-3xl text-white sm:text-4xl">El esqueleto de tu asistente de WhatsApp</h2>
              <p className="mt-3 max-w-2xl text-slate-300">
                Cuatro pasos cortos: tu negocio, las preguntas de siempre, lo que nunca debe prometer y cuándo pasa a una persona. Ármalo
                antes y en el workshop lo trabajamos en vivo con el tuyo: lo ves respondiendo a tus clientes.
              </p>
              <ol className="mt-5 grid gap-2 text-sm text-slate-200 sm:grid-cols-2">
                {['Tu negocio', 'Las preguntas de siempre', 'Lo que nunca debe prometer', 'Cuándo pasa a una persona'].map((paso, i) => (
                  <li key={paso} className="flex items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2175a1] text-xs text-white">
                      {i + 1}
                    </span>
                    {paso}
                  </li>
                ))}
              </ol>
              <a
                href={LINKS.esqueleto}
                className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#FF3D8B] px-6 text-sm font-semibold text-white hover:bg-[#ff5c9f] sm:w-auto"
              >
                Armar mi esqueleto ahora <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <p className="mt-3 text-xs text-slate-400">Si no alcanzas, no pasa nada: lo armas durante la demo o lo recibes al final.</p>
            </div>
          </Aparece>
        </section>

        {/* El problema y la idea, dibujados (regla de marca del 8-nov-2026: los diagramas se duplican) */}
        <section className="mx-auto grid max-w-6xl gap-5 px-4 py-6 sm:px-6 lg:grid-cols-2">
          <DiagramaMinutos />
          <DiagramaTresTipos />
        </section>

        {/* Agenda */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <Kicker>Agenda</Kicker>
          <h2 className="mt-3 font-serif text-3xl text-white sm:text-4xl">45 minutos, en 5 momentos.</h2>
          <Aparece>
            <Foto
              foto={APOYO.workshopOnline}
              className="mt-8 aspect-[16/9] w-full sm:aspect-[21/8]"
              pos="50% 45%"
              sizes="(min-width: 1152px) 1152px, 100vw"
            />
          </Aparece>
          <ol className="mt-10 grid gap-4 md:grid-cols-5">
            {AGENDA.map((a, i) => (
              <motion.li
                key={a.titulo}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-5"
              >
                <span className="font-mono text-xs text-[#5fb2dd]">
                  {String(i + 1).padStart(2, '0')} · min {a.min}
                </span>
                <h3 className="mt-3 text-lg leading-snug text-white">{a.titulo}</h3>
                <p className="mt-2 text-sm text-slate-400">{a.texto}</p>
              </motion.li>
            ))}
          </ol>
        </section>

        {/* Quién lo da */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <Aparece className="grid items-center gap-8 rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-10 md:grid-cols-[220px_1fr]">
            <Foto foto={FOTOS.ciudad} className="mx-auto aspect-[619/646] w-44 md:w-full" sizes="220px" />
            <div>
              <Kicker>Quién lo da</Kicker>
              <h2 className="mt-3 font-serif text-3xl text-white sm:text-4xl">Álvaro Villena</h2>
              <p className="mt-4 max-w-2xl text-slate-300">
                Opero mis propios negocios, Ewaffle y Fidelidapp, con este mismo método: lo que se repite se escribe y lo importante siempre
                pasa por una persona. En el workshop te lo muestro con un caso de ejemplo, Grano Norte, para que lo repitas con el tuyo.
              </p>
              <p className="mt-4 text-sm text-slate-400">
                Ex-LATAM Airlines · Ex-PepsiCo vía Toptal · +8 años liderando equipos de producto.
              </p>
            </div>
          </Aparece>
        </section>

        {/* Preguntas */}
        <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[280px_1fr] md:items-start">
          <Foto foto={APOYO.mesaCafe} className="hidden aspect-[781/1100] w-full md:block" pos="40% 50%" sizes="280px" />
          <div>
            <Kicker>Preguntas</Kicker>
            <h2 className="mt-3 font-serif text-3xl text-white sm:text-4xl">Antes de inscribirte.</h2>
            <div className="mt-8 border-t border-white/10">
              {PREGUNTAS_FRECUENTES.map((f) => (
                <Pregunta key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </div>
        </section>

        {/* Llamado final */}
        <section className="mx-auto max-w-6xl px-4 pb-32 pt-8 sm:px-6">
          <Aparece className="grid items-center gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-[#2175a1]/25 via-slate-900 to-[#0f172a] p-6 sm:grid-cols-[1fr_auto] sm:p-10">
            <div>
              <h2 className="max-w-2xl font-serif text-3xl text-white sm:text-4xl">45 minutos, gratis y en vivo por YouTube.</h2>
              <p className="mt-3 text-slate-300">Fecha: {fecha}. Te llevas de regalo el esqueleto de tu asistente de WhatsApp.</p>
              <a
                href="#inscripcion"
                className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-[#FF3D8B] px-6 text-sm font-semibold text-white hover:bg-[#ff5c9f] sm:w-auto"
              >
                Reservar mi cupo gratis
              </a>
            </div>
            <Foto foto={APOYO.celularMensajes} className="hidden aspect-square w-48 sm:block" pos="45% 50%" sizes="192px" />
          </Aparece>
          <SiguientePaso logro="Ya sabes cómo funciona el workshop" pago={PASO_CURSO} gratis={[GRATIS_ESQUELETO, GRATIS_GRABACION]} />
        </section>
      </main>
    </MotionConfig>
  );
}
