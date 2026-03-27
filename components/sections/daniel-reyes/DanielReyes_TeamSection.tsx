'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Heart, Users, Brain } from 'lucide-react';
import Image from 'next/image';

interface TeamMember {
  name: string;
  role: string;
  photo: string | null;
  specialties: string[];
  bio: string;
}

const team: TeamMember[] = [
  {
    name: 'Dr. Daniel Reyes Pace',
    role: 'Director Clínico y Fundador',
    photo: '/clients/daniel-reyes/photos/headshot-professional.png',
    specialties: ['Terapia individual', 'Terapia de pareja', 'Terapia sexual'],
    bio: 'Psicólogo clínico con doctorado de la Universidad de Chile y más de 20 años de experiencia. Consultor internacional especializado en psicoterapia basada en evidencia.',
  },
  {
    name: 'Allison Díaz',
    role: 'Psicóloga Clínica',
    photo: null,
    specialties: ['Terapia individual', 'Ansiedad y estrés', 'Autoestima'],
    bio: 'Profesional dedicada al acompañamiento terapéutico con enfoque integrativo. Comprometida con el bienestar emocional de cada paciente.',
  },
  {
    name: 'Próximo profesional',
    role: 'En proceso de incorporación',
    photo: null,
    specialties: ['Por confirmar'],
    bio: 'Nuestro centro está en expansión. Pronto incorporaremos un nuevo profesional al equipo clínico.',
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

function AvatarPlaceholder({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="w-full h-full bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center">
      <span className="text-4xl font-bold text-teal-600/60">{initials}</span>
    </div>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  const iconMap: Record<string, typeof Heart> = {
    'Terapia individual': Users,
    'Terapia de pareja': Heart,
    'Terapia sexual': Heart,
    'Ansiedad y estrés': Brain,
    'Autoestima': Brain,
    'Por confirmar': GraduationCap,
  };

  return (
    <motion.div
      variants={cardVariants}
      className="group bg-white rounded-[14px] border border-slate-100 overflow-hidden transition-all hover:shadow-[0_4px_16px_rgba(26,35,50,0.08)] hover:-translate-y-[3px]"
    >
      {/* Photo */}
      <div className="aspect-[3/4] overflow-hidden relative">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            width={380}
            height={507}
            className="w-full h-full object-cover transition-transform group-hover:scale-[1.02]"
          />
        ) : (
          <AvatarPlaceholder name={member.name} />
        )}
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-0.5">{member.name}</h3>
        <p className="text-[13px] font-medium text-teal-600 mb-3">{member.role}</p>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">{member.bio}</p>

        {/* Specialties */}
        <div className="flex flex-wrap gap-2">
          {member.specialties.map((specialty) => {
            const Icon = iconMap[specialty] || GraduationCap;
            return (
              <span
                key={specialty}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md"
              >
                <Icon className="w-3 h-3" />
                {specialty}
              </span>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {team.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
