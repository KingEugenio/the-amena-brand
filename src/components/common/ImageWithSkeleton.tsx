import React, { useState } from 'react';

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  thumbnail?: string;
  caption?: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square' | 'wide' | 'tall';
  width?: number;
  height?: number;
  priority?: boolean;
  onClick?: () => void;
  hoverScale?: boolean;
}

export const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  src,
  alt,
  thumbnail,
  caption,
  className = '',
  containerClassName = '',
  aspectRatio = 'portrait',
  width,
  height,
  priority = false,
  onClick,
  hoverScale = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const aspectClass =
    aspectRatio === 'landscape'
      ? 'aspect-[4/3]'
      : aspectRatio === 'portrait'
      ? 'aspect-[3/4]'
      : aspectRatio === 'wide'
      ? 'aspect-[16/9]'
      : aspectRatio === 'tall'
      ? 'aspect-[2/3]'
      : 'aspect-square';

  const handleRetry = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHasError(false);
    setIsLoaded(false);
    setRetryCount((prev) => prev + 1);
  };

  // Generate responsive srcSet with query parameters if Unsplash
  const getSrcSet = (baseSrc: string) => {
    if (!baseSrc.includes('unsplash.com')) return undefined;
    const cleanUrl = baseSrc.split('?')[0];
    return `${cleanUrl}?auto=format&fit=crop&w=640&q=75 640w, ${cleanUrl}?auto=format&fit=crop&w=1024&q=80 1024w, ${cleanUrl}?auto=format&fit=crop&w=1600&q=85 1600w, ${cleanUrl}?auto=format&fit=crop&w=2000&q=85 2000w`;
  };

  return (
    <figure className={`group relative overflow-hidden bg-[var(--card-bg)] ${aspectClass} ${containerClassName}`}>
      {/* Skeleton state */}
      {!isLoaded && !hasError && (
        <div 
          className="absolute inset-0 bg-[var(--card-bg)] skeleton-shimmer z-0"
          aria-hidden="true" 
        />
      )}

      {/* Low-res thumbnail blur-up preview if available */}
      {thumbnail && !isLoaded && !hasError && (
        <img
          src={thumbnail}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-md scale-105 transition-opacity duration-700 opacity-60 z-1"
        />
      )}

      {/* Error state */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[var(--card-bg)] text-[var(--text-main)] z-10">
          <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2 font-mono font-medium">Unable to load image</p>
          <button
            type="button"
            onClick={handleRetry}
            className="text-xs tracking-wider uppercase border border-[var(--text-main)] text-[var(--text-main)] px-4 py-1.5 hover:bg-[var(--text-main)] hover:text-[var(--bg-base)] transition-colors cursor-pointer font-medium"
          >
            Retry
          </button>
        </div>
      ) : (
        /* Primary image */
        <img
          key={`${src}-${retryCount}`}
          src={src}
          srcSet={getSrcSet(src)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          onClick={onClick}
          className={`relative z-2 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${
            hoverScale ? 'group-hover:scale-[1.03]' : ''
          } ${onClick ? 'cursor-pointer' : ''} ${className}`}
        />
      )}

      {/* Caption if provided */}
      {caption && isLoaded && (
        <figcaption className="sr-only">{caption}</figcaption>
      )}
    </figure>
  );
};
