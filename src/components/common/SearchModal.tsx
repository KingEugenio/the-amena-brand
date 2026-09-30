import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { IconClose, IconSearch, IconArrowRight } from '../icons/Icons';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, data, navigateTo } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const matchingProducts = cleanQuery
    ? data.products.filter(
        (p) =>
          p.name.toLowerCase().includes(cleanQuery) ||
          p.category.toLowerCase().includes(cleanQuery) ||
          p.tags.some((t) => t.toLowerCase().includes(cleanQuery)) ||
          p.shortDescription.toLowerCase().includes(cleanQuery)
      )
    : [];

  const matchingStories = cleanQuery
    ? data.journal.filter(
        (j) =>
          j.title.toLowerCase().includes(cleanQuery) ||
          j.category.toLowerCase().includes(cleanQuery) ||
          j.excerpt.toLowerCase().includes(cleanQuery)
      )
    : [];

  const matchingCollections = cleanQuery
    ? data.collections.filter(
        (c) =>
          c.title.toLowerCase().includes(cleanQuery) ||
          c.description.toLowerCase().includes(cleanQuery)
      )
    : [];

  const hasResults =
    matchingProducts.length > 0 ||
    matchingStories.length > 0 ||
    matchingCollections.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#121110]/80 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-150"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        className="bg-[#FAF9F5] dark:bg-[#1B1815] w-full max-w-2xl border border-[#E5E1D8] dark:border-[#2F2B26] shadow-2xl p-6 sm:p-8 space-y-6 text-[#2C2825] dark:text-[#FAF7F2]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center justify-between border-b border-[#E5E1D8] dark:border-[#2F2B26] pb-4">
          <div className="flex items-center gap-3 w-full">
            <IconSearch size={22} className="text-[#6B6862] dark:text-[#B5ACA2]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search collections, galleries, or wedding packages..."
              className="w-full bg-transparent text-lg sm:text-xl font-serif-luxury text-[#191816] dark:text-[#FAF7F2] placeholder-[#A69F91] dark:placeholder-[#78716A] focus:outline-none"
            />
          </div>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-[#6B6862] dark:text-[#B5ACA2] hover:text-[#191816] dark:hover:text-[#FAF7F2] transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <IconClose size={22} />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto space-y-6 pr-2">
          {!cleanQuery && (
            <div className="text-center py-8 text-[#6B6862] dark:text-[#A89F94] text-xs uppercase tracking-widest font-sans">
              Type keywords such as "Weddings", "Collections", "Carmel", or "Film"
            </div>
          )}

          {cleanQuery && !hasResults && (
            <div className="text-center py-12 space-y-2">
              <p className="font-serif-luxury text-lg text-[#191816] dark:text-[#FAF7F2]">No results found for "{query}"</p>
              <p className="text-xs text-[#6B6862] dark:text-[#B5ACA2]">Try adjusting your search terms or contact us on WhatsApp for bespoke inquiries.</p>
            </div>
          )}

          {/* Products Results */}
          {matchingProducts.length > 0 && (
            <div className="space-y-3">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#9A5B32] font-semibold block">
                Products ({matchingProducts.length})
              </span>
              <div className="divide-y divide-[#E5E1D8] dark:divide-[#2F2B26]">
                {matchingProducts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      navigateTo(`/shop/${p.slug}`);
                      setIsSearchOpen(false);
                    }}
                    className="w-full text-left py-3 flex items-center justify-between group hover:bg-[#F3F1EB] dark:hover:bg-[#25211D] px-2 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.mainImage}
                        alt={p.name}
                        className="w-12 h-14 object-cover border border-[#E5E1D8] dark:border-[#2F2B26]"
                      />
                      <div>
                        <h4 className="font-serif-luxury text-sm text-[#191816] dark:text-[#FAF7F2] group-hover:text-[#B8A99A] transition-colors font-medium">
                          {p.name}
                        </h4>
                        <span className="text-xs text-[#6B6862] dark:text-[#A89F94]">{p.category} • {p.price ? `${p.currency} ${p.price.toLocaleString()}` : p.availability}</span>
                      </div>
                    </div>
                    <IconArrowRight size={16} className="text-[#6B6862] dark:text-[#A89F94] group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Collections Results */}
          {matchingCollections.length > 0 && (
            <div className="space-y-3">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#9A5B32] font-semibold block">
                Collections ({matchingCollections.length})
              </span>
              <div className="divide-y divide-[#E5E1D8] dark:divide-[#2F2B26]">
                {matchingCollections.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      navigateTo(`/packages`);
                      setIsSearchOpen(false);
                    }}
                    className="w-full text-left py-3 flex items-center justify-between group hover:bg-[#F3F1EB] dark:hover:bg-[#25211D] px-2 transition-colors cursor-pointer"
                  >
                    <div>
                      <h4 className="font-serif-luxury text-sm text-[#191816] dark:text-[#FAF7F2] group-hover:text-[#B8A99A] transition-colors font-medium">
                        {c.title}
                      </h4>
                      <p className="text-xs text-[#6B6862] dark:text-[#A89F94] line-clamp-1">{c.description}</p>
                    </div>
                    <IconArrowRight size={16} className="text-[#6B6862] dark:text-[#A89F94] group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Journal Results */}
          {matchingStories.length > 0 && (
            <div className="space-y-3">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#9A5B32] font-semibold block">
                Journal Stories ({matchingStories.length})
              </span>
              <div className="divide-y divide-[#E5E1D8] dark:divide-[#2F2B26]">
                {matchingStories.map((j) => (
                  <button
                    key={j.id}
                    onClick={() => {
                      navigateTo(`/`);
                      setIsSearchOpen(false);
                    }}
                    className="w-full text-left py-3 flex items-center justify-between group hover:bg-[#F3F1EB] dark:hover:bg-[#25211D] px-2 transition-colors cursor-pointer"
                  >
                    <div>
                      <h4 className="font-serif-luxury text-sm text-[#191816] dark:text-[#FAF7F2] group-hover:text-[#B8A99A] transition-colors font-medium">
                        {j.title}
                      </h4>
                      <span className="text-xs text-[#6B6862] dark:text-[#A89F94]">{j.category} • {j.date}</span>
                    </div>
                    <IconArrowRight size={16} className="text-[#6B6862] dark:text-[#A89F94] group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
