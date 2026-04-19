/**
 * Reads Google Ads click identifiers stored by the capture script in app/layout.tsx.
 * Returns null server-side or when the identifier is not present.
 */

type ClickId = 'gclid' | 'gbraid' | 'wbraid';

const CLICK_ID_MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/[.$?*|{}()\[\]\\\/\+^]/g, '\\$&') + '=([^;]*)')
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function clearStoredClickId(name: ClickId) {
  try {
    window.localStorage.removeItem(name);
    window.localStorage.removeItem(`${name}_ts`);
  } catch {
    // Ignore storage cleanup errors and fall back to the cookie path.
  }
}

function readStoredClickId(name: ClickId): string | null {
  try {
    const value = window.localStorage.getItem(name);
    if (!value) return null;

    const storedAt = Number(window.localStorage.getItem(`${name}_ts`));
    const isExpired =
      !Number.isFinite(storedAt) || Date.now() - storedAt > CLICK_ID_MAX_AGE_MS;

    if (isExpired) {
      clearStoredClickId(name);
      return null;
    }

    return value;
  } catch {
    return null;
  }
}

export function getClickId(name: ClickId = 'gclid'): string | null {
  if (typeof window === 'undefined') return null;
  const fromStorage = readStoredClickId(name);
  if (fromStorage) return fromStorage;

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
