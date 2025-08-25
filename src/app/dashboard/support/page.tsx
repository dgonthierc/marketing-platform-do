'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth, useRequireAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { TicketList } from '@/components/dashboard/TicketList';
import { TicketForm } from '@/components/dashboard/TicketForm';
import { TicketDetails } from '@/components/dashboard/TicketDetails';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { 
  HeadphonesIcon,
  Plus,
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Loader2
} from 'lucide-react';

export interface Ticket {
  id: string;
  subject: string;
  description: string;
  category: 'technical' | 'billing' | 'campaign' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'waiting_response' | 'resolved' | 'closed';
  createdAt: Date;
  updatedAt: Date;
  messages: TicketMessage[];
}

export interface TicketMessage {
  id: string;
  content: string;
  isStaff: boolean;
  authorName: string;
  createdAt: Date;
  attachments?: string[];
}

const mockTickets: Ticket[] = [
  {
    id: 'tkt-001',
    subject: 'Problema con conversiones en Google Ads',
    description: 'Las conversiones no se están registrando correctamente en mi campaña de Search',
    category: 'campaign',
    priority: 'high',
    status: 'in_progress',
    createdAt: new Date('2025-01-10T10:00:00'),
    updatedAt: new Date('2025-01-10T14:30:00'),
    messages: [
      {
        id: 'msg-001',
        content: 'Las conversiones no se están registrando correctamente en mi campaña de Search',
        isStaff: false,
        authorName: 'Cliente',
        createdAt: new Date('2025-01-10T10:00:00')
      },
      {
        id: 'msg-002',
        content: 'Hola! Estamos revisando tu configuración de conversiones. Parece que el pixel no está instalado correctamente. Te enviaremos instrucciones para solucionarlo.',
        isStaff: true,
        authorName: 'Soporte Técnico',
        createdAt: new Date('2025-01-10T10:30:00')
      }
    ]
  },
  {
    id: 'tkt-002',
    subject: 'Solicitud de factura de diciembre',
    description: 'Necesito la factura del mes de diciembre para mi contabilidad',
    category: 'billing',
    priority: 'medium',
    status: 'resolved',
    createdAt: new Date('2025-01-08T09:00:00'),
    updatedAt: new Date('2025-01-08T11:00:00'),
    messages: [
      {
        id: 'msg-003',
        content: 'Necesito la factura del mes de diciembre para mi contabilidad',
        isStaff: false,
        authorName: 'Cliente',
        createdAt: new Date('2025-01-08T09:00:00')
      },
      {
        id: 'msg-004',
        content: 'Tu factura de diciembre ha sido enviada a tu correo registrado. También la puedes descargar desde la sección de Facturación.',
        isStaff: true,
        authorName: 'Soporte',
        createdAt: new Date('2025-01-08T09:30:00')
      }
    ]
  },
  {
    id: 'tkt-003',
    subject: 'Optimización de campañas de Meta',
    description: 'Quisiera mejorar el rendimiento de mis campañas en Facebook e Instagram',
    category: 'campaign',
    priority: 'medium',
    status: 'waiting_response',
    createdAt: new Date('2025-01-09T15:00:00'),
    updatedAt: new Date('2025-01-09T16:00:00'),
    messages: [
      {
        id: 'msg-005',
        content: 'Quisiera mejorar el rendimiento de mis campañas en Facebook e Instagram',
        isStaff: false,
        authorName: 'Cliente',
        createdAt: new Date('2025-01-09T15:00:00')
      },
      {
        id: 'msg-006',
        content: 'Hemos analizado tus campañas y preparamos un plan de optimización. ¿Podemos agendar una llamada para revisarlo?',
        isStaff: true,
        authorName: 'Account Manager',
        createdAt: new Date('2025-01-09T16:00:00')
      }
    ]
  }
];

