'use client';

// EXP-12 /guia (12-nov-2026): GuiaVenta es de servidor; este componente asigna la variante si se llegó navegando
// dentro del sitio (el script en línea no corre) y avisa a GA4 una vez por visita.
import { useEffect } from 'react';
import { EXP12 } from '@/lib/productos/guia/exp12';

export default function AvisoExp12() {
  useEffect(() => {
    EXP12.avisar(EXP12.asignar());
  }, []);
  return null;
}
