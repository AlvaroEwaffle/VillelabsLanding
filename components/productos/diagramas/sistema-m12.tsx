'use client';

// Diagramas de los módulos 1 (Clientes y ventas · tu CRM) y 2 (Marketing y origen) del curso
// «El sistema de tu negocio» (v1.1, 8-nov-2026). Mismas piezas base (./base): HTML + Tailwind que refluye a
// 360 px, figura accesible con aria-label, paleta azul noche, sin amarillo y sin <table>.
import { motion } from 'framer-motion';
import { Diagrama, Nodo, PIEZA } from './base';

type P = { className?: string };

const ESTADOS = ['Sin mensaje', 'Contactado', 'Respondió', 'Conversación', 'Propuesta', 'Cliente'];

/** Módulo 1 · Lección 1: una fila por cliente y los estados por los que avanza. */
export function DiagramaHojaClientes({ className = '' }: P) {
  const columnas = ['Nombre y empresa', 'Origen', 'Estado', 'Próximo paso', 'Fecha'];
  return (
    <Diagrama
      titulo="Tu hoja Clientes: una fila por persona"
      className={className}
      aria={`La hoja Clientes tiene una fila por cliente o posible cliente, con cinco datos clave: ${columnas.join(', ')}. Cada fila avanza por estados: ${ESTADOS.join(', ')}. Lo que no tiene próximo paso y fecha, se enfría.`}
      pie="Lo que no tiene próximo paso y fecha, se enfría. La fecha es lo que la planilla usa para decirte a quién le toca hoy."
    >
      <motion.div variants={PIEZA} className="rounded-xl border border-[#5fb2dd]/50 bg-[#2175a1]/15 p-3">
        <p className="font-mono text-[10px] uppercase tracking-wider text-[#5fb2dd]">Una fila</p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {columnas.map((c) => (
            <li key={c} className={`rounded-md border px-2 py-1 text-[12px] ${c === 'Fecha' || c === 'Próximo paso' ? 'border-[#5fb2dd] bg-[#5fb2dd] text-[#0f172a]' : 'border-white/15 bg-[#0f172a] text-slate-200'}`}>
              {c}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[13px] text-slate-300">Café La Subida · Instagram · Conversación · Enviar muestra · jueves</p>
      </motion.div>
      <p className="mb-2 mt-4 font-mono text-[10px] uppercase tracking-wider text-slate-400">Los estados por los que avanza</p>
      <ol className="flex flex-wrap items-center gap-1.5">
        {ESTADOS.map((e, i) => (
          <motion.li key={e} variants={PIEZA} className="flex items-center gap-1.5">
            <span className={`rounded-full border px-2.5 py-1 text-[12px] ${i === ESTADOS.length - 1 ? 'border-[#5fb2dd] bg-[#2175a1] text-white' : 'border-white/15 text-slate-200'}`}>{e}</span>
            {i < ESTADOS.length - 1 ? <span aria-hidden="true" className="text-[#5fb2dd]">→</span> : null}
          </motion.li>
        ))}
      </ol>
      <p className="mt-2 text-[12px] text-slate-400">Y dos salidas: «Inactivo» (dejó de comprar) y «Descartado» (no calza).</p>
    </Diagrama>
  );
}

/** Módulo 1 · Lección 1: la rutina diaria con la hoja Clientes. */
export function DiagramaRutinaCRM({ className = '' }: P) {
  return (
    <Diagrama
      titulo="20 minutos al día con tu CRM"
      className={className}
      aria="La rutina diaria dura 20 minutos: 5 minutos para ordenar la hoja Clientes por fecha y ver a quién le toca hoy, 10 minutos para escribir los mensajes y 5 minutos para actualizar el estado y anotar la fecha del próximo paso."
      pie="A la misma hora y en el mismo lugar cada día hábil. Si un día no puedes, retomas al siguiente."
    >
      <div className="flex h-3 overflow-hidden rounded-full">
        <motion.span variants={PIEZA} className="w-1/4 bg-[#2175a1]" />
        <motion.span variants={PIEZA} className="w-1/2 bg-[#5fb2dd]" />
        <motion.span variants={PIEZA} className="w-1/4 bg-[#2175a1]" />
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_2fr_1fr]">
        <Nodo numero="5 min" titulo="Mirar" texto="Ordenas por fecha: a quién le toca hoy" />
        <Nodo numero="10 min" titulo="Escribir" texto="El mensaje o el seguimiento de cada uno" tono="acento" />
        <Nodo numero="5 min" titulo="Anotar" texto="Nuevo estado y fecha del próximo paso" />
      </div>
    </Diagrama>
  );
}

/** Módulo 1 · Lección 2: por dónde va el primer mensaje según si te conoce o no. */
export function DiagramaCanalPrimerMensaje({ className = '' }: P) {
  return (
    <Diagrama
      titulo="Por dónde va el primer mensaje"
      className={className}
      aria="Si la persona ya te conoce o te dio su número, el primer mensaje puede ir por WhatsApp. Si no te conoce, va por correo, LinkedIn o Instagram, y pasas a WhatsApp cuando te dé su número. Así respetas las reglas de WhatsApp y no arriesgas que bloqueen tu número."
      pie="Las reglas de WhatsApp Business piden que la persona te haya dado su número. Escribirle en frío expone a que te reporten y te bloqueen."
    >
      <div className="grid gap-2 sm:grid-cols-2">
        <Nodo tono="ok" titulo="Ya te conoce o te dio su número" texto="Clientes, ex clientes, referidos que te presentaron, quien te escribió primero. → WhatsApp" />
        <Nodo tono="neutro" titulo="No te conoce todavía" texto="Un negocio que encontraste en Google Maps o Instagram. → Correo, LinkedIn o mensaje directo en Instagram. Pasas a WhatsApp cuando te dé su número." />
      </div>
    </Diagrama>
  );
}

/** Módulo 2 · Lección 5: de los canales a los clientes, sin «me gusta». */
export function DiagramaOrigen({ className = '' }: P) {
  const canales = ['Referido', 'Instagram', 'Google', 'Visita o feria'];
  return (
    <Diagrama
      titulo="De dónde llega cada cliente"
      className={className}
      aria="Cada contacto nuevo anota su origen en la hoja Clientes: referido, Instagram, Google, visita u otro. La hoja Origen cuenta, por canal, cuántos contactos llegaron y cuántos se volvieron clientes. Los me gusta y el alcance no entran en la cuenta."
      pie="El canal que manda es el que trae clientes, no el que tiene más alcance."
    >
      <motion.div variants={PIEZA} className="mx-auto w-full rounded-lg border border-dashed border-white/15 p-2 text-center text-sm text-slate-500 line-through">
        Alcance, reproducciones y «me gusta»
      </motion.div>
      <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
        <motion.ul variants={PIEZA} className="flex flex-wrap gap-1.5 sm:flex-col">
          {canales.map((c) => (
            <li key={c} className="rounded-md border border-white/15 bg-white/[0.04] px-2 py-1 text-[12px] text-slate-200">
              {c}
            </li>
          ))}
        </motion.ul>
        <span aria-hidden="true" className="text-center text-[#5fb2dd]">→</span>
        <Nodo titulo="Contactos" texto="Columna Origen de tu hoja Clientes" />
        <span aria-hidden="true" className="text-center text-[#5fb2dd]">→</span>
        <Nodo tono="acento" titulo="Clientes" texto="La hoja Origen los cuenta por canal" />
      </div>
    </Diagrama>
  );
}
