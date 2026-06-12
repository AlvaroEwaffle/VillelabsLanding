'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const workSteps = [
  {
    title: 'Entender el producto',
    text: 'Mapeo usuarios, datos, sistemas, backlog, arquitectura, riesgos de IA y decisiones pendientes. Antes de acelerar, hay que saber donde se rompe el sistema.',
  },
  {
    title: 'Shapear la apuesta tech',
    text: 'Convertimos una iniciativa difusa en un pitch: problema, appetite, solucion, constraints tecnicos, no-gos, riesgos de modelo y circuit breaker.',
  },
  {
    title: 'Construir un slice productivo',
    text: 'El equipo construye una pieza verificable: UX, datos, integraciones, QA, seguridad y observabilidad. No demo eterna. No roadmap infinito.',
  },
  {
    title: 'Operar el programa',
    text: 'Dejamos owners, decision log, release criteria, metricas y cadencia ejecutiva para que el AI/Product Program siga avanzando sin depender de heroismo.',
  },
];

const modelRows = [
  {
    layer: 'Value',
    question: 'Que capacidad de negocio debe habilitar la tecnologia?',
    output: 'Outcome, usuarios, restricciones',
    decision: 'Vale una apuesta o no',
  },
  {
    layer: 'Shape',
    question: 'Cual es el problema, el appetite y el borde tecnico?',
    output: 'Pitch Shape Up + constraints',
    decision: 'Bet, wait o kill',
  },
  {
    layer: 'Build',
    question: 'Que slice prueba valor sin tragarse el roadmap?',
    output: 'UX, API, data, QA, release',
    decision: 'Ship, cut o re-shape',
  },
  {
    layer: 'AI Ops',
    question: 'Como se monitorea, evalua y corrige en produccion?',
    output: 'Owners, evals, metricas, runbook',
    decision: 'Escalar o estabilizar',
  },
  {
    layer: 'Portfolio',
    question: 'Que apuesta tech compite por capacidad esta semana?',
    output: 'Matriz de bottlenecks',
    decision: 'Siguiente foco',
  },
];

const examples = [
  {
    name: 'Brofi',
    point: 'AI operating layer para decidir que bottleneck del portfolio vuelve verde y convertirlo en una apuesta accionable.',
  },
  {
    name: 'Fidelidapp Broadcast V2',
    point: 'Producto de insights operacionales: de reporte plano a brief con datos, coaching, appetite, no-gos y piloto antes de rollout.',
  },
  {
    name: 'Brofi Agent SDK',
    point: 'Programa de agentes IA formulado como ciclo: tools, memoria, aprobaciones, observabilidad, circuit breaker y definicion de done.',
  },
];

const nextSteps = [
  'Diagnostico del producto, sistemas, datos y oportunidades de IA.',
  'Mapa de decisiones, riesgos tecnicos, ownership y backlog.',
  'Primer pitch Shape Up para una apuesta tech/AI concreta.',
  'Ciclo asesorado hasta un slice verificable en produccion o piloto.',
];

function SectionTitle({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <motion.div variants={fadeUp} className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">
        {label}
      </p>
      <h2 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-relaxed text-white/[0.62] md:text-lg">
        {text}
      </p>
    </motion.div>
  );
}

