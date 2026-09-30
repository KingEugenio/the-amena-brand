import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { portfolioProjects } from '../../data/siteContent';
import { ImageWithSkeleton } from '../common/ImageWithSkeleton';
import { SectionHeading } from '../common/SectionHeading';
import { PortfolioGridSkeleton } from '../common/Skeletons';

export const FeaturedWork: React.FC = () => {
  const { navigateTo, simulateLoading } = useSiteConfig();

  if (simulateLoading) {
    return <PortfolioGridSkeleton />;
  }

  const featured = portfolioProjects.filter((p) => p.featured);

  return (
    <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto w-full border-t border-[var(--border-line)]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
        <SectionHeading
          label="Selected Works"
          title="Curated Stories"
          subtitle="An ongoing archive of quiet intimacies, ceremonial warmth, and sculptural portraiture."
          className="mb-0"
        />

        <button
          type="button"
          onClick={() => navigateTo('portfolio')}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-semibold text-[var(--text-main)] border-b border-[var(--text-main)] pb-1 hover:text-[var(--primary-accent)] hover:border-[var(--primary-accent)] transition-colors cursor-pointer w-fit"
        >
          <span>View All Work ({portfolioProjects.length})</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

      {/* Asymmetric Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14">
        {/* Project 1: Large Span */}
        {featured[0] && (
          <article
            className="md:col-span-8 group cursor-pointer"
            onClick={() => navigateTo('portfolio', featured[0].slug)}
          >
            <div className="relative overflow-hidden">
              <ImageWithSkeleton
                src={featured[0].coverImage.src}
                thumbnail={featured[0].coverImage.thumbnail}
                alt={featured[0].coverImage.alt}
                aspectRatio="landscape"
                containerClassName="w-full h-[400px] sm:h-[500px]"
                hoverScale={true}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>

            <div className="mt-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)] font-mono block">
                  {featured[0].categoryLabel} &bull; {featured[0].location}
                </span>
                <h3 className="text-2xl sm:text-3xl font-editorial font-normal text-[var(--text-main)] mt-1 group-hover:text-[var(--primary-accent)] transition-colors">
                  {featured[0].title}
                </h3>
              </div>
              <span className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-mono">
                {featured[0].year}
              </span>
            </div>
          </article>
        )}

        {/* Project 2: Portrait Span */}
        {featured[1] && (
          <article
            className="md:col-span-4 group cursor-pointer md:pt-16"
            onClick={() => navigateTo('portfolio', featured[1].slug)}
          >
            <div className="relative overflow-hidden">
              <ImageWithSkeleton
                src={featured[1].coverImage.src}
                thumbnail={featured[1].coverImage.thumbnail}
                alt={featured[1].coverImage.alt}
                aspectRatio="portrait"
                containerClassName="w-full h-[420px] sm:h-[520px]"
                hoverScale={true}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>

            <div className="mt-5">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)] font-mono block">
                {featured[1].categoryLabel} &bull; {featured[1].location}
              </span>
              <h3 className="text-2xl sm:text-3xl font-editorial font-normal text-[var(--text-main)] mt-1 group-hover:text-[var(--primary-accent)] transition-colors">
                {featured[1].title}
              </h3>
            </div>
          </article>
        )}

        {/* Project 3: Tall Vertical Study */}
        {featured[2] && (
          <article
            className="md:col-span-5 group cursor-pointer"
            onClick={() => navigateTo('portfolio', featured[2].slug)}
          >
            <div className="relative overflow-hidden">
              <ImageWithSkeleton
                src={featured[2].coverImage.src}
                thumbnail={featured[2].coverImage.thumbnail}
                alt={featured[2].coverImage.alt}
                aspectRatio="portrait"
                containerClassName="w-full h-[400px] sm:h-[480px]"
                hoverScale={true}
              />
            </div>

            <div className="mt-5">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)] font-mono block">
                {featured[2].categoryLabel} &bull; {featured[2].location}
              </span>
              <h3 className="text-2xl sm:text-3xl font-editorial font-normal text-[var(--text-main)] mt-1 group-hover:text-[var(--primary-accent)] transition-colors">
                {featured[2].title}
              </h3>
            </div>
          </article>
        )}

        {/* Project 4: Wide Landscape Balance */}
        {featured[3] && (
          <article
            className="md:col-span-7 group cursor-pointer"
            onClick={() => navigateTo('portfolio', featured[3].slug)}
          >
            <div className="relative overflow-hidden">
              <ImageWithSkeleton
                src={featured[3].coverImage.src}
                thumbnail={featured[3].coverImage.thumbnail}
                alt={featured[3].coverImage.alt}
                aspectRatio="landscape"
                containerClassName="w-full h-[400px] sm:h-[480px]"
                hoverScale={true}
              />
            </div>

            <div className="mt-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)] font-mono block">
                  {featured[3].categoryLabel} &bull; {featured[3].location}
                </span>
                <h3 className="text-2xl sm:text-3xl font-editorial font-normal text-[var(--text-main)] mt-1 group-hover:text-[var(--primary-accent)] transition-colors">
                  {featured[3].title}
                </h3>
              </div>
              <span className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-mono">
                {featured[3].year}
              </span>
            </div>
          </article>
        )}
      </div>
    </section>
  );
};
