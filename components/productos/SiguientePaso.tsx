'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Gift, Sparkles } from 'lucide-react';

/*
 * «Siguiente paso»: al terminar cada producto se ofrecen siempre dos caminos.
 * 1) El nivel pagado siguiente (una sola oferta destacada).
 * 2) El ciclo gratis de aprendizaje (grabación del workshop, próximo en vivo, otro imán).
 * Regla de Álvaro (7-nov): nunca dejar a la persona sin un próximo paso; si no compra, sigue aprendiendo gratis con nosotros.
 */
export type OpcionPaso = { titulo: string; descripcion: string; href: string; cta: string; evento?: string };

function empujar(evento?: string, href?: string) {
  if (!evento || typeof window === 'undefined') return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: evento, siguiente_paso_href: href });
  } catch {
    /* sin analítica no se rompe nada */
  }
}

export default function SiguientePaso({
  logro,
  pago,
  gratis,
}: {
  /** Lo que la persona acaba de lograr, en una frase («Ya armaste el esqueleto de tu agente»). */
  logro: string;
  pago: OpcionPaso;
  gratis: OpcionPaso[];
}) {
  const externo = (href: string) => href.startsWith('http');
  return (
    <section className="mt-12">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5fb2dd]"
      >
        Tu siguiente paso
      </motion.p>
      <motion.h3
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="mt-2 font-serif text-2xl leading-tight text-white sm:text-3xl"
      >
        {logro}. ¿Cómo sigues?
      </motion.h3>

      <div className="mt-6 grid gap-4 md:grid-cols-[1.2fr_1fr]">
        <motion.a
          href={pago.href}
          target={externo(pago.href) ? '_blank' : undefined}
          rel={externo(pago.href) ? 'noopener noreferrer' : undefined}
          onClick={() => empujar(pago.evento, pago.href)}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.1 }}
          whileHover={{ y: -3 }}
          className="group block rounded-2xl border border-[#2175a1] bg-gradient-to-br from-[#2175a1]/25 to-[#131c31] p-5 shadow-[0_10px_40px_rgba(33,117,161,0.25)] sm:p-6"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2175a1] px-3 py-1 text-xs font-semibold text-white">
            <Sparkles className="h-3.5 w-3.5" aria-hidden /> Siguiente nivel
          </span>
          <p className="mt-3 font-serif text-xl text-white">{pago.titulo}</p>
          <p className="mt-2 text-sm text-slate-300">{pago.descripcion}</p>
          <span className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#FF3D8B] px-5 font-semibold text-white transition group-hover:bg-[#ff5c9f]">
            {pago.cta} <ArrowRight className="h-4 w-4" aria-hidden />
          </span>
        </motion.a>

        <div className="grid gap-3">
          <p className="flex items-center gap-2 text-sm font-medium text-slate-300">
            <Gift className="h-4 w-4 text-[#5fb2dd]" aria-hidden /> O sigue aprendiendo gratis
          </p>
          {gratis.map((g, i) => (
            <motion.a
              key={g.href + i}
              href={g.href}
              target={externo(g.href) ? '_blank' : undefined}
              rel={externo(g.href) ? 'noopener noreferrer' : undefined}
              onClick={() => empujar(g.evento, g.href)}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ x: 3 }}
              className="block min-h-[44px] rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-[#5fb2dd]"
            >
              <p className="font-medium text-white">{g.titulo}</p>
              <p className="mt-1 text-sm text-slate-400">{g.descripcion}</p>
              <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[#5fb2dd]">
                {g.cta} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
