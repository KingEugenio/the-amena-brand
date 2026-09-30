import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Share2, Check } from 'lucide-react';
import { portfolioProjects } from '../../data/siteContent';
import { ImageWithSkeleton } from '../common/ImageWithSkeleton';
import { Lightbox } from '../common/Lightbox';
import { ProjectSkeleton } from '../common/Skeletons';
import { useSiteConfig } from '../../context/SiteConfigContext';

interface ProjectDetailViewProps {
  projectSlug?: string;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({ projectSlug }) => {
  const { navigateTo, simulateLoading, settings } = useSiteConfig();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [copiedShare, setCopiedShare] = useState(false);

  if (simulateLoading) {
    return <ProjectSkeleton />;
  }

  // Find project by slug or fallback to first
  const projectIndex = portfolioProjects.findIndex((p) => p.slug === projectSlug);
  const currentProject = projectIndex !== -1 ? portfolioProjects[projectIndex] : portfolioProjects[0];

  // Prev / Next logic
  const prevProject = projectIndex > 0 ? portfolioProjects[projectIndex - 1] : portfolioProjects[portfolioProjects.length - 1];
  const nextProject = projectIndex < portfolioProjects.length - 1 ? portfolioProjects[projectIndex + 1] : portfolioProjects[0];

  // Combine cover and gallery images for the full lightbox sequence
  const allImages = [currentProject.coverImage, ...currentProject.gallery];

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 px-6 sm:px-12 max-w-7xl mx-auto w-full">
      {/* Back button & Category Tag */}
      <div className="flex items-center justify-between pb-8 border-b border-[var(--border-line)] mb-12">
        <button
          type="button"
          onClick={() => navigateTo('portfolio')}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors cursor-pointer"
        >
          <ChevronLeft size={16} />
          <span>Back to Portfolio</span>
        </button>

        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={handleShare}
            className="text-xs uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text-main)] inline-flex items-center gap-1.5 cursor-pointer font-mono"
          >
            {copiedShare ? <Check size={14} className="text-[var(--primary-accent)]" /> : <Share2 size={14} />}
            <span>{copiedShare ? 'Link Copied' : 'Share Story'}</span>
          </button>
        </div>
      </div>

      {/* Editorial Story Header */}
      <header className="max-w-4xl mx-auto text-center space-y-4 mb-16">
        <div className="text-xs uppercase tracking-[0.3em] font-mono text-[var(--text-muted)]">
          {currentProject.categoryLabel} &bull; {currentProject.location}
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-normal leading-[1.05] text-[var(--text-main)]">
          {currentProject.title}
        </h1>
        {currentProject.subtitle && (
          <p className="text-lg sm:text-xl font-editorial italic text-[var(--text-muted)] font-normal">
            {currentProject.subtitle}
          </p>
        )}
      </header>

      {/* Flagship Hero Cover Photo */}
      <div className="mb-16">
        <ImageWithSkeleton
          src={currentProject.coverImage.src}
          thumbnail={currentProject.coverImage.thumbnail}
          alt={currentProject.coverImage.alt}
          caption={currentProject.coverImage.caption}
          aspectRatio="landscape"
          containerClassName="w-full h-[450px] sm:h-[650px]"
          priority={true}
          onClick={() => handleOpenLightbox(0)}
          hoverScale={true}
        />
      </div>

      {/* Story Narrative & Metadata Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 py-12 border-y border-[var(--border-line)] mb-20">
        {/* Project Meta & Team Credits */}
        <div className="lg:col-span-4 space-y-8 font-mono text-xs text-[var(--text-muted)]">
          <div>
            <span className="block text-[10px] uppercase tracking-widest text-[var(--text-main)] font-bold mb-1">
              Location
            </span>
            <p className="text-sm font-sans text-[var(--text-main)]">{currentProject.location}</p>
          </div>

          <div>
            <span className="block text-[10px] uppercase tracking-widest text-[var(--text-main)] font-bold mb-1">
              Date & Year
            </span>
            <p className="text-sm font-sans text-[var(--text-main)]">{currentProject.date}</p>
          </div>

          {currentProject.client && (
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-[var(--text-main)] font-bold mb-1">
                Client / Commission
              </span>
              <p className="text-sm font-sans text-[var(--text-main)]">{currentProject.client}</p>
            </div>
          )}

          {currentProject.credits && (
            <div className="pt-4 border-t border-[var(--border-line)] space-y-2">
              <span className="block text-[10px] uppercase tracking-widest text-[var(--text-main)] font-bold mb-2">
                Creative Team & Credits
              </span>
              {currentProject.credits.map((credit, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>{credit.role}</span>
                  <span className="text-[var(--text-main)] font-sans">{credit.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Narrative Paragraphs */}
        <div className="lg:col-span-8 space-y-6 text-base sm:text-lg text-[var(--text-main)] font-normal leading-relaxed">
          <p className="font-normal text-xl sm:text-2xl font-editorial leading-snug">
            {currentProject.description}
          </p>
          {currentProject.storyParagraphs.map((para, idx) => (
            <p key={idx} className="text-[var(--text-muted)]">
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* Full Editorial Gallery Flow */}
      <div className="space-y-12 mb-24">
        <h2 className="text-2xl sm:text-3xl font-editorial font-normal text-[var(--text-main)] border-b border-[var(--border-line)] pb-4">
          Visual Record &bull; {currentProject.gallery.length + 1} Photographs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {currentProject.gallery.map((img, idx) => {
            // Asymmetric rhythm
            const span = idx % 3 === 0 ? 'md:col-span-12' : idx % 3 === 1 ? 'md:col-span-5' : 'md:col-span-7';

            return (
              <div
                key={img.id}
                className={`${span} group cursor-pointer`}
                onClick={() => handleOpenLightbox(idx + 1)}
              >
                <ImageWithSkeleton
                  src={img.src}
                  alt={img.alt}
                  caption={img.caption}
                  aspectRatio={img.aspectRatio}
                  containerClassName="w-full h-full min-h-[360px] max-h-[700px]"
                  hoverScale={true}
                />
                {img.caption && (
                  <p className="text-xs text-[var(--text-muted)] mt-2 font-normal italic">
                    {img.caption}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Testimonial if available */}
      {currentProject.testimonial && (
        <div className="my-20 bg-[var(--card-bg)] border border-[var(--border-line)] p-8 sm:p-14 text-center max-w-3xl mx-auto space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] text-[var(--primary-accent)] font-mono block">
            From the Client
          </span>
          <blockquote className="text-xl sm:text-2xl font-editorial font-normal leading-relaxed text-[var(--text-main)]">
            &ldquo;{currentProject.testimonial.quote}&rdquo;
          </blockquote>
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">
            {currentProject.testimonial.clientName} &bull; {currentProject.testimonial.relation}
          </div>
        </div>
      )}

      {/* Bottom Project Navigation (Section 13) */}
      <nav className="border-t border-b border-[var(--border-line)] py-10 my-16 grid grid-cols-3 items-center text-xs uppercase tracking-[0.2em] font-medium" aria-label="Project story pagination">
        <button
          type="button"
          onClick={() => navigateTo('portfolio', prevProject.slug)}
          className="text-left text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors inline-flex items-center gap-2 cursor-pointer"
        >
          <ChevronLeft size={14} />
          <span className="hidden sm:inline">Previous: {prevProject.title}</span>
          <span className="sm:hidden">Prev</span>
        </button>

        <button
          type="button"
          onClick={() => navigateTo('portfolio')}
          className="text-center text-[var(--text-main)] hover:text-[var(--primary-accent)] transition-colors cursor-pointer"
        >
          View All Work
        </button>

        <button
          type="button"
          onClick={() => navigateTo('portfolio', nextProject.slug)}
          className="text-right text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors inline-flex items-center justify-end gap-2 cursor-pointer"
        >
          <span className="hidden sm:inline">Next: {nextProject.title}</span>
          <span className="sm:hidden">Next</span>
          <ChevronRight size={14} />
        </button>
      </nav>

      {/* Final Commission Call to Action */}
      <div className="bg-[var(--card-bg)] border border-[var(--border-line)] p-10 sm:p-16 text-center max-w-2xl mx-auto space-y-6">
        <span className="text-xs uppercase font-mono tracking-widest text-[var(--text-muted)]">
          Commission a Similar Story
        </span>
        <h3 className="text-3xl sm:text-4xl font-editorial font-normal text-[var(--text-main)]">
          Planning something worth remembering?
        </h3>
        <p className="text-sm text-[var(--text-muted)] font-normal leading-relaxed">
          We accept a strictly limited number of commissions each season to ensure absolute focus.
        </p>
        <button
          type="button"
          onClick={() => navigateTo('book')}
          className="text-xs uppercase tracking-[0.25em] font-semibold bg-[var(--text-main)] text-[var(--bg-base)] px-8 py-4 hover:opacity-90 transition-all cursor-pointer shadow-xs"
        >
          BOOK YOUR DATE
        </button>
      </div>

      {/* Fullscreen Lightbox for Project Photos */}
      <Lightbox
        images={allImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setLightboxIndex}
        photographerName={settings.photographerName}
      />
    </div>
  );
};
