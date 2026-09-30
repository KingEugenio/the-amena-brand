import React from 'react';

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  alignment?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  label,
  title,
  description,
  alignment = 'left',
  className = ''
}) => {
  const isCenter = alignment === 'center';

  return (
    <div className={`space-y-3 ${isCenter ? 'text-center max-w-2xl mx-auto' : 'max-w-xl'} ${className}`}>
      {label && (
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#9A5B32] font-semibold block font-sans">
          {label}
        </span>
      )}
      <h2 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl text-[#191816] tracking-tight leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-sm sm:text-base text-[#6B6862] leading-relaxed font-sans font-light">
          {description}
        </p>
      )}
    </div>
  );
};
