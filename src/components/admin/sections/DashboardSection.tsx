import React, { useEffect, useState } from 'react';
import { Inbox, Sparkles, CalendarCheck, ExternalLink, Camera, Palette } from 'lucide-react';
import { fetchBookings } from '../../../lib/tenantStore';
import type { StoredInquiry } from '../../../lib/adminStore';
import { useSiteConfig } from '../../../context/SiteConfigContext';

export const DashboardSection: React.FC<{ onGoInquiries: () => void }> = ({ onGoInquiries }) => {
  const { settings, navigateTo } = useSiteConfig();
  const [inquiries, setInquiries] = useState<StoredInquiry[]>([]);

  useEffect(() => {
    fetchBookings().then(setInquiries);
  }, []);

  const now = new Date();
  const thisMonth = inquiries.filter((i) => {
    const d = new Date(i.createdAt);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  }).length;

  const stats = [
    { label: 'Total inquiries', value: inquiries.length, icon: Inbox },
    { label: 'New / unread', value: inquiries.filter((i) => i.status === 'new').length, icon: Sparkles },
    { label: 'Booked', value: inquiries.filter((i) => i.status === 'booked').length, icon: CalendarCheck },
    { label: 'This month', value: thisMonth, icon: CalendarCheck },
  ];

  const designCount = inquiries.filter((i) => i.categoryType === 'graphic-design').length;
  const photoCount = inquiries.length - designCount;
  const recent = inquiries.slice(0, 4);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-editorial text-[var(--text-main)]">
            Welcome back, {settings.fullName.split(' ')[0]}
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Overview of {settings.photographerName} &amp; {settings.designBrandName}.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider border border-[var(--border-line)] px-3 py-2 text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer w-fit"
        >
          <ExternalLink size={13} /> View live site
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-[var(--card-bg)] border border-[var(--border-line)] p-4">
            <s.icon size={16} className="text-[var(--primary-accent)] mb-3" />
            <p className="text-3xl font-editorial text-[var(--text-main)] leading-none">{s.value}</p>
            <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] mt-2">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent inquiries */}
        <div className="lg:col-span-2 bg-[var(--card-bg)] border border-[var(--border-line)] p-5 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--primary-accent)]">
              Recent inquiries
            </h2>
            <button
              type="button"
              onClick={onGoInquiries}
              className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer"
            >
              View all →
            </button>
          </div>

          {recent.length === 0 ? (
            <p className="text-xs text-[var(--text-muted)] py-6 text-center">
              No inquiries yet. Leads from the booking form will appear here.
            </p>
          ) : (
            <ul className="divide-y divide-[var(--border-line)]">
              {recent.map((i) => (
                <li key={i.id} className="py-3 flex items-center gap-3">
                  <span className="text-[var(--primary-accent)]">
                    {i.categoryType === 'graphic-design' ? <Palette size={14} /> : <Camera size={14} />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-[var(--text-main)] truncate">{i.fullName || 'Unnamed'}</p>
                    <p className="text-[11px] text-[var(--text-muted)] truncate">{i.service}</p>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] shrink-0">
                    {new Date(i.createdAt).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Split + quick facts */}
        <div className="space-y-6">
          <div className="bg-[var(--card-bg)] border border-[var(--border-line)] p-5 sm:p-6">
            <h2 className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--primary-accent)] mb-4">
              By discipline
            </h2>
            <div className="space-y-3">
              <SplitBar label="Photography" value={photoCount} total={inquiries.length} icon={Camera} />
              <SplitBar label="Graphic design" value={designCount} total={inquiries.length} icon={Palette} />
            </div>
          </div>

          <div className="bg-[var(--card-bg)] border border-[var(--border-line)] p-5 sm:p-6">
            <h2 className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--primary-accent)] mb-4">
              Studio
            </h2>
            <dl className="space-y-2 text-xs">
              <Row label="Availability" value={settings.availabilityStatus} />
              <Row label="Location" value={settings.location} />
              <Row label="WhatsApp" value={settings.whatsappNumber} />
              <Row label="Email" value={settings.email || '—'} />
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

const SplitBar: React.FC<{ label: string; value: number; total: number; icon: React.ElementType }> = ({
  label,
  value,
  total,
  icon: Icon,
}) => {
  const pct = total ? Math.round((value / total) * 100) : 0;
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1.5">
        <span className="flex items-center gap-1.5 text-[var(--text-main)]">
          <Icon size={13} className="text-[var(--text-muted)]" /> {label}
        </span>
        <span className="font-mono text-[var(--text-muted)]">{value}</span>
      </div>
      <div className="h-1.5 bg-[var(--bg-surface)] border border-[var(--border-line)] overflow-hidden">
        <div className="h-full bg-[var(--primary-accent)]" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

const Row: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-start justify-between gap-3">
    <dt className="text-[var(--text-muted)] font-mono uppercase tracking-wider text-[10px] pt-0.5">{label}</dt>
    <dd className="text-[var(--text-main)] text-right break-words">{value}</dd>
  </div>
);
