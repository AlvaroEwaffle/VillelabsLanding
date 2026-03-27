'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const pillars = [
  {
    num: '1',
    title: 'Evaluación inicial rigurosa',
    desc: 'Primera sesión de diagnóstico donde exploramos tu motivo de consulta, historia relevante y definimos objetivos terapéuticos.',
  },
  {
    num: '2',
    title: 'Plan de tratamiento personalizado',
    desc: 'Diseñamos un plan específico con herramientas y técnicas seleccionadas para tu caso particular.',
  },
  {
    num: '3',
    title: 'Seguimiento y resultados medibles',
    desc: 'Revisamos periódicamente el progreso y ajustamos el tratamiento. Sin procesos interminables.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function DanielReyes_EnfoqueSection() {
  return (
    <section id="enfoque" className="py-24 px-6">
      <div className="max-w-[1140px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-9 md:gap-16 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="text-[13px] font-semibold text-teal-600 tracking-widest uppercase mb-3.5">
              Nuestro Enfoque
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-[clamp(26px,3vw,34px)] font-bold text-slate-900 leading-tight mb-5 tracking-tight">
              Metodología clínica basada en evidencia
            </motion.h2>
            <motion.p variants={itemVariants} className="text-base text-slate-600 leading-relaxed mb-4">
              Trabajamos con un enfoque integrativo que prioriza las intervenciones con mayor respaldo científico, adaptándolas a la realidad y necesidades de cada paciente.
            </motion.p>
            <motion.p variants={itemVariants} className="text-base text-slate-600 leading-relaxed mb-4">
              No creemos en recetas universales. Cada proceso es único, pero siempre parte de una evaluación rigurosa y objetivos claros.
            </motion.p>

            <motion.div variants={containerVariants} className="flex flex-col gap-4 mt-7">
              {pillars.map((pillar) => (
                <motion.div
                  key={pillar.num}
                  variants={itemVariants}
                  className="flex gap-4 p-5 bg-[#f7f8fa] rounded-[10px] border-l-[3px] border-teal-600"
                >
                  <span className="text-2xl font-bold text-teal-600 leading-none shrink-0 w-8">
                    {pillar.num}
                  </span>
                  <div>
                    <h4 className="text-[15px] font-bold text-slate-800 mb-1">{pillar.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{pillar.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[14px] overflow-hidden aspect-[4/3] shadow-lg order-first md:order-last"
          >
            <Image
              src="/clients/daniel-reyes/photos/consultation-session.png"
              alt="Sesión de consulta en el centro de psicología"
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
