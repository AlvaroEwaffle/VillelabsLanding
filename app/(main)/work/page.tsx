import type { Metadata } from 'next';
import ProyectosContent from './ProyectosContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelab.com';

export const metadata: Metadata = {
  title: 'Proyectos | Sistemas que operan con agentes de IA',
  description:
    'Ewaffle, Fidelidapp y un agente que sincroniza cuatro calendarios: sistemas que corren todos los días con agentes de IA. Más las plataformas y sitios construidos para clientes.',
  alternates: { canonical: `${siteUrl}/work` },
  openGraph: {
    title: 'Proyectos | Villelab',
    description: 'Sistemas que hoy operan con agentes de IA, y lo que construimos antes.',
    url: `${siteUrl}/work`,
  },
};

export default function WorkPage() {
  return <ProyectosContent />;
}
