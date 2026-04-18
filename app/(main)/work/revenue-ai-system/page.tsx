import type { Metadata } from 'next';
import { getCaseStudy } from '@/lib/case-studies';
import CaseStudyPage from '@/components/CaseStudyPage';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';
const caseStudy = getCaseStudy('revenue-ai-system')!;

export const metadata: Metadata = {
  title: `${caseStudy.client} — Caso de Exito | Villelabs`,
  description: `${caseStudy.title}. ${caseStudy.result}.`,
  alternates: { canonical: `${siteUrl}/work/revenue-ai-system` },
  openGraph: {
    title: `${caseStudy.client} | Villelabs`,
    description: `${caseStudy.title}. ${caseStudy.result}.`,
    url: `${siteUrl}/work/revenue-ai-system`,
    images: [{ url: caseStudy.heroImage, alt: caseStudy.client }],
  },
};

export default function RevenueAiSystemPage() {
  return <CaseStudyPage caseStudy={caseStudy} />;
}
