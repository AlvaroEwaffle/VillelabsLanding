'use client';

import { motion } from 'framer-motion';
import { User, Users, Heart } from 'lucide-react';

interface ServiceData {
  icon: typeof User;
  title: string;
  description: string;
  topics: string[];
  price: string;
}

const services: ServiceData[] = [
  {
    icon: User,
    title: 'Terapia Individual',
    description: 'Un espacio seguro para trabajar en lo que necesitas cambiar, con objetivos claros desde la primera sesión.',
    topics: ['Ansiedad y estrés', 'Depresión y duelos', 'Autoestima', 'Desarrollo personal'],
    price: '$50.000 - $60.000 CLP / sesión',
  },
  {
    icon: Users,
    title: 'Terapia de Pareja',
    description: 'La terapia de pareja no es el último recurso. Es una inversión en lo que más importa. Herramientas concretas desde la primera sesión.',
    topics: ['Conflictos de comunicación', 'Crisis de pareja', 'Infidelidad', 'Distancia emocional'],
    price: '$70.000 - $80.000 CLP / sesión',
  },
  {
    icon: Heart,
    title: 'Terapia Sexual',
    description: 'Un área que sigue siendo tabú, pero que tiene soluciones concretas y basadas en evidencia. Atención profesional y sin prejuicios.',
    topics: ['Disfunciones sexuales', 'Deseo e intimidad', 'Identidad sexual', 'Salud sexual integral'],
    price: '$50.000 - $60.000 CLP / sesión',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function ServiceCard({ service }: { service: ServiceData }) {
  const Icon = service.icon;
  return (
    <motion.div
      variants={cardVariants}
      className="group bg-white rounded-[14px] p-9 border border-slate-100 transition-all relative overflow-hidden hover:border-teal-100 hover:shadow-[0_4px_16px_rgba(26,35,50,0.08)] hover:-translate-y-[3px]"
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-teal-600 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="w-[52px] h-[52px] rounded-xl bg-teal-50 flex items-center justify-center mb-5">
        <Icon className="w-6 h-6 text-teal-600" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2.5">{service.title}</h3>
      <p className="text-[15px] text-slate-500 leading-relaxed mb-5">{service.description}</p>
      <ul className="mb-5 space-y-1">
        {service.topics.map((topic) => (
          <li key={topic} className="flex items-center gap-2 text-sm text-slate-600 py-1">
            <span className="w-[5px] h-[5px] rounded-full bg-teal-500 shrink-0" />
            {topic}
          </li>
        ))}
      </ul>
      <div className="inline-block text-sm font-semibold text-teal-700 bg-teal-50 px-3.5 py-[7px] rounded-lg">
        {service.price}
      </div>
    </motion.div>
  );
}

export default function DanielReyes_ServicesSection() {
  return (
    <section id="servicios" className="py-24 px-6">
      <div className="max-w-[1140px] mx-auto">
        <div className="text-center mb-14">
          <div className="text-[13px] font-semibold text-teal-600 tracking-widest uppercase mb-3.5">
            Servicios
          </div>
          <h2 className="text-[clamp(26px,3.5vw,38px)] font-bold text-slate-900 leading-tight tracking-tight">
            Atención clínica especializada
          </h2>
          <p className="text-base text-slate-500 mt-3.5 max-w-[580px] mx-auto leading-relaxed">
            Tres áreas de especialización con un enfoque clínico riguroso y más de dos décadas de práctica profesional.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
