import React, { useState } from 'react';
import { ArrowLeft, ChevronLeft } from 'lucide-react';
import { journalPosts } from '../../data/siteContent';
import { ImageWithSkeleton } from '../common/ImageWithSkeleton';
import { BlogCardSkeleton } from '../common/Skeletons';
import { useSiteConfig } from '../../context/SiteConfigContext';

interface JournalViewProps {
  postSlug?: string;
}

export const JournalView: React.FC<JournalViewProps> = ({ postSlug }) => {
  const { navigateTo, simulateLoading } = useSiteConfig();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (simulateLoading) {
    return (
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <BlogCardSkeleton />
        <BlogCardSkeleton />
        <BlogCardSkeleton />
      </div>
    );
  }

  // If viewing single post
  if (postSlug) {
    const post = journalPosts.find((p) => p.slug === postSlug) || journalPosts[0];

    return (
      <article className="pt-28 sm:pt-36 pb-24 px-6 sm:px-12 max-w-4xl mx-auto w-full">
        {/* Back Link */}
        <div className="pb-8 border-b border-[var(--border-line)] mb-12">
          <button
            type="button"
            onClick={() => navigateTo('journal')}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors cursor-pointer font-mono"
          >
            <ChevronLeft size={16} />
            <span>Back to All Journal Entries</span>
          </button>
        </div>

        {/* Post Header */}
        <header className="space-y-4 mb-12 text-center">
          <div className="text-xs uppercase tracking-[0.25em] font-mono text-[var(--text-muted)]">
            {post.category} &bull; {post.readTime}
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-editorial font-normal leading-tight text-[var(--text-main)]">
            {post.title}
          </h1>
          <div className="text-xs uppercase font-mono tracking-widest text-[var(--text-muted)] pt-2">
            By {post.author} &bull; {post.date}
          </div>
        </header>

        {/* Hero Image */}
        <div className="mb-12">
          <ImageWithSkeleton
            src={post.coverImage}
            alt={post.title}
            aspectRatio="landscape"
            containerClassName="w-full h-[380px] sm:h-[500px]"
            priority={true}
          />
        </div>

        {/* Article Body */}
        <div className="space-y-6 text-base sm:text-lg text-[var(--text-main)] font-normal leading-relaxed border-b border-[var(--border-line)] pb-16">
          <p className="font-normal text-xl sm:text-2xl font-editorial text-[var(--text-main)] leading-snug">
            {post.excerpt}
          </p>
          {post.contentParagraphs.map((para, i) => (
            <p key={i} className="text-[var(--text-muted)]">
              {para}
            </p>
          ))}
        </div>

        {/* Next Read Suggestion */}
        <div className="pt-12 flex justify-between items-center text-xs uppercase tracking-widest font-mono">
          <button
            type="button"
            onClick={() => navigateTo('journal')}
            className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors cursor-pointer"
          >
            &larr; Back to Journal
          </button>
          <button
            type="button"
            onClick={() => navigateTo('book')}
            className="bg-[var(--text-main)] text-[var(--bg-base)] px-5 py-2.5 hover:opacity-90 transition-opacity cursor-pointer"
          >
            Book Session
          </button>
        </div>
      </article>
    );
  }

  // Listing View
  const categories = ['All', 'Wedding Stories', 'Photography Tips', 'Photography Education'];
  const filteredPosts =
    selectedCategory === 'All'
      ? journalPosts
      : journalPosts.filter((p) => p.category === selectedCategory);

  return (
    <div className="pt-28 sm:pt-36 pb-24 px-6 sm:px-12 max-w-7xl mx-auto w-full">
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
        <span className="text-xs uppercase tracking-[0.25em] text-[var(--text-muted)] font-mono block">
          Thoughts, Essays & Guides
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-normal text-[var(--text-main)]">
          The Journal
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-muted)] font-normal leading-relaxed">
          Observations on photographic craft, advice for couples planning their timeline, and notes from travels across West Africa.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 pb-12 mb-12 border-b border-[var(--border-line)]">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs uppercase tracking-[0.2em] px-4 py-2 transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'text-[var(--text-main)] font-semibold border-b-2 border-[var(--text-main)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {filteredPosts.map((post) => (
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
              <h2 className="text-2xl font-editorial font-normal text-[var(--text-main)] group-hover:text-[var(--primary-accent)] transition-colors leading-snug">
                {post.title}
              </h2>
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
    </div>
  );
};
