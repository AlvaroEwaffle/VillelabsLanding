'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Tag,
} from 'lucide-react';
import type { BlogPost } from '@/lib/blog-posts';
import { blogPosts } from '@/lib/blog-posts';
import { useTranslation, getWhatsAppUrl } from '@/lib/i18n';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://villelab.com';

const EASE_SMOOTH = [0.6, -0.05, 0.01, 0.99] as const;

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_SMOOTH },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

interface BlogPostPageProps {
  post: BlogPost;
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  const { t, language } = useTranslation();
  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug);

  // Split content roughly in half for mid-article CTA
  const contentParts = splitContentAtMidpoint(post.content);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: '2026-03-01',
    dateModified: '2026-03-01',
    author: {
      '@type': 'Person',
      name: 'Alvaro Villena',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Villelabs',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icono.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
    keywords: post.keywords.join(', '),
  };

  return (
    <>
      {/* Article structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="pt-24 md:pt-32 pb-16 md:pb-24">
        {/* Header */}
        <motion.div
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Breadcrumb */}
          <motion.div variants={itemVariants} className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/40 text-sm hover:text-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.blogPost.backToBlog}
            </Link>
          </motion.div>

          {/* Meta */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 mb-6"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/25 text-accent text-xs uppercase tracking-wider font-medium">
              <Tag className="w-3 h-3" />
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-white/30 text-xs font-light">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
            <span className="inline-flex items-center gap-1.5 text-white/30 text-xs font-light">
              <Calendar className="w-3 h-3" />
              {post.date}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight mb-6"
          >
            {post.title}
          </motion.h1>

          {/* Excerpt */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-white/50 font-light leading-relaxed mb-12"
          >
            {post.excerpt}
          </motion.p>

          {/* Divider */}
          <motion.hr
            variants={itemVariants}
            className="border-white/[0.06] mb-12"
          />
        </motion.div>

        {/* Content - first half */}
        <motion.div
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: contentParts[0] }}
          />
        </motion.div>

        {/* Mid-article CTA */}
        <motion.div
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 my-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="p-6 md:p-8 rounded-xl border border-accent/15 bg-accent/[0.04]"
          >
            <p className="text-white text-base font-medium mb-2">
              {t.blogPost.needHelp}
            </p>
            <p className="text-white/40 text-sm font-light mb-5">
              {t.blogPost.needHelpDescription}
            </p>
            <a
              href={`https://wa.me/56920115198?text=${encodeURIComponent(language === 'es' ? 'Hola, leí tu blog y me gustaría hablar sobre mi sitio web.' : "Hi, I read your blog and I'd like to discuss my website.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent/90 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              {t.blogPost.bookFreeCall}
            </a>
          </motion.div>
        </motion.div>

        {/* Content - second half */}
        {contentParts[1] && (
          <motion.div
            className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            <motion.div
              variants={itemVariants}
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: contentParts[1] }}
            />
          </motion.div>
        )}

        {/* End CTA */}
        <motion.div
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="p-8 md:p-10 rounded-xl border border-white/[0.06] bg-white/[0.02] text-center"
          >
            <p className="text-white text-xl font-light mb-3">
              {t.blogPost.wantResults}
            </p>
            <p className="text-white/40 text-sm font-light mb-6 max-w-md mx-auto">
              {t.blogPost.wantResultsDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/56920115198?text=${encodeURIComponent(language === 'es' ? 'Hola, me gustaría un diagnóstico digital para mi sitio web.' : "Hi, I'd like a digital diagnostic for my website.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent/90 transition-colors"
              >
                {t.blogPost.getDiagnostic}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/10 text-white/60 text-sm font-medium rounded-lg hover:border-accent/30 hover:text-white transition-all"
              >
                {t.blogPost.contactUs}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <motion.div
            className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-16 border-t border-white/[0.06]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={containerVariants}
          >
            <motion.h3
              variants={itemVariants}
              className="text-xl font-light text-white mb-8"
            >
              {t.blogPost.moreArticles}
            </motion.h3>
            <div className="space-y-4">
              {relatedPosts.map((relatedPost) => (
                <motion.div key={relatedPost.slug} variants={itemVariants}>
                  <Link
                    href={`/blog/${relatedPost.slug}`}
                    className="group block p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-accent/20 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] uppercase tracking-wider font-medium">
                        {relatedPost.category}
                      </span>
                      <span className="text-white/25 text-xs font-light">
                        {relatedPost.readTime}
                      </span>
                    </div>
                    <h4 className="text-white text-base font-medium group-hover:text-accent transition-colors">
                      {relatedPost.title}
                    </h4>
                    <p className="text-white/40 text-sm font-light mt-1">
                      {relatedPost.excerpt}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </main>

      {/* Blog content styles */}
      <style jsx global>{`
        .blog-content h2 {
          color: #ededed;
          font-size: 1.5rem;
          font-weight: 300;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }
        .blog-content p {
          color: rgba(255, 255, 255, 0.5);
          font-size: 1rem;
          font-weight: 300;
          line-height: 1.8;
          margin-bottom: 1.25rem;
        }
        .blog-content ul {
          list-style: none;
          padding: 0;
          margin: 1.25rem 0;
        }
        .blog-content ul li {
          color: rgba(255, 255, 255, 0.5);
          font-size: 1rem;
          font-weight: 300;
          line-height: 1.8;
          padding-left: 1.5rem;
          position: relative;
          margin-bottom: 0.5rem;
        }
        .blog-content ul li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.75rem;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #2175a1;
          opacity: 0.6;
        }
        .blog-content strong {
          color: rgba(255, 255, 255, 0.7);
          font-weight: 500;
        }
        .blog-content a {
          color: #2175a1;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .blog-content a:hover {
          color: rgba(33, 117, 161, 0.8);
        }
        @media (min-width: 768px) {
          .blog-content h2 {
            font-size: 1.75rem;
          }
          .blog-content p,
          .blog-content ul li {
            font-size: 1.0625rem;
          }
        }
      `}</style>
    </>
  );
}

function splitContentAtMidpoint(html: string): [string, string] {
  const paragraphs = html.split(/(?=<(?:p|h2|h3|ul)[ >])/);
  const mid = Math.ceil(paragraphs.length / 2);
  const firstHalf = paragraphs.slice(0, mid).join('');
  const secondHalf = paragraphs.slice(mid).join('');
  return [firstHalf, secondHalf];
}
