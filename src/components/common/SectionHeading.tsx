import React from 'react';

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  label,
  title,
  subtitle,
  alignment = 'left',
  className = '',
}) => {
  const alignClass =
    alignment === 'center'
      ? 'text-center items-center'
      : alignment === 'right'
      ? 'text-right items-end'
      : 'text-left items-start';

  return (
    <div className={`flex flex-col ${alignClass} mb-12 md:mb-16 ${className}`}>
      {label && (
        <span className="text-xs uppercase tracking-[0.25em] text-[var(--text-muted)] mb-3 font-medium font-mono">
          {label}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight font-editorial leading-[1.1] text-[var(--text-main)]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-[var(--text-muted)] max-w-2xl font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
