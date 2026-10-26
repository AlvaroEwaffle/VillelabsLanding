import type { Metadata } from 'next';
import CatalogoContent from './CatalogoContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelab.com';

export const metadata: Metadata = {
  title: 'Catálogo | Agentes de IA para tu equipo — Villelabs',
  description:
    'Asesoría, agentes que hacen tareas completas y Agents as a Service. Prueba cómo trabajan acá mismo, sin registro, y arma tu cotización con los precios de lista.',
  alternates: { canonical: `${siteUrl}/catalogo` },
  openGraph: {
    title: 'Catálogo Villelabs · Agentes de IA para tu equipo',
    description:
      'Prueba los agentes acá mismo y mira cuánto cuesta: diagnóstico, agentes por tarea y Agents as a Service.',
    url: `${siteUrl}/catalogo`,
  },
};

export default function CatalogoPage() {
  return <CatalogoContent />;
}
