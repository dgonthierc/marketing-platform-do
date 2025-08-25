/**
 * Portfolio Types - Case studies and testimonials
 */

export interface CaseStudy {
  id: string;
  slug: string;
  client: {
    name: string;
    industry: Industry;
    size: CompanySize;
    location: string;
    logo?: string;
  };
  challenge: {
    title: string;
    description: string;
    problems: string[];
  };
  solution: {
    title: string;
    description: string;
    services: string[];
    platforms: Platform[];
    duration: string;
  };
  results: {
    summary: string;
    metrics: Metric[];
    testimonial?: Testimonial;
  };
  images?: {
    hero?: string;
    before?: string;
    after?: string;
    charts?: string[];
  };
  featured: boolean;
  publishedAt: string;
  tags: string[];
}

export interface Metric {
  label: string;
  before: string | number;
  after: string | number;
  improvement: string;
  icon?: string;
  highlight?: boolean;
}

export interface Testimonial {
  content: string;
  author: {
    name: string;
    role: string;
    company: string;
    avatar?: string;
  };
  rating: number;
  verified: boolean;
}

export interface Platform {
  id: string;
  name: string;
  icon: string;
}

export enum Industry {
  ECOMMERCE = 'e-commerce',
  B2B_SERVICES = 'b2b-services',
  HEALTH_WELLNESS = 'health-wellness',
  EDUCATION = 'education',
  REAL_ESTATE = 'real-estate',
  TECHNOLOGY = 'technology',
  RESTAURANTS = 'restaurants',
  FASHION_BEAUTY = 'fashion-beauty',
  AUTOMOTIVE = 'automotive',
  FINANCE = 'finance',
  TRAVEL = 'travel',
  OTHER = 'other'
}

export enum CompanySize {
  STARTUP = 'startup',
  SMALL = 'small',
  MEDIUM = 'medium',
  ENTERPRISE = 'enterprise'
}

export interface PortfolioFilters {
  industry?: Industry;
  service?: string;
  platform?: string;
  minROI?: number;
}