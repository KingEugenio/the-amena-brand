import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/common/ProductCard';
import { SectionHeading } from '../components/common/SectionHeading';
import { IconFilter, IconClose, IconSearch } from '../components/icons/Icons';

export const ShopPage: React.FC = () => {
  const { data } = useApp();
  const { products, collections } = data;

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-asc' | 'price-desc'>('featured');
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // Check URL search params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const colParam = params.get('collection');
    const catParam = params.get('category');
    if (colParam) setSelectedCollection(colParam);
    if (catParam) setSelectedCategory(catParam);
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'all' && p.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
        if (selectedCollection !== 'all') {
          const matchedCol = collections.find((c) => c.slug === selectedCollection || c.id === selectedCollection);
          if (matchedCol && p.collectionId !== matchedCol.id) {
            return false;
          }
        }
        if (selectedAvailability !== 'all') {
          if (selectedAvailability === 'in-stock' && p.availability !== 'In Stock') return false;
          if (selectedAvailability === 'made-to-order' && p.availability !== 'Made to Order') return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches =
            p.name.toLowerCase().includes(q) ||
            p.shortDescription.toLowerCase().includes(q) ||
            p.tags.some((t) => t.toLowerCase().includes(q));
          if (!matches) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (sortBy === 'price-asc') return (a.price || 0) - (b.price || 0);
        if (sortBy === 'price-desc') return (b.price || 0) - (a.price || 0);
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, collections, selectedCategory, selectedCollection, selectedAvailability, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedCollection('all');
    setSelectedAvailability('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedCollection !== 'all' ||
    selectedAvailability !== 'all' ||
    searchQuery !== '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      {/* Header Section */}
      <div className="border-b border-[#E5E1D8] pb-10">
        <SectionHeading
          label="THE STUDIO COLLECTION"
          title="Curated Pieces & Apparel"
          description="Every silhouette is crafted with architectural presence, tactile linen blends, and made-to-order personalization in Accra."
        />
      </div>

      {/* Filter and Control Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 border-b border-[#E5E1D8]">
        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`text-xs uppercase tracking-widest px-4 py-2 border transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-[#191816] text-[#FAF9F5] border-[#191816]'
                : 'bg-transparent text-[#6B6862] border-[#E5E1D8] hover:text-[#191816] hover:border-[#191816]'
            }`}
          >
            All Pieces ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs uppercase tracking-widest px-4 py-2 border transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#191816] text-[#FAF9F5] border-[#191816]'
                  : 'bg-transparent text-[#6B6862] border-[#E5E1D8] hover:text-[#191816] hover:border-[#191816]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Right Sort & Search Options */}
        <div className="flex items-center gap-3">
          {/* In-page Search */}
          <div className="relative flex-1 sm:w-48">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full bg-[#F3F1EB] border border-[#E5E1D8] text-xs py-2 pl-8 pr-3 text-[#191816] placeholder-[#A69F91] focus:outline-none focus:border-[#191816]"
            />
            <IconSearch size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#6B6862]" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6B6862] hover:text-[#191816]"
              >
                <IconClose size={12} />
              </button>
            )}
          </div>

          {/* Sort selector */}
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="bg-[#F3F1EB] border border-[#E5E1D8] text-xs py-2 px-3 text-[#191816] uppercase tracking-wider focus:outline-none focus:border-[#191816] cursor-pointer"
          >
            <option value="featured">Featured First</option>
            <option value="newest">Newest Arrivals</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Secondary filter chips if any collection or filter is active */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap text-xs text-[#6B6862]">
          <span>Active Filters:</span>
          {selectedCategory !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F3F1EB] text-[#191816] border border-[#E5E1D8]">
              Category: {selectedCategory}
              <button onClick={() => setSelectedCategory('all')} className="cursor-pointer">
                <IconClose size={12} />
              </button>
            </span>
          )}
          {selectedCollection !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F3F1EB] text-[#191816] border border-[#E5E1D8]">
              Collection: {collections.find((c) => c.slug === selectedCollection || c.id === selectedCollection)?.title || selectedCollection}
              <button onClick={() => setSelectedCollection('all')} className="cursor-pointer">
                <IconClose size={12} />
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F3F1EB] text-[#191816] border border-[#E5E1D8]">
              Keyword: "{searchQuery}"
              <button onClick={() => setSearchQuery('')} className="cursor-pointer">
                <IconClose size={12} />
              </button>
            </span>
          )}
          <button
            onClick={resetFilters}
            className="text-[#9A5B32] underline hover:text-[#191816] ml-2 cursor-pointer uppercase tracking-wider text-[11px]"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10">
          {filteredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} priority={idx < 4} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 sm:py-28 space-y-4 bg-[#F3F1EB] border border-[#E5E1D8] p-8">
          <h3 className="font-serif-heading text-2xl text-[#191816]">Nothing here yet.</h3>
          <p className="text-xs sm:text-sm text-[#6B6862] max-w-md mx-auto leading-relaxed">
            No products match the selected criteria. Try resetting filters or contact our studio on WhatsApp for custom inquiries.
          </p>
          <div className="pt-2">
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-[#191816] text-[#FAF9F5] text-xs uppercase tracking-widest font-medium cursor-pointer hover:bg-[#32302D] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
