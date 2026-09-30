import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { WhatsAppIcon } from '../common/WhatsAppIcon';

export const Footer: React.FC = () => {
  const { settings, navigateTo } = useSiteConfig();

  const handleNav = (route: string, param?: string) => {
    navigateTo(route, param);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  return (
    <footer className="bg-[var(--bg-surface)] border-t border-[var(--border-line)] pt-20 pb-28 sm:pb-20 text-[var(--text-main)] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Top Editorial Callout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[var(--border-line)]">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-[var(--text-muted)] font-mono">
              Inquiries & Commissions
            </span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-normal leading-tight text-[var(--text-main)]">
              Let us preserve moments that outlive the celebration.
            </h3>
            <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-md font-normal">
              Accepting select wedding, portrait, and editorial commissions in Accra, West Africa, and worldwide.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-end lg:items-end space-y-6">
            <button
              type="button"
              onClick={() => handleNav('book')}
              className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] font-medium bg-[var(--text-main)] text-[var(--bg-base)] px-8 py-4 hover:opacity-90 transition-all cursor-pointer w-fit shadow-xs"
            >
              <span>Check Availability & Calendar</span>
              <ArrowUpRight size={16} />
            </button>
            <div className="text-xs text-[var(--text-muted)] font-mono tracking-wider">
              {settings.availabilityStatus}
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 text-xs tracking-wider uppercase border-b border-[var(--border-line)]">
          {/* Navigation */}
          <div className="space-y-4">
            <span className="font-semibold text-[var(--text-main)] tracking-[0.2em]">Explore</span>
            <ul className="space-y-2.5 text-[var(--text-muted)]">
              <li>
                <button type="button" onClick={() => handleNav('portfolio')} className="hover:text-[var(--text-main)] transition-colors cursor-pointer">
                  Portfolio
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('services')} className="hover:text-[var(--text-main)] transition-colors cursor-pointer">
                  Services & Pricing
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('about')} className="hover:text-[var(--text-main)] transition-colors cursor-pointer">
                  About FREDDIESHOTIT
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('experience')} className="hover:text-[var(--text-main)] transition-colors cursor-pointer">
                  The Experience
                </button>
              </li>
              {/* Journal & stories section commented out as requested */}
              {/* <li>
                <button type="button" onClick={() => handleNav('journal')} className="hover:text-[var(--text-main)] transition-colors cursor-pointer">
                  Journal & Stories
                </button>
              </li> */}
              <li>
                <button type="button" onClick={() => handleNav('faq')} className="hover:text-[var(--text-main)] transition-colors cursor-pointer">
                  Common Inquiries (FAQ)
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <span className="font-semibold text-[var(--text-main)] tracking-[0.2em]">Commissions</span>
            <ul className="space-y-2.5 text-[var(--text-muted)]">
              <li>
                <button type="button" onClick={() => handleNav('services', 'weddings')} className="hover:text-[var(--text-main)] transition-colors cursor-pointer">
                  Weddings & Elopements
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('services', 'portraits')} className="hover:text-[var(--text-main)] transition-colors cursor-pointer">
                  Editorial Portraiture
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('services', 'commercial')} className="hover:text-[var(--text-main)] transition-colors cursor-pointer">
                  Commercial & Campaigns
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('book')} className="hover:text-[var(--text-main)] transition-colors cursor-pointer">
                  Booking Calendar
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="space-y-4">
            <span className="font-semibold text-[var(--text-main)] tracking-[0.2em]">Direct Studio</span>
            <ul className="space-y-2.5 text-[var(--text-muted)] font-mono normal-case text-xs">
              <li>
                <a 
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-emerald-500 hover:underline inline-flex items-center gap-1.5 font-semibold"
                >
                  <WhatsAppIcon size={14} className="fill-[#25D366] text-[#25D366]" />
                  <span>0544795536</span>
                </a>
              </li>
              <li>
                <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="hover:text-[var(--text-main)] transition-colors">
                  {settings.phone}
                </a>
              </li>
              <li>
                <span className="text-[var(--text-main)] block">{settings.location}</span>
                <span className="text-[var(--text-muted)]">{settings.serviceArea}</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <span className="font-semibold text-[var(--text-main)] tracking-[0.2em]">Connect</span>
            <ul className="space-y-2.5 text-[var(--text-muted)]">
              <li>
                <a href={settings.designInstagramUrl} target="_blank" rel="noreferrer" className="hover:text-[var(--text-main)] transition-colors inline-flex items-center gap-1 font-semibold text-[var(--text-main)]">
                  <span>Design ({settings.designInstagramHandle})</span>
                  <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a href={settings.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-[var(--text-main)] transition-colors inline-flex items-center gap-1">
                  <span>Photography ({settings.instagramHandle})</span>
                  <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a href={settings.weddingInstagramUrl} target="_blank" rel="noreferrer" className="hover:text-[var(--text-main)] transition-colors inline-flex items-center gap-1">
                  <span>Weddings ({settings.weddingInstagramHandle})</span>
                  <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a href={settings.behanceUrl} target="_blank" rel="noreferrer" className="hover:text-[var(--text-main)] transition-colors inline-flex items-center gap-1">
                  <span>Behance Archive</span>
                  <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a href={settings.facebookUrl || "https://www.facebook.com/freddieshotit"} target="_blank" rel="noreferrer" className="hover:text-[var(--text-main)] transition-colors inline-flex items-center gap-1">
                  <span>Facebook</span>
                  <ArrowUpRight size={12} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & credits */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[var(--text-muted)] gap-4 font-normal text-center md:text-left">
          <p>© {new Date().getFullYear()} {settings.designBrandName} &bull; {settings.photographerName} &bull; {settings.fullName}. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] tracking-wider uppercase font-mono pr-0 md:pr-36">
            <span>Fine Art Documentary Practice</span>
            <span className="hidden sm:inline">&bull;</span>
            <a
              href="https://www.instagram.com/ekopixels?stkn=OGRwdmdleWd4Y282&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-main)] font-semibold border-b border-[var(--text-main)]/30 pb-0.5 hover:border-[var(--text-main)] transition-colors"
            >
              built by EKO PIXELS
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
