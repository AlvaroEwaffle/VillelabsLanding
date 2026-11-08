'use client';

// Diagramas de /esqueleto (uno por paso, más el recorrido y el «después» del resultado).
import { motion } from 'framer-motion';
import { CASOS_DERIVACION, EJEMPLO, REGLAS_FRENO } from '@/lib/productos/esqueleto/datos';
import { Ciclo, Comparacion, Diagrama, Flecha, Flujo, Globo, Nodo, PIEZA } from './base';

/** Portada: qué hace el esqueleto, de punta a punta. */
export function DiagramaRecorrido() {
  return (
    <Diagrama
      titulo="Lo que arma el esqueleto"
      aria="Flujo: un cliente escribe, tu asistente responde con lo que dice tu esqueleto, y lo que no sabe o no puede prometer te llega a ti."
      className="mt-8"
    >
      <Flujo
        pasos={[
          { titulo: 'Un cliente escribe', texto: '«¿Cuánto cuesta? ¿Despachan?»' },
          { titulo: 'Tu asistente lee tu esqueleto', texto: 'Lo que vendes, tus respuestas y tus reglas', tono: 'acento' },
          { titulo: 'Responde lo de siempre', texto: 'Al tiro, con tu tono' },
          { titulo: 'Lo importante te llega a ti', texto: 'Descuentos, reclamos, lo que no sabe', tono: 'claro' },
        ]}
      />
    </Diagrama>
  );
}

/** Paso 1: lo que sabe tu asistente sale de cuatro bloques. */
export function DiagramaLoQueSabe() {
  const bloques = [
    { t: 'Quién eres', d: 'Negocio, zona, horario y canales' },
    { t: 'Qué vendes', d: 'Productos y precios: solo esos' },
    { t: 'Para quién', d: 'Tu cliente y lo que busca' },
    { t: 'Cómo hablas', d: 'Tu tono, tus palabras' },
  ];
  return (
    <Diagrama
      titulo="De dónde sale lo que responde"
      aria="Cuatro bloques alimentan a tu asistente: quién eres, qué vendes, para quién y cómo hablas. Si algo no está en el esqueleto, para tu asistente no existe."
      pie="Si no está en el esqueleto, para tu asistente no existe. Por eso parte por tu negocio."
    >
      <div className="grid items-center gap-3 sm:grid-cols-[1fr_auto_200px]">
        <div className="grid grid-cols-2 gap-2">
          {bloques.map((b, i) => (
            <Nodo key={b.t} numero={`0${i + 1}`} titulo={b.t} texto={b.d} />
          ))}
        </div>
        <Flecha />
        <motion.div variants={PIEZA} className="flex flex-col items-center rounded-2xl border border-[#5fb2dd]/60 bg-[#2175a1]/25 p-4 text-center">
          <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
            <rect x="8" y="12" width="32" height="26" rx="8" fill="#5fb2dd" />
            <circle cx="19" cy="25" r="3.2" fill="#0f172a" />
            <circle cx="29" cy="25" r="3.2" fill="#0f172a" />
            <path d="M24 12V6" stroke="#5fb2dd" strokeWidth="3" strokeLinecap="round" />
            <circle cx="24" cy="5" r="3" fill="#5fb2dd" />
          </svg>
          <p className="mt-2 font-serif text-lg text-white">Tu asistente</p>
          <p className="text-[13px] text-slate-300">Responde solo con esto</p>
        </motion.div>
      </div>
    </Diagrama>
  );
}

/** Paso 2: 6 de cada 10 mensajes son la misma pregunta. */
export function DiagramaPreguntasRepetidas() {
  const repetidas = ['Precio', 'Despacho', 'Horario', 'Precio', 'Despacho', 'Precio'];
  return (
    <Diagrama
      titulo="6 de cada 10 mensajes son la misma pregunta"
      aria="De cada 10 mensajes, 6 son la misma pregunta: precio, despacho u horario. Esas las responde el asistente con tus respuestas de siempre; las otras 4 siguen pasando por ti."
      pie="En Grano Norte, esas 6 preguntas se llevaban 48 minutos al día. Escribirlas una vez las saca de tu celular."
    >
      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <div className="grid grid-cols-5 gap-1.5">
          {Array.from({ length: 10 }, (_, i) => {
            const rep = i < 6;
            return (
              <motion.div
                key={i}
                variants={PIEZA}
                className={`flex aspect-square flex-col items-center justify-center rounded-lg border text-center ${
                  rep ? 'border-[#5fb2dd]/60 bg-[#2175a1]/30' : 'border-white/10 bg-white/[0.03]'
                }`}
              >
                <svg viewBox="0 0 24 24" className={`h-4 w-4 ${rep ? 'text-[#5fb2dd]' : 'text-slate-500'}`} fill="currentColor" aria-hidden="true">
                  <path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-4 3v-3H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
                </svg>
                <span className={`mt-0.5 text-[10px] leading-none ${rep ? 'text-white' : 'text-slate-500'}`}>{rep ? repetidas[i] : 'Otra'}</span>
              </motion.div>
            );
          })}
        </div>
        <Flecha />
        <div className="grid gap-2">
          <Nodo tono="acento" titulo="6 repetidas → las responde tu asistente" texto="Con la respuesta corta que escribes en este paso" />
          <Nodo titulo="4 distintas → siguen pasando por ti" texto="O el asistente te las deriva (paso 4)" />
        </div>
      </div>
    </Diagrama>
  );
}

