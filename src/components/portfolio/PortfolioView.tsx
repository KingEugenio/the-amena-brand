import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Calendar, Check, ArrowRight, Grid, Film, CalendarCheck } from 'lucide-react';
import { CategoryType, GalleryImage } from '../../types';
import { category10Images, categoryBookingNotices, CategoryGalleryItem } from '../../data/categoryPortfolios';
import { ImageWithSkeleton } from '../common/ImageWithSkeleton';
import { PortfolioGridSkeleton } from '../common/Skeletons';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { Lightbox } from '../common/Lightbox';
import { WhatsAppIcon } from '../common/WhatsAppIcon';

const categoryTabs: { key: CategoryType; label: string }[] = [
  { key: 'all', label: 'All Work' },
  { key: 'weddings', label: 'Weddings' },
  { key: 'portraits', label: 'Portraits' },
  { key: 'events', label: 'Events' },
  { key: 'editorial', label: 'Editorial' },
  { key: 'commercial', label: 'Commercial' },
];

export const PortfolioView: React.FC = () => {
  const { navigateTo, simulateLoading, settings } = useSiteConfig();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('weddings');
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const carouselTrackRef = useRef<HTMLDivElement>(null);

  // Sync category filter from URL hash if available (e.g. #/portfolio?cat=weddings)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('?cat=')) {
      const cat = hash.split('?cat=')[1]?.toLowerCase() as CategoryType;
      if (categoryTabs.some((c) => c.key === cat)) {
        setSelectedCategory(cat);
      }
    }
  }, []);

  // Determine current active category images
  const activeCategoryKey = selectedCategory === 'all' ? 'weddings' : selectedCategory;
  const currentImages: CategoryGalleryItem[] = category10Images[activeCategoryKey] || category10Images.weddings;
  const activeNotice = categoryBookingNotices[activeCategoryKey] || categoryBookingNotices.weddings;

  // Convert to Lightbox-compatible GalleryImage format (without camera brand or technical settings)
  const lightboxImages: GalleryImage[] = currentImages.map((item) => ({
    id: item.id,
    src: item.src,
    alt: item.alt,
    caption: `${item.title} — ${item.location} (${item.date})`,
    aspectRatio: item.aspectRatio,
  }));

  const handleCategorySelect = (cat: CategoryType) => {
    setSelectedCategory(cat);
    setCurrentSlideIndex(0);
    window.location.hash = cat === 'all' ? '#/portfolio' : `#/portfolio?cat=${cat}`;
    if (carouselTrackRef.current) {
      carouselTrackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  // Scroll to slide with infinite looping
  const scrollToSlide = useCallback((index: number) => {
    if (!carouselTrackRef.current) return;
    const track = carouselTrackRef.current;
    const slides = track.querySelectorAll('[data-slide-item]');
    if (slides[index]) {
      const targetElement = slides[index] as HTMLElement;
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      setCurrentSlideIndex(index);
    }
  }, []);

  // Infinite Loop Navigation:
  // When at the last slide and clicking next, loop smoothly to the first slide!
  const handleNextSlide = () => {
    if (currentSlideIndex >= currentImages.length - 1) {
      // Loop to next (first image)
      scrollToSlide(0);
    } else {
      scrollToSlide(currentSlideIndex + 1);
    }
  };

  // When at the first slide and clicking prev, loop smoothly to the last slide!
  const handlePrevSlide = () => {
    if (currentSlideIndex <= 0) {
      // Loop to next (last image)
      scrollToSlide(currentImages.length - 1);
    } else {
      scrollToSlide(currentSlideIndex - 1);
    }
  };

  // Observer to track current visible slide on scroll
  const handleTrackScroll = () => {
    if (!carouselTrackRef.current) return;
    const track = carouselTrackRef.current;
    const scrollLeft = track.scrollLeft;
    const cardWidth = track.firstElementChild ? (track.firstElementChild as HTMLElement).offsetWidth : 400;
    const newIndex = Math.round(scrollLeft / (cardWidth + 24));
    if (newIndex >= 0 && newIndex < currentImages.length && newIndex !== currentSlideIndex) {
      setCurrentSlideIndex(newIndex);
    }
  };

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleBookCategory = (serviceKey: string) => {
    navigateTo('book', serviceKey);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const handleWhatsAppBooking = (message: string) => {
    const cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${cleanNumber}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  if (simulateLoading) {
    return <PortfolioGridSkeleton />;
  }

  return (
    <div className="pt-28 sm:pt-36 pb-24 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto w-full">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] text-[var(--text-muted)] font-mono block">
          Complete Visual Archive
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-normal text-[var(--text-main)]">
          The Portfolio
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-muted)] font-normal leading-relaxed">
          Curated photography collections crafted with natural light, quiet presence, and archival permanence.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 pb-8 mb-8 border-b border-[var(--border-line)]">
        {categoryTabs.map((cat) => {
          const isSelected = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => handleCategorySelect(cat.key)}
              className={`text-xs uppercase tracking-[0.2em] px-4 py-2.5 transition-all cursor-pointer relative ${
                isSelected
                  ? 'text-[var(--text-main)] font-semibold border-b-2 border-[var(--text-main)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)] border-b-2 border-transparent'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* View Mode & Loop Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[var(--border-line)] text-xs font-mono text-[var(--text-muted)]">
        <div className="flex items-center gap-3">
          <span className="uppercase tracking-widest text-[var(--text-main)] font-bold">
            {activeNotice.categoryTitle}
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1.5 text-[var(--primary-accent)]">
            <RotateCcw size={12} className="animate-spin-slow" />
            <span>Continuous Loop Stream</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="tracking-wider">
            Photograph {currentSlideIndex + 1}
          </span>
          <div className="flex items-center border border-[var(--border-line)] rounded-sm p-0.5 bg-[var(--card-bg)]">
            <button
              type="button"
              onClick={() => setViewMode('carousel')}
              className={`p-1.5 transition-colors cursor-pointer ${
                viewMode === 'carousel'
                  ? 'bg-[var(--text-main)] text-[var(--bg-base)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
              title="Filmstrip Stream (Looping Carousel)"
              aria-label="Carousel Mode"
            >
              <Film size={14} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[var(--text-main)] text-[var(--bg-base)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
              title="Editorial Grid View"
              aria-label="Grid Mode"
            >
              <Grid size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* CAROUSEL / FILMSTRIP STREAM VIEW WITH SMOOTH INFINITE LOOP */}
      {viewMode === 'carousel' && (
        <div className="space-y-8 mb-16">
          {/* Scrollable Track */}
          <div className="relative group">
            <div
              ref={carouselTrackRef}
              onScroll={handleTrackScroll}
              className="flex gap-6 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory scrollbar-thin select-none"
              style={{ scrollbarGutter: 'stable' }}
            >
              {currentImages.map((item, index) => {
                return (
                  <div
                    key={item.id}
                    data-slide-item
                    className="shrink-0 w-[88vw] sm:w-[540px] md:w-[620px] lg:w-[680px] snap-center cursor-pointer flex flex-col justify-between group/card"
                    onClick={() => handleOpenLightbox(index)}
                  >
                    <div className="relative overflow-hidden bg-[var(--border-line)] border border-[var(--border-line)] rounded-xs">
                      <ImageWithSkeleton
                        src={item.src}
                        thumbnail={item.thumbnail}
                        alt={item.alt}
                        aspectRatio={item.aspectRatio}
                        containerClassName="w-full h-[400px] sm:h-[480px] md:h-[540px]"
                        priority={index === 0}
                        hoverScale={true}
                      />

                      {/* Photo Index Badge */}
                      <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-xs text-white text-[10px] font-mono px-2.5 py-1 tracking-wider uppercase z-10">
                        <span>{String(index + 1).padStart(2, '0')}</span>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/35 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                        <span className="text-xs uppercase tracking-[0.25em] text-white border border-white/60 px-5 py-2.5 backdrop-blur-xs font-mono">
                          Expand Image
                        </span>
                      </div>
                    </div>

                    {/* Metadata strip (Title, Location, Date, Caption - without camera brand or settings) */}
                    <div className="mt-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[var(--border-line)] pb-3">
                      <div>
                        <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)] font-mono block">
                          {item.location} &bull; {item.date}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-editorial font-normal text-[var(--text-main)] group-hover/card:text-[var(--primary-accent)] transition-colors mt-0.5">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[var(--text-muted)] font-normal mt-1 italic">
                          {item.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* End-of-gallery Loop Action Card */}
              <div
                className="shrink-0 w-[280px] sm:w-[340px] snap-center flex flex-col justify-center items-center text-center p-8 bg-[var(--card-bg)] border-2 border-dashed border-[var(--border-line)] hover:border-[var(--primary-accent)] transition-all cursor-pointer group/loop"
                onClick={() => scrollToSlide(0)}
              >
                <div className="w-14 h-14 rounded-full bg-[var(--border-line)] group-hover/loop:bg-[var(--primary-accent)] group-hover/loop:text-white transition-colors flex items-center justify-center mb-4 text-[var(--text-main)]">
                  <RotateCcw size={22} />
                </div>
                <span className="text-xs uppercase font-mono tracking-widest text-[var(--text-muted)] block mb-1">
                  End of Series
                </span>
                <h4 className="text-xl font-editorial font-normal text-[var(--text-main)] mb-2">
                  Loop to next
                </h4>
                <p className="text-xs text-[var(--text-muted)] font-normal max-w-[200px] leading-relaxed">
                  Click to continue the visual stream from the beginning.
                </p>
              </div>
            </div>

            {/* Navigation Controls (Previous & Next with Loop to next) */}
            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={handlePrevSlide}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] px-4 py-3 border border-[var(--border-line)] bg-[var(--card-bg)] hover:bg-[var(--text-main)] hover:text-[var(--bg-base)] transition-all cursor-pointer font-medium"
                aria-label="Previous photograph"
              >
                <ChevronLeft size={16} />
                <span>
                  {currentSlideIndex === 0 ? 'Loop to next' : 'Previous'}
                </span>
              </button>

              {/* Dot Indicators */}
              <div className="hidden sm:flex items-center gap-2">
                {currentImages.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => scrollToSlide(dotIdx)}
                    className={`h-1.5 transition-all cursor-pointer ${
                      currentSlideIndex === dotIdx
                        ? 'w-7 bg-[var(--text-main)]'
                        : 'w-2 bg-[var(--border-line)] hover:bg-[var(--text-muted)]'
                    }`}
                    title={`Go to image ${dotIdx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNextSlide}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] px-4 py-3 border border-[var(--border-line)] bg-[var(--card-bg)] hover:bg-[var(--text-main)] hover:text-[var(--bg-base)] transition-all cursor-pointer font-medium"
                aria-label="Next photograph"
              >
                <span>
                  {currentSlideIndex === currentImages.length - 1 ? 'Loop to next' : 'Next'}
                </span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CURATED EDITORIAL GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 mb-16">
          {currentImages.map((item, index) => {
            const colSpan =
              index % 3 === 0
                ? 'md:col-span-12 lg:col-span-8'
                : index % 3 === 1
                ? 'md:col-span-6 lg:col-span-4'
                : 'md:col-span-6 lg:col-span-6';

            return (
              <article
                key={item.id}
                className={`${colSpan} group cursor-pointer flex flex-col justify-between border-b border-[var(--border-line)] pb-6`}
                onClick={() => handleOpenLightbox(index)}
              >
                <div className="relative overflow-hidden bg-[var(--border-line)]">
                  <ImageWithSkeleton
                    src={item.src}
                    thumbnail={item.thumbnail}
                    alt={item.alt}
                    aspectRatio={item.aspectRatio}
                    containerClassName="w-full h-[360px] sm:h-[440px]"
                    hoverScale={true}
                  />
                  <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-xs text-white text-[10px] font-mono px-2.5 py-1 tracking-wider uppercase z-10">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] font-mono block">
                      {item.location} &bull; {item.date}
                    </span>
                    <h3 className="text-xl font-editorial font-normal text-[var(--text-main)] group-hover:text-[var(--primary-accent)] transition-colors mt-0.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] font-normal mt-1 italic">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* CATEGORY-SPECIFIC BOOKING NOTICE (Placed directly at the end of the pictures relating to the active category) */}
      <section className="mt-20 border border-[var(--border-line)] bg-[var(--card-bg)] p-8 sm:p-14 lg:p-16 relative overflow-hidden transition-colors duration-200">
        {/* Subtle decorative accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--primary-accent)]" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left notice copy */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs uppercase font-mono tracking-[0.25em] text-[var(--primary-accent)]">
              <CalendarCheck size={14} />
              <span>Commission Notice &bull; {activeNotice.categoryTitle}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-normal text-[var(--text-main)] leading-[1.1]">
              {activeNotice.tagline}
            </h2>

            <p className="text-base sm:text-lg text-[var(--text-muted)] font-normal leading-relaxed">
              {activeNotice.description}
            </p>

            <div className="pt-2 space-y-2.5">
              <span className="text-xs uppercase font-mono tracking-wider text-[var(--text-main)] font-semibold block">
                What to Expect:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeNotice.highlights.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[var(--text-muted)] font-normal">
                    <Check size={14} className="text-[var(--primary-accent)] mt-0.5 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right action box */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4 lg:border-l lg:border-[var(--border-line)] lg:pl-10">
            <div className="p-6 bg-[var(--bg-base)] border border-[var(--border-line)] space-y-4">
              <div className="flex items-center justify-between text-xs font-mono uppercase text-[var(--text-muted)]">
                <span>Direct Commission</span>
                <span className="text-[var(--primary-accent)] font-semibold">2026 Season</span>
              </div>

              <p className="text-xs text-[var(--text-muted)] font-normal leading-relaxed">
                Connect directly with FREDDIESHOTIT to check exact calendar availability and receive bespoke proposal terms.
              </p>

              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleBookCategory(activeNotice.serviceRouteKey)}
                  className="w-full text-xs uppercase tracking-[0.25em] font-semibold bg-[var(--text-main)] text-[var(--bg-base)] px-6 py-4 hover:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  <Calendar size={14} />
                  <span>{activeNotice.buttonText}</span>
                  <ArrowRight size={14} />
                </button>

                <button
                  type="button"
                  onClick={() => handleWhatsAppBooking(activeNotice.whatsappMessage)}
                  className="w-full text-xs uppercase tracking-[0.22em] font-semibold border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 px-6 py-3.5 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <WhatsAppIcon size={16} className="fill-[#25D366] text-[#25D366]" />
                  <span>Inquire on WhatsApp (0544795536)</span>
                </button>
              </div>
            </div>

            <p className="text-[11px] font-mono text-[var(--text-muted)] text-center">
              Accra studio &bull; Worldwide travel &bull; Rapid response
            </p>
          </div>
        </div>
      </section>

      {/* Lightbox with continuous looping across images */}
      <Lightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setLightboxIndex}
        photographerName={settings.photographerName}
      />
    </div>
  );
};
