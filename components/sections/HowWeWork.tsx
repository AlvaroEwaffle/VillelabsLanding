'use client';

import { motion } from 'framer-motion';
import { Search, Hammer, Rocket } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

const EASE_SMOOTH = [0.6, -0.05, 0.01, 0.99] as const;

const stepIcons = [Search, Hammer, Rocket];
const stepNumbers = ['01', '02', '03'];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
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

export default function HowWeWork() {
  const { t } = useTranslation();

  return (
    <motion.section
      className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div variants={itemVariants} className="text-center mb-16 md:mb-20">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4">
            {t.howWeWork.label}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white">
            {t.howWeWork.heading}<span className="text-accent">{t.howWeWork.headingHighlight}</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <motion.div variants={containerVariants} className="relative">
          {/* Timeline connector (desktop) */}
          <div className="hidden md:block absolute top-[60px] left-[calc(16.666%-20px)] right-[calc(16.666%-20px)] h-px bg-white/10" />

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {t.howWeWork.steps.map((step, index) => {
              const StepIcon = stepIcons[index];
              return (
                <motion.div
                  key={stepNumbers[index]}
                  variants={itemVariants}
                  className="relative text-center"
                >
                  {/* Number circle */}
                  <div className="relative mx-auto w-[72px] h-[72px] mb-8">
                    <div className="absolute inset-0 rounded-full border border-accent/30 bg-accent/5" />
                    <div className="absolute inset-2 rounded-full border border-accent/20 bg-slate-950 flex items-center justify-center">
                      <StepIcon className="w-6 h-6 text-accent" />
                    </div>
                    <div className="hidden md:block absolute -bottom-[14px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent border-2 border-slate-950" />
                  </div>

                  {/* Step number */}
                  <p className="text-accent text-xs uppercase tracking-[0.2em] font-medium mb-2">
                    {t.howWeWork.stepLabel} {stepNumbers[index]}
                  </p>

                  {/* Title */}
                  <h3 className="text-white text-lg font-medium mb-3">{step.title}</h3>

                  {/* Description */}
                  <p className="text-white/40 text-sm font-light leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
