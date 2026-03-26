'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  Users,
  Zap,
  Target,
  Shield,
  BarChart3,
  Award,
} from 'lucide-react';
import ToptalBadge from '@/components/ToptalBadge';
import { useTranslation } from '@/lib/i18n';

const EASE_SMOOTH = [0.6, -0.05, 0.01, 0.99] as const;

const credentials = [
  'Toptal Top 3% — Product Management',
  'SAFe Certified',
  'PSM I — Professional Scrum Master',
  'Industrial Engineering — Universidad de Chile',
];

const clientLogos = [
  'PepsiCo',
  'LATAM Airlines',
  'CMPC',
  'Toptal',
  'NTT Data',
];

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
    transition: { staggerChildren: 0.1 },
  },
};

export default function ConsultingContent() {
  const { t } = useTranslation();

  const serviceModelIcons = [Users, Zap, Target];

  const achievements = t.pages.consulting.achievements;

  const serviceModels = t.pages.consulting.serviceModels.map((model, i) => ({
    icon: serviceModelIcons[i],
    ...model,
  }));

  return (
    <main className="pt-24 md:pt-32 pb-16 md:pb-24">
      {/* Hero */}
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-medium tracking-wide">
            <Award className="w-3.5 h-3.5" />
            {t.pages.consulting.badge}
          </span>
        </motion.div>
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6"
        >
          {t.pages.consulting.heading}
          <span className="text-accent">{t.pages.consulting.headingHighlight}</span>
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-lg text-white/50 font-light max-w-2xl mx-auto leading-relaxed"
        >
          {t.pages.consulting.description}
        </motion.p>
      </motion.div>

      {/* Achievements */}
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {achievements.map((item) => (
            <motion.div key={item.label} variants={itemVariants} className="text-center">
              <p className="text-3xl md:text-4xl font-light text-accent mb-2">{item.metric}</p>
              <p className="text-white/40 text-sm font-light">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Service Models */}
      <motion.section
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4">
            {t.pages.consulting.engagementLabel}
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-white">
            {t.pages.consulting.engagementHeading}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {serviceModels.map((model) => (
            <motion.div
              key={model.title}
              variants={itemVariants}
              className="group p-8 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-accent/20 hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent/15 transition-colors">
                <model.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-white text-lg font-medium mb-3">{model.title}</h3>
              <p className="text-white/50 text-sm font-light leading-relaxed mb-4">
                {model.description}
              </p>
              <p className="text-accent/60 text-xs font-light italic">{model.ideal}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Enterprise clients */}
      <motion.section
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-white/30 font-medium">
            {t.pages.consulting.enterpriseLabel}
          </p>
        </motion.div>
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {clientLogos.map((logo) => (
            <span
              key={logo}
              className="text-white/15 text-sm md:text-base font-light tracking-wider uppercase"
            >
              {logo}
            </span>
          ))}
        </motion.div>
      </motion.section>

      {/* Credentials */}
      <motion.section
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4">
            {t.pages.consulting.credentialsLabel}
          </p>
          <h2 className="text-2xl md:text-3xl font-light text-white">
            {t.pages.consulting.credentialsHeading}
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {credentials.map((credential) => (
            <motion.div
              key={credential}
              variants={itemVariants}
              className="flex items-center gap-3 p-4 rounded-lg border border-white/[0.06] bg-white/[0.02]"
            >
              <Shield className="w-4 h-4 text-accent flex-shrink-0" />
              <span className="text-white/60 text-sm font-light">{credential}</span>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="flex justify-center mt-10">
          <ToptalBadge />
        </motion.div>
      </motion.section>

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
          <BarChart3 className="w-8 h-8 text-accent mx-auto mb-6" />
          <h3 className="text-2xl md:text-3xl font-light text-white mb-4">
            {t.pages.consulting.ctaHeading}
          </h3>
          <p className="text-white/50 text-base font-light mb-8 max-w-md mx-auto">
            {t.pages.consulting.ctaDescription}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-medium text-base hover:bg-accent/90 transition-all duration-300 shadow-accent-lg group"
          >
            {t.pages.consulting.ctaButton}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
