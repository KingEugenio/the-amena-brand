import React from 'react';
import { Check, ArrowUpRight } from 'lucide-react';
import { processSteps } from '../../data/siteContent';
import { SectionHeading } from '../common/SectionHeading';
import { useSiteConfig } from '../../context/SiteConfigContext';

export const ExperienceView: React.FC = () => {
  const { navigateTo } = useSiteConfig();

  return (
    <div className="pt-28 sm:pt-36 pb-24 px-6 sm:px-12 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
        <span className="text-xs uppercase tracking-[0.25em] text-[var(--text-muted)] font-mono block">
          Client Journey & Timeline
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-normal text-[var(--text-main)]">
          The Experience
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-muted)] font-normal leading-relaxed">
          How we guide you from your initial inquiry through wedding day calm and the delivery of your lifelong family heirloom.
        </p>
      </div>

      {/* 6-Step Journey Flow */}
      <div className="space-y-16 max-w-5xl mx-auto mb-24">
        {processSteps.map((step, idx) => (
          <div
            key={step.number}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-[var(--border-line)] pt-12 items-start"
          >
            <div className="md:col-span-3">
              <span className="text-4xl sm:text-6xl font-editorial font-light text-[var(--primary-accent)] block">
                {step.number}
              </span>
              <h2 className="text-2xl font-editorial font-normal text-[var(--text-main)] mt-2">
                {step.title}
              </h2>
              <span className="text-xs uppercase font-mono tracking-widest text-[var(--text-muted)] block mt-1">
                {step.subtitle}
              </span>
            </div>

            <div className="md:col-span-9 space-y-6">
              <p className="text-base sm:text-lg text-[var(--text-main)] font-normal leading-relaxed">
                {step.description}
              </p>

              <div className="bg-[var(--card-bg)] border border-[var(--border-line)] p-6 space-y-3">
                <span className="text-[11px] uppercase font-mono tracking-wider text-[var(--text-main)] font-bold block">
                  What Happens in Step {step.number}:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {step.details.map((detail, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[var(--text-muted)] font-normal">
                      <Check size={14} className="text-[var(--primary-accent)] mt-0.5 shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Timeline Guidance Advice Box */}
      <div className="bg-[var(--card-bg)] border border-[var(--border-line)] p-8 sm:p-14 max-w-4xl mx-auto space-y-6 mb-20">
        <span className="text-xs uppercase tracking-[0.25em] text-[var(--primary-accent)] font-mono block">
          Studio Insight &bull; Timeline Wisdom
        </span>
        <h3 className="text-2xl sm:text-3xl font-editorial font-normal text-[var(--text-main)]">
          Why We Recommend Protecting 45 Minutes Before Sunset
        </h3>
        <p className="text-sm sm:text-base text-[var(--text-muted)] font-normal leading-relaxed">
          In coastal West Africa and tropical climates, daylight transitions swiftly from high midday contrast into warm golden diffusion between 5:15 PM and 6:00 PM. We collaborate closely with your event planner to schedule your couple portraits during this window.
        </p>
        <p className="text-sm sm:text-base text-[var(--text-muted)] font-normal leading-relaxed">
          This 45-minute pause serves a dual purpose: you catch your breath away from the crowd, drink a glass of champagne together, and create portraits bathed in the day’s most flattering natural glow.
        </p>
      </div>

      {/* Final Action */}
      <div className="text-center space-y-6">
        <h3 className="text-3xl font-editorial font-normal text-[var(--text-main)]">
          Ready to begin your consultation?
        </h3>
        <button
          type="button"
          onClick={() => navigateTo('book')}
          className="text-xs uppercase tracking-[0.25em] font-semibold bg-[var(--text-main)] text-[var(--bg-base)] px-8 py-4 hover:opacity-90 transition-all cursor-pointer inline-flex items-center gap-2"
        >
          <span>Check Your Date</span>
          <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  );
};
