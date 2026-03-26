'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Clock } from 'lucide-react';
import { useTranslation, getWhatsAppUrl } from '@/lib/i18n';

const EASE_SMOOTH = [0.6, -0.05, 0.01, 0.99] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
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

export default function FinalCTA() {
  const { t, language } = useTranslation();

  return (
    <motion.section
      id="cta-section"
      className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Accent glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div variants={containerVariants}>
          {/* Heading */}
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6"
          >
            {t.finalCTA.heading}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/50 font-light max-w-xl mx-auto leading-relaxed mb-10"
          >
            {t.finalCTA.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-medium text-base hover:bg-accent/90 transition-all duration-300 shadow-accent-lg group"
            >
              {t.finalCTA.ctaPrimary}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={getWhatsAppUrl(language)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/15 bg-white/[0.03] text-white/80 font-medium text-base hover:border-green-500/30 hover:text-white backdrop-blur-sm transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              {t.finalCTA.ctaWhatsApp}
            </a>
          </motion.div>

          {/* Scarcity */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03]"
          >
            <Clock className="w-3.5 h-3.5 text-accent" />
            <span className="text-white/50 text-sm font-light">
              {t.finalCTA.scarcityPre}<span className="text-white font-medium">{t.finalCTA.scarcityHighlight}</span>{t.finalCTA.scarcityPost}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
