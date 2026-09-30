import React from 'react';

export const ImageSkeleton: React.FC<{
  className?: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square' | 'wide' | 'tall';
}> = ({ className = '', aspectRatio = 'portrait' }) => {
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

  return (
    <div
      className={`relative w-full overflow-hidden bg-[var(--border-line)] skeleton-shimmer ${aspectClass} ${className}`}
      aria-hidden="true"
    />
  );
};

export const HeroSkeleton: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between pt-28 pb-16 px-6 sm:px-12 max-w-7xl mx-auto w-full">
      <div className="space-y-6 max-w-2xl">
        <div className="h-4 w-48 bg-[var(--border-line)] skeleton-shimmer" />
        <div className="h-16 w-3/4 bg-[var(--border-line)] skeleton-shimmer" />
        <div className="h-6 w-full bg-[var(--border-line)] skeleton-shimmer" />
        <div className="flex gap-4 pt-4">
          <div className="h-12 w-44 bg-[var(--border-line)] skeleton-shimmer" />
          <div className="h-12 w-40 bg-[var(--border-line)] skeleton-shimmer" />
        </div>
      </div>
      <div className="mt-12 w-full h-[550px] bg-[var(--border-line)] skeleton-shimmer" />
    </section>
  );
};

export const PortfolioCardSkeleton: React.FC<{ tall?: boolean }> = ({ tall }) => {
  return (
    <div className="space-y-4">
      <div className={`w-full bg-[var(--border-line)] skeleton-shimmer ${tall ? 'aspect-[2/3]' : 'aspect-[3/4]'}`} />
      <div className="space-y-2">
        <div className="h-3 w-24 bg-[var(--border-line)] skeleton-shimmer" />
        <div className="h-6 w-48 bg-[var(--border-line)] skeleton-shimmer" />
        <div className="h-3 w-32 bg-[var(--border-line)] skeleton-shimmer" />
      </div>
    </div>
  );
};

