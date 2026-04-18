'use client';

import { useEffect } from 'react';
import { trackBookingClick, trackWhatsAppClick } from '@/lib/ga4';

function getClickLocation(anchor: HTMLAnchorElement): string {
  const label =
    anchor.dataset.trackLocation ||
    anchor.getAttribute('aria-label') ||
    anchor.textContent?.trim().replace(/\s+/g, ' ');

  if (label) return `${window.location.pathname}:${label.slice(0, 80)}`;
  return window.location.pathname;
}

export default function ConversionClickTracker() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest('a[href]');
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const href = anchor.href;
      const location = getClickLocation(anchor);

      if (href.includes('wa.me/')) {
        trackWhatsAppClick(location);
      }

      if (href.includes('capu.villelab.com/schedule')) {
        trackBookingClick(location);
      }
    };

    document.addEventListener('click', handleClick, { capture: true });
    return () => document.removeEventListener('click', handleClick, { capture: true });
  }, []);

  return null;
}
