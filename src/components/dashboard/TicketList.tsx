'use client';

import { motion } from 'framer-motion';
import { 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import type { Ticket } from '@/app/dashboard/support/page';

interface TicketListProps {
  tickets: Ticket[];
  selectedTicket: Ticket | null;
  onSelectTicket: (ticket: Ticket) => void;
}

const priorityColors = {
  low: 'bg-gray-100 text-gray-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-orange-100 text-orange-700',
  urgent: 'bg-red-100 text-red-700'
};

const statusIcons = {
  open: <AlertCircle className="w-4 h-4 text-blue-600" />,
  in_progress: <Clock className="w-4 h-4 text-yellow-600" />,
  waiting_response: <MessageSquare className="w-4 h-4 text-purple-600" />,
  resolved: <CheckCircle className="w-4 h-4 text-green-600" />,
  closed: <CheckCircle className="w-4 h-4 text-gray-600" />
};

const statusLabels = {
  open: 'Abierto',
  in_progress: 'En Progreso',
  waiting_response: 'Esperando Respuesta',
  resolved: 'Resuelto',
  closed: 'Cerrado'
};

const categoryLabels = {
  technical: 'Técnico',
  billing: 'Facturación',
  campaign: 'Campañas',
  other: 'Otro'
};

export function TicketList({ tickets, selectedTicket, onSelectTicket }: TicketListProps) {
  const formatDate = (date: Date) => {
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
  };

  if (tickets.length === 0) {
    return (
      <div className="text-center py-8">
        <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600">No hay tickets</p>
        <p className="text-sm text-gray-500 mt-1">
          Crea un nuevo ticket para obtener ayuda
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tickets.map((ticket, index) => (
        <motion.button
          key={ticket.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onSelectTicket(ticket)}
          className={`w-full text-left p-3 rounded-lg transition-all hover:shadow-md ${
            selectedTicket?.id === ticket.id
              ? 'bg-primary-50 border-2 border-primary-300'
              : 'bg-white border border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              {statusIcons[ticket.status]}
              <span className="text-xs text-gray-600">
                {statusLabels[ticket.status]}
              </span>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              priorityColors[ticket.priority]
            }`}>
              {ticket.priority === 'low' ? 'Baja' :
               ticket.priority === 'medium' ? 'Media' :
               ticket.priority === 'high' ? 'Alta' : 'Urgente'}
            </span>
          </div>

          <h4 className="font-medium text-gray-900 mb-1 line-clamp-1">
            {ticket.subject}
          </h4>

          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
            {ticket.description}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{categoryLabels[ticket.category]}</span>
            <span>{formatDate(ticket.updatedAt)}</span>
          </div>

          {ticket.messages.length > 1 && (
            <div className="mt-2 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {ticket.messages.length} mensajes
                </span>
                <ChevronRight className="w-3 h-3 text-gray-400" />
              </div>
            </div>
          )}
        </motion.button>
      ))}
    </div>
  );
}