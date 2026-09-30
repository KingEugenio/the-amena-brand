import React from 'react';
import { useApp } from '../../context/AppContext';
import { IconWhatsApp } from '../icons/Icons';

export const FloatingWhatsApp: React.FC = () => {
  const { openWhatsApp, activePath } = useApp();

  // Hide floating button on admin page to avoid blocking CMS controls
  if (activePath.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-30 group">
      <button
        onClick={() => openWhatsApp('general')}
        className="flex items-center gap-2.5 bg-[#2C2825] text-[#FAF8F5] px-4 py-3 shadow-md hover:shadow-lg hover:bg-[#B8A99A] transition-all duration-300 cursor-pointer rounded-full border border-white/20"
        aria-label="Direct Wedding Consultation"
      >
        <IconWhatsApp size={18} className="text-[#FAF8F5]" />
        <span className="text-xs uppercase tracking-widest font-medium hidden sm:inline-block">
          Wedding Inquiries
        </span>
      </button>
    </div>
  );
};
