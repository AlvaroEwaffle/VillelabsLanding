import type { Metadata } from 'next';
import PortfolioContent from '../portfolio/PortfolioContent';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelabs.cl';

export const metadata: Metadata = {
  title: 'Proyectos | Villelabs',
  description:
    'Casos de exito y sistemas digitales construidos por Villelabs para empresas que necesitaban ejecucion clara y resultados medibles.',
  alternates: { canonical: `${siteUrl}/work` },
  openGraph: {
    title: 'Proyectos | Villelabs',
    description:
      'Casos de exito y sistemas digitales construidos por Villelabs para empresas que necesitaban ejecucion clara y resultados medibles.',
    url: `${siteUrl}/work`,
  },
};

export default function WorkPage() {
  return <PortfolioContent />;
}
