'use client';

import { motion } from 'framer-motion';
import { Check, X, Minus } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

const EASE_SMOOTH = [0.6, -0.05, 0.01, 0.99] as const;

type CellValue = 'check' | 'x' | 'minus' | string;

function CellContent({ value }: { value: CellValue }) {
  if (value === 'check') {
    return (
      <div className="w-6 h-6 rounded-full bg-accent/15 flex items-center justify-center mx-auto">
        <Check className="w-3.5 h-3.5 text-accent" />
      </div>
    );
  }
  if (value === 'x') {
    return (
      <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center mx-auto">
        <X className="w-3.5 h-3.5 text-red-400/60" />
      </div>
    );
  }
  if (value === 'minus') {
    return (
      <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center mx-auto">
        <Minus className="w-3.5 h-3.5 text-white/30" />
      </div>
    );
  }
  return <span className="text-white/50 text-sm font-light">{value}</span>;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_SMOOTH },
  },
};

export default function ComparisonTable() {
  const { t } = useTranslation();

  return (
    <motion.section
      className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4">
            {t.comparison.label}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white">
            {t.comparison.heading}<span className="text-accent">{t.comparison.headingHighlight}</span>
          </h2>
        </motion.div>

        {/* Table */}
        <motion.div
          variants={itemVariants}
          className="overflow-x-auto rounded-xl border border-white/[0.06]"
        >
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left p-4 md:p-5 text-white/40 text-xs uppercase tracking-wider font-medium w-[30%]">
                  {t.comparison.featureHeader}
                </th>
                <th className="p-4 md:p-5 text-center w-[23.3%]">
                  <div className="inline-flex flex-col items-center">
                    <span className="text-accent text-sm font-medium">{t.comparison.villelabsHeader}</span>
                    <div className="w-full h-0.5 bg-accent mt-1 rounded-full" />
                  </div>
                </th>
                <th className="p-4 md:p-5 text-white/40 text-sm font-light text-center w-[23.3%]">
                  {t.comparison.freelanceHeader}
                </th>
                <th className="p-4 md:p-5 text-white/40 text-sm font-light text-center w-[23.3%]">
                  {t.comparison.agencyHeader}
                </th>
              </tr>
            </thead>
            <tbody>
              {t.comparison.rows.map((row, index) => (
                <tr
                  key={row.feature}
                  className={`${
                    index < t.comparison.rows.length - 1 ? 'border-b border-white/[0.04]' : ''
                  } hover:bg-white/[0.02] transition-colors`}
                >
                  <td className="p-4 md:p-5 text-white/70 text-sm font-light">
                    {row.feature}
                  </td>
                  <td className="p-4 md:p-5 text-center bg-accent/[0.03]">
                    <CellContent value={row.villelabs} />
                  </td>
                  <td className="p-4 md:p-5 text-center">
                    <CellContent value={row.freelance} />
                  </td>
                  <td className="p-4 md:p-5 text-center">
                    <CellContent value={row.agency} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </motion.section>
  );
}
