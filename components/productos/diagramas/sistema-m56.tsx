'use client';

// Diagramas de los módulos 5 y 6 del curso v1.1 «El sistema de tu negocio» (8-nov-2026): la caja, las 4 semanas,
// el tablero que lee las hojas, quién edita qué, las rutinas y cuándo una planilla ya no basta.
// Mismas piezas base que el resto (./base): HTML + Tailwind que refluye a 360 px, figura accesible, sin amarillo.
import { motion } from 'framer-motion';
import { Diagrama, Flecha, Nodo, PIEZA } from './base';

type P = { className?: string };

// ─── Módulo 5 ─────────────────────────────────────────────────────────────

/** Lección 2: lo que entra y lo que sale pasa por la hoja Caja y deja el saldo al día. */
export function DiagramaHojaCaja({ className = '' }: P) {
  return (
    <Diagrama
      titulo="La hoja Caja"
      className={className}
      aria="La hoja Caja recibe lo que entra (pagos de facturas desde Cobranza y ventas al contado) y lo que sale (insumos, sueldos, arriendo, impuestos, despacho). Cada fila suma o resta, y la última columna muestra el saldo al día."
      pie="Una fila por movimiento. La primera es el saldo de tu cuenta el día que empiezas; desde ahí, el saldo se calcula solo."
    >
      <div className="grid items-center gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
        <Nodo titulo="Entra" texto="Facturas pagadas (Cobranza) y ventas al contado" tono="ok" />
        <Flecha />
        <Nodo titulo="Hoja Caja" texto="Fecha · concepto · categoría · entra · sale" tono="acento" />
        <Flecha />
        <Nodo titulo="Saldo al día" texto="Lo que tienes hoy, sin abrir el banco" tono="claro" />
      </div>
      <motion.div variants={PIEZA} className="mt-2 sm:w-1/3">
        <Nodo titulo="Sale" texto="Insumos, sueldos, arriendo, impuestos, despacho" tono="alerta" />
      </motion.div>
    </Diagrama>
  );
}

/** Lección 3: el saldo semana a semana muestra el hoyo antes de caer en él. */
export function DiagramaCuatroSemanas({ className = '' }: P) {
  const semanas = [
    { s: 'Hoy', v: 437, t: '$437 mil' },
    { s: 'Sem. 1', v: 500, t: '$500 mil' },
    { s: 'Sem. 2', v: 220, t: '$220 mil' },
    { s: 'Sem. 3', v: -20, t: '−$20 mil' },
    { s: 'Sem. 4', v: -4, t: '−$4 mil' },
  ];
  const max = 500;
  return (
    <Diagrama
      titulo="Tu caja de las próximas 4 semanas"
      className={className}
      aria="Ejemplo de Grano Norte: hoy tiene 437 mil pesos; la semana 1 sube a 500 mil, la semana 2 baja a 220 mil por la compra de café verde y la semana 3 queda en menos 20 mil por el arriendo. Ese es el hoyo: se ve con dos semanas de anticipación."
      pie="Lo que vas a cobrar menos lo que tienes que pagar, semana por semana. Si una semana queda bajo cero, tienes tiempo para cobrar antes, mover un pago o comprar menos."
    >
      <div className="grid grid-cols-5 items-end gap-2" style={{ height: 150 }}>
        {semanas.map((x) => {
          const alto = Math.max(6, (Math.abs(x.v) / max) * 110);
          const neg = x.v < 0;
          return (
            <motion.div key={x.s} variants={PIEZA} className="flex h-full flex-col items-center justify-end gap-1">
              <span className={`font-mono text-[10px] leading-none sm:text-[11px] ${neg ? 'text-rose-300' : 'text-slate-300'}`}>{x.t}</span>
              <span className={`w-full max-w-[52px] rounded-t-md ${neg ? 'bg-rose-500/80' : x.s === 'Hoy' ? 'bg-[#5fb2dd]' : 'bg-[#2175a1]'}`} style={{ height: alto }} />
              <span className="font-mono text-[10px] text-slate-400 sm:text-[11px]">{x.s}</span>
            </motion.div>
          );
        })}
      </div>
    </Diagrama>
  );
}

// ─── Módulo 6 ─────────────────────────────────────────────────────────────

const HOJAS_TABLERO = [
  { h: 'Clientes', n: 'Clientes activos, propuestas abiertas, próximos pasos de hoy' },
  { h: 'Origen', n: 'El canal que más clientes te trae' },
  { h: 'Pedidos', n: 'Ventas del mes, por entregar, atrasados' },
  { h: 'Atención', n: 'Casos y reclamos abiertos' },
  { h: 'Cobranza', n: 'Por cobrar, vencido, próximas 4 semanas' },
  { h: 'Caja · Productos', n: 'Caja hoy y margen promedio' },
];

