import type { Metadata } from 'next';
import DiagnosticContent from './DiagnosticContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';

export const metadata: Metadata = {
  title: 'Diagnostic',
  description:
    'Free digital diagnostic. Discover where your website stands and what it needs to convert visitors into clients.',
  alternates: { canonical: `${siteUrl}/diagnostic` },
  robots: { index: true, follow: true },
};

export default function DiagnosticPage() {
  return <DiagnosticContent />;
}
