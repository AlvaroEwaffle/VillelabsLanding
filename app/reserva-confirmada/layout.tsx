import { LanguageProvider } from '@/lib/i18n';

/**
 * Minimal standalone layout for the booking confirmation page.
 * No nav, no footer — pure post-conversion moment.
 */
export default function ReservaConfirmadaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
