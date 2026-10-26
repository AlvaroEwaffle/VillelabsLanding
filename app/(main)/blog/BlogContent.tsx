'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Mail, CheckCircle } from 'lucide-react';
import { blogPosts } from '@/lib/blog-posts';
import { useTranslation } from '@/lib/i18n';
import { Kicker, PageHero } from '@/components/PageBits';

/* Blog (26-oct-2026): mismo estilo que el home. Los posts viven en lib/blog-posts.ts. */

const COPY = {
  es: {
    kicker: 'Blog',
    titulo: 'Agentes de IA explicados en simple.',
    bajada: 'Notas cortas de Álvaro sobre cómo trabajan los agentes, qué deciden solos y qué te preguntan. Y algo de cómo construimos plataformas.',
    destacado: 'Lo último',
    todos: 'Todas las notas',
    leer: 'Leer la nota',
  },
  en: {
    kicker: 'Blog',
    titulo: 'AI agents explained simply.',
    bajada: 'Short notes by Álvaro on how agents work, what they decide on their own and what they ask you. Plus some of how we build platforms.',
    destacado: 'Latest',
    todos: 'All notes',
    leer: 'Read the note',
  },
};

function NewsletterCTA() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const brevoApiKey = process.env.NEXT_PUBLIC_BREVO_API_KEY;

    if (brevoApiKey) {
      try {
        await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'api-key': brevoApiKey,
          },
          body: JSON.stringify({
            email,
            listIds: [2],
            updateEnabled: true,
            attributes: {
              SOURCE: 'blog_newsletter',
              SITE: 'villelab.com',
            },
          }),
        });
      } catch {
        // Fail silently
      }
    } else {
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center py-4 text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-green-500/20 bg-green-500/10">
          <CheckCircle className="h-6 w-6 text-green-400" />
        </div>
        <p className="text-lg text-white">{t.pages.blog.subscribedTitle}</p>
        <p className="mt-2 text-sm text-slate-400">{t.pages.blog.subscribedDescription}</p>
      </div>
    );
  }

  return (
    <>
      <Mail className="h-6 w-6 text-accent" />
      <p className="mt-4 text-xl text-white">{t.pages.blog.newsletterHeading}</p>
      <p className="mt-2 max-w-md text-sm text-slate-400">{t.pages.blog.newsletterDescription}</p>
      <form onSubmit={handleSubmit} className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.pages.blog.newsletterPlaceholder}
          autoComplete="email"
          className="min-h-[48px] flex-1 rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm text-white placeholder-slate-500 transition-all focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-[48px] items-center justify-center whitespace-nowrap rounded-full bg-accent px-6 text-sm font-medium text-white hover:bg-[#2a8bbd] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? t.pages.blog.subscribing : t.pages.blog.subscribe}
        </button>
      </form>
      <p className="mt-3 text-xs text-slate-500">{t.pages.blog.noSpam}</p>
    </>
  );
}

export default function BlogContent() {
  const { language } = useTranslation();
  const c = COPY[language === 'en' ? 'en' : 'es'];

  const posts = blogPosts.filter((p) => p.language === language);
  const [primero, ...resto] = posts;

  return (
    <main className="relative w-full overflow-x-hidden bg-slate-950" aria-label="Main content">
      <PageHero kicker={c.kicker} titulo={c.titulo} bajada={c.bajada} />

      {primero ? (
        <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <Kicker>{c.destacado}</Kicker>
          <Link
            href={`/blog/${primero.slug}`}
            className="group mt-4 block rounded-3xl border border-accent/40 bg-accent/[0.06] p-6 transition-colors hover:border-accent/70 sm:p-8"
          >
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className="rounded-full border border-white/10 px-3 py-1 uppercase tracking-wider">{primero.category}</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-3 w-3" /> {primero.readTime}</span>
              <span>{primero.date}</span>
            </div>
            <h2 className="mt-4 max-w-3xl font-serif text-2xl text-white sm:text-3xl">{primero.title}</h2>
            <p className="mt-3 max-w-2xl text-slate-300">{primero.excerpt}</p>
            <span className="mt-5 inline-flex min-h-[44px] items-center gap-2 text-sm text-slate-200 group-hover:text-white">
              {c.leer} <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Kicker>{c.todos}</Kicker>
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {resto.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/25"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                  <span className="rounded-full border border-white/10 px-3 py-1 uppercase tracking-wider">{post.category}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock className="h-3 w-3" /> {post.readTime}</span>
                  <span>{post.date}</span>
                </div>
                <h2 className="mt-4 text-xl text-white">{post.title}</h2>
                <p className="mt-2 flex-1 text-sm text-slate-400">{post.excerpt}</p>
                <span className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm text-slate-200 group-hover:text-white">
                  {c.leer} <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-32 pt-10 sm:px-6">
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-10">
          <NewsletterCTA />
        </div>
      </section>
    </main>
  );
}
