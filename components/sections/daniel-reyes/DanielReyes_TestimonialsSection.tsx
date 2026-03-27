'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Testimonial {
  text: string;
  initial: string;
  author: string;
  role: string;
}

// PLACEHOLDER TESTIMONIALS — BLOCKER: Must be replaced with real testimonials
// from https://psicologiaclinicachile.cl/ or provided by Daniel Reyes.
// These are illustrative only and MUST NOT go to production as-is.
const testimonials: Testimonial[] = [
  {
    text: '"Llegué en un momento muy difícil y en el centro supieron acogerme con profesionalismo y calidez. Me ayudaron a entender patrones que repetía sin darme cuenta. Totalmente recomendado."',
    initial: 'C',
    author: 'Carolina M.',
    role: 'Terapia individual, 8 meses',
  },
  {
    text: '"La terapia de pareja fue un antes y un después para nosotros. Nos dieron herramientas concretas desde la primera sesión. Hoy nos comunicamos mucho mejor."',
    initial: 'R',
    author: 'Rodrigo y Camila',
    role: 'Terapia de pareja, 6 meses',
  },
  {
    text: '"Busqué un psicólogo para tratar ansiedad y fue la mejor decisión que pude tomar. El enfoque es directo, profesional y humano. Sentí confianza desde el primer día."',
    initial: 'F',
    author: 'Felipe A.',
    role: 'Terapia individual, 1 año',
  },
  {
    text: '"Llevaba años evitando el tema de la sexualidad en terapia. Aquí pude hablar abiertamente por primera vez. Son profesionales serios y muy preparados en el área."',
    initial: 'A',
    author: 'Andrea L.',
    role: 'Terapia sexual, 5 meses',
  },
  {
    text: '"Vivo en Temuco y tomo consulta online. Funciona igual de bien que presencial. Me siento escuchada en cada sesión y el proceso ha sido muy profesional."',
    initial: 'V',
    author: 'Valentina R.',
    role: 'Terapia online, 4 meses',
  },
  {
    text: '"Lo que más valoro es la honestidad. No te dicen lo que quieres escuchar: te ayudan a ver lo que necesitas ver. Eso, con 20 años de experiencia detrás, hace la diferencia."',
    initial: 'M',
    author: 'Matías G.',
    role: 'Terapia individual, 10 meses',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
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
      className="bg-white rounded-[14px] p-7 border border-slate-100 flex flex-col"
    >
      <div className="flex gap-0.5 text-amber-400 mb-3.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-[15px] h-[15px] fill-current" />
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
          <div className="text-sm font-semibold text-slate-800">{testimonial.author}</div>
          <div className="text-[13px] text-slate-400">{testimonial.role}</div>
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {testimonials.map((t) => (
            <TestimonialCard key={t.author} testimonial={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
