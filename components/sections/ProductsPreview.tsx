'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MessageSquare, Mail, BarChart3 } from 'lucide-react';
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
    transition: { staggerChildren: 0.12 },
  },
};

const productIcons = [MessageSquare, Mail, BarChart3];

export default function ProductsPreview() {
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
            {t.pages.products.label}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white">
            {t.pages.products.heading}
            <span className="text-accent">{t.pages.products.headingHighlight}</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div variants={containerVariants} className="grid md:grid-cols-3 gap-6">
          {t.pages.products.items.map((product, i) => {
            const Icon = productIcons[i];
            return (
              <motion.div key={product.slug} variants={itemVariants}>
                <Link
                  href={`/products/${product.slug}`}
                  className="group block p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-accent/20 hover:bg-white/[0.04] transition-all duration-300 h-full"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-5 group-hover:bg-accent/15 transition-colors">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-white text-xl font-medium mb-1 group-hover:text-accent transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-accent/60 text-sm font-light mb-3">{product.tagline}</p>
                  <p className="text-white/40 text-sm font-light leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-accent text-sm font-medium">
                    {t.pages.products.viewProduct}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
