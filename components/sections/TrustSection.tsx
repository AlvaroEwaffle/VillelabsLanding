'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

const EASE_SMOOTH = [0.6, -0.05, 0.01, 0.99] as const;

const clients = [
  'We Techs',
  'Progreso',
  'Jooycar',
  'Ewaffle',
  'Fidelidapp',
  'Cerveceria Puchacay',
  'Defensa Total',
  'Conexion Industrial',
];

const testimonialLogos = [
  { src: '/logos/wetechs.svg', alt: 'We Techs', width: 120, height: 40 },
  { src: '/logos/progreso.png', alt: 'Progreso', width: 120, height: 24 },
  { src: '/logos/jooycar.svg', alt: 'Jooycar', width: 110, height: 36 },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_SMOOTH },
  },
};

export default function TrustSection() {
  const { t } = useTranslation();

  return (
    <motion.section
      className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative bg-slate-950/50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4">
            {t.trust.label}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white">
            {t.trust.heading}
          </h2>
        </motion.div>

        {/* Scrolling logo bar */}
        <motion.div variants={itemVariants} className="mb-20 overflow-hidden">
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0f172a] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0f172a] to-transparent z-10 pointer-events-none" />
            <div className="flex animate-scroll-logos">
              {[...clients, ...clients].map((client, index) => (
                <div
                  key={`${client}-${index}`}
                  className="flex-shrink-0 mx-8 flex items-center justify-center"
                >
                  <span className="text-white/20 text-sm md:text-base font-light tracking-wider whitespace-nowrap uppercase">
                    {client}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* B2B Directory Badges */}
        <motion.div variants={itemVariants} className="mb-20">
          <p className="text-center text-xs uppercase tracking-[0.15em] text-white/25 font-medium mb-8">
            {t.trust.listedOn}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {['Clutch', 'Goodfirms', 'Sortlist', 'DesignRush'].map((directory) => (
              <span
                key={directory}
                className="text-white/15 text-sm md:text-base font-light tracking-wider uppercase hover:text-white/30 transition-colors duration-300"
              >
                {directory}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {t.trust.testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={itemVariants}
              custom={index}
              className="p-6 md:p-8 rounded-xl border border-white/[0.06] bg-white/[0.02]"
            >
              {testimonialLogos[index] && (
                <div className="mb-5 h-10 flex items-center">
                  <Image
                    src={testimonialLogos[index].src}
                    alt={testimonialLogos[index].alt}
                    width={testimonialLogos[index].width}
                    height={testimonialLogos[index].height}
                    className="brightness-0 invert opacity-40"
                  />
                </div>
              )}
              <Quote className="w-6 h-6 text-accent/40 mb-4" />
              <p className="text-white/60 text-sm font-light leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div>
                <p className="text-white text-sm font-medium">{testimonial.name}</p>
                <p className="text-white/30 text-xs font-light">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
