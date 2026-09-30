import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { SectionHeading } from '../components/common/SectionHeading';
import { WhatsAppCTAButton } from '../components/common/Buttons';
import { IconChevronDown, IconChevronUp } from '../components/icons/Icons';

export const FaqPage: React.FC = () => {
  const { data } = useApp();
  const { faqs } = data;

  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const set = new Set<string>();
    faqs.forEach((f) => {
      if (f.category) set.add(f.category);
    });
    return Array.from(set);
  }, [faqs]);

  const filteredFaqs = useMemo(() => {
    if (selectedCategory === 'all') return faqs;
    return faqs.filter((f) => f.category.toLowerCase() === selectedCategory.toLowerCase());
  }, [faqs, selectedCategory]);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-12 sm:space-y-16">
      {/* Header */}
      <div className="border-b border-[#E5E1D8] pb-8 space-y-3">
        <SectionHeading
          label="CLIENT ASSISTANCE"
          title="Frequently Asked Questions"
          description="Insights into our made-to-order timelines, garment measurements, Accra showroom visits, and courier delivery."
        />
      </div>

      {/* Category Tabs */}
      {categories.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#E5E1D8]">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`text-xs uppercase tracking-wider px-4 py-2 border transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-[#191816] text-[#FAF9F5] border-[#191816]'
                : 'text-[#6B6862] border-[#E5E1D8] hover:text-[#191816]'
            }`}
          >
            All Questions ({faqs.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs uppercase tracking-wider px-4 py-2 border transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#191816] text-[#FAF9F5] border-[#191816]'
                  : 'text-[#6B6862] border-[#E5E1D8] hover:text-[#191816]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Accordion List */}
      <div className="divide-y divide-[#E5E1D8] border-t border-b border-[#E5E1D8]">
        {filteredFaqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div key={faq.id} className="py-5">
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#9A5B32] font-semibold">
                    {faq.category}
                  </span>
                  <h3 className="font-serif-heading text-lg sm:text-xl text-[#191816] group-hover:text-[#9A5B32] transition-colors">
                    {faq.question}
                  </h3>
                </div>
                <span className="text-[#6B6862] p-1">
                  {isOpen ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
                </span>
              </button>

              {isOpen && (
                <div className="pt-4 pr-6 animate-in fade-in duration-200">
                  <p className="text-xs sm:text-sm text-[#6B6862] leading-relaxed font-sans font-light whitespace-pre-line">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Have Questions? */}
      <div className="p-8 bg-[#F3F1EB] border border-[#E5E1D8] text-center space-y-4">
        <h4 className="font-serif-heading text-2xl text-[#191816]">Have an unlisted question?</h4>
        <p className="text-xs text-[#6B6862] max-w-md mx-auto leading-relaxed">
          Our studio concierge is available directly on WhatsApp for real-time answers regarding custom cuts, expedited events, and fabric swatches.
        </p>
        <div className="pt-2 flex justify-center">
          <WhatsAppCTAButton
            label="ASK ON WHATSAPP (0579499223)"
            subject="Client FAQ Inquiry"
          />
        </div>
      </div>
    </div>
  );
};
