import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { ImageWithSkeleton } from '../common/ImageWithSkeleton';
import { AboutSkeleton } from '../common/Skeletons';

export const AboutPreview: React.FC = () => {
  const { settings, navigateTo, simulateLoading } = useSiteConfig();

  if (simulateLoading) {
    return <AboutSkeleton />;
  }

  const portraitUrl = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=85';

  return (
    <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto w-full border-t border-[var(--border-line)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Editorial Photographer Portrait */}
        <div className="lg:col-span-5">
          <div className="relative">
            <ImageWithSkeleton
              src={portraitUrl}
              alt={`${settings.fullName} (${settings.photographerName})`}
              aspectRatio="portrait"
              containerClassName="w-full h-[460px] sm:h-[560px]"
              caption={`${settings.fullName} &bull; ${settings.photographerName}.`}
              hoverScale={false}
            />
            <div className="absolute -bottom-4 -right-4 bg-[var(--card-bg)] border border-[var(--border-line)] p-4 text-[10px] uppercase font-mono tracking-widest text-[var(--text-muted)] hidden sm:block">
              {settings.fullName} &bull; {settings.photographerName}
            </div>
          </div>
        </div>

        {/* Narrative & Philosophy */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[var(--text-muted)] font-mono">
              Introduction &bull; Frederick Akwafo
            </span>
            <span className="text-[11px] font-mono text-[var(--text-muted)]">&bull;</span>
            <a
              href="https://www.instagram.com/freddie.design_palace?stkn=amVhNXdia29iejVj"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--text-main)] font-semibold border-b border-[var(--text-main)] hover:text-[var(--primary-accent)] transition-colors"
            >
              <span>FREDDIE DESIGN PALACE</span>
              <ArrowUpRight size={13} />
            </a>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-editorial font-normal leading-[1.25] text-[var(--text-main)]">
            &ldquo;I’m Frederick Akwafo, a creative designer and photographer passionate about turning ideas into visuals that communicate clearly and connect with people.&rdquo;
          </h2>

          <div className="space-y-4 text-base sm:text-lg text-[var(--text-muted)] font-normal leading-relaxed">
            <p>
              From brand visuals and campaign designs to portraits, events, and creative projects, I combine design, photography, and storytelling to create work that feels intentional, engaging, and memorable.
            </p>
            <p className="text-sm">
              Through <strong>FREDDIE DESIGN PALACE</strong> and <strong>FREDDIE SHOT IT</strong>, I partner with brands, artists, organizations, and individuals across Ghana and worldwide to translate ideas and values into timeless visual impact.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => navigateTo('about')}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-semibold text-[var(--text-main)] border-b border-[var(--text-main)] pb-1 hover:text-[var(--primary-accent)] hover:border-[var(--primary-accent)] transition-colors cursor-pointer"
            >
              <span>Read Full Artist Story</span>
              <ArrowUpRight size={14} />
            </button>
            <span className="text-xs font-mono text-[var(--text-muted)]/50">|</span>
            <button
              type="button"
              onClick={() => navigateTo('book')}
              className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors cursor-pointer"
            >
              Book Graphic Design & Photography &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
