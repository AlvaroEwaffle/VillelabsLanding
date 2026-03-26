'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Globe,
  Smartphone,
  MousePointerClick,
  Users,
  BarChart3,
  Zap,
  FileText,
  Star,
  Mail,
  Search,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Download,
  Send,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Target,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Answer {
  label: string;
  points: number;
}

interface Question {
  id: number;
  text: string;
  icon: React.ElementType;
  answers: Answer[];
  recommendation: {
    icon: React.ElementType;
    title: string;
    action: string;
  };
}

interface ScoreTier {
  label: string;
  message: string;
  colorClass: string;
  borderClass: string;
  bgClass: string;
  ringClass: string;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const EASE_SMOOTH = [0.6, -0.05, 0.01, 0.99] as const;

const MAX_SCORE = 30;

const QUESTION_ICONS = [
  Globe,
  Smartphone,
  MousePointerClick,
  Users,
  BarChart3,
  Zap,
  FileText,
  Star,
  Mail,
  Search,
];

const QUESTION_POINTS = [
  [3, 1, 0],
  [3, 1, 0],
  [3, 1, 0],
  [2, 2, 1, 0],
  [3, 1, 0],
  [3, 2, 0, 0],
  [3, 1, 0],
  [3, 1, 0],
  [3, 1, 0],
  [3, 2, 2, 1, 0],
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
/*  Circular progress SVG                                              */
/* ------------------------------------------------------------------ */

function ScoreRing({
  score,
  tier,
}: {
  score: number;
  tier: ScoreTier;
}) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / MAX_SCORE) * circumference;

  return (
    <div className="relative w-52 h-52 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
        {/* Background ring */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          className="stroke-white/[0.06]"
          strokeWidth="8"
        />
        {/* Progress ring */}
        <motion.circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          className={tier.ringClass}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1.2, ease: EASE_SMOOTH, delay: 0.3 }}
        />
      </svg>
      {/* Score display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className={`text-5xl font-light ${tier.colorClass}`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE_SMOOTH }}
        >
          {score}
        </motion.span>
        <span className="text-white/30 text-sm font-light">/ {MAX_SCORE}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function DiagnosticContent() {
  const { t } = useTranslation();

  /* ---- Build questions from translations ---- */

  const questions: Question[] = useMemo(
    () =>
      t.pages.diagnostic.questions.map((q, i) => ({
        id: i + 1,
        text: q.text,
        icon: QUESTION_ICONS[i],
        answers: q.answers.map((label, j) => ({
          label,
          points: QUESTION_POINTS[i][j],
        })),
        recommendation: {
          icon: QUESTION_ICONS[i],
          title: q.recommendation.title,
          action: q.recommendation.action,
        },
      })),
    [t],
  );

  /* ---- Score tier function using translations ---- */

  const getScoreTier = useCallback(
    (score: number): ScoreTier => {
      const tiers = t.pages.diagnostic.scoreTiers;
      if (score <= 8) {
        return {
          label: tiers.critical.label,
          message: tiers.critical.message,
          colorClass: 'text-red-500',
          borderClass: 'border-red-500/30',
          bgClass: 'bg-red-500/10',
          ringClass: 'stroke-red-500',
        };
      }
      if (score <= 15) {
        return {
          label: tiers.developing.label,
          message: tiers.developing.message,
          colorClass: 'text-orange-500',
          borderClass: 'border-orange-500/30',
          bgClass: 'bg-orange-500/10',
          ringClass: 'stroke-orange-500',
        };
      }
      if (score <= 22) {
        return {
          label: tiers.solid.label,
          message: tiers.solid.message,
          colorClass: 'text-accent',
          borderClass: 'border-accent/30',
          bgClass: 'bg-accent/10',
          ringClass: 'stroke-accent',
        };
      }
      return {
        label: tiers.optimized.label,
        message: tiers.optimized.message,
        colorClass: 'text-emerald-500',
        borderClass: 'border-emerald-500/30',
        bgClass: 'bg-emerald-500/10',
        ringClass: 'stroke-emerald-500',
      };
    },
    [t],
  );

  /* ---- State ---- */

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => new Array(questions.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);
  const [direction, setDirection] = useState(1);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailSubmitting, setEmailSubmitting] = useState(false);

  /* ---- Derived state ---- */

  const totalScore = useMemo(
    () => answers.reduce<number>((sum, pts) => sum + (pts ?? 0), 0),
    [answers],
  );

  const tier = useMemo(() => getScoreTier(totalScore), [totalScore, getScoreTier]);

  const topRecommendations = useMemo(() => {
    const indexed = answers.map((pts, i) => ({ pts: pts ?? 0, index: i }));
    indexed.sort((a, b) => a.pts - b.pts);
    return indexed.slice(0, 3).map((item) => questions[item.index].recommendation);
  }, [answers, questions]);

  /* ---- Handlers ---- */

