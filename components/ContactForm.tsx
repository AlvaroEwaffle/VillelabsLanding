'use client';

/**
 * ContactForm — Reusable contact form with Fidelidapp + GA4 integration.
 *
 * Two submission modes:
 * 1. "contact" — POST /auth/contact (requires reCAPTCHA, creates lead + sends notification)
 * 2. "register" — POST /api/landing/register (lighter, adds client to account)
 *
 * GA4 events are pushed to dataLayer for GTM to forward.
 */

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { submitContact, registerClient } from '@/lib/api/fidelidapp';
import {
  trackFormView,
  trackFormStart,
  trackFormSubmit,
  trackFormSuccess,
  trackFormError,
  trackLeadGeneration,
} from '@/lib/ga4';

// Fidelidapp config
const FIDELIDAPP_URL = process.env.NEXT_PUBLIC_FIDELIDAPP_URL ?? '';
const FIDELIDAPP_ACCOUNT_ID =
  process.env.NEXT_PUBLIC_FIDELIDAPP_ACCOUNT_ID ?? '';

// reCAPTCHA site key (same as existing forms)
const RECAPTCHA_SITE_KEY = '6LcizUksAAAAADl6SpTv1SRFKRD3-jCjrzHZqPU8';

export type ServiceType =
  | 'general'
  | 'web-design'
  | 'automation'
  | 'consulting'
  | 'ai-chatbot'
  | 'platform';

interface ContactFormProps {
  /** Unique form identifier for GA4 tracking */
  formName?: string;
  /** Which submission flow to use */
  mode?: 'contact' | 'register';
  /** Pre-selected service type */
  defaultServiceType?: ServiceType;
  /** Show service type selector */
  showServiceSelect?: boolean;
  /** Show message/business textarea */
  showMessage?: boolean;
  /** Label for the message field */
  messageLabel?: string;
  /** Placeholder for the message field */
  messagePlaceholder?: string;
  /** Submit button text */
  submitText?: string;
  /** Text shown while submitting */
  submittingText?: string;
  /** Success message */
  successMessage?: string;
  /** Redirect URL after success (optional) */
  redirectUrl?: string;
  /** Custom class for the form container */
  className?: string;
  /** Dark or light theme */
  theme?: 'dark' | 'light';
}

const SERVICE_OPTIONS: { value: ServiceType; label: string }[] = [
  { value: 'general', label: 'Consulta general' },
  { value: 'web-design', label: 'Diseño web / Landing page' },
  { value: 'automation', label: 'Automatización de procesos' },
  { value: 'consulting', label: 'Consultoría IA / PM' },
  { value: 'ai-chatbot', label: 'Chatbot con IA' },
  { value: 'platform', label: 'Plataforma / SaaS' },
];

