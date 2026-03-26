'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

const EASE_SMOOTH = [0.6, -0.05, 0.01, 0.99] as const;

const projectData = [
  {
    category: 'Web',
    image: 'https://samy-studio.com/assets/january/Fotos/IMG_4812.JPG',
    link: 'https://samy-studio.com/',
  },
  {
    category: 'Web',
    image: 'https://influencersfactory.com/assets/jan/BannerPrecio.svg',
    link: 'https://influencersfactory.com/',
  },
  {
    category: 'Web',
    image: 'https://cerveceriapuchacay.cl/assets/HeroBg.D9CN-gY4_Tqj8v.webp',
    link: 'https://cerveceriapuchacay.cl/',
  },
  {
    category: 'Web',
    image: 'https://defensatotalabogados.cl/img/Hero.png',
    link: 'http://defensatotalabogados.cl/',
  },
  {
    category: 'Platform',
    image: 'https://res.cloudinary.com/di92lsbym/image/upload/v1739838001/photo-1553877522-43269d4ea984_k7fgug_1_anllid.webp',
    link: 'https://www.fidelidapp.cl/',
  },
  {
    category: 'Web',
    image: 'https://draoyarzun.pages.dev/assets/HeroProfile.png',
    link: 'https://doctoraoyarzun.cl/',
  },
  {
    category: 'Web',
    image: 'https://ewaffle.cl/assets/CoverEwaffle.png',
    link: 'https://ewaffle.cl',
  },
  {
    category: 'Platform',
    image: 'https://conexionindustrial.cl/bgphotos/home.png',
    link: 'https://conexionindustrial.cl/',
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_SMOOTH },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3 },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

export default function PortfolioContent() {
  const { t } = useTranslation();

  const categories = [
    { key: 'All', label: t.pages.portfolio.filterAll },
    { key: 'Web', label: t.pages.portfolio.filterWeb },
    { key: 'Platform', label: t.pages.portfolio.filterPlatform },
  ];

  const projects = projectData.map((project, i) => ({
    ...project,
    title: t.pages.portfolio.projects[i].title,
    description: t.pages.portfolio.projects[i].description,
  }));

  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <main className="pt-24 md:pt-32 pb-16 md:pb-24">
      {/* Header */}
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.p
          variants={itemVariants}
          className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4"
        >
          {t.pages.portfolio.label}
        </motion.p>
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6"
        >
          {t.pages.portfolio.heading}
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-lg text-white/50 font-light max-w-2xl mx-auto"
        >
          {t.pages.portfolio.description}
        </motion.p>
      </motion.div>

      {/* Filter */}
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category.key}
              type="button"
              onClick={() => setActiveFilter(category.key)}
              className={`px-5 py-2 rounded-full text-sm font-light transition-all duration-200 ${
                activeFilter === category.key
                  ? 'bg-accent text-white'
                  : 'border border-white/10 text-white/50 hover:text-white hover:border-white/20'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-accent/20 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-500 scale-105 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  {/* Category */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-[10px] uppercase tracking-wider font-medium">
                    {project.category}
                  </span>
                  {/* External icon */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-4 h-4 text-white/60" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-white text-lg font-medium mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/40 text-sm font-light leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}
