'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { services } from '@/data/services';
import { ServiceCalculatorData } from '@/types/services';
import { 
  Calculator,
  TrendingUp,
  DollarSign,
  Target,
  ChevronRight,
  Info
} from 'lucide-react';

interface ServiceCalculatorProps {
  onClose?: () => void;
}

export function ServiceCalculator({ onClose }: ServiceCalculatorProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<ServiceCalculatorData>({
    budget: 5000,
    platforms: [],
    duration: 6,
    objectives: [],
    industry: ''
  });

  const platforms = [
    { id: 'google', name: 'Google Ads', icon: '🔍' },
    { id: 'meta', name: 'Facebook/Instagram', icon: '📱' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼' },
    { id: 'youtube', name: 'YouTube', icon: '📺' }
  ];

  const objectives = [
    { id: 'sales', name: 'Aumentar Ventas', icon: '💰' },
    { id: 'leads', name: 'Generar Leads', icon: '📈' },
    { id: 'brand', name: 'Brand Awareness', icon: '🎯' },
    { id: 'traffic', name: 'Tráfico Web', icon: '🌐' },
    { id: 'app', name: 'Descargas App', icon: '📱' }
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
    'Otro'
  ];

  const calculateRecommendation = () => {
    const recommendedServices = services.filter(service => {
      const platformMatch = service.platforms.some(p => 
        data.platforms.includes(p.id)
      );
      const budgetMatch = service.pricing.starting <= data.budget * 0.3;
      return platformMatch && budgetMatch;
    });

    const monthlyInvestment = Math.round(data.budget * 0.2);
    const estimatedROI = Math.round(data.budget * 2.8);
    const managementFee = Math.round(monthlyInvestment);

    return {
      services: recommendedServices.slice(0, 3),
      monthlyInvestment,
      managementFee,
      estimatedROI,
      timeToResults: '2-4 semanas'
    };
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-auto">
      <div className="p-6 border-b bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calculator className="w-6 h-6" />
            <h3 className="text-xl font-bold">Calculadora de ROI</h3>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <div className="mt-4 flex gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`flex-1 h-2 rounded-full transition-all ${
                s <= step ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-lg font-semibold mb-4">
                ¿Cuál es tu presupuesto mensual para publicidad?
              </h4>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Presupuesto publicitario</span>
                  <span className="text-2xl font-bold text-primary-600">
                    ${data.budget.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="500"
                  value={data.budget}
                  onChange={(e) => setData({ ...data, budget: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$1,000</span>
                  <span>$50,000</span>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <strong>Recomendación:</strong> Para obtener resultados óptimos, 
                    recomendamos un presupuesto mínimo de $3,000/mes en publicidad.
                  </div>
                </div>
              </div>

              <Button 
                variant="cta" 
                size="lg" 
                className="w-full"
                onClick={nextStep}
              >
                Continuar
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-lg font-semibold mb-4">
                ¿En qué plataformas quieres anunciarte?
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => {
                      const updated = data.platforms.includes(platform.id)
                        ? data.platforms.filter(p => p !== platform.id)
                        : [...data.platforms, platform.id];
                      setData({ ...data, platforms: updated });
                    }}
                    className={`
                      p-4 rounded-lg border-2 transition-all
                      ${data.platforms.includes(platform.id)
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

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="flex-1"
                  onClick={prevStep}
                >
                  Atrás
                </Button>
                <Button 
                  variant="cta" 
                  size="lg" 
                  className="flex-1"
                  onClick={nextStep}
                  disabled={data.platforms.length === 0}
                >
                  Continuar
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-lg font-semibold mb-4">
                ¿Cuáles son tus objetivos principales?
              </h4>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {objectives.map((objective) => (
                  <button
                    key={objective.id}
                    onClick={() => {
                      const updated = data.objectives.includes(objective.id)
                        ? data.objectives.filter(o => o !== objective.id)
                        : [...data.objectives, objective.id];
                      setData({ ...data, objectives: updated });
                    }}
                    className={`
                      p-3 rounded-lg border-2 transition-all text-left
                      ${data.objectives.includes(objective.id)
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

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industria
                </label>
                <select
                  value={data.industry}
                  onChange={(e) => setData({ ...data, industry: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Selecciona tu industria</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="flex-1"
                  onClick={prevStep}
                >
                  Atrás
                </Button>
                <Button 
                  variant="cta" 
                  size="lg" 
                  className="flex-1"
                  onClick={nextStep}
                  disabled={data.objectives.length === 0 || !data.industry}
                >
                  Ver Resultados
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-bold mb-2">
                  Tu Estrategia Personalizada
                </h4>
                <p className="text-gray-600">
                  Basado en tu presupuesto y objetivos
                </p>
              </div>

              {(() => {
                const recommendation = calculateRecommendation();
                return (
                  <>
                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <DollarSign className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Inversión Mensual</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          ${recommendation.monthlyInvestment.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          Publicidad + Gestión
                        </div>
                      </div>

                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-600">ROI Estimado</span>
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                          ${recommendation.estimatedROI.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          En {recommendation.timeToResults}
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h5 className="font-semibold mb-3">Servicios Recomendados:</h5>
                      <div className="space-y-2">
                        {recommendation.services.map((service) => (
                          <div
                            key={service.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{service.icon}</span>
                              <div>
                                <div className="font-medium">{service.name}</div>
                                <div className="text-sm text-gray-600">
                                  ROI promedio: {service.metrics.avgROI}
                                </div>
                              </div>
                            </div>
                            <Target className="w-5 h-5 text-primary-600" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      variant="cta"
                      size="lg"
                      className="w-full"
                      onClick={() => {
                        document.getElementById('contact-form')?.scrollIntoView({ 
                          behavior: 'smooth' 
                        });
                        if (onClose) onClose();
                      }}
                    >
                      Solicitar Propuesta Detallada
                    </Button>
                  </>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}