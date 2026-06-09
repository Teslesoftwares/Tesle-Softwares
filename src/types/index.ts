export interface NavLink {
  label: string;
  href: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface ProductFeature {
  title: string;
  description: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
  icon: string;
}

export interface ServiceProcess {
  step: number;
  title: string;
  description: string;
}

export interface ServiceBenefit {
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface Service {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
  color: string;
  fullDescription: string;
  features: string[];
  benefits: ServiceBenefit[];
  process: ServiceProcess[];
  faqs: ServiceFAQ[];
  technologies: string[];
}

export interface PortfolioImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface PortfolioClient {
  name: string;
  company: string;
  website?: string;
}

export interface PortfolioTestimonial {
  quote: string;
  author: string;
  role: string;
}

export interface PortfolioProject {
  id: number;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  images: PortfolioImage[];
  technologies: string[];
  client: PortfolioClient;
  testimonial?: PortfolioTestimonial;
  results: string[];
  year: string;
  featured: boolean;
}

export interface MediaImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface MediaVideoItem {
  id: number;
  title: string;
  description: string;
  thumbnail: MediaImage;
  videoUrl: string;
  duration: string;
  tags: string[];
}

export interface MediaImageItem {
  id: number;
  title: string;
  description: string;
  image: MediaImage;
  tags: string[];
}

export interface MediaComparisonItem {
  id: number;
  title: string;
  description: string;
  before: MediaImage;
  after: MediaImage;
  tags: string[];
}

export interface MediaCategory {
  id: number;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  type: 'image' | 'video' | 'comparison';
  items: MediaVideoItem[] | MediaImageItem[] | MediaComparisonItem[];
}

export interface JobPosition {
  id: number;
  slug: string;
  title: string;
  department: string;
  type: string;
  location: string;
  remote: boolean;
  featured: boolean;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string;
  salary: string;
}

export interface Internship {
  id: number;
  title: string;
  department: string;
  duration: string;
  location: string;
  description: string;
  requirements: string[];
  stipend: string;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface CultureValue {
  title: string;
  description: string;
  icon: string;
}

export interface Benefit {
  title: string;
  description: string;
  icon: string;
}

export interface ContactOffice {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  lat: number;
  lng: number;
  image: string;
  featured: boolean;
}

export interface BusinessHour {
  day: string;
  hours: string;
}

export interface ServiceInquiry {
  value: string;
  label: string;
}

export interface ContactWhatsApp {
  number: string;
  message: string;
}

export interface ContactEmail {
  general: string;
  sales: string;
  support: string;
  careers: string;
}

export interface ContactData {
  whatsapp: ContactWhatsApp;
  email: ContactEmail;
  offices: ContactOffice[];
  hours: BusinessHour[];
  serviceInquiries: ServiceInquiry[];
}

export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export interface QuoteFormValues {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  description: string;
}

export interface LeadCaptureValues {
  name: string;
  email: string;
  company: string;
  interest: string;
}

export interface BlogAuthor {
  id: number;
  slug: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  social: { twitter: string; linkedin: string; website: string };
}

export interface BlogContentBlock {
  type: 'paragraph' | 'heading' | 'quote' | 'list' | 'image';
  text?: string;
  level?: number;
  author?: string;
  items?: string[];
  style?: 'bullet' | 'numbered';
  url?: string;
  alt?: string;
  caption?: string;
}

export interface BlogArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  authorSlug: string;
  publishedDate: string;
  readTime: string;
  featured: boolean;
  image: { url: string; alt: string; width: number; height: number };
  tags: string[];
  content: BlogContentBlock[];
}
