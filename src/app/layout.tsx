import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#2563eb',
  colorScheme: 'light',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://marketing-platform.com'),
  title: {
    default: 'Marketing Digital Profesional | Aumenta tus Ventas 300%',
    template: '%s | Marketing Platform',
  },
  description: 'Especialistas en Google Ads, Facebook Ads y TikTok Ads. Garantizamos resultados o devolvemos tu dinero. Auditoría gratuita disponible.',
  keywords: [
    'marketing digital',
    'google ads',
    'facebook ads',
    'tiktok ads',
    'publicidad digital',
    'campañas publicitarias',
    'gestión de anuncios',
    'ppc',
    'sem',
    'redes sociales',
  ],
  authors: [{ name: 'Marketing Platform' }],
  creator: 'Marketing Platform',
  publisher: 'Marketing Platform',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: '/',
    siteName: 'Marketing Platform',
    title: 'Marketing Digital Profesional | Aumenta tus Ventas 300%',
    description: 'Especialistas en Google Ads, Facebook Ads y TikTok Ads. Garantizamos resultados.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Marketing Platform - Publicidad Digital que Funciona',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marketing Digital Profesional | Aumenta tus Ventas 300%',
    description: 'Especialistas en Google Ads, Facebook Ads y TikTok Ads.',
    images: ['/twitter-image.png'],
    creator: '@marketingplatform',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#2563eb' },
    ],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={cn(inter.variable, 'antialiased')} suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Mobile Web App Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Marketing Platform" />
        
        {/* Microsoft Tiles */}
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Marketing Platform',
              description: 'Agencia de Marketing Digital especializada en Google Ads, Facebook Ads y TikTok Ads',
              url: process.env.NEXT_PUBLIC_APP_URL || 'https://marketing-platform.com',
              logo: `${process.env.NEXT_PUBLIC_APP_URL || 'https://marketing-platform.com'}/logo.png`,
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                availableLanguage: ['Spanish', 'English'],
              },
              sameAs: [
                'https://facebook.com/marketingplatform',
                'https://twitter.com/marketingplatform',
                'https://linkedin.com/company/marketingplatform',
                'https://instagram.com/marketingplatform',
              ],
            }),
          }}
        />
      </head>
      <body 
        className={cn(
          'min-h-screen bg-white font-sans text-gray-900',
          'selection:bg-primary-100 selection:text-primary-900',
          inter.className
        )}
      >
        {/* Skip to content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-lg z-50"
        >
          Skip to main content
        </a>
        
        {/* Mobile-first structure with ARIA landmarks */}
        <div className="flex flex-col min-h-screen">
          <main 
            id="main-content" 
            className="flex-1"
            role="main"
            aria-label="Main content"
            tabIndex={-1}
          >
            {children}
          </main>
        </div>
        
        {/* Screen reader announcements */}
        <div 
          aria-live="polite" 
          aria-atomic="true" 
          className="sr-only"
          id="aria-live-region"
        />
        
        {/* Focus restoration for SPA navigation */}
        <div id="focus-restoration" tabIndex={-1} className="sr-only" />
        
        {/* Performance monitoring for Core Web Vitals */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Web Vitals tracking
              if (typeof window !== 'undefined') {
                // Track Largest Contentful Paint
                new PerformanceObserver((list) => {
                  for (const entry of list.getEntries()) {
                    console.log('LCP:', entry.startTime);
                  }
                }).observe({type: 'largest-contentful-paint', buffered: true});
                
                // Track First Input Delay
                new PerformanceObserver((list) => {
                  for (const entry of list.getEntries()) {
                    console.log('FID:', entry.processingStart - entry.startTime);
                  }
                }).observe({type: 'first-input', buffered: true});
                
                // Track Cumulative Layout Shift
                let clsValue = 0;
                let clsEntries = [];
                
                new PerformanceObserver((list) => {
                  for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                      const firstSessionEntry = clsEntries[0];
                      const lastSessionEntry = clsEntries[clsEntries.length - 1];
                      
                      if (entry.startTime - lastSessionEntry?.startTime < 1000 &&
                          entry.startTime - firstSessionEntry?.startTime < 5000) {
                        clsEntries.push(entry);
                        clsValue += entry.value;
                      } else {
                        clsEntries = [entry];
                        clsValue = entry.value;
                      }
                    }
                  }
                }).observe({type: 'layout-shift', buffered: true});
                
                // Report metrics when page is about to unload
                addEventListener('visibilitychange', () => {
                  if (document.visibilityState === 'hidden') {
                    console.log('CLS:', clsValue);
                    // Here you would send metrics to your analytics service
                  }
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
