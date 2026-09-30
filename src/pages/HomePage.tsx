import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { weddingData, FeaturedCouple } from '../data/weddingData';
import {
  IconArrowRight,
  IconInstagram,
  IconCheck
} from '../components/icons/Icons';

export const HomePage: React.FC = () => {
  const { navigateTo, openLightbox } = useApp();
  const [selectedCoupleModal, setSelectedCoupleModal] = useState<FeaturedCouple | null>(null);

  const lauraAndJames = weddingData.couples.find((c) => c.id === 'laura-and-james')!;
  const mariaAndJosh = weddingData.couples.find((c) => c.id === 'maria-and-josh')!;

  return (
    <div className="bg-[#FAF8F5] dark:bg-[#12100E] text-[#2C2825] dark:text-[#FAF7F2] pb-24 space-y-24 sm:space-y-32 md:space-y-36 transition-colors">
      {/* 1. HERO SECTION: TRIPLE TRIPTYCH GALLERY (Matching provided screenshot) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:gap-5 items-stretch">
          {/* Left Panel: Bride holding bouquet with lace dress */}
          <div
            onClick={() =>
              openLightbox(
                weddingData.hero.triptych[0].src,
                weddingData.hero.triptych[0].alt,
                weddingData.hero.triptych.map((t) => t.src)
              )
            }
            className="md:col-span-4 relative group cursor-pointer overflow-hidden bg-[#EFEBE4] dark:bg-[#221F1C] shadow-xs"
          >
            <div className="aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4] lg:h-[580px] w-full">
              <img
                src={weddingData.hero.triptych[0].src}
                alt={weddingData.hero.triptych[0].alt}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          </div>

          {/* Center Panel: Romantic Veil Kiss before classical stone facade (slightly wider) */}
          <div
            onClick={() =>
              openLightbox(
                weddingData.hero.triptych[1].src,
                weddingData.hero.triptych[1].alt,
                weddingData.hero.triptych.map((t) => t.src)
              )
            }
            className="md:col-span-4 relative group cursor-pointer overflow-hidden bg-[#EFEBE4] dark:bg-[#221F1C] shadow-xs"
          >
            <div className="aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4] lg:h-[580px] w-full">
              <img
                src={weddingData.hero.triptych[1].src}
                alt={weddingData.hero.triptych[1].alt}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          </div>

          {/* Right Panel: Bride holding bouquet in bridal gown */}
          <div
            onClick={() =>
              openLightbox(
                weddingData.hero.triptych[2].src,
                weddingData.hero.triptych[2].alt,
                weddingData.hero.triptych.map((t) => t.src)
              )
            }
            className="md:col-span-4 relative group cursor-pointer overflow-hidden bg-[#EFEBE4] dark:bg-[#221F1C] shadow-xs"
          >
            <div className="aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4] lg:h-[580px] w-full">
              <img
                src={weddingData.hero.triptych[2].src}
                alt={weddingData.hero.triptych[2].alt}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTRO MISSION SECTION: "Capturing Timeless Wedding Memories" (Matching provided screenshot) */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 text-center space-y-6 pt-4">
        <h2 className="font-serif-luxury italic font-normal text-3xl sm:text-4xl md:text-5xl lg:text-[46px] text-[#5C544D] dark:text-[#E8E1D5] tracking-wide leading-snug">
          {weddingData.intro.headline}
        </h2>

        <p className="font-sans text-xs sm:text-sm text-[#78736E] dark:text-[#C4BCB1] max-w-2xl mx-auto leading-relaxed font-normal">
          {weddingData.intro.text}
        </p>

        <div className="pt-2">
          <button
            onClick={() => navigateTo('/packages')}
            className="inline-block rounded-full bg-[#B8A99A] hover:bg-[#A69584] text-white text-[11px] sm:text-xs uppercase tracking-[0.22em] font-medium px-8 py-3 transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
          >
            {weddingData.intro.ctaText}
          </button>
        </div>
      </section>

      {/* 3. COUPLE STORY 1: "LAURA & JAMES" (Matching provided screenshot) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Story Copy & CTA */}
          <div className="lg:col-span-5 space-y-6 lg:pr-6">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl tracking-[0.22em] text-[#2C2825] dark:text-[#FAF7F2] uppercase font-normal">
              {lauraAndJames.names}
            </h3>

            <p className="font-sans text-xs sm:text-sm text-[#78736E] dark:text-[#C4BCB1] leading-relaxed font-normal">
              {lauraAndJames.story}
            </p>

            <div className="pt-2">
              <button
                onClick={() => setSelectedCoupleModal(lauraAndJames)}
                className="inline-block rounded-full bg-[#B8A99A] hover:bg-[#A69584] text-white text-[11px] sm:text-xs uppercase tracking-[0.22em] font-medium px-8 py-3 transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
              >
                VIEW GALLERY
              </button>
            </div>
          </div>

          {/* Right Column: 4-Photo Interlocking Mosaic matching the screenshot */}
          <div className="lg:col-span-7 bg-[#F4EFEA] dark:bg-[#1D1A17] border border-[#ECE6DE] dark:border-[#2C2723] p-4 sm:p-6 md:p-8 rounded-sm shadow-2xs">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {/* Left Sub-Column */}
              <div className="space-y-3 sm:space-y-4">
                {/* Top: Couple on beach/sand */}
                <div
                  onClick={() => openLightbox(lauraAndJames.images.topSquare, 'Laura & James on the beach')}
                  className="overflow-hidden bg-[#E8E2D9] dark:bg-[#2A2622] cursor-pointer group"
                >
                  <img
                    src={lauraAndJames.images.topSquare}
                    alt="Laura and James walking along the Carmel beach"
                    className="w-full aspect-square sm:aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                {/* Bottom: Couple laughing on balcony */}
                <div
                  onClick={() => openLightbox(lauraAndJames.images.bottomSquare, 'Laura & James veranda laughter')}
                  className="overflow-hidden bg-[#E8E2D9] dark:bg-[#2A2622] cursor-pointer group"
                >
                  <img
                    src={lauraAndJames.images.bottomSquare}
                    alt="Laura and James sharing an intimate balcony moment"
                    className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Right Sub-Column */}
              <div className="space-y-3 sm:space-y-4">
                {/* Top: Groom holding bride gazing towards horizon (taller) */}
                <div
                  onClick={() => openLightbox(lauraAndJames.images.tallVertical, 'Laura & James coastal horizon embrace')}
                  className="overflow-hidden bg-[#E8E2D9] dark:bg-[#2A2622] cursor-pointer group"
                >
                  <img
                    src={lauraAndJames.images.tallVertical}
                    alt="Groom holding bride overlooking the ocean"
                    className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                {/* Bottom: Detailed bouquet & lace dress */}
                <div
                  onClick={() => openLightbox(lauraAndJames.images.detailHorizontal, 'Dried floral bouquet & lace gown')}
                  className="overflow-hidden bg-[#E8E2D9] dark:bg-[#2A2622] cursor-pointer group"
                >
                  <img
                    src={lauraAndJames.images.detailHorizontal}
                    alt="Close-up of dried floral bouquet and textured lace sleeves"
                    className="w-full aspect-square sm:aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COUPLE STORY 2: "MARIA & JOSH" (Matching provided screenshot) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: 4-Photo Interlocking Mosaic */}
          <div className="lg:col-span-7 order-2 lg:order-1 bg-[#F4EFEA] dark:bg-[#1D1A17] border border-[#ECE6DE] dark:border-[#2C2723] p-4 sm:p-6 md:p-8 rounded-sm shadow-2xs">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {/* Left Sub-Column */}
              <div className="space-y-3 sm:space-y-4">
                {/* Top: Couple laughing indoors */}
                <div
                  onClick={() => openLightbox(mariaAndJosh.images.topSquare, 'Maria & Josh laughing together')}
                  className="overflow-hidden bg-[#E8E2D9] dark:bg-[#2A2622] cursor-pointer group"
                >
                  <img
                    src={mariaAndJosh.images.topSquare}
                    alt="Maria and Josh sharing an unscripted laugh indoors"
                    className="w-full aspect-square sm:aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                {/* Bottom: Couple walking in golden hour meadow */}
                <div
                  onClick={() => openLightbox(mariaAndJosh.images.bottomSquare, 'Walking in the meadow at golden hour')}
                  className="overflow-hidden bg-[#E8E2D9] dark:bg-[#2A2622] cursor-pointer group"
                >
                  <img
                    src={mariaAndJosh.images.bottomSquare}
                    alt="Couple walking hand-in-hand through golden hour meadow"
                    className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Right Sub-Column */}
              <div className="space-y-3 sm:space-y-4">
                {/* Top: Bride smiling in veil with bouquet */}
                <div
                  onClick={() => openLightbox(mariaAndJosh.images.tallVertical, 'Maria in bridal veil with bouquet')}
                  className="overflow-hidden bg-[#E8E2D9] dark:bg-[#2A2622] cursor-pointer group"
                >
                  <img
                    src={mariaAndJosh.images.tallVertical}
                    alt="Bride with delicate veil and lush bridal bouquet"
                    className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                {/* Bottom: Clasped hands with gold wedding bands */}
                <div
                  onClick={() => openLightbox(mariaAndJosh.images.detailHorizontal, 'Entwined hands and wedding rings')}
                  className="overflow-hidden bg-[#E8E2D9] dark:bg-[#2A2622] cursor-pointer group"
                >
                  <img
                    src={mariaAndJosh.images.detailHorizontal}
                    alt="Close-up of entwined hands with classic gold wedding rings"
                    className="w-full aspect-square sm:aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Story Copy & CTA */}
          <div className="lg:col-span-5 order-1 lg:order-2 space-y-6 lg:pl-6">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl tracking-[0.22em] text-[#2C2825] dark:text-[#FAF7F2] uppercase font-normal">
              {mariaAndJosh.names}
            </h3>

            <p className="font-sans text-xs sm:text-sm text-[#78736E] dark:text-[#C4BCB1] leading-relaxed font-normal">
              {mariaAndJosh.story}
            </p>

            <div className="pt-2">
              <button
                onClick={() => setSelectedCoupleModal(mariaAndJosh)}
                className="inline-block rounded-full bg-[#B8A99A] hover:bg-[#A69584] text-white text-[11px] sm:text-xs uppercase tracking-[0.22em] font-medium px-8 py-3 transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
              >
                VIEW GALLERY
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PHILOSOPHY & ARTISTRY STRIP */}
      <section className="border-y border-[#E8E3DC] dark:border-[#2C2825] bg-[#F7F4EF]/60 dark:bg-[#1A1815]/60 py-20 transition-colors">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#78736E] dark:text-[#B5ACA2] font-semibold">
            OUR ARTISTIC APPROACH
          </span>
          <h3 className="font-serif-luxury italic text-3xl sm:text-4xl text-[#2C2825] dark:text-[#FAF7F2] font-normal leading-snug">
            “True romance is captured in quiet pauses—the soft brush of fingertips, tears swallowed before vows, and the unspoken certainty of forever.”
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#78736E] dark:text-[#C4BCB1] max-w-xl mx-auto leading-relaxed">
            We work unobtrusively, blending natural light, documentary intimacy, and timeless film color to craft an heirloom visual legacy for your family.
          </p>
          <div className="pt-4">
            <button
              onClick={() => navigateTo('/about')}
              className="text-xs uppercase tracking-[0.2em] text-[#2C2825] dark:text-[#FAF7F2] hover:text-[#B8A99A] dark:hover:text-[#D5C7B8] border-b border-[#2C2825] dark:border-[#FAF7F2] pb-1 font-medium transition-colors cursor-pointer"
            >
              READ OUR STORY & APPROACH →
            </button>
          </div>
        </div>
      </section>

      {/* 6. WEDDING PACKAGES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#78736E] dark:text-[#B5ACA2] font-semibold">
            INVESTMENT & COLLECTIONS
          </span>
          <h3 className="font-serif-luxury text-3xl sm:text-4xl tracking-wide text-[#2C2825] dark:text-[#FAF7F2] font-normal">
            Crafted for Unforgettable Celebrations
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#78736E] dark:text-[#C4BCB1] leading-relaxed">
            Each collection includes high-resolution digital negatives, printing rights, and private gallery access with bespoke heirloom album options.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {weddingData.packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`p-8 bg-white dark:bg-[#1B1815] border ${
                pkg.popular
                  ? 'border-[#B8A99A] ring-1 ring-[#B8A99A]'
                  : 'border-[#E8E3DC] dark:border-[#2F2B26]'
              } flex flex-col justify-between space-y-6 shadow-xs hover:shadow-md transition-all`}
            >
              <div className="space-y-4">
                {pkg.popular && (
                  <span className="inline-block bg-[#F4EFEA] dark:bg-[#2B2621] text-[#78736E] dark:text-[#D4C8BC] text-[10px] uppercase tracking-[0.2em] font-medium px-3 py-1 rounded-full">
                    MOST BELOVED
                  </span>
                )}
                <h4 className="font-serif-luxury text-2xl text-[#2C2825] dark:text-[#FAF7F2] tracking-wide font-normal">
                  {pkg.name}
                </h4>
                <p className="font-sans text-xs text-[#78736E] dark:text-[#C4BCB1] leading-relaxed">
                  {pkg.tagline}
                </p>
                <div className="text-3xl font-serif-luxury text-[#2C2825] dark:text-[#FAF7F2] pt-2">
                  {pkg.price}
                </div>
                <div className="text-xs uppercase tracking-wider text-[#78736E] dark:text-[#A89F94] font-medium border-b border-[#E8E3DC] dark:border-[#2F2B26] pb-4">
                  {pkg.hours} • {pkg.photographers}
                </div>

                <ul className="space-y-2.5 pt-2">
                  {pkg.deliverables.slice(0, 5).map((del, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-[#524E48] dark:text-[#D5CFC6] leading-relaxed">
                      <IconCheck size={14} className="text-[#B8A99A] mt-0.5 flex-shrink-0" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => navigateTo('/contact')}
                className="w-full rounded-full bg-[#B8A99A] hover:bg-[#A69584] text-white text-[11px] uppercase tracking-[0.2em] font-medium py-3 transition-colors cursor-pointer"
              >
                INQUIRE FOR YOUR DATE
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CLIENT RAVES & TESTIMONIALS */}
      <section className="max-w-5xl mx-auto px-6 text-center space-y-10">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#78736E] dark:text-[#B5ACA2] font-semibold">
          WORDS FROM OUR COUPLES
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {weddingData.testimonials.slice(0, 2).map((t, idx) => (
            <div key={idx} className="bg-white dark:bg-[#1B1815] p-8 border border-[#E8E3DC] dark:border-[#2F2B26] shadow-xs space-y-4">
              <p className="font-serif-luxury italic text-base sm:text-lg text-[#3D3833] dark:text-[#EDE8E0] leading-relaxed">
                “{t.quote}”
              </p>
              <div className="pt-2 border-t border-[#F2ECE5] dark:border-[#2A2621]">
                <span className="block font-serif-luxury text-base uppercase tracking-wider text-[#2C2825] dark:text-[#FAF7F2] font-normal">
                  {t.couple}
                </span>
                <span className="block text-[11px] text-[#78736E] dark:text-[#B0A79C] tracking-wider uppercase font-medium">
                  {t.location} • {t.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. INQUIRY BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EFEBE4] dark:bg-[#1D1A17] border border-[#E2DBD0] dark:border-[#2F2B26] p-10 sm:p-14 md:p-16 text-center space-y-6 rounded-sm shadow-xs transition-colors">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#78736E] dark:text-[#B5ACA2] font-semibold">
            RESERVING DATES FOR 2025 & 2026
          </span>
          <h3 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#2C2825] dark:text-[#FAF7F2] font-normal leading-snug">
            Let Us Tell Your Love Story
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#78736E] dark:text-[#C4BCB1] max-w-xl mx-auto leading-relaxed">
            We limit our calendar to 20 celebrations each year to ensure every couple receives our undivided artistic passion and care.
          </p>
          <div className="pt-4">
            <button
              onClick={() => navigateTo('/contact')}
              className="rounded-full bg-[#2C2825] dark:bg-[#FAF7F2] hover:bg-[#B8A99A] dark:hover:bg-[#EAE0D3] text-white dark:text-[#181614] text-xs uppercase tracking-[0.22em] font-medium px-10 py-3.5 transition-colors duration-300 shadow-md cursor-pointer"
            >
              BEGIN YOUR INQUIRY
            </button>
          </div>
        </div>
      </section>

      {/* MODAL: COUPLE FULL STORY VIEWER */}
      {selectedCoupleModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setSelectedCoupleModal(null)}
        >
          <div
            className="bg-[#FAF8F5] dark:bg-[#181614] border border-[#E8E3DC] dark:border-[#2F2B26] max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 space-y-8 rounded-sm text-[#2C2825] dark:text-[#FAF7F2] relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E8E3DC] dark:border-[#2F2B26] pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#78736E] dark:text-[#B5ACA2] font-semibold">
                  {selectedCoupleModal.location}
                </span>
                <h3 className="font-serif-luxury text-3xl tracking-widest text-[#2C2825] dark:text-[#FAF7F2] uppercase font-normal">
                  {selectedCoupleModal.names}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCoupleModal(null)}
                className="text-xs uppercase tracking-widest text-[#78736E] dark:text-[#C4BCB1] hover:text-[#2C2825] dark:hover:text-[#FFFFFF] border border-[#E8E3DC] dark:border-[#3D3731] px-3 py-1.5 cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            <p className="font-serif-luxury italic text-lg sm:text-xl text-[#524E48] dark:text-[#DDD5CA] leading-relaxed font-normal">
              {selectedCoupleModal.headline}
            </p>

            <p className="font-sans text-xs sm:text-sm text-[#78736E] dark:text-[#C4BCB1] leading-relaxed">
              {selectedCoupleModal.story}
            </p>

            {/* Gallery grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-4">
              {selectedCoupleModal.fullGallery.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => openLightbox(img.src, img.alt, selectedCoupleModal.fullGallery.map((g) => g.src))}
                  className="aspect-[3/4] overflow-hidden bg-[#E8E2D9] dark:bg-[#25221F] cursor-pointer group"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-[#E8E3DC] dark:border-[#2F2B26] flex items-center justify-between">
              <span className="text-xs text-[#78736E] dark:text-[#B5ACA2]">
                Interested in a similar celebration?
              </span>
              <button
                onClick={() => {
                  setSelectedCoupleModal(null);
                  navigateTo('/contact');
                }}
                className="rounded-full bg-[#B8A99A] hover:bg-[#A69584] text-white text-xs uppercase tracking-widest px-6 py-2.5 font-medium transition-colors cursor-pointer"
              >
                Inquire For Your Date
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
