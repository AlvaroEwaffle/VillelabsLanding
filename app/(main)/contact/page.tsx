import type { Metadata } from 'next';
import ContactContent from './ContactContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelab.com';

export const metadata: Metadata = {
  title: 'Contact | Start with a Diagnosis',
  description:
    'Start with the diagnosis flow, then open a strategy call only if there is real fit. Based in Santiago, Chile, serving businesses globally.',
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    title: 'Contact | Villelabs',
    description: 'Start with the diagnosis flow, then open a strategy call only if there is fit.',
    url: `${siteUrl}/contact`,
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
