/**
 * Service Types - Definitions for marketing services
 */

export interface Service {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  icon: string;
  category: ServiceCategory;
  platforms: Platform[];
  features: string[];
  pricing: ServicePricing;
  metrics: ServiceMetrics;
  popular?: boolean;
  badge?: string;
}

export interface ServicePricing {
  starting: number;
  currency: string;
  model: PricingModel;
  setupFee?: number;
  customQuote?: boolean;
}

export interface ServiceMetrics {
  avgROI: string;
  timeToResults: string;
  clientRetention: string;
  successRate: string;
}

export interface Platform {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export enum ServiceCategory {
  PAID_SEARCH = 'PAID_SEARCH',
  SOCIAL_MEDIA = 'SOCIAL_MEDIA',
  DISPLAY = 'DISPLAY',
  VIDEO = 'VIDEO',
  SHOPPING = 'SHOPPING',
  ANALYTICS = 'ANALYTICS',
}

export enum PricingModel {
  MONTHLY = 'MONTHLY',
  PERFORMANCE = 'PERFORMANCE',
  PROJECT = 'PROJECT',
  HYBRID = 'HYBRID',
}

export interface ServiceCalculatorData {
  budget: number;
  platforms: string[];
  duration: number;
  objectives: string[];
  industry: string;
}

export interface ServiceQuote {
  service: Service;
  monthlyFee: number;
  setupFee: number;
  estimatedROI: number;
  timeline: string;
  includes: string[];
}