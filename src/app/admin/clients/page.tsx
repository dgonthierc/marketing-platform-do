'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth, useRequireAuth } from '@/contexts/AuthContext';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Users,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  DollarSign,
  TrendingUp,
  Calendar,
  Mail,
  Phone,
  Building,
  CheckCircle,
  Clock,
  AlertCircle,
  Pause,
  Play,
  UserPlus,
  Download,
  FileText
} from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  industry: string;
  status: 'active' | 'paused' | 'ended' | 'trial';
  startDate: Date;
  monthlyFee: number;
  totalSpend: number;
  totalRevenue: number;
  roas: number;
  activeCampaigns: number;
  lastActivity: Date;
  contractLength: number; // in months
}

const mockClients: Client[] = [
  {
    id: '1',
    name: 'Ana García',
    email: 'ana@techsolutions.com',
    company: 'Tech Solutions',
    phone: '+52 55 1234-5678',
    industry: 'Tecnología',
    status: 'active',
    startDate: new Date('2024-06-15'),
    monthlyFee: 3500,
    totalSpend: 45000,
    totalRevenue: 215000,
    roas: 4.8,
    activeCampaigns: 5,
    lastActivity: new Date('2025-01-10'),
    contractLength: 12
  },
  {
    id: '2',
    name: 'Carlos Méndez',
    email: 'carlos@commerceplus.mx',
    company: 'Commerce Plus',
    phone: '+52 55 9876-5432',
    industry: 'E-commerce',
    status: 'active',
    startDate: new Date('2024-08-20'),
    monthlyFee: 2500,
    totalSpend: 28000,
    totalRevenue: 134000,
    roas: 4.2,
    activeCampaigns: 3,
    lastActivity: new Date('2025-01-09'),
    contractLength: 6
  },
  {
    id: '3',
    name: 'Laura Hernández',
    email: 'laura@beautyspa.com',
    company: 'Beauty Spa Premium',
    phone: '+52 55 5555-1234',
    industry: 'Belleza y Salud',
    status: 'paused',
    startDate: new Date('2024-05-10'),
    monthlyFee: 1800,
    totalSpend: 15000,
    totalRevenue: 67000,
    roas: 4.5,
    activeCampaigns: 0,
    lastActivity: new Date('2025-01-05'),
    contractLength: 6
  },
  {
    id: '4',
    name: 'Roberto Silva',
    email: 'roberto@legaldcorp.com',
    company: 'Legal & Corp',
    phone: '+52 55 3333-7777',
    industry: 'Legal',
    status: 'trial',
    startDate: new Date('2025-01-01'),
    monthlyFee: 2200,
    totalSpend: 3500,
    totalRevenue: 12000,
    roas: 3.4,
    activeCampaigns: 2,
    lastActivity: new Date('2025-01-10'),
    contractLength: 3
  },
  {
    id: '5',
    name: 'María López',
    email: 'maria@constructora.mx',
    company: 'Constructora López',
    phone: '+52 55 8888-9999',
    industry: 'Construcción',
    status: 'ended',
    startDate: new Date('2023-12-01'),
    monthlyFee: 0,
    totalSpend: 85000,
    totalRevenue: 380000,
    roas: 4.5,
    activeCampaigns: 0,
    lastActivity: new Date('2024-12-30'),
    contractLength: 12
  }
];