/** Paso 3: la misma pregunta, sin reglas y con reglas. */
export function DiagramaSinConReglas() {
  const pregunta = '¿Me haces un 20 % si llevo dos?';
  return (
    <Diagrama
      titulo="La misma pregunta, sin reglas y con reglas"
      aria="Comparación. Sin reglas de freno, el asistente regala un 20 % y promete despacho para mañana. Con reglas de freno, dice que los descuentos los ve Camila, le pasa el mensaje y sigue la conversación."
    >
      <Comparacion
        izq={{
          titulo: 'Sin reglas',
          children: (
            <div className="space-y-2">
              <Globo de="cliente">{pregunta}</Globo>
              <Globo de="agente">¡Claro! Te dejo el 20 % y te lo despacho mañana.</Globo>
              <p className="pt-1 text-[13px] text-rose-300">Regaló plata y prometió una fecha.</p>
            </div>
          ),
        }}
        der={{
          titulo: 'Con reglas',
          children: (
            <div className="space-y-2">
              <Globo de="cliente">{pregunta}</Globo>
              <Globo de="agente">Los descuentos los ve {EJEMPLO.derivaNombre}. Le paso tu mensaje y te escribe hoy. ¿Es para cafetería u oficina?</Globo>
              <p className="pt-1 text-[13px] text-[#5fb2dd]">Derivó y siguió conversando.</p>
            </div>
          ),
        }}
      />
      <motion.div variants={PIEZA} className="mt-4 flex flex-wrap gap-1.5">
        {REGLAS_FRENO.map((r) => (
          <span key={r.id} className="rounded-full border border-white/15 px-2.5 py-1 text-[12px] text-slate-300">
            Nunca promete: {r.etiqueta.toLowerCase()}
          </span>
        ))}
      </motion.div>
    </Diagrama>
  );
}

/** Paso 4: el camino de un mensaje hasta una persona. */
export function DiagramaDerivacion() {
  return (
    <Diagrama
      titulo="Cuándo responde el asistente y cuándo pasa a una persona"
      aria={`Flujo de decisión: llega un mensaje; si está en el esqueleto y no rompe una regla, responde el asistente. Si es ${CASOS_DERIVACION.map((c) => c.etiqueta.toLowerCase()).join(', ')}, el asistente avisa con tu frase de derivación y le pasa la conversación a una persona.`}
    >
      <div className="flex flex-col items-center">
        <Nodo titulo="Llega un mensaje" className="w-full max-w-xs text-center" />
        <Flecha vertical />
        <Nodo tono="acento" titulo="¿Está en el esqueleto y no rompe una regla?" className="w-full max-w-sm text-center" />
        <div className="mt-2 grid w-full gap-3 sm:grid-cols-2">
          <div className="flex flex-col items-center">
            <Flecha vertical etiqueta="sí" />
            <Nodo titulo="Responde el asistente" texto="Precio de la lista, horario, cómo comprar" className="w-full" />
          </div>
          <div className="flex flex-col items-center">
            <Flecha vertical etiqueta="no" />
            <Nodo
              tono="claro"
              titulo="Pasa a una persona"
              texto={`${CASOS_DERIVACION.map((c) => c.etiqueta).join(' · ')}`}
              className="w-full"
            />
            <motion.p variants={PIEZA} className="mt-2 text-center text-[13px] text-slate-300">
              Con tu frase: «{EJEMPLO.fraseDerivacion}»
            </motion.p>
          </div>
        </div>
      </div>
    </Diagrama>
  );
}

/** Resultado: el ciclo para dejarlo afinado. */
export function DiagramaProbarAjustar() {
  return (
    <Diagrama
      titulo="Del esqueleto a tu asistente funcionando"
      aria="Ciclo de cuatro pasos alrededor de tu esqueleto: copiarlo, pegarlo en Claude o ChatGPT, probarlo con las 5 preguntas trampa y ajustar el paso que falló. Se repite hasta que responde bien."
      pie="Cada pregunta trampa que falla te dice qué paso reforzar. Dos o tres vueltas y queda listo para tus clientes."
    >
      <Ciclo nodos={[['Copia', 'tu esqueleto'], ['Pégalo', 'en Claude'], ['Prueba', '5 trampas'], ['Ajusta', 'el paso']]} centro={['Tu', 'esqueleto']} />
    </Diagrama>
  );
}
