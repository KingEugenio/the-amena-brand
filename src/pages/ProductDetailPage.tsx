import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/common/ProductCard';
import { Button } from '../components/common/Buttons';
import {
  IconWhatsApp,
  IconArrowLeft,
  IconShare,
  IconCheck,
  IconEye,
  IconMail
} from '../components/icons/Icons';

interface ProductDetailPageProps {
  slug: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug }) => {
  const { data, navigateTo, openWhatsApp, openLightbox, showToast } = useApp();
  const { products, collections } = data;

  const product = products.find((p) => p.slug === slug) || products.find((p) => p.id === slug);

  const [selectedImage, setSelectedImage] = useState<string>(
    product?.mainImage || ''
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.sizeOptions && product.sizeOptions.length > 0 ? product.sizeOptions[0] : ''
  );
  const [showEnquiryModal, setShowEnquiryModal] = useState<boolean>(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="font-serif-heading text-3xl text-[#191816]">Piece Not Found</h2>
        <p className="text-sm text-[#6B6862]">This garment or collection piece may have been updated or archived.</p>
        <Button variant="primary" onClick={() => navigateTo('/shop')}>
          RETURN TO SHOP
        </Button>
      </div>
    );
  }

  const gallery = product.images && product.images.length > 0 ? product.images : [product.mainImage];
  const activeImage = selectedImage || product.mainImage;

  // Collection reference
  const collection = collections.find((c) => c.id === product.collectionId);

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.collectionId === product.collectionId))
    .slice(0, 3);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product.name} — THE AMENA BRAND`,
          text: product.shortDescription,
          url
        });
      } catch {
        // Ignored
      }
    } else {
      navigator.clipboard.writeText(url);
      showToast('Product link copied to clipboard.');
    }
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryForm.name || !enquiryForm.email) {
      showToast('Please enter your name and email.', 'error');
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: enquiryForm.name,
          email: enquiryForm.email,
          phone: enquiryForm.phone,
          subject: `Inquiry: ${product.name} (${selectedSize || 'Standard'})`,
          message: enquiryForm.message || `I am interested in acquiring ${product.name}. Please advise on sizing and availability.`
        })
      });

      if (res.ok) {
        showToast('Enquiry received. Our studio will follow up promptly.');
        setShowEnquiryModal(false);
        setEnquiryForm({ name: '', email: '', phone: '', message: '' });
      } else {
        showToast('Submission error. Please try direct WhatsApp.', 'error');
      }
    } catch {
      showToast('Network error. Please contact on WhatsApp.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 space-y-16 sm:space-y-24">
      {/* Breadcrumb & Back Navigation */}
      <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-4 text-xs text-[#6B6862]">
        <button
          onClick={() => navigateTo('/shop')}
          className="inline-flex items-center gap-2 hover:text-[#191816] transition-colors cursor-pointer uppercase tracking-wider font-medium"
        >
          <IconArrowLeft size={14} />
          <span>Back to Collection</span>
        </button>

        <div className="flex items-center gap-4">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 hover:text-[#191816] transition-colors cursor-pointer uppercase tracking-wider"
            title="Share Piece"
          >
            <IconShare size={14} />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      {/* Main Product Layout: Desktop Gallery Left / Info Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Gallery Section */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Display Image */}
          <div className="relative aspect-[4/5] bg-[#F3F1EB] border border-[#E5E1D8] overflow-hidden group">
            <img
              src={activeImage}
              alt={product.altText || product.name}
              className="w-full h-full object-cover select-none"
            />
            {/* Lightbox zoom button */}
            <button
              onClick={() => openLightbox(activeImage, product.name, gallery)}
              className="absolute top-4 right-4 p-2.5 bg-[#FAF9F5]/90 hover:bg-[#FAF9F5] text-[#191816] shadow-xs transition-all cursor-pointer"
              title="Expand Fullscreen"
              aria-label="Expand image fullscreen"
            >
              <IconEye size={18} />
            </button>
          </div>

          {/* Multiple Image Thumbnails */}
          {gallery.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 pt-2">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-square overflow-hidden border transition-all cursor-pointer ${
                    activeImage === img
                      ? 'border-[#191816] ring-1 ring-[#191816]'
                      : 'border-[#E5E1D8] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information Section */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
          {/* Title, Category & Collection */}
          <div className="space-y-2 border-b border-[#E5E1D8] pb-6">
            <div className="flex items-center justify-between text-xs text-[#6B6862] uppercase tracking-[0.2em] font-sans">
              <span>{product.category}</span>
              {collection && (
                <button
                  onClick={() => navigateTo(`/shop?collection=${collection.slug}`)}
                  className="hover:text-[#9A5B32] transition-colors cursor-pointer"
                >
                  {collection.title}
                </button>
              )}
            </div>

            <h1 className="font-serif-heading text-3xl sm:text-4xl text-[#191816] leading-tight">
              {product.name}
            </h1>

            {/* Price & Availability */}
            <div className="pt-2 flex items-baseline gap-4">
              <span className="font-mono text-xl sm:text-2xl text-[#191816]">
                {product.price ? `${product.currency} ${product.price.toLocaleString()}` : 'Price on Inquiry'}
              </span>
              <span className="text-xs uppercase tracking-wider text-[#9A5B32] font-medium font-sans">
                • {product.availability}
              </span>
            </div>
          </div>

          {/* Short & Full Description */}
          <div className="space-y-3">
            <p className="text-sm sm:text-base text-[#191816] font-serif-heading leading-relaxed font-normal">
              {product.shortDescription}
            </p>
            {product.fullDescription && (
              <p className="text-xs sm:text-sm text-[#6B6862] leading-relaxed font-sans font-light">
                {product.fullDescription}
              </p>
            )}
          </div>

          {/* Sizing / Measurement Options */}
          {product.sizeOptions && product.sizeOptions.length > 0 && (
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between text-xs uppercase tracking-wider text-[#191816]">
                <span className="font-medium">SELECT FIT / SIZE</span>
                <span className="text-[#6B6862] text-[11px]">Accra Studio Standard</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizeOptions.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`text-xs uppercase px-3.5 py-2 border transition-all cursor-pointer ${
                      selectedSize === size
                        ? 'bg-[#191816] text-[#FAF9F5] border-[#191816]'
                        : 'bg-[#FAF9F5] text-[#191816] border-[#E5E1D8] hover:border-[#191816]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PRIMARY CONVERSION CTAS (WhatsApp and Email Enquiry) */}
          <div className="space-y-3 pt-4 border-t border-[#E5E1D8]">
            <button
              onClick={() => openWhatsApp('product', `${product.name} (Size: ${selectedSize || 'Standard'})`)}
              className="w-full py-4 px-6 bg-[#191816] text-[#FAF9F5] hover:bg-[#2C2926] transition-colors flex items-center justify-center gap-3 text-xs sm:text-sm uppercase tracking-widest font-medium cursor-pointer shadow-xs"
            >
              <IconWhatsApp size={20} className="text-[#25D366]" />
              <span>ENQUIRE ON WHATSAPP</span>
            </button>

            <button
              onClick={() => setShowEnquiryModal(true)}
              className="w-full py-3 px-6 bg-transparent text-[#191816] border border-[#E5E1D8] hover:border-[#191816] hover:bg-[#F3F1EB] transition-colors flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-medium cursor-pointer"
            >
              <IconMail size={16} />
              <span>EMAIL INQUIRY / BESPOKE FIT</span>
            </button>

            <p className="text-[11px] text-[#6B6862] text-center tracking-wide font-sans pt-1">
              Direct connection to WhatsApp line: <strong>0579499223</strong>. Sizing consultations are complimentary.
            </p>
          </div>

          {/* Product Specifications & Craft Details */}
          {product.details && product.details.length > 0 && (
            <div className="pt-6 border-t border-[#E5E1D8] space-y-3">
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#191816] font-medium font-sans">
                STUDIO SPECIFICATIONS
              </h4>
              <ul className="space-y-2">
                {product.details.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-[#6B6862] font-sans">
                    <IconCheck size={14} className="text-[#9A5B32] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Stock & Production Status */}
          <div className="p-4 bg-[#F3F1EB] border border-[#E5E1D8] text-xs space-y-1">
            <span className="font-semibold text-[#191816] uppercase tracking-wider block">
              PRODUCTION & DELIVERY
            </span>
            <p className="text-[#6B6862]">
              {product.stockStatus || 'Handcrafted in Accra, Ghana. Express courier shipping nationwide and international dispatch via DHL.'}
            </p>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-16 border-t border-[#E5E1D8] space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="font-serif-heading text-2xl text-[#191816]">
              More from the Collection
            </h3>
            <button
              onClick={() => navigateTo('/shop')}
              className="text-xs uppercase tracking-wider text-[#191816] hover:text-[#9A5B32] border-b border-[#191816] pb-0.5 cursor-pointer"
            >
              View Full Archive
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}

      {/* Direct Contact Modal for Email Inquiries */}
      {showEnquiryModal && (
        <div
          className="fixed inset-0 z-50 bg-[#121110]/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setShowEnquiryModal(false)}
        >
          <div
            className="bg-[#FAF9F5] border border-[#E5E1D8] p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-[#E5E1D8] pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#9A5B32] font-semibold block">
                  STUDIO INQUIRY
                </span>
                <h3 className="font-serif-heading text-xl text-[#191816]">{product.name}</h3>
              </div>
              <button
                onClick={() => setShowEnquiryModal(false)}
                className="text-[#6B6862] hover:text-[#191816] cursor-pointer text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEnquirySubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#191816] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={enquiryForm.name}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full bg-[#F3F1EB] border border-[#E5E1D8] px-3.5 py-2.5 text-xs text-[#191816] focus:outline-none focus:border-[#191816]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#191816] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={enquiryForm.email}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full bg-[#F3F1EB] border border-[#E5E1D8] px-3.5 py-2.5 text-xs text-[#191816] focus:outline-none focus:border-[#191816]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#191816] mb-1">
                  Phone / WhatsApp (Optional)
                </label>
                <input
                  type="text"
                  value={enquiryForm.phone}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                  placeholder="e.g. 0579499223"
                  className="w-full bg-[#F3F1EB] border border-[#E5E1D8] px-3.5 py-2.5 text-xs text-[#191816] focus:outline-none focus:border-[#191816]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#191816] mb-1">
                  Inquiry Details / Sizing Notes
                </label>
                <textarea
                  rows={3}
                  value={enquiryForm.message}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                  placeholder="Specify measurements, desired delivery timeframe, or questions..."
                  className="w-full bg-[#F3F1EB] border border-[#E5E1D8] px-3.5 py-2.5 text-xs text-[#191816] focus:outline-none focus:border-[#191816]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowEnquiryModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  isLoading={submitting}
                >
                  Submit Inquiry
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
