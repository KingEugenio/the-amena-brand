export type CategoryType = 
  | 'all'
  | 'weddings'
  | 'portraits'
  | 'editorial'
  | 'commercial'
  | 'events';

export interface GalleryImage {
  id: string;
  src: string;
  thumbnail?: string;
  alt: string;
  caption?: string;
  aspectRatio: 'landscape' | 'portrait' | 'square' | 'panoramic';
  width?: number;
  height?: number;
  featured?: boolean;
  exif?: {
    camera: string;
    lens: string;
    focalLength: string;
    aperture: string;
    shutterSpeed: string;
    iso: string;
  };
}

export interface ProjectCredit {
  role: string;
  name: string;
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: CategoryType;
  categoryLabel: string;
  location: string;
  date: string;
  year: string;
  client?: string;
  coverImage: GalleryImage;
  description: string;
  storyParagraphs: string[];
  gallery: GalleryImage[];
  detailImages?: GalleryImage[];
  btsImages?: GalleryImage[];
  credits?: ProjectCredit[];
  testimonial?: {
    quote: string;
    clientName: string;
    relation: string;
  };
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface ServicePackage {
  name: string;
  hours: string;
  deliverables: string[];
  priceTag: string;
  description: string;
  isPopular?: boolean;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  coverImage: string;
  description: string;
  whoItIsFor: string;
  photographerApproach: string;
  deliverables: string[];
  startingPrice: string;
  packages: ServicePackage[];
  addOns: { name: string; price: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  clientImage: string;
  roleOrEvent: string;
  location: string;
  quote: string;
  date: string;
  serviceType: string;
  source: 'Google Review' | 'Direct Letter' | 'WeddingWire' | 'Vogue Feature';
  rating: number;
}

export interface StatItem {
  number: string;
  label: string;
  sublabel?: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'booking' | 'deliverables' | 'travel' | 'pricing';
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  coverImage: string;
  date: string;
  readTime: string;
  author: string;
  contentParagraphs: string[];
}

export interface BookingInquiry {
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string;
  service: string;
  categoryType?: 'graphic-design' | 'photography';
  brandOrProjectName?: string;
  deliverablesNeeded?: string[];
  eventDate: string;
  timeSlot?: string;
  location: string;
  numberOfPeople: string;
  budgetRange: string;
  referralSource: string;
  projectDescription: string;
  additionalInfo: string;
}

export interface SiteSettings {
  photographerName: string;
  fullName: string;
  designBrandName: string;
  tagline: string;
  location: string;
  serviceArea: string;
  availabilityStatus: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  whatsappDefaultMessage: string;
  currencySymbol: string;
  instagramHandle: string;
  instagramUrl: string;
  designInstagramHandle: string;
  designInstagramUrl: string;
  weddingInstagramHandle: string;
  weddingInstagramUrl: string;
  behanceUrl: string;
  facebookUrl: string;
  tiktokUrl: string;
  primaryAccentColor: string;
  themeBaseBg: string;
  theme: 'light' | 'dark';
}
