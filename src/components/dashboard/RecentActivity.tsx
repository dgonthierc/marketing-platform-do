'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { 
  FileText, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle,
  Clock,
  Mail,
  DollarSign,
  BarChart3
} from 'lucide-react';

interface Activity {
  id: string;
  type: 'report' | 'campaign' | 'alert' | 'payment' | 'email';
  title: string;
  description: string;
  timestamp: Date;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'report',
    title: 'Nuevo reporte disponible',
    description: 'Reporte semanal de campañas generado',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    icon: FileText,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: '2',
    type: 'campaign',
    title: 'Campaña optimizada',
    description: 'Search - Branded: CTR mejorado 15%',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    icon: TrendingUp,
    color: 'bg-green-100 text-green-600'
  },
  {
    id: '3',
    type: 'alert',
    title: 'Presupuesto agotándose',
    description: 'Campaña TikTok: 85% del presupuesto usado',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    icon: AlertCircle,
    color: 'bg-yellow-100 text-yellow-600'
  },
  {
    id: '4',
    type: 'payment',
    title: 'Pago procesado',
    description: 'Factura #INV-2024-12 pagada exitosamente',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    icon: DollarSign,
    color: 'bg-green-100 text-green-600'
  },
  {
    id: '5',
    type: 'email',
    title: 'Email de confirmación enviado',
    description: 'Reunión mensual agendada para el 15 de enero',
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
    icon: Mail,
    color: 'bg-purple-100 text-purple-600'
  }
];

function formatTimestamp(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (hours < 1) {
    return 'Hace menos de 1 hora';
  } else if (hours < 24) {
    return `Hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
  } else if (days < 7) {
    return `Hace ${days} ${days === 1 ? 'día' : 'días'}`;
  } else {
    return date.toLocaleDateString('es-MX', { 
      day: 'numeric', 
      month: 'short' 
    });
  }
}

export function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    setActivities(mockActivities);
    setLoading(false);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Actividad Reciente
        </h2>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          Ver todo
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
                <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3"
            >
              <div className={`p-2 rounded-lg ${activity.color} flex-shrink-0`}>
                <activity.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.title}
                </p>
                <p className="text-sm text-gray-600 truncate">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatTimestamp(activity.timestamp)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </Card>
  );
}