export const PortfolioGridSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
      {/* Category filters placeholder */}
      <div className="flex justify-center gap-8 mb-16">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-4 w-20 bg-[var(--border-line)] skeleton-shimmer" />
        ))}
      </div>
      {/* Asymmetric layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        <div className="md:col-span-7">
          <PortfolioCardSkeleton tall />
        </div>
        <div className="md:col-span-5 md:pt-16">
          <PortfolioCardSkeleton />
        </div>
        <div className="md:col-span-4">
          <PortfolioCardSkeleton />
        </div>
        <div className="md:col-span-8">
          <PortfolioCardSkeleton tall />
        </div>
      </div>
    </div>
  );
};

export const ProjectSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 pt-28 pb-20 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="h-4 w-32 mx-auto bg-[var(--border-line)] skeleton-shimmer" />
        <div className="h-14 w-3/4 mx-auto bg-[var(--border-line)] skeleton-shimmer" />
        <div className="h-4 w-48 mx-auto bg-[var(--border-line)] skeleton-shimmer" />
      </div>
      <div className="w-full h-[600px] bg-[var(--border-line)] skeleton-shimmer" />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-8">
        <div className="md:col-span-4 space-y-4">
          <div className="h-4 w-28 bg-[var(--border-line)] skeleton-shimmer" />
          <div className="h-4 w-36 bg-[var(--border-line)] skeleton-shimmer" />
          <div className="h-4 w-32 bg-[var(--border-line)] skeleton-shimmer" />
        </div>
        <div className="md:col-span-8 space-y-4">
          <div className="h-5 w-full bg-[var(--border-line)] skeleton-shimmer" />
          <div className="h-5 w-5/6 bg-[var(--border-line)] skeleton-shimmer" />
          <div className="h-5 w-4/6 bg-[var(--border-line)] skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
};

export const ServiceSkeleton: React.FC = () => {
  return (
    <div className="border border-[var(--border-line)] p-8 md:p-12 space-y-6">
      <div className="h-8 w-64 bg-[var(--border-line)] skeleton-shimmer" />
      <div className="h-4 w-full bg-[var(--border-line)] skeleton-shimmer" />
      <div className="h-4 w-3/4 bg-[var(--border-line)] skeleton-shimmer" />
      <div className="w-full h-64 bg-[var(--border-line)] skeleton-shimmer" />
      <div className="h-10 w-44 bg-[var(--border-line)] skeleton-shimmer" />
    </div>
  );
};

export const TestimonialSkeleton: React.FC = () => {
  return (
    <div className="p-8 border border-[var(--border-line)] space-y-6">
      <div className="h-4 w-28 bg-[var(--border-line)] skeleton-shimmer" />
      <div className="h-6 w-full bg-[var(--border-line)] skeleton-shimmer" />
      <div className="h-6 w-4/5 bg-[var(--border-line)] skeleton-shimmer" />
      <div className="flex items-center gap-4 pt-4">
        <div className="w-12 h-12 rounded-full bg-[var(--border-line)] skeleton-shimmer" />
        <div className="space-y-2">
          <div className="h-4 w-32 bg-[var(--border-line)] skeleton-shimmer" />
          <div className="h-3 w-24 bg-[var(--border-line)] skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
};

export const BlogCardSkeleton: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="w-full aspect-[16/10] bg-[var(--border-line)] skeleton-shimmer" />
      <div className="h-3 w-28 bg-[var(--border-line)] skeleton-shimmer" />
      <div className="h-7 w-5/6 bg-[var(--border-line)] skeleton-shimmer" />
      <div className="h-4 w-full bg-[var(--border-line)] skeleton-shimmer" />
      <div className="h-3 w-24 bg-[var(--border-line)] skeleton-shimmer" />
    </div>
  );
};

export const GallerySkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="aspect-[3/4] bg-[var(--border-line)] skeleton-shimmer" />
      ))}
    </div>
  );
};

export const BookingFormSkeleton: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-8 border border-[var(--border-line)] space-y-6">
      <div className="h-8 w-48 bg-[var(--border-line)] skeleton-shimmer" />
      <div className="h-4 w-3/4 bg-[var(--border-line)] skeleton-shimmer" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-12 w-full bg-[var(--border-line)] skeleton-shimmer" />
        <div className="h-12 w-full bg-[var(--border-line)] skeleton-shimmer" />
      </div>
      <div className="h-12 w-full bg-[var(--border-line)] skeleton-shimmer" />
      <div className="h-32 w-full bg-[var(--border-line)] skeleton-shimmer" />
      <div className="h-12 w-48 bg-[var(--border-line)] skeleton-shimmer" />
    </div>
  );
};

export const AboutSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-24 grid grid-cols-1 md:grid-cols-12 gap-12">
      <div className="md:col-span-5">
        <div className="aspect-[3/4] bg-[var(--border-line)] skeleton-shimmer" />
      </div>
      <div className="md:col-span-7 space-y-6">
        <div className="h-4 w-36 bg-[var(--border-line)] skeleton-shimmer" />
        <div className="h-12 w-3/4 bg-[var(--border-line)] skeleton-shimmer" />
        <div className="h-5 w-full bg-[var(--border-line)] skeleton-shimmer" />
        <div className="h-5 w-5/6 bg-[var(--border-line)] skeleton-shimmer" />
        <div className="h-5 w-4/6 bg-[var(--border-line)] skeleton-shimmer" />
      </div>
    </div>
  );
};

export const VideoSkeleton: React.FC = () => {
  return (
    <div className="relative w-full aspect-video bg-[var(--border-line)] skeleton-shimmer flex items-center justify-center">
      <div className="w-16 h-16 rounded-full bg-[#D4D2CA]" />
    </div>
  );
};

export const PageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 space-y-16">
      <HeroSkeleton />
      <PortfolioGridSkeleton />
    </div>
  );
};
