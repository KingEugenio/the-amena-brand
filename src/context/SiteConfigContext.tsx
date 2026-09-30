import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteSettings } from '../types';
import { initialSiteSettings } from '../data/siteContent';
import { fetchTenantSettings, saveTenantSettings, isSupabaseConfigured } from '../lib/tenantStore';

interface SiteConfigContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  resetSettings: () => void;
  simulateLoading: boolean;
  setSimulateLoading: (val: boolean) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  activeRoute: string;
  navigateTo: (route: string, param?: string) => void;
  routeParam?: string;
  isQuickSettingsOpen: boolean;
  setIsQuickSettingsOpen: (val: boolean) => void;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

const STORAGE_KEY = 'freddieshotit_settings_v2';
const THEME_KEY = 'freddieshotit_theme';

export const SiteConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch {
      // fallback
    }
    return 'light';
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...initialSiteSettings, ...JSON.parse(saved), theme };
      }
    } catch {
      // Ignore fallback
    }
    return { ...initialSiteSettings, theme };
  });

  const [simulateLoading, setSimulateLoading] = useState<boolean>(false);
  const [activeRoute, setActiveRoute] = useState<string>('home');
  const [routeParam, setRouteParam] = useState<string | undefined>(undefined);
  const [isQuickSettingsOpen, setIsQuickSettingsOpen] = useState<boolean>(false);

  // If this deployment is connected to the EKO PIXELS platform, pull the
  // latest settings from the tenant's Supabase row (e.g. edited from a
  // different device) and merge them over what's cached locally. In
  // standalone mode this is a no-op — settings stay exactly as before.
  useEffect(() => {
    if (!isSupabaseConfigured) return;
    fetchTenantSettings(settings).then((remote) => {
      setSettings(remote);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(remote));
      } catch {
        // ignore
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Apply theme to DOM
  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // ignore
    }
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.setProperty('--bg-base', '#0C0C0C');
      root.style.setProperty('--bg-surface', '#161616');
      root.style.setProperty('--card-bg', '#181818');
      root.style.setProperty('--input-bg', '#1E1E1E');
      root.style.setProperty('--text-main', '#F9F9F9');
      root.style.setProperty('--text-muted', '#CCCCCC');
      root.style.setProperty('--border-line', '#272727');
      root.style.setProperty('--primary-accent', '#D4B892');
    } else {
      root.classList.remove('dark');
      root.style.setProperty('--bg-base', '#FAF9F6');
      root.style.setProperty('--bg-surface', '#FFFFFF');
      root.style.setProperty('--card-bg', '#FFFFFF');
      root.style.setProperty('--input-bg', '#FAF9F6');
      root.style.setProperty('--text-main', '#111111');
      root.style.setProperty('--text-muted', '#4B5563');
      root.style.setProperty('--border-line', '#E5E5E5');
      root.style.setProperty('--primary-accent', '#C5A880');
    }
  }, [theme]);

  // Re-apply any custom accent colour saved in settings so it survives theme changes
  useEffect(() => {
    if (settings.primaryAccentColor) {
      document.documentElement.style.setProperty('--primary-accent', settings.primaryAccentColor);
    }
  }, [theme, settings.primaryAccentColor]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
  };

  // Sync route with browser hash or popstate for real URLs and shareability
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || '/';
      const parts = hash.split('/').filter(Boolean);
      
      if (parts.length === 0) {
        setActiveRoute('home');
        setRouteParam(undefined);
      } else if (parts[0] === 'portfolio') {
        setActiveRoute('portfolio');
        setRouteParam(parts[1]);
      } else if (parts[0] === 'services') {
        setActiveRoute('services');
        setRouteParam(parts[1]);
      } else if (parts[0] === 'journal') {
        setActiveRoute('journal');
        setRouteParam(parts[1]);
      } else if (parts[0] === 'about') {
        setActiveRoute('about');
        setRouteParam(undefined);
      } else if (parts[0] === 'experience') {
        setActiveRoute('experience');
        setRouteParam(undefined);
      } else if (parts[0] === 'faq') {
        setActiveRoute('faq');
        setRouteParam(undefined);
      } else if (parts[0] === 'admin') {
        setActiveRoute('admin');
        setRouteParam(parts[1]);
      } else if (parts[0] === 'contact' || parts[0] === 'book') {
        setActiveRoute('book');
        setRouteParam(undefined);
      } else {
        setActiveRoute('home');
        setRouteParam(undefined);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: string, param?: string) => {
    // If attempting to access client route, redirect to portfolio
    const cleanRoute = route === 'client' ? 'portfolio' : route;
    
    // Brief skeleton loader on route transition for polished feel
    setSimulateLoading(true);
    setTimeout(() => {
      setSimulateLoading(false);
    }, 350);

    setActiveRoute(cleanRoute);
    setRouteParam(param);
    let newHash = '#/';
    if (cleanRoute !== 'home') {
      newHash = param ? `#/${cleanRoute}/${param}` : `#/${cleanRoute}`;
    }
    window.location.hash = newHash;

    // Immediately scroll to top so the user never has to scroll up to access content or nav
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to persist settings', err);
      }
      // Fire-and-forget: sync to the tenant row when connected to the platform.
      // Local storage above already gives an instant, offline-safe save.
      saveTenantSettings(updated).catch((err) => console.error('Failed to sync settings to Supabase', err));
      return updated;
    });
  };

  const resetSettings = () => {
    setSettings(initialSiteSettings);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
    saveTenantSettings(initialSiteSettings).catch((err) => console.error('Failed to reset settings on Supabase', err));
  };

  return (
    <SiteConfigContext.Provider
      value={{
        settings,
        updateSettings,
        resetSettings,
        simulateLoading,
        setSimulateLoading,
        theme,
        toggleTheme,
        setTheme,
        activeRoute,
        navigateTo,
        routeParam,
        isQuickSettingsOpen,
        setIsQuickSettingsOpen,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  }
  return context;
};
