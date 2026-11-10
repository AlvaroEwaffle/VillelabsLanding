'use client';

// Link de checkout Hotmart que agrega src/sck con los UTM de la visita al hacer clic (lib/productos/utm.ts).
// Sirve en páginas server: el HTML estático lleva el link limpio y el clic lo completa.
import type { AnchorHTMLAttributes } from 'react';
import { hotmartConUtm } from '@/lib/productos/utm';

export default function LinkHotmart({ href, ubicacion, children, ...resto }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; ubicacion?: string }) {
  return (
    <a
      {...resto}
      href={href}
      onClick={(e) => {
        e.currentTarget.href = hotmartConUtm(href, ubicacion);
        resto.onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
