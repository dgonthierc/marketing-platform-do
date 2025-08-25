'use client';

import { ReactNode } from 'react';

interface LazyLoadProps {
  children: ReactNode;
  rootMargin?: string;
  threshold?: number;
  fallback?: ReactNode;
  className?: string;
}

export function LazyLoad({ 
  children, 
  className = ''
}: LazyLoadProps) {
  // Temporarily disable lazy loading to fix hydration issues
  // Just render children directly
  return (
    <div className={className}>
      {children}
    </div>
  );
}