export default function ContactForm({
  formName = 'contact_form',
  mode = 'register',
  defaultServiceType = 'general',
  showServiceSelect = true,
  showMessage = true,
  messageLabel = 'Mensaje',
  messagePlaceholder = 'Cuéntanos sobre tu proyecto o negocio...',
  submitText = 'Enviar mensaje',
  submittingText = 'Enviando...',
  successMessage = 'Mensaje enviado con éxito. Te contactaremos pronto.',
  redirectUrl,
  className = '',
  theme = 'dark',
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const isDark = theme === 'dark';

  // Track form view on mount
  useEffect(() => {
    trackFormView(formName);
  }, [formName]);

  const handleFirstInteraction = () => {
    if (!hasStarted) {
      setHasStarted(true);
      trackFormStart(formName);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = (formData.get('name') as string).trim();
    const email = (formData.get('email') as string).trim();
    const phone = (formData.get('phone') as string).trim();
    const serviceType = (formData.get('serviceType') as ServiceType) ?? defaultServiceType;
    const message = (formData.get('message') as string)?.trim() ?? '';

    // Basic client-side validation
    if (!name || !email || !phone) {
      setError('Por favor completa todos los campos requeridos.');
      setIsSubmitting(false);
      trackFormError(formName, 'missing_required_fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor ingresa un email válido.');
      setIsSubmitting(false);
      trackFormError(formName, 'invalid_email');
      return;
    }

    trackFormSubmit(formName, serviceType);

    try {
      if (mode === 'contact') {
        // Get reCAPTCHA token from the widget
        const recaptchaResponse = (
          document.querySelector('.g-recaptcha-response') as HTMLTextAreaElement
        )?.value;

        if (!recaptchaResponse) {
          setError('Por favor completa la verificación de seguridad.');
          setIsSubmitting(false);
          trackFormError(formName, 'recaptcha_missing');
          return;
        }

        await submitContact({
          name,
          email,
          phone,
          message: message || `Servicio: ${serviceType}`,
          organization: serviceType,
          recaptchaToken: recaptchaResponse,
        });
      } else {
        // "register" mode — lighter, no reCAPTCHA needed
        if (!FIDELIDAPP_URL || !FIDELIDAPP_ACCOUNT_ID) {
          // Silently succeed if Fidelidapp is not configured (dev mode)
          console.warn('Fidelidapp not configured, skipping registration');
        } else {
          await registerClient({
            name,
            email,
            phone,
            accountId: FIDELIDAPP_ACCOUNT_ID,
            tags: [`service:${serviceType}`, `form:${formName}`],
          });
        }
      }

      trackFormSuccess(formName);
      trackLeadGeneration(formName, serviceType);
      setIsSuccess(true);

      if (formRef.current) {
        formRef.current.reset();
      }

      if (redirectUrl) {
        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 1500);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error al enviar. Intenta nuevamente.';
      setError(errorMessage);
      trackFormError(formName, errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div
        className={`p-8 rounded-xl text-center ${
          isDark
            ? 'bg-green-500/10 border border-green-500/20'
            : 'bg-green-50 border border-green-200'
        } ${className}`}
      >
        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {successMessage}
        </p>
      </div>
    );
  }

  const inputClasses = isDark
    ? 'w-full px-4 py-3 rounded-xl bg-slate-800/40 border border-white/[0.12] text-white placeholder-white/25 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 text-sm transition-all'
    : 'w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300 text-sm transition-all';

  const labelClasses = isDark
    ? 'block text-[11px] font-medium text-white/60 mb-1 uppercase tracking-[0.2em]'
    : 'block text-[11px] font-medium text-gray-600 mb-1 uppercase tracking-[0.2em]';

  return (
    <form
      ref={formRef}
      className={`flex flex-col gap-4 ${className}`}
      onSubmit={handleSubmit}
      onFocus={handleFirstInteraction}
    >
      {/* Name */}
      <div>
        <label htmlFor={`${formName}-name`} className={labelClasses}>
          Nombre *
        </label>
        <input
          type="text"
          id={`${formName}-name`}
          name="name"
          required
          className={inputClasses}
          placeholder="Ej: Juan Pérez"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor={`${formName}-email`} className={labelClasses}>
          Email *
        </label>
        <input
          type="email"
          id={`${formName}-email`}
          name="email"
          required
          className={inputClasses}
          placeholder="Ej: juan@ejemplo.com"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor={`${formName}-phone`} className={labelClasses}>
          Teléfono / WhatsApp *
        </label>
        <input
          type="tel"
          id={`${formName}-phone`}
          name="phone"
          required
          className={inputClasses}
          placeholder="Ej: +56912345678"
        />
      </div>

      {/* Service Type */}
      {showServiceSelect && (
        <div>
          <label htmlFor={`${formName}-serviceType`} className={labelClasses}>
            Tipo de servicio
          </label>
          <select
            id={`${formName}-serviceType`}
            name="serviceType"
            defaultValue={defaultServiceType}
            className={inputClasses}
          >
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Message */}
      {showMessage && (
        <div>
          <label htmlFor={`${formName}-message`} className={labelClasses}>
            {messageLabel}
          </label>
          <textarea
            id={`${formName}-message`}
            name="message"
            rows={4}
            className={inputClasses}
            placeholder={messagePlaceholder}
          />
        </div>
      )}

      {/* reCAPTCHA (only for "contact" mode) */}
      {mode === 'contact' && (
        <div className="flex justify-start my-1 scale-[0.85] md:scale-90 origin-left">
          <div
            className="g-recaptcha"
            data-sitekey={RECAPTCHA_SITE_KEY}
            data-theme={isDark ? 'dark' : 'light'}
          />
        </div>
      )}

      {/* Error message */}
      {error && (
        <div
          className={`p-3 rounded-lg text-sm ${
            isDark
              ? 'bg-red-500/10 border border-red-500/20 text-red-400'
              : 'bg-red-50 border border-red-200 text-red-600'
          }`}
        >
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full px-6 py-4 rounded-xl font-semibold text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
          isDark
            ? 'bg-accent hover:bg-accent/90 text-white border border-accent/30 hover:border-accent/50 hover:shadow-[0_0_20px_rgba(33,117,161,0.25)]'
            : 'bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 hover:shadow-lg'
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-3">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>{submittingText}</span>
          </span>
        ) : (
          submitText
        )}
      </button>
    </form>
  );
}
