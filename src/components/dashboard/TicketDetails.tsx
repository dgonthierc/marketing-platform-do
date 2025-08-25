'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Ticket } from '@/app/dashboard/support/page';
import { 
  X,
  Send,
  Paperclip,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  User,
  HeadphonesIcon
} from 'lucide-react';

interface TicketDetailsProps {
  ticket: Ticket;
  onSendMessage: (message: string) => void;
  onClose: () => void;
}

const priorityColors = {
  low: 'bg-gray-100 text-gray-700 border-gray-300',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  high: 'bg-orange-100 text-orange-700 border-orange-300',
  urgent: 'bg-red-100 text-red-700 border-red-300'
};

const statusColors = {
  open: 'bg-blue-100 text-blue-700 border-blue-300',
  in_progress: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  waiting_response: 'bg-purple-100 text-purple-700 border-purple-300',
  resolved: 'bg-green-100 text-green-700 border-green-300',
  closed: 'bg-gray-100 text-gray-700 border-gray-300'
};

const statusLabels = {
  open: 'Abierto',
  in_progress: 'En Progreso',
  waiting_response: 'Esperando Respuesta',
  resolved: 'Resuelto',
  closed: 'Cerrado'
};

const categoryLabels = {
  technical: 'Soporte Técnico',
  billing: 'Facturación',
  campaign: 'Campañas',
  other: 'Otro'
};

export function TicketDetails({ ticket, onSendMessage, onClose }: TicketDetailsProps) {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setIsSending(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    onSendMessage(message);
    setMessage('');
    setIsSending(false);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  statusColors[ticket.status]
                }`}>
                  {statusLabels[ticket.status]}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  priorityColors[ticket.priority]
                }`}>
                  Prioridad {
                    ticket.priority === 'low' ? 'Baja' :
                    ticket.priority === 'medium' ? 'Media' :
                    ticket.priority === 'high' ? 'Alta' : 'Urgente'
                  }
                </span>
                <span className="text-xs text-gray-500">
                  {categoryLabels[ticket.category]}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {ticket.subject}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Ticket #{ticket.id} • Creado {formatDate(ticket.createdAt)}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <AnimatePresence>
            {ticket.messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex gap-3 ${msg.isStaff ? '' : 'flex-row-reverse'}`}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  msg.isStaff 
                    ? 'bg-primary-100' 
                    : 'bg-gray-100'
                }`}>
                  {msg.isStaff ? (
                    <HeadphonesIcon className="w-5 h-5 text-primary-600" />
                  ) : (
                    <User className="w-5 h-5 text-gray-600" />
                  )}
                </div>
                <div className={`flex-1 max-w-[70%] ${msg.isStaff ? '' : 'text-right'}`}>
                  <div className={`inline-block p-4 rounded-lg ${
                    msg.isStaff 
                      ? 'bg-white border border-gray-200' 
                      : 'bg-primary-600 text-white'
                  }`}>
                    <p className="text-sm font-medium mb-1">
                      {msg.authorName}
                    </p>
                    <p className={`text-sm ${msg.isStaff ? 'text-gray-700' : 'text-white'}`}>
                      {msg.content}
                    </p>
                    {msg.attachments && msg.attachments.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {msg.attachments.map((attachment, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Paperclip className="w-3 h-3" />
                            <span className="text-xs underline">{attachment}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className={`text-xs text-gray-500 mt-1 ${msg.isStaff ? '' : 'text-right'}`}>
                    {formatDate(msg.createdAt)}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Reply Box */}
        {!['resolved', 'closed'].includes(ticket.status) && (
          <div className="p-6 border-t bg-gray-50">
            <div className="flex gap-3">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                rows={3}
                disabled={isSending}
              />
              <div className="flex flex-col gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={isSending}
                >
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button
                  variant="cta"
                  size="default"
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isSending}
                  loading={isSending}
                >
                  {!isSending && <Send className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Presiona Enter para enviar, Shift+Enter para nueva línea
            </p>
          </div>
        )}

        {/* Resolved/Closed Message */}
        {['resolved', 'closed'].includes(ticket.status) && (
          <div className="p-6 border-t bg-gray-50">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <CheckCircle className="w-5 h-5" />
              <p className="text-sm">
                Este ticket ha sido {ticket.status === 'resolved' ? 'resuelto' : 'cerrado'}
              </p>
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
}