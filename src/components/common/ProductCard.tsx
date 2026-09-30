import React, { useState } from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { IconWhatsApp, IconArrowRight, IconEye } from '../icons/Icons';

interface ProductCardProps {
  product: Product;
  aspectRatio?: 'portrait' | 'square';
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  aspectRatio = 'portrait',
  priority = false
}) => {
  const { navigateTo, openWhatsApp, openLightbox } = useApp();
  const [isHovered, setIsHovered] = useState(false);

  // If product has a second image, use it for hover reveal
  const secondaryImage = product.images && product.images.length > 1 ? product.images[1] : null;
  const currentImage = isHovered && secondaryImage ? secondaryImage : product.mainImage;

  const aspectClass = aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square';

  return (
    <div
      className="group flex flex-col justify-between select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Editorial Image Container */}
      <div className="relative overflow-hidden bg-[#F3F1EB] border border-[#E5E1D8]">
        {/* Status / Category Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
          {product.newArrival && (
            <span className="bg-[#191816] text-[#FAF9F5] text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 font-medium font-sans">
              NEW RELEASE
            </span>
          )}
          {product.availability === 'Made to Order' && (
            <span className="bg-[#FAF9F5]/90 backdrop-blur-xs text-[#191816] border border-[#E5E1D8] text-[9px] uppercase tracking-[0.18em] px-2 py-0.5 font-medium font-sans">
              MADE TO ORDER
            </span>
          )}
        </div>

        {/* Quick Zoom/Lightbox Trigger */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            openLightbox(product.mainImage, product.name, product.images);
          }}
          className="absolute top-3 right-3 z-10 p-2 bg-[#FAF9F5]/80 hover:bg-[#FAF9F5] text-[#191816] opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          aria-label={`View full image for ${product.name}`}
        >
          <IconEye size={16} />
        </button>

        {/* Clickable Image to Product Detail */}
        <div
          onClick={() => navigateTo(`/shop/${product.slug}`)}
          className={`${aspectClass} w-full cursor-pointer relative overflow-hidden`}
        >
          <img
            src={currentImage}
            alt={product.altText || product.name}
            loading={priority ? 'eager' : 'lazy'}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>

        {/* Floating Quick Action Overlay on Desktop */}
        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-[#191816]/70 via-[#191816]/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-between pointer-events-auto">
          <button
            onClick={() => navigateTo(`/shop/${product.slug}`)}
            className="text-xs uppercase tracking-widest text-[#FAF9F5] hover:text-[#D4CEBF] font-medium transition-colors cursor-pointer"
          >
            VIEW PIECE
          </button>
          <button
            onClick={() => openWhatsApp('product', product.name)}
            className="p-1.5 bg-[#FAF9F5] text-[#191816] hover:bg-[#25D366] hover:text-white transition-colors cursor-pointer"
            title="Enquire on WhatsApp"
            aria-label={`Enquire about ${product.name} on WhatsApp`}
          >
            <IconWhatsApp size={16} />
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="pt-4 pb-2 space-y-1.5">
        <div className="flex items-center justify-between text-xs text-[#6B6862] font-sans">
          <span className="uppercase tracking-[0.18em]">{product.category}</span>
          <span className="font-mono text-[#191816] text-xs">
            {product.price ? `${product.currency} ${product.price.toLocaleString()}` : 'Price on Request'}
          </span>
        </div>

        <h3
          onClick={() => navigateTo(`/shop/${product.slug}`)}
          className="font-serif-heading text-base sm:text-lg text-[#191816] hover:text-[#9A5B32] transition-colors cursor-pointer line-clamp-1"
        >
          {product.name}
        </h3>

        <p className="text-xs text-[#6B6862] line-clamp-1 font-sans font-light">
          {product.shortDescription}
        </p>

        {/* Mobile-visible direct WhatsApp link */}
        <div className="pt-2 sm:hidden flex items-center justify-between border-t border-[#E5E1D8]">
          <button
            onClick={() => navigateTo(`/shop/${product.slug}`)}
            className="text-[11px] uppercase tracking-wider text-[#191816] font-medium"
          >
            Details
          </button>
          <button
            onClick={() => openWhatsApp('product', product.name)}
            className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#25D366] font-medium"
          >
            <IconWhatsApp size={13} />
            <span>Enquire</span>
          </button>
        </div>
      </div>
    </div>
  );
};
