import type { Metadata } from 'next';
import {
  DanielReyes_Navigation,
  DanielReyes_HeroSection,
  DanielReyes_CentroSection,
  DanielReyes_ServicesSection,
  DanielReyes_TeamSection,
  DanielReyes_EnfoqueSection,
  DanielReyes_TestimonialsSection,
  DanielReyes_IsapreGallery,
  DanielReyes_FAQSection,
  DanielReyes_ContactSection,
  DanielReyes_Footer,
  DanielReyes_WhatsAppFloat,
  DanielReyes_StickyMobileCTA,
} from '@/components/sections/daniel-reyes';

export const metadata: Metadata = {
  title: 'SUBJETIVIDADES — Psicoterapia basada en evidencia | Santiago, Chile',
  description:
    'Centro de psicología clínica en Ñuñoa, Santiago. Terapia individual, de pareja y sexual con más de 20 años de experiencia. Atención presencial y online.',
};

export default function DanielReyesPage() {
  return (
    <div className="bg-white text-slate-700" style={{ fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <DanielReyes_Navigation />
      <main>
        <DanielReyes_HeroSection />
        <DanielReyes_CentroSection />
        <DanielReyes_ServicesSection />
        <DanielReyes_TeamSection />
        <DanielReyes_EnfoqueSection />
        <DanielReyes_TestimonialsSection />
        <DanielReyes_IsapreGallery />
        <DanielReyes_FAQSection />
        <DanielReyes_ContactSection />
      </main>
      <DanielReyes_Footer />
      <DanielReyes_WhatsAppFloat />
      <DanielReyes_StickyMobileCTA />
    </div>
  );
}
