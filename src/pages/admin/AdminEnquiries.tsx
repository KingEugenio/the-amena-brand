import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IconWhatsApp, IconTrash, IconMail } from '../../components/icons/Icons';
import type { EnquiryStatus } from '../../types';

const STATUSES: EnquiryStatus[] = ['NEW', 'CONTACTED', 'IN PROGRESS', 'COMPLETED', 'ARCHIVED'];

const badgeClass = (status: EnquiryStatus): string => {
  switch (status) {
    case 'NEW':
      return 'bg-[#25D366] text-black font-bold';
    case 'CONTACTED':
    case 'IN PROGRESS':
      return 'bg-[#9A5B32] text-white';
    case 'COMPLETED':
      return 'bg-[#3E6B4F] text-white';
    default:
      return 'bg-[#2C2926] text-[#A69F91]';
  }
};

export const AdminEnquiries: React.FC = () => {
  const { data, updateEnquiryStatus, deleteEnquiry } = useApp();
  const { enquiries } = data;

  const [statusFilter, setStatusFilter] = useState<'all' | EnquiryStatus>('all');

  const filteredEnquiries = enquiries.filter((e) => statusFilter === 'all' || e.status === statusFilter);

  const handleReplyWhatsApp = (phone: string, name: string, subject: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const text = `Hello ${name}, this is THE AMENA BRAND following up regarding your atelier inquiry: "${subject}". How can we assist you today?`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2C2926] pb-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9A5B32] font-semibold block">
            CLIENT RELATIONS
          </span>
          <h1 className="font-serif-heading text-2xl sm:text-3xl text-[#FAF9F5]">
            Customer Inquiries &amp; Messages
          </h1>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {(['all', ...STATUSES] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`text-[11px] uppercase tracking-wider px-3 py-1.5 border transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#FAF9F5] text-[#121110] border-[#FAF9F5]'
                  : 'text-[#A69F91] border-[#3E3B36] hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredEnquiries.map((enq) => (
          <div
            key={enq.id}
            className={`p-6 bg-[#1C1A18] border transition-colors space-y-4 ${
              enq.status === 'NEW' ? 'border-[#25D366]/50 bg-[#1E221E]' : 'border-[#2C2926]'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2C2926] pb-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif-heading text-lg text-[#FAF9F5]">{enq.name}</h3>
                  <span className={`text-[9px] uppercase tracking-widest px-2 py-0.5 font-mono ${badgeClass(enq.status)}`}>
                    {enq.status}
                  </span>
                </div>
                <div className="text-xs text-[#A69F91] flex items-center gap-3 flex-wrap">
                  <span>{enq.email}</span>
                  {enq.phone && <span>• Phone: {enq.phone}</span>}
                  <span>• Received: {new Date(enq.date).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={enq.status}
                  onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as EnquiryStatus)}
                  className="bg-[#121110] border border-[#3E3B36] text-[11px] uppercase tracking-wider py-1 px-2.5 text-[#FAF9F5]"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      Mark {s}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => {
                    if (confirm('Delete this inquiry record?')) {
                      deleteEnquiry(enq.id);
                    }
                  }}
                  className="p-1.5 text-[#B93838] hover:text-red-400 cursor-pointer"
                  title="Delete record"
                >
                  <IconTrash size={15} />
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#9A5B32] font-semibold block">
                Subject: {enq.subject || 'Atelier Inquiry'}
              </span>
              <p className="text-xs sm:text-sm text-[#D4CEBF] font-serif-heading italic leading-relaxed whitespace-pre-line">
                "{enq.message}"
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3 flex-wrap">
              {enq.phone && (
                <button
                  onClick={() => handleReplyWhatsApp(enq.phone!, enq.name, enq.subject || 'Enquiry')}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#25D366] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#20bd5a] transition-colors cursor-pointer"
                >
                  <IconWhatsApp size={15} />
                  <span>Reply on WhatsApp</span>
                </button>
              )}
              <a
                href={`mailto:${enq.email}?subject=${encodeURIComponent(`THE AMENA BRAND Atelier: ${enq.subject || 'Your Enquiry'}`)}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#262421] text-[#FAF9F5] border border-[#3E3B36] text-xs uppercase tracking-wider hover:bg-[#322F2B]"
              >
                <IconMail size={14} />
                <span>Reply by Email</span>
              </a>
            </div>
          </div>
        ))}

        {filteredEnquiries.length === 0 && (
          <div className="p-12 text-center bg-[#1C1A18] border border-[#2C2926] text-xs text-[#A69F91]">
            No client enquiries found in this view.
          </div>
        )}
      </div>
    </div>
  );
};
