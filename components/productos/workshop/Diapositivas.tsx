'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { AnimatePresence, MotionConfig, motion, type Variants } from 'framer-motion';
import {
  AlertTriangle,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Maximize2,
  MonitorUp,
  MessageCircle,
  Package,
  Radio,
  Repeat,
  Scale,
  ShieldCheck,
  StickyNote,
  X,
} from 'lucide-react';
import { FOTOS } from '@/lib/productos/fotos';
import { APOYO } from '@/lib/productos/apoyo';
import { FlujoDerivacion, FlujoPiezas, MensajesRepetidos } from '@/components/productos/diagramas/slides';
import { LINKS } from '@/lib/productos/links';
import { WORKSHOP_TITULO } from '@/lib/productos/workshop/config';
import {
  ESQUELETO_GRANO_NORTE as F,
  MODULOS_CURSO,
  NOTAS,
  PASOS_DEMO,
  PREGUNTA_TRAMPA,
  RESPUESTA_CON_REGLAS,
  RESPUESTA_SIN_REGLAS,
} from '@/lib/productos/workshop/contenido';

/*
 * /workshop/diapositivas — las diapositivas del Workshop 1 para presentar en vivo (12 del documento + 2 de pase a la demo).
 * Teclado: ← → (o espacio / RePág / AvPág), Inicio/Fin, N = notas del presentador, F = pantalla completa.
 * Clic: tercio izquierdo retrocede, el resto avanza. En pantallas táctiles, deslizar.
 * La diapositiva actual vive en el hash (#1…#n) para no perderla al recargar.
 * Animación: la diapositiva entra/sale con un fundido y sus piezas (motion + variants) entran escalonadas.
 * MotionConfig reducedMotion="user" respeta prefers-reduced-motion.
 * Todo se dimensiona en em sobre el tamaño base del lienzo, así el 16:9 escala con la ventana.
 */

// Variantes compartidas: el contenedor de cada diapositiva escalona a sus piezas.
const LIENZO: Variants = {
  oculto: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, staggerChildren: 0.07, delayChildren: 0.05 } },
  salida: { opacity: 0, transition: { duration: 0.15 } },
};
const PIEZA: Variants = {
  oculto: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 26 } },
};

// ---------- Piezas de diseño ----------

function Etiqueta({ children }: { children: React.ReactNode }) {
  return (
    <motion.p variants={PIEZA} className="font-mono text-[0.75em] uppercase tracking-[0.22em] text-[#5fb2dd]">
      {children}
    </motion.p>
  );
}

function Titulo({ children, className = '', md = 'md:text-[2.6em]' }: { children: React.ReactNode; className?: string; md?: string }) {
  return (
    <motion.h2 variants={PIEZA} className={`font-serif text-[2.3em] leading-[1.1] text-white ${md} ${className}`}>
      {children}
    </motion.h2>
  );
}

function Tarjeta({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={PIEZA} className={`rounded-[1em] border border-white/10 bg-white/[0.04] p-[1em] ${className}`}>
      {children}
    </motion.div>
  );
}

function Burbuja({ lado, autor, children }: { lado: 'cliente' | 'asistente'; autor?: string; children: React.ReactNode }) {
  const cliente = lado === 'cliente';
  return (
    <motion.div variants={PIEZA} className={`flex ${cliente ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[88%] rounded-[0.8em] px-[0.8em] py-[0.55em] text-[0.95em] leading-snug ${
          cliente ? 'rounded-br-[0.2em] bg-[#005c4b] text-white' : 'rounded-bl-[0.2em] bg-[#202c33] text-slate-100'
        }`}
      >
        {autor ? <p className="mb-[0.2em] text-[0.75em] font-medium text-[#5fb2dd]">{autor}</p> : null}
        {children}
      </div>
    </motion.div>
  );
}

/** Foto dentro de la diapositiva: de Álvaro (lib/productos/fotos.ts) solo en la portada; el resto, apoyo (lib/productos/apoyo.ts). */
function FotoSlide({ foto, className = '', pos = 'center' }: { foto: { src: string; alt: string }; className?: string; pos?: string }) {
  return (
    <motion.div
      variants={{ oculto: { opacity: 0, scale: 0.96 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } } }}
      className={`relative overflow-hidden rounded-[1.2em] border border-white/10 bg-slate-900 ${className}`}
    >
      <Image
        src={foto.src}
        alt={foto.alt}
        fill
        sizes="(min-width: 768px) 40vw, 100vw"
        className="object-cover"
        style={{ objectPosition: pos }}
      />
    </motion.div>
  );
}

// ---------- Las diapositivas ----------

