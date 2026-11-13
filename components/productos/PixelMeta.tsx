'use client';

// Píxel de Meta (8-nov-2026). Carga fbevents.js una vez y manda PageView en la primera página y en cada
// navegación interna. Además marca InitiateCheckout cuando alguien toca un link de pago de Hotmart.
// /reels es una vitrina interna: no se mide.

import { useEffect, useRef } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { eventoPixel, PIXEL_ID } from '@/lib/productos/pixel';

const IGNORAR = /^\/reels(\/|$)/;

const SNIPPET = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;
n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${PIXEL_ID}');
if(!/^\\/reels(\\/|$)/.test(location.pathname))fbq('track','PageView');`;

export default function PixelMeta() {
  const ruta = usePathname();
  const ultima = useRef<string | null>(null);

  useEffect(() => {
    if (!ruta || ultima.current === ruta) return;
    const primera = ultima.current === null;
    ultima.current = ruta;
    // La primera página la marca el snippet al cargar; acá solo las navegaciones internas.
    if (primera || IGNORAR.test(ruta)) return;
    eventoPixel('PageView');
  }, [ruta]);

  useEffect(() => {
    const alClic = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest('a') as HTMLAnchorElement | null;
      if (!a || !/pay\.hotmart\.com/.test(a.href)) return;
      const producto = /H108396355K/.test(a.href) ? 'Guía 1' : 'Curso';
      // 13-nov-2026 (pedido de ads-villelab para la campaña de ventas): el curso lleva su valor en CLP (= PRECIO_FUNDADOR de
      // lib/productos/curso/curso.ts; literal para no cargar curso.ts en todas las páginas). Si cambia el precio, cambiarlo
      // aquí también. Con utm_source=qa o navegador automatizado no sale (eventoPixel, lib/productos/pixel.ts).
      eventoPixel('InitiateCheckout', producto === 'Curso' ? { content_name: producto, currency: 'CLP', value: 29990 } : { content_name: producto, currency: 'CLP' });
    };
    document.addEventListener('click', alClic, { capture: true, passive: true });
    return () => document.removeEventListener('click', alClic, { capture: true });
  }, []);

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: SNIPPET }} />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img height="1" width="1" style={{ display: 'none' }} alt="" src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`} />
      </noscript>
    </>
  );
}
