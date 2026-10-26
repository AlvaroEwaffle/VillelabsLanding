'use client';

import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useTranslation, getWhatsAppUrl } from '@/lib/i18n';

/* Piezas compartidas por las páginas interiores (mismo estilo que HomeContent). */

export function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{children}</p>;
}

export function PageHero({ kicker, titulo, bajada, children }: { kicker: string; titulo: string; bajada?: string; children?: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-12 pt-32 sm:px-6 md:pt-40">
      <Kicker>{kicker}</Kicker>
      <h1 className="mt-5 max-w-4xl font-serif text-4xl leading-tight text-white sm:text-5xl md:text-6xl">{titulo}</h1>
      {bajada ? <p className="mt-6 max-w-2xl text-base text-slate-300 sm:text-lg">{bajada}</p> : null}
      {children}
    </section>
  );
}

export function Seccion({ kicker, titulo, bajada, children, ancho = 'max-w-6xl' }: { kicker: string; titulo: string; bajada?: string; children: React.ReactNode; ancho?: string }) {
  return (
    <section className={`mx-auto ${ancho} px-4 py-14 sm:px-6`}>
      <Kicker>{kicker}</Kicker>
      <h2 className="mt-3 max-w-3xl font-serif text-3xl text-white sm:text-4xl">{titulo}</h2>
      {bajada ? <p className="mt-4 max-w-2xl text-slate-300">{bajada}</p> : null}
      {children}
    </section>
  );
}

export function CtaFinal({ titulo, bajada }: { titulo: string; bajada: string }) {
  const { language } = useTranslation();
  const es = language !== 'en';
  return (
    <section className="mx-auto max-w-6xl px-4 pb-32 pt-10 sm:px-6">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-accent/20 via-slate-900 to-slate-950 p-6 sm:p-10">
        <h2 className="max-w-2xl font-serif text-3xl text-white sm:text-4xl">{titulo}</h2>
        <p className="mt-4 max-w-2xl text-slate-300">{bajada}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/diagnostic" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-white hover:bg-[#2a8bbd]">
            {es ? 'Agenda un diagnóstico' : 'Book a diagnostic'} <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/catalogo" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm text-slate-200 hover:border-white/30">
            {es ? 'Pruébalos en el catálogo' : 'Try them in the catalog'}
          </Link>
          <a
            href={getWhatsAppUrl(language)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-green-500/30 px-6 text-sm text-green-300 hover:border-green-500/60"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