const DIAPOSITIVAS: { id: string; render: () => React.ReactNode }[] = [
  {
    id: 'portada',
    render: () => (
      <div className="grid h-full items-center gap-[1.6em] md:grid-cols-[1fr_17em]">
        <div>
          <Etiqueta>Workshop gratis · 45 min · en vivo por YouTube</Etiqueta>
          <motion.h1 variants={PIEZA} className="mt-[0.5em] max-w-[16em] font-serif text-[2.8em] leading-[1.05] text-white md:text-[3.4em]">
            {WORKSHOP_TITULO}
          </motion.h1>
          <p className="mt-[1.2em] max-w-[34em] text-[1.05em] text-slate-300">
            Cómo el esqueleto de tu agente de atención responde por WhatsApp las preguntas de siempre, sin inventar nada y pasándote lo
            importante.
          </p>
          <p className="mt-[2em] text-[0.9em] text-slate-400">Álvaro Villena · Villelab</p>
        </div>
        <FotoSlide foto={FOTOS.podcaster} className="aspect-[4/5] w-full md:aspect-auto md:h-[23em]" pos="50% 30%" />
      </div>
    ),
  },
  {
    id: 'por-que',
    render: () => (
      <div className="grid h-full items-center gap-[1.6em] md:grid-cols-[1fr_15em]">
        <div>
          <Etiqueta>Antes de empezar · por qué hago esto</Etiqueta>
          <Titulo className="mt-[0.5em]">La verdad, sin rodeos</Titulo>
          <div className="mt-[1.2em] grid gap-[0.7em]">
            {[
              { n: '1', t: 'Me gusta', d: 'Ordenar un negocio hasta que funciona sin depender del dueño me entretiene de verdad.' },
              { n: '2', t: 'Lo aprendí haciendo', d: 'Llevo años trabajando en esto. Lo que te muestro hoy viene de la experiencia, no de un libro.' },
              {
                n: '3',
                t: 'Vendo soluciones a esto',
                d: 'Tengo productos que resuelven lo que vamos a ver: guías, un curso y agentes que instalamos contigo. Igual hoy te llevas todo gratis.',
              },
            ].map((x) => (
              <Tarjeta key={x.n} className="flex items-start gap-[0.8em] p-[0.9em]">
                <span className="flex h-[1.9em] w-[1.9em] shrink-0 items-center justify-center rounded-full bg-[#2175a1] font-serif text-[0.95em] text-white">
                  {x.n}
                </span>
                <div>
                  <p className="text-[1.05em] font-medium text-white">{x.t}</p>
                  <p className="mt-[0.15em] text-[0.9em] leading-snug text-slate-300">{x.d}</p>
                </div>
              </Tarjeta>
            ))}
          </div>
        </div>
        <FotoSlide foto={APOYO.oficina} className="hidden md:block md:h-[21em]" pos="60% 50%" />
      </div>
    ),
  },
  {
    id: 'encuesta',
    render: () => (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <FotoSlide foto={APOYO.celularPendientes} className="mb-[0.8em] h-[7.5em] w-[11.25em] rounded-[1em]" pos="center" />
        <Etiqueta>Antes de empezar</Etiqueta>
        <Titulo className="mt-[0.6em] max-w-[14em]" md="md:text-[3em]">
          ¿Cuántos mensajes tienes sin responder hoy?
        </Titulo>
        <p className="mt-[1em] text-[1.15em] text-slate-300">Escribe solo el número en el chat.</p>
        <div className="mt-[1.6em] rounded-[1em] border border-dashed border-[#5fb2dd]/50 px-[2em] py-[0.8em]">
          <p className="text-[0.8em] uppercase tracking-wider text-slate-400">Promedio de la sala</p>
          <p className="mt-[0.2em] font-serif text-[2.4em] text-[#5fb2dd]">___</p>
        </div>
      </div>
    ),
  },
  {
    id: 'caso',
    render: () => (
      <div className="flex h-full flex-col justify-center">
        <div className="flex items-start gap-[1.2em]">
          <div className="hidden shrink-0 flex-col items-center rounded-[1.2em] border border-[#5fb2dd]/40 bg-[#2175a1]/15 p-[0.6em] md:flex">
            <Image src="/productos/caso/camila-celular-sonrie.webp" alt="Camila, dueña de Grano Norte, con su celular" width={160} height={200} className="h-[7em] w-auto" />
            <p className="mt-[0.3em] font-serif text-[0.85em] text-white">Grano Norte</p>
          </div>
          <div>
            <Etiqueta>El caso · Grano Norte</Etiqueta>
            <Titulo className="mt-[0.4em]">40 mensajes al día. 48 minutos en lo mismo.</Titulo>
            <p className="mt-[0.6em] max-w-[36em] text-[1em] text-slate-300">
              Camila tiene una tostaduría de café en Valparaíso con 6 personas. Responde sola el WhatsApp.
            </p>
          </div>
        </div>
        <div className="mt-[1.4em] grid grid-cols-2 gap-[0.8em] md:grid-cols-4">
          {[
            { n: '40', t: 'mensajes al día' },
            { n: '6 de 10', t: 'son la misma pregunta: precio, despacho, horario' },
            { n: '2 min', t: 'por cada respuesta' },
            { n: '48 min', t: 'diarios respondiendo lo mismo' },
          ].map((x, i) => (
            <Tarjeta key={x.n} className={i === 3 ? 'border-[#5fb2dd]/50 bg-[#2175a1]/20' : ''}>
              <p className="font-serif text-[2em] leading-none text-white">{x.n}</p>
              <p className="mt-[0.5em] text-[0.85em] text-slate-300">{x.t}</p>
            </Tarjeta>
          ))}
        </div>
        <MensajesRepetidos />
        <p className="mt-[1em] text-[1.1em] text-white">Y el mensaje que contesta tarde, muchas veces ya le compró a otro.</p>
      </div>
    ),
  },
  {
    id: 'tipos',
    render: () => (
      <div className="flex h-full flex-col justify-center">
        <Etiqueta>No todos los mensajes son iguales</Etiqueta>
        <Titulo className="mt-[0.4em]">Los 3 tipos de mensaje</Titulo>
        <div className="mt-[1.4em] grid gap-[0.9em] md:grid-cols-3">
          {[
            {
              t: 'Repetidos',
              d: 'Precio, despacho, horario. Las preguntas de siempre.',
              q: 'Responde el asistente',
              c: 'border-[#5fb2dd]/50 bg-[#2175a1]/15',
              I: Repeat,
            },
            { t: 'Con decisión', d: 'Precio especial, una fecha, un reclamo.', q: 'Responde una persona', c: '', I: Scale },
            { t: 'Nuevos', d: 'Lo que no está en ninguna parte.', q: 'El asistente avisa y deriva', c: '', I: HelpCircle },
          ].map((x) => (
            <Tarjeta key={x.t} className={`p-[1.2em] ${x.c}`}>
              <x.I className="mb-[0.5em] h-[1.8em] w-[1.8em] text-[#5fb2dd]" aria-hidden />
              <p className="font-serif text-[1.6em] text-white">{x.t}</p>
              <p className="mt-[0.5em] text-[0.95em] text-slate-300">{x.d}</p>
              <p className="mt-[1em] border-t border-white/10 pt-[0.7em] text-[0.95em] font-medium text-[#5fb2dd]">→ {x.q}</p>
            </Tarjeta>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'piezas',
    render: () => (
      <div className="flex h-full flex-col justify-center">
        <Etiqueta>Un asistente que no se manda solo</Etiqueta>
        <Titulo className="mt-[0.4em]">Las 3 piezas: el esqueleto, las reglas, el canal</Titulo>
        <div className="mt-[1.4em] grid gap-[0.9em] md:grid-cols-3">
          {[
            { n: '1', t: 'El esqueleto', d: 'Lo que sabe. Si no está en el esqueleto, no existe.', I: BookOpen },
            { n: '2', t: 'Las reglas de freno', d: 'Lo que nunca promete.', I: ShieldCheck },
            { n: '3', t: 'El canal', d: 'Dónde responde (WhatsApp, Instagram, web) y a quién avisa.', I: Radio },
          ].map((x) => (
            <Tarjeta key={x.n} className="p-[1.2em]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.9em] text-[#5fb2dd]">0{x.n}</span>
                <x.I className="h-[1.8em] w-[1.8em] text-[#5fb2dd]" aria-hidden />
              </div>
              <p className="mt-[0.3em] font-serif text-[1.6em] text-white">{x.t}</p>
              <p className="mt-[0.5em] text-[1em] text-slate-300">{x.d}</p>
            </Tarjeta>
          ))}
        </div>
        <FlujoPiezas />
        <p className="mt-[1em] text-[1.05em] text-slate-300">
          Primero el esqueleto. Con un buen esqueleto, la herramienta da casi lo mismo.
        </p>
      </div>
    ),
  },
  {
    id: 'plan-demo',
    render: () => (
      <div className="flex h-full flex-col justify-center">
        <Etiqueta>Demo en vivo · 13 minutos</Etiqueta>
        <Titulo className="mt-[0.4em]">Lo que vamos a hacer ahora</Titulo>
        <ol className="mt-[1.4em] grid gap-[0.9em] md:grid-cols-4">
          {PASOS_DEMO.map((p, i) => (
            <Tarjeta key={p.n} className={`relative p-[1.1em] ${i === 2 ? 'border-[#5fb2dd]/50 bg-[#2175a1]/15' : ''}`}>
              <span className="flex h-[2em] w-[2em] items-center justify-center rounded-full bg-[#2175a1] font-serif text-[1.1em] text-white">
                {p.n}
              </span>
              <p className="mt-[0.7em] font-serif text-[1.35em] leading-tight text-white">{p.t}</p>
              <p className="mt-[0.4em] text-[0.9em] text-slate-300">{p.d}</p>
              {i < PASOS_DEMO.length - 1 ? (
                <span aria-hidden className="absolute -right-[0.75em] top-1/2 hidden -translate-y-1/2 text-[1.2em] text-[#5fb2dd] md:block">
                  →
                </span>
              ) : null}
            </Tarjeta>
          ))}
        </ol>
        <motion.p variants={PIEZA} className="mt-[1.4em] text-[1.05em] text-slate-300">
          ¿Ya armaste tu esqueleto? Si no, el link está en el chat: lo armas mientras miras.
        </motion.p>
      </div>
    ),
  },
  {
    id: 'pase-en-vivo',
    render: () => (
      <div className="grid h-full items-center gap-[2em] md:grid-cols-[1fr_16em]">
        <div>
          <Etiqueta>Pausa las diapositivas</Etiqueta>
          <Titulo className="mt-[0.5em] max-w-[11em]" md="md:text-[3.4em]">
            Ahora lo hacemos en vivo
          </Titulo>
          <motion.p variants={PIEZA} className="mt-[1em] max-w-[24em] text-[1.15em] text-slate-300">
            Comparto mi pantalla y armamos el asistente de Grano Norte paso a paso. Tú, mira tu esqueleto al lado.
          </motion.p>
          <motion.p
            variants={PIEZA}
            className="mt-[1.4em] inline-flex items-center gap-[0.5em] rounded-full border border-[#5fb2dd]/50 bg-[#2175a1]/20 px-[1em] py-[0.5em] text-[0.95em] text-white"
          >
            <MonitorUp className="h-[1.2em] w-[1.2em] text-[#5fb2dd]" aria-hidden /> Compartiendo pantalla…
          </motion.p>
        </div>
        <FotoSlide foto={APOYO.microfono} className="aspect-[4/5] w-full md:aspect-auto md:h-[23em]" pos="40% 50%" />
      </div>
    ),
  },
  {
    id: 'esqueleto',
    render: () => (
      <div className="flex h-full flex-col justify-center">
        <div className="flex flex-wrap items-baseline justify-between gap-x-[1em]">
          <div>
            <Etiqueta>Demo · paso 1</Etiqueta>
            <Titulo className="mt-[0.3em]" md="md:text-[2.1em]">
              El esqueleto de Grano Norte
            </Titulo>
          </div>
          <p className="text-[0.8em] text-slate-400">Tostaduría de café · Valparaíso · WhatsApp</p>
        </div>
        <div className="mt-[0.7em] grid gap-[0.55em] md:text-[0.74em] md:grid-cols-3">
          <Tarjeta>
            <p className="font-mono text-[0.8em] uppercase tracking-wider text-[#5fb2dd]">Paso 1 · Tu negocio</p>
            <p className="mt-[0.4em] text-slate-200">{F.basico}</p>
            <p className="mt-[0.8em] font-mono text-[0.8em] uppercase tracking-wider text-[#5fb2dd]">Tono</p>
            <p className="mt-[0.4em] text-slate-200">{F.tono}</p>
          </Tarjeta>
          <Tarjeta>
            <p className="font-mono text-[0.8em] uppercase tracking-wider text-[#5fb2dd]">Paso 1 · Productos y precios (solo estos)</p>
            <ul className="mt-[0.4em] space-y-[0.3em] text-slate-200">
              {F.productos.map((p) => (
                <li key={p.nombre} className="flex justify-between gap-[0.6em]">
                  <span>{p.nombre}</span>
                  <span className="shrink-0 text-white">{p.precio}</span>
                </li>
              ))}
            </ul>
            <p className="mt-[0.5em] text-slate-300">{F.compra}</p>
            <p className="mt-[0.4em] text-slate-300">
              <span className="text-white">No vendemos:</span> cápsulas. No despachamos fuera de la V Región.
            </p>
          </Tarjeta>
          <Tarjeta>
            <p className="font-mono text-[0.8em] uppercase tracking-wider text-[#5fb2dd]">Paso 2 · Preguntas de siempre</p>
            <ul className="mt-[0.4em] space-y-[0.4em] text-slate-200">
              {F.faq.map((f) => (
                <li key={f.q}>
                  <span className="text-white">{f.q}</span> {f.a}
                </li>
              ))}
              <li className="text-slate-500">… hasta 10</li>
            </ul>
          </Tarjeta>
          <Tarjeta className="border-[#5fb2dd]/40 bg-[#2175a1]/15 md:col-span-2">
            <p className="font-mono text-[0.8em] uppercase tracking-wider text-[#5fb2dd]">Paso 3 · Lo que nunca debe prometer</p>
            <ol className="mt-[0.4em] grid gap-x-[1em] gap-y-[0.3em] text-slate-200 md:grid-cols-2">
              {F.reglas.map((r, i) => (
                <li key={r}>
                  {i + 1}. {r}
                </li>
              ))}
            </ol>
          </Tarjeta>
          <Tarjeta>
            <p className="font-mono text-[0.8em] uppercase tracking-wider text-[#5fb2dd]">Paso 4 · Cuándo pasa a una persona</p>
            <p className="mt-[0.4em] text-white">«{F.derivacion}»</p>
          </Tarjeta>
        </div>
      </div>
    ),
  },
  {
    id: 'reglas',
    render: () => (
      <div className="flex h-full flex-col justify-center">
        <Etiqueta>Demo · paso 3 · la pregunta trampa</Etiqueta>
        <Titulo className="mt-[0.3em]">Sin reglas vs con reglas</Titulo>
        <div className="mt-[1.2em] grid gap-[1em] md:grid-cols-2">
          {[
            {
              t: 'Sin reglas de freno',
              r: RESPUESTA_SIN_REGLAS,
              pie: 'Regaló un 20 % y prometió despacho.',
              c: 'border-rose-400/40 bg-rose-500/[0.06]',
              pc: 'text-rose-300',
            },
            {
              t: 'Con reglas de freno',
              r: RESPUESTA_CON_REGLAS,
              pie: 'Derivó a Camila y siguió la conversación.',
              c: 'border-[#5fb2dd]/50 bg-[#2175a1]/15',
              pc: 'text-[#5fb2dd]',
            },
          ].map((x) => (
            <div key={x.t} className={`rounded-[1em] border p-[1em] ${x.c}`}>
              <p className={`font-mono text-[0.8em] uppercase tracking-wider ${x.pc}`}>{x.t}</p>
              <div className="mt-[0.8em] space-y-[0.6em] rounded-[0.8em] bg-[#0b141a] p-[0.8em]">
                <Burbuja lado="cliente">{PREGUNTA_TRAMPA}</Burbuja>
                <Burbuja lado="asistente" autor="Asistente de Grano Norte">
                  {x.r}
                </Burbuja>
              </div>
              <p className={`mt-[0.8em] text-[0.95em] ${x.pc}`}>{x.pie}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'whatsapp',
    render: () => (
      <div className="grid h-full items-center gap-[2em] md:grid-cols-[1fr_auto]">
        <div>
          <Etiqueta>Demo · paso 4</Etiqueta>
          <Titulo className="mt-[0.3em]">WhatsApp en vivo</Titulo>
          <p className="mt-[0.8em] max-w-[22em] text-[1.05em] text-slate-300">
            El mismo esqueleto, ahora respondiendo por WhatsApp. Escribo desde mi celular y la respuesta llega sola.
          </p>
          <p className="mt-[0.8em] max-w-[22em] text-[1.05em] text-slate-300">
            Y cuando llega un reclamo, el asistente no lo resuelve: le avisa a Camila.
          </p>
        </div>
        {/* Maqueta de celular */}
        <div className="mx-auto w-[14em] rounded-[2.2em] border-[0.45em] border-slate-700 bg-[#0b141a] shadow-[0_1.5em_4em_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-[0.6em] rounded-t-[1.7em] bg-[#202c33] px-[0.9em] pb-[0.6em] pt-[1.1em]">
            <div className="flex h-[2em] w-[2em] items-center justify-center rounded-full bg-[#2175a1] font-serif text-[0.8em] text-white">
              GN
            </div>
            <div>
              <p className="text-[0.85em] font-medium text-white">Grano Norte</p>
              <p className="text-[0.65em] text-slate-400">en línea</p>
            </div>
          </div>
          <div className="flex min-h-[15em] flex-col justify-end space-y-[0.6em] px-[0.7em] py-[0.9em] text-[0.85em]">
            <p className="mx-auto rounded-[0.5em] bg-[#182229] px-[0.6em] py-[0.2em] text-[0.7em] text-slate-400">Hoy</p>
            <Burbuja lado="cliente">{PREGUNTA_TRAMPA}</Burbuja>
            <Burbuja lado="asistente">{RESPUESTA_CON_REGLAS}</Burbuja>
          </div>
          <div className="mx-[0.7em] mb-[0.9em] rounded-full bg-[#202c33] px-[0.9em] py-[0.5em] text-[0.7em] text-slate-500">Mensaje</div>
        </div>
      </div>
    ),
  },
  {
    id: 'tu-turno',
    render: () => (
      <div className="grid h-full items-center gap-[2em] md:grid-cols-[1fr_15em]">
        <div>
          <Etiqueta>Tu turno</Etiqueta>
          <Titulo className="mt-[0.6em] max-w-[13em]" md="md:text-[3em]">
            ¿Cuál es la pregunta que más te hacen tus clientes?
          </Titulo>
          <p className="mt-[1em] max-w-[28em] text-[1.15em] text-slate-300">
            Escríbela en el chat. Tomo tres y las respondemos en vivo con el asistente de Grano Norte, para ver qué pasa cuando no sabe.
          </p>
        </div>
        <FotoSlide foto={APOYO.celularMensajes} className="aspect-[4/5] w-full md:aspect-auto md:h-[22em]" pos="45% 50%" />
      </div>
    ),
  },
  {
    id: 'derivacion',
    render: () => (
      <div className="flex h-full flex-col justify-center">
        <Etiqueta>Derivación</Etiqueta>
        <Titulo className="mt-[0.3em]">Cuándo pasa a una persona</Titulo>
        <FlujoDerivacion
          casos={[
            { t: 'Reclamos', I: MessageCircle },
            { t: 'Pedidos grandes', I: Package },
            { t: 'Clientes molestos', I: AlertTriangle },
            { t: 'Todo lo que no está en el esqueleto', I: HelpCircle },
          ]}
        />
        <div className="mt-[1.4em] rounded-[1em] border border-[#5fb2dd]/50 bg-[#2175a1]/15 p-[1.2em]">
          <p className="font-mono text-[0.8em] uppercase tracking-wider text-[#5fb2dd]">
            Ejercicio · 2 minutos · escribe la tuya en el chat
          </p>
          <p className="mt-[0.5em] font-serif text-[1.6em] text-white">«Le paso tu mensaje a ______, te escribe ______.»</p>
          <p className="mt-[0.5em] text-[0.9em] text-slate-400">Grano Norte: «{F.derivacion}»</p>
        </div>
      </div>
    ),
  },
  {
    id: 'errores',
    render: () => (
      <div className="grid h-full items-center gap-[1.6em] md:grid-cols-[1fr_13em]">
        <div>
        <Etiqueta>Lo que más se repite</Etiqueta>
        <Titulo className="mt-[0.3em]">Los 4 errores comunes</Titulo>
        <ol className="mt-[1.2em] grid gap-[0.8em] md:grid-cols-2">
          {[
            'Un esqueleto sin la lista de lo que NO vendes.',
            'Respuestas largas.',
            'Prometer tiempos.',
            'No avisarle a nadie cuando deriva.',
          ].map((x, i) => (
            <li key={x} className="flex items-center gap-[0.9em] rounded-[1em] border border-white/10 bg-white/[0.04] p-[1.1em]">
              <span className="font-serif text-[2em] leading-none text-[#5fb2dd]">{i + 1}</span>
              <span className="text-[1.2em] text-white">{x}</span>
            </li>
          ))}
        </ol>
        </div>
        <FotoSlide foto={APOYO.listaCheck} className="hidden md:block md:h-[20em]" pos="55% 50%" />
      </div>
    ),
  },
  {
    id: 'curso',
    render: () => (
      <div className="flex h-full flex-col justify-center">
        <Etiqueta>Siguiente paso · hoy vimos una pieza de tu sistema</Etiqueta>
        <Titulo className="mt-[0.3em]" md="md:text-[2.2em]">
          Curso «El sistema de tu negocio»
        </Titulo>
        <p className="mt-[0.4em] max-w-[40em] text-[0.95em] text-slate-300">
          Tu primer CRM y ERP en Google Sheets: clientes, pedidos, atención, cobranza y caja en una planilla, con un tablero que lo junta todo.
        </p>
        <div className="mt-[0.9em] grid gap-[0.5em] md:text-[0.8em] md:grid-cols-4">
          {MODULOS_CURSO.map((m) => (
            <div
              key={m.n}
              className={`rounded-[0.8em] border p-[0.7em] ${m.n === 4 ? 'border-[#5fb2dd]/60 bg-[#2175a1]/20' : 'border-white/10 bg-white/[0.04]'}`}
            >
              <p className="font-mono text-[0.85em] text-[#5fb2dd]">
                Módulo {m.n} · {m.area}
              </p>
              <p className="mt-[0.2em] text-white">{m.titulo}</p>
            </div>
          ))}
          <div className="rounded-[0.8em] border border-white/20 bg-white/[0.08] p-[0.7em]">
            <p className="font-mono text-[0.85em] text-[#5fb2dd]">Proyecto final</p>
            <p className="mt-[0.2em] text-white">Tu ERP en Google Sheets con su tablero</p>
          </div>
        </div>
        <div className="mt-[1em] flex flex-col gap-[0.8em] rounded-[1em] border border-[#5fb2dd]/50 bg-gradient-to-r from-[#2175a1]/30 to-transparent p-[1em] md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-[0.9em]">
            <FotoSlide foto={APOYO.tableroLaptop} className="h-[3.4em] w-[3.4em] shrink-0 rounded-full" pos="50% 40%" />
            <div>
              <p className="text-[1.15em] font-medium text-white">Precio especial para asistentes · válido 72 horas</p>
              <p className="text-[0.9em] text-slate-300">El link está en el chat.</p>
            </div>
          </div>
          <a
            href={LINKS.curso}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#FF3D8B] px-[1.4em] py-[0.7em] text-[1em] font-semibold text-white hover:bg-[#ff5c9f]"
          >
            villelab.com{LINKS.curso}
          </a>
        </div>
      </div>
    ),
  },
];

const TOTAL = DIAPOSITIVAS.length;

// ---------- Navegación por hash ----------

function subscribe(cb: () => void) {
  window.addEventListener('hashchange', cb);
  return () => window.removeEventListener('hashchange', cb);
}
const leerHash = () => window.location.hash;
const hashServidor = () => '';

function indiceDesdeHash(hash: string) {
  const n = parseInt(hash.replace('#', ''), 10);
  return Number.isFinite(n) && n >= 1 && n <= TOTAL ? n - 1 : 0;
}

export default function Diapositivas() {
  const hash = useSyncExternalStore(subscribe, leerHash, hashServidor);
  const actual = indiceDesdeHash(hash);
  const [notas, setNotas] = useState(false);
  const toque = useRef<{ x: number; y: number } | null>(null);

  const ir = useCallback((i: number) => {
    const destino = Math.min(TOTAL - 1, Math.max(0, i));
    window.location.replace(`#${destino + 1}`);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const idx = indiceDesdeHash(window.location.hash);
      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          ir(idx + 1);
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          ir(idx - 1);
          break;
        case 'Home':
          ir(0);
          break;
        case 'End':
          ir(TOTAL - 1);
          break;
        case 'n':
        case 'N':
          setNotas((v) => !v);
          break;
        case 'Escape':
          setNotas(false);
          break;
        case 'f':
        case 'F':
          if (document.fullscreenElement) void document.exitFullscreen();
          else void document.documentElement.requestFullscreen?.();
          break;
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [ir]);

  function onClick(e: React.MouseEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest('a,button')) return;
    const caja = e.currentTarget.getBoundingClientRect();
    if (e.clientX - caja.left < caja.width / 3) ir(actual - 1);
    else ir(actual + 1);
  }

  function onTouchStart(e: React.TouchEvent) {
    toque.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
  function onTouchEnd(e: React.TouchEvent) {
    const inicio = toque.current;
    toque.current = null;
    if (!inicio) return;
    const dx = e.changedTouches[0].clientX - inicio.x;
    const dy = e.changedTouches[0].clientY - inicio.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) ir(actual + (dx < 0 ? 1 : -1));
  }

  const nota = NOTAS[actual];

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-[100dvh] bg-[#0f172a] md:fixed md:inset-0 md:flex md:items-center md:justify-center md:bg-[#070b14]">
        <div
          role="region"
          aria-roledescription="presentación"
          aria-label={`Diapositiva ${actual + 1} de ${TOTAL}`}
          onClick={onClick}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="relative flex min-h-[100dvh] w-full select-none flex-col overflow-hidden bg-[#0f172a] text-[13px] text-slate-200 md:aspect-video md:min-h-0 md:w-[min(100vw,177.78vh)] md:[font-size:min(1.5625vw,2.78vh)]"
        >
          {/* Fondo sutil */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(33,117,161,0.22),transparent_55%)]"
          />
          {/* Cabecera */}
          <div className="relative flex items-center justify-between px-[1.6em] pt-[1.2em] md:px-[3em] md:pt-[1.6em]">
            <p className="font-serif text-[0.95em] text-white">Villelab</p>
            <p className="font-mono text-[0.7em] uppercase tracking-[0.2em] text-slate-500">Workshop 1 · Atención al cliente</p>
          </div>
          {/* Contenido */}
          <div className="relative flex-1 px-[1.6em] py-[1.4em] md:px-[3em] md:py-[1em]">
            <AnimatePresence mode="wait">
              <motion.div key={actual} variants={LIENZO} initial="oculto" animate="visible" exit="salida" className="h-full">
                {DIAPOSITIVAS[actual].render()}
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Pie: progreso + controles */}
          <div className="relative flex items-center gap-[1em] px-[1.6em] pb-[1.2em] md:px-[3em] md:pb-[1.4em]">
            <div className="h-[0.2em] flex-1 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-[#2175a1] transition-all" style={{ width: `${((actual + 1) / TOTAL) * 100}%` }} />
            </div>
            <div className="flex items-center gap-[0.4em]">
              <button
                type="button"
                onClick={() => ir(actual - 1)}
                disabled={actual === 0}
                aria-label="Diapositiva anterior"
                className="flex h-[2.2em] min-h-[36px] w-[2.2em] min-w-[36px] items-center justify-center rounded-full text-slate-400 hover:bg-white/10 hover:text-white disabled:opacity-30"
              >
                <ChevronLeft className="h-[1.2em] w-[1.2em]" />
              </button>
              <span className="min-w-[3.2em] text-center font-mono text-[0.85em] text-slate-300" aria-live="polite">
                {actual + 1}/{TOTAL}
              </span>
              <button
                type="button"
                onClick={() => ir(actual + 1)}
                disabled={actual === TOTAL - 1}
                aria-label="Diapositiva siguiente"
                className="flex h-[2.2em] min-h-[36px] w-[2.2em] min-w-[36px] items-center justify-center rounded-full text-slate-400 hover:bg-white/10 hover:text-white disabled:opacity-30"
              >
                <ChevronRight className="h-[1.2em] w-[1.2em]" />
              </button>
              <button
                type="button"
                onClick={() => setNotas((v) => !v)}
                aria-label="Notas del presentador (N)"
                aria-pressed={notas}
                title="Notas del presentador (N)"
                className={`flex h-[2.2em] min-h-[36px] w-[2.2em] min-w-[36px] items-center justify-center rounded-full hover:bg-white/10 hover:text-white ${notas ? 'text-[#5fb2dd]' : 'text-slate-400'}`}
              >
                <StickyNote className="h-[1.1em] w-[1.1em]" />
              </button>
              <button
                type="button"
                onClick={() =>
                  document.fullscreenElement ? void document.exitFullscreen() : void document.documentElement.requestFullscreen?.()
                }
                aria-label="Pantalla completa (F)"
                title="Pantalla completa (F)"
                className="hidden h-[2.2em] w-[2.2em] items-center justify-center rounded-full text-slate-400 hover:bg-white/10 hover:text-white md:flex"
              >
                <Maximize2 className="h-[1.1em] w-[1.1em]" />
              </button>
            </div>
          </div>

          {/* Notas del presentador */}
          {notas ? (
            <aside
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-x-0 bottom-0 z-10 max-h-[60%] overflow-y-auto border-t border-[#5fb2dd]/40 bg-[#0b1220]/95 px-[1.6em] py-[1.2em] backdrop-blur md:px-[3em]"
              aria-label="Notas del presentador"
            >
              <div className="flex items-start justify-between gap-[1em]">
                <p className="font-mono text-[0.75em] uppercase tracking-[0.2em] text-[#5fb2dd]">
                  Notas · {actual + 1}/{TOTAL} · min {nota.bloque}
                </p>
                <button
                  type="button"
                  onClick={() => setNotas(false)}
                  aria-label="Cerrar notas"
                  className="flex min-h-[36px] min-w-[36px] items-center justify-center rounded-full text-slate-400 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-[1.1em] w-[1.1em]" />
                </button>
              </div>
              {nota.guion.map((g) => (
                <p key={g} className="mt-[0.6em] text-[1.05em] leading-relaxed text-white">
                  {g}
                </p>
              ))}
              {nota.indicaciones?.length ? (
                <ul className="mt-[0.6em] space-y-[0.3em] text-[0.9em] text-slate-300">
                  {nota.indicaciones.map((x) => (
                    <li key={x}>· {x}</li>
                  ))}
                </ul>
              ) : null}
              <p className="mt-[0.8em] text-[0.7em] text-slate-500">← → avanzar · N notas · F pantalla completa</p>
            </aside>
          ) : null}
        </div>
      </div>
    </MotionConfig>
  );
}
