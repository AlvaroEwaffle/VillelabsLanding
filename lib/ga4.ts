/**
 * Google Analytics 4 event helpers.
 *
 * GTM is already loaded in the root layout (GTM-M7MHWVJ8).
 * These helpers push structured events to the dataLayer for GTM to forward
 * to GA4. This approach is more flexible than direct gtag() calls because
 * conversion events, audiences, and triggers are all managed in GTM.
 *
 * GA4 property ID should be configured inside GTM — not hardcoded here.
 * If a dedicated GA4 tag is needed outside GTM, set NEXT_PUBLIC_GA4_ID.
 */

// Extend Window to include dataLayer
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function pushEvent(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
}

// --- Contact Form Events ---

export function trackFormView(formName: string) {
  pushEvent('form_view', { form_name: formName });
}

export function trackFormStart(formName: string) {
  pushEvent('form_start', { form_name: formName });
}

export function trackFormSubmit(formName: string, serviceType?: string) {
  pushEvent('form_submit', {
    form_name: formName,
    service_type: serviceType,
  });
}

export function trackFormSuccess(formName: string) {
  pushEvent('form_success', { form_name: formName });
}

export function trackFormError(formName: string, errorMessage: string) {
  pushEvent('form_error', {
    form_name: formName,
    error_message: errorMessage,
  });
}

// --- CTA Events ---

export function trackCTAClick(ctaName: string, location: string) {
  pushEvent('cta_click', {
    cta_name: ctaName,
    cta_location: location,
  });
}

export function trackWhatsAppClick(location: string) {
  pushEvent('whatsapp_click', { click_location: location });
}

export function trackBookingClick(location: string) {
  pushEvent('booking_click', { click_location: location });
}

export function trackPhoneClick(location: string) {
  pushEvent('phone_click', { click_location: location });
}

// --- Page/Section Events ---

export function trackSectionView(sectionName: string) {
  pushEvent('section_view', { section_name: sectionName });
}

export function trackServiceView(serviceName: string) {
  pushEvent('service_view', { service_name: serviceName });
}

// --- Conversion Events ---

/**
 * Track a lead generation conversion. This is the primary conversion event
 * that should be configured as a GA4 key event in GTM.
 */
export function trackLeadGeneration(source: string, serviceType?: string) {
  pushEvent('generate_lead', {
    event_category: 'conversion',
    lead_source: source,
    service_type: serviceType,
  });
}
