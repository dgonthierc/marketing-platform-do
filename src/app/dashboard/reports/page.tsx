'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth, useRequireAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ReportCard } from '@/components/dashboard/ReportCard';
import { ReportViewer } from '@/components/dashboard/ReportViewer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { 
  FileText, 
  Download, 
  Calendar,
  TrendingUp,
  Filter,
  Search,
  Eye,
  Clock,
  CheckCircle,
  Loader2
} from 'lucide-react';

interface Report {
  id: string;
  type: 'weekly' | 'monthly' | 'quarterly' | 'annual';
  periodStart: Date;
  periodEnd: Date;
  generatedAt: Date;
  viewedAt?: Date;
  pdfUrl?: string;
  status: 'generating' | 'ready' | 'viewed';
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

const mockReports: Report[] = [
  {
    id: 'rpt-001',
    type: 'monthly',
    periodStart: new Date('2024-12-01'),
    periodEnd: new Date('2024-12-31'),
    generatedAt: new Date('2025-01-01'),
    viewedAt: new Date('2025-01-02'),
    status: 'viewed',
    pdfUrl: '/reports/december-2024.pdf',
    metrics: {
      totalSpend: 15750,
      totalRevenue: 68420,
      totalLeads: 342,
      averageCTR: 2.85,
      averageCVR: 4.72,
      roas: 4.34
    },
    insights: 'Excelente rendimiento en diciembre con un ROAS de 4.34x. Las campañas de Google Shopping superaron las expectativas.'
  },
  {
    id: 'rpt-002',
    type: 'weekly',
    periodStart: new Date('2024-12-25'),
    periodEnd: new Date('2024-12-31'),
    generatedAt: new Date('2025-01-01'),
    status: 'ready',
    pdfUrl: '/reports/week-52-2024.pdf',
    metrics: {
      totalSpend: 3920,
      totalRevenue: 18200,
      totalLeads: 89,
      averageCTR: 3.12,
      averageCVR: 5.23,
      roas: 4.64
    },
    insights: 'Semana récord con conversiones navideñas. Recomendamos mantener presupuestos elevados en Q1.'
  },
  {
    id: 'rpt-003',
    type: 'quarterly',
    periodStart: new Date('2024-10-01'),
    periodEnd: new Date('2024-12-31'),
    generatedAt: new Date('2025-01-05'),
    status: 'ready',
    pdfUrl: '/reports/q4-2024.pdf',
    metrics: {
      totalSpend: 47250,
      totalRevenue: 195300,
      totalLeads: 1026,
      averageCTR: 2.67,
      averageCVR: 4.45,
      roas: 4.13
    },
    insights: 'Q4 2024 cerró con resultados sólidos. Meta Ads mostró el mejor rendimiento con un ROAS de 4.8x.'
  }
];

export default function ReportsPage() {
  const { user, loading } = useRequireAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [reportsLoading, setReportsLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'weekly' | 'monthly' | 'quarterly' | 'annual'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewerOpen, setViewerOpen] = useState(false);

  useEffect(() => {
    if (user?.id || 'client-123') {
      loadReports();
    }
  }, [user, filterType]);

  const loadReports = async () => {
    try {
      setReportsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let filteredReports = [...mockReports];
      if (filterType !== 'all') {
        filteredReports = filteredReports.filter(r => r.type === filterType);
      }
      
      setReports(filteredReports);
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setReportsLoading(false);
    }
  };

  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
    setViewerOpen(true);
    
    // Mark as viewed
    if (report.status === 'ready') {
      const updatedReports = reports.map(r => 
        r.id === report.id 
          ? { ...r, status: 'viewed' as const, viewedAt: new Date() }
          : r
      );
      setReports(updatedReports);
    }
  };

  const handleDownloadReport = async (report: Report) => {
    // In production, this would download the actual PDF
    console.log('Downloading report:', report.id);
    window.open(report.pdfUrl || '#', '_blank');
  };

  const filteredReports = reports.filter(report => {
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        report.type.includes(search) ||
        report.insights?.toLowerCase().includes(search) ||
        new Date(report.periodStart).toLocaleDateString().includes(search)
      );
    }
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Reportes de Rendimiento
              </h1>
              <p className="text-gray-600 mt-1">
                Analiza el rendimiento de tus campañas con reportes detallados
              </p>
            </div>
            <Button variant="cta" size="default">
              <Calendar className="w-4 h-4 mr-2" />
              Solicitar Reporte Personalizado
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Reportes Totales</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {reports.length}
                </p>
              </div>
              <FileText className="w-8 h-8 text-primary-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Último Reporte</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  Hace 2 días
                </p>
              </div>
              <Clock className="w-8 h-8 text-green-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">ROAS Promedio</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  4.37x
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600 opacity-20" />
            </div>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar reportes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterType === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setFilterType('weekly')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterType === 'weekly'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Semanal
              </button>
              <button
                onClick={() => setFilterType('monthly')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterType === 'monthly'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Mensual
              </button>
              <button
                onClick={() => setFilterType('quarterly')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterType === 'quarterly'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Trimestral
              </button>
            </div>
          </div>
        </Card>

        {/* Reports Grid */}
        {reportsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-6" />
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded" />
                  <div className="h-3 bg-gray-200 rounded" />
                  <div className="h-3 bg-gray-200 rounded" />
                </div>
              </Card>
            ))}
          </div>
        ) : filteredReports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ReportCard
                  report={report}
                  onView={() => handleViewReport(report)}
                  onDownload={() => handleDownloadReport(report)}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No se encontraron reportes</p>
            <p className="text-sm text-gray-500 mt-2">
              Intenta ajustar los filtros o solicita un nuevo reporte
            </p>
          </Card>
        )}

        {/* Report Viewer Modal */}
        {viewerOpen && selectedReport && (
          <ReportViewer
            report={selectedReport}
            onClose={() => setViewerOpen(false)}
          />
        )}
      </div>
    </DashboardLayout>
  );
}