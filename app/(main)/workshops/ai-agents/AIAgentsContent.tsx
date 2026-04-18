'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Bot,
  Brain,
  Cpu,
  Zap,
  Search,
  Mail,
  Database,
  ArrowRight,
  ArrowLeft,
  Clock,
  AlertTriangle,
  Shield,
  RefreshCw,
  Eye,
  Lightbulb,
  MessageSquare,
  FileText,
  CheckCircle2,
  ChevronDown,
  Layers,
  GitBranch,
  Workflow,
  Wrench,
  Globe,
  BookOpen,
  ExternalLink,
  Code,
  Users,
  HelpCircle,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   DESIGN TOKENS
   ───────────────────────────────────────────── */

const EASE_SMOOTH = [0.6, -0.05, 0.01, 0.99] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
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

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_SMOOTH },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_SMOOTH },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_SMOOTH },
  },
};

const stagger = (delay = 0.08) => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
});

const staggerFast = stagger(0.06);
const staggerMedium = stagger(0.1);
const staggerSlow = stagger(0.15);

/* ─────────────────────────────────────────────
   ANIMATED REACT LOOP COMPONENT
   ───────────────────────────────────────────── */

function ReActLoop() {
  const steps = [
    { label: 'INICIO', icon: Zap, color: '#2175a1' },
    { label: 'RAZONAR', icon: Brain, color: '#8b5cf6' },
    { label: 'ACTUAR', icon: Wrench, color: '#f59e0b' },
    { label: 'OBSERVAR', icon: Eye, color: '#10b981' },
  ];

  const radius = 120;
  const centerX = 160;
  const centerY = 160;

  return (
    <div className="relative w-[320px] h-[320px] mx-auto">
      {/* Rotating glow ring */}
      <motion.div
        className="absolute inset-4 rounded-full border border-accent/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        style={{
          background:
            'conic-gradient(from 0deg, transparent, rgba(33,117,161,0.15), transparent, rgba(139,92,246,0.1), transparent)',
        }}
      />

      {/* Inner pulsing circle */}
      <motion.div
        className="absolute rounded-full bg-accent/5 border border-accent/10"
        style={{
          top: centerY - 40,
          left: centerX - 40,
          width: 80,
          height: 80,
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex items-center justify-center w-full h-full">
          <RefreshCw className="w-6 h-6 text-accent/60" />
        </div>
      </motion.div>

      {/* Step nodes */}
      {steps.map((step, i) => {
        const angle = (i * Math.PI * 2) / steps.length - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle) - 32;
        const y = centerY + radius * Math.sin(angle) - 32;
        const Icon = step.icon;

        return (
          <motion.div
            key={step.label}
            className="absolute w-16 h-16 rounded-xl border border-white/10 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center gap-1"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.5, ease: EASE_SMOOTH }}
          >
            <motion.div
              animate={{
                boxShadow: [
                  `0 0 0px ${step.color}00`,
                  `0 0 20px ${step.color}40`,
                  `0 0 0px ${step.color}00`,
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.6,
                ease: 'easeInOut',
              }}
              className="rounded-lg"
            >
              <Icon className="w-5 h-5" style={{ color: step.color }} />
            </motion.div>
            <span className="text-[8px] uppercase tracking-wider text-white/50 font-medium">
              {step.label}
            </span>
          </motion.div>
        );
      })}

      {/* Animated arrows between nodes */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 320 320"
        fill="none"
      >
        {steps.map((_, i) => {
          const nextI = (i + 1) % steps.length;
          const angle1 = (i * Math.PI * 2) / steps.length - Math.PI / 2;
          const angle2 = (nextI * Math.PI * 2) / steps.length - Math.PI / 2;
          const x1 = centerX + (radius - 10) * Math.cos(angle1);
          const y1 = centerY + (radius - 10) * Math.sin(angle1);
          const x2 = centerX + (radius - 10) * Math.cos(angle2);
          const y2 = centerY + (radius - 10) * Math.sin(angle2);

          const midAngle = ((i + 0.5) * Math.PI * 2) / steps.length - Math.PI / 2;
          const cx = centerX + (radius - 40) * Math.cos(midAngle);
          const cy = centerY + (radius - 40) * Math.sin(midAngle);

          return (
            <motion.path
              key={`arrow-${i}`}
              d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
              stroke="rgba(33,117,161,0.3)"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 1.2,
                delay: 0.8 + i * 0.2,
                ease: EASE_SMOOTH,
              }}
            />
          );
        })}
      </svg>

      {/* Orbiting particle */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-accent shadow-[0_0_12px_rgba(33,117,161,0.8)]"
        animate={{
          offsetDistance: ['0%', '100%'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          offsetPath: `circle(${radius}px at ${centerX}px ${centerY}px)`,
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   AGENT FLOW DIAGRAM
   ───────────────────────────────────────────── */

function AgentFlowDiagram() {
  const steps = [
    { label: 'Goal', icon: Lightbulb, color: '#2175a1' },
    { label: 'LLM', icon: Brain, color: '#8b5cf6' },
    { label: 'Tool 1', icon: Search, color: '#f59e0b' },
    { label: 'Tool 2', icon: Mail, color: '#10b981' },
    { label: 'Tool 3', icon: Database, color: '#ec4899' },
    { label: 'Result', icon: CheckCircle2, color: '#2175a1' },
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        className="text-[10px] uppercase tracking-[0.2em] text-accent/60 font-medium mb-2"
        variants={fadeIn}
      >
        AGENT
      </motion.div>
      <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div key={step.label} className="flex items-center gap-1 sm:gap-2">
              <motion.div
                className="flex flex-col items-center gap-1"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: i * 0.12, duration: 0.5, ease: EASE_SMOOTH },
                  },
                }}
              >
                <motion.div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg border border-white/10 bg-slate-900/80 flex items-center justify-center"
                  animate={
                    i >= 2 && i <= 4
                      ? {
                          borderColor: [
                            'rgba(255,255,255,0.1)',
                            `${step.color}60`,
                            'rgba(255,255,255,0.1)',
                          ],
                        }
                      : undefined
                  }
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: step.color }} />
                </motion.div>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-white/40 font-medium">
                  {step.label}
                </span>
              </motion.div>
              {i < steps.length - 1 && (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scaleX: 0 },
                    visible: {
                      opacity: 1,
                      scaleX: 1,
                      transition: { delay: i * 0.12 + 0.06, duration: 0.4 },
                    },
                  }}
                >
                  <ArrowRight className="w-3 h-3 text-white/20" />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
      {/* Loop arrow back */}
      <motion.div
        className="flex items-center gap-2 text-accent/40 text-[9px] uppercase tracking-wider mt-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 2 }}
      >
        <RefreshCw className="w-3 h-3" />
        <span>LOOP</span>
      </motion.div>
    </div>
  );
}

function SimpleFlowDiagram() {
  const steps = [
    { label: 'User', icon: MessageSquare },
    { label: 'Question', icon: FileText },
    { label: 'LLM', icon: Brain },
    { label: 'Response', icon: CheckCircle2 },
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium mb-2"
        variants={fadeIn}
      >
        PROMPT SIMPLE
      </motion.div>
      <div className="flex items-center gap-1 sm:gap-2">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div key={step.label} className="flex items-center gap-1 sm:gap-2">
              <motion.div
                className="flex flex-col items-center gap-1"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: i * 0.12, duration: 0.5, ease: EASE_SMOOTH },
                  },
                }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg border border-white/10 bg-slate-900/40 flex items-center justify-center">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white/30" />
                </div>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-white/30 font-medium">
                  {step.label}
                </span>
              </motion.div>
              {i < steps.length - 1 && (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scaleX: 0 },
                    visible: {
                      opacity: 1,
                      scaleX: 1,
                      transition: { delay: i * 0.12 + 0.06, duration: 0.4 },
                    },
                  }}
                >
                  <ArrowRight className="w-3 h-3 text-white/15" />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
      <motion.div className="text-[9px] uppercase tracking-wider text-white/20 mt-1" variants={fadeIn}>
        END
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ANIMATED WORKFLOW DIAGRAM
   ───────────────────────────────────────────── */

