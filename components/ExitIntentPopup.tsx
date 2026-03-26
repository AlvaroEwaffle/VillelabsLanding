'use client';

import { useState, useEffect, useRef, useCallback, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Mail } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

/* ─── Fidelidapp API ─── */
const FIDELIDAPP_URL = process.env.NEXT_PUBLIC_FIDELIDAPP_URL ?? '';
const FIDELIDAPP_ACCOUNT_ID = process.env.NEXT_PUBLIC_FIDELIDAPP_ACCOUNT_ID ?? '';

async function sendLeadToFidelidapp(email: string) {
  if (!FIDELIDAPP_URL || !FIDELIDAPP_ACCOUNT_ID) return;
  try {
    await fetch(`${FIDELIDAPP_URL}/api/landing/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        accountId: FIDELIDAPP_ACCOUNT_ID,
        tags: 'exit-intent',
      }),
    });
  } catch {
    // Non-blocking
  }
}

const SESSION_KEY = 'villelabs_exit_popup_shown';

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const { t } = useTranslation();

  const alreadyShown = useCallback(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  }, []);

  const markAsShown = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, 'true');
    } catch {
      // sessionStorage may be unavailable in private browsing
    }
  }, []);

  const isTouchDevice = useCallback(() => {
    if (typeof window === 'undefined') return true;
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.innerWidth < 768
    );
  }, []);

  const openPopup = useCallback(() => {
    if (alreadyShown() || isTouchDevice()) return;
    previousFocusRef.current = document.activeElement as HTMLElement;
    setIsOpen(true);
    markAsShown();
  }, [alreadyShown, isTouchDevice, markAsShown]);

  const closePopup = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      previousFocusRef.current?.focus();
    }, 200);
  }, []);

  // Mouse leave detection (exit toward top of page)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isTouchDevice()) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        openPopup();
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [openPopup, isTouchDevice]);

  // 45-second timer trigger
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isTouchDevice()) return;
    if (alreadyShown()) return;

    const timer = setTimeout(() => {
      openPopup();
    }, 45000);

    return () => clearTimeout(timer);
  }, [openPopup, isTouchDevice, alreadyShown]);

  // Focus trap and Escape key
  useEffect(() => {
    if (!isOpen) return;

    const focusTarget = isSubmitted ? closeButtonRef.current : emailInputRef.current;
    setTimeout(() => {
      focusTarget?.focus();
    }, 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closePopup();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable?.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isSubmitted, closePopup]);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;

    const brevoApiKey = process.env.NEXT_PUBLIC_BREVO_API_KEY;

    const brevoPromise = brevoApiKey
      ? fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'api-key': brevoApiKey,
          },
          body: JSON.stringify({
            email,
            listIds: [2],
            updateEnabled: true,
            attributes: {
              SOURCE: 'exit_popup',
              SITE: 'villelab.com',
            },
          }),
        }).catch(() => {})
      : new Promise((resolve) => setTimeout(resolve, 800));

    await Promise.allSettled([brevoPromise, sendLeadToFidelidapp(email)]);

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[10010] bg-black/70 backdrop-blur-sm"
            onClick={closePopup}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[10011] flex items-center justify-center p-4"
          >
            <div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="exit-popup-title"
              className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl shadow-[0_40px_120px_rgba(0,0,0,0.6)] overflow-hidden"
            >
              {/* Accent gradient bar */}
              <div className="h-1 w-full bg-gradient-to-r from-accent via-accent/80 to-accent/40" />

              {/* Close button */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closePopup}
                aria-label={t.exitPopup.closePopup}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="px-6 pt-8 pb-8 sm:px-8">
                {!isSubmitted ? (
                  <>
                    {/* Icon */}
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 mb-5">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>

                    {/* Headline */}
                    <h2
                      id="exit-popup-title"
                      className="text-xl sm:text-2xl font-semibold text-white mb-2 tracking-tight"
                    >
                      {t.exitPopup.title}
                    </h2>

                    {/* Subhead */}
                    <p className="text-base font-medium text-accent mb-2">
                      {t.exitPopup.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-white/60 leading-relaxed mb-6">
                      {t.exitPopup.description}
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div>
                        <label htmlFor="exit-popup-email" className="sr-only">
                          {t.exitPopup.emailLabel}
                        </label>
                        <input
                          ref={emailInputRef}
                          id="exit-popup-email"
                          name="email"
                          type="email"
                          required
                          placeholder={t.exitPopup.emailPlaceholder}
                          autoComplete="email"
                          className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 text-sm transition-all"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 border border-accent/30 hover:border-accent/50 hover:shadow-[0_0_20px_rgba(33,117,161,0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg
                              className="animate-spin h-4 w-4 text-white"
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
                            {t.exitPopup.submitting}
                          </span>
                        ) : (
                          t.exitPopup.submitButton
                        )}
                      </button>
                    </form>

                    {/* Anti-spam */}
                    <p className="text-xs text-white/30 mt-3 text-center">
                      {t.exitPopup.antiSpam}
                    </p>
                  </>
                ) : (
                  /* Success state */
                  <div className="flex flex-col items-center text-center py-4">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500/10 border border-green-500/20 mb-5">
                      <CheckCircle className="w-7 h-7 text-green-400" />
                    </div>
                    <h2
                      id="exit-popup-title"
                      className="text-xl font-semibold text-white mb-2"
                    >
                      {t.exitPopup.successTitle}
                    </h2>
                    <p className="text-sm text-white/60 mb-6 leading-relaxed">
                      {t.exitPopup.successMessage}
                    </p>
                    <button
                      type="button"
                      onClick={closePopup}
                      className="px-6 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-white/80 text-sm font-medium hover:bg-white/10 hover:text-white transition-colors duration-200"
                    >
                      {t.exitPopup.successButton}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
