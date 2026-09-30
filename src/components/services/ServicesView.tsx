import React, { useState } from 'react';
import { Check, ChevronDown, ArrowUpRight } from 'lucide-react';
import { servicesList } from '../../data/siteContent';
import { ImageWithSkeleton } from '../common/ImageWithSkeleton';
import { SectionHeading } from '../common/SectionHeading';
import { ServiceSkeleton } from '../common/Skeletons';
import { useSiteConfig } from '../../context/SiteConfigContext';

export const ServicesView: React.FC = () => {
  const { navigateTo, simulateLoading } = useSiteConfig();
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  if (simulateLoading) {
    return (
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 sm:px-12 space-y-12">
        <ServiceSkeleton />
        <ServiceSkeleton />
      </div>
    );
  }

  const toggleFaq = (question: string) => {
    setActiveFaq(activeFaq === question ? null : question);
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 px-6 sm:px-12 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
        <span className="text-xs uppercase tracking-[0.25em] text-[var(--text-muted)] font-mono block">
          What I Do &bull; FREDDIE DESIGN PALACE &bull; FREDDIE SHOT IT
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-normal text-[var(--text-main)]">
          What I Do
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-muted)] font-normal leading-relaxed">
          Graphic design, photography, and visual storytelling crafted to help brands, artists, organizations, and individuals communicate with impact.
        </p>
      </div>

      {/* Services Breakdown */}
      <div className="space-y-24">
        {servicesList.map((service, index) => (
          <section
            key={service.id}
            id={service.id}
            className="border-t border-[var(--border-line)] pt-16"
          >
            {/* Service Top Intro Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--text-muted)]">
                  Offering 0{index + 1} &bull; {service.startingPrice}
                </span>
                <h2 className="text-3xl sm:text-5xl font-editorial font-normal text-[var(--text-main)] leading-tight">
                  {service.title}
                </h2>
                <p className="text-sm uppercase font-mono tracking-wider text-[var(--primary-accent)]">
                  {service.tagline}
                </p>
                <p className="text-base sm:text-lg text-[var(--text-muted)] font-normal leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-4 pt-4 border-t border-[var(--border-line)]">
                  <div>
                    <span className="block text-xs uppercase font-mono tracking-wider text-[var(--text-main)] font-semibold mb-1">
                      Who It Is For:
                    </span>
                    <p className="text-sm text-[var(--text-muted)] font-normal">{service.whoItIsFor}</p>
                  </div>
                  <div>
                    <span className="block text-xs uppercase font-mono tracking-wider text-[var(--text-main)] font-semibold mb-1">
                      The Studio Approach:
                    </span>
                    <p className="text-sm text-[var(--text-muted)] font-normal">{service.photographerApproach}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => navigateTo('book')}
                    className="text-xs uppercase tracking-[0.22em] font-semibold bg-[var(--text-main)] text-[var(--bg-base)] px-7 py-4 hover:opacity-90 transition-all cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>Request Date Availability</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-6">
                <ImageWithSkeleton
                  src={service.coverImage}
                  alt={service.title}
                  aspectRatio="portrait"
                  containerClassName="w-full h-[420px] sm:h-[520px]"
                  hoverScale={false}
                />
              </div>
            </div>

            {/* Public Packages Grid */}
            {service.packages.length > 0 && (
              <div className="space-y-6 mb-16">
                <h3 className="text-xl sm:text-2xl font-editorial text-[var(--text-main)]">
                  Curated Collections & Investment Tiers
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {service.packages.map((pkg, pIdx) => (
                    <div
                      key={pIdx}
                      className={`p-8 border flex flex-col justify-between ${
                        pkg.isPopular
                          ? 'border-[var(--text-main)] bg-[var(--card-bg)] shadow-sm ring-1 ring-[var(--text-main)]'
                          : 'border-[var(--border-line)] bg-[var(--card-bg)]/40'
                      }`}
                    >
                      <div>
                        {pkg.isPopular && (
                          <span className="inline-block text-[10px] uppercase font-mono tracking-widest bg-[var(--text-main)] text-[var(--bg-base)] px-2.5 py-1 mb-4 font-semibold">
                            Most Requested
                          </span>
                        )}
                        <h4 className="text-2xl font-editorial font-normal text-[var(--text-main)]">
                          {pkg.name}
                        </h4>
                        <div className="text-xs uppercase font-mono text-[var(--text-muted)] mt-1 mb-4">
                          {pkg.hours}
                        </div>
                        <div className="text-xl font-editorial font-semibold text-[var(--text-main)] pb-4 border-b border-[var(--border-line)]">
                          {pkg.priceTag}
                        </div>
                        <p className="text-xs text-[var(--text-muted)] font-normal mt-4 mb-6 leading-relaxed">
                          {pkg.description}
                        </p>

                        <div className="space-y-2.5">
                          <span className="text-[10px] uppercase font-mono tracking-wider text-[var(--text-main)] font-bold block">
                            Included in Collection:
                          </span>
                          {pkg.deliverables.map((d, dIdx) => (
                            <div key={dIdx} className="flex items-start gap-2 text-xs text-[var(--text-muted)] font-normal">
                              <Check size={13} className="text-[var(--primary-accent)] mt-0.5 shrink-0" />
                              <span>{d}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-8 mt-6 border-t border-[var(--border-line)]">
                        <button
                          type="button"
                          onClick={() => navigateTo('book')}
                          className="w-full text-center text-xs uppercase tracking-[0.2em] font-medium border border-[var(--text-main)] py-3 hover:bg-[var(--text-main)] hover:text-[var(--bg-base)] transition-colors cursor-pointer"
                        >
                          Book Collection
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bespoke Add-ons */}
            {service.addOns.length > 0 && (
              <div className="bg-[var(--card-bg)] border border-[var(--border-line)] p-8 sm:p-10 mb-16">
                <span className="text-xs uppercase font-mono tracking-widest text-[var(--text-muted)] block mb-2">
                  Bespoke Add-Ons
                </span>
                <h4 className="text-xl sm:text-2xl font-editorial text-[var(--text-main)] mb-6">
                  Enhance Your Documentation
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.addOns.map((addon, aIdx) => (
                    <div key={aIdx} className="border-b border-[var(--border-line)] pb-4">
                      <div className="flex justify-between items-baseline">
                        <span className="text-sm font-medium text-[var(--text-main)]">{addon.name}</span>
                        <span className="text-xs font-mono font-semibold text-[var(--text-main)]">{addon.price}</span>
                      </div>
                      <p className="text-xs text-[var(--text-muted)] font-normal mt-1">{addon.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Service FAQ Accordion */}
            {service.faqs.length > 0 && (
              <div className="space-y-4 max-w-3xl">
                <span className="text-xs uppercase font-mono tracking-widest text-[var(--text-muted)]">
                  Common Questions on {service.title}
                </span>
                {service.faqs.map((f, fIdx) => (
                  <div key={fIdx} className="border-b border-[var(--border-line)] pb-4">
                    <button
                      type="button"
                      onClick={() => toggleFaq(f.question)}
                      className="w-full flex items-center justify-between text-left py-2.5 cursor-pointer text-[var(--text-main)] hover:text-[var(--primary-accent)] transition-colors group"
                      aria-expanded={activeFaq === f.question}
                    >
                      <span className="text-base sm:text-lg font-editorial font-normal text-[var(--text-main)] group-hover:text-[var(--primary-accent)] transition-colors pr-4">
                        {f.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 transition-transform duration-200 ${
                          activeFaq === f.question ? 'rotate-180 text-[var(--primary-accent)]' : 'text-[var(--text-muted)]'
                        }`}
                      />
                    </button>
                    {activeFaq === f.question && (
                      <p className="text-sm sm:text-base text-[var(--text-muted)] font-normal leading-relaxed pt-2 pb-2">
                        {f.answer}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};
