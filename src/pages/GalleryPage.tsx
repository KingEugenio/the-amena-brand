import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { weddingData } from '../data/weddingData';

export const GalleryPage: React.FC = () => {
  const { openLightbox, navigateTo } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredItems =
    activeCategory === 'All'
      ? weddingData.portfolioItems
      : weddingData.portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <div className="bg-[#FAF8F5] dark:bg-[#12100E] text-[#2C2825] dark:text-[#FAF7F2] pb-24 space-y-16 sm:space-y-20 transition-colors">
      {/* Page Header */}
      <section className="pt-12 sm:pt-16 pb-6 max-w-4xl mx-auto px-6 text-center space-y-4 border-b border-[#E8E3DC] dark:border-[#2C2723]">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#78736E] dark:text-[#B5ACA2] font-semibold">
          SELECTED WEDDING PORTFOLIO
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-[#2C2825] dark:text-[#FAF7F2] font-light">
          Timeless Love Stories
        </h1>
        <p className="font-sans text-xs sm:text-sm text-[#78736E] dark:text-[#C4BCB1] max-w-xl mx-auto leading-relaxed font-normal">
          A visual chronicle of quiet intimacy, celebratory joy, and sacred promises captured across the world's most romantic venues.
        </p>

        {/* Filter Tabs */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {weddingData.portfolioCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs uppercase tracking-[0.18em] px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#2C2825] dark:bg-[#FAF7F2] text-white dark:text-[#181614] font-medium shadow-xs'
                  : 'bg-white dark:bg-[#1B1815] text-[#78736E] dark:text-[#C4BCB1] hover:text-[#2C2825] dark:hover:text-[#FAF7F2] border border-[#E8E3DC] dark:border-[#2F2B26]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                openLightbox(
                  item.image,
                  `${item.title} - ${item.couple}`,
                  filteredItems.map((i) => i.image)
                )
              }
              className="group cursor-pointer bg-white dark:bg-[#1B1815] p-3 border border-[#E8E3DC] dark:border-[#2F2B26] shadow-2xs hover:shadow-md transition-all duration-300"
            >
              <div className="aspect-[3/4] overflow-hidden bg-[#E8E2D9] dark:bg-[#25221F] relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>

              <div className="pt-4 pb-1 space-y-1 text-center">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#78736E] dark:text-[#B5ACA2] block font-sans font-medium">
                  {item.category} • {item.location}
                </span>
                <h3 className="font-serif-luxury text-xl text-[#2C2825] dark:text-[#FAF7F2] tracking-wide font-normal">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Love Stories Feature Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F4EFEA] dark:bg-[#1D1A17] p-8 sm:p-14 border border-[#E8E3DC] dark:border-[#2F2B26] text-center space-y-6 shadow-xs">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#78736E] dark:text-[#B5ACA2] font-semibold">
            FEATURED WEDDING NARRATIVES
          </span>
          <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#2C2825] dark:text-[#FAF7F2] font-light">
            Read The Complete Couple Stories
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#78736E] dark:text-[#C4BCB1] max-w-lg mx-auto leading-relaxed">
            Discover full wedding day galleries, emotional timeline details, and personal vows from Laura & James, Maria & Josh, and more.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('/')}
              className="rounded-full bg-[#B8A99A] hover:bg-[#A69584] text-white text-xs uppercase tracking-[0.2em] font-medium px-8 py-3 transition-colors cursor-pointer shadow-xs"
            >
              EXPLORE STORIES ON HOMEPAGE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
