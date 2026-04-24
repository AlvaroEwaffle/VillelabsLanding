'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  Bot,
  Brain,
  Briefcase,
  CheckCircle2,
  Code2,
  Compass,
  MessageSquareWarning,
  Sparkles,
  Target,
  Users,
  Workflow,
} from 'lucide-react';
import { DISCOVERY_CALL_URL } from '@/lib/scheduling';

const DISCOVERY_URL = DISCOVERY_CALL_URL;
const WHATSAPP_URL =
  'https://wa.me/56920115198?text=Hola%20Alvaro%2C%20vi%20Lider%20del%20Futuro%20en%20villelabs.cl%20y%20quiero%20saber%20si%20calza%20conmigo.';

const EASE_SMOOTH = [0.6, -0.05, 0.01, 0.99] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_SMOOTH },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: EASE_SMOOTH },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const profiles = [
  {
    title: 'Dev o engineer recien promovido',
    description:
      'Pasaste de hacer tu mismo a depender de que otros hagan. El sindrome del impostor golpea fuerte y el equipo espera certezas que todavia no sientes.',
  },
  {
    title: 'PM junior con responsabilidad real',
    description:
      'Ahora el roadmap depende de ti. Hay presion, backlog, stakeholders empujando y una sensacion constante de que nadie te enseno a sostener ese juego.',
  },
  {
    title: 'Founder tecnico que necesita escalar',
    description:
      'Tu producto existe porque lo construiste tu. Pero ya no puedes construirlo todo. Necesitas estructura, delegacion e IA aplicada para no frenar el negocio.',
  },
];

const pillars = [
  {
    icon: Workflow,
    title: 'Agile Product Management',
    description:
      'Priorizacion con criterio, ritmos de trabajo que si aterrizan en tu contexto y conversaciones con negocio sin perder profundidad tecnica.',
  },
  {
    icon: Code2,
    title: 'Vibe Coding',
    description:
      'Prototipar en horas, validar antes y mantener credibilidad tecnica sin volver a hacer todo tu mismo.',
  },
  {
    icon: Bot,
    title: 'Agentes a la Medida',
    description:
      'Disenas y despliegas un agente que automatiza trabajo repetitivo de tu rol para liberar energia mental y multiplicar output.',
  },
  {
    icon: Brain,
    title: 'Coaching Ontologico',
    description:
      'Feedback dificil, presencia, conflicto, creencias limitantes y la parte interna del liderazgo que nadie resuelve con frameworks.',
  },
];

const painPoints = [
  {
    icon: Briefcase,
    title: 'Buen tecnico, rol nuevo',
    description:
      'Eras fuerte resolviendo. Ahora te toca liderar, alinear y decidir bajo presion. Y sientes que el piso se movio completo.',
  },
  {
    icon: MessageSquareWarning,
    title: 'Conversaciones que sigues evitando',
    description:
      'Feedback dificil, expectativas bajas, conflicto con stakeholders. Cada semana que postergas eso, lideras menos de lo que crees.',
  },
  {
    icon: Sparkles,
    title: 'La IA te da mas ruido que claridad',
    description:
      'Todos hablan de agentes y automatizacion, pero nadie te muestra como bajarlo a tu trabajo real sin perder criterio ni tiempo.',
  },
  {
    icon: Target,
    title: 'Mas responsabilidad, menos foco',
    description:
      'Mas reuniones, mas frentes, mas presion. Menos espacio para pensar con calma y menos estructura para sostener el nuevo rol.',
  },
];

const roadmap = [
  {
    phase: 'Semanas 1-2',
    title: 'Diagnostico y claridad de rol',
    description:
      'Mapeamos tu momento actual, tus tensiones reales y el tipo de liderazgo que necesitas construir para este siguiente nivel.',
  },
  {
    phase: 'Semanas 3-4',
    title: 'Tu sistema agil',
    description:
      'Instalamos un ritmo de trabajo mas claro: priorizacion, sprints, rituales y un lenguaje comun entre equipo y negocio.',
  },
  {
    phase: 'Semanas 5-6',
    title: 'Tu stack de IA',
    description:
      'Construimos juntos una capa real de IA aplicada a tu rol: prototipado, automatizacion o agentes que si ayuden en el dia a dia.',
  },
  {
    phase: 'Semanas 7-8',
    title: 'Integracion y plan 90 dias',
    description:
      'Consolidamos una forma de liderar mas estable y armamos un plan de 90 dias para que el cambio no se diluya al volver a la urgencia.',
  },
];

