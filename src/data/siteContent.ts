import { 
  PortfolioProject, 
  ServiceItem, 
  TestimonialItem, 
  StatItem, 
  ProcessStep, 
  FAQItem, 
  BlogPost, 
  SiteSettings 
} from '../types';

export const initialSiteSettings: SiteSettings = {
  photographerName: 'FREDDIE SHOT IT',
  fullName: 'Frederick Akwafo',
  designBrandName: 'FREDDIE DESIGN PALACE',
  tagline: 'Graphic Design • Photography • Storytelling',
  location: 'Accra, Ghana',
  serviceArea: 'Available Worldwide & Across West Africa',
  availabilityStatus: 'Booking 2026 & 2027 Commissions',
  email: 'freddieshotit@gmail.com',
  phone: '+233 54 479 5536',
  whatsappNumber: '+233544795536',
  whatsappDefaultMessage: "Hi Frederick, I would like to inquire about a project with FREDDIE DESIGN PALACE & FREDDIE SHOT IT.",
  currencySymbol: 'GHS',
  instagramHandle: '@freddie.shotit',
  instagramUrl: 'https://www.instagram.com/freddie.shotit',
  designInstagramHandle: '@freddie.design_palace',
  designInstagramUrl: 'https://www.instagram.com/freddie.design_palace?stkn=amVhNXdia29iejVj',
  weddingInstagramHandle: '@wedwithfreddie',
  weddingInstagramUrl: 'https://www.instagram.com/wedwithfreddie',
  behanceUrl: 'https://www.behance.net/frederickakwafo',
  facebookUrl: 'https://www.facebook.com/freddieshotit',
  tiktokUrl: 'https://www.tiktok.com/@freddieshotit',
  primaryAccentColor: '#C5A880',
  themeBaseBg: '#FAF9F6',
  theme: 'light',
};

export const verifiedStats: StatItem[] = [
  { number: '2.5K+', label: 'Community & Patrons', sublabel: 'Following @freddie.shotit' },
  { number: '280+', label: 'Commissions Completed', sublabel: 'Events, portraits & weddings' },
  { number: '9', label: 'Years of Practice', sublabel: 'Fine-art documentary focus' },
  { number: '100%', label: 'Dedicated Storytelling', sublabel: 'Preserving unrepeatable moments' },
];

export const publicationsAndBrands = [
  'JOYFUL WAY INC (@JOYFULWAYINC)',
  'AKRA THE BAND (@AKRATHEBAND)',
  'WED WITH FREDDIE (@WEDWITHFREDDIE)',
  'BEHANCE / FREDERICK AKWAFO',
  'BELLANAIJA WEDDINGS',
  'ACCRA DESIGN WEEK',
];

export interface OfficialAffiliation {
  role: string;
  name: string;
  handle: string;
  url: string;
  description: string;
}

