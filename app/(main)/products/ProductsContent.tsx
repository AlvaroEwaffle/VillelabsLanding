'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MessageSquare, Mail, BarChart3 } from 'lucide-react';
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
    transition: { staggerChildren: 0.12 },
  },
};

const productIcons = [MessageSquare, Mail, BarChart3];

export default function ProductsContent() {
  const { t } = useTranslation();

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
          {t.pages.products.label}
        </motion.p>
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6"
        >
          {t.pages.products.heading}
          <span className="text-accent">{t.pages.products.headingHighlight}</span>
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-lg text-white/50 font-light max-w-2xl mx-auto leading-relaxed"
        >
          {t.pages.products.description}
        </motion.p>
      </motion.div>

      {/* Product Cards */}
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <div className="grid md:grid-cols-3 gap-8">
          {t.pages.products.items.map((product, i) => {
            const Icon = productIcons[i];
            return (
              <motion.div key={product.slug} variants={itemVariants}>
                <Link
                  href={`/products/${product.slug}`}
                  className="group block p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-accent/20 hover:bg-white/[0.04] transition-all duration-300 h-full"
                >
                  <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent/15 transition-colors">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] uppercase tracking-wider font-medium mb-4">
                    {product.badge}
                  </span>
                  <h2 className="text-2xl text-white font-medium mb-2 group-hover:text-accent transition-colors">
                    {product.name}
                  </h2>
                  <p className="text-accent/70 text-sm font-light mb-4">{product.tagline}</p>
                  <p className="text-white/40 text-sm font-light leading-relaxed mb-6">
                    {product.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-accent text-sm font-medium group-hover:gap-3 transition-all">
                    {t.pages.products.viewProduct}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
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
            {t.pages.products.ctaHeading}
          </h3>
          <p className="text-white/50 text-base font-light mb-8 max-w-md mx-auto">
            {t.pages.products.ctaDescription}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-medium text-base hover:bg-accent/90 transition-all duration-300 shadow-accent-lg group"
          >
            {t.pages.products.ctaButton}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
