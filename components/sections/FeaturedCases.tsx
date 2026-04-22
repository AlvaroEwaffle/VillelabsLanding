'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { caseStudyMeta } from '@/lib/case-studies';

const EASE_SMOOTH = [0.6, -0.05, 0.01, 0.99] as const;

const caseSlugs = caseStudyMeta.map((cs) => `/work/${cs.slug}`);
const caseImages = caseStudyMeta.map((cs) => cs.heroImage);

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_SMOOTH },
  },
};

export default function FeaturedCases() {
  const { t } = useTranslation();

  return (
    <motion.section
      className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4">
            {t.featuredCases.label}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white">
            {t.featuredCases.heading}
          </h2>
        </motion.div>

        {/* Premium Mockup Visual */}
        <motion.div variants={itemVariants} className="mb-20 relative aspect-video w-full max-w-5xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(33,117,161,0.15)] ring-1 ring-white/5">
          <img 
            src="/assets/generated/landing_premium_mockup.png" 
            alt="Diseño web premium y conversiones" 
            className="w-full h-full object-cover" 
            loading="lazy"
          />
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {t.featuredCases.cases.map((caseItem, i) => (
            <motion.div
              key={caseItem.title}
              variants={itemVariants}
            >
              <Link
                href={caseSlugs[i]}
                className="group block relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-accent/20 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={caseImages[i]}
                    alt={caseItem.title}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-500 scale-105 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  {/* Category tag */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-[10px] uppercase tracking-wider font-medium">
                    {caseItem.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Metric */}
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-accent" />
                    <span className="text-accent text-sm font-medium">
                      {caseItem.metric}
                    </span>
                  </div>
                  <h3 className="text-white text-lg font-medium mb-2 group-hover:text-accent transition-colors">
                    {caseItem.title}
                  </h3>
                  <p className="text-white/40 text-sm font-light leading-relaxed">
                    {caseItem.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="text-center mt-12">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:text-accent/80 transition-colors group"
          >
            {t.featuredCases.ctaLink}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
