import React from 'react';
import { SiteConfigProvider, useSiteConfig } from './context/SiteConfigContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { WhatsAppFloatingButton } from './components/common/WhatsAppFloatingButton';

// Home sections
import { HeroSection } from './components/home/HeroSection';
import { FeaturedWork } from './components/home/FeaturedWork';
import { ServicesPreview } from './components/home/ServicesPreview';
import { AboutPreview } from './components/home/AboutPreview';
import { ProcessSection } from './components/home/ProcessSection';
import { TestimonialsSection } from './components/home/TestimonialsSection';
import { SocialProofSection } from './components/home/SocialProofSection';
import { BehindTheScenesSection } from './components/home/BehindTheScenesSection';
import { FinalCTA } from './components/home/FinalCTA';

// Dedicated views
import { PortfolioView } from './components/portfolio/PortfolioView';
import { ProjectDetailView } from './components/portfolio/ProjectDetailView';
import { ServicesView } from './components/services/ServicesView';
import { AboutView } from './components/about/AboutView';
import { ExperienceView } from './components/experience/ExperienceView';
import { FAQView } from './components/faq/FAQView';
import { BookingView } from './components/booking/BookingView';

// Admin portal
import { AdminApp } from './components/admin/AdminApp';

// Journal & stories section is intentionally deferred (JournalView / JournalPreview exist but are not routed yet).

const MainContent: React.FC = () => {
  const { activeRoute, routeParam } = useSiteConfig();

  return (
    <main id="main-content" className="min-h-screen">
      {activeRoute === 'home' && (
        <>
          <HeroSection />
          <FeaturedWork />
          <ServicesPreview />
          <AboutPreview />
          <ProcessSection />
          <TestimonialsSection />
          <SocialProofSection />
          <BehindTheScenesSection />
          <FinalCTA />
        </>
      )}

      {activeRoute === 'portfolio' && (
        routeParam ? <ProjectDetailView projectSlug={routeParam} /> : <PortfolioView />
      )}

      {activeRoute === 'services' && <ServicesView />}

      {activeRoute === 'about' && <AboutView />}

      {activeRoute === 'experience' && <ExperienceView />}

      {activeRoute === 'faq' && <FAQView />}

      {activeRoute === 'book' && <BookingView />}
    </main>
  );
};

const AppShell: React.FC = () => {
  const { activeRoute } = useSiteConfig();

  // The admin portal is a standalone shell — no marketing header/footer.
  if (activeRoute === 'admin') {
    return <AdminApp />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-base)] text-[var(--text-main)] transition-colors duration-200">
      {/* Skip Link for Accessibility (WCAG 2.1 AA) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-[#0D0D0D] focus:text-white focus:px-4 focus:py-2 text-xs uppercase tracking-widest font-mono"
      >
        Skip to main content
      </a>

      <Header />
      <MainContent />
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
};

export default function App() {
  return (
    <SiteConfigProvider>
      <AppShell />
    </SiteConfigProvider>
  );
}
