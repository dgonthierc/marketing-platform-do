/**
 * Database Types - Type-safe interfaces for all models
 */

// Lead Types
export interface Lead {
  id: string;
  email: string;
  name?: string | null;
  company?: string | null;
  phone?: string | null;
  source: LeadSource;
  status: LeadStatus;
  score: number;
  industry?: string | null;
  budget?: string | null;
  platforms: string[];
  timeline?: string | null;
  message?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export enum LeadStatus {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  QUALIFIED = 'QUALIFIED',
  QUOTED = 'QUOTED',
  CONVERTED = 'CONVERTED',
  LOST = 'LOST',
}

export enum LeadSource {
  WEBSITE = 'website',
  REFERRAL = 'referral',
  GOOGLE = 'google',
  SOCIAL = 'social',
  DIRECT = 'direct',
  EMAIL = 'email',
  PHONE = 'phone',
}

// Quote Types
export interface Quote {
  id: string;
  leadId: string;
  services: QuoteServices;
  monthlyFee: number;
  setupFee: number;
  totalValue: number;
  status: QuoteStatus;
  validUntil: Date;
  sentAt?: Date | null;
  viewedAt?: Date | null;
  acceptedAt?: Date | null;
  rejectedAt?: Date | null;
  notes?: string | null;
  createdAt: Date;
  lead?: Lead;
}

export interface QuoteServices {
  platforms: string[];
  budget: number;
  duration: number; // months
  includes: string[];
  customRequirements?: string;
}

export enum QuoteStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  SENT = 'SENT',
  VIEWED = 'VIEWED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
}

// Client Types
export interface Client {
  id: string;
  leadId?: string | null;
  name: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  industry: string;
  status: ClientStatus;
  monthlyFee: number;
  startDate: Date;
  endDate?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  lead?: Lead;
  projects?: Project[];
  payments?: Payment[];
}

export enum ClientStatus {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  ENDED = 'ENDED',
  CHURNED = 'CHURNED',
}

// Project Types
export interface Project {
  id: string;
  clientId: string;
  name: string;
  platforms: string[];
  monthlyBudget: number;
  status: ProjectStatus;
  startDate: Date;
  endDate?: Date | null;
  results?: ProjectResults;
  createdAt: Date;
  updatedAt: Date;
  client?: Client;
  campaigns?: Campaign[];
}

export interface ProjectResults {
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  revenue: number;
  roi: number;
}

export enum ProjectStatus {
  PLANNING = 'PLANNING',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

// Campaign Types
export interface Campaign {
  id: string;
  projectId: string;
  platform: string;
  name: string;
  status: CampaignStatus;
  budget: number;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  cpc?: number | null;
  cpm?: number | null;
  cpa?: number | null;
  roas?: number | null;
  startDate: Date;
  endDate?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  project?: Project;
}

export enum CampaignStatus {
  DRAFT = 'DRAFT',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  ENDED = 'ENDED',
}

// Payment Types
export interface Payment {
  id: string;
  clientId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method?: PaymentMethod | null;
  invoiceId?: string | null;
  dueDate: Date;
  paidAt?: Date | null;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  client?: Client;
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentMethod {
  CARD = 'CARD',
  BANK_TRANSFER = 'BANK_TRANSFER',
  PAYPAL = 'PAYPAL',
  STRIPE = 'STRIPE',
  CASH = 'CASH',
}

// Report Types
export interface Report {
  id: string;
  clientId: string;
  projectId?: string | null;
  type: ReportType;
  period: ReportPeriod;
  data: Record<string, any>;
  metrics: ReportMetrics;
  fileUrl?: string | null;
  sentAt?: Date | null;
  viewedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  client?: Client;
  project?: Project;
}

export interface ReportMetrics {
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  revenue: number;
  roi: number;
  ctr: number;
  cvr: number;
  cpc: number;
  cpa: number;
}

export enum ReportType {
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  CUSTOM = 'CUSTOM',
}

export enum ReportPeriod {
  LAST_7_DAYS = 'LAST_7_DAYS',
  LAST_30_DAYS = 'LAST_30_DAYS',
  LAST_90_DAYS = 'LAST_90_DAYS',
  THIS_MONTH = 'THIS_MONTH',
  LAST_MONTH = 'LAST_MONTH',
  CUSTOM = 'CUSTOM',
}

// Lead Interaction Types
export interface LeadInteraction {
  id: string;
  leadId: string;
  type: InteractionType;
  channel: InteractionChannel;
  subject?: string | null;
  content?: string | null;
  outcome?: string | null;
  createdAt: Date;
  createdBy?: string | null;
  lead?: Lead;
}

export enum InteractionType {
  EMAIL = 'EMAIL',
  CALL = 'CALL',
  MEETING = 'MEETING',
  NOTE = 'NOTE',
  TASK = 'TASK',
  QUOTE_SENT = 'QUOTE_SENT',
  FOLLOW_UP = 'FOLLOW_UP',
}

export enum InteractionChannel {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
  WHATSAPP = 'WHATSAPP',
  ZOOM = 'ZOOM',
  IN_PERSON = 'IN_PERSON',
  WEBSITE = 'WEBSITE',
  OTHER = 'OTHER',
}

// Support Ticket Types
export interface Ticket {
  id: string;
  clientId: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory;
  assignedTo?: string | null;
  resolvedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  client?: Client;
  messages?: TicketMessage[];
}

export enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  WAITING_CLIENT = 'WAITING_CLIENT',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

export enum TicketPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export enum TicketCategory {
  TECHNICAL = 'TECHNICAL',
  BILLING = 'BILLING',
  CAMPAIGN = 'CAMPAIGN',
  REPORT = 'REPORT',
  GENERAL = 'GENERAL',
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  message: string;
  isInternal: boolean;
  attachments?: string[] | null;
  createdAt: Date;
  createdBy: string;
  ticket?: Ticket;
}

// Form Input Types
export interface LeadFormData {
  email: string;
  name?: string;
  company?: string;
  phone?: string;
  budget?: string;
  platforms?: string[];
  timeline?: string;
  message?: string;
  source?: LeadSource;
}

export interface QuoteFormData {
  platforms: string[];
  budget: number;
  duration: number;
  includes: string[];
  customRequirements?: string;
}

export interface ContactFormData extends LeadFormData {
  acceptTerms: boolean;
  receiveUpdates?: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Dashboard Types
export interface DashboardMetrics {
  totalLeads: number;
  qualifiedLeads: number;
  conversionRate: number;
  activeClients: number;
  monthlyRevenue: number;
  averageTicketValue: number;
  campaignPerformance: CampaignPerformance[];
  recentActivities: Activity[];
}

export interface CampaignPerformance {
  platform: string;
  spend: number;
  revenue: number;
  roi: number;
  conversions: number;
}

export interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}