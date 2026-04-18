import type { Metadata } from 'next';
import ContactContent from './ContactContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';

export const metadata: Metadata = {
  title: 'Contacto | Empieza con un diagnostico',
  description:
    'Empieza con un diagnostico y agenda una llamada estrategica solo si existe un encaje real. Basados en Santiago, Chile, atendiendo empresas globalmente.',
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    title: 'Contacto | Villelabs',
    description: 'Empieza con un diagnostico y agenda una llamada estrategica solo si existe encaje.',
    url: `${siteUrl}/contact`,
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
