import React, { useState } from 'react';
import { Sun, Moon, Check, RotateCcw } from 'lucide-react';
import { useSiteConfig } from '../../../context/SiteConfigContext';

const PRESET_ACCENTS = ['#C5A880', '#D4B892', '#B08968', '#A67C52', '#8C7851', '#9CA3AF', '#0D0D0D'];

export const AppearanceSection: React.FC = () => {
  const { settings, updateSettings, theme, setTheme } = useSiteConfig();
  const [accent, setAccent] = useState(settings.primaryAccentColor || '#C5A880');
  const [savedAccent, setSavedAccent] = useState(false);

  const applyAccent = (color: string) => {
    setAccent(color);
    document.documentElement.style.setProperty('--primary-accent', color);
    setSavedAccent(false);
  };

  const saveAccent = () => {
    updateSettings({ primaryAccentColor: accent });
    document.documentElement.style.setProperty('--primary-accent', accent);
    setSavedAccent(true);
    setTimeout(() => setSavedAccent(false), 2500);
  };

  const setDefaultTheme = (t: 'light' | 'dark') => {
    setTheme(t);
    updateSettings({ theme: t });
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-editorial text-[var(--text-main)]">Appearance</h1>
        <p className="text-xs text-[var(--text-muted)] mt-1">
          Set the website's default theme and accent colour.
        </p>
      </div>

      <div className="space-y-8">
        {/* Theme */}
        <div className="bg-[var(--card-bg)] border border-[var(--border-line)] p-5 sm:p-6">
          <h2 className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--primary-accent)] mb-5">
            Default theme
          </h2>
          <div className="grid grid-cols-2 gap-4 max-w-md">
            {(['light', 'dark'] as const).map((t) => {
              const active = theme === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setDefaultTheme(t)}
                  className={`flex items-center justify-center gap-2 py-4 border cursor-pointer transition-colors ${
                    active
                      ? 'border-[var(--primary-accent)] bg-[var(--bg-surface)]'
                      : 'border-[var(--border-line)] hover:border-[var(--text-muted)]'
                  }`}
                >
                  {t === 'light' ? <Sun size={16} /> : <Moon size={16} />}
                  <span className="text-xs uppercase tracking-wider font-mono text-[var(--text-main)]">{t}</span>
                  {active && <Check size={14} className="text-[var(--primary-accent)]" />}
                </button>
              );
            })}
          </div>
          <p className="text-[10px] text-[var(--text-muted)] mt-3 font-mono">
            Visitors can still switch themes themselves; this sets the saved default.
          </p>
        </div>

        {/* Accent */}
        <div className="bg-[var(--card-bg)] border border-[var(--border-line)] p-5 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--primary-accent)]">
              Accent colour
            </h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => applyAccent(theme === 'dark' ? '#D4B892' : '#C5A880')}
                className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider border border-[var(--border-line)] px-3 py-1.5 text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer"
              >
                <RotateCcw size={12} /> Default
              </button>
              <button
                type="button"
                onClick={saveAccent}
                className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider bg-[var(--text-main)] text-[var(--bg-base)] px-3 py-1.5 hover:opacity-90 cursor-pointer"
              >
                {savedAccent ? <Check size={12} /> : null}
                {savedAccent ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {PRESET_ACCENTS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => applyAccent(c)}
                className={`w-9 h-9 rounded-full border-2 cursor-pointer transition-transform hover:scale-110 ${
                  accent.toLowerCase() === c.toLowerCase() ? 'border-[var(--text-main)]' : 'border-transparent'
                }`}
                style={{ backgroundColor: c }}
                aria-label={`Accent ${c}`}
              />
            ))}
            <label className="flex items-center gap-2 ml-2 cursor-pointer">
              <input
                type="color"
                value={accent}
                onChange={(e) => applyAccent(e.target.value)}
                className="w-9 h-9 rounded cursor-pointer bg-transparent border border-[var(--border-line)]"
              />
              <span className="text-xs font-mono text-[var(--text-muted)]">{accent}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
