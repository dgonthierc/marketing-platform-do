import { NextRequest, NextResponse } from 'next/server';
import { leadQueries } from '@/lib/db/queries';
import { LeadStatus } from '@/types/database';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const lead = await leadQueries.findById(id);
    
    if (!lead) {
      return NextResponse.json(
        { success: false, error: 'Lead no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: lead });
  } catch (error) {
    console.error('Error fetching lead:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener el lead' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (status && !Object.values(LeadStatus).includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Estado inválido' },
        { status: 400 }
      );
    }

    const result = await leadQueries.updateStatus(id, status);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json(
      { success: false, error: 'Error al actualizar el lead' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { action, ...data } = body;

    switch (action) {
      case 'convert':
        const convertResult = await leadQueries.convertToClient(
          id,
          data.additionalData
        );
        return NextResponse.json(convertResult);

      case 'interaction':
        const interactionResult = await leadQueries.addInteraction(
          id,
          data.interaction
        );
        return NextResponse.json(interactionResult);

      default:
        return NextResponse.json(
          { success: false, error: 'Acción no válida' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error processing lead action:', error);
    return NextResponse.json(
      { success: false, error: 'Error al procesar la acción' },
      { status: 500 }
    );
  }
}