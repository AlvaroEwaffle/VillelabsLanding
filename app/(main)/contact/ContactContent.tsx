'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Calendar, MapPin, Clock, Mail } from 'lucide-react';
import { useTranslation, getWhatsAppUrl } from '@/lib/i18n';
import { DISCOVERY_CALL_URL } from '@/lib/scheduling';
import ContactForm from '@/components/ContactForm';
import { trackCTAClick } from '@/lib/ga4';

const EASE_SMOOTH = [0.6, -0.05, 0.01, 0.99] as const;
const BOOKING_URL = DISCOVERY_CALL_URL;
const VILO_DIAGNOSIS_URL = '/diagnostic';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_SMOOTH },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

function ContactFormWrapper() {
  const handleFormSubmit = useCallback(() => {
    // GTM dataLayer event for Google Ads conversion tracking
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer ?? [];
      window.dataLayer.push({
        event: 'contact_form_submission',
        form_source: 'contact-page',
      });
    }
  }, []);

  return (
    <div onSubmit={handleFormSubmit}>
      <ContactForm
        formName="contact_page_form"
        mode="register"
        showServiceSelect={true}
        showMessage={true}
        submitText="Enviar mensaje"
        submittingText="Enviando..."
        successMessage="Mensaje enviado. Te contactaremos pronto."
        theme="dark"
      />
    </div>
  );
}

export default function ContactContent() {
  const { t, language } = useTranslation();

  return (
    <main className="pt-24 md:pt-32 pb-16 md:pb-24">
      {/* Header */}
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.p
          variants={itemVariants}
          className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4"
        >
          {t.pages.contact.label}
        </motion.p>
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6"
        >
          {t.pages.contact.heading}
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-lg text-white/50 font-light max-w-xl mx-auto"
        >
          {t.pages.contact.description}
        </motion.p>
      </motion.div>

      {/* Contact Form + Sidebar CTAs */}
      <motion.div
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form — takes 3 of 5 columns */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-3 p-8 md:p-10 rounded-xl border border-white/[0.06] bg-white/[0.02]"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <h2 className="text-white text-xl font-medium">{t.pages.contact.formHeading}</h2>
            </div>
            <p className="text-white/40 text-sm font-light leading-relaxed mb-8 ml-[52px]">
              {t.pages.contact.formDescription}
            </p>
            <ContactFormWrapper />
          </motion.div>

          {/* Sidebar CTAs — takes 2 of 5 columns */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Diagnosis */}
            <motion.div
              variants={itemVariants}
              className="p-8 rounded-xl border border-white/[0.06] bg-white/[0.02] text-center flex-1"
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-5">
                <Calendar className="w-5 h-5 text-accent" />
              </div>
              <h2 className="text-white text-lg font-medium mb-2">{t.pages.contact.bookCallHeading}</h2>
              <p className="text-white/40 text-sm font-light leading-relaxed mb-6">
                {t.pages.contact.bookCallDescription}
              </p>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-medium text-sm hover:bg-accent/90 transition-all duration-300 shadow-accent-lg"
              >
                <Calendar className="w-4 h-4" />
                {t.pages.contact.bookCallButton}
              </a>
            </motion.div>

            {/* WhatsApp */}
            <motion.div
              variants={itemVariants}
              className="p-8 rounded-xl border border-white/[0.06] bg-white/[0.02] text-center flex-1"
            >
              <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-5">
                <MessageCircle className="w-5 h-5 text-green-400" />
              </div>
              <h2 className="text-white text-lg font-medium mb-2">{t.pages.contact.whatsappHeading}</h2>
              <p className="text-white/40 text-sm font-light leading-relaxed mb-6">
                {t.pages.contact.whatsappDescription}
              </p>
              <a
                href={getWhatsAppUrl(language)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 font-medium text-sm hover:bg-green-500/20 transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                {t.pages.contact.whatsappButton}
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Info bar */}
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10 text-white/30 text-sm font-light"
        >
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-accent/60" />
            Santiago, Chile
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent/60" />
            GMT-3 / CLT
          </span>
          <span>{t.pages.contact.servingGlobally}</span>
        </motion.div>
      </motion.div>

      {/* Diagnostic section */}
      <motion.div
        id="diagnostic"
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.div
          variants={itemVariants}
          className="p-10 md:p-14 rounded-2xl border border-accent/10 bg-accent/[0.03]"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4">
            {t.pages.contact.diagnosticLabel}
          </p>
          <h3 className="text-2xl md:text-3xl font-light text-white mb-4">
            {t.pages.contact.diagnosticHeading}
          </h3>
          <p className="text-white/50 text-base font-light mb-6 max-w-lg mx-auto">
            {t.pages.contact.diagnosticDescription}
          </p>
          <a
            href={VILO_DIAGNOSIS_URL}
            onClick={() => trackCTAClick('contact_diagnostic', 'contact_page')}
            className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-6 py-3 text-sm font-medium text-white hover:bg-accent/20 transition-all duration-300"
          >
            {t.pages.contact.diagnosticLabel}
          </a>
        </motion.div>
      </motion.div>
    </main>
  );
}
