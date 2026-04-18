'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  BookOpen,
  Code2,
  Bot,
  Sparkles,
  Users,
  Palette,
  Target,
  Layers,
  ChevronDown,
  ArrowRight,
  Clock,
  GraduationCap,
  Zap,
  Brain,
  MessageSquare,
  Mail,
  BarChart3,
  DollarSign,
  Video,
  Shield,
  Workflow,
} from 'lucide-react';

/* ───────────────────────── Animation Primitives ───────────────────────── */

const EASE_SMOOTH = [0.6, -0.05, 0.01, 0.99] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_SMOOTH },
  },
};

const fadeUpFast = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_SMOOTH },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const staggerContainerFast = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const staggerContainerSlow = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_SMOOTH },
  },
};

/* ───────────────────────── Workshop Data ───────────────────────── */

const workshops = [
  {
    number: '01',
    title: 'Primeros Pasos en Vibe Coding',
    duration: '2-4 horas',
    format: 'Grabado',
    audience: 'Disenadores y Product Managers',
    modules: [
      { icon: BookOpen, title: 'Introduccion' },
      { icon: Layers, title: 'Ecosistema de herramientas' },
      { icon: Brain, title: 'Como hablarle a la IA' },
      { icon: Code2, title: 'Proyectos practicos' },
    ],
    build:
      'Paginas de conversion, paneles y flujos de onboarding usando solo prompts.',
    href: '/workshops/vibe-coding',
    accent: 'from-accent/20 to-accent/5',
  },
  {
    number: '02',
    title: 'Como Crear Agentes de IA',
    duration: '2-4 horas',
    format: 'Grabado',
    audience: 'Disenadores y PMs (requiere Curso 1)',
    modules: [
      { icon: Brain, title: 'Como piensa un agente' },
      { icon: Zap, title: 'Las 3 capacidades clave' },
      { icon: Layers, title: 'Herramientas del ecosistema' },
      { icon: Bot, title: 'Proyectos practicos' },
    ],
    build:
      'Agentes de research, feedback de diseno, y onboarding automatizado.',
    href: '/workshops/ai-agents',
    accent: 'from-accent/25 to-accent/5',
  },
  {
    number: '03',
    title: 'Lider del Futuro',
    duration: '8 semanas',
    format: '1:1',
    audience: 'Tech Leads, PMs y founders tecnicos',
    modules: [
      { icon: Workflow, title: 'Agile Product Management' },
      { icon: Code2, title: 'Vibe Coding' },
      { icon: Bot, title: 'Agentes a la medida' },
      { icon: Brain, title: 'Coaching ontologico' },
    ],
    build:
      'Claridad de rol, sistema agil, stack de IA y plan de 90 dias para liderar con mas criterio.',
    href: '/workshops/lider-del-futuro',
    accent: 'from-accent/20 to-accent/5',
  },
];

const valueProps = [
  {
    icon: Code2,
    title: 'Sin codigo previo',
    description:
      'No necesitas saber programar. Solo necesitas curiosidad y ganas de resolver problemas con nuevas herramientas.',
  },
  {
    icon: Target,
    title: 'Proyectos reales',
    description:
      'Cada modulo termina con un entregable concreto. Nada de teoria abstracta: construyes algo que funciona.',
  },
  {
    icon: Users,
    title: 'Para tu rol',
    description:
      'Contenido disenado especificamente para disenadores y Product Managers, no para desarrolladores.',
  },
];

const designerBenefits = [
  'Crear prototipos funcionales en minutos, no dias',
  'Validar ideas de diseno con codigo real sin depender de devs',
  'Automatizar tareas repetitivas de tu workflow',
  'Generar assets, copy y variaciones con IA',
];

const pmBenefits = [
  'Construir MVPs para validar hipotesis rapidamente',
  'Crear dashboards y herramientas internas',
  'Entender las capacidades reales de la IA para tomar mejores decisiones',
  'Disenar flujos de agentes que automatizan procesos del equipo',
];

/* ───────────────────────── Ecosystem Data ───────────────────────── */

