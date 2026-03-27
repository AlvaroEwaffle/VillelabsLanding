'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: '¿Cómo es la primera sesión?',
    answer: 'La primera sesión es una evaluación donde conversamos sobre lo que te trae a consulta, tu historia relevante y definimos juntos los objetivos del proceso. Dura entre 50 y 60 minutos. No hay compromiso de continuar si no te sientes cómodo o cómoda.',
  },
  {
    question: '¿Cuánto dura un proceso terapéutico?',
    answer: 'Depende de cada caso. Hay procesos focalizados de 8 a 12 sesiones y otros más extensos. Desde la primera sesión te damos una estimación honesta del tiempo que podríamos necesitar.',
  },
  {
    question: '¿Atienden con Isapre?',
    answer: 'Emitimos boleta de honorarios para que puedas solicitar reembolso parcial en tu Isapre (Banmédica, Colmena, Consalud, Cruz Blanca, Vida Tres) o Fonasa. El porcentaje de reembolso depende de tu plan.',
  },
  {
    question: '¿La terapia online funciona igual que presencial?',
    answer: 'Sí. La evidencia clínica muestra que la terapia por videollamada tiene la misma efectividad que la presencial para la mayoría de las condiciones. Atendemos pacientes online en todo Chile con excelentes resultados.',
  },
  {
    question: '¿Puedo agendar sin llamar por teléfono?',
    answer: 'Sí. Puedes agendar directamente desde esta página usando el botón de Calendly, completar el formulario de contacto, o escribirnos por WhatsApp. Respondemos en menos de 2 horas.',
  },
  {
    question: '¿Qué pasa si necesito cancelar una sesión?',
    answer: 'Pedimos aviso con al menos 24 horas de anticipación. Las cancelaciones con menos de 24 horas se cobran como sesión tomada, salvo emergencias justificadas.',
  },
];

function FAQAccordionItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-slate-100">
      <button
        onClick={onToggle}
        className="w-full text-left py-6 pr-10 text-base font-semibold text-slate-800 leading-snug relative cursor-pointer"
      >
        {item.question}
        <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[22px] font-normal text-slate-400 transition-transform">
          {isOpen ? '\u2212' : '+'}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-[15px] text-slate-500 leading-relaxed pb-6">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DanielReyes_FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-6">
      <div className="max-w-[1140px] mx-auto">
        <div className="text-center mb-14">
          <div className="text-[13px] font-semibold text-teal-600 tracking-widest uppercase mb-3.5">
            Preguntas Frecuentes
          </div>
          <h2 className="text-[clamp(26px,3.5vw,38px)] font-bold text-slate-900 leading-tight tracking-tight">
            Resolvemos tus dudas
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-[720px] mx-auto"
        >
          {faqs.map((faq, i) => (
            <FAQAccordionItem
              key={faq.question}
              item={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
