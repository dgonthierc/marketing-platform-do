'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PricingCalculator } from '@/lib/quote/pricing-calculator';
import { 
  QuoteFormData, 
  CompanySize, 
  Timeline, 
  Urgency,
  Objective,
  Platform,
  SelectedService,
  QuoteCalculation
} from '@/types/quote';
import {
  Building2,
  Target,
  Rocket,
  Settings,
  ChevronRight,
  ChevronLeft,
  Check,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Calendar,
  Users,
  Mail,
  Phone,
  Globe,
  Loader2
} from 'lucide-react';

// Validation schemas for each step
const businessInfoSchema = z.object({
  companyName: z.string().min(2, 'Nombre de empresa requerido'),
  contactName: z.string().min(2, 'Nombre de contacto requerido'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Teléfono inválido'),
  website: z.string().url().optional().or(z.literal('')),
  industry: z.string().min(1, 'Industria requerida'),
  companySize: z.nativeEnum(CompanySize),
  currentMonthlyRevenue: z.string().optional()
});

const marketingGoalsSchema = z.object({
  objectives: z.array(z.object({
    id: z.string(),
    name: z.string(),
    icon: z.string(),
    priority: z.enum(['high', 'medium', 'low'])
  })).min(1, 'Selecciona al menos un objetivo'),
  targetAudience: z.string().min(10, 'Describe tu audiencia objetivo'),
  competitors: z.string().optional(),
  uniqueSellingPoints: z.string().min(10, 'Describe qué te hace único'),
  timeline: z.nativeEnum(Timeline),
  urgency: z.nativeEnum(Urgency)
});

const servicesSelectionSchema = z.object({
  services: z.array(z.any()).refine(
    (services) => services.some(s => s.selected),
    'Selecciona al menos un servicio'
  ),
  platforms: z.array(z.any()).refine(
    (platforms) => platforms.some(p => p.selected),
    'Selecciona al menos una plataforma'
  ),
  monthlyBudget: z.number().min(1000, 'Presupuesto mínimo $1,000'),
  adSpendBudget: z.number().min(500, 'Inversión publicitaria mínima $500')
});

const additionalRequirementsSchema = z.object({
  needsCreativeDesign: z.boolean(),
  needsLandingPages: z.boolean(),
  needsCopywriting: z.boolean(),
  needsAnalyticsSetup: z.boolean(),
  hasExistingAssets: z.boolean(),
  specialRequests: z.string().optional()
});

interface QuoteFormProps {
  onComplete?: (data: QuoteFormData, calculation: QuoteCalculation) => void;
}

export function QuoteForm({ onComplete }: QuoteFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCalculating, setIsCalculating] = useState(false);
  const [formData, setFormData] = useState<Partial<QuoteFormData>>({
    businessInfo: {
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      website: '',
      industry: '',
      companySize: CompanySize.SMALL,
      currentMonthlyRevenue: ''
    },
    marketingGoals: {
      objectives: [],
      targetAudience: '',
      competitors: '',
      uniqueSellingPoints: '',
      timeline: Timeline.THREE_MONTHS,
      urgency: Urgency.MEDIUM
    },
    servicesSelection: {
      services: [
        { id: 'google-ads', name: 'Google Ads', basePrice: 997, selected: false },
        { id: 'facebook-ads', name: 'Facebook & Instagram', basePrice: 897, selected: false },
        { id: 'tiktok-ads', name: 'TikTok Ads', basePrice: 797, selected: false },
        { id: 'linkedin-ads', name: 'LinkedIn B2B', basePrice: 1297, selected: false },
        { id: 'youtube-ads', name: 'YouTube Ads', basePrice: 997, selected: false }
      ],
      platforms: [
        { id: 'google', name: 'Google', icon: '🔍', selected: false },
        { id: 'meta', name: 'Meta', icon: '👤', selected: false },
        { id: 'tiktok', name: 'TikTok', icon: '🎵', selected: false },
        { id: 'linkedin', name: 'LinkedIn', icon: '💼', selected: false },
        { id: 'youtube', name: 'YouTube', icon: '📺', selected: false }
      ],
      monthlyBudget: 5000,
      adSpendBudget: 3000,
      currentCampaigns: []
    },
    additionalRequirements: {
      needsCreativeDesign: false,
      needsLandingPages: false,
      needsCopywriting: false,
      needsAnalyticsSetup: false,
      hasExistingAssets: false,
      specialRequests: ''
    }
  });

  const steps = [
    { number: 1, title: 'Información del Negocio', icon: Building2 },
    { number: 2, title: 'Objetivos de Marketing', icon: Target },
    { number: 3, title: 'Selección de Servicios', icon: Rocket },
    { number: 4, title: 'Requerimientos Adicionales', icon: Settings }
  ];

  const objectives: Objective[] = [
    { id: 'sales', name: 'Aumentar Ventas', icon: '💰', priority: 'high' },
    { id: 'leads', name: 'Generar Leads', icon: '📈', priority: 'high' },
    { id: 'brand', name: 'Brand Awareness', icon: '🎯', priority: 'medium' },
    { id: 'traffic', name: 'Tráfico Web', icon: '🌐', priority: 'medium' },
    { id: 'app', name: 'Descargas App', icon: '📱', priority: 'low' },
    { id: 'engagement', name: 'Engagement Social', icon: '💬', priority: 'low' }
  ];

  const industries = [
    'E-commerce',
    'Servicios B2B',
    'Salud y Bienestar',
    'Educación',
    'Real Estate',
    'Tecnología',
    'Restaurantes',
    'Moda y Belleza',
    'Automotriz',
    'Finanzas',
    'Viajes y Turismo',
    'Otro'
  ];

  const handleStepSubmit = async (stepData: any) => {
    const updatedData = {
      ...formData,
      [getCurrentStepKey()]: stepData
    };
    setFormData(updatedData);

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - calculate quote
      setIsCalculating(true);
      setTimeout(() => {
        const calculation = PricingCalculator.calculateQuote(updatedData as QuoteFormData);
        setIsCalculating(false);
        if (onComplete) {
          onComplete(updatedData as QuoteFormData, calculation);
        }
      }, 2000);
    }
  };

  const getCurrentStepKey = () => {
    switch (currentStep) {
      case 1: return 'businessInfo';
      case 2: return 'marketingGoals';
      case 3: return 'servicesSelection';
      case 4: return 'additionalRequirements';
      default: return 'businessInfo';
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-full
                ${currentStep >= step.number 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-200 text-gray-500'}
                transition-all duration-300
              `}>
                {currentStep > step.number ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`
                  flex-1 h-1 mx-2
                  ${currentStep > step.number ? 'bg-primary-600' : 'bg-gray-200'}
                  transition-all duration-300
                `} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs sm:text-sm">
          {steps.map((step) => (
            <div 
              key={step.number} 
              className={`
                text-center flex-1
                ${currentStep >= step.number ? 'text-primary-600 font-medium' : 'text-gray-500'}
              `}
            >
              {step.title}
            </div>
          ))}
        </div>
      </div>

      {/* Form Steps */}
      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <Step1BusinessInfo
            data={formData.businessInfo!}
            industries={industries}
            onSubmit={handleStepSubmit}
          />
        )}

        {currentStep === 2 && (
          <Step2MarketingGoals
            data={formData.marketingGoals!}
            objectives={objectives}
            onSubmit={handleStepSubmit}
            onBack={goToPreviousStep}
          />
        )}

        {currentStep === 3 && (
          <Step3ServicesSelection
            data={formData.servicesSelection!}
            onSubmit={handleStepSubmit}
            onBack={goToPreviousStep}
          />
        )}

        {currentStep === 4 && (
          <Step4AdditionalRequirements
            data={formData.additionalRequirements!}
            onSubmit={handleStepSubmit}
            onBack={goToPreviousStep}
            isCalculating={isCalculating}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Step 1: Business Information
function Step1BusinessInfo({ 
  data, 
  industries, 
  onSubmit 
}: { 
  data: any;
  industries: string[];
  onSubmit: (data: any) => void;
}) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(businessInfoSchema),
    defaultValues: data
  });

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre de la Empresa *
          </label>
          <Input
            {...register('companyName')}
            placeholder="Mi Empresa S.A."
            className={errors.companyName ? 'border-red-500' : ''}
          />
          {errors.companyName && (
            <p className="text-red-500 text-xs mt-1">{errors.companyName.message as string}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del Contacto *
          </label>
          <Input
            {...register('contactName')}
            placeholder="Juan Pérez"
            className={errors.contactName ? 'border-red-500' : ''}
          />
          {errors.contactName && (
            <p className="text-red-500 text-xs mt-1">{errors.contactName.message as string}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <Input
            type="email"
            {...register('email')}
            placeholder="contacto@empresa.com"
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message as string}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono *
          </label>
          <Input
            type="tel"
            {...register('phone')}
            placeholder="+52 555 123 4567"
            className={errors.phone ? 'border-red-500' : ''}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message as string}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Sitio Web
        </label>
        <Input
          type="url"
          {...register('website')}
          placeholder="https://www.miempresa.com"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Industria *
          </label>
          <select
            {...register('industry')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Selecciona una industria</option>
            {industries.map(industry => (
              <option key={industry} value={industry.toLowerCase().replace(/ /g, '-')}>
                {industry}
              </option>
            ))}
          </select>
          {errors.industry && (
            <p className="text-red-500 text-xs mt-1">{errors.industry.message as string}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tamaño de Empresa *
          </label>
          <select
            {...register('companySize')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value={CompanySize.STARTUP}>Startup (1-10 empleados)</option>
            <option value={CompanySize.SMALL}>Pequeña (11-50 empleados)</option>
            <option value={CompanySize.MEDIUM}>Mediana (51-200 empleados)</option>
            <option value={CompanySize.ENTERPRISE}>Grande (200+ empleados)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ingresos Mensuales Actuales (Opcional)
        </label>
        <select
          {...register('currentMonthlyRevenue')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Prefiero no decir</option>
          <option value="0-10k">$0 - $10,000</option>
          <option value="10k-50k">$10,000 - $50,000</option>
          <option value="50k-100k">$50,000 - $100,000</option>
          <option value="100k-500k">$100,000 - $500,000</option>
          <option value="500k+">$500,000+</option>
        </select>
      </div>

      <div className="flex justify-end">
        <Button type="submit" variant="cta" size="lg">
          Continuar
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.form>
  );
}

// Step 2: Marketing Goals
function Step2MarketingGoals({ 
  data, 
  objectives,
  onSubmit,
  onBack
}: { 
  data: any;
  objectives: Objective[];
  onSubmit: (data: any) => void;
  onBack: () => void;
}) {
  const [selectedObjectives, setSelectedObjectives] = useState<Objective[]>(
    data.objectives || []
  );

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(marketingGoalsSchema),
    defaultValues: {
      ...data,
      objectives: selectedObjectives
    }
  });

  const toggleObjective = (objective: Objective) => {
    const exists = selectedObjectives.find(o => o.id === objective.id);
    if (exists) {
      setSelectedObjectives(selectedObjectives.filter(o => o.id !== objective.id));
    } else {
      setSelectedObjectives([...selectedObjectives, objective]);
    }
  };

  const onFormSubmit = (formData: any) => {
    onSubmit({
      ...formData,
      objectives: selectedObjectives
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit(onFormSubmit)}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          ¿Cuáles son tus objetivos principales? *
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {objectives.map(objective => (
            <button
              key={objective.id}
              type="button"
              onClick={() => toggleObjective(objective)}
              className={`
                p-3 rounded-lg border-2 transition-all text-left
                ${selectedObjectives.find(o => o.id === objective.id)
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{objective.icon}</span>
                <span className="text-sm font-medium">{objective.name}</span>
              </div>
            </button>
          ))}
        </div>
        {errors.objectives && (
          <p className="text-red-500 text-xs mt-2">Selecciona al menos un objetivo</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ¿Quién es tu audiencia objetivo? *
        </label>
        <textarea
          {...register('targetAudience')}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          placeholder="Ej: Mujeres de 25-45 años, profesionales, interesadas en moda sustentable..."
        />
        {errors.targetAudience && (
          <p className="text-red-500 text-xs mt-1">{errors.targetAudience.message as string}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ¿Quiénes son tus principales competidores?
        </label>
        <Input
          {...register('competitors')}
          placeholder="Ej: Competidor A, Competidor B..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ¿Qué te hace único? *
        </label>
        <textarea
          {...register('uniqueSellingPoints')}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          placeholder="Ej: Productos hechos a mano, envío gratis, garantía de por vida..."
        />
        {errors.uniqueSellingPoints && (
          <p className="text-red-500 text-xs mt-1">{errors.uniqueSellingPoints.message as string}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Timeline del Proyecto *
          </label>
          <select
            {...register('timeline')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value={Timeline.IMMEDIATE}>Inmediato</option>
            <option value={Timeline.ONE_MONTH}>1 mes</option>
            <option value={Timeline.THREE_MONTHS}>3 meses</option>
            <option value={Timeline.SIX_MONTHS}>6 meses</option>
            <option value={Timeline.FLEXIBLE}>Flexible</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Urgencia *
          </label>
          <select
            {...register('urgency')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value={Urgency.LOW}>Baja - Explorando opciones</option>
            <option value={Urgency.MEDIUM}>Media - Planeando empezar pronto</option>
            <option value={Urgency.HIGH}>Alta - Necesito empezar ya</option>
            <option value={Urgency.CRITICAL}>Crítica - Es urgente</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" size="lg" onClick={onBack}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Atrás
        </Button>
        <Button type="submit" variant="cta" size="lg">
          Continuar
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.form>
  );
}

// Step 3: Services Selection
function Step3ServicesSelection({ 
  data,
  onSubmit,
  onBack
}: { 
  data: any;
  onSubmit: (data: any) => void;
  onBack: () => void;
}) {
  const [services, setServices] = useState<SelectedService[]>(data.services || []);
  const [platforms, setPlatforms] = useState<Platform[]>(data.platforms || []);
  const [monthlyBudget, setMonthlyBudget] = useState(data.monthlyBudget || 5000);
  const [adSpendBudget, setAdSpendBudget] = useState(data.adSpendBudget || 3000);

  const toggleService = (serviceId: string) => {
    setServices(services.map(s => 
      s.id === serviceId ? { ...s, selected: !s.selected } : s
    ));
  };

  const togglePlatform = (platformId: string) => {
    setPlatforms(platforms.map(p => 
      p.id === platformId ? { ...p, selected: !p.selected } : p
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate at least one service and platform selected
    if (!services.some(s => s.selected)) {
      alert('Selecciona al menos un servicio');
      return;
    }
    if (!platforms.some(p => p.selected)) {
      alert('Selecciona al menos una plataforma');
      return;
    }

    onSubmit({
      services,
      platforms,
      monthlyBudget,
      adSpendBudget
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Servicios que te interesan *
        </label>
        <div className="space-y-3">
          {services.map(service => (
            <label
              key={service.id}
              className={`
                flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all
                ${service.selected
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={service.selected}
                  onChange={() => toggleService(service.id)}
                  className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                />
                <div>
                  <div className="font-medium">{service.name}</div>
                  <div className="text-sm text-gray-600">
                    Desde ${service.basePrice}/mes
                  </div>
                </div>
              </div>
              {service.selected && (
                <Check className="w-5 h-5 text-primary-600" />
              )}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Plataformas donde quieres anunciarte *
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {platforms.map(platform => (
            <button
              key={platform.id}
              type="button"
              onClick={() => togglePlatform(platform.id)}
              className={`
                p-3 rounded-lg border-2 transition-all
                ${platform.selected
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <div className="text-2xl mb-1">{platform.icon}</div>
              <div className="text-sm font-medium">{platform.name}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Presupuesto mensual total estimado
        </label>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">Gestión de campañas</span>
              <span className="font-semibold">${monthlyBudget.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="20000"
              step="500"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>$1,000</span>
              <span>$20,000</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">Inversión publicitaria</span>
              <span className="font-semibold">${adSpendBudget.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="500"
              max="50000"
              step="500"
              value={adSpendBudget}
              onChange={(e) => setAdSpendBudget(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>$500</span>
              <span>$50,000</span>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <strong>Total estimado:</strong> ${(monthlyBudget + adSpendBudget).toLocaleString()}/mes
              <br />
              Este es un estimado inicial. Te enviaremos una propuesta personalizada.
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" size="lg" onClick={onBack}>
          <ChevronLeft className="w-4 h-4 mr-2" />
          Atrás
        </Button>
        <Button type="submit" variant="cta" size="lg">
          Continuar
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.form>
  );
}

// Step 4: Additional Requirements
function Step4AdditionalRequirements({ 
  data,
  onSubmit,
  onBack,
  isCalculating
}: { 
  data: any;
  onSubmit: (data: any) => void;
  onBack: () => void;
  isCalculating: boolean;
}) {
  const { register, handleSubmit, watch } = useForm({
    resolver: zodResolver(additionalRequirementsSchema),
    defaultValues: data
  });

  const watchedValues = watch();

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Servicios adicionales que podrías necesitar
        </label>
        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                {...register('needsCreativeDesign')}
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
              <div>
                <div className="font-medium">Diseño Creativo</div>
                <div className="text-sm text-gray-600">Creación de anuncios y banners</div>
              </div>
            </div>
            <span className="text-sm text-gray-500">+$497/mes</span>
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                {...register('needsLandingPages')}
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
              <div>
                <div className="font-medium">Landing Pages</div>
                <div className="text-sm text-gray-600">Páginas de aterrizaje optimizadas</div>
              </div>
            </div>
            <span className="text-sm text-gray-500">+$397/mes</span>
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                {...register('needsCopywriting')}
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
              <div>
                <div className="font-medium">Copywriting</div>
                <div className="text-sm text-gray-600">Redacción de textos persuasivos</div>
              </div>
            </div>
            <span className="text-sm text-gray-500">+$297/mes</span>
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                {...register('needsAnalyticsSetup')}
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
              <div>
                <div className="font-medium">Setup de Analytics</div>
                <div className="text-sm text-gray-600">Configuración de tracking avanzado</div>
              </div>
            </div>
            <span className="text-sm text-gray-500">+$497 único</span>
          </label>
        </div>
      </div>

      <div>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            {...register('hasExistingAssets')}
            className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
          />
          <span className="text-sm font-medium text-gray-700">
            Ya tengo material gráfico y contenido existente
          </span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Comentarios o requerimientos especiales
        </label>
        <textarea
          {...register('specialRequests')}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          placeholder="Cuéntanos si tienes algún requerimiento especial o información adicional que debamos saber..."
        />
      </div>

      <div className="flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          size="lg" 
          onClick={onBack}
          disabled={isCalculating}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Atrás
        </Button>
        <Button 
          type="submit" 
          variant="cta" 
          size="lg"
          disabled={isCalculating}
        >
          {isCalculating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Calculando...
            </>
          ) : (
            <>
              Obtener Cotización
              <ChevronRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </motion.form>
  );
}