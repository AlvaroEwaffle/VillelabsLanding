'use client';

// Diagramas nuevos de /curso y /curso/modulo-0 (8-nov-2026). Se suman a DiagramaCiclo, TableroMock y el mapa interactivo.
import { motion } from 'framer-motion';
import { Ciclo, Comparacion, Diagrama, Flecha, Nodo, PIEZA } from './base';

const AREAS_CORTAS = ['Marketing', 'Ventas', 'Operación', 'Atención', 'Finanzas'];

/** Estrella: todo pasa por el dueño vs áreas conectadas que leen lo mismo. */
function Estrella({ centro, conectadas }: { centro: string; conectadas: boolean }) {
  const cx = 150;
  const cy = 120;
  const r = 92;
  const pts = AREAS_CORTAS.map((a, i) => {
    const ang = ((-90 + i * 72) * Math.PI) / 180;
    return { a, x: cx + r * Math.cos(ang), y: cy + r * Math.sin(ang) };
  });
  return (
    <svg viewBox="0 0 300 240" className="mx-auto h-auto w-full max-w-[300px]">
      {conectadas
        ? pts.map((p, i) => {
            const q = pts[(i + 1) % pts.length];
            return <line key={`c${p.a}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke="#5fb2dd" strokeOpacity="0.55" strokeWidth="2" />;
          })
        : null}
      {pts.map((p) => (
        <line
          key={`r${p.a}`}
          x1={p.x}
          y1={p.y}
          x2={cx}
          y2={cy}
          stroke={conectadas ? '#5fb2dd' : '#fb7185'}
          strokeOpacity={conectadas ? 0.35 : 0.8}
          strokeWidth={conectadas ? 1.5 : 2.5}
          strokeDasharray={conectadas ? '3 4' : undefined}
        />
      ))}
      <circle cx={cx} cy={cy} r="34" fill={conectadas ? '#2175a1' : '#3f1d2b'} fillOpacity={conectadas ? 0.35 : 0.9} stroke={conectadas ? '#5fb2dd' : '#fb7185'} strokeWidth="2" />
      {centro.split('\n').map((l, i, arr) => (
        <text key={l} x={cx} y={cy + (i - (arr.length - 1) / 2) * 15 + 5} textAnchor="middle" fill="#f1f5f9" fontSize="13">
          {l}
        </text>
      ))}
      {pts.map((p) => (
        <g key={p.a}>
          <rect x={p.x - 40} y={p.y - 14} width="80" height="28" rx="14" fill="#131c31" stroke="#24314d" strokeWidth="2" />
          <text x={p.x} y={p.y + 5} textAnchor="middle" fill="#f1f5f9" fontSize="13">
            {p.a}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** /curso · Para quién: el cuello de botella antes y después. */
export function DiagramaCuelloBotella({ className = '' }: { className?: string }) {
  return (
    <Diagrama
      titulo="El cuello de botella, antes y después"
      aria="Comparación. Antes: las cinco áreas (marketing, ventas, operación, atención y finanzas) pasan todas por ti. Después: las áreas se conectan entre ellas y leen lo mismo, el esqueleto y las reglas de freno; a ti solo llega lo que decide una persona."
      className={className}
    >
      <Comparacion
        izq={{
          titulo: 'Hoy · todo pasa por ti',
          children: (
            <>
              <motion.div variants={PIEZA}>
                <Estrella centro={'Tú'} conectadas={false} />
              </motion.div>
              <p className="mt-2 text-[13px] text-slate-300">Cada cotización, pedido y reclamo espera tu respuesta.</p>
            </>
          ),
        }}
        der={{
          titulo: 'Al terminar · las áreas se pasan la pelota',
          children: (
            <>
              <motion.div variants={PIEZA}>
                <Estrella centro={'Esqueleto\n+ reglas'} conectadas />
              </motion.div>
              <p className="mt-2 text-[13px] text-slate-200">A ti solo llega lo que decide siempre una persona.</p>
            </>
          ),
        }}
      />
    </Diagrama>
  );
}

/** /curso · Cómo se aprende: el ciclo de cada módulo. */
export function DiagramaComoSeAprende({ className = '' }: { className?: string }) {
  return (
    <Diagrama
      titulo="Así funciona cada módulo"
      className={className}
      aria="Ciclo de cada módulo en cuatro pasos: la idea, una demo con el caso Grano Norte, la plantilla para tu negocio y una prueba real. El resultado se suma a tu tablero y parte el módulo siguiente."
      pie="Cada vuelta deja un entregable en tu tablero. Siete vueltas y tienes tu negocio ordenado de punta a punta."
    >
      <Ciclo nodos={[['La idea'], ['Demo con', 'Grano Norte'], ['Tu', 'plantilla'], ['Prueba', 'real']]} centro={['Tu', 'tablero']} />
    </Diagrama>
  );
}

/** Módulo 0 · Lección 2: cómo leer tu semáforo. */
export function DiagramaSemaforo({ className = '' }: { className?: string }) {
  const filas = [
    { c: 'bg-rose-500', t: 'Rojo', d: 'Depende de ti o de la memoria', h: 'Empieza por aquí' },
    { c: 'bg-orange-400', t: 'Naranja', d: 'A medias: se cae cuando hay harta pega', h: 'Escríbelo y ordénalo' },
    { c: 'bg-emerald-500', t: 'Verde', d: 'Escrito y se repite solo', h: 'Afina y mide' },
  ];
  return (
    <Diagrama
      titulo="Cómo leer tu semáforo"
      className={className}
      aria="Cómo leer el semáforo del diagnóstico. Rojo: el área depende de ti o de la memoria; empieza por aquí. Naranja: está a medias y se cae cuando hay harta pega; escríbelo y ordénalo. Verde: está escrito y se repite solo; afina y mide."
      pie="Si tienes varios rojos, parte por el que más plata o más tiempo te cuesta cada semana."
    >
      <div className="space-y-2">
        {filas.map((f) => (
          <motion.div key={f.t} variants={PIEZA} className="grid grid-cols-[auto_1fr] items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 sm:grid-cols-[auto_1fr_auto_auto]">
            <span className={`h-4 w-4 rounded-full ${f.c}`} />
            <p className="text-sm text-white">
              <strong className="font-semibold">{f.t}:</strong> <span className="text-slate-300">{f.d}</span>
            </p>
            <span className="hidden text-[#5fb2dd] sm:block">→</span>
            <p className="col-start-2 text-[13px] font-medium text-[#5fb2dd] sm:col-start-auto">{f.h}</p>
          </motion.div>
        ))}
      </div>
    </Diagrama>
  );
}

/** Módulo 0 · Lección 3: un solo documento alimenta las cinco áreas. */
export function DiagramaEsqueletoAlimenta({ className = '' }: { className?: string }) {
  const usos = [
    { a: 'Marketing', u: 'Tu frase y tus temas → el calendario de contenido' },
    { a: 'Ventas', u: 'Tus precios → la propuesta' },
    { a: 'Atención', u: 'Tus preguntas y frenos → el asistente de WhatsApp' },
    { a: 'Operación', u: 'Plazos y horarios → lo que se promete' },
    { a: 'Finanzas', u: 'Precios y productos → tus números' },
  ];
  return (
    <Diagrama
      titulo="Un documento, cinco áreas"
      className={className}
      aria="El esqueleto de tu agente alimenta las cinco áreas: marketing usa tu frase y tus temas para el calendario de contenido; ventas usa tus precios para la propuesta; atención usa tus preguntas y frenos en el asistente de WhatsApp; operación usa plazos y horarios; finanzas usa precios y productos."
    >
      <div className="grid items-center gap-3 sm:grid-cols-[180px_auto_1fr]">
        <Nodo tono="claro" titulo="El esqueleto de tu agente" texto="Qué vendes, a quién, precios, tono, preguntas y frenos" className="text-center" />
        <Flecha />
        <div className="grid gap-1.5">
          {usos.map((u) => (
            <motion.div key={u.a} variants={PIEZA} className="flex items-baseline gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
              <span className="w-[5.5rem] shrink-0 font-mono text-[11px] uppercase tracking-wider text-[#5fb2dd]">{u.a}</span>
              <span className="text-[13px] leading-snug text-slate-200">{u.u}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Diagrama>
  );
}

/** Módulo 0 · Lección 4: quién decide qué, con reglas de freno. */
export function DiagramaQuienDecide({ className = '' }: { className?: string }) {
  return (
    <Diagrama
      titulo="Quién decide qué"
      className={className}
      aria="Con las reglas de freno escritas, todo lo que no está en la lista lo resuelve tu equipo o tu asistente solo, como el precio de lista, el horario o cómo comprar. Lo que está en la lista pasa siempre por ti: precios fuera de lista, fechas de entrega, lo que no sabe y los reclamos."
      pie="Escribir los frenos no te quita control: te saca del resto."
    >
      <div className="grid gap-3 sm:grid-cols-[1fr_1fr]">
        <motion.div variants={PIEZA} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-slate-400">Lo resuelve tu equipo o tu asistente</p>
          <ul className="mt-3 space-y-1.5 text-[13px] text-slate-200">
            {['Precio de la lista', 'Horario y dirección', 'Cómo comprar y pagar', 'Estado de un pedido normal'].map((x) => (
              <li key={x} className="flex gap-2">
                <span className="text-emerald-400">✓</span> {x}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div variants={PIEZA} className="rounded-xl border border-[#5fb2dd]/60 bg-[#2175a1]/20 p-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-[#5fb2dd]">Pasa siempre por ti · reglas de freno</p>
          <ul className="mt-3 space-y-1.5 text-[13px] text-white">
            {['Precios fuera de la lista', 'Fechas de entrega', 'Lo que no sabe', 'Reclamos'].map((x) => (
              <li key={x} className="flex gap-2">
                <span className="text-[#5fb2dd]">■</span> {x}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Diagrama>
  );
}
