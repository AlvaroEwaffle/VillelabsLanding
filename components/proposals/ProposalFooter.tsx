'use client';

import { motion } from 'framer-motion';

interface ProposalFooterProps {
  quote: string;
  meta: string;
}

export default function ProposalFooter({ quote, meta }: ProposalFooterProps) {
  return (
    <motion.footer
      className="py-[60px] text-center border-t border-white/[0.08]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-[760px] mx-auto px-7">
        <p className="font-serif text-[clamp(18px,3vw,26px)] font-light italic text-accent max-w-[560px] mx-auto mb-3.5 leading-snug">
          {quote}
        </p>
        <p className="text-xs text-white/40">{meta}</p>
      </div>
    </motion.footer>
  );
}
