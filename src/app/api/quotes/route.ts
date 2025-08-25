import { NextRequest, NextResponse } from 'next/server';
import { quoteQueries, leadQueries } from '@/lib/db/queries';
import { PricingCalculator } from '@/lib/quote/pricing-calculator';
import { EmailService } from '@/lib/email/email-service';
import { QuoteFormData } from '@/types/quote';
import { z } from 'zod';

// Enhanced schema for new quote system
const enhancedQuoteSchema = z.object({
  formData: z.object({
    businessInfo: z.object({
      companyName: z.string(),
      contactName: z.string(),
      email: z.string().email(),
      phone: z.string(),
      website: z.string().optional(),
      industry: z.string(),
      companySize: z.enum(['startup', 'small', 'medium', 'enterprise']),
      currentMonthlyRevenue: z.string().optional()
    }),
    marketingGoals: z.object({
      objectives: z.array(z.object({
        id: z.string(),
        name: z.string(),
        icon: z.string(),
        priority: z.enum(['high', 'medium', 'low'])
      })),
      targetAudience: z.string(),
      competitors: z.string().optional(),
      uniqueSellingPoints: z.string(),
      timeline: z.enum(['immediate', '1-month', '3-months', '6-months', 'flexible']),
      urgency: z.enum(['low', 'medium', 'high', 'critical'])
    }),
    servicesSelection: z.object({
      services: z.array(z.object({
        id: z.string(),
        name: z.string(),
        basePrice: z.number(),
        selected: z.boolean()
      })),
      platforms: z.array(z.any()),
      monthlyBudget: z.number(),
      adSpendBudget: z.number(),
      currentCampaigns: z.array(z.any()).optional()
    }),
    additionalRequirements: z.object({
      needsCreativeDesign: z.boolean(),
      needsLandingPages: z.boolean(),
      needsCopywriting: z.boolean(),
      needsAnalyticsSetup: z.boolean(),
      hasExistingAssets: z.boolean(),
      specialRequests: z.string().optional()
    })
  })
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input data
    const validatedData = enhancedQuoteSchema.parse(body);
    const { formData } = validatedData;

    // Calculate quote pricing
    const calculation = PricingCalculator.calculateQuote(formData as any);

    // Generate quote number
    const quoteNumber = `Q-${Date.now().toString(36).toUpperCase()}`;

    // Calculate validity date (7 days from now)
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 7);

    // Find or create lead
    let lead = await leadQueries.findByEmail(formData.businessInfo.email);

    if (!lead) {
      // Calculate lead score
      const leadScore = calculateLeadScore(formData as any);
      
      // Create new lead
      const leadResult = await leadQueries.create({
        email: formData.businessInfo.email,
        name: formData.businessInfo.contactName,
        company: formData.businessInfo.companyName,
        phone: formData.businessInfo.phone,
        score: leadScore,
        status: 'QUALIFIED'
      } as any);

      if (leadResult.success && leadResult.data) {
        lead = leadResult.data;
        
        // Send welcome email to new lead
        await EmailService.sendWelcomeEmail(
          lead.email,
          lead.name || 'Cliente'
        );

        // Send notification to sales team
        await EmailService.sendLeadNotification({
          name: lead.name || '',
          email: lead.email,
          phone: lead.phone || '',
          company: lead.company || '',
          budget: lead.budget || ''
        });
      }
    }

    if (!lead) {
      return NextResponse.json(
        { success: false, error: 'Error creating or finding lead' },
        { status: 400 }
      );
    }

    // Create quote in database
    const quoteData = {
      platforms: formData.servicesSelection.services
        .filter(s => s.selected)
        .map(s => s.id),
      budget: calculation.totalMonthlyInvestment,
      duration: 3, // Default 3 months
      includes: [
        'Gestión de campañas',
        'Optimización continua',
        'Reportes semanales',
        'Soporte prioritario'
      ],
      customRequirements: formData.additionalRequirements.specialRequests,
      formData,
      calculation,
      quoteNumber
    };

    const result = await quoteQueries.create(lead.id, quoteData);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    // Send quote email to client
    await EmailService.sendQuoteToClient(
      formData as any,
      calculation,
      quoteNumber,
      `${process.env.NEXT_PUBLIC_APP_URL}/api/quotes/${result.data?.id}/pdf`
    );

    return NextResponse.json(
      { 
        success: true, 
        message: 'Cotización creada y enviada exitosamente',
        data: {
          quote: result.data,
          quoteNumber,
          calculation,
          validUntil
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating quote:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Datos inválidos',
          details: error.errors 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// Helper function to calculate lead score
function calculateLeadScore(formData: QuoteFormData): number {
  let score = 50; // Base score

  // Company size scoring
  const sizeScores = {
    'startup': 10,
    'small': 20,
    'medium': 30,
    'enterprise': 40
  };
  score += sizeScores[formData.businessInfo.companySize] || 0;

  // Budget scoring
  if (formData.servicesSelection.adSpendBudget >= 10000) score += 20;
  else if (formData.servicesSelection.adSpendBudget >= 5000) score += 15;
  else if (formData.servicesSelection.adSpendBudget >= 2000) score += 10;

  // Urgency scoring
  const urgencyScores = {
    'critical': 20,
    'high': 15,
    'medium': 10,
    'low': 5
  };
  score += urgencyScores[formData.marketingGoals.urgency] || 0;

  // Service count scoring
  const serviceCount = formData.servicesSelection.services.filter(s => s.selected).length;
  score += serviceCount * 5;

  return Math.min(score, 100);
}

// Helper function to get budget range
function getBudgetRange(monthlyInvestment: number): string {
  if (monthlyInvestment >= 10000) return '10k+';
  if (monthlyInvestment >= 5000) return '5k-10k';
  if (monthlyInvestment >= 2000) return '2k-5k';
  if (monthlyInvestment >= 1000) return '1k-2k';
  return '<1k';
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const leadId = searchParams.get('leadId');

    if (!leadId) {
      return NextResponse.json(
        { success: false, error: 'Lead ID requerido' },
        { status: 400 }
      );
    }

    const quotes = await quoteQueries.getByLead(leadId);

    return NextResponse.json({ 
      success: true, 
      data: quotes 
    });
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener cotizaciones' },
      { status: 500 }
    );
  }
}