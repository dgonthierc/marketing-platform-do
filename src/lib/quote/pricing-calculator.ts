/**
 * Intelligent Pricing Calculator for Quote System
 */

import { 
  QuoteFormData, 
  QuoteCalculation, 
  QuoteServiceLine,
  Discount,
  CompanySize,
  Timeline,
  Urgency
} from '@/types/quote';

// Base pricing configuration
const PRICING_CONFIG = {
  services: {
    'google-ads': { 
      base: 997, 
      setup: 497,
      name: 'Google Ads Management',
      description: 'Gestión completa de campañas en Google'
    },
    'facebook-ads': { 
      base: 897, 
      setup: 397,
      name: 'Facebook & Instagram Ads',
      description: 'Campañas en Meta (Facebook e Instagram)'
    },
    'tiktok-ads': { 
      base: 797, 
      setup: 297,
      name: 'TikTok Ads',
      description: 'Gestión de campañas en TikTok'
    },
    'linkedin-ads': { 
      base: 1297, 
      setup: 597,
      name: 'LinkedIn Ads B2B',
      description: 'Campañas B2B en LinkedIn'
    },
    'youtube-ads': { 
      base: 997, 
      setup: 497,
      name: 'YouTube Ads',
      description: 'Video marketing en YouTube'
    }
  },
  
  addons: {
    creativeDesign: { monthly: 497, setup: 297 },
    landingPages: { monthly: 397, setup: 797 },
    copywriting: { monthly: 297, setup: 197 },
    analyticsSetup: { monthly: 197, setup: 497 }
  },
  
  // Management fee as percentage of ad spend
  managementFeeRates: {
    '0-5000': 0.20,      // 20% for budgets under $5k
    '5000-10000': 0.18,  // 18% for $5k-$10k
    '10000-25000': 0.15, // 15% for $10k-$25k
    '25000-50000': 0.12, // 12% for $25k-$50k
    '50000+': 0.10       // 10% for $50k+
  },
  
  minimumManagementFee: 997
};

// Company size multipliers
const SIZE_MULTIPLIERS = {
  [CompanySize.STARTUP]: 0.9,
  [CompanySize.SMALL]: 1.0,
  [CompanySize.MEDIUM]: 1.2,
  [CompanySize.ENTERPRISE]: 1.5
};

// Urgency multipliers
const URGENCY_MULTIPLIERS = {
  [Urgency.LOW]: 0.95,
  [Urgency.MEDIUM]: 1.0,
  [Urgency.HIGH]: 1.1,
  [Urgency.CRITICAL]: 1.25
};

