'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Globe,
  LayoutDashboard,
  GraduationCap,
  FileSpreadsheet,
  TrendingDown,
  Clock,
  ChevronDown,
  Code2,
  Zap,
  Search,
  Rocket,
  BarChart3,
} from 'lucide-react';
import LandingContactForm from '@/components/LandingContactForm';

const EASE_SMOOTH = [0.6, -0.05, 0.01, 0.99] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
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
    question: 'Usas Excel para todo?',
    detail:
      'Un sistema a medida reemplaza planillas, reduce errores y centraliza la informacion de tu negocio.',
  },
  {
    icon: TrendingDown,
    question: 'Tu software actual no escala?',
    detail:
      'Construimos plataformas pensadas para crecer contigo, sin las limitaciones de herramientas genericas.',
  },
  {
    icon: Clock,
    question: 'Llevas meses esperando que la agencia termine?',
    detail:
      'Trabajamos en ciclos de 2-4 semanas con demos constantes. Ves avances reales, no promesas.',
  },
];

const services = [
  {
    icon: Globe,
    title: 'Aplicaciones Web',
    description:
      'Desde MVPs para validar tu idea hasta plataformas complejas con miles de usuarios. React, Next.js, Node.js.',
    pricing: 'Desde $2.000 USD',
  },
  {
    icon: LayoutDashboard,
    title: 'Sistemas de Gestion Interna',
    description:
      'CRM, ERP, dashboards a medida. Automatiza procesos internos y toma decisiones con datos en tiempo real.',
    pricing: 'Desde $3.000 USD',
  },
  {
    icon: GraduationCap,
    title: 'Plataformas E-Learning',
    description:
      'LMS corporativo, cursos online, capacitacion SENCE. Experiencia comprobada con universidades y empresas.',
    pricing: 'Desde $5.000 USD',
  },
];

const processSteps = [
  {
    icon: Search,
    step: '01',
    title: 'Briefing Estrategico',
    description:
      'Entendemos tu negocio, objetivos y usuarios. Definimos alcance, prioridades y metricas de exito.',
  },
  {
    icon: Rocket,
    step: '02',
    title: 'Desarrollo en Ciclos de 2-4 Semanas',
    description:
      'Construimos iterativamente con demos cada sprint. Ves avances reales y puedes ajustar en el camino.',
  },
  {
    icon: BarChart3,
    step: '03',
    title: 'Lanzamiento + Medicion',
    description:
      'Desplegamos a produccion, monitoreamos metricas y optimizamos basandonos en datos reales.',
  },
];

const caseStudies = [
  {
    name: 'Ewaffle',
    type: 'Plataforma E-Learning',
    result: 'Plataforma de cursos online con IA generativa para 20+ clientes corporativos',
  },
  {
    name: 'Fidelidapp',
    type: 'SaaS de Fidelizacion',
    result: 'Sistema de lealtad digital para +50 negocios con integracion MercadoPago',
  },
];

const faqs = [
  {
    question: 'Cuanto demora un proyecto tipico?',
    answer:
      'Un MVP puede estar listo en 4-6 semanas. Plataformas mas complejas toman 8-16 semanas, pero veras avances funcionales cada 2 semanas.',
  },
  {
    question: 'Que tecnologias usan?',
    answer:
      'TypeScript, React, Next.js, Node.js, NestJS, MongoDB, PostgreSQL. Elegimos la mejor herramienta segun tu caso, no la que este de moda.',
  },
  {
    question: 'Que pasa despues del lanzamiento?',
    answer:
      'Ofrecemos planes de mantenimiento y evolucion. Tu plataforma crece contigo con actualizaciones mensuales y soporte continuo.',
  },
  {
    question: 'Pueden integrarse con sistemas que ya tengo?',
    answer:
      'Si. Nos especializamos en integraciones: APIs, ERPs, CRMs, pasarelas de pago, herramientas de productividad y mas.',
  },
];

function scrollToForm() {
  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
}

export default function DesarrolloSoftwareContent() {
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
            Cotiza tu Proyecto
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
              <Code2 className="w-3.5 h-3.5" />
              Desarrollo de software en Chile
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight mb-6"
          >
            Desarrollo de Software{' '}
            <span className="text-accent font-normal">a Medida en Chile</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Aplicaciones web, plataformas y sistemas internos. Equipo chileno, metodologia agil, entregas en semanas.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-medium text-base hover:bg-accent/90 transition-all duration-300 shadow-accent-lg group"
            >
              Cotiza tu Proyecto Gratis
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
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
            Estos problemas te suenan?
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
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

      {/* Services */}
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
              Lo que construimos
            </p>
            <h2 className="text-2xl md:text-3xl font-light">
              Software que <span className="text-accent">resuelve problemas reales</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="group p-6 md:p-8 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-accent/20 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-5 group-hover:bg-accent/15 transition-colors">
                  <service.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-white text-lg font-medium mb-2">
                  {service.title}
                </h3>
                <p className="text-white/40 text-sm font-light leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className="flex items-center gap-2 text-accent/70 text-sm">
                  <Zap className="w-3.5 h-3.5" />
                  <span className="font-light italic">{service.pricing}</span>
                </div>
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
        <div className="max-w-4xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-3">
              Nuestro proceso
            </p>
            <h2 className="text-2xl md:text-3xl font-light">
              De la idea al producto <span className="text-accent">en semanas</span>
            </h2>
          </motion.div>
          <div className="flex flex-col gap-6">
            {processSteps.map((step) => (
              <motion.div
                key={step.step}
                variants={itemVariants}
                className="flex gap-5 p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]"
              >
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <span className="text-accent text-sm font-medium">{step.step}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-white text-base font-medium mb-1">
                    {step.title}
                  </h3>
                  <p className="text-white/40 text-sm font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
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
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={itemVariants} className="mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-3">
              Casos reales
            </p>
            <h2 className="text-2xl md:text-3xl font-light">
              Plataformas en produccion
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {caseStudies.map((cs) => (
              <motion.div
                key={cs.name}
                variants={itemVariants}
                className="p-6 md:p-8 rounded-xl border border-accent/20 bg-accent/5 text-left"
              >
                <div className="text-accent text-xs uppercase tracking-[0.2em] font-medium mb-2">
                  {cs.type}
                </div>
                <h3 className="text-white text-xl font-medium mb-3">
                  {cs.name}
                </h3>
                <p className="text-white/50 text-sm font-light leading-relaxed">
                  {cs.result}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section
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
            source="lp-desarrollo-software"
            heading="Cotiza tu proyecto"
            subtitle="Cuentanos que necesitas y te enviamos una propuesta en 48 horas."
            submitText="Enviar y continuar por WhatsApp"
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
