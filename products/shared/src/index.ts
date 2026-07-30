import type { LucideIcon } from 'lucide-react';

export interface ProductFeature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ProductModule {
  name: string;
  description: string;
}

export interface ProductBenefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ProductIntegration {
  name: string;
  category: string;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface ProductData {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  color: string;
  heroTitle: string;
  heroSubtitle: string;
  overviewTitle: string;
  overview: string;
  featuresTitle: string;
  featuresSubtitle: string;
  features: ProductFeature[];
  modulesTitle: string;
  modulesSubtitle: string;
  modules: ProductModule[];
  benefitsTitle: string;
  benefitsSubtitle: string;
  benefits: ProductBenefit[];
  integrationsTitle: string;
  integrationsSubtitle: string;
  integrations: ProductIntegration[];
  pricingTitle: string;
  pricingSubtitle: string;
  pricing: {
    starter: string;
    business: string;
    enterprise: string;
  };
  faqs: ProductFAQ[];
}

export type ProductSlug =
  | 'erp' | 'crm' | 'procurement' | 'hr' | 'payroll' | 'accounting'
  | 'inventory' | 'pos' | 'projects' | 'school' | 'hospital' | 'church'
  | 'hotel' | 'logistics' | 'ai';

export interface ProductAI {
  slug: ProductSlug;
  capabilities: string[];
}

export const PRODUCT_SLUGS: ProductSlug[] = [
  'erp', 'crm', 'procurement', 'hr', 'payroll', 'accounting',
  'inventory', 'pos', 'projects', 'school', 'hospital', 'church',
  'hotel', 'logistics', 'ai',
];
