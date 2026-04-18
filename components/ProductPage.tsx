'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MessageSquare,
  Mail,
  BarChart3,
  Gift,
} from 'lucide-react';
import type { Product } from '@/lib/products';
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

const iconMap: Record<string, typeof MessageSquare> = {
  MessageSquare,
  Mail,
  BarChart3,
  Gift,
};

interface ProductPageProps {
  product: Product;
}

export default function ProductPage({ product }: ProductPageProps) {
  const { t } = useTranslation();
  const productData = t.pages.products.items.find((p) => p.slug === product.slug);

  if (!productData) return null;

  const Icon = iconMap[product.icon] || MessageSquare;

  return (
    <main className="pt-20 md:pt-24 pb-16 md:pb-24">
      {/* Hero */}
      <motion.section
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-white/40 text-sm hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.pages.products.backToProducts}
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/15 border border-accent/25 text-accent text-xs uppercase tracking-wider font-medium">
            <Icon className="w-3.5 h-3.5" />
            {productData.badge}
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4"
        >
          {productData.name}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-accent font-light mb-6"
        >
          {productData.tagline}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-lg text-white/50 font-light max-w-2xl mx-auto leading-relaxed"
        >
          {productData.description}
        </motion.p>
      </motion.section>

      {/* Problem */}
      <motion.section
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 border-t border-white/[0.06]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.p variants={itemVariants} className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4">
          {productData.problemHeading}
        </motion.p>
        <motion.p variants={itemVariants} className="text-white/50 text-base md:text-lg font-light leading-relaxed">
          {productData.problemDescription}
        </motion.p>
      </motion.section>

      {/* Features */}
      <motion.section
        className="py-16 md:py-20 border-t border-white/[0.06]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-light text-white mb-12 text-center">
            {productData.featuresHeading}
          </motion.h2>
          <motion.div variants={containerVariants} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productData.features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-accent/20 transition-all duration-300"
              >
                <h3 className="text-white text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-white/40 text-sm font-light leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 border-t border-white/[0.06]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-light text-white mb-12 text-center">
          {productData.howItWorksHeading}
        </motion.h2>
        <div className="space-y-8">
          {productData.howItWorks.map((step, i) => (
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

      {/* Differentiators */}
      <motion.section
        className="py-16 md:py-20 border-t border-white/[0.06]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-light text-white mb-12 text-center">
            {productData.differentiatorsHeading}
          </motion.h2>
          <motion.div variants={containerVariants} className="grid md:grid-cols-3 gap-6">
            {productData.differentiators.map((diff) => (
              <motion.div
                key={diff.title}
                variants={itemVariants}
                className="p-6 rounded-xl border border-accent/15 bg-accent/[0.03] text-center"
              >
                <h3 className="text-accent text-base font-medium mb-3">{diff.title}</h3>
                <p className="text-white/40 text-sm font-light leading-relaxed">{diff.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Pricing */}
      <motion.section
        className="py-16 md:py-20 border-t border-white/[0.06]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid gap-6 justify-center ${productData.pricing.length > 1 ? 'md:grid-cols-2 max-w-2xl mx-auto' : 'max-w-sm mx-auto'}`}>
            {productData.pricing.map((plan) => (
              <motion.div
                key={plan.plan}
                variants={itemVariants}
                className={`p-8 rounded-2xl border ${plan.highlighted ? 'border-accent/30 bg-accent/[0.05]' : 'border-white/[0.06] bg-white/[0.02]'}`}
              >
                <p className="text-white/60 text-sm font-medium uppercase tracking-wider mb-2">{plan.plan}</p>
                <p className="text-3xl text-white font-light mb-1">{plan.price}</p>
                {plan.period && <p className="text-white/30 text-sm font-light mb-6">{plan.period}</p>}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-white/50 text-sm font-light">
                      <Check className="w-4 h-4 text-accent flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block text-center px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    plan.highlighted
                      ? 'bg-accent text-white hover:bg-accent/90 shadow-accent'
                      : 'border border-white/15 text-white/70 hover:border-accent/30 hover:text-white'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        className="py-16 md:py-24 border-t border-white/[0.06]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-6">
            {productData.ctaHeading}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-white/40 text-base font-light mb-10 max-w-lg mx-auto">
            {productData.ctaDescription}
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-medium text-base hover:bg-accent/90 transition-all duration-300 shadow-accent-lg group"
            >
              {productData.ctaButton}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
