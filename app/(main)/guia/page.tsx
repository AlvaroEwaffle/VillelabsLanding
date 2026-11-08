import type { Metadata } from 'next';
import { AUTOR, faqPage, JsonLd, ORGANIZACION, SITE_URL, videoObject } from '@/lib/productos/seo';
import { GUIA } from '@/lib/productos/guia/contenido-v2';
import { FAQ_GUIA, PRECIO_GUIA } from '@/lib/productos/guia/venta';
import { LINKS } from '@/lib/productos/links';
import { fraunces } from '@/lib/productos/fuente';
import GuiaVenta from '@/components/productos/guia/GuiaVenta';

// /guia — página de venta (indexable) de la Guía 1. El producto está en /guia/prospeccion (noindex).
const TITULO_OG = 'Tus primeros 20 prospectos y el primer mensaje, en una tarde';
const DESCRIPCION_OG = 'Guía paso a paso con planilla, mensajes y seguimientos con fecha. $14.990 CLP, garantía de 7 días.';
const IMAGEN_OG = `${SITE_URL}/og/guia.jpg`;

export const metadata: Metadata = {
  title: { absolute: 'Guía de prospección para pymes: tu lista de 20 y el primer mensaje' },
  description:
    'Arma en una tarde tu lista de 20 prospectos, el primer mensaje y los seguimientos de los días 2, 7 y 14. Planilla en Excel incluida. $14.990 CLP, garantía de 7 días.',
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
      'Álvaro Villena escribe un primer mensaje de prospección en tres frases (algo de ellos, lo que ganan y una pregunta fácil) con el caso de la tostaduría Grano Norte. Muestra de la Guía 1.',
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
