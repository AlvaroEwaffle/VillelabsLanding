'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import {
  BookOpen,
  Code2,
  Terminal,
  Sparkles,
  AlertTriangle,
  Shield,
  FileText,
  Brain,
  Zap,
  ArrowRight,
  ArrowLeft,
  Clock,
  Eye,
  Lightbulb,
  Globe,
  Cpu,
  CheckCircle2,
  XCircle,
  ChevronDown,
  Palette,
  BarChart3,
  Users,
  RefreshCw,
  ExternalLink,
  ImageIcon,
  UserCircle,
  Paintbrush,
  SwatchBook,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   DESIGN TOKENS
   ───────────────────────────────────────────── */

const EASE = [0.6, -0.05, 0.01, 0.99] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: EASE },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

const stagger = (delay = 0.08): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: delay },
  },
});

const staggerFast = stagger(0.06);
const staggerMedium = stagger(0.1);
const staggerSlow = stagger(0.15);

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */

const MINDSET_CARDS = [
  {
    icon: Eye,
    title: 'Tu eres el director',
    description: 'Decides que se construye, como se ve y cuando esta listo. La IA no toma decisiones creativas por ti.',
  },
  {
    icon: Brain,
    title: 'La IA no piensa, predice',
    description: 'Genera el texto mas probable segun tu instruccion. No entiende tu negocio — tu si.',
  },
  {
    icon: Zap,
    title: 'Iterar es el proceso',
    description: '3 a 10 rondas de refinamiento es completamente normal. Cada iteracion mejora el resultado.',
  },
  {
    icon: FileText,
    title: 'El contexto lo es todo',
    description: 'Mas contexto = mejores resultados. Un buen prompt con contexto supera a un prompt "perfecto" sin el.',
  },
  {
    icon: Shield,
    title: 'Tu validas, siempre',
    description: 'Nunca asumir que el codigo funciona. Probar, revisar, validar. Tu eres la ultima linea de defensa.',
  },
];

const RISK_CARDS = [
  {
    icon: AlertTriangle,
    title: 'Codigo generado',
    subtitle: 'Bugs silenciosos y mantenibilidad',
    description: 'El codigo puede parecer correcto pero tener errores sutiles. Siempre revisa la logica, no solo si "compila".',
    tips: ['Leer el codigo generado antes de usarlo', 'Pedir a la IA que explique que hace cada parte', 'Probar con datos reales, no solo el "happy path"'],
  },
  {
    icon: Shield,
    title: 'Seguridad',
    subtitle: 'No pegar datos reales',
    description: 'Nunca incluyas credenciales, passwords, datos de clientes o informacion sensible en tus prompts.',
    tips: ['Usar datos ficticios en tus prompts', 'Revisar que el codigo no exponga secretos', 'No subir .env a repositorios publicos'],
  },
  {
    icon: FileText,
    title: 'Dependencia',
    subtitle: 'Documentar siempre',
    description: 'Si solo la IA sabe como funciona tu proyecto, tienes un problema. Documenta decisiones y arquitectura.',
    tips: ['Mantener un README actualizado', 'Documentar decisiones de diseno', 'Guardar tus prompts efectivos'],
  },
  {
    icon: Lightbulb,
    title: 'Expectativas',
    subtitle: 'Es habilidad, no magia',
    description: 'Vibe coding es una habilidad que mejora con practica. Los primeros resultados seran imperfectos — eso es normal.',
    tips: ['Empezar con proyectos pequenos', 'Celebrar el progreso incremental', 'No comparar con desarrolladores senior'],
  },
];

const MODULES = [
  {
    id: 0,
    title: 'Introduccion',
    duration: '15 min',
    icon: BookOpen,
    color: 'accent',
    points: [
      'Que es Vibe Coding y por que importa ahora',
      'La metafora: Tu = Director de Cine, IA = Actor',
      'Expectativas realistas del curso',
      'Configuracion: cuentas y herramientas necesarias',
    ],
  },
  {
    id: 1,
    title: 'Ecosistema de herramientas',
    duration: '25 min',
    icon: Terminal,
    color: 'accent',
    points: [
      'Claude, OpenAI Codex, Cursor, Windsurf — cuando usar cada uno',
      'Arbol de decision segun tu perfil',
      'Interfaces conversacionales vs. editores de codigo',
      'Demo: primera interaccion con cada herramienta',
    ],
  },
  {
    id: 2,
    title: 'Como hablarle a la IA',
    duration: '25 min',
    icon: Brain,
    color: 'accent',
    points: [
      'Anatomia de un prompt efectivo (5 partes)',
      'ROL + CONTEXTO + TAREA + FORMATO + RESTRICCION',
      'Antes vs. despues: prompts malos y buenos',
      'Patrones de iteracion: como refinar sin frustarte',
    ],
  },
  {
    id: 3,
    title: 'Proyectos practicos',
    duration: '90–120 min',
    icon: Code2,
    color: 'accent',
    points: [
      'Opcion A: Panel de metricas (perfil PM)',
      'Opcion B: Pagina de producto (perfil Disenador)',
      'Opcion C: Flujo de onboarding (ambos perfiles)',
      'Construccion guiada paso a paso con prompts reales',
    ],
  },
  {
    id: 4,
    title: 'Revision y siguientes pasos',
    duration: '20 min',
    icon: Sparkles,
    color: 'accent',
    points: [
      'Revision de lo construido — que salio bien, que no',
      'Checklist de calidad post-generacion',
      'Recursos para seguir aprendiendo',
      'Preview: Curso 2 — Agentes de IA',
    ],
  },
];

