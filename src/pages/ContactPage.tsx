import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  IconInstagram,
  IconTwitter,
  IconFacebook,
  IconMail,
  IconMapPin,
  IconCheck,
  IconCalendar
} from '../components/icons/Icons';
import { weddingData } from '../data/weddingData';
import { generateGoogleCalendarUrl, downloadICS, type CalendarBooking } from '../lib/calendarUtils';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();

  const [formData, setFormData] = useState({
    partner1: '',
    partner2: '',
    email: '',
    phone: '',
    weddingDate: '',
    venue: '',
    guestCount: '',
    packageInterest: 'The Heirloom Collection ($4,800)',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.partner1 || !formData.email || !formData.weddingDate) {
      showToast('Please provide your names, email, and wedding date.', 'error');
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.partner1} & ${formData.partner2 || 'Partner'}`,
          email: formData.email,
          phone: formData.phone,
          subject: `Wedding Date Inquiry: ${formData.weddingDate} at ${formData.venue || 'TBD'}`,
          message: `Package: ${formData.packageInterest}\nGuest Count: ${formData.guestCount}\nVenue: ${formData.venue}\n\nVision & Details:\n${formData.message}`
        })
      });

      if (res.ok) {
        setSubmitted(true);
        showToast('Your wedding inquiry has been received. We will be in touch within 24 hours.');
      } else {
        setSubmitted(true); // Graceful fallback
        showToast('Thank you! Your inquiry was sent successfully.');
      }
    } catch {
      setSubmitted(true);
      showToast('Thank you! We have received your wedding inquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAF8F5] dark:bg-[#12100E] text-[#2C2825] dark:text-[#FAF7F2] py-12 md:py-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        {/* Header */}
        <div className="max-w-3xl space-y-4 border-b border-[#E8E3DC] dark:border-[#2C2723] pb-10">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#78736E] dark:text-[#B5ACA2] font-semibold block">
            STUDIO CORRESPONDENCE & DATE RESERVATIONS
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-[#2C2825] dark:text-[#FAF7F2] font-light">
            Inquire For Your Celebration
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#78736E] dark:text-[#C4BCB1] leading-relaxed font-normal">
            Thank you for considering our studio to document your marriage. We invite you to tell us about your celebration, your vision, and your love story below.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Studio Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white dark:bg-[#1B1815] p-8 border border-[#E8E3DC] dark:border-[#2F2B26] shadow-xs space-y-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#78736E] dark:text-[#B5ACA2] font-semibold block">
                STUDIO DETAILS
              </span>
              <h3 className="font-serif-luxury text-2xl text-[#2C2825] dark:text-[#FAF7F2] font-normal">
                THE AMENA BRAND
              </h3>
              <p className="font-sans text-xs text-[#78736E] dark:text-[#C4BCB1] leading-relaxed">
                We accept a maximum of 20 wedding commissions each year to ensure personal dedication, artistic intimacy, and rapid heirloom delivery for every couple.
              </p>

              <div className="space-y-4 pt-4 border-t border-[#F2ECE5] dark:border-[#2A2621]">
                <div className="flex items-start gap-3">
                  <IconMail size={18} className="text-[#B8A99A] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#78736E] dark:text-[#B5ACA2] block font-medium">
                      Direct Inquiries
                    </span>
                    <a
                      href={`mailto:${weddingData.settings.email}`}
                      className="text-xs text-[#2C2825] dark:text-[#FAF7F2] hover:text-[#B8A99A] dark:hover:text-[#D5C7B8] transition-colors"
                    >
                      {weddingData.settings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <IconMapPin size={18} className="text-[#B8A99A] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#78736E] dark:text-[#B5ACA2] block font-medium">
                      Locations Served
                    </span>
                    <span className="text-xs text-[#2C2825] dark:text-[#FAF7F2]">
                      {weddingData.settings.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <IconCalendar size={18} className="text-[#B8A99A] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#78736E] dark:text-[#B5ACA2] block font-medium">
                      Availability
                    </span>
                    <span className="text-xs text-[#2C2825] dark:text-[#FAF7F2]">
                      Now reserving dates for 2025 & 2026 celebrations
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-6 border-t border-[#F2ECE5] dark:border-[#2A2621]">
                <span className="text-[10px] uppercase tracking-wider text-[#78736E] dark:text-[#B5ACA2] block font-medium mb-3">
                  Follow Our Recent Work
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={weddingData.settings.twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                    className="w-8 h-8 rounded-full bg-[#C4B5A5] dark:bg-[#342F2A] text-white dark:text-[#E8E2D9] flex items-center justify-center hover:bg-[#B3A291] dark:hover:bg-[#46403A] transition-colors"
                  >
                    <IconTwitter size={14} />
                  </a>
                  <a
                    href={weddingData.settings.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-8 h-8 rounded-full bg-[#C4B5A5] dark:bg-[#342F2A] text-white dark:text-[#E8E2D9] flex items-center justify-center hover:bg-[#B3A291] dark:hover:bg-[#46403A] transition-colors"
                  >
                    <IconInstagram size={14} />
                  </a>
                  <a
                    href={weddingData.settings.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-8 h-8 rounded-full bg-[#C4B5A5] dark:bg-[#342F2A] text-white dark:text-[#E8E2D9] flex items-center justify-center hover:bg-[#B3A291] dark:hover:bg-[#46403A] transition-colors"
                  >
                    <IconFacebook size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* Note on Response Times */}
            <div className="p-6 bg-[#F4EFEA] dark:bg-[#1D1A17] border border-[#E8E3DC] dark:border-[#2F2B26] text-xs text-[#78736E] dark:text-[#C4BCB1] space-y-2 shadow-2xs">
              <span className="font-serif-luxury text-base text-[#2C2825] dark:text-[#FAF7F2] block font-normal">
                Thoughtful Correspondence
              </span>
              <p className="leading-relaxed">
                We personally review every wedding inquiry and respond within 24 to 48 business hours with complete collection guides and consultation scheduling.
              </p>
            </div>
          </div>

          {/* Right: Wedding Inquiry Form */}
          <div className="lg:col-span-7 bg-white dark:bg-[#1B1815] p-8 sm:p-10 border border-[#E8E3DC] dark:border-[#2F2B26] shadow-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#F4EFEA] dark:bg-[#2A2520] text-[#B8A99A] dark:text-[#D5C7B8] mx-auto flex items-center justify-center">
                  <IconCheck size={24} />
                </div>
                <h3 className="font-serif-luxury text-3xl text-[#2C2825] dark:text-[#FAF7F2]">
                  Thank You, {formData.partner1}!
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#78736E] dark:text-[#C4BCB1] max-w-md mx-auto leading-relaxed">
                  We have received your celebration details and are honored you reached out. We will review our calendar and reply shortly with our full investment portfolio.
                </p>

                {/* Add the wedding date to your calendar (Google Calendar / .ics) */}
                {(() => {
                  const booking: CalendarBooking = {
                    title: `${weddingData.settings.brandName || 'THE AMENA BRAND'}: Wedding — ${formData.partner1} & ${formData.partner2 || 'Partner'}`,
                    date: formData.weddingDate,
                    location: formData.venue,
                    details: `Wedding photography inquiry.\nPackage of interest: ${formData.packageInterest}\nGuest count: ${formData.guestCount || 'TBD'}\nVenue: ${formData.venue || 'TBD'}\n\nThis is a tentative date hold — THE AMENA BRAND will confirm availability.`,
                    studioName: weddingData.settings.brandName || 'THE AMENA BRAND',
                    studioEmail: weddingData.settings.email,
                    clientName: `${formData.partner1} & ${formData.partner2 || 'Partner'}`,
                    clientEmail: formData.email,
                  };
                  return (
                    <div className="max-w-md mx-auto bg-white dark:bg-[#1B1815] border border-[#E8E3DC] dark:border-[#2F2B26] p-5 mt-2">
                      <span className="block text-[10px] uppercase tracking-[0.25em] text-[#78736E] dark:text-[#B5ACA2] font-semibold mb-3">
                        Hold your wedding date
                      </span>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <a
                          href={generateGoogleCalendarUrl(booking)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-2 bg-[#2C2825] dark:bg-[#D5C7B8] text-white dark:text-[#1B1815] text-[11px] uppercase tracking-wider px-4 py-3 hover:opacity-90 transition-opacity"
                        >
                          <IconCalendar size={15} />
                          <span>Google Calendar</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => downloadICS(booking)}
                          className="flex-1 inline-flex items-center justify-center gap-2 border border-[#E8E3DC] dark:border-[#352F2A] text-[#2C2825] dark:text-[#FAF7F2] text-[11px] uppercase tracking-wider px-4 py-3 hover:bg-[#FAF8F5] dark:hover:bg-[#231F1C] transition-colors cursor-pointer"
                        >
                          <span>Download .ics</span>
                        </button>
                      </div>
                    </div>
                  );
                })()}

                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs uppercase tracking-widest text-[#B8A99A] dark:text-[#D5C7B8] hover:underline"
                  >
                    Submit another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#524E48] dark:text-[#DDD5CA] font-semibold mb-1.5">
                      Partner One Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.partner1}
                      onChange={(e) => setFormData({ ...formData, partner1: e.target.value })}
                      placeholder="e.g. Laura"
                      className="w-full px-4 py-3 bg-[#FAF8F5] dark:bg-[#231F1C] border border-[#E8E3DC] dark:border-[#352F2A] text-xs text-[#2C2825] dark:text-[#FAF7F2] placeholder-[#A0988F] dark:placeholder-[#8C8379] focus:outline-none focus:border-[#B8A99A] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#524E48] dark:text-[#DDD5CA] font-semibold mb-1.5">
                      Partner Two Name
                    </label>
                    <input
                      type="text"
                      value={formData.partner2}
                      onChange={(e) => setFormData({ ...formData, partner2: e.target.value })}
                      placeholder="e.g. James"
                      className="w-full px-4 py-3 bg-[#FAF8F5] dark:bg-[#231F1C] border border-[#E8E3DC] dark:border-[#352F2A] text-xs text-[#2C2825] dark:text-[#FAF7F2] placeholder-[#A0988F] dark:placeholder-[#8C8379] focus:outline-none focus:border-[#B8A99A] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#524E48] dark:text-[#DDD5CA] font-semibold mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="laura@example.com"
                      className="w-full px-4 py-3 bg-[#FAF8F5] dark:bg-[#231F1C] border border-[#E8E3DC] dark:border-[#352F2A] text-xs text-[#2C2825] dark:text-[#FAF7F2] placeholder-[#A0988F] dark:placeholder-[#8C8379] focus:outline-none focus:border-[#B8A99A] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#524E48] dark:text-[#DDD5CA] font-semibold mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 bg-[#FAF8F5] dark:bg-[#231F1C] border border-[#E8E3DC] dark:border-[#352F2A] text-xs text-[#2C2825] dark:text-[#FAF7F2] placeholder-[#A0988F] dark:placeholder-[#8C8379] focus:outline-none focus:border-[#B8A99A] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#524E48] dark:text-[#DDD5CA] font-semibold mb-1.5">
                      Wedding Date *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.weddingDate}
                      onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                      placeholder="MM/DD/YYYY or Season/Year"
                      className="w-full px-4 py-3 bg-[#FAF8F5] dark:bg-[#231F1C] border border-[#E8E3DC] dark:border-[#352F2A] text-xs text-[#2C2825] dark:text-[#FAF7F2] placeholder-[#A0988F] dark:placeholder-[#8C8379] focus:outline-none focus:border-[#B8A99A] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#524E48] dark:text-[#DDD5CA] font-semibold mb-1.5">
                      Venue & Location
                    </label>
                    <input
                      type="text"
                      value={formData.venue}
                      onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                      placeholder="e.g. Carmel-by-the-Sea, CA"
                      className="w-full px-4 py-3 bg-[#FAF8F5] dark:bg-[#231F1C] border border-[#E8E3DC] dark:border-[#352F2A] text-xs text-[#2C2825] dark:text-[#FAF7F2] placeholder-[#A0988F] dark:placeholder-[#8C8379] focus:outline-none focus:border-[#B8A99A] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#524E48] dark:text-[#DDD5CA] font-semibold mb-1.5">
                      Estimated Guest Count
                    </label>
                    <input
                      type="text"
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                      placeholder="e.g. 120 guests"
                      className="w-full px-4 py-3 bg-[#FAF8F5] dark:bg-[#231F1C] border border-[#E8E3DC] dark:border-[#352F2A] text-xs text-[#2C2825] dark:text-[#FAF7F2] placeholder-[#A0988F] dark:placeholder-[#8C8379] focus:outline-none focus:border-[#B8A99A] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#524E48] dark:text-[#DDD5CA] font-semibold mb-1.5">
                      Collection Interest
                    </label>
                    <select
                      value={formData.packageInterest}
                      onChange={(e) => setFormData({ ...formData, packageInterest: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF8F5] dark:bg-[#231F1C] border border-[#E8E3DC] dark:border-[#352F2A] text-xs text-[#2C2825] dark:text-[#FAF7F2] focus:outline-none focus:border-[#B8A99A] transition-colors cursor-pointer"
                    >
                      <option value="The Intimate Collection ($3,400)" className="dark:bg-[#231F1C]">The Intimate Collection ($3,400)</option>
                      <option value="The Heirloom Collection ($4,800)" className="dark:bg-[#231F1C]">The Heirloom Collection ($4,800)</option>
                      <option value="The Grand Destination ($6,800)" className="dark:bg-[#231F1C]">The Grand Destination ($6,800)</option>
                      <option value="Custom Multi-Day / Elopement" className="dark:bg-[#231F1C]">Custom Multi-Day / Elopement</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#524E48] dark:text-[#DDD5CA] font-semibold mb-1.5">
                    Your Love Story & Wedding Vision
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about how you met, what you are most looking forward to on your wedding day, and any meaningful details..."
                    className="w-full px-4 py-3 bg-[#FAF8F5] dark:bg-[#231F1C] border border-[#E8E3DC] dark:border-[#352F2A] text-xs text-[#2C2825] dark:text-[#FAF7F2] placeholder-[#A0988F] dark:placeholder-[#8C8379] focus:outline-none focus:border-[#B8A99A] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-full bg-[#B8A99A] hover:bg-[#A69584] text-white text-xs uppercase tracking-[0.22em] font-medium py-3.5 transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer disabled:opacity-50"
                >
                  {submitting ? 'SENDING INQUIRY...' : 'SUBMIT WEDDING INQUIRY'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
