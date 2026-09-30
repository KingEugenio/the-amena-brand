import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  IconLock,
  IconClose,
  IconMenu,
  IconEye,
  IconCheck,
  IconArrowRight,
  IconInstagram,
  IconWhatsApp
} from '../../components/icons/Icons';

interface AdminLayoutProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  setCurrentTab,
  children
}) => {
  const {
    adminLogout,
    navigateTo,
    data,
    isPreviewMode,
    setIsPreviewMode
  } = useApp();

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Overview & Stats' },
    { id: 'products', label: `Products (${data.products.length})` },
    { id: 'collections', label: `Collections (${data.collections.length})` },
    { id: 'journal', label: `Journal Stories (${data.journal.length})` },
    { id: 'faqs', label: `Client FAQ (${data.faqs.length})` },
    { id: 'enquiries', label: `Client Enquiries (${data.enquiries.length})` },
    { id: 'homepage', label: 'Homepage Content' },
    { id: 'about', label: 'About & Philosophy' },
    { id: 'settings', label: 'Brand & WhatsApp Settings' },
  ];

  return (
    <div className="min-h-screen bg-[#171614] text-[#FAF9F5] flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-[#121110] border-b border-[#2C2926] px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="md:hidden p-1 text-[#A69F91] hover:text-white cursor-pointer"
          >
            {mobileNavOpen ? <IconClose size={22} /> : <IconMenu size={22} />}
          </button>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#25D366]"></span>
            <span className="font-serif-heading text-lg tracking-wider text-[#FAF9F5] uppercase">
              THE AMENA BRAND
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest bg-[#262421] text-[#A69F91] px-2 py-0.5 ml-2 border border-[#3E3B36] hidden sm:inline">
              STUDIO CMS
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Live Storefront Preview */}
          <button
            onClick={() => navigateTo('/')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#D4CEBF] bg-[#22201D] hover:bg-[#2F2C28] border border-[#3E3B36] transition-colors cursor-pointer"
            title="View Live Storefront"
          >
            <IconEye size={14} />
            <span className="hidden sm:inline">View Live Storefront</span>
          </button>

          {/* Logout */}
          <button
            onClick={() => {
              adminLogout();
              navigateTo('/');
            }}
            className="px-3 py-1.5 text-xs text-[#FAF9F5] bg-[#B93838]/20 border border-[#B93838]/40 hover:bg-[#B93838] transition-colors cursor-pointer uppercase tracking-wider"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="flex-1 flex">
        {/* Sidebar Desktop */}
        <aside className="hidden md:flex w-64 bg-[#121110] border-r border-[#2C2926] flex-col justify-between p-4 flex-shrink-0">
          <nav className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#6E685E] font-semibold px-3 py-2 block font-sans">
              CONTENT MANAGEMENT
            </span>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full text-left px-3 py-2.5 text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer flex items-center justify-between ${
                  currentTab === item.id
                    ? 'bg-[#2A2724] text-[#FAF9F5] border-l-2 border-[#9A5B32]'
                    : 'text-[#A69F91] hover:text-[#FAF9F5] hover:bg-[#1E1C1A]'
                }`}
              >
                <span>{item.label}</span>
                {item.id === 'enquiries' && data.enquiries.filter((e) => e.status === 'NEW').length > 0 && (
                  <span className="bg-[#25D366] text-black text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                    {data.enquiries.filter((e) => e.status === 'NEW').length}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Sidebar Footer info */}
          <div className="p-3 bg-[#1A1917] border border-[#262421] text-[11px] text-[#A69F91] space-y-2">
            <div>
              <span className="text-[#FAF9F5] font-medium block">WhatsApp: {data.settings.whatsappNumber}</span>
              <span>Instagram: {data.settings.instagramHandle}</span>
            </div>
            <div className="text-[10px] text-[#6E685E] pt-1 border-t border-[#262421]">
              Changes persist instantly to server storage.
            </div>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileNavOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-[#121110]/95 flex flex-col p-6 animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-[#2C2926]">
              <span className="font-serif-heading text-lg">CMS Navigation</span>
              <button
                onClick={() => setMobileNavOpen(false)}
                className="p-1 text-[#A69F91] hover:text-white"
              >
                <IconClose size={24} />
              </button>
            </div>
            <div className="flex-1 py-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setMobileNavOpen(false);
                  }}
                  className={`w-full text-left px-3 py-3 text-sm uppercase tracking-wider font-medium ${
                    currentTab === item.id ? 'bg-[#2A2724] text-white' : 'text-[#A69F91]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 bg-[#171614] p-4 sm:p-8 lg:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};
