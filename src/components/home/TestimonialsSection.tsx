import React from 'react';
import { Star } from 'lucide-react';
import { clientTestimonials } from '../../data/siteContent';
import { SectionHeading } from '../common/SectionHeading';
import { TestimonialSkeleton } from '../common/Skeletons';
import { useSiteConfig } from '../../context/SiteConfigContext';

export const TestimonialsSection: React.FC = () => {
  const { simulateLoading } = useSiteConfig();

  if (simulateLoading) {
    return (
      <div className="py-24 max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <TestimonialSkeleton />
        <TestimonialSkeleton />
        <TestimonialSkeleton />
      </div>
    );
  }

  return (
    <section className="py-24 px-6 sm:px-12 max-w-7xl mx-auto w-full border-t border-[var(--border-line)]">
      <SectionHeading
        label="Words of Trust"
        title="Client Recollections"
        subtitle="Reflections from couples and collaborators who entrusted us with their most cherished memories."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {clientTestimonials.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between border border-[var(--border-line)] bg-[var(--card-bg)] p-8 sm:p-10 relative"
          >
            <div>
              {/* Star Rating & Source */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-[var(--border-line)]">
                <div className="flex text-[var(--primary-accent)] space-x-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={13} className="fill-[var(--primary-accent)]" />
                  ))}
                </div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[var(--text-muted)]">
                  {item.source}
                </span>
              </div>

              {/* Quote */}
              <blockquote className="text-base sm:text-lg font-editorial font-normal leading-relaxed text-[var(--text-main)] mb-8">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
            </div>

            {/* Author details */}
            <div className="pt-6 border-t border-[var(--border-line)] flex items-center gap-4">
              <img
                src={item.clientImage}
                alt={item.clientName}
                className="w-11 h-11 rounded-full object-cover grayscale"
                loading="lazy"
              />
              <div>
                <span className="block text-xs uppercase tracking-wider font-semibold text-[var(--text-main)]">
                  {item.clientName}
                </span>
                <span className="block text-[11px] text-[var(--text-muted)] font-normal">
                  {item.roleOrEvent} &bull; {item.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
