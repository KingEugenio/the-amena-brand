import React, { useMemo, useState } from 'react';
import {
  Inbox,
  Trash2,
  Download,
  ExternalLink,
  Mail,
  ChevronDown,
  Camera,
  Palette,
  RefreshCw,
} from 'lucide-react';
import {
  inquiriesToCSV,
  type StoredInquiry,
  type InquiryStatus,
} from '../../../lib/adminStore';
import { fetchBookings, updateBookingStatus, removeBooking } from '../../../lib/tenantStore';
import { useSiteConfig } from '../../../context/SiteConfigContext';
import { WhatsAppIcon } from '../../common/WhatsAppIcon';

const STATUS_META: Record<InquiryStatus, { label: string; className: string }> = {
  new: { label: 'New', className: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30' },
  contacted: { label: 'Contacted', className: 'bg-amber-500/15 text-amber-500 border-amber-500/30' },
  booked: { label: 'Booked', className: 'bg-sky-500/15 text-sky-500 border-sky-500/30' },
  archived: { label: 'Archived', className: 'bg-neutral-500/15 text-neutral-400 border-neutral-500/30' },
};

const FILTERS: { key: InquiryStatus | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'new', label: 'New' },
  { key: 'contacted', label: 'Contacted' },
  { key: 'booked', label: 'Booked' },
  { key: 'archived', label: 'Archived' },
];