const ecosystemNodes = [
  {
    id: 'moca',
    name: 'Moca',
    description: 'Agente Instagram DM',
    icon: MessageSquare,
    stat: '780+ conversaciones',
    color: '#E1306C',
    angle: 0,
  },
  {
    id: 'capu',
    name: 'Capu',
    description: 'Agente Gmail',
    icon: Mail,
    stat: '140+ contactos',
    color: '#EA4335',
    angle: 45,
  },
  {
    id: 'late',
    name: 'Late',
    description: 'Analisis de Ads IA',
    icon: BarChart3,
    stat: 'Meta + Google Ads',
    color: '#4285F4',
    angle: 90,
  },
  {
    id: 'fidelidapp',
    name: 'Fidelidapp',
    description: 'SaaS de Fidelizacion',
    icon: Shield,
    stat: '1.5M CLP MRR',
    color: '#10B981',
    angle: 135,
  },
  {
    id: 'ewaffle',
    name: 'Ewaffle Studio',
    description: 'Plataforma E-learning',
    icon: GraduationCap,
    stat: '20M CLP activos',
    color: '#F59E0B',
    angle: 180,
  },
  {
    id: 'finadmin',
    name: 'FinAdmin',
    description: 'Panel financiero',
    icon: DollarSign,
    stat: 'Multi-empresa',
    color: '#8B5CF6',
    angle: 225,
  },
  {
    id: 'videosgenerator',
    name: 'VideosGenerator',
    description: 'Produccion Automatizada',
    icon: Video,
    stat: 'Remotion + IA',
    color: '#EC4899',
    angle: 270,
  },
  {
    id: 'backlog',
    name: 'Backlog',
    description: 'PM Autonomo',
    icon: Layers,
    stat: 'Gestion agil IA',
    color: '#06B6D4',
    angle: 315,
  },
];

const ecosystemStats = [
  { value: '8', label: 'productos en produccion' },
  { value: '3', label: 'agentes IA activos 24/7' },
  { value: '100%', label: 'construido con IA + Vibe Coding' },
];

/* ───────────────────────── Component ───────────────────────── */

