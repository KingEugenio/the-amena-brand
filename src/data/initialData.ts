import { AppDataPayload } from '../types';

export const initialData: AppDataPayload = {
  settings: {
    brandName: 'THE AMENA BRAND',
    tagline: 'Fine-Art Creative House & Design Studio',
    description: 'An editorial creative house celebrating intentional craftsmanship, bespoke designs, and visual storytelling.',
    whatsappNumber: '0579499223',
    instagramHandle: '@theamenabrand',
    instagramUrl: 'https://www.instagram.com/theamenabrand/',
    email: 'hello@theamenabrand.com',
    phone: '0579499223',
    location: 'Accra, Ghana [Editable via Admin]',
    currency: 'GHS',
    copyrightText: '© THE AMENA BRAND. All rights reserved.',
    primaryCtaText: 'SHOP THE COLLECTION',
    secondaryCtaText: 'EXPLORE THE BRAND',
    colors: {
      background: '#FAF9F5',
      surface: '#F3F1EB',
      text: '#191816',
      muted: '#6B6862',
      accent: '#9A5B32',
      border: '#E5E1D8'
    },
    showServicesPage: true,
    announcementBarText: 'DISCOVER OUR LATEST CURATED SELECTIONS — DIRECT INQUIRIES VIA WHATSAPP (0579499223)',
    enableAnnouncementBar: true
  },
  homepage: {
    heroHeadline: 'THE AMENA BRAND',
    heroSubheadline: 'Creative Direction & Contemporary Studio',
    heroSupportingText: 'A disciplined celebration of form, texture, and cultural presence. Discover curated apparel, bespoke pieces, and editorial narratives crafted in Ghana.',
    heroPrimaryCtaText: 'SHOP THE COLLECTION',
    heroSecondaryCtaText: 'EXPLORE THE BRAND',
    heroImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1800&q=85',
    heroImageAlt: 'Editorial portrait featuring contemporary Ghanaian creative lifestyle piece',
    brandSectionLabel: 'THE BRAND IDENTITY',
    brandStatement: 'THE AMENA BRAND exists at the intersection of timeless heritage and modern silhouette. Every silhouette reflects an uncompromising dedication to craftsmanship, tactile elegance, and deliberate aesthetics.',
    philosophyTitle: 'THE PHILOSOPHY',
    philosophyText: 'We believe genuine luxury resides in restraint, thoughtful provenance, and the patient mastery of construction. Rather than following transient cycles, our releases are conceived as enduring artistic signatures.',
    experienceTitle: 'THE EXPERIENCE',
    experienceText: 'From personal consultations to bespoke fittings and intimate delivery, every client interaction is handled with warmth, discretion, and meticulous attention.',
    detailsTitle: 'THE DETAILS',
    detailsText: 'Artisanal finishing, hand-selected textiles, and nuanced tailoring anchored in contemporary Ghanaian creative expression.',
    values: [
      {
        id: 'val-1',
        title: 'Intentional Craft',
        description: 'Every seam, texture, and drape is considered with architectural discipline and tactile harmony.'
      },
      {
        id: 'val-2',
        title: 'Cultural Presence',
        description: 'Honoring Ghanaian textile traditions through a contemporary, global editorial lens.'
      },
      {
        id: 'val-3',
        title: 'Direct Client Care',
        description: 'Personalized dialogue via direct WhatsApp communication for made-to-order sizing and curated requests.'
      }
    ],
    finalCtaHeadline: 'Experience THE AMENA BRAND',
    finalCtaSubtext: 'Inquire directly on WhatsApp to explore custom commissions, current availability, or bespoke design consultations.',
    finalCtaButtonText: 'START A CONVERSATION'
  },
  collections: [
    {
      id: 'col-1',
      title: 'Collection 01: Archival Silhouettes',
      slug: 'archival-silhouettes',
      description: 'Sculptural forms, fluid drape, and understated textures designed for effortless distinction.',
      coverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
      featured: true,
      sortOrder: 1,
      status: 'published'
    },
    {
      id: 'col-2',
      title: 'Collection 02: Linen & Earth Tones',
      slug: 'linen-earth-tones',
      description: 'Tactile textiles in warm ochre, sand, and charcoal shades tailored for tropical living.',
      coverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
      featured: true,
      sortOrder: 2,
      status: 'published'
    },
    {
      id: 'col-3',
      title: 'Collection 03: Bespoke Eveningwear',
      slug: 'bespoke-eveningwear',
      description: 'Refined, bespoke evening pieces crafted for high occasions and individual poise.',
      coverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
      featured: true,
      sortOrder: 3,
      status: 'published'
    }
  ],
  products: [
    {
      id: 'prod-1',
      name: 'The Amena Signature Kimono Robe',
      slug: 'amena-signature-kimono-robe',
      shortDescription: 'Fluid oversized outer layer with reinforced lapels and deep sash tie.',
      fullDescription: 'Crafted with premium tactile fabric, the Signature Kimono Robe balances relaxed comfort with stately structure. Perfect as an editorial statement over monochrome basics or tailored trousers.',
      category: 'Outerwear',
      collectionId: 'col-1',
      mainImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85',
      images: [
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85',
        'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=85',
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85'
      ],
      price: 1850,
      currency: 'GHS',
      availability: 'Made to Order',
      stockStatus: 'Available to order / 7–10 days bespoke production',
      featured: true,
      newArrival: true,
      bestseller: true,
      tags: ['Signature', 'Outerwear', 'Unisex', 'Bespoke'],
      details: [
        'Handcrafted in Accra, Ghana',
        'Breathable mid-weight textured blend',
        'Deep side pockets and internal french seams',
        'Dry clean or gentle cold hand wash recommended',
        'Custom measurement adjustments available on request'
      ],
      sizeOptions: ['Small / Medium', 'Medium / Large', 'Custom Bespoke Fit'],
      ctaLabel: 'ENQUIRE ON WHATSAPP',
      status: 'published',
      sortOrder: 1,
      seoTitle: 'The Amena Signature Kimono Robe — THE AMENA BRAND',
      seoDescription: 'Handcrafted signature outer garment with fluid drape and architectural lapels by THE AMENA BRAND.',
      altText: 'Model wearing signature oversized Amena kimono robe in natural warm light',
      createdAt: '2026-08-10T10:00:00Z',
      updatedAt: '2026-09-01T12:00:00Z'
    },
    {
      id: 'prod-2',
      name: 'Architectural Pleated Tunic',
      slug: 'architectural-pleated-tunic',
      shortDescription: 'High-neck tunic with sharp knife-pleat details and drop shoulder silhouette.',
      fullDescription: 'An editorial centerpiece combining sharp structural folds with breezy ease. Worn belted for sculpted form or free-flowing for relaxed sophistication.',
      category: 'Tops',
      collectionId: 'col-1',
      mainImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=85',
      images: [
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=85',
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1400&q=85'
      ],
      price: 1450,
      currency: 'GHS',
      availability: 'In Stock',
      stockStatus: 'Limited studio pieces available',
      featured: true,
      newArrival: false,
      bestseller: true,
      tags: ['Tunic', 'Pleats', 'Evening', 'Minimalist'],
      details: [
        'Pure woven cotton-linen blend',
        'Concealed back placket with horn buttons',
        'Artisanal hand-pleated collar detail',
        'Available in Noir and Warm Sand'
      ],
      sizeOptions: ['XS', 'S', 'M', 'L', 'XL'],
      ctaLabel: 'ENQUIRE ON WHATSAPP',
      status: 'published',
      sortOrder: 2,
      seoTitle: 'Architectural Pleated Tunic — THE AMENA BRAND',
      seoDescription: 'High-neck pleated tunic combining structure and fluidity, crafted by THE AMENA BRAND.',
      altText: 'Sculptural pleated tunic worn against neutral gallery background',
      createdAt: '2026-08-12T10:00:00Z',
      updatedAt: '2026-09-01T12:00:00Z'
    },
    {
      id: 'prod-3',
      name: 'Terracotta Tailored Lounge Trouser',
      slug: 'terracotta-tailored-lounge-trouser',
      shortDescription: 'High-waisted wide leg trouser in washed earthy terracotta linen.',
      fullDescription: 'Refined tailoring meets effortless ease. Features double forward pleats, an elongated waistband with side tab adjusters, and a sweeping wide-leg hem.',
      category: 'Bottoms',
      collectionId: 'col-2',
      mainImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=85',
      images: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=85',
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85'
      ],
      price: 1250,
      currency: 'GHS',
      availability: 'In Stock',
      stockStatus: 'In stock ready for dispatch',
      featured: true,
      newArrival: true,
      bestseller: false,
      tags: ['Trousers', 'Linen', 'Tailored', 'Warm Earth'],
      details: [
        '100% pre-washed artisanal linen',
        'Clean front closure with concealed zip fly',
        'Side slant pockets and rear welt pocket',
        'Hand finished hem'
      ],
      sizeOptions: ['28', '30', '32', '34', '36', 'Custom Waist'],
      ctaLabel: 'ENQUIRE ON WHATSAPP',
      status: 'published',
      sortOrder: 3,
      seoTitle: 'Terracotta Tailored Trouser — THE AMENA BRAND',
      seoDescription: 'Tailored wide-leg trousers in earthy terracotta linen by THE AMENA BRAND.',
      altText: 'Full length view of terracotta tailored trousers',
      createdAt: '2026-08-15T10:00:00Z',
      updatedAt: '2026-09-01T12:00:00Z'
    },
    {
      id: 'prod-4',
      name: 'Asymmetric Drape Evening Gown',
      slug: 'asymmetric-drape-evening-gown',
      shortDescription: 'Single-shoulder column dress with cascading side train.',
      fullDescription: 'Sculpted for gala evenings and formal ceremonies, this one-shoulder gown glides along the body with statuesque ease. Fully lined in breathable silk-cotton.',
      category: 'Dresses',
      collectionId: 'col-3',
      mainImage: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=85',
      images: [
        'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=85',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85'
      ],
      price: 2400,
      currency: 'GHS',
      availability: 'Pre-order',
      stockStatus: 'Studio commission — 14 days delivery',
      featured: false,
      newArrival: true,
      bestseller: false,
      tags: ['Eveningwear', 'Bespoke', 'Gown', 'Studio'],
      details: [
        'Custom body measurements taken via WhatsApp or studio consultation',
        'Concealed invisible side zipper',
        'Reinforced internal bodice structure',
        'Fabric swatch samples available upon enquiry'
      ],
      sizeOptions: ['Made-to-Measure (Personal Consultation)'],
      ctaLabel: 'ENQUIRE ON WHATSAPP',
      status: 'published',
      sortOrder: 4,
      seoTitle: 'Asymmetric Drape Gown — THE AMENA BRAND',
      seoDescription: 'One-shoulder column evening dress handcrafted for formal poise by THE AMENA BRAND.',
      altText: 'Sculptural evening gown in dramatic natural setting',
      createdAt: '2026-08-20T10:00:00Z',
      updatedAt: '2026-09-01T12:00:00Z'
    }
  ],
  journal: [
    {
      id: 'post-1',
      title: 'Notes on Ghanaian Creative Materiality & Form',
      slug: 'notes-on-ghanaian-creative-materiality-and-form',
      coverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
      author: 'THE AMENA BRAND Studio',
      date: 'September 2026',
      category: 'Editorial Essay',
      excerpt: 'Examining how architectural space, tropical natural light, and tactile textiles coalesce in contemporary Ghanaian lifestyle design.',
      bodyContent: `When designing for the contemporary Ghanaian context, light is not an afterthought; it is our primary collaborator. The vibrant clarity of West African sunshine demands fabrics that breathe without sacrificing presence.

In this editorial inquiry, we explore why our studio chose weighted linens, unbleached cotton blends, and ochre mineral dyes for the inaugural collection. Rather than adopting fast seasonal cycles, we construct each silhouette to age gracefully alongside the wearer.

Every garment reflects hours of manual pattern cutting, patient thread testing, and the steady hands of Accra's master artisans.`,
      status: 'published',
      featured: true,
      readingTimeMinutes: 4,
      seoTitle: 'Notes on Ghanaian Materiality — THE AMENA BRAND Journal',
      seoDescription: 'An editorial reflection on modern craftsmanship, light, and materiality in Accra, Ghana.'
    },
    {
      id: 'post-2',
      title: 'Behind the Scenes: Developing Collection 01',
      slug: 'behind-the-scenes-developing-collection-01',
      coverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
      author: 'Editorial Team',
      date: 'August 2026',
      category: 'Behind The Scenes',
      excerpt: 'A photographic glimpse into our sample fittings, drape experiments, and artisanal tailoring sessions in Accra.',
      bodyContent: `The development of Collection 01 began with a single question: How can everyday lifestyle pieces possess the quiet dignity of ceremonial regalia while maintaining complete comfort?

We began by draping yards of natural raw fabric on hand-built dress forms, studying how the shoulders fall when walking in the heat, and how deep pockets can be seamlessly integrated into minimalist silhouettes without disrupting lines.

Discover our visual process and the journey from paper sketches to the finished garments now available for custom orders.`,
      status: 'published',
      featured: false,
      readingTimeMinutes: 3,
      seoTitle: 'Behind the Scenes: Collection 01 — THE AMENA BRAND',
      seoDescription: 'Inside the Accra studio: drapery, fittings, and textile experiments for THE AMENA BRAND.'
    }
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'How do I place an order or inquire about a piece?',
      answer: 'You can directly tap "ENQUIRE ON WHATSAPP" on any product page, or message our dedicated team at 0579499223. We assist with size recommendations, fabric details, current production timelines, and personalized invoices.',
      category: 'Ordering & Inquiries',
      sortOrder: 1,
      status: 'published'
    },
    {
      id: 'faq-2',
      question: 'Do you offer made-to-measure / custom fittings?',
      answer: 'Yes. Most pieces in our collections can be tailored to your specific measurements. Share your height, bust/chest, waist, and hip dimensions via WhatsApp, and our studio will customize the fit.',
      category: 'Bespoke & Sizing',
      sortOrder: 2,
      status: 'published'
    },
    {
      id: 'faq-3',
      question: 'What is your turnaround time for bespoke creations?',
      answer: 'Ready-to-wear pieces ship within 24–48 hours across Ghana. Made-to-order and bespoke commissions typically require 7 to 14 business days to craft with pristine attention to detail.',
      category: 'Shipping & Delivery',
      sortOrder: 3,
      status: 'published'
    },
    {
      id: 'faq-4',
      question: 'Do you ship internationally outside Ghana?',
      answer: 'Yes. We ship worldwide via reputable international courier partners (DHL Express / FedEx). International delivery generally takes 4–6 business days once your piece is completed.',
      category: 'Shipping & Delivery',
      sortOrder: 4,
      status: 'published'
    },
    {
      id: 'faq-5',
      question: 'How do I care for my garments?',
      answer: 'Given our emphasis on natural fibers such as unbleached linens and woven cottons, we recommend gentle hand washing in cool water with mild eco-detergent, or professional dry cleaning. Avoid harsh machine tumble drying.',
      category: 'Care & Maintenance',
      sortOrder: 5,
      status: 'published'
    }
  ],
  services: [
    {
      id: 'srv-1',
      title: 'Bespoke Wardrobe & Event Studio',
      shortDescription: 'One-on-one garment creation tailored to your exact measurements and aesthetic vision.',
      fullDescription: 'From red carpet appearances and wedding ceremonies to signature executive wardrobe capsule pieces. We handle fabric sourcing, multiple toile fittings, and hand-stitched finishing.',
      deliverable: 'Custom bespoke garment, physical fitting sessions, fabric swatches',
      timeline: '2 to 3 weeks',
      status: 'published'
    },
    {
      id: 'srv-2',
      title: 'Creative Direction & Editorial Styling',
      shortDescription: 'Visual storytelling, editorial styling, and brand image consultation.',
      fullDescription: 'Leveraging THE AMENA BRAND’s distinctive aesthetic point of view for lookbooks, commercial campaigns, and private visual projects in Ghana and internationally.',
      deliverable: 'Moodboards, on-set styling, wardrobe curation, creative direction',
      timeline: 'Project-based',
      status: 'published'
    }
  ],
  about: {
    heroHeading: 'A Study in Form, Presence & Provenance',
    heroSubtitle: 'THE AMENA BRAND is a Ghanaian creative lifestyle and design house founded with an uncompromising dedication to modern elegance.',
    brandStory: `Born from a desire to redefine contemporary African lifestyle aesthetics, THE AMENA BRAND crafts pieces that honor tactile craftsmanship while celebrating minimalist restraint.

Based in Accra, Ghana, our studio draws inspiration from organic earth tones, architectural lines, and the quiet dignity of timeless tailoring. We do not participate in trend chasing; instead, we create enduring silhouettes that accompany you through life’s significant chapters.`,
    philosophyText: `We believe true elegance is quiet. It lives in the weight of a textile against your skin, the invisible precision of a seam, and the feeling of stepping into a room knowing your garment is both art and armor.`,
    experienceText: `Every client of THE AMENA BRAND is treated as a patron of craft. Whether engaging through our direct WhatsApp channel, ordering a ready-to-wear piece, or participating in bespoke fittings, the process is intimate, respectful, and attentive.`,
    founderNote: `[Founder statement / biography editable in the Admin Portal under About Page Management. Note: As per brand guidelines, authentic biographical details can be directly published here by the brand owner.]`,
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'Editorial composition showcasing THE AMENA BRAND craft',
    values: [
      {
        id: 'val-about-1',
        title: 'Artisanal Integrity',
        description: 'Supporting master artisans and independent textile weavers across Ghana with dignified remuneration and respectful timelines.'
      },
      {
        id: 'val-about-2',
        title: 'Quiet Luxury',
        description: 'No loud logos or manufactured urgency. The distinction comes from fit, fabric weight, and silhouette.'
      },
      {
        id: 'val-about-3',
        title: 'Authentic Dialogue',
        description: 'Direct relationships with every patron, offering real consultation on styling and longevity.'
      }
    ]
  },
  seo: {
    siteTitle: 'THE AMENA BRAND — Fine-Art Design & Wedding Studio',
    defaultDescription: 'Discover THE AMENA BRAND — an editorial creative house celebrating intentional craftsmanship, bespoke designs, and visual storytelling.',
    defaultSocialImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    canonicalBaseUrl: 'https://theamenabrand.com',
    robotsIndexingEnabled: true
  },
  enquiries: [
    {
      id: 'enq-1',
      name: 'Esi Mensah',
      email: 'esi.mensah@example.com',
      phone: '0244123456',
      subject: 'Private Studio Fitting - Saharan Linen Wrap Dress',
      message: 'Good day, I would like to schedule a private fitting in Accra for the Saharan Linen Wrap Dress in custom measurements.',
      status: 'NEW',
      date: '2025-02-15T10:30:00Z'
    },
    {
      id: 'enq-2',
      name: 'Kwame Osei',
      email: 'kwame.osei@example.com',
      phone: '0501987654',
      subject: 'Custom Order - Kente Trim Studio Blazer',
      message: 'Hello Amena Studio, I am looking to commission a bespoke studio blazer for an upcoming gala in March.',
      status: 'CONTACTED',
      date: '2025-02-10T14:15:00Z'
    }
  ]
};
