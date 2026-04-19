'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ChevronDown,
  FileSpreadsheet,
  Workflow,
  Users,
  Database,
  TrendingUp,
  ClipboardList,
  Hammer,
  LineChart,
} from 'lucide-react';
import LandingContactForm from '@/components/LandingContactForm';

const EASE_SMOOTH = [0.6, -0.05, 0.01, 0.99] as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_SMOOTH },
  },
};

const painPoints = [
  {
    icon: FileSpreadsheet,
    question: 'Tu equipo pasa horas copiando datos entre Excels?',
    detail:
      'Centralizamos la informacion en un sistema unico con validaciones y permisos por rol.',
  },
  {
    icon: Users,
    question: 'El conocimiento vive en la carpeta personal de cada persona?',
    detail:
      'Un sistema a medida convierte conocimiento tacito en procesos documentados y escalables.',
  },
  {
    icon: Workflow,
    question: 'Ningun software del mercado calza con tu operacion?',
    detail:
      'No adaptamos un ERP generico. Construimos el sistema que tu operacion realmente necesita.',
  },
  {
    icon: Database,
    question: 'Ya implementaron un ERP y quedo a medias?',
    detail:
      'Co-disenamos la UX con tu equipo desde el sprint 1 para que esta vez si lo usen.',
  },
];

const process = [
  {
    icon: ClipboardList,
    step: '01',
    title: 'Diagnostico operativo',
    description:
      'Llamada con tu equipo operativo. Mapeamos procesos, Excels y dolores. Sin costo.',
  },
  {
    icon: Hammer,
    step: '02',
    title: 'Construccion por modulos',
    description:
      'Entregamos modulo a modulo. Tu equipo lo usa desde la semana 3 y vamos ajustando con su feedback.',
  },
  {
    icon: LineChart,
    step: '03',
    title: 'Migracion y lanzamiento',
    description:
      'Migramos tu data actual en Excel. Capacitacion al equipo y 30 dias de soporte incluidos.',
  },
];

const caseStudies = [
  {
    name: 'Conexion Industrial',
    category: 'Plataforma B2B industrial',
    result: '+300% empresas registradas',
  },
  {
    name: 'Fidelidapp',
    category: 'Dashboard operativo',
    result: '-80% soporte manual',
  },
  {
    name: 'Progreso',
    category: 'Plataforma financiera digital',
    result: 'De Excel a sistema',
  },
];

const stats = [
  { value: '3-5 sem', label: 'Primera version usable' },
  { value: '+50', label: 'Empresas atendidas' },
  { value: '100%', label: 'A medida de tu operacion' },
];

const faqs = [
  {
    question: 'Cuanto cuesta un sistema a medida?',
    answer:
      'Entre $2M y $6M CLP para una primera version funcional. En el diagnostico te damos un rango acotado segun tu operacion y te mostramos que incluye cada modulo.',
  },
  {
    question: 'En cuanto tiempo queda listo?',
    answer:
      '3 a 5 semanas para la primera version usable. Modulos adicionales se agregan por sprints mensuales despues del lanzamiento.',
  },
  {
    question: 'Como se que mi equipo lo va a usar?',
    answer:
      'Hacemos onboarding con el equipo y co-disenamos la UX con los usuarios reales desde el sprint 1. Si no lo usan, no sirve, y nosotros vivimos de que funcione.',
  },
  {
    question: 'Que pasa con la data actual en Excel?',
    answer:
      'La migramos. Es parte del proceso. Validamos los datos, limpiamos duplicados y los cargamos al sistema nuevo antes del lanzamiento.',
  },
  {
    question: 'Puedo pedir cambios despues?',
    answer:
      'Si. Ofrecemos planes de mantencion y iteracion mensual. Muchos clientes siguen con nosotros 6-12 meses agregando modulos.',
  },
  {
    question: 'Se integra con lo que ya uso (SII, bancos, etc)?',
    answer:
      'La mayoria de servicios chilenos si: SII, Transbank, Previred, bancos principales. Lo confirmamos en el diagnostico segun tu stack actual.',
  },
  {
    question: 'De quien es el codigo?',
    answer:
      'Tuyo. Te entregamos el repositorio y la infraestructura. Puedes cambiar de equipo cuando quieras sin quedar atado a nosotros.',
  },
];

function scrollToForm() {
  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
}

