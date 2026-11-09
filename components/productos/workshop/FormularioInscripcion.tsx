'use client';

import { useState } from 'react';
import { CalendarPlus, CheckCircle2, FileText } from 'lucide-react';
import { LINKS } from '@/lib/productos/links';
import { fechaWorkshop, fechaWorkshopTexto } from '@/lib/productos/workshop/config';
import SiguientePaso from '@/components/productos/SiguientePaso';
import { GRATIS_ESQUELETO, GRATIS_GRABACION, PASO_CURSO, RANGOS_MENSAJES } from '@/lib/productos/workshop/contenido';
import { descargarIcs, registrarInscripcion, trackWorkshopRegistro, type Inscripcion } from '@/lib/productos/workshop/inscripcion';

const VACIO: Inscripcion = { nombre: '', correo: '', whatsapp: '', rubro: '', mensajesDia: '' };

const campo =
  'mt-1.5 block min-h-[48px] w-full rounded-xl border border-white/15 bg-slate-900/80 px-4 text-base text-white placeholder:text-slate-500 focus:border-[#5fb2dd] focus:outline-none focus:ring-2 focus:ring-[#5fb2dd]/30';

export default function FormularioInscripcion() {
  const [datos, setDatos] = useState<Inscripcion>(VACIO);
  const [enviando, setEnviando] = useState(false);
  const [listo, setListo] = useState(false);
  const hayFecha = fechaWorkshop() !== null;

  const set = (k: keyof Inscripcion) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setDatos((d) => ({ ...d, [k]: e.target.value }));

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (enviando) return;
    setEnviando(true);
    const limpio: Inscripcion = {
      nombre: datos.nombre.trim(),
      correo: datos.correo.trim(),
      whatsapp: datos.whatsapp.trim(),
      rubro: datos.rubro.trim(),
      mensajesDia: datos.mensajesDia,
    };
    await registrarInscripcion(limpio);
    trackWorkshopRegistro(limpio);
    setDatos(limpio);
    setEnviando(false);
    setListo(true);
  }

  if (listo) {
    const nombre = datos.nombre.split(' ')[0];
    return (
      <div className="rounded-3xl border border-[#5fb2dd]/40 bg-[#2175a1]/[0.12] p-6 sm:p-8" role="status" aria-live="polite">
        <CheckCircle2 className="h-8 w-8 text-[#5fb2dd]" aria-hidden />
        <h2 className="mt-4 font-serif text-2xl text-white sm:text-3xl">¡Listo{nombre ? `, ${nombre}` : ''}! Tu cupo está reservado.</h2>
        <p className="mt-3 text-slate-300">Fecha: {fechaWorkshopTexto()}. El link para entrar te llega por correo y por WhatsApp.</p>
        <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-5">
          <p className="font-medium text-white">Tu esqueleto de regalo ya está listo.</p>
          <p className="mt-1 text-sm text-slate-300">
            Ármalo antes y lo verás funcionando en vivo. Si no alcanzas, lo recibes igual al final.
          </p>
          <a
            href={LINKS.esqueleto}
            className="mt-4 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#FF3D8B] px-6 text-sm font-semibold text-white hover:bg-[#ff5c9f] sm:w-auto"
          >
            <FileText className="h-4 w-4" aria-hidden /> Armar mi esqueleto (15 min)
          </a>
        </div>
        {hayFecha ? (
          <button
            type="button"
            onClick={() => descargarIcs(`${window.location.origin}${LINKS.workshop}`)}
            className="mt-4 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-white/20 px-6 text-sm text-white hover:border-[#5fb2dd] sm:w-auto"
          >
            <CalendarPlus className="h-4 w-4" aria-hidden /> Agregar a mi calendario
          </button>
        ) : null}
        {/* La confirmación vive en la columna angosta del formulario: SiguientePaso a una columna. */}
        <div className="[&>section]:mt-8 [&_.grid]:!grid-cols-1">
          <SiguientePaso logro="Ya tienes tu cupo" pago={PASO_CURSO} gratis={[GRATIS_ESQUELETO, GRATIS_GRABACION]} />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8" aria-label="Inscripción al workshop">
      <h2 className="font-serif text-2xl text-white">Reserva tu cupo</h2>
      <p className="mt-1 text-sm text-slate-400">Gratis · 100 cupos · {fechaWorkshopTexto()}</p>
      <div className="mt-6 space-y-4">
        <label className="block text-sm text-slate-300">
          Nombre
          <input required autoComplete="name" value={datos.nombre} onChange={set('nombre')} className={campo} placeholder="Camila Rojas" />
        </label>
        <label className="block text-sm text-slate-300">
          Correo
          <input
            required
            type="email"
            autoComplete="email"
            value={datos.correo}
            onChange={set('correo')}
            className={campo}
            placeholder="camila@granonorte.cl"
          />
        </label>
        <label className="block text-sm text-slate-300">
          WhatsApp
          <input
            required
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            pattern="[+0-9 ()-]{8,}"
            title="Escribe tu número con código de país, por ejemplo +56 9 1234 5678"
            value={datos.whatsapp}
            onChange={set('whatsapp')}
            className={campo}
            placeholder="+56 9 1234 5678"
          />
        </label>
        <label className="block text-sm text-slate-300">
          Rubro
          <input
            required
            value={datos.rubro}
            onChange={set('rubro')}
            className={campo}
            placeholder="Ej.: tostaduría de café, clínica dental, ferretería"
          />
        </label>
        <label className="block text-sm text-slate-300">
          ¿Cuántos mensajes recibes al día?
          <select required value={datos.mensajesDia} onChange={set('mensajesDia')} className={campo}>
            <option value="" disabled>
              Elige una opción
            </option>
            {RANGOS_MENSAJES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button
        type="submit"
        disabled={enviando}
        className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-[#FF3D8B] px-6 text-base font-semibold text-white hover:bg-[#ff5c9f] disabled:opacity-60"
      >
        {enviando ? 'Reservando…' : 'Reservar mi cupo gratis'}
      </button>
      <p className="mt-3 text-center text-xs text-slate-500">Te escribimos solo para el workshop y los recordatorios.</p>
    </form>
  );
}
