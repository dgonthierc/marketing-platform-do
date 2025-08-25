'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth, useRequireAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { CampaignPerformance } from '@/components/dashboard/CampaignPerformance';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target,
  ArrowUp,
  ArrowDown,
  Loader2
} from 'lucide-react';

interface DashboardMetrics {
  totalSpend: number;
  totalRevenue: number;
  totalLeads: number;
  conversionRate: number;
  roas: number;
  activeCampaigns: number;
  trends: {
    spend: number;
    revenue: number;
    leads: number;
    conversion: number;
  };
}

export default function DashboardPage() {
  const { user, loading } = useRequireAuth();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [metricsLoading, setMetricsLoading] = useState(true);
  const [dateRange, setDateRange] = useState('last30days');

  useEffect(() => {
    if (user?.id || 'client-123') {
      loadDashboardData();
    }
  }, [user, dateRange]);

  const loadDashboardData = async () => {
    try {
      setMetricsLoading(true);
      
      const mockMetrics: DashboardMetrics = {
        totalSpend: 15750,
        totalRevenue: 68420,
        totalLeads: 342,
        conversionRate: 3.8,
        roas: 4.34,
        activeCampaigns: 12,
        trends: {
          spend: 12.5,
          revenue: 28.3,
          leads: 15.7,
          conversion: 0.5
        }
      };
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMetrics(mockMetrics);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setMetricsLoading(false);
    }
  };

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
        {/* Welcome Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Bienvenido de vuelta, {user?.email || 'Cliente'}
              </h1>
              <p className="text-gray-600 mt-1">
                Aquí está el resumen de tus campañas de los últimos 30 días
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="last7days">Últimos 7 días</option>
                <option value="last30days">Últimos 30 días</option>
                <option value="last90days">Últimos 90 días</option>
                <option value="thisMonth">Este mes</option>
                <option value="lastMonth">Mes anterior</option>
              </select>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        {metricsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : metrics ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <MetricCard
                title="Inversión Total"
                value={`$${metrics.totalSpend.toLocaleString()}`}
                change={metrics.trends.spend}
                icon={DollarSign}
                color="blue"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <MetricCard
                title="Ingresos Generados"
                value={`$${metrics.totalRevenue.toLocaleString()}`}
                change={metrics.trends.revenue}
                icon={TrendingUp}
                color="green"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <MetricCard
                title="Leads Captados"
                value={metrics.totalLeads.toString()}
                change={metrics.trends.leads}
                icon={Users}
                color="purple"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <MetricCard
                title="Tasa de Conversión"
                value={`${metrics.conversionRate}%`}
                change={metrics.trends.conversion}
                icon={Target}
                color="orange"
              />
            </motion.div>
          </div>
        ) : null}

        {/* ROAS Highlight */}
        {metrics && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-primary-600 to-blue-600 rounded-lg shadow-lg p-6 text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-100 text-sm font-medium">
                  Retorno de Inversión Publicitaria (ROAS)
                </p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-4xl font-bold">{metrics.roas}x</span>
                  <span className="text-primary-100">
                    Por cada $1 invertido, generas ${metrics.roas}
                  </span>
                </div>
              </div>
              <div className="hidden sm:block">
                {metrics.trends.revenue > 0 ? (
                  <ArrowUp className="w-12 h-12 text-primary-200" />
                ) : (
                  <ArrowDown className="w-12 h-12 text-primary-200" />
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Campaign Performance - 2 columns */}
          <div className="lg:col-span-2">
            <CampaignPerformance dateRange={dateRange} />
          </div>

          {/* Quick Actions - 1 column */}
          <div>
            <QuickActions />
          </div>
        </div>

        {/* Recent Activity */}
        <RecentActivity />
      </div>
    </DashboardLayout>
  );
}