export default function SupportPage() {
  const { user, loading } = useRequireAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [ticketsLoading, setTicketsLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'resolved'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user?.id || 'client-123') {
      loadTickets();
    }
  }, [user, filterStatus]);

  const loadTickets = async () => {
    try {
      setTicketsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let filteredTickets = [...mockTickets];
      if (filterStatus === 'open') {
        filteredTickets = filteredTickets.filter(t => 
          ['open', 'in_progress', 'waiting_response'].includes(t.status)
        );
      } else if (filterStatus === 'resolved') {
        filteredTickets = filteredTickets.filter(t => 
          ['resolved', 'closed'].includes(t.status)
        );
      }
      
      setTickets(filteredTickets);
    } catch (error) {
      console.error('Error loading tickets:', error);
    } finally {
      setTicketsLoading(false);
    }
  };

  const handleCreateTicket = async (ticketData: Omit<Ticket, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'messages'>) => {
    const newTicket: Ticket = {
      ...ticketData,
      id: `tkt-${Date.now()}`,
      status: 'open',
      createdAt: new Date(),
      updatedAt: new Date(),
      messages: [
        {
          id: `msg-${Date.now()}`,
          content: ticketData.description,
          isStaff: false,
          authorName: user?.email || 'Cliente',
          createdAt: new Date()
        }
      ]
    };
    
    setTickets([newTicket, ...tickets]);
    setShowNewTicketForm(false);
    setSelectedTicket(newTicket);
  };

  const handleSendMessage = async (ticketId: string, message: string) => {
    const newMessage: TicketMessage = {
      id: `msg-${Date.now()}`,
      content: message,
      isStaff: false,
      authorName: user?.email || 'Cliente',
      createdAt: new Date()
    };
    
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId
        ? {
            ...ticket,
            messages: [...ticket.messages, newMessage],
            updatedAt: new Date(),
            status: ticket.status === 'waiting_response' ? 'open' : ticket.status
          }
        : ticket
    ));
    
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket({
        ...selectedTicket,
        messages: [...selectedTicket.messages, newMessage],
        updatedAt: new Date()
      });
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        ticket.subject.toLowerCase().includes(search) ||
        ticket.description.toLowerCase().includes(search) ||
        ticket.category.includes(search)
      );
    }
    return true;
  });

  const openTicketsCount = tickets.filter(t => 
    ['open', 'in_progress', 'waiting_response'].includes(t.status)
  ).length;

  const avgResponseTime = '< 2 horas';

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
                Centro de Soporte
              </h1>
              <p className="text-gray-600 mt-1">
                Estamos aquí para ayudarte con cualquier pregunta o problema
              </p>
            </div>
            <Button 
              variant="cta" 
              size="default"
              onClick={() => setShowNewTicketForm(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Ticket
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tickets Abiertos</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {openTicketsCount}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tiempo de Respuesta</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {avgResponseTime}
                </p>
              </div>
              <Clock className="w-8 h-8 text-blue-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Resueltos este Mes</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  12
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600 opacity-20" />
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Ticket List */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              {/* Filters */}
              <div className="space-y-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar tickets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilterStatus('all')}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filterStatus === 'all'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => setFilterStatus('open')}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filterStatus === 'open'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Abiertos
                  </button>
                  <button
                    onClick={() => setFilterStatus('resolved')}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filterStatus === 'resolved'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Resueltos
                  </button>
                </div>
              </div>

              {/* Ticket List */}
              {ticketsLoading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="p-4 bg-gray-100 rounded-lg animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                  ))}
                </div>
              ) : (
                <TicketList
                  tickets={filteredTickets}
                  selectedTicket={selectedTicket}
                  onSelectTicket={setSelectedTicket}
                />
              )}
            </Card>
          </div>

          {/* Ticket Details or Form */}
          <div className="lg:col-span-2">
            {showNewTicketForm ? (
              <TicketForm
                onSubmit={handleCreateTicket}
                onCancel={() => setShowNewTicketForm(false)}
              />
            ) : selectedTicket ? (
              <TicketDetails
                ticket={selectedTicket}
                onSendMessage={(message) => handleSendMessage(selectedTicket.id, message)}
                onClose={() => setSelectedTicket(null)}
              />
            ) : (
              <Card className="p-12 text-center">
                <HeadphonesIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Selecciona un ticket para ver los detalles</p>
                <p className="text-sm text-gray-500">
                  O crea un nuevo ticket para obtener ayuda
                </p>
                <Button
                  variant="outline"
                  size="default"
                  className="mt-4"
                  onClick={() => setShowNewTicketForm(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Crear Nuevo Ticket
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}