  const selectAnswer = useCallback(
    (points: number) => {
      setAnswers((prev) => {
        const next = [...prev];
        next[currentIndex] = points;
        return next;
      });

      // Auto-advance after brief delay
      setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          setDirection(1);
          setCurrentIndex((i) => i + 1);
        } else {
          setShowResults(true);
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

  const handleEmailSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email.trim()) return;
      setEmailSubmitting(true);

      const fidelidappUrl = process.env.NEXT_PUBLIC_FIDELIDAPP_URL;
      const fidelidappAccountId = process.env.NEXT_PUBLIC_FIDELIDAPP_ACCOUNT_ID;

      if (fidelidappUrl && fidelidappAccountId) {
        try {
          await fetch(`${fidelidappUrl}/api/landing/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: '',
              email: email.trim(),
              phone: '',
              accountId: fidelidappAccountId,
              tags: 'diagnostico-quiz',
            }),
          });
        } catch {
          // Non-blocking
        }
      }

      setEmailSubmitting(false);
      setEmailSubmitted(true);
    },
    [email, totalScore, answers, tier.label, topRecommendations],
  );

  const resetQuiz = useCallback(() => {
    setCurrentIndex(0);
    setAnswers(new Array(questions.length).fill(null));
    setShowResults(false);
    setDirection(1);
    setEmail('');
    setEmailSubmitted(false);
    setEmailSubmitting(false);
  }, [questions.length]);

  /* ---- Current question data ---- */

  const question = questions[currentIndex];
  const currentAnswer = answers[currentIndex];
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
                  {question.answers.map((answer) => {
                    const isSelected = currentAnswer === answer.points;
                    return (
                      <button
                        key={answer.label}
                        onClick={() => selectAnswer(answer.points)}
                        className={`
                          w-full text-left px-5 py-4 rounded-lg border transition-all duration-200
                          cursor-pointer
                          ${
                            isSelected
                              ? 'border-accent/40 bg-accent/10 text-white'
                              : 'border-white/[0.06] bg-white/[0.02] text-white/70 hover:border-white/[0.12] hover:bg-white/[0.04] hover:text-white'
                          }
                        `}
                      >
                        <span className="text-base font-light">{answer.label}</span>
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
                {/* Score card */}
                <motion.div
                  variants={itemVariants}
                  className={`rounded-xl border ${tier.borderClass} ${tier.bgClass} p-8 md:p-10 text-center mb-8`}
                >
                  <ScoreRing score={totalScore} tier={tier} />

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5, ease: EASE_SMOOTH }}
                  >
                    <span
                      className={`inline-block mt-4 px-4 py-1.5 rounded-full text-sm font-medium ${tier.colorClass} ${tier.bgClass} border ${tier.borderClass}`}
                    >
                      {tier.label}
                    </span>
                    <p className="text-white/60 text-base font-light mt-4 max-w-md mx-auto leading-relaxed">
                      {tier.message}
                    </p>
                  </motion.div>
                </motion.div>

                {/* Recommendations */}
                <motion.div variants={itemVariants} className="mb-8">
                  <h3 className="text-white text-lg font-medium mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-accent" />
                    {t.pages.diagnostic.yourTopPriorities}
                  </h3>
                  <div className="space-y-3">
                    {topRecommendations.map((rec, idx) => {
                      const RecIcon = rec.icon;
                      return (
                        <motion.div
                          key={rec.title}
                          variants={itemVariants}
                          className="flex gap-4 p-4 rounded-lg border border-white/[0.06] bg-white/[0.02]"
                        >
                          <div className="w-9 h-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                            <RecIcon className="w-4 h-4 text-accent" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-accent text-xs font-medium">#{idx + 1}</span>
                              <h4 className="text-white text-base font-medium">{rec.title}</h4>
                            </div>
                            <p className="text-white/40 text-sm font-light leading-relaxed">
                              {rec.action}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* CTAs */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-3 mb-10"
                >
                  <a
                    href="https://capu.villelab.com/schedule/reunion-descubrimiento-con-alvaro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-accent text-white font-medium text-base hover:bg-accent/90 transition-all duration-300 shadow-accent-lg"
                  >
                    <Calendar className="w-4 h-4" />
                    {t.pages.diagnostic.bookFreeCall}
                  </a>
                  <Link
                    href="/contact#diagnostic"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-accent/30 bg-accent/10 text-accent font-medium text-base hover:bg-accent/20 transition-all duration-300"
                  >
                    <Download className="w-4 h-4" />
                    {t.pages.diagnostic.getGuide}
                  </Link>
                </motion.div>

                {/* Email capture */}
                <motion.div
                  variants={itemVariants}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 mb-6"
                >
                  {!emailSubmitted ? (
                    <>
                      <div className="flex items-center gap-2 mb-3">
                        <Mail className="w-5 h-5 text-accent" />
                        <h3 className="text-white text-base font-medium">
                          {t.pages.diagnostic.emailReportHeading}
                        </h3>
                      </div>
                      <p className="text-white/40 text-sm font-light mb-4">
                        {t.pages.diagnostic.emailReportDescription}
                      </p>
                      <form
                        onSubmit={handleEmailSubmit}
                        className="flex flex-col sm:flex-row gap-3"
                      >
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={t.pages.diagnostic.emailPlaceholder}
                          required
                          className="flex-1 px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white placeholder-white/20 text-sm font-light focus:outline-none focus:border-accent/40 focus:bg-white/[0.06] transition-all"
                        />
                        <button
                          type="submit"
                          disabled={emailSubmitting}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-medium text-sm hover:bg-accent/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
                        >
                          {emailSubmitting ? (
                            <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <Send className="w-4 h-4" />
                          )}
                          {t.pages.diagnostic.sendReport}
                        </button>
                      </form>
                    </>
                  ) : (
                    <div className="flex items-center gap-3 text-emerald-400">
                      <CheckCircle className="w-5 h-5 shrink-0" />
                      <p className="text-sm font-light">
                        {t.pages.diagnostic.reportSent}
                      </p>
                    </div>
                  )}
                </motion.div>

                {/* Share + retake */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-center justify-between text-sm"
                >
                  <p className="text-white/20 font-light">{t.pages.diagnostic.shareResults}</p>
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
    </main>
  );
}