export default function ClientsPage() {
  const { user, loading } = useRequireAuth();
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'paused' | 'trial' | 'ended'>('all');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showClientModal, setShowClientModal] = useState(false);

  useEffect(() => {
    if (!loading && user && user.role !== 'admin') {
      window.location.href = '/dashboard';
    }
  }, [user, loading]);

  const filteredClients = clients.filter(client => {
    const matchesSearch = searchTerm === '' || 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Client['status']) => {
    switch (status) {
      case 'active': return 'success';
      case 'trial': return 'warning';
      case 'paused': return 'default';
      case 'ended': return 'error';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: Client['status']) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'trial': return 'Trial';
      case 'paused': return 'Pausado';
      case 'ended': return 'Terminado';
      default: return status;
    }
  };

  const getStatusIcon = (status: Client['status']) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'trial': return <Clock className="w-4 h-4" />;
      case 'paused': return <Pause className="w-4 h-4" />;
      case 'ended': return <AlertCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const activeClientsCount = clients.filter(c => c.status === 'active').length;
  const totalMRR = clients.filter(c => c.status === 'active').reduce((sum, c) => sum + c.monthlyFee, 0);
  const averageROAS = clients.filter(c => c.status === 'active').reduce((sum, c) => sum + c.roas, 0) / 
    clients.filter(c => c.status === 'active').length || 0;

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
              Gestión de Clientes
            </h1>
            <p className="text-gray-600 mt-1">
              {filteredClients.length} de {clients.length} clientes
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="default">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button variant="cta" size="default">
              <UserPlus className="w-4 h-4 mr-2" />
              Nuevo Cliente
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Clientes Activos</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {activeClientsCount}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">MRR Total</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatCurrency(totalMRR)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">ROAS Promedio</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {averageROAS.toFixed(1)}x
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600 opacity-20" />
            </div>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar clientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div className="flex gap-2">
              {['all', 'active', 'trial', 'paused', 'ended'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    statusFilter === status
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status === 'all' ? 'Todos' : getStatusLabel(status as any)}
                  {status !== 'all' && (
                    <span className="ml-1 text-xs">
                      ({clients.filter(c => c.status === status).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Clients Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Cliente</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Estado</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Industria</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">MRR</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">ROAS</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Campañas</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Último Acceso</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client, index) => (
                  <motion.tr
                    key={client.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary-700">
                            {client.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{client.name}</p>
                          <p className="text-sm text-gray-500">{client.company}</p>
                          <p className="text-xs text-gray-500">{client.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge 
                        variant={getStatusColor(client.status)}
                        className="flex items-center gap-1 w-fit"
                      >
                        {getStatusIcon(client.status)}
                        {getStatusLabel(client.status)}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {client.industry}
                    </td>
                    <td className="py-4 px-6 font-medium">
                      {client.status === 'active' ? formatCurrency(client.monthlyFee) : '-'}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`font-medium ${
                        client.roas >= 4 ? 'text-green-600' : 
                        client.roas >= 3 ? 'text-yellow-600' : 
                        'text-red-600'
                      }`}>
                        {client.roas.toFixed(1)}x
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {client.activeCampaigns}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {formatDate(client.lastActivity)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedClient(client);
                            setShowClientModal(true);
                          }}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                          title="Ver detalles"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredClients.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No se encontraron clientes</p>
              <p className="text-sm text-gray-500 mt-1">
                Ajusta los filtros para ver más resultados
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Client Detail Modal */}
      <AnimatePresence>
        {showClientModal && selectedClient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowClientModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {selectedClient.name}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedClient.company}
                  </p>
                </div>
                <button
                  onClick={() => setShowClientModal(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-lg"
                >
                  ×
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                {/* Contact Info */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Información de Contacto</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600">{selectedClient.email}</span>
                    </div>
                    {selectedClient.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-gray-600">{selectedClient.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <Building className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600">{selectedClient.industry}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Cliente desde {formatDate(selectedClient.startDate)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Inversión Total</p>
                    <p className="text-xl font-bold text-gray-900">
                      {formatCurrency(selectedClient.totalSpend)}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Revenue Generado</p>
                    <p className="text-xl font-bold text-green-600">
                      {formatCurrency(selectedClient.totalRevenue)}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">ROAS</p>
                    <p className="text-xl font-bold text-purple-600">
                      {selectedClient.roas.toFixed(1)}x
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Campañas Activas</p>
                    <p className="text-xl font-bold text-gray-900">
                      {selectedClient.activeCampaigns}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="cta" size="default" className="flex-1">
                    <FileText className="w-4 h-4 mr-2" />
                    Ver Dashboard
                  </Button>
                  <Button variant="outline" size="default" className="flex-1">
                    <Edit className="w-4 h-4 mr-2" />
                    Editar Cliente
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}