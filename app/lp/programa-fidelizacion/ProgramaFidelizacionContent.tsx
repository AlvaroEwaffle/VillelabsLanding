'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Star,
  Trophy,
  Wallet,
  BarChart3,
  ShoppingCart,
  UserMinus,
  Eye,
  ChevronDown,
  Gift,
  Zap,
  Check,
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
    icon: ShoppingCart,
    question: 'Tus clientes compran una vez y no vuelven?',
    detail:
      'Un programa de fidelizacion transforma compradores casuales en clientes recurrentes con incentivos claros.',
  },
  {
    icon: UserMinus,
    question: 'Gastas en captar clientes nuevos sin retener los actuales?',
    detail:
      'Retener un cliente cuesta 5x menos que adquirir uno nuevo. La fidelizacion es la inversion mas rentable.',
  },
  {
    icon: Eye,
    question: 'No tienes datos de comportamiento de compra?',
    detail:
      'Cada transaccion genera data valiosa: frecuencia, ticket promedio, productos favoritos. Toma decisiones con datos.',
  },
];

const features = [
  {
    icon: Star,
    title: 'Sistema de Puntos',
    description:
      'Tus clientes acumulan puntos por cada compra. Definen las reglas: cuantos puntos por peso, premios canjeables y mas.',
  },
  {
    icon: Trophy,
    title: 'Niveles y Premios',
    description:
      'Gamificacion que motiva compras recurrentes. Bronce, Plata, Oro: cada nivel desbloquea beneficios exclusivos.',
  },
  {
    icon: Wallet,
    title: 'Cashback Digital',
    description:
      'Devuelve un porcentaje automaticamente al monedero digital del cliente. Simple, transparente, efectivo.',
  },
  {
    icon: BarChart3,
    title: 'Panel de Control',
    description:
      'Metricas en tiempo real: clientes activos, puntos emitidos, canjes, retencion. Todo en un dashboard intuitivo.',
  },
];

const pricingFeatures = [
  'Sistema de puntos completo',
  'Panel de administracion',
  'App web para tus clientes',
  'Reportes y metricas',
  'Soporte por WhatsApp',
  'Sin contrato anual',
];

const faqs = [
  {
    question: 'Cuanto demora activar el programa?',
    answer:
      'Tu programa puede estar activo en 24 horas. Configuramos todo por ti: reglas de puntos, premios, niveles y diseno personalizado.',
  },
  {
    question: 'Mis clientes necesitan descargar una app?',
    answer:
      'No. Fidelidapp funciona como una aplicacion web. Tus clientes acceden desde cualquier navegador sin necesidad de instalar nada.',
  },
  {
    question: 'Puedo personalizar el programa con mi marca?',
    answer:
      'Si. Logo, colores, nombre del programa, reglas de puntos y premios: todo se adapta a la identidad de tu negocio.',
  },
  {
    question: 'Que pasa si quiero cancelar?',
    answer:
      'Sin contrato anual. Puedes cancelar cuando quieras. Ofrecemos 30 dias de prueba gratis para que valides el impacto antes de comprometerte.',
  },
];

function scrollToForm() {
  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
}

export default function ProgramaFidelizacionContent() {
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
            Prueba Gratis
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
              <Gift className="w-3.5 h-3.5" />
              Programa de fidelizacion digital
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight mb-6"
          >
            Programa de Fidelizacion Digital{' '}
            <span className="text-accent font-normal">para Tu Negocio</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Puntos, descuentos y cashback. Tu programa de lealtad propio, activo en 24 horas.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-medium text-base hover:bg-accent/90 transition-all duration-300 shadow-accent-lg group"
            >
              Prueba Gratis 30 Dias
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
            Te pasa esto?
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

      {/* Features */}
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
              Funcionalidades
            </p>
            <h2 className="text-2xl md:text-3xl font-light">
              Todo lo que necesitas para <span className="text-accent">fidelizar clientes</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="group p-6 md:p-8 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-accent/20 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-5 group-hover:bg-accent/15 transition-colors">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-white text-lg font-medium mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/40 text-sm font-light leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Pricing */}
      <motion.section
        className="py-16 md:py-24 px-4 sm:px-6 border-t border-white/[0.04]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="max-w-lg mx-auto text-center">
          <motion.div variants={itemVariants} className="mb-8">
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-3">
              Precio simple y transparente
            </p>
            <h2 className="text-2xl md:text-3xl font-light mb-2">
              Un solo plan, todo incluido
            </h2>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="p-8 md:p-10 rounded-2xl border border-accent/20 bg-accent/5"
          >
            <div className="text-4xl md:text-5xl font-light text-accent mb-1">
              $49.990
            </div>
            <div className="text-white/40 text-sm font-light mb-6">
              CLP / mes — sin contrato anual
            </div>

            <ul className="text-left max-w-xs mx-auto space-y-3 mb-8">
              {pricingFeatures.map((feat) => (
                <li key={feat} className="flex items-center gap-3 text-white/70 text-sm font-light">
                  <Check className="w-4 h-4 text-accent shrink-0" />
                  {feat}
                </li>
              ))}
            </ul>

            <div className="p-3 rounded-lg bg-accent/10 border border-accent/20 mb-6">
              <p className="text-accent text-sm font-medium">
                Prueba gratis 30 dias
              </p>
              <p className="text-white/40 text-xs font-light">
                Sin tarjeta de credito. Cancela cuando quieras.
              </p>
            </div>

            <button
              onClick={scrollToForm}
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent text-white font-medium text-base hover:bg-accent/90 transition-all duration-300 shadow-accent-lg group"
            >
              Comenzar Prueba Gratis
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
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
            source="lp-programa-fidelizacion"
            heading="Activa tu programa de fidelizacion"
            subtitle="Cuentanos sobre tu negocio y te ayudamos a configurar tu programa en 24 horas."
            submitText="Comenzar ahora"
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
