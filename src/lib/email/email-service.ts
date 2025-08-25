import sgMail from '@sendgrid/mail';
import { QuoteFormData, QuoteCalculation } from '@/types/quote';

// Initialize SendGrid with API key
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'hola@digitalmarketingpro.mx';
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'ventas@digitalmarketingpro.mx';

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export class EmailService {
  /**
   * Send quote email to client
   */
  static async sendQuoteToClient(
    formData: QuoteFormData, 
    calculation: QuoteCalculation,
    quoteNumber: string,
    pdfUrl?: string
  ): Promise<boolean> {
    if (!SENDGRID_API_KEY) {
      console.warn('SendGrid API key not configured');
      return false;
    }

    const template = this.generateClientQuoteTemplate(
      formData, 
      calculation, 
      quoteNumber,
      pdfUrl
    );

    try {
      await sgMail.send({
        to: template.to,
        from: FROM_EMAIL,
        subject: template.subject,
        html: template.html,
        text: template.text
      });
      
      console.log(`Quote email sent to ${template.to}`);
      return true;
    } catch (error) {
      console.error('Error sending quote email:', error);
      return false;
    }
  }

  /**
   * Send new lead notification to sales team
   */
  static async sendLeadNotification(leadData: {
    name: string;
    email: string;
    phone: string;
    company?: string;
    budget?: string;
    message?: string;
  }): Promise<boolean> {
    if (!SENDGRID_API_KEY) {
      console.warn('SendGrid API key not configured');
      return false;
    }

    const template = this.generateLeadNotificationTemplate(leadData);

    try {
      await sgMail.send({
        to: NOTIFICATION_EMAIL,
        from: FROM_EMAIL,
        subject: template.subject,
        html: template.html,
        text: template.text
      });
      
      console.log('Lead notification sent to sales team');
      return true;
    } catch (error) {
      console.error('Error sending lead notification:', error);
      return false;
    }
  }

  /**
   * Send welcome email to new lead
   */
  static async sendWelcomeEmail(
    email: string, 
    name: string
  ): Promise<boolean> {
    if (!SENDGRID_API_KEY) {
      console.warn('SendGrid API key not configured');
      return false;
    }

    const template = this.generateWelcomeTemplate(email, name);

    try {
      await sgMail.send({
        to: email,
        from: FROM_EMAIL,
        subject: template.subject,
        html: template.html,
        text: template.text
      });
      
      console.log(`Welcome email sent to ${email}`);
      return true;
    } catch (error) {
      console.error('Error sending welcome email:', error);
      return false;
    }
  }

  /**
   * Generate client quote email template
   */
  private static generateClientQuoteTemplate(
    formData: QuoteFormData,
    calculation: QuoteCalculation,
    quoteNumber: string,
    pdfUrl?: string
  ): EmailTemplate {
    const totalInvestment = calculation.totalMonthlyInvestment;
    const roi = calculation.estimatedROI;
    const roiPercentage = Math.round((roi / totalInvestment - 1) * 100);

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px; }
            .highlight { background: #f3f4f6; padding: 20px; border-left: 4px solid #3b82f6; margin: 20px 0; }
            .button { display: inline-block; padding: 12px 30px; background: #3b82f6; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
            .metrics { display: flex; justify-content: space-around; margin: 20px 0; }
            .metric { text-align: center; }
            .metric-value { font-size: 24px; font-weight: bold; color: #3b82f6; }
            .metric-label { font-size: 14px; color: #6b7280; }
            .services { margin: 20px 0; }
            .service-item { padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>¡Tu Cotización Personalizada Está Lista!</h1>
              <p>Hola ${formData.businessInfo.contactName},</p>
            </div>
            
            <div class="content">
              <p>Gracias por tu interés en nuestros servicios de marketing digital. Hemos preparado una propuesta personalizada para <strong>${formData.businessInfo.companyName}</strong> basada en tus objetivos y necesidades específicas.</p>
              
              <div class="highlight">
                <h3 style="margin-top: 0;">📊 Resumen de tu Inversión</h3>
                <p><strong>Inversión Total Mensual:</strong> $${totalInvestment.toLocaleString()}</p>
                <p><strong>Setup Inicial:</strong> $${calculation.oneTimeSetup.toLocaleString()} (único pago)</p>
                <p><strong>Cotización #:</strong> ${quoteNumber}</p>
              </div>
              
              <div class="metrics">
                <div class="metric">
                  <div class="metric-value">${roiPercentage}%</div>
                  <div class="metric-label">ROI Estimado</div>
                </div>
                <div class="metric">
                  <div class="metric-value">$${roi.toLocaleString()}</div>
                  <div class="metric-label">Retorno Mensual</div>
                </div>
                <div class="metric">
                  <div class="metric-value">${calculation.paybackPeriod}</div>
                  <div class="metric-label">Tiempo de Retorno</div>
                </div>
              </div>
              
              <h3>✅ Servicios Incluidos:</h3>
              <div class="services">
                ${calculation.services.map(service => `
                  <div class="service-item">
                    <strong>${service.service}</strong><br>
                    <span style="color: #6b7280;">${service.description}</span><br>
                    <span style="color: #3b82f6;">$${service.total.toLocaleString()} ${service.frequency === 'monthly' ? '/mes' : ''}</span>
                  </div>
                `).join('')}
              </div>
              
              <h3>🎯 Lo que Incluye tu Paquete:</h3>
              <ul>
                <li>Auditoría inicial completa de tu presencia digital</li>
                <li>Setup profesional de todas las campañas</li>
                <li>Optimización continua con inteligencia artificial</li>
                <li>Reportes semanales detallados</li>
                <li>Reuniones mensuales de estrategia</li>
                <li>Soporte prioritario 24/7</li>
                <li>Dashboard en tiempo real</li>
                <li><strong>Garantía de resultados o devolución</strong></li>
              </ul>
              
              <h3>🚀 Próximos Pasos:</h3>
              <ol>
                <li><strong>Agenda una llamada</strong> - 30 minutos para revisar la propuesta</li>
                <li><strong>Auditoría gratuita</strong> - Analizamos tu situación actual</li>
                <li><strong>Inicio de campañas</strong> - Setup y lanzamiento en 48 horas</li>
              </ol>
              
              <center>
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/agendar?quote=${quoteNumber}" class="button">
                  Agendar Llamada Ahora
                </a>
              </center>
              
              ${pdfUrl ? `
                <p style="text-align: center;">
                  <a href="${pdfUrl}" style="color: #3b82f6;">Descargar Cotización en PDF</a>
                </p>
              ` : ''}
              
              <div style="background: #fef3c7; padding: 15px; border-radius: 5px; margin-top: 20px;">
                <p style="margin: 0;"><strong>⏰ Esta cotización es válida por 7 días.</strong><br>
                Los precios pueden cambiar después de esta fecha.</p>
              </div>
            </div>
            
            <div class="footer">
              <p>¿Tienes preguntas? Responde a este email o llámanos al +52 55 1234 5678</p>
              <p>Digital Marketing Pro - Tu socio estratégico en crecimiento digital</p>
              <p>
                <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="color: #3b82f6;">www.digitalmarketingpro.mx</a> | 
                <a href="mailto:hola@digitalmarketingpro.mx" style="color: #3b82f6;">hola@digitalmarketingpro.mx</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    const text = `
¡Tu Cotización Personalizada Está Lista!

Hola ${formData.businessInfo.contactName},

Gracias por tu interés en nuestros servicios de marketing digital. Hemos preparado una propuesta personalizada para ${formData.businessInfo.companyName}.

RESUMEN DE TU INVERSIÓN
------------------------
Inversión Total Mensual: $${totalInvestment.toLocaleString()}
Setup Inicial: $${calculation.oneTimeSetup.toLocaleString()} (único pago)
Cotización #: ${quoteNumber}

PROYECCIÓN DE RESULTADOS
------------------------
ROI Estimado: ${roiPercentage}%
Retorno Mensual: $${roi.toLocaleString()}
Tiempo de Retorno: ${calculation.paybackPeriod}

SERVICIOS INCLUIDOS:
${calculation.services.map(s => `- ${s.service}: $${s.total.toLocaleString()} ${s.frequency === 'monthly' ? '/mes' : ''}`).join('\n')}

PRÓXIMOS PASOS:
1. Agenda una llamada - 30 minutos para revisar la propuesta
2. Auditoría gratuita - Analizamos tu situación actual  
3. Inicio de campañas - Setup y lanzamiento en 48 horas

Agenda tu llamada en: ${process.env.NEXT_PUBLIC_APP_URL}/agendar?quote=${quoteNumber}

Esta cotización es válida por 7 días.

¿Tienes preguntas? Responde a este email o llámanos al +52 55 1234 5678

Digital Marketing Pro
www.digitalmarketingpro.mx
    `;

    return {
      to: formData.businessInfo.email,
      subject: `${formData.businessInfo.contactName}, tu cotización personalizada está lista 🚀`,
      html,
      text
    };
  }

  /**
   * Generate lead notification template for sales team
   */
  private static generateLeadNotificationTemplate(leadData: {
    name: string;
    email: string;
    phone: string;
    company?: string;
    budget?: string;
    message?: string;
  }): EmailTemplate {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #10b981; color: white; padding: 20px; border-radius: 5px; }
            .content { background: #f3f4f6; padding: 20px; margin-top: 20px; border-radius: 5px; }
            .field { margin-bottom: 10px; }
            .label { font-weight: bold; color: #374151; }
            .value { color: #111827; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🎯 Nuevo Lead Capturado!</h2>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Nombre:</span> <span class="value">${leadData.name}</span>
              </div>
              <div class="field">
                <span class="label">Email:</span> <span class="value">${leadData.email}</span>
              </div>
              <div class="field">
                <span class="label">Teléfono:</span> <span class="value">${leadData.phone}</span>
              </div>
              ${leadData.company ? `
                <div class="field">
                  <span class="label">Empresa:</span> <span class="value">${leadData.company}</span>
                </div>
              ` : ''}
              ${leadData.budget ? `
                <div class="field">
                  <span class="label">Presupuesto:</span> <span class="value">${leadData.budget}</span>
                </div>
              ` : ''}
              ${leadData.message ? `
                <div class="field">
                  <span class="label">Mensaje:</span><br>
                  <span class="value">${leadData.message}</span>
                </div>
              ` : ''}
              <hr>
              <p><strong>Acción requerida:</strong> Contactar en las próximas 2 horas para maximizar conversión.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const text = `
NUEVO LEAD CAPTURADO!

Nombre: ${leadData.name}
Email: ${leadData.email}
Teléfono: ${leadData.phone}
${leadData.company ? `Empresa: ${leadData.company}` : ''}
${leadData.budget ? `Presupuesto: ${leadData.budget}` : ''}
${leadData.message ? `Mensaje: ${leadData.message}` : ''}

Acción requerida: Contactar en las próximas 2 horas para maximizar conversión.
    `;

    return {
      to: NOTIFICATION_EMAIL,
      subject: `🎯 Nuevo Lead: ${leadData.name} - ${leadData.company || 'Sin empresa'}`,
      html,
      text
    };
  }

  /**
   * Generate welcome email template
   */
  private static generateWelcomeTemplate(email: string, name: string): EmailTemplate {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; padding: 30px; text-align: center; border-radius: 10px; }
            .content { padding: 30px; }
            .button { display: inline-block; padding: 12px 30px; background: #3b82f6; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>¡Bienvenido a Digital Marketing Pro!</h1>
            </div>
            <div class="content">
              <h2>Hola ${name},</h2>
              <p>Gracias por tu interés en nuestros servicios de marketing digital. Estamos emocionados de poder ayudarte a hacer crecer tu negocio.</p>
              
              <h3>¿Qué sigue?</h3>
              <ul>
                <li>En las próximas 24 horas, uno de nuestros especialistas te contactará</li>
                <li>Prepararemos una auditoría gratuita de tu presencia digital actual</li>
                <li>Te enviaremos una propuesta personalizada basada en tus objetivos</li>
              </ul>
              
              <h3>Mientras tanto, te invitamos a:</h3>
              <ul>
                <li>📊 Ver nuestros casos de éxito</li>
                <li>📱 Seguirnos en redes sociales</li>
                <li>📚 Descargar nuestra guía gratuita de marketing digital</li>
              </ul>
              
              <center style="margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/recursos" class="button">
                  Acceder a Recursos Gratuitos
                </a>
              </center>
              
              <p>Si tienes alguna pregunta urgente, no dudes en responder a este email o llamarnos al +52 55 1234 5678.</p>
              
              <p>¡Esperamos trabajar contigo pronto!</p>
              
              <p>Saludos,<br>
              El equipo de Digital Marketing Pro</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const text = `
¡Bienvenido a Digital Marketing Pro!

Hola ${name},

Gracias por tu interés en nuestros servicios de marketing digital. Estamos emocionados de poder ayudarte a hacer crecer tu negocio.

¿Qué sigue?
- En las próximas 24 horas, uno de nuestros especialistas te contactará
- Prepararemos una auditoría gratuita de tu presencia digital actual
- Te enviaremos una propuesta personalizada basada en tus objetivos

Mientras tanto, visita: ${process.env.NEXT_PUBLIC_APP_URL}/recursos

Si tienes alguna pregunta urgente, responde a este email o llámanos al +52 55 1234 5678.

¡Esperamos trabajar contigo pronto!

Saludos,
El equipo de Digital Marketing Pro
    `;

    return {
      to: email,
      subject: `Bienvenido ${name} - Próximos pasos para hacer crecer tu negocio 🚀`,
      html,
      text
    };
  }
}