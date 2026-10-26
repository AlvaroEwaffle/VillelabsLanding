'use client';

import { useEffect } from 'react';
import Link from 'next/link';

/*
 * Redirección segura para export estático: meta refresh (React 19 la sube al <head>),
 * replace() en cuanto carga el JS y un enlace por si ambos fallan.
 * En Cloudflare Pages, public/_redirects responde 301 antes de llegar acá.
 */
export default function Redirect({ to, label }: { to: string; label?: string }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${to}`} />
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-center">
        <p className="text-slate-400">
          <Link href={to} className="text-accent underline underline-offset-4">
            {label ?? to}
          </Link>
        </p>
      </main>
    </>
  );
}
