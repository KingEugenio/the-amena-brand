import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { WhatsAppIcon } from '../common/WhatsAppIcon';

export const Header: React.FC = () => {
  const { settings, activeRoute, navigateTo, theme, toggleTheme } = useSiteConfig();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change or escape
  const handleNavClick = (route: string) => {
    navigateTo(route);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'Portfolio', route: 'portfolio' },
    { label: 'Services', route: 'services' },
    { label: 'About', route: 'about' },
    { label: 'Experience', route: 'experience' },
    // Journal & stories section commented out as requested
    // { label: 'Journal', route: 'journal' },
    { label: 'FAQ', route: 'faq' },
  ];

  return (
    <header className="sticky top-0 inset-x-0 z-50 bg-[var(--bg-base)]/95 backdrop-blur-md border-b border-[var(--border-line)] transition-colors duration-200 py-4">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
        {/* Logo / Photographer Name */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="text-left group cursor-pointer focus:outline-none"
          aria-label={`${settings.photographerName} Home`}
        >
          <span className="block text-xl sm:text-2xl font-normal font-editorial tracking-[0.08em] uppercase text-[var(--text-main)] transition-colors">
            {settings.photographerName}
          </span>
          <span className="block text-[10px] tracking-[0.25em] uppercase text-[var(--text-muted)] font-mono">
            {settings.tagline}
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeRoute === link.route;
            return (
              <button
                key={link.route}
                type="button"
                onClick={() => handleNavClick(link.route)}
                className={`text-xs uppercase tracking-[0.2em] transition-colors font-medium py-1 relative cursor-pointer ${
                  isActive ? 'text-[var(--text-main)] font-semibold' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[var(--text-main)]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Theme Switcher & Book Now */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Dark / Light Mode Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-full border border-[var(--border-line)] text-[var(--text-main)] hover:bg-[var(--card-bg)] transition-colors cursor-pointer flex items-center justify-center"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme mode"
          >
            {theme === 'dark' ? (
              <Sun size={17} className="text-amber-400 transition-transform hover:rotate-45" />
            ) : (
              <Moon size={17} className="text-neutral-700 transition-transform hover:-rotate-12" />
            )}
          </button>

          {/* Primary CTA */}
          <button
            type="button"
            onClick={() => handleNavClick('book')}
            className="text-xs uppercase tracking-[0.22em] font-semibold bg-[var(--text-main)] text-[var(--bg-base)] px-6 py-3 hover:opacity-90 transition-all cursor-pointer shadow-xs"
          >
            BOOK NOW
          </button>
        </div>

        {/* Mobile Menu & Theme Triggers */}
        <div className="flex lg:hidden items-center space-x-2">
          {/* Mobile Dark / Light Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 text-[var(--text-main)] cursor-pointer rounded-full hover:bg-[var(--card-bg)]"
            aria-label="Toggle theme mode"
          >
            {theme === 'dark' ? (
              <Sun size={20} className="text-amber-400" />
            ) : (
              <Moon size={20} className="text-neutral-700" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[var(--text-main)] cursor-pointer focus:outline-none"
            aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Full-screen Overlay rendered via createPortal */}
      {isMobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 z-[99999] w-screen h-[100dvh] bg-[var(--bg-base)] flex flex-col justify-between p-6 sm:p-10 overflow-y-auto animate-in fade-in duration-200"
          style={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {/* Top Bar of Full Screen Menu */}
          <div className="flex items-center justify-between pb-6 border-b border-[var(--border-line)] shrink-0">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className="text-left cursor-pointer"
            >
              <span className="block text-xl font-normal font-editorial tracking-[0.08em] uppercase text-[var(--text-main)]">
                {settings.photographerName}
              </span>
              <span className="block text-[10px] tracking-[0.25em] uppercase text-[var(--text-muted)] font-mono">
                Ghana &bull; Africa
              </span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2.5 text-[var(--text-main)] cursor-pointer rounded-full border border-[var(--border-line)] hover:bg-[var(--card-bg)]"
                aria-label="Toggle theme mode"
              >
                {theme === 'dark' ? (
                  <Sun size={18} className="text-amber-400" />
                ) : (
                  <Moon size={18} className="text-neutral-700" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono uppercase tracking-widest text-[var(--text-main)] border border-[var(--border-line)] hover:bg-[var(--card-bg)] cursor-pointer"
                aria-label="Close Menu"
              >
                <X size={18} />
                <span>Close</span>
              </button>
            </div>
          </div>

          {/* Navigation Links in Center */}
          <nav className="flex flex-col py-8 space-y-4 my-auto" aria-label="Mobile Menu Links">
            {navLinks.map((link) => {
              const isActive = activeRoute === link.route;
              return (
                <button
                  key={link.route}
                  type="button"
                  onClick={() => handleNavClick(link.route)}
                  className={`text-left text-3xl sm:text-4xl font-editorial tracking-tight py-2 transition-colors cursor-pointer flex items-center justify-between ${
                    isActive ? 'text-[var(--primary-accent)] font-semibold' : 'text-[var(--text-main)] hover:text-[var(--primary-accent)]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="text-sm font-mono text-[var(--primary-accent)] uppercase tracking-wider">&bull; Active</span>}
                </button>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-[var(--border-line)] space-y-3 shrink-0">
            <button
              type="button"
              onClick={() => handleNavClick('book')}
              className="w-full text-center text-xs uppercase tracking-[0.25em] font-semibold bg-[var(--text-main)] text-[var(--bg-base)] py-4 transition-all cursor-pointer shadow-sm"
            >
              BOOK NOW
            </button>

            <a
              href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] font-medium border border-[var(--border-line)] text-[var(--text-main)] py-3.5 hover:bg-[var(--card-bg)] transition-colors cursor-pointer"
            >
              <WhatsAppIcon size={16} className="fill-[#25D366] text-[#25D366]" />
              <span>0544795536</span>
            </a>

            <div className="flex items-center justify-center gap-4 text-xs font-mono text-[var(--text-muted)] pt-1">
              <a href={settings.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-[var(--text-main)]">
                {settings.instagramHandle}
              </a>
              <span>&bull;</span>
              <a href={settings.weddingInstagramUrl} target="_blank" rel="noreferrer" className="hover:text-[var(--text-main)]">
                {settings.weddingInstagramHandle}
              </a>
              <span>&bull;</span>
              <a href={settings.behanceUrl} target="_blank" rel="noreferrer" className="hover:text-[var(--text-main)]">
                Behance
              </a>
            </div>

            <p className="text-center text-[10px] text-[var(--text-muted)] tracking-widest uppercase font-mono pt-1">
              {settings.photographerName} &bull; {settings.fullName} &bull; {settings.location}
            </p>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
};
