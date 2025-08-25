import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Font,
  Image
} from '@react-pdf/renderer';
import { QuoteFormData, QuoteCalculation } from '@/types/quote';

// Register fonts
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2' },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2', fontWeight: 700 }
  ]
});

// PDF Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40,
    fontFamily: 'Inter'
  },
  header: {
    marginBottom: 30,
    borderBottom: '2 solid #3b82f6',
    paddingBottom: 20
  },
  logo: {
    fontSize: 24,
    fontWeight: 700,
    color: '#3b82f6',
    marginBottom: 5
  },
  subtitle: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 20
  },
  section: {
    marginBottom: 25
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: '#1f2937',
    marginBottom: 10,
    backgroundColor: '#f3f4f6',
    padding: 8,
    borderLeft: '3 solid #3b82f6'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 8
  },
  label: {
    fontSize: 10,
    color: '#6b7280',
    flex: 1
  },
  value: {
    fontSize: 10,
    color: '#111827',
    flex: 1,
    textAlign: 'right',
    fontWeight: 500
  },
  serviceLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottom: '1 solid #e5e7eb'
  },
  serviceName: {
    fontSize: 11,
    color: '#111827',
    flex: 2
  },
  servicePrice: {
    fontSize: 11,
    color: '#111827',
    fontWeight: 700,
    flex: 1,
    textAlign: 'right'
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingTop: 15,
    borderTop: '2 solid #3b82f6',
    paddingHorizontal: 8
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: 700,
    color: '#111827'
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 700,
    color: '#3b82f6'
  },
  roiBox: {
    backgroundColor: '#dcfce7',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20
  },
  roiTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: '#166534',
    marginBottom: 8
  },
  roiMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  roiLabel: {
    fontSize: 10,
    color: '#166534'
  },
  roiValue: {
    fontSize: 12,
    fontWeight: 700,
    color: '#166534'
  },
  terms: {
    marginTop: 30,
    paddingTop: 20,
    borderTop: '1 solid #e5e7eb'
  },
  termsTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: '#6b7280',
    marginBottom: 10
  },
  termItem: {
    fontSize: 8,
    color: '#9ca3af',
    marginBottom: 3,
    paddingLeft: 10
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    paddingTop: 20,
    borderTop: '1 solid #e5e7eb'
  },
  footerText: {
    fontSize: 8,
    color: '#9ca3af',
    textAlign: 'center'
  },
  contactInfo: {
    fontSize: 8,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 5
  }
});

interface QuoteDocumentProps {
  formData: QuoteFormData;
  calculation: QuoteCalculation;
  quoteNumber?: string;
  validDays?: number;
}

