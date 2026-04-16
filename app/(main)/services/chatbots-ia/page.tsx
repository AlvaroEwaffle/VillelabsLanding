import type { Metadata } from 'next';
import ServicePage from '@/components/ServicePage';
import { getService } from '@/lib/services';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';
const service = getService('chatbots-ia')!;

export const metadata: Metadata = {
  title: 'Chatbots con IA | Villelabs',
  description: 'Agentes conversacionales inteligentes para WhatsApp, Instagram y web. Califican leads, responden preguntas y derivan a tu equipo. Desde $300 USD/mes.',
  alternates: { canonical: `${siteUrl}/services/chatbots-ia` },
};

export default function ChatbotsPage() {
  return <ServicePage service={service} />;
}
