import React from 'react';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { WhatsAppIcon } from '../common/WhatsAppIcon';

export const FinalCTA: React.FC = () => {
  const { settings, navigateTo } = useSiteConfig();

  const handleWhatsApp = () => {
    const clean = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(settings.whatsappDefaultMessage);
    window.open(`https://wa.me/${clean}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-24 sm:py-32 px-6 sm:px-12 bg-[#0D0D0D] text-white">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-mono block">
          2026 &bull; 2027 Calendar Open
        </span>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-normal leading-[1.05] tracking-tight text-white">
          Planning something worth remembering?
        </h2>

        <p className="text-base sm:text-lg text-[#D4D4D4] font-normal max-w-xl mx-auto leading-relaxed">
          Because every celebration is an unrepeatable chapter, we accept a strictly limited number of commissions each season. Let us hear your story.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigateTo('book')}
            className="w-full sm:w-auto text-xs uppercase tracking-[0.25em] font-semibold bg-[#C5A880] text-[#0D0D0D] px-9 py-4 hover:bg-[#d6bc96] transition-all cursor-pointer shadow-lg"
          >
            BOOK YOUR DATE
          </button>

          <button
            type="button"
            onClick={handleWhatsApp}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs uppercase tracking-[0.22em] border border-[#444444] text-white px-8 py-4 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <WhatsAppIcon size={16} className="fill-[#25D366] text-[#25D366]" />
            <span>Chat On WhatsApp</span>
          </button>
        </div>

        <p className="text-xs text-[#CCCCCC] font-mono tracking-wider pt-6">
          Response within 24 hours &bull; 0544795536 &bull; {settings.location}
        </p>
      </div>
    </section>
  );
};

