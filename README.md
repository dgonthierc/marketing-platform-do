# 🚀 Marketing Platform

**Plataforma completa para vender servicios de marketing digital**

Una plataforma web mobile-first para automatizar la generación de leads, cotizaciones y gestión de clientes para especialistas en Google Ads, Facebook Ads y TikTok Ads.

## 📊 Estado del Proyecto

- **Progreso**: 90% completo  
- **GitHub**: https://github.com/dgonthierc/marketing-platform
- **Stack**: Next.js 15.5, TypeScript, Supabase, Tailwind CSS 4.1

## ✨ Características Principales

### 🎯 **Business Core**
- **Landing Page** optimizada para conversión >5%
- **Sistema de Cotizaciones** automatizado con PDF
- **Lead Scoring** automático e inteligente
- **CRM básico** para gestión de clientes

### 👥 **Portal del Cliente**
- **Dashboard** con métricas de campañas
- **Reportes** con visualización de datos
- **Sistema de Tickets** de soporte
- **Historial de Pagos** y facturación

### 🛡️ **Panel Administrativo**
- **Gestión de Clientes** con métricas
- **Pipeline de Leads** visual
- **Analytics de Revenue** en tiempo real
- **Gestión de Tickets** de soporte

## 🔧 Stack Tecnológico

```
Frontend:     Next.js 15.5 + React 19.1.1 + TypeScript
Styling:      Tailwind CSS 4.1 + Framer Motion 11+
Backend:      Supabase (PostgreSQL + Auth + Storage)
ORM:          Prisma 5.20+ (type-safe queries)
Forms:        React Hook Form + Zod validation
Animation:    Framer Motion (premium mobile UX)
```

## 🚀 Getting Started

### Prerequisitos
- Node.js 18+
- npm/yarn/pnpm
- Supabase account

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/dgonthierc/marketing-platform.git
cd marketing-platform

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Llenar con tus credenciales de Supabase

# Ejecutar migraciones de base de datos
npx prisma generate
npx prisma db push

# Iniciar servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) para ver el resultado.

## 📱 Demo Credentials

### Cliente Demo
- **Email**: cliente@test.com  
- **Password**: cliente123

### Admin Demo
- **Email**: admin@test.com
- **Password**: admin123

## 🗂️ Estructura del Proyecto

```
marketing-platform/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── admin/          # Panel administrativo
│   │   ├── auth/           # Autenticación
│   │   ├── dashboard/      # Portal del cliente
│   │   └── api/            # API routes
│   ├── components/         # Componentes React
│   │   ├── admin/         # Componentes admin
│   │   ├── dashboard/     # Componentes dashboard
│   │   ├── forms/         # Formularios
│   │   ├── landing/       # Landing page
│   │   └── ui/            # Design system
│   ├── contexts/          # React contexts
│   ├── lib/               # Utilidades y servicios
│   └── types/             # TypeScript types
├── prisma/                # Database schema
└── public/                # Archivos estáticos
```

## 🎯 Objetivos Business

- **Conversión**: >5% de visitantes a leads
- **Performance**: <2.5s load time móvil
- **Accesibilidad**: WCAG 2.1 AA compliant
- **ROI**: La plataforma se paga sola en <30 días

## 📈 Próximos Pasos

- [ ] **Lead Pipeline View** (Admin)
- [ ] **Revenue Analytics** avanzados  
- [ ] **Campaign Management** interface
- [ ] **Performance & SEO** optimization
- [ ] **Production Deployment**

## 🤝 Contribuir

1. Fork el proyecto
2. Crear feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.

## 📞 Contacto

Proyecto Link: [https://github.com/dgonthierc/marketing-platform](https://github.com/dgonthierc/marketing-platform)

---

**🤖 Generado con Claude Code**

*Una plataforma profesional para hacer crecer tu negocio de marketing digital*