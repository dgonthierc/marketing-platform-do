export type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          company: string | null;
          phone: string | null;
          source: string;
          status: string;
          score: number;
          industry: string | null;
          budget: string | null;
          platforms: string[];
          message: string | null;
          utmSource: string | null;
          utmMedium: string | null;
          utmCampaign: string | null;
          utmTerm: string | null;
          utmContent: string | null;
          referrer: string | null;
          createdAt: string;
          updatedAt: string;
        };
        Insert: Omit<Database['public']['Tables']['leads']['Row'], 'id' | 'createdAt' | 'updatedAt'>;
        Update: Partial<Database['public']['Tables']['leads']['Insert']>;
      };
      quotes: {
        Row: {
          id: string;
          leadId: string;
          quoteNumber: string;
          services: any;
          monthlyFee: number;
          setupFee: number;
          totalValue: number;
          currency: string;
          status: string;
          validUntil: string;
          sentAt: string | null;
          viewedAt: string | null;
          acceptedAt: string | null;
          rejectedAt: string | null;
          customTerms: string | null;
          notes: string | null;
          createdAt: string;
          updatedAt: string;
        };
        Insert: Omit<Database['public']['Tables']['quotes']['Row'], 'id' | 'createdAt' | 'updatedAt'>;
        Update: Partial<Database['public']['Tables']['quotes']['Insert']>;
      };
      clients: {
        Row: {
          id: string;
          leadId: string | null;
          name: string;
          email: string;
          company: string | null;
          phone: string | null;
          industry: string | null;
          website: string | null;
          status: string;
          tier: string;
          startDate: string;
          endDate: string | null;
          billingEmail: string | null;
          billingAddress: any | null;
          taxId: string | null;
          createdAt: string;
          updatedAt: string;
        };
        Insert: Omit<Database['public']['Tables']['clients']['Row'], 'id' | 'createdAt' | 'updatedAt'>;
        Update: Partial<Database['public']['Tables']['clients']['Insert']>;
      };
      projects: {
        Row: {
          id: string;
          clientId: string;
          quoteId: string | null;
          name: string;
          description: string | null;
          platforms: string[];
          budget: number;
          status: string;
          startDate: string;
          endDate: string | null;
          kpis: any | null;
          createdAt: string;
          updatedAt: string;
        };
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'createdAt' | 'updatedAt'>;
        Update: Partial<Database['public']['Tables']['projects']['Insert']>;
      };
      campaigns: {
        Row: {
          id: string;
          projectId: string;
          name: string;
          platform: string;
          type: string;
          impressions: number;
          clicks: number;
          conversions: number;
          spend: number;
          revenue: number;
          status: string;
          createdAt: string;
          updatedAt: string;
        };
        Insert: Omit<Database['public']['Tables']['campaigns']['Row'], 'id' | 'createdAt' | 'updatedAt'>;
        Update: Partial<Database['public']['Tables']['campaigns']['Insert']>;
      };
      payments: {
        Row: {
          id: string;
          clientId: string;
          amount: number;
          currency: string;
          type: string;
          status: string;
          method: string | null;
          transactionId: string | null;
          periodStart: string | null;
          periodEnd: string | null;
          invoiceNumber: string | null;
          invoiceUrl: string | null;
          notes: string | null;
          paidAt: string | null;
          createdAt: string;
          updatedAt: string;
        };
        Insert: Omit<Database['public']['Tables']['payments']['Row'], 'id' | 'createdAt' | 'updatedAt'>;
        Update: Partial<Database['public']['Tables']['payments']['Insert']>;
      };
      reports: {
        Row: {
          id: string;
          clientId: string;
          type: string;
          periodStart: string;
          periodEnd: string;
          metrics: any;
          insights: string | null;
          pdfUrl: string | null;
          generatedAt: string;
          sentAt: string | null;
          viewedAt: string | null;
        };
        Insert: Omit<Database['public']['Tables']['reports']['Row'], 'id' | 'generatedAt'>;
        Update: Partial<Database['public']['Tables']['reports']['Insert']>;
      };
      tickets: {
        Row: {
          id: string;
          clientId: string;
          subject: string;
          description: string;
          priority: string;
          status: string;
          category: string | null;
          resolution: string | null;
          resolvedAt: string | null;
          resolvedBy: string | null;
          createdAt: string;
          updatedAt: string;
        };
        Insert: Omit<Database['public']['Tables']['tickets']['Row'], 'id' | 'createdAt' | 'updatedAt'>;
        Update: Partial<Database['public']['Tables']['tickets']['Insert']>;
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
};