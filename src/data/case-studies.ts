/**
 * Case Studies Data - Real client success stories
 */

import { CaseStudy, Industry, CompanySize } from '@/types/portfolio';

export const caseStudies: CaseStudy[] = [
  {
    id: 'cs-001',
    slug: 'tienda-moda-350-roi',
    client: {
      name: 'Fashion Boutique México',
      industry: Industry.FASHION_BEAUTY,
      size: CompanySize.SMALL,
      location: 'Ciudad de México',
    },
    challenge: {
      title: 'Ventas estancadas con alto inventario',
      description: 'Boutique de moda con inventario acumulado y ventas online mínimas necesitaba aumentar su presencia digital.',
      problems: [
        'Solo 3% de ventas online',
        'Inventario acumulado de 2 temporadas',
        'Sin presencia en redes sociales',
        'Competencia agresiva de grandes marcas'
      ]
    },
    solution: {
      title: 'Estrategia omnicanal con foco en Instagram Shopping',
      description: 'Implementamos una estrategia integrada de Facebook, Instagram y Google Shopping con contenido de influencers locales.',
      services: ['Facebook Ads', 'Instagram Shopping', 'Google Shopping', 'Influencer Marketing'],
      platforms: [
        { id: 'meta', name: 'Meta', icon: '👤' },
        { id: 'instagram', name: 'Instagram', icon: '📷' },
        { id: 'google', name: 'Google', icon: '🔍' }
      ],
      duration: '3 meses'
    },
    results: {
      summary: 'Transformamos completamente su canal digital, logrando vender el 80% del inventario acumulado en 3 meses.',
      metrics: [
        {
          label: 'ROI',
          before: '0%',
          after: '350%',
          improvement: '+350%',
          icon: '📈',
          highlight: true
        },
        {
          label: 'Ventas Online',
          before: '$15,000/mes',
          after: '$120,000/mes',
          improvement: '+700%',
          icon: '💰',
          highlight: true
        },
        {
          label: 'Conversión Web',
          before: '0.8%',
          after: '3.2%',
          improvement: '+300%',
          icon: '🎯'
        },
        {
          label: 'Seguidores Instagram',
          before: '1,200',
          after: '18,500',
          improvement: '+1,441%',
          icon: '👥'
        },
        {
          label: 'CPA',
          before: 'N/A',
          after: '$28',
          improvement: 'Optimizado',
          icon: '💵'
        }
      ],
      testimonial: {
        content: 'En 3 meses lograron lo que no pudimos en 2 años. No solo vendimos todo el inventario viejo, sino que ahora el 65% de nuestras ventas son digitales. El equipo es increíblemente profesional.',
        author: {
          name: 'María González',
          role: 'CEO & Fundadora',
          company: 'Fashion Boutique México'
        },
        rating: 5,
        verified: true
      }
    },
    featured: true,
    publishedAt: '2024-06-15',
    tags: ['e-commerce', 'moda', 'instagram-shopping', 'roi-alto']
  },
  {
    id: 'cs-002',
    slug: 'software-b2b-leads-cualificados',
    client: {
      name: 'TechSolutions Pro',
      industry: Industry.TECHNOLOGY,
      size: CompanySize.MEDIUM,
      location: 'Monterrey'
    },
    challenge: {
      title: 'Alto costo por lead con baja calidad',
      description: 'Empresa SaaS B2B con leads de baja calidad y largo ciclo de ventas necesitaba mejorar su embudo de conversión.',
      problems: [
        'CPL de $450 USD',
        'Solo 5% de leads cualificados',
        'Ciclo de venta de 6 meses',
        'Sin segmentación por industria'
      ]
    },
    solution: {
      title: 'LinkedIn Ads + Google Ads con lead scoring automático',
      description: 'Estrategia B2B enfocada en decision makers con contenido educativo y nurturing automatizado.',
      services: ['LinkedIn Ads B2B', 'Google Ads', 'Marketing Automation', 'Content Marketing'],
      platforms: [
        { id: 'linkedin', name: 'LinkedIn', icon: '💼' },
        { id: 'google', name: 'Google', icon: '🔍' }
      ],
      duration: '4 meses'
    },
    results: {
      summary: 'Reducimos el CPL en 68% mientras triplicamos la calidad de leads, acortando el ciclo de venta a 2 meses.',
      metrics: [
        {
          label: 'Costo por Lead',
          before: '$450',
          after: '$145',
          improvement: '-68%',
          icon: '💵',
          highlight: true
        },
        {
          label: 'Leads Cualificados',
          before: '5%',
          after: '42%',
          improvement: '+740%',
          icon: '✅',
          highlight: true
        },
        {
          label: 'Ciclo de Venta',
          before: '6 meses',
          after: '2 meses',
          improvement: '-66%',
          icon: '⏱️'
        },
        {
          label: 'Pipeline Value',
          before: '$120K',
          after: '$850K',
          improvement: '+608%',
          icon: '📊'
        },
        {
          label: 'Demo Bookings',
          before: '8/mes',
          after: '45/mes',
          improvement: '+462%',
          icon: '📅'
        }
      ],
      testimonial: {
        content: 'La diferencia fue inmediata. Pasamos de perseguir leads fríos a tener demos con CTOs y VPs cada día. El lead scoring automático cambió completamente nuestro proceso de ventas.',
        author: {
          name: 'Roberto Méndez',
          role: 'VP of Sales',
          company: 'TechSolutions Pro'
        },
        rating: 5,
        verified: true
      }
    },
    featured: true,
    publishedAt: '2024-07-20',
    tags: ['b2b', 'saas', 'linkedin', 'lead-generation']
  },
  {
    id: 'cs-003',
    slug: 'restaurante-delivery-pandemia',
    client: {
      name: 'Sabores Auténticos',
      industry: Industry.RESTAURANTS,
      size: CompanySize.SMALL,
      location: 'Guadalajara'
    },
    challenge: {
      title: 'Pérdida del 80% de ingresos por restricciones COVID',
      description: 'Restaurante familiar con 20 años de tradición necesitaba pivotear a delivery rápidamente.',
      problems: [
        'Sin presencia digital',
        'Sin sistema de delivery propio',
        'Competencia con dark kitchens',
        'Presupuesto muy limitado'
      ]
    },
    solution: {
      title: 'Campaña local hyperenfocada con Facebook + Google My Business',
      description: 'Estrategia de geo-targeting con ofertas especiales y menú digital optimizado para delivery.',
      services: ['Facebook Local', 'Google My Business', 'WhatsApp Business'],
      platforms: [
        { id: 'meta', name: 'Facebook', icon: '👤' },
        { id: 'google', name: 'Google', icon: '🔍' }
      ],
      duration: '2 meses'
    },
    results: {
      summary: 'Recuperaron el 120% de sus ingresos pre-pandemia en solo 2 meses con delivery directo.',
      metrics: [
        {
          label: 'Ingresos',
          before: '$80,000/mes',
          after: '$175,000/mes',
          improvement: '+118%',
          icon: '💰',
          highlight: true
        },
        {
          label: 'Pedidos Diarios',
          before: '15',
          after: '85',
          improvement: '+466%',
          icon: '🍽️',
          highlight: true
        },
        {
          label: 'Ticket Promedio',
          before: '$180',
          after: '$320',
          improvement: '+78%',
          icon: '🎯'
        },
        {
          label: 'Clientes Recurrentes',
          before: '20%',
          after: '65%',
          improvement: '+225%',
          icon: '🔄'
        }
      ],
      testimonial: {
        content: 'Pensamos que tendríamos que cerrar después de 20 años. No solo sobrevivimos, sino que ahora ganamos más que antes. El delivery se convirtió en el 70% de nuestro negocio.',
        author: {
          name: 'Carmen Rodríguez',
          role: 'Propietaria',
          company: 'Sabores Auténticos'
        },
        rating: 5,
        verified: true
      }
    },
    featured: false,
    publishedAt: '2024-05-10',
    tags: ['restaurantes', 'local', 'delivery', 'covid-recovery']
  },
  {
    id: 'cs-004',
    slug: 'clinica-dental-tiktok-jovenes',
    client: {
      name: 'SmileCare Dental',
      industry: Industry.HEALTH_WELLNESS,
      size: CompanySize.MEDIUM,
      location: 'Puebla'
    },
    challenge: {
      title: 'Atraer pacientes jóvenes para tratamientos estéticos',
      description: 'Clínica dental tradicional buscaba atraer millennials y Gen Z para servicios de estética dental.',
      problems: [
        'Edad promedio pacientes: 45 años',
        'Poca demanda en ortodoncia invisible',
        'Percepción de "clínica cara"',
        'Sin presencia en redes sociales'
      ]
    },
    solution: {
      title: 'Estrategia TikTok + Instagram Reels con contenido educativo',
      description: 'Creamos contenido viral educativo sobre salud dental con ofertas especiales para primera visita.',
      services: ['TikTok Ads', 'Instagram Reels', 'Content Creation', 'Influencer Marketing'],
      platforms: [
        { id: 'tiktok', name: 'TikTok', icon: '🎵' },
        { id: 'instagram', name: 'Instagram', icon: '📷' }
      ],
      duration: '3 meses'
    },
    results: {
      summary: 'Triplicaron pacientes jóvenes y se convirtieron en la clínica dental más viral de Puebla.',
      metrics: [
        {
          label: 'Pacientes 18-35',
          before: '15%',
          after: '58%',
          improvement: '+286%',
          icon: '👥',
          highlight: true
        },
        {
          label: 'Citas Mensuales',
          before: '120',
          after: '380',
          improvement: '+216%',
          icon: '📅',
          highlight: true
        },
        {
          label: 'Followers TikTok',
          before: '0',
          after: '45.2K',
          improvement: 'Nuevo',
          icon: '🎵'
        },
        {
          label: 'Costo por Cita',
          before: '$180',
          after: '$35',
          improvement: '-80%',
          icon: '💵'
        },
        {
          label: 'Video Viral Views',
          before: '0',
          after: '2.3M',
          improvement: 'Viral',
          icon: '👁️'
        }
      ],
      testimonial: {
        content: 'Nunca imaginamos que TikTok traería tantos pacientes. Ahora tenemos lista de espera de 3 semanas y el 60% son menores de 30 años. Fue la mejor inversión.',
        author: {
          name: 'Dr. Luis Martínez',
          role: 'Director',
          company: 'SmileCare Dental'
        },
        rating: 5,
        verified: true
      }
    },
    featured: true,
    publishedAt: '2024-08-01',
    tags: ['salud', 'tiktok', 'gen-z', 'viral']
  },
  {
    id: 'cs-005',
    slug: 'inmobiliaria-google-ads-premium',
    client: {
      name: 'Luxury Living Real Estate',
      industry: Industry.REAL_ESTATE,
      size: CompanySize.MEDIUM,
      location: 'Cancún'
    },
    challenge: {
      title: 'Vender propiedades premium a extranjeros',
      description: 'Inmobiliaria de lujo necesitaba atraer compradores internacionales para propiedades de +$500K USD.',
      problems: [
        'Leads no cualificados',
        'Largo proceso de decisión',
        'Competencia internacional fuerte',
        'Barrera del idioma'
      ]
    },
    solution: {
      title: 'Google Ads internacional + YouTube tours virtuales',
      description: 'Campañas multi-idioma con tours virtuales 360° y remarketing sofisticado.',
      services: ['Google Ads', 'YouTube Ads', 'Virtual Tours', 'Landing Pages'],
      platforms: [
        { id: 'google', name: 'Google', icon: '🔍' },
        { id: 'youtube', name: 'YouTube', icon: '📺' }
      ],
      duration: '6 meses'
    },
    results: {
      summary: 'Vendieron 12 propiedades premium en 6 meses con un valor total de $8.5M USD.',
      metrics: [
        {
          label: 'Propiedades Vendidas',
          before: '2/año',
          after: '24/año',
          improvement: '+1,100%',
          icon: '🏠',
          highlight: true
        },
        {
          label: 'Valor Total Ventas',
          before: '$1.2M',
          after: '$8.5M',
          improvement: '+608%',
          icon: '💰',
          highlight: true
        },
        {
          label: 'Leads Internacionales',
          before: '5/mes',
          after: '85/mes',
          improvement: '+1,600%',
          icon: '🌍'
        },
        {
          label: 'Tour Virtual → Visita',
          before: 'N/A',
          after: '45%',
          improvement: 'Nuevo KPI',
          icon: '🎥'
        }
      ],
      testimonial: {
        content: 'Los tours virtuales cambiaron todo. Compradores de USA y Canadá llegan ya decididos. Vendimos más en 6 meses que en los últimos 3 años combinados.',
        author: {
          name: 'Patricia Williams',
          role: 'Sales Director',
          company: 'Luxury Living Real Estate'
        },
        rating: 5,
        verified: true
      }
    },
    featured: false,
    publishedAt: '2024-06-30',
    tags: ['real-estate', 'luxury', 'internacional', 'youtube']
  },
  {
    id: 'cs-006',
    slug: 'academia-online-facebook-leads',
    client: {
      name: 'MasterClass Academy',
      industry: Industry.EDUCATION,
      size: CompanySize.STARTUP,
      location: 'Online'
    },
    challenge: {
      title: 'Lanzar academia online desde cero',
      description: 'Nueva academia online de marketing digital necesitaba estudiantes para su primer cohort.',
      problems: [
        'Sin autoridad en el mercado',
        'Sin casos de éxito previos',
        'Competencia establecida',
        'Precio premium ($997 USD)'
      ]
    },
    solution: {
      title: 'Webinar funnel con Facebook Ads + Email automation',
      description: 'Funnel de webinar gratuito con secuencia de nurturing de 14 días.',
      services: ['Facebook Ads', 'Email Marketing', 'Webinar Funnel', 'Content Marketing'],
      platforms: [
        { id: 'meta', name: 'Facebook', icon: '👤' }
      ],
      duration: '2 meses'
    },
    results: {
      summary: 'Llenaron 3 cohorts (150 estudiantes) en 2 meses con un funnel completamente automatizado.',
      metrics: [
        {
          label: 'Estudiantes',
          before: '0',
          after: '150',
          improvement: 'Launch',
          icon: '🎓',
          highlight: true
        },
        {
          label: 'Revenue',
          before: '$0',
          after: '$149,550',
          improvement: 'Launch',
          icon: '💰',
          highlight: true
        },
        {
          label: 'Webinar → Sale',
          before: 'N/A',
          after: '12%',
          improvement: 'Optimizado',
          icon: '🎯'
        },
        {
          label: 'CAC',
          before: 'N/A',
          after: '$125',
          improvement: 'Rentable',
          icon: '💵'
        },
        {
          label: 'Email List',
          before: '0',
          after: '3,500',
          improvement: 'Asset creado',
          icon: '📧'
        }
      ],
      testimonial: {
        content: 'Lanzamos con cero estudiantes y en 8 semanas teníamos lista de espera. El funnel automatizado nos permite escalar sin aumentar el equipo. ROI del 1,196%.',
        author: {
          name: 'Miguel Ángel Torres',
          role: 'Founder & CEO',
          company: 'MasterClass Academy'
        },
        rating: 5,
        verified: true
      }
    },
    featured: false,
    publishedAt: '2024-07-15',
    tags: ['educación', 'online', 'webinar', 'launch']
  }
];

export const getFilteredCaseStudies = (filters?: {
  industry?: Industry;
  platform?: string;
  featured?: boolean;
}) => {
  if (!filters) return caseStudies;
  
  return caseStudies.filter(study => {
    if (filters.industry && study.client.industry !== filters.industry) return false;
    if (filters.platform && !study.solution.platforms.some(p => p.id === filters.platform)) return false;
    if (filters.featured !== undefined && study.featured !== filters.featured) return false;
    return true;
  });
};

export const getCaseStudyBySlug = (slug: string) => {
  return caseStudies.find(study => study.slug === slug);
};

export const getFeaturedCaseStudies = () => {
  return caseStudies.filter(study => study.featured);
};

export const getRelatedCaseStudies = (currentId: string, limit = 3) => {
  const current = caseStudies.find(s => s.id === currentId);
  if (!current) return [];
  
  return caseStudies
    .filter(s => 
      s.id !== currentId && 
      (s.client.industry === current.client.industry || 
       s.solution.platforms.some(p => current.solution.platforms.some(cp => cp.id === p.id)))
    )
    .slice(0, limit);
};