import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { SectionHeading } from '../components/common/SectionHeading';
import { IconArrowRight } from '../components/icons/Icons';

export const JournalPage: React.FC = () => {
  const { data, navigateTo } = useApp();
  const { journal } = data;

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const set = new Set<string>();
    journal.forEach((j) => {
      if (j.category) set.add(j.category);
    });
    return Array.from(set);
  }, [journal]);

  const filteredPosts = useMemo(() => {
    return journal.filter((post) => {
      if (selectedCategory !== 'all' && post.category !== selectedCategory) return false;
      return true;
    });
  }, [journal, selectedCategory]);

  const featuredPost = journal.find((j) => j.featured) || journal[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-16 sm:space-y-24">
      {/* Header */}
      <div className="max-w-3xl space-y-4 border-b border-[#E5E1D8] pb-10">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#9A5B32] font-semibold block font-sans">
          THE STUDIO JOURNAL
        </span>
        <h1 className="font-serif-heading text-3xl sm:text-5xl md:text-6xl text-[#191816] tracking-tight leading-[1.12]">
          Stories, Materiality & Dispatches
        </h1>
        <p className="text-base text-[#6B6862] leading-relaxed font-sans font-light">
          Editorial reflections on contemporary Ghanaian lifestyle culture, drapery experiments, behind-the-scenes fitting sessions, and conversations from Accra.
        </p>
      </div>

      {/* Hero Featured Story */}
      {featuredPost && (
        <article
          onClick={() => navigateTo(`/journal/${featuredPost.slug}`)}
          className="group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#F3F1EB] border border-[#E5E1D8] p-6 sm:p-8 lg:p-12"
        >
          <div className="lg:col-span-7 aspect-[16/10] overflow-hidden bg-[#FAF9F5] border border-[#E5E1D8]">
            <img
              src={featuredPost.coverImage}
              alt={featuredPost.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3 text-xs text-[#6B6862]">
              <span className="bg-[#191816] text-[#FAF9F5] text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 font-medium font-sans">
                {featuredPost.category}
              </span>
              <span>{featuredPost.date}</span>
              <span>•</span>
              <span>{featuredPost.readingTimeMinutes || 4} min read</span>
            </div>
            <h2 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl text-[#191816] group-hover:text-[#9A5B32] transition-colors leading-tight">
              {featuredPost.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6862] leading-relaxed font-sans font-light">
              {featuredPost.excerpt}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-[#191816] group-hover:translate-x-1 transition-transform">
              <span>Read Full Article</span>
              <IconArrowRight size={14} />
            </div>
          </div>
        </article>
      )}

      {/* Category filter tabs */}
      {categories.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E5E1D8]">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`text-xs uppercase tracking-widest px-4 py-2 border transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#191816] text-[#FAF9F5] border-[#191816]'
                : 'text-[#6B6862] border-[#E5E1D8] hover:text-[#191816]'
            }`}
          >
            All Dispatches
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs uppercase tracking-widest px-4 py-2 border transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#191816] text-[#FAF9F5] border-[#191816]'
                  : 'text-[#6B6862] border-[#E5E1D8] hover:text-[#191816]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Stories Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => navigateTo(`/journal/${post.slug}`)}
              className="group cursor-pointer flex flex-col space-y-4"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#F3F1EB] border border-[#E5E1D8]">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#6B6862]">
                  <span className="uppercase tracking-wider text-[#9A5B32]">{post.category}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="font-serif-heading text-xl text-[#191816] group-hover:text-[#9A5B32] transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-[#6B6862] leading-relaxed line-clamp-2 font-sans font-light">
                  {post.excerpt}
                </p>
                <div className="pt-1 flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium text-[#191816] group-hover:translate-x-1 transition-transform">
                  <span>Read Story</span>
                  <IconArrowRight size={13} />
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#F3F1EB] border border-[#E5E1D8] p-8 space-y-2">
          <h3 className="font-serif-heading text-xl text-[#191816]">Stories are coming soon.</h3>
          <p className="text-xs text-[#6B6862]">Our editorial team is crafting new dispatches from Accra.</p>
        </div>
      )}
    </div>
  );
};
