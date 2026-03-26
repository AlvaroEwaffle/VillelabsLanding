import Link from 'next/link';
import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelab.com';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy policy for Villelabs. How we handle your personal information when you use our services and website.',
  alternates: { canonical: `${siteUrl}/privacy` },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white px-4 py-24 md:py-32" id="main">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-accent hover:text-accent/80 font-medium text-sm transition-colors mb-8"
        >
          &larr; Back to Home
        </Link>

        <h1 className="text-3xl md:text-4xl font-light mb-8">Privacy Policy</h1>

        <div className="space-y-6 text-white/60 font-light leading-relaxed">
          <p>
            <strong className="text-white/80">Effective date:</strong> February 2026
          </p>

          <p>
            Villelabs (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates the website villelab.com.
            This page informs you of our policies regarding the collection, use, and disclosure
            of personal data when you use our website and services.
          </p>

          <h2 className="text-xl font-medium text-white/80 pt-4">Information We Collect</h2>
          <p>
            When you fill out a contact form, book a call, or use our diagnostic tool, we may
            collect your name, email address, phone number, company name, and website URL.
            This information is used solely to respond to your inquiry and provide our services.
          </p>

          <h2 className="text-xl font-medium text-white/80 pt-4">How We Use Your Information</h2>
          <p>
            We use the information we collect to: respond to your inquiries, provide and improve
            our services, send relevant communications about your project, and comply with legal
            obligations. We do not sell your personal information to third parties.
          </p>

          <h2 className="text-xl font-medium text-white/80 pt-4">Third-Party Services</h2>
          <p>
            We use third-party services such as Google Analytics, Google Tag Manager, Calendly,
            and WhatsApp Business to improve our website and facilitate communication. These
            services may collect data according to their own privacy policies.
          </p>

          <h2 className="text-xl font-medium text-white/80 pt-4">Cookies</h2>
          <p>
            Our website uses cookies to analyze traffic and improve user experience. You can
            control cookies through your browser settings. Disabling cookies may affect some
            features of the website.
          </p>

          <h2 className="text-xl font-medium text-white/80 pt-4">Data Security</h2>
          <p>
            We take reasonable measures to protect your personal information. However, no method
            of transmission over the Internet or electronic storage is 100% secure.
          </p>

          <h2 className="text-xl font-medium text-white/80 pt-4">Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal data. To exercise
            these rights or for any questions about this policy, please contact us at{' '}
            <a href="mailto:alvaro.villena@gmail.com" className="text-accent hover:text-accent/80 transition-colors">
              alvaro.villena@gmail.com
            </a>.
          </p>

          <h2 className="text-xl font-medium text-white/80 pt-4">Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. Changes will be posted on this
            page with an updated effective date.
          </p>
        </div>
      </div>
    </main>
  );
}
