'use client';

import { motion } from 'framer-motion';
import { Calendar, MessageCircle } from 'lucide-react';
import Image from 'next/image';

const WHATSAPP_NUMBER = '56920115198';
const WHATSAPP_MSG = 'Hola, me gustaría agendar una consulta en el centro de psicología clínica.';

export default function DanielReyes_HeroSection() {
  return (
    <section id="inicio" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/clients/daniel-reyes/photos/waiting-room.png"
          alt="Sala de espera del centro de psicología clínica"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(26,35,50,0.72)] via-[rgba(26,35,50,0.65)] to-[rgba(26,35,50,0.8)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[780px] text-center px-6 pt-[120px] pb-20 md:pt-[120px] md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 bg-white/[0.12] backdrop-blur-lg border border-white/[0.15] text-white/90 px-[18px] py-2 rounded-full text-[13px] font-medium tracking-wide mb-7"
        >
          <span className="w-[7px] h-[7px] bg-teal-500 rounded-full animate-pulse" />
          Atendiendo presencial y online
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          className="text-[clamp(34px,5.5vw,54px)] font-bold text-white leading-[1.15] mb-5 tracking-tight"
        >
          SUBJETIVIDADES
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="text-[clamp(16px,2vw,19px)] text-white/75 max-w-[600px] mx-auto mb-9 leading-relaxed"
        >
          Un espacio profesional dedicado al bienestar emocional. Psicoterapia individual, de pareja y sexual con enfoque clínico basado en evidencia. Más de 20 años de experiencia al servicio de tu salud mental.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
          className="flex gap-3.5 justify-center flex-wrap"
        >
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-teal-600 text-white rounded-[9px] text-[15px] font-semibold transition-all hover:bg-teal-700 hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(13,148,136,0.3)]"
          >
            <Calendar className="w-[18px] h-[18px]" />
            Agendar primera consulta
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/[0.12] text-white border-[1.5px] border-white/25 backdrop-blur-sm rounded-[9px] text-[15px] font-semibold transition-all hover:bg-white/20 hover:border-white/40"
          >
            <MessageCircle className="w-[18px] h-[18px]" />
            Escribir por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
