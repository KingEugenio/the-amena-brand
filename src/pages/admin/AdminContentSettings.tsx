import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/common/Buttons';

interface AdminContentSettingsProps {
  section: 'homepage' | 'about';
}

export const AdminContentSettings: React.FC<AdminContentSettingsProps> = ({ section }) => {
  const { data, updateHomepageContent, updateAboutContent, showToast } = useApp();
  const isHomepage = section === 'homepage';

  const [homepageState, setHomepageState] = useState(data.homepage);
  const [aboutState, setAboutState] = useState(data.about);
  const [saving, setSaving] = useState(false);

  const handleSaveHomepage = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await updateHomepageContent(homepageState);
    setSaving(false);
  };

  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await updateAboutContent(aboutState);
    setSaving(false);
  };

  if (isHomepage) {
    return (
      <div className="space-y-8 max-w-4xl">
        <div className="border-b border-[#2C2926] pb-6">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#9A5B32] font-semibold block">
            EDITORIAL EDITING
          </span>
          <h1 className="font-serif-heading text-2xl sm:text-3xl text-[#FAF9F5]">
            Homepage Content & Headlines
          </h1>
          <p className="text-xs text-[#A69F91] mt-1">
            Update hero typography, positioning statement, and narrative chapters.
          </p>
        </div>

        <form onSubmit={handleSaveHomepage} className="space-y-6">
          <div className="bg-[#1C1A18] border border-[#2C2926] p-6 space-y-4">
            <h3 className="font-serif-heading text-lg text-[#FAF9F5] border-b border-[#2C2926] pb-2">
              Hero Section
            </h3>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">
                Hero Headline (Large Display Text)
              </label>
              <input
                type="text"
                value={homepageState.heroHeadline}
                onChange={(e) => setHomepageState({ ...homepageState, heroHeadline: e.target.value })}
                className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">
                Hero Subheadline (Italic Serif)
              </label>
              <input
                type="text"
                value={homepageState.heroSubheadline}
                onChange={(e) => setHomepageState({ ...homepageState, heroSubheadline: e.target.value })}
                className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">
                Hero Supporting Paragraph
              </label>
              <textarea
                rows={2}
                value={homepageState.heroSupportingText}
                onChange={(e) => setHomepageState({ ...homepageState, heroSupportingText: e.target.value })}
                className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">
                Hero Photography Image URL
              </label>
              <input
                type="url"
                value={homepageState.heroImageUrl}
                onChange={(e) => setHomepageState({ ...homepageState, heroImageUrl: e.target.value })}
                className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
              />
            </div>
          </div>

          <div className="bg-[#1C1A18] border border-[#2C2926] p-6 space-y-4">
            <h3 className="font-serif-heading text-lg text-[#FAF9F5] border-b border-[#2C2926] pb-2">
              Brand Positioning Statement
            </h3>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">
                Statement Text
              </label>
              <textarea
                rows={3}
                value={homepageState.brandStatement}
                onChange={(e) => setHomepageState({ ...homepageState, brandStatement: e.target.value })}
                className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
              />
            </div>
          </div>

          <div className="bg-[#1C1A18] border border-[#2C2926] p-6 space-y-4">
            <h3 className="font-serif-heading text-lg text-[#FAF9F5] border-b border-[#2C2926] pb-2">
              Three Pillars (Philosophy, Experience, Details)
            </h3>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">01 Philosophy</label>
              <textarea
                rows={2}
                value={homepageState.philosophyText}
                onChange={(e) => setHomepageState({ ...homepageState, philosophyText: e.target.value })}
                className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">02 Experience</label>
              <textarea
                rows={2}
                value={homepageState.experienceText}
                onChange={(e) => setHomepageState({ ...homepageState, experienceText: e.target.value })}
                className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">03 Details</label>
              <textarea
                rows={2}
                value={homepageState.detailsText}
                onChange={(e) => setHomepageState({ ...homepageState, detailsText: e.target.value })}
                className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant="primary" size="md" isLoading={saving} className="bg-[#FAF9F5] text-[#121110]">
              Save Homepage Updates
            </Button>
          </div>
        </form>
      </div>
    );
  }

  // About Section Editing
  return (
    <div className="space-y-8 max-w-4xl">
      <div className="border-b border-[#2C2926] pb-6">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#9A5B32] font-semibold block">
          BRAND MANIFESTO
        </span>
        <h1 className="font-serif-heading text-2xl sm:text-3xl text-[#FAF9F5]">
          About & Philosophy Content
        </h1>
      </div>

      <form onSubmit={handleSaveAbout} className="space-y-6">
        <div className="bg-[#1C1A18] border border-[#2C2926] p-6 space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">
              About Heading
            </label>
            <input
              type="text"
              value={aboutState.heroHeading}
              onChange={(e) => setAboutState({ ...aboutState, heroHeading: e.target.value })}
              className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">
              About Subtitle
            </label>
            <input
              type="text"
              value={aboutState.heroSubtitle}
              onChange={(e) => setAboutState({ ...aboutState, heroSubtitle: e.target.value })}
              className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">
              Studio Photography Image URL
            </label>
            <input
              type="url"
              value={aboutState.imageUrl}
              onChange={(e) => setAboutState({ ...aboutState, imageUrl: e.target.value })}
              className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">
              Full Brand Story Narrative
            </label>
            <textarea
              rows={6}
              value={aboutState.brandStory}
              onChange={(e) => setAboutState({ ...aboutState, brandStory: e.target.value })}
              className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#D4CEBF] mb-1">
              Founder Note (Editable Studio Note)
            </label>
            <textarea
              rows={3}
              value={aboutState.founderNote}
              onChange={(e) => setAboutState({ ...aboutState, founderNote: e.target.value })}
              placeholder="Founder note or creative director reflection..."
              className="w-full bg-[#121110] border border-[#3E3B36] p-2.5 text-xs text-white"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" size="md" isLoading={saving} className="bg-[#FAF9F5] text-[#121110]">
            Save About Updates
          </Button>
        </div>
      </form>
    </div>
  );
};
