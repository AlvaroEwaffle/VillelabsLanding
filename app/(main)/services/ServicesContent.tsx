'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Layout,
  Globe,
  TrendingUp,
  Cog,
  Code2,
  MessageSquare,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

const EASE_SMOOTH = [0.6, -0.05, 0.01, 0.99] as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_SMOOTH },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

function ServiceDetailCard({
  icon: Icon,
  title,
  description,
  pricing,
}: {
  icon: typeof Layout;
  title: string;
  description: string;
  pricing: string;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="group p-8 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-accent/20 hover:bg-white/[0.04] transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent/15 transition-colors">
        <Icon className="w-6 h-6 text-accent" />
      </div>
      <h3 className="text-white text-xl font-medium mb-3">{title}</h3>
      <p className="text-white/50 text-sm font-light leading-relaxed mb-6">{description}</p>
      <div className="flex items-center gap-2 text-accent/70 text-sm">
        <Sparkles className="w-3.5 h-3.5" />
        <span className="font-light italic">{pricing}</span>
      </div>
    </motion.div>
  );
}

export default function ServicesContent() {
  const { t } = useTranslation();

  const marketingIcons = [Layout, Globe, TrendingUp];
  const developmentIcons = [Cog, Code2, MessageSquare];

  const marketingServices = t.pages.services.marketingServices.map((service, i) => ({
    icon: marketingIcons[i],
    ...service,
  }));

  const developmentServices = t.pages.services.developmentServices.map((service, i) => ({
    icon: developmentIcons[i],
    ...service,
  }));

  return (
    <main className="pt-24 md:pt-32 pb-16 md:pb-24">
      {/* Header */}
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.p
          variants={itemVariants}
          className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4"
        >
          {t.pages.services.label}
        </motion.p>
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6"
        >
          {t.pages.services.heading}<span className="text-accent">{t.pages.services.headingHighlight}</span>
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-lg text-white/50 font-light max-w-2xl mx-auto leading-relaxed"
        >
          {t.pages.services.description}
        </motion.p>
      </motion.div>

      {/* Marketing Track */}
      <motion.section
        id="marketing"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <h2 className="text-xs uppercase tracking-[0.2em] text-white/60 font-medium">
              {t.pages.services.marketingTrack}
            </h2>
          </div>
          <p className="text-white/40 text-sm font-light max-w-lg ml-6">
            {t.pages.services.marketingDescription}
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {marketingServices.map((service) => (
            <ServiceDetailCard key={service.title} {...service} />
          ))}
        </div>
      </motion.section>

      {/* Development Track */}
      <motion.section
        id="development"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <h2 className="text-xs uppercase tracking-[0.2em] text-white/60 font-medium">
              {t.pages.services.developmentTrack}
            </h2>
          </div>
          <p className="text-white/40 text-sm font-light max-w-lg ml-6">
            {t.pages.services.developmentDescription}
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {developmentServices.map((service) => (
            <ServiceDetailCard key={service.title} {...service} />
          ))}
        </div>
      </motion.section>

      {/* Pricing Note */}
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.p
          variants={itemVariants}
          className="text-sm text-white/30 font-light italic"
        >
          {t.pages.services.pricingNote}
        </motion.p>
      </motion.div>

      {/* CTA */}
      <motion.div
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
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
      </motion.div>
    </main>
  );
}
