import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  IconInstagram,
  IconTwitter,
  IconFacebook,
  IconLock,
  IconArrowRight,
  IconCheck
} from '../icons/Icons';
import { weddingData } from '../../data/weddingData';

export const Footer: React.FC = () => {
  const { navigateTo, showToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Thank you for subscribing to THE AMENA BRAND studio journal.');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#24211E] dark:bg-[#0E0D0C] text-[#FAF8F5] pt-16 md:pt-20 pb-12 border-t border-[#383430] dark:border-[#22201D] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[#383430] dark:border-[#22201D]">
          {/* Brand Identity */}
          <div className="md:col-span-5 space-y-4">
            <button
              onClick={() => navigateTo('/')}
              className="text-left group cursor-pointer block"
            >
              <span className="font-serif-luxury font-normal text-2xl sm:text-3xl tracking-[0.22em] text-[#FAF8F5] block uppercase">
                {weddingData.settings.brandName}
              </span>
              <span className="text-[10px] tracking-[0.28em] text-[#C4B5A5] uppercase block font-sans mt-0.5 font-medium">
                {weddingData.settings.brandSubtitle}
              </span>
            </button>
            <p className="text-xs text-[#C5BEB3] leading-relaxed max-w-sm font-sans font-light">
              Fine-art wedding and editorial photography studio documenting quiet romance, honest vows, and enduring love stories worldwide.
            </p>
            <div className="pt-3 space-y-2">
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#A39B8F] font-medium block">
                Connect With The Studio
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={weddingData.settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="h-9 px-3 rounded-full bg-[#3D3833] dark:bg-[#201D1A] hover:bg-[#B8A99A] dark:hover:bg-[#B8A99A] text-white flex items-center gap-2 text-xs font-medium transition-all duration-200 shadow-xs"
                >
                  <IconInstagram size={15} />
                  <span className="text-[11px] tracking-wider uppercase">Instagram</span>
                </a>
                <a
                  href={weddingData.settings.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className="w-9 h-9 rounded-full bg-[#3D3833] dark:bg-[#201D1A] hover:bg-[#B8A99A] dark:hover:bg-[#B8A99A] text-white flex items-center justify-center transition-all duration-200 shadow-xs"
                >
                  <IconTwitter size={14} />
                </a>
                <a
                  href={weddingData.settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-[#3D3833] dark:bg-[#201D1A] hover:bg-[#B8A99A] dark:hover:bg-[#B8A99A] text-white flex items-center justify-center transition-all duration-200 shadow-xs"
                >
                  <IconFacebook size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#C4B5A5] font-semibold font-sans">
              EXPLORE
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider uppercase font-sans font-medium">
              <li>
                <button
                  onClick={() => navigateTo('/')}
                  className="text-[#E0DAD0] hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/about')}
                  className="text-[#E0DAD0] hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  About The Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/packages')}
                  className="text-[#E0DAD0] hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  Packages & Investment
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/gallery')}
                  className="text-[#E0DAD0] hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  Portfolio Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/contact')}
                  className="text-[#E0DAD0] hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  Check Date & Inquire
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter / Love Note Registry */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#C4B5A5] font-semibold font-sans">
              THE LOVE JOURNAL
            </h4>
            <p className="text-xs text-[#C5BEB3] leading-relaxed">
              Receive seasonal date openings, destination travel schedules, and curated wedding planning journals.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 py-2.5 px-3.5 bg-[#1A1816] text-[#C4B5A5] text-xs uppercase tracking-wider">
                <IconCheck size={16} />
                <span>You are subscribed to studio notes.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full bg-[#181614] dark:bg-[#151413] border border-[#3D3833] dark:border-[#302B27] px-3.5 py-2 text-xs text-[#FAF8F5] placeholder-[#8F887D] focus:outline-none focus:border-[#C4B5A5] transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-4 bg-[#B8A99A] hover:bg-[#A69584] text-white transition-colors cursor-pointer flex items-center justify-center"
                    aria-label="Subscribe"
                  >
                    <IconArrowRight size={16} />
                  </button>
                </div>
                <span className="text-[10px] text-[#9E9589] block">
                  Strict privacy. We respect your inbox.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal & Admin Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A39B8F]">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span>© {new Date().getFullYear()} THE AMENA BRAND. All rights reserved.</span>
            <span className="hidden sm:inline text-[#4A443C]">•</span>
            <a
              href="https://www.instagram.com/ekopixels?stkn=OGRwdmdleWd4Y282&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold tracking-wider text-[#D4CEBF] hover:text-[#FAF8F5] transition-colors"
            >
              BUILT BY EKO PIXELS
            </a>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => navigateTo('/privacy')}
              className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => navigateTo('/terms')}
              className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span>•</span>
            <button
              onClick={() => navigateTo('/admin')}
              className="inline-flex items-center gap-1 text-[#665F55] hover:text-[#D4CEBF] transition-colors cursor-pointer"
              title="Studio Management"
              aria-label="Studio Management"
            >
              <IconLock size={12} />
              <span className="text-[10px] uppercase tracking-wider">CMS</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
