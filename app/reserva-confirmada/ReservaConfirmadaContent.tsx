'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, Calendar, MessageCircle, ArrowRight } from 'lucide-react';
import { fireAdsConversion } from '@/lib/ads-conversions';
import { trackLeadGeneration } from '@/lib/ga4';

const WHATSAPP_NUMBER = '56920115198';

function ReservaConfirmadaInner() {
  const searchParams = useSearchParams();
  const source = searchParams.get('source') ?? 'booking';
  const bookingId = searchParams.get('booking_id') ?? undefined;

  useEffect(() => {
    // Fire Google Ads conversion (value from the plan: $80.000 CLP)
    fireAdsConversion({
      name: 'booking_confirmed',
      value: 80000,
      currency: 'CLP',
      transactionId: bookingId,
    });

    // Also track as a generic generate_lead event for GA4
    trackLeadGeneration(source, 'booking_confirmed');
  }, [source, bookingId]);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hola! Acabo de agendar una llamada de diagnostico. Queria confirmar que todo quedo bien.'
  )}`;

  return (
    <main className="relative min-h-screen w-full bg-slate-950 text-white flex flex-col">
      <header className="w-full px-4 sm:px-6 py-4 border-b border-white/[0.05]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/icono.png"
              alt="Villelabs"
              width={28}
              height={28}
              className="object-contain"
            />
            <span className="text-white/70 text-sm font-light">Villelabs</span>
          </Link>
        </div>
      </header>

      <section className="flex-1 flex items-center justify-center px-4 sm:px-6 py-16">
        <div className="max-w-xl w-full text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-400" />
          </div>

          <h1 className="text-3xl md:text-4xl font-light mb-4">
            Reserva confirmada
          </h1>

          <p className="text-white/60 text-base font-light leading-relaxed mb-10 max-w-md mx-auto">
            Te enviamos la confirmacion por email con el link de la llamada y un recordatorio 24 horas antes. Nos vemos pronto.
          </p>

          <div className="grid gap-3 max-w-sm mx-auto mb-10">
            <div className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-start gap-3 text-left">
              <Calendar className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <div className="text-white text-sm font-medium mb-0.5">
                  Revisa tu calendario
                </div>
                <div className="text-white/40 text-xs font-light">
                  Ya deberias tener el evento agendado con el link de la videollamada.
                </div>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-start gap-3 text-left">
              <MessageCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <div className="text-white text-sm font-medium mb-0.5">
                  Alguna duda antes de la llamada?
                </div>
                <div className="text-white/40 text-xs font-light">
                  Escribenos por WhatsApp, respondemos el mismo dia habil.
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/[0.12] bg-white/[0.04] text-white text-sm font-medium hover:bg-white/[0.08] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Abrir WhatsApp
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors group"
            >
              Volver al inicio
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-5 px-4 border-t border-white/[0.04] text-center">
        <p className="text-white/20 text-xs font-light">
          Villelabs &copy; {new Date().getFullYear()} &mdash;{' '}
          <Link href="/privacidad" className="hover:text-white/40 transition-colors">
            Privacidad
          </Link>{' '}
          &middot;{' '}
          <Link href="/terminos" className="hover:text-white/40 transition-colors">
            Terminos
          </Link>
        </p>
      </footer>
    </main>
  );
}

export default function ReservaConfirmadaContent() {
  return (
    <Suspense fallback={null}>
      <ReservaConfirmadaInner />
    </Suspense>
  );
}
