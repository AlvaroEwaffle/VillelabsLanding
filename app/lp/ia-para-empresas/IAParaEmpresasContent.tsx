'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  MessageSquare,
  Mail,
  Cog,
  Clock,
  Users,
  TrendingUp,
  ChevronDown,
  Bot,
  Zap,
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
    icon: Clock,
    question: 'Tu equipo pierde horas respondiendo las mismas preguntas?',
    detail:
      'Un agente de IA responde al instante, 24/7, sin errores ni cansancio.',
  },
  {
    icon: Users,
    question: 'Tus leads se enfrian porque nadie responde a tiempo?',
    detail:
      'Cada minuto sin respuesta reduce la probabilidad de cierre. La IA responde en segundos.',
  },
  {
    icon: Cog,
    question: 'Quieres automatizar pero no sabes por donde partir?',
    detail:
      'Nosotros hacemos el diagnostico, implementamos y entrenamos a tu equipo.',
  },
];

const services = [
  {
    icon: MessageSquare,
    title: 'Chatbot IA para Instagram/WhatsApp',
    description:
      'Responde clientes 24/7, califica leads automaticamente y agenda reuniones sin intervencion humana.',
    pricing: 'Desde $300 USD/mes',
  },
  {
    icon: Mail,
    title: 'Agente de Email Inteligente',
    description:
      'Lee, clasifica y responde emails con IA. Genera borradores para tu revision y automatiza seguimientos.',
    pricing: 'Desde $300 USD/mes',
  },
  {
    icon: Cog,
    title: 'Automatizacion de Procesos',
    description:
      'Conecta tus herramientas y elimina trabajo manual. Desde flujos simples hasta integraciones complejas.',
    pricing: 'Desde $500 USD',
  },
];

const stats = [
  { value: '50+', label: 'Proyectos entregados' },
  { value: '3x', label: 'ROI promedio' },
  { value: '2 sem', label: 'Implementacion promedio' },
];

const faqs = [
  {
    question: 'Cuanto demora la implementacion?',
    answer:
      'Dependiendo de la complejidad, entre 1 y 4 semanas. Un chatbot basico puede estar funcionando en 5 dias habiles.',
  },
  {
    question: 'Necesito conocimientos tecnicos?',
    answer:
      'No. Nosotros nos encargamos de todo: configuracion, entrenamiento de la IA, integracion con tus sistemas y capacitacion de tu equipo.',
  },
  {
    question: 'Funciona con mi sistema actual?',
    answer:
      'Si. Nos integramos con las herramientas que ya usas: Instagram, WhatsApp, Gmail, CRMs, ERPs y mas.',
  },
  {
    question: 'Que puedo esperar en 30 dias?',
    answer:
      'En 30 dias debes tener un entregable funcionando o una version validable: agente configurado, flujo automatizado, demo operativa o diagnostico tecnico con plan de implementacion. No prometemos resultados comerciales magicos; prometemos avance concreto, usable y medible.',
  },
];

function scrollToForm() {
  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
}

export default function IAParaEmpresasContent() {
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
            Solicita una Demo
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
              <Bot className="w-3.5 h-3.5" />
              Inteligencia Artificial aplicada a negocios
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight mb-6"
          >
            Agentes de Inteligencia Artificial{' '}
            <span className="text-accent font-normal">para Empresas Chilenas</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Automatiza ventas, atencion al cliente y operaciones con IA. Primer entregable en semanas, con avance concreto desde el inicio.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-medium text-base hover:bg-accent/90 transition-all duration-300 shadow-accent-lg group"
            >
              Solicita una Demo Gratis
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
            Te suena familiar?
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
              Nuestros servicios
            </p>
            <h2 className="text-2xl md:text-3xl font-light">
              Soluciones con entregables <span className="text-accent">desde el primer ciclo</span>
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
              Resultados reales
            </p>
            <h2 className="text-2xl md:text-3xl font-light">
              Empresas que ya confian en nosotros
            </h2>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-12"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-light text-accent mb-1">
                  {stat.value}
                </div>
                <div className="text-white/40 text-xs md:text-sm font-light">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Client names */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-white/30 text-sm font-light mb-12"
          >
            {['Ewaffle', 'Fidelidapp', 'Puchacay'].map((name) => (
              <span
                key={name}
                className="px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02]"
              >
                {name}
              </span>
            ))}
          </motion.div>

          {/* Case study highlight */}
          <motion.div
            variants={itemVariants}
            className="max-w-lg mx-auto p-6 md:p-8 rounded-xl border border-accent/20 bg-accent/5"
          >
            <TrendingUp className="w-8 h-8 text-accent mb-4 mx-auto" />
            <div className="text-3xl md:text-4xl font-light text-accent mb-2">
              +120%
            </div>
            <div className="text-white/60 text-sm font-light mb-1">
              mas leads en 90 dias
            </div>
            <div className="text-white/30 text-xs">
              Caso Puchacay — Chatbot IA para Instagram
            </div>
          </motion.div>
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
            source="lp-ia-empresas"
            heading="Agenda tu demo gratuita"
            subtitle="Cuentanos que necesitas y te mostramos como la IA puede ayudar a tu negocio."
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
