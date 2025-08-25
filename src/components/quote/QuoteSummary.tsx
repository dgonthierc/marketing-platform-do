'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { QuoteFormData, QuoteCalculation } from '@/types/quote';
import { QuotePDFDownloadLink } from '@/lib/pdf/quote-generator';
import {
  CheckCircle,
  TrendingUp,
  Calendar,
  DollarSign,
  Download,
  Send,
  Shield,
  Award,
  Clock,
  Users,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface QuoteSummaryProps {
  formData: QuoteFormData;
  calculation: QuoteCalculation;
  onAccept?: () => void;
  onModify?: () => void;
}

export function QuoteSummary({ 
  formData, 
  calculation, 
  onAccept, 
  onModify 
}: QuoteSummaryProps) {
  const totalInvestment = calculation.totalMonthlyInvestment;
  const roi = calculation.estimatedROI;
  const roiPercentage = Math.round((roi / totalInvestment - 1) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto"
    >
      {/* Success Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4"
        >
          <CheckCircle className="w-10 h-10 text-green-600" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          ¡Tu Cotización Está Lista!
        </h2>
        <p className="text-lg text-gray-600">
          Hemos preparado una propuesta personalizada para {formData.businessInfo.companyName}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Quote Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Investment Summary Card */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary-600" />
              Resumen de Inversión
            </h3>
            
            {/* Services Breakdown */}
            <div className="space-y-3 mb-6">
              {calculation.services.map((service, index) => (
                <div key={index} className="flex justify-between items-start py-2 border-b border-gray-100 last:border-0">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{service.service}</div>
                    <div className="text-sm text-gray-600">{service.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      ${service.total.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {service.frequency === 'monthly' ? '/mes' : 'único'}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Discounts */}
            {calculation.discounts && calculation.discounts.length > 0 && (
              <div className="bg-green-50 rounded-lg p-4 mb-6">
                <div className="text-sm font-medium text-green-800 mb-2">
                  Descuentos Aplicados
                </div>
                {calculation.discounts.map((discount, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-green-700">{discount.description}</span>
                    <span className="font-semibold text-green-800">
                      -${discount.amount.toLocaleString()} ({discount.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Totals */}
            <div className="space-y-2 pt-4 border-t">
              <div className="flex justify-between">
                <span className="text-gray-600">Setup inicial</span>
                <span className="font-semibold">${calculation.oneTimeSetup.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gestión mensual</span>
                <span className="font-semibold">${calculation.monthlyManagement.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Inversión publicitaria recomendada</span>
                <span className="font-semibold">${calculation.recommendedAdSpend.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Total Mensual</span>
                <span className="text-primary-600">${totalInvestment.toLocaleString()}</span>
              </div>
            </div>
          </Card>

          {/* ROI Projection Card */}
          <Card className="p-6 bg-gradient-to-br from-primary-50 to-blue-50">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-600" />
              Proyección de Resultados
            </h3>
            
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-3xl font-bold text-green-600">
                  {roiPercentage}%
                </div>
                <div className="text-sm text-gray-600">ROI Estimado</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-3xl font-bold text-primary-600">
                  ${roi.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Retorno Mensual</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {calculation.paybackPeriod}
                </div>
                <div className="text-sm text-gray-600">Tiempo de Retorno</div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-white/70 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Nivel de confianza</span>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 w-24">
                    <div 
                      className="bg-gradient-to-r from-primary-600 to-blue-600 h-2 rounded-full"
                      style={{ width: `${calculation.confidenceScore}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {calculation.confidenceScore}%
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* What's Included */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary-600" />
              ¿Qué incluye?
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                'Auditoría inicial completa',
                'Setup de campañas profesional',
                'Optimización continua con IA',
                'Reportes semanales detallados',
                'Reuniones mensuales de estrategia',
                'Soporte prioritario 24/7',
                'Acceso a dashboard en tiempo real',
                'Garantía de resultados'
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Info */}
          <Card className="p-6">
            <h4 className="font-semibold mb-3">Información de Contacto</h4>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-600">Empresa:</span>
                <div className="font-medium">{formData.businessInfo.companyName}</div>
              </div>
              <div>
                <span className="text-gray-600">Contacto:</span>
                <div className="font-medium">{formData.businessInfo.contactName}</div>
              </div>
              <div>
                <span className="text-gray-600">Email:</span>
                <div className="font-medium">{formData.businessInfo.email}</div>
              </div>
              <div>
                <span className="text-gray-600">Teléfono:</span>
                <div className="font-medium">{formData.businessInfo.phone}</div>
              </div>
            </div>
          </Card>

          {/* Guarantees */}
          <Card className="p-6 bg-green-50 border-green-200">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              Nuestras Garantías
            </h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium text-green-800">Sin permanencia</div>
                  <div className="text-green-700">Cancela cuando quieras</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium text-green-800">Garantía 30 días</div>
                  <div className="text-green-700">O te devolvemos tu dinero</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium text-green-800">Resultados garantizados</div>
                  <div className="text-green-700">ROI mínimo del 200%</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Next Steps */}
          <Card className="p-6">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary-600" />
              Próximos Pasos
            </h4>
            <ol className="space-y-3">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  1
                </span>
                <div className="text-sm">
                  <div className="font-medium">Agendar llamada</div>
                  <div className="text-gray-600">30 min para revisar la propuesta</div>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  2
                </span>
                <div className="text-sm">
                  <div className="font-medium">Auditoría gratuita</div>
                  <div className="text-gray-600">Análisis de tu situación actual</div>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  3
                </span>
                <div className="text-sm">
                  <div className="font-medium">Inicio de campañas</div>
                  <div className="text-gray-600">Setup y lanzamiento en 48h</div>
                </div>
              </li>
            </ol>
          </Card>

          {/* CTAs */}
          <div className="space-y-3">
            <Button 
              variant="cta" 
              size="lg" 
              className="w-full"
              onClick={onAccept}
            >
              Aceptar Propuesta
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <QuotePDFDownloadLink
              formData={formData}
              calculation={calculation}
              fileName={`cotizacion-${formData.businessInfo.companyName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.pdf`}
            >
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full"
              >
                <Download className="w-4 h-4 mr-2" />
                Descargar PDF
              </Button>
            </QuotePDFDownloadLink>
            <Button 
              variant="ghost" 
              size="lg" 
              className="w-full"
              onClick={onModify}
            >
              Modificar Cotización
            </Button>
          </div>

          {/* Urgency Note */}
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-2">
              <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0" />
              <div className="text-sm">
                <div className="font-medium text-yellow-800">
                  Oferta válida por 7 días
                </div>
                <div className="text-yellow-700">
                  Los precios pueden cambiar después de esta fecha
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}