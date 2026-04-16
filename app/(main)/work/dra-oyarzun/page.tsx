import type { Metadata } from 'next';
import { getCaseStudy } from '@/lib/case-studies';
import CaseStudyPage from '@/components/CaseStudyPage';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';
const caseStudy = getCaseStudy('dra-oyarzun')!;

export const metadata: Metadata = {
  title: `${caseStudy.client} — Caso de Éxito | Villelabs`,
  description: `${caseStudy.title}. ${caseStudy.result}.`,
  alternates: { canonical: `${siteUrl}/work/dra-oyarzun` },
  openGraph: {
    title: `${caseStudy.client} | Villelabs`,
    description: `${caseStudy.title}. ${caseStudy.result}.`,
    url: `${siteUrl}/work/dra-oyarzun`,
    images: [{ url: caseStudy.heroImage, alt: caseStudy.client }],
  },
};

export default function DraOyarzunPage() {
  return <CaseStudyPage caseStudy={caseStudy} />;
}
