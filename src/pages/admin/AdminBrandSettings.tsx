import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/common/Buttons';
import { IconWhatsApp, IconInstagram } from '../../components/icons/Icons';

export const AdminBrandSettings: React.FC = () => {
  const { data, updateSettings, showToast } = useApp();
  const [settingsState, setSettingsState] = useState(data.settings);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await updateSettings(settingsState);
    setSaving(false);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="border-b border-[#2C2926] pb-6">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#9A5B32] font-semibold block">
          COMMUNICATION & CHANNELS
        </span>
        <h1 className="font-serif-heading text-2xl sm:text-3xl text-[#FAF9F5]">
          Brand & WhatsApp Settings
        </h1>
        <p className="text-xs text-[#A69F91] mt-1">
          Configure real WhatsApp lines, Instagram handles, announcement banner, and global store metadata.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Core Identity */}
        <div className="bg-[#1C1A18] border border-[#2C2926] p-6 space-y-4">
          <h3 className="font-serif-heading text-lg text-[#FAF9F5] border-b border-[#2C2926] pb-2">
            Brand Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">
                Brand Name *
              </label>
              <input
                type="text"
                required
                value={settingsState.brandName}
                onChange={(e) => setSettingsState({ ...settingsState, brandName: e.target.value })}
                className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">
                Default Currency
              </label>
              <input
                type="text"
                value={settingsState.currency}
                onChange={(e) => setSettingsState({ ...settingsState, currency: e.target.value })}
                className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">
              Short Description / Meta Tag
            </label>
            <textarea
              rows={2}
              value={settingsState.description}
              onChange={(e) => setSettingsState({ ...settingsState, description: e.target.value })}
              className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
            />
          </div>
        </div>

        {/* WhatsApp & Social Channels */}
        <div className="bg-[#1C1A18] border border-[#2C2926] p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-[#2C2926] pb-2">
            <IconWhatsApp size={18} className="text-[#25D366]" />
            <h3 className="font-serif-heading text-lg text-[#FAF9F5]">
              Direct Contact & Social Media
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">
                WhatsApp Phone Number *
              </label>
              <input
                type="text"
                required
                value={settingsState.whatsappNumber}
                onChange={(e) => setSettingsState({ ...settingsState, whatsappNumber: e.target.value })}
                className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white font-mono"
              />
              <span className="text-[10px] text-[#A69F91] mt-1 block">
                Official Ghanaian line: 0579499223 (will auto-format to +233579499223)
              </span>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">
                Studio Contact Email
              </label>
              <input
                type="email"
                value={settingsState.contactEmail}
                onChange={(e) => setSettingsState({ ...settingsState, contactEmail: e.target.value })}
                className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">
                Instagram Handle
              </label>
              <input
                type="text"
                value={settingsState.instagramHandle}
                onChange={(e) => setSettingsState({ ...settingsState, instagramHandle: e.target.value })}
                className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">
                Instagram URL
              </label>
              <input
                type="url"
                value={settingsState.instagramUrl}
                onChange={(e) => setSettingsState({ ...settingsState, instagramUrl: e.target.value })}
                className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* Announcement Bar & Page Toggles */}
        <div className="bg-[#1C1A18] border border-[#2C2926] p-6 space-y-4">
          <h3 className="font-serif-heading text-lg text-[#FAF9F5] border-b border-[#2C2926] pb-2">
            Storefront Announcement Bar
          </h3>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="enableAnnouncementBar"
              checked={settingsState.enableAnnouncementBar}
              onChange={(e) => setSettingsState({ ...settingsState, enableAnnouncementBar: e.target.checked })}
              className="accent-[#FAF9F5] h-4 w-4"
            />
            <label htmlFor="enableAnnouncementBar" className="text-xs uppercase tracking-wider text-[#D4CEBF] cursor-pointer">
              Display Announcement Banner at Top of Site
            </label>
          </div>

          {settingsState.enableAnnouncementBar && (
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">
                Announcement Message
              </label>
              <input
                type="text"
                value={settingsState.announcementBarText || ''}
                onChange={(e) => setSettingsState({ ...settingsState, announcementBarText: e.target.value })}
                placeholder="e.g. COMPLIMENTARY COURIER DELIVERY ACROSS GHANA ON ALL MADE-TO-ORDER PIECES"
                className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
              />
            </div>
          )}

          <div className="pt-2 border-t border-[#2C2926]">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="showServicesPage"
                checked={settingsState.showServicesPage}
                onChange={(e) => setSettingsState({ ...settingsState, showServicesPage: e.target.checked })}
                className="accent-[#FAF9F5] h-4 w-4"
              />
              <label htmlFor="showServicesPage" className="text-xs uppercase tracking-wider text-[#D4CEBF] cursor-pointer">
                Enable Bespoke Services Page in Main Navigation
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" size="md" isLoading={saving} className="bg-[#FAF9F5] text-[#121110]">
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
};
