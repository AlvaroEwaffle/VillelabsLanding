/*
 * «En qué se basa» del curso (/curso#en-que-se-basa, v1.1, 8-nov-2026). Breve y honesto: usa solo lo que aplica
 * de la revisión de evidencia de la Guía 1 (lib/productos/guia/evidencia.ts, mismas fuentes) y dice qué es criterio
 * práctico. Contexto de mercado: investigación de demanda del 8-nov-2026. Tarjetas, sin tablas.
 */

import { ChevronDown } from 'lucide-react';
import { AFIRMACIONES, REVISION_EVIDENCIA, type FuenteEvidencia } from '@/lib/productos/guia/evidencia';
import { fechaLarga } from '@/lib/productos/guia/versiones';

type Punto = { texto: string; donde: string; ids: string[]; veredicto: 'fuerte' | 'moderada' };

const PUNTOS: Punto[] = [
  {
    texto: 'Las rutinas del sistema van a una hora y en un lugar fijos, y las dejas escritas: «si son las 9 y estoy en el escritorio, abro la planilla».',
    donde: 'Módulo 6 · Las rutinas de tu sistema',
    ids: ['C24', 'C25'],
    veredicto: 'fuerte',
  },
  {
    texto: 'Anotar tus números y mirarlos seguido te ayuda a cumplir lo que te propones. Por eso el tablero se revisa todos los lunes.',
    donde: 'Módulo 6 · Tus números del lunes',
    ids: ['C26'],
    veredicto: 'fuerte',
  },
  {
    texto: 'Volver a escribirle a quien no respondió, con la fecha del próximo paso anotada, trae respuestas que el primer mensaje no trajo.',
    donde: 'Módulo 1 · Seguimiento de propuestas',
    ids: ['C17'],
    veredicto: 'fuerte',
  },
  {
    texto: 'Por WhatsApp, solo a quien ya te conoce o te dio su número. No es un consejo: lo pide la política de WhatsApp Business.',
    donde: 'Módulos 1 y 4',
    ids: ['C30'],
    veredicto: 'fuerte',
  },
  {
    texto: 'ChatGPT o Claude ayudan a redactar más rápido cuando los usas como borrador que revisas tú. Por eso en el curso la IA es opcional y nunca decide.',
    donde: 'Lecciones con ayuda opcional',
    ids: ['C31', 'C32'],
    veredicto: 'fuerte',
  },
  {
    texto: 'Aprender con un caso guiado (Grano Norte) antes de hacerlo con tu negocio te ahorra errores al partir.',
    donde: 'Todos los módulos',
    ids: ['C34'],
    veredicto: 'moderada',
  },
];

const CONTEXTO: { texto: string; fuente: string; url?: string }[] = [
  {
    texto: 'En Chile, las búsquedas de «CRM» se duplicaron entre 2021 y 2026, y las de «WhatsApp Business» casi se triplicaron.',
    fuente: 'Consulta propia a Google Trends Chile, 5 años, al 8-nov-2026 (índices relativos, no volúmenes).',
  },
  {
    texto: 'El 56 % de las pymes encuestadas recibe sus pagos a 30 días y el 74 % se financia con plata propia.',
    fuente: 'Termómetro Pyme, agosto de 2026 (comunidad PROPYME, no es una muestra representativa del país).',
    url: 'https://www.emol.com/noticias/Economia/2026/08/20/1209046/estudio-pymes-ventas.html',
  },
];

function fuentesDe(ids: string[]): FuenteEvidencia[] {
  const vistas = new Set<string>();
  return AFIRMACIONES.filter((a) => ids.includes(a.id))
    .flatMap((a) => a.fuentes)
    .filter((f) => (vistas.has(f.url) ? false : (vistas.add(f.url), true)));
}

export default function EnQueSeBasa({ id = "en-que-se-basa" }: { id?: string }) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#5fb2dd]">En qué se basa</p>
      <h2 className="mt-3 max-w-3xl font-serif text-3xl text-white sm:text-4xl">Experiencia de terreno, contrastada con la investigación.</h2>
      <p className="mt-4 max-w-2xl text-slate-300">
        El curso junta lo que uso todos los días en Ewaffle, Fidelidapp y Villelab. Donde hay evidencia sólida, la sigue; donde no la hay, te lo digo y te
        lo doy como punto de partida para ajustar con tus números.
      </p>

      <ul className="mt-8 grid items-start gap-3 md:grid-cols-2 lg:grid-cols-3">
        {PUNTOS.map((p) => {
          const fuentes = fuentesDe(p.ids);
          return (
            <li key={p.texto} className={`rounded-2xl border p-4 ${p.veredicto === 'fuerte' ? 'border-[#5fb2dd]/40 bg-[#2175a1]/10' : 'border-white/10 bg-white/[0.02]'}`}>
              <span
                className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${
                  p.veredicto === 'fuerte' ? 'border-[#5fb2dd] bg-[#5fb2dd] text-[#0f172a]' : 'border-[#5fb2dd]/70 text-[#5fb2dd]'
                }`}
              >
                {p.veredicto === 'fuerte' ? 'Respaldo fuerte' : 'Respaldo moderado'}
              </span>
              <p className="mt-2 text-sm leading-relaxed text-slate-100">{p.texto}</p>
              <p className="mt-1 text-xs text-slate-400">{p.donde}</p>
              <details className="group mt-1">
                <summary className="flex min-h-[44px] cursor-pointer list-none items-center gap-1 text-xs font-medium text-slate-400 hover:text-white [&::-webkit-details-marker]:hidden">
                  Fuentes · {fuentes.length}
                  <ChevronDown className="h-4 w-4 transition group-open:rotate-180" aria-hidden />
                </summary>
                <ul className="space-y-1.5">
                  {fuentes.map((f) => (
                    <li key={f.url + f.autor} className="text-xs leading-relaxed text-slate-400">
                      <a href={f.url} target="_blank" rel="noopener noreferrer" className="break-words text-[#5fb2dd] underline-offset-2 hover:text-white hover:underline">
                        {f.autor} ({f.anio ?? 's. f.'})
                      </a>{' '}
                      · {f.titulo}
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 grid gap-3 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <p className="text-sm font-semibold text-white">Criterio práctico</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            Las hojas y columnas de la planilla, los 3 recordatorios de cobranza, el vencimiento a 30 días por defecto, los números del tablero y las señales
            para pasar a un software salen de la experiencia, no de un estudio. Funcionan como punto de partida: si en tu negocio algo funciona distinto,
            cámbialo.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <p className="text-sm font-semibold text-white">Por qué un CRM y un ERP en una planilla</p>
          <ul className="mt-2 space-y-3">
            {CONTEXTO.map((c) => (
              <li key={c.texto} className="text-sm leading-relaxed text-slate-300">
                {c.texto}{' '}
                <span className="block text-xs text-slate-500">
                  {c.url ? (
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-[#5fb2dd] underline-offset-2 hover:text-white hover:underline">
                      {c.fuente}
                    </a>
                  ) : (
                    c.fuente
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-6 max-w-3xl text-xs leading-relaxed text-slate-500">
        Las fuentes vienen de la revisión de evidencia de la Guía 1 (última revisión: {fechaLarga(REVISION_EVIDENCIA.fecha)}; la próxima, en {REVISION_EVIDENCIA.proxima}).
        Casi toda esa investigación es de EE. UU. y Europa: en pymes chilenas, la evidencia es por analogía.
      </p>
    </section>
  );
}
