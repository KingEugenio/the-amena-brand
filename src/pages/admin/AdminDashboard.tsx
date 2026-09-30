import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  IconWhatsApp,
  IconArrowRight,
  IconCheck,
  IconClock,
  IconSearch,
  IconPlus
} from '../../components/icons/Icons';

interface AdminDashboardProps {
  onNavigateTab: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateTab }) => {
  const { data, updateEnquiryStatus, adminToken } = useApp();
  const { products, collections, journal, faqs, enquiries, settings } = data;

  const [analytics, setAnalytics] = useState<{ totalEvents: number; recentEvents: any[] }>({
    totalEvents: 0,
    recentEvents: []
  });

  useEffect(() => {
    if (!adminToken) return;
    fetch('/api/admin/analytics', { headers: { 'x-admin-token': adminToken } })
      .then((res) => res.json())
      .then((d) => setAnalytics(d))
      .catch(() => {});
  }, [adminToken]);

  const pendingEnquiries = enquiries.filter((e) => e.status === 'NEW');
  const recentEnquiries = enquiries.slice(0, 5);

  const handleReplyWhatsApp = (phone: string, name: string, subject: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const text = `Hello ${name}, this is THE AMENA BRAND following up regarding your enquiry: "${subject}".`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-10">
      {/* Top Welcome & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2C2926] pb-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9A5B32] font-semibold block">
            STUDIO OVERVIEW
          </span>
          <h1 className="font-serif-heading text-2xl sm:text-3xl text-[#FAF9F5]">
            Welcome, Studio Director
          </h1>
          <p className="text-xs text-[#A69F91] mt-1">
            Storefront WhatsApp: <strong className="text-white">{settings.whatsappNumber}</strong> • Instagram: <strong className="text-white">{settings.instagramHandle}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('products')}
            className="inline-flex items-center gap-2 px-3 py-2 bg-[#FAF9F5] text-[#121110] text-xs uppercase tracking-wider font-medium hover:bg-[#E5E1D8] transition-colors cursor-pointer"
          >
            <IconPlus size={14} />
            <span>Add Product</span>
          </button>
          <button
            onClick={() => onNavigateTab('journal')}
            className="inline-flex items-center gap-2 px-3 py-2 bg-[#262421] text-[#FAF9F5] border border-[#3E3B36] text-xs uppercase tracking-wider font-medium hover:bg-[#322F2B] transition-colors cursor-pointer"
          >
            <IconPlus size={14} />
            <span>New Dispatch</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigateTab('products')}
          className="p-5 bg-[#1C1A18] border border-[#2C2926] hover:border-[#3E3B36] cursor-pointer transition-colors space-y-1"
        >
          <span className="text-[10px] uppercase tracking-wider text-[#A69F91] block">Total Pieces</span>
          <div className="font-serif-heading text-3xl text-[#FAF9F5]">{products.length}</div>
          <span className="text-[10px] text-[#25D366] block">
            {products.filter((p) => p.availability === 'In Stock').length} In Stock • {products.filter((p) => p.availability === 'Made to Order').length} Made to Order
          </span>
        </div>

        <div
          onClick={() => onNavigateTab('collections')}
          className="p-5 bg-[#1C1A18] border border-[#2C2926] hover:border-[#3E3B36] cursor-pointer transition-colors space-y-1"
        >
          <span className="text-[10px] uppercase tracking-wider text-[#A69F91] block">Collections</span>
          <div className="font-serif-heading text-3xl text-[#FAF9F5]">{collections.length}</div>
          <span className="text-[10px] text-[#A69F91] block">Active releases & lookbooks</span>
        </div>

        <div
          onClick={() => onNavigateTab('enquiries')}
          className="p-5 bg-[#1C1A18] border border-[#2C2926] hover:border-[#3E3B36] cursor-pointer transition-colors space-y-1"
        >
          <span className="text-[10px] uppercase tracking-wider text-[#A69F91] block">Pending Enquiries</span>
          <div className="font-serif-heading text-3xl text-[#FAF9F5] flex items-center gap-2">
            <span>{pendingEnquiries.length}</span>
            {pendingEnquiries.length > 0 && (
              <span className="text-xs bg-[#25D366] text-black px-2 py-0.5 rounded-full font-mono font-bold">
                Action Required
              </span>
            )}
          </div>
          <span className="text-[10px] text-[#A69F91] block">{enquiries.length} total client submissions</span>
        </div>

        <div className="p-5 bg-[#1C1A18] border border-[#2C2926] space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-[#A69F91] block">Storefront Activity</span>
          <div className="font-serif-heading text-3xl text-[#FAF9F5]">{analytics.totalEvents}</div>
          <span className="text-[10px] text-[#A69F91] block">Product & WhatsApp interactions</span>
        </div>
      </div>

      {/* Two Column Layout: Recent Inquiries Left, Quick Management Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Recent Customer Enquiries */}
        <div className="lg:col-span-7 bg-[#1C1A18] border border-[#2C2926] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#2C2926] pb-3">
            <h3 className="font-serif-heading text-lg text-[#FAF9F5]">
              Recent Client Enquiries
            </h3>
            <button
              onClick={() => onNavigateTab('enquiries')}
              className="text-xs text-[#9A5B32] hover:underline uppercase tracking-wider cursor-pointer"
            >
              View All ({enquiries.length})
            </button>
          </div>

          {recentEnquiries.length > 0 ? (
            <div className="divide-y divide-[#2C2926]">
              {recentEnquiries.map((enq) => (
                <div key={enq.id} className="py-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-medium text-[#FAF9F5]">{enq.name}</span>
                      <span className="text-xs text-[#A69F91] ml-2">({enq.email})</span>
                    </div>
                    <span
                      className={`text-[9px] uppercase tracking-wider px-2 py-0.5 ${
                        enq.status === 'NEW'
                          ? 'bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40'
                          : 'bg-[#2C2926] text-[#A69F91]'
                      }`}
                    >
                      {enq.status}
                    </span>
                  </div>

                  <p className="text-xs text-[#D4CEBF] font-serif-heading italic line-clamp-1">
                    "{enq.message}"
                  </p>

                  <div className="flex items-center justify-between pt-1 text-[11px] text-[#A69F91]">
                    <span>{enq.subject || 'Garment Inquiry'}</span>
                    <div className="flex items-center gap-3">
                      {enq.phone && (
                        <button
                          onClick={() => handleReplyWhatsApp(enq.phone!, enq.name, enq.subject || 'Enquiry')}
                          className="text-[#25D366] hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                          <IconWhatsApp size={13} />
                          <span>Reply WhatsApp</span>
                        </button>
                      )}
                      {enq.status === 'NEW' && (
                        <button
                          onClick={() => updateEnquiryStatus(enq.id, 'CONTACTED')}
                          className="hover:text-white cursor-pointer"
                        >
                          Mark Contacted
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-[#A69F91]">
              No customer inquiries submitted yet.
            </div>
          )}
        </div>

        {/* Right: Quick Settings & Direct Control */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Actions Panel */}
          <div className="bg-[#1C1A18] border border-[#2C2926] p-6 space-y-4">
            <h3 className="font-serif-heading text-lg text-[#FAF9F5] border-b border-[#2C2926] pb-3">
              Fast Management Shortcuts
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => onNavigateTab('homepage')}
                className="w-full text-left p-3 bg-[#24221F] hover:bg-[#2C2926] border border-[#3E3B36] text-xs uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>Edit Hero Headline & Statements</span>
                <IconArrowRight size={14} className="text-[#A69F91]" />
              </button>
              <button
                onClick={() => onNavigateTab('settings')}
                className="w-full text-left p-3 bg-[#24221F] hover:bg-[#2C2926] border border-[#3E3B36] text-xs uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>Configure WhatsApp / Announcement Bar</span>
                <IconArrowRight size={14} className="text-[#A69F91]" />
              </button>
              <button
                onClick={() => onNavigateTab('about')}
                className="w-full text-left p-3 bg-[#24221F] hover:bg-[#2C2926] border border-[#3E3B36] text-xs uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>Edit Studio Story & Values</span>
                <IconArrowRight size={14} className="text-[#A69F91]" />
              </button>
              <button
                onClick={() => onNavigateTab('faqs')}
                className="w-full text-left p-3 bg-[#24221F] hover:bg-[#2C2926] border border-[#3E3B36] text-xs uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>Update Client FAQ Answers</span>
                <IconArrowRight size={14} className="text-[#A69F91]" />
              </button>
            </div>
          </div>

          {/* WhatsApp Verification Card */}
          <div className="bg-[#1C1A18] border border-[#2C2926] p-6 space-y-3">
            <div className="flex items-center gap-2">
              <IconWhatsApp size={18} className="text-[#25D366]" />
              <h4 className="font-serif-heading text-base text-[#FAF9F5]">WhatsApp Line Verification</h4>
            </div>
            <p className="text-xs text-[#A69F91] leading-relaxed">
              Current store number: <span className="text-[#FAF9F5] font-mono">0579499223</span>. All customer product clicks route directly to this Ghanaian WhatsApp account.
            </p>
            <div className="pt-1">
              <a
                href="https://wa.me/233579499223"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#25D366] hover:underline inline-flex items-center gap-1.5"
              >
                <span>Test Live Link to 0579499223</span>
                <IconArrowRight size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
