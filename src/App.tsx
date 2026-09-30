import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { FloatingWhatsApp } from './components/common/WhatsAppButton';
import { ImageLightbox } from './components/common/ImageLightbox';
import { ToastContainer } from './components/common/ToastContainer';

// Pages
import { HomePage } from './pages/HomePage';
import { PackagesPage } from './pages/PackagesPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage, NotFoundPage } from './pages/LegalPage';
import { AdminPortal } from './pages/admin/AdminPortal';

const AppContent: React.FC = () => {
  const { activePath } = useApp();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePath]);

  // Route matching
  const isAdmin = activePath.startsWith('/admin');

  const renderRoute = () => {
    if (isAdmin) {
      return <AdminPortal />;
    }

    if (activePath === '/') {
      return <HomePage />;
    }

    if (activePath === '/packages' || activePath === '/services' || activePath === '/shop') {
      return <PackagesPage />;
    }

    if (activePath === '/gallery' || activePath === '/portfolio' || activePath === '/journal') {
      return <GalleryPage />;
    }

    if (activePath === '/about') {
      return <AboutPage />;
    }

    if (activePath === '/contact') {
      return <ContactPage />;
    }

    if (activePath === '/privacy') {
      return <LegalPage type="privacy" />;
    }

    if (activePath === '/terms') {
      return <LegalPage type="terms" />;
    }

    return <NotFoundPage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#141210] text-[#2C2825] dark:text-[#F7F4EE] font-sans antialiased selection:bg-[#2C2825] selection:text-[#FAF8F5] dark:selection:bg-[#F7F4EE] dark:selection:text-[#141210] transition-colors duration-200">
      {/* Public Header */}
      {!isAdmin && <Header />}

      {/* Main Page Stage */}
      <main className="flex-1">{renderRoute()}</main>

      {/* Public Footer */}
      {!isAdmin && <Footer />}

      {/* Global Modals & Notifications */}
      <FloatingWhatsApp />
      <ImageLightbox />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
