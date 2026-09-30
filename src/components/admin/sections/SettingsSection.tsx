import React, { useState } from 'react';
import { Save, RotateCcw, Check } from 'lucide-react';
import { useSiteConfig } from '../../../context/SiteConfigContext';
import type { SiteSettings } from '../../../types';

type FieldDef = {
  key: keyof SiteSettings;
  label: string;
  type?: 'text' | 'textarea' | 'url';
  hint?: string;
};

const GROUPS: { title: string; fields: FieldDef[] }[] = [
  {
    title: 'Identity',
    fields: [
      { key: 'photographerName', label: 'Photography brand name' },
      { key: 'designBrandName', label: 'Design brand name' },
      { key: 'fullName', label: 'Full name' },
      { key: 'tagline', label: 'Tagline' },
    ],
  },
  {
    title: 'Contact',
    fields: [
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'whatsappNumber', label: 'WhatsApp number', hint: 'Include country code, e.g. +233544795536' },
      { key: 'whatsappDefaultMessage', label: 'WhatsApp default message', type: 'textarea' },
      { key: 'location', label: 'Location' },
      { key: 'serviceArea', label: 'Service area' },
      { key: 'availabilityStatus', label: 'Availability status' },
      { key: 'currencySymbol', label: 'Currency symbol' },
    ],
  },
  {
    title: 'Social links',
    fields: [
      { key: 'instagramHandle', label: 'Instagram handle' },
      { key: 'instagramUrl', label: 'Instagram URL', type: 'url' },
      { key: 'designInstagramHandle', label: 'Design Instagram handle' },
      { key: 'designInstagramUrl', label: 'Design Instagram URL', type: 'url' },
      { key: 'weddingInstagramHandle', label: 'Wedding Instagram handle' },
      { key: 'weddingInstagramUrl', label: 'Wedding Instagram URL', type: 'url' },
      { key: 'behanceUrl', label: 'Behance URL', type: 'url' },
      { key: 'facebookUrl', label: 'Facebook URL', type: 'url' },
      { key: 'tiktokUrl', label: 'TikTok URL', type: 'url' },
    ],
  },
];

export const SettingsSection: React.FC = () => {
  const { settings, updateSettings, resetSettings } = useSiteConfig();
  const [draft, setDraft] = useState<SiteSettings>(settings);
  const [saved, setSaved] = useState(false);

  const dirty = JSON.stringify(draft) !== JSON.stringify(settings);

  const setField = (key: keyof SiteSettings, value: string) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setSaved(false);
  };

  const save = () => {
    updateSettings(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const reset = () => {
    if (!confirm('Reset all site settings to their original defaults?')) return;
    resetSettings();
    setTimeout(() => setDraft((prev) => ({ ...prev })), 0);
    // Pull fresh defaults on next render via a page reload-free approach:
    window.location.reload();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-editorial text-[var(--text-main)]">Site Settings</h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Edit the details shown across the website — brand names, contact info and social links.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider border border-[var(--border-line)] px-3 py-2 text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer"
          >
            <RotateCcw size={13} /> Reset
          </button>
          <button
            type="button"
            onClick={save}
            disabled={!dirty}
            className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider bg-[var(--text-main)] text-[var(--bg-base)] px-4 py-2 hover:opacity-90 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {saved ? <Check size={13} /> : <Save size={13} />}
            {saved ? 'Saved' : 'Save changes'}
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {GROUPS.map((group) => (
          <div key={group.title} className="bg-[var(--card-bg)] border border-[var(--border-line)] p-5 sm:p-6">
            <h2 className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--primary-accent)] mb-5">
              {group.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              {group.fields.map((f) => {
                const value = (draft[f.key] as string) ?? '';
                const isTextarea = f.type === 'textarea';
                return (
                  <div key={String(f.key)} className={isTextarea ? 'sm:col-span-2' : ''}>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                      {f.label}
                    </label>
                    {isTextarea ? (
                      <textarea
                        value={value}
                        onChange={(e) => setField(f.key, e.target.value)}
                        rows={2}
                        className="w-full bg-[var(--input-bg)] border border-[var(--border-line)] px-3 py-2 text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--primary-accent)] resize-y"
                      />
                    ) : (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => setField(f.key, e.target.value)}
                        className="w-full bg-[var(--input-bg)] border border-[var(--border-line)] px-3 py-2 text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--primary-accent)]"
                      />
                    )}
                    {f.hint && <p className="text-[10px] text-[var(--text-muted)] mt-1 font-mono">{f.hint}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
