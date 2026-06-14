'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  Search,
  GitBranch,
  Bot,
  CheckCircle2,
  Award,
  User,
  Building2,
  Briefcase,
} from 'lucide-react';
import ToptalBadge from '@/components/ToptalBadge';

const EASE_SMOOTH = [0.6, -0.05, 0.01, 0.99] as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_SMOOTH },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const diagnosticSteps = [
  {
    icon: Search,
    step: '01',
    title: 'Diagnóstico de Organización',
    description:
      'Mapeamos tus procesos críticos, identificamos cuellos de botella y cuantificamos el costo real de las ineficiencias. Nos importan los números, no las suposiciones.',
  },
  {
    icon: GitBranch,
    step: '02',
    title: 'Diseño del Sistema',
    description:
      'Priorizamos las intervenciones con mayor impacto y diseñamos el sistema para resolverlas: puede ser un proceso rediseñado, una integración, o un agente de IA desplegado en producción.',
  },
  {
    icon: Bot,
    step: '03',
    title: 'Despliegue de Agentes (AaaS)',
    description:
      'Construimos e implementamos agentes de IA que corren procesos de negocio reales — calificación de leads, soporte, reportes, seguimiento — sin contratar más personal.',
  },
];

const aasCapabilities = [
  'Agentes que responden consultas y califican leads 24/7 (WhatsApp, Instagram, email)',
  'Automatización de reportes internos y consolidación de datos entre sistemas',
  'Flujos de onboarding y soporte que se ejecutan sin intervención humana',
  'Monitoreo y alertas inteligentes sobre KPIs operacionales',
  'Integración entre plataformas sin código frágil (CRM, ERP, ecommerce)',
  'Handoff inteligente al equipo humano en los momentos que importan',
];

const trackRecord = [
  {
    client: 'Ewaffle',
    descriptor: 'Plataforma de e-learning',
    result: '+40% conversión en 3 meses',
    detail:
      'Rediseño de presencia web y sistema de captura de leads con seguimiento automatizado.',
  },
  {
    client: 'Fidelidapp',
    descriptor: 'SaaS de fidelización para restaurantes',
    result: '-80% carga operacional manual',
    detail:
      'Dashboard de administración a medida y automatización de flujos de soporte al cliente.',
  },
  {
    client: 'Una multinacional de consumo masivo (Fortune 500)',
    descriptor: 'Engagement de transformación digital',
    result: 'Reducción de 25+ hrs semanales en procesos manuales',
    detail:
      'Implementación de sistema de IA para automatización de operaciones de ingresos y reportería.',
  },
  {
    client: 'Villelabs',
    descriptor: 'AI Consulting — proyectos propios',
    result: '3x rendimiento operacional',
    detail:
      'Construcción de agentes de IA internos para pipeline comercial, gestión de clientes y producción de contenido.',
  },
];

const credentials = [
  'Toptal Top 3% — Product Management',
  'SAFe Certified',
  'PSM I — Professional Scrum Master',
  'Ingeniería Industrial — Universidad de Chile',
  '10+ años liderando equipos de producto y operaciones',
  'PepsiCo · LATAM Airlines · NTT Data · CMPC',
];

const clientStrip = [
  'Ewaffle',
  'Fidelidapp',
  'Toptal',
  'PepsiCo',
  'LATAM Airlines',
  'CMPC',
];

