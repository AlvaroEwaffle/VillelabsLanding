'use client';

/**
 * Diagnóstico de presencia digital — quiz de 7 preguntas con intro,
 * feedback según puntuación y CTA a agendar vía WhatsApp (sin scroll al form).
 */

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const WHATSAPP_PHONE = '56920115198';
const SCHEDULING_URL = 'https://capu.villelab.com/schedule/reunion-descubrimiento-con-alvaro/';

/* ─── Fidelidapp API ─── */
const FIDELIDAPP_URL = process.env.NEXT_PUBLIC_FIDELIDAPP_URL ?? '';
const FIDELIDAPP_ACCOUNT_ID = process.env.NEXT_PUBLIC_FIDELIDAPP_ACCOUNT_ID ?? '';

async function sendQuizToFidelidapp(answers: Answers, total: number, tierLabel: string) {
  if (!FIDELIDAPP_URL || !FIDELIDAPP_ACCOUNT_ID) return;
  try {
    await fetch(`${FIDELIDAPP_URL}/api/landing/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: '',
        email: '',
        phone: '',
        accountId: FIDELIDAPP_ACCOUNT_ID,
        tags: 'diagnostico-quiz',
      }),
    });
  } catch {
    // Non-blocking
  }
}

const INTRO = {
  title: 'Diagnóstico de presencia digital',
  description:
    'En menos de 2 minutos respondes 7 preguntas. Según tus respuestas te diré en qué punto estás y qué tendría más sentido hacer ahora — landing, web estratégica o algo a medida. Sin compromiso.',
  cta: 'Comenzar',
};

const QUESTIONS = [
  {
    id: 'web',
    question: '¿Tienes hoy una web o landing?',
    options: [
      { label: 'No tengo', value: 'no', score: 0 },
      { label: 'Sí, pero no me convence', value: 'mal', score: 1 },
      { label: 'Sí, me representa', value: 'bien', score: 2 },
    ],
  },
  {
    id: 'traffic',
    question: '¿Tienes tráfico o gente que te encuentra (redes, Google, recomendaciones)?',
    options: [
      { label: 'No o muy poco', value: 'no', score: 0 },
      { label: 'Sí, algo', value: 'algo', score: 1 },
      { label: 'Sí, constante', value: 'si', score: 2 },
    ],
  },
  {
    id: 'conversion',
    question: '¿Esa presencia te genera leads o ventas?',
    options: [
      { label: 'No', value: 'no', score: 0 },
      { label: 'Poco', value: 'poco', score: 1 },
      { label: 'Sí, de forma recurrente', value: 'si', score: 2 },
    ],
  },
  {
    id: 'goal',
    question: '¿Qué prioridad es para ti ahora?',
    options: [
      { label: 'Dar a conocer mi negocio', value: 'conocer', score: 0 },
      { label: 'Convertir mejor lo que ya tengo', value: 'convertir', score: 1 },
      { label: 'Construir algo a medida (app, plataforma)', value: 'medida', score: 2 },
    ],
  },
  {
    id: 'time',
    question: '¿Cuánto tiempo llevas con este proyecto o negocio?',
    options: [
      { label: 'Estoy arrancando', value: 'arrancando', score: 0 },
      { label: 'Algunos meses o años, pero sin web seria', value: 'meses', score: 1 },
      { label: 'Años, con presencia estable', value: 'estable', score: 2 },
    ],
  },
  {
    id: 'obstacle',
    question: '¿Cuál es tu mayor obstáculo ahora mismo?',
    options: [
      { label: 'No tengo visibilidad', value: 'visibilidad', score: 0 },
      { label: 'Tengo tráfico pero no convierte', value: 'conversion', score: 1 },
      { label: 'Quiero escalar o automatizar', value: 'escalar', score: 2 },
    ],
  },
  {
    id: 'timeline',
    question: '¿En cuánto tiempo te gustaría tener algo en marcha?',
    options: [
      { label: 'Lo antes posible (semanas)', value: 'urgente', score: 0 },
      { label: 'En 1–3 meses', value: 'medio', score: 1 },
      { label: 'Tengo tiempo, quiero hacerlo bien', value: 'tranquilo', score: 2 },
    ],
  },
];

type Answers = Record<string, string>;

function getScores(answers: Answers): { total: number; goal: string } {
  let total = 0;
  const goal = answers.goal || '';
  QUESTIONS.forEach((q) => {
    const value = answers[q.id];
    const opt = q.options.find((o) => o.value === value);
    if (opt && 'score' in opt) total += (opt as { score: number }).score;
  });
  return { total, goal };
}

type ResultTier = 'sin-base' | 'construccion' | 'optimizar' | 'encaminado' | 'medida';

function getResultTier(answers: Answers): ResultTier {
  const { total, goal } = getScores(answers);
  if (goal === 'medida') return 'medida';
  if (total <= 5) return 'sin-base';
  if (total <= 9) return 'construccion';
  if (total <= 12) return 'optimizar';
  return 'encaminado';
}

interface ResultContent {
  title: string;
  subtitle: string;
  bullets: string[];
  recommendation: string;
  nextStep: string;
}

const RESULTS: Record<ResultTier, ResultContent> = {
  'sin-base': {
    title: 'Tu siguiente paso: una base que convierta',
    subtitle: 'Diagnóstico — Sin base digital',
    bullets: [
      'Sin web o landing, cada visita se pierde: no hay dónde aterrizar ni confiar.',
      'Lo primero es una base clara: qué haces, para quién y por qué deberían elegirte.',
      'Una landing de conversión o una web estratégica corta suele ser el mejor primer paso.',
      'Cuando esa base esté lista, tiene sentido sumar más tráfico (redes, SEO, ads).',
    ],
    recommendation:
      'En el diagnóstico gratis vemos tu oferta, tu audiencia y te digo si conviene empezar por una landing o por una web un poco más amplia.',
    nextStep: 'Agendar diagnóstico gratis por WhatsApp',
  },
  construccion: {
    title: 'Estás en construcción — hay que sentar bases',
    subtitle: 'Diagnóstico — Presencia en construcción',
    bullets: [
      'Tienes algo de presencia o tráfico, pero la base (web/landing) no está lista o no convence.',
      'El riesgo: invertir en más visibilidad sin algo que convierta bien.',
      'El orden que suele funcionar: primero una landing o web que transmita claridad y confianza; después más tráfico.',
      'Así cada visita tiene dónde aterrizar y una acción clara (contacto, reserva, compra).',
    ],
    recommendation:
      'En el diagnóstico revisamos tu mensaje y tu objetivo para definir si te conviene una landing de conversión o una web estratégica.',
    nextStep: 'Agendar diagnóstico gratis por WhatsApp',
  },
  optimizar: {
    title: 'Listo para optimizar conversión',
    subtitle: 'Diagnóstico — Tráfico sin conversión',
    bullets: [
      'Ya tienes base y posiblemente tráfico, pero no convierte como quieres.',
      'El problema suele ser mensaje, estructura o diseño que no transmite autoridad ni guía al visitante.',
      'El siguiente paso es mejorar la página: copy, jerarquía, CTAs y confianza (testimonios, garantías).',
      'A veces basta con rediseño estratégico; otras con una landing nueva enfocada en una oferta concreta.',
    ],
    recommendation:
      'En el diagnóstico vemos tu web actual (o tu idea) y te propongo cambios concretos o una landing de conversión enfocada.',
    nextStep: 'Agendar diagnóstico gratis por WhatsApp',
  },
  encaminado: {
    title: 'Bien encaminado — el siguiente nivel',
    subtitle: 'Diagnóstico — Ya generas resultados',
    bullets: [
      'Tu presencia ya genera resultados; el siguiente paso es escalar o pulir.',
      'Puede ser una web más amplia, una segunda landing para otra oferta, o empezar a pensar en una plataforma o herramienta a medida.',
      'En el diagnóstico vemos qué te daría más impacto ahora: más conversión en lo que tienes o algo nuevo.',
    ],
    recommendation:
      'Agendemos un diagnóstico para ver si tiene sentido una web más amplia, otra landing o el inicio de algo a medida.',
    nextStep: 'Agendar diagnóstico gratis por WhatsApp',
  },
  medida: {
    title: 'Proyecto a medida — definir bien el alcance',
    subtitle: 'Diagnóstico — App o plataforma',
    bullets: [
      'Una app o plataforma se define mejor en una sesión estratégica.',
      'Hay que acotar el problema, el alcance y qué tiene sentido construir primero (MVP).',
      'A veces el primer paso es una web o landing que valide la idea antes de invertir en desarrollo a medida.',
    ],
    recommendation:
      'En el diagnóstico revisamos alcance, plazos y te digo qué tendría sentido construir primero.',
    nextStep: 'Agendar diagnóstico gratis por WhatsApp',
  },
};

function getResult(answers: Answers): ResultContent {
  const tier = getResultTier(answers);
  return RESULTS[tier];
}

function buildWhatsAppUrl(message: string): string {
  const base = `https://wa.me/${WHATSAPP_PHONE.replace(/\D/g, '')}`;
  return `${base}?text=${encodeURIComponent(message)}`;
}

interface DiagnosticoPresenciaDigitalProps {
  open: boolean;
  onClose: () => void;
}

export default function DiagnosticoPresenciaDigital({ open, onClose }: DiagnosticoPresenciaDigitalProps) {
  const [step, setStep] = useState(-1); // -1 = intro, 0..6 = questions, 7 = result
  const [answers, setAnswers] = useState<Answers>({});

  const isIntro = step === -1;
  const isResult = step === QUESTIONS.length;
  const currentQuestion = step >= 0 && step < QUESTIONS.length ? QUESTIONS[step] : null;
  const result = isResult ? getResult(answers) : null;

  const handleStart = useCallback(() => {
    setStep(0);
  }, []);

  const handleAnswer = useCallback(
    (value: string) => {
      if (!currentQuestion) return;
      const newAnswers = { ...answers, [currentQuestion.id]: value };
      setAnswers(newAnswers);
      if (step + 1 < QUESTIONS.length) {
        setStep(step + 1);
      } else {
        setStep(QUESTIONS.length);
      }
    },
    [answers, step, currentQuestion]
  );

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const openScheduling = useCallback(() => {
    if (!result) return;
    // Fire lead to Fidelidapp (non-blocking)
    const tier = getResultTier(answers);
    const { total } = getScores(answers);
    sendQuizToFidelidapp(answers, total, tier);
    window.open(SCHEDULING_URL, '_blank', 'noopener,noreferrer');
    handleClose();
  }, [result, answers, handleClose]);

  const totalSteps = 1 + QUESTIONS.length + 1; // intro + questions + result
  const progressStep = isIntro ? 0 : isResult ? totalSteps - 1 : step + 1;
  const progress = (progressStep / (totalSteps - 1)) * 100;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            aria-hidden
          />
          <motion.div
            className="relative w-full max-w-lg max-h-[90dvh] overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl flex flex-col"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
          >
            {/* Barra de progreso (oculta en intro) */}
            {!isIntro && (
              <div className="h-1 bg-white/5 shrink-0">
                <motion.div
                  className="h-full bg-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>
            )}

            <div className="flex items-start justify-end p-3 md:p-4 absolute top-0 right-0 z-10">
              <button
                type="button"
                onClick={handleClose}
                className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-8 pt-14">
              <AnimatePresence mode="wait">
                {isIntro && (
                  <motion.div
                    key="intro"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/40 font-medium">
                      Antes de seguir
                    </p>
                    <h2 className="text-xl md:text-2xl font-light text-white leading-snug">
                      {INTRO.title}
                    </h2>
                    <p className="text-white/70 font-light text-sm md:text-base leading-relaxed">
                      {INTRO.description}
                    </p>
                    <button
                      type="button"
                      onClick={handleStart}
                      className="w-full py-4 rounded-xl bg-accent hover:bg-accent/90 text-white font-semibold text-base border border-accent/30 hover:shadow-[0_0_24px_rgba(33,117,161,0.3)] transition-all"
                    >
                      {INTRO.cta}
                    </button>
                  </motion.div>
                )}

                {!isIntro && !isResult && currentQuestion && (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-8"
                  >
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/40 font-medium">
                      Pregunta {step + 1} de {QUESTIONS.length}
                    </p>
                    <h3 className="text-xl md:text-2xl font-light text-white leading-snug">
                      {currentQuestion.question}
                    </h3>
                    <ul className="space-y-3">
                      {currentQuestion.options.map((opt) => (
                        <li key={opt.value}>
                          <button
                            type="button"
                            onClick={() => handleAnswer(opt.value)}
                            className="w-full text-left px-4 py-3.5 rounded-xl border border-white/10 bg-white/[0.03] text-white/90 font-light hover:border-accent/40 hover:bg-accent/5 transition-colors"
                          >
                            {opt.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {isResult && result && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-accent font-medium">
                      {result.subtitle}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-light text-white leading-snug">
                      {result.title}
                    </h3>
                    <ul className="space-y-2 text-white/80 font-light text-sm md:text-base">
                      {result.bullets.map((b, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-accent shrink-0">·</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-white/60 text-sm border-l-2 border-accent/50 pl-4 py-1">
                      {result.recommendation}
                    </p>
                    <button
                      type="button"
                      onClick={openScheduling}
                      className="w-full mt-6 py-4 rounded-xl bg-accent hover:bg-accent/90 text-white font-semibold text-base border border-accent/30 hover:shadow-[0_0_24px_rgba(33,117,161,0.3)] transition-all"
                    >
                      Agendar reunión de descubrimiento
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
