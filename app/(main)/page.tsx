import HomeContent from './HomeContent';
import { FAQ_HOME } from '@/lib/faq';
import { faqPage, JsonLd } from '@/lib/productos/seo';

// 13-nov-2026 (AI SEO): FAQPage con el mismo texto de las preguntas visibles (la portada se prerenderiza en español).
export default function Home() {
  return (
    <>
      <JsonLd data={faqPage(FAQ_HOME.es)} />
      <HomeContent />
    </>
  );
}
