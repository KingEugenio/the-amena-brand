import React from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/common/Buttons';

interface LegalPageProps {
  type: 'privacy' | 'terms';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const { navigateTo } = useApp();
  const isPrivacy = type === 'privacy';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-12">
      <div className="border-b border-[#E5E1D8] pb-6 space-y-2">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#9A5B32] font-semibold">
          STUDIO POLICIES
        </span>
        <h1 className="font-serif-heading text-3xl sm:text-4xl text-[#191816]">
          {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions of Service'}
        </h1>
        <p className="text-xs text-[#6B6862]">Effective Date: January 1, 2025 • THE AMENA BRAND (Accra, Ghana)</p>
      </div>

      <div className="prose prose-sm text-xs sm:text-sm text-[#6B6862] leading-relaxed space-y-6 font-sans">
        {isPrivacy ? (
          <>
            <section className="space-y-2">
              <h3 className="font-serif-heading text-lg text-[#191816]">1. Commitment to Privacy</h3>
              <p>
                THE AMENA BRAND ("we", "our", "the studio") respects the discretion and privacy of all clients, visitors, and correspondents. We collect only personal data necessary to facilitate bespoke fittings, order dispatches, and client correspondence.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif-heading text-lg text-[#191816]">2. Information We Collect</h3>
              <p>
                We may collect contact information (name, telephone number, WhatsApp contact, delivery address, and email address) submitted voluntarily through our inquiry forms, WhatsApp consultations, or studio registry.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif-heading text-lg text-[#191816]">3. Use of Information</h3>
              <p>
                Client details are used strictly to: fulfill bespoke garment orders, coordinate courier delivery across Ghana and internationally, respond to styling inquiries, and provide private studio collection notices. We never sell, lease, or distribute client contact details to commercial third parties.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif-heading text-lg text-[#191816]">4. WhatsApp Communications</h3>
              <p>
                Conversations initiated on WhatsApp (+233 57 949 9223) are subject to WhatsApp’s end-to-end encryption. You may request deletion of your contact records at any time by messaging our team.
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="space-y-2">
              <h3 className="font-serif-heading text-lg text-[#191816]">1. Studio Scope</h3>
              <p>
                THE AMENA BRAND is a contemporary creative design house based in Accra, Ghana. Each garment and collection piece is handcrafted or tailored to order with meticulous artisanal attention.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif-heading text-lg text-[#191816]">2. Ordering & Made-to-Order Timelines</h3>
              <p>
                Due to the artisanal nature of our pieces, made-to-order garments typically require 7–14 business days for tailoring prior to courier dispatch, unless marked "In Stock". Specific timeline guarantees will be provided during WhatsApp or invoice consultation.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif-heading text-lg text-[#191816]">3. Delivery & Courier</h3>
              <p>
                We dispatch within Accra via local courier, across Ghana via express inter-city dispatch, and internationally via DHL Express. Shipping fees and any applicable customs duties outside Ghana remain the responsibility of the client.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-serif-heading text-lg text-[#191816]">4. Fitting & Exchanges</h3>
              <p>
                We want every piece to fit with flawless architectural drape. If an alteration or sizing adjustment is required upon receipt, please notify our team within 5 days of delivery to coordinate studio fitting adjustments.
              </p>
            </section>
          </>
        )}
      </div>

      <div className="pt-4 border-t border-[#E5E1D8]">
        <Button variant="outline" size="sm" onClick={() => navigateTo('/')}>
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export const NotFoundPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-2xl mx-auto px-4 py-32 text-center space-y-6">
      <span className="text-xs uppercase tracking-[0.3em] text-[#9A5B32] font-semibold">
        404 ERROR
      </span>
      <h1 className="font-serif-heading text-4xl sm:text-5xl text-[#191816]">
        Page Undiscovered
      </h1>
      <p className="text-sm text-[#6B6862] max-w-md mx-auto leading-relaxed">
        The silhouette, journal entry, or destination you are seeking cannot be located in the studio archive.
      </p>
      <div className="pt-4 flex justify-center gap-4">
        <Button variant="primary" onClick={() => navigateTo('/')}>
          RETURN HOME
        </Button>
        <Button variant="outline" onClick={() => navigateTo('/shop')}>
          EXPLORE SHOP
        </Button>
      </div>
    </div>
  );
};