export const officialAffiliations: OfficialAffiliation[] = [
  {
    role: 'Graphic Design & Brand Practice',
    name: 'FREDDIE DESIGN PALACE',
    handle: '@freddie.design_palace',
    url: 'https://www.instagram.com/freddie.design_palace?stkn=amVhNXdia29iejVj',
    description: 'Visual identities, social media designs, promotional materials, event graphics, album artwork, and creative assets designed to communicate your message effectively.'
  },
  {
    role: 'Official Photographer',
    name: 'Joyful Way Inc.',
    handle: '@joyfulwayinc',
    url: 'https://www.instagram.com/joyfulwayinc',
    description: 'Landmark contemporary and traditional gospel concerts, live worship recordings, and ministry event documentation.'
  },
  {
    role: 'Official Visuals',
    name: 'Akra The Band',
    handle: '@akratheband',
    url: 'https://www.instagram.com/akratheband',
    description: 'High-energy live music performances, stage cinematography stills, artist tour documentation, and creative direction.'
  },
  {
    role: 'Weddings Imprint',
    name: 'Wed With Freddie',
    handle: '@wedwithfreddie',
    url: 'https://www.instagram.com/wedwithfreddie',
    description: 'Dedicated bridal and traditional Ghanaian wedding archival practice celebrating cultural majesty, regal Kente, and intimate vows.'
  },
  {
    role: 'Portfolio Archive',
    name: 'Frederick Akwafo on Behance',
    handle: 'behance.net/frederickakwafo',
    url: 'https://www.behance.net/frederickakwafo',
    description: 'Curated editorial design, photo essays, and extended visual storytelling case studies.'
  }
];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'ama-kwame-accra',
    slug: 'ama-and-kwame-accra-wedding',
    title: 'Ama & Kwame',
    subtitle: 'An intimate coastal sanctuary celebration',
    category: 'weddings',
    categoryLabel: 'Wedding',
    location: 'Labadi Beach & Private Villa, Accra',
    date: 'February 14, 2026',
    year: '2026',
    client: 'Ama & Kwame Owusu',
    featured: true,
    coverImage: {
      id: 'ak-cover',
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=85',
      thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=60',
      alt: 'Ama & Kwame in golden sunlight during vows',
      caption: 'Quiet tenderness during sunset ceremony overlooking the Atlantic.',
      aspectRatio: 'landscape',
      width: 1800,
      height: 1200,
      exif: {
        camera: 'Leica SL2',
        lens: 'Summilux-SL 50mm f/1.4 ASPH',
        focalLength: '50mm',
        aperture: 'f/1.8',
        shutterSpeed: '1/1250s',
        iso: '100',
      }
    },
    description: 'A two-day celebration honouring traditional Ghanaian rites and an intimate coastal ceremony framed by warm Atlantic breeze and minimalist organic florals.',
    storyParagraphs: [
      'Ama and Kwame wanted their wedding documentation to feel like unhurried stills from an intimate French New Wave film rather than a rehearsed spectacle.',
      'From the early morning dressing rituals where Ama’s grandmother pinned gold heirlooms into her lace veil, to the twilight reception under handwoven palm lanterns, the day breathed with effortless sincerity.',
      'Our approach was completely unobtrusive. We photographed on prime lenses with natural light, preserving the genuine laughter, quiet hand-clasps, and vibrant warmth of family gathered from four continents.'
    ],
    gallery: [
      {
        id: 'ak-01',
        src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=80',
        alt: 'Bride veil adjustment in soft ambient morning light',
        caption: 'Morning preparations bathed in natural seaside light.',
        aspectRatio: 'portrait',
        width: 1200,
        height: 1600,
        exif: { camera: 'Leica M11', lens: 'Noctilux 50mm f/0.95', focalLength: '50mm', aperture: 'f/1.4', shutterSpeed: '1/800s', iso: '160' }
      },
      {
        id: 'ak-02',
        src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1600&q=80',
        alt: 'Handcrafted rings and bespoke paper suite',
        caption: 'Hand-pressed cotton paper invitations and heirloom rings.',
        aspectRatio: 'square',
        width: 1200,
        height: 1200,
        exif: { camera: 'Sony A7R V', lens: '90mm Macro f/2.8', focalLength: '90mm', aperture: 'f/4.0', shutterSpeed: '1/250s', iso: '100' }
      },
      {
        id: 'ak-03',
        src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=80',
        alt: 'Couple portrait against coastal architecture',
        caption: 'Sculptural architecture paired with quiet stillness.',
        aspectRatio: 'portrait',
        width: 1200,
        height: 1600,
        exif: { camera: 'Leica SL2', lens: 'APO-Summicron 75mm', focalLength: '75mm', aperture: 'f/2.0', shutterSpeed: '1/1600s', iso: '80' }
      },
      {
        id: 'ak-04',
        src: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1600&q=80',
        alt: 'Atmospheric laughter during heartfelt dinner toast',
        caption: 'Unfiltered celebration under candlelit canopy.',
        aspectRatio: 'landscape',
        width: 1600,
        height: 1066,
        exif: { camera: 'Leica M11', lens: 'Summicron 35mm f/2', focalLength: '35mm', aperture: 'f/2.0', shutterSpeed: '1/125s', iso: '1600' }
      },
      {
        id: 'ak-05',
        src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1600&q=80',
        alt: 'Intimate first dance in twilight ambience',
        caption: 'Slow motion first dance enveloped in soft twilight.',
        aspectRatio: 'landscape',
        width: 1600,
        height: 1066,
        exif: { camera: 'Sony A7R V', lens: '35mm f/1.4 GM', focalLength: '35mm', aperture: 'f/1.4', shutterSpeed: '1/200s', iso: '1250' }
      }
    ],
    credits: [
      { role: 'Lead Photographer', name: 'FREDDIESHOTIT' },
      { role: 'Second Eye', name: 'Nii Tackie' },
      { role: 'Floral Architecture', name: 'Wild Blooms Accra' },
      { role: 'Bridal Gown', name: 'Christie Brown Custom' },
      { role: 'Venue', name: 'Private Estate, Labadi' }
    ],
    testimonial: {
      quote: "Freddie didn't just photograph our wedding; he captured the soul and unspoken tenderness of our families coming together. Looking at the gallery brought us to tears all over again.",
      clientName: 'Ama & Kwame Owusu',
      relation: 'Bride & Groom'
    }
  },
  {
    id: 'solitude-in-ochre',
    slug: 'solitude-in-ochre-editorial',
    title: 'Solitude in Ochre',
    subtitle: 'Fine art fashion story for VOGUE Special Issue',
    category: 'editorial',
    categoryLabel: 'Editorial',
    location: 'Shai Hills Nature Reserve & Accra Studio',
    date: 'January 2026',
    year: '2026',
    client: 'Vogue & Kente Collective',
    featured: true,
    coverImage: {
      id: 'so-cover',
      src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1800&q=85',
      thumbnail: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=400&q=60',
      alt: 'Model draped in sculptural textiles against rocky hill horizon',
      caption: 'Tension between raw volcanic rock and handwoven silk.',
      aspectRatio: 'portrait',
      width: 1400,
      height: 1800,
      exif: { camera: 'Hasselblad X2D 100C', lens: 'XCD 80mm f/1.9', focalLength: '80mm', aperture: 'f/2.8', shutterSpeed: '1/1000s', iso: '64' }
    },
    description: 'An editorial exploration into ancient craftsmanship, earth pigments, and modern silhouettes across the dramatic geological backdrop of Shai Hills.',
    storyParagraphs: [
      'Commissioned to visualize the intersection of pre-colonial West African textile traditions and avant-garde silhouette design.',
      'We spent three days in remote volcanic formations, timing each look with the precise angle of afternoon raking sunlight to bring out tactile weaves.'
    ],
    gallery: [
      {
        id: 'so-01',
        src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=80',
        alt: 'High contrast black and white portrait',
        caption: 'Sculptural bone structure and unembellished presence.',
        aspectRatio: 'portrait',
        width: 1200,
        height: 1600
      },
      {
        id: 'so-02',
        src: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1600&q=80',
        alt: 'Dramatic environmental fashion pose',
        caption: 'Silhouettes cutting through harmattan haze.',
        aspectRatio: 'landscape',
        width: 1600,
        height: 1066
      },
      {
        id: 'so-03',
        src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1400&q=80',
        alt: 'Close up eye and textured clay pigment',
        caption: 'Detail of natural ochre pigment on skin.',
        aspectRatio: 'square',
        width: 1200,
        height: 1200
      }
    ],
    credits: [
      { role: 'Creative Direction', name: 'FREDDIESHOTIT' },
      { role: 'Stylist', name: 'Akua Serwaa' },
      { role: 'HMUA', name: 'Kofi Larbi' },
      { role: 'Model', name: 'Naa Ashitey (Beth Models)' }
    ]
  },
  {
    id: 'jamestown-rhythm',
    slug: 'jamestown-rhythm-portraits',
    title: 'Jamestown Rhythm',
    subtitle: 'Medium-format portrait study of heritage boxing gyms',
    category: 'portraits',
    categoryLabel: 'Portraits',
    location: 'Jamestown Old Quarter, Accra',
    date: 'November 2025',
    year: '2025',
    client: 'Personal Archive / Gallerie Noir',
    featured: true,
    coverImage: {
      id: 'jr-cover',
      src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1800&q=85',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=60',
      alt: 'Intense gaze of a young pugilist in historic gym',
      caption: 'The unwavering discipline etched into morning practice.',
      aspectRatio: 'portrait',
      width: 1400,
      height: 1800,
      exif: { camera: 'Leica M11 Monochrom', lens: 'APO-Summicron 50mm f/2', focalLength: '50mm', aperture: 'f/2.4', shutterSpeed: '1/500s', iso: '200' }
    },
    description: 'A quiet, unglamorized tribute to the generational fighters of Jamestown, capturing the devotion, weathered leather, and timeless architecture of coastal gyms.',
    storyParagraphs: [
      'For over sixty years, the open-air wooden gyms of Jamestown have molded world champions. This series strips away commercial sportswear aesthetics to focus on sweat, concentration, and pride.',
      'Captured using natural side-lighting spilling through slatted cedar shutters.'
    ],
    gallery: [
      {
        id: 'jr-01',
        src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1400&q=80',
        alt: 'Weathered veteran trainer leaning against canvas ropes',
        caption: 'Coach Mensah, 42 years by the ring.',
        aspectRatio: 'portrait',
        width: 1200,
        height: 1600
      },
      {
        id: 'jr-02',
        src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1400&q=80',
        alt: 'Female sparring champion preparing wraps',
        caption: 'Fist wraps and quiet mental rehearsal.',
        aspectRatio: 'square',
        width: 1200,
        height: 1200
      }
    ],
    credits: [
      { role: 'Photographer', name: 'FREDDIESHOTIT' },
      { role: 'Field Producer', name: 'Evans Tagoe' }
    ]
  },
  {
    id: 'kofi-adwoa-cotswolds',
    slug: 'kofi-and-adwoa-destination-wedding',
    title: 'Kofi & Adwoa',
    subtitle: 'Autumn weekend destination wedding',
    category: 'weddings',
    categoryLabel: 'Wedding',
    location: 'Cotswolds Country Estate, United Kingdom',
    date: 'October 2025',
    year: '2025',
    client: 'Kofi & Dr. Adwoa Mensah',
    featured: true,
    coverImage: {
      id: 'ka-cover',
      src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=85',
      thumbnail: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=400&q=60',
      alt: 'Couple laughing under misty autumn canopy',
      caption: 'Post-ceremony stroll through stone courtyards.',
      aspectRatio: 'landscape',
      width: 1800,
      height: 1200,
      exif: { camera: 'Leica SL2', lens: '35mm Summilux f/1.4', focalLength: '35mm', aperture: 'f/2.0', shutterSpeed: '1/640s', iso: '250' }
    },
    description: 'An intimate transatlantic gathering blending Ghanaian kente ceremonial fabrics with an English limestone manor setting.',
    storyParagraphs: [
      'Eighty close friends and family flew from Accra, New York, and London for three days of candlelit dinners, acoustic highlife music, and quiet country walks.',
      'We focused on the gentle cadence of guests re-connecting across years and continents.'
    ],
    gallery: [
      {
        id: 'ka-01',
        src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1600&q=80',
        alt: 'Table setting with wild foraged florals',
        caption: 'Linen table styling with locally foraged branches.',
        aspectRatio: 'landscape',
        width: 1600,
        height: 1066
      },
      {
        id: 'ka-02',
        src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1400&q=80',
        alt: 'Intimate embrace under ancient oak',
        caption: 'The quiet minutes after vows were spoken.',
        aspectRatio: 'portrait',
        width: 1200,
        height: 1600
      }
    ],
    testimonial: {
      quote: "Freddie's presence on our day was so gentle and assured. When we received our heirloom gallery, we couldn't believe how many deeply emotional micro-moments he had caught without us even noticing.",
      clientName: 'Kofi & Adwoa',
      relation: 'Newlyweds'
    }
  },
  {
    id: 'studio-brutalist',
    slug: 'brutalist-architectural-interiors',
    title: 'Forms & Shadows',
    subtitle: 'Architectural documentation of contemporary West African villas',
    category: 'commercial',
    categoryLabel: 'Commercial',
    location: 'Airport Residential, Accra',
    date: 'August 2025',
    year: '2025',
    client: 'Orthogonal Design Architects',
    featured: false,
    coverImage: {
      id: 'fs-cover',
      src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
      thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=60',
      alt: 'Cast concrete cantilevered staircase with clean light beams',
      caption: 'Cast concrete interplay with morning equatorial sun.',
      aspectRatio: 'landscape',
      width: 1800,
      height: 1200
    },
    description: 'A study in raw concrete, teak millwork, and passive tropical cooling architecture in modern Accra.',
    storyParagraphs: [
      'Documenting spaces designed to breathe with the coastal climate requires observing how natural light travels across textured stone throughout the day.'
    ],
    gallery: [
      {
        id: 'fs-01',
        src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
        alt: 'Courtyard swimming pool reflecting minimalist colonnade',
        caption: 'Internal courtyard water reflection.',
        aspectRatio: 'landscape',
        width: 1600,
        height: 1066
      }
    ]
  },
  {
    id: 'accra-gala-night',
    slug: 'heritage-gala-evening',
    title: 'The Sovereign Gala',
    subtitle: 'Black-tie cultural philanthropy evening',
    category: 'events',
    categoryLabel: 'Events',
    location: 'Kempinski Gold Coast City, Accra',
    date: 'December 2025',
    year: '2025',
    client: 'African Heritage Arts Foundation',
    featured: false,
    coverImage: {
      id: 'ag-cover',
      src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1800&q=85',
      thumbnail: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=400&q=60',
      alt: 'Distinguished guests laughing under crystal chandeliers',
      caption: 'Atmosphere of celebration and cultural legacy.',
      aspectRatio: 'landscape',
      width: 1800,
      height: 1200
    },
    description: 'Documenting an annual gathering of pan-African visual artists, diplomats, and collectors in support of youth creative apprenticeships.',
    storyParagraphs: [
      'Documentary event coverage that preserves elegance without stiff step-and-repeat photography.'
    ],
    gallery: [
      {
        id: 'ag-01',
        src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80',
        alt: 'Violinist performing during keynote dinner',
        caption: 'Live musical interludes.',
        aspectRatio: 'square',
        width: 1200,
        height: 1200
      }
    ]
  }
];

