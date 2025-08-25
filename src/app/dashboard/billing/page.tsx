'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth, useRequireAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  CreditCard,
  Download,
  FileText,
  DollarSign,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  ChevronRight,
  Filter,
  Search,
  Loader2
} from 'lucide-react';

interface Payment {
  id: string;
  invoiceNumber: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'processing';
  dueDate: Date;
  paidDate?: Date;
  period: string;
  services: string[];
  pdfUrl?: string;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'transfer' | 'paypal';
  last4?: string;
  brand?: string;
  isDefault: boolean;
  expiryDate?: string;
}

const mockPayments: Payment[] = [
  {
    id: 'pay-001',
    invoiceNumber: 'INV-2025-001',
    amount: 2500,
    status: 'paid',
    dueDate: new Date('2025-01-05'),
    paidDate: new Date('2025-01-03'),
    period: 'Enero 2025',
    services: ['Google Ads', 'Meta Ads', 'Reportes Semanales'],
    pdfUrl: '/invoices/inv-2025-001.pdf'
  },
  {
    id: 'pay-002',
    invoiceNumber: 'INV-2024-012',
    amount: 2500,
    status: 'paid',
    dueDate: new Date('2024-12-05'),
    paidDate: new Date('2024-12-04'),
    period: 'Diciembre 2024',
    services: ['Google Ads', 'Meta Ads', 'Reportes Semanales'],
    pdfUrl: '/invoices/inv-2024-012.pdf'
  },
  {
    id: 'pay-003',
    invoiceNumber: 'INV-2024-011',
    amount: 2500,
    status: 'paid',
    dueDate: new Date('2024-11-05'),
    paidDate: new Date('2024-11-05'),
    period: 'Noviembre 2024',
    services: ['Google Ads', 'Meta Ads', 'Reportes Semanales'],
    pdfUrl: '/invoices/inv-2024-011.pdf'
  },
  {
    id: 'pay-004',
    invoiceNumber: 'INV-2025-002',
    amount: 2500,
    status: 'pending',
    dueDate: new Date('2025-02-05'),
    period: 'Febrero 2025',
    services: ['Google Ads', 'Meta Ads', 'TikTok Ads', 'Reportes Semanales'],
    pdfUrl: '/invoices/inv-2025-002.pdf'
  }
];

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'pm-001',
    type: 'card',
    last4: '4242',
    brand: 'Visa',
    isDefault: true,
    expiryDate: '12/25'
  },
  {
    id: 'pm-002',
    type: 'transfer',
    isDefault: false
  }
];

