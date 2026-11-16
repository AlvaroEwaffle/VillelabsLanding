import type { Metadata } from 'next';
import { AUTOR, JsonLd, ORGANIZACION, SITE_URL, videoObject } from '@/lib/productos/seo';
import EsqueletoApp from '@/components/productos/esqueleto/EsqueletoApp';
import { fraunces } from '@/lib/productos/fuente';
import { EXP14 } from '@/lib/productos/esqueleto/exp14';

const X14_SCRIPT = `(function(){try{var c=new URLSearchParams(location.search).get('utm_content');if(c==='x14-esqueleto'){sessionStorage.setItem('vl_x14','1')}if(c==='x14-esqueleto'||sessionStorage.getItem('vl_x14')==='1'){document.documentElement.setAttribute('data-x14','1')}}catch(e){}})();`;
const X14_CSS = `.x14-B{display:none}html[data-exp14="B"][data-x14] .x14-A{display:none}html[data-exp14="B"][data-x14] .x14-B{display:block}`;


/*
 * /esqueleto — «El esqueleto de tu asistente de WhatsApp», imán gratis de la Entrada A (contenido → esqueleto → Guía 1).
 * Ex /ficha (rehecho el 7-nov-2026 con el feedback de Álvaro). Base: VPM/Villelabs/productos-digitales/contenido-primeros-productos.html.
 * Eventos dataLayer: esqueleto_inicio, esqueleto_paso, esqueleto_completo, esqueleto_click_guia, exp14_variante.
 * EXP-14 (12-nov-2026, 17:00): dos variantes A/B, correo en la primera pantalla (lib/productos/esqueleto/exp14.ts) y correo a medias (lib/productos/esqueleto/parcial.ts).
 * EXP-14 cerrada 16-nov-2026 17:00: ganó A (correo al final). EXP-19 (16-nov): misma mecánica vl_exp14; B = titular que sigue al
 * anuncio X14, solo para utm_content=x14-esqueleto (ver EsqueletoApp, ANUNCIO_X14).
 */
export const metadata: Metadata = {
  title: { absolute: 'Esqueleto de tu asistente de WhatsApp, gratis' },
  description:
    'Arma gratis en 15 minutos la base de tu asistente de WhatsApp: qué vendes, las preguntas de siempre, qué nunca promete y cuándo te avisa.',
  alternates: { canonical: `${SITE_URL}/esqueleto` },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Villelab',
    title: 'Te regalo el esqueleto de tu asistente de WhatsApp',
    description: 'Gratis, en 4 pasos y 15 minutos: deja escrito qué responde tu asistente, qué nunca promete y cuándo te pasa la conversación.',
    url: `${SITE_URL}/esqueleto`,
    images: [{ url: `${SITE_URL}/og/esqueleto.jpg`, width: 1200, height: 630, alt: 'Te regalo el esqueleto de tu asistente de WhatsApp' }],
  },
  twitter: { card: 'summary_large_image', title: 'Te regalo el esqueleto de tu asistente de WhatsApp', description: 'Gratis, en 4 pasos y 15 minutos: deja escrito qué responde tu asistente, qué nunca promete y cuándo te pasa la conversación.', images: [`${SITE_URL}/og/esqueleto.jpg`] },
};

const JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'El esqueleto de tu asistente de WhatsApp',
    url: `${SITE_URL}/esqueleto`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    inLanguage: 'es',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'CLP' },
    description: 'Plantilla guiada en 4 pasos para dejar escrito qué responde tu asistente de WhatsApp, qué nunca promete y cuándo deriva a una persona.',
    author: AUTOR,
    publisher: ORGANIZACION,
  },
  videoObject({
    id: 'v02-esqueleto-bienvenida',
    nombre: 'Lo que vas a armar en los próximos 15 minutos',
    descripcion: 'Álvaro Villena muestra los 4 pasos del esqueleto de tu asistente de WhatsApp y cómo queda listo para copiar, con Grano Norte, una tostaduría de ejemplo.',
    segundos: 38,
    pagina: '/esqueleto',
  }),
];

export default function EsqueletoPage() {
  return (
    <div className={fraunces.variable}>
      {/* EXP-09: elige la variante del hero antes de pintarlo (constante propia del repo, sin datos de usuarios). */}
      <script dangerouslySetInnerHTML={{ __html: EXP14.script }} />
      {/* EXP-19 (16-nov-2026): marca <html data-x14> si la visita viene del anuncio X14 (utm_content=x14-esqueleto; queda en la
          sesión por si recarga) y muestra el titular B solo a esas visitas en la variante B. Constantes propias, sin datos de usuarios.
          Va aquí y no en globals.css para no cambiar el CSS que comparte /curso mientras corre EXP-16. */}
      <script dangerouslySetInnerHTML={{ __html: X14_SCRIPT }} />
      <style dangerouslySetInnerHTML={{ __html: X14_CSS }} />
      {/* 13-nov-2026 (velocidad): el póster del video es el elemento más grande del primer pantallazo (LCP) en celular. Con el CSS
          en línea el <video> queda más abajo en el HTML, así que el póster se pide desde el <head> con prioridad alta (React lo sube). */}
      <link rel="preload" as="image" href="/videos/v02-esqueleto-bienvenida.webp" fetchPriority="high" />
      <JsonLd data={JSON_LD} />
      <EsqueletoApp />
    </div>
  );
}
