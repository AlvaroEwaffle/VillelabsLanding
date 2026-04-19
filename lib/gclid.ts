/**
 * Reads Google Ads click identifiers stored by the capture script in app/layout.tsx.
 * Returns null server-side or when the identifier is not present.
 */

type ClickId = 'gclid' | 'gbraid' | 'wbraid';

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/[.$?*|{}()\[\]\\\/\+^]/g, '\\$&') + '=([^;]*)')
  );
  return match ? decodeURIComponent(match[1]) : null;
}

export function getClickId(name: ClickId = 'gclid'): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const fromStorage = window.localStorage.getItem(name);
    if (fromStorage) return fromStorage;
  } catch {
    // localStorage disabled — fall back to cookie
  }
  return readCookie(name);
}

export function getAllClickIds(): {
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
} {
  return {
    gclid: getClickId('gclid'),
    gbraid: getClickId('gbraid'),
    wbraid: getClickId('wbraid'),
  };
}
