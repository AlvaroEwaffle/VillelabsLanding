'use client';

import { motion } from 'framer-motion';
import { Shield, Smile, BookOpen, MessageSquare } from 'lucide-react';
import Image from 'next/image';

const values = [
  { icon: Shield, label: 'Confidencialidad\nabsoluta' },
  { icon: Smile, label: 'Trato humano\ny respetuoso' },
  { icon: BookOpen, label: 'Enfoque basado\nen evidencia' },
  { icon: MessageSquare, label: 'Atención presencial\ny online' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function DanielReyes_CentroSection() {
  return (
    <section id="centro" className="py-24 px-6 bg-[#f7f8fa]">
      <div className="max-w-[1140px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-9 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[14px] overflow-hidden aspect-[4/3] shadow-lg"
          >
            <Image
              src="/clients/daniel-reyes/photos/clinic-corridor.png"
              alt="Interior del centro de psicología clínica"
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-[13px] font-semibold text-teal-600 tracking-widest uppercase mb-3.5">
              Nuestro Centro
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-[clamp(26px,3vw,34px)] font-bold text-slate-900 leading-tight mb-5 tracking-tight">
              Un espacio pensado para tu bienestar
            </motion.h2>
            <motion.p variants={itemVariants} className="text-base text-slate-600 leading-relaxed mb-4">
              En SUBJETIVIDADES creemos que el cuidado de la salud mental merece un entorno profesional, acogedor y basado en la mejor evidencia científica disponible.
            </motion.p>
            <motion.p variants={itemVariants} className="text-base text-slate-600 leading-relaxed mb-4">
              Nuestro centro nace de la convicción de que la psicoterapia efectiva requiere no solo experiencia clínica, sino también un compromiso genuino con cada persona que cruza nuestra puerta.
            </motion.p>

            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-7"
            >
              {values.map(({ icon: Icon, label }) => (
                <motion.div key={label} variants={itemVariants} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-[18px] h-[18px] text-teal-600" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700 leading-snug whitespace-pre-line">
                    {label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
