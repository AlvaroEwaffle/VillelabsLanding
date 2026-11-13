'use client';

import Image from 'next/image';
import { MotionConfig, motion } from 'framer-motion';
import { Check, PlayCircle } from 'lucide-react';
import SiguientePaso from '@/components/productos/SiguientePaso';
import { APOYO } from '@/lib/productos/apoyo';
import { VideoMarco } from '@/components/productos/VideoProducto';
import { DiagramaRecorridoDemo } from '@/components/productos/diagramas/workshop';
import { WORKSHOP_TITULO } from '@/lib/productos/workshop/config';
import { GRATIS_ESQUELETO, GRATIS_PROXIMO_WORKSHOP, LO_QUE_TE_LLEVAS, PASO_CURSO } from '@/lib/productos/workshop/contenido';

/*
 * /workshop/grabacion — grabación abierta y gratis del último workshop (camino gratis del ciclo).
 * TODO: cuando exista la grabación, reemplazar el marcador por el video (YouTube no listado o archivo propio).
 */

const ENTRA = { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 } };

export default function Grabacion() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="relative w-full overflow-x-hidden bg-[#0f172a] text-slate-200" aria-label="Grabación del workshop">
        <section className="mx-auto max-w-5xl px-4 pb-10 pt-32 sm:px-6 md:pt-40">
          <motion.p {...ENTRA} transition={{ duration: 0.4 }} className="font-mono text-xs uppercase tracking-[0.2em] text-[#5fb2dd]">
            Grabación abierta · gratis
          </motion.p>
          <motion.h1
            {...ENTRA}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="mt-5 font-serif text-4xl leading-tight text-white sm:text-5xl"
          >
            Mira la grabación del último workshop, gratis
          </motion.h1>
          <motion.p {...ENTRA} transition={{ duration: 0.45, delay: 0.12 }} className="mt-5 max-w-2xl text-base text-slate-300 sm:text-lg">
            «{WORKSHOP_TITULO}»: 45 minutos con el caso Grano Norte, de las preguntas de siempre a un asistente que responde por WhatsApp
            sin inventar nada.
          </motion.p>

          {/* Video 7 · intro de la grabación (8-nov-2026) */}
          <motion.div {...ENTRA} transition={{ duration: 0.45, delay: 0.16 }} className="mt-8 max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#5fb2dd]">Antes de darle play · 20 s</p>
            <VideoMarco id="v07-workshop-grabacion-intro" titulo="Antes de que veas la grabación" className="mt-3" />
          </motion.div>

          {/* Marcador del video 16:9 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="relative mt-8 aspect-video w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900"
          >
            <Image
              src={APOYO.workshopOnline.src}
              alt={APOYO.workshopOnline.alt}
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/50 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <PlayCircle className="h-14 w-14 text-[#5fb2dd] sm:h-20 sm:w-20" aria-hidden />
              <p className="mt-4 max-w-md text-base text-white sm:text-lg">La grabación se publica al día siguiente de cada workshop.</p>
            </div>
          </motion.div>
        </section>

        <section className="mx-auto grid max-w-5xl items-center gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1fr_260px]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#5fb2dd]">Lo que vas a aprender</p>
            <ul className="mt-5 space-y-3">
              {LO_QUE_TE_LLEVAS.map((x, i) => (
                <motion.li
                  key={x}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start gap-3 text-slate-200"
                >
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#5fb2dd]" aria-hidden /> {x}
                </motion.li>
              ))}
            </ul>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="relative mx-auto aspect-[4/5] w-48 overflow-hidden rounded-3xl border border-white/10 md:w-full"
          >
            <Image
              src={APOYO.escenaBodega.src}
              alt={APOYO.escenaBodega.alt}
              fill
              sizes="260px"
              className="object-cover"
              style={{ objectPosition: '32% 50%' }}
            />
          </motion.div>
        </section>

        <section className="mx-auto grid max-w-5xl items-center gap-6 px-4 pb-10 sm:px-6 md:grid-cols-[1fr_260px]">
          <DiagramaRecorridoDemo />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-white/10 md:aspect-[4/5]"
          >
            <Image src={APOYO.microfono.src} alt={APOYO.microfono.alt} fill sizes="(min-width: 768px) 260px, 100vw" className="object-cover" style={{ objectPosition: '40% 50%' }} />
          </motion.div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-32 sm:px-6">
          {/* Video 8 · venta de la preventa: la oferta del workshop (8-nov-2026) */}
          <div className="mb-10 max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#5fb2dd]">Si quieres ir más allá del workshop</p>
            <VideoMarco id="v08-curso-venta" titulo="Construye con IA tu sistema CRM y ERP" duracion="49 s" className="mt-3" />
          </div>
          <SiguientePaso logro="Ya sabes de qué se trata" pago={PASO_CURSO} gratis={[GRATIS_PROXIMO_WORKSHOP, GRATIS_ESQUELETO]} />
        </section>
      </main>
    </MotionConfig>
  );
}
