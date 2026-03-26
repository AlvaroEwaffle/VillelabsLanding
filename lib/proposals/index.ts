import { danielReyes } from './daniel-reyes';
import type { Proposal } from './types';

const proposals: Record<string, Proposal> = {
  DanielReyes: danielReyes,
};

export function getProposal(slug: string): Proposal | undefined {
  return proposals[slug];
}

export function getAllProposalSlugs(): string[] {
  return Object.keys(proposals);
}
