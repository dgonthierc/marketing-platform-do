import { prisma } from '@/lib/prisma';
import { 
  Lead, 
  LeadFormData, 
  LeadStatus, 
  Quote, 
  QuoteFormData,
  QuoteStatus,
  Client,
  ClientStatus,
  ApiResponse,
  PaginatedResponse 
} from '@/types/database';
import { calculateLeadScore } from '@/lib/utils';

/**
 * Lead Queries
 */
export const leadQueries = {
  /**
   * Create a new lead with automatic scoring
   */
  async create(data: LeadFormData): Promise<ApiResponse<Lead>> {
    try {
      const score = calculateLeadScore(data);
      
      const lead = await prisma.lead.create({
        data: {
          ...data,
          score,
          platforms: data.platforms || [],
          source: data.source || 'website',
          status: 'NEW',
        },
      });

      // Trigger lead notification (would integrate with email service)
      await this.notifyNewLead(lead as any);

      return {
        success: true,
        data: lead as Lead,
        message: 'Lead creado exitosamente',
      };
    } catch (error) {
      console.error('Error creating lead:', error);
      return {
        success: false,
        error: 'Error al crear el lead',
      };
    }
  },

  /**
   * Get lead by email
   */
  async findByEmail(email: string): Promise<Lead | null> {
    try {
      const lead = await prisma.lead.findUnique({
        where: { email },
        include: {
          quotes: true,
          interactions: {
            orderBy: { createdAt: 'desc' },
            take: 5,
          },
        },
      });
      return lead as Lead | null;
    } catch (error) {
      console.error('Error finding lead:', error);
      return null;
    }
  },

  /**
   * Get lead by ID
   */
  async findById(id: string): Promise<Lead | null> {
    try {
      const lead = await prisma.lead.findUnique({
        where: { id },
        include: {
          quotes: true,
          interactions: true,
          client: true,
        },
      });
      return lead as Lead | null;
    } catch (error) {
      console.error('Error finding lead:', error);
      return null;
    }
  },

  /**
   * Update lead status
   */
  async updateStatus(id: string, status: LeadStatus): Promise<ApiResponse<Lead>> {
    try {
      const lead = await prisma.lead.update({
        where: { id },
        data: { 
          status,
          updatedAt: new Date(),
        },
      });

      return {
        success: true,
        data: lead as Lead,
        message: 'Estado actualizado',
      };
    } catch (error) {
      console.error('Error updating lead status:', error);
      return {
        success: false,
        error: 'Error al actualizar el estado',
      };
    }
  },

  /**
   * Get paginated leads
   */
  async list(
    page: number = 1,
    pageSize: number = 20,
    filters?: {
      status?: LeadStatus;
      source?: string;
      minScore?: number;
    }
  ): Promise<PaginatedResponse<Lead>> {
    try {
      const where: any = {};
      
      if (filters?.status) where.status = filters.status;
      if (filters?.source) where.source = filters.source;
      if (filters?.minScore) where.score = { gte: filters.minScore };

      const [items, total] = await Promise.all([
        prisma.lead.findMany({
          where,
          skip: (page - 1) * pageSize,
          take: pageSize,
          orderBy: { createdAt: 'desc' },
          include: {
            quotes: {
              select: {
                id: true,
                status: true,
                totalValue: true,
              },
            },
          },
        }),
        prisma.lead.count({ where }),
      ]);

      return {
        items: items as Lead[],
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      };
    } catch (error) {
      console.error('Error listing leads:', error);
      return {
        items: [],
        total: 0,
        page: 1,
        pageSize,
        totalPages: 0,
      };
    }
  },

  /**
   * Convert lead to client
   */
  async convertToClient(leadId: string, additionalData?: Partial<Client>): Promise<ApiResponse<Client>> {
    try {
      const lead = await this.findById(leadId);
      if (!lead) {
        return {
          success: false,
          error: 'Lead no encontrado',
        };
      }

      const client = await prisma.client.create({
        data: {
          leadId,
          name: lead.name || lead.email,
          email: lead.email,
          company: lead.company,
          phone: lead.phone,
          industry: lead.industry || 'General',
          status: ClientStatus.ACTIVE,
          monthlyFee: additionalData?.monthlyFee || 0,
          startDate: new Date(),
        } as any,
      });

      // Update lead status
      await this.updateStatus(leadId, LeadStatus.CONVERTED);

      return {
        success: true,
        data: client as unknown as Client,
        message: 'Lead convertido a cliente exitosamente',
      };
    } catch (error) {
      console.error('Error converting lead:', error);
      return {
        success: false,
        error: 'Error al convertir el lead',
      };
    }
  },

  /**
   * Add interaction to lead
   */
  async addInteraction(
    leadId: string,
    interaction: {
      type: string;
      channel: string;
      subject?: string;
      content?: string;
      outcome?: string;
    }
  ): Promise<ApiResponse<any>> {
    try {
      const leadInteraction = await prisma.leadInteraction.create({
        data: {
          leadId,
          ...interaction,
        } as any,
      });

      return {
        success: true,
        data: leadInteraction,
        message: 'Interacción registrada',
      };
    } catch (error) {
      console.error('Error adding interaction:', error);
      return {
        success: false,
        error: 'Error al registrar la interacción',
      };
    }
  },

  /**
   * Send notification for new lead (placeholder)
   */
  async notifyNewLead(lead: Lead): Promise<void> {
    // TODO: Integrate with email service (SendGrid, etc.)
    console.log(`New lead notification: ${lead.email} (Score: ${lead.score})`);
  },
};

