'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, ArrowRight, Clock, Mail, CheckCircle } from 'lucide-react';
import { blogPosts } from '@/lib/blog-posts';
import { useTranslation } from '@/lib/i18n';

const EASE_SMOOTH = [0.6, -0.05, 0.01, 0.99] as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_SMOOTH },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
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
      <div className="flex flex-col items-center text-center py-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
          <CheckCircle className="w-6 h-6 text-green-400" />
        </div>
        <p className="text-white text-lg font-light mb-2">{t.pages.blog.subscribedTitle}</p>
        <p className="text-white/40 text-sm font-light">
          {t.pages.blog.subscribedDescription}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 mb-5 mx-auto">
        <Mail className="w-6 h-6 text-accent" />
      </div>
      <p className="text-white text-lg font-light mb-2">
        {t.pages.blog.newsletterHeading}
      </p>
      <p className="text-white/40 text-sm font-light mb-6">
        {t.pages.blog.newsletterDescription}
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.pages.blog.newsletterPlaceholder}
          autoComplete="email"
          className="flex-1 px-4 py-3 rounded-xl bg-slate-800/60 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 text-sm transition-all"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-accent text-white text-sm font-medium rounded-xl hover:bg-accent/90 transition-colors border border-accent/30 hover:border-accent/50 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {isSubmitting ? t.pages.blog.subscribing : t.pages.blog.subscribe}
        </button>
      </form>
      <p className="text-xs text-white/25 mt-3">{t.pages.blog.noSpam}</p>
    </>
  );
}

export default function BlogContent() {
  const { t, language } = useTranslation();

  const filteredPosts = blogPosts.filter((p) => p.language === language);

  return (
    <main className="pt-24 md:pt-32 pb-16 md:pb-24">
      {/* Header */}
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.p
          variants={itemVariants}
          className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4"
        >
          {t.pages.blog.label}
        </motion.p>
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6"
        >
          {t.pages.blog.heading}
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-lg text-white/50 font-light max-w-xl mx-auto"
        >
          {t.pages.blog.description}
        </motion.p>
      </motion.div>

      {/* Published posts */}
      <motion.div
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <motion.article key={post.slug} variants={itemVariants}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block p-6 md:p-8 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-accent/20 transition-all duration-300"
              >
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] uppercase tracking-wider font-medium">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-white/25 text-xs font-light">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                  <span className="flex items-center gap-1.5 text-white/25 text-xs font-light">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                </div>
                <h2 className="text-white text-lg font-medium mb-2 group-hover:text-accent transition-colors">
                  {post.title}
                </h2>
                <p className="text-white/40 text-sm font-light leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1.5 text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {t.pages.blog.readArticle}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </motion.div>

      {/* Newsletter CTA */}
      <motion.div
        className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.div
          variants={itemVariants}
          className="p-8 md:p-10 rounded-xl border border-white/[0.06] bg-white/[0.02]"
        >
          <NewsletterCTA />
        </motion.div>
      </motion.div>
    </main>
  );
}
