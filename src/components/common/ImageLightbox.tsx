import React, { useEffect, useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  IconClose,
  IconArrowLeft,
  IconArrowRight,
  IconZoomIn
} from '../icons/Icons';

export const ImageLightbox: React.FC = () => {
  const {
    lightboxImage,
    lightboxAlt,
    lightboxList,
    lightboxIndex,
    closeLightbox,
    nextLightbox,
    prevLightbox,
    openLightbox
  } = useApp();

  const [isZoomed, setIsZoomed] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        nextLightbox();
      } else if (e.key === 'ArrowLeft') {
        prevLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage, closeLightbox, nextLightbox, prevLightbox]);

  if (!lightboxImage) return null;

  const total = lightboxList.length;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      nextLightbox();
    } else if (diff < -50) {
      prevLightbox();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#121110]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery fullscreen view"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between text-[#FAF9F5] z-10">
        <div className="text-xs uppercase tracking-widest font-mono text-[#A69F91]">
          {total > 1 ? `${lightboxIndex + 1} / ${total}` : 'GALLERY VIEW'}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2 text-[#FAF9F5] hover:text-[#D4CEBF] cursor-pointer transition-colors"
            aria-label={isZoomed ? 'Reset zoom' : 'Zoom image'}
          >
            <IconZoomIn size={22} />
          </button>
          <button
            onClick={closeLightbox}
            className="p-2 text-[#FAF9F5] hover:text-[#D4CEBF] cursor-pointer transition-colors"
            aria-label="Close fullscreen gallery"
          >
            <IconClose size={26} />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden py-4">
        {total > 1 && (
          <button
            onClick={prevLightbox}
            className="absolute left-2 sm:left-4 z-20 p-3 text-[#FAF9F5] bg-[#191816]/70 hover:bg-[#191816] rounded-none transition-colors cursor-pointer"
            aria-label="Previous image"
          >
            <IconArrowLeft size={24} />
          </button>
        )}

        <div className="max-w-5xl max-h-full flex flex-col items-center justify-center select-none">
          <img
            src={lightboxImage}
            alt={lightboxAlt || 'THE AMENA BRAND editorial image'}
            className={`max-h-[75vh] w-auto max-w-full object-contain transition-transform duration-300 ${
              isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
            draggable={false}
          />
          {lightboxAlt && (
            <p className="text-center text-xs text-[#A69F91] mt-3 tracking-wide font-sans max-w-lg">
              {lightboxAlt}
            </p>
          )}
        </div>

        {total > 1 && (
          <button
            onClick={nextLightbox}
            className="absolute right-2 sm:right-4 z-20 p-3 text-[#FAF9F5] bg-[#191816]/70 hover:bg-[#191816] rounded-none transition-colors cursor-pointer"
            aria-label="Next image"
          >
            <IconArrowRight size={24} />
          </button>
        )}
      </div>

      {/* Bottom Thumbnails */}
      {total > 1 && (
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 z-10">
          {lightboxList.map((img, i) => (
            <button
              key={i}
              onClick={() => {
                openLightbox(img, lightboxAlt, lightboxList);
              }}
              className={`h-12 w-12 flex-shrink-0 overflow-hidden border transition-all cursor-pointer ${
                i === lightboxIndex ? 'border-[#FAF9F5] opacity-100 scale-105' : 'border-transparent opacity-40 hover:opacity-80'
              }`}
            >
              <img src={img} alt={`Thumbnail ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