export class PricingCalculator {
  /**
   * Calculate complete quote based on form data
   */
  static calculateQuote(formData: QuoteFormData): QuoteCalculation {
    const services: QuoteServiceLine[] = [];
    let totalSetupFee = 0;
    let totalMonthlyFee = 0;
    
    // Calculate base services
    const selectedServices = formData.servicesSelection.services
      .filter(s => s.selected);
    
    selectedServices.forEach(service => {
      const pricing = PRICING_CONFIG.services[service.id as keyof typeof PRICING_CONFIG.services];
      if (pricing) {
        const adjustedPrice = this.applyMultipliers(
          pricing.base,
          formData.businessInfo.companySize,
          formData.marketingGoals.urgency
        );
        
        services.push({
          service: pricing.name,
          description: pricing.description,
          quantity: 1,
          unitPrice: adjustedPrice,
          total: adjustedPrice,
          frequency: 'monthly'
        });
        
        totalMonthlyFee += adjustedPrice;
        totalSetupFee += pricing.setup;
      }
    });
    
    // Calculate management fee based on ad spend
    const adSpend = formData.servicesSelection.adSpendBudget;
    const managementFee = this.calculateManagementFee(adSpend);
    
    if (managementFee > 0) {
      services.push({
        service: 'Ad Spend Management Fee',
        description: `Gestión y optimización del presupuesto publicitario`,
        quantity: 1,
        unitPrice: managementFee,
        total: managementFee,
        frequency: 'monthly'
      });
      totalMonthlyFee += managementFee;
    }
    
    // Add selected addons
    const addons = formData.additionalRequirements;
    
    if (addons.needsCreativeDesign) {
      const addon = PRICING_CONFIG.addons.creativeDesign;
      services.push({
        service: 'Diseño Creativo',
        description: 'Creación de anuncios y creatividades',
        quantity: 1,
        unitPrice: addon.monthly,
        total: addon.monthly,
        frequency: 'monthly'
      });
      totalMonthlyFee += addon.monthly;
      totalSetupFee += addon.setup;
    }
    
    if (addons.needsLandingPages) {
      const addon = PRICING_CONFIG.addons.landingPages;
      services.push({
        service: 'Landing Pages',
        description: 'Diseño y desarrollo de landing pages',
        quantity: 1,
        unitPrice: addon.monthly,
        total: addon.monthly,
        frequency: 'monthly'
      });
      totalMonthlyFee += addon.monthly;
      totalSetupFee += addon.setup;
    }
    
    if (addons.needsCopywriting) {
      const addon = PRICING_CONFIG.addons.copywriting;
      services.push({
        service: 'Copywriting',
        description: 'Redacción de textos publicitarios',
        quantity: 1,
        unitPrice: addon.monthly,
        total: addon.monthly,
        frequency: 'monthly'
      });
      totalMonthlyFee += addon.monthly;
      totalSetupFee += addon.setup;
    }
    
    if (addons.needsAnalyticsSetup) {
      const addon = PRICING_CONFIG.addons.analyticsSetup;
      services.push({
        service: 'Analytics Setup',
        description: 'Configuración de tracking y analytics',
        quantity: 1,
        unitPrice: addon.setup,
        total: addon.setup,
        frequency: 'one-time'
      });
      totalSetupFee += addon.setup;
    }
    
    // Calculate discounts
    const discounts = this.calculateDiscounts(formData, totalMonthlyFee, totalSetupFee);
    
    // Apply discounts
    let discountAmount = 0;
    discounts.forEach(discount => {
      discountAmount += discount.amount;
    });
    
    const finalMonthlyFee = Math.max(totalMonthlyFee - discountAmount, PRICING_CONFIG.minimumManagementFee);
    const totalMonthlyInvestment = finalMonthlyFee + adSpend;
    
    // Calculate ROI estimation
    const estimatedROI = this.estimateROI(
      totalMonthlyInvestment,
      selectedServices.length,
      formData.businessInfo.industry
    );
    
    // Calculate payback period
    const paybackPeriod = this.calculatePaybackPeriod(
      totalMonthlyInvestment,
      estimatedROI
    );
    
    // Calculate confidence score
    const confidenceScore = this.calculateConfidenceScore(formData);
    
    return {
      services,
      oneTimeSetup: totalSetupFee,
      monthlyManagement: finalMonthlyFee,
      recommendedAdSpend: this.recommendAdSpend(formData),
      totalMonthlyInvestment,
      estimatedROI,
      paybackPeriod,
      confidenceScore,
      discounts: discounts.length > 0 ? discounts : undefined
    };
  }
  
  /**
   * Apply size and urgency multipliers to base price
   */
  private static applyMultipliers(
    basePrice: number,
    companySize: CompanySize,
    urgency: Urgency
  ): number {
    const sizeMultiplier = SIZE_MULTIPLIERS[companySize] || 1;
    const urgencyMultiplier = URGENCY_MULTIPLIERS[urgency] || 1;
    
    return Math.round(basePrice * sizeMultiplier * urgencyMultiplier);
  }
  
  /**
   * Calculate management fee based on ad spend
   */
  private static calculateManagementFee(adSpend: number): number {
    let rate = 0.20; // Default 20%
    
    if (adSpend >= 50000) {
      rate = PRICING_CONFIG.managementFeeRates['50000+'];
    } else if (adSpend >= 25000) {
      rate = PRICING_CONFIG.managementFeeRates['25000-50000'];
    } else if (adSpend >= 10000) {
      rate = PRICING_CONFIG.managementFeeRates['10000-25000'];
    } else if (adSpend >= 5000) {
      rate = PRICING_CONFIG.managementFeeRates['5000-10000'];
    } else {
      rate = PRICING_CONFIG.managementFeeRates['0-5000'];
    }
    
    const fee = adSpend * rate;
    return Math.max(fee, PRICING_CONFIG.minimumManagementFee);
  }
  
