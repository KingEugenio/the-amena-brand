import React, { useState } from 'react';
import { ChevronDown, Search, ArrowUpRight } from 'lucide-react';
import { allFAQItems } from '../../data/siteContent';
import { useSiteConfig } from '../../context/SiteConfigContext';

export const FAQView: React.FC = () => {
  const { navigateTo } = useSiteConfig();
  const [openFaqId, setOpenFaqId] = useState<string | null>(allFAQItems[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'booking' | 'deliverables' | 'travel' | 'pricing'>('all');

  const filteredFaqs = allFAQItems.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 px-6 sm:px-12 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
        <span className="text-xs uppercase tracking-[0.25em] text-[var(--text-muted)] font-mono block">
          Clarity & Reassurance
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-normal text-[var(--text-main)]">
          Frequently Asked Questions
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-muted)] font-normal leading-relaxed">
          Comprehensive answers covering bookings, travel logistics, deliverables, weather contingencies, and album craftsmanship.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="space-y-6 mb-12">
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search questions (e.g. RAW files, deposit, rain)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[var(--card-bg)] border border-[var(--border-line)] pl-11 pr-4 py-3 text-sm text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--text-main)] transition-colors"
          />
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs tracking-wider uppercase font-mono">
          {[
            { id: 'all', label: 'All (16)' },
            { id: 'booking', label: 'Booking & Dates' },
            { id: 'deliverables', label: 'Delivery & Albums' },
            { id: 'travel', label: 'Travel & Destinations' },
            { id: 'pricing', label: 'Pricing & Deposits' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 border transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? 'border-[var(--text-main)] bg-[var(--text-main)] text-[var(--bg-base)] font-semibold shadow-xs'
                  : 'border-[var(--border-line)] bg-[var(--card-bg)] text-[var(--text-muted)] hover:border-[var(--text-main)] hover:text-[var(--text-main)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="border-t border-[var(--border-line)] divide-y divide-[var(--border-line)]">
        {filteredFaqs.length === 0 ? (
          <div className="py-16 text-center text-sm text-[var(--text-muted)]">
            No matching questions found. Please reach out to us directly.
          </div>
        ) : (
          filteredFaqs.map((faq, index) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div key={faq.id} className="py-5">
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-baseline gap-4 pr-4">
                    <span className="text-xs font-mono text-[var(--text-muted)]">
                      {index < 9 ? `0${index + 1}` : index + 1}
                    </span>
                    <span className="text-lg sm:text-xl md:text-2xl font-editorial font-normal text-[var(--text-main)] group-hover:text-[var(--primary-accent)] transition-colors">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[var(--primary-accent)]' : 'text-[var(--text-muted)]'
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="pt-4 pl-8 sm:pl-10 pr-4 text-sm sm:text-base text-[var(--text-muted)] font-normal leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still Have Questions Box */}
      <div className="mt-20 bg-[var(--card-bg)] border border-[var(--border-line)] p-8 sm:p-12 text-center space-y-4">
        <h3 className="text-2xl font-editorial font-normal text-[var(--text-main)]">
          Have a unique inquiry not listed here?
        </h3>
        <p className="text-sm text-[var(--text-muted)] font-normal max-w-lg mx-auto">
          We are always happy to discuss destination travel logistics, complex family traditions, or custom multi-day commissions.
        </p>
        <button
          type="button"
          onClick={() => navigateTo('book')}
          className="mt-2 text-xs uppercase tracking-[0.2em] font-semibold bg-[var(--text-main)] text-[var(--bg-base)] px-7 py-3.5 hover:opacity-90 transition-all cursor-pointer inline-flex items-center gap-2"
        >
          <span>Send Direct Question</span>
          <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  );
};
