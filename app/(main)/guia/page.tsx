import type { Metadata } from 'next';
import { AUTOR, faqPage, JsonLd, ORGANIZACION, SITE_URL, videoObject } from '@/lib/productos/seo';
import { GUIA } from '@/lib/productos/guia/contenido-v2';
import { FAQ_GUIA, PRECIO_GUIA } from '@/lib/productos/guia/venta';
import { LINKS } from '@/lib/productos/links';
import { fraunces } from '@/lib/productos/fuente';
import GuiaVenta from '@/components/productos/guia/GuiaVenta';

// /guia — página de venta (indexable) de la Guía 1. El producto está en /guia/prospeccion (noindex).
// Copy v1.2 (8-nov-2026) con las palabras que busca el comprador: «conseguir clientes», «CRM», «WhatsApp».
const TITULO_OG = 'Deja de vender solo cuando te llega un referido';
const DESCRIPCION_OG =
  'En una tarde armas tu lista de 20 posibles clientes, el primer mensaje y los seguimientos, con tu primer CRM en Google Sheets. Sin envío masivo. $14.990 CLP.';
const IMAGEN_OG = `${SITE_URL}/og/guia.jpg`;

export const metadata: Metadata = {
  title: { absolute: 'Cómo conseguir clientes para tu pyme: tu lista de 20 y el primer mensaje' },
  description:
    'Arma en una tarde tu lista de 20 posibles clientes, el primer mensaje y los seguimientos, con tu primer CRM en Google Sheets o Excel. Uno a uno, sin envío masivo. $14.990 CLP.',
  alternates: { canonical: `${SITE_URL}${LINKS.guiaVenta}` },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Villelab',
    title: TITULO_OG,
    description: DESCRIPCION_OG,
    url: `${SITE_URL}${LINKS.guiaVenta}`,
    images: [{ url: IMAGEN_OG, width: 1200, height: 630, alt: TITULO_OG }],
  },
  twitter: { card: 'summary_large_image', title: TITULO_OG, description: DESCRIPCION_OG, images: [IMAGEN_OG] },
};

const JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${GUIA.etiqueta} · ${GUIA.titulo}`,
    description: GUIA.promesa,
    image: [IMAGEN_OG],
    url: `${SITE_URL}${LINKS.guiaVenta}`,
    inLanguage: 'es',
    brand: { '@type': 'Brand', name: 'Villelab' },
    author: AUTOR,
    offers: {
      '@type': 'Offer',
      price: String(PRECIO_GUIA.clp),
      priceCurrency: 'CLP',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}${LINKS.guiaVenta}`,
      seller: ORGANIZACION,
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'CL',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: PRECIO_GUIA.garantiaDias,
        returnFees: 'https://schema.org/FreeReturn',
      },
    },
  },
  faqPage(FAQ_GUIA),
  videoObject({
    id: 'v04-guia-primer-mensaje',
    nombre: 'El primer mensaje, a mano',
    descripcion:
      'Álvaro Villena escribe a mano un primer mensaje en tres frases (algo de ellos, lo que ganan y una pregunta fácil) para un posible cliente que le dio su WhatsApp, con el caso de ejemplo de la tostaduría Grano Norte. Muestra de la Guía 1.',
    segundos: 49,
    pagina: LINKS.guiaVenta,
  }),
];

export default function GuiaVentaPage() {
  return (
    <div className={fraunces.variable}>
      <JsonLd data={JSON_LD} />
      <GuiaVenta />
    </div>
  );
}
