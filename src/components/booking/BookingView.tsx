import React, { useState } from 'react';
import { Check, Mail, Clock, Send, Calendar, Download, ExternalLink, Sparkles, Camera, Palette } from 'lucide-react';
import { BookingInquiry } from '../../types';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { BookingFormSkeleton } from '../common/Skeletons';
import { BookingCalendar } from './BookingCalendar';
import { WhatsAppIcon } from '../common/WhatsAppIcon';
import { generateGoogleCalendarUrl, downloadICSFile } from '../../utils/calendarUtils';
import { submitBooking } from '../../lib/tenantStore';

const DESIGN_DELIVERABLES = [
  'Visual Identity & Logo Suite',
  'Social Media Graphics & Campaign Assets',
  'Promotional Materials, Flyers & Posters',
  'Event Graphics & Stage Displays',
  'Album Artwork & Music Covers',
  'Brand Guidelines & Stationery',
];

export const BookingView: React.FC = () => {
  const { settings, simulateLoading } = useSiteConfig();

  const [category, setCategory] = useState<'graphic-design' | 'photography'>('graphic-design');

  const [formData, setFormData] = useState<BookingInquiry>({
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    categoryType: 'graphic-design',
    brandOrProjectName: '',
    deliverablesNeeded: ['Visual Identity & Logo Suite'],
    service: 'Brand Identity & Visual System',
    eventDate: '',
    location: 'Accra, Ghana (or Remote)',
    numberOfPeople: '',
    budgetRange: 'GHS 7,500 - GHS 15,000',
    referralSource: 'Instagram',
    projectDescription: '',
    additionalInfo: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (simulateLoading) {
    return (
      <div className="pt-32 pb-24 max-w-3xl mx-auto px-6">
        <BookingFormSkeleton />
      </div>
    );
  }

  const handleCategoryChange = (newCat: 'graphic-design' | 'photography') => {
    setCategory(newCat);
    setFormData((prev) => ({
      ...prev,
      categoryType: newCat,
      service: newCat === 'graphic-design' ? 'Brand Identity & Visual System' : 'Wedding Photography',
      budgetRange: newCat === 'graphic-design' ? 'GHS 7,500 - GHS 15,000' : 'GHS 25,000 - GHS 35,000',
      location: newCat === 'graphic-design' ? 'Accra, Ghana (or Remote)' : 'Accra, Ghana',
    }));
    setErrors({});
  };

  const toggleDeliverable = (item: string) => {
    const current = formData.deliverablesNeeded || [];
    const updated = current.includes(item)
      ? current.filter((d) => d !== item)
      : [...current, item];
    setFormData({ ...formData, deliverablesNeeded: updated });
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please provide your full name.';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.whatsapp.trim() && !formData.phone.trim()) {
      errs.phone = 'Please provide a phone or WhatsApp number.';
    }
    if (!formData.eventDate.trim()) {
      errs.eventDate = category === 'graphic-design' 
        ? 'Please select your target deadline or kickoff date.' 
        : 'Please select your preferred event date on the calendar.';
    }
    if (category === 'graphic-design' && !formData.brandOrProjectName?.trim()) {
      errs.brandOrProjectName = 'Please provide the brand, artist, or project name.';
    }
    if (!formData.location.trim()) {
      errs.location = 'Please indicate your location, venue, or remote preference.';
    }
    if (!formData.projectDescription.trim()) {
      errs.projectDescription = 'Tell us a few words about your project scope or vision.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Record the inquiry in the studio inbox (visible in the admin portal).
    try {
      await submitBooking(formData);
    } catch (err) {
      console.error('Failed to save inquiry', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }, 1000);
  };

  const handleDirectWhatsApp = () => {
    const clean = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const isDesign = category === 'graphic-design';
    const prefill = encodeURIComponent(
      isDesign
        ? `Hello ${settings.designBrandName} (Frederick Akwafo),\nI'd like to discuss a graphic design / brand identity deal.\nBrand/Project: ${formData.brandOrProjectName || 'New Brand'}\nService: ${formData.service}\nDeliverables: ${(formData.deliverablesNeeded || []).join(', ')}\nTarget Date: ${formData.eventDate || 'Upcoming'}\nClient: ${formData.fullName || 'Client'}`
        : `Hello ${settings.photographerName},\nI'd like to book a photography session on ${formData.eventDate || 'an upcoming date'} in ${formData.location || 'Accra'}.\nService: ${formData.service}\nClient: ${formData.fullName || 'Potential Client'}`
    );
    window.open(`https://wa.me/${clean}?text=${prefill}`, '_blank', 'noopener,noreferrer');
  };

  const handleAddToGoogleCalendar = () => {
    const isDesign = category === 'graphic-design';
    const title = isDesign
      ? `[${settings.designBrandName}] ${formData.service} - ${formData.brandOrProjectName || formData.fullName}`
      : `[${settings.photographerName}] ${formData.service} - ${formData.fullName || 'Client'}`;
    const url = generateGoogleCalendarUrl({
      title,
      description: formData.projectDescription || `Creative commission: ${formData.service}`,
      location: formData.location || 'Accra, Ghana',
      startDate: formData.eventDate || new Date().toISOString().split('T')[0],
      clientName: formData.fullName || 'Client',
      clientEmail: formData.email || 'client@example.com',
      clientPhone: formData.whatsapp || formData.phone || '0544795536',
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadICS = () => {
    const isDesign = category === 'graphic-design';
    const title = isDesign
      ? `${settings.designBrandName} - ${formData.service}`
      : `${settings.photographerName} - ${formData.service}`;
    downloadICSFile({
      title,
      description: formData.projectDescription || `Creative commission with Frederick Akwafo`,
      location: formData.location || 'Accra, Ghana',
      startDate: formData.eventDate || new Date().toISOString().split('T')[0],
      clientName: formData.fullName || 'Client',
      clientEmail: formData.email || 'client@example.com',
      clientPhone: formData.whatsapp || formData.phone || '0544795536',
    });
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 px-6 sm:px-12 max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
        <span className="text-xs uppercase tracking-[0.25em] text-[var(--text-muted)] font-mono block">
          Creative Inquiries &bull; 2026 / 2027 Calendar Open
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-normal text-[var(--text-main)]">
          Commission & Booking
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-muted)] font-normal leading-relaxed">
          Book graphic design and brand identity deals with <strong>{settings.designBrandName}</strong>, or secure your documentary photography dates with <strong>{settings.photographerName}</strong>.
        </p>
      </div>

      {/* Discipline Toggle Switcher */}
      <div className="max-w-2xl mx-auto mb-16">
        <div className="grid grid-cols-2 p-1.5 bg-[var(--card-bg)] border border-[var(--border-line)]">
          <button
            type="button"
            onClick={() => handleCategoryChange('graphic-design')}
            className={`flex items-center justify-center gap-2.5 py-4 px-4 text-xs sm:text-sm uppercase tracking-wider font-mono font-semibold transition-all cursor-pointer ${
              category === 'graphic-design'
                ? 'bg-[var(--text-main)] text-[var(--bg-base)] shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            <Palette size={16} />
            <span>FREDDIE DESIGN PALACE</span>
          </button>
          <button
            type="button"
            onClick={() => handleCategoryChange('photography')}
            className={`flex items-center justify-center gap-2.5 py-4 px-4 text-xs sm:text-sm uppercase tracking-wider font-mono font-semibold transition-all cursor-pointer ${
              category === 'photography'
                ? 'bg-[var(--text-main)] text-[var(--bg-base)] shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            <Camera size={16} />
            <span>FREDDIE SHOT IT</span>
          </button>
        </div>
        <p className="text-center text-xs font-mono text-[var(--text-muted)] mt-3">
          {category === 'graphic-design'
            ? 'Visual identities, brand deals, campaign collateral, event graphics & album artwork.'
            : 'Weddings, portraits, concerts, cultural celebrations & live event archives.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Communication & Booking Commitments */}
        <div className="lg:col-span-5 space-y-6">
          {/* Direct WhatsApp Box */}
          <div className="p-6 bg-[var(--card-bg)] border border-[var(--border-line)] space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-wider font-semibold text-[var(--text-main)]">
              <WhatsAppIcon size={18} className="fill-[#25D366] text-[#25D366]" />
              <span>
                {category === 'graphic-design' ? 'Direct Design Desk' : 'Direct Photography Desk'}
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] font-normal leading-relaxed">
              {category === 'graphic-design'
                ? 'Discuss brand identity briefs, campaign timelines, and graphic design deals directly on WhatsApp:'
                : 'For immediate inquiry, date checks, or urgent event commissions, chat directly with Freddie on WhatsApp:'}
            </p>
            <button
              type="button"
              onClick={handleDirectWhatsApp}
              className="w-full flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-semibold bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 transition-colors cursor-pointer rounded-xs"
            >
              <WhatsAppIcon size={16} className="fill-white text-white" />
              <span>0544795536</span>
            </button>
          </div>

          {/* Social Profile Quick Link */}
          <div className="p-6 bg-[var(--card-bg)] border border-[var(--border-line)] space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="uppercase tracking-wider text-[var(--text-main)] font-semibold">
                {category === 'graphic-design' ? 'Instagram Portfolio' : 'Instagram Archive'}
              </span>
              <ExternalLink size={12} className="text-[var(--text-muted)]" />
            </div>
            <p className="text-xs text-[var(--text-muted)] font-normal leading-relaxed">
              {category === 'graphic-design'
                ? 'Follow Freddie Design Palace for typography systems, brand marks, and posters.'
                : 'Follow Freddie Shot It for moments of truth, portraits, concerts, and weddings.'}
            </p>
            <a
              href={category === 'graphic-design' ? settings.designInstagramUrl : settings.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-mono font-semibold border border-[var(--border-line)] hover:border-[var(--text-main)] text-[var(--text-main)] py-3 transition-colors"
            >
              <span>
                {category === 'graphic-design' ? settings.designInstagramHandle : settings.instagramHandle}
              </span>
            </a>
          </div>

          {/* Studio Commitments */}
          <div className="p-6 bg-[var(--card-bg)] border border-[var(--border-line)] space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-wider font-semibold text-[var(--text-main)]">
              <Calendar size={16} className="text-[var(--primary-accent)]" />
              <span>Studio Commitments</span>
            </div>
            <ul className="text-xs text-[var(--text-muted)] space-y-2.5 font-normal">
              {category === 'graphic-design' ? (
                <>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-[var(--primary-accent)] mt-0.5 shrink-0" />
                    <span>In-depth creative consultation to understand your audience and goals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-[var(--primary-accent)] mt-0.5 shrink-0" />
                    <span>Iterative review phases with clear typography and color proofing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-[var(--primary-accent)] mt-0.5 shrink-0" />
                    <span>Vector exports, print-ready PDFs, and digital-optimized web packages</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-[var(--primary-accent)] mt-0.5 shrink-0" />
                    <span>Personal consultation and bespoke moodboard alignment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-[var(--primary-accent)] mt-0.5 shrink-0" />
                    <span>Guaranteed date exclusivity — single commission per day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-[var(--primary-accent)] mt-0.5 shrink-0" />
                    <span>Sneak peeks delivered within 3–7 days post-event</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Right Column: Interactive Booking Calendar & Form */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step 1: Interactive Calendar Component */}
          <div>
            <span className="block text-xs uppercase font-mono tracking-wider text-[var(--text-main)] font-bold mb-3">
              1. Choose {category === 'graphic-design' ? 'Target Delivery Date or Kickoff' : 'Event Date'} *
            </span>
            <BookingCalendar
              selectedDate={formData.eventDate}
              onSelectDate={(date) => {
                setFormData({ ...formData, eventDate: date });
                if (errors.eventDate) setErrors({ ...errors, eventDate: '' });
              }}
            />
            {errors.eventDate && (
              <p className="text-xs text-rose-500 mt-2 font-mono">{errors.eventDate}</p>
            )}
          </div>

          {/* Form Container */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-line)] p-8 sm:p-10 transition-colors">
            {isSubmitted ? (
              /* Success Confirmation State */
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 rounded-full bg-[var(--bg-surface)] border border-[var(--primary-accent)] flex items-center justify-center mx-auto text-[var(--primary-accent)]">
                  <Check size={32} />
                </div>
                <h3 className="text-3xl font-editorial font-normal text-[var(--text-main)]">
                  Inquiry Received & Date Logged
                </h3>
                <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-md mx-auto font-normal leading-relaxed">
                  Thank you, <strong className="text-[var(--text-main)]">{formData.fullName}</strong>. Your inquiry for <strong className="text-[var(--text-main)]">{formData.service}</strong>{formData.eventDate ? <> on <strong className="text-[var(--text-main)]">{formData.eventDate}</strong></> : null} has been logged with the {settings.designBrandName} &amp; {settings.photographerName} studio. To fast-track it, send the pre-filled WhatsApp message below — Frederick will confirm availability and next steps personally.
                </p>

                {/* Calendar Action Buttons */}
                <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-line)] rounded-xs max-w-md mx-auto space-y-4">
                  <span className="text-xs uppercase font-mono tracking-wider text-[var(--text-main)] font-semibold block">
                    Sync to Your Calendar:
                  </span>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={handleAddToGoogleCalendar}
                      className="flex-1 inline-flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-semibold bg-[var(--text-main)] text-[var(--bg-base)] py-3 px-4 hover:opacity-90 transition-colors cursor-pointer"
                    >
                      <ExternalLink size={14} />
                      <span>Google Calendar</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleDownloadICS}
                      className="flex-1 inline-flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-semibold border border-[var(--border-line)] text-[var(--text-main)] py-3 px-4 hover:bg-[var(--card-bg)] transition-colors cursor-pointer"
                    >
                      <Download size={14} />
                      <span>Apple / Outlook (.ics)</span>
                    </button>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-main)] underline cursor-pointer"
                  >
                    Submit another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Step indicator */}
                <div className="flex items-center justify-between pb-4 border-b border-[var(--border-line)] text-xs font-mono text-[var(--text-muted)]">
                  <span className="uppercase tracking-wider">
                    Step 2: {category === 'graphic-design' ? 'Brand & Design Deal Details' : 'Commission Details'}
                  </span>
                  <span>Confidential</span>
                </div>

                {/* Graphic Design: Brand / Project Name */}
                {category === 'graphic-design' && (
                  <div>
                    <label className="block text-xs uppercase font-mono tracking-wider text-[var(--text-main)] font-bold mb-2">
                      Brand, Artist, or Project Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Akoma Studios, Joyful Way Inc, New Album Launch"
                      value={formData.brandOrProjectName || ''}
                      onChange={(e) => {
                        setFormData({ ...formData, brandOrProjectName: e.target.value });
                        if (errors.brandOrProjectName) setErrors({ ...errors, brandOrProjectName: '' });
                      }}
                      className={`w-full bg-[var(--bg-surface)] border px-4 py-3 text-sm text-[var(--text-main)] placeholder:text-[var(--text-muted)]/60 focus:outline-none ${
                        errors.brandOrProjectName ? 'border-rose-500' : 'border-[var(--border-line)] focus:border-[var(--primary-accent)]'
                      }`}
                    />
                    {errors.brandOrProjectName && (
                      <p className="text-[11px] text-rose-500 mt-1 font-mono">{errors.brandOrProjectName}</p>
                    )}
                  </div>
                )}

                {/* Service Selection */}
                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-[var(--text-main)] font-bold mb-2">
                    2. Service / Offering Type *
                  </label>
                  {category === 'graphic-design' ? (
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[var(--bg-surface)] border border-[var(--border-line)] px-4 py-3 text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--primary-accent)]"
                    >
                      <option value="Brand Identity & Visual System">Brand Identity & Visual System</option>
                      <option value="Social Media Graphics & Campaign Suite">Social Media Graphics & Campaign Suite</option>
                      <option value="Promotional Materials, Flyers & Print">Promotional Materials, Flyers & Print</option>
                      <option value="Event Graphics & Stage Displays">Event Graphics & Stage Displays</option>
                      <option value="Album Artwork & Music Single Cover">Album Artwork & Music Single Cover</option>
                      <option value="Comprehensive Brand Deal & Visual Retainer">Comprehensive Brand Deal & Visual Retainer</option>
                    </select>
                  ) : (
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[var(--bg-surface)] border border-[var(--border-line)] px-4 py-3 text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--primary-accent)]"
                    >
                      <option value="Wedding Photography">Wedding Photography</option>
                      <option value="Destination Wedding">Destination Wedding (Ghana / Worldwide)</option>
                      <option value="Editorial Portraiture">Editorial Portraiture</option>
                      <option value="Live Events & Concerts">Live Events & Concerts</option>
                      <option value="Commercial & Brand Campaign">Commercial & Brand Campaign</option>
                    </select>
                  )}
                </div>

                {/* Design Deliverables Checklist */}
                {category === 'graphic-design' && (
                  <div className="space-y-2">
                    <label className="block text-xs uppercase font-mono tracking-wider text-[var(--text-main)] font-bold">
                      Deliverables Needed (Select all that apply)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {DESIGN_DELIVERABLES.map((deliv) => {
                        const isSelected = (formData.deliverablesNeeded || []).includes(deliv);
                        return (
                          <button
                            key={deliv}
                            type="button"
                            onClick={() => toggleDeliverable(deliv)}
                            className={`text-left text-xs p-2.5 border transition-all cursor-pointer flex items-center gap-2 ${
                              isSelected
                                ? 'border-[var(--text-main)] bg-[var(--bg-surface)] text-[var(--text-main)] font-semibold'
                                : 'border-[var(--border-line)] text-[var(--text-muted)] hover:border-[var(--text-muted)]'
                            }`}
                          >
                            <span
                              className={`w-3.5 h-3.5 border flex items-center justify-center text-[10px] ${
                                isSelected ? 'bg-[var(--text-main)] text-[var(--bg-base)] border-[var(--text-main)]' : 'border-[var(--border-line)]'
                              }`}
                            >
                              {isSelected && '✓'}
                            </span>
                            <span className="truncate">{deliv}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Location & Investment Range */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-mono tracking-wider text-[var(--text-main)] font-bold mb-2">
                      3. Location / Region *
                    </label>
                    <input
                      type="text"
                      placeholder={category === 'graphic-design' ? 'e.g. Accra, Ghana or Remote / International' : 'e.g. Labadi Beach Hotel, Accra'}
                      value={formData.location}
                      onChange={(e) => {
                        setFormData({ ...formData, location: e.target.value });
                        if (errors.location) setErrors({ ...errors, location: '' });
                      }}
                      className={`w-full bg-[var(--bg-surface)] border px-4 py-3 text-sm text-[var(--text-main)] placeholder:text-[var(--text-muted)]/60 focus:outline-none ${
                        errors.location ? 'border-rose-500' : 'border-[var(--border-line)] focus:border-[var(--primary-accent)]'
                      }`}
                    />
                    {errors.location && (
                      <p className="text-[11px] text-rose-500 mt-1 font-mono">{errors.location}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono tracking-wider text-[var(--text-main)] font-bold mb-2">
                      4. Investment Range
                    </label>
                    {category === 'graphic-design' ? (
                      <select
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                        className="w-full bg-[var(--bg-surface)] border border-[var(--border-line)] px-4 py-3 text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--primary-accent)]"
                      >
                        <option value="GHS 3,500 - GHS 7,500">GHS 3,500 – GHS 7,500 (Project Assets)</option>
                        <option value="GHS 7,500 - GHS 15,000">GHS 7,500 – GHS 15,000 (Complete Brand System)</option>
                        <option value="GHS 15,000 - GHS 30,000+">GHS 15,000 – GHS 30,000+ (Full Campaign & Retainer)</option>
                        <option value="Custom Enterprise Deal">Custom Enterprise Deal</option>
                      </select>
                    ) : (
                      <select
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                        className="w-full bg-[var(--bg-surface)] border border-[var(--border-line)] px-4 py-3 text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--primary-accent)]"
                      >
                        <option value="GHS 18,500 - GHS 25,000">GHS 18,500 – GHS 25,000</option>
                        <option value="GHS 25,000 - GHS 35,000">GHS 25,000 – GHS 35,000 (Signature)</option>
                        <option value="GHS 35,000 - GHS 50,000+">GHS 35,000 – GHS 50,000+ (Heirloom)</option>
                        <option value="Custom Commercial Scope">Custom Commercial Scope</option>
                      </select>
                    )}
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-[var(--text-main)] font-bold mb-2">
                    5. Tell us about your vision, message & objectives *
                  </label>
                  <textarea
                    rows={4}
                    placeholder={
                      category === 'graphic-design'
                        ? 'Describe your brand, message, target audience, and key deliverables you need created...'
                        : 'Share details about the ceremony, traditions, or aesthetic inspiration...'
                    }
                    value={formData.projectDescription}
                    onChange={(e) => {
                      setFormData({ ...formData, projectDescription: e.target.value });
                      if (errors.projectDescription) setErrors({ ...errors, projectDescription: '' });
                    }}
                    className={`w-full bg-[var(--bg-surface)] border px-4 py-3 text-sm text-[var(--text-main)] placeholder:text-[var(--text-muted)]/60 focus:outline-none ${
                      errors.projectDescription ? 'border-rose-500' : 'border-[var(--border-line)] focus:border-[var(--primary-accent)]'
                    }`}
                  />
                  {errors.projectDescription && (
                    <p className="text-[11px] text-rose-500 mt-1 font-mono">{errors.projectDescription}</p>
                  )}
                </div>

                {/* Contact Information */}
                <div className="pt-4 border-t border-[var(--border-line)] space-y-4">
                  <span className="text-xs uppercase font-mono tracking-wider text-[var(--text-main)] font-bold block">
                    6. Your Contact Information
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase font-mono text-[var(--text-muted)] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (errors.fullName) setErrors({ ...errors, fullName: '' });
                        }}
                        className={`w-full bg-[var(--bg-surface)] border px-4 py-2.5 text-sm text-[var(--text-main)] placeholder:text-[var(--text-muted)]/60 focus:outline-none ${
                          errors.fullName ? 'border-rose-500' : 'border-[var(--border-line)] focus:border-[var(--primary-accent)]'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-rose-500 mt-1 font-mono">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase font-mono text-[var(--text-muted)] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="client@domain.com"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        className={`w-full bg-[var(--bg-surface)] border px-4 py-2.5 text-sm text-[var(--text-main)] placeholder:text-[var(--text-muted)]/60 focus:outline-none ${
                          errors.email ? 'border-rose-500' : 'border-[var(--border-line)] focus:border-[var(--primary-accent)]'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-rose-500 mt-1 font-mono">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-mono text-[var(--text-muted)] mb-1">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 0544795536 or +233..."
                      value={formData.whatsapp}
                      onChange={(e) => {
                        setFormData({ ...formData, whatsapp: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      className={`w-full bg-[var(--bg-surface)] border px-4 py-2.5 text-sm text-[var(--text-main)] placeholder:text-[var(--text-muted)]/60 focus:outline-none ${
                        errors.phone ? 'border-rose-500' : 'border-[var(--border-line)] focus:border-[var(--primary-accent)]'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-rose-500 mt-1 font-mono">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Submit CTA */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[var(--text-main)] text-[var(--bg-base)] py-4 text-xs uppercase tracking-[0.25em] font-semibold hover:opacity-90 transition-all cursor-pointer shadow-md disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-[var(--bg-base)] border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting Inquiry & Syncing...</span>
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>
                          {category === 'graphic-design'
                            ? 'SUBMIT DESIGN DEAL INQUIRY'
                            : 'RESERVE DATE & SUBMIT INQUIRY'}
                        </span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-[var(--text-muted)] mt-3 font-mono">
                    Direct confirmation &bull; Personal reply within 24 hours
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

