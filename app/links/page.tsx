import type { Metadata } from 'next';
import { ArrowUpRight, BookOpen, CalendarDays, Gift, GraduationCap, Instagram, Linkedin, PlayCircle, Table2 } from 'lucide-react';
import { LINKS } from '@/lib/productos/links';
import { fraunces } from '@/lib/productos/fuente';

// /links — link in bio de @alvarovillena.ia (8-nov-2026). Antes vivía en alvarovillena.cl/links; se mudó acá para que
// todo viva en villelab.com y cada visita y clic llegue a Slack (Rastreo del layout raíz). alvarovillena.cl/links
// redirige acá con utm_source=instagram. Sin nav ni footer: es una página de un solo paso.

export const metadata: Metadata = {
  title: { absolute: 'Álvaro Villena · Links' },
  description: 'El esqueleto gratis de tu asistente, la guía para conseguir clientes y el curso para armar tu primer CRM y ERP.',
  robots: { index: false, follow: true },
};

type Enlace = { href: string; titulo: string; bajada: string; Icono: typeof Gift; externo?: boolean };

const PRINCIPAL: Enlace = {
  href: LINKS.esqueleto,
  titulo: 'Gratis: el esqueleto de tu asistente',
  bajada: 'En 15 minutos dejas escrito qué responde, qué nunca promete y cuándo te pasa la conversación',
  Icono: Gift,
};

const PRODUCTOS: Enlace[] = [
  {
    href: LINKS.guiaVenta,
    titulo: 'Guía: tus próximos 20 clientes',
    bajada: 'Tu lista, el primer mensaje y los seguimientos, en una tarde · $14.990',
    Icono: BookOpen,
  },
  {
    href: LINKS.curso,
    titulo: 'Curso: tu primer CRM y ERP',
    bajada: 'Clientes, pedidos, cobranza y caja en una planilla que ya sabes usar',
    Icono: Table2,
  },
  {
    href: LINKS.workshopGrabacion,
    titulo: 'Workshop grabado, gratis',
    bajada: 'Te muestro en vivo cómo tu WhatsApp responde con tus reglas',
    Icono: PlayCircle,
  },
  {
    href: LINKS.agendar,
    titulo: 'Agenda una llamada conmigo',
    bajada: '30 minutos para ver qué conviene ordenar primero en tu negocio',
    Icono: CalendarDays,
    externo: true,
  },
  {
    href: 'https://academia.e-waffle.com/?utm_source=villelab.com&utm_medium=linkinbio&utm_campaign=links',
    titulo: 'Cursos de agentes (Academia Ewaffle)',
    bajada: 'Aprende a delegar tareas a agentes y coordinarlos',
    Icono: GraduationCap,
    externo: true,
  },
];

const tarjeta =
  'flex min-h-[64px] w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left transition hover:-translate-y-0.5';

function Fila({ e, destacado = false }: { e: Enlace; destacado?: boolean }) {
  const { Icono } = e;
  return (
    <a
      href={e.href}
      {...(e.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={
        destacado
          ? `${tarjeta} border-[#FF3D8B] bg-[#FF3D8B] text-white shadow-lg shadow-[#FF3D8B]/20`
          : `${tarjeta} border-white/10 bg-white/[0.04] text-white hover:border-[#5fb2dd]/60`
      }
    >
      <Icono className={`h-6 w-6 shrink-0 ${destacado ? 'text-white' : 'text-[#5fb2dd]'}`} aria-hidden />
      <span className="min-w-0 flex-1">
        <span className="block font-bold leading-tight">{e.titulo}</span>
        <span className={`mt-0.5 block text-sm leading-snug ${destacado ? 'text-white/90' : 'text-slate-400'}`}>{e.bajada}</span>
      </span>
      <ArrowUpRight className={`h-5 w-5 shrink-0 ${destacado ? 'text-white' : 'text-slate-500'}`} aria-hidden />
    </a>
  );
}

export default function LinksPage() {
  return (
    <main className={`${fraunces.variable} min-h-screen bg-[#0f172a] px-4 py-10 text-white`}>
      <div className="mx-auto flex w-full max-w-md flex-col items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/fotos/alvaro-portrait.webp"
          alt="Álvaro Villena"
          width={112}
          height={112}
          className="h-28 w-28 rounded-full border-2 border-[#2175a1] object-cover"
        />
        <h1 className="mt-4 font-[family-name:var(--font-fraunces)] text-3xl leading-tight">Álvaro Villena</h1>
        <p className="mt-2 text-center text-[15px] leading-snug text-slate-300">
          Ordeno ventas y atención de pymes que venden por WhatsApp
        </p>

        <div className="mt-8 flex w-full flex-col gap-3">
          <Fila e={PRINCIPAL} destacado />
          {PRODUCTOS.map((e) => (
            <Fila key={e.href} e={e} />
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <a
            href="https://www.instagram.com/alvarovillena.ia/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram @alvarovillena.ia"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-slate-200 hover:border-[#5fb2dd] hover:text-[#5fb2dd]"
          >
            <Instagram className="h-5 w-5" aria-hidden />
          </a>
          <a
            href="https://www.linkedin.com/in/alvarovillena"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn de Álvaro Villena"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-slate-200 hover:border-[#5fb2dd] hover:text-[#5fb2dd]"
          >
            <Linkedin className="h-5 w-5" aria-hidden />
          </a>
        </div>
        <p className="mt-6 text-xs text-slate-500">villelab.com</p>
      </div>
    </main>
  );
}
