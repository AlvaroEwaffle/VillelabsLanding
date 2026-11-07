import type { Metadata } from 'next';
import CatalogoContent from './CatalogoContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelab.com';

export const metadata: Metadata = {
  title: 'Catálogo | Agentes de IA para tu equipo — Villelabs',
  description:
    'Reunión de descubrimiento gratis, agentes que hacen tareas completas y Agentes como servicio. Prueba cómo trabajan acá mismo, sin registro, y arma tu cotización con los precios de lista.',
  alternates: { canonical: `${siteUrl}/catalogo` },
  openGraph: {
    title: 'Catálogo Villelabs · Agentes de IA para tu equipo',
    description:
      'Prueba los agentes acá mismo y mira cuánto cuesta: reunión gratis, implementación desde 12 UF y mantenimiento desde 3 UF al mes.',
    url: `${siteUrl}/catalogo`,
  },
};

export default function CatalogoPage() {
  return <CatalogoContent />;
}
