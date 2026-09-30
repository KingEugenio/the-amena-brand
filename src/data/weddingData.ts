export interface WeddingImage {
  src: string;
  alt: string;
  caption?: string;
  aspect?: string;
}

export interface FeaturedCouple {
  id: string;
  names: string;
  slug: string;
  location: string;
  date: string;
  headline: string;
  story: string;
  coverImage: string;
  images: {
    topSquare: string;
    tallVertical: string;
    bottomSquare: string;
    detailHorizontal: string;
  };
  fullGallery: WeddingImage[];
}

export interface WeddingPackage {
  id: string;
  name: string;
  tagline: string;
  price: string;
  popular?: boolean;
  hours: string;
  photographers: string;
  deliverables: string[];
  description: string;
}

export interface Testimonial {
  quote: string;
  couple: string;
  location: string;
  date: string;
}

export const weddingData = {
  settings: {
    brandName: 'THE AMENA BRAND',
    brandSubtitle: 'FINE-ART WEDDING & EDITORIAL STUDIO',
    tagline: 'Capturing Timeless Wedding Memories',
    topBannerText: '',
    topBannerLink: '/packages',
    email: 'hello@theamenabrand.com',
    phone: '+1 (415) 890-3420',
    whatsappNumber: '+14158903420',
    location: 'Florence • Paris • New York • Worldwide',
    instagramUrl: 'https://instagram.com/theamenabrand',
    twitterUrl: 'https://twitter.com/theamenabrand',
    facebookUrl: 'https://facebook.com/theamenabrand',
  },

  hero: {
    triptych: [
      {
        src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85',
        alt: 'Delicate bride holding organic garden rose bouquet with embroidered lace gown',
        caption: 'Bridal Florals & Heirloom Lace'
      },
      {
        src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85',
        alt: 'Bride and groom kissing under delicate veil before classical stone architecture',
        caption: 'The First Kiss Beneath the Veil'
      },
      {
        src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=85',
        alt: 'Bride in romantic gown holding lush wedding bouquet',
        caption: 'Quiet Anticipation'
      }
    ]
  },

  intro: {
    headline: 'Capturing Timeless Wedding Memories',
    text: 'We believe wedding photography should feel like poetry in motion—quiet whispers before the aisle, joyous tears caught in golden afternoon light, and timeless heirloom portraits crafted to be cherished for generations to come. Intentional, artful, and deeply devoted to your love story.',
    ctaText: 'VIEW PACKAGES',
    ctaLink: '/packages'
  },

  couples: [
    {
      id: 'laura-and-james',
      names: 'LAURA & JAMES',
      slug: 'laura-and-james',
      location: 'Big Sur Coastal Cliffs & Carmel Beach',
      date: 'September 24',
      headline: 'Effortless Coastal Romance & Intimate Golden Hour Vows',
      story: 'From their intimate oceanfront vows along the windswept coastline to barefoot dances under the evening stars, Laura and James celebrated their love with effortless romance and deep devotion. Every frame captured the gentle laughter, the tender glances, and the enduring warmth of their coastal celebration.',
      coverImage: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1000&q=85',
      images: {
        topSquare: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=85', // beach couple
        tallVertical: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=900&q=85', // groom holding bride overlooking sea
        bottomSquare: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=85', // couple on balcony smiling
        detailHorizontal: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=85' // bride holding dried bouquet & lace dress
      },
      fullGallery: [
        { src: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1400&q=85', alt: 'Laura & James coastal embrace' },
        { src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1400&q=85', alt: 'Walking along the Carmel sands' },
        { src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=85', alt: 'Balcony laughter in the afternoon breeze' },
        { src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1400&q=85', alt: 'Wild bridal bouquet close-up' },
        { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85', alt: 'Intimate vow reading' },
        { src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=85', alt: 'Veil portrait in sunset light' }
      ]
    },
    {
      id: 'maria-and-josh',
      names: 'MARIA & JOSH',
      slug: 'maria-and-josh',
      location: 'Cathedral of St. Augustine & Historic Villa',
      date: 'October 12',
      headline: 'Candlelit Cathedral Vows & Black-Tie Villa Splendor',
      story: 'Set against the timeless grandeur of cathedral stone arches and glowing candlelight, Maria and Josh pledged their lives to one another in an atmosphere of heartfelt reverence. Their celebration was a masterclass in classic elegance—filled with emotional vows, joyful toasts, and unforgettable midnight revelry.',
      coverImage: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1000&q=85',
      images: {
        topSquare: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=85', // couple laughing indoors
        tallVertical: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=900&q=85', // bride beaming with veil & bouquet
        bottomSquare: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&w=800&q=85', // couple strolling in meadow
        detailHorizontal: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&w=800&q=85' // hands entwined with wedding bands
      },
      fullGallery: [
        { src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1400&q=85', alt: 'Maria holding classical white rose bouquet' },
        { src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=85', alt: 'Josh whispering vows to Maria' },
        { src: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&w=1400&q=85', alt: 'Sunset stroll through olive groves' },
        { src: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&w=1400&q=85', alt: 'Clasped hands with gold wedding bands' },
        { src: 'https://images.unsplash.com/photo-1509927083803-4bd519298ac4?auto=format&fit=crop&w=1400&q=85', alt: 'Reception candlelit banquet table' },
        { src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1400&q=85', alt: 'First dance under starlight chandeliers' }
      ]
    }
  ] as FeaturedCouple[],

  packages: [
    {
      id: 'pkg-intimate',
      name: 'The Intimate Collection',
      tagline: 'For elopements, micro-weddings & weekday gatherings',
      price: '$3,400',
      hours: '6 Hours of Coverage',
      photographers: 'Lead Wedding Photographer',
      deliverables: [
        '6 Hours of thoughtful documentary & portrait coverage',
        'Lead photographer Amena Vance & creative assistant',
        '400+ Carefully color-graded, high-resolution photographs',
        'Private online viewing & download gallery for family & guests',
        'Full personal printing & sharing rights',
        'Custom wedding day timeline consultation',
        '48-Hour sneak peek preview (30 images)'
      ],
      description: 'Conceived for intimate celebrations where simplicity, closeness, and honest emotion take center stage without unnecessary rush.'
    },
    {
      id: 'pkg-heirloom',
      name: 'The Heirloom Collection',
      tagline: 'Our signature full-day celebration experience',
      price: '$4,800',
      popular: true,
      hours: '8-9 Hours of Coverage',
      photographers: 'Two Photographers (Lead + Experienced Second)',
      deliverables: [
        '8 to 9 Hours of comprehensive celebration coverage',
        'Two artists documenting simultaneous prep, ceremony & reception',
        'Complimentary 90-minute sunset engagement session',
        '700+ Artistically edited, high-resolution photographs',
        'Handcrafted 10x10 Fine Art Linen Heirloom Album (30 pages)',
        'Private online gallery with print store integration',
        'Full personal reproduction & printing rights',
        'Curated 48-Hour sneak peek delivered directly to your inbox'
      ],
      description: 'Our most beloved package, balancing documentary authenticity with fine art editorial portraits and a tangible heirloom album.'
    },
    {
      id: 'pkg-destination',
      name: 'The Grand Destination',
      tagline: 'Weekend celebrations, European villas & destination love stories',
      price: '$6,800',
      hours: 'Full Weekend Coverage (Rehearsal + 10h Wedding Day)',
      photographers: 'Two Lead Artists + Production Assistant',
      deliverables: [
        'Full weekend coverage: Rehearsal dinner & welcome drinks (3 hours)',
        'Full wedding day coverage up to 10 hours with two lead artists',
        'Hybrid digital & nostalgic 35mm analog film capture (5 rolls)',
        '950+ Signature edited photographs in digital & film formats',
        'Bespoke 12x12 Italian leather flush-mount heirloom album',
        'Two matching 8x8 parent keepsake albums',
        'Drone aerial venue & ceremony perspectives (venue permitting)',
        'Full travel & accommodation arrangements coordinated by our studio'
      ],
      description: 'The definitive wedding heirloom journey for couples hosting multi-day gatherings in breathtaking international destinations.'
    }
  ] as WeddingPackage[],

  portfolioCategories: [
    'All',
    'Ceremonies',
    'Portraits',
    'Coastal & Outdoor',
    'Details & Florals',
    'Receptions'
  ],

  portfolioItems: [
    {
      id: 'port-1',
      title: 'Laura & James Seaside Vows',
      category: 'Coastal & Outdoor',
      image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=85',
      couple: 'Laura & James',
      location: 'Carmel-by-the-Sea, California'
    },
    {
      id: 'port-2',
      title: 'Veil Kiss in Cathedral Courtyard',
      category: 'Ceremonies',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85',
      couple: 'Maria & Josh',
      location: 'St. Augustine Cloister'
    },
    {
      id: 'port-3',
      title: 'Garden Rose & Eucalyptus Bouquet',
      category: 'Details & Florals',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
      couple: 'Eleanor & Charles',
      location: 'Provence, France'
    },
    {
      id: 'port-4',
      title: 'Golden Hour Meadow Stroll',
      category: 'Portraits',
      image: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&w=1200&q=85',
      couple: 'Sophia & Alexander',
      location: 'Tuscan Countryside'
    },
    {
      id: 'port-5',
      title: 'Romantic Laced Bridal Gown',
      category: 'Details & Florals',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
      couple: 'Claire & Julian',
      location: 'Villa Balbianello, Lake Como'
    },
    {
      id: 'port-6',
      title: 'First Dance Under Twinkling Chandeliers',
      category: 'Receptions',
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=85',
      couple: 'Genevieve & Liam',
      location: 'Château de Villette'
    },
    {
      id: 'port-7',
      title: 'Sunlit Balcony Giggles',
      category: 'Portraits',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85',
      couple: 'Laura & James',
      location: 'Carmel Veranda'
    },
    {
      id: 'port-8',
      title: 'Clasped Hands & Heirloom Gold Bands',
      category: 'Details & Florals',
      image: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&w=1200&q=85',
      couple: 'Maria & Josh',
      location: 'Cathedral Terrace'
    },
    {
      id: 'port-9',
      title: 'Champagne Tower Toast',
      category: 'Receptions',
      image: 'https://images.unsplash.com/photo-1509927083803-4bd519298ac4?auto=format&fit=crop&w=1200&q=85',
      couple: 'Victoria & William',
      location: 'The Biltmore Estate'
    }
  ],

  testimonials: [
    {
      quote: 'Looking through our wedding gallery felt like reliving every tender heartbeat of our day. Amena captured glances we did not even realize were happening. She made us feel completely relaxed and natural, without any stiff posing.',
      couple: 'Laura & James',
      location: 'Carmel-by-the-Sea',
      date: 'Fall 2025'
    },
    {
      quote: 'From our cathedral ceremony to the high-energy dance floor, every image looks straight out of an editorial art book while feeling 100% authentic to us. Our heirloom album has become the centerpiece of our home.',
      couple: 'Maria & Josh',
      location: 'St. Augustine Cloister',
      date: 'Summer 2025'
    },
    {
      quote: 'The Amena Brand team possesses the rare gift of anticipating genuine human moments before they unfold. Their calm presence put our nervous families at ease and delivered photos that will outlive us all.',
      couple: 'Sophia & Alexander',
      location: 'Villa Medici, Tuscany',
      date: 'Spring 2025'
    }
  ] as Testimonial[],

  about: {
    title: 'About The Amena Brand',
    lead: 'Devoted to preserving quiet intimacy, honest celebration, and the beauty of two souls becoming family.',
    paragraphs: [
      'The Amena Brand is an international wedding and editorial photography studio known for an editorial documentary eye that balances candid feeling with effortless elegance. Led by founder and creative director Amena Vance, the studio approaches every wedding as a sacred historical document.',
      'Rather than orchestrating artificial moments or asking couples to hold rigid poses, our philosophy is grounded in calm observation and gentle guidance. We look for the unhurried sighs, the trembling fingers fastening pearl buttons, the joyful laughter during toasts, and the soft golden light that settles over your ceremony.',
      'We shoot a curated hybrid of high-resolution digital cameras and medium-format 35mm film, infusing your gallery with rich grain, creamy skin tones, and the enduring nostalgia that makes wedding photographs truly timeless.'
    ],
    press: [
      'Vogue Weddings',
      'Style Me Pretty',
      'Over The Moon',
      'Magnolia Rouge',
      'The Lane'
    ]
  },

  faqs: [
    {
      question: 'How would you describe your photographic style?',
      answer: 'Our style is an intentional blend of documentary storytelling and fine art editorial portraiture. We believe the most powerful wedding images are unforced: authentic emotion, candid joy, and gentle, flattering light. When it is time for portraits, we provide subtle, natural direction so you feel completely like yourselves rather than models.'
    },
    {
      question: 'How far in advance should we reserve our wedding date?',
      answer: 'We accept a limited number of 20 weddings per calendar year to ensure each couple receives our undivided dedication and rapid turnaround. Most couples book between 9 to 18 months in advance, particularly for peak spring and autumn dates.'
    },
    {
      question: 'Do you travel for destination weddings and elopements?',
      answer: 'Yes, approximately half of our weddings each year take place beyond our home base—across Europe, coastal California, the Pacific Northwest, and international destinations. All travel logistics are handled seamlessly by our studio.'
    },
    {
      question: 'When will we receive our wedding photographs?',
      answer: 'You will receive a curated 48-hour sneak peek of 30 to 50 highlight images within two days of your celebration so you can announce your marriage in style. Your complete, hand-edited gallery is delivered within 6 to 8 weeks.'
    },
    {
      question: 'Can we order custom heirloom albums and print keepsakes?',
      answer: 'Yes. We believe photographs were meant to be held. We design bespoke, flush-mount albums bound in archival Italian linens and buttery leathers, printed on museum-grade cotton rag paper designed to last for generations.'
    }
  ]
};
