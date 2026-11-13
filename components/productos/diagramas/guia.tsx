'use client';

// Diagramas nuevos de /guia/prospeccion (8-nov-2026): se suman a las 8 infografías de guia/v2/infografias.tsx.
import { motion } from 'framer-motion';
import { Ciclo, Comparacion, Diagrama, Flecha, Flujo, Nodo, PIEZA } from './base';

/** Parte 0: el recorrido de la guía. */
export function MapaGuia() {
  const partes = ['Tu cliente ideal', 'Fuentes tibias', 'Tu tanda de 20', 'El primer mensaje', 'Seguimientos', 'Tu rutina'];
  return (
    <Diagrama
      titulo="El camino de la guía"
      aria="Mapa de la guía en seis partes: tu cliente ideal, fuentes tibias, tu tanda de 20, el primer mensaje, seguimientos y tu rutina. Al final tienes un sistema de ventas que corre cada semana."
      className="mt-8"
    >
      <ol className="relative grid gap-2 sm:grid-cols-6">
        <span aria-hidden="true" className="absolute bottom-4 left-[15px] top-4 w-0.5 bg-gradient-to-b from-[#5fb2dd] to-[#2175a1] sm:bottom-auto sm:left-6 sm:right-6 sm:top-[15px] sm:h-0.5 sm:w-auto sm:bg-gradient-to-r" />
        {partes.map((p, i) => (
          <motion.li key={p} variants={PIEZA} className="relative flex items-center gap-3 sm:flex-col sm:text-center">
            <span className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#0f172a] bg-[#5fb2dd] font-serif text-sm text-[#0f172a]">{i + 1}</span>
            <span className="text-sm leading-tight text-white">{p}</span>
          </motion.li>
        ))}
      </ol>
      <motion.div variants={PIEZA} className="mt-4 rounded-xl border border-[#5fb2dd]/50 bg-[#2175a1]/20 p-3 text-center text-sm text-white">
        = Un sistema de ventas que corre solo cada semana, con 20 minutos al día
      </motion.div>
    </Diagrama>
  );
}

/** Parte 1: matriz encaje × señal. */
export function MatrizEncajeSenal() {
  const celdas = [
    { t: 'Escríbele esta semana', d: 'Es tu cliente y te necesita ahora', tono: 'claro' as const },
    { t: 'Anótalo para después', d: 'Es tu cliente, pero hoy no hay señal', tono: 'acento' as const },
    { t: 'Pregunta antes', d: 'Hay señal, pero no sabes si encaja', tono: 'neutro' as const },
    { t: 'No es tu cliente', d: 'Bórralo sin culpa', tono: 'neutro' as const },
  ];
  return (
    <Diagrama
      titulo="A quién le escribes primero"
      aria="Matriz de dos por dos. Si encaja con tu cliente ideal y hay una señal de que te necesita ahora, escríbele esta semana. Si encaja pero no hay señal, anótalo para después. Si hay señal pero no sabes si encaja, pregunta antes. Si no encaja ni hay señal, no es tu cliente."
      pie="Grano Norte: una cafetería que abrió hace dos semanas en Cerro Alegre cae arriba a la izquierda."
    >
      <div className="grid grid-cols-[auto_1fr_1fr] gap-2">
        <span />
        <motion.p variants={PIEZA} className="text-center font-mono text-[11px] uppercase tracking-wider text-[#5fb2dd]">Hay señal</motion.p>
        <motion.p variants={PIEZA} className="text-center font-mono text-[11px] uppercase tracking-wider text-slate-400">Sin señal</motion.p>
        <motion.p variants={PIEZA} className="flex items-center font-mono text-[11px] uppercase tracking-wider text-[#5fb2dd] [writing-mode:vertical-rl] rotate-180">Encaja</motion.p>
        <Nodo titulo={celdas[0].t} texto={celdas[0].d} tono={celdas[0].tono} />
        <Nodo titulo={celdas[1].t} texto={celdas[1].d} tono={celdas[1].tono} />
        <motion.p variants={PIEZA} className="flex items-center font-mono text-[11px] uppercase tracking-wider text-slate-400 [writing-mode:vertical-rl] rotate-180">No encaja</motion.p>
        <Nodo titulo={celdas[2].t} texto={celdas[2].d} tono={celdas[2].tono} />
        <Nodo titulo={celdas[3].t} texto={celdas[3].d} tono={celdas[3].tono} className="opacity-70" />
      </div>
    </Diagrama>
  );
}

