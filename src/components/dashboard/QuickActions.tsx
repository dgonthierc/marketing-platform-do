'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { 
  FileText, 
  HeadphonesIcon, 
  BarChart3, 
  Download,
  Calendar,
  Settings,
  ArrowRight
} from 'lucide-react';

const actions = [
  {
    title: 'Ver Último Reporte',
    description: 'Reporte mensual disponible',
    icon: FileText,
    href: '/dashboard/reports',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    title: 'Solicitar Soporte',
    description: 'Respuesta en <2 horas',
    icon: HeadphonesIcon,
    href: '/dashboard/support',
    color: 'bg-green-100 text-green-600'
  },
  {
    title: 'Análisis de Campañas',
    description: '3 campañas necesitan atención',
    icon: BarChart3,
    href: '/dashboard/campaigns',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    title: 'Descargar Facturas',
    description: 'Última factura: Dic 2024',
    icon: Download,
    href: '/dashboard/billing',
    color: 'bg-orange-100 text-orange-600'
  },
  {
    title: 'Agendar Llamada',
    description: 'Revisión mensual pendiente',
    icon: Calendar,
    href: '/dashboard/meetings',
    color: 'bg-pink-100 text-pink-600'
  },
  {
    title: 'Configuración',
    description: 'Actualizar preferencias',
    icon: Settings,
    href: '/dashboard/settings',
    color: 'bg-gray-100 text-gray-600'
  }
];

export function QuickActions() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Acciones Rápidas
      </h2>
      
      <div className="space-y-3">
        {actions.map((action, index) => (
          <motion.div
            key={action.href}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              href={action.href}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className={`p-2 rounded-lg ${action.color}`}>
                <action.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {action.title}
                </p>
                <p className="text-xs text-gray-500">
                  {action.description}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </Link>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}