export const InquiriesSection: React.FC = () => {
  const [items, setItems] = useState<StoredInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<InquiryStatus | 'all'>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const refresh = async () => {
    setLoading(true);
    setItems(await fetchBookings());
    setLoading(false);
  };

  React.useEffect(() => {
    refresh();
  }, []);

  const filtered = useMemo(
    () => (filter === 'all' ? items : items.filter((i) => i.status === filter)),
    [items, filter],
  );

  const changeStatus = async (id: string, status: InquiryStatus) => {
    // Optimistic update so the UI feels instant, then sync in the background.
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    await updateBookingStatus(id, status);
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this inquiry permanently?')) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
    await removeBooking(id);
  };

  const exportCSV = () => {
    const csv = inquiriesToCSV(items);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `freddieshotit-inquiries-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <SectionHead
        title="Inquiries"
        subtitle="Booking & commission leads captured from the website contact form."
        right={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={refresh}
              className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider border border-[var(--border-line)] px-3 py-2 text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer"
            >
              <RefreshCw size={13} /> Refresh
            </button>
            <button
              type="button"
              onClick={exportCSV}
              disabled={items.length === 0}
              className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider border border-[var(--border-line)] px-3 py-2 text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer disabled:opacity-40"
            >
              <Download size={13} /> Export CSV
            </button>
          </div>
        }
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTERS.map((f) => {
          const count = f.key === 'all' ? items.length : items.filter((i) => i.status === f.key).length;
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={`text-[11px] font-mono uppercase tracking-wider px-3 py-1.5 border cursor-pointer transition-colors ${
                active
                  ? 'bg-[var(--text-main)] text-[var(--bg-base)] border-[var(--text-main)]'
                  : 'border-[var(--border-line)] text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              {f.label} ({count})
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="bg-[var(--card-bg)] border border-dashed border-[var(--border-line)] p-10 text-center">
          <p className="text-xs text-[var(--text-muted)]">Loading inquiries…</p>
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState hasAny={items.length > 0} />
      ) : (
        <div className="space-y-3">
          {filtered.map((i) => (
            <InquiryCard
              key={i.id}
              inquiry={i}
              expanded={expanded === i.id}
              onToggle={() => setExpanded(expanded === i.id ? null : i.id)}
              onStatus={(s) => changeStatus(i.id, s)}
              onDelete={() => remove(i.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const InquiryCard: React.FC<{
  inquiry: StoredInquiry;
  expanded: boolean;
  onToggle: () => void;
  onStatus: (s: InquiryStatus) => void;
  onDelete: () => void;
}> = ({ inquiry, expanded, onToggle, onStatus, onDelete }) => {
  const isDesign = inquiry.categoryType === 'graphic-design';
  const meta = STATUS_META[inquiry.status];
  const waNumber = (inquiry.whatsapp || inquiry.phone || '').replace(/[^0-9]/g, '');

  const waHref = waNumber
    ? `https://wa.me/${waNumber.startsWith('0') ? '233' + waNumber.slice(1) : waNumber}?text=${encodeURIComponent(
        `Hello ${inquiry.fullName}, thank you for your inquiry with FREDDIESHOTIT about ${inquiry.service}.`,
      )}`
    : undefined;

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border-line)]">
      {/* Header row */}
      <div className="flex items-start gap-3 p-4">
        <div
          className="mt-0.5 shrink-0 w-8 h-8 flex items-center justify-center border border-[var(--border-line)] text-[var(--primary-accent)]"
          title={isDesign ? 'Graphic design' : 'Photography'}
        >
          {isDesign ? <Palette size={15} /> : <Camera size={15} />}
        </div>

        <button type="button" onClick={onToggle} className="flex-1 text-left cursor-pointer min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-[var(--text-main)] truncate">
              {inquiry.fullName || 'Unnamed inquiry'}
            </span>
            <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border ${meta.className}`}>
              {meta.label}
            </span>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1 truncate">
            {inquiry.service}
            {inquiry.eventDate ? ` • ${inquiry.eventDate}` : ''}
            {inquiry.location ? ` • ${inquiry.location}` : ''}
          </p>
          <p className="text-[10px] text-[var(--text-muted)] font-mono mt-1">
            {new Date(inquiry.createdAt).toLocaleString()}
          </p>
        </button>

        <ChevronDown
          size={18}
          onClick={onToggle}
          className={`shrink-0 mt-1 text-[var(--text-muted)] cursor-pointer transition-transform ${
            expanded ? 'rotate-180' : ''
          }`}
        />
      </div>

      {/* Expanded body */}
      {expanded && (
        <div className="border-t border-[var(--border-line)] p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-xs">
            <Field label="Email" value={inquiry.email} />
            <Field label="Phone" value={inquiry.phone} />
            <Field label="WhatsApp" value={inquiry.whatsapp} />
            <Field label="Budget" value={inquiry.budgetRange} />
            {isDesign && <Field label="Brand / Project" value={inquiry.brandOrProjectName} />}
            {isDesign && (
              <Field label="Deliverables" value={(inquiry.deliverablesNeeded || []).join(', ')} />
            )}
            <Field label="Referral source" value={inquiry.referralSource} />
          </div>

          {inquiry.projectDescription && (
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">
                Project description
              </p>
              <p className="text-xs text-[var(--text-main)] leading-relaxed whitespace-pre-wrap">
                {inquiry.projectDescription}
              </p>
            </div>
          )}
          {inquiry.additionalInfo && (
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">
                Additional info
              </p>
              <p className="text-xs text-[var(--text-main)] leading-relaxed whitespace-pre-wrap">
                {inquiry.additionalInfo}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[var(--border-line)]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] mr-1">
              Set status:
            </span>
            {(Object.keys(STATUS_META) as InquiryStatus[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onStatus(s)}
                className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 border cursor-pointer ${
                  inquiry.status === s
                    ? STATUS_META[s].className
                    : 'border-[var(--border-line)] text-[var(--text-muted)] hover:text-[var(--text-main)]'
                }`}
              >
                {STATUS_META[s].label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {waHref && (
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider border border-[var(--border-line)] px-3 py-2 text-emerald-500 hover:bg-[var(--bg-surface)] cursor-pointer"
              >
                <WhatsAppIcon size={13} className="fill-[#25D366] text-[#25D366]" /> WhatsApp
              </a>
            )}
            {inquiry.email && (
              <a
                href={`mailto:${inquiry.email}?subject=${encodeURIComponent(
                  `Your ${inquiry.service} inquiry — FREDDIESHOTIT`,
                )}`}
                className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider border border-[var(--border-line)] px-3 py-2 text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer"
              >
                <Mail size={13} /> Email
              </a>
            )}
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider border border-[var(--border-line)] px-3 py-2 text-rose-500 hover:bg-rose-500/10 cursor-pointer ml-auto"
            >
              <Trash2 size={13} /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Field: React.FC<{ label: string; value?: string }> = ({ label, value }) =>
  value ? (
    <div>
      <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">{label}</p>
      <p className="text-[var(--text-main)] break-words">{value}</p>
    </div>
  ) : null;

const EmptyState: React.FC<{ hasAny: boolean }> = ({ hasAny }) => {
  const { navigateTo } = useSiteConfig();
  return (
    <div className="bg-[var(--card-bg)] border border-dashed border-[var(--border-line)] p-10 text-center">
      <Inbox size={28} className="mx-auto text-[var(--text-muted)] mb-3" />
      <p className="text-sm text-[var(--text-main)] font-medium">
        {hasAny ? 'No inquiries in this filter.' : 'No inquiries yet.'}
      </p>
      <p className="text-xs text-[var(--text-muted)] mt-2 max-w-md mx-auto leading-relaxed">
        New leads from the website booking form land here. Submit a test inquiry to see the loop working.
      </p>
      {!hasAny && (
        <button
          type="button"
          onClick={() => navigateTo('book')}
          className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider border border-[var(--border-line)] px-4 py-2 text-[var(--text-main)] hover:bg-[var(--bg-surface)] cursor-pointer"
        >
          <ExternalLink size={13} /> Open booking form
        </button>
      )}
    </div>
  );
};

const SectionHead: React.FC<{ title: string; subtitle: string; right?: React.ReactNode }> = ({
  title,
  subtitle,
  right,
}) => (
  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
    <div>
      <h1 className="text-2xl sm:text-3xl font-editorial text-[var(--text-main)]">{title}</h1>
      <p className="text-xs text-[var(--text-muted)] mt-1">{subtitle}</p>
    </div>
    {right}
  </div>
);
