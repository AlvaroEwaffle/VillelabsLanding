import type { Metadata } from 'next';
import { getCaseStudy } from '@/lib/case-studies';
import CaseStudyPage from '@/components/CaseStudyPage';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelab.com';
const caseStudy = getCaseStudy('fidelidapp')!;

export const metadata: Metadata = {
  title: `${caseStudy.client} — ${caseStudy.category} Case Study`,
  description: `${caseStudy.title}. ${caseStudy.result}. See how we helped ${caseStudy.client} transform their business with a custom digital solution.`,
  alternates: { canonical: `${siteUrl}/work/fidelidapp` },
  openGraph: {
    title: `${caseStudy.client} Case Study | Villelabs`,
    description: `${caseStudy.title}. ${caseStudy.result}.`,
    url: `${siteUrl}/work/fidelidapp`,
    images: [{ url: caseStudy.heroImage, alt: caseStudy.client }],
  },
};

export default function FidelidappPage() {
  return <CaseStudyPage caseStudy={caseStudy} />;
}