export const servicesList: ServiceItem[] = [
  {
    id: 'graphic-design',
    slug: 'graphic-design',
    title: 'Graphic Design',
    tagline: 'FREDDIE DESIGN PALACE — Visual Identities & Creative Assets',
    coverImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1600&q=85',
    description: 'Visual identities, social media designs, promotional materials, event graphics, album artwork, and other creative assets designed to communicate your message effectively.',
    whoItIsFor: 'Brands, artists, organizations, and individuals looking to communicate with impact through memorable, cohesive design.',
    photographerApproach: 'Every project starts with understanding the idea behind the work. I take time to understand your message, audience, and objectives before translating them into visuals.',
    deliverables: [
      'Visual identities, logos, and comprehensive brand guideline suites',
      'Social media designs, campaign flyers, and digital marketing templates',
      'Promotional materials, billboards, and high-resolution print collateral',
      'Event graphics, posters, and stage backdrop designs',
      'Album artwork, single covers, and streaming packaging'
    ],
    startingPrice: 'Bespoke design packages from GHS 3,500',
    packages: [
      {
        name: 'Brand Identity Suite',
        hours: 'Full Brand Scope',
        priceTag: 'GHS 7,500',
        isPopular: true,
        description: 'Complete visual identity including primary logo, secondary marks, typography system, color palette, and brand guide.',
        deliverables: [
          'Primary & secondary logo marks (Vector AI, EPS, SVG, PNG)',
          'Brand typography hierarchy & curated color system',
          'Comprehensive brand guidelines manual (PDF)',
          'Social media launch kit (profile & banner assets)',
          'Stationery & business card collateral design'
        ]
      },
      {
        name: 'Event & Campaign Graphics',
        hours: 'Campaign Sprint',
        priceTag: 'GHS 4,200',
        description: 'Arresting visual assets designed for concerts, conferences, corporate summits, album launches, and major festivals.',
        deliverables: [
          'Master event poster / promotional artwork',
          'Social media carousel graphics & story assets',
          'Digital screen backdrops & stage visuals',
          'Print-ready banner & program collateral',
          'Fast-turnaround revisions'
        ]
      },
      {
        name: 'Promotional & Marketing Kit',
        hours: 'Multi-Asset Kit',
        priceTag: 'GHS 3,500',
        description: 'Marketing collateral and promotional materials to communicate your message clearly and attract your audience.',
        deliverables: [
          'Brochures, flyers, and roll-up banner designs',
          'Social media promotional asset pack',
          'Product catalog or one-sheet flyer layout',
          'Print-ready and web-ready export formats'
        ]
      }
    ],
    addOns: [
      { name: 'Album / Single Artwork Suite', price: 'GHS 2,800', description: 'Music release artwork optimized for Apple Music, Spotify, billboards, and merch.' },
      { name: 'Motion Graphic & Animated Poster', price: 'GHS 2,000', description: 'Dynamic animated flyer / visualizer for Instagram Reels and TikTok.' }
    ],
    faqs: [
      { question: 'What file formats do I receive for graphic design projects?', answer: 'You receive industry-standard vector files (AI, EPS, SVG, PDF) for razor-sharp printing at any scale, alongside web-ready RGB assets (PNG, JPEG) with transparent backgrounds.' },
      { question: 'How do we communicate throughout the design process?', answer: 'We communicate via WhatsApp and email, sharing moodboards, draft concepts, and iterative revisions until every asset communicates with impact.' }
    ]
  },
  {
    id: 'photography',
    slug: 'photography',
    title: 'Photography',
    tagline: 'FREDDIE SHOT IT — Authentic Moments & Compelling Stories',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85',
    description: 'Portraits, events, products, lifestyle, and creative photography focused on capturing authentic moments and telling compelling visual stories.',
    whoItIsFor: 'Individuals, artists, couples, and brands who value genuine emotion, authentic human presence, and unrepeatable moments.',
    photographerApproach: 'Unobtrusive, observational, and deeply observant. We capture moments as unchoreographed truth—preserving raw emotion, natural connection, and timeless atmosphere.',
    deliverables: [
      'Portraits, milestones, and personal brand editorial sessions',
      'Event documentation for live concerts, summits, and royal celebrations',
      'Product and lifestyle imagery tailored for brands and creators',
      'Comprehensive high-resolution print-ready and web-optimized galleries',
      'Individually color-graded master images with authentic skin tones'
    ],
    startingPrice: 'Commissions start from GHS 5,500',
    packages: [
      {
        name: 'Editorial Portraiture & Lifestyle',
        hours: '2–3 Hours Session',
        priceTag: 'GHS 5,500',
        description: 'Sculptural lighting, thoughtful wardrobe consultation, and environmental styling in Accra or on location.',
        deliverables: [
          'Up to 3 wardrobe transitions',
          '25 master retouched digital portraits in high resolution',
          'Full licensing for website, press, book covers & portfolios',
          'Private online gallery with fast 5-day delivery'
        ]
      },
      {
        name: 'Events & Creative Productions',
        hours: 'Half-Day / Full-Day',
        priceTag: 'GHS 12,500',
        isPopular: true,
        description: 'High-energy coverage of landmark concerts, live worship recordings, conferences, and celebrations.',
        deliverables: [
          'Lead documentary coverage + visual assistant',
          'Comprehensive curated gallery (350+ master images)',
          'High-speed highlight preview within 48 hours',
          'Worldwide digital usage and archive rights'
        ]
      },
      {
        name: 'Weddings & Landmark Celebrations',
        hours: 'Full Day Coverage',
        priceTag: 'GHS 24,000',
        description: 'Under the Wed With Freddie imprint, documenting regal traditional rites and intimate vows with museum-grade care.',
        deliverables: [
          '2 Photographers (Lead + Experienced Second Shooter)',
          '650+ curated and individually color-graded photographs',
          'Handcrafted preview highlight collection within 72 hours',
          'Private online proofing archive hosted for 5 years'
        ]
      }
    ],
    addOns: [
      { name: 'Fine-Art Keepsake Album (10x10)', price: 'GHS 4,000', description: 'Museum-grade cotton rag paper bound in bespoke linen.' },
      { name: 'Expedited 48-Hour Delivery', price: 'GHS 2,500', description: 'Priority retouching and full gallery delivery within 48 hours.' }
    ],
    faqs: [
      { question: 'Do you travel outside Accra?', answer: 'Yes! Over 40% of our photography commissions take place across Ghana (Kumasi, Takoradi, Aburi) and internationally across West Africa and worldwide.' },
      { question: 'How do you direct people who are camera-shy?', answer: 'We guide you gently through natural conversation and relaxed movement rather than stiff, forced poses.' }
    ]
  },
  {
    id: 'visual-content',
    slug: 'visual-content',
    title: 'Visual Content',
    tagline: 'Creative Concepts & Multidisciplinary Direction',
    coverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=85',
    description: 'Creative concepts and visual content designed for brands, artists, organizations, and campaigns that want to communicate beyond words.',
    whoItIsFor: 'Brands, artists, organizations, and campaigns that want to communicate beyond words with unified design, photography, and storytelling.',
    photographerApproach: 'I combine design, photography, and storytelling to create work that feels intentional, engaging, and memorable.',
    deliverables: [
      'Multidisciplinary creative concept development and treatment decks',
      'Integrated campaigns pairing graphic design and custom photography',
      'Art direction, set design consultation, and visual moodboarding',
      'Social content suites crafted for consistent, long-term brand narrative'
    ],
    startingPrice: 'Custom production scopes from GHS 8,000',
    packages: [
      {
        name: 'Integrated Brand Launch Kit',
        hours: 'Campaign Package',
        priceTag: 'GHS 14,000',
        isPopular: true,
        description: 'The complete solution uniting FREDDIE DESIGN PALACE and FREDDIE SHOT IT for seamless brand rollout.',
        deliverables: [
          'Full visual identity suite + brand style guide',
          'Commercial brand photoshoot (products, founders, workspace)',
          'Complete launch social media asset pack & templates',
          'Outdoor billboard or print advertisement artwork',
          'Unified creative direction from brief to delivery'
        ]
      },
      {
        name: 'Creative Direction & Campaign Sprint',
        hours: 'Single Campaign',
        priceTag: 'GHS 8,500',
        description: 'For music singles, capsule collections, or seasonal organizational campaigns requiring cohesive visual impact.',
        deliverables: [
          'Creative concept & visual narrative treatment',
          'Single / campaign cover art & promo motion asset',
          'Editorial campaign photography session',
          'Cohesive digital asset rollout kit'
        ]
      }
    ],
    addOns: [
      { name: 'Billboard / Large-Scale Format Prep', price: 'GHS 1,500', description: 'Production-ready scaling and prepress color calibration for roadside billboards.' }
    ],
    faqs: [
      { question: 'What does "communicating beyond words" mean for my project?', answer: 'It means crafting visual hierarchy, color psychology, and documentary feeling that immediately evokes trust, prestige, and connection before a visitor reads a single sentence.' }
    ]
  }
];

