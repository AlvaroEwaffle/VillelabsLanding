import type { Metadata } from 'next';
import { getCaseStudy } from '@/lib/case-studies';
import CaseStudyPage from '@/components/CaseStudyPage';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';
const caseStudy = getCaseStudy('defensa-total')!;

export const metadata: Metadata = {
  title: `${caseStudy.client} — Caso de Exito | Villelabs`,
  description: `${caseStudy.title}. ${caseStudy.result}.`,
  alternates: { canonical: `${siteUrl}/work/defensa-total` },
  openGraph: {
    title: `${caseStudy.client} | Villelabs`,
    description: `${caseStudy.title}. ${caseStudy.result}.`,
    url: `${siteUrl}/work/defensa-total`,
    images: [{ url: caseStudy.heroImage, alt: caseStudy.client }],
  },
};

export default function DefensaTotalPage() {
  return <CaseStudyPage caseStudy={caseStudy} />;
}