export default function AsesoriaContent() {
  return (
    <main className="bg-[#08090b] text-white">
      {/* A. Hero */}
      <section className="border-b border-white/10 px-4 pb-16 pt-28 sm:px-6 md:pb-20 md:pt-36 lg:px-8">
        <motion.div
          className="mx-auto max-w-6xl"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200"
          >
            AI Product Advisory / Shape Up for Tech Programs
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-7 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-tight text-white md:text-7xl lg:text-8xl"
          >
            De iniciativas de IA a productos que llegan a produccion.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-3xl text-lg leading-relaxed text-white/[0.68] md:text-xl"
          >
            Asesoria para equipos que estan construyendo plataformas, automatizaciones, agentes IA o productos internos. Shape Up pone el limite de la apuesta. SDLC protege calidad. Agile Program Management conecta negocio, tecnologia y operacion.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/contact"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#08090b]"
            >
              Agendar diagnostico
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#next-steps"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/[0.18] px-6 py-3 text-sm font-semibold text-white/[0.82] transition hover:border-white/[0.34] hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-[#08090b]"
            >
              Ver arco de trabajo
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-14 grid gap-0 border-y border-white/10 md:grid-cols-3"
          >
            {[
              ['01', 'Value', 'Que capacidad tech/AI mueve el negocio.'],
              ['02', 'Bet', 'Que apuesta cabe en el appetite.'],
              ['03', 'Ship', 'Que evidencia llega a piloto o produccion.'],
            ].map(([number, title, text]) => (
              <div
                key={title}
                className="border-b border-white/10 py-5 md:border-b-0 md:border-r md:px-6 md:last:border-r-0"
              >
                <p className="text-xs font-semibold text-white/[0.32]">{number}</p>
                <h3 className="mt-2 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/[0.52]">{text}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* B. Como trabajo */}
      <motion.section
        className="px-4 py-20 sm:px-6 md:py-24 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
      >
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <SectionTitle
            label="B / Como trabajo"
            title="Primero arquitectura de decision. Despues velocidad."
            text="La asesoria crea el sistema para decidir que construir, que cortar y que operar. IA, Scrum, Kanban o roadmaps son herramientas; el punto de partida es una apuesta tech bien formada."
          />

          <motion.div variants={stagger} className="divide-y divide-white/10 border-y border-white/10">
            {workSteps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                className="grid gap-4 py-6 md:grid-cols-[72px_1fr]"
              >
                <p className="text-sm font-semibold text-cyan-200">0{index + 1}</p>
                <div>
                  <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/[0.58]">{step.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* C. Diagrama */}
      <motion.section
        className="border-y border-white/10 bg-white/[0.025] px-4 py-20 sm:px-6 md:py-24 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
      >
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            label="C / Modelo"
            title="Un AI Product Program es una cadena de decisiones."
            text="Si una capa no produce evidencia, el programa se vuelve opinion. Este es el mapa que uso para ordenar estrategia, arquitectura, SDLC, delivery y operacion."
          />

          <motion.div variants={fadeUp} className="mt-12 overflow-hidden border border-white/10">
            <div className="hidden grid-cols-[0.9fr_2fr_1.35fr_1.25fr] border-b border-white/10 bg-white/[0.04] text-xs font-semibold uppercase tracking-[0.16em] text-white/40 md:grid">
              <div className="p-4">Capa</div>
              <div className="p-4">Pregunta</div>
              <div className="p-4">Evidencia</div>
              <div className="p-4">Decision</div>
            </div>
            {modelRows.map((row) => (
              <div
                key={row.layer}
                className="grid border-b border-white/10 last:border-b-0 md:grid-cols-[0.9fr_2fr_1.35fr_1.25fr]"
              >
                <div className="p-4 md:border-r md:border-white/10">
                  <p className="text-sm font-semibold text-cyan-200">{row.layer}</p>
                </div>
                <div className="p-4 md:border-r md:border-white/10">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/[0.32] md:hidden">
                    Pregunta
                  </p>
                  <p className="text-sm leading-relaxed text-white/[0.74]">{row.question}</p>
                </div>
                <div className="p-4 md:border-r md:border-white/10">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/[0.32] md:hidden">
                    Evidencia
                  </p>
                  <p className="text-sm leading-relaxed text-white/[0.56]">{row.output}</p>
                </div>
                <div className="p-4">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/[0.32] md:hidden">
                    Decision
                  </p>
                  <p className="text-sm leading-relaxed text-white/[0.74]">{row.decision}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* D. Ejemplos */}
      <motion.section
        className="px-4 py-20 sm:px-6 md:py-24 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={stagger}
      >
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            label="D / Ejemplos reales"
            title="No es teoria. Ya lo uso para operar productos y agentes."
            text="Los casos abajo muestran como Shape Up se aplica a productos tecnologicos, AI operations y programas de agentes con decisiones verificables."
          />

          <motion.div variants={stagger} className="mt-12 grid gap-4 md:grid-cols-3">
            {examples.map((example) => (
              <motion.article
                key={example.name}
                variants={fadeUp}
                className="border border-white/10 p-6"
              >
                <h3 className="text-xl font-semibold text-white">{example.name}</h3>
                <p className="mt-5 text-sm leading-relaxed text-white/[0.58]">{example.point}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* E. Next steps */}
      <motion.section
        id="next-steps"
        className="border-t border-white/10 bg-white/[0.025] px-4 py-20 sm:px-6 md:py-24 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.14 }}
        variants={stagger}
      >
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionTitle
              label="E / Next steps"
              title="Empezamos con una apuesta tech pequena."
              text="No vendo una transformacion gigante de entrada. Primero elegimos una oportunidad real de producto o IA, la shapeamos y corremos un ciclo con criterios claros."
            />
            <motion.div variants={fadeUp} className="mt-8">
              <Link
                href="/contact"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#08090b]"
              >
                Agendar conversacion
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          <motion.div variants={stagger} className="divide-y divide-white/10 border-y border-white/10">
            {nextSteps.map((step, index) => (
              <motion.div key={step} variants={fadeUp} className="flex gap-4 py-5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-200" />
                <p className="text-base leading-relaxed text-white/[0.72]">
                  <span className="mr-3 text-sm font-semibold text-white/[0.36]">0{index + 1}</span>
                  {step}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
