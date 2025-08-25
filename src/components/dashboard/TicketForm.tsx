'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { Ticket } from '@/app/dashboard/support/page';
import { 
  X,
  Send,
  Paperclip,
  AlertCircle
} from 'lucide-react';

const ticketSchema = z.object({
  subject: z.string().min(5, 'El asunto debe tener al menos 5 caracteres'),
  description: z.string().min(20, 'La descripción debe tener al menos 20 caracteres'),
  category: z.enum(['technical', 'billing', 'campaign', 'other']),
  priority: z.enum(['low', 'medium', 'high', 'urgent'])
});

type TicketFormData = z.infer<typeof ticketSchema>;

interface TicketFormProps {
  onSubmit: (data: Omit<Ticket, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'messages'>) => void;
  onCancel: () => void;
}

export function TicketForm({ onSubmit, onCancel }: TicketFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      category: 'other',
      priority: 'medium'
    }
  });

  const handleFormSubmit = async (data: TicketFormData) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    onSubmit(data);
    setIsSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full"
    >
      <Card className="p-6 h-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Crear Nuevo Ticket
          </h2>
          <button
            onClick={onCancel}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoría
            </label>
            <select
              {...register('category')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="technical">Soporte Técnico</option>
              <option value="billing">Facturación</option>
              <option value="campaign">Campañas</option>
              <option value="other">Otro</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prioridad
            </label>
            <div className="grid grid-cols-4 gap-2">
              <label className="relative">
                <input
                  {...register('priority')}
                  type="radio"
                  value="low"
                  className="sr-only peer"
                />
                <div className="px-3 py-2 border rounded-lg text-center cursor-pointer transition-all peer-checked:bg-gray-100 peer-checked:border-gray-400 hover:bg-gray-50">
                  <span className="text-sm font-medium">Baja</span>
                </div>
              </label>
              <label className="relative">
                <input
                  {...register('priority')}
                  type="radio"
                  value="medium"
                  className="sr-only peer"
                />
                <div className="px-3 py-2 border rounded-lg text-center cursor-pointer transition-all peer-checked:bg-yellow-100 peer-checked:border-yellow-400 hover:bg-yellow-50">
                  <span className="text-sm font-medium">Media</span>
                </div>
              </label>
              <label className="relative">
                <input
                  {...register('priority')}
                  type="radio"
                  value="high"
                  className="sr-only peer"
                />
                <div className="px-3 py-2 border rounded-lg text-center cursor-pointer transition-all peer-checked:bg-orange-100 peer-checked:border-orange-400 hover:bg-orange-50">
                  <span className="text-sm font-medium">Alta</span>
                </div>
              </label>
              <label className="relative">
                <input
                  {...register('priority')}
                  type="radio"
                  value="urgent"
                  className="sr-only peer"
                />
                <div className="px-3 py-2 border rounded-lg text-center cursor-pointer transition-all peer-checked:bg-red-100 peer-checked:border-red-400 hover:bg-red-50">
                  <span className="text-sm font-medium">Urgente</span>
                </div>
              </label>
            </div>
            {errors.priority && (
              <p className="mt-1 text-sm text-red-600">{errors.priority.message}</p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Asunto
            </label>
            <Input
              {...register('subject')}
              type="text"
              placeholder="Describe brevemente el problema"
              disabled={isSubmitting}
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              {...register('description')}
              rows={6}
              placeholder="Proporciona todos los detalles relevantes sobre tu solicitud..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Tiempo de respuesta estimado:</p>
                <ul className="space-y-1 text-blue-700">
                  <li>• Prioridad Urgente: &lt; 1 hora</li>
                  <li>• Prioridad Alta: &lt; 2 horas</li>
                  <li>• Prioridad Media: &lt; 4 horas</li>
                  <li>• Prioridad Baja: &lt; 24 horas</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              size="default"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="cta"
              size="default"
              className="flex-1"
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              {!isSubmitting && <Send className="w-4 h-4 mr-2" />}
              Crear Ticket
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
}