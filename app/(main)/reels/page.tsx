import type { Metadata } from 'next';
import { fraunces } from '@/lib/productos/fuente';
import { SITE_URL } from '@/lib/productos/seo';
import VideoProducto, { type VideoId } from '@/components/productos/VideoProducto';

/*
 * /reels — vitrina interna de los reels verticales de los productos digitales (8-nov-2026).
 * No se indexa: sirve para que Álvaro y el equipo revisen y descarguen los cortes 9:16 antes de publicarlos.
 * Destino A = reel orgánico en el perfil; destino B = anuncio que lleva directo a la página del producto.
 */
export const metadata: Metadata = {
  title: { absolute: 'Reels de los productos digitales · Villelab' },
  description: 'Los reels verticales de los productos digitales de Villelab, con su guion y su destino.',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/reels` },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Villelab',
    title: 'Reels de los productos digitales · Villelab',
    description: 'Vitrina interna: los cortes 9:16 de los productos digitales, con su guion y su destino.',
    url: `${SITE_URL}/reels`,
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'Villelab' }],
  },
};

type Reel = {
  id: VideoId;
  numero: number;
  titulo: string;
  destinoA: string;
  destinoB: string;
  duracion: string;
  guion: string[];
  /** Aviso interno: el video quedó desalineado con el producto y hay que regrabarlo antes de publicarlo. */
  aviso?: string;
  /** Guion para regrabar (el mismo que lib/productos/curso/guiones.ts). */
  guionNuevo?: string[];
};

const REELS: Reel[] = [
  {
    id: 'v01-reel-esqueleto',
    numero: 1,
    titulo: '¿Te escriben 30 veces al día preguntando lo mismo?',
    destinoA: 'Reel orgánico (cierra con «comenta ESQUELETO»)',
    destinoB: 'Meta Ads «Esqueleto» → /esqueleto',
    duracion: '25 s',
    guion: [
      '¿Te escriben 30 veces al día preguntando lo mismo?',
      'Precio, despacho, horario. Y cuando por fin respondes, ya le compraron a otro.',
      'Te regalo el esqueleto de tu primer agente de atención. Cuatro pasos, menos de 15 minutos, y sale con lo que vendes, lo que nunca debe prometer y cuándo pasarte la conversación.',
      'Es gratis. Comenta ESQUELETO y te lo mando.',
    ],
  },
  {
    id: 'v06-reel-workshop',
    numero: 6,
    titulo: 'Te muestro en vivo cómo tu WhatsApp responde solo',
    destinoA: 'Reel e historias, 7 días antes del workshop',
    destinoB: 'Meta Ads «Workshop» → /workshop',
    duracion: '26 s',
    guion: [
      'Te muestro en vivo cómo tu WhatsApp responde solo, sin inventar nada.',
      'Es un workshop gratis de 45 minutos. Armamos el esqueleto de tu agente de atención, lo probamos con preguntas trampa y lo vemos respondiendo en WhatsApp de verdad.',
      'Te llevas el esqueleto de regalo y, si no alcanzas a llegar, la grabación queda abierta.',
      'Reserva tu cupo en el link.',
    ],
  },
  {
    id: 'v14-anuncio-esqueleto',
    numero: 14,
    titulo: 'Tu WhatsApp responde lo mismo 30 veces al día',
    destinoA: 'Perfil (link en la bio)',
    destinoB: '/esqueleto',
    duracion: '17 s',
    guion: [
      'Si respondes lo mismo 30 veces al día, esto es para ti.',
      'Te regalo el esqueleto de tu agente de atención: en 15 minutos dejas escrito qué responde, qué nunca promete y cuándo te pasa la conversación.',
      'Es gratis. Link en mi perfil.',
    ],
  },
  {
    id: 'v15-anuncio-guia',
    numero: 15,
    titulo: 'Tus próximos 20 clientes ya existen',
    destinoA: 'Perfil (link en la bio)',
    destinoB: '/guia',
    duracion: '21 s',
    guion: [
      'Si vendes solo cuando te llega un referido, escucha esto.',
      'En una tarde armas tu lista de 20 prospectos, escribes el primer mensaje y dejas los seguimientos con fecha. Es lo que hago cada semana, en una guía paso a paso con plantillas.',
      'Se llama Guía 1 de ventas y prospección. Link en mi perfil.',
    ],
  },
  {
    id: 'v16-anuncio-workshop',
    numero: 16,
    titulo: 'Te lo muestro en vivo, gratis',
    destinoA: 'Perfil (link en la bio)',
    destinoB: '/workshop',
    duracion: '18 s',
    guion: [
      'Armo en vivo un asistente que responde tu WhatsApp sin inventar nada.',
      '45 minutos, gratis. Lo armamos con un caso real y lo probamos con preguntas trampa. Te llevas el esqueleto de regalo.',
      'Reserva tu cupo en el link de mi perfil.',
    ],
  },
  {
    id: 'v17-anuncio-curso',
    numero: 17,
    titulo: 'Tu primer CRM y ERP en Google Sheets',
    destinoA: 'Perfil (link en la bio)',
    destinoB: '/curso',
    duracion: '26 s',
    guion: [
      '¿Tus clientes viven en el WhatsApp y los pedidos en tu cabeza? No es desorden: nada está anotado en un solo lugar.',
      'En 6 semanas armas tu primer CRM y ERP en Google Sheets: clientes, pedidos, cobranza y caja en una planilla, con un tablero que miras los lunes. Sin pagar software.',
      'Está en preventa a precio fundador. Link en mi perfil.',
    ],
  },
];

export default function ReelsPage() {
  return (
    <div className={fraunces.variable}>
      <main className="relative w-full overflow-x-hidden bg-[#0f172a] text-slate-200" aria-label="Reels de los productos digitales">
        <section className="mx-auto max-w-6xl px-4 pb-10 pt-32 sm:px-6 md:pt-40">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#5fb2dd]">Uso interno · no indexada</p>
          <h1 className="mt-5 font-serif text-4xl leading-tight text-white sm:text-5xl">Reels de los productos digitales</h1>
          <p className="mt-5 max-w-2xl text-base text-slate-300 sm:text-lg">
            Los cortes verticales 9:16, listos para publicar. Cada uno trae los subtítulos quemados y dos destinos: <strong className="text-white">A</strong>{' '}
            como reel en el perfil y <strong className="text-white">B</strong> como anuncio que lleva a la página del producto.
          </p>
        </section>

        <section className="mx-auto grid max-w-6xl gap-x-8 gap-y-14 px-4 pb-32 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
          {REELS.map((r) => (
            <article key={r.id} className="flex min-w-0 flex-col">
              <div className="mx-auto w-full max-w-[300px] rounded-[2.6rem] border-[6px] border-[#2a3550] bg-[#05080f] p-2 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
                <div className="overflow-hidden rounded-[2rem]">
                  <VideoProducto id={r.id} titulo={r.titulo} vertical />
                </div>
              </div>
              <div className="mt-6">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#5fb2dd]">
                  Video {r.numero} · {r.duracion}
                </p>
                <h2 className="mt-2 font-serif text-2xl leading-snug text-white">{r.titulo}</h2>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex gap-3">
                    <dt className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2175a1] font-mono text-xs text-white">A</dt>
                    <dd className="text-slate-300">{r.destinoA}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#5fb2dd] font-mono text-xs text-[#5fb2dd]">B</dt>
                    <dd className="text-slate-300">{r.destinoB}</dd>
                  </div>
                </dl>
                {r.aviso ? (
                  <div className="mt-4 rounded-xl border border-rose-400/40 bg-rose-500/[0.08] p-3 text-sm text-slate-200">
                    <p>{r.aviso}</p>
                    {r.guionNuevo ? (
                      <div className="mt-2 space-y-1.5 text-slate-300">
                        <p className="font-mono text-[11px] uppercase tracking-wider text-[#5fb2dd]">Guion para regrabar</p>
                        {r.guionNuevo.map((g) => (
                          <p key={g}>«{g}»</p>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : null}
                <details className="group mt-4 rounded-xl border border-white/10 bg-white/[0.03]">
                  <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between px-4 py-2 text-sm font-medium text-slate-200">
                    Guion
                    <span className="text-[#5fb2dd] transition group-open:rotate-180" aria-hidden="true">
                      ▾
                    </span>
                  </summary>
                  <div className="space-y-2 px-4 pb-4 text-sm leading-relaxed text-slate-300">
                    {r.guion.map((g) => (
                      <p key={g}>«{g}»</p>
                    ))}
                  </div>
                </details>
                <a
                  href={`/videos/${r.id}.mp4`}
                  download
                  className="mt-3 inline-flex min-h-[44px] items-center text-sm font-medium text-[#5fb2dd] underline-offset-4 hover:underline"
                >
                  Descargar el mp4
                </a>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
