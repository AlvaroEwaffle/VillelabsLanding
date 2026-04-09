import type { Metadata } from 'next';
import { getCaseStudy } from '@/lib/case-studies';
import CaseStudyPage from '@/components/CaseStudyPage';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';
const caseStudy = getCaseStudy('defensa-total')!;

export const metadata: Metadata = {
  title: `${caseStudy.client} — ${caseStudy.category} Case Study`,
  description: `${caseStudy.title}. ${caseStudy.result}. See how we helped ${caseStudy.client} transform their business with a custom digital solution.`,
  alternates: { canonical: `${siteUrl}/cases/defensa-total` },
  openGraph: {
    title: `${caseStudy.client} Case Study | Villelabs`,
    description: `${caseStudy.title}. ${caseStudy.result}.`,
    url: `${siteUrl}/cases/defensa-total`,
    images: [{ url: caseStudy.heroImage, alt: caseStudy.client }],
  },
};

export default function DefensaTotalPage() {
  return <CaseStudyPage caseStudy={caseStudy} />;
}
