import { NextRequest, NextResponse } from 'next/server';
import { clientQueries } from '@/lib/db/queries';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    if (status === 'active') {
      const clients = await clientQueries.listActive();
      return NextResponse.json({ 
        success: true, 
        data: clients 
      });
    }

    return NextResponse.json(
      { success: false, error: 'Parámetros inválidos' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener clientes' },
      { status: 500 }
    );
  }
}