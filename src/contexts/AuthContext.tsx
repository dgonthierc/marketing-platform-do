'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { User, Session } from '@supabase/supabase-js';
import { authService, AuthUser, SignUpData, SignInData } from '@/lib/auth/supabase-auth';
import { clientQueries } from '@/lib/db/queries';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  signUp: (data: SignUpData) => Promise<void>;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PUBLIC_ROUTES = [
  '/',
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/callback',
  '/quote',
  '/contact'
];

const CLIENT_ROUTES = [
  '/dashboard',
  '/dashboard/reports',
  '/dashboard/campaigns',
  '/dashboard/billing',
  '/dashboard/support',
  '/dashboard/settings'
];

const ADMIN_ROUTES = [
  '/admin',
  '/admin/clients',
  '/admin/leads',
  '/admin/campaigns',
  '/admin/analytics',
  '/admin/support',
  '/admin/settings'
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const loadAuthUser = useCallback(async (user: User) => {
    try {
      // Check if user is admin (you can check by email domain or metadata)
      const isAdmin = user.email?.endsWith('@admin.com') || user.user_metadata?.role === 'admin';
      
      if (isAdmin) {
        setAuthUser({
          id: user.id,
          email: user.email!,
          role: 'admin',
          adminId: user.id,
          metadata: {
            name: user.user_metadata?.name || 'Admin',
            company: 'Marketing Platform Admin',
            phone: user.user_metadata?.phone
          }
        });
      } else {
        const clientResult = await clientQueries.findByEmail(user.email!);
        
        if (clientResult.success && clientResult.data) {
          setAuthUser({
            id: user.id,
            email: user.email!,
            clientId: clientResult.data.id,
            role: 'client',
            metadata: {
              company: clientResult.data.company || undefined,
              name: clientResult.data.name,
              phone: clientResult.data.phone || undefined
            }
          });
        } else {
          setAuthUser({
            id: user.id,
            email: user.email!,
            role: 'client',
            metadata: {
              name: user.user_metadata?.name,
              company: user.user_metadata?.company,
              phone: user.user_metadata?.phone
            }
          });
        }
      }
    } catch (error) {
      console.error('Error loading auth user:', error);
    }
  }, []);

  const refreshAuth = useCallback(async () => {
    try {
      setLoading(true);
      const session = await authService.getSession();
      
      if (session && session.user) {
        setSession(session);
        setUser(session.user);
        await loadAuthUser(session.user);
      } else {
        setSession(null);
        setUser(null);
        setAuthUser(null);
      }
    } catch (error) {
      console.error('Error refreshing auth:', error);
      setError('Error al verificar la sesión');
    } finally {
      setLoading(false);
    }
  }, [loadAuthUser]);

  useEffect(() => {
    refreshAuth();

    const { data: authListener } = authService.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event);
        
        if (session && session.user) {
          setSession(session);
          setUser(session.user);
          await loadAuthUser(session.user);
          
          if (event === 'SIGNED_IN' && PUBLIC_ROUTES.includes(pathname)) {
            // Redirect based on role
            if (user?.role === 'admin') {
              router.push('/admin');
            } else {
              router.push('/dashboard');
            }
          }
        } else {
          setSession(null);
          setUser(null);
          setAuthUser(null);
          
          if (event === 'SIGNED_OUT' && CLIENT_ROUTES.some(route => pathname.startsWith(route))) {
            router.push('/auth/login');
          }
        }
        
        setLoading(false);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [pathname, router, refreshAuth, loadAuthUser]);

  const signUp = async (data: SignUpData) => {
    try {
      setError(null);
      setLoading(true);
      
      const result = await authService.signUp(data);
      
      if (result.user && !result.session) {
        router.push('/auth/verify-email');
      } else if (result.session) {
        const clientResult = await clientQueries.createFromAuth({
          email: data.email,
          name: data.name,
          company: data.company,
          phone: data.phone
        });
        
        if (clientResult.success) {
          router.push('/dashboard');
        }
      }
    } catch (error: any) {
      setError(error.message || 'Error al registrarse');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (data: SignInData) => {
    try {
      setError(null);
      setLoading(true);
      
      await authService.signIn(data);
      router.push('/dashboard');
    } catch (error: any) {
      setError(error.message || 'Error al iniciar sesión');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      setLoading(true);
      
      await authService.signOut();
      router.push('/');
    } catch (error: any) {
      setError(error.message || 'Error al cerrar sesión');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setError(null);
      setLoading(true);
      
      await authService.resetPassword(email);
    } catch (error: any) {
      setError(error.message || 'Error al enviar email de recuperación');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      setError(null);
      setLoading(true);
      
      await authService.updatePassword(newPassword);
    } catch (error: any) {
      setError(error.message || 'Error al actualizar contraseña');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    session,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    refreshAuth
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function useRequireAuth(redirectTo = '/auth/login') {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && !PUBLIC_ROUTES.includes(pathname)) {
      router.push(redirectTo);
    }
  }, [user, loading, router, pathname, redirectTo]);

  return { user, loading };
}