import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  AppDataPayload,
  Product,
  Collection,
  JournalPost,
  FAQItem,
  SiteSettings,
  User,
  HomepageContent,
  ContactSubmission,
  EnquiryStatus
} from '../types';
import { initialData } from '../data/initialData';

export interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface AppContextType {
  data: AppDataPayload;
  loading: boolean;
  error: string | null;
  activePath: string;
  navigateTo: (path: string) => void;
  // Theme
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  // Search
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  // Lightbox
  lightboxImage: string | null;
  lightboxAlt: string;
  lightboxList: string[];
  lightboxIndex: number;
  openLightbox: (src: string, alt?: string, gallery?: string[]) => void;
  closeLightbox: () => void;
  nextLightbox: () => void;
  prevLightbox: () => void;
  // WhatsApp
  getWhatsAppUrl: (messageType?: 'general' | 'product' | 'custom', customSubjectOrProduct?: string) => string;
  openWhatsApp: (messageType?: 'general' | 'product' | 'custom', customSubjectOrProduct?: string) => void;
  // Admin & Preview
  adminToken: string | null;
  adminUser: User | null;
  isPreviewMode: boolean;
  setIsPreviewMode: (val: boolean) => void;
  adminLogin: (password: string) => Promise<boolean>;
  adminLogout: () => void;
  loginAdmin: (token: string, user: User) => void;
  logoutAdmin: () => void;
  refreshData: () => Promise<void>;
  updateDataLocally: (newData: AppDataPayload) => void;
  // CRUD Actions
  createProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  createCollection: (col: Collection) => Promise<void>;
  updateCollection: (col: Collection) => Promise<void>;
  deleteCollection: (id: string) => Promise<void>;
  createJournalPost: (post: JournalPost) => Promise<void>;
  updateJournalPost: (post: JournalPost) => Promise<void>;
  deleteJournalPost: (id: string) => Promise<void>;
  createFaq: (faq: FAQItem) => Promise<void>;
  updateFaq: (faq: FAQItem) => Promise<void>;
  deleteFaq: (id: string) => Promise<void>;
  updateHomepageContent: (homepage: HomepageContent) => Promise<void>;
  updateAboutContent: (about: any) => Promise<void>;
  updateSettings: (settings: SiteSettings) => Promise<void>;
  updateEnquiryStatus: (id: string, status: EnquiryStatus) => Promise<void>;
  deleteEnquiry: (id: string) => Promise<void>;
  submitContact: (enquiry: any) => Promise<boolean>;
  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppDataPayload>(initialData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Navigation: synchronize with window.location.pathname
  const [activePath, setActivePath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname;
      return p === '/' || p === '' ? '/' : p;
    }
    return '/';
  });

  // Theme state ('light' | 'dark')
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('amena_theme');
      if (stored === 'dark' || stored === 'light') return stored;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      localStorage.setItem('amena_theme', theme);
    }
  }, [theme]);

  const setTheme = useCallback((newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  // Search state
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Lightbox state
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState<string>('');
  const [lightboxList, setLightboxList] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  // Admin state
  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return typeof window !== 'undefined' ? localStorage.getItem('amena_admin_token') : null;
  });
  const [adminUser, setAdminUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('amena_admin_user');
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);

  // Toasts state
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = 'toast-' + Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Fetch initial content
  const refreshData = useCallback(async () => {
    try {
      setLoading(true);
      const headers: Record<string, string> = {};
      if (adminToken) {
        headers['x-admin-token'] = adminToken;
      }
      const previewParam = isPreviewMode ? '?preview=true' : '';
      const res = await fetch(`/api/content${previewParam}`, { headers });
      if (res.ok) {
        const json = await res.json();

        // Enquiries are stored separately on the server; pull them in for admins.
        let adminEnquiries: ContactSubmission[] | null = null;
        if (adminToken) {
          try {
            const enqRes = await fetch('/api/admin/enquiries', {
              headers: { 'x-admin-token': adminToken }
            });
            if (enqRes.ok) adminEnquiries = await enqRes.json();
          } catch {
            /* non-fatal */
          }
        }

        setData((prev) => ({
          ...json,
          enquiries: adminEnquiries ?? json.enquiries ?? prev.enquiries ?? []
        }));
        setError(null);
      }
    } catch (err: any) {
      console.warn('Fetch error:', err.message);
    } finally {
      setLoading(false);
    }
  }, [adminToken, isPreviewMode]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Track page view telemetry
  useEffect(() => {
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventType: 'page_view',
        path: activePath
      })
    }).catch(() => {});
  }, [activePath]);

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      setActivePath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = useCallback((path: string) => {
    if (path !== activePath) {
      window.history.pushState({}, '', path);
      setActivePath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activePath]);

  // Lightbox handlers
  const openLightbox = useCallback((src: string, alt = '', gallery: string[] = []) => {
    const list = gallery.length > 0 ? gallery : [src];
    const idx = Math.max(0, list.indexOf(src));
    setLightboxImage(src);
    setLightboxAlt(alt);
    setLightboxList(list);
    setLightboxIndex(idx);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxImage(null);
    setLightboxList([]);
    document.body.style.overflow = '';
  }, []);

  const nextLightbox = useCallback(() => {
    if (lightboxList.length <= 1) return;
    const nextIdx = (lightboxIndex + 1) % lightboxList.length;
    setLightboxIndex(nextIdx);
    setLightboxImage(lightboxList[nextIdx]);
  }, [lightboxIndex, lightboxList]);

  const prevLightbox = useCallback(() => {
    if (lightboxList.length <= 1) return;
    const prevIdx = (lightboxIndex - 1 + lightboxList.length) % lightboxList.length;
    setLightboxIndex(prevIdx);
    setLightboxImage(lightboxList[prevIdx]);
  }, [lightboxIndex, lightboxList]);

  // WhatsApp link generator & click handler
  const getWhatsAppUrl = useCallback((messageType: 'general' | 'product' | 'custom' = 'general', customParam?: string) => {
    const rawNumber = data.settings.whatsappNumber || '0579499223';
    let cleanNumber = rawNumber.replace(/\D/g, '');
    if (cleanNumber.startsWith('0')) {
      cleanNumber = '233' + cleanNumber.slice(1);
    } else if (!cleanNumber.startsWith('233')) {
      cleanNumber = '233' + cleanNumber;
    }

    let message = 'Hello THE AMENA BRAND, I’d like to make an enquiry.';
    if (messageType === 'product' && customParam) {
      message = `Hello THE AMENA BRAND, I’m interested in ${customParam}. I’d like to know more about availability and bespoke tailoring.`;
    } else if (messageType === 'custom' && customParam) {
      message = `Hello THE AMENA BRAND, I’d like to inquire regarding ${customParam}.`;
    }

    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
  }, [data.settings.whatsappNumber]);

  const openWhatsApp = useCallback((messageType: 'general' | 'product' | 'custom' = 'general', customParam?: string) => {
    const url = getWhatsAppUrl(messageType, customParam);
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventType: 'whatsapp_click',
        path: activePath,
        target: customParam || messageType
      })
    }).catch(() => {});

    window.open(url, '_blank', 'noopener,noreferrer');
  }, [getWhatsAppUrl, activePath]);

  // Helper to persist the CMS content to the backend.
  // Enquiries live in their own store on the server, so we never send them here.
  const persistToServer = async (payload: AppDataPayload) => {
    if (!adminToken) return;
    try {
      const { enquiries: _enquiries, ...content } = payload;
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': adminToken
        },
        body: JSON.stringify(content)
      });
      if (!res.ok) {
        console.error('Persist failed:', res.status);
        showToast('Could not save changes to the server.', 'error');
      }
    } catch (e) {
      console.error('Persist error:', e);
      showToast('Could not reach the server to save changes.', 'error');
    }
  };

  // Admin login / logout
  const loginAdmin = useCallback((token: string, user: User) => {
    setAdminToken(token);
    setAdminUser(user);
    localStorage.setItem('amena_admin_token', token);
    localStorage.setItem('amena_admin_user', JSON.stringify(user));
    showToast(`Welcome back, ${user.name}`);
  }, [showToast]);

  const logoutAdmin = useCallback(() => {
    if (adminToken) {
      fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'x-admin-token': adminToken }
      }).catch(() => {});
    }
    setAdminToken(null);
    setAdminUser(null);
    localStorage.removeItem('amena_admin_token');
    localStorage.removeItem('amena_admin_user');
    showToast('Logged out of Admin Portal.', 'info');
  }, [adminToken, showToast]);

  const adminLogin = async (password: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@theamenabrand.com', password })
      });
      if (res.ok) {
        const d = await res.json();
        loginAdmin(d.token, d.user);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // Product CRUD
  const createProduct = async (prod: Product) => {
    const updated = { ...data, products: [prod, ...data.products] };
    setData(updated);
    await persistToServer(updated);
    showToast(`"${prod.name}" added to catalog.`);
  };

  const updateProduct = async (prod: Product) => {
    const updated = {
      ...data,
      products: data.products.map((p) => (p.id === prod.id ? prod : p))
    };
    setData(updated);
    await persistToServer(updated);
    showToast(`Updated "${prod.name}".`);
  };

  const deleteProduct = async (id: string) => {
    const updated = {
      ...data,
      products: data.products.filter((p) => p.id !== id)
    };
    setData(updated);
    await persistToServer(updated);
    showToast('Product removed from catalog.', 'info');
  };

  // Collection CRUD
  const createCollection = async (col: Collection) => {
    const updated = { ...data, collections: [...data.collections, col] };
    setData(updated);
    await persistToServer(updated);
    showToast(`Collection "${col.title}" created.`);
  };

  const updateCollection = async (col: Collection) => {
    const updated = {
      ...data,
      collections: data.collections.map((c) => (c.id === col.id ? col : c))
    };
    setData(updated);
    await persistToServer(updated);
    showToast(`Updated collection "${col.title}".`);
  };

  const deleteCollection = async (id: string) => {
    const updated = {
      ...data,
      collections: data.collections.filter((c) => c.id !== id)
    };
    setData(updated);
    await persistToServer(updated);
    showToast('Collection removed.', 'info');
  };

  // Journal CRUD
  const createJournalPost = async (post: JournalPost) => {
    const updated = { ...data, journal: [post, ...data.journal] };
    setData(updated);
    await persistToServer(updated);
    showToast(`Dispatch "${post.title}" published.`);
  };

  const updateJournalPost = async (post: JournalPost) => {
    const updated = {
      ...data,
      journal: data.journal.map((j) => (j.id === post.id ? post : j))
    };
    setData(updated);
    await persistToServer(updated);
    showToast(`Updated dispatch "${post.title}".`);
  };

  const deleteJournalPost = async (id: string) => {
    const updated = {
      ...data,
      journal: data.journal.filter((j) => j.id !== id)
    };
    setData(updated);
    await persistToServer(updated);
    showToast('Journal dispatch removed.', 'info');
  };

  // FAQ CRUD
  const createFaq = async (faq: FAQItem) => {
    const updated = { ...data, faqs: [...data.faqs, faq] };
    setData(updated);
    await persistToServer(updated);
    showToast('FAQ entry created.');
  };

  const updateFaq = async (faq: FAQItem) => {
    const updated = {
      ...data,
      faqs: data.faqs.map((f) => (f.id === faq.id ? faq : f))
    };
    setData(updated);
    await persistToServer(updated);
    showToast('FAQ entry updated.');
  };

  const deleteFaq = async (id: string) => {
    const updated = {
      ...data,
      faqs: data.faqs.filter((f) => f.id !== id)
    };
    setData(updated);
    await persistToServer(updated);
    showToast('FAQ entry removed.', 'info');
  };

  // Settings & Content
  const updateHomepageContent = async (homepage: HomepageContent) => {
    const updated = { ...data, homepage };
    setData(updated);
    await persistToServer(updated);
    showToast('Homepage editorial content updated.');
  };

  const updateAboutContent = async (about: any) => {
    const updated = { ...data, about };
    setData(updated);
    await persistToServer(updated);
    showToast('About studio manifesto updated.');
  };

  const updateSettings = async (settings: SiteSettings) => {
    const updated = { ...data, settings };
    setData(updated);
    await persistToServer(updated);
    showToast('Brand settings & channels saved.');
  };

  // Enquiries — these live in a dedicated server store, not in the CMS content.
  const updateEnquiryStatus = async (id: string, status: EnquiryStatus) => {
    // Optimistic local update
    setData((prev) => ({
      ...prev,
      enquiries: (prev.enquiries || []).map((e) => (e.id === id ? { ...e, status } : e))
    }));
    if (!adminToken) return;
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
        body: JSON.stringify({ status })
      });
      if (res.ok) showToast(`Status marked as ${status}.`);
      else showToast('Could not update status on the server.', 'error');
    } catch {
      showToast('Could not reach the server.', 'error');
    }
  };

  const deleteEnquiry = async (id: string) => {
    setData((prev) => ({
      ...prev,
      enquiries: (prev.enquiries || []).filter((e) => e.id !== id)
    }));
    if (!adminToken) return;
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-token': adminToken }
      });
      if (res.ok) showToast('Inquiry record deleted.', 'info');
      else showToast('Could not delete on the server.', 'error');
    } catch {
      showToast('Could not reach the server.', 'error');
    }
  };

  const submitContact = async (enquiry: {
    name: string; email: string; phone?: string; whatsapp?: string; subject?: string; message: string;
  }): Promise<boolean> => {
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquiry)
      });
      return res.ok;
    } catch {
      return false;
    }
  };

  const updateDataLocally = useCallback((newData: AppDataPayload) => {
    setData(newData);
  }, []);

  return (
    <AppContext.Provider
      value={{
        data,
        loading,
        error,
        activePath,
        navigateTo,
        theme,
        setTheme,
        toggleTheme,
        isSearchOpen,
        setIsSearchOpen,
        lightboxImage,
        lightboxAlt,
        lightboxList,
        lightboxIndex,
        openLightbox,
        closeLightbox,
        nextLightbox,
        prevLightbox,
        getWhatsAppUrl,
        openWhatsApp,
        adminToken,
        adminUser,
        isPreviewMode,
        setIsPreviewMode,
        adminLogin,
        adminLogout: logoutAdmin,
        loginAdmin,
        logoutAdmin,
        refreshData,
        updateDataLocally,
        createProduct,
        updateProduct,
        deleteProduct,
        createCollection,
        updateCollection,
        deleteCollection,
        createJournalPost,
        updateJournalPost,
        deleteJournalPost,
        createFaq,
        updateFaq,
        deleteFaq,
        updateHomepageContent,
        updateAboutContent,
        updateSettings,
        updateEnquiryStatus,
        deleteEnquiry,
        submitContact,
        toasts,
        showToast,
        dismissToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
