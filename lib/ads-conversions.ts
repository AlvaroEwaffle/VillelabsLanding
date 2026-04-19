/**
 * Google Ads conversion fire helpers.
 *
 * These functions push a `conversion` gtag event via the dataLayer so GTM
 * can forward it to the Google Ads Conversion Linker tag.
 *
 * IMPORTANT — fill in the conversion IDs once you've created the actions in
 * Google Ads (see Manual de Setup Google Ads 2026, Section 2.3):
 *   - AW-XXXXXXXXXX/BOOKING_CONFIRMED_LABEL
 *   - AW-XXXXXXXXXX/BOOKING_SHOWED_UP_LABEL
 *   - AW-XXXXXXXXXX/CONTACT_SOFT_LABEL
 *
 * The env var NEXT_PUBLIC_GOOGLE_ADS_ID should be set to `AW-XXXXXXXXXX`
 * and the three label env vars should contain just the label (the part
 * after the slash). If any ID is missing the event is pushed to the
 * dataLayer anyway so GTM can still act on it, and a console warning is
 * emitted in non-production environments.
 */

type ConversionName = 'booking_confirmed' | 'booking_showed_up' | 'contact_soft';

interface ConversionPayload {
  name: ConversionName;
  value: number;
  currency?: string;
  transactionId?: string;
}

const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? '';

const LABELS: Record<ConversionName, string> = {
  booking_confirmed: process.env.NEXT_PUBLIC_ADS_LABEL_BOOKING_CONFIRMED ?? '',
  booking_showed_up: process.env.NEXT_PUBLIC_ADS_LABEL_BOOKING_SHOWED_UP ?? '',
  contact_soft: process.env.NEXT_PUBLIC_ADS_LABEL_CONTACT_SOFT ?? '',
};

export function fireAdsConversion({
  name,
  value,
  currency = 'CLP',
  transactionId,
}: ConversionPayload) {
  if (typeof window === 'undefined') return;

  const label = LABELS[name];
  const sendTo = ADS_ID && label ? `${ADS_ID}/${label}` : null;

  if (!sendTo && process.env.NODE_ENV !== 'production') {
    console.warn(
      `[ads-conversions] Missing AW ID or label for ${name}. ` +
        `Set NEXT_PUBLIC_GOOGLE_ADS_ID and NEXT_PUBLIC_ADS_LABEL_${name.toUpperCase()} to enable Google Ads conversion fire.`
    );
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: 'ads_conversion',
    conversion_name: name,
    send_to: sendTo,
    value,
    currency,
    transaction_id: transactionId,
  });
}
