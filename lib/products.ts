export interface Product {
  slug: string;
  icon: string;
  externalUrl?: string;
  relatedCases: string[];
}

export const products: Product[] = [
  {
    slug: 'moca',
    icon: 'MessageSquare',
    externalUrl: 'https://moca.villelab.com',
    relatedCases: ['revenue-ai-system'],
  },
  {
    slug: 'capu',
    icon: 'Mail',
    externalUrl: 'https://capu.villelab.com',
    relatedCases: ['revenue-ai-system'],
  },
  {
    slug: 'late',
    icon: 'BarChart3',
    relatedCases: ['defensa-total'],
  },
  {
    slug: 'fidelidapp',
    icon: 'Gift',
    externalUrl: 'https://www.fidelidapp.cl',
    relatedCases: ['fidelidapp'],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
