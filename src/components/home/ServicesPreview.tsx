import React from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { servicesList } from '../../data/siteContent';
import { SectionHeading } from '../common/SectionHeading';
import { ServiceSkeleton } from '../common/Skeletons';

export const ServicesPreview: React.FC = () => {
  const { navigateTo, simulateLoading } = useSiteConfig();

  if (simulateLoading) {
    return (
      <div className="py-24 max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <ServiceSkeleton />
        <ServiceSkeleton />
        <ServiceSkeleton />
      </div>
    );
  }

  return (
    <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto w-full border-t border-[var(--border-line)]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
        <SectionHeading
          label="What I Do"
          title="What I Do"
          subtitle="Crafted to help brands, artists, organizations, and individuals communicate with impact."
          className="mb-0"
        />

        <button
          type="button"
          onClick={() => navigateTo('services')}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-semibold text-[var(--text-main)] border-b border-[var(--text-main)] pb-1 hover:text-[var(--primary-accent)] hover:border-[var(--primary-accent)] transition-colors cursor-pointer w-fit"
        >
          <span>Explore All Offerings</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {servicesList.map((service, index) => (
          <div
            key={service.id}
            className="flex flex-col justify-between border border-[var(--border-line)] bg-[var(--card-bg)] p-8 sm:p-10 relative transition-all duration-300 hover:border-[var(--primary-accent)] group"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono uppercase text-[var(--text-muted)] pb-6 border-b border-[var(--border-line)]">
                <span>Offering 0{index + 1}</span>
                <span className="text-[var(--text-main)] font-medium">{service.startingPrice}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-editorial font-normal text-[var(--text-main)] mt-6 mb-3">
                {service.title}
              </h3>

              <p className="text-xs text-[var(--text-muted)] tracking-wide uppercase font-mono mb-6">
                {service.tagline}
              </p>

              <p className="text-sm sm:text-base text-[var(--text-muted)] font-normal leading-relaxed mb-8">
                {service.description}
              </p>

              <div className="space-y-3 pt-6 border-t border-[var(--border-line)]">
                <span className="text-[11px] uppercase tracking-wider text-[var(--text-main)] font-medium block">
                  Signature Highlights:
                </span>
                {service.deliverables.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[var(--text-muted)] font-normal">
                    <Check size={13} className="text-[var(--primary-accent)] mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-10 mt-8 border-t border-[var(--border-line)] flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigateTo('services', service.id)}
                className="text-xs uppercase tracking-widest text-[var(--text-main)] font-semibold hover:text-[var(--primary-accent)] transition-colors cursor-pointer"
              >
                View Packages &rarr;
              </button>
              <button
                type="button"
                onClick={() => navigateTo('book')}
                className="text-xs uppercase tracking-widest bg-[var(--text-main)] text-[var(--bg-base)] px-4 py-2 hover:opacity-90 transition-colors cursor-pointer"
              >
                Inquire
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
