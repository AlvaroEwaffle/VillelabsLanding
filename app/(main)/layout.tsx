import LenisProvider from "@/components/LenisProvider";
import SEOHead from "@/components/SEOHead";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppFloatButton from "@/components/WhatsAppFloatButton";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { LanguageProvider } from "@/lib/i18n";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <SEOHead />
      <Navigation />
      <LenisProvider>
        {children}
      </LenisProvider>
      <Footer />
      <WhatsAppFloatButton />
      <ExitIntentPopup />
    </LanguageProvider>
  );
}
