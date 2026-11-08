'use client';

// Diagramas de los módulos 3 y 4 del curso v1.1 «El sistema de tu negocio» (8-nov-2026): la hoja Pedidos y la hoja
// Atención como piezas de tu primer ERP en Google Sheets. Mismas piezas base que el resto (./base): HTML + Tailwind
// que refluye a 360 px, figura accesible con aria-label, paleta azul noche, sin amarillo y sin <table>.
import { motion } from 'framer-motion';
import { Diagrama, Flecha, Flujo, Globo, Nodo, PIEZA } from './base';

type P = { className?: string };

/** Celdas de una fila de planilla, en tarjetas que se reacomodan a 360 px. */
function FilaPlanilla({ celdas }: { celdas: { k: string; v: string; marca?: boolean }[] }) {
  return (
    <motion.div variants={PIEZA} className="rounded-xl border border-[#5fb2dd]/50 bg-[#2175a1]/15 p-2.5">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5fb2dd]">Una fila de la hoja</p>
      <dl className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        {celdas.map((c) => (
          <div key={c.k} className={`min-w-0 rounded-md px-2 py-1 ${c.marca ? 'bg-[#5fb2dd] text-[#0f172a]' : 'bg-[#0f172a]/70 text-slate-100'}`}>
            <dt className={`text-[10px] uppercase tracking-wider ${c.marca ? 'text-[#0f172a]/70' : 'text-slate-400'}`}>{c.k}</dt>
            <dd className="truncate text-[13px]">{c.v}</dd>
          </div>
        ))}
      </dl>
    </motion.div>
  );
}

// ─── Módulo 3 · Pedidos y operación ───────────────────────────────────────

export function DiagramaMensajeAFila({ className = '' }: P) {
  return (
    <Diagrama
      titulo="Del mensaje a la fila"
      className={className}
      aria="Un pedido que llega por WhatsApp se convierte en una fila de la hoja Pedidos. Mensaje de Cowork Cerro Alegre: «Hola, ¿nos mandan 4 kilos de molido para el jueves?». La fila queda con fecha de hoy, cliente Cowork Cerro Alegre, producto café molido 1 kg, cantidad 4, fecha de entrega jueves, responsable Sofía y estado Por hacer. El precio y el total los calcula la planilla."
      pie="Lo anota quien recibe el mensaje, en el momento. Si no está en la hoja, el pedido no existe."
    >
      <div className="rounded-xl border border-white/10 bg-[#131c31] p-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">WhatsApp · 10:42</p>
        <div className="mt-2 space-y-1.5">
          <Globo de="cliente">Hola, ¿nos mandan 4 kilos de molido para el jueves? Como siempre.</Globo>
          <Globo de="persona">Anotado: 4 kg de molido para el jueves. Te lo lleva Sofía.</Globo>
        </div>
      </div>
      <Flecha vertical className="my-2" etiqueta="se anota" />
      <FilaPlanilla
        celdas={[
          { k: 'Fecha', v: 'Hoy' },
          { k: 'Cliente', v: 'Cowork Cerro Alegre' },
          { k: 'Producto', v: 'Café molido 1 kg' },
          { k: 'Cantidad', v: '4' },
          { k: 'Entrega', v: 'Jueves' },
          { k: 'Responsable', v: 'Sofía' },
          { k: 'Estado', v: 'Por hacer', marca: true },
          { k: 'Total', v: 'Lo calcula la hoja' },
        ]}
      />
    </Diagrama>
  );
}

export function DiagramaEstadosPedido({ className = '' }: P) {
  return (
    <Diagrama
      titulo="La columna Estado y la columna Atrasado"
      className={className}
      aria="Cada pedido avanza por la columna Estado: por hacer, en curso y entregado (o cancelado). Quien mueve el trabajo, cambia el estado. La columna Atrasado se calcula sola: dice «Sí» cuando la fecha de entrega ya pasó y el pedido no está entregado ni cancelado. Con un filtro ves solo lo que no está entregado, ordenado por fecha de entrega."
      pie="Regla: quien mueve el trabajo, cambia el estado. La columna Atrasado nadie la escribe: la calcula la planilla."
    >
      <Flujo
        pasos={[
          { titulo: 'Por hacer', texto: 'Llegó y está anotado' },
          { titulo: 'En curso', texto: 'Alguien ya lo está preparando', tono: 'acento' },
          { titulo: 'Entregado', texto: 'Checklist completo', tono: 'claro' },
        ]}
      />
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <Nodo tono="alerta" titulo="Atrasado = «Sí»" texto="La fecha de entrega ya pasó y no dice Entregado ni Cancelado." />
        <Nodo tono="neutro" titulo="El filtro de la mañana" texto="Estado distinto de Entregado, ordenado por fecha de entrega." />
      </div>
    </Diagrama>
  );
}

export function DiagramaResumenPlanilla({ className = '' }: P) {
  const preguntas = [
    { q: 'Qué llegó', d: 'Fecha = ayer u hoy', n: '1' },
    { q: 'Qué falta', d: 'Estado = Por hacer o En curso, con su responsable', n: '2' },
    { q: 'Qué vence', d: 'Entrega = hoy, o Atrasado = «Sí»', n: '3' },
  ];
  return (
    <Diagrama
      titulo="El resumen del día, leído en la hoja"
      className={className}
      aria="El resumen del día se lee en la hoja Pedidos en 5 minutos, con tres preguntas: qué llegó (pedidos con fecha de ayer u hoy), qué falta (estado por hacer o en curso, con su responsable) y qué vence (entrega hoy o atrasado). Después decides tú."
    >
      <div className="grid gap-2 sm:grid-cols-3">
        {preguntas.map((p) => (
          <Nodo key={p.q} numero={p.n} titulo={p.q} texto={p.d} tono="acento" />
        ))}
      </div>
      <Flecha vertical className="my-2" />
      <Nodo tono="claro" titulo="Tú, 5 minutos" texto="Lees, decides y avisas lo que cambia" className="text-center" />
    </Diagrama>
  );
}

