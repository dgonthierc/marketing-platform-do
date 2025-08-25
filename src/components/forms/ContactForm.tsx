'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { 
  Mail, 
  Phone, 
  Building2, 
  DollarSign, 
  Calendar,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { calculateLeadScore } from '@/lib/utils';
import { LeadFormData } from '@/types/database';

// Validation Schema
const contactSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Email es requerido'),
  name: z.string().optional(),
  company: z.string().optional(),
  phone: z.string().optional(),
  budget: z.enum(['<1k', '1k-5k', '5k-10k', '10k+', 'no-sure']).optional(),
  platforms: z.array(z.string()).min(1, 'Selecciona al menos una plataforma'),
  timeline: z.enum(['immediate', '1month', '3months', '6months', 'planning']).optional(),
  message: z.string().optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'Debes aceptar los términos y condiciones',
  }),
  receiveUpdates: z.boolean().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const platforms = [
  { id: 'google', name: 'Google Ads', icon: '🔍', popular: true },
  { id: 'meta', name: 'Facebook/Instagram', icon: '📱', popular: true },
  { id: 'tiktok', name: 'TikTok Ads', icon: '🎵', popular: true },
  { id: 'linkedin', name: 'LinkedIn Ads', icon: '💼' },
  { id: 'twitter', name: 'X (Twitter)', icon: '🐦' },
  { id: 'pinterest', name: 'Pinterest', icon: '📌' },
];

const budgetOptions = [
  { value: '<1k', label: 'Menos de $1,000/mes' },
  { value: '1k-5k', label: '$1,000 - $5,000/mes' },
  { value: '5k-10k', label: '$5,000 - $10,000/mes' },
  { value: '10k+', label: 'Más de $10,000/mes' },
  { value: 'no-sure', label: 'No estoy seguro' },
];

const timelineOptions = [
  { value: 'immediate', label: 'Inmediato', urgent: true },
  { value: '1month', label: 'En 1 mes' },
  { value: '3months', label: 'En 3 meses' },
  { value: '6months', label: 'En 6 meses' },
  { value: 'planning', label: 'Solo investigando' },
];

