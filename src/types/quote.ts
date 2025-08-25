/**
 * Quote System Types
 */

export interface QuoteFormData {
  // Step 1: Business Info
  businessInfo: {
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    website?: string;
    industry: string;
    companySize: CompanySize;
    currentMonthlyRevenue?: string;
  };
  
  // Step 2: Marketing Goals
  marketingGoals: {
    objectives: Objective[];
    targetAudience: string;
    competitors?: string;
    uniqueSellingPoints: string;
    timeline: Timeline;
    urgency: Urgency;
  };
  
  // Step 3: Services Selection
  servicesSelection: {
    services: SelectedService[];
    platforms: Platform[];
    monthlyBudget: number;
    adSpendBudget: number;
    currentCampaigns?: CurrentCampaign[];
  };
  
  // Step 4: Additional Requirements
  additionalRequirements: {
    needsCreativeDesign: boolean;
    needsLandingPages: boolean;
    needsCopywriting: boolean;
    needsAnalyticsSetup: boolean;
    hasExistingAssets: boolean;
    specialRequests?: string;
  };
}

export interface SelectedService {
  id: string;
  name: string;
  basePrice: number;
  selected: boolean;
  customization?: ServiceCustomization;
}

export interface ServiceCustomization {
  campaigns: number;
  adGroups: number;
  keywords?: number;
  audiences?: number;
  creatives?: number;
}

export interface Platform {
  id: string;
  name: string;
  icon: string;
  selected: boolean;
  currentSpend?: number;
  currentPerformance?: 'poor' | 'average' | 'good' | 'unknown';
}

export interface CurrentCampaign {
  platform: string;
  monthlySpend: number;
  currentROAS?: number;
  mainIssues?: string[];
}

export interface Objective {
  id: string;
  name: string;
  icon: string;
  priority: 'high' | 'medium' | 'low';
}

export interface QuoteCalculation {
  services: QuoteServiceLine[];
  oneTimeSetup: number;
  monthlyManagement: number;
  recommendedAdSpend: number;
  totalMonthlyInvestment: number;
  estimatedROI: number;
  paybackPeriod: string;
  confidenceScore: number;
  discounts?: Discount[];
}

export interface QuoteServiceLine {
  service: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  frequency: 'monthly' | 'one-time';
}

export interface Discount {
  type: 'volume' | 'commitment' | 'bundle' | 'first-time';
  description: string;
  amount: number;
  percentage?: number;
}

export interface QuoteProposal {
  id: string;
  quoteNumber: string;
  createdAt: Date;
  validUntil: Date;
  status: QuoteStatus;
  formData: QuoteFormData;
  calculation: QuoteCalculation;
  terms: QuoteTerms;
  nextSteps: string[];
}

export interface QuoteTerms {
  paymentTerms: string;
  contractLength: string;
  cancellationPolicy: string;
  guarantees: string[];
  included: string[];
  notIncluded: string[];
}

export enum CompanySize {
  STARTUP = 'startup',
  SMALL = 'small',
  MEDIUM = 'medium',
  ENTERPRISE = 'enterprise'
}

export enum Timeline {
  IMMEDIATE = 'immediate',
  ONE_MONTH = '1-month',
  THREE_MONTHS = '3-months',
  SIX_MONTHS = '6-months',
  FLEXIBLE = 'flexible'
}

export enum Urgency {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum QuoteStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  VIEWED = 'viewed',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  EXPIRED = 'expired'
}

export interface QuoteValidation {
  minBudget: number;
  maxBudget: number;
  minContractLength: number;
  requiredFields: string[];
  businessRules: BusinessRule[];
}

export interface BusinessRule {
  id: string;
  description: string;
  condition: (data: QuoteFormData) => boolean;
  message: string;
  severity: 'error' | 'warning' | 'info';
}