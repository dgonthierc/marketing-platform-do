import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import QuoteDocument from '@/lib/pdf/quote-generator';
import { quoteQueries } from '@/lib/db/queries';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // TODO: Implement getById in quoteQueries or use alternative method
    // const quote = await quoteQueries.getById(id);
    const quote = null; // Temporary until database is connected

    // Temporary mock data for testing
    const formData = { name: 'Test Client', email: 'test@example.com' };
    const calculation = { monthlyFee: 5000, setupFee: 1000, totalValue: 16000 };
    const quoteNumber = `QUOTE-${id}`;
    
    return NextResponse.json({
      success: true,
      message: 'PDF generation temporarily disabled',
      data: { formData, calculation, quoteNumber }
    });

  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}