// ─── Módulo 4 · Atención y postventa ──────────────────────────────────────

export function DiagramaTresTiposRespuesta({ className = '' }: P) {
  const tipos = [
    { t: 'Repetidos', d: 'Precio, horario, despacho, cómo pagar', q: 'Respuesta lista: la manda cualquiera del equipo', pct: '6 de 10', tono: 'acento' as const },
    { t: 'Con decisión', d: 'Descuento, fecha especial, reclamo', q: 'Una persona, y queda en la hoja Atención', pct: '3 de 10', tono: 'claro' as const },
    { t: 'Nuevos', d: 'Lo que nunca te habían preguntado', q: 'Una persona, y la respuesta se escribe', pct: '1 de 10', tono: 'neutro' as const },
  ];
  return (
    <Diagrama
      titulo="Los 3 tipos de mensaje y quién responde"
      className={className}
      aria="Tres tipos de mensaje. Repetidos (precio, horario, despacho, cómo pagar): se responden con una respuesta lista que puede mandar cualquiera del equipo; en Grano Norte son 6 de cada 10. Con decisión (descuento, fecha especial, reclamo): una persona, y el caso queda anotado en la hoja Atención; 3 de 10. Nuevos: una persona, y la respuesta se escribe para la próxima vez; 1 de 10."
    >
      <div className="grid gap-2 sm:grid-cols-3">
        {tipos.map((x) => (
          <motion.div key={x.t} variants={PIEZA} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-sm font-semibold text-white">{x.t}</p>
              <span className="font-mono text-[11px] text-[#5fb2dd]">{x.pct}</span>
            </div>
            <p className="mt-1 text-[13px] text-slate-300">{x.d}</p>
            <Nodo titulo={`→ ${x.q}`} tono={x.tono} className="mt-2" />
          </motion.div>
        ))}
      </div>
    </Diagrama>
  );
}

export function DiagramaRespuestaRapida({ className = '' }: P) {
  return (
    <Diagrama
      titulo="Escribes una vez, respondes siempre igual"
      className={className}
      aria="Las respuestas de siempre se escriben una vez, se guardan como respuestas rápidas en la app gratis de WhatsApp Business con un atajo, por ejemplo /horario, y cualquiera del equipo responde igual en segundos. Opcional: el mismo texto sirve como instrucciones para un asistente de IA o un chatbot."
      pie="Opcional: si algún día usas un asistente de IA o un chatbot, este mismo texto son sus instrucciones."
    >
      <Flujo
        pasos={[
          { titulo: 'La escribes una vez', texto: '3 frases, tu tono, una pregunta' },
          { titulo: 'Atajo en WhatsApp Business', texto: '«/horario», «/despacho»', tono: 'acento' },
          { titulo: 'Cualquiera responde igual', texto: 'En segundos, sin preguntarte', tono: 'claro' },
        ]}
      />
    </Diagrama>
  );
}

export function DiagramaDerivacionPersona({ className = '', horas = '2 horas hábiles' }: P & { horas?: string }) {
  return (
    <Diagrama
      titulo="Cuándo y cómo pasa a una persona"
      className={className}
      aria={`Flujo de derivación: llega un mensaje y lo lee quien atiende. Si toca una regla de freno (reclamo, precio especial, fecha, algo que no sabe), le avisa al cliente quién lo va a atender, avisa al responsable y anota el caso en la hoja Atención. El responsable responde en un máximo de ${horas}; si no, el aviso sube a una segunda persona.`}
      pie={`Si nadie responde en ${horas}, el aviso sube a una segunda persona. Ningún cliente queda esperando en silencio.`}
    >
      <Flujo
        pasos={[
          { titulo: 'Llega un mensaje', texto: 'Lo lee quien atiende' },
          { titulo: '¿Toca un freno?', texto: 'Reclamo, precio especial, fecha, lo que no sabe', tono: 'acento' },
          { titulo: 'Avisa y anota', texto: 'Al cliente, al responsable y en la hoja Atención' },
          { titulo: 'Responde una persona', texto: `En máximo ${horas}`, tono: 'claro' },
        ]}
      />
    </Diagrama>
  );
}

export function DiagramaPostventa({ className = '' }: P) {
  return (
    <Diagrama
      titulo="Después de la entrega"
      className={className}
      aria="La postventa en tres momentos. A los 2 o 3 días de la entrega, un mensaje corto para saber cómo les fue. Si te dan las gracias, ese es un buen momento para pedir un referido. Y cuando se cumple su ciclo de compra (la última compra más los días que suele demorar), le escribes para que vuelva a comprar. Cada mensaje queda anotado."
      pie="Son tus clientes: ya te conocen y te dieron su número, así que WhatsApp sí. Uno a uno y con su nombre, nunca un envío masivo."
    >
      <Flujo
        pasos={[
          { titulo: 'Día 2 o 3', texto: '«¿Cómo les fue con…?»' },
          { titulo: 'Si te dan las gracias', texto: 'Pides un referido', tono: 'acento' },
          { titulo: 'Se cumple su ciclo', texto: 'Le toca volver a comprar', tono: 'claro' },
        ]}
      />
    </Diagrama>
  );
}
