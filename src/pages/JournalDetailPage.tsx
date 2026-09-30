import React from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Buttons';
import {
  IconArrowLeft,
  IconArrowRight,
  IconShare,
  IconWhatsApp
} from '../components/icons/Icons';

interface JournalDetailPageProps {
  slug: string;
}

export const JournalDetailPage: React.FC<JournalDetailPageProps> = ({ slug }) => {
  const { data, navigateTo, openWhatsApp, showToast } = useApp();
  const { journal } = data;

  const post = journal.find((j) => j.slug === slug) || journal.find((j) => j.id === slug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="font-serif-heading text-3xl text-[#191816]">Article Not Found</h2>
        <p className="text-sm text-[#6B6862]">This journal dispatch may have been archived or unpublished.</p>
        <Button variant="primary" onClick={() => navigateTo('/journal')}>
          RETURN TO JOURNAL
        </Button>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${post.title} — THE AMENA BRAND`,
        text: post.excerpt,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article link copied to clipboard.');
    }
  };

  // Find next and prev posts
  const currentIndex = journal.findIndex((j) => j.id === post.id);
  const prevPost = currentIndex > 0 ? journal[currentIndex - 1] : null;
  const nextPost = currentIndex < journal.length - 1 ? journal[currentIndex + 1] : null;

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
      {/* Top Navigation */}
      <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-4 text-xs text-[#6B6862]">
        <button
          onClick={() => navigateTo('/journal')}
          className="inline-flex items-center gap-2 hover:text-[#191816] transition-colors cursor-pointer uppercase tracking-wider font-medium"
        >
          <IconArrowLeft size={14} />
          <span>Back to Journal Archive</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 hover:text-[#191816] transition-colors cursor-pointer uppercase tracking-wider"
        >
          <IconShare size={14} />
          <span>Share Dispatch</span>
        </button>
      </div>

      {/* Header Info */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-3 text-xs text-[#6B6862] uppercase tracking-[0.2em]">
          <span className="text-[#9A5B32] font-semibold">{post.category}</span>
          <span>•</span>
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readingTimeMinutes || 4} min read</span>
        </div>

        <h1 className="font-serif-heading text-3xl sm:text-5xl text-[#191816] leading-tight">
          {post.title}
        </h1>

        <p className="font-serif-heading italic text-lg sm:text-xl text-[#6B6862] leading-relaxed">
          "{post.excerpt}"
        </p>

        <div className="pt-2 text-xs uppercase tracking-wider text-[#6B6862]">
          Words by <strong>{post.author || 'THE AMENA BRAND STUDIO'}</strong> • Accra
        </div>
      </div>

      {/* Hero Cover Image */}
      <div className="aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-[#F3F1EB] border border-[#E5E1D8]">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="max-w-2xl mx-auto space-y-6 pt-6">
        <div className="font-serif-heading text-lg sm:text-xl text-[#191816] leading-relaxed font-normal whitespace-pre-line space-y-4">
          {post.content || post.bodyContent}
        </div>
      </div>

      {/* Author & Discussion Box */}
      <div className="max-w-2xl mx-auto p-8 bg-[#F3F1EB] border border-[#E5E1D8] space-y-4">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#9A5B32] font-semibold block">
          STUDIO DIALOGUE
        </span>
        <h4 className="font-serif-heading text-xl text-[#191816]">
          Interested in the pieces featured in this story?
        </h4>
        <p className="text-xs text-[#6B6862] leading-relaxed">
          Direct questions, bespoke fitting schedules, or textile inquiries can be discussed with our studio team on WhatsApp.
        </p>
        <div className="pt-2">
          <button
            onClick={() => openWhatsApp('custom', `Regarding Journal Article: ${post.title}`)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#191816] text-[#FAF9F5] hover:bg-[#2C2926] text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer"
          >
            <IconWhatsApp size={16} className="text-[#25D366]" />
            <span>DISCUSS ON WHATSAPP</span>
          </button>
        </div>
      </div>

      {/* Next / Previous Article Bar */}
      <div className="border-t border-[#E5E1D8] pt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {prevPost ? (
          <button
            onClick={() => navigateTo(`/journal/${prevPost.slug}`)}
            className="text-left group cursor-pointer p-4 border border-[#E5E1D8] hover:border-[#191816] transition-colors"
          >
            <span className="text-[10px] uppercase tracking-wider text-[#6B6862] block mb-1">
              ← PREVIOUS DISPATCH
            </span>
            <h5 className="font-serif-heading text-base text-[#191816] group-hover:text-[#9A5B32] transition-colors line-clamp-1">
              {prevPost.title}
            </h5>
          </button>
        ) : <div />}

        {nextPost && (
          <button
            onClick={() => navigateTo(`/journal/${nextPost.slug}`)}
            className="text-right group cursor-pointer p-4 border border-[#E5E1D8] hover:border-[#191816] transition-colors sm:col-start-2"
          >
            <span className="text-[10px] uppercase tracking-wider text-[#6B6862] block mb-1">
              NEXT DISPATCH →
            </span>
            <h5 className="font-serif-heading text-base text-[#191816] group-hover:text-[#9A5B32] transition-colors line-clamp-1">
              {nextPost.title}
            </h5>
          </button>
        )}
      </div>
    </article>
  );
};
