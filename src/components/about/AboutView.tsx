import React from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { ImageWithSkeleton } from '../common/ImageWithSkeleton';
import { SectionHeading } from '../common/SectionHeading';
import { AboutSkeleton } from '../common/Skeletons';
import { verifiedStats, publicationsAndBrands, officialAffiliations } from '../../data/siteContent';

export const AboutView: React.FC = () => {
  const { settings, navigateTo, simulateLoading } = useSiteConfig();

  if (simulateLoading) {
    return <AboutSkeleton />;
  }

  const portraitUrl = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=85';
  const studioStill = 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1200&q=85';

  return (
    <div className="pt-28 sm:pt-36 pb-24 px-6 sm:px-12 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
        <span className="text-xs uppercase tracking-[0.25em] text-[var(--text-muted)] font-mono block">
          Introduction &bull; Frederick Akwafo
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-normal text-[var(--text-main)]">
          FREDDIE DESIGN PALACE &bull; FREDDIE SHOT IT
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-muted)] font-normal leading-relaxed">
          I create visuals that make people stop, look, and remember. Graphic design, photography, and visual storytelling crafted to help brands, artists, organizations, and individuals communicate with impact.
        </p>
      </div>

      {/* Main Grid: Portrait and Personal Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-24">
        <div className="lg:col-span-5 space-y-6">
          <ImageWithSkeleton
            src={portraitUrl}
            alt={`${settings.fullName} (${settings.designBrandName} & ${settings.photographerName})`}
            aspectRatio="portrait"
            containerClassName="w-full h-[520px] sm:h-[620px]"
            priority={true}
          />
          <div className="border border-[var(--border-line)] bg-[var(--card-bg)] p-6 text-xs font-mono text-[var(--text-muted)] space-y-2.5">
            <div className="flex justify-between">
              <span className="uppercase text-[var(--text-main)] font-bold">Creative:</span>
              <span>{settings.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="uppercase text-[var(--text-main)] font-bold">Graphic Design:</span>
              <a href={settings.designInstagramUrl} target="_blank" rel="noreferrer" className="text-[var(--primary-accent)] hover:underline inline-flex items-center gap-1">
                <span>{settings.designBrandName}</span>
                <ExternalLink size={10} />
              </a>
            </div>
            <div className="flex justify-between">
              <span className="uppercase text-[var(--text-main)] font-bold">Photography:</span>
              <a href={settings.instagramUrl} target="_blank" rel="noreferrer" className="text-[var(--primary-accent)] hover:underline inline-flex items-center gap-1">
                <span>{settings.photographerName}</span>
                <ExternalLink size={10} />
              </a>
            </div>
            <div className="flex justify-between">
              <span className="uppercase text-[var(--text-main)] font-bold">Studio Base:</span>
              <span>{settings.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="uppercase text-[var(--text-main)] font-bold">Weddings:</span>
              <a href={settings.weddingInstagramUrl} target="_blank" rel="noreferrer" className="text-[var(--primary-accent)] hover:underline inline-flex items-center gap-1">
                <span>{settings.weddingInstagramHandle}</span>
                <ExternalLink size={10} />
              </a>
            </div>
            <div className="flex justify-between">
              <span className="uppercase text-[var(--text-main)] font-bold">Archive:</span>
              <a href={settings.behanceUrl} target="_blank" rel="noreferrer" className="text-[var(--primary-accent)] hover:underline inline-flex items-center gap-1">
                <span>Behance Profile</span>
                <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-8 text-base sm:text-lg text-[var(--text-main)] font-normal leading-relaxed">
          <h2 className="text-3xl sm:text-4xl font-editorial font-normal leading-tight">
            &ldquo;I’m Frederick Akwafo, a creative designer and photographer passionate about turning ideas into visuals that communicate clearly and connect with people.&rdquo;
          </h2>

          <p className="text-[var(--text-muted)]">
            From brand visuals and campaign designs to portraits, events, and creative projects, I combine design, photography, and storytelling to create work that feels intentional, engaging, and memorable.
          </p>

          {/* Featured Brand Callout: FREDDIE DESIGN PALACE */}
          <div className="p-6 sm:p-8 bg-[var(--card-bg)] border border-[var(--border-line)] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono tracking-widest text-[var(--primary-accent)] font-semibold">
                Featured Practice &bull; Graphic Design
              </span>
              <a
                href={settings.designInstagramUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-[var(--text-main)] hover:underline inline-flex items-center gap-1"
              >
                <span>{settings.designInstagramHandle}</span>
                <ExternalLink size={12} />
              </a>
            </div>
            <h3 className="text-2xl sm:text-3xl font-editorial font-normal text-[var(--text-main)]">
              FREDDIE DESIGN PALACE
            </h3>
            <p className="text-sm sm:text-base text-[var(--text-muted)]">
              Visual identities, social media designs, promotional materials, event graphics, album artwork, and other creative assets designed to communicate your message effectively.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={settings.designInstagramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold bg-[var(--text-main)] text-[var(--bg-base)] px-5 py-2.5 hover:opacity-90 transition-all cursor-pointer"
              >
                <span>Visit Instagram @freddie.design_palace</span>
                <ArrowUpRight size={13} />
              </a>
              <button
                type="button"
                onClick={() => navigateTo('book')}
                className="text-xs uppercase tracking-[0.2em] font-semibold border border-[var(--border-line)] text-[var(--text-main)] px-5 py-2.5 hover:bg-[var(--card-bg)] transition-colors cursor-pointer"
              >
                Inquire For Design Deals
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-[var(--border-line)] space-y-4">
            <h3 className="text-2xl font-editorial font-normal text-[var(--text-main)]">
              My Approach: Understand. Create. Refine. Deliver.
            </h3>
            <p className="text-sm sm:text-base text-[var(--text-muted)]">
              Every project starts with understanding the idea behind the work. I take time to understand your message, audience, and objectives before translating them into visuals. I believe good creative work should not only look good—it should communicate, connect, and serve a purpose.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-[var(--text-muted)] pt-2">
              <div>
                <span className="block text-xs uppercase font-mono tracking-wider text-[var(--text-main)] font-bold mb-1">
                  1. Understand
                </span>
                <p>Every project starts with understanding the idea behind the work. I take time to understand your message, audience, and objectives before translating them into visuals.</p>
              </div>
              <div>
                <span className="block text-xs uppercase font-mono tracking-wider text-[var(--text-main)] font-bold mb-1">
                  2. Create
                </span>
                <p>Turning concepts into reality across brand identities, promotional graphics, or live photographic captures that connect with people.</p>
              </div>
              <div>
                <span className="block text-xs uppercase font-mono tracking-wider text-[var(--text-main)] font-bold mb-1">
                  3. Refine
                </span>
                <p>Iterating on typography, hierarchy, balance, and color grading to ensure every visual feels intentional and engaging.</p>
              </div>
              <div>
                <span className="block text-xs uppercase font-mono tracking-wider text-[var(--text-main)] font-bold mb-1">
                  4. Deliver
                </span>
                <p>Delivering high-resolution, production-ready assets and curated visual archives designed to serve a lasting purpose.</p>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => navigateTo('book')}
              className="text-xs uppercase tracking-[0.22em] font-semibold bg-[var(--text-main)] text-[var(--bg-base)] px-8 py-4 hover:opacity-90 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Book Graphic Design or Shoot</span>
              <ArrowUpRight size={14} />
            </button>
            <a
              href={settings.designInstagramUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs uppercase tracking-[0.2em] font-semibold border border-[var(--border-line)] px-6 py-4 hover:bg-[var(--card-bg)] transition-all cursor-pointer inline-flex items-center gap-2 text-[var(--text-main)]"
            >
              <span>{settings.designInstagramHandle}</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Official Affiliations & Creative Alliances (From IG Bio) */}
      <div className="py-16 border-t border-[var(--border-line)] mb-16">
        <div className="max-w-3xl mb-10">
          <span className="text-xs uppercase font-mono tracking-widest text-[var(--text-muted)] block mb-2">
            Official Alliances & Visual Practices
          </span>
          <h3 className="text-3xl sm:text-4xl font-editorial font-normal text-[var(--text-main)]">
            Documenting the Voices and Celebrations of Ghana
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {officialAffiliations.map((aff, i) => (
            <a
              key={i}
              href={aff.url}
              target="_blank"
              rel="noreferrer"
              className="p-6 bg-[var(--card-bg)] border border-[var(--border-line)] hover:border-[var(--primary-accent)] transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[var(--primary-accent)] font-semibold block">
                  {aff.role}
                </span>
                <h4 className="text-xl font-editorial font-normal text-[var(--text-main)] group-hover:text-[var(--primary-accent)] transition-colors">
                  {aff.name}
                </h4>
                <p className="text-xs text-[var(--text-muted)] font-normal leading-relaxed">
                  {aff.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[var(--border-line)] flex items-center justify-between text-xs font-mono text-[var(--text-muted)] group-hover:text-[var(--text-main)]">
                <span>{aff.handle}</span>
                <ExternalLink size={12} />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Verified Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-t border-b border-[var(--border-line)] mb-20">
        {verifiedStats.map((stat, idx) => (
          <div key={idx} className="space-y-1">
            <span className="text-4xl sm:text-5xl font-editorial font-light text-[var(--text-main)]">
              {stat.number}
            </span>
            <span className="block text-xs uppercase tracking-wider font-semibold text-[var(--text-main)] pt-1">
              {stat.label}
            </span>
            <span className="block text-[11px] text-[var(--text-muted)] font-normal">
              {stat.sublabel}
            </span>
          </div>
        ))}
      </div>

      {/* Publications / Features */}
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <span className="text-xs uppercase font-mono tracking-[0.3em] text-[var(--text-muted)] block">
          Editorial Features & Brand Alliances
        </span>
        <div className="flex flex-wrap justify-center gap-8 sm:gap-14 text-xs tracking-[0.25em] font-editorial uppercase text-[var(--text-main)]">
          {publicationsAndBrands.map((brand, i) => (
            <span key={i} className="border-b border-transparent hover:border-[var(--text-main)] pb-1 transition-all">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
