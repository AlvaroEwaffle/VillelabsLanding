'use client';

import { motion } from 'framer-motion';

const isapres = ['Banmédica', 'Colmena', 'Consalud', 'Fonasa', 'Cruz Blanca', 'Vida Tres'];

export default function DanielReyes_IsapreGallery() {
  return (
    <section id="isapres" className="py-14 px-6 border-t border-b border-slate-100">
      <div className="max-w-[1140px] mx-auto text-center">
        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-xl font-bold text-slate-900 mb-2"
        >
          Reembolso con tu Isapre
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-[15px] text-slate-500 mb-8 max-w-[500px] mx-auto"
        >
          Emitimos boleta para que puedas solicitar reembolso parcial en tu Isapre o Fonasa.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {isapres.map((name) => (
            <div
              key={name}
              className="w-[140px] h-14 rounded-[10px] bg-slate-50 border border-slate-100 flex items-center justify-center text-[13px] font-semibold text-slate-500 transition-all hover:border-slate-200 hover:shadow-sm"
            >
              {name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
