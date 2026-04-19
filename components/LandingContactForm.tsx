'use client';

/**
 * LandingContactForm — Lightweight contact form for Google Ads landing pages.
 *
 * Captures data via:
 * 1. Fidelidapp landing registration for lead persistence
 * 2. GTM dataLayer events for conversion tracking
 * 3. WhatsApp redirect with pre-filled message for instant conversation
 */

import { useState, useRef, type FormEvent } from 'react';
import { Send, CheckCircle, MessageCircle } from 'lucide-react';
import { registerClient } from '@/lib/api/fidelidapp';
import { getAllClickIds } from '@/lib/gclid';
import {
  trackFormError,
  trackFormSubmit,
  trackFormSuccess,
  trackLeadGeneration,
  trackWhatsAppClick,
} from '@/lib/ga4';

const WHATSAPP_NUMBER = '56920115198';
const FIDELIDAPP_ACCOUNT_ID =
  process.env.NEXT_PUBLIC_FIDELIDAPP_ACCOUNT_ID ?? '';

function buildLeadId(source: string): string {
  const normalizedSource = source.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
  const randomPart =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);

  return `vl-${normalizedSource}-${Date.now().toString(36)}-${randomPart}`;
}

interface LandingContactFormProps {
  /** Identifies which landing page this form lives on */
  source: string;
  /** Heading above the form */
  heading?: string;
  /** Subtitle below heading */
  subtitle?: string;
  /** Submit button text */
  submitText?: string;
  /** Custom className for the outer container */
  className?: string;
}

