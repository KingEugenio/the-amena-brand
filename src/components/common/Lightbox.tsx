import React, { useEffect, useState, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Pause, ZoomIn, ZoomOut, Shield } from 'lucide-react';
import { GalleryImage } from '../../types';

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange: (newIndex: number) => void;
  photographerName?: string;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onIndexChange,
  photographerName = 'FREDDIESHOTIT',
}) => {
  const [showWatermark, setShowWatermark] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isPlayingSlideshow, setIsPlayingSlideshow] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  const currentImage = images[currentIndex];

  const handlePrev = useCallback(() => {
    setIsZoomed(false);
    onIndexChange(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  }, [currentIndex, images.length, onIndexChange]);

  const handleNext = useCallback(() => {
    setIsZoomed(false);
    onIndexChange(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, images.length, onIndexChange]);

  // Keyboard navigation & escape listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlayingSlideshow((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, handleNext, handlePrev, onClose]);

  // Slideshow auto-advance timer
  useEffect(() => {
    if (!isPlayingSlideshow || !isOpen) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3500);
    return () => clearInterval(interval);
  }, [isPlayingSlideshow, isOpen, handleNext]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
  };

  if (!isOpen || !currentImage) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery fullscreen preview"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D0D0D]/95 backdrop-blur-sm text-white select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top action bar */}
      <div className="absolute top-0 inset-x-0 h-20 px-6 sm:px-10 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center space-x-4">
          <span className="text-xs uppercase tracking-widest text-[#A3A3A3] font-mono">
            Photograph {currentIndex + 1}
          </span>
          {currentImage.caption && (
            <span className="hidden md:inline-block text-xs text-[#D4D4D4] max-w-md truncate border-l border-[#404040] pl-4 font-light">
              {currentImage.caption}
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Slideshow button */}
          <button
            type="button"
            onClick={() => setIsPlayingSlideshow(!isPlayingSlideshow)}
            className={`p-2 rounded hover:bg-white/10 transition-colors ${
              isPlayingSlideshow ? 'text-[#C5A880]' : 'text-white'
            }`}
            title={isPlayingSlideshow ? 'Pause Slideshow (Space)' : 'Play Slideshow (Space)'}
            aria-label={isPlayingSlideshow ? 'Pause Slideshow' : 'Play Slideshow'}
          >
            {isPlayingSlideshow ? <Pause size={18} /> : <Play size={18} />}
          </button>

          {/* Zoom button */}
          <button
            type="button"
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2 rounded hover:bg-white/10 transition-colors text-white"
            title="Toggle Zoom"
            aria-label="Toggle Zoom"
          >
            {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
          </button>

          {/* Watermark toggle */}
          <button
            type="button"
            onClick={() => setShowWatermark(!showWatermark)}
            className={`p-2 rounded hover:bg-white/10 transition-colors ${
              showWatermark ? 'text-[#C5A880]' : 'text-[#A3A3A3]'
            }`}
            title="Toggle Studio Watermark"
            aria-label="Toggle Watermark"
          >
            <Shield size={18} />
          </button>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded hover:bg-white/20 transition-colors text-white ml-2 cursor-pointer"
            title="Close (Esc)"
            aria-label="Close Lightbox"
          >
            <X size={22} />
          </button>
        </div>
      </div>

      {/* Main Image Display Area */}
      <div 
        className="relative w-full h-full flex items-center justify-center p-4 sm:p-16 overflow-hidden"
        onClick={() => {
          if (isZoomed) setIsZoomed(false);
        }}
      >
        <div className={`relative transition-transform duration-300 ${isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-default'}`}>
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="max-h-[82vh] max-w-[92vw] object-contain shadow-2xl transition-opacity duration-300"
          />

          {/* Optional Watermark overlay */}
          {showWatermark && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 select-none">
              <span className="text-xl sm:text-2xl tracking-[0.4em] uppercase font-editorial font-light text-white/70 border-b border-white/40 pb-1">
                © {photographerName}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Previous / Next Arrow Controls */}
      <button
        type="button"
        onClick={handlePrev}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
        aria-label="Previous photograph"
      >
        <ChevronLeft size={32} />
      </button>

      <button
        type="button"
        onClick={handleNext}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
        aria-label="Next photograph"
      >
        <ChevronRight size={32} />
      </button>
    </div>
  );
};
