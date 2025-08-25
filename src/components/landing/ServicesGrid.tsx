'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Megaphone, 
  Video, 
  ShoppingBag,
  TrendingUp,
  Users,
  ArrowRight,
  Check,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  price: string;
  features: string[];
  popular?: boolean;
}

const services: Service[] = [
  {
    id: 'google-ads',
    title: 'Google Ads',
    description: 'Campañas de búsqueda y shopping con ROI garantizado',
    icon: Search,
    color: 'from-blue-500 to-blue-600',
    price: 'Desde $500/mes',
    features: [
      'Auditoría inicial gratuita',
      'Optimización continua',
      'Reportes semanales',
      'Soporte dedicado'
    ],
    popular: true
  },
  {
    id: 'meta-ads',
    title: 'Meta Ads',
    description: 'Facebook e Instagram Ads para aumentar ventas',
    icon: Megaphone,
    color: 'from-purple-500 to-purple-600',
    price: 'Desde $400/mes',
    features: [
      'Segmentación avanzada',
      'Creativos A/B testing',
      'Pixel tracking',
      'Retargeting incluido'
    ]
  },
  {
    id: 'tiktok-ads',
    title: 'TikTok Ads',
    description: 'Alcanza audiencias jóvenes con video marketing',
    icon: Video,
    color: 'from-pink-500 to-pink-600',
    price: 'Desde $600/mes',
    features: [
      'Contenido viral',
      'Influencer matching',
      'Spark Ads',
      'Analytics avanzado'
    ]
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Full',
    description: 'Gestión completa para tiendas online',
    icon: ShoppingBag,
    color: 'from-emerald-500 to-emerald-600',
    price: 'Desde $1200/mes',
    features: [
      'Google Shopping',
      'Facebook Catalog',
      'Email marketing',
      'Optimización conversión'
    ]
  }
];

export function ServicesGrid() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section id="services-section" className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section container with vertical spacing */}
        <div className="space-y-12 sm:space-y-16">
          
          {/* Section Header with proper spacing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Servicios que Generan Resultados
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              Estrategias personalizadas para cada plataforma, optimizadas para maximizar tu ROI
            </p>
          </motion.div>

          {/* Services Grid - Responsive with proper gaps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Popular badge */}
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full shadow-lg">
                      <Star className="w-3 h-3" />
                      Popular
                    </span>
                  </div>
                )}
                
                {/* Card with proper height and spacing */}
                <div className={`h-full bg-white rounded-xl border-2 ${
                  service.popular ? 'border-orange-200 shadow-xl' : 'border-gray-200'
                } p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col`}>
                  
                  {/* Icon with better spacing */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content with proper spacing */}
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm lg:text-base text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Price with emphasis */}
                  <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                    {service.price}
                  </div>

                  {/* Features list with better spacing */}
                  <ul className="space-y-3 mb-8 flex-grow">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm lg:text-base text-gray-600">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button at bottom */}
                  <Button
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                    onClick={() => {
                      const contactForm = document.getElementById('contact-form');
                      if (contactForm) {
                        contactForm.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    Solicitar Info
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA with proper spacing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center space-y-4 pt-8"
          >
            <p className="text-base lg:text-lg text-gray-600">
              ¿No estás seguro qué servicio necesitas?
            </p>
            <Button
              variant="outline"
              className="h-12 sm:h-14 px-8 sm:px-10 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold text-base sm:text-lg rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => {
                const contactForm = document.getElementById('contact-form');
                if (contactForm) {
                  contactForm.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Recibe Asesoría Gratuita
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}