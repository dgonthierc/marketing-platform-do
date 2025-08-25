'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth, useRequireAuth } from '@/contexts/AuthContext';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Users,
  DollarSign,
  TrendingUp,
  Target,
  UserPlus,
  Activity,
  BarChart3,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Download,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

interface AdminMetrics {
  totalClients: number;
  activeClients: number;
  totalRevenue: number;
  monthlyRecurringRevenue: number;
  totalLeads: number;
  conversionRate: number;
  activeCampaigns: number;
  averageRoas: number;
}

interface RecentActivity {
  id: string;
  type: 'new_lead' | 'new_client' | 'payment' | 'campaign_update';
  title: string;
  description: string;
  timestamp: Date;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const mockMetrics: AdminMetrics = {
  totalClients: 48,
  activeClients: 42,
  totalRevenue: 285000,
  monthlyRecurringRevenue: 95000,
  totalLeads: 342,
  conversionRate: 14.2,
  activeCampaigns: 156,
  averageRoas: 4.8
};

const mockActivities: RecentActivity[] = [
  {
    id: '1',
    type: 'new_lead',
    title: 'Nuevo Lead Captado',
    description: 'Tech Solutions solicita información sobre Google Ads',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    icon: UserPlus,
    color: 'text-blue-600'
  },
  {
    id: '2',
    type: 'payment',
    title: 'Pago Recibido',
    description: 'Cliente ABC realizó pago de $2,500',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    icon: DollarSign,
    color: 'text-green-600'
  },
  {
    id: '3',
    type: 'new_client',
    title: 'Nuevo Cliente',
    description: 'Empresa XYZ firmó contrato de 6 meses',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    icon: CheckCircle,
    color: 'text-purple-600'
  },
  {
    id: '4',
    type: 'campaign_update',
    title: 'Campaña Optimizada',
    description: 'ROAS mejorado a 5.2x para Cliente DEF',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
    icon: Target,
    color: 'text-orange-600'
  }
];

export default function AdminDashboard() {
  const { user, loading } = useRequireAuth();
  const [metrics, setMetrics] = useState<AdminMetrics>(mockMetrics);
  const [activities, setActivities] = useState<RecentActivity[]>(mockActivities);
  const [dateRange, setDateRange] = useState('month');

  useEffect(() => {
    // Check if user is admin
    if (!loading && user && user.role !== 'admin') {
      window.location.href = '/dashboard';
    }
  }, [user, loading]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0
    }).format(value);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `Hace ${minutes} minutos`;
    if (hours < 24) return `Hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    return `Hace ${days} ${days === 1 ? 'día' : 'días'}`;
  };

  const clientGrowth = ((metrics.activeClients / 40) - 1) * 100; // Assuming 40 was last month
  const revenueGrowth = 15.3; // Mock percentage

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Dashboard Administrativo
            </h1>
            <p className="text-gray-600 mt-1">
              Bienvenido de vuelta, {user?.email || 'Admin'}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="week">Última Semana</option>
              <option value="month">Último Mes</option>
              <option value="quarter">Último Trimestre</option>
              <option value="year">Último Año</option>
            </select>
            
            <Button variant="outline" size="default">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            
            <Button variant="cta" size="default">
              <FileText className="w-4 h-4 mr-2" />
              Generar Reporte
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Clientes Activos</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {metrics.activeClients}/{metrics.totalClients}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    {clientGrowth > 0 ? (
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`text-sm font-medium ${
                      clientGrowth > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {Math.abs(clientGrowth).toFixed(1)}%
                    </span>
                    <span className="text-sm text-gray-500">vs mes anterior</span>
                  </div>
                </div>
                <Users className="w-8 h-8 text-primary-600 opacity-20" />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">MRR</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {formatCurrency(metrics.monthlyRecurringRevenue)}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">
                      {revenueGrowth}%
                    </span>
                    <span className="text-sm text-gray-500">vs mes anterior</span>
                  </div>
                </div>
                <DollarSign className="w-8 h-8 text-green-600 opacity-20" />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Leads Captados</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {metrics.totalLeads}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-sm font-medium text-blue-600">
                      {metrics.conversionRate}%
                    </span>
                    <span className="text-sm text-gray-500">tasa conversión</span>
                  </div>
                </div>
                <UserPlus className="w-8 h-8 text-blue-600 opacity-20" />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">ROAS Promedio</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {metrics.averageRoas}x
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-sm font-medium text-purple-600">
                      {metrics.activeCampaigns}
                    </span>
                    <span className="text-sm text-gray-500">campañas activas</span>
                  </div>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600 opacity-20" />
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Ingresos vs Gastos
                </h2>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              {/* Mock Chart */}
              <div className="h-64 flex items-center justify-center bg-gradient-to-br from-primary-50 to-blue-50 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                  <p className="text-gray-600">Gráfico de Ingresos</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Revenue: {formatCurrency(metrics.totalRevenue)}
                  </p>
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
                  <span className="text-sm text-gray-600">Ingresos</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Gastos en Ads</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Ganancia Neta</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Actividad Reciente
                </h2>
                <Activity className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className={`p-2 rounded-lg bg-gray-50`}>
                      <activity.icon className={`w-4 h-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatTimeAgo(activity.timestamp)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <button className="w-full mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium">
                Ver toda la actividad →
              </button>
            </Card>
          </div>
        </div>

        {/* Client Overview */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Resumen de Clientes
            </h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.location.href = '/admin/clients'}
            >
              Ver Todos
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Cliente</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Estado</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">MRR</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">ROAS</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Campañas</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">Cliente {String.fromCharCode(65 + i)}</p>
                        <p className="text-sm text-gray-500">cliente{i + 1}@example.com</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        <CheckCircle className="w-3 h-3" />
                        Activo
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium">
                      ${(2000 + i * 500).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-green-600">
                        {(3.5 + i * 0.3).toFixed(1)}x
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-600">{3 + i}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}