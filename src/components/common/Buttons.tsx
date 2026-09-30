import React from 'react';
import { IconWhatsApp } from '../icons/Icons';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium tracking-wider uppercase transition-all duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#191816] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

  const sizeClasses = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-xs md:text-sm px-6 py-3 gap-2.5',
    lg: 'text-sm md:text-base px-8 py-4 gap-3',
  }[size];

  const variantClasses = {
    primary: 'bg-[#191816] text-[#FAF9F5] hover:bg-[#32302D] active:bg-[#000000]',
    secondary: 'bg-[#FAF9F5] text-[#191816] border border-[#191816] hover:bg-[#F3F1EB] active:bg-[#E5E1D8]',
    outline: 'bg-transparent text-[#191816] border border-[#E5E1D8] hover:border-[#191816] hover:bg-[#FAF9F5]',
    ghost: 'bg-transparent text-[#191816] hover:bg-[#F3F1EB] active:bg-[#E5E1D8]',
    whatsapp: 'bg-[#25D366] text-white hover:bg-[#20bd5a] active:bg-[#1caa51]',
    danger: 'bg-[#B93838] text-white hover:bg-[#992c2c] active:bg-[#7e2222]',
  }[variant];

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        leftIcon
      )}
      <span className="whitespace-nowrap">{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
};

export interface WhatsAppButtonProps {
  productName?: string;
  subject?: string;
  label?: string;
  className?: string;
  size?: ButtonSize;
}

export const WhatsAppCTAButton: React.FC<WhatsAppButtonProps> = ({
  productName,
  subject,
  label = 'ENQUIRE ON WHATSAPP',
  className = '',
  size = 'md'
}) => {
  const number = '233579499223';
  let message = 'Hello THE AMENA BRAND, I’d like to make an enquiry.';
  if (productName) {
    message = `Hello THE AMENA BRAND, I’m interested in ${productName}. I’d like to know more about availability and pricing.`;
  } else if (subject) {
    message = `Hello THE AMENA BRAND, I’d like to ask about ${subject}.`;
  }

  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center font-medium tracking-wider uppercase text-xs md:text-sm px-6 py-3 gap-2.5 bg-[#191816] text-[#FAF9F5] hover:bg-[#2C2926] transition-all duration-200 ${className}`}
      onClick={() => {
        fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventType: 'whatsapp_click',
            path: window.location.pathname,
            target: productName || subject || 'General CTA'
          })
        }).catch(() => {});
      }}
    >
      <IconWhatsApp size={18} className="text-[#25D366]" />
      <span className="whitespace-nowrap">{label}</span>
    </a>
  );
};
