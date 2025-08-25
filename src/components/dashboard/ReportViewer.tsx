'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { 
  X, 
  Download, 
  Share2, 
  Maximize2,
  FileText,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  BarChart3
} from 'lucide-react';

interface Report {
  id: string;
  type: 'weekly' | 'monthly' | 'quarterly' | 'annual';
  periodStart: Date;
  periodEnd: Date;
  generatedAt: Date;
  pdfUrl?: string;
  metrics: {
    totalSpend: number;
    totalRevenue: number;
    totalLeads: number;
    averageCTR: number;
    averageCVR: number;
    roas: number;
  };
  insights?: string;
}

interface ReportViewerProps {
  report: Report;
  onClose: () => void;
}

export function ReportViewer({ report, onClose }: ReportViewerProps) {
  const handleDownload = () => {
    window.open(report.pdfUrl || '#', '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Reporte ${report.type}`,
          text: `Reporte de rendimiento: ROAS ${report.metrics.roas}x`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Reporte {report.type === 'weekly' ? 'Semanal' : 
                         report.type === 'monthly' ? 'Mensual' :
                         report.type === 'quarterly' ? 'Trimestral' : 'Anual'}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {new Date(report.periodStart).toLocaleDateString('es-MX', { 
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })} - {new Date(report.periodEnd).toLocaleDateString('es-MX', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="w-8 h-8 text-blue-600" />
                  <span className="text-2xl font-bold text-blue-900">
                    ${report.metrics.totalSpend.toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-blue-700">Inversión Total</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                  <span className="text-2xl font-bold text-green-900">
                    ${report.metrics.totalRevenue.toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-green-700">Ingresos Generados</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Target className="w-8 h-8 text-purple-600" />
                  <span className="text-2xl font-bold text-purple-900">
                    {report.metrics.roas}x
                  </span>
                </div>
                <p className="text-sm text-purple-700">ROAS</p>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-gray-600" />
                Métricas de Rendimiento
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Leads Captados</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {report.metrics.totalLeads}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">CTR Promedio</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {report.metrics.averageCTR}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">CVR Promedio</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {report.metrics.averageCVR}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">CPA</p>
                  <p className="text-xl font-semibold text-gray-900">
                    ${Math.round(report.metrics.totalSpend / report.metrics.totalLeads)}
                  </p>
                </div>
              </div>
            </div>

            {/* Insights */}
            {report.insights && (
              <div className="bg-primary-50 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-3">
                  💡 Insights y Recomendaciones
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {report.insights}
                </p>
              </div>
            )}

            {/* Platform Breakdown (Mock Data) */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">
                Rendimiento por Plataforma
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-600">G</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Google Ads</p>
                      <p className="text-sm text-gray-600">45% del presupuesto</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">4.8x ROAS</p>
                    <p className="text-sm text-gray-600">156 conversiones</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold text-purple-600">M</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Meta Ads</p>
                      <p className="text-sm text-gray-600">35% del presupuesto</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">3.9x ROAS</p>
                    <p className="text-sm text-gray-600">112 conversiones</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold text-pink-600">T</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">TikTok Ads</p>
                      <p className="text-sm text-gray-600">20% del presupuesto</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">3.2x ROAS</p>
                    <p className="text-sm text-gray-600">74 conversiones</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="cta"
                size="lg"
                className="flex-1"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4 mr-2" />
                Descargar PDF Completo
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Compartir Reporte
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}