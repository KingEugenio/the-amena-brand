import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { ImageWithSkeleton } from '../common/ImageWithSkeleton';
import { HeroSkeleton } from '../common/Skeletons';

export const HeroSection: React.FC = () => {
  const { settings, navigateTo, simulateLoading } = useSiteConfig();

  if (simulateLoading) {
    return <HeroSkeleton />;
  }

  // Curated flagship hero image: Ghanaian seaside bridal celebration in golden hour
  const heroImageSrc = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85';
  const heroThumbnail = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=200&q=40';

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-28 sm:pt-36 pb-12 sm:pb-16 px-6 sm:px-12 max-w-7xl mx-auto w-full">
      {/* Top Header Eyebrow & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-line)] pb-6 mb-8 sm:mb-12">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[var(--text-main)] font-mono">
            {settings.designBrandName} &bull; {settings.photographerName}
          </span>
        </div>
        <div className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] font-mono">
          {settings.availabilityStatus}
        </div>
      </div>

      {/* Hero Editorial Typography Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-12 sm:mb-16">
        <div className="lg:col-span-8 space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-editorial font-normal tracking-tight leading-[0.98] text-[var(--text-main)]">
            I create visuals that make people stop, look, and remember.
          </h1>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <p className="text-base sm:text-lg text-[var(--text-muted)] font-normal leading-relaxed">
            Graphic design, photography, and visual storytelling crafted to help brands, artists, organizations, and individuals communicate with impact.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigateTo('book')}
              className="text-xs uppercase tracking-[0.22em] font-semibold bg-[var(--text-main)] text-[var(--bg-base)] px-7 py-4 hover:opacity-90 transition-all cursor-pointer shadow-xs"
            >
              BOOK YOUR DATE
            </button>
            <button
              type="button"
              onClick={() => navigateTo('portfolio')}
              className="text-xs uppercase tracking-[0.22em] font-semibold border border-[var(--text-main)] text-[var(--text-main)] px-7 py-4 hover:bg-[var(--text-main)] hover:text-[var(--bg-base)] transition-all cursor-pointer"
            >
              VIEW PORTFOLIO
            </button>
          </div>
        </div>
      </div>

      {/* Hero Image Showcase (Optimized, responsive, priority loaded) */}
      <div className="relative w-full overflow-hidden shadow-sm">
        <ImageWithSkeleton
          src={heroImageSrc}
          thumbnail={heroThumbnail}
          alt="Bride and groom sharing quiet intimacy on the Atlantic coastline"
          caption="Ama & Kwame, Labadi Coastline Wedding"
          aspectRatio="landscape"
          containerClassName="w-full h-[380px] sm:h-[520px] md:h-[620px]"
          priority={true}
          hoverScale={true}
          onClick={() => navigateTo('portfolio', 'ama-and-kwame-accra-wedding')}
        />

        {/* Floating Editorial Photo Metadata Stamp */}
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-black/75 backdrop-blur-xs text-white px-4 py-2.5 text-[11px] font-mono tracking-wider flex items-center gap-4 z-10">
          <div>
            <span className="text-[#A3A3A3] block text-[9px] uppercase">Subject</span>
            Ama & Kwame &bull; Accra
          </div>
          <div className="hidden sm:block border-l border-white/20 pl-4">
            <span className="text-[#A3A3A3] block text-[9px] uppercase">Approach</span>
            Natural & Ambient Light
          </div>
        </div>
      </div>
    </section>
  );
};
