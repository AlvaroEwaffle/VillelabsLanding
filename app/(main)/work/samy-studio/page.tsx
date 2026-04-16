import type { Metadata } from 'next';
import { getCaseStudy } from '@/lib/case-studies';
import CaseStudyPage from '@/components/CaseStudyPage';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';
const caseStudy = getCaseStudy('samy-studio')!;

export const metadata: Metadata = {
  title: `${caseStudy.client} — Caso de Éxito | Villelabs`,
  description: `${caseStudy.title}. ${caseStudy.result}.`,
  alternates: { canonical: `${siteUrl}/work/samy-studio` },
  openGraph: {
    title: `${caseStudy.client} | Villelabs`,
    description: `${caseStudy.title}. ${caseStudy.result}.`,
    url: `${siteUrl}/work/samy-studio`,
    images: [{ url: caseStudy.heroImage, alt: caseStudy.client }],
  },
};

export default function SamyStudioPage() {
  return <CaseStudyPage caseStudy={caseStudy} />;
}
