import { NextRequest, NextResponse } from 'next/server';
import { leadQueries } from '@/lib/db/queries';
import { LeadFormData } from '@/types/database';
import { z } from 'zod';

const leadSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  company: z.string().optional(),
  phone: z.string().optional(),
  budget: z.string().optional(),
  platforms: z.array(z.string()).optional(),
  timeline: z.string().optional(),
  message: z.string().optional(),
  source: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validatedData = leadSchema.parse(body);
    
    const existingLead = await leadQueries.findByEmail(validatedData.email);
    if (existingLead) {
      await leadQueries.addInteraction(existingLead.id, {
        type: 'FOLLOW_UP',
        channel: 'WEBSITE',
        subject: 'Formulario reenviado',
        content: JSON.stringify(validatedData),
      });

      return NextResponse.json(
        { 
          success: true, 
          message: 'Información actualizada exitosamente',
          data: existingLead 
        },
        { status: 200 }
      );
    }

    const result = await leadQueries.create(validatedData as LeadFormData);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Lead creado exitosamente',
        data: result.data 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing lead:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Datos inválidos',
          details: error.errors 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');
    const status = searchParams.get('status') as any;
    const source = searchParams.get('source') as any;
    const minScore = searchParams.get('minScore') 
      ? parseInt(searchParams.get('minScore')!) 
      : undefined;

    const result = await leadQueries.list(page, pageSize, {
      status,
      source,
      minScore,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener leads' },
      { status: 500 }
    );
  }
}