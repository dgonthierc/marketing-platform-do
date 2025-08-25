'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { TrendingUp, Users, Award, ChevronDown, Sparkles, Zap, ArrowRight } from 'lucide-react';

interface HeroStats {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  suffix?: string;
  gradient: string;
}

const stats: HeroStats[] = [
  { 
    value: "300", 
    label: "ROI Promedio", 
    icon: TrendingUp, 
    suffix: "%", 
    gradient: "from-blue-500 to-blue-600" 
  },
  { 
    value: "500", 
    label: "Clientes", 
    icon: Users, 
    suffix: "+", 
    gradient: "from-purple-500 to-purple-600" 
  },
  { 
    value: "98", 
    label: "Satisfacción", 
    icon: Award, 
    suffix: "%", 
    gradient: "from-emerald-500 to-emerald-600" 
  }
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 via-white to-gray-50/50 overflow-hidden">
      {/* Subtle Pattern Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>
      
      {/* Main Content Container - Properly centered with responsive padding */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Content wrapper with text-center for proper alignment */}
        <div className="text-center space-y-8 sm:space-y-10 lg:space-y-12">
          
          {/* Top Badge with proper spacing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white rounded-full shadow-md border border-gray-100">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              <span className="text-xs sm:text-sm font-semibold text-gray-800 tracking-wide uppercase">
                Especialistas en Marketing Digital
              </span>
            </div>
          </motion.div>

          {/* Main Headline with proper line height and spacing */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-4 sm:space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight">
              <span className="block text-gray-900 leading-[1.1]">
                Aumenta tus
              </span>
              <span className="block text-gray-900 leading-[1.1] mt-2 sm:mt-3">
                Ventas hasta
              </span>
              <span className="relative inline-block mt-2 sm:mt-3">
                <span className="relative z-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  300%
                </span>
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-2xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
              con Publicidad Digital
            </p>
          </motion.div>

          {/* Subheadline with proper spacing */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4"
          >
            Gestión experta de campañas en{' '}
            <span className="font-bold text-gray-900">Google Ads</span>,{' '}
            <span className="font-bold text-gray-900">Meta Ads</span> y{' '}
            <span className="font-bold text-gray-900">TikTok Ads</span>
          </motion.p>

          {/* Stats Cards - Fixed for desktop display */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-3 gap-4 md:gap-6 lg:gap-8 xl:gap-10 max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto mb-8 sm:mb-10 lg:mb-12"
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="relative"
              >
                <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 shadow-lg sm:shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 h-full flex flex-col justify-center">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mx-auto mb-2 sm:mb-3 md:mb-4 rounded-xl sm:rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-md sm:shadow-lg`}>
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-gray-900 leading-tight">
                      {stat.value}
                      <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-500">{stat.suffix}</span>
                    </div>
                    <div className="text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-600 font-semibold uppercase tracking-wider mt-1 sm:mt-2">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons with proper alignment and spacing */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-10 lg:mb-12"
          >
            <Button 
              className="w-full sm:w-auto min-w-[240px] sm:min-w-[260px] lg:min-w-[280px] h-12 sm:h-14 lg:h-16 px-6 sm:px-8 lg:px-10 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-base sm:text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group"
              onClick={() => {
                document.getElementById('contact-form')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Auditoría Gratuita</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline"
              className="w-full sm:w-auto min-w-[220px] sm:min-w-[240px] lg:min-w-[260px] h-12 sm:h-14 lg:h-16 px-6 sm:px-8 lg:px-10 bg-white border-2 border-gray-300 hover:border-purple-600 hover:bg-purple-50 text-gray-900 font-bold text-base sm:text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              onClick={() => {
                document.getElementById('portfolio')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              Ver Casos de Éxito
            </Button>
          </motion.div>

          {/* Trust Badges with proper responsive layout */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-6 md:gap-8 lg:gap-12"
          >
            {[
              { icon: '✓', text: 'Sin permanencia' },
              { icon: '✓', text: 'Garantía 30 días' },
              { icon: '✓', text: 'Soporte 24/7' }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 sm:gap-3">
                <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-green-100 rounded-full text-green-600 font-bold text-sm sm:text-base md:text-lg">
                  {item.icon}
                </span>
                <span className="text-gray-700 font-semibold text-sm sm:text-base">
                  {item.text}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Fixed positioning */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        suppressHydrationWarning
      >
        <button
          className="flex flex-col items-center gap-2 p-4 rounded-full hover:bg-white/50 transition-colors duration-300 group"
          onClick={() => {
            const nextSection = document.querySelector('#services-section');
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          aria-label="Scroll to next section"
        >
          <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">
            Descubre más
          </span>
          <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-gray-600 animate-bounce" />
        </button>
      </motion.div>
    </section>
  );
}