import Link from 'next/link';
import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelab.com';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of service for Villelabs. Conditions governing the use of our website and digital services.',
  alternates: { canonical: `${siteUrl}/terms` },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white px-4 py-24 md:py-32" id="main">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-accent hover:text-accent/80 font-medium text-sm transition-colors mb-8"
        >
          &larr; Back to Home
        </Link>

        <h1 className="text-3xl md:text-4xl font-light mb-8">Terms of Service</h1>

        <div className="space-y-6 text-white/60 font-light leading-relaxed">
          <p>
            <strong className="text-white/80">Effective date:</strong> February 2026
          </p>

          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the website villelab.com
            and any services provided by Villelabs. By using our website or engaging our services,
            you agree to these Terms.
          </p>

          <h2 className="text-xl font-medium text-white/80 pt-4">Services</h2>
          <p>
            Villelabs provides web design, development, consulting, and digital strategy services.
            Specific deliverables, timelines, and pricing are defined in individual project
            agreements following an initial strategy call.
          </p>

          <h2 className="text-xl font-medium text-white/80 pt-4">Use of Website</h2>
          <p>
            You agree to use our website for lawful purposes only. You must not attempt to
            interfere with the proper functioning of the website, introduce malicious code,
            or access areas that are not intended for public access.
          </p>

          <h2 className="text-xl font-medium text-white/80 pt-4">Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, and code, is the
            property of Villelabs unless otherwise stated. Client project deliverables are
            transferred to the client upon full payment as specified in the project agreement.
          </p>

          <h2 className="text-xl font-medium text-white/80 pt-4">Disclaimer</h2>
          <p>
            Our website and services are provided &ldquo;as is.&rdquo; While we strive for accuracy,
            we make no warranties regarding the completeness or reliability of information on
            this website. Results mentioned in case studies and testimonials are specific to
            those clients and are not guaranteed for all engagements.
          </p>

          <h2 className="text-xl font-medium text-white/80 pt-4">Limitation of Liability</h2>
          <p>
            Villelabs shall not be liable for any indirect, incidental, or consequential damages
            arising from the use of our website or services. Our total liability shall not exceed
            the amount paid for the specific service in question.
          </p>

          <h2 className="text-xl font-medium text-white/80 pt-4">Governing Law</h2>
          <p>
            These Terms are governed by the laws of Chile. Any disputes shall be resolved in the
            courts of Santiago, Chile.
          </p>

          <h2 className="text-xl font-medium text-white/80 pt-4">Contact</h2>
          <p>
            For questions about these Terms, contact us at{' '}
            <a href="mailto:alvaro.villena@gmail.com" className="text-accent hover:text-accent/80 transition-colors">
              alvaro.villena@gmail.com
            </a>.
          </p>
        </div>
      </div>
    </main>
  );
}
