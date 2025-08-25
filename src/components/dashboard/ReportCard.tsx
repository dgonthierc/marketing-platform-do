'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  FileText, 
  Download, 
  Eye, 
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface ReportMetrics {
  totalSpend: number;
  totalRevenue: number;
  totalLeads: number;
  averageCTR: number;
  averageCVR: number;
  roas: number;
}

interface Report {
  id: string;
  type: 'weekly' | 'monthly' | 'quarterly' | 'annual';
  periodStart: Date;
  periodEnd: Date;
  generatedAt: Date;
  viewedAt?: Date;
  status: 'generating' | 'ready' | 'viewed';
  metrics: ReportMetrics;
  insights?: string;
}

interface ReportCardProps {
  report: Report;
  onView: () => void;
  onDownload: () => void;
}

const typeLabels = {
  weekly: 'Semanal',
  monthly: 'Mensual',
  quarterly: 'Trimestral',
  annual: 'Anual'
};

const typeColors = {
  weekly: 'bg-blue-100 text-blue-700',
  monthly: 'bg-green-100 text-green-700',
  quarterly: 'bg-purple-100 text-purple-700',
  annual: 'bg-orange-100 text-orange-700'
};

export function ReportCard({ report, onView, onDownload }: ReportCardProps) {
  const formatDateRange = (start: Date, end: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    };
    
    if (report.type === 'weekly') {
      return `Semana del ${start.toLocaleDateString('es-MX', options)}`;
    }
    
    if (report.type === 'monthly') {
      return start.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' });
    }
    
    return `${start.toLocaleDateString('es-MX', options)} - ${end.toLocaleDateString('es-MX', options)}`;
  };

  const getStatusIcon = () => {
    switch (report.status) {
      case 'generating':
        return <Clock className="w-4 h-4 text-yellow-600 animate-spin" />;
      case 'ready':
        return <AlertCircle className="w-4 h-4 text-blue-600" />;
      case 'viewed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
    }
  };

  const getStatusLabel = () => {
    switch (report.status) {
      case 'generating':
        return 'Generando...';
      case 'ready':
        return 'Nuevo';
      case 'viewed':
        return 'Visto';
    }
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[report.type]}`}>
            {typeLabels[report.type]}
          </span>
          <div className="flex items-center gap-1">
            {getStatusIcon()}
            <span className="text-xs text-gray-600">{getStatusLabel()}</span>
          </div>
        </div>
      </div>

      <h3 className="font-semibold text-gray-900 mb-2">
        {formatDateRange(report.periodStart, report.periodEnd)}
      </h3>

      <div className="space-y-3 mb-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-gray-500">Inversión</p>
            <p className="text-sm font-semibold text-gray-900">
              ${report.metrics.totalSpend.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Ingresos</p>
            <p className="text-sm font-semibold text-gray-900">
              ${report.metrics.totalRevenue.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Leads</p>
            <p className="text-sm font-semibold text-gray-900">
              {report.metrics.totalLeads}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">ROAS</p>
            <p className="text-sm font-semibold text-green-600">
              {report.metrics.roas}x
            </p>
          </div>
        </div>

        {/* Insights Preview */}
        {report.insights && (
          <div className="pt-3 border-t">
            <p className="text-xs text-gray-600 line-clamp-2">
              {report.insights}
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={onView}
          disabled={report.status === 'generating'}
        >
          <Eye className="w-4 h-4 mr-1" />
          Ver
        </Button>
        <Button
          variant="default"
          size="sm"
          className="flex-1"
          onClick={onDownload}
          disabled={report.status === 'generating'}
        >
          <Download className="w-4 h-4 mr-1" />
          PDF
        </Button>
      </div>

      {/* Generation Date */}
      <div className="mt-4 pt-4 border-t flex items-center justify-between text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          Generado {new Date(report.generatedAt).toLocaleDateString('es-MX')}
        </span>
        {report.viewedAt && (
          <span>
            Visto {new Date(report.viewedAt).toLocaleDateString('es-MX')}
          </span>
        )}
      </div>
    </Card>
  );
}