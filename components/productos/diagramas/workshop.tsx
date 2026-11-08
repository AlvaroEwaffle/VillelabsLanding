'use client';

// Diagramas de /workshop y /workshop/grabacion (8-nov-2026). Las diapositivas usan diagramas/slides.tsx (escala em).
import { motion } from 'framer-motion';
import { Comparacion, Diagrama, Flecha, Nodo, PIEZA } from './base';

/** Los 3 tipos de mensaje y quién responde cada uno. */
export function DiagramaTresTipos({ className = '' }: { className?: string }) {
  const tipos = [
    { t: 'Repetidos', d: 'Precio, despacho, horario', q: 'Responde el asistente', tono: 'claro' as const },
    { t: 'Con decisión', d: 'Precio especial, una fecha, un reclamo', q: 'Responde una persona', tono: 'acento' as const },
    { t: 'Nuevos', d: 'Lo que no está en ninguna parte', q: 'El asistente avisa y deriva', tono: 'neutro' as const },
  ];
  return (
    <Diagrama
      titulo="Qué responde el asistente y qué no"
      aria="Llega un mensaje y se clasifica en tres tipos. Repetidos, como precio, despacho u horario: responde el asistente. Con decisión, como un precio especial, una fecha o un reclamo: responde una persona. Nuevos, lo que no está en ninguna parte: el asistente avisa y deriva."
      className={className}
    >
      <div className="flex flex-col items-center">
        <Nodo titulo="Llega un mensaje por WhatsApp" className="w-full max-w-xs text-center" />
        <div className="mt-1 grid w-full gap-3 md:grid-cols-3">
          {tipos.map((x) => (
            <div key={x.t} className="flex flex-col items-center">
              <Flecha vertical etiqueta={x.t.toLowerCase()} />
              <Nodo tono={x.tono} titulo={x.q} texto={`${x.t}: ${x.d}`} className="w-full" />
            </div>
          ))}
        </div>
      </div>
    </Diagrama>
  );
}

/** 48 minutos diarios en lo mismo, antes y después del asistente. */
export function DiagramaMinutos({ className = '' }: { className?: string }) {
  return (
    <Diagrama
      titulo="Los 48 minutos de Grano Norte"
      aria="Cálculo del caso Grano Norte: 40 mensajes al día, 6 de cada 10 son la misma pregunta y cada respuesta toma 2 minutos; son 48 minutos diarios respondiendo lo mismo. Con el asistente, esas preguntas se responden solas y a Camila solo le llegan las que necesitan una persona."
      className={className}
    >
      <div className="flex flex-wrap items-center justify-center gap-2 text-center">
        {[
          { n: '40', t: 'mensajes al día' },
          { n: '× 6/10', t: 'son la misma pregunta' },
          { n: '× 2 min', t: 'por respuesta' },
        ].map((x) => (
          <motion.div key={x.n} variants={PIEZA} className="min-w-[6.5rem] rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
            <p className="font-serif text-2xl text-white">{x.n}</p>
            <p className="text-[12px] text-slate-300">{x.t}</p>
          </motion.div>
        ))}
        <motion.div variants={PIEZA} className="min-w-[6.5rem] rounded-xl bg-[#5fb2dd] px-3 py-2 text-[#0f172a]">
          <p className="font-serif text-2xl">= 48 min</p>
          <p className="text-[12px] font-medium">diarios en lo mismo</p>
        </motion.div>
      </div>
      <div className="mt-5">
        <Comparacion
          izq={{
            titulo: 'Hoy',
            children: (
              <div className="space-y-1.5">
                <div className="h-4 rounded bg-rose-400/70" style={{ width: '100%' }} />
                <p className="text-[13px] text-slate-300">48 min de respuestas repetidas, cada día.</p>
              </div>
            ),
          }}
          der={{
            titulo: 'Con el asistente',
            children: (
              <div className="space-y-1.5">
                <div className="h-4 w-full rounded border border-dashed border-[#5fb2dd]/50" />
                <p className="text-[13px] text-slate-200">Las repetidas se responden solas. Tú revisas lo que te deriva: descuentos, reclamos, pedidos grandes.</p>
              </div>
            ),
          }}
        />
      </div>
    </Diagrama>
  );
}

/** Grabación: el recorrido de la demo. */
export function DiagramaRecorridoDemo({ className = '' }: { className?: string }) {
  const pasos = [
    { t: 'El esqueleto', d: 'Lo que sabe Grano Norte' },
    { t: 'Las reglas de freno', d: 'Lo que nunca promete' },
    { t: 'La pregunta trampa', d: '¿Descuento por 2 kilos?' },
    { t: 'WhatsApp en vivo', d: 'Responde o deriva a Camila' },
  ];
  return (
    <Diagrama
      titulo="Lo que se ve en la grabación"
      aria="Recorrido de la demo de la grabación en cuatro pasos: el esqueleto de Grano Norte, las reglas de freno, la pregunta trampa del descuento por 2 kilos y el asistente respondiendo en vivo por WhatsApp, derivando a Camila lo que no le toca."
      className={className}
    >
      <ol className="grid gap-2 sm:grid-cols-4">
        {pasos.map((p, i) => (
          <motion.li key={p.t} variants={PIEZA} className={`relative rounded-xl border p-3 ${i === 3 ? 'border-[#5fb2dd]/60 bg-[#2175a1]/25' : 'border-white/10 bg-white/[0.04]'}`}>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2175a1] font-serif text-sm text-white">{i + 1}</span>
            <p className="mt-2 text-sm font-semibold text-white">{p.t}</p>
            <p className="text-[13px] text-slate-300">{p.d}</p>
          </motion.li>
        ))}
      </ol>
    </Diagrama>
  );
}
