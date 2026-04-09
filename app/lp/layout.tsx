import WhatsAppFloatButton from '@/components/WhatsAppFloatButton';
import { LanguageProvider } from '@/lib/i18n';
import LenisProvider from '@/components/LenisProvider';

/**
 * Minimal layout for landing pages.
 * No navigation, no footer, no exit-intent popup — pure conversion focus.
 * WhatsApp float button remains for instant contact.
 */
export default function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <LenisProvider>
        {children}
      </LenisProvider>
      <WhatsAppFloatButton />
    </LanguageProvider>
  );
}
