'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { caseStudies, getFeaturedCaseStudies } from '@/data/case-studies';
import { Industry, CaseStudy } from '@/types/portfolio';
import { 
  TrendingUp, 
  ChevronRight,
  Filter,
  Award,
  BarChart3,
  Users,
  ArrowRight,
  Star,
  CheckCircle
} from 'lucide-react';

export function PortfolioShowcase() {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | 'all'>('all');
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const featured = getFeaturedCaseStudies();

  const industries = [
    { id: 'all', name: 'Todos', icon: '🎯', count: caseStudies.length },
    { id: Industry.ECOMMERCE, name: 'E-commerce', icon: '🛍️', count: 1 },
    { id: Industry.TECHNOLOGY, name: 'Tecnología', icon: '💻', count: 1 },
    { id: Industry.RESTAURANTS, name: 'Restaurantes', icon: '🍽️', count: 1 },
    { id: Industry.HEALTH_WELLNESS, name: 'Salud', icon: '🏥', count: 1 },
    { id: Industry.REAL_ESTATE, name: 'Real Estate', icon: '🏠', count: 1 },
    { id: Industry.EDUCATION, name: 'Educación', icon: '🎓', count: 1 }
  ];

  const filteredStudies = selectedIndustry === 'all' 
    ? caseStudies 
    : caseStudies.filter(s => s.client.industry === selectedIndustry);

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="w-full px-6 sm:px-8 md:px-12">
        <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            Casos de Éxito Verificados
          </span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Resultados que{' '}
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Hablan por Sí Mismos
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Más de 500 clientes han transformado sus negocios con nuestras estrategias. 
            Estos son algunos de sus historias de éxito.
          </p>
        </motion.div>

        {/* Industry Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {industries.map((industry) => (
            <button
              key={industry.id}
              onClick={() => setSelectedIndustry(industry.id as Industry | 'all')}
              className={`
                px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2
                ${selectedIndustry === industry.id
                  ? 'bg-primary-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              <span>{industry.icon}</span>
              {industry.name}
              <span className="text-xs opacity-75">({industry.count})</span>
            </button>
          ))}
        </motion.div>

        {/* Featured Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <AnimatePresence mode="popLayout">
            {filteredStudies.slice(0, 6).map((study, index) => (
              <motion.div
                key={study.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <CaseStudyCard 
                  study={study}
                  onSelect={() => setSelectedStudy(study)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl p-8 text-white"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-1">500+</div>
              <div className="text-sm opacity-90">Clientes Exitosos</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">320%</div>
              <div className="text-sm opacity-90">ROI Promedio</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">$50M+</div>
              <div className="text-sm opacity-90">Revenue Generado</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">98%</div>
              <div className="text-sm opacity-90">Retención Clientes</div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <h3 className="text-2xl font-bold mb-4">
            ¿Listo para ser nuestro próximo caso de éxito?
          </h3>
          <Button
            variant="cta"
            size="lg"
            onClick={() => {
              document.getElementById('contact-form')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
          >
            Solicitar Auditoría Gratuita
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedStudy && (
          <CaseStudyModal 
            study={selectedStudy}
            onClose={() => setSelectedStudy(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

interface CaseStudyCardProps {
  study: CaseStudy;
  onSelect: () => void;
}

function CaseStudyCard({ study, onSelect }: CaseStudyCardProps) {
  const mainMetric = study.results.metrics.find(m => m.highlight) || study.results.metrics[0];
  
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
         onClick={onSelect}>
      {study.featured && (
        <div className="flex items-center gap-1 text-yellow-500 mb-3">
          <Star className="w-4 h-4 fill-current" />
          <span className="text-xs font-medium">Caso Destacado</span>
        </div>
      )}
      
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg text-gray-900 mb-1">
            {study.client.name}
          </h3>
          <p className="text-sm text-gray-600">
            {study.client.industry.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </p>
        </div>
        <div className="flex gap-1">
          {study.solution.platforms.slice(0, 2).map((platform) => (
            <span key={platform.id} className="text-xl" title={platform.name}>
              {platform.icon}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-700 line-clamp-2">
          {study.challenge.description}
        </p>
      </div>

      {/* Main Result Highlight */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-600 mb-1">{mainMetric.label}</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-green-600">
                {mainMetric.improvement}
              </span>
            </div>
          </div>
          <TrendingUp className="w-8 h-8 text-green-500" />
        </div>
      </div>

      {/* Other Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {study.results.metrics.slice(1, 3).map((metric, index) => (
          <div key={index} className="text-center">
            <div className="text-xs text-gray-500">{metric.label}</div>
            <div className="font-semibold text-primary-600">{metric.improvement}</div>
          </div>
        ))}
      </div>

      <Button 
        variant="ghost" 
        className="w-full group-hover:bg-primary-50 group-hover:text-primary-600"
      >
        Ver Caso Completo
        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
}

interface CaseStudyModalProps {
  study: CaseStudy;
  onClose: () => void;
}

function CaseStudyModal({ study, onClose }: CaseStudyModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", duration: 0.3 }}
        className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{study.client.name}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>{study.client.industry.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
              <span>•</span>
              <span>{study.client.location}</span>
              <span>•</span>
              <span>{study.solution.duration}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {/* Challenge Section */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="text-red-500">⚠️</span> El Desafío
            </h4>
            <p className="text-gray-700 mb-4">{study.challenge.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {study.challenge.problems.map((problem, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span className="text-sm text-gray-600">{problem}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Solution Section */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="text-blue-500">💡</span> La Solución
            </h4>
            <p className="text-gray-700 mb-4">{study.solution.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {study.solution.services.map((service, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {service}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              {study.solution.platforms.map((platform) => (
                <div key={platform.id} className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                  <span className="text-xl">{platform.icon}</span>
                  <span className="text-sm font-medium">{platform.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Results Section */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="text-green-500">📈</span> Los Resultados
            </h4>
            <p className="text-gray-700 mb-6">{study.results.summary}</p>
            
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {study.results.metrics.map((metric, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg ${
                    metric.highlight 
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200' 
                      : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">{metric.label}</span>
                    {metric.icon && <span className="text-xl">{metric.icon}</span>}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-gray-500">{metric.before}</span>
                    <span className="text-gray-400">→</span>
                    <span className="text-lg font-semibold text-gray-900">{metric.after}</span>
                  </div>
                  <div className={`text-sm font-bold mt-1 ${
                    metric.highlight ? 'text-green-600' : 'text-primary-600'
                  }`}>
                    {metric.improvement}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          {study.results.testimonial && (
            <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                    {study.results.testimonial.author.name.charAt(0)}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < study.results.testimonial!.rating 
                            ? 'text-yellow-500 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                    {study.results.testimonial.verified && (
                      <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                        <CheckCircle className="w-3 h-3" />
                        Verificado
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 italic mb-3">
                    &ldquo;{study.results.testimonial.content}&rdquo;
                  </p>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {study.results.testimonial.author.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {study.results.testimonial.author.role}, {study.results.testimonial.author.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-8 p-6 bg-gray-50 rounded-xl text-center">
            <h5 className="text-lg font-semibold mb-2">
              ¿Quieres resultados similares?
            </h5>
            <p className="text-gray-600 mb-4">
              Agenda una llamada gratuita y descubre cómo podemos ayudarte
            </p>
            <Button
              variant="cta"
              size="lg"
              onClick={() => {
                document.getElementById('contact-form')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
                onClose();
              }}
            >
              Solicitar Auditoría Gratuita
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}