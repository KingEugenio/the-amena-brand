import React from 'react';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { WhatsAppIcon } from './WhatsAppIcon';

export const WhatsAppFloatingButton: React.FC = () => {
  const { settings } = useSiteConfig();

  const cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '') || '233544795536';
  const encodedText = encodeURIComponent(
    settings.whatsappDefaultMessage || `Hello ${settings.photographerName}, I'd like to check availability and packages for an upcoming shoot.`
  );
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedText}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 print:hidden">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full flex items-center justify-center bg-[#25D366] hover:bg-[#20ba59] active:scale-95 hover:scale-105 text-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Open WhatsApp conversation with FREDDIE SHOT IT"
        title="Chat on WhatsApp"
      >
        <WhatsAppIcon size={28} className="fill-white text-white" />
      </a>
    </div>
  );
};
