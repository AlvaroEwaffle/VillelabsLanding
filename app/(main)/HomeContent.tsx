'use client';

import NewHero from '@/components/sections/NewHero';
import ServiceTracks from '@/components/sections/ServiceTracks';
import ProductsPreview from '@/components/sections/ProductsPreview';
import FeaturedCases from '@/components/sections/FeaturedCases';
import TrustSection from '@/components/sections/TrustSection';
import HowWeWork from '@/components/sections/HowWeWork';
import BlogPreview from '@/components/sections/BlogPreview';
import FinalCTA from '@/components/sections/FinalCTA';

export default function HomeContent() {
  return (
    <main className="relative w-full" id="home" aria-label="Main content">
      <NewHero />
      <ServiceTracks />
      <ProductsPreview />
      <FeaturedCases />
      <TrustSection />
      <HowWeWork />
      <BlogPreview />
      <FinalCTA />
    </main>
  );
}
