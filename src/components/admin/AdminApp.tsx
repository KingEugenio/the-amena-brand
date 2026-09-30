import React, { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  Inbox,
  Settings as SettingsIcon,
  Palette,
  UserCog,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';
import { AdminAuthProvider, useAdminAuth } from '../../context/AdminAuthContext';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { AdminLogin } from './AdminLogin';
import { DashboardSection } from './sections/DashboardSection';
import { InquiriesSection } from './sections/InquiriesSection';
import { SettingsSection } from './sections/SettingsSection';
import { AppearanceSection } from './sections/AppearanceSection';
import { AccountSection } from './sections/AccountSection';

type SectionKey = 'dashboard' | 'inquiries' | 'settings' | 'appearance' | 'account';

const NAV: { key: SectionKey; label: string; icon: React.ElementType }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'inquiries', label: 'Inquiries', icon: Inbox },
  { key: 'settings', label: 'Site Settings', icon: SettingsIcon },
  { key: 'appearance', label: 'Appearance', icon: Palette },
  { key: 'account', label: 'Account', icon: UserCog },
];

const AdminShell: React.FC = () => {
  const { isAuthed, logout } = useAdminAuth();
  const { settings, navigateTo } = useSiteConfig();
  const [section, setSection] = useState<SectionKey>('dashboard');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Ensure the admin always opens at the top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [section]);

  if (!isAuthed) return <AdminLogin />;

  const go = (key: SectionKey) => {
    setSection(key);
    setMobileNavOpen(false);
  };

  const NavList = (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => {
        const active = section === item.key;
        return (
          <button
            key={item.key}
            type="button"
            onClick={() => go(item.key)}
            className={`flex items-center gap-3 px-4 py-2.5 text-xs uppercase tracking-wider font-mono transition-colors cursor-pointer text-left ${
              active
                ? 'bg-[var(--text-main)] text-[var(--bg-base)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)]'
            }`}
          >
            <item.icon size={16} />
            {item.label}
          </button>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-main)] flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-[var(--border-line)] bg-[var(--card-bg)] sticky top-0 h-screen">
        <div className="px-6 py-6 border-b border-[var(--border-line)]">
          <span className="block text-lg font-editorial uppercase tracking-[0.1em] text-[var(--text-main)]">
            {settings.photographerName}
          </span>
          <span className="block text-[9px] tracking-[0.3em] uppercase text-[var(--text-muted)] font-mono mt-1">
            Studio Admin
          </span>
        </div>
        <div className="flex-1 py-4 px-2 overflow-y-auto">{NavList}</div>
        <div className="p-2 border-t border-[var(--border-line)] space-y-1">
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs uppercase tracking-wider font-mono text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer"
          >
            <ExternalLink size={16} /> View site
          </button>
          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs uppercase tracking-wider font-mono text-rose-500 hover:bg-rose-500/10 cursor-pointer"
          >
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 flex items-center justify-between px-4 h-14 bg-[var(--card-bg)] border-b border-[var(--border-line)]">
        <span className="text-sm font-editorial uppercase tracking-wider">{settings.photographerName} Admin</span>
        <button
          type="button"
          onClick={() => setMobileNavOpen(true)}
          className="p-2 cursor-pointer text-[var(--text-main)]"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileNavOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileNavOpen(false)} />
          <div className="relative ml-auto w-72 max-w-[85%] h-full bg-[var(--card-bg)] border-l border-[var(--border-line)] flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border-line)]">
              <span className="text-sm font-editorial uppercase tracking-wider">Menu</span>
              <button type="button" onClick={() => setMobileNavOpen(false)} className="p-1 cursor-pointer" aria-label="Close menu">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 py-4 px-2 overflow-y-auto">{NavList}</div>
            <div className="p-2 border-t border-[var(--border-line)] space-y-1">
              <button
                type="button"
                onClick={() => navigateTo('home')}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-xs uppercase tracking-wider font-mono text-[var(--text-muted)] cursor-pointer"
              >
                <ExternalLink size={16} /> View site
              </button>
              <button
                type="button"
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-xs uppercase tracking-wider font-mono text-rose-500 cursor-pointer"
              >
                <LogOut size={16} /> Sign out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 min-w-0 px-5 sm:px-8 py-8 pt-20 lg:pt-8 max-w-5xl mx-auto w-full">
        {section === 'dashboard' && <DashboardSection onGoInquiries={() => setSection('inquiries')} />}
        {section === 'inquiries' && <InquiriesSection />}
        {section === 'settings' && <SettingsSection />}
        {section === 'appearance' && <AppearanceSection />}
        {section === 'account' && <AccountSection />}
      </main>
    </div>
  );
};

export const AdminApp: React.FC = () => (
  <AdminAuthProvider>
    <AdminShell />
  </AdminAuthProvider>
);