export default function AsesoriaContent() {
  return (
    <main className="pt-24 md:pt-32 pb-16 md:pb-24">

      {/* ── HERO ── */}
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-medium tracking-wide">
            <Award className="w-3.5 h-3.5" />
            Consultora de Diagnóstico Organizacional
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight"
        >
          Tu empresa tiene más{' '}
          <span className="text-accent">ineficiencias</span> de las que crees.
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg text-white/50 font-light max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Hacemos un diagnóstico de tu organización, identificamos los procesos
          que están frenando el crecimiento, y los resolvemos — a veces con
          rediseño, a veces desplegando agentes de IA que trabajan por ti las
          24 horas.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-medium text-base hover:bg-accent/90 transition-all duration-300 shadow-accent-lg group"
          >
            Agenda un diagnóstico gratuito
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/diagnostic"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/10 text-white/70 font-light text-base hover:border-accent/30 hover:text-white transition-all duration-300"
          >
            Haz el diagnóstico digital
          </Link>
        </motion.div>
      </motion.div>

      {/* ── CÓMO FUNCIONA ── */}
      <motion.section
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4">
            Metodología
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-white">
            Diagnóstico → Sistema → Agentes
          </h2>
          <p className="text-white/40 text-base font-light mt-4 max-w-xl mx-auto">
            No llegamos a vender tecnología. Primero entendemos el problema real.
            Los agentes de IA son un resultado del diagnóstico, no el punto de partida.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {diagnosticSteps.map((step) => (
            <motion.div
              key={step.step}
              variants={itemVariants}
              className="group p-8 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-accent/20 hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/15 transition-colors">
                  <step.icon className="w-5 h-5 text-accent" />
                </div>
                <span className="text-accent/50 text-xs font-medium tracking-widest">
                  {step.step}
                </span>
              </div>
              <h3 className="text-white text-lg font-medium mb-3">{step.title}</h3>
              <p className="text-white/50 text-sm font-light leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── AAAS — QUÉ PUEDE HACER UN AGENTE ── */}
      <motion.section
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <div className="rounded-2xl border border-accent/10 bg-accent/[0.03] p-10 md:p-14">
          <motion.div variants={itemVariants} className="mb-10">
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4">
              Agent-as-a-Service (AaaS)
            </p>
            <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
              Un agente de IA no reemplaza personas. Libera a las personas para
              el trabajo que importa.
            </h2>
            <p className="text-white/50 font-light leading-relaxed max-w-2xl">
              Cuando el diagnóstico revela un proceso repetitivo, de alto volumen y
              bajo riesgo de error humano, desplegamos un agente que lo ejecuta de
              forma autónoma. Cada agente está diseñado, entrenado y monitoreado
              para tu caso específico.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-3">
            {aasCapabilities.map((cap) => (
              <motion.div
                key={cap}
                variants={itemVariants}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm font-light">{cap}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── QUIÉN SOY ── */}
      <motion.section
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4">
            Quién está detrás
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-white">
            Álvaro Villena
          </h2>
          <p className="text-accent/70 text-sm font-light mt-2">
            Fundador de Villelabs · AI + Operaciones · Santiago, Chile
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Bio */}
          <motion.div variants={itemVariants} className="space-y-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                <User className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">Álvaro Villena</p>
                <p className="text-white/40 text-xs font-light">
                  Fundador & Product Lead
                </p>
              </div>
            </div>

            <p className="text-white/60 font-light leading-relaxed text-sm">
              Ingeniero Industrial de la Universidad de Chile. Más de 10 años liderando
              equipos de producto y operaciones en empresas como PepsiCo, LATAM Airlines
              y startups de alto crecimiento — en Chile, Estados Unidos y Europa.
            </p>
            <p className="text-white/60 font-light leading-relaxed text-sm">
              Hoy construyo <strong className="text-white/80 font-normal">sistemas operacionales con IA</strong> para
              negocios que quieren escalar sin contratar el doble. No vendo software
              genérico: diagnostico, diseño y despliego — con métricas claras desde el
              día uno.
            </p>
            <p className="text-white/60 font-light leading-relaxed text-sm">
              Verificado como Top 3% Talent en Toptal, la red de freelancers de
              mayor exigencia a nivel global.
            </p>

            <div className="pt-4">
              <ToptalBadge />
            </div>
          </motion.div>

          {/* Credenciales */}
          <motion.div variants={itemVariants} className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-white/30 font-medium mb-6">
              Credenciales y experiencia
            </p>
            {credentials.map((cred) => (
              <div
                key={cred}
                className="flex items-center gap-3 p-4 rounded-lg border border-white/[0.06] bg-white/[0.02]"
              >
                <Award className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-white/60 text-sm font-light">{cred}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── CON QUIÉN HE TRABAJADO ── */}
      <motion.section
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4">
            Track record
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-white">
            Con quién he trabajado
          </h2>
          <p className="text-white/40 text-base font-light mt-4 max-w-lg mx-auto">
            Proyectos reales, métricas reales. Sin casos inflados ni promesas vacías.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {trackRecord.map((item) => (
            <motion.div
              key={item.client}
              variants={itemVariants}
              className="group p-8 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-accent/20 hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/15 transition-colors">
                  <Building2 className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{item.client}</p>
                  <p className="text-white/40 text-xs font-light">{item.descriptor}</p>
                </div>
              </div>
              <p className="text-accent text-base font-medium mb-2">{item.result}</p>
              <p className="text-white/50 text-sm font-light leading-relaxed">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Logo strip */}
        <motion.div variants={itemVariants} className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-white/20 font-medium mb-8">
            Empresas y plataformas con las que he colaborado
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {clientStrip.map((name) => (
              <span
                key={name}
                className="text-white/15 text-sm md:text-base font-light tracking-wider uppercase hover:text-white/30 transition-colors duration-300"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* ── CTA FINAL ── */}
      <motion.div
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.div
          variants={itemVariants}
          className="p-10 md:p-14 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
        >
          <Briefcase className="w-8 h-8 text-accent mx-auto mb-6" />
          <h3 className="text-2xl md:text-3xl font-light text-white mb-4">
            ¿Cuánto te está costando no saberlo?
          </h3>
          <p className="text-white/50 text-base font-light mb-8 max-w-md mx-auto leading-relaxed">
            El diagnóstico inicial es gratuito y dura 30 minutos. Sin presentación
            de ventas: solo un análisis honesto de dónde estás y qué tiene sentido
            hacer.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-medium text-base hover:bg-accent/90 transition-all duration-300 shadow-accent-lg group"
          >
            Agenda el diagnóstico gratuito
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
