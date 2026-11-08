'use client';

// Diagramas de /curso y /curso/modulo-0 (8-nov-2026; v1.1 con el enfoque «tu primer CRM y ERP en Google Sheets»).
// Se suman a DiagramaCiclo (las hojas alrededor del tablero), TableroMock y el mapa interactivo.
import { motion } from 'framer-motion';
import { Ciclo, Comparacion, Diagrama, Flecha, Nodo, PIEZA } from './base';

const AREAS_CORTAS = ['Clientes', 'Origen', 'Pedidos', 'Atención', 'Cobranza'];

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
      aria="Comparación. Antes: clientes, origen, pedidos, atención y cobranza pasan todos por ti y viven en tu memoria. Después: cada pieza tiene su hoja en la misma planilla, conectadas en un tablero; a ti solo llega lo que decide una persona."
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
          titulo: 'Al terminar · todo en una planilla',
          children: (
            <>
              <motion.div variants={PIEZA}>
                <Estrella centro={'Tu\ntablero'} conectadas />
              </motion.div>
              <p className="mt-2 text-[13px] text-slate-200">Tu equipo mira la planilla. A ti solo llega lo que decide siempre una persona.</p>
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
      aria="Ciclo de cada módulo en cuatro pasos: la idea, el ejemplo con el caso Grano Norte, tu hoja de la planilla y una prueba real. La hoja se suma a tu planilla y parte el módulo siguiente."
      pie="Cada vuelta suma una hoja a tu planilla. Siete vueltas y tienes tu primer CRM y ERP, con su tablero."
    >
      <Ciclo nodos={[['La idea'], ['Ejemplo con', 'Grano Norte'], ['Tu', 'hoja'], ['Prueba', 'real']]} centro={['Tu', 'planilla']} />
    </Diagrama>
  );
}

/** Módulo 0 · Lección 2: cómo leer tu semáforo. */
export function DiagramaSemaforo({ className = '' }: { className?: string }) {
  const filas = [
    { c: 'bg-rose-500', t: 'Rojo', d: 'Depende de ti o de la memoria', h: 'Empieza por aquí' },
    { c: 'bg-orange-400', t: 'Naranja', d: 'A medias: se cae cuando hay harta pega', h: 'Anótalo y ordénalo' },
    { c: 'bg-emerald-500', t: 'Verde', d: 'Anotado y se repite solo', h: 'Afina y mide' },
  ];
  return (
    <Diagrama
      titulo="Cómo leer tu semáforo"
      className={className}
      aria="Cómo leer el semáforo del diagnóstico. Rojo: la pieza depende de ti o de la memoria; empieza por aquí. Naranja: está a medias y se cae cuando hay harta pega; anótalo y ordénalo. Verde: está anotado y se repite solo; afina y mide."
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

/** Módulo 0 · Lección 3: una sola planilla, una hoja por pieza, y el tablero que las lee. */
export function DiagramaPlanillaSistema({ className = '' }: { className?: string }) {
  const hojas = [
    { h: 'Clientes', u: 'Tu CRM: en qué va cada cliente', m: 'M1' },
    { h: 'Origen', u: 'Qué canal te trae clientes', m: 'M2' },
    { h: 'Pedidos', u: 'Qué se pidió, para cuándo y quién', m: 'M3' },
    { h: 'Atención', u: 'Cada caso, hasta cerrarlo', m: 'M4' },
    { h: 'Cobranza y Caja', u: 'Qué te deben y cuánta plata tienes', m: 'M5' },
  ];
  return (
    <Diagrama
      titulo="Una planilla, todo tu negocio"
      className={className}
      aria="La planilla del sistema: la ficha del negocio y la lista de precios (módulo 0) alimentan cinco hojas, Clientes (tu CRM), Origen, Pedidos, Atención, y Cobranza y Caja, una por módulo. El tablero del módulo 6 lee todas las hojas y calcula tus números del lunes."
      pie="CRM es la hoja Clientes. ERP es todo junto. Tú llenas filas; el tablero se calcula solo."
    >
      <div className="grid items-center gap-3 sm:grid-cols-[150px_auto_1fr_auto_120px]">
        <Nodo tono="claro" titulo="Ficha y precios" texto="Qué vendes, a quién y a qué precio · M0" className="text-center" />
        <Flecha />
        <div className="grid gap-1.5">
          {hojas.map((u) => (
            <motion.div key={u.h} variants={PIEZA} className="flex items-baseline gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
              <span className="w-[6.5rem] shrink-0 font-mono text-[11px] uppercase tracking-wider text-[#5fb2dd]">{u.h}</span>
              <span className="min-w-0 flex-1 text-[13px] leading-snug text-slate-200">{u.u}</span>
              <span className="shrink-0 font-mono text-[10px] text-slate-500">{u.m}</span>
            </motion.div>
          ))}
        </div>
        <Flecha />
        <Nodo tono="claro" titulo="Tablero" texto="Tus números del lunes · M6" className="text-center" />
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
      aria="Con las reglas de freno escritas, todo lo que no está en la lista lo resuelve tu equipo solo, como el precio de lista, el horario o cómo comprar. Lo que está en la lista pasa siempre por ti: precios fuera de lista, fechas de entrega, lo que no sabe y los reclamos."
      pie="Escribir los frenos no te quita control: te saca del resto."
    >
      <div className="grid gap-3 sm:grid-cols-[1fr_1fr]">
        <motion.div variants={PIEZA} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-slate-400">Lo resuelve tu equipo</p>
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
