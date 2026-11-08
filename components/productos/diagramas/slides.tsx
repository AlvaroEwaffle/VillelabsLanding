'use client';

/*
 * Diagramas para /workshop/diapositivas (8-nov-2026). Todo en em, sobre el tamaño base del lienzo 16:9,
 * y con las mismas variantes (oculto/visible) que usa Diapositivas.tsx: entran escalonados con la diapositiva.
 * MotionConfig reducedMotion="user" (en Diapositivas) respeta prefers-reduced-motion.
 */

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

const PIEZA: Variants = {
  oculto: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 26 } },
};

function Flecha({ abajo = false }: { abajo?: boolean }) {
  return (
    <motion.span variants={PIEZA} aria-hidden="true" className="flex shrink-0 items-center justify-center text-[#5fb2dd]">
      <svg viewBox="0 0 24 24" className={`h-[1.2em] w-[1.2em] ${abajo ? 'rotate-90' : 'rotate-90 md:rotate-0'}`} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12h15M13 6l6 6-6 6" />
      </svg>
    </motion.span>
  );
}

function Caja({ children, tono = 'neutro', className = '' }: { children: ReactNode; tono?: 'neutro' | 'acento' | 'claro'; className?: string }) {
  const t =
    tono === 'claro'
      ? 'border-[#5fb2dd] bg-[#5fb2dd] text-[#0f172a]'
      : tono === 'acento'
        ? 'border-[#5fb2dd]/60 bg-[#2175a1]/25 text-white'
        : 'border-white/10 bg-white/[0.05] text-white';
  return (
    <motion.div variants={PIEZA} className={`rounded-[0.7em] border px-[0.8em] py-[0.5em] ${t} ${className}`}>
      {children}
    </motion.div>
  );
}

/** Diapositiva «caso»: 6 de cada 10 mensajes son la misma pregunta. */
export function MensajesRepetidos() {
  return (
    <motion.figure
      variants={PIEZA}
      role="img"
      aria-label="De cada 10 mensajes que recibe Grano Norte, 6 son la misma pregunta: precio, despacho u horario."
      className="mt-[1em] flex flex-wrap items-center gap-x-[1em] gap-y-[0.5em]"
    >
      <div aria-hidden="true" className="flex gap-[0.3em]">
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className={`flex h-[1.9em] w-[1.9em] items-center justify-center rounded-[0.45em] ${i < 6 ? 'bg-[#2175a1] text-white' : 'bg-white/10 text-slate-500'}`}>
            <svg viewBox="0 0 24 24" className="h-[1em] w-[1em]" fill="currentColor">
              <path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-4 3v-3H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
            </svg>
          </span>
        ))}
      </div>
      <p aria-hidden="true" className="text-[0.9em] text-slate-300">
        <span className="text-[#5fb2dd]">6 de cada 10</span> preguntan lo mismo: precio, despacho, horario.
      </p>
    </motion.figure>
  );
}

/** Diapositiva «piezas»: cómo se arman las 3 piezas en un flujo. */
export function FlujoPiezas() {
  return (
    <motion.figure
      variants={PIEZA}
      role="img"
      aria-label="Flujo: el esqueleto y las reglas de freno alimentan al asistente; el asistente responde por el canal, como WhatsApp, al cliente; lo que no le toca se lo deriva a Camila."
      className="mt-[1.1em]"
    >
      <div aria-hidden="true" className="flex flex-col items-stretch gap-[0.4em] md:flex-row md:items-center">
        <Caja tono="acento" className="md:flex-1">
          <p className="text-[0.95em] font-medium">1 + 2 · Esqueleto + reglas</p>
          <p className="text-[0.75em] text-slate-300">Lo que sabe y lo que nunca promete</p>
        </Caja>
        <Flecha />
        <Caja className="md:flex-1">
          <p className="text-[0.95em] font-medium">Asistente</p>
          <p className="text-[0.75em] text-slate-300">Lee solo eso</p>
        </Caja>
        <Flecha />
        <Caja className="md:flex-1">
          <p className="text-[0.95em] font-medium">3 · Canal</p>
          <p className="text-[0.75em] text-slate-300">WhatsApp, Instagram, web</p>
        </Caja>
        <Flecha />
        <div className="flex flex-col gap-[0.35em] md:flex-1">
          <Caja>
            <p className="text-[0.85em]">Cliente: respuesta al tiro</p>
          </Caja>
          <Caja tono="claro">
            <p className="text-[0.85em] font-medium">Camila: lo que no le toca</p>
          </Caja>
        </div>
      </div>
    </motion.figure>
  );
}

/** Diapositiva «derivación»: el camino de un mensaje hasta una persona. */
export function FlujoDerivacion({ casos }: { casos: { t: string; I: LucideIcon }[] }) {
  return (
    <motion.figure
      variants={PIEZA}
      role="img"
      aria-label={`Flujo de derivación: llega un mensaje; si está en el esqueleto, responde el asistente. Si es ${casos.map((c) => c.t.toLowerCase()).join(', ')}, el asistente avisa y le pasa la conversación a una persona.`}
      className="mt-[1.1em]"
    >
      <div aria-hidden="true" className="grid items-center gap-[0.5em] md:grid-cols-[auto_auto_1fr]">
        <Caja>
          <p className="text-[1em] font-medium">Llega un mensaje</p>
          <p className="text-[0.75em] text-slate-300">¿Está en el esqueleto?</p>
        </Caja>
        <Flecha />
        <div className="grid gap-[0.4em]">
          <Caja className="flex items-center justify-between gap-[0.8em]">
            <p className="text-[0.95em]">
              <span className="font-mono text-[0.75em] uppercase tracking-wider text-[#5fb2dd]">Sí · </span>Responde el asistente
            </p>
            <p className="hidden text-[0.75em] text-slate-400 md:block">precio, horario, cómo comprar</p>
          </Caja>
          <Caja tono="acento">
            <p className="text-[0.95em]">
              <span className="font-mono text-[0.75em] uppercase tracking-wider text-[#5fb2dd]">No · </span>Pasa a una persona
            </p>
            <div className="mt-[0.4em] grid grid-cols-2 gap-[0.35em] md:grid-cols-4">
              {casos.map(({ t, I }) => (
                <span key={t} className="flex items-center gap-[0.4em] rounded-[0.5em] bg-[#0f172a]/50 px-[0.5em] py-[0.35em] text-[0.8em] leading-tight text-white">
                  <I className="h-[1.1em] w-[1.1em] shrink-0 text-[#5fb2dd]" aria-hidden />
                  {t}
                </span>
              ))}
            </div>
          </Caja>
        </div>
      </div>
    </motion.figure>
  );
}