const TOOLS = [
  {
    name: 'Claude',
    type: 'Modelo conversacional',
    bestFor: 'Explorar ideas, generar codigo inicial, preguntar, debuggear en lenguaje natural',
    profile: 'Cualquiera que empiece',
    icon: Sparkles,
  },
  {
    name: 'OpenAI Codex',
    type: 'Modelo especializado en codigo',
    bestFor: 'Generacion tecnica y precisa, tareas de programacion especificas',
    profile: 'PM con algo de contexto tecnico',
    icon: Cpu,
  },
  {
    name: 'Cursor',
    type: 'Editor con IA integrada',
    bestFor: 'Editar, refinar y navegar un proyecto con contexto completo del codigo',
    profile: 'Quien ya tiene un proyecto y quiere iterar',
    icon: Code2,
  },
  {
    name: 'Windsurf',
    type: 'Agente autonomo',
    bestFor: 'Construir proyectos desde cero con menos intervencion manual',
    profile: 'Quien quiere delegar mas y supervisar',
    icon: Globe,
  },
];

const PROMPT_PARTS = [
  { label: 'ROL', color: '#2175a1', description: 'Define quien es la IA en esta conversacion', example: '"Eres un desarrollador frontend senior especializado en React..."' },
  { label: 'CONTEXTO', color: '#3b82f6', description: 'Informacion de fondo que la IA necesita', example: '"Estoy construyendo un dashboard para un equipo de ventas de 15 personas..."' },
  { label: 'TAREA', color: '#8b5cf6', description: 'Que quieres que haga, especificamente', example: '"Crea un componente de tabla que muestre metricas mensuales con filtros..."' },
  { label: 'FORMATO', color: '#06b6d4', description: 'Como quieres la respuesta', example: '"Responde solo con el codigo TypeScript, sin explicaciones, con comentarios inline..."' },
  { label: 'RESTRICCION', color: '#f59e0b', description: 'Que NO debe hacer o limites', example: '"No uses librerias externas. Maximo 100 lineas. Compatible con React 19..."' },
];

const PROJECTS = [
  {
    id: 'A',
    title: 'Panel de metricas',
    profile: 'Product Manager',
    profileIcon: BarChart3,
    description: 'Construye un dashboard interactivo que muestra KPIs de negocio con graficos, filtros y datos en tiempo real.',
    wireframe: [
      { type: 'header', label: 'Nav + Logo' },
      { type: 'metrics', label: '4 KPI Cards' },
      { type: 'chart', label: 'Grafico de tendencia' },
      { type: 'table', label: 'Tabla de datos' },
      { type: 'filters', label: 'Filtros + Export' },
    ],
    prompts: [
      'Crea un dashboard HTML/CSS con datos ficticios para un PM. Incluye: 3 KPI cards (usuarios activos: 12,400 / conversion: 3.2% / revenue: $48,200), una seccion de grafica placeholder en azul, y una tabla con 5 filas de eventos ficticios. Diseno limpio, fondo gris claro, cards blancas con sombra. Todo en un solo archivo HTML.',
      'Agrega un filtro de periodo (Hoy / Esta semana / Este mes) como botones en la parte superior. Al hacer click, que cambien los numeros de los KPIs por valores distintos (hardcodeados esta bien).',
      'Cambia los colores a esta paleta: primario #1D4ED8, accent #10B981. Haz que los KPI cards tengan un indicador de tendencia (+12% \u2191) en verde si es positivo, rojo si es negativo.',
    ],
  },
  {
    id: 'B',
    title: 'Pagina de producto',
    profile: 'Disenador',
    profileIcon: Palette,
    description: 'Crea una landing page de conversion con hero, features, testimonios y CTA. Diseno dark premium.',
    wireframe: [
      { type: 'hero', label: 'Hero + CTA' },
      { type: 'features', label: '3 Feature Cards' },
      { type: 'social', label: 'Testimonios' },
      { type: 'pricing', label: 'Pricing Table' },
      { type: 'cta', label: 'CTA Final' },
    ],
    prompts: [
      "Crea una landing page en HTML/CSS para una app llamada 'Aura'. Es una app de bienestar mental para jovenes profesionales. Hero: fondo degradado de #4F46E5 a #7C3AED, titulo blanco grande 'Encuentra tu calma en 5 minutos', subtitulo gris claro, boton CTA blanco con texto morado que diga 'Empieza gratis'. Navbar transparente con logo y 3 links.",
      "Debajo del hero agrega una seccion de 3 features en grid. Fondo blanco. Cada feature: emoji grande + titulo bold + descripcion de 2 lineas. Contenido: \uD83E\uDDD8 Meditaciones guiadas | \u270D\uFE0F Diario de gratitud | \uD83D\uDCCA Tu progreso",
      'Haz la pagina responsive para mobile. En pantallas menores a 768px: features en columna, hero con texto mas pequeno, nav con menu hamburguesa.',
    ],
  },
  {
    id: 'C',
    title: 'Flujo de onboarding',
    profile: 'PM + Disenador',
    profileIcon: Users,
    description: 'Disena un flujo multi-paso de onboarding con validacion, progreso visual y experiencia guiada.',
    wireframe: [
      { type: 'step1', label: 'Paso 1: Bienvenida' },
      { type: 'step2', label: 'Paso 2: Datos basicos' },
      { type: 'step3', label: 'Paso 3: Preferencias' },
      { type: 'step4', label: 'Paso 4: Confirmacion' },
      { type: 'progress', label: 'Barra de progreso' },
    ],
    prompts: [
      "Crea un onboarding de 3 pasos en HTML/CSS/JS. Cada paso es un div que se muestra u oculta con JavaScript. Paso 1: Bienvenida con emoji \uD83C\uDF89, titulo 'Hola, [nombre]', subtitulo y boton 'Empezar'. Fondo degradado morado. Barra de progreso en la parte superior que avanza cada paso.",
      "El paso 2 debe mostrar '\u00BFCual es tu rol?' con 3 cards clickeables: Disenador / Product Manager / Otro. Al seleccionar una, que se marque visualmente (borde de color + checkmark). Boton 'Siguiente' que solo se activa si hay una opcion seleccionada.",
      "El paso 3 muestra '\u00BFCual es tu objetivo principal?' con 3 opciones. Al terminar, muestra una pantalla de confirmacion con confeti (CSS animation) y un boton 'Ir al dashboard' que muestra una alerta con el resumen.",
    ],
  },
];

/* ─────────────────────────────────────────────
   DECORATIVE COMPONENTS
   ───────────────────────────────────────────── */

