'use client';

import Link from 'next/link';
import BrandLogo from './BrandLogo';
import { useTranslation, getWhatsAppUrl } from '@/lib/i18n';

export default function Footer() {
  const { t, language } = useTranslation();

  const footerColumns = [
    {
      title: t.footer.company,
      links: [
        { label: t.footer.aboutLink, href: '/about' },
        { label: t.footer.workLink, href: '/work' },
        { label: t.footer.contactLink, href: '/contact' },
      ],
    },
    {
      title: t.footer.services,
      links: [
        { label: t.footer.marketingLink, href: '/services#marketing' },
        { label: t.footer.developmentLink, href: '/services#development' },
      ],
    },
    {
      title: t.footer.products,
      links: [
        { label: t.footer.mocaLink, href: '/products/moca' },
        { label: t.footer.capuLink, href: '/products/capu' },
        { label: t.footer.lateLink, href: '/products/late' },
        { label: t.footer.fidelidappLink, href: '/products/fidelidapp' },
      ],
    },
    {
      title: t.footer.resources,
      links: [
        { label: t.footer.blogLink, href: '/blog' },
        { label: t.footer.diagnosticLink, href: '/contact' },
        { label: t.footer.caseStudiesLink, href: '/work' },
      ],
    },
    {
      title: t.footer.connect,
      links: [
        { label: t.footer.whatsappLink, href: getWhatsAppUrl(language), external: true },
        { label: t.footer.linkedinLink, href: 'https://www.linkedin.com/in/alvarovillena', external: true },
        { label: t.footer.bookACallLink, href: '/contact' },
      ],
    },
  ];

  return (
    <footer className="relative bg-slate-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Top: Logo + columns */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-10">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1 mb-4 md:mb-0">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <BrandLogo size="sm" />
              <span className="text-white font-medium text-lg tracking-tight">
                Villelabs
              </span>
            </Link>
            <p className="text-white/40 text-sm font-light leading-relaxed max-w-xs">
              {t.footer.brandDescription}
            </p>
          </div>

          {/* Link columns */}
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4 className="text-white/80 text-xs uppercase tracking-[0.15em] font-medium mb-4">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {'external' in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 text-sm font-light hover:text-white/80 transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-white/40 text-sm font-light hover:text-white/80 transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs font-light">
            &copy; {new Date().getFullYear()} {t.footer.allRightsReserved}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href={t.footer.privacyHref}
              className="text-white/30 text-xs font-light hover:text-white/60 transition-colors duration-200"
            >
              {t.footer.privacy}
            </Link>
            <Link
              href={t.footer.termsHref}
              className="text-white/30 text-xs font-light hover:text-white/60 transition-colors duration-200"
            >
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