export function ContactForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [leadScore, setLeadScore] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
    defaultValues: {
      platforms: [],
      receiveUpdates: true,
    },
  });

  const watchedPlatforms = watch('platforms') || [];
  const watchedBudget = watch('budget');
  const watchedTimeline = watch('timeline');

  const togglePlatform = (platformId: string) => {
    const current = watchedPlatforms;
    if (current.includes(platformId)) {
      setValue('platforms', current.filter(p => p !== platformId));
    } else {
      setValue('platforms', [...current, platformId]);
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Calculate lead score
      const score = calculateLeadScore({
        email: data.email,
        company: data.company,
        phone: data.phone,
        budget: data.budget,
        platforms: data.platforms
      } as any);
      
      setLeadScore(score);

      // Submit to API
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          source: 'website',
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        // Track conversion
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'generate_lead', {
            value: score,
            currency: 'USD',
          });
        }
      } else {
        throw new Error('Error al enviar el formulario');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al enviar el formulario. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto text-center py-12"
      >
        <div className="mb-6">
          <div className="w-20 h-20 bg-[var(--color-success)] rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
            ¡Solicitud Recibida!
          </h3>
          {leadScore >= 70 && (
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary-700)] text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4 mr-1" />
              Lead de Alta Prioridad
            </div>
          )}
          <p className="text-[var(--color-gray-600)]">
            Hemos recibido tu solicitud de auditoría gratuita. 
            Un especialista te contactará en las próximas 24 horas.
          </p>
        </div>
        
        <div className="bg-[var(--color-gray-50)] rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-[var(--color-gray-900)] mb-3">
            Mientras tanto, puedes:
          </h4>
          <ul className="text-left text-[var(--color-gray-600)] space-y-2">
            <li className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-[var(--color-success)] mr-2 mt-0.5" />
              <span>Revisar tu bandeja de entrada para confirmar tu email</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-[var(--color-success)] mr-2 mt-0.5" />
              <span>Preparar acceso a tus cuentas publicitarias actuales</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-[var(--color-success)] mr-2 mt-0.5" />
              <span>Pensar en tus objetivos de marketing principales</span>
            </li>
          </ul>
        </div>

        <Button
          variant="cta"
          size="lg"
          onClick={() => window.location.href = '/'}
          className="min-w-[200px]"
        >
          Volver al Inicio
        </Button>
      </motion.div>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto" id="contact-form">
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-[var(--color-gray-600)]">
              Paso {step} de 3
            </span>
            <span className="text-sm text-[var(--color-gray-600)]">
              {Math.round((step / 3) * 100)}% completado
            </span>
          </div>
          <div className="w-full bg-[var(--color-gray-200)] rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-primary-600)] h-2 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Contact Info */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
                  Comencemos con tu información
                </h3>
                <p className="text-[var(--color-gray-600)]">
                  Necesitamos algunos datos para preparar tu auditoría personalizada
                </p>
              </div>

              <div className="space-y-4">
                <Input
                  {...register('email')}
                  type="email"
                  label="Email corporativo *"
                  leftIcon={<Mail className="w-5 h-5" />}
                  error={errors.email?.message}
                  placeholder="tu@empresa.com"
                />

                <Input
                  {...register('name')}
                  label="Nombre completo"
                  placeholder="Juan Pérez"
                />

                <Input
                  {...register('company')}
                  label="Empresa"
                  leftIcon={<Building2 className="w-5 h-5" />}
                  placeholder="Mi Empresa S.A."
                />

                <Input
                  {...register('phone')}
                  type="tel"
                  label="Teléfono"
                  leftIcon={<Phone className="w-5 h-5" />}
                  placeholder="+52 55 1234 5678"
                />
              </div>

              <div className="mt-6">
                <Button
                  type="button"
                  variant="cta"
                  size="full"
                  onClick={nextStep}
                  disabled={!watch('email')}
                >
                  Continuar
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Platforms & Budget */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
                  ¿Dónde quieres anunciarte?
                </h3>
                <p className="text-[var(--color-gray-600)]">
                  Selecciona las plataformas donde necesitas ayuda
                </p>
              </div>

              {/* Platforms Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-3">
                  Plataformas publicitarias *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {platforms.map((platform) => (
                    <motion.button
                      key={platform.id}
                      type="button"
                      onClick={() => togglePlatform(platform.id)}
                      className={`
                        relative p-4 rounded-lg border-2 transition-all
                        ${watchedPlatforms.includes(platform.id)
                          ? 'border-[var(--color-primary-500)] bg-[var(--color-primary-50)]'
                          : 'border-[var(--color-gray-300)] hover:border-[var(--color-gray-400)]'
                        }
                      `}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {platform.popular && (
                        <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-[var(--color-warning)] text-white text-xs rounded-full">
                          Popular
                        </span>
                      )}
                      <div className="text-2xl mb-1">{platform.icon}</div>
                      <div className="text-sm font-medium">{platform.name}</div>
                    </motion.button>
                  ))}
                </div>
                {errors.platforms && (
                  <p className="mt-2 text-sm text-[var(--color-error)]">
                    {errors.platforms.message}
                  </p>
                )}
              </div>

              {/* Budget Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-3">
                  <DollarSign className="inline w-4 h-4 mr-1" />
                  Presupuesto mensual estimado
                </label>
                <div className="space-y-2">
                  {budgetOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center p-3 rounded-lg border border-[var(--color-gray-300)] hover:bg-[var(--color-gray-50)] cursor-pointer transition-colors"
                    >
                      <input
                        type="radio"
                        {...register('budget')}
                        value={option.value}
                        className="mr-3"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="flex-1"
                >
                  Anterior
                </Button>
                <Button
                  type="button"
                  variant="cta"
                  onClick={nextStep}
                  disabled={watchedPlatforms.length === 0}
                  className="flex-1"
                >
                  Continuar
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Timeline & Message */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2">
                  ¿Cuándo quieres empezar?
                </h3>
                <p className="text-[var(--color-gray-600)]">
                  Esto nos ayuda a priorizar tu solicitud
                </p>
              </div>

              {/* Timeline Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-3">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Tiempo de inicio deseado
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {timelineOptions.map((option) => (
                    <label
                      key={option.value}
                      className="relative flex items-center p-3 rounded-lg border border-[var(--color-gray-300)] hover:bg-[var(--color-gray-50)] cursor-pointer transition-colors"
                    >
                      {option.urgent && (
                        <span className="absolute -top-2 -right-2 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-error)] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-error)]"></span>
                        </span>
                      )}
                      <input
                        type="radio"
                        {...register('timeline')}
                        value={option.value}
                        className="mr-3"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                  <MessageSquare className="inline w-4 h-4 mr-1" />
                  ¿Algo más que debamos saber?
                </label>
                <textarea
                  {...register('message')}
                  rows={4}
                  className="w-full px-3 py-2 border border-[var(--color-gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent resize-none"
                  placeholder="Cuéntanos sobre tus objetivos, retos actuales, o cualquier pregunta que tengas..."
                />
              </div>

              {/* Terms & Newsletter */}
              <div className="space-y-3 mb-6">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    {...register('acceptTerms')}
                    className="mt-1 mr-3"
                  />
                  <span className="text-sm text-[var(--color-gray-600)]">
                    Acepto los{' '}
                    <a href="/terms" className="text-[var(--color-primary-600)] hover:underline">
                      términos y condiciones
                    </a>
                    {' '}y la{' '}
                    <a href="/privacy" className="text-[var(--color-primary-600)] hover:underline">
                      política de privacidad
                    </a>
                    {' '}*
                  </span>
                </label>
                {errors.acceptTerms && (
                  <p className="text-sm text-[var(--color-error)] ml-6">
                    {errors.acceptTerms.message}
                  </p>
                )}

                <label className="flex items-start">
                  <input
                    type="checkbox"
                    {...register('receiveUpdates')}
                    className="mt-1 mr-3"
                  />
                  <span className="text-sm text-[var(--color-gray-600)]">
                    Quiero recibir tips y estrategias de marketing digital
                  </span>
                </label>
              </div>

              {/* Lead Score Preview (if high) */}
              {watchedBudget && watchedTimeline && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-gradient-to-r from-[var(--color-primary-50)] to-blue-50 rounded-lg border border-[var(--color-primary-200)]"
                >
                  <div className="flex items-center">
                    <TrendingUp className="w-5 h-5 text-[var(--color-primary-600)] mr-2" />
                    <span className="text-sm font-medium text-[var(--color-primary-700)]">
                      Tu solicitud tiene alta prioridad. Te contactaremos en menos de 24 horas.
                    </span>
                  </div>
                </motion.div>
              )}

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  Anterior
                </Button>
                <Button
                  type="submit"
                  variant="cta"
                  loading={isSubmitting}
                  loadingText="Enviando..."
                  disabled={!isValid || isSubmitting}
                  className="flex-1"
                >
                  Solicitar Auditoría
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </Card>
  );
}