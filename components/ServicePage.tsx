'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import type { ServiceMeta } from '@/lib/services';
import { caseStudies } from '@/lib/case-studies';
import { useTranslation } from '@/lib/i18n';

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

interface ServicePageProps {
  service: ServiceMeta;
}

export default function ServicePage({ service }: ServicePageProps) {
  const { t } = useTranslation();
  const serviceList = service.track === 'marketing'
    ? t.pages.services.marketingServices
    : t.pages.services.developmentServices;
  const serviceData = serviceList[service.index];

  if (!serviceData) return null;

  const relatedCaseStudies = serviceData.relatedCases
    .map((slug) => caseStudies.find((cs) => cs.slug === slug))
    .filter(Boolean);

  return (
    <main className="pt-20 md:pt-24 pb-16 md:pb-24">
      {/* Hero */}
      <motion.section
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="mb-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-white/40 text-sm hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.pages.services.backToServices}
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/15 border border-accent/25 text-accent text-xs uppercase tracking-wider font-medium">
            {service.track === 'marketing' ? t.pages.services.marketingTrack : t.pages.services.developmentTrack}
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight mb-6"
        >
          {serviceData.title}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg text-white/50 font-light max-w-2xl leading-relaxed mb-8"
        >
          {serviceData.longDescription}
        </motion.p>

        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <Sparkles className="w-4 h-4 text-accent/70" />
          <span className="text-accent/70 text-base font-light italic">{serviceData.pricing}</span>
        </motion.div>
      </motion.section>

      {/* What's Included */}
      <motion.section
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 border-t border-white/[0.06]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-light text-white mb-10">
          {t.pages.services.whatsIncluded}
        </motion.h2>
        <div className="space-y-4">
          {serviceData.included.map((item) => (
            <motion.div
              key={item}
              variants={itemVariants}
              className="flex items-start gap-4 p-4 rounded-lg border border-white/[0.04] bg-white/[0.01]"
            >
              <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <span className="text-white/60 text-base font-light">{item}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Process */}
      <motion.section
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 border-t border-white/[0.06]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-light text-white mb-12">
          {t.pages.services.process}
        </motion.h2>
        <div className="space-y-8">
          {serviceData.processSteps.map((step, i) => (
            <motion.div key={step.title} variants={itemVariants} className="flex gap-5 items-start">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/15 border border-accent/25 flex items-center justify-center text-accent text-sm font-medium">
                {i + 1}
              </span>
              <div className="pt-1">
                <h3 className="text-white text-base font-medium mb-1">{step.title}</h3>
                <p className="text-white/40 text-sm font-light leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Related Case Studies */}
      {relatedCaseStudies.length > 0 && (
        <motion.section
          className="py-16 md:py-20 border-t border-white/[0.06]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-light text-white mb-10 text-center">
              {t.pages.services.relatedCasesHeading}
            </motion.h2>
            <motion.div variants={containerVariants} className="grid md:grid-cols-2 gap-6">
              {relatedCaseStudies.map((cs) => cs && (
                <motion.div key={cs.slug} variants={itemVariants}>
                  <Link
                    href={`/work/${cs.slug}`}
                    className="group block p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-accent/20 transition-all duration-300"
                  >
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] uppercase tracking-wider font-medium mb-3">
                      {cs.category}
                    </span>
                    <h4 className="text-white text-base font-medium mb-1 group-hover:text-accent transition-colors">
                      {cs.client}
                    </h4>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-3.5 h-3.5 text-accent/60" />
                      <span className="text-accent/60 text-sm font-light">{cs.result}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* CTA */}
      <motion.section
        className="py-16 md:py-24 border-t border-white/[0.06]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={itemVariants}
            className="p-10 md:p-14 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
          >
            <h3 className="text-2xl md:text-3xl font-light text-white mb-4">
              {t.pages.services.ctaHeading}
            </h3>
            <p className="text-white/50 text-base font-light mb-8 max-w-md mx-auto">
              {t.pages.services.ctaDescription}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-medium text-base hover:bg-accent/90 transition-all duration-300 shadow-accent-lg group"
            >
              {t.pages.services.ctaButton}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