/**
 * Quote Queries
 */
export const quoteQueries = {
  /**
   * Create a new quote
   */
  async create(leadId: string, data: QuoteFormData): Promise<ApiResponse<Quote>> {
    try {
      // Calculate pricing
      const monthlyFee = this.calculateMonthlyFee(data);
      const setupFee = monthlyFee * 0.5;
      const totalValue = monthlyFee * data.duration;

      const quote = await prisma.quote.create({
        data: {
          leadId,
          quoteNumber: `Q-${Date.now().toString(36).toUpperCase()}`,
          services: data as any,
          monthlyFee,
          setupFee,
          totalValue,
          status: 'DRAFT',
          validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        },
        include: {
          lead: true,
        },
      });

      // Update lead status
      await leadQueries.updateStatus(leadId, LeadStatus.QUOTED);

      return {
        success: true,
        data: quote as unknown as Quote,
        message: 'Cotización creada exitosamente',
      };
    } catch (error) {
      console.error('Error creating quote:', error);
      return {
        success: false,
        error: 'Error al crear la cotización',
      };
    }
  },

  /**
   * Calculate monthly fee based on requirements
   */
  calculateMonthlyFee(data: QuoteFormData): number {
    const baseFee = 1000;
    let monthlyFee = baseFee;

    // Platform fees
    const platformFees: Record<string, number> = {
      google: 500,
      meta: 400,
      tiktok: 300,
      linkedin: 600,
      twitter: 250,
      pinterest: 200,
    };

    data.platforms.forEach(platform => {
      monthlyFee += platformFees[platform] || 200;
    });

    // Budget tier adjustments
    if (data.budget > 10000) {
      monthlyFee *= 1.5; // Premium service for high budgets
    } else if (data.budget > 5000) {
      monthlyFee *= 1.25;
    }

    // Duration discount
    if (data.duration >= 12) {
      monthlyFee *= 0.9; // 10% discount for annual contracts
    } else if (data.duration >= 6) {
      monthlyFee *= 0.95; // 5% discount for 6+ months
    }

    return Math.round(monthlyFee);
  },

  /**
   * Send quote to lead
   */
  async send(quoteId: string): Promise<ApiResponse<Quote>> {
    try {
      const quote = await prisma.quote.update({
        where: { id: quoteId },
        data: {
          status: 'SENT',
          sentAt: new Date(),
        },
        include: {
          lead: true,
        },
      });

      // TODO: Send email with quote
      console.log(`Quote sent to ${quote.lead?.email}`);

      return {
        success: true,
        data: quote as unknown as Quote,
        message: 'Cotización enviada',
      };
    } catch (error) {
      console.error('Error sending quote:', error);
      return {
        success: false,
        error: 'Error al enviar la cotización',
      };
    }
  },

  /**
   * Update quote status
   */
  async updateStatus(id: string, status: QuoteStatus): Promise<ApiResponse<Quote>> {
    try {
      const updateData: any = { status };

      // Add timestamps based on status
      if (status === 'VIEWED') updateData.viewedAt = new Date();
      if (status === 'ACCEPTED') updateData.acceptedAt = new Date();
      if (status === 'REJECTED') updateData.rejectedAt = new Date();

      const quote = await prisma.quote.update({
        where: { id },
        data: updateData,
        include: {
          lead: true,
        },
      });

      // If accepted, convert lead to client
      if (status === 'ACCEPTED' && quote.lead) {
        await leadQueries.convertToClient(quote.leadId, {
          monthlyFee: Number(quote.monthlyFee),
        });
      }

      return {
        success: true,
        data: quote as unknown as Quote,
        message: 'Estado actualizado',
      };
    } catch (error) {
      console.error('Error updating quote status:', error);
      return {
        success: false,
        error: 'Error al actualizar el estado',
      };
    }
  },

  /**
   * Get quotes by lead
   */
  async getByLead(leadId: string): Promise<Quote[]> {
    try {
      const quotes = await prisma.quote.findMany({
        where: { leadId },
        orderBy: { createdAt: 'desc' },
      });
      return quotes as unknown as Quote[];
    } catch (error) {
      console.error('Error getting quotes:', error);
      return [];
    }
  },
};