/** Parte 2: cómo un cliente feliz se vuelve tu mejor fuente. */
export function CadenaReferido() {
  return (
    <Diagrama
      titulo="Por qué partir por tus clientes"
      aria="Cadena del referido: un cliente contento te presenta a otro negocio; ese posible cliente llega tibio porque ya sabe quién eres, y por eso suele responder más que un desconocido."
    >
      <Flujo
        pasos={[
          { titulo: 'Un cliente contento', texto: 'Una cafetería que ya te compra' },
          { titulo: 'Te presenta', texto: '«Un amigo abrió un local, háblale»', tono: 'acento' },
          { titulo: 'Llega tibio', texto: 'Ya sabe quién eres y qué vendes' },
          { titulo: 'Responde', texto: 'Suele contestar más que un desconocido', tono: 'claro' },
        ]}
      />
    </Diagrama>
  );
}

/** Parte 3: el puntaje decide el orden de los seguimientos. */
export function OrdenPorPuntaje() {
  const filas = [
    { rango: '8–9', t: 'Primero', d: 'Seguimiento cuidado y personal', ancho: '100%', color: '#5fb2dd' },
    { rango: '5–7', t: 'Después', d: 'Seguimiento con un dato útil', ancho: '72%', color: '#2175a1' },
    { rango: '3–4', t: 'Al final', d: 'Recibió su mensaje; seguimiento corto', ancho: '44%', color: '#334a6b' },
  ];
  return (
    <Diagrama
      titulo="El puntaje ordena, no descarta"
      aria="El puntaje ordena los seguimientos: de 8 a 9 puntos van primero con un seguimiento cuidado; de 5 a 7 después, con un dato útil; de 3 a 4 al final, con un seguimiento corto. Los 20 reciben su primer mensaje."
      pie="Los 20 reciben el primer mensaje el mismo día. El puntaje solo dice por quién partes."
    >
      <div className="space-y-2.5">
        {filas.map((f) => (
          <motion.div key={f.rango} variants={PIEZA} className="grid grid-cols-[3rem_1fr] items-center gap-3">
            <span className="text-right font-serif text-xl text-white">{f.rango}</span>
            <div className="rounded-lg px-3 py-2" style={{ width: f.ancho, minWidth: '11rem', background: f.color }}>
              <p className={`text-sm font-semibold ${f.color === '#5fb2dd' ? 'text-[#0f172a]' : 'text-white'}`}>{f.t}</p>
              <p className={`text-[12px] leading-tight ${f.color === '#5fb2dd' ? 'text-[#0f172a]/80' : 'text-slate-200'}`}>{f.d}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Diagrama>
  );
}

/** Parte 4: el primer mensaje solo busca el segundo paso. */
export function EscaleraConversacion() {
  const pasos = [
    { t: 'Primer mensaje', d: '3 frases, una pregunta fácil' },
    { t: 'Te responde', d: 'Aunque sea «¿y cuánto sale?»' },
    { t: 'Conversación', d: 'Preguntas tú, escuchas' },
    { t: 'Muestra o reunión', d: 'Un paso con fecha' },
    { t: 'Cliente', d: 'Primer pedido' },
  ];
  return (
    <Diagrama
      titulo="El primer mensaje solo busca el segundo escalón"
      aria="Escalera de cinco escalones: primer mensaje, te responde, conversación, muestra o reunión, cliente. El primer mensaje no vende: solo busca que te respondan."
    >
      {/* Celular: escalera horizontal (barras que crecen hacia la derecha). Desde sm: escalones que suben. */}
      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-end sm:gap-2">
        {pasos.map((p, i) => (
          <motion.div
            key={p.t}
            variants={PIEZA}
            className={`flex w-[var(--ancho)] min-w-0 flex-col justify-end rounded-lg border p-2.5 sm:h-[var(--alto)] sm:w-auto sm:flex-1 sm:rounded-b-none sm:border-b-0 ${
              i === 1 ? 'border-[#5fb2dd] bg-[#2175a1]/40' : 'border-white/10 bg-white/[0.04]'
            }`}
            style={{ '--alto': `${5.5 + i * 2.1}rem`, '--ancho': `${52 + i * 12}%` } as React.CSSProperties}
          >
            <p className="text-sm font-semibold leading-tight text-white">
              <span className="mr-1 font-mono text-[11px] text-[#5fb2dd]">{i + 1}</span>
              {p.t}
            </p>
            <p className="mt-0.5 text-[12px] leading-tight text-slate-300">{p.d}</p>
          </motion.div>
        ))}
      </div>
      <motion.p variants={PIEZA} className="mt-3 text-sm text-slate-300">
        <span className="text-[#5fb2dd]">El escalón 2 es la meta del primer mensaje.</span> Si intentas saltar al 5, suena a folleto y nadie responde.
      </motion.p>
    </Diagrama>
  );
}

/** Parte 5: qué hacer según lo que responda. */
export function ArbolRespuesta() {
  return (
    <Diagrama
      titulo="Qué hacer según lo que te respondan"
      aria="Árbol de decisión después del primer mensaje. Si responde con interés, agenda una muestra o una reunión con fecha. Si responde que ahora no, anota una fecha para volver. Si no responde, envía el siguiente seguimiento en los días 2, 7 y 14; después del 14, un cierre amable y lo pausas."
    >
      <div className="flex flex-col items-center">
        <Nodo tono="acento" titulo="¿Respondió tu mensaje?" className="w-full max-w-xs text-center" />
        <div className="mt-1 grid w-full gap-3 sm:grid-cols-3">
          {[
            { e: 'sí, con interés', t: 'Agenda un paso con fecha', d: 'Muestra el jueves, reunión de 15 min', tono: 'claro' as const },
            { e: 'sí, ahora no', t: 'Anota cuándo volver', d: '«¿Te escribo en marzo?» y fecha en la planilla', tono: 'neutro' as const },
            { e: 'no responde', t: 'Siguiente seguimiento', d: 'Día 2 · 7 · 14. Después, cierre amable y pausa', tono: 'neutro' as const },
          ].map((r) => (
            <div key={r.e} className="flex flex-col items-center">
              <Flecha vertical etiqueta={r.e} />
              <Nodo tono={r.tono} titulo={r.t} texto={r.d} className="w-full" />
            </div>
          ))}
        </div>
      </div>
    </Diagrama>
  );
}

/** Parte 6: la planilla al centro de tu rutina. */
export function PlanillaAlCentro() {
  return (
    <Diagrama
      titulo="Tu planilla es el centro"
      aria="Ciclo de la rutina alrededor de tu planilla: filtrar los que tocan hoy, preparar el borrador (con Claude o ChatGPT, si quieres), revisarlo y enviarlo tú, y anotar la respuesta con el próximo paso y la fecha."
      pie="La planilla te dice a quién escribir. Claude o ChatGPT te ayudan con el borrador, si quieres. Tú revisas y envías. Nada queda en tu cabeza."
    >
      <Ciclo nodos={[['Filtra', '«hoy»'], ['Borrador', 'con ayuda'], ['Tú revisas', 'y envías'], ['Anota', 'próximo paso']]} centro={['Tu', 'planilla']} />
    </Diagrama>
  );
}

const DIAS = ['L', 'M', 'M', 'J', 'V'];

function Barra({ valores, color }: { valores: number[]; color: string }) {
  return (
    <div className="flex h-20 items-end gap-1.5">
      {valores.map((v, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1">
          <div className="w-full rounded-t" style={{ height: `${v * 0.9 + 0.15}rem`, background: v ? color : '#24314d' }} />
          <span className="text-[11px] text-slate-400">{DIAS[i]}</span>
        </div>
      ))}
    </div>
  );
}

/** Cierre: tu semana antes y después de la guía. */
export function SemanaAntesDespues() {
  const antes = [0, 3, 0, 0, 1];
  const despues = [4, 4, 4, 4, 4];
  return (
    <Diagrama
      titulo="Tu semana, antes y después"
      aria="Comparación de una semana. Antes: escribes a posibles clientes cuando te acuerdas, algunos días nada y otros varios de golpe. Después: 20 minutos cada mañana, con seguimientos y nombres nuevos todos los días."
    >
      <Comparacion
        izq={{
          titulo: 'Antes · cuando me acuerdo',
          children: (
            <>
              <Barra valores={antes} color="#94a3b8" />
              <p className="mt-2 text-[13px] text-slate-300">Días en blanco, seguimientos que se olvidan.</p>
            </>
          ),
          tono: 'neutro',
        }}
        der={{
          titulo: 'Después · 20 min cada mañana',
          children: (
            <>
              <Barra valores={despues} color="#5fb2dd" />
              <p className="mt-2 text-[13px] text-slate-200">Seguimientos y nombres nuevos todos los días.</p>
            </>
          ),
        }}
      />
    </Diagrama>
  );
}
