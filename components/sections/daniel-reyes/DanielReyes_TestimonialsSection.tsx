'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Testimonial {
  text: string;
  initial: string;
  author: string;
  age: number;
  specialty: string;
}

// Real testimonials from psicologiaclinicachile.cl (public section)
// Approved by Daniel Reyes — 2026-03-27
const testimonials: Testimonial[] = [
  {
    text: '"Ha sido una ayuda tremenda, volví a creer en mí y a ser optimista."',
    initial: 'M',
    author: 'Maxime V.',
    age: 33,
    specialty: 'Terapia individual',
  },
  {
    text: '"Fue un acierto y un cambio en 360 en todo ámbito."',
    initial: 'K',
    author: 'Karina A.',
    age: 35,
    specialty: 'Terapia individual',
  },
  {
    text: '"Nos permitió reencontrarnos como matrimonio y darnos otra oportunidad."',
    initial: 'J',
    author: 'Juan O.',
    age: 68,
    specialty: 'Terapia de pareja',
  },
  {
    text: '"Me escucha sin juzgar y me entrega consejos que me hacen reflexionar."',
    initial: 'P',
    author: 'Pamela M.',
    age: 23,
    specialty: 'Terapia individual',
  },
  {
    text: '"Fue fundamental su ayuda en un momento clave de mi vida."',
    initial: 'I',
    author: 'Iván P.',
    age: 47,
    specialty: 'Terapia individual',
  },
  {
    text: '"Nos ayudó a resolver problemas que parecían más complicados."',
    initial: 'B',
    author: 'Brigitte A.',
    age: 60,
    specialty: 'Terapia de pareja',
  },
  {
    text: '"Escucha atentamente, orienta con claridad y transmite confianza."',
    initial: 'M',
    author: 'Marcela V.',
    age: 35,
    specialty: 'Terapia individual',
  },
  {
    text: '"Me ayudó a repasar mi biografía y a conocerme a mí mismo."',
    initial: 'M',
    author: 'Mauricio B.',
    age: 33,
    specialty: 'Terapia individual',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.div
      variants={cardVariants}
      className="bg-white rounded-[14px] p-6 border border-slate-100 flex flex-col"
    >
      <div className="flex gap-0.5 text-amber-400 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-[14px] h-[14px] fill-current" />
        ))}
      </div>
      <p className="text-[15px] text-slate-600 leading-relaxed mb-4 italic flex-1">
        {testimonial.text}
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-base font-bold text-teal-600 shrink-0">
          {testimonial.initial}
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-800">
            {testimonial.author}, {testimonial.age} años
          </div>
          <div className="text-[13px] text-slate-400">{testimonial.specialty}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function DanielReyes_TestimonialsSection() {
  return (
    <section id="testimonios" className="py-24 px-6 bg-[#f7f8fa]">
      <div className="max-w-[1140px] mx-auto">
        <div className="text-center mb-14">
          <div className="text-[13px] font-semibold text-teal-600 tracking-widest uppercase mb-3.5">
            Testimonios
          </div>
          <h2 className="text-[clamp(26px,3.5vw,38px)] font-bold text-slate-900 leading-tight tracking-tight">
            Lo que dicen quienes han pasado por nuestro centro
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {testimonials.map((t) => (
            <TestimonialCard key={t.author} testimonial={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
