import React from 'react';
import { useApp } from '../context/AppContext';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Buttons';
import { IconWhatsApp, IconArrowRight, IconCheck } from '../components/icons/Icons';

export const ServicesPage: React.FC = () => {
  const { data, openWhatsApp, navigateTo } = useApp();
  const { services, settings } = data;

  if (!settings.showServicesPage) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="font-serif-heading text-2xl text-[#191816]">Page Currently Unavailable</h2>
        <p className="text-xs text-[#6B6862]">Bespoke services are currently in private studio consultation mode.</p>
        <Button variant="primary" onClick={() => navigateTo('/')}>
          Return Home
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-16 sm:space-y-24">
      {/* Header */}
      <div className="max-w-3xl space-y-4 border-b border-[#E5E1D8] pb-10">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#9A5B32] font-semibold block font-sans">
          BESPOKE & CREATIVE DIRECTION
        </span>
        <h1 className="font-serif-heading text-3xl sm:text-5xl md:text-6xl text-[#191816] tracking-tight leading-[1.12]">
          Studio Services
        </h1>
        <p className="text-base text-[#6B6862] leading-relaxed font-sans font-light">
          Beyond our ready-to-wear silhouettes, THE AMENA BRAND offers one-on-one custom commissions, wardrobe tailoring, and creative direction for commercial and personal visual campaigns.
        </p>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {services.map((service, idx) => (
          <div
            key={service.id}
            className="p-8 sm:p-10 bg-[#F3F1EB] border border-[#E5E1D8] flex flex-col justify-between space-y-8"
          >
            <div className="space-y-4">
              <span className="font-mono text-xs text-[#9A5B32] font-semibold">0{idx + 1} // SERVICE</span>
              <h3 className="font-serif-heading text-2xl sm:text-3xl text-[#191816]">
                {service.title}
              </h3>
              <p className="font-serif-heading text-base text-[#191816] leading-relaxed">
                {service.shortDescription}
              </p>
              <p className="text-xs sm:text-sm text-[#6B6862] leading-relaxed font-sans font-light">
                {service.fullDescription}
              </p>

              {/* Deliverables */}
              <div className="pt-4 border-t border-[#E5E1D8] space-y-2 text-xs text-[#6B6862]">
                <div className="flex items-start gap-2">
                  <IconCheck size={16} className="text-[#9A5B32] shrink-0 mt-0.5" />
                  <span><strong>Deliverable:</strong> {service.deliverable}</span>
                </div>
                {service.timeline && (
                  <div className="flex items-start gap-2">
                    <IconCheck size={16} className="text-[#9A5B32] shrink-0 mt-0.5" />
                    <span><strong>Timeline:</strong> {service.timeline}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <button
                onClick={() => openWhatsApp('custom', `Service Inquiry: ${service.title}`)}
                className="w-full py-3.5 px-6 bg-[#191816] text-[#FAF9F5] hover:bg-[#2C2926] text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <IconWhatsApp size={16} className="text-[#25D366]" />
                <span>INQUIRE VIA WHATSAPP (0579499223)</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Consultation Banner */}
      <div className="p-8 sm:p-12 bg-[#FAF9F5] border border-[#E5E1D8] text-center space-y-4">
        <h3 className="font-serif-heading text-2xl text-[#191816]">Need a Custom Creative Consultation?</h3>
        <p className="text-xs sm:text-sm text-[#6B6862] max-w-lg mx-auto leading-relaxed font-light">
          Whether you require fitting appointments in Accra or bespoke international courier commissions, our studio will guide you through textiles, patterns, and timelines.
        </p>
        <div className="pt-2">
          <Button
            variant="outline"
            onClick={() => navigateTo('/contact')}
            rightIcon={<IconArrowRight size={14} />}
          >
            CONTACT OUR STUDIO
          </Button>
        </div>
      </div>
    </div>
  );
};