function buildWhatsAppUrl(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export default function LandingContactForm({
  source,
  heading = 'Conversemos sobre tu proyecto',
  subtitle = 'Completa el formulario y te contactamos en menos de 24 horas.',
  submitText = 'Enviar y continuar por WhatsApp',
  className = '',
}: LandingContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const nombre = (formData.get('nombre') as string).trim();
    const email = (formData.get('email') as string).trim();
    const telefono = (formData.get('telefono') as string).trim();
    const empresa = (formData.get('empresa') as string)?.trim() ?? '';
    const proyecto = (formData.get('proyecto') as string)?.trim() ?? '';

    // Validation
    if (!nombre || !email || !telefono) {
      setError('Por favor completa los campos obligatorios.');
      setIsSubmitting(false);
      trackFormError(source, 'missing_required_fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor ingresa un email valido.');
      setIsSubmitting(false);
      trackFormError(source, 'invalid_email');
      return;
    }

    // Keep full Google Ads click ids in dataLayer only; sales sees the lead ref.
    const { gclid, gbraid, wbraid } = getAllClickIds();
    const leadId = buildLeadId(source);

    // Build WhatsApp message
    const lines = [
      `Hola, vengo de ${source}. Quiero saber mas sobre sus servicios.`,
      ``,
      `Nombre: ${nombre}`,
      `Email: ${email}`,
      `Telefono: ${telefono}`,
    ];
    if (empresa) lines.push(`Empresa: ${empresa}`);
    if (proyecto) lines.push(``, `Proyecto: ${proyecto}`);
    lines.push(``, `Ref: ${leadId}`);

    const whatsappUrl = buildWhatsAppUrl(WHATSAPP_NUMBER, lines.join('\n'));

    try {
      trackFormSubmit(source, 'paid_landing');

      if (!FIDELIDAPP_ACCOUNT_ID) {
        console.warn('Fidelidapp account ID missing, skipping lead registration');
      } else {
        await registerClient({
          name: nombre,
          email,
          phone: telefono,
          accountId: FIDELIDAPP_ACCOUNT_ID,
          tags: `paid_landing:${source}`,
        });
      }

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'lead_form_submission',
        event_category: 'conversion',
        form_source: source,
        lead_source: source,
        lead_id: leadId,
        has_click_id: Boolean(gclid || gbraid || wbraid),
        gclid: gclid ?? undefined,
        gbraid: gbraid ?? undefined,
        wbraid: wbraid ?? undefined,
      });

      trackFormSuccess(source);
      trackLeadGeneration(source, 'paid_landing');
      setIsSuccess(true);

      if (formRef.current) {
        formRef.current.reset();
      }

      // Slight delay so user sees the success state before redirect
      setTimeout(() => {
        trackWhatsAppClick(`${source}_form_success`);
        window.open(whatsappUrl, '_blank');
      }, 800);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error al registrar el lead.';
      setError(errorMessage);
      trackFormError(source, errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div
        className={`p-8 md:p-12 rounded-2xl text-center bg-green-500/10 border border-green-500/20 ${className}`}
      >
        <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-7 h-7 text-green-400" />
        </div>
        <p className="text-xl font-medium text-white mb-2">
          Gracias! Te contactaremos en menos de 24 horas.
        </p>
        <p className="text-white/50 text-sm font-light">
          Se abrira WhatsApp para continuar la conversacion.
        </p>
      </div>
    );
  }

  const inputClasses =
    'w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/[0.10] text-white placeholder-white/30 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 text-sm transition-all';

  const labelClasses =
    'block text-[11px] font-medium text-white/60 mb-1.5 uppercase tracking-[0.2em]';

  return (
    <div className={`rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-10 ${className}`}>
      {/* Heading */}
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-light text-white mb-3">
          {heading}
        </h3>
        <p className="text-white/50 text-sm font-light max-w-md mx-auto">
          {subtitle}
        </p>
      </div>

      <form
        ref={formRef}
        className="flex flex-col gap-4 max-w-lg mx-auto"
        onSubmit={handleSubmit}
      >
        {/* Hidden source field */}
        <input type="hidden" name="source" value={source} />

        {/* Nombre */}
        <div>
          <label htmlFor={`${source}-nombre`} className={labelClasses}>
            Nombre *
          </label>
          <input
            type="text"
            id={`${source}-nombre`}
            name="nombre"
            required
            className={inputClasses}
            placeholder="Ej: Juan Perez"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor={`${source}-email`} className={labelClasses}>
            Email *
          </label>
          <input
            type="email"
            id={`${source}-email`}
            name="email"
            required
            className={inputClasses}
            placeholder="Ej: juan@empresa.com"
          />
        </div>

        {/* Telefono */}
        <div>
          <label htmlFor={`${source}-telefono`} className={labelClasses}>
            Telefono / WhatsApp *
          </label>
          <input
            type="tel"
            id={`${source}-telefono`}
            name="telefono"
            required
            className={inputClasses}
            placeholder="Ej: +56912345678"
          />
        </div>

        {/* Empresa (optional) */}
        <div>
          <label htmlFor={`${source}-empresa`} className={labelClasses}>
            Empresa <span className="normal-case text-white/30">(opcional)</span>
          </label>
          <input
            type="text"
            id={`${source}-empresa`}
            name="empresa"
            className={inputClasses}
            placeholder="Ej: Mi Empresa SpA"
          />
        </div>

        {/* Proyecto (optional textarea) */}
        <div>
          <label htmlFor={`${source}-proyecto`} className={labelClasses}>
            Cuentanos sobre tu proyecto{' '}
            <span className="normal-case text-white/30">(opcional)</span>
          </label>
          <textarea
            id={`${source}-proyecto`}
            name="proyecto"
            rows={3}
            className={inputClasses}
            placeholder="Ej: Necesito automatizar la atencion al cliente en Instagram..."
          />
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 rounded-lg text-sm bg-red-500/10 border border-red-500/20 text-red-400">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-4 rounded-xl font-semibold text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-accent hover:bg-accent/90 text-white border border-accent/30 hover:border-accent/50 hover:shadow-[0_0_20px_rgba(33,117,161,0.25)] flex items-center justify-center gap-3"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Enviando...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>{submitText}</span>
            </>
          )}
        </button>

        {/* WhatsApp note */}
        <p className="text-center text-white/30 text-xs font-light flex items-center justify-center gap-1.5">
          <MessageCircle className="w-3.5 h-3.5" />
          Al enviar, se abrira WhatsApp para continuar la conversacion
        </p>
      </form>
    </div>
  );
}