export default function BillingPage() {
  const { user, loading } = useRequireAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [paymentsLoading, setPaymentsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<'all' | 'paid' | 'pending'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('2025');

  useEffect(() => {
    if (user?.id || 'client-123') {
      loadPayments();
      loadPaymentMethods();
    }
  }, [user, filterStatus, selectedYear]);

  const loadPayments = async () => {
    try {
      setPaymentsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let filteredPayments = [...mockPayments];
      if (filterStatus === 'paid') {
        filteredPayments = filteredPayments.filter(p => p.status === 'paid');
      } else if (filterStatus === 'pending') {
        filteredPayments = filteredPayments.filter(p => 
          ['pending', 'overdue', 'processing'].includes(p.status)
        );
      }
      
      if (selectedYear !== 'all') {
        filteredPayments = filteredPayments.filter(p => 
          p.dueDate.getFullYear().toString() === selectedYear
        );
      }
      
      setPayments(filteredPayments);
    } catch (error) {
      console.error('Error loading payments:', error);
    } finally {
      setPaymentsLoading(false);
    }
  };

  const loadPaymentMethods = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setPaymentMethods(mockPaymentMethods);
    } catch (error) {
      console.error('Error loading payment methods:', error);
    }
  };

  const handleDownloadInvoice = (payment: Payment) => {
    // In production, this would download the actual PDF
    console.log('Downloading invoice:', payment.invoiceNumber);
    window.open(payment.pdfUrl || '#', '_blank');
  };

  const handlePayNow = (payment: Payment) => {
    // In production, this would initiate payment flow
    console.log('Initiating payment for:', payment.invoiceNumber);
  };

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700 border-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'overdue': return 'bg-red-100 text-red-700 border-red-300';
      case 'processing': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusLabel = (status: Payment['status']) => {
    switch (status) {
      case 'paid': return 'Pagado';
      case 'pending': return 'Pendiente';
      case 'overdue': return 'Vencido';
      case 'processing': return 'Procesando';
      default: return status;
    }
  };

  const getStatusIcon = (status: Payment['status']) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'overdue': return <AlertCircle className="w-4 h-4" />;
      case 'processing': return <Loader2 className="w-4 h-4 animate-spin" />;
      default: return null;
    }
  };

  const totalPaid = payments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPending = payments
    .filter(p => ['pending', 'overdue'].includes(p.status))
    .reduce((sum, p) => sum + p.amount, 0);

  const nextPayment = payments
    .filter(p => ['pending', 'overdue'].includes(p.status))
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())[0];

  const filteredPayments = payments.filter(payment => {
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        payment.invoiceNumber.toLowerCase().includes(search) ||
        payment.period.toLowerCase().includes(search) ||
        payment.services.some(s => s.toLowerCase().includes(search))
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
                Facturación y Pagos
              </h1>
              <p className="text-gray-600 mt-1">
                Gestiona tus facturas y métodos de pago
              </p>
            </div>
            <Button 
              variant="cta" 
              size="default"
              onClick={() => console.log('Add payment method')}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Agregar Método de Pago
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Pagado {selectedYear}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ${totalPaid.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pendiente de Pago</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ${totalPending.toLocaleString()}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Próximo Pago</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {nextPayment ? new Date(nextPayment.dueDate).toLocaleDateString('es-MX', {
                    day: 'numeric',
                    month: 'short'
                  }) : 'N/A'}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-primary-600 opacity-20" />
            </div>
          </Card>
        </div>

        {/* Payment Methods */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Métodos de Pago
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {paymentMethods.map((method) => (
              <div 
                key={method.id}
                className={`p-4 rounded-lg border-2 ${
                  method.isDefault 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {method.type === 'card' ? (
                      <CreditCard className="w-8 h-8 text-gray-600" />
                    ) : method.type === 'transfer' ? (
                      <DollarSign className="w-8 h-8 text-gray-600" />
                    ) : (
                      <FileText className="w-8 h-8 text-gray-600" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">
                        {method.type === 'card' 
                          ? `${method.brand} •••• ${method.last4}`
                          : method.type === 'transfer'
                          ? 'Transferencia Bancaria'
                          : 'PayPal'}
                      </p>
                      {method.expiryDate && (
                        <p className="text-sm text-gray-600">
                          Vence: {method.expiryDate}
                        </p>
                      )}
                    </div>
                  </div>
                  {method.isDefault && (
                    <Badge variant="default" size="sm">
                      Predeterminado
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Payment History */}
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Historial de Pagos
            </h2>
            
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar facturas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div className="flex gap-2">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">Todos los años</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>
                
                <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                  <button
                    onClick={() => setFilterStatus('all')}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      filterStatus === 'all'
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => setFilterStatus('paid')}
                    className={`px-4 py-2 text-sm font-medium transition-colors border-l ${
                      filterStatus === 'paid'
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Pagados
                  </button>
                  <button
                    onClick={() => setFilterStatus('pending')}
                    className={`px-4 py-2 text-sm font-medium transition-colors border-l ${
                      filterStatus === 'pending'
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Pendientes
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Payments List */}
          {paymentsLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-4 bg-gray-100 rounded-lg animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredPayments.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No se encontraron pagos</p>
              <p className="text-sm text-gray-500 mt-1">
                Ajusta los filtros para ver más resultados
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPayments.map((payment, index) => (
                <motion.div
                  key={payment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${
                          getStatusColor(payment.status)
                        }`}>
                          {getStatusIcon(payment.status)}
                          {getStatusLabel(payment.status)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {payment.invoiceNumber}
                        </span>
                      </div>
                      
                      <p className="font-medium text-gray-900">
                        {payment.period}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        {payment.services.map((service, i) => (
                          <span 
                            key={i}
                            className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-md"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                        <span>Vencimiento: {payment.dueDate.toLocaleDateString('es-MX')}</span>
                        {payment.paidDate && (
                          <span>Pagado: {payment.paidDate.toLocaleDateString('es-MX')}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:items-end gap-3">
                      <p className="text-2xl font-bold text-gray-900">
                        ${payment.amount.toLocaleString()}
                      </p>
                      
                      <div className="flex gap-2">
                        {payment.status === 'paid' ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadInvoice(payment)}
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Descargar
                          </Button>
                        ) : (
                          <>
                            <Button
                              variant="cta"
                              size="sm"
                              onClick={() => handlePayNow(payment)}
                            >
                              Pagar Ahora
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDownloadInvoice(payment)}
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </Card>

        {/* Help Section */}
        <Card className="p-6 bg-gradient-to-r from-primary-50 to-blue-50">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                ¿Necesitas ayuda con tu facturación?
              </h3>
              <p className="text-gray-700 mb-4">
                Si tienes alguna pregunta sobre tus facturas o métodos de pago, nuestro equipo está aquí para ayudarte.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => window.location.href = '/dashboard/support'}
                >
                  Contactar Soporte
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => console.log('Download tax report')}
                >
                  Descargar Reporte Fiscal
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}