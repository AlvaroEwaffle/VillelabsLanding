'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#centro', label: 'El Centro' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#equipo', label: 'Equipo' },
  { href: '#testimonios', label: 'Testimonios' },
];

export default function DanielReyes_Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-2xl border-b border-slate-100 transition-shadow ${scrolled ? 'shadow-sm' : ''}`}
      >
        <div className="max-w-[1140px] mx-auto flex items-center justify-between h-[72px] px-6">
          {/* Brand */}
          <a href="#inicio" className="flex flex-col leading-tight no-underline">
            <span className="text-[15px] font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Courier Prime', Courier, monospace" }}>
              SUBJETIVIDADES
            </span>
            <span className="text-[10px] font-medium text-teal-600 tracking-wider uppercase">
              Centro Psicología Clínica
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-500 no-underline transition-colors hover:text-slate-900 tracking-wide"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              className="text-sm font-semibold text-white bg-teal-600 px-[22px] py-2.5 rounded-lg transition-all hover:bg-teal-700 hover:-translate-y-px no-underline"
            >
              Agendar consulta
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex md:hidden flex-col gap-[5px] p-2 bg-transparent border-none cursor-pointer"
            aria-label="Menú de navegación"
          >
            <span className={`block w-[22px] h-[2px] bg-slate-700 rounded-sm transition-transform ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-[22px] h-[2px] bg-slate-700 rounded-sm transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-[22px] h-[2px] bg-slate-700 rounded-sm transition-transform ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[72px] left-0 right-0 z-[99] bg-white border-b border-slate-100 px-6 py-4 shadow-md md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="block py-3 text-base font-medium text-slate-600 no-underline border-b border-slate-100 last:border-b-0 transition-colors hover:text-teal-600"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={closeMenu}
              className="block py-3 text-base font-medium text-teal-600 no-underline transition-colors hover:text-teal-700"
            >
              Contacto
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
