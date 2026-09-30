import React from 'react';
import { verifiedStats, publicationsAndBrands } from '../../data/siteContent';

export const SocialProofSection: React.FC = () => {
  return (
    <section className="py-20 px-6 sm:px-12 max-w-7xl mx-auto w-full border-t border-[var(--border-line)]">
      {/* Editorial Numbers Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-16 border-b border-[var(--border-line)]">
        {verifiedStats.map((stat, idx) => (
          <div key={idx} className="space-y-1">
            <span className="text-4xl sm:text-5xl md:text-6xl font-editorial font-light text-[var(--text-main)]">
              {stat.number}
            </span>
            <span className="block text-xs uppercase tracking-wider font-semibold text-[var(--text-main)] pt-1">
              {stat.label}
            </span>
            {stat.sublabel && (
              <span className="block text-[11px] text-[var(--text-muted)] font-normal">
                {stat.sublabel}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Publications Bar */}
      <div className="pt-14">
        <span className="block text-center text-[10px] uppercase font-mono tracking-[0.3em] text-[var(--text-muted)] mb-8">
          Recognized & Featured In
        </span>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-xs tracking-[0.25em] font-editorial uppercase text-[var(--text-muted)]">
          {publicationsAndBrands.map((pub, i) => (
            <span key={i} className="hover:text-[var(--text-main)] transition-colors">
              {pub}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
