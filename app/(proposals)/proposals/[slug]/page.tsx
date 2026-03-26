import type { Metadata } from 'next';
import { getProposal, getAllProposalSlugs } from '@/lib/proposals';
import ProposalPage from '@/components/proposals/ProposalPage';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProposalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const proposal = getProposal(slug);
  if (!proposal) {
    return { title: 'Propuesta no encontrada' };
  }
  const title = `${proposal.projectTitle} — ${proposal.coverLabel}`;
  const description = `${proposal.subtitle} · ${proposal.duration} · ${proposal.subtitle === '2026' ? 'Propuesta personalizada' : proposal.subtitle} para ${proposal.clientName}`;
  return {
    title,
    description,
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description: `${proposal.coverLabel} · ${proposal.duration} · Propuesta personalizada para ${proposal.clientName}`,
      type: 'article',
      siteName: 'Villelab',
    },
  };
}

export default async function ProposalSlugPage({ params }: Props) {
  const { slug } = await params;
  const proposal = getProposal(slug);
  if (!proposal) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-white/60 text-lg">Propuesta no encontrada.</p>
      </div>
    );
  }
  return <ProposalPage data={proposal} />;
}
