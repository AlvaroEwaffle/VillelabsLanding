'use client';

// Diagramas de los módulos 1–6 del curso (8-nov-2026; v1.1: se quitaron los del enfoque anterior, los nuevos viven en sistema-m12/m34/m56.tsx). Mismas piezas base que el resto (./base):
// HTML + Tailwind que refluye a 360 px, figura accesible con aria-label, paleta azul noche, sin amarillo.
import { motion } from 'framer-motion';
import { Comparacion, Diagrama, Flecha, Flujo, Globo, Nodo, PIEZA } from './base';

type P = { className?: string };

// ─── Módulo 2 · Marketing y origen (era el módulo 1) ─────────────────────

export function DiagramaFrase({ className = '' }: P) {
  return (
    <Diagrama
      titulo="Las 3 piezas de tu frase"
      className={className}
      aria="Tu mensaje en una frase se arma con tres piezas: para quién, el problema que tiene y el resultado que logra contigo. Ejemplo de Grano Norte: cafeterías de la región que quieren café fresco cada semana, sin quedarse nunca sin stock."
      pie="Habla de tu cliente, no de ti: «tostamos café de especialidad» describe lo que haces; la frase describe lo que cambia para él."
    >
      <div className="grid gap-1.5 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
        <Nodo numero="1" titulo="Para quién" texto="Cafeterías de la región" tono="acento" />
        <motion.span variants={PIEZA} className="text-center font-serif text-xl text-[#5fb2dd] sm:self-center">+</motion.span>
        <Nodo numero="2" titulo="Su problema" texto="Se quedan sin café o les llega añejo" tono="acento" />
        <motion.span variants={PIEZA} className="text-center font-serif text-xl text-[#5fb2dd] sm:self-center">+</motion.span>
        <Nodo numero="3" titulo="El resultado" texto="Café fresco cada semana, sin quiebres de stock" tono="acento" />
      </div>
      <Flecha vertical className="my-2" />
      <Nodo tono="claro" titulo="«Café fresco cada semana para cafeterías de la región, sin quedarte nunca sin stock.»" className="text-center" />
    </Diagrama>
  );
}

export function DiagramaTresTemas({ className = '' }: P) {
  const temas = [
    { t: 'Lo que quiere aprender', e: 'Cómo elegir café para tu cafetería' },
    { t: 'Lo que te diferencia', e: 'Tostado fresco vs. café de supermercado' },
    { t: 'La prueba', e: 'Cafeterías que se cambiaron y qué notaron' },
  ];
  return (
    <Diagrama
      titulo="Tres temas sostienen todo tu contenido"
      className={className}
      aria="Tres temas sostienen todo tu contenido: lo que tu cliente quiere aprender, lo que te diferencia y la prueba de que funciona. En Grano Norte: cómo elegir café para tu cafetería; tostado fresco versus café de supermercado; cafeterías que se cambiaron. De cada tema salen tres ideas: nueve publicaciones."
      pie="3 temas × 3 ideas = 9 publicaciones antes de empezar."
    >
      <Nodo tono="claro" titulo="Tu frase" texto="Lo que resuelves, para quién y el resultado" className="text-center" />
      <div className="mt-2 grid gap-2 sm:grid-cols-3">
        {temas.map((x, i) => (
          <motion.div key={x.t} variants={PIEZA} className="flex flex-col rounded-xl border border-[#5fb2dd]/40 bg-[#2175a1]/15 p-3">
            <span className="font-mono text-[11px] text-[#5fb2dd]">Tema {i + 1}</span>
            <p className="text-sm font-semibold text-white">{x.t}</p>
            <p className="mt-2 border-t border-white/10 pt-2 text-[13px] text-slate-300">{x.e}</p>
          </motion.div>
        ))}
      </div>
    </Diagrama>
  );
}