export default function WorkshopsContent() {
  return (
    <main className="relative overflow-hidden">
      {/* ─── Background decorative elements ─── */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[20%] -left-[10%] h-[600px] w-[600px] rounded-full bg-accent/[0.03] blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[10%] h-[500px] w-[500px] rounded-full bg-accent/[0.04] blur-[100px]" />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━ HERO ━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainerFast}
          className="max-w-4xl mx-auto"
        >
          {/* Label */}
          <motion.p
            variants={fadeUp}
            className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium mb-6"
          >
            Talleres Villelabs
          </motion.p>

          {/* Title */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white mb-8 leading-[1.05]"
          >
            Aprende a construir
            <br />
            con <span className="text-accent">IA</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto leading-relaxed mb-12"
          >
            Cursos practicos para disenadores y Product Managers que quieren
            usar IA como herramienta de trabajo — sin necesidad de saber
            programar.
          </motion.p>

          {/* Floating badges */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-3 mb-16"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs text-accent font-medium">
              <GraduationCap className="w-3.5 h-3.5" />
              Grabado
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-white/50 font-medium">
              <Clock className="w-3.5 h-3.5" />
              2-4 horas por curso
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-white/50 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              Sin codigo previo
            </span>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-6 h-6 text-white/20" />
          </motion.div>
        </motion.div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━ COURSE CARDS ━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainerSlow}
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {workshops.map((workshop) => (
            <motion.div
              key={workshop.number}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="group relative"
            >
              {/* Glow effect behind card on hover */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-accent/0 to-accent/0 group-hover:from-accent/20 group-hover:to-accent/5 transition-all duration-500 blur-sm" />

              {/* Card */}
              <div className="relative rounded-2xl border border-accent/20 bg-slate-900/60 backdrop-blur-sm p-8 md:p-10 transition-all duration-500 group-hover:border-accent/40 group-hover:shadow-[0_20px_60px_rgba(33,117,161,0.15)]">
                {/* Number badge */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 text-accent text-lg font-semibold mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                  {workshop.number}
                </div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4 leading-tight">
                  {workshop.title}
                </h2>

                {/* Duration + Format badge */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-flex items-center gap-1.5 text-sm text-white/40 font-light">
                    <Clock className="w-4 h-4 text-accent/60" />
                    {workshop.duration}
                  </span>
                  <span className="h-3 w-px bg-white/10" />
                  <span className="inline-flex items-center gap-1.5 text-sm text-white/40 font-light">
                    <GraduationCap className="w-4 h-4 text-accent/60" />
                    {workshop.format}
                  </span>
                </div>

                {/* Audience */}
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium mb-6">
                  {workshop.audience}
                </p>

                {/* Modules */}
                <div className="space-y-3 mb-8">
                  {workshop.modules.map((mod) => (
                    <div
                      key={mod.title}
                      className="flex items-center gap-3 group/mod"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] group-hover/mod:border-accent/20 transition-colors">
                        <mod.icon className="w-4 h-4 text-accent/70" />
                      </div>
                      <span className="text-sm text-white/60 font-light">
                        {mod.title}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                {/* What you'll build */}
                <div className="mb-8">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium mb-2">
                    Lo que construiras
                  </p>
                  <p className="text-sm text-white/50 font-light leading-relaxed">
                    {workshop.build}
                  </p>
                </div>

                {/* CTA */}
                <Link
                  href={workshop.href}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-all duration-300 shadow-accent-lg group/btn"
                >
                  Ver programa completo
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━ WHY THESE WORKSHOPS ━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative z-10 py-24 md:py-32">
        {/* Section background accent */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUpFast}
              className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium mb-4"
            >
              Por que estos workshops
            </motion.p>
            <motion.h2
              variants={fadeUpFast}
              className="text-3xl md:text-4xl lg:text-5xl font-light text-white"
            >
              Disenados para{' '}
              <span className="text-accent">profesionales</span>, no para devs
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {valueProps.map((prop) => (
              <motion.div
                key={prop.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="group relative"
              >
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-accent/0 to-accent/0 group-hover:from-accent/10 group-hover:to-transparent transition-all duration-500 blur-sm" />

                <div className="relative p-8 rounded-2xl border border-accent/20 bg-slate-900/60 backdrop-blur-sm transition-all duration-500 group-hover:border-accent/30">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent/15 transition-colors duration-300">
                    <prop.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-light text-white mb-3">
                    {prop.title}
                  </h3>
                  <p className="text-sm text-white/50 font-light leading-relaxed">
                    {prop.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━ WHO IS THIS FOR ━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative z-10 py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUpFast}
              className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium mb-4"
            >
              Para quien es esto
            </motion.p>
            <motion.h2
              variants={fadeUpFast}
              className="text-3xl md:text-4xl lg:text-5xl font-light text-white"
            >
              Dos perfiles,{' '}
              <span className="text-accent">una herramienta</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainerSlow}
            className="grid md:grid-cols-2 gap-0 md:gap-0"
          >
            {/* Designers column */}
            <motion.div
              variants={scaleIn}
              className="relative p-8 md:p-10 rounded-2xl md:rounded-r-none border border-accent/20 bg-slate-900/60 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Palette className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">
                    Disenadores
                  </p>
                  <h3 className="text-lg font-light text-white">
                    UI/UX, Graficos, Web
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                {designerBenefits.map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.3 + i * 0.1,
                      duration: 0.5,
                      ease: EASE_SMOOTH,
                    }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-accent" />
                    </div>
                    <p className="text-sm text-white/60 font-light leading-relaxed">
                      {benefit}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Product Managers column */}
            <motion.div
              variants={scaleIn}
              className="relative p-8 md:p-10 rounded-2xl md:rounded-l-none border border-accent/20 md:border-l-0 border-t-0 md:border-t bg-slate-900/60 backdrop-blur-sm"
            >
              {/* Animated vertical divider (desktop only) */}
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8, ease: EASE_SMOOTH }}
                className="hidden md:block absolute left-0 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent origin-top"
              />

              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">
                    Product Managers
                  </p>
                  <h3 className="text-lg font-light text-white">
                    Producto, Agile, Estrategia
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                {pmBenefits.map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.3 + i * 0.1,
                      duration: 0.5,
                      ease: EASE_SMOOTH,
                    }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                      <Zap className="w-3 h-3 text-accent" />
                    </div>
                    <p className="text-sm text-white/60 font-light leading-relaxed">
                      {benefit}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━ LO QUE YO HE CONSTRUIDO ━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative z-10 py-24 md:py-32 overflow-hidden">
        {/* Section background */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center mb-16 md:mb-20"
          >
            <motion.p
              variants={fadeUpFast}
              className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium mb-4"
            >
              Prueba real
            </motion.p>
            <motion.h2
              variants={fadeUpFast}
              className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6"
            >
              Lo que yo he{' '}
              <span className="text-accent">construido</span>
            </motion.h2>
            <motion.p
              variants={fadeUpFast}
              className="text-base md:text-lg text-white/50 font-light max-w-3xl mx-auto leading-relaxed"
            >
              Un ecosistema completo de agentes de IA, plataformas y
              automatizacion — todo hecho con las mismas tecnicas que enseno
              en estos workshops.
            </motion.p>
          </motion.div>

          {/* ── Architecture Diagram (Desktop: radial, Mobile: grid) ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="mb-16 md:mb-20"
          >
            {/* Desktop radial layout */}
            <div className="hidden md:block">
              <div className="relative w-full max-w-[700px] mx-auto" style={{ aspectRatio: '1 / 1' }}>
                {/* SVG connection lines */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 700 700"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    {ecosystemNodes.map((node) => (
                      <linearGradient
                        key={`grad-${node.id}`}
                        id={`line-grad-${node.id}`}
                        x1="50%"
                        y1="50%"
                        x2={`${50 + 40 * Math.cos((node.angle * Math.PI) / 180)}%`}
                        y2={`${50 - 40 * Math.sin((node.angle * Math.PI) / 180)}%`}
                      >
                        <stop offset="0%" stopColor="#2175a1" stopOpacity="0.6" />
                        <stop offset="100%" stopColor={node.color} stopOpacity="0.4" />
                      </linearGradient>
                    ))}
                  </defs>
                  {ecosystemNodes.map((node, i) => {
                    const cx = 350;
                    const cy = 350;
                    const radius = 250;
                    const rad = (node.angle * Math.PI) / 180;
                    const ex = cx + radius * Math.cos(rad);
                    const ey = cy - radius * Math.sin(rad);
                    // Bezier control point — offset perpendicular to the line
                    const midX = (cx + ex) / 2;
                    const midY = (cy + ey) / 2;
                    const perpX = -(ey - cy) * 0.15;
                    const perpY = (ex - cx) * 0.15;
                    const cpx = midX + perpX;
                    const cpy = midY + perpY;

                    return (
                      <motion.path
                        key={`line-${node.id}`}
                        d={`M ${cx} ${cy} Q ${cpx} ${cpy} ${ex} ${ey}`}
                        stroke={`url(#line-grad-${node.id})`}
                        strokeWidth="1.5"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          pathLength: {
                            delay: 0.4 + i * 0.1,
                            duration: 0.8,
                            ease: EASE_SMOOTH,
                          },
                          opacity: {
                            delay: 0.4 + i * 0.1,
                            duration: 0.3,
                          },
                        }}
                      />
                    );
                  })}
                </svg>

                {/* Center node — Vilo */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE_SMOOTH }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <div className="relative flex flex-col items-center">
                    {/* Glow ring */}
                    <div className="absolute -inset-3 rounded-full bg-accent/20 blur-xl animate-pulse" />
                    <div className="relative w-24 h-24 rounded-full border-2 border-accent bg-slate-900/90 backdrop-blur-sm flex items-center justify-center shadow-[0_0_40px_rgba(33,117,161,0.3)]">
                      <Bot className="w-10 h-10 text-accent" />
                    </div>
                    <span className="mt-2 text-sm font-medium text-white">
                      Vilo
                    </span>
                    <span className="text-[10px] text-white/40 font-light">
                      Coordinador IA
                    </span>
                  </div>
                </motion.div>

                {/* Surrounding nodes */}
                {ecosystemNodes.map((node, i) => {
                  const radius = 250;
                  const rad = (node.angle * Math.PI) / 180;
                  // Position from center of 700x700 container
                  const x = 350 + radius * Math.cos(rad);
                  const y = 350 - radius * Math.sin(rad);

                  return (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.3 + i * 0.1,
                        duration: 0.5,
                        ease: EASE_SMOOTH,
                      }}
                      whileHover={{ scale: 1.12 }}
                      className="absolute z-10 flex flex-col items-center cursor-default group/node"
                      style={{
                        left: `${(x / 700) * 100}%`,
                        top: `${(y / 700) * 100}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      {/* Node circle */}
                      <div
                        className="relative w-16 h-16 rounded-full border bg-slate-900/80 backdrop-blur-sm flex items-center justify-center transition-shadow duration-300 group-hover/node:shadow-lg"
                        style={{
                          borderColor: `${node.color}66`,
                          boxShadow: `0 0 0 0 ${node.color}00`,
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${node.color}33`;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0 ${node.color}00`;
                        }}
                      >
                        <node.icon
                          className="w-7 h-7"
                          style={{ color: node.color }}
                        />
                      </div>
                      {/* Label */}
                      <span className="mt-1.5 text-xs font-medium text-white whitespace-nowrap">
                        {node.name}
                      </span>
                      <span className="text-[10px] text-white/40 font-light whitespace-nowrap">
                        {node.description}
                      </span>
                      {/* Stat badge */}
                      <span
                        className="mt-1 inline-block rounded-full px-2 py-0.5 text-[9px] font-medium whitespace-nowrap"
                        style={{
                          backgroundColor: `${node.color}15`,
                          color: node.color,
                          border: `1px solid ${node.color}30`,
                        }}
                      >
                        {node.stat}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Mobile grid layout */}
            <div className="md:hidden">
              {/* Center Vilo node */}
              <motion.div
                variants={scaleIn}
                className="flex flex-col items-center mb-8"
              >
                <div className="relative">
                  <div className="absolute -inset-3 rounded-full bg-accent/20 blur-xl animate-pulse" />
                  <div className="relative w-20 h-20 rounded-full border-2 border-accent bg-slate-900/90 backdrop-blur-sm flex items-center justify-center shadow-[0_0_30px_rgba(33,117,161,0.3)]">
                    <Bot className="w-9 h-9 text-accent" />
                  </div>
                </div>
                <span className="mt-2 text-sm font-medium text-white">
                  Vilo
                </span>
                <span className="text-[10px] text-white/40 font-light">
                  Coordinador IA
                </span>
              </motion.div>

              {/* Grid of product nodes */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={staggerContainerFast}
                className="grid grid-cols-2 gap-3"
              >
                {ecosystemNodes.map((node) => (
                  <motion.div
                    key={node.id}
                    variants={fadeUpFast}
                    className="relative p-4 rounded-xl border bg-slate-900/60 backdrop-blur-sm"
                    style={{ borderColor: `${node.color}30` }}
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: `${node.color}15`,
                          border: `1px solid ${node.color}30`,
                        }}
                      >
                        <node.icon
                          className="w-4.5 h-4.5"
                          style={{ color: node.color }}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-white truncate">
                          {node.name}
                        </p>
                        <p className="text-[10px] text-white/40 font-light truncate">
                          {node.description}
                        </p>
                      </div>
                    </div>
                    <span
                      className="inline-block rounded-full px-2 py-0.5 text-[9px] font-medium"
                      style={{
                        backgroundColor: `${node.color}15`,
                        color: node.color,
                        border: `1px solid ${node.color}30`,
                      }}
                    >
                      {node.stat}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* ── Stat Cards ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
          >
            {ecosystemStats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="relative p-6 rounded-2xl border border-accent/20 bg-slate-900/60 backdrop-blur-sm text-center group hover:border-accent/30 transition-colors duration-300"
              >
                <p className="text-3xl md:text-4xl font-light text-accent mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-white/50 font-light">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Description Text ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-base md:text-lg text-white/45 font-light leading-relaxed">
              Este ecosistema conecta agentes de IA que manejan Instagram,
              Gmail y analisis de campanas, con plataformas SaaS que generan
              revenue, un dashboard financiero, y un sistema de video
              automatizado — todo coordinado por un agente central que actua
              como PM autonomo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━ FINAL CTA ━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative z-10 py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div
              variants={scaleIn}
              className="relative p-10 md:p-16 rounded-2xl border border-accent/20 bg-slate-900/60 backdrop-blur-sm overflow-hidden"
            >
              {/* Decorative gradient inside CTA card */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/[0.05] via-transparent to-accent/[0.02]" />

              <div className="relative">
                <motion.div
                  variants={fadeUpFast}
                  className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-8"
                >
                  <Sparkles className="w-8 h-8 text-accent" />
                </motion.div>

                <motion.h2
                  variants={fadeUpFast}
                  className="text-3xl md:text-4xl font-light text-white mb-4"
                >
                  Listo para empezar?
                </motion.h2>

                <motion.p
                  variants={fadeUpFast}
                  className="text-base text-white/50 font-light mb-10 max-w-md mx-auto leading-relaxed"
                >
                  Escribe por WhatsApp y te cuento como acceder a los workshops.
                  Sin compromiso, sin spam.
                </motion.p>

                <motion.div variants={fadeUpFast}>
                  <a
                    href={`https://wa.me/56920115198?text=${encodeURIComponent(
                      'Hola! Me interesa saber mas sobre los workshops de IA de Villelabs.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-medium text-base hover:bg-accent/90 transition-all duration-300 shadow-accent-lg group"
                  >
                    Quiero saber mas
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Bottom spacer */}
      <div className="h-16" />
    </main>
  );
}
