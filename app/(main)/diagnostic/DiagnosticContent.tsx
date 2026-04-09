'use client';

import { useState, useMemo, useCallback, useEffect, useRef, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Building2,
  Users,
  Globe,
  Wrench,
  MessageSquare,
  Bot,
  DollarSign,
  Clock,
  Target,
  ArrowLeft,
  Calendar,
  MessageCircle,
  Sparkles,
  Lightbulb,
  Heart,
  Monitor,
  BarChart3,
  Mail,
  User,
  Phone,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Category = 'ai_agents' | 'custom_software' | 'loyalty_program' | 'website' | 'consulting';

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const EASE_SMOOTH = [0.6, -0.05, 0.01, 0.99] as const;

const QUESTION_ICONS = [
  Briefcase,     // Q1: mayor dolor
  Building2,     // Q2: tipo de negocio
  Users,         // Q3: equipo
  Globe,         // Q4: sitio web
  Wrench,        // Q5: herramientas
  MessageSquare, // Q6: comunicación
  Bot,           // Q7: automatización/IA
  DollarSign,    // Q8: presupuesto
  Clock,         // Q9: urgencia
  Target,        // Q10: resultado esperado
];

const CATEGORY_ICONS: Record<Category, React.ElementType> = {
  ai_agents: Sparkles,
  custom_software: Wrench,
  loyalty_program: Heart,
  website: Monitor,
  consulting: Lightbulb,
};

/**
 * Scoring matrix: each question maps to an array of category weights per answer option.
 * Format: SCORING_MAP[questionIndex][answerIndex] = { category: weight }
 */
const SCORING_MAP: Record<Category, number>[][] = [
  // Q1: Mayor dolor
  [
    { ai_agents: 1, website: 2, consulting: 1, custom_software: 0, loyalty_program: 0 },   // No llegan clientes
    { loyalty_program: 3, ai_agents: 1, website: 0, consulting: 0, custom_software: 0 },    // Pierdo clientes
    { ai_agents: 2, custom_software: 2, consulting: 0, website: 0, loyalty_program: 0 },    // Tareas manuales
    { consulting: 2, custom_software: 1, ai_agents: 0, website: 0, loyalty_program: 0 },    // Sin métricas
  ],
  // Q2: Tipo de negocio
  [
    { loyalty_program: 2, website: 1, ai_agents: 0, custom_software: 0, consulting: 0 },    // Comercio/Retail
    { website: 1, consulting: 1, ai_agents: 0, custom_software: 0, loyalty_program: 0 },    // Servicios profesionales
    { custom_software: 2, consulting: 1, ai_agents: 0, website: 0, loyalty_program: 0 },    // B2B
    { website: 2, ai_agents: 1, custom_software: 0, loyalty_program: 0, consulting: 0 },    // Startup
  ],
  // Q3: Tamaño equipo
  [
    { website: 2, consulting: 1, ai_agents: 0, custom_software: 0, loyalty_program: 0 },    // Solo yo
    { ai_agents: 1, website: 1, custom_software: 0, loyalty_program: 0, consulting: 0 },    // 2-5
    { custom_software: 2, ai_agents: 1, website: 0, loyalty_program: 0, consulting: 0 },    // 6-20
    { custom_software: 3, consulting: 1, ai_agents: 0, website: 0, loyalty_program: 0 },    // >20
  ],
  // Q4: Sitio web
  [
    { website: 3, consulting: 1, ai_agents: 0, custom_software: 0, loyalty_program: 0 },    // Sí pero no genera
    { ai_agents: 1, consulting: 1, website: 0, custom_software: 0, loyalty_program: 0 },    // Sí y funciona
    { website: 3, consulting: 0, ai_agents: 0, custom_software: 0, loyalty_program: 0 },    // No tengo
    { website: 3, consulting: 0, ai_agents: 0, custom_software: 0, loyalty_program: 0 },    // Desactualizado
  ],
  // Q5: Herramientas
  [
    { custom_software: 3, consulting: 1, ai_agents: 0, website: 0, loyalty_program: 0 },    // Excel
    { ai_agents: 1, consulting: 1, custom_software: 0, website: 0, loyalty_program: 0 },    // CRM
    { ai_agents: 1, consulting: 0, custom_software: 0, website: 0, loyalty_program: 0 },    // Software a medida
    { custom_software: 2, website: 1, ai_agents: 0, loyalty_program: 0, consulting: 0 },    // Casi nada
  ],
  // Q6: Comunicación con clientes
  [
    { ai_agents: 2, loyalty_program: 1, custom_software: 0, website: 0, consulting: 0 },    // WhatsApp personal
    { ai_agents: 1, custom_software: 1, website: 0, loyalty_program: 0, consulting: 0 },    // Email/teléfono
    { ai_agents: 2, website: 1, custom_software: 0, loyalty_program: 0, consulting: 0 },    // Redes sociales
    { consulting: 1, ai_agents: 0, custom_software: 0, website: 0, loyalty_program: 0 },    // Tickets/chat
  ],
  // Q7: Automatización/IA
  [
    { ai_agents: 3, consulting: 1, custom_software: 0, website: 0, loyalty_program: 0 },    // Nunca
    { ai_agents: 2, consulting: 2, custom_software: 0, website: 0, loyalty_program: 0 },    // Sí pero no funcionó
    { ai_agents: 2, consulting: 1, custom_software: 0, website: 0, loyalty_program: 0 },    // Evaluando
    { consulting: 1, ai_agents: 1, custom_software: 0, website: 0, loyalty_program: 0 },    // Ya usan algo
  ],
  // Q8: Presupuesto
  [
    { website: 1, ai_agents: 0, custom_software: 0, loyalty_program: 0, consulting: 0 },    // <$100
    { ai_agents: 1, loyalty_program: 1, website: 0, custom_software: 0, consulting: 0 },    // $100-500
    { consulting: 2, custom_software: 1, ai_agents: 0, website: 0, loyalty_program: 0 },    // $500-2000
    { consulting: 3, custom_software: 2, ai_agents: 0, website: 0, loyalty_program: 0 },    // >$2000
  ],
  // Q9: Urgencia
  [
    { ai_agents: 1, website: 1, custom_software: 0, loyalty_program: 0, consulting: 0 },    // Crítico
    { consulting: 1, ai_agents: 0, custom_software: 0, website: 0, loyalty_program: 0 },    // Importante
    { consulting: 1, ai_agents: 0, custom_software: 0, website: 0, loyalty_program: 0 },    // Explorando
    { consulting: 1, ai_agents: 0, custom_software: 0, website: 0, loyalty_program: 0 },    // Informarme
  ],
  // Q10: Resultado esperado
  [
    { website: 2, ai_agents: 1, custom_software: 0, loyalty_program: 0, consulting: 0 },    // Más clientes/ventas
    { ai_agents: 2, custom_software: 2, website: 0, loyalty_program: 0, consulting: 0 },    // Menos trabajo manual
    { loyalty_program: 3, ai_agents: 1, website: 0, custom_software: 0, consulting: 0 },    // Mejor retención
    { consulting: 2, custom_software: 1, ai_agents: 0, website: 0, loyalty_program: 0 },    // Datos claros
  ],
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

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

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function DiagnosticContent() {
  const { t } = useTranslation();

  const questions = useMemo(
    () =>
      t.pages.diagnostic.questions.map((q, i) => ({
        id: i + 1,
        text: q.text,
        icon: QUESTION_ICONS[i],
        answers: q.answers,
      })),
    [t],
  );

  /* ---- State ---- */

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    () => new Array(questions.length).fill(null),
  );
  const [showResults, setShowResults] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [direction, setDirection] = useState(1);

  /* ---- Lead form state ---- */
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadFormTouched, setLeadFormTouched] = useState(false);
  const leadNameRef = useRef<HTMLInputElement>(null);

  /* ---- Compute category scores ---- */

  const categoryScores = useMemo(() => {
    const scores: Record<Category, number> = {
      ai_agents: 0,
      custom_software: 0,
      loyalty_program: 0,
      website: 0,
      consulting: 0,
    };

    selectedAnswers.forEach((answerIdx, questionIdx) => {
      if (answerIdx === null) return;
      const weights = SCORING_MAP[questionIdx]?.[answerIdx];
      if (!weights) return;
      for (const [cat, weight] of Object.entries(weights)) {
        scores[cat as Category] += weight;
      }
    });

    return scores;
  }, [selectedAnswers]);

  const topCategories = useMemo(() => {
    const entries = Object.entries(categoryScores) as [Category, number][];
    entries.sort((a, b) => b[1] - a[1]);
    // Return top 2 categories (or 1 if scores are very lopsided)
    const top = entries.filter((e) => e[1] > 0).slice(0, 2);
    return top.map((e) => e[0]);
  }, [categoryScores]);

  /* ---- Handlers ---- */

  const selectAnswer = useCallback(
    (answerIndex: number) => {
      setSelectedAnswers((prev) => {
        const next = [...prev];
        next[currentIndex] = answerIndex;
        return next;
      });

      // Auto-advance after brief highlight delay
      setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          setDirection(1);
          setCurrentIndex((i) => i + 1);
        } else {
          setShowLeadModal(true);
        }
      }, 300);
    },
    [currentIndex, questions.length],
  );

  const goBack = useCallback(() => {
    if (showResults) {
      setShowResults(false);
      return;
    }
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex, showResults]);

  const resetQuiz = useCallback(() => {
    setCurrentIndex(0);
    setSelectedAnswers(new Array(questions.length).fill(null));
    setShowResults(false);
    setShowLeadModal(false);
    setDirection(1);
    setLeadName('');
    setLeadEmail('');
    setLeadPhone('');
    setLeadFormTouched(false);
  }, [questions.length]);

  /* ---- Lead modal handlers ---- */

  const isEmailValid = (email: string) => email.includes('@') && email.includes('.');

  const isLeadFormValid =
    leadName.trim().length > 0 &&
    leadEmail.trim().length > 0 &&
    isEmailValid(leadEmail.trim()) &&
    leadPhone.trim().length > 0;

  const handleLeadSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setLeadFormTouched(true);

      if (!isLeadFormValid) return;

      // Push GTM dataLayer event
      const w = window as typeof window & { dataLayer?: Record<string, unknown>[] };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({
        event: 'diagnostic_lead_capture',
        lead_name: leadName.trim(),
        lead_email: leadEmail.trim(),
        lead_phone: leadPhone.trim(),
        diagnostic_top_categories: topCategories.join(','),
      });

      setShowLeadModal(false);
      setShowResults(true);
    },
    [leadName, leadEmail, leadPhone, topCategories, isLeadFormValid],
  );

  const handleLeadSkip = useCallback(() => {
    setShowLeadModal(false);
    setShowResults(true);
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    if (!showLeadModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleLeadSkip();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showLeadModal, handleLeadSkip]);

  // Focus first input when modal opens
  useEffect(() => {
    if (showLeadModal) {
      setTimeout(() => leadNameRef.current?.focus(), 100);
    }
  }, [showLeadModal]);

  /* ---- Current question data ---- */

  const question = questions[currentIndex];
  const currentAnswer = selectedAnswers[currentIndex];
  const progressPercent = showResults
    ? 100
    : ((currentIndex + (currentAnswer !== null ? 1 : 0)) / questions.length) * 100;

  /* ================================================================ */
  /*  RENDER                                                           */
  /* ================================================================ */

  return (
    <main className="pt-24 md:pt-32 pb-16 md:pb-24 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* ---- Header ---- */}
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.p
            variants={itemVariants}
            className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4"
          >
            {t.pages.diagnostic.label}
          </motion.p>
          <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4"
          >
            {t.pages.diagnostic.heading}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-base text-white/50 font-light max-w-lg mx-auto"
          >
            {t.pages.diagnostic.description}
          </motion.p>
        </motion.div>

        {/* ---- Progress bar ---- */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between text-xs text-white/30 font-light mb-2">
            <span>
              {showResults
                ? t.pages.diagnostic.complete
                : t.pages.diagnostic.questionOf
                    .replace('{current}', String(currentIndex + 1))
                    .replace('{total}', String(questions.length))}
            </span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full h-1 rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-accent"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease: EASE_SMOOTH }}
            />
          </div>
        </motion.div>

        {/* ---- Quiz / Results ---- */}
        <AnimatePresence mode="wait" custom={direction}>
          {!showResults ? (
            /* ============== QUESTION VIEW ============== */
            <motion.div
              key={`question-${currentIndex}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: EASE_SMOOTH }}
            >
              {/* Question card */}
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-10">
                {/* Icon + question */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                    <question.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="text-lg md:text-xl text-white font-medium leading-snug">
                    {question.text}
                  </h2>
                </div>

                {/* Answers */}
                <div className="space-y-3">
                  {question.answers.map((answer, idx) => {
                    const isSelected = currentAnswer === idx;
                    return (
                      <button
                        key={answer}
                        onClick={() => selectAnswer(idx)}
                        className={`
                          w-full text-left px-5 py-4 rounded-lg border transition-all duration-200
                          cursor-pointer
                          ${
                            isSelected
                              ? 'border-accent/40 bg-accent/10 text-white'
                              : 'border-white/[0.06] bg-white/[0.02] text-white/70 hover:border-accent/20 hover:bg-white/[0.04] hover:text-white'
                          }
                        `}
                      >
                        <span className="text-base font-light">{answer}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Back button */}
              {currentIndex > 0 && (
                <button
                  onClick={goBack}
                  className="mt-4 flex items-center gap-2 text-white/40 hover:text-white/70 text-sm font-light transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t.pages.diagnostic.previousQuestion}
                </button>
              )}
            </motion.div>
          ) : (
            /* ============== RESULTS VIEW ============== */
            <motion.div
              key="results"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: EASE_SMOOTH }}
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                {/* Result heading */}
                <motion.div
                  variants={itemVariants}
                  className="text-center mb-8"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-6">
                    <BarChart3 className="w-8 h-8 text-accent" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-light text-white mb-3">
                    {t.pages.diagnostic.resultHeading}
                  </h2>
                  <p className="text-white/40 text-base font-light max-w-md mx-auto">
                    {t.pages.diagnostic.resultIntro}
                  </p>
                </motion.div>

                {/* Recommended categories */}
                <motion.div variants={itemVariants} className="space-y-4 mb-10">
                  {topCategories.map((cat, idx) => {
                    const catData = t.pages.diagnostic.categories[cat];
                    const CatIcon = CATEGORY_ICONS[cat];
                    return (
                      <motion.div
                        key={cat}
                        variants={itemVariants}
                        className="rounded-xl border border-accent/20 bg-accent/5 p-6 md:p-8"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-11 h-11 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                            <CatIcon className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-accent text-xs font-medium uppercase tracking-wider">
                                #{idx + 1}
                              </span>
                              <h3 className="text-white text-lg font-medium">
                                {catData.title}
                              </h3>
                            </div>
                            <p className="text-white/50 text-base font-light leading-relaxed">
                              {catData.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* CTAs */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-3 mb-10"
                >
                  <a
                    href="https://capu.villelab.com/schedule/reunion-descubrimiento-con-alvaro/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-accent text-white font-medium text-base hover:bg-accent/90 transition-all duration-300 shadow-accent-lg"
                  >
                    <Calendar className="w-4 h-4" />
                    {t.pages.diagnostic.bookDiscoveryCall}
                  </a>
                  <a
                    href="https://wa.me/56920115198?text=Hola%2C%20acabo%20de%20hacer%20el%20diagn%C3%B3stico%20en%20villelab.com%20y%20me%20gustar%C3%ADa%20conversar."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-accent/30 bg-accent/10 text-accent font-medium text-base hover:bg-accent/20 transition-all duration-300"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {t.pages.diagnostic.talkOnWhatsApp}
                  </a>
                </motion.div>

                {/* Retake */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-center justify-center text-sm"
                >
                  <button
                    onClick={resetQuiz}
                    className="text-accent/70 hover:text-accent font-light transition-colors cursor-pointer"
                  >
                    {t.pages.diagnostic.retakeDiagnostic}
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ---- Lead Capture Modal ---- */}
      <AnimatePresence>
        {showLeadModal && !showResults && (
          <motion.div
            key="lead-modal-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleLeadSkip}
          >
            <motion.div
              className="relative w-full max-w-md rounded-2xl border border-white/[0.08] bg-slate-900 p-8"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: EASE_SMOOTH }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Icon */}
              <div className="flex justify-center mb-5">
                <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-accent" />
                </div>
              </div>

              {/* Heading */}
              <h2 className="text-2xl font-light text-white text-center mb-2">
                Tu diagnóstico está listo
              </h2>
              <p className="text-white/40 text-sm font-light text-center mb-6 leading-relaxed">
                Déjanos tus datos para enviarte el resultado detallado y recomendaciones personalizadas.
              </p>

              {/* Form */}
              <form onSubmit={handleLeadSubmit} noValidate className="space-y-4">
                {/* Nombre */}
                <div>
                  <label htmlFor="lead-name" className="sr-only">Nombre</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                    <input
                      ref={leadNameRef}
                      id="lead-name"
                      type="text"
                      placeholder="Nombre"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className={`
                        w-full pl-10 pr-4 py-3 rounded-lg bg-white/[0.04] border text-white text-sm font-light
                        placeholder:text-white/30 outline-none transition-colors
                        focus:border-accent/40 focus:bg-white/[0.06]
                        ${leadFormTouched && !leadName.trim() ? 'border-red-500/50' : 'border-white/[0.08]'}
                      `}
                    />
                  </div>
                  {leadFormTouched && !leadName.trim() && (
                    <p className="text-red-400/80 text-xs mt-1 ml-1">Ingresa tu nombre</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="lead-email" className="sr-only">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                    <input
                      id="lead-email"
                      type="email"
                      placeholder="Email"
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      className={`
                        w-full pl-10 pr-4 py-3 rounded-lg bg-white/[0.04] border text-white text-sm font-light
                        placeholder:text-white/30 outline-none transition-colors
                        focus:border-accent/40 focus:bg-white/[0.06]
                        ${leadFormTouched && (!leadEmail.trim() || !isEmailValid(leadEmail.trim())) ? 'border-red-500/50' : 'border-white/[0.08]'}
                      `}
                    />
                  </div>
                  {leadFormTouched && !leadEmail.trim() && (
                    <p className="text-red-400/80 text-xs mt-1 ml-1">Ingresa tu email</p>
                  )}
                  {leadFormTouched && leadEmail.trim() && !isEmailValid(leadEmail.trim()) && (
                    <p className="text-red-400/80 text-xs mt-1 ml-1">Ingresa un email válido</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="lead-phone" className="sr-only">Teléfono / WhatsApp</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                    <input
                      id="lead-phone"
                      type="tel"
                      placeholder="Teléfono / WhatsApp"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      className={`
                        w-full pl-10 pr-4 py-3 rounded-lg bg-white/[0.04] border text-white text-sm font-light
                        placeholder:text-white/30 outline-none transition-colors
                        focus:border-accent/40 focus:bg-white/[0.06]
                        ${leadFormTouched && !leadPhone.trim() ? 'border-red-500/50' : 'border-white/[0.08]'}
                      `}
                    />
                  </div>
                  {leadFormTouched && !leadPhone.trim() && (
                    <p className="text-red-400/80 text-xs mt-1 ml-1">Ingresa tu teléfono</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={leadFormTouched && !isLeadFormValid}
                  className={`
                    w-full py-3.5 rounded-full text-white font-medium text-sm transition-all duration-300
                    ${
                      leadFormTouched && !isLeadFormValid
                        ? 'bg-accent/40 cursor-not-allowed'
                        : 'bg-accent hover:bg-accent/90 cursor-pointer shadow-accent-lg'
                    }
                  `}
                >
                  Ver mi diagnóstico
                </button>
              </form>

              {/* Skip link */}
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={handleLeadSkip}
                  className="text-white/30 text-xs font-light hover:text-white/50 hover:underline transition-colors cursor-pointer"
                >
                  Ver resultados sin registrarme
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
