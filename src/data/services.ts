/**
 * Services Data - Marketing services catalog
 */

import { Service, ServiceCategory, PricingModel } from '@/types/services';

export const services: Service[] = [
  {
    id: 'google-ads',
    slug: 'google-ads-management',
    name: 'Google Ads',
    shortDescription: 'Campañas de búsqueda y shopping que convierten',
    description: 'Gestión profesional de campañas en Google Ads con optimización continua basada en datos. Incluye Search, Shopping, Display y YouTube.',
    icon: '🔍',
    category: ServiceCategory.PAID_SEARCH,
    platforms: [
      { id: 'google', name: 'Google', icon: '🔍', color: '#4285F4' }
    ],
    features: [
      'Auditoría inicial gratuita',
      'Investigación de keywords',
      'Optimización de pujas con IA',
      'A/B testing continuo',
      'Reportes semanales',
      'Landing pages optimizadas',
      'Remarketing avanzado',
      'Extensiones de anuncios'
    ],
    pricing: {
      starting: 997,
      currency: 'USD',
      model: PricingModel.MONTHLY,
      setupFee: 497
    },
    metrics: {
      avgROI: '320%',
      timeToResults: '2-3 semanas',
      clientRetention: '94%',
      successRate: '97%'
    },
    popular: true,
    badge: 'Más Popular'
  },
  {
    id: 'facebook-ads',
    slug: 'facebook-instagram-ads',
    name: 'Facebook & Instagram Ads',
    shortDescription: 'Publicidad social que genera engagement y ventas',
    description: 'Campañas integradas en Meta (Facebook e Instagram) con segmentación avanzada y creatividades que convierten. Ideal para e-commerce y generación de leads.',
    icon: '📱',
    category: ServiceCategory.SOCIAL_MEDIA,
    platforms: [
      { id: 'meta', name: 'Meta', icon: '👤', color: '#1877F2' },
      { id: 'instagram', name: 'Instagram', icon: '📷', color: '#E4405F' }
    ],
    features: [
      'Pixel tracking avanzado',
      'Audiencias personalizadas',
      'Lookalike audiences',
      'Catálogos dinámicos',
      'Stories y Reels ads',
      'Messenger automation',
      'Creative testing',
      'Conversion API setup'
    ],
    pricing: {
      starting: 897,
      currency: 'USD',
      model: PricingModel.MONTHLY,
      setupFee: 397
    },
    metrics: {
      avgROI: '280%',
      timeToResults: '1-2 semanas',
      clientRetention: '92%',
      successRate: '95%'
    },
    popular: true
  },
  {
    id: 'tiktok-ads',
    slug: 'tiktok-ads-management',
    name: 'TikTok Ads',
    shortDescription: 'Alcanza la Gen Z con contenido viral',
    description: 'Estrategias creativas en TikTok que generan viralidad y conversiones. Perfecto para marcas que buscan conectar con audiencias jóvenes.',
    icon: '🎵',
    category: ServiceCategory.SOCIAL_MEDIA,
    platforms: [
      { id: 'tiktok', name: 'TikTok', icon: '🎵', color: '#000000' }
    ],
    features: [
      'Spark Ads optimization',
      'Creator marketplace',
      'Hashtag challenges',
      'Branded effects',
      'TikTok Shopping',
      'Event tracking',
      'Custom audiences',
      'Video production support'
    ],
    pricing: {
      starting: 797,
      currency: 'USD',
      model: PricingModel.MONTHLY,
      setupFee: 297
    },
    metrics: {
      avgROI: '250%',
      timeToResults: '1-2 semanas',
      clientRetention: '88%',
      successRate: '92%'
    },
    badge: 'Trending'
  },
  {
    id: 'linkedin-ads',
    slug: 'linkedin-b2b-advertising',
    name: 'LinkedIn Ads B2B',
    shortDescription: 'Generación de leads B2B de alta calidad',
    description: 'Campañas especializadas en LinkedIn para empresas B2B. Ideal para generación de leads cualificados y brand awareness profesional.',
    icon: '💼',
    category: ServiceCategory.SOCIAL_MEDIA,
    platforms: [
      { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: '#0077B5' }
    ],
    features: [
      'Account-based marketing',
      'Lead gen forms',
      'Matched audiences',
      'Conversation ads',
      'Document ads',
      'Event promotion',
      'Retargeting B2B',
      'CRM integration'
    ],
    pricing: {
      starting: 1297,
      currency: 'USD',
      model: PricingModel.MONTHLY,
      setupFee: 597
    },
    metrics: {
      avgROI: '290%',
      timeToResults: '3-4 semanas',
      clientRetention: '91%',
      successRate: '94%'
    }
  },
  {
    id: 'youtube-ads',
    slug: 'youtube-video-advertising',
    name: 'YouTube Ads',
    shortDescription: 'Video marketing que captura atención',
    description: 'Campañas de video en YouTube con segmentación precisa. Desde awareness hasta conversión directa con formatos TrueView y bumper ads.',
    icon: '📺',
    category: ServiceCategory.VIDEO,
    platforms: [
      { id: 'youtube', name: 'YouTube', icon: '📺', color: '#FF0000' }
    ],
    features: [
      'Video ad sequencing',
      'TrueView campaigns',
      'Bumper ads',
      'Discovery ads',
      'Brand lift studies',
      'YouTube Shopping',
      'Custom intent audiences',
      'Video production guidance'
    ],
    pricing: {
      starting: 997,
      currency: 'USD',
      model: PricingModel.MONTHLY,
      setupFee: 497
    },
    metrics: {
      avgROI: '260%',
      timeToResults: '2-3 semanas',
      clientRetention: '89%',
      successRate: '93%'
    }
  },
  {
    id: 'full-funnel',
    slug: 'full-funnel-management',
    name: 'Full Funnel Management',
    shortDescription: 'Estrategia integral multi-plataforma',
    description: 'Gestión completa del funnel de marketing digital. Combinamos todas las plataformas para maximizar resultados en cada etapa del customer journey.',
    icon: '🚀',
    category: ServiceCategory.PAID_SEARCH,
    platforms: [
      { id: 'google', name: 'Google', icon: '🔍', color: '#4285F4' },
      { id: 'meta', name: 'Meta', icon: '👤', color: '#1877F2' },
      { id: 'tiktok', name: 'TikTok', icon: '🎵', color: '#000000' }
    ],
    features: [
      'Estrategia omnicanal',
      'Attribution modeling',
      'Customer journey mapping',
      'Cross-platform remarketing',
      'Unified reporting',
      'Budget optimization AI',
      'Conversion rate optimization',
      'Monthly strategy calls'
    ],
    pricing: {
      starting: 2497,
      currency: 'USD',
      model: PricingModel.MONTHLY,
      customQuote: true
    },
    metrics: {
      avgROI: '380%',
      timeToResults: '2-4 semanas',
      clientRetention: '96%',
      successRate: '98%'
    },
    popular: true,
    badge: 'Premium'
  }
];

export const getPlatforms = () => {
  const platformMap = new Map();
  services.forEach(service => {
    service.platforms.forEach(platform => {
      if (!platformMap.has(platform.id)) {
        platformMap.set(platform.id, platform);
      }
    });
  });
  return Array.from(platformMap.values());
};

export const getServiceBySlug = (slug: string) => {
  return services.find(service => service.slug === slug);
};

export const getServicesByCategory = (category: ServiceCategory) => {
  return services.filter(service => service.category === category);
};

export const getPopularServices = () => {
  return services.filter(service => service.popular);
};