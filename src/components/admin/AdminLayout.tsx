'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { 
  LayoutDashboard,
  Users,
  TrendingUp,
  Target,
  DollarSign,
  HeadphonesIcon,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  BarChart3,
  FileText,
  UserPlus,
  Shield
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Clientes', href: '/admin/clients', icon: Users },
  { label: 'Leads', href: '/admin/leads', icon: UserPlus, badge: 12 },
  { label: 'Campañas', href: '/admin/campaigns', icon: Target },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { label: 'Finanzas', href: '/admin/revenue', icon: DollarSign },
  { label: 'Soporte', href: '/admin/support', icon: HeadphonesIcon, badge: 3 },
  { label: 'Reportes', href: '/admin/reports', icon: FileText },
  { label: 'Configuración', href: '/admin/settings', icon: Settings }
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Check if user is admin
  useEffect(() => {
    if (user && user.role !== 'admin') {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const mockNotifications = [
    { id: 1, title: 'Nuevo lead captado', message: 'Tech Solutions solicita cotización', time: '5 min', unread: true },
    { id: 2, title: 'Pago recibido', message: 'Cliente ABC pagó $2,500', time: '1 hora', unread: true },
    { id: 3, title: 'Ticket de soporte', message: 'Cliente XYZ necesita ayuda', time: '2 horas', unread: false }
  ];

  const totalBadgeCount = navItems.reduce((sum, item) => sum + (item.badge || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
          <div className="flex h-16 shrink-0 items-center border-b border-gray-800">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold text-white">Admin Panel</span>
            </div>
          </div>
          
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== '/admin' && pathname.startsWith(item.href));
                
                return (
                  <li key={item.href}>
                    <button
                      onClick={() => router.push(item.href)}
                      className={`flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-all w-full ${
                        isActive
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {item.label}
                      {item.badge && (
                        <span className="ml-auto inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full bg-primary-600 text-white">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
            
            {/* User section at bottom */}
            <div className="mt-auto pb-4 border-t border-gray-800 pt-4">
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-medium">
                  {user?.email?.charAt(0).toUpperCase() || 'A'}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">
                    {user?.email || 'Admin'}
                  </p>
                  <p className="text-xs text-gray-400">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main content area */}
      <div className="lg:pl-64">
        {/* Top navigation */}
        <header className="sticky top-0 z-30 bg-white shadow-sm">
          <div className="flex h-16 items-center gap-x-4 px-4 sm:gap-x-6 sm:px-6 lg:px-8">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-700 hover:text-gray-900"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Search bar */}
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="relative flex flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar clientes, leads, campañas..."
                  className="w-full pl-10 pr-4 py-2 border-0 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 sm:text-sm"
                />
              </div>

              <div className="flex items-center gap-x-4">
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="relative p-2 text-gray-600 hover:text-gray-900"
                  >
                    <Bell className="h-6 w-6" />
                    {totalBadgeCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                        {totalBadgeCount}
                      </span>
                    )}
                  </button>

                  <AnimatePresence>
                    {notificationsOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50"
                      >
                        <div className="px-4 py-2 border-b">
                          <h3 className="font-semibold text-gray-900">Notificaciones</h3>
                        </div>
                        {mockNotifications.map((notif) => (
                          <button
                            key={notif.id}
                            className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                              notif.unread ? 'bg-blue-50' : ''
                            }`}
                          >
                            <p className="font-medium text-sm text-gray-900">{notif.title}</p>
                            <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                          </button>
                        ))}
                        <div className="px-4 py-2 border-t">
                          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                            Ver todas las notificaciones
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Profile dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 p-2 text-gray-700 hover:text-gray-900"
                  >
                    <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-medium">
                      {user?.email?.charAt(0).toUpperCase() || 'A'}
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                      >
                        <div className="px-4 py-2 border-b">
                          <p className="text-sm font-medium text-gray-900">
                            {user?.email || 'Admin'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {user?.email}
                          </p>
                        </div>
                        <button
                          onClick={() => router.push('/admin/settings')}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Configuración
                        </button>
                        <button
                          onClick={handleSignOut}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                        >
                          Cerrar Sesión
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="py-8">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-gray-900/80 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-gray-900 lg:hidden"
            >
              <div className="flex h-16 items-center justify-between px-6 border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <Shield className="h-8 w-8 text-primary-400" />
                  <span className="text-xl font-bold text-white">Admin</span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 text-gray-400 hover:text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex-1 px-6 py-4">
                <ul className="space-y-2">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href || 
                      (item.href !== '/admin' && pathname.startsWith(item.href));
                    
                    return (
                      <li key={item.href}>
                        <button
                          onClick={() => {
                            router.push(item.href);
                            setSidebarOpen(false);
                          }}
                          className={`flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-all w-full ${
                            isActive
                              ? 'bg-gray-800 text-white'
                              : 'text-gray-400 hover:text-white hover:bg-gray-800'
                          }`}
                        >
                          <item.icon className="h-5 w-5 flex-shrink-0" />
                          {item.label}
                          {item.badge && (
                            <span className="ml-auto inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full bg-primary-600 text-white">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="border-t border-gray-800 px-6 py-4">
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-400 hover:bg-gray-800 hover:text-red-300 w-full"
                >
                  <LogOut className="h-5 w-5" />
                  Cerrar Sesión
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}