/**
 * Client Queries
 */
export const clientQueries = {
  /**
   * Get client by ID
   */
  async findById(id: string): Promise<Client | null> {
    try {
      const client = await prisma.client.findUnique({
        where: { id },
        include: {
          projects: true,
          payments: {
            orderBy: { createdAt: 'desc' },
            take: 5,
          },
          reports: {
            orderBy: { generatedAt: 'desc' },
            take: 5,
          },
        },
      });
      return client as Client | null;
    } catch (error) {
      console.error('Error finding client:', error);
      return null;
    }
  },

  /**
   * Get client by email
   */
  async findByEmail(email: string): Promise<ApiResponse<Client | null>> {
    try {
      const client = await prisma.client.findUnique({
        where: { email },
        include: {
          projects: true,
        },
      });
      return {
        success: true,
        data: client as Client | null
      };
    } catch (error) {
      console.error('Error finding client:', error);
      return {
        success: false,
        error: 'Error al buscar cliente'
      };
    }
  },

  /**
   * Create client from auth registration
   */
  async createFromAuth(data: {
    email: string;
    name: string;
    company?: string;
    phone?: string;
  }): Promise<ApiResponse<Client>> {
    try {
      // Check if lead exists
      const lead = await prisma.lead.findUnique({
        where: { email: data.email }
      });

      const client = await prisma.client.create({
        data: {
          email: data.email,
          name: data.name,
          company: data.company,
          phone: data.phone,
          leadId: lead?.id,
          status: 'ACTIVE',
          industry: 'General',
          monthlyFee: 0,
          startDate: new Date()
        } as any
      });

      // Update lead status if exists
      if (lead) {
        await prisma.lead.update({
          where: { id: lead.id },
          data: { status: 'CONVERTED' }
        });
      }

      return {
        success: true,
        data: client as unknown as Client,
        message: 'Cliente creado exitosamente'
      };
    } catch (error) {
      console.error('Error creating client:', error);
      return {
        success: false,
        error: 'Error al crear cliente'
      };
    }
  },

  /**
   * List active clients
   */
  async listActive(): Promise<Client[]> {
    try {
      const clients = await prisma.client.findMany({
        where: { status: 'ACTIVE' },
        orderBy: { startDate: 'desc' },
        include: {
          projects: {
            where: { status: 'ACTIVE' },
          },
        },
      });
      return clients as unknown as Client[];
    } catch (error) {
      console.error('Error listing clients:', error);
      return [];
    }
  },

  /**
   * Get client metrics
   */
  async getMetrics(clientId: string): Promise<any> {
    try {
      const client = await this.findById(clientId);
      if (!client) return null;

      const [totalSpend, totalPayments, activeProjects] = await Promise.all([
        prisma.campaign.aggregate({
          where: {
            project: {
              clientId,
            },
          },
          _sum: {
            spend: true,
          },
        }),
        prisma.payment.aggregate({
          where: {
            clientId,
            status: 'PAID' as any,
          },
          _sum: {
            amount: true,
          },
        }),
        prisma.project.count({
          where: {
            clientId,
            status: ClientStatus.ACTIVE,
          },
        }),
      ]);

      return {
        totalSpend: totalSpend._sum.spend || 0,
        totalPayments: totalPayments._sum.amount || 0,
        activeProjects,
        monthlyFee: client.monthlyFee,
        status: client.status,
      };
    } catch (error) {
      console.error('Error getting client metrics:', error);
      return null;
    }
  },
};