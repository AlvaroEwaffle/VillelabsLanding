'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  Quote,
  Calendar,
} from 'lucide-react';
import type { CaseStudy } from '@/lib/case-studies';
import { caseStudies } from '@/lib/case-studies';
import { useTranslation, getWhatsAppUrl } from '@/lib/i18n';

const EASE_SMOOTH = [0.6, -0.05, 0.01, 0.99] as const;

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
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

interface CaseStudyPageProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyPage({ caseStudy }: CaseStudyPageProps) {
  const { t, language } = useTranslation();
  const otherCases = caseStudies.filter((cs) => cs.slug !== caseStudy.slug);

  return (
    <main className="pt-20 md:pt-24 pb-16 md:pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={caseStudy.heroImage}
            alt={caseStudy.client}
            className="w-full h-full object-cover opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/60 via-[#0f172a]/80 to-[#0f172a]" />
        </div>

        <motion.div
          className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-8">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-white/40 text-sm hover:text-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.caseStudy.backToPortfolio}
            </Link>
          </motion.div>

          <motion.span
            variants={itemVariants}
            className="inline-block px-4 py-1.5 rounded-full bg-accent/15 border border-accent/25 text-accent text-xs uppercase tracking-wider font-medium mb-6"
          >
            {caseStudy.category}
          </motion.span>

          <motion.p
            variants={itemVariants}
            className="text-white/50 text-lg font-light mb-3"
          >
            {caseStudy.client}
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight mb-8"
          >
            {caseStudy.title}
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-accent/10 border border-accent/20"
          >
            <TrendingUp className="w-5 h-5 text-accent" />
            <span className="text-accent text-lg font-medium">
              {caseStudy.result}
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* Context */}
      <motion.section
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.p variants={itemVariants} className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4">
          {t.caseStudy.contextLabel}
        </motion.p>
        <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-light text-white mb-8">
          {t.caseStudy.contextHeading}
        </motion.h2>
        <motion.p variants={itemVariants} className="text-white/50 text-base md:text-lg font-light leading-relaxed">
          {caseStudy.context}
        </motion.p>
      </motion.section>

      {/* Challenge */}
      <motion.section
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 border-t border-white/[0.06]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.p variants={itemVariants} className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4">
          {t.caseStudy.challengeLabel}
        </motion.p>
        <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-light text-white mb-8">
          {t.caseStudy.challengeHeading}
        </motion.h2>
        <motion.p variants={itemVariants} className="text-white/50 text-base md:text-lg font-light leading-relaxed">
          {caseStudy.challenge}
        </motion.p>
      </motion.section>

      {/* Approach */}
      <motion.section
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 border-t border-white/[0.06]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.p variants={itemVariants} className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4">
          {t.caseStudy.approachLabel}
        </motion.p>
        <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-light text-white mb-10">
          {t.caseStudy.approachHeading}
        </motion.h2>
        <div className="space-y-6">
          {caseStudy.approach.map((step, i) => (
            <motion.div key={i} variants={itemVariants} className="flex gap-5 items-start">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/15 border border-accent/25 flex items-center justify-center text-accent text-sm font-medium">
                {i + 1}
              </span>
              <p className="text-white/50 text-base font-light leading-relaxed pt-1">{step}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Results */}
      <motion.section
        className="py-16 md:py-20 border-t border-white/[0.06]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p variants={itemVariants} className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4 text-center">
            {t.caseStudy.resultsLabel}
          </motion.p>
          <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-light text-white mb-12 text-center">
            {t.caseStudy.resultsHeading}
          </motion.h2>
          <motion.div variants={containerVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {caseStudy.results.map((result) => (
              <motion.div
                key={result.metric}
                variants={itemVariants}
                className="p-6 md:p-8 rounded-xl border border-white/[0.06] bg-white/[0.02] text-center hover:border-accent/20 transition-colors duration-300"
              >
                <p className="text-accent text-2xl md:text-3xl font-medium mb-2">{result.value}</p>
                <p className="text-white/40 text-xs md:text-sm font-light">{result.metric}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonial */}
      <motion.section
        className="py-16 md:py-20 border-t border-white/[0.06]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={itemVariants}>
            <Quote className="w-8 h-8 text-accent/30 mx-auto mb-6" />
          </motion.div>
          <motion.blockquote variants={itemVariants} className="text-xl md:text-2xl text-white/70 font-light leading-relaxed mb-8 italic">
            &ldquo;{caseStudy.testimonial.quote}&rdquo;
          </motion.blockquote>
          <motion.div variants={itemVariants}>
            <p className="text-white text-base font-medium">{caseStudy.testimonial.author}</p>
            <p className="text-white/40 text-sm font-light mt-1">{caseStudy.testimonial.role}</p>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        className="py-16 md:py-24 border-t border-white/[0.06]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-6">
            {caseStudy.ctaText}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-white/40 text-base font-light mb-10 max-w-lg mx-auto">
            {t.caseStudy.ctaDescription}
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/56920115198?text=${encodeURIComponent(language === 'es' ? 'Hola, vi su caso de estudio y me gustaría hablar sobre un proyecto.' : "Hi, I saw your case study and I'd like to discuss a project.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent/90 transition-colors shadow-accent"
            >
              <Calendar className="w-4 h-4" />
              {t.caseStudy.bookStrategyCall}
            </a>
            <Link
              href="/work"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/10 text-white/60 text-sm font-medium rounded-lg hover:border-accent/30 hover:text-white transition-all"
            >
              {t.caseStudy.seeMoreWork}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* More case studies */}
      <motion.section
        className="py-16 md:py-20 border-t border-white/[0.06]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h3 variants={itemVariants} className="text-xl font-light text-white mb-8 text-center">
            {t.caseStudy.moreCaseStudies}
          </motion.h3>
          <motion.div variants={containerVariants} className="grid md:grid-cols-2 gap-6">
            {otherCases.map((otherCase) => (
              <motion.div key={otherCase.slug} variants={itemVariants}>
                <Link
                  href={`/work/${otherCase.slug}`}
                  className="group block p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-accent/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] uppercase tracking-wider font-medium">
                      {otherCase.category}
                    </span>
                  </div>
                  <h4 className="text-white text-base font-medium mb-1 group-hover:text-accent transition-colors">
                    {otherCase.client}
                  </h4>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5 text-accent/60" />
                    <span className="text-accent/60 text-sm font-light">{otherCase.result}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