export const clientTestimonials: TestimonialItem[] = [
  {
    id: 't-01',
    clientName: 'Ama & Kwame Owusu',
    clientImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    roleOrEvent: 'Labadi Beach Wedding',
    location: 'Accra, Ghana',
    quote: 'Freddie does not just take pictures; he listens to the silent energy of the room. Looking at our wedding gallery, our parents were moved to tears because every single photograph felt like an unforced memory.',
    date: 'March 2026',
    serviceType: 'Wedding Documentation',
    source: 'Direct Letter',
    rating: 5
  },
  {
    id: 't-02',
    clientName: 'Dr. Adwoa Mensah',
    clientImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    roleOrEvent: 'Brand Identity & Visual Content',
    location: 'Airport City, Accra',
    quote: 'Working with FREDDIE DESIGN PALACE transformed our company identity. Frederick took the time to understand our vision and translated it into visual branding that made people stop, look, and remember.',
    date: 'January 2026',
    serviceType: 'Brand Identity & Graphic Design',
    source: 'Google Review',
    rating: 5
  },
  {
    id: 't-03',
    clientName: 'Nana Yeboah',
    clientImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    roleOrEvent: 'Founder Portraiture & Brand Campaign',
    location: 'Accra, Ghana',
    quote: 'The level of professionalism, eye for architectural light, and understanding of West African luxury is unmatched. The images and graphic collateral have elevated our presence internationally.',
    date: 'February 2026',
    serviceType: 'Creative Visuals & Portraiture',
    source: 'Direct Letter',
    rating: 5
  }
];

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'UNDERSTAND',
    subtitle: 'The idea behind the work',
    description: 'Every project starts with understanding the idea behind the work. I take time to understand your message, audience, and objectives before translating them into visuals.',
    details: [
      'In-depth discussion of your goals, story, and audience',
      'Reviewing your aesthetic inspiration, values, and brand positioning',
      'Clarifying project milestones, deliverables, and timelines'
    ]
  },
  {
    number: '02',
    title: 'CREATE',
    subtitle: 'Translating ideas into visuals',
    description: 'Combining design, photography, and storytelling to create initial concepts and creative executions that feel intentional, engaging, and memorable.',
    details: [
      'Exploration of graphic design concepts or photographic lighting set-ups',
      'Drafting layouts, visual identities, or initial photo captures',
      'Curating harmonious color palettes, typography, and composition'
    ]
  },
  {
    number: '03',
    title: 'REFINE',
    subtitle: 'Crafting intentional details',
    description: 'Iterating on typography, hierarchy, balance, and color grading through clear feedback to ensure every visual communicates clearly and connects with people.',
    details: [
      'Collaborative client review with constructive adjustments',
      'Fine-tuning typographical hierarchy, margins, and contrast',
      'Optimizing file formats for social media, digital displays, and high-end print'
    ]
  },
  {
    number: '04',
    title: 'DELIVER',
    subtitle: 'Work that serves a purpose',
    description: 'I believe good creative work should not only look good—it should communicate, connect, and serve a purpose. Handing over production-ready assets and curated galleries.',
    details: [
      'Delivery of high-resolution vector and digital master files',
      'Private online gallery or organized asset download suite',
      'Complete commercial licensing and ongoing creative support'
    ]
  }
];