export function DiagramaUnaIdeaCincoPiezas({ className = '' }: P) {
  const piezas = [
    { d: 'Lun', p: 'Post' },
    { d: 'Mar', p: 'Historia' },
    { d: 'Mié', p: 'Carrusel' },
    { d: 'Jue', p: 'Reel con guion' },
    { d: 'Vie', p: 'Correo' },
  ];
  return (
    <Diagrama
      titulo="Una idea, cinco piezas, una semana"
      className={className}
      aria="Una idea de tus temas se convierte en cinco piezas repartidas en la semana: lunes un post, martes una historia, miércoles un carrusel, jueves un reel con guion y viernes un correo. Un asistente prepara los borradores y una persona revisa antes de publicar."
      pie="El asistente prepara los borradores; una persona los revisa antes de publicar."
    >
      <div className="grid items-center gap-2 sm:grid-cols-[170px_auto_1fr]">
        <Nodo tono="claro" titulo="1 idea" texto="«Cómo saber si tu café está fresco»" className="text-center" />
        <Flecha />
        <div className="grid grid-cols-5 gap-1.5">
          {piezas.map((x) => (
            <motion.div key={x.d} variants={PIEZA} className="flex min-h-[72px] flex-col items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] p-1.5 text-center">
              <span className="font-mono text-[10px] uppercase text-[#5fb2dd]">{x.d}</span>
              <span className="mt-1 text-[12px] leading-tight text-white">{x.p}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Diagrama>
  );
}

export function DiagramaDerivarComentario({ className = '' }: P) {
  const ramas = [
    { q: '¿Pregunta que se repite?', a: 'Respondes con tu plantilla', tono: 'neutro' as const },
    { q: '¿Quiere comprar o cotizar?', a: 'Pasa a ventas el mismo día, por interno', tono: 'acento' as const },
    { q: '¿Reclamo o molestia?', a: 'Lo ve una persona, siempre', tono: 'claro' as const },
  ];
  return (
    <Diagrama
      titulo="Qué hacer con cada comentario"
      className={className}
      aria="Árbol de decisión para comentarios y mensajes. Si es una pregunta que se repite, respondes con tu plantilla. Si quiere comprar o cotizar, pasa a ventas el mismo día, por interno. Si es un reclamo o una molestia, lo ve una persona, siempre."
    >
      <Nodo titulo="Llega un comentario o mensaje" tono="neutro" className="text-center" />
      <Flecha vertical className="my-1.5" />
      <div className="grid gap-2 sm:grid-cols-3">
        {ramas.map((r) => (
          <motion.div key={r.q} variants={PIEZA} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <p className="text-sm text-slate-200">{r.q}</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-[#5fb2dd]">Sí →</p>
            <Nodo titulo={r.a} tono={r.tono} className="mt-1" />
          </motion.div>
        ))}
      </div>
    </Diagrama>
  );
}

// ─── Módulo 1 · Clientes y ventas (era el módulo 2) ──────────────────────

export function DiagramaSecuenciaSeguimiento({ className = '', dias = [0, 3, 7, 14], etiquetas = ['Primer mensaje', 'Pregunta corta', 'Un dato que le sirva', 'Cierre amable'] }: P & { dias?: number[]; etiquetas?: string[] }) {
  return (
    <Diagrama
      titulo="La secuencia de seguimiento"
      className={className}
      aria={`Secuencia de seguimiento: ${dias.map((d, i) => `día ${d}, ${etiquetas[i]}`).join('; ')}. Si responde en cualquier punto, la secuencia se detiene y sigue la conversación.`}
      pie="Si responde en cualquier punto, la secuencia se detiene y sigue la conversación."
    >
      <ol className="relative grid gap-3 sm:grid-cols-4">
        <span aria-hidden="true" className="absolute bottom-4 left-[19px] top-4 w-0.5 bg-[#2175a1] sm:bottom-auto sm:left-8 sm:right-8 sm:top-[19px] sm:h-0.5 sm:w-auto" />
        {dias.map((d, i) => (
          <motion.li key={d} variants={PIEZA} className="relative flex items-center gap-3 sm:flex-col sm:text-center">
            <span className={`z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#0f172a] font-mono text-xs ${i === 0 ? 'bg-[#5fb2dd] text-[#0f172a]' : 'bg-[#24314d] text-white'}`}>
              {d === 0 ? 'Hoy' : `D${d}`}
            </span>
            <span className="text-sm leading-tight text-white">{etiquetas[i]}</span>
          </motion.li>
        ))}
      </ol>
    </Diagrama>
  );
}

export function DiagramaPropuestaUnaPagina({ className = '' }: P) {
  const preguntas = ['¿Qué problema tienes hoy?', '¿Cuánto te cuesta?', '¿Qué has probado?', '¿Quién más decide?', '¿Para cuándo lo necesitas?'];
  const bloques = ['El problema, con sus palabras', 'Qué incluye', 'Precio (lo decides tú)', 'Plazo', 'Siguiente paso con fecha'];
  return (
    <Diagrama
      titulo="De 5 preguntas a 1 página"
      className={className}
      aria="Las cinco preguntas de la primera reunión (qué problema tienes hoy, cuánto te cuesta, qué has probado, quién más decide y para cuándo lo necesitas) se convierten en una propuesta de una página con cinco bloques: el problema con sus palabras, qué incluye, el precio, el plazo y el siguiente paso con fecha."
    >
      <div className="grid items-center gap-2 sm:grid-cols-[1fr_auto_1fr]">
        <div className="space-y-1.5">
          {preguntas.map((q, i) => (
            <motion.p key={q} variants={PIEZA} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-[13px] text-slate-200">
              <span className="mr-2 font-mono text-[11px] text-[#5fb2dd]">{i + 1}</span>
              {q}
            </motion.p>
          ))}
        </div>
        <Flecha />
        <motion.div variants={PIEZA} className="rounded-xl border border-[#5fb2dd] bg-[#f8fafc] p-3 text-[#0f172a]">
          <p className="font-mono text-[10px] uppercase tracking-wider text-[#1d5f85]">Propuesta · 1 página</p>
          <ul className="mt-2 space-y-1.5">
            {bloques.map((b) => (
              <li key={b} className="rounded bg-[#e2e8f0] px-2 py-1 text-[13px]">
                {b}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Diagrama>
  );
}

export function DiagramaEmbudo({ className = '', pisos }: P & { pisos: { t: string; n: number }[] }) {
  const max = Math.max(1, pisos[0]?.n ?? 1);
  return (
    <Diagrama
      titulo="Tu embudo y sus tasas de paso"
      className={className}
      aria={`Embudo de ventas: ${pisos.map((p) => `${p.n} ${p.t.toLowerCase()}`).join(', ')}. Entre cada piso hay una tasa de paso.`}
    >
      <div className="flex flex-col items-center gap-1">
        {pisos.map((p, i) => {
          const ancho = 38 + 62 * (p.n / max);
          const tasa = i > 0 && pisos[i - 1].n > 0 ? Math.round((p.n / pisos[i - 1].n) * 100) : null;
          return (
            <div key={p.t} className="contents">
              {tasa !== null ? (
                <motion.span variants={PIEZA} className="font-mono text-[11px] text-[#5fb2dd]">
                  ↓ {tasa} %
                </motion.span>
              ) : null}
              <motion.div variants={PIEZA} style={{ width: `${ancho}%` }} className="flex min-w-[200px] items-center justify-between rounded-lg border border-[#5fb2dd]/50 bg-[#2175a1]/25 px-3 py-2">
                <span className="text-sm text-white">{p.t}</span>
                <span className="font-mono text-sm text-[#5fb2dd]">{p.n}</span>
              </motion.div>
            </div>
          );
        })}
      </div>
    </Diagrama>
  );
}

// ─── Módulo 3 · Pedidos y operación ──────────────────────────────────────

export function DiagramaProcesoPasos({ className = '' }: P) {
  const pasos = [
    { t: 'Recibir', q: 'Sofía' },
    { t: 'Confirmar stock', q: 'Sofía' },
    { t: 'Tostar', q: 'Pedro' },
    { t: 'Envasar y etiquetar', q: 'Pedro' },
    { t: 'Despachar', q: 'Matías' },
    { t: 'Avisar al cliente', q: 'Matías' },
  ];
  return (
    <Diagrama
      titulo="Un proceso en 7 pasos o menos"
      className={className}
      aria="Proceso de pedido de oficina de Grano Norte en seis pasos, cada uno con su responsable: recibir (Sofía), confirmar stock (Sofía), tostar (Pedro), envasar y etiquetar (Pedro), despachar (Matías) y avisar al cliente (Matías)."
      pie="Cada paso empieza con un verbo y tiene un responsable. Si tiene más de 7 pasos, divídelo en dos procesos."
    >
      <ol className="grid grid-cols-2 gap-2 sm:grid-cols-6">
        {pasos.map((p, i) => (
          <motion.li key={p.t} variants={PIEZA} className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5">
            <span className="font-mono text-[11px] text-[#5fb2dd]">{i + 1}</span>
            <p className="text-[13px] font-semibold leading-tight text-white">{p.t}</p>
            <p className="mt-1 text-[12px] text-slate-400">{p.q}</p>
          </motion.li>
        ))}
      </ol>
    </Diagrama>
  );
}

export function DiagramaChecklistEntrega({ className = '' }: P) {
  return (
    <Diagrama
      titulo="Entregado = checklist completo"
      className={className}
      aria="Comparación. Sin checklist, entregado significa que salió de la bodega y los olvidos aparecen cuando reclama el cliente. Con checklist, entregado significa que todos los puntos están marcados por quien entrega, y tú lo sabes sin preguntar."
    >
      <Comparacion
        izq={{ titulo: 'Sin checklist', children: <p className="text-[13px] text-slate-300">«Entregado» = salió de la bodega. El olvido aparece cuando reclama el cliente.</p> }}
        der={{ titulo: 'Con checklist', children: <p className="text-[13px] text-slate-200">«Entregado» = todos los puntos marcados por quien entrega. Lo sabes sin preguntar.</p> }}
      />
    </Diagrama>
  );
}

// ─── Módulo 4 · Atención y postventa ─────────────────────────────────────

export function DiagramaTresTipos({ className = '' }: P) {
  const tipos = [
    { t: 'Repetidos', d: 'Precio, horario, despacho, cómo pagar', q: 'Asistente con tus respuestas', pct: '6 de 10', tono: 'acento' as const },
    { t: 'Con decisión', d: 'Descuento, fecha especial, reclamo', q: 'Una persona', pct: '3 de 10', tono: 'claro' as const },
    { t: 'Nuevos', d: 'Lo que nunca te habían preguntado', q: 'Una persona, y se escribe la respuesta', pct: '1 de 10', tono: 'neutro' as const },
  ];
  return (
    <Diagrama
      titulo="Los 3 tipos de mensaje y quién responde"
      className={className}
      aria="Tres tipos de mensaje. Repetidos (precio, horario, despacho, cómo pagar): los responde un asistente con tus respuestas; en Grano Norte son 6 de cada 10. Con decisión (descuento, fecha especial, reclamo): una persona; 3 de 10. Nuevos: una persona, y la respuesta se escribe para la próxima vez; 1 de 10."
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

export function DiagramaDerivacion({ className = '', horas = '2 horas hábiles' }: P & { horas?: string }) {
  return (
    <Diagrama
      titulo="Cuándo y cómo pasa a una persona"
      className={className}
      aria={`Flujo de derivación: llega un mensaje y lo lee el asistente. Si toca una regla de freno, el asistente avisa al cliente que lo atenderá una persona, avisa al equipo y marca la conversación. Una persona responde en un máximo de ${horas}; si no, el aviso sube a una segunda persona.`}
    >
      <Flujo
        pasos={[
          { titulo: 'Llega un mensaje', texto: 'Lo lee el asistente' },
          { titulo: '¿Toca un freno?', texto: 'Reclamo, precio especial, fecha, lo que no sabe', tono: 'acento' },
          { titulo: 'Avisa y marca', texto: 'Al cliente y al equipo' },
          { titulo: 'Responde una persona', texto: `En máximo ${horas}`, tono: 'claro' },
        ]}
      />
      <motion.p variants={PIEZA} className="mt-3 rounded-lg border border-dashed border-white/15 px-3 py-2 text-center text-[13px] text-slate-300">
        Si pasa el tiempo máximo, el aviso sube a una segunda persona.
      </motion.p>
    </Diagrama>
  );
}

export function DiagramaCasoReclamo({ className = '' }: P) {
  return (
    <Diagrama
      titulo="Un reclamo, de principio a fin"
      className={className}
      aria="Cada reclamo pasa por cuatro pasos: acuse el mismo día, una solución concreta, un seguimiento para confirmar que se resolvió y el cierre del caso."
      pie="Si un caso lleva más de 2 días abierto, se revisa en la reunión del equipo."
    >
      <Flujo
        pasos={[
          { titulo: '1 · Acuse', texto: 'El mismo día' },
          { titulo: '2 · Solución', texto: 'Concreta y con fecha', tono: 'acento' },
          { titulo: '3 · Seguimiento', texto: '¿Se resolvió?' },
          { titulo: '4 · Cierre', texto: 'Caso cerrado y anotado', tono: 'claro' },
        ]}
      />
    </Diagrama>
  );
}

// ─── Módulo 5 · Cobranza y caja ──────────────────────────────────────────

export function DiagramaCobranza({ className = '' }: P) {
  const hitos = [
    { d: '−3 días', t: 'Recordatorio amable' },
    { d: 'Vence', t: 'Aviso del día' },
    { d: '+5 días', t: 'Factura vencida' },
    { d: '+10 días', t: 'Llamas tú' },
  ];
  return (
    <Diagrama
      titulo="La cobranza con fechas fijas"
      className={className}
      aria="Línea de tiempo de cobranza: tres días antes del vencimiento, un recordatorio amable; el día del vencimiento, un aviso; cinco días después, un mensaje de factura vencida; y a los diez días, llama una persona."
      pie="Los mensajes se preparan en borrador; el llamado y cualquier acuerdo de pago los hace una persona."
    >
      <ol className="relative grid gap-3 sm:grid-cols-4">
        <span aria-hidden="true" className="absolute bottom-4 left-[19px] top-4 w-0.5 bg-gradient-to-b from-[#5fb2dd] to-[#2175a1] sm:bottom-auto sm:left-8 sm:right-8 sm:top-[19px] sm:h-0.5 sm:w-auto sm:bg-gradient-to-r" />
        {hitos.map((h, i) => (
          <motion.li key={h.d} variants={PIEZA} className="relative flex items-center gap-3 sm:flex-col sm:text-center">
            <span className={`z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#0f172a] text-center font-mono text-[10px] leading-none ${i === 3 ? 'bg-[#5fb2dd] text-[#0f172a]' : 'bg-[#24314d] text-white'}`}>
              {h.d.replace(' días', 'd')}
            </span>
            <span className="text-sm leading-tight text-white">
              <span className="block font-mono text-[11px] text-[#5fb2dd] sm:hidden">{h.d}</span>
              {h.t}
            </span>
          </motion.li>
        ))}
      </ol>
    </Diagrama>
  );
}

export function DiagramaMargen({ className = '' }: P) {
  return (
    <Diagrama
      titulo="Qué es el margen"
      className={className}
      aria="El precio de venta se divide en costos directos (insumos, envase, despacho y comisiones) y margen, que es lo que te queda para pagar arriendo, sueldos y ganar."
    >
      <motion.div variants={PIEZA} className="flex h-12 overflow-hidden rounded-xl border border-white/10 text-[12px] sm:text-sm">
        <span className="flex w-[30%] items-center justify-center bg-[#24314d] text-slate-100">Insumos</span>
        <span className="flex w-[10%] items-center justify-center bg-[#1f2a44] text-slate-200">Env.</span>
        <span className="flex w-[15%] items-center justify-center bg-[#24314d] text-slate-100">Desp.</span>
        <span className="flex w-[5%] items-center justify-center bg-[#1f2a44] text-slate-300" title="Comisiones">%</span>
        <span className="flex flex-1 items-center justify-center bg-[#5fb2dd] font-semibold text-[#0f172a]">Margen</span>
      </motion.div>
      <motion.div variants={PIEZA} className="mt-2 flex justify-between font-mono text-[11px] text-slate-400">
        <span>← costos directos</span>
        <span>lo que te queda →</span>
      </motion.div>
      <motion.p variants={PIEZA} className="mt-3 text-center text-sm text-white">
        Margen % = (precio − costos directos) ÷ precio
      </motion.p>
    </Diagrama>
  );
}

// ─── Compartidos ─────────────────────────────────────────────────────────

/** Conversación corta de ejemplo (para lecciones de atención). */
export function DiagramaConversacion({ className = '', titulo, aria, mensajes }: P & { titulo: string; aria: string; mensajes: { de: 'cliente' | 'agente' | 'persona'; texto: string }[] }) {
  return (
    <Diagrama titulo={titulo} aria={aria} className={className}>
      <div className="space-y-2">
        {mensajes.map((m, i) => (
          <Globo key={i} de={m.de}>
            {m.texto}
          </Globo>
        ))}
      </div>
    </Diagrama>
  );
}
