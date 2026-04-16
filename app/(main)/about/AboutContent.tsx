'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  User,
  Shield,
  Repeat,
  BarChart3,
  Rocket,
} from 'lucide-react';
import ToptalBadge from '@/components/ToptalBadge';
import { useTranslation } from '@/lib/i18n';

const EASE_SMOOTH = [0.6, -0.05, 0.01, 0.99] as const;

const clientLogos = [
  'Ewaffle',
  'Fidelidapp',
  'Cerveceria Puchacay',
  'Samy Studio',
  'Defensa Total',
  'Dra. Oyarzun',
  'Conexion Industrial',
  'Influencer Factory',
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

export default function AboutContent() {
  const { t } = useTranslation();

  const methodologyIcons = [BarChart3, Repeat, Rocket];

  const team = t.pages.about.team;

  const methodology = t.pages.about.methodology.map((step, i) => ({
    icon: methodologyIcons[i],
    ...step,
  }));

  return (
    <main className="pt-24 md:pt-32 pb-16 md:pb-24">
      {/* Hero */}
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.p
          variants={itemVariants}
          className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4"
        >
          {t.pages.about.label}
        </motion.p>
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6"
        >
          {t.pages.about.heading}<span className="text-accent">{t.pages.about.headingHighlight}</span>
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-lg text-white/50 font-light max-w-2xl mx-auto leading-relaxed"
        >
          {t.pages.about.description}
        </motion.p>
      </motion.div>

      {/* Team */}
      <motion.section
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-light text-white">{t.pages.about.meetTheTeam}</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <motion.div
              key={member.name}
              variants={itemVariants}
              className="p-8 rounded-xl border border-white/[0.06] bg-white/[0.02]"
            >
              {/* Avatar placeholder */}
              <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-6">
                <User className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-white text-lg font-medium mb-1">{member.name}</h3>
              <p className="text-accent text-sm font-light mb-4">{member.role}</p>
              <p className="text-white/40 text-sm font-light leading-relaxed mb-6">
                {member.bio}
              </p>
              <div className="flex flex-wrap gap-2">
                {member.credentials.map((cred) => (
                  <span
                    key={cred}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03] text-white/40 text-[10px] uppercase tracking-wider"
                  >
                    <Shield className="w-2.5 h-2.5" />
                    {cred}
                  </span>
                ))}
              </div>
              {member.name === 'Alvaro Villena' && (
                <a
                  href="https://alvarovillena.cl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-xs text-accent/70 hover:text-accent transition-colors"
                >
                  alvarovillena.cl →
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* Toptal badge */}
        <motion.div variants={itemVariants} className="flex justify-center mt-12">
          <ToptalBadge />
        </motion.div>
      </motion.section>

      {/* Methodology */}
      <motion.section
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4">
            {t.pages.about.methodologyLabel}
          </p>
          <h2 className="text-2xl md:text-3xl font-light text-white">
            {t.pages.about.methodologyHeading}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {methodology.map((step) => (
            <motion.div key={step.title} variants={itemVariants} className="text-center">
              <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-6">
                <step.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-white text-lg font-medium mb-3">{step.title}</h3>
              <p className="text-white/40 text-sm font-light leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Client logos */}
      <motion.section
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-white/30 font-medium">
            {t.pages.about.trustedBy}
          </p>
        </motion.div>
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {clientLogos.map((name) => (
            <span
              key={name}
              className="text-white/15 text-sm font-light tracking-wider uppercase"
            >
              {name}
            </span>
          ))}
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
          <h3 className="text-2xl md:text-3xl font-light text-white mb-4">
            {t.pages.about.ctaHeading}
          </h3>
          <p className="text-white/50 text-base font-light mb-8 max-w-md mx-auto">
            {t.pages.about.ctaDescription}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-medium text-base hover:bg-accent/90 transition-all duration-300 shadow-accent-lg group"
          >
            {t.pages.about.ctaButton}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