const outcomes = [
  'Una forma mas clara de liderar sin sentir que improvisas todos los dias.',
  'Un sistema de trabajo mas estable para priorizar, decidir y bajar ruido.',
  'Una aplicacion real de IA en tu contexto, no solo ideas o teoria.',
  'Mas criterio para conversaciones dificiles, foco y manejo del nuevo rol.',
];

const proof = [
  { value: '50+', label: 'profesionales IT acompanados' },
  { value: '10+', label: 'anos liderando producto y equipos' },
  { value: 'Top 3%', label: 'Toptal global en product management' },
];

export default function LiderDelFuturoContent() {
  return (
    <main className="relative overflow-hidden pt-24 md:pt-28">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[12%] left-[-8%] h-[520px] w-[520px] rounded-full bg-accent/[0.05] blur-[110px]" />
        <div className="absolute bottom-[8%] right-[-10%] h-[440px] w-[440px] rounded-full bg-accent/[0.04] blur-[90px]" />
      </div>

      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pb-20 pt-10 md:pb-28 md:pt-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mx-auto max-w-6xl"
        >
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <motion.p
                variants={fadeUp}
                className="mb-6 text-[10px] font-medium uppercase tracking-[0.2em] text-white/40"
              >
                Coaching intensivo · 8 semanas · 1:1 con Alvaro
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="max-w-4xl text-5xl font-light leading-[1.02] text-white sm:text-6xl md:text-7xl lg:text-8xl"
              >
                Pasaste a liderar.
                <br />
                <span className="text-accent">Y ahora?</span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-white/55 md:text-xl"
              >
                Tomaste un rol de liderazgo en IT y nadie te entrego el manual.
                Este programa existe para eso: Agile real, IA que trabaja para ti
                y el trabajo interno que separa a un manager de un lider de verdad.
              </motion.p>
              <motion.div
                variants={fadeUp}
                className="mt-10 flex flex-col gap-3 sm:flex-row"
              >
                <a
                  href={DISCOVERY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-accent/90 shadow-accent-lg"
                >
                  Agendar llamada
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-7 py-4 text-sm font-light text-white/70 transition-colors duration-300 hover:border-accent/30 hover:text-white"
                >
                  Hablar por WhatsApp
                </a>
              </motion.div>
            </div>

            <motion.div
              variants={fadeIn}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 md:p-8 backdrop-blur-sm"
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent/80">
                Esto es para ti si
              </p>
              <div className="mt-6 space-y-4">
                {[
                  'Te promovieron y sientes que el rol te exige habilidades que nadie te enseno.',
                  'Sigues siendo fuerte tecnicamente, pero ahora necesitas criterio para mover personas y prioridades.',
                  'Quieres usar IA como ventaja real, no como ruido adicional.',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                    <p className="text-sm font-light leading-relaxed text-white/60">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/5 pt-6">
                {proof.map((item) => (
                  <div key={item.label}>
                    <p className="text-2xl font-light text-accent">{item.value}</p>
                    <p className="mt-1 text-xs font-light leading-relaxed text-white/35">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 px-4 py-20 sm:px-6 lg:px-8 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mx-auto max-w-6xl"
        >
          <motion.div variants={fadeUp} className="mb-12 max-w-3xl">
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
              Para quien es
            </p>
            <h2 className="text-3xl font-light text-white md:text-5xl">
              Tecnica fuerte.
              <span className="text-accent"> Liderazgo nuevo.</span>
            </h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-3">
            {profiles.map((profile) => (
              <motion.div
                key={profile.title}
                variants={fadeUp}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 transition-colors duration-300 hover:border-accent/20 hover:bg-white/[0.04]"
              >
                <p className="mb-4 text-sm font-medium text-white">{profile.title}</p>
                <p className="text-sm font-light leading-relaxed text-white/55">
                  {profile.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 px-4 py-16 sm:px-6 lg:px-8 md:py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="mx-auto max-w-5xl rounded-[2rem] border border-accent/15 bg-gradient-to-br from-accent/10 via-white/[0.03] to-transparent px-8 py-12 text-center backdrop-blur-sm md:px-12 md:py-16"
        >
          <motion.p
            variants={fadeUp}
            className="mb-5 text-[10px] font-medium uppercase tracking-[0.2em] text-white/40"
          >
            Idea central
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-4xl font-light leading-tight text-white md:text-6xl"
          >
            La IA no reemplaza al lider.
            <span className="text-accent"> Lo amplifica.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-white/55 md:text-lg"
          >
            Pero solo si sabes como usarla con criterio, con foco y con una
            estructura real de liderazgo. Si no, solo agrega ruido.
          </motion.p>
        </motion.div>
      </section>

      <section className="relative z-10 px-4 py-20 sm:px-6 lg:px-8 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mx-auto max-w-6xl"
        >
          <motion.div variants={fadeUp} className="mb-12 max-w-3xl">
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
              El programa
            </p>
            <h2 className="text-3xl font-light text-white md:text-5xl">
              Cuatro capas.
              <span className="text-accent"> Una transicion real.</span>
            </h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {pillars.map((pillar) => (
              <motion.div
                key={pillar.title}
                variants={fadeUp}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/10">
                  <pillar.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mb-3 text-lg font-medium text-white">{pillar.title}</h3>
                <p className="text-sm font-light leading-relaxed text-white/55">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 px-4 py-20 sm:px-6 lg:px-8 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mx-auto max-w-6xl"
        >
          <motion.div variants={fadeUp} className="mb-12 max-w-3xl">
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
              Los desafios reales
            </p>
            <h2 className="text-3xl font-light text-white md:text-5xl">
              Lo que casi nadie te dice
              <span className="text-accent"> cuando te promueven.</span>
            </h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2">
            {painPoints.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                  <item.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-white">{item.title}</h3>
                <p className="text-sm font-light leading-relaxed text-white/55">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 px-4 py-20 sm:px-6 lg:px-8 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mx-auto max-w-5xl"
        >
          <motion.div variants={fadeUp} className="mb-12 text-center">
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
              El camino
            </p>
            <h2 className="text-3xl font-light text-white md:text-5xl">
              8 semanas.
              <span className="text-accent"> Sin relleno.</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {roadmap.map((step) => (
              <motion.div
                key={step.phase}
                variants={fadeUp}
                className="grid gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:grid-cols-[160px_1fr] md:items-start md:p-7"
              >
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent/80">
                    {step.phase}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white">{step.title}</h3>
                  <p className="mt-2 text-sm font-light leading-relaxed text-white/55">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 px-4 py-20 sm:px-6 lg:px-8 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mx-auto max-w-6xl"
        >
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <motion.div variants={fadeUp}>
              <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
                Lo que te llevas
              </p>
              <h2 className="text-3xl font-light text-white md:text-5xl">
                Menos improvisacion.
                <span className="text-accent"> Mas criterio.</span>
              </h2>
              <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-white/55">
                La meta no es que salgas con mas teoria. Es que salgas con una
                forma mas clara de liderar, una estructura que te sostenga y una
                aplicacion real de IA en tu trabajo.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7"
            >
              <div className="space-y-4">
                {outcomes.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Compass className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                    <p className="text-sm font-light leading-relaxed text-white/60">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 px-4 pb-28 pt-10 sm:px-6 lg:px-8 md:pb-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mx-auto max-w-4xl rounded-[2rem] border border-accent/15 bg-white/[0.03] p-8 text-center backdrop-blur-sm md:p-14"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-[10px] font-medium uppercase tracking-[0.2em] text-accent/80"
          >
            Cupos limitados
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-4xl font-light leading-tight text-white md:text-6xl"
          >
            30 minutos.
            <br />
            <span className="text-accent">Sin pitch.</span> Solo verdad.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-white/55 md:text-lg"
          >
            Una llamada para ver si este programa calza con tu momento. Si no
            calza, te lo digo. Si calza, empezamos con claridad.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href={DISCOVERY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-accent/90 shadow-accent-lg"
            >
              Agendar llamada de descubrimiento
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/workshops"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-8 py-4 text-sm font-light text-white/70 transition-colors duration-300 hover:border-accent/30 hover:text-white"
            >
              Ver otros programas
            </Link>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="mt-5 inline-flex items-center gap-2 text-xs font-light uppercase tracking-[0.16em] text-white/35"
          >
            <Users className="h-3.5 w-3.5 text-accent/70" />
            Solo 4 cupos disponibles este mes
          </motion.p>
        </motion.div>
      </section>
    </main>
  );
}
