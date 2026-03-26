'use client';

import { motion } from 'framer-motion';
import type { CanalesSection as CanalesData } from '@/lib/proposals/types';
import ChannelBlock from './ChannelBlock';

interface CanalesSectionProps {
  data: CanalesData;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function CanalesSection({ data }: CanalesSectionProps) {
  return (
    <motion.section
      id="canales"
      className="py-[72px] pb-12 border-b border-white/[0.08]"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="max-w-[760px] mx-auto px-7">
        <motion.span variants={itemVariants} className="text-[11px] font-medium tracking-wider uppercase text-white/40 mb-4 block">
          {data.sectionNumber}
        </motion.span>
        <motion.h2 variants={itemVariants} className="font-serif text-[clamp(24px,4vw,34px)] font-light tracking-tight text-accent leading-tight mb-6 whitespace-pre-line">
          {data.title}
        </motion.h2>
        <motion.p variants={itemVariants} className="text-white/60 mb-3.5 leading-relaxed">
          {data.intro}
        </motion.p>

        {data.channels.map((channel, i) => (
          <motion.div key={i} variants={itemVariants}>
            <ChannelBlock channel={channel} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