/** Lección 1 y 2: cada hoja alimenta una parte del tablero. */
export function DiagramaTableroLee({ className = '' }: P) {
  return (
    <Diagrama
      titulo="El tablero lee tus hojas"
      className={className}
      aria="Seis grupos de hojas alimentan el tablero: Clientes da clientes activos, propuestas abiertas y próximos pasos; Origen, el canal que más trae; Pedidos, ventas del mes, por entregar y atrasados; Atención, casos y reclamos abiertos; Cobranza, por cobrar, vencido y lo de las próximas 4 semanas; Caja y Productos, la caja de hoy y el margen promedio. Nadie escribe en el tablero."
      pie="Nadie escribe en el tablero: se calcula solo. Si un número no te calza, la hoja que lo alimenta está sin actualizar."
    >
      <div className="grid gap-2 sm:grid-cols-[1fr_auto_220px] sm:items-center">
        <ul className="grid gap-1.5 sm:grid-cols-2">
          {HOJAS_TABLERO.map((x) => (
            <motion.li key={x.h} variants={PIEZA} className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5">
              <p className="text-sm font-semibold text-white">{x.h}</p>
              <p className="text-[12px] leading-snug text-slate-300">{x.n}</p>
            </motion.li>
          ))}
        </ul>
        <Flecha />
        <Nodo titulo="Tablero" texto="Tus números del lunes, en una hoja. 10 minutos con tu equipo." tono="claro" />
      </div>
    </Diagrama>
  );
}

/** Lección 3: quién edita, quién mira y qué queda protegido. */
export function DiagramaQuienEdita({ className = '' }: P) {
  return (
    <Diagrama
      titulo="Quién edita qué"
      className={className}
      aria="Tres niveles de acceso en Google Sheets: editores, que actualizan su hoja (ventas en Clientes, quien recibe pedidos en Pedidos); lectores, que solo miran el tablero; y hojas protegidas, como Productos con los precios, que cambia solo una persona."
    >
      <div className="grid gap-2 sm:grid-cols-3">
        <Nodo numero="Editor" titulo="Actualiza su hoja" texto="Quien vende, en Clientes. Quien recibe pedidos, en Pedidos. Quien cobra, en Cobranza." tono="acento" />
        <Nodo numero="Lector" titulo="Solo mira" texto="El contador, un socio o quien solo necesita ver el tablero." tono="neutro" />
        <Nodo numero="Protegida" titulo="La cambia una persona" texto="Productos (los precios) y el Tablero. Es tu regla de freno, escrita en la planilla." tono="claro" />
      </div>
    </Diagrama>
  );
}

/** Lección 4: las rutinas del sistema. */
export function DiagramaRutinasSistema({ className = '' }: P) {
  const r = [
    { c: 'Cada día · 20 min', t: 'Clientes y Pedidos', d: 'A quién le toca hoy, qué llegó, qué falta y qué vence.' },
    { c: 'Lunes · 10 min', t: 'Tablero', d: 'Con tu equipo: qué se arregla esta semana.' },
    { c: 'Viernes · 15 min', t: 'Revisión', d: 'Casos abiertos, pagos y movimientos de caja al día.' },
    { c: 'Fin de mes', t: 'Productos y Caja', d: 'Precios, costos y el mes comparado.' },
  ];
  return (
    <Diagrama
      titulo="Las rutinas de tu sistema"
      className={className}
      aria="Cuatro rutinas: cada día, 20 minutos con Clientes y Pedidos; los lunes, 10 minutos con el tablero y el equipo; los viernes, 15 minutos de revisión de casos, pagos y caja; y a fin de mes, precios, costos y el mes comparado."
      pie="Una planilla vale lo que valen sus rutinas: si nadie la abre, deja de decir la verdad."
    >
      <div className="grid gap-2 sm:grid-cols-4">
        {r.map((x, i) => (
          <Nodo key={x.c} numero={x.c} titulo={x.t} texto={x.d} tono={i === 0 ? 'acento' : 'neutro'} />
        ))}
      </div>
    </Diagrama>
  );
}

/** Lección 5: planilla o software. */
export function DiagramaPlanillaOSoftware({ className = '' }: P) {
  return (
    <Diagrama
      titulo="Planilla o software"
      className={className}
      aria="Comparación. La planilla basta cuando hay pocas personas editando, decenas de pedidos al mes y el dueño revisa todo. Conviene evaluar un software cuando varias personas editan al mismo tiempo, hay cientos de pedidos al mes, necesitas conectar la facturación o el inventario, o la planilla se pone lenta y se rompen fórmulas."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <motion.div variants={PIEZA} className="rounded-xl border border-[#5fb2dd]/50 bg-[#2175a1]/15 p-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-[#5fb2dd]">La planilla basta</p>
          <ul className="mt-2 space-y-1.5 text-[13px] leading-snug text-slate-200">
            <li>· 1 a 5 personas la actualizan</li>
            <li>· Decenas de pedidos al mes</li>
            <li>· Tú revisas el tablero cada lunes</li>
            <li>· Todavía estás afinando cómo trabajas</li>
          </ul>
        </motion.div>
        <motion.div variants={PIEZA} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-slate-400">Conviene mirar un software</p>
          <ul className="mt-2 space-y-1.5 text-[13px] leading-snug text-slate-200">
            <li>· Varias personas editan a la vez y se pisan</li>
            <li>· Cientos de pedidos al mes</li>
            <li>· Necesitas conectar facturación o inventario</li>
            <li>· La planilla se pone lenta o se rompen fórmulas</li>
          </ul>
        </motion.div>
      </div>
    </Diagrama>
  );
}