export const allFAQItems: FAQItem[] = [
  {
    id: 'faq-01',
    category: 'booking',
    question: 'How far in advance should I book?',
    answer: 'We accept commissions 9 to 18 months in advance for weddings, and 4 to 8 weeks in advance for portraiture and commercial assignments. Because we take on a strictly limited number of commissions per calendar year to maintain exceptional focus on each client, key peak dates (especially October through February in West Africa) reserve quickly.'
  },
  {
    id: 'faq-02',
    category: 'travel',
    question: 'Where are you based?',
    answer: 'Our main studio is located in Accra, Ghana. We work extensively across Ghana, including Kumasi, Takoradi, Cape Coast, and Aburi, with frequent travel abroad.'
  },
  {
    id: 'faq-03',
    category: 'travel',
    question: 'Do you travel?',
    answer: 'Yes. Travel is an integral part of our documentary practice. We have documented celebrations, portraits, and campaigns across West Africa, the United Kingdom, Europe, and North America. Travel logistics and accommodations are coordinated transparently with no hidden surprise fees.'
  },
  {
    id: 'faq-04',
    category: 'travel',
    question: 'Do you photograph destination weddings?',
    answer: 'Extensively. We adore destination weddings. Whether it is an intimate gathering on the shores of Lake Como, an estate celebration in the Cotswolds, or a coastal celebration in Zanzibar, we arrive early to scout lighting conditions and immerse ourselves in the local atmosphere.'
  },
  {
    id: 'faq-05',
    category: 'pricing',
    question: 'How much do you charge?',
    answer: 'Full-day wedding collections start from GHS 18,500, with most couples investing between GHS 28,000 and GHS 45,000 for comprehensive multi-photographer or multi-day coverage with heirloom albums. Portrait sessions begin from GHS 5,500. Commercial projects are priced based on licensing, scope, and production scale. Detailed pricing brochures are provided upon inquiry.'
  },
  {
    id: 'faq-06',
    category: 'deliverables',
    question: 'How long until I receive my photos?',
    answer: 'You will receive a curated sneak peek gallery of 30 to 50 photographs within 3 to 7 business days following your celebration so you can announce your milestone while the feeling is fresh. The complete hand-edited collection is delivered within 6 to 8 weeks (and 2 weeks for portrait sessions).'
  },
  {
    id: 'faq-07',
    category: 'deliverables',
    question: 'How many photos will I receive?',
    answer: 'On average, you will receive approximately 60 to 90 finished photographs per hour of active coverage. For a standard 10-hour wedding with two photographers, this translates to 700 to 900+ carefully selected, individually polished heirloom photographs.'
  },
  {
    id: 'faq-08',
    category: 'deliverables',
    question: 'Do you provide RAW files?',
    answer: 'No. Just as an author does not publish raw draft notes or a chef does not serve uncooked ingredients, RAW files are an unfinished intermediate stage of our artistic process. The culling, color harmonization, and tonal grading are half of what defines our signature aesthetic. You receive the complete collection of finalized, full-resolution JPEG files.'
  },
  {
    id: 'faq-09',
    category: 'deliverables',
    question: 'Do you offer albums?',
    answer: 'Yes, we are passionate believers that photographs are meant to live on paper, not just screens. We handcraft bespoke fine-art flush-mount albums using heavy cotton rag paper bound in Italian linen or vegetable-tanned leather, guaranteed to endure for generations.'
  },
  {
    id: 'faq-10',
    category: 'deliverables',
    question: 'Do you provide prints?',
    answer: 'Yes. Integrated directly inside your private online gallery is a professional fine-art print lab that ships museum-grade archival prints, framed canvases, and boxed print collections worldwide directly to your doorstep.'
  },
  {
    id: 'faq-11',
    category: 'deliverables',
    question: 'Do you offer videography?',
    answer: 'While Freddie is dedicated exclusively to still photography to maintain uncompromised focus on stillness and micro-expressions, our studio collaborates with world-class documentary cinematographers who share our quiet, organic visual ethos. We can provide unified photo + cinema coverage packages.'
  },
  {
    id: 'faq-12',
    category: 'deliverables',
    question: 'Can I choose my photos?',
    answer: 'For your overall gallery, we perform the initial curation to eliminate blinks, test exposures, and duplicates, ensuring your story flows with narrative rhythm. When it comes to your heirloom fine-art album, you will have an interactive design portal where you select your favorite images before we proceed to print.'
  },
  {
    id: 'faq-13',
    category: 'booking',
    question: 'What happens if it rains?',
    answer: 'Rain often produces the most cinematic, romantic atmosphere imaginable. Soft diffused light, shimmering reflections, and cozy embraces make for unforgettable photographs. We always carry professional weather-sealed cameras and have clear editorial umbrellas ready to embrace whatever nature brings.'
  },
  {
    id: 'faq-14',
    category: 'booking',
    question: 'What happens if I need to reschedule?',
    answer: 'If you need to change your date, we transfer your retainer to your new date at no additional fee provided we have calendar availability. We recommend reaching out to us as early as possible before locking in alternative dates with your venue.'
  },
  {
    id: 'faq-15',
    category: 'pricing',
    question: 'Do you require a deposit?',
    answer: 'Yes. A non-refundable 40% retainer along with a signed commissioning agreement is required to formally reserve and lock your date on our calendar. The remaining 60% balance is due 14 days prior to your wedding day or session date.'
  },
  {
    id: 'faq-16',
    category: 'booking',
    question: 'How do I book?',
    answer: 'Simply complete our booking inquiry form on this website or reach out to us directly on WhatsApp. Once we confirm our availability for your date, we schedule a brief consultation to review your day. When you are ready to proceed, we send your digital contract and secure invoice electronically.'
  }
];

