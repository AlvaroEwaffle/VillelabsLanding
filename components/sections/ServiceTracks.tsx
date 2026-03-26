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
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

const EASE_SMOOTH = [0.6, -0.05, 0.01, 0.99] as const;

const marketingIcons = [Layout, Globe, TrendingUp];
const developmentIcons = [Cog, Code2, MessageSquare];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
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

function ServiceCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Layout;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="group p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-accent/20 hover:bg-white/[0.04] transition-all duration-300"
    >
      <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent/15 transition-colors">
        <Icon className="w-5 h-5 text-accent" />
      </div>
      <h4 className="text-white font-medium text-base mb-2">{title}</h4>
      <p className="text-white/40 text-sm font-light leading-relaxed">{description}</p>
    </motion.div>
  );
}

export default function ServiceTracks() {
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
            {t.serviceTracks.label}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
            {t.serviceTracks.heading}
            <span className="text-accent font-normal">{t.serviceTracks.headingHighlight}</span>
          </h2>
          <p className="text-white/40 text-base font-light max-w-xl mx-auto">
            {t.serviceTracks.description}
          </p>
        </motion.div>

        {/* Two columns */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Marketing Track */}
          <motion.div variants={containerVariants}>
            <motion.h3
              variants={itemVariants}
              className="text-xs uppercase tracking-[0.2em] text-white/50 font-medium mb-6 flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-accent" />
              {t.serviceTracks.marketingTrack}
            </motion.h3>
            <div className="space-y-4">
              {t.serviceTracks.marketingServices.map((service, i) => (
                <ServiceCard key={service.title} icon={marketingIcons[i]} {...service} />
              ))}
            </div>
          </motion.div>

          {/* Development Track */}
          <motion.div variants={containerVariants}>
            <motion.h3
              variants={itemVariants}
              className="text-xs uppercase tracking-[0.2em] text-white/50 font-medium mb-6 flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-accent" />
              {t.serviceTracks.developmentTrack}
            </motion.h3>
            <div className="space-y-4">
              {t.serviceTracks.developmentServices.map((service, i) => (
                <ServiceCard key={service.title} icon={developmentIcons[i]} {...service} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="text-center mt-16">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:text-accent/80 transition-colors group"
          >
            {t.serviceTracks.ctaLink}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