const QuoteDocument: React.FC<QuoteDocumentProps> = ({ 
  formData, 
  calculation,
  quoteNumber = `Q-${Date.now().toString(36).toUpperCase()}`,
  validDays = 7
}) => {
  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + validDays);

  const totalInvestment = calculation.totalMonthlyInvestment;
  const roi = calculation.estimatedROI;
  const roiPercentage = Math.round((roi / totalInvestment - 1) * 100);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>Digital Marketing Pro</Text>
          <Text style={styles.subtitle}>Especialistas en Marketing Digital de Alto Rendimiento</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Cotización #{quoteNumber}</Text>
            <Text style={styles.value}>Válida hasta: {validUntil.toLocaleDateString('es-MX')}</Text>
          </View>
        </View>

        {/* Client Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>INFORMACIÓN DEL CLIENTE</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Empresa:</Text>
            <Text style={styles.value}>{formData.businessInfo.companyName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Contacto:</Text>
            <Text style={styles.value}>{formData.businessInfo.contactName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{formData.businessInfo.email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Teléfono:</Text>
            <Text style={styles.value}>{formData.businessInfo.phone}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Industria:</Text>
            <Text style={styles.value}>{formData.businessInfo.industry}</Text>
          </View>
        </View>

        {/* Services Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SERVICIOS INCLUIDOS</Text>
          {calculation.services.map((service, index) => (
            <View key={index} style={styles.serviceLine}>
              <View style={{ flex: 2 }}>
                <Text style={styles.serviceName}>{service.service}</Text>
                <Text style={{ fontSize: 9, color: '#6b7280' }}>{service.description}</Text>
              </View>
              <Text style={styles.servicePrice}>
                ${service.total.toLocaleString()} {service.frequency === 'monthly' ? '/mes' : ''}
              </Text>
            </View>
          ))}
        </View>

        {/* Investment Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RESUMEN DE INVERSIÓN</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Setup Inicial (único pago):</Text>
            <Text style={styles.value}>${calculation.oneTimeSetup.toLocaleString()}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Gestión Mensual:</Text>
            <Text style={styles.value}>${calculation.monthlyManagement.toLocaleString()}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Inversión Publicitaria Recomendada:</Text>
            <Text style={styles.value}>${calculation.recommendedAdSpend.toLocaleString()}</Text>
          </View>
          
          {/* Discounts if applicable */}
          {calculation.discounts && calculation.discounts.length > 0 && (
            <>
              {calculation.discounts.map((discount, index) => (
                <View key={index} style={styles.row}>
                  <Text style={{ ...styles.label, color: '#059669' }}>
                    {discount.description}:
                  </Text>
                  <Text style={{ ...styles.value, color: '#059669' }}>
                    -${discount.amount.toLocaleString()} ({discount.percentage}%)
                  </Text>
                </View>
              ))}
            </>
          )}

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>INVERSIÓN TOTAL MENSUAL:</Text>
            <Text style={styles.totalValue}>${totalInvestment.toLocaleString()}</Text>
          </View>
        </View>

        {/* ROI Projection */}
        <View style={styles.roiBox}>
          <Text style={styles.roiTitle}>PROYECCIÓN DE RESULTADOS</Text>
          <View style={styles.roiMetric}>
            <Text style={styles.roiLabel}>ROI Estimado:</Text>
            <Text style={styles.roiValue}>{roiPercentage}%</Text>
          </View>
          <View style={styles.roiMetric}>
            <Text style={styles.roiLabel}>Retorno Mensual Esperado:</Text>
            <Text style={styles.roiValue}>${roi.toLocaleString()}</Text>
          </View>
          <View style={styles.roiMetric}>
            <Text style={styles.roiLabel}>Periodo de Recuperación:</Text>
            <Text style={styles.roiValue}>{calculation.paybackPeriod}</Text>
          </View>
          <View style={styles.roiMetric}>
            <Text style={styles.roiLabel}>Nivel de Confianza:</Text>
            <Text style={styles.roiValue}>{calculation.confidenceScore}%</Text>
          </View>
        </View>

        {/* What's Included */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>¿QUÉ INCLUYE?</Text>
          <Text style={styles.termItem}>✓ Auditoría inicial completa de tu presencia digital</Text>
          <Text style={styles.termItem}>✓ Setup profesional de todas las campañas</Text>
          <Text style={styles.termItem}>✓ Optimización continua con inteligencia artificial</Text>
          <Text style={styles.termItem}>✓ Reportes semanales detallados de rendimiento</Text>
          <Text style={styles.termItem}>✓ Reuniones mensuales de estrategia</Text>
          <Text style={styles.termItem}>✓ Soporte prioritario 24/7</Text>
          <Text style={styles.termItem}>✓ Acceso a dashboard en tiempo real</Text>
          <Text style={styles.termItem}>✓ Garantía de resultados o devolución</Text>
        </View>

        {/* Terms and Conditions */}
        <View style={styles.terms}>
          <Text style={styles.termsTitle}>TÉRMINOS Y CONDICIONES</Text>
          <Text style={styles.termItem}>• Sin permanencia mínima - cancela cuando quieras</Text>
          <Text style={styles.termItem}>• Garantía de satisfacción de 30 días</Text>
          <Text style={styles.termItem}>• Los precios no incluyen IVA</Text>
          <Text style={styles.termItem}>• La inversión publicitaria se paga directamente a las plataformas</Text>
          <Text style={styles.termItem}>• Esta cotización es válida por {validDays} días</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Digital Marketing Pro - Tu socio estratégico en crecimiento digital
          </Text>
          <Text style={styles.contactInfo}>
            📧 hola@digitalmarketingpro.mx | 📱 +52 55 1234 5678 | 🌐 www.digitalmarketingpro.mx
          </Text>
        </View>
      </Page>
    </Document>
  );
};

// Export component wrapper for download link
export function QuotePDFDownloadLink({ 
  formData, 
  calculation,
  children,
  fileName = `cotizacion-${Date.now()}.pdf`
}: {
  formData: QuoteFormData;
  calculation: QuoteCalculation;
  children: React.ReactNode;
  fileName?: string;
}) {
  return (
    <PDFDownloadLink 
      document={<QuoteDocument formData={formData} calculation={calculation} />} 
      fileName={fileName}
    >
      {({ blob, url, loading, error }) => (
        loading ? 'Generando PDF...' : children
      )}
    </PDFDownloadLink>
  );
}

export default QuoteDocument;