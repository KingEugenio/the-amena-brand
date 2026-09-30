import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
  className?: string;
}

export const IconSearch: React.FC<IconProps> = ({ size = 20, className = '', title = 'Search', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={!title}
    className={className}
    {...props}
  >
    {title && <title>{title}</title>}
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export const IconMenu: React.FC<IconProps> = ({ size = 22, className = '', title = 'Menu', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={!title}
    className={className}
    {...props}
  >
    {title && <title>{title}</title>}
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export const IconClose: React.FC<IconProps> = ({ size = 22, className = '', title = 'Close', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={!title}
    className={className}
    {...props}
  >
    {title && <title>{title}</title>}
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export const IconArrowRight: React.FC<IconProps> = ({ size = 18, className = '', title, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={!title}
    className={className}
    {...props}
  >
    {title && <title>{title}</title>}
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export const IconArrowLeft: React.FC<IconProps> = ({ size = 18, className = '', title, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={!title}
    className={className}
    {...props}
  >
    {title && <title>{title}</title>}
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

export const IconChevronDown: React.FC<IconProps> = ({ size = 18, className = '', title, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={!title}
    className={className}
    {...props}
  >
    {title && <title>{title}</title>}
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const IconChevronUp: React.FC<IconProps> = ({ size = 18, className = '', title, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={!title}
    className={className}
    {...props}
  >
    {title && <title>{title}</title>}
    <path d="m18 15-6-6-6 6" />
  </svg>
);

export const IconWhatsApp: React.FC<IconProps> = ({ size = 20, className = '', title = 'WhatsApp', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden={!title}
    className={className}
    {...props}
  >
    {title && <title>{title}</title>}
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.78 14.12c-.24.68-1.2 1.25-1.78 1.32-.48.06-1.1.09-3.23-.78-2.61-1.07-4.29-3.73-4.42-3.9-.13-.18-1.06-1.41-1.06-2.69 0-1.28.67-1.91.91-2.17.24-.26.52-.33.7-.33.17 0 .35 0 .5.01.16.01.38-.06.59.45.22.52.74 1.8.8 1.93.07.13.11.29.02.47-.09.18-.13.29-.26.44-.13.15-.28.34-.4.46-.13.13-.27.28-.12.54.15.26.68 1.12 1.45 1.81 1 .89 1.84 1.16 2.1 1.29.26.13.41.11.56-.06.16-.18.66-.77.84-1.03.18-.26.35-.22.59-.13.24.09 1.52.72 1.78.85.26.13.44.2.5.31.06.11.06.66-.18 1.34z" />
  </svg>
);

export const IconInstagram: React.FC<IconProps> = ({ size = 20, className = '', title = 'Instagram', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={!title}
    className={className}
    {...props}
  >
    {title && <title>{title}</title>}
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const IconTwitter: React.FC<IconProps> = ({ size = 20, className = '', title = 'Twitter', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={!title}
    className={className}
    {...props}
  >
    {title && <title>{title}</title>}
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export const IconFacebook: React.FC<IconProps> = ({ size = 20, className = '', title = 'Facebook', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={!title}
    className={className}
    {...props}
  >
    {title && <title>{title}</title>}
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const IconShoppingBag: React.FC<IconProps> = ({ size = 20, className = '', title = 'Shop', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={!title}
    className={className}
    {...props}
  >
    {title && <title>{title}</title>}
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

export const IconPhone: React.FC<IconProps> = ({ size = 18, className = '', title = 'Phone', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={!title}
    className={className}
    {...props}
  >
    {title && <title>{title}</title>}
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const IconMail: React.FC<IconProps> = ({ size = 18, className = '', title = 'Email', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={!title}
    className={className}
    {...props}
  >
    {title && <title>{title}</title>}
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export const IconLocation: React.FC<IconProps> = ({ size = 18, className = '', title = 'Location', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={!title}
    className={className}
    {...props}
  >
    {title && <title>{title}</title>}
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const IconHeart: React.FC<IconProps> = ({ size = 18, className = '', title = 'Heart', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={!title}
    className={className}
    {...props}
  >
    {title && <title>{title}</title>}
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

export const IconUser: React.FC<IconProps> = ({ size = 18, className = '', title = 'Account', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={!title}
    className={className}
    {...props}
  >
    {title && <title>{title}</title>}
    <circle cx="12" cy="8" r="5" />
    <path d="M20 21a8 8 0 1 0-16 0" />
  </svg>
);

export const IconShare: React.FC<IconProps> = ({ size = 18, className = '', title = 'Share', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={!title}
    className={className}
    {...props}
  >
    {title && <title>{title}</title>}
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

export const IconPlay: React.FC<IconProps> = ({ size = 18, className = '', title = 'Play', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden={!title}
    className={className}
    {...props}
  >
    {title && <title>{title}</title>}
    <polygon points="6 3 20 12 6 21 6 3" />
  </svg>
);

export const IconFilter: React.FC<IconProps> = ({ size = 18, className = '', title = 'Filter', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={!title}
    className={className}
    {...props}
  >
    {title && <title>{title}</title>}
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

export const IconCalendar: React.FC<IconProps> = ({ size = 18, className = '', title = 'Calendar', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={!title}
    className={className}
    {...props}
  >
    {title && <title>{title}</title>}
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export const IconExternalLink: React.FC<IconProps> = ({ size = 18, className = '', title = 'External link', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={!title}
    className={className}
    {...props}
  >
    {title && <title>{title}</title>}
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export const IconCheck: React.FC<IconProps> = ({ size = 18, className = '', title = 'Check', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={!title}
    className={className}
    {...props}
  >
    {title && <title>{title}</title>}
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const IconLock: React.FC<IconProps> = ({ size = 18, className = '', title = 'Lock', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={!title}
    className={className}
    {...props}
  >
    {title && <title>{title}</title>}
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export const IconEye: React.FC<IconProps> = ({ size = 18, className = '', title = 'Preview', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={!title}
    className={className}
    {...props}
  >
    {title && <title>{title}</title>}
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const IconZoomIn: React.FC<IconProps> = ({ size = 18, className = '', title = 'Zoom In', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={!title}
    className={className}
    {...props}
  >
    {title && <title>{title}</title>}
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

export const IconMapPin: React.FC<IconProps> = ({ size = 18, className = '', title = 'Location', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={!title}
    className={className}
    {...props}
  >
    {title && <title>{title}</title>}
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const IconClock: React.FC<IconProps> = ({ size = 18, className = '', title = 'Time', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={!title}
    className={className}
    {...props}
  >
    {title && <title>{title}</title>}
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export const IconPlus: React.FC<IconProps> = ({ size = 18, className = '', title = 'Add', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={!title}
    className={className}
    {...props}
  >
    {title && <title>{title}</title>}
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const IconEdit: React.FC<IconProps> = ({ size = 18, className = '', title = 'Edit', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={!title}
    className={className}
    {...props}
  >
    {title && <title>{title}</title>}
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

export const IconTrash: React.FC<IconProps> = ({ size = 18, className = '', title = 'Delete', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={!title}
    className={className}
    {...props}
  >
    {title && <title>{title}</title>}
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

