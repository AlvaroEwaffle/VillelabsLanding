'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ChevronDown,
  Rocket,
  Clock,
  Code2,
  Users,
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
    icon: Clock,
    question: 'Los freelance te asustaron con precios o plazos vagos?',
    detail:
      'Presupuesto cerrado, entregas semanales y un equipo que responde el mismo dia.',
  },
  {
    icon: Users,
    question: 'Las agencias grandes te pidieron 3 meses de descubrimiento?',
    detail:
      'En 2 semanas ya tienes algo funcionando. No vendemos workshops, entregamos software.',
  },
  {
    icon: Code2,
    question: 'Necesitas alguien que entienda de producto, no solo de codear?',
    detail:
      'Equipo con experiencia en startups. Opinamos sobre alcance, priorizacion y go-to-market.',
  },
];

const process = [
  {
    icon: ClipboardList,
    step: '01',
    title: 'Briefing estrategico',
    description:
      'Llamada de diagnostico, definicion de alcance MVP y roadmap de 4-6 semanas. Sin costo.',
  },
  {
    icon: Hammer,
    step: '02',
    title: 'Construccion con sprints semanales',
    description:
      'Cada semana vemos avance real y ajustamos. Sin sorpresas, sin alcance que se dispara.',
  },
  {
    icon: LineChart,
    step: '03',
    title: 'Lanzamiento y medicion',
    description:
      'Deploy, metricas desde el dia 1 y 30 dias de optimizacion incluidos para iterar sobre data real.',
  },
];

const caseStudies = [
  {
    name: 'Jooycar',
    category: 'Insurtech · Vehiculos conectados',
    result: 'Plataforma multi-pais',
  },
  {
    name: 'Revenue AI System',
    category: 'IA empresarial',
    result: '3x rendimiento operativo',
  },
  {
    name: 'We Techs',
    category: 'Plataforma IoT industrial',
    result: 'MVP a producto escalable',
  },
];

const stats = [
  { value: '4-6 sem', label: 'Al primer MVP funcional' },
  { value: '+50', label: 'Empresas atendidas' },
  { value: '100%', label: 'Codigo tuyo desde el dia 1' },
];

const faqs = [
  {
    question: 'Cuanto cuesta un MVP con ustedes?',
    answer:
      'Entre $3M y $8M CLP dependiendo del alcance. En la llamada de diagnostico te damos un rango acotado para tu caso y un desglose de que incluye cada sprint.',
  },
  {
    question: 'En cuanto tiempo queda listo?',
    answer:
      '4 a 6 semanas para un MVP funcional. Plataformas mas complejas (multi-rol, pagos, integraciones) pueden tomar 8-10 semanas, siempre con entregas semanales.',
  },
  {
    question: 'De quien es el codigo?',
    answer:
      'Tuyo. 100%. Te entregamos el repositorio desde el dia 1 y puedes cambiar de equipo cuando quieras. Usamos stacks estandar para que cualquier dev senior pueda retomar.',
  },
  {
    question: 'Que stack usan?',
    answer:
      'Stack moderno y mainstream: React/Next.js, Node, PostgreSQL, AWS. Nos adaptamos si tu equipo tecnico o tu inversor pide algo distinto.',
  },
  {
    question: 'Que pasa despues del lanzamiento?',
    answer:
      '30 dias de optimizacion incluidos. Despues puedes contratar mantencion mensual, iteracion por sprints o llevarte el codigo con tu equipo interno.',
  },
  {
    question: 'Hacen solo MVP o tambien iteraciones post-lanzamiento?',
    answer:
      'Ambos. Muchos clientes continuan con nosotros 6+ meses en modalidad de sprints mensuales una vez validado el producto.',
  },
];

function scrollToForm() {
  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
}

export default function MvpStartupContent() {
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
              <Rocket className="w-3.5 h-3.5" />
              Desarrollo de MVPs para startups
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight mb-6"
          >
            Lanza tu MVP en{' '}
            <span className="text-accent font-normal">4-6 semanas</span>.
            <br className="hidden md:block" />
            Sin agencia generica, sin freelance impredecible.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Construimos MVPs y plataformas SaaS para startups que ya validaron su idea y necesitan ejecutar. Proceso claro, entregas semanales, equipo dedicado.
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
            30 minutos · Sin costo · +50 empresas atendidas · Desde Santiago, para LatAm
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
            Te identificas con esto?
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
              Nuestro proceso
            </p>
            <h2 className="text-2xl md:text-3xl font-light">
              3 pasos, sin cambios de alcance
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
              Casos relevantes para tu startup
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
            source="lp-mvp-startup"
            heading="Agenda tu llamada de diagnostico"
            subtitle="30 minutos sin costo. Salis con un rango de precio, timeline y recomendacion de alcance."
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
