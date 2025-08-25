'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { 
  BarChart3, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Download,
  Maximize2
} from 'lucide-react';

interface CampaignData {
  name: string;
  platform: 'google' | 'meta' | 'tiktok';
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  ctr: number;
  cvr: number;
  cpc: number;
  trend: number;
}

interface CampaignPerformanceProps {
  dateRange: string;
}

const mockCampaigns: CampaignData[] = [
  {
    name: 'Search - Branded',
    platform: 'google',
    impressions: 145320,
    clicks: 8234,
    conversions: 412,
    spend: 3250,
    ctr: 5.67,
    cvr: 5.0,
    cpc: 0.39,
    trend: 12.5
  },
  {
    name: 'Feed - Remarketing',
    platform: 'meta',
    impressions: 892340,
    clicks: 12453,
    conversions: 523,
    spend: 4820,
    ctr: 1.40,
    cvr: 4.2,
    cpc: 0.39,
    trend: -8.3
  },
  {
    name: 'Video - Awareness',
    platform: 'tiktok',
    impressions: 1253000,
    clicks: 18340,
    conversions: 234,
    spend: 2100,
    ctr: 1.46,
    cvr: 1.28,
    cpc: 0.11,
    trend: 34.2
  },
  {
    name: 'Shopping - Products',
    platform: 'google',
    impressions: 523400,
    clicks: 9823,
    conversions: 823,
    spend: 5430,
    ctr: 1.88,
    cvr: 8.38,
    cpc: 0.55,
    trend: 5.7
  }
];

const platformColors = {
  google: 'bg-blue-100 text-blue-700',
  meta: 'bg-purple-100 text-purple-700',
  tiktok: 'bg-pink-100 text-pink-700'
};

export function CampaignPerformance({ dateRange }: CampaignPerformanceProps) {
  const [campaigns, setCampaigns] = useState<CampaignData[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'table' | 'chart'>('table');

  useEffect(() => {
    loadCampaignData();
  }, [dateRange]);

  const loadCampaignData = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setCampaigns(mockCampaigns);
    setLoading(false);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Rendimiento de Campañas
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Métricas principales de tus campañas activas
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
            <Maximize2 className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaña
                </th>
                <th className="text-right py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Impresiones
                </th>
                <th className="text-right py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clicks
                </th>
                <th className="text-right py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CTR
                </th>
                <th className="text-right py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conv.
                </th>
                <th className="text-right py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CVR
                </th>
                <th className="text-right py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gasto
                </th>
                <th className="text-right py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tendencia
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {campaigns.map((campaign, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${platformColors[campaign.platform]}`}>
                        {campaign.platform.toUpperCase()}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {campaign.name}
                      </span>
                    </div>
                  </td>
                  <td className="text-right py-3 px-2 text-sm text-gray-600">
                    {campaign.impressions.toLocaleString()}
                  </td>
                  <td className="text-right py-3 px-2 text-sm text-gray-600">
                    {campaign.clicks.toLocaleString()}
                  </td>
                  <td className="text-right py-3 px-2 text-sm font-medium text-gray-900">
                    {campaign.ctr}%
                  </td>
                  <td className="text-right py-3 px-2 text-sm text-gray-600">
                    {campaign.conversions}
                  </td>
                  <td className="text-right py-3 px-2 text-sm font-medium text-gray-900">
                    {campaign.cvr}%
                  </td>
                  <td className="text-right py-3 px-2 text-sm font-medium text-gray-900">
                    ${campaign.spend.toLocaleString()}
                  </td>
                  <td className="text-right py-3 px-2">
                    <div className="flex items-center justify-end gap-1">
                      {campaign.trend > 0 ? (
                        <>
                          <ArrowUpRight className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium text-green-600">
                            +{campaign.trend}%
                          </span>
                        </>
                      ) : (
                        <>
                          <ArrowDownRight className="w-4 h-4 text-red-500" />
                          <span className="text-sm font-medium text-red-600">
                            {campaign.trend}%
                          </span>
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider">CTR Promedio</p>
          <p className="text-lg font-semibold text-gray-900 mt-1">2.85%</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider">CVR Promedio</p>
          <p className="text-lg font-semibold text-gray-900 mt-1">4.72%</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider">CPC Promedio</p>
          <p className="text-lg font-semibold text-gray-900 mt-1">$0.36</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider">CPA Promedio</p>
          <p className="text-lg font-semibold text-gray-900 mt-1">$7.63</p>
        </div>
      </div>
    </Card>
  );
}