import React from 'react';
import { useApp } from '../context/AppContext';
import { weddingData } from '../data/weddingData';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();
  const { about } = weddingData;

  return (
    <div className="bg-[#FAF8F5] dark:bg-[#12100E] text-[#2C2825] dark:text-[#FAF7F2] pb-24 space-y-20 sm:space-y-28 transition-colors">
      {/* Header */}
      <section className="pt-12 sm:pt-16 pb-6 max-w-4xl mx-auto px-6 text-center space-y-4 border-b border-[#E8E3DC] dark:border-[#2C2723]">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#78736E] dark:text-[#B5ACA2] font-semibold">
          THE ARTIST & STUDIO
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-[#2C2825] dark:text-[#FAF7F2] font-light">
          {about.title}
        </h1>
        <p className="font-serif-luxury italic text-xl sm:text-2xl text-[#6E645D] dark:text-[#DDD5CA] max-w-2xl mx-auto leading-relaxed">
          “{about.lead}”
        </p>
      </section>

      {/* Main Story & Portrait */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Portrait Column */}
          <div className="lg:col-span-5">
            <div className="aspect-[3/4] bg-[#E8E2D9] dark:bg-[#201D1A] overflow-hidden shadow-xs border border-[#E8E3DC] dark:border-[#2F2B26]">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85"
                alt="Lead Wedding Photographer at THE AMENA BRAND"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="pt-3 text-center">
              <span className="font-serif-luxury text-lg text-[#2C2825] dark:text-[#FAF7F2] block font-normal">
                Amena Vance
              </span>
              <span className="text-[11px] text-[#78736E] dark:text-[#B5ACA2] uppercase tracking-widest font-sans font-medium">
                Founder & Lead Photographer
              </span>
            </div>
          </div>

          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#78736E] dark:text-[#B5ACA2] font-semibold block">
              OUR PHILOSOPHY
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#2C2825] dark:text-[#FAF7F2] font-light leading-snug">
              Capturing the Sacred, Unrushed Rhythm of Your Day
            </h2>

            <div className="space-y-4 font-sans text-xs sm:text-sm text-[#78736E] dark:text-[#C4BCB1] leading-relaxed font-normal">
              {about.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E8E3DC] dark:border-[#2F2B26]">
              <span className="text-[10px] uppercase tracking-widest text-[#78736E] dark:text-[#B5ACA2] font-semibold block mb-3">
                HONORED TO BE FEATURED IN:
              </span>
              <div className="flex flex-wrap items-center gap-6 text-xs uppercase tracking-widest text-[#524E48] dark:text-[#DDD5CA] font-serif-luxury font-medium">
                {about.press.map((pub, idx) => (
                  <span key={idx} className="border-b border-[#DCD5CB] dark:border-[#423C36] pb-0.5">
                    {pub}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Wedding Experience Pillars */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-14">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#78736E] dark:text-[#B5ACA2] font-semibold">
            WHAT TO EXPECT
          </span>
          <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#2C2825] dark:text-[#FAF7F2] font-light">
            The Amena Experience
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-[#1B1815] p-8 border border-[#E8E3DC] dark:border-[#2F2B26] space-y-3 shadow-2xs">
            <span className="font-serif-luxury text-2xl text-[#B8A99A]">01</span>
            <h4 className="font-serif-luxury text-xl text-[#2C2825] dark:text-[#FAF7F2]">
              Calm, Unobtrusive Presence
            </h4>
            <p className="font-sans text-xs text-[#78736E] dark:text-[#C4BCB1] leading-relaxed">
              We never hijack your wedding day or force you through endless uncomfortable poses. We hold space for you to laugh, cry, and truly experience your marriage.
            </p>
          </div>

          <div className="bg-white dark:bg-[#1B1815] p-8 border border-[#E8E3DC] dark:border-[#2F2B26] space-y-3 shadow-2xs">
            <span className="font-serif-luxury text-2xl text-[#B8A99A]">02</span>
            <h4 className="font-serif-luxury text-xl text-[#2C2825] dark:text-[#FAF7F2]">
              Artful Film & Light Mastery
            </h4>
            <p className="font-sans text-xs text-[#78736E] dark:text-[#C4BCB1] leading-relaxed">
              With deep understanding of natural light and medium-format film, we craft luminous photographs with gentle skin tones, deep contrast, and enduring soul.
            </p>
          </div>

          <div className="bg-white dark:bg-[#1B1815] p-8 border border-[#E8E3DC] dark:border-[#2F2B26] space-y-3 shadow-2xs">
            <span className="font-serif-luxury text-2xl text-[#B8A99A]">03</span>
            <h4 className="font-serif-luxury text-xl text-[#2C2825] dark:text-[#FAF7F2]">
              Heirlooms for a Lifetime
            </h4>
            <p className="font-sans text-xs text-[#78736E] dark:text-[#C4BCB1] leading-relaxed">
              From fast 48-hour sneak peeks to handcrafted bespoke leather albums, we ensure your wedding memories are preserved in physical artifacts meant to be passed down.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 text-center">
        <div className="bg-[#F4EFEA] dark:bg-[#1D1A17] p-10 sm:p-12 border border-[#E8E3DC] dark:border-[#2F2B26] space-y-4 shadow-xs">
          <h3 className="font-serif-luxury text-3xl text-[#2C2825] dark:text-[#FAF7F2] font-light">
            Let's Begin Planning Your Wedding Heirloom
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#78736E] dark:text-[#C4BCB1] max-w-md mx-auto leading-relaxed">
            Reach out with your wedding date and dreams. We can't wait to hear your story.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('/contact')}
              className="rounded-full bg-[#B8A99A] hover:bg-[#A69584] text-white text-xs uppercase tracking-[0.2em] font-medium px-8 py-3 transition-colors cursor-pointer"
            >
              START A CONVERSATION
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
