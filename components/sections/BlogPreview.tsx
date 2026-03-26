'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import { blogPosts } from '@/lib/blog-posts';
import { useTranslation } from '@/lib/i18n';

const EASE_SMOOTH = [0.6, -0.05, 0.01, 0.99] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_SMOOTH },
  },
};

export default function BlogPreview() {
  const { t, language } = useTranslation();

  const publishedPosts = blogPosts
    .filter((p) => p.language === language)
    .map((p) => ({
      title: p.title,
      excerpt: p.excerpt,
      date: p.date,
      slug: `/blog/${p.slug}`,
      category: p.category,
      readTime: p.readTime,
    }));

  const upcomingPosts = [
    {
      title: t.blogPreview.upcomingTitle,
      excerpt: t.blogPreview.upcomingExcerpt,
      date: t.blogPreview.comingSoon,
      slug: '/blog',
      category: t.blogPreview.upcomingCategory,
      readTime: '',
    },
  ];

  const posts = [...publishedPosts, ...upcomingPosts].slice(0, 3);

  return (
    <motion.section
      className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative bg-slate-950/50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4">
            {t.blogPreview.label}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white">
            {t.blogPreview.heading}
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-6"
        >
          {posts.map((post) => (
            <motion.article
              key={post.title}
              variants={itemVariants}
            >
              <Link
                href={post.slug}
                className="group block p-6 md:p-8 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-accent/20 transition-all duration-300"
              >
                {/* Meta */}
                <div className="flex items-center gap-3 mb-4">
                  {post.category && (
                    <span className="px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] uppercase tracking-wider font-medium">
                      {post.category}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 text-white/30 text-xs font-light">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-white text-base font-medium mb-3 leading-snug group-hover:text-accent transition-colors duration-300">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-white/40 text-sm font-light leading-relaxed mb-6">
                  {post.excerpt}
                </p>

                {/* Read more */}
                <span className="inline-flex items-center gap-1.5 text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {t.blogPreview.readMore}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:text-accent/80 transition-colors group"
          >
            {t.blogPreview.ctaLink}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
