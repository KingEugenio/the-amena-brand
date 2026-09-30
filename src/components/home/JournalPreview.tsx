import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { journalPosts } from '../../data/siteContent';
import { SectionHeading } from '../common/SectionHeading';
import { ImageWithSkeleton } from '../common/ImageWithSkeleton';
import { BlogCardSkeleton } from '../common/Skeletons';

export const JournalPreview: React.FC = () => {
  const { navigateTo, simulateLoading } = useSiteConfig();

  if (simulateLoading) {
    return (
      <div className="py-24 max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <BlogCardSkeleton />
        <BlogCardSkeleton />
        <BlogCardSkeleton />
      </div>
    );
  }

  return (
    <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto w-full border-t border-[var(--border-line)]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
        <SectionHeading
          label="The Studio Journal"
          title="Essays & Notes"
          subtitle="Thoughts on light, intentional wedding timelines, and the preservation of personal heritage."
          className="mb-0"
        />

        <button
          type="button"
          onClick={() => navigateTo('journal')}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-semibold text-[var(--text-main)] border-b border-[var(--text-main)] pb-1 hover:text-[var(--primary-accent)] hover:border-[var(--primary-accent)] transition-colors cursor-pointer w-fit"
        >
          <span>Read All Entries</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {journalPosts.map((post) => (
          <article
            key={post.id}
            className="group cursor-pointer flex flex-col justify-between"
            onClick={() => navigateTo('journal', post.slug)}
          >
            <div>
              <ImageWithSkeleton
                src={post.coverImage}
                alt={post.title}
                aspectRatio="landscape"
                containerClassName="w-full h-64 mb-5"
                hoverScale={true}
              />
              <div className="flex items-center justify-between text-[11px] uppercase tracking-wider font-mono text-[var(--text-muted)] mb-2">
                <span>{post.category}</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-editorial font-normal text-[var(--text-main)] group-hover:text-[var(--primary-accent)] transition-colors line-clamp-2 leading-snug">
                {post.title}
              </h3>
              <p className="mt-3 text-sm text-[var(--text-muted)] font-normal line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-5 mt-6 border-t border-[var(--border-line)] flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
              <span>{post.date}</span>
              <span className="text-[var(--text-main)] font-medium group-hover:translate-x-1 transition-transform">
                Read Story &rarr;
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
