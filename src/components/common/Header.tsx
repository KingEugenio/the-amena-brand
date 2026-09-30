import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  IconMenu,
  IconClose,
  IconEye,
} from '../icons/Icons';
import { weddingData } from '../../data/weddingData';

export const Header: React.FC = () => {
  const {
    activePath,
    navigateTo,
    adminToken,
    isPreviewMode,
    setIsPreviewMode,
    theme,
    toggleTheme,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [activePath]);

  const navLinks = [
    { label: 'ABOUT', path: '/about' },
    { label: 'PACKAGES', path: '/packages' },
    { label: 'GALLERY', path: '/gallery' },
    { label: 'CONTACT', path: '/contact' },
  ];

  return (
    <>
      {/* Admin Mode Bar (Only visible if admin is logged in - NO online indicator) */}
      {adminToken && (
        <div className="bg-[#1C1A18] text-[#FAF8F5] px-4 py-2 text-xs flex items-center justify-between border-b border-[#33312E] z-50">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[#D4CEBF] tracking-wider uppercase">ADMIN PORTAL:</span>
            <span className="hidden sm:inline text-neutral-400">Wedding Content Studio</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="flex items-center gap-1.5 text-xs text-[#D4CEBF] hover:text-white transition-colors cursor-pointer"
            >
              <IconEye size={14} />
              <span>{isPreviewMode ? 'Exit Draft Preview' : 'Preview Drafts'}</span>
            </button>
            <button
              onClick={() => navigateTo('/admin')}
              className="bg-[#2C2825] hover:bg-[#B8A99A] text-white px-2.5 py-1 text-xs uppercase tracking-wider font-medium cursor-pointer transition-colors"
            >
              Open CMS
            </button>
          </div>
        </div>
      )}

      {/* Main Header matching the provided picture with dark theme support */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FAF8F5]/95 dark:bg-[#141210]/95 backdrop-blur-md shadow-xs border-b border-[#E8E3DC] dark:border-[#2C2825]'
            : 'bg-[#FAF8F5] dark:bg-[#141210] border-b border-[#EFEBE4] dark:border-[#25211E]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24 md:h-28">
            {/* Left: Navigation links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-8 flex-1">
              {navLinks.map((link) => {
                const isActive = activePath.startsWith(link.path);
                return (
                  <button
                    key={link.path}
                    onClick={() => navigateTo(link.path)}
                    className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer py-1 relative ${
                      isActive
                        ? 'text-[#1C1A18] dark:text-[#FAF7F2] font-semibold'
                        : 'text-[#5A544E] dark:text-[#C8C1B6] hover:text-[#1C1A18] dark:hover:text-[#FFFFFF]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#1C1A18] dark:bg-[#FAF7F2]" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Mobile menu trigger on left for small screens */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#2C2825] dark:text-[#FAF7F2] hover:text-[#B8A99A] dark:hover:text-[#C8BAAC] transition-colors cursor-pointer"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
              >
                {mobileMenuOpen ? <IconClose size={24} /> : <IconMenu size={24} />}
              </button>
            </div>

            {/* Center: Brand Logo "THE AMENA BRAND" */}
            <div className="flex-shrink-0 text-center mx-auto">
              <button
                onClick={() => navigateTo('/')}
                className="group cursor-pointer text-center block"
              >
                <span className="font-serif-luxury font-normal text-2xl sm:text-3xl md:text-4xl tracking-[0.22em] text-[#2C2825] dark:text-[#FAF7F2] block uppercase transition-opacity group-hover:opacity-85">
                  {weddingData.settings.brandName}
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.28em] text-[#6B655E] dark:text-[#B8AEA2] uppercase block font-sans mt-0.5 font-medium">
                  {weddingData.settings.brandSubtitle}
                </span>
              </button>
            </div>

            {/* Right: Light / Dark Toggle in Nav Bar */}
            <div className="flex items-center justify-end gap-3 sm:gap-4 flex-1">
              <button
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D5CBC0] dark:border-[#38332E] bg-[#FAF8F5] dark:bg-[#1C1A18] text-[#2C2825] dark:text-[#FAF7F2] hover:border-[#B8A99A] dark:hover:border-[#6B6258] transition-all cursor-pointer shadow-2xs group"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun size={15} className="text-[#E5B54F] group-hover:rotate-45 transition-transform" />
                    <span className="text-[10px] uppercase tracking-[0.16em] font-sans font-medium text-[#D8D2C7]">Light</span>
                  </>
                ) : (
                  <>
                    <Moon size={14} className="text-[#4A443D] group-hover:-rotate-12 transition-transform" />
                    <span className="text-[10px] uppercase tracking-[0.16em] font-sans font-medium text-[#4A443D]">Dark</span>
                  </>
                )}
              </button>

              <button
                onClick={() => navigateTo('/contact')}
                className="hidden sm:inline-flex rounded-full bg-[#2C2825] dark:bg-[#FAF7F2] hover:bg-[#B8A99A] dark:hover:bg-[#EAE0D3] text-white dark:text-[#181614] text-[10px] sm:text-[11px] uppercase tracking-[0.2em] px-4 py-2 font-medium transition-colors cursor-pointer shadow-2xs"
              >
                Inquire
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-[#FAF8F5] dark:bg-[#141210] flex flex-col animate-in fade-in duration-200">
          <div className="flex items-center justify-between h-20 px-6 border-b border-[#E8E3DC] dark:border-[#2C2825]">
            <button
              onClick={() => {
                navigateTo('/');
                setMobileMenuOpen(false);
              }}
              className="text-left cursor-pointer"
            >
              <span className="font-serif-luxury text-xl tracking-[0.2em] text-[#2C2825] dark:text-[#FAF7F2] block uppercase font-normal">
                {weddingData.settings.brandName}
              </span>
              <span className="text-[9px] tracking-[0.25em] text-[#6B655E] dark:text-[#B8AEA2] uppercase block font-sans font-medium">
                {weddingData.settings.brandSubtitle}
              </span>
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="p-2 rounded-full border border-[#D5CBC0] dark:border-[#423C36] bg-[#F2ECE5] dark:bg-[#25211D] text-[#2C2825] dark:text-[#FAF7F2] cursor-pointer"
              >
                {theme === 'dark' ? <Sun size={17} className="text-[#E5B54F]" /> : <Moon size={17} className="text-[#4F473E]" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#2C2825] dark:text-[#FAF7F2] hover:text-[#B8A99A] cursor-pointer"
                aria-label="Close menu"
              >
                <IconClose size={24} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-10 flex flex-col justify-between">
            <div className="space-y-6">
              <button
                onClick={() => {
                  navigateTo('/');
                  setMobileMenuOpen(false);
                }}
                className={`text-2xl font-serif-luxury block text-left tracking-wider cursor-pointer ${
                  activePath === '/' ? 'text-[#9E8B7A] dark:text-[#D8C7B5] font-semibold' : 'text-[#2C2825] dark:text-[#FAF7F2]'
                }`}
              >
                HOME
              </button>
              {navLinks.map((link) => {
                const isActive = activePath.startsWith(link.path);
                return (
                  <button
                    key={link.path}
                    onClick={() => {
                      navigateTo(link.path);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-2xl font-serif-luxury block text-left tracking-wider cursor-pointer ${
                      isActive ? 'text-[#9E8B7A] dark:text-[#D8C7B5] font-semibold' : 'text-[#2C2825] dark:text-[#FAF7F2]'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            <div className="pt-8 border-t border-[#E8E3DC] dark:border-[#2C2825] space-y-6">
              {/* Theme toggle indicator */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#F1EBE3] dark:bg-[#1E1B18] border border-[#E2DAD0] dark:border-[#332F2A]">
                <span className="text-xs uppercase tracking-wider font-medium text-[#4D4741] dark:text-[#D8D2C7]">
                  Theme: <strong className="capitalize">{theme}</strong>
                </span>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-[#2C2723] text-xs font-medium text-[#2C2825] dark:text-[#F3EFEB] shadow-xs cursor-pointer border border-[#E2DAD0] dark:border-[#3E3832]"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun size={14} className="text-[#E5B54F]" /> Light Mode
                    </>
                  ) : (
                    <>
                      <Moon size={14} className="text-[#4F473E]" /> Dark Mode
                    </>
                  )}
                </button>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    navigateTo('/contact');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center rounded-full bg-[#2C2825] dark:bg-[#FAF7F2] text-white dark:text-[#181614] text-xs uppercase tracking-[0.2em] py-3 font-medium cursor-pointer"
                >
                  Check Availability
                </button>
              </div>

              <p className="text-center text-xs text-[#6B655E] dark:text-[#A8A096] tracking-widest uppercase font-medium">
                {weddingData.settings.location}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
