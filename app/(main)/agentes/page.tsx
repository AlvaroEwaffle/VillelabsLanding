import type { Metadata } from 'next';
import AgentesContent from './AgentesContent';
import { FAQ_AGENTES } from '@/lib/faq';
import { faqPage, JsonLd } from '@/lib/productos/seo';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelab.com';

export const metadata: Metadata = {
  title: 'Agentes como servicio para tu equipo',
  description:
    'Agentes de IA que hacen el trabajo repetitivo de tu equipo: correos, seguimientos, reportes y reuniones. Reunión de descubrimiento gratis de 30 minutos, implementación desde 12 UF y mantenimiento desde 3 UF al mes.',
  alternates: { canonical: `${siteUrl}/agentes` },
  openGraph: {
    title: 'Agentes como servicio · Villelabs',
    description:
      'Tres pasos: una reunión gratis de 30 minutos, la implementación desde 12 UF y el mantenimiento desde 3 UF al mes.',
    url: `${siteUrl}/agentes`,
  },
};

export default function AgentesPage() {
  // 13-nov-2026 (AI SEO): FAQPage con el mismo texto de las preguntas visibles.
  return (
    <>
      <JsonLd data={faqPage(FAQ_AGENTES)} />
      <AgentesContent />
    </>
  );
}
