'use client';

import { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/landing/HeroSection';
import { ServicesGrid } from '@/components/landing/ServicesGrid';
import { PortfolioShowcase } from '@/components/landing/PortfolioShowcase';

// Dynamic imports for heavy components only
const ContactForm = dynamic(
  () => import('@/components/forms/ContactForm').then(mod => ({ default: mod.ContactForm })),
  { 
    loading: () => <div className="h-64 bg-gray-100 rounded-lg animate-pulse" />,
    ssr: true 
  }
);

const ServiceCalculator = dynamic(
  () => import('@/components/landing/ServiceCalculator').then(mod => ({ default: mod.ServiceCalculator })),
  { 
    ssr: false 
  }
);

export default function Home() {
  const [showCalculator, setShowCalculator] = useState(false);

  return (
    <>
      <HeroSection />
      <ServicesGrid />
      <PortfolioShowcase />
      
      <section id="contact-form" className="py-20 bg-gray-50">
        <div className="w-full px-6 sm:px-8 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Empieza a Crecer Hoy
              </h2>
              <p className="text-lg text-gray-600">
                Completa el formulario y recibe una auditoría gratuita de tus campañas actuales
              </p>
            </div>
            <Suspense fallback={<div className="h-64 bg-gray-100 rounded-lg animate-pulse" />}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>

      {showCalculator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <Suspense fallback={<div className="h-64 w-full max-w-2xl bg-white rounded-lg animate-pulse" />}>
            <ServiceCalculator onClose={() => setShowCalculator(false)} />
          </Suspense>
        </div>
      )}
    </>
  );
}
