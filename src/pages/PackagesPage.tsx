import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { weddingData } from '../data/weddingData';
import { IconCheck, IconArrowRight, IconCalendar } from '../components/icons/Icons';

export const PackagesPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const addOns = [
    {
      title: '35mm Analog Film Coverage',
      price: '$650',
      description: 'Five rolls of true 35mm film (Kodak Portra 400 & Ilford B&W) scanned at ultra-high resolution for unmistakable nostalgic grain and timeless skin tones.'
    },
    {
      title: 'Sunset Engagement Session',
      price: '$850',
      description: '90-minute intimate portrait session on location prior to your wedding day, perfect for getting comfortable in front of the lens and wedding announcements.'
    },
    {
      title: 'Bespoke Heirloom Album',
      price: '$1,200',
      description: 'Handcrafted 10x10 or 12x12 album bound in archival Italian linen or buttery Tuscan leather, printed on thick fine-art cotton paper.'
    },
    {
      title: 'Rehearsal Dinner / Welcome Party',
      price: '$1,100',
      description: 'Up to 3 hours of candid coverage capturing emotional toasts, intimate embraces, and the electric anticipation the evening before.'
    },
    {
      title: 'Set of Matching Parent Albums',
      price: '$950',
      description: 'Two 8x8 archival duplicate albums designed as heirloom gifts for parents and grandparents.'
    },
    {
      title: 'Super 8 Nostalgic Highlight Reel',
      price: '$1,400',
      description: 'Authentic Kodak Super 8mm vintage film reel cut to music (3-4 minutes) capturing the kinetic, whimsical essence of your celebration.'
    }
  ];

  return (
    <div className="bg-[#FAF8F5] dark:bg-[#12100E] text-[#2C2825] dark:text-[#FAF7F2] pb-24 space-y-20 sm:space-y-28 transition-colors">
      {/* Header */}
      <section className="pt-12 sm:pt-16 pb-8 max-w-4xl mx-auto px-6 text-center space-y-4 border-b border-[#E8E3DC] dark:border-[#2C2723]">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#78736E] dark:text-[#B5ACA2] font-semibold">
          INVESTMENT & COLLECTIONS
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-[#2C2825] dark:text-[#FAF7F2] font-light">
          Bespoke Wedding Collections
        </h1>
        <p className="font-sans text-xs sm:text-sm text-[#78736E] dark:text-[#C4BCB1] max-w-2xl mx-auto leading-relaxed font-normal">
          We believe in transparent, comprehensive coverage that preserves your celebration with fine-art dignity. Every collection includes printing rights, high-resolution delivery, and personal timeline curation.
        </p>
      </section>

      {/* Main Packages Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {weddingData.packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-white dark:bg-[#1B1815] border ${
                pkg.popular
                  ? 'border-[#B8A99A] ring-2 ring-[#B8A99A]/40'
                  : 'border-[#E8E3DC] dark:border-[#2F2B26]'
              } p-8 sm:p-10 flex flex-col justify-between space-y-8 shadow-xs hover:shadow-md transition-all duration-300 relative`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#B8A99A] text-white text-[10px] uppercase tracking-[0.25em] px-4 py-1 rounded-full font-medium shadow-2xs">
                  MOST BELOVED BY COUPLES
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#2C2825] dark:text-[#FAF7F2] tracking-wide font-normal">
                    {pkg.name}
                  </h2>
                  <p className="font-sans text-xs text-[#78736E] dark:text-[#C4BCB1] mt-1.5 leading-relaxed">
                    {pkg.tagline}
                  </p>
                </div>

                <div className="border-y border-[#E8E3DC] dark:border-[#2F2B26] py-4 space-y-1">
                  <div className="text-4xl font-serif-luxury text-[#2C2825] dark:text-[#FAF7F2]">
                    {pkg.price}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-[#78736E] dark:text-[#A89F94] font-medium">
                    {pkg.hours} • {pkg.photographers}
                  </div>
                </div>

                <p className="font-sans text-xs text-[#524E48] dark:text-[#D5CFC6] leading-relaxed italic">
                  "{pkg.description}"
                </p>

                <div className="space-y-3 pt-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#78736E] dark:text-[#B5ACA2] font-semibold block">
                    WHAT IS INCLUDED:
                  </span>
                  <ul className="space-y-2.5">
                    {pkg.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#3D3833] dark:text-[#DDD5CA] leading-relaxed">
                        <IconCheck size={14} className="text-[#B8A99A] mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => navigateTo('/contact')}
                  className="w-full rounded-full bg-[#B8A99A] hover:bg-[#A69584] text-white text-xs uppercase tracking-[0.2em] font-medium py-3.5 transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
                >
                  RESERVE YOUR DATE
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* A La Carte Add-Ons */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="text-center space-y-3 mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#78736E] dark:text-[#B5ACA2] font-semibold">
            CUSTOMIZE YOUR JOURNEY
          </span>
          <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#2C2825] dark:text-[#FAF7F2] font-light">
            A La Carte Add-Ons
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#78736E] dark:text-[#C4BCB1] max-w-xl mx-auto">
            Tailor any collection to match the exact scale and rhythm of your weekend.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addOns.map((add, idx) => (
            <div key={idx} className="bg-white dark:bg-[#1B1815] p-6 border border-[#E8E3DC] dark:border-[#2F2B26] shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-serif-luxury text-xl text-[#2C2825] dark:text-[#FAF7F2]">
                  {add.title}
                </h4>
                <span className="font-serif-luxury text-lg text-[#B8A99A] dark:text-[#D5C7B8]">
                  {add.price}
                </span>
              </div>
              <p className="font-sans text-xs text-[#78736E] dark:text-[#C4BCB1] leading-relaxed">
                {add.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-6 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#78736E] dark:text-[#B5ACA2] font-semibold">
            CLIENT QUESTIONS
          </span>
          <h3 className="font-serif-luxury text-3xl text-[#2C2825] dark:text-[#FAF7F2] font-light">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-4">
          {weddingData.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#1B1815] border border-[#E8E3DC] dark:border-[#2F2B26] transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF8F5] dark:hover:bg-[#221E1B]"
                >
                  <span className="font-serif-luxury text-lg text-[#2C2825] dark:text-[#FAF7F2]">
                    {faq.question}
                  </span>
                  <span className="text-[#B8A99A] dark:text-[#D5C7B8] text-xl">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-[#78736E] dark:text-[#C4BCB1] leading-relaxed border-t border-[#F2ECE5] dark:border-[#2A2621] pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Consultation Banner */}
      <section className="max-w-5xl mx-auto px-6 text-center">
        <div className="bg-[#F4EFEA] dark:bg-[#1D1A17] p-10 sm:p-12 border border-[#E8E3DC] dark:border-[#2F2B26] space-y-4 shadow-xs">
          <h3 className="font-serif-luxury text-3xl text-[#2C2825] dark:text-[#FAF7F2] font-light">
            Ready to Check Availability?
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#78736E] dark:text-[#C4BCB1] max-w-md mx-auto leading-relaxed">
            Reach out with your date and venue details. We look forward to dreaming up your heirloom collection together.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('/contact')}
              className="rounded-full bg-[#2C2825] dark:bg-[#FAF7F2] hover:bg-[#B8A99A] dark:hover:bg-[#EAE0D3] text-white dark:text-[#181614] text-xs uppercase tracking-[0.2em] px-8 py-3 font-medium transition-colors cursor-pointer shadow-md"
            >
              INQUIRE NOW
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