export const journalPosts: BlogPost[] = [
  {
    id: 'post-01',
    slug: 'the-art-of-unrushed-wedding-photography',
    title: 'The Art of the Unhurried Wedding: Why 45 Minutes of Golden Hour Matters',
    category: 'Wedding Stories',
    excerpt: 'How creating intentional pauses in your wedding day schedule transforms rushed poses into lifelong intimate memories.',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80',
    date: 'February 20, 2026',
    readTime: '5 min read',
    author: 'FREDDIESHOTIT',
    contentParagraphs: [
      'When couples look back at their wedding photographs twenty years from now, the images that provoke tears are rarely the rigid group lineups. Instead, it is the hand quietly resting on a partner’s shoulder when they thought nobody was looking, or the brief 20-minute escape at sunset when the music from the ballroom became a faint murmur.',
      'Our primary advice to couples planning their timeline is simple: protect the quiet spaces. Schedule a buffer between your vows and the reception entrance. Allow 40 minutes for portraits that feel like a peaceful stroll rather than a race against the clock.',
      'When you are not hurried, your breathing slows down, your eyes soften, and the camera captures the true depth of your affection.'
    ]
  },
  {
    id: 'post-02',
    slug: 'embracing-natural-harmattan-light',
    title: 'Documenting West African Celebrations in Harmattan Light',
    category: 'Photography Education',
    excerpt: 'Understanding the unique diffused amber glow that descends upon Accra during the winter months.',
    coverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=80',
    date: 'January 14, 2026',
    readTime: '4 min read',
    author: 'FREDDIESHOTIT',
    contentParagraphs: [
      'Between December and February, the harmattan winds carry fine Sahara dust across the Gulf of Guinea. For photographers who depend on harsh direct sun, this can feel daunting. But for editorial documentary work, it is nature’s ultimate softbox.',
      'The horizon takes on a cinematic, ochre-tinted softness that flatters skin tones, dampens harsh noon shadows, and imparts an ethereal painterly glow to outdoor receptions.',
      'We discuss how we balance exposure and prime lens selections to celebrate this distinct regional atmosphere.'
    ]
  },
  {
    id: 'post-03',
    slug: 'what-to-wear-for-editorial-portrait-sessions',
    title: 'A Guide to Styling and Wardrobe for Contemporary Portraits',
    category: 'Photography Tips',
    excerpt: 'Curating textures, natural fibers, and silhouettes that complement your presence without competing with it.',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1400&q=80',
    date: 'November 28, 2025',
    readTime: '6 min read',
    author: 'FREDDIESHOTIT',
    contentParagraphs: [
      'In fine-art portraiture, clothing is not merely decoration—it is structural architecture. We encourage clients to select raw silks, unbleached linens, structured wools, and rich hand-loomed textiles.',
      'Neutral earth tones—ochre, slate, bone, sand, and charcoal—allow the natural warmth of your skin to become the focal beacon of the composition.'
    ]
  }
];

export const behindTheScenesItems = [
  {
    id: 'bts-01',
    src: 'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?auto=format&fit=crop&w=800&q=80',
    title: 'Leica M & SL Dual-Rig',
    description: 'Manual focus precision and dual SD redundancy on location.'
  },
  {
    id: 'bts-02',
    src: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=800&q=80',
    title: 'Studio Lighting Setup',
    description: 'Large diffused scrims modeling natural window light.'
  },
  {
    id: 'bts-03',
    src: 'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?auto=format&fit=crop&w=800&q=80',
    title: 'The Darkroom & Color Grading',
    description: 'Custom fine-art color profiling on calibrated Eizo monitors.'
  },
  {
    id: 'bts-04',
    src: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    title: 'Location Scouting',
    description: 'Evaluating tidal sunlight angles along Labadi coastline.'
  }
];
