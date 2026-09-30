export type ContentStatus = 'draft' | 'published' | 'archived';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
}

export interface BrandColors {
  background: string;
  surface: string;
  text: string;
  muted: string;
  accent: string;
  border: string;
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  description: string;
  whatsappNumber: string; // e.g. "0579499223"
  instagramHandle: string; // e.g. "@theamenabrand"
  instagramUrl: string; // e.g. "https://www.instagram.com/theamenabrand/"
  email: string;
  contactEmail?: string;
  phone: string;
  location: string;
  currency: string;
  copyrightText: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  colors: BrandColors;
  showServicesPage: boolean;
  announcementBarText?: string;
  enableAnnouncementBar: boolean;
}

export interface BrandValueItem {
  id: string;
  title: string;
  description: string;
}

export interface HomepageContent {
  heroHeadline: string;
  heroSubheadline: string;
  heroSupportingText: string;
  heroPrimaryCtaText: string;
  heroSecondaryCtaText: string;
  heroImageUrl: string;
  heroImageAlt: string;
  
  brandSectionLabel: string;
  brandStatement: string;
  
  philosophyTitle: string;
  philosophyText: string;
  
  experienceTitle: string;
  experienceText: string;
  
  detailsTitle: string;
  detailsText: string;
  
  values: BrandValueItem[];
  
  finalCtaHeadline: string;
  finalCtaSubtext: string;
  finalCtaButtonText: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  collectionId?: string;
  mainImage: string;
  images: string[];
  price?: number;
  salePrice?: number;
  currency: string;
  availability: 'In Stock' | 'Made to Order' | 'Pre-order' | 'Archive / Enquiry Only' | 'Out of Stock';
  stockStatus: string;
  featured: boolean;
  newArrival: boolean;
  bestseller: boolean;
  tags: string[];
  details: string[];
  sizeOptions?: string[];
  ctaLabel?: string;
  status: ContentStatus;
  sortOrder: number;
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
  altText?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Collection {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  featured: boolean;
  sortOrder?: number;
  order?: number;
  status?: ContentStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface JournalPost {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  bodyContent?: string;
  content?: string;
  status?: ContentStatus;
  published?: boolean;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  socialImage?: string;
  readingTimeMinutes?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  sortOrder?: number;
  order?: number;
  status?: ContentStatus;
}

export type FaqItem = FAQItem;

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  deliverable: string;
  timeline?: string;
  status: ContentStatus;
}

export type EnquiryStatus = 'NEW' | 'CONTACTED' | 'IN PROGRESS' | 'COMPLETED' | 'ARCHIVED';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  subject: string;
  message: string;
  date: string;
  status: EnquiryStatus;
  notes?: string;
}

export interface MediaAsset {
  id: string;
  url: string;
  title: string;
  altText: string;
  caption?: string;
  mimeType: string;
  sizeBytes: number;
  uploadedAt: string;
}

export interface SEOSettings {
  siteTitle: string;
  defaultDescription: string;
  defaultSocialImage: string;
  canonicalBaseUrl: string;
  robotsIndexingEnabled: boolean;
}

export interface AnalyticsEvent {
  id: string;
  eventType: 'page_view' | 'product_view' | 'whatsapp_click' | 'contact_submit' | 'cta_click';
  path: string;
  target?: string;
  timestamp: string;
}

export interface AppDataPayload {
  settings: SiteSettings;
  homepage: HomepageContent;
  products: Product[];
  collections: Collection[];
  journal: JournalPost[];
  faqs: FAQItem[];
  services: ServiceItem[];
  about: {
    heroHeading: string;
    heroSubtitle: string;
    brandStory: string;
    philosophyText: string;
    experienceText: string;
    founderNote: string;
    imageUrl: string;
    imageAlt: string;
    values: BrandValueItem[];
  };
  seo: SEOSettings;
  enquiries: any[];
}
