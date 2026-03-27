'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Clock, Globe, Heart, MapPin, Monitor } from 'lucide-react';
import Image from 'next/image';

const credentials = [
  { icon: GraduationCap, text: 'Doctor en Psicología, Universidad de Chile' },
  { icon: Clock, text: 'Más de 20 años de experiencia clínica' },
  { icon: Globe, text: 'Consultor internacional' },
  { icon: Heart, text: 'Especialista en terapia individual, de pareja y sexual' },
  { icon: MapPin, text: 'Consultorio en Ñuñoa, Santiago' },
  { icon: Monitor, text: 'Atención online para todo Chile' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function DanielReyes_TeamSection() {
  return (
    <section id="equipo" className="py-24 px-6 bg-[#f7f8fa]">
      <div className="max-w-[1140px] mx-auto">
        <div className="text-center mb-14">
          <div className="text-[13px] font-semibold text-teal-600 tracking-widest uppercase mb-3.5">
            Equipo Clínico
          </div>
          <h2 className="text-[clamp(26px,3.5vw,38px)] font-bold text-slate-900 leading-tight tracking-tight">
            Profesionales dedicados a tu bienestar
          </h2>
          <p className="text-base text-slate-500 mt-3.5 max-w-[580px] mx-auto leading-relaxed">
            Nuestro equipo clínico combina experiencia, formación académica de excelencia y un compromiso genuino con cada paciente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[380px_1fr] gap-9 md:gap-14 items-start">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[14px] overflow-hidden aspect-[3/4] shadow-lg relative max-w-[320px] md:max-w-none mx-auto"
          >
            <Image
              src="/clients/daniel-reyes/photos/headshot-professional.png"
              alt="Dr. Daniel Reyes Pace — Director Clínico"
              width={380}
              height={507}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-lg p-3.5 rounded-[10px] shadow-sm">
              <div className="text-base font-bold text-slate-900">Dr. Daniel Reyes Pace</div>
              <div className="text-[13px] font-medium text-teal-600">Director Clínico y Fundador</div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 variants={itemVariants} className="text-[clamp(26px,3vw,34px)] font-bold text-slate-900 leading-tight mb-4 tracking-tight">
              Dr. Daniel Reyes Pace
            </motion.h2>
            <motion.p variants={itemVariants} className="text-base text-slate-600 leading-relaxed mb-7">
              Psicólogo clínico con doctorado de la Universidad de Chile y más de 20 años de experiencia en psicoterapia. Consultor internacional con especialización en terapia individual, de pareja y sexual. Fundador de SUBJETIVIDADES, donde lidera un enfoque terapéutico riguroso, centrado en la evidencia y en el bienestar integral de cada paciente.
            </motion.p>

            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8"
            >
              {credentials.map(({ icon: Icon, text }) => (
                <motion.div
                  key={text}
                  variants={itemVariants}
                  className="flex items-center gap-3 p-3.5 bg-white rounded-[10px] border border-slate-100"
                >
                  <div className="w-[38px] h-[38px] rounded-[9px] bg-teal-50 flex items-center justify-center shrink-0">
                    <Icon className="w-[18px] h-[18px] text-teal-600" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 leading-snug">{text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-3 p-5 bg-white rounded-[10px] border border-dashed border-slate-200 text-center"
            >
              <p className="text-sm text-slate-400 italic">
                Nuestro centro está en proceso de expansión. Pronto incorporaremos nuevos profesionales al equipo clínico.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