function FloatingDot({ x, y, delay = 0, size = 4 }: { x: string; y: string; delay?: number; size?: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-accent/30"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{
        opacity: [0.2, 0.6, 0.2],
        scale: [1, 1.5, 1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  );
}

function GradientLine() {
  return (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
  );
}

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

function SectionHeading({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.h2
      variants={fadeUp}
      className={`text-3xl md:text-4xl lg:text-5xl font-light text-white ${className}`}
    >
      {children}
    </motion.h2>
  );
}

/* ─────────────────────────────────────────────
   SECTION 1: HERO
   ───────────────────────────────────────────── */

function HeroSection() {
  const words = ['Primeros', 'Pasos', 'en', 'Vibe', 'Coding'];

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 40, rotateX: -40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        delay: 0.3 + i * 0.1,
        ease: EASE,
      },
    }),
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/3 rounded-full blur-3xl" />
        <FloatingDot x="10%" y="20%" delay={0} size={6} />
        <FloatingDot x="85%" y="15%" delay={0.5} size={4} />
        <FloatingDot x="75%" y="70%" delay={1} size={5} />
        <FloatingDot x="20%" y="80%" delay={1.5} size={3} />
        <FloatingDot x="50%" y="10%" delay={0.8} size={4} />
        <FloatingDot x="90%" y="50%" delay={1.2} size={5} />
        <FloatingDot x="5%" y="55%" delay={0.3} size={3} />
        <FloatingDot x="60%" y="85%" delay={2} size={6} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-sm mb-10"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-[11px] uppercase tracking-[0.2em] text-accent font-medium">
            Curso 1 &middot; Workshop
          </span>
        </motion.div>

        {/* Title — staggered word entrance */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white mb-8 leading-[1.1]">
          {words.map((word, i) => (
            <motion.span
              key={word + i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={wordVariants}
              className={`inline-block mr-[0.25em] ${word === 'Vibe' || word === 'Coding' ? 'text-accent' : ''}`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
          className="text-white/50 text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto"
        >
          Para Disenadores y Product Managers &middot; 2–4 horas &middot; Grabado
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: EASE }}
          className="text-white/70 text-base md:text-lg font-light leading-relaxed mb-6 max-w-3xl mx-auto"
        >
          Describe en lenguaje natural que quieres construir, y un modelo de IA genera el codigo.
          Tu diriges; la IA ejecuta. Sin experiencia en programacion necesaria.
        </motion.p>

        {/* Karpathy attribution */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2, ease: EASE }}
          className="text-white/30 text-sm font-light italic mb-14 max-w-3xl mx-auto"
        >
          El termino fue acunado por Andrej Karpathy en 2025.
        </motion.p>

        {/* Visual metaphor */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.3, ease: EASE }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-16"
        >
          <div className="flex items-center gap-3 px-6 py-4 rounded-2xl border border-accent/20 bg-slate-900/60 backdrop-blur-sm">
            <Eye className="w-6 h-6 text-accent" />
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">Tu</p>
              <p className="text-white font-light text-lg">Director de cine</p>
            </div>
          </div>

          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowRight className="w-6 h-6 text-accent/50" />
          </motion.div>

          <div className="flex items-center gap-3 px-6 py-4 rounded-2xl border border-accent/20 bg-slate-900/60 backdrop-blur-sm">
            <Cpu className="w-6 h-6 text-accent" />
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">IA</p>
              <p className="text-white font-light text-lg">Actor / Ejecutor</p>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium">Explorar curso</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-5 h-5 text-white/30" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 2: MENTALIDAD CLAVE
   ───────────────────────────────────────────── */

function MindsetSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerMedium}
          className="text-center mb-16"
        >
          <SectionLabel>Mentalidad</SectionLabel>
          <SectionHeading>
            5 ideas que cambian <span className="text-accent">todo</span>
          </SectionHeading>
          <motion.p variants={fadeUp} className="text-white/50 font-light mt-4 max-w-2xl mx-auto">
            Antes de tocar una herramienta, necesitas entender como funciona esta nueva forma de construir.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerFast}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {MINDSET_CARDS.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={fadeUp}
                className={`group relative p-8 rounded-2xl border border-accent/20 bg-slate-900/60 backdrop-blur-sm hover:border-accent/40 transition-all duration-500 ${
                  index >= 3 ? 'md:col-span-1 lg:col-span-1' : ''
                }`}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Number badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-medium">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="text-white text-xl font-light mb-3">{card.title}</h3>
                  <p className="text-white/50 text-sm font-light leading-relaxed">{card.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 3: RISKS / WARNINGS
   ───────────────────────────────────────────── */

function RiskCard({
  card,
  index,
}: {
  card: (typeof RISK_CARDS)[number];
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = card.icon;

  return (
    <motion.div
      variants={fadeUp}
      className="group relative rounded-2xl border border-amber-500/20 bg-slate-900/60 backdrop-blur-sm overflow-hidden"
    >
      {/* Amber accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-8 focus:outline-none"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-[10px] uppercase tracking-[0.2em] text-amber-400/60 font-medium">
                  Riesgo {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="text-white text-lg font-light mb-1">{card.title}</h3>
              <p className="text-amber-400/60 text-sm font-light">{card.subtitle}</p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="flex-shrink-0 mt-1"
          >
            <ChevronDown className="w-5 h-5 text-amber-400/40" />
          </motion.div>
        </div>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: EASE }}
        className="overflow-hidden"
      >
        <div className="px-8 pb-8">
          <div className="pl-14">
            <p className="text-white/50 text-sm font-light leading-relaxed mb-4">{card.description}</p>
            <ul className="space-y-2">
              {card.tips.map((tip) => (
                <li key={tip} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-amber-400/60 flex-shrink-0 mt-0.5" />
                  <span className="text-white/40 font-light">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function RisksSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerMedium}
          className="text-center mb-16"
        >
          <SectionLabel>Precauciones</SectionLabel>
          <SectionHeading>
            Lo que <span className="text-amber-400">debes saber</span> antes de empezar
          </SectionHeading>
          <motion.p variants={fadeUp} className="text-white/50 font-light mt-4 max-w-2xl mx-auto">
            Vibe coding es poderoso, pero tiene riesgos reales. Conocerlos te hace mejor.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerMedium}
          className="space-y-4"
        >
          {RISK_CARDS.map((card, index) => (
            <RiskCard key={card.title} card={card} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 4: MODULE OVERVIEW (TIMELINE)
   ───────────────────────────────────────────── */

function ModuleNode({
  module: mod,
  isLast,
}: {
  module: (typeof MODULES)[number];
  isLast: boolean;
}) {
  const Icon = mod.icon;

  return (
    <motion.div
      variants={fadeUp}
      className="relative flex gap-6 md:gap-10"
    >
      {/* Timeline connector */}
      <div className="flex flex-col items-center">
        {/* Node circle */}
        <motion.div
          variants={scaleIn}
          className="relative z-10 w-14 h-14 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center flex-shrink-0"
        >
          <Icon className="w-6 h-6 text-accent" />
        </motion.div>

        {/* Vertical line */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="w-px flex-1 bg-gradient-to-b from-accent/30 to-accent/5 origin-top mt-2"
          />
        )}
      </div>

      {/* Content */}
      <div className={`pb-12 ${isLast ? 'pb-0' : ''}`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">
            Modulo {mod.id}
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-accent/60 font-medium flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {mod.duration}
          </span>
        </div>

        <h3 className="text-white text-xl md:text-2xl font-light mb-4">{mod.title}</h3>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerFast}
          className="space-y-2"
        >
          {mod.points.map((point) => (
            <motion.div
              key={point}
              variants={fadeUp}
              className="flex items-start gap-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-accent/40 flex-shrink-0 mt-2" />
              <p className="text-white/50 text-sm font-light leading-relaxed">{point}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

function ModulesSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <FloatingDot x="92%" y="20%" delay={0.4} size={4} />
        <FloatingDot x="88%" y="60%" delay={1.2} size={3} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerMedium}
          className="text-center mb-16"
        >
          <SectionLabel>Programa</SectionLabel>
          <SectionHeading>
            5 modulos, un <span className="text-accent">camino claro</span>
          </SectionHeading>
          <motion.p variants={fadeUp} className="text-white/50 font-light mt-4 max-w-2xl mx-auto">
            De cero a tu primer proyecto construido con IA. Cada modulo se construye sobre el anterior.
          </motion.p>
        </motion.div>

        {/* Total duration badge */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-accent/20 bg-accent/5">
            <Clock className="w-4 h-4 text-accent" />
            <span className="text-sm text-white/70 font-light">Duracion total: 2–4 horas</span>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerSlow}
        >
          {MODULES.map((mod, index) => (
            <ModuleNode
              key={mod.id}
              module={mod}
              isLast={index === MODULES.length - 1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 5: TOOLS ECOSYSTEM
   ───────────────────────────────────────────── */

function ToolsSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerMedium}
          className="text-center mb-16"
        >
          <SectionLabel>Herramientas</SectionLabel>
          <SectionHeading>
            El ecosistema <span className="text-accent">Vibe Coding</span>
          </SectionHeading>
          <motion.p variants={fadeUp} className="text-white/50 font-light mt-4 max-w-2xl mx-auto">
            No necesitas todas. Necesitas la correcta para ti. Aqui te ayudamos a elegir.
          </motion.p>
        </motion.div>

        {/* Tool cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerFast}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.name}
                variants={fadeUp}
                className="group relative p-8 rounded-2xl border border-accent/20 bg-slate-900/60 backdrop-blur-sm hover:border-accent/40 transition-all duration-500"
              >
                <div className="absolute inset-0 rounded-2xl bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-white text-lg font-light">{tool.name}</h3>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">{tool.type}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium mb-1">Mejor para</p>
                      <p className="text-white/60 text-sm font-light">{tool.bestFor}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium mb-1">Perfil ideal</p>
                      <p className="text-accent/80 text-sm font-light">{tool.profile}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Decision flowchart */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerMedium}
          className="max-w-3xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-8">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium mb-2">
              Arbol de decision
            </p>
            <p className="text-white/50 text-sm font-light">
              Responde estas preguntas para encontrar tu herramienta ideal
            </p>
          </motion.div>

          <div className="space-y-4">
            {/* Question 1 */}
            <motion.div
              variants={fadeUp}
              className="relative"
            >
              <div className="p-6 rounded-2xl border border-accent/20 bg-slate-900/60 backdrop-blur-sm text-center">
                <p className="text-white/70 text-sm font-light mb-4">
                  &laquo;Quieres escribir/editar archivos de codigo directamente?&raquo;
                </p>
                <div className="flex items-center justify-center gap-8">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full border border-green-500/30 bg-green-500/10 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-green-400/60 font-medium">Si</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full border border-red-500/30 bg-red-500/10 flex items-center justify-center">
                      <XCircle className="w-4 h-4 text-red-400" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-red-400/60 font-medium">No</span>
                  </div>
                </div>
              </div>

              {/* Connector lines */}
              <div className="flex justify-center gap-8 py-2">
                <div className="w-px h-8 bg-green-500/20" />
                <div className="w-px h-8 bg-red-500/20" />
              </div>
            </motion.div>

            {/* Answers row */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="p-5 rounded-2xl border border-green-500/20 bg-green-500/5 text-center">
                <p className="text-white/60 text-sm font-light mb-2">Usa un editor con IA</p>
                <div className="flex items-center justify-center gap-2">
                  <Code2 className="w-4 h-4 text-accent" />
                  <span className="text-accent font-light">Cursor o Windsurf</span>
                </div>
              </div>
              <div className="p-5 rounded-2xl border border-red-500/20 bg-red-500/5 text-center">
                <p className="text-white/60 text-sm font-light mb-2">Usa un chat IA directo</p>
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="text-accent font-light">Claude o ChatGPT</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 6: PROMPT MASTERY
   ───────────────────────────────────────────── */

function PromptMasterySection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <FloatingDot x="15%" y="30%" delay={0.6} size={4} />
        <FloatingDot x="80%" y="70%" delay={1.4} size={5} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerMedium}
          className="text-center mb-16"
        >
          <SectionLabel>Prompts</SectionLabel>
          <SectionHeading>
            Anatomia de un <span className="text-accent">prompt efectivo</span>
          </SectionHeading>
          <motion.p variants={fadeUp} className="text-white/50 font-light mt-4 max-w-2xl mx-auto">
            Un prompt tiene 5 partes. Dominarlas es la diferencia entre resultados mediocres y resultados excelentes.
          </motion.p>
        </motion.div>

        {/* Prompt anatomy — stacked blocks */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerMedium}
          className="max-w-3xl mx-auto mb-20"
        >
          {PROMPT_PARTS.map((part, index) => (
            <motion.div
              key={part.label}
              variants={slideLeft}
              className="group relative mb-3 last:mb-0"
            >
              <div
                className="relative p-6 rounded-2xl border bg-slate-900/60 backdrop-blur-sm transition-all duration-500 hover:bg-slate-900/80"
                style={{ borderColor: `${part.color}33` }}
              >
                {/* Colored accent bar on left */}
                <div
                  className="absolute left-0 top-4 bottom-4 w-1 rounded-full"
                  style={{ backgroundColor: `${part.color}66` }}
                />

                <div className="pl-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-xs font-bold tracking-wider px-2 py-0.5 rounded"
                      style={{ color: part.color, backgroundColor: `${part.color}15` }}
                    >
                      {part.label}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium">
                      Parte {index + 1} de 5
                    </span>
                  </div>
                  <p className="text-white/60 text-sm font-light mb-2">{part.description}</p>
                  <p className="text-white/30 text-xs font-light italic">{part.example}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bad vs Good prompt comparison — 3 pairs */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerMedium}
          className="max-w-4xl mx-auto mb-20"
        >
          <motion.div variants={fadeUp} className="text-center mb-10">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium mb-2">Comparacion</p>
            <h3 className="text-2xl md:text-3xl font-light text-white">
              Antes vs. <span className="text-accent">Despues</span>
            </h3>
            <p className="text-white/40 text-sm font-light mt-3 max-w-xl mx-auto">
              3 ejemplos reales de como transformar un prompt vago en uno que genera resultados.
            </p>
          </motion.div>

          <div className="space-y-6">
            {/* Pair 1 */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative p-6 rounded-2xl border border-red-500/20 bg-red-500/5">
                <div className="absolute -top-3 left-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30">
                    <XCircle className="w-3.5 h-3.5 text-red-400" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-red-400 font-medium">Malo</span>
                  </div>
                </div>
                <div className="mt-4 p-4 rounded-xl bg-slate-900/80 border border-white/5">
                  <p className="text-red-400/70 text-sm font-mono leading-relaxed">
                    &quot;Hazme una pagina web bonita&quot;
                  </p>
                </div>
              </div>
              <div className="relative p-6 rounded-2xl border border-green-500/20 bg-green-500/5">
                <div className="absolute -top-3 left-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-green-400 font-medium">Bueno</span>
                  </div>
                </div>
                <div className="mt-4 p-4 rounded-xl bg-slate-900/80 border border-white/5">
                  <p className="text-green-400/70 text-sm font-mono leading-relaxed">
                    &quot;Crea una landing page en HTML/CSS para una app de meditacion llamada &apos;Calma&apos;. Hero con imagen de fondo oscura, titulo en blanco, subtitulo en gris claro, y boton CTA azul que diga &apos;Empieza gratis&apos;. Sin frameworks.&quot;
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Pair 2 */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative p-6 rounded-2xl border border-red-500/20 bg-red-500/5">
                <div className="absolute -top-3 left-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30">
                    <XCircle className="w-3.5 h-3.5 text-red-400" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-red-400 font-medium">Malo</span>
                  </div>
                </div>
                <div className="mt-4 p-4 rounded-xl bg-slate-900/80 border border-white/5">
                  <p className="text-red-400/70 text-sm font-mono leading-relaxed">
                    &quot;Arreglalo&quot;
                  </p>
                </div>
              </div>
              <div className="relative p-6 rounded-2xl border border-green-500/20 bg-green-500/5">
                <div className="absolute -top-3 left-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-green-400 font-medium">Bueno</span>
                  </div>
                </div>
                <div className="mt-4 p-4 rounded-xl bg-slate-900/80 border border-white/5">
                  <p className="text-green-400/70 text-sm font-mono leading-relaxed">
                    &quot;El boton CTA no se ve en mobile porque el texto se corta. Agrega un min-width de 200px y centra el texto. Muestrame solo el CSS modificado.&quot;
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Pair 3 */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative p-6 rounded-2xl border border-red-500/20 bg-red-500/5">
                <div className="absolute -top-3 left-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30">
                    <XCircle className="w-3.5 h-3.5 text-red-400" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-red-400 font-medium">Malo</span>
                  </div>
                </div>
                <div className="mt-4 p-4 rounded-xl bg-slate-900/80 border border-white/5">
                  <p className="text-red-400/70 text-sm font-mono leading-relaxed">
                    &quot;Agregale cosas&quot;
                  </p>
                </div>
              </div>
              <div className="relative p-6 rounded-2xl border border-green-500/20 bg-green-500/5">
                <div className="absolute -top-3 left-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-green-400 font-medium">Bueno</span>
                  </div>
                </div>
                <div className="mt-4 p-4 rounded-xl bg-slate-900/80 border border-white/5">
                  <p className="text-green-400/70 text-sm font-mono leading-relaxed">
                    &quot;Al hero actual, agrega debajo una seccion de 3 features en columnas. Cada feature: icono emoji + titulo + descripcion de 2 lineas. Contenido: 1) Sin estres 2) 5 min al dia 3) Para todos los niveles.&quot;
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Como dar contexto */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerMedium}
          className="max-w-4xl mx-auto mb-20"
        >
          <motion.div variants={fadeUp} className="text-center mb-10">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium mb-2">Contexto</p>
            <h3 className="text-2xl md:text-3xl font-light text-white">
              Como dar <span className="text-accent">contexto</span>
            </h3>
            <p className="text-white/40 text-sm font-light mt-3 max-w-xl mx-auto">
              4 formas de darle a la IA la informacion que necesita para generar exactamente lo que quieres.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerFast}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {[
              {
                icon: ImageIcon,
                title: 'Wireframe o sketch',
                example: 'Adjunto wireframe. Respeta la jerarquia visual: logo arriba izquierda, nav derecha, hero centrado.',
              },
              {
                icon: UserCircle,
                title: 'User story',
                example: 'El usuario es un PM que quiere ver sus KPIs de un vistazo en menos de 5 segundos.',
              },
              {
                icon: Paintbrush,
                title: 'Referencia visual',
                example: 'Inspiracion: stripe.com en terminos de limpieza y uso de whitespace.',
              },
              {
                icon: SwatchBook,
                title: 'Design tokens',
                example: 'Paleta: primario #6B21A8, texto #111827, fondo #F9FAFB. Tipografia: Inter.',
              },
            ].map((item) => {
              const ItemIcon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="group relative p-6 rounded-2xl border border-accent/20 bg-slate-900/60 backdrop-blur-sm hover:border-accent/40 transition-all duration-500"
                >
                  <div className="absolute inset-0 rounded-2xl bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                        <ItemIcon className="w-5 h-5 text-accent" />
                      </div>
                      <h4 className="text-white text-lg font-light">{item.title}</h4>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5">
                      <p className="text-white/50 text-sm font-mono leading-relaxed italic">
                        &quot;{item.example}&quot;
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Iteration Flow */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerMedium}
          className="max-w-3xl mx-auto mb-20"
        >
          <motion.div variants={fadeUp} className="text-center mb-10">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium mb-2">Iteracion</p>
            <h3 className="text-2xl md:text-3xl font-light text-white">
              El flujo correcto de <span className="text-accent">iteracion</span>
            </h3>
          </motion.div>

          <motion.div variants={fadeUp} className="p-6 md:p-8 rounded-2xl border border-accent/20 bg-slate-900/60 backdrop-blur-sm">
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full border border-accent/30 bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-accent font-medium">1</span>
                </div>
                <div className="flex-1">
                  <p className="text-white/60 text-sm font-mono leading-relaxed p-3 rounded-lg bg-slate-950/60 border border-white/5">
                    Prompt 1: [Genera el codigo base]
                  </p>
                  <div className="flex items-center gap-2 ml-4 mt-2">
                    <ArrowRight className="w-4 h-4 text-accent/40" />
                    <span className="text-accent/50 text-xs font-light">Output A</span>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full border border-accent/30 bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-accent font-medium">2</span>
                </div>
                <div className="flex-1">
                  <p className="text-white/60 text-sm font-mono leading-relaxed p-3 rounded-lg bg-slate-950/60 border border-white/5">
                    &quot;Sobre lo anterior, cambia SOLO el color del boton a verde #10B981&quot;
                  </p>
                  <div className="flex items-center gap-2 ml-4 mt-2">
                    <ArrowRight className="w-4 h-4 text-accent/40" />
                    <span className="text-accent/50 text-xs font-light">Output B (solo el cambio pedido)</span>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full border border-accent/30 bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-accent font-medium">3</span>
                </div>
                <div className="flex-1">
                  <p className="text-white/60 text-sm font-mono leading-relaxed p-3 rounded-lg bg-slate-950/60 border border-white/5">
                    &quot;Ahora agrega una seccion de testimonios debajo del hero. Manten todo lo demas.&quot;
                  </p>
                  <div className="flex items-center gap-2 ml-4 mt-2">
                    <ArrowRight className="w-4 h-4 text-accent/40" />
                    <span className="text-accent/50 text-xs font-light">Output C</span>
                  </div>
                </div>
              </div>

              {/* Warning */}
              <div className="flex items-start gap-3 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 mt-4">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-400/80 text-sm font-medium mb-1">EVITAR</p>
                  <p className="text-white/40 text-sm font-light">
                    &quot;Mejoralo&quot; o &quot;Hazlo mejor&quot; — la IA puede cambiar todo sin avisar
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Common Errors & Recovery */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerMedium}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-10">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium mb-2">Recuperacion</p>
            <h3 className="text-2xl md:text-3xl font-light text-white">
              Errores comunes y como <span className="text-accent">recuperarse</span>
            </h3>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerFast}
            className="space-y-4"
          >
            {[
              {
                error: 'La IA cambio cosas que no pedi',
                recovery: '"Tengo la version anterior. Quiero que apliques SOLO este cambio: [X]. No modifiques nada mas."',
              },
              {
                error: 'El codigo tiene un error y no se donde',
                recovery: '"Este codigo da el siguiente error: [pegar error]. Explicame que lo causa y corrigelo."',
              },
              {
                error: 'El resultado no se parece a lo que queria',
                recovery: 'Volver a describir con mas detalle. Agregar referencia visual o ejemplo especifico.',
              },
              {
                error: 'La IA entro en loop o se contradice',
                recovery: 'Empezar una conversacion nueva. La memoria de contexto se satura.',
              },
              {
                error: 'No entiendo el codigo generado',
                recovery: '"Explica este bloque como si yo no supiera programar. Usa analogias simples."',
              },
            ].map((item, index) => (
              <motion.div
                key={item.error}
                variants={fadeUp}
                className="group relative p-6 rounded-2xl border border-accent/20 bg-slate-900/60 backdrop-blur-sm hover:border-accent/40 transition-all duration-500"
              >
                <div className="absolute inset-0 rounded-2xl bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                  <div className="flex items-start gap-3 md:w-2/5">
                    <div className="w-8 h-8 rounded-full border border-red-500/20 bg-red-500/10 flex items-center justify-center flex-shrink-0">
                      <XCircle className="w-4 h-4 text-red-400" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-red-400/60 font-medium mb-1">Error {String(index + 1).padStart(2, '0')}</p>
                      <p className="text-white/70 text-sm font-light">{item.error}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 md:w-3/5">
                    <div className="w-8 h-8 rounded-full border border-green-500/20 bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <RefreshCw className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-green-400/60 font-medium mb-1">Solucion</p>
                      <p className="text-white/50 text-sm font-light font-mono leading-relaxed">{item.recovery}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 7: PROJECTS
   ───────────────────────────────────────────── */

function WireframeBlock({ label, type }: { label: string; type: string }) {
  const heightMap: Record<string, string> = {
    header: 'h-8',
    hero: 'h-14',
    metrics: 'h-10',
    chart: 'h-20',
    table: 'h-16',
    filters: 'h-8',
    features: 'h-12',
    social: 'h-12',
    pricing: 'h-14',
    cta: 'h-10',
    step1: 'h-12',
    step2: 'h-14',
    step3: 'h-14',
    step4: 'h-12',
    progress: 'h-6',
  };

  return (
    <div
      className={`w-full ${heightMap[type] || 'h-10'} rounded-lg border border-accent/15 bg-accent/5 flex items-center justify-center`}
    >
      <span className="text-[9px] uppercase tracking-[0.15em] text-accent/40 font-medium">{label}</span>
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  const [showPrompts, setShowPrompts] = useState(false);
  const Icon = project.profileIcon;

  return (
    <motion.div
      variants={fadeUp}
      className="group relative rounded-2xl border border-accent/20 bg-slate-900/60 backdrop-blur-sm overflow-hidden"
    >
      {/* Gradient border top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">
                Opcion {project.id}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-[0.15em] font-medium border border-accent/20 bg-accent/5 text-accent/80">
                <Icon className="w-3 h-3" />
                {project.profile}
              </span>
            </div>
            <h3 className="text-white text-xl md:text-2xl font-light">{project.title}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
            <span className="text-accent text-lg font-light">{project.id}</span>
          </div>
        </div>

        <p className="text-white/50 text-sm font-light leading-relaxed mb-8">{project.description}</p>

        {/* Wireframe diagram */}
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium mb-3">
            Estructura del proyecto
          </p>
          <div className="p-4 rounded-xl border border-white/5 bg-slate-950/50 space-y-2">
            {project.wireframe.map((block) => (
              <WireframeBlock key={block.label} label={block.label} type={block.type} />
            ))}
          </div>
        </div>

        {/* Prompt sequence toggle */}
        <button
          onClick={() => setShowPrompts(!showPrompts)}
          className="flex items-center gap-2 text-accent/70 hover:text-accent transition-colors duration-300 group/btn"
        >
          <span className="text-sm font-light">Ver secuencia de prompts</span>
          <motion.div
            animate={{ rotate: showPrompts ? 180 : 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>

        <motion.div
          initial={false}
          animate={{
            height: showPrompts ? 'auto' : 0,
            opacity: showPrompts ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: EASE }}
          className="overflow-hidden"
        >
          <div className="pt-4 space-y-4">
            {project.prompts.map((prompt, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full border border-accent/20 bg-accent/5 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[10px] text-accent/60 font-medium">{i + 1}</span>
                </div>
                <div className="flex-1 p-3 rounded-lg bg-slate-950/60 border border-white/5">
                  <p className="text-white/50 text-xs font-mono leading-relaxed">{prompt}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ProjectsSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/3 rounded-full blur-3xl" />
        <FloatingDot x="5%" y="40%" delay={0.2} size={5} />
        <FloatingDot x="95%" y="30%" delay={0.9} size={3} />
        <FloatingDot x="50%" y="90%" delay={1.6} size={4} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerMedium}
          className="text-center mb-16"
        >
          <SectionLabel>Proyectos</SectionLabel>
          <SectionHeading>
            Elige tu <span className="text-accent">aventura</span>
          </SectionHeading>
          <motion.p variants={fadeUp} className="text-white/50 font-light mt-4 max-w-2xl mx-auto">
            Tres proyectos reales, tres perfiles distintos. Todos construidos desde cero con prompts durante el curso.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerMedium}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 8: DEMO EXERCISE
   ───────────────────────────────────────────── */

function DemoExerciseSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <FloatingDot x="20%" y="25%" delay={0.3} size={4} />
        <FloatingDot x="78%" y="65%" delay={1.1} size={5} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerMedium}
          className="text-center mb-16"
        >
          <SectionLabel>Ejercicio en vivo</SectionLabel>
          <SectionHeading>
            Ejercicio <span className="text-accent">comparativo</span>
          </SectionHeading>
          <motion.p variants={fadeUp} className="text-white/50 font-light mt-4 max-w-2xl mx-auto">
            10 minutos para entender como cada herramienta responde al mismo prompt.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerMedium}
          className="max-w-3xl mx-auto"
        >
          <motion.div variants={fadeUp} className="p-6 md:p-8 rounded-2xl border border-accent/20 bg-slate-900/60 backdrop-blur-sm">
            {/* The prompt */}
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium mb-3">El prompt</p>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-accent/10">
                <p className="text-accent/80 text-sm font-mono leading-relaxed">
                  &quot;Crea una tabla HTML con 3 columnas: nombre, rol, email&quot;
                </p>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-5">
              {[
                {
                  step: '1',
                  text: 'Dar el MISMO prompt a Claude y a Codex',
                  detail: 'Observar como cada herramienta interpreta la misma instruccion',
                },
                {
                  step: '2',
                  text: 'Comparar los outputs',
                  detail: 'Formato, comentarios, legibilidad — cada modelo tiene su estilo',
                },
                {
                  step: '3',
                  text: 'Abrir el output de Claude en Cursor',
                  detail: 'Pedir que agregue estilos CSS basicos — ver el poder del editor con IA',
                },
                {
                  step: '4',
                  text: 'Probar Windsurf con un prompt mas largo',
                  detail: 'Mostrar como genera el archivo completo con menos intervencion',
                },
              ].map((item) => (
                <motion.div key={item.step} variants={fadeUp} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full border border-accent/30 bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-accent font-medium">{item.step}</span>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm font-light">{item.text}</p>
                    <p className="text-white/30 text-xs font-light mt-1">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 9: RESOURCES & COMMUNITIES
   ───────────────────────────────────────────── */

function ResourcesSection() {
  const resources = [
    {
      name: 'Claude — Documentacion oficial',
      url: 'https://docs.anthropic.com',
      description: 'Documentacion oficial de Claude. Guias, API reference, y mejores practicas.',
    },
    {
      name: 'Cursor — Docs',
      url: 'https://cursor.sh/docs',
      description: 'Documentacion de Cursor. Configuracion, atajos y flujos de trabajo.',
    },
    {
      name: 'Windsurf',
      url: 'https://codeium.com/windsurf',
      description: 'El editor con agente autonomo. Descarga y documentacion.',
    },
    {
      name: 'OpenAI Codex — Guia de codigo',
      url: 'https://platform.openai.com/docs/guides/code',
      description: 'Guia oficial de OpenAI para generacion de codigo.',
    },
    {
      name: 'Fireship — Vibe Coding',
      url: 'https://youtube.com',
      description: 'Tutorial en video: "Fireship vibe coding" — explicacion visual y rapida.',
    },
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerMedium}
          className="text-center mb-16"
        >
          <SectionLabel>Recursos</SectionLabel>
          <SectionHeading>
            Para seguir <span className="text-accent">aprendiendo</span>
          </SectionHeading>
          <motion.p variants={fadeUp} className="text-white/50 font-light mt-4 max-w-2xl mx-auto">
            Las herramientas evolucionan rapido. Estos son los recursos oficiales para mantenerte actualizado.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerFast}
          className="space-y-3"
        >
          {resources.map((resource) => (
            <motion.a
              key={resource.name}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              className="group flex items-center justify-between p-5 rounded-2xl border border-accent/20 bg-slate-900/60 backdrop-blur-sm hover:border-accent/40 hover:bg-slate-900/80 transition-all duration-500"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors duration-300">
                  <ExternalLink className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h4 className="text-white/80 text-sm font-light group-hover:text-white transition-colors">{resource.name}</h4>
                  <p className="text-white/30 text-xs font-light mt-1">{resource.description}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-accent transition-colors flex-shrink-0 ml-4" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 10: CTA
   ───────────────────────────────────────────── */

function CTASection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
        <FloatingDot x="10%" y="20%" delay={0} size={6} />
        <FloatingDot x="90%" y="80%" delay={0.7} size={5} />
        <FloatingDot x="50%" y="50%" delay={1.3} size={4} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerMedium}
        >
          <SectionLabel>Siguiente nivel</SectionLabel>

          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6"
          >
            Listo para <span className="text-accent">construir</span>?
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-white/50 font-light text-lg max-w-2xl mx-auto mb-12"
          >
            Este es solo el comienzo. Despues de dominar Vibe Coding, el Curso 2 te ensenara a construir
            Agentes de IA que trabajan para ti automaticamente.
          </motion.p>

          {/* CTA Cards */}
          <motion.div
            variants={staggerFast}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto"
          >
            {/* Next course card */}
            <motion.div variants={fadeUp}>
              <Link
                href="/workshops/ai-agents"
                className="group block p-8 rounded-2xl border border-accent/30 bg-accent/5 hover:bg-accent/10 hover:border-accent/50 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                  <Sparkles className="w-5 h-5 text-accent" />
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium mb-2">
                  Curso 2
                </p>
                <h3 className="text-white text-lg font-light mb-2">Agentes de IA</h3>
                <p className="text-white/40 text-sm font-light mb-4">
                  Construye agentes que automatizan tareas reales de tu trabajo.
                </p>
                <div className="flex items-center justify-center gap-2 text-accent/70 group-hover:text-accent transition-colors">
                  <span className="text-sm font-light">Explorar curso</span>
                  <motion.div
                    className="inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </Link>
            </motion.div>

            {/* Contact card */}
            <motion.div variants={fadeUp}>
              <Link
                href="/contact"
                className="group block p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/10 transition-colors duration-300">
                  <Users className="w-5 h-5 text-white/60" />
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium mb-2">
                  Contacto
                </p>
                <h3 className="text-white text-lg font-light mb-2">Necesitas ayuda?</h3>
                <p className="text-white/40 text-sm font-light mb-4">
                  Consultoria personalizada para tu equipo o proyecto.
                </p>
                <div className="flex items-center justify-center gap-2 text-white/50 group-hover:text-white/70 transition-colors">
                  <span className="text-sm font-light">Hablemos</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 11: BACK LINK
   ───────────────────────────────────────────── */

function BackLink() {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <GradientLine />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="pt-8 flex items-center justify-between"
        >
          <Link
            href="/workshops"
            className="group inline-flex items-center gap-2 text-white/40 hover:text-accent transition-colors duration-300"
          >
            <motion.div
              className="inline-block"
              whileHover={{ x: -4 }}
              transition={{ duration: 0.2, ease: EASE }}
            >
              <ArrowLeft className="w-4 h-4" />
            </motion.div>
            <span className="text-sm font-light">Volver a talleres</span>
          </Link>

          <Link
            href="/workshops/ai-agents"
            className="group inline-flex items-center gap-2 text-white/40 hover:text-accent transition-colors duration-300"
          >
            <span className="text-sm font-light">Curso 2: Agentes de IA</span>
            <motion.div
              className="inline-block"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2, ease: EASE }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
   ───────────────────────────────────────────── */

export default function VibeCodingContent() {
  return (
    <main className="bg-main min-h-screen">
      <HeroSection />
      <GradientLine />
      <MindsetSection />
      <GradientLine />
      <RisksSection />
      <GradientLine />
      <ModulesSection />
      <GradientLine />
      <ToolsSection />
      <GradientLine />
      <PromptMasterySection />
      <GradientLine />
      <ProjectsSection />
      <GradientLine />
      <DemoExerciseSection />
      <GradientLine />
      <ResourcesSection />
      <GradientLine />
      <CTASection />
      <BackLink />
    </main>
  );
}