  /**
   * Calculate applicable discounts
   */
  private static calculateDiscounts(
    formData: QuoteFormData,
    monthlyFee: number,
    setupFee: number
  ): Discount[] {
    const discounts: Discount[] = [];
    
    // Volume discount for multiple services
    const serviceCount = formData.servicesSelection.services
      .filter(s => s.selected).length;
    
    if (serviceCount >= 3) {
      const volumeDiscount = Math.round(monthlyFee * 0.10); // 10% discount
      discounts.push({
        type: 'bundle',
        description: 'Descuento por paquete de servicios',
        amount: volumeDiscount,
        percentage: 10
      });
    }
    
    // High budget discount
    if (formData.servicesSelection.adSpendBudget >= 10000) {
      const budgetDiscount = Math.round(monthlyFee * 0.05); // 5% discount
      discounts.push({
        type: 'volume',
        description: 'Descuento por volumen de inversión',
        amount: budgetDiscount,
        percentage: 5
      });
    }
    
    // Commitment discount for longer timelines
    if (formData.marketingGoals.timeline === Timeline.SIX_MONTHS) {
      const commitmentDiscount = Math.round(setupFee * 0.50); // 50% off setup
      discounts.push({
        type: 'commitment',
        description: 'Descuento en setup por compromiso 6 meses',
        amount: commitmentDiscount,
        percentage: 50
      });
    }
    
    return discounts;
  }
  
  /**
   * Estimate ROI based on investment and industry
   */
  private static estimateROI(
    monthlyInvestment: number,
    serviceCount: number,
    industry: string
  ): number {
    // Base ROI by industry
    const industryROI: { [key: string]: number } = {
      'e-commerce': 3.5,
      'b2b-services': 2.8,
      'health-wellness': 3.2,
      'education': 2.5,
      'real-estate': 4.0,
      'technology': 3.0,
      'restaurants': 2.2,
      'fashion-beauty': 3.8,
      'finance': 2.6,
      'other': 2.5
    };
    
    const baseROI = industryROI[industry] || 2.5;
    
    // Adjust based on service count (more services = better integration)
    const serviceMultiplier = 1 + (serviceCount * 0.1);
    
    // Calculate estimated monthly return
    const estimatedReturn = monthlyInvestment * baseROI * serviceMultiplier;
    
    return Math.round(estimatedReturn);
  }
  
  /**
   * Calculate payback period
   */
  private static calculatePaybackPeriod(
    monthlyInvestment: number,
    estimatedROI: number
  ): string {
    const monthlyProfit = estimatedROI - monthlyInvestment;
    
    if (monthlyProfit <= 0) {
      return '6-12 meses';
    }
    
    const months = Math.ceil(monthlyInvestment / monthlyProfit);
    
    if (months <= 1) return 'Inmediato';
    if (months <= 3) return '1-3 meses';
    if (months <= 6) return '3-6 meses';
    return '6-12 meses';
  }
  
  /**
   * Calculate confidence score based on data completeness
   */
  private static calculateConfidenceScore(formData: QuoteFormData): number {
    let score = 60; // Base score
    
    // Add points for complete information
    if (formData.businessInfo.website) score += 5;
    if (formData.businessInfo.currentMonthlyRevenue) score += 10;
    if (formData.marketingGoals.competitors) score += 5;
    if (formData.servicesSelection.currentCampaigns?.length) score += 10;
    if (formData.additionalRequirements.hasExistingAssets) score += 5;
    
    // Add points for realistic goals
    if (formData.marketingGoals.timeline !== Timeline.IMMEDIATE) score += 5;
    
    return Math.min(score, 95);
  }
  
  /**
   * Recommend optimal ad spend based on goals
   */
  private static recommendAdSpend(formData: QuoteFormData): number {
    const { companySize } = formData.businessInfo;
    const { objectives, urgency } = formData.marketingGoals;
    
    // Base recommendations by company size
    const baseRecommendations = {
      [CompanySize.STARTUP]: 3000,
      [CompanySize.SMALL]: 5000,
      [CompanySize.MEDIUM]: 10000,
      [CompanySize.ENTERPRISE]: 25000
    };
    
    let recommended = baseRecommendations[companySize] || 5000;
    
    // Adjust based on objectives
    const hasAggressiveGoals = objectives.some(
      obj => obj.priority === 'high' && 
      ['sales', 'leads', 'growth'].includes(obj.id)
    );
    
    if (hasAggressiveGoals) {
      recommended *= 1.5;
    }
    
    // Adjust based on urgency
    if (urgency === Urgency.CRITICAL) {
      recommended *= 1.3;
    } else if (urgency === Urgency.HIGH) {
      recommended *= 1.15;
    }
    
    // Consider current budget if provided
    const currentBudget = formData.servicesSelection.adSpendBudget;
    if (currentBudget > 0) {
      // Blend recommendation with current budget
      recommended = (recommended + currentBudget) / 2;
    }
    
    return Math.round(recommended / 100) * 100; // Round to nearest 100
  }
}