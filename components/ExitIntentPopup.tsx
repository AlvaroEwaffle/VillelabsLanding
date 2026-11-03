'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/lib/i18n';
import { DISCOVERY_CALL_URL } from '@/lib/scheduling';

/*
 * Popup de salida (3-nov-2026). Antes ofrecía un «Checklist de Diagnóstico Digital» que no existía:
 * el email no se guardaba ni llegaba a nadie. Ahora invita a la reunión de descubrimiento.
 * El clic al enlace de agenda emite booking_click (ConversionClickTracker) con ubicación exit_popup.
 */
const SESSION_KEY = 'villelabs_exit_popup_shown';

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const { t } = useTranslation();
  const pathname = usePathname();
  const isSuppressedRoute = pathname === '/asesoria';

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
    if (isSuppressedRoute || alreadyShown() || isTouchDevice()) return;
    previousFocusRef.current = document.activeElement as HTMLElement;
    setIsOpen(true);
    markAsShown();
  }, [alreadyShown, isSuppressedRoute, isTouchDevice, markAsShown]);

  const closePopup = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      previousFocusRef.current?.focus();
    }, 200);
  }, []);

  // Mouse leave detection (exit toward top of page)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isSuppressedRoute) return;
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
  }, [openPopup, isSuppressedRoute, isTouchDevice]);

  // 45-second timer trigger
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isSuppressedRoute) return;
    if (isTouchDevice()) return;
    if (alreadyShown()) return;

    const timer = setTimeout(() => {
      openPopup();
    }, 45000);

    return () => clearTimeout(timer);
  }, [openPopup, isSuppressedRoute, isTouchDevice, alreadyShown]);

  // Focus trap and Escape key
  useEffect(() => {
    if (!isOpen) return;

    setTimeout(() => {
      ctaRef.current?.focus();
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
  }, [isOpen, closePopup]);

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

  if (isSuppressedRoute) return null;

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
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 mb-5">
                  <Calendar className="w-6 h-6 text-accent" />
                </div>

                <h2
                  id="exit-popup-title"
                  className="text-xl sm:text-2xl font-semibold text-white mb-2 tracking-tight"
                >
                  {t.exitPopup.title}
                </h2>

                <p className="text-base font-medium text-accent mb-2">
                  {t.exitPopup.subtitle}
                </p>

                <p className="text-sm text-white/60 leading-relaxed mb-6">
                  {t.exitPopup.description}
                </p>

                <a
                  ref={ctaRef}
                  href={DISCOVERY_CALL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track-location="exit_popup"
                  onClick={closePopup}
                  className="flex w-full items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 border border-accent/30 hover:border-accent/50"
                >
                  <Calendar className="w-4 h-4" /> {t.exitPopup.ctaButton}
                </a>

                <p className="text-xs text-white/40 mt-3 text-center">
                  {t.exitPopup.note}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