function WorkflowDiagram() {
  const steps = [
    { label: 'Lunes 9am\nInicio', icon: Clock, color: '#2175a1' },
    { label: 'Buscar\nnoticias', icon: Search, color: '#8b5cf6' },
    { label: 'Resumir\nhallazgos', icon: FileText, color: '#f59e0b' },
    { label: 'Redactar\nreporte', icon: MessageSquare, color: '#10b981' },
    { label: 'Enviar\npor email', icon: Mail, color: '#ec4899' },
  ];

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
      {steps.map((step, i) => {
        const Icon = step.icon;
        return (
          <motion.div key={step.label} className="flex items-center gap-2 sm:gap-3">
            <motion.div
              className="flex flex-col items-center gap-2"
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { delay: i * 0.15, duration: 0.5, ease: EASE_SMOOTH },
                },
              }}
            >
              <motion.div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-white/10 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center"
                animate={{
                  borderColor: [
                    'rgba(255,255,255,0.1)',
                    `${step.color}40`,
                    'rgba(255,255,255,0.1)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              >
                <Icon className="w-5 h-5" style={{ color: step.color }} />
              </motion.div>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-white/40 font-medium text-center whitespace-pre-line leading-tight">
                {step.label}
              </span>
            </motion.div>
            {i < steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
              >
                <ArrowRight className="w-3 h-3 text-white/20 flex-shrink-0" />
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SCROLL INDICATOR
   ───────────────────────────────────────────── */

function ScrollIndicator() {
  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
    >
      <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium">
        Scroll
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="w-4 h-4 text-white/30" />
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   SECTION LABEL COMPONENT
   ───────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      variants={fadeUp}
      className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium mb-4"
    >
      {children}
    </motion.p>
  );
}

/* ═════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═════════════════════════════════════════════ */

export default function AIAgentsContent() {
  return (
    <main className="bg-[#0f172a] min-h-screen overflow-hidden">
      {/* ─── SECTION 1: HERO ─── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(33,117,161,0.08) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -20, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <motion.div
          className="relative z-10 max-w-5xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={staggerMedium}
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-medium tracking-wide">
              <Bot className="w-3.5 h-3.5" />
              CURSO 2 &middot; WORKSHOP
            </span>
          </motion.div>

          {/* Prerequisite */}
          <motion.p variants={fadeUp} className="text-white/40 text-sm font-light mb-6">
            Prerequisito:{' '}
            <Link href="/workshops/vibe-coding" className="text-accent/70 hover:text-accent transition-colors underline underline-offset-2">
              Curso 1 &middot; Vibe Coding
            </Link>
          </motion.p>

          {/* Title */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1]"
              variants={staggerFast}
              initial="hidden"
              animate="visible"
            >
              <motion.span className="block" variants={fadeUp}>
                Como Crear
              </motion.span>
              <motion.span className="block text-accent" variants={fadeUp}>
                Agentes de IA
              </motion.span>
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-white/50 text-base sm:text-lg font-light mb-4"
          >
            Para Disenadores y Product Managers &middot; 2-4 horas &middot; Grabado
          </motion.p>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="text-white/60 text-base sm:text-lg font-light max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Un agente de IA puede percibir su entorno, tomar decisiones y ejecutar acciones para
            alcanzar un objetivo.
          </motion.p>

          {/* Animated flow comparison */}
          <motion.div
            variants={fadeUp}
            className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto mb-16"
          >
            <motion.div
              className="rounded-2xl border border-white/[0.06] bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8"
              variants={staggerFast}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <SimpleFlowDiagram />
            </motion.div>
            <motion.div
              className="rounded-2xl border border-accent/20 bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8"
              variants={staggerFast}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <AgentFlowDiagram />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ScrollIndicator />
        </div>
      </section>

      {/* ─── SECTION 2: THE LEAP ─── */}
      <motion.section
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerMedium}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>EL SALTO</SectionLabel>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4"
            >
              De Vibe Coding a{' '}
              <span className="text-accent">Agentes</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-white/40 text-base font-light max-w-xl mx-auto"
            >
              En el Curso 1 aprendiste a generar codigo con prompts. Ahora vas a crear sistemas que
              piensan, deciden y actuan solos.
            </motion.p>
          </div>

          {/* Comparison table */}
          <div className="space-y-4">
            {[
              {
                c1: 'Generar codigo con prompts',
                c2: 'Automatizar tareas con logica encadenada',
              },
              {
                c1: 'Una instruccion → una salida',
                c2: 'Un objetivo → multiples pasos automaticos',
              },
              {
                c1: 'Tu ejecutas manualmente',
                c2: 'El agente ejecuta, tu supervisas',
              },
              {
                c1: 'Herramientas: editores con IA',
                c2: 'Herramientas: APIs, busqueda, memoria',
              },
              {
                c1: 'Resultado: codigo o interfaz',
                c2: 'Resultado: tarea completada o flujo activo',
              },
            ].map((row, i) => (
              <motion.div
                key={i}
                className="grid md:grid-cols-2 gap-3 sm:gap-4"
                variants={i % 2 === 0 ? fadeLeft : fadeRight}
              >
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium mt-0.5 flex-shrink-0">
                      C1
                    </span>
                    <p className="text-white/40 text-sm font-light leading-relaxed">{row.c1}</p>
                  </div>
                </div>
                <motion.div
                  className="rounded-xl border border-accent/20 bg-accent/[0.04] p-4 sm:p-5"
                  whileHover={{ borderColor: 'rgba(33,117,161,0.4)' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-accent/60 font-medium mt-0.5 flex-shrink-0">
                      C2
                    </span>
                    <p className="text-white/70 text-sm font-light leading-relaxed">{row.c2}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ─── SECTION 3: RISKS ─── */}
      <motion.section
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerMedium}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>RIESGOS</SectionLabel>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4"
            >
              Con poder viene{' '}
              <span className="text-amber-400">responsabilidad</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-white/40 text-base font-light max-w-xl mx-auto"
            >
              Los agentes son poderosos, pero introducen riesgos que no existen en prompts simples.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: AlertTriangle,
                title: 'Errores en cascada',
                description:
                  'Una mala decision del agente se amplifica con cada paso. Si el paso 1 falla, los pasos 2, 3 y 4 construyen sobre un error. El dano es exponencial, no lineal.',
                detail: 'Solucion: checkpoints de validacion entre pasos criticos.',
              },
              {
                icon: Cpu,
                title: 'Costos multiplicados',
                description:
                  'Un agente usa entre 10x y 50x mas tokens que un prompt simple. Cada ciclo de razonamiento, cada llamada a herramientas, cada observacion consume tokens.',
                detail: 'Solucion: limites de iteraciones y presupuesto de tokens.',
              },
              {
                icon: Shield,
                title: 'Seguridad: privilegio minimo',
                description:
                  'Un agente con acceso a tu email puede leer, escribir y borrar. Dale solo los permisos que necesita, nunca mas. Principio de minimo privilegio.',
                detail: 'Solucion: scopes restringidos y sandboxing de herramientas.',
              },
            ].map((risk, i) => {
              const Icon = risk.icon;
              return (
                <motion.div
                  key={risk.title}
                  variants={fadeUp}
                  className="group rounded-2xl border border-amber-500/20 bg-amber-500/[0.03] backdrop-blur-sm p-6 sm:p-8 hover:border-amber-500/30 transition-all duration-500"
                >
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6"
                    animate={{
                      boxShadow: [
                        '0 0 0px rgba(245,158,11,0)',
                        '0 0 20px rgba(245,158,11,0.15)',
                        '0 0 0px rgba(245,158,11,0)',
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.7,
                    }}
                  >
                    <Icon className="w-6 h-6 text-amber-400" />
                  </motion.div>
                  <h3 className="text-white text-lg font-medium mb-3">{risk.title}</h3>
                  <p className="text-white/40 text-sm font-light leading-relaxed mb-4">
                    {risk.description}
                  </p>
                  <p className="text-amber-400/60 text-xs font-medium uppercase tracking-wider">
                    {risk.detail}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* ─── SECTION 4: MODULE OVERVIEW (TIMELINE) ─── */}
      <motion.section
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerMedium}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>ESTRUCTURA DEL CURSO</SectionLabel>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4"
            >
              6 modulos, un{' '}
              <span className="text-accent">agente funcional</span>
            </motion.h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <motion.div
              className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: EASE_SMOOTH }}
              style={{ transformOrigin: 'top' }}
            />

            <div className="space-y-6 sm:space-y-8">
              {[
                {
                  mod: 0,
                  title: 'Introduccion',
                  time: '15 min',
                  desc: 'Que es un agente, por que importa ahora, y que vas a construir hoy.',
                  icon: Lightbulb,
                },
                {
                  mod: 1,
                  title: 'Como piensa un agente',
                  time: '20 min',
                  desc: 'El ciclo ReAct: razonar, actuar, observar. La diferencia entre un chatbot y un agente autonomo.',
                  icon: Brain,
                },
                {
                  mod: 2,
                  title: 'Las 3 capacidades clave',
                  time: '35 min',
                  desc: 'Herramientas, memoria y workflows. Los tres pilares que transforman un LLM en un agente.',
                  icon: Layers,
                },
                {
                  mod: 3,
                  title: 'Herramientas del ecosistema',
                  time: '20 min',
                  desc: 'Claude, ChatGPT, n8n, LangChain: cuando usar cada uno segun tu nivel y objetivo.',
                  icon: Wrench,
                },
                {
                  mod: 4,
                  title: 'Proyectos practicos',
                  time: '70-90 min',
                  desc: 'Elige tu perfil: Research Agent (PM), Design Feedback Agent (disenador), u Onboarding Agent (ambos).',
                  icon: Cpu,
                },
                {
                  mod: 5,
                  title: 'Revision y siguientes pasos',
                  time: '20 min',
                  desc: 'Validacion del agente, errores comunes, y como llevar esto a produccion.',
                  icon: CheckCircle2,
                },
              ].map((module, i) => {
                const Icon = module.icon;
                return (
                  <motion.div
                    key={module.mod}
                    className="relative flex items-start gap-4 sm:gap-6 pl-2"
                    variants={{
                      hidden: { opacity: 0, x: -30 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          delay: i * 0.12,
                          duration: 0.6,
                          ease: EASE_SMOOTH,
                        },
                      },
                    }}
                  >
                    {/* Node */}
                    <motion.div
                      className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-accent/40 bg-[#0f172a] flex items-center justify-center flex-shrink-0 mt-1"
                      whileHover={{ scale: 1.15, borderColor: 'rgba(33,117,161,0.8)' }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-accent text-xs sm:text-sm font-medium">
                        {module.mod}
                      </span>
                    </motion.div>

                    {/* Content card */}
                    <motion.div
                      className="flex-1 rounded-2xl border border-white/[0.06] bg-slate-900/60 backdrop-blur-sm p-5 sm:p-6 hover:border-accent/20 transition-all duration-500 group"
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/15 transition-colors">
                            <Icon className="w-4 h-4 text-accent" />
                          </div>
                          <h3 className="text-white text-base sm:text-lg font-medium">
                            {module.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-1.5 text-white/30 flex-shrink-0">
                          <Clock className="w-3 h-3" />
                          <span className="text-xs font-light">{module.time}</span>
                        </div>
                      </div>
                      <p className="text-white/40 text-sm font-light leading-relaxed ml-11">
                        {module.desc}
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Total time */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex items-center justify-center gap-2 text-white/30"
          >
            <Clock className="w-4 h-4" />
            <span className="text-sm font-light">
              Tiempo total estimado: <span className="text-accent/70">3-4 horas</span>
            </span>
          </motion.div>
        </div>
      </motion.section>

      {/* ─── SECTION 5: AGENT ANATOMY ─── */}
      <motion.section
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerMedium}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>ANATOMIA DE UN AGENTE</SectionLabel>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4"
            >
              5 componentes,{' '}
              <span className="text-accent">una arquitectura</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-white/40 text-base font-light max-w-xl mx-auto"
            >
              Todo agente, sin importar su complejidad, se compone de estas cinco piezas
              fundamentales.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Stacked blocks */}
            <motion.div className="space-y-4" variants={staggerSlow}>
              {[
                {
                  num: 1,
                  label: 'INSTRUCCION',
                  subtitle: 'El alma',
                  desc: 'El system prompt define quien es el agente, que puede hacer, y como debe comportarse. Es su identidad.',
                  icon: FileText,
                  color: '#2175a1',
                },
                {
                  num: 2,
                  label: 'HERRAMIENTAS',
                  subtitle: 'Lo que puede HACER',
                  desc: 'APIs, busqueda web, bases de datos, email. Cada herramienta es una capacidad que extiende al agente.',
                  icon: Wrench,
                  color: '#8b5cf6',
                },
                {
                  num: 3,
                  label: 'MEMORIA',
                  subtitle: 'Corto + largo plazo',
                  desc: 'Memoria de conversacion (corto plazo), base de conocimiento (largo plazo), y embeddings (semantica).',
                  icon: Database,
                  color: '#10b981',
                },
                {
                  num: 4,
                  label: 'LOOP DE RAZONAMIENTO',
                  subtitle: 'ReAct: Reason + Act',
                  desc: 'El ciclo continuo: razonar sobre la situacion, actuar con una herramienta, observar el resultado, repetir.',
                  icon: RefreshCw,
                  color: '#f59e0b',
                },
                {
                  num: 5,
                  label: 'OUTPUT',
                  subtitle: 'Texto, accion, datos, trigger',
                  desc: 'La salida puede ser texto, pero tambien una accion ejecutada, datos guardados, o un trigger para otro agente.',
                  icon: Zap,
                  color: '#ec4899',
                },
              ].map((component, i) => {
                const Icon = component.icon;
                return (
                  <motion.div
                    key={component.num}
                    className="group relative rounded-2xl border border-white/[0.06] bg-slate-900/60 backdrop-blur-sm p-5 sm:p-6 hover:border-white/10 transition-all duration-500"
                    variants={{
                      hidden: { opacity: 0, x: -40, scale: 0.95 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        transition: {
                          delay: i * 0.12,
                          duration: 0.6,
                          ease: EASE_SMOOTH,
                        },
                      },
                    }}
                    whileHover={{ x: 8, borderColor: `${component.color}30` }}
                  >
                    {/* Left accent bar */}
                    <motion.div
                      className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full"
                      style={{ backgroundColor: component.color }}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                    />

                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0"
                        style={{
                          borderColor: `${component.color}30`,
                          backgroundColor: `${component.color}10`,
                        }}
                      >
                        <Icon className="w-5 h-5" style={{ color: component.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-3 mb-1">
                          <h3 className="text-white text-sm font-medium uppercase tracking-wider">
                            {component.label}
                          </h3>
                          <span className="text-white/30 text-xs font-light italic">
                            {component.subtitle}
                          </span>
                        </div>
                        <p className="text-white/40 text-sm font-light leading-relaxed">
                          {component.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* ReAct Loop Diagram */}
            <motion.div
              className="flex flex-col items-center"
              variants={scaleIn}
            >
              <motion.div
                className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium mb-8"
                variants={fadeIn}
              >
                EL LOOP REACT
              </motion.div>
              <ReActLoop />
              <motion.p
                className="text-white/30 text-xs font-light text-center mt-8 max-w-xs"
                variants={fadeIn}
              >
                El agente repite el ciclo hasta alcanzar su objetivo o agotar sus intentos.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ─── SECTION 5B: AGENT TYPES COMPARISON ─── */}
      <motion.section
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerMedium}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>TIPOS DE AGENTE</SectionLabel>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4"
            >
              3 niveles de{' '}
              <span className="text-accent">autonomia</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-white/40 text-base font-light max-w-xl mx-auto"
            >
              No todos los agentes son iguales. Segun la complejidad de la tarea, necesitas un nivel
              distinto de autonomia.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                type: 'Reactivo',
                icon: MessageSquare,
                color: '#10b981',
                level: 1,
                desc: 'Responde a cada input sin plan previo. Rapido y simple.',
                useCase: 'Chatbots, FAQs, respuestas directas.',
                example: 'Un bot de soporte que responde preguntas frecuentes una por una.',
              },
              {
                type: 'Con planificacion',
                icon: Brain,
                color: '#8b5cf6',
                level: 2,
                desc: 'Define pasos antes de ejecutar. Mas lento pero mas confiable para tareas complejas de multiples pasos.',
                useCase: 'Research, analisis, generacion de reportes.',
                example: 'Un agente que primero busca, luego sintetiza, luego formatea el reporte.',
              },
              {
                type: 'Multi-agente',
                icon: Users,
                color: '#f59e0b',
                level: 3,
                desc: 'Varios agentes colaboran: uno busca, otro sintetiza, otro valida.',
                useCase: 'Flujos empresariales complejos.',
                example: 'Un equipo de agentes donde uno investiga, otro escribe y otro revisa calidad.',
              },
            ].map((agent, i) => {
              const Icon = agent.icon;
              return (
                <motion.div
                  key={agent.type}
                  className="rounded-2xl border border-white/[0.06] bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8 hover:border-white/10 transition-all duration-500 group"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: i * 0.12,
                        duration: 0.6,
                        ease: EASE_SMOOTH,
                      },
                    },
                  }}
                  whileHover={{ y: -4, borderColor: `${agent.color}30` }}
                >
                  {/* Level indicator */}
                  <div className="flex items-center gap-2 mb-4">
                    {[1, 2, 3].map((lvl) => (
                      <motion.div
                        key={lvl}
                        className="h-1 w-8 rounded-full"
                        style={{
                          backgroundColor:
                            lvl <= agent.level ? agent.color : 'rgba(255,255,255,0.05)',
                        }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + lvl * 0.1, duration: 0.3 }}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl border flex items-center justify-center"
                      style={{
                        borderColor: `${agent.color}30`,
                        backgroundColor: `${agent.color}10`,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: agent.color }} />
                    </div>
                    <h3 className="text-white text-lg font-medium">{agent.type}</h3>
                  </div>

                  <p className="text-white/50 text-sm font-light leading-relaxed mb-4">
                    {agent.desc}
                  </p>

                  <div className="rounded-lg border border-white/[0.04] bg-white/[0.02] p-3 mb-3">
                    <span className="text-[9px] uppercase tracking-wider text-accent/50 font-medium">
                      Util para
                    </span>
                    <p className="text-white/40 text-xs font-light mt-1">{agent.useCase}</p>
                  </div>

                  <div className="rounded-lg border border-white/[0.04] bg-white/[0.02] p-3">
                    <span className="text-[9px] uppercase tracking-wider text-white/30 font-medium">
                      Ejemplo
                    </span>
                    <p className="text-white/30 text-xs font-light mt-1 italic">{agent.example}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* ─── SECTION 6: 3 KEY CAPABILITIES ─── */}
      <motion.section
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerMedium}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>CAPACIDADES CLAVE</SectionLabel>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4"
            >
              Los 3 pilares de un{' '}
              <span className="text-accent">agente real</span>
            </motion.h2>
          </div>

          {/* Capability A: Tools */}
          <motion.div
            className="mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerMedium}
          >
            <motion.div
              className="rounded-2xl border border-accent/20 bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8 lg:p-10"
              variants={fadeUp}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-accent/60 font-medium">
                    CAPACIDAD A
                  </span>
                  <h3 className="text-white text-xl font-light">Agentes con Herramientas</h3>
                </div>
              </div>

              <p className="text-white/40 text-sm font-light leading-relaxed mb-8 max-w-2xl">
                Las herramientas convierten un LLM conversacional en un agente que puede actuar en
                el mundo real. Hay tres tipos fundamentales.
              </p>

              <motion.div
                className="grid sm:grid-cols-3 gap-4 sm:gap-6"
                variants={staggerFast}
              >
                {[
                  {
                    type: 'Informacion',
                    icon: Search,
                    color: '#2175a1',
                    examples: ['Busqueda web', 'Leer archivos', 'Consultar APIs', 'Scraping'],
                  },
                  {
                    type: 'Accion',
                    icon: Zap,
                    color: '#f59e0b',
                    examples: ['Enviar emails', 'Crear archivos', 'Modificar datos', 'Publicar'],
                  },
                  {
                    type: 'Integracion',
                    icon: Globe,
                    color: '#10b981',
                    examples: ['Slack', 'Google Calendar', 'GitHub', 'Databases'],
                  },
                ].map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <motion.div
                      key={tool.type}
                      variants={fadeUp}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-white/10 transition-all duration-300"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <Icon className="w-4 h-4" style={{ color: tool.color }} />
                        <h4 className="text-white text-sm font-medium">{tool.type}</h4>
                      </div>
                      <ul className="space-y-2">
                        {tool.examples.map((ex, j) => (
                          <motion.li
                            key={ex}
                            className="flex items-center gap-2 text-white/40 text-xs font-light"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: j * 0.08, duration: 0.4 }}
                          >
                            <div
                              className="w-1 h-1 rounded-full flex-shrink-0"
                              style={{ backgroundColor: tool.color }}
                            />
                            {ex}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Tool pseudo-code example */}
              <motion.div
                className="mt-8 rounded-xl border border-white/[0.06] bg-black/30 p-5 sm:p-6"
                variants={fadeUp}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-red-400/60" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                  <div className="w-2 h-2 rounded-full bg-green-400/60" />
                  <span className="text-[9px] text-white/20 ml-2 font-mono">
                    tool_definition.yaml
                  </span>
                </div>
                <div className="font-mono text-[10px] sm:text-xs leading-relaxed space-y-1">
                  <p className="text-white/20">{'// Asi se le "explica" una herramienta al agente:'}</p>
                  <p className="text-white/20">&nbsp;</p>
                  <p>
                    <span className="text-accent/70">herramienta:</span>
                    <span className="text-white/50"> buscar_en_web</span>
                  </p>
                  <p>
                    <span className="text-accent/70">descripcion:</span>
                    <span className="text-white/40"> &quot;Busca informacion actualizada en internet&quot;</span>
                  </p>
                  <p>
                    <span className="text-accent/70">parametros:</span>
                  </p>
                  <p className="pl-4">
                    <span className="text-purple-400/60">query:</span>
                    <span className="text-white/40"> string</span>
                    <span className="text-white/20">  {'// la busqueda a realizar'}</span>
                  </p>
                  <p className="pl-4">
                    <span className="text-purple-400/60">max_resultados:</span>
                    <span className="text-white/40"> number</span>
                    <span className="text-white/20">  {'// cuantos resultados traer'}</span>
                  </p>
                  <p>
                    <span className="text-accent/70">retorna:</span>
                    <span className="text-white/40">{' lista de { titulo, url, fragmento }'}</span>
                  </p>
                  <p className="text-white/20">&nbsp;</p>
                  <p className="text-white/20">{'// El agente DECIDE cuando llamarla:'}</p>
                  <p className="text-white/20">{'// Si el usuario pregunta algo actual → llama buscar_en_web'}</p>
                  <p className="text-white/20">{'// Si puede responder desde su conocimiento → no la llama'}</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Capability B: Memory */}
          <motion.div
            className="mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerMedium}
          >
            <motion.div
              className="rounded-2xl border border-accent/20 bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8 lg:p-10"
              variants={fadeUp}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Database className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-accent/60 font-medium">
                    CAPACIDAD B
                  </span>
                  <h3 className="text-white text-xl font-light">Memoria y Contexto Persistente</h3>
                </div>
              </div>

              <p className="text-white/40 text-sm font-light leading-relaxed mb-8 max-w-2xl">
                Sin memoria, cada conversacion empieza de cero. La memoria le da al agente
                continuidad, personalizacion y aprendizaje.
              </p>

              {/* 3 memory types as layered cards */}
              <div className="relative flex flex-col items-center gap-4 sm:flex-row sm:gap-6 sm:justify-center">
                {[
                  {
                    type: 'Corto plazo',
                    icon: MessageSquare,
                    color: '#2175a1',
                    desc: 'Historial de la conversacion actual. Se pierde al cerrar sesion.',
                    layer: 0,
                  },
                  {
                    type: 'Largo plazo',
                    icon: Database,
                    color: '#8b5cf6',
                    desc: 'Base de conocimiento persistente. Documentos, preferencias, reglas.',
                    layer: 1,
                  },
                  {
                    type: 'Semantica',
                    icon: Brain,
                    color: '#10b981',
                    desc: 'Embeddings vectoriales. Busqueda por similitud, no por keywords exactas.',
                    layer: 2,
                  },
                ].map((mem, i) => {
                  const Icon = mem.icon;
                  return (
                    <motion.div
                      key={mem.type}
                      className="relative w-full sm:w-72 rounded-xl border bg-slate-900/80 backdrop-blur-sm p-5"
                      style={{
                        borderColor: `${mem.color}25`,
                        zIndex: 3 - i,
                      }}
                      variants={{
                        hidden: { opacity: 0, y: 30 + i * 10, scale: 0.95 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: {
                            delay: i * 0.15,
                            duration: 0.6,
                            ease: EASE_SMOOTH,
                          },
                        },
                      }}
                      whileHover={{ y: -4, scale: 1.02 }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className="w-4 h-4" style={{ color: mem.color }} />
                        <h4 className="text-white text-sm font-medium">{mem.type}</h4>
                      </div>
                      <p className="text-white/40 text-xs font-light leading-relaxed">
                        {mem.desc}
                      </p>
                      {/* Layer indicator */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full border border-white/10 bg-slate-900 flex items-center justify-center">
                        <span className="text-[9px] font-medium" style={{ color: mem.color }}>
                          L{mem.layer + 1}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Memory implementation approaches */}
              <motion.div
                className="mt-8"
                variants={staggerFast}
              >
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium mb-4">
                  COMO IMPLEMENTAR MEMORIA EN LA PRACTICA
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    {
                      approach: 'Forma mas simple',
                      desc: 'Al inicio de cada sesion, cargar un archivo de texto con el historial.',
                      icon: FileText,
                      color: '#10b981',
                    },
                    {
                      approach: 'System prompt',
                      desc: '"El usuario se llama Ana. Trabaja en Spotify. Objetivos: ..."',
                      icon: MessageSquare,
                      color: '#2175a1',
                    },
                    {
                      approach: 'Claude Projects',
                      desc: 'La memoria persiste automaticamente entre conversaciones.',
                      icon: Brain,
                      color: '#8b5cf6',
                    },
                    {
                      approach: 'n8n / Make',
                      desc: 'Guardar outputs en Google Sheets y cargarlos al inicio del flujo.',
                      icon: Workflow,
                      color: '#f59e0b',
                    },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.approach}
                        className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 hover:border-white/10 transition-all duration-300"
                        variants={{
                          hidden: { opacity: 0, y: 15 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                              delay: i * 0.08,
                              duration: 0.5,
                              ease: EASE_SMOOTH,
                            },
                          },
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                          <span className="text-white text-xs font-medium">{item.approach}</span>
                        </div>
                        <p className="text-white/35 text-xs font-light leading-relaxed">
                          {item.desc}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Capability C: Flujos */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerMedium}
          >
            <motion.div
              className="rounded-2xl border border-accent/20 bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8 lg:p-10"
              variants={fadeUp}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Workflow className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-accent/60 font-medium">
                    CAPACIDAD C
                  </span>
                  <h3 className="text-white text-xl font-light">Flujos</h3>
                </div>
              </div>

              <p className="text-white/40 text-sm font-light leading-relaxed mb-8 max-w-2xl">
                Un workflow es una secuencia predefinida de pasos que el agente ejecuta
                automaticamente. El ejemplo: un agente de investigacion semanal.
              </p>

              {/* Workflow diagram */}
              <motion.div
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8"
                variants={fadeUp}
              >
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium mb-6 text-center">
                  AGENTE DE INVESTIGACION SEMANAL
                </div>
                <WorkflowDiagram />
                <p className="text-white/30 text-xs font-light text-center mt-6">
                  El agente ejecuta este flujo cada lunes a las 9am sin intervencion humana.
                </p>
              </motion.div>

              {/* Agent vs Workflow comparison */}
              <motion.div
                className="mt-8 grid sm:grid-cols-2 gap-4"
                variants={staggerFast}
              >
                <motion.div
                  className="rounded-xl border border-purple-400/20 bg-purple-400/[0.04] p-5"
                  variants={fadeLeft}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Bot className="w-4 h-4 text-purple-400/70" />
                    <h4 className="text-white text-sm font-medium">Agente libre</h4>
                  </div>
                  <p className="text-white/40 text-xs font-light leading-relaxed mb-2">
                    El modelo decide los pasos.
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] px-2 py-0.5 rounded-full border border-green-400/20 bg-green-400/5 text-green-400/60">
                      Flexible
                    </span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full border border-amber-400/20 bg-amber-400/5 text-amber-400/60">
                      Impredecible
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  className="rounded-xl border border-accent/20 bg-accent/[0.04] p-5"
                  variants={fadeRight}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Workflow className="w-4 h-4 text-accent/70" />
                    <h4 className="text-white text-sm font-medium">Workflow</h4>
                  </div>
                  <p className="text-white/40 text-xs font-light leading-relaxed mb-2">
                    Los pasos estan fijos.
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] px-2 py-0.5 rounded-full border border-green-400/20 bg-green-400/5 text-green-400/60">
                      Predecible
                    </span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full border border-green-400/20 bg-green-400/5 text-green-400/60">
                      Mas confiable
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ─── SECTION 7: TOOLS ECOSYSTEM ─── */}
      <motion.section
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerMedium}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>ECOSISTEMA</SectionLabel>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4"
            >
              Herramientas del{' '}
              <span className="text-accent">mercado</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-white/40 text-base font-light max-w-xl mx-auto"
            >
              No necesitas saber programar para crear agentes. Pero si necesitas saber que
              herramienta usar segun tu nivel.
            </motion.p>
          </div>

          {/* Complexity scale */}
          <motion.div
            className="mb-10 flex items-center justify-center gap-4"
            variants={fadeIn}
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-green-400/60 font-medium">
              Baja complejidad
            </span>
            <div className="w-32 sm:w-48 h-px bg-gradient-to-r from-green-400/30 via-yellow-400/30 to-red-400/30" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-red-400/60 font-medium">
              Alta complejidad
            </span>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                name: 'Claude con tools',
                level: 1,
                color: '#10b981',
                who: 'PMs y disenadores',
                pros: ['Interfaz natural', 'MCP integrado', 'Context window enorme'],
                cons: ['Limitado a conversacion'],
              },
              {
                name: 'ChatGPT GPTs',
                level: 2,
                color: '#22d3ee',
                who: 'PMs y disenadores',
                pros: ['Store de GPTs', 'Acciones custom', 'Code interpreter'],
                cons: ['Menos control', 'API limitada'],
              },
              {
                name: 'n8n / Make',
                level: 3,
                color: '#f59e0b',
                who: 'PMs con exp. tecnica',
                pros: ['Visual, no-code', 'Integraciones', 'Triggers automaticos'],
                cons: ['Logica compleja dificil', 'Costos de ejecucion'],
              },
              {
                name: 'LangChain / Graph',
                level: 4,
                color: '#ef4444',
                who: 'Desarrolladores',
                pros: ['Control total', 'Grafos complejos', 'Multi-agente'],
                cons: ['Requiere codigo', 'Curva de aprendizaje'],
              },
            ].map((tool, i) => (
              <motion.div
                key={tool.name}
                className="rounded-2xl border border-white/[0.06] bg-slate-900/60 backdrop-blur-sm p-5 sm:p-6 hover:border-white/10 transition-all duration-500 group"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: i * 0.1,
                      duration: 0.6,
                      ease: EASE_SMOOTH,
                    },
                  },
                }}
                whileHover={{ y: -4 }}
              >
                {/* Level bar */}
                <div className="flex items-center gap-2 mb-4">
                  {[1, 2, 3, 4].map((lvl) => (
                    <motion.div
                      key={lvl}
                      className="h-1 flex-1 rounded-full"
                      style={{
                        backgroundColor:
                          lvl <= tool.level ? tool.color : 'rgba(255,255,255,0.05)',
                      }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + lvl * 0.08, duration: 0.3 }}
                    />
                  ))}
                </div>

                <h3 className="text-white text-base font-medium mb-1">{tool.name}</h3>
                <p className="text-xs font-light mb-4" style={{ color: `${tool.color}90` }}>
                  {tool.who}
                </p>

                <div className="space-y-3">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-green-400/50 font-medium">
                      Pros
                    </span>
                    <ul className="mt-1 space-y-1">
                      {tool.pros.map((p) => (
                        <li
                          key={p}
                          className="text-white/40 text-xs font-light flex items-center gap-1.5"
                        >
                          <div className="w-1 h-1 rounded-full bg-green-400/40 flex-shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-red-400/50 font-medium">
                      Contras
                    </span>
                    <ul className="mt-1 space-y-1">
                      {tool.cons.map((c) => (
                        <li
                          key={c}
                          className="text-white/40 text-xs font-light flex items-center gap-1.5"
                        >
                          <div className="w-1 h-1 rounded-full bg-red-400/40 flex-shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Decision Tree */}
          <motion.div
            className="mt-12 rounded-2xl border border-white/[0.06] bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8"
            variants={fadeUp}
          >
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium mb-6 text-center">
              ARBOL DE DECISION RAPIDO
            </div>
            <div className="space-y-3">
              {[
                {
                  question: 'Es una tarea conversacional que no necesita pasos fijos?',
                  answer: 'Claude directo con tools',
                  icon: MessageSquare,
                  color: '#10b981',
                },
                {
                  question: 'Quieres un agente con instrucciones pero sin codigo?',
                  answer: 'ChatGPT GPTs',
                  icon: Bot,
                  color: '#22d3ee',
                },
                {
                  question: 'Necesitas conectar varias apps (Gmail, Sheets, Notion)?',
                  answer: 'n8n o Make',
                  icon: Workflow,
                  color: '#f59e0b',
                },
                {
                  question: 'El flujo tiene logica condicional compleja o memoria?',
                  answer: 'n8n + LangChain con apoyo tecnico',
                  icon: Code,
                  color: '#ef4444',
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.answer}
                    className="flex items-start gap-4 rounded-xl border border-white/[0.04] bg-white/[0.02] p-4 hover:border-white/[0.08] transition-all duration-300"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          delay: i * 0.1,
                          duration: 0.5,
                          ease: EASE_SMOOTH,
                        },
                      },
                    }}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <HelpCircle className="w-4 h-4 text-white/20" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white/50 text-sm font-light mb-1">{item.question}</p>
                      <div className="flex items-center gap-2">
                        <ArrowRight className="w-3 h-3 text-white/20" />
                        <div className="flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                          <span className="text-sm font-medium" style={{ color: item.color }}>
                            {item.answer}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ─── SECTION 8: PROJECTS ─── */}
      <motion.section
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerMedium}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>PROYECTOS PRACTICOS</SectionLabel>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4"
            >
              Elige tu{' '}
              <span className="text-accent">proyecto</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-white/40 text-base font-light max-w-xl mx-auto"
            >
              Tres proyectos disenados para dos perfiles. Elige el que se ajuste a tu rol y
              construyelo paso a paso.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Project A */}
            <motion.div
              className="rounded-2xl border border-accent/20 bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8 flex flex-col"
              variants={fadeUp}
              whileHover={{ y: -6, borderColor: 'rgba(33,117,161,0.4)' }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-accent/50 font-medium">
                  Opcion A
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded-full border border-accent/20 bg-accent/5 text-accent/70">
                  PM
                </span>
              </div>
              <h3 className="text-white text-xl font-light mb-3">Research Agent</h3>
              <p className="text-white/40 text-sm font-light leading-relaxed mb-6 flex-1">
                Un agente que busca noticias relevantes a tu industria, las resume, identifica
                tendencias y genera un reporte semanal listo para compartir con tu equipo.
              </p>

              {/* System prompt */}
              <div className="rounded-xl border border-white/[0.06] bg-slate-800/80 border-white/10 p-4 overflow-hidden">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-red-400/60" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                  <div className="w-2 h-2 rounded-full bg-green-400/60" />
                  <span className="text-[9px] text-white/20 ml-2 font-mono">
                    system_prompt.md
                  </span>
                </div>
                <motion.div
                  className="font-mono text-[9px] sm:text-[10px] leading-relaxed text-white/30 space-y-0.5"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  <p><span className="text-accent/70">Eres</span> un Research Analyst experto.</p>
                  <p><span className="text-accent/70">Cuando</span> el usuario te de un tema,</p>
                  <p>debes:</p>
                  <p><span className="text-white/40">1.</span> Buscar en internet al menos 3</p>
                  <p>   fuentes recientes y confiables.</p>
                  <p><span className="text-white/40">2.</span> Sintetizar la informacion mas</p>
                  <p>   relevante.</p>
                  <p><span className="text-white/40">3.</span> Entregar SIEMPRE en formato:</p>
                  <p>&nbsp;</p>
                  <p className="text-accent/50">   ## Resumen ejecutivo (2-3 oraciones)</p>
                  <p className="text-accent/50">   ## 3 hallazgos clave</p>
                  <p className="text-accent/50">   ## Preguntas para explorar</p>
                  <p className="text-accent/50">   ## Fuentes consultadas</p>
                  <p>&nbsp;</p>
                  <p className="text-amber-400/40">No inventes informacion. Si no</p>
                  <p className="text-amber-400/40">encuentras datos confiables, dilo.</p>
                </motion.div>
              </div>

              {/* Demo suggestions */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-[9px] uppercase tracking-wider text-white/25 font-medium self-center mr-1">
                  Probar con:
                </span>
                {['Tendencias IA en diseno 2025', 'Figma vs Framer'].map((demo) => (
                  <span
                    key={demo}
                    className="text-[9px] px-2.5 py-1 rounded-full border border-accent/15 bg-accent/5 text-accent/50 font-light"
                  >
                    {demo}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Project B */}
            <motion.div
              className="rounded-2xl border border-accent/20 bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8 flex flex-col"
              variants={fadeUp}
              whileHover={{ y: -6, borderColor: 'rgba(33,117,161,0.4)' }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-accent/50 font-medium">
                  Opcion B
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded-full border border-purple-400/20 bg-purple-400/5 text-purple-400/70">
                  Disenador
                </span>
              </div>
              <h3 className="text-white text-xl font-light mb-3">Design Feedback Agent</h3>
              <p className="text-white/40 text-sm font-light leading-relaxed mb-6 flex-1">
                Un agente que revisa pantallas de diseno contra heuristicas de UX, identifica
                problemas de accesibilidad y genera reportes de feedback estructurados.
              </p>

              {/* System prompt */}
              <div className="rounded-xl border border-white/[0.06] bg-slate-800/80 border-white/10 p-4 overflow-hidden">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-red-400/60" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                  <div className="w-2 h-2 rounded-full bg-green-400/60" />
                  <span className="text-[9px] text-white/20 ml-2 font-mono">
                    system_prompt.md
                  </span>
                </div>
                <motion.div
                  className="font-mono text-[9px] sm:text-[10px] leading-relaxed text-white/30 space-y-0.5"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  <p><span className="text-purple-400/70">Eres</span> un Design Critic experto</p>
                  <p>en UX/UI con 15 anos de exp.</p>
                  <p>&nbsp;</p>
                  <p className="text-white/40">CRITERIOS (1 al 10):</p>
                  <p>  Usabilidad &middot; Claridad del</p>
                  <p>  mensaje &middot; Consistencia visual</p>
                  <p>  &middot; Jerarquia</p>
                  <p>&nbsp;</p>
                  <p className="text-white/40">FORMATO:</p>
                  <p className="text-purple-400/50">  ## Evaluacion rapida (tabla)</p>
                  <p className="text-purple-400/50">  ## Top 3 problemas</p>
                  <p className="text-purple-400/50">  ## Sugerencias concretas</p>
                  <p className="text-purple-400/50">  ## Lo que funciona bien</p>
                  <p>&nbsp;</p>
                  <p className="text-amber-400/40">Se directo. Nada de frases</p>
                  <p className="text-amber-400/40">genericas.</p>
                </motion.div>
              </div>

              {/* Evaluation criteria visual */}
              <div className="mt-4 space-y-2">
                <div className="text-[9px] uppercase tracking-wider text-white/25 font-medium">
                  OUTPUT DEL AGENTE
                </div>
                {[
                  { label: 'Usabilidad', score: 85 },
                  { label: 'Claridad', score: 72 },
                  { label: 'Consistencia', score: 90 },
                  { label: 'Jerarquia', score: 68 },
                ].map((criterion, j) => (
                  <div key={criterion.label} className="flex items-center gap-3">
                    <span className="text-white/30 text-[10px] font-light w-20 flex-shrink-0">
                      {criterion.label}
                    </span>
                    <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          backgroundColor:
                            criterion.score >= 80
                              ? '#10b981'
                              : criterion.score >= 70
                                ? '#f59e0b'
                                : '#ef4444',
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${criterion.score}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + j * 0.1, duration: 0.8, ease: EASE_SMOOTH }}
                      />
                    </div>
                    <span className="text-white/30 text-[10px] font-mono w-8 text-right">
                      {criterion.score}%
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Project C */}
            <motion.div
              className="rounded-2xl border border-accent/20 bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8 flex flex-col"
              variants={fadeUp}
              whileHover={{ y: -6, borderColor: 'rgba(33,117,161,0.4)' }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-accent/50 font-medium">
                  Opcion C
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded-full border border-green-400/20 bg-green-400/5 text-green-400/70">
                  Ambos
                </span>
              </div>
              <h3 className="text-white text-xl font-light mb-3">Onboarding Agent</h3>
              <p className="text-white/40 text-sm font-light leading-relaxed mb-6 flex-1">
                Un agente que guia nuevos usuarios paso a paso por tu producto: responde preguntas,
                detecta bloqueos y escala a soporte humano cuando es necesario.
              </p>

              {/* System prompt */}
              <div className="rounded-xl border border-white/[0.06] bg-slate-800/80 border-white/10 p-4 overflow-hidden">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-red-400/60" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                  <div className="w-2 h-2 rounded-full bg-green-400/60" />
                  <span className="text-[9px] text-white/20 ml-2 font-mono">
                    system_prompt.md
                  </span>
                </div>
                <motion.div
                  className="font-mono text-[9px] sm:text-[10px] leading-relaxed text-white/30 space-y-0.5"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  <p><span className="text-green-400/70">Eres</span> el asistente de onboarding</p>
                  <p>de [EMPRESA].</p>
                  <p>&nbsp;</p>
                  <p className="text-white/40">PERSONALIDAD:</p>
                  <p>  Calido, directo, paciente.</p>
                  <p>&nbsp;</p>
                  <p className="text-white/40">COMO ACTUAR:</p>
                  <p>  Al inicio, pregunta nombre y rol.</p>
                  <p>  Guia por pasos, no todo de una.</p>
                  <p>  Si no sabes algo, di: &quot;No tengo</p>
                  <p>  esa info, te conectare con</p>
                  <p>  [persona]&quot;</p>
                  <p>&nbsp;</p>
                  <p className="text-amber-400/40">NUNCA: inventar politicas,</p>
                  <p className="text-amber-400/40">prometer cosas, hablar de</p>
                  <p className="text-amber-400/40">salarios.</p>
                </motion.div>
              </div>

              {/* Architecture mini-diagram */}
              <div className="mt-4 flex items-center justify-center gap-3">
                {[
                  { label: 'Usuario', icon: MessageSquare, color: '#2175a1' },
                  { label: 'Agent', icon: Bot, color: '#8b5cf6' },
                  { label: 'KB', icon: Database, color: '#10b981' },
                ].map((node, j) => {
                  const Icon = node.icon;
                  return (
                    <div key={node.label} className="flex items-center gap-3">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-8 h-8 rounded-lg border border-white/10 bg-slate-900/80 flex items-center justify-center">
                          <Icon className="w-3.5 h-3.5" style={{ color: node.color }} />
                        </div>
                        <span className="text-[7px] uppercase tracking-wider text-white/25 font-medium">
                          {node.label}
                        </span>
                      </div>
                      {j < 2 && <ArrowRight className="w-3 h-3 text-white/15" />}
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-center gap-1.5 mt-2">
                <GitBranch className="w-3 h-3 text-amber-400/40" />
                <span className="text-[8px] uppercase tracking-wider text-amber-400/30 font-medium">
                  Escalacion a humano si confianza baja
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ─── SECTION 8B: CONSTRUCTION SEQUENCE ─── */}
      <motion.section
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerMedium}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>SECUENCIA DE CONSTRUCCION</SectionLabel>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4"
            >
              6 pasos para{' '}
              <span className="text-accent">construir cualquier agente</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-white/40 text-base font-light max-w-xl mx-auto"
            >
              Este proceso aplica a los 3 proyectos. Es el metodo que usaras para construir tu agente
              paso a paso.
            </motion.p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <motion.div
              className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: EASE_SMOOTH }}
              style={{ transformOrigin: 'top' }}
            />

            <div className="space-y-4">
              {[
                {
                  step: 1,
                  title: 'Definir el objetivo',
                  desc: 'Que tarea exacta automatiza este agente? Escribirlo en 1 oracion.',
                  icon: Lightbulb,
                  color: '#2175a1',
                },
                {
                  step: 2,
                  title: 'Listar herramientas necesarias',
                  desc: 'Que necesita poder hacer? (buscar, leer, escribir, calcular)',
                  icon: Wrench,
                  color: '#8b5cf6',
                },
                {
                  step: 3,
                  title: 'Escribir el system prompt',
                  desc: 'Rol + reglas + formato de output + restricciones.',
                  icon: FileText,
                  color: '#f59e0b',
                },
                {
                  step: 4,
                  title: 'Primera prueba',
                  desc: 'Probar con 3 inputs distintos. Identificar donde falla.',
                  icon: Zap,
                  color: '#10b981',
                },
                {
                  step: 5,
                  title: 'Iterar el prompt',
                  desc: 'Agregar ejemplos de lo que NO debe hacer. Ser mas especifico.',
                  icon: RefreshCw,
                  color: '#ec4899',
                },
                {
                  step: 6,
                  title: 'Probar casos extremos',
                  desc: 'Que pasa si el input es vago? Si la herramienta falla?',
                  icon: AlertTriangle,
                  color: '#f59e0b',
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.step}
                    className="relative flex items-start gap-4 sm:gap-6 pl-2"
                    variants={{
                      hidden: { opacity: 0, x: -30 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          delay: i * 0.1,
                          duration: 0.6,
                          ease: EASE_SMOOTH,
                        },
                      },
                    }}
                  >
                    {/* Node */}
                    <motion.div
                      className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 bg-[#0f172a] flex items-center justify-center flex-shrink-0 mt-1"
                      style={{ borderColor: `${item.color}60` }}
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-xs sm:text-sm font-medium" style={{ color: item.color }}>
                        {item.step}
                      </span>
                    </motion.div>

                    {/* Content card */}
                    <motion.div
                      className="flex-1 rounded-xl border border-white/[0.06] bg-slate-900/60 backdrop-blur-sm p-4 sm:p-5 hover:border-white/10 transition-all duration-500 group"
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <Icon className="w-4 h-4" style={{ color: item.color }} />
                        <h3 className="text-white text-sm sm:text-base font-medium">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-white/40 text-sm font-light leading-relaxed ml-7">
                        {item.desc}
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── SECTION 8C: WHEN TO INVOLVE A DEVELOPER ─── */}
      <motion.section
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerMedium}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>CUANDO ESCALAR</SectionLabel>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4"
            >
              Cuando necesitas un{' '}
              <span className="text-accent">desarrollador?</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-white/40 text-base font-light max-w-xl mx-auto"
            >
              Puedes construir mucho sin codigo. Pero hay 5 senales claras de que necesitas apoyo
              tecnico.
            </motion.p>
          </div>

          <motion.div
            className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.03] backdrop-blur-sm p-6 sm:p-8"
            variants={fadeUp}
          >
            <div className="space-y-4">
              {[
                {
                  signal: 'El agente necesita conectarse a sistemas internos de la empresa (bases de datos, ERPs).',
                  icon: Database,
                },
                {
                  signal: 'El volumen de uso es alto y los costos de tokens se vuelven significativos.',
                  icon: Cpu,
                },
                {
                  signal: 'Necesitas memoria persistente entre sesiones para multiples usuarios.',
                  icon: Brain,
                },
                {
                  signal: 'El flujo tiene logica condicional compleja (if/else, loops, branching).',
                  icon: GitBranch,
                },
                {
                  signal: 'Necesitas garantias de disponibilidad o SLAs.',
                  icon: Shield,
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    className="flex items-start gap-4 group"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          delay: i * 0.1,
                          duration: 0.5,
                          ease: EASE_SMOOTH,
                        },
                      },
                    }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mt-0.5">
                      <Icon className="w-4 h-4 text-amber-400/70" />
                    </div>
                    <p className="text-white/50 text-sm font-light leading-relaxed group-hover:text-white/70 transition-colors">
                      {item.signal}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              className="mt-6 pt-6 border-t border-amber-500/10"
              variants={fadeIn}
            >
              <p className="text-amber-400/50 text-xs font-light text-center">
                Si ninguna de estas aplica, puedes avanzar con las herramientas no-code del ecosistema.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ─── SECTION 9: VALIDATION CHECKLIST ─── */}
      <motion.section
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerMedium}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>VALIDACION</SectionLabel>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4"
            >
              Tu agente esta{' '}
              <span className="text-accent">listo?</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-white/40 text-base font-light max-w-xl mx-auto"
            >
              Antes de lanzar, valida estos 6 criterios. Si todos pasan, tu agente esta listo para
              produccion.
            </motion.p>
          </div>

          <motion.div
            className="rounded-2xl border border-accent/20 bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8"
            variants={fadeUp}
          >
            <div className="space-y-4">
              {[
                {
                  text: 'El agente tiene un system prompt claro con objetivo, herramientas y limites definidos',
                  delay: 0.3,
                },
                {
                  text: 'Tiene acceso SOLO a las herramientas que necesita (principio de minimo privilegio)',
                  delay: 0.5,
                },
                {
                  text: 'Incluye un limite maximo de iteraciones para evitar loops infinitos',
                  delay: 0.7,
                },
                {
                  text: 'Maneja errores gracefully: si una herramienta falla, reporta en vez de colapsar',
                  delay: 0.9,
                },
                {
                  text: 'El output es verificable: puedes confirmar que el resultado es correcto',
                  delay: 1.1,
                },
                {
                  text: 'Tiene un mecanismo de escalacion a humano cuando la confianza es baja',
                  delay: 1.3,
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4 group"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        delay: item.delay,
                        duration: 0.5,
                        ease: EASE_SMOOTH,
                      },
                    },
                  }}
                >
                  <motion.div
                    className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-white/10 flex items-center justify-center mt-0.5"
                    animate={{
                      borderColor: ['rgba(255,255,255,0.1)', '#2175a1', '#10b981'],
                      backgroundColor: [
                        'rgba(255,255,255,0)',
                        'rgba(33,117,161,0.1)',
                        'rgba(16,185,129,0.1)',
                      ],
                    }}
                    transition={{
                      delay: item.delay + 0.4,
                      duration: 0.6,
                      ease: EASE_SMOOTH,
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: item.delay + 0.8, duration: 0.3, ease: 'backOut' }}
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    </motion.div>
                  </motion.div>
                  <p className="text-white/50 text-sm font-light leading-relaxed group-hover:text-white/70 transition-colors">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ─── SECTION 9B: RESOURCES ─── */}
      <motion.section
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerMedium}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>RECURSOS</SectionLabel>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4"
            >
              Sigue{' '}
              <span className="text-accent">aprendiendo</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-white/40 text-base font-light max-w-xl mx-auto"
            >
              Los mejores recursos para profundizar en agentes de IA despues del curso.
            </motion.p>
          </div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={staggerFast}
          >
            {[
              {
                name: 'Anthropic Agents Docs',
                url: 'docs.anthropic.com/agents',
                desc: 'Documentacion oficial de agentes con Claude.',
                color: '#2175a1',
                icon: BookOpen,
              },
              {
                name: 'n8n Workflows',
                url: 'n8n.io/workflows',
                desc: 'Templates de workflows listos para copiar.',
                color: '#f59e0b',
                icon: Workflow,
              },
              {
                name: 'LangChain Docs',
                url: 'langchain.com/docs',
                desc: 'Framework tecnico para agentes avanzados.',
                color: '#10b981',
                icon: Code,
              },
              {
                name: 'HuggingFace Agents',
                url: 'huggingface.co/agents',
                desc: 'Ejemplos open source de agentes de IA.',
                color: '#ec4899',
                icon: Globe,
              },
              {
                name: 'LangChain YouTube',
                url: 'YouTube: LangChain channel',
                desc: 'Tutoriales practicos en video sobre agentes.',
                color: '#ef4444',
                icon: ExternalLink,
              },
            ].map((resource, i) => {
              const Icon = resource.icon;
              return (
                <motion.div
                  key={resource.name}
                  className="rounded-xl border border-white/[0.06] bg-slate-900/60 backdrop-blur-sm p-5 hover:border-white/10 transition-all duration-300 group"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: i * 0.08,
                        duration: 0.5,
                        ease: EASE_SMOOTH,
                      },
                    },
                  }}
                  whileHover={{ y: -3 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-8 h-8 rounded-lg border flex items-center justify-center"
                      style={{
                        borderColor: `${resource.color}30`,
                        backgroundColor: `${resource.color}10`,
                      }}
                    >
                      <Icon className="w-4 h-4" style={{ color: resource.color }} />
                    </div>
                    <h3 className="text-white text-sm font-medium">{resource.name}</h3>
                  </div>
                  <p className="text-white/35 text-xs font-light leading-relaxed mb-3">
                    {resource.desc}
                  </p>
                  <p className="text-xs font-mono font-light group-hover:text-accent/70 transition-colors" style={{ color: `${resource.color}60` }}>
                    {resource.url}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* ─── SECTION 9C: FULL 2-COURSE MAP ─── */}
      <motion.section
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerMedium}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>MAPA COMPLETO</SectionLabel>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4"
            >
              2 cursos, un{' '}
              <span className="text-accent">camino completo</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-white/40 text-base font-light max-w-xl mx-auto"
            >
              Asi se conectan los dos cursos del workshop.
            </motion.p>
          </div>

          <motion.div
            className="grid md:grid-cols-2 gap-6 lg:gap-8"
            variants={staggerFast}
          >
            {/* Course 1 */}
            <motion.div
              className="rounded-2xl border border-white/[0.06] bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8"
              variants={fadeLeft}
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium">
                  CURSO 1
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-white/40">
                  Prerequisito
                </span>
              </div>
              <h3 className="text-white text-xl font-light mb-6">Vibe Coding</h3>

              <div className="space-y-3">
                {[
                  { mod: 0, label: 'Intro + riesgos' },
                  { mod: 1, label: 'Herramientas' },
                  { mod: 2, label: 'Como promptear' },
                  { mod: 3, label: 'Proyectos practicos' },
                  { mod: 4, label: 'Revision' },
                ].map((item, i) => (
                  <motion.div
                    key={item.mod}
                    className="flex items-center gap-3"
                    variants={{
                      hidden: { opacity: 0, x: -15 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { delay: i * 0.06, duration: 0.4, ease: EASE_SMOOTH },
                      },
                    }}
                  >
                    <span className="text-white/20 text-xs font-mono w-6 flex-shrink-0">
                      M{item.mod}
                    </span>
                    <div className="flex-1 h-px bg-white/[0.06]" />
                    <span className="text-white/40 text-xs font-light">{item.label}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <span className="text-[9px] uppercase tracking-wider text-white/20 font-medium">
                    OUTPUT
                  </span>
                  <span className="text-white/50 text-xs font-light">
                    Interfaz / pagina web
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[9px] uppercase tracking-wider text-white/20 font-medium">
                    SKILL
                  </span>
                  <span className="text-white/50 text-xs font-light">
                    Escribir prompts de codigo
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Course 2 */}
            <motion.div
              className="rounded-2xl border border-accent/20 bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8"
              variants={fadeRight}
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[10px] uppercase tracking-[0.2em] text-accent/60 font-medium">
                  CURSO 2
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded-full border border-accent/20 bg-accent/5 text-accent/70">
                  Este curso
                </span>
              </div>
              <h3 className="text-white text-xl font-light mb-6">Agentes de IA</h3>

              <div className="space-y-3">
                {[
                  { mod: 0, label: 'Intro + riesgos' },
                  { mod: 1, label: 'Como piensa un agente' },
                  { mod: 2, label: 'Las 3 capacidades' },
                  { mod: 3, label: 'Herramientas ecosistema' },
                  { mod: 4, label: 'Proyectos practicos' },
                  { mod: 5, label: 'Revision' },
                ].map((item, i) => (
                  <motion.div
                    key={item.mod}
                    className="flex items-center gap-3"
                    variants={{
                      hidden: { opacity: 0, x: -15 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { delay: i * 0.06, duration: 0.4, ease: EASE_SMOOTH },
                      },
                    }}
                  >
                    <span className="text-accent/40 text-xs font-mono w-6 flex-shrink-0">
                      M{item.mod}
                    </span>
                    <div className="flex-1 h-px bg-accent/10" />
                    <span className="text-white/50 text-xs font-light">{item.label}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-accent/10">
                <div className="flex items-center gap-3">
                  <span className="text-[9px] uppercase tracking-wider text-accent/40 font-medium">
                    OUTPUT
                  </span>
                  <span className="text-white/60 text-xs font-light">
                    Agente o workflow activo
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[9px] uppercase tracking-wider text-accent/40 font-medium">
                    SKILL
                  </span>
                  <span className="text-white/60 text-xs font-light">
                    Disenar sistemas de IA
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Connection arrow */}
          <motion.div
            className="flex items-center justify-center gap-3 mt-8"
            variants={fadeIn}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/10" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/25 font-medium">
              Curso 1 desbloquea Curso 2
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/10" />
          </motion.div>
        </div>
      </motion.section>

      {/* ─── SECTION 10: CTA ─── */}
      <motion.section
        className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerMedium}
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            className="rounded-2xl border border-accent/20 bg-slate-900/60 backdrop-blur-sm p-8 sm:p-12 lg:p-16"
            variants={fadeUp}
          >
            {/* Floating particles */}
            <div className="relative">
              <motion.div
                className="absolute -top-4 -left-4 w-2 h-2 rounded-full bg-accent/30"
                animate={{ y: [-5, 5, -5], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute -top-2 right-8 w-1.5 h-1.5 rounded-full bg-purple-400/30"
                animate={{ y: [5, -5, 5], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              />
              <motion.div
                className="absolute bottom-0 -right-2 w-2 h-2 rounded-full bg-green-400/20"
                animate={{ y: [-3, 7, -3], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 6, repeat: Infinity, delay: 2 }}
              />
            </div>

            <motion.div variants={fadeUp} className="mb-4">
              <Bot className="w-10 h-10 text-accent/40 mx-auto" />
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-4"
            >
              Listo para crear tu primer{' '}
              <span className="text-accent">agente?</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-white/40 text-base font-light mb-8 max-w-lg mx-auto leading-relaxed"
            >
              Este curso requiere los fundamentos del Curso 1. Si aun no lo has tomado, empieza
              ahi.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/workshops/vibe-coding"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-medium text-base hover:bg-accent/90 transition-all duration-300 shadow-accent-lg group"
              >
                Empieza con Curso 1: Vibe Coding
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 text-white/60 font-medium text-base hover:border-accent/30 hover:text-white/80 transition-all duration-300 group"
              >
                Contactar
                <Mail className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ─── SECTION 11: BACK LINK ─── */}
      <motion.section
        className="py-12 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="max-w-5xl mx-auto">
          <Link
            href="/workshops"
            className="inline-flex items-center gap-2 text-white/30 hover:text-accent transition-colors duration-300 group text-sm font-light"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Volver a talleres
          </Link>
        </div>
      </motion.section>
    </main>
  );
}