export default function SistemaPymeContent() {
  return (
    <main className="relative w-full bg-slate-950 text-white">
      {/* Minimal header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/icono.png"
              alt="Villelabs"
              width={28}
              height={28}
              className="object-contain"
            />
            <span className="text-white/70 text-sm font-light">Villelabs</span>
          </Link>
          <button
            onClick={scrollToForm}
            className="px-4 py-2 rounded-full bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors"
          >
            Agenda una llamada
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-accent/8 rounded-full blur-[120px]" />
        </div>

        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-medium tracking-wide">
              <Workflow className="w-3.5 h-3.5" />
              Software a medida para PyMEs
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight mb-6"
          >
            Reemplaza tus Excels por un{' '}
            <span className="text-accent font-normal">sistema a medida</span>{' '}
            que tu equipo realmente use.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Disenamos y construimos plataformas internas para PyMEs. Automatiza lo manual, centraliza la informacion, escala sin caos.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-medium text-base hover:bg-accent/90 transition-all duration-300 shadow-accent-lg group"
            >
              Agenda una llamada de diagnostico
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-white/40 text-sm font-light"
          >
            30 minutos · Sin costo · +50 empresas atendidas · Desde Santiago
          </motion.p>
        </motion.div>
      </section>

      {/* Pain Points */}
      <motion.section
        className="py-16 md:py-24 px-4 sm:px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl font-light text-center mb-12"
          >
            Tu operacion se ve asi?
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {painPoints.map((point) => (
              <motion.div
                key={point.question}
                variants={itemVariants}
                className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-accent/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                  <point.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-white text-base font-medium mb-2">
                  {point.question}
                </h3>
                <p className="text-white/40 text-sm font-light leading-relaxed">
                  {point.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Process */}
      <motion.section
        className="py-16 md:py-24 px-4 sm:px-6 border-t border-white/[0.04]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-3">
              Como trabajamos
            </p>
            <h2 className="text-2xl md:text-3xl font-light">
              Del Excel al sistema en 3 pasos
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {process.map((step) => (
              <motion.div
                key={step.step}
                variants={itemVariants}
                className="relative p-6 md:p-8 rounded-xl border border-white/[0.06] bg-white/[0.02]"
              >
                <div className="absolute top-4 right-4 text-accent/30 text-4xl font-light">
                  {step.step}
                </div>
                <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-5">
                  <step.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-white text-lg font-medium mb-2">
                  {step.title}
                </h3>
                <p className="text-white/40 text-sm font-light leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Social Proof */}
      <motion.section
        className="py-16 md:py-24 px-4 sm:px-6 border-t border-white/[0.04]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.div variants={itemVariants} className="mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-3">
              Empresas que ya confian en nosotros
            </p>
            <h2 className="text-2xl md:text-3xl font-light">
              Casos reales en operaciones como la tuya
            </h2>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-12"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-4xl font-light text-accent mb-1">
                  {stat.value}
                </div>
                <div className="text-white/40 text-xs md:text-sm font-light">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-3 gap-4"
          >
            {caseStudies.map((c) => (
              <div
                key={c.name}
                className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] text-left"
              >
                <div className="text-white text-base font-medium mb-1">
                  {c.name}
                </div>
                <div className="text-white/40 text-xs font-light mb-3">
                  {c.category}
                </div>
                <div className="flex items-center gap-2 text-accent text-sm">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span className="font-light">{c.result}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section
        id="faq"
        className="py-16 md:py-24 px-4 sm:px-6 border-t border-white/[0.04]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="max-w-3xl mx-auto">
          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl font-light text-center mb-12"
          >
            Preguntas frecuentes
          </motion.h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <motion.details
                key={faq.question}
                variants={itemVariants}
                className="group p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] cursor-pointer"
              >
                <summary className="flex items-center justify-between text-white font-medium text-sm md:text-base list-none">
                  {faq.question}
                  <ChevronDown className="w-4 h-4 text-white/40 transition-transform group-open:rotate-180 shrink-0 ml-4" />
                </summary>
                <p className="text-white/40 text-sm font-light leading-relaxed mt-3 pt-3 border-t border-white/[0.06]">
                  {faq.answer}
                </p>
              </motion.details>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA + Contact Form */}
      <section
        id="contact-form"
        className="py-16 md:py-24 px-4 sm:px-6 border-t border-white/[0.04] relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-xl mx-auto">
          <LandingContactForm
            source="lp-sistema-pyme"
            heading="Agenda tu llamada de diagnostico"
            subtitle="30 minutos sin costo. Mapeamos tu operacion actual y te proponemos un alcance concreto."
          />
        </div>
      </section>

      {/* Minimal footer */}
      <footer className="py-6 px-4 border-t border-white/[0.04] text-center">
        <p className="text-white/20 text-xs font-light">
          Villelabs &copy; {new Date().getFullYear()} &mdash;{' '}
          <Link href="/privacidad" className="hover:text-white/40 transition-colors">
            Privacidad
          </Link>{' '}
          &middot;{' '}
          <Link href="/terminos" className="hover:text-white/40 transition-colors">
            Terminos
          </Link>
        </p>
      </footer>
    </main>
  );
}
