'use client';

import { useEffect, useState } from 'react';
import { GUION_VIDEO_CURSO } from '@/lib/productos/guia/contenido-v2';
import { generarCertificadoPNG, leerCertificado, registrarCertificado } from '@/lib/productos/guia/certificado';
import { filaConDatos, useProgreso } from '@/lib/productos/guia/progreso-v2';
import { LINKS } from '@/lib/productos/links';
import SiguientePaso from '@/components/productos/SiguientePaso';
import { CAMILA } from '@/lib/productos/guia/caso';
import { FOTOS } from '@/lib/productos/fotos';
import { Bloque, Foto, VideoPlaceholder, btnPrimario, btnSecundario } from './ui';

const inputCls =
  'mt-1 h-12 w-full rounded-xl border border-white/15 bg-[#0b1222] px-3 text-base text-white placeholder:text-slate-600 focus:border-[#5fb2dd] focus:outline-none';

export function Certificado() {
  const [datos, setDatos] = useState(() => ({ nombre: '', correo: '', cargo: '' }));
  const [error, setError] = useState<string | null>(null);
  const [generando, setGenerando] = useState(false);
  const [modal, setModal] = useState(false);
  const [precargado, setPrecargado] = useState(false);

  // Si ya lo descargó antes en este navegador, precargamos sus datos (solo al abrir el formulario).
  const precargar = () => {
    if (precargado) return;
    setPrecargado(true);
    const prev = leerCertificado();
    if (prev && !datos.nombre && !datos.correo) setDatos({ nombre: prev.nombre, correo: prev.correo, cargo: prev.cargo ?? '' });
  };

  const descargar = async (e: React.FormEvent) => {
    e.preventDefault();
    const nombre = datos.nombre.trim();
    const correo = datos.correo.trim();
    if (nombre.length < 3) return setError('Escribe tu nombre completo, tal como quieres que aparezca.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) return setError('Revisa tu correo.');
    setError(null);
    setGenerando(true);
    try {
      registrarCertificado({ nombre, correo, cargo: datos.cargo.trim() });
      const blob = await generarCertificadoPNG({ nombre, correo, cargo: datos.cargo.trim() });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `certificado-guia-1-${nombre.toLowerCase().normalize('NFD').replace(/[^a-z0-9]+/g, '-')}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      setModal(true);
    } catch {
      setError('No pudimos generar el certificado. Intenta de nuevo.');
    } finally {
      setGenerando(false);
    }
  };

  return (
    <Bloque etiqueta="Tu certificado" titulo="Descarga tu certificado">
      <div className="mb-4 flex items-center gap-3">
        <Foto foto={FOTOS.ciudad} className="h-16 w-16 shrink-0 !rounded-full" pos="50% 20%" sizes="64px" />
        <p className="text-sm text-slate-300">Lo firma Álvaro Villena, de Villelab. Te lo ganaste: hiciste la guía completa.</p>
      </div>
      <form onSubmit={descargar} onFocus={precargar} className="grid gap-3 rounded-2xl border border-[#5fb2dd]/40 bg-[#2175a1]/10 p-4 sm:p-6" noValidate>
        <p className="text-sm text-slate-300">Guía 1 · Ventas y prospección · 4 horas. Se genera aquí mismo, en tu navegador.</p>
        <label className="block">
          <span className="text-sm font-medium text-white">Nombre completo</span>
          <input autoComplete="name" value={datos.nombre} onChange={(e) => setDatos({ ...datos, nombre: e.target.value })} className={inputCls} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-white">Correo</span>
          <input type="email" inputMode="email" autoComplete="email" value={datos.correo} onChange={(e) => setDatos({ ...datos, correo: e.target.value })} className={inputCls} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-white">Cargo</span>
          <input autoComplete="organization-title" value={datos.cargo} onChange={(e) => setDatos({ ...datos, cargo: e.target.value })} className={inputCls} placeholder="Dueña, Gerente comercial…" />
        </label>
        {error && (
          <p role="alert" className="rounded-lg bg-rose-300/10 p-2 text-sm text-rose-100">
            {error}
          </p>
        )}
        <button type="submit" className={`${btnPrimario} w-full sm:w-auto`} disabled={generando}>
          {generando ? 'Generando…' : 'Descargar mi certificado'}
        </button>
      </form>
      {modal && <ModalCelebracion onCerrar={() => setModal(false)} />}
    </Bloque>
  );
}

function ModalCelebracion({ onCerrar }: { onCerrar: () => void }) {
  const [p] = useProgreso();
  const prospectos = p.prospectos.filter(filaConDatos).length;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onCerrar();
    window.addEventListener('keydown', esc);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', esc);
    };
  }, [onCerrar]);

  const logros = [
    'Tu cliente ideal, claro y por escrito.',
    `${prospectos >= 20 ? 20 : prospectos || 20} prospectos reales en tu planilla, con puntaje.`,
    'Tu primer mensaje de 3 frases y tus 3 seguimientos.',
    'Una rutina de 20 minutos y 5 días de prueba real.',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4" onClick={onCerrar}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="vl-celebracion-titulo"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-[#5fb2dd]/40 bg-[#0f172a] p-5 shadow-hero sm:rounded-3xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5fb2dd]">Certificado descargado ✓</p>
          <button type="button" onClick={onCerrar} aria-label="Cerrar" className="-mr-2 -mt-2 h-11 w-11 shrink-0 rounded-full text-2xl text-slate-400 hover:text-white">
            ×
          </button>
        </div>
        <div className="flex items-end gap-3">
          <h2 id="vl-celebracion-titulo" className="mt-2 flex-1 font-serif text-3xl leading-tight text-white">
            Lograste esto…
          </h2>
          {/* eslint-disable-next-line @next/next/no-img-element -- personaje WebP transparente, tamaño fijo */}
          <img src={CAMILA.celebrando.src} alt={CAMILA.celebrando.alt} width={70} height={120} className="h-[120px] w-[70px] shrink-0" />
        </div>
        <ul className="mt-4 space-y-2">
          {logros.map((l) => (
            <li key={l} className="flex items-start gap-3 rounded-xl bg-white/[0.04] p-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2175a1] text-sm text-white">✓</span>
              <span className="text-slate-100">{l}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-serif text-xl text-[#5fb2dd]">…y es un gran triunfo.</p>

        <div className="mt-6 border-t border-white/10 pt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Tu siguiente paso</p>
          <p className="mt-2 text-slate-200">
            Hoy lo hiciste a mano y con un chat. En el curso <strong className="text-white">«Tu negocio de punta a punta»</strong> aprendes a
            mantener un sistema que corre solo: los seguimientos, las cotizaciones y los reportes salen a tiempo aunque no estés encima.
          </p>
          <div className="mt-4">
            <VideoPlaceholder titulo="Del chat a un sistema que corre solo" duracion="30 s" guion={GUION_VIDEO_CURSO} etiquetaGuion="Leer lo que digo en el video" video="v05-guia-cierre" />
          </div>
          <SiguientePaso
            logro="Ya tienes tu sistema de ventas andando"
            pago={{
              titulo: 'Curso «Tu negocio de punta a punta»',
              descripcion: 'Agentes que buscan, preparan los mensajes y te avisan los seguimientos, conectados y corriendo en el fondo. Además marketing, operación, atención y finanzas.',
              href: LINKS.curso,
              cta: 'Conocer el curso',
              evento: 'guia_click_curso',
            }}
            gratis={[
              {
                titulo: 'Mira la grabación del último workshop',
                descripcion: 'Que ningún cliente se te quede sin respuesta, paso a paso.',
                href: LINKS.workshopGrabacion,
                cta: 'Ver la grabación',
              },
              {
                titulo: 'Únete al próximo workshop en vivo',
                descripcion: 'Gratis, con preguntas en directo.',
                href: LINKS.workshop,
                cta: 'Inscribirme',
              },
            ]}
          />
          <button type="button" onClick={onCerrar} className={`${btnSecundario} mt-6 w-full sm:w-auto`}>
            Seguir en la guía
          </button>
        </div>
      </div>
    </div